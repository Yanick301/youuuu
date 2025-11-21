'use client';

import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";

export default function ProductsPage() {
    const { t } = useTranslation();
    return (
        <ShopPageLayout
            title={t('products_page.title')}
            description={t('products_page.description')}
        >
            <ProductGrid products={products} />
        </ShopPageLayout>
    );
}
