'use client';

import Image from 'next/image';
import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useTranslation } from "@/hooks/use-translation";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, X, Plus, Minus } from "lucide-react";
import { useCart } from '@/contexts/cart-context';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
    const { t } = useTranslation();
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const { cart, removeFromCart, updateQuantity } = useCart();
    
    const cartIsEmpty = cart.length === 0;

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0; // Or some logic to calculate it
    const total = subtotal + shipping;

    const handleCheckout = () => {
        if (!user) {
            router.push('/login?redirect=/checkout');
        } else {
            router.push('/checkout');
        }
    };


    return (
        <ShopPageLayout
            title={t('cart_page.title')}
            description={t('cart_page.description')}
        >
            {cartIsEmpty ? (
                <div className="text-center border-2 border-dashed rounded-lg p-12">
                    <p className="text-muted-foreground mb-4 text-lg">{t('cart_page.empty_message')}</p>
                    <Button asChild>
                        <Link href="/products">{t('cart_page.continue_shopping')}</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-[2fr_1fr] gap-12 max-w-7xl mx-auto">
                    <div className="flex flex-col gap-6">
                       {cart.map(item => {
                           const productName = t(item.name);
                           return (
                            <div key={item.id + (item.options?.selectedSize || '') + (item.options?.selectedColor || '')} className="flex gap-4 items-center border p-4 rounded-lg">
                                <Image 
                                    src={item.imageUrl}
                                    alt={productName}
                                    width={80}
                                    height={100}
                                    className="rounded-md object-cover"
                                />
                                <div className="flex-grow">
                                    <Link href={`/products/${item.slug}`} className="font-semibold hover:underline">{productName}</Link>
                                    <p className="text-sm text-muted-foreground">
                                        {item.options?.selectedSize && `${t('product_page.size')}: ${item.options.selectedSize}`}
                                        {item.options?.selectedSize && item.options?.selectedColor && ' / '}
                                        {item.options?.selectedColor && `${t('product_page.color')}: `}
                                        {item.options?.selectedColor && <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: item.options.selectedColor }}></span>}
                                    </p>
                                    <p className="font-bold text-primary text-lg mt-1">{(item.price * item.quantity).toFixed(2)} €</p>
                                </div>
                                <div className="flex items-center gap-2">
                                     <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="font-bold w-10 text-center">{item.quantity}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                    <X className="h-5 w-5 text-muted-foreground" />
                                </Button>
                            </div>
                           )
                       })}
                    </div>
                    <div className="bg-card p-6 md:p-8 rounded-lg shadow-sm border h-fit sticky top-24">
                        <h2 className="text-2xl font-semibold mb-6">{t('checkout_page.order_summary')}</h2>
                        
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

                        {!user && !isUserLoading && (
                            <Alert className="mt-6 mb-4">
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>{t('cart_page.login_prompt_title')}</AlertTitle>
                                <AlertDescription>
                                   {t('cart_page.login_prompt_desc_1')} <Link href="/login?redirect=/checkout" className="font-bold underline">{t('cart_page.login_prompt_link')}</Link> {t('cart_page.login_prompt_desc_2')}
                                </AlertDescription>
                            </Alert>
                        )}
                        
                        <Button onClick={handleCheckout} disabled={isUserLoading} size="lg" className="w-full mt-6">
                            {t('cart_page.proceed_to_checkout')}
                        </Button>
                    </div>
                </div>
            )}
        </ShopPageLayout>
    );
}
