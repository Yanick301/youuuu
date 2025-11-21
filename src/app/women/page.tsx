'use client';

import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";

export default function WomenPage() {
    const { t } = useTranslation();
    const womenProducts = products.filter(p => p.gender === 'women' || p.gender === 'unisex');
    return (
        <ShopPageLayout
            title={t('women_page.title')}
            description={t('women_page.description')}
        >
            <ProductGrid products={womenProducts} />
        </ShopPageLayout>
    );
}
