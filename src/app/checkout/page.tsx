'use client';

import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock } from "lucide-react";

export default function CheckoutPage() {
    const { t } = useTranslation();
    // Dummy data for cart summary
    const cartItems = [
        { name: t('products.elegance_dress.name'), price: 1100, quantity: 1 },
        { name: t('products.souverain_oxfords.name'), price: 620, quantity: 1 },
    ];
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <ShopPageLayout
            title={t('checkout_page.title')}
            description={t('checkout_page.description')}
        >
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Shipping & Payment Form */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">{t('checkout_page.shipping_address')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <Label htmlFor="name">{t('checkout_page.full_name')}</Label>
                                <Input id="name" placeholder={t('checkout_page.full_name_placeholder')} />
                            </div>
                            <div className="sm:col-span-2">
                                <Label htmlFor="address">{t('checkout_page.address')}</Label>
                                <Input id="address" placeholder={t('checkout_page.address_placeholder')} />
                            </div>
                            <div>
                                <Label htmlFor="city">{t('checkout_page.city')}</Label>
                                <Input id="city" />
                            </div>
                            <div>
                                <Label htmlFor="zip">{t('checkout_page.zip_code')}</Label>
                                <Input id="zip" />
                            </div>
                             <div className="sm:col-span-2">
                                <Label htmlFor="country">{t('checkout_page.country')}</Label>
                                <Input id="country" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">{t('checkout_page.payment_details')}</h2>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="card-number">{t('checkout_page.card_number')}</Label>
                                <Input id="card-number" placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="expiry-date">{t('checkout_page.expiry_date')}</Label>
                                    <Input id="expiry-date" placeholder="MM/YY" />
                                </div>
                                <div>
                                    <Label htmlFor="cvc">{t('checkout_page.cvc')}</Label>
                                    <Input id="cvc" placeholder="CVC" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-card p-6 md:p-8 rounded-lg shadow-sm border h-fit sticky top-24">
                    <h2 className="text-2xl font-semibold mb-6">{t('checkout_page.order_summary')}</h2>
                    <div className="space-y-4 text-sm">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                                <span className="font-medium">{item.price.toFixed(2)} €</span>
                            </div>
                        ))}
                    </div>
                    <Separator className="my-6" />
                    <div className="space-y-4">
                         <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t('checkout_page.subtotal')}</span>
                            <span className="font-medium">{subtotal.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t('checkout_page.shipping')}</span>
                            <span className="font-medium">{shipping > 0 ? `${shipping.toFixed(2)} €` : t('checkout_page.free')}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                            <span>{t('checkout_page.total')}</span>
                            <span>{total.toFixed(2)} €</span>
                        </div>
                    </div>
                    <Button className="w-full mt-8" size="lg">
                        <Lock className="mr-2 h-4 w-4" /> {t('checkout_page.pay_now')}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4 text-center">{t('checkout_page.secure_payment')}</p>
                </div>
            </div>
        </ShopPageLayout>
    );
}
