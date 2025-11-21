'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";

export default function ProfilePage() {
    const { t } = useTranslation();
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('profile_page.title')}</CardTitle>
                <CardDescription>{t('profile_page.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{t('profile_page.coming_soon')}</p>
            </CardContent>
        </Card>
    );
}
