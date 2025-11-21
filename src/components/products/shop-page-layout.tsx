'use client';

import { ReactNode } from "react";
import { useTranslation } from "@/hooks/use-translation";

interface ShopPageLayoutProps {
    title: string;
    description: string;
    children: ReactNode;
}

export function ShopPageLayout({ title, description, children }: ShopPageLayoutProps) {
    const { t } = useTranslation();
    return (
        <div className="container py-12 md:py-16">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">{t(title)}</h1>
                <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">{t(description)}</p>
            </div>
            {children}
        </div>
    );
}
