'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useTranslation } from "@/hooks/use-translation";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { ProductCard } from '@/components/products/product-card';
import { products as allProducts } from '@/lib/data';
import { Favorite, Product } from '@/lib/definitions';
import { Skeleton } from "@/components/ui/skeleton";

export default function FavoritesPage() {
    const { t } = useTranslation();
    const { user } = useUser();
    const firestore = useFirestore();

    const favoritesCollectionRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return collection(firestore, `users/${user.uid}/favorites`);
    }, [user, firestore]);

    const { data: favorites, isLoading } = useCollection<Favorite>(favoritesCollectionRef);

    const favoriteProducts = favorites
        ? favorites.map(fav => allProducts.find(p => p.id === fav.productId)).filter(Boolean) as Product[]
        : [];
        
    const favoritesIsEmpty = !isLoading && favoriteProducts.length === 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('favorites_page.title')}</CardTitle>
                <CardDescription>{t('favorites_page.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-[380px] w-full" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-8 w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : favoritesIsEmpty ? (
                    <div className="text-center border-2 border-dashed rounded-lg p-12">
                        <h3 className="text-xl font-semibold mb-2">{t('favorites_page.empty_title')}</h3>
                        <p className="text-muted-foreground mb-4">{t('favorites_page.empty_message')}</p>
                        <Button asChild>
                            <Link href="/products">{t('favorites_page.discover_button')}</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
