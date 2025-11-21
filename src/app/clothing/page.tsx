'use client';

import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";

export default function ClothingPage() {
    const { t } = useTranslation();
    const clothingProducts = products.filter(p => p.category === 'clothing');
    return (
        <ShopPageLayout
            title={t('clothing_page.title')}
            description={t('clothing_page.description')}
        >
            <ProductGrid products={clothingProducts} />
        </ShopPageLayout>
    );
}
