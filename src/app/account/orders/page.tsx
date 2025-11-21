'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";

export default function OrdersPage() {
    const { t } = useTranslation();
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('orders_page.title')}</CardTitle>
                <CardDescription>{t('orders_page.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{t('orders_page.no_orders')}</p>
            </CardContent>
        </Card>
    );
}
