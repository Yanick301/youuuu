'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getPersonalizedOutfitRecommendations, PersonalizedOutfitRecommendationsOutput } from '@/ai/flows/personalized-outfit-recommendations';
import { Loader2, Wand2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from '@/hooks/use-translation';
import { Separator } from '@/components/ui/separator';


export default function RecommendationsPage() {
    const { t } = useTranslation();
    const [stylePreferences, setStylePreferences] = useState('');
    const [recommendations, setRecommendations] = useState<PersonalizedOutfitRecommendationsOutput['recommendations']>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const browsingHistory = t('ai_stylist.browsing_history_example');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setRecommendations([]);

        try {
            const result = await getPersonalizedOutfitRecommendations({
                browsingHistory,
                stylePreferences,
            });
            setRecommendations(result.recommendations);
        } catch (err) {
            setError(t('ai_stylist.error_message'));
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-3xl mx-auto shadow-lg border">
                <CardHeader className="text-center">
                    <Wand2 className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="text-3xl mt-4 font-headline">{t('ai_stylist.title')}</CardTitle>
                    <CardDescription className="max-w-md mx-auto pt-2 text-muted-foreground">{t('ai_stylist.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="style-preferences" className="font-semibold text-base">{t('ai_stylist.form_label')}</Label>
                            <Textarea
                                id="style-preferences"
                                placeholder={t('ai_stylist.form_placeholder')}
                                value={stylePreferences}
                                onChange={(e) => setStylePreferences(e.target.value)}
                                rows={5}
                                required
                                className="text-base"
                            />
                        </div>
                        <Button type="submit" disabled={isLoading} size="lg" className="font-semibold">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {t('ai_stylist.button_text')}
                        </Button>
                    </form>
                </CardContent>
                
                {(isLoading || error || recommendations.length > 0) && (
                    <CardFooter className="flex flex-col p-6">
                         {error && (
                            <Alert variant="destructive" className="w-full">
                                <AlertTitle>{t('ai_stylist.error_title')}</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {recommendations.length > 0 && (
                            <div className="w-full rounded-lg border bg-background p-6 space-y-6">
                                <h3 className="font-headline text-2xl mb-4 text-center">{t('ai_stylist.results_title')}</h3>
                                {recommendations.map((rec, index) => (
                                    <div key={index}>
                                        <h4 className="font-bold text-lg text-primary">{t(rec.productName)}</h4>
                                        <p className="text-muted-foreground text-sm italic mt-1">&ldquo;{rec.reasoning}&rdquo;</p>
                                        {index < recommendations.length - 1 && <Separator className="mt-6" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
