'use client';
import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";

export default function AccessoriesPage() {
    const { t } = useTranslation();
    const accessoryProducts = products.filter(p => p.category === 'accessories');
    return (
        <ShopPageLayout
            title={t('accessories_page.title')}
            description={t('accessories_page.description')}
        >
            <ProductGrid products={accessoryProducts} />
        </ShopPageLayout>
    );
}
