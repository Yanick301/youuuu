'use client';

import { ProductCard } from '@/components/products/product-card';
import { type Product } from '@/lib/definitions';
import { useTranslation } from '@/hooks/use-translation';

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    const { t } = useTranslation();
    if (products.length === 0) {
        return <p className="text-center text-muted-foreground col-span-full">{t('product_grid.no_products')}</p>
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
