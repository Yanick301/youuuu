'use client';

import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";

export default function MenPage() {
    const { t } = useTranslation();
    const menProducts = products.filter(p => p.gender === 'men' || p.gender === 'unisex');
    return (
        <ShopPageLayout
            title={t('men_page.title')}
            description={t('men_page.description')}
        >
            <ProductGrid products={menProducts} />
        </ShopPageLayout>
    );
}
