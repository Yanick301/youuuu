'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/lib/data';
import { testimonials } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Lock, Feather, Gem } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export default function Home() {
  const { t } = useTranslation();
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const newProducts = products.slice(4, 8); // Example for new arrivals
  
  const brandNames = [
    "Versace", "Gucci", "Prada", "Dior", "Chanel", "Balenciaga", "Louis Vuitton"
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[90vh] bg-black">
        <Image
          src="/homepage/hero-background.jpg"
          alt={t('hero.alt')}
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-50"
          data-ai-hint="fashion models couple"
          priority
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl font-headline">
            {t('hero.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
            {t('hero.subtitle')}
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-10 py-6 text-base">
            <Link href="/products">{t('hero.button')}</Link>
          </Button>
        </div>
      </section>

      {/* Brand Names Section */}
      <div className="bg-card py-8 md:py-12">
        <div className="container">
          <div className="relative overflow-hidden group">
            <div className="flex animate-marquee-infinite group-hover:[animation-play-state:paused]">
              {[...brandNames, ...brandNames].map((name, index) => (
                <div key={index} className="flex-shrink-0 mx-8">
                  <span className="text-2xl font-headline text-muted-foreground tracking-widest">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Maison Categories Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('home.maison_menu.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Atelier Tailoring */}
            <Link href="/men" className="relative group h-[500px] overflow-hidden rounded-lg shadow-lg">
                <Image src="/homepage/maison-tailoring.jpg" alt={t('home.maison_menu.tailoring.title')} fill style={{objectFit:"cover"}} className="transition-transform duration-500 group-hover:scale-105" data-ai-hint="man white t-shirt"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
                    <p className="text-sm uppercase tracking-widest">{t('home.maison_menu.tailoring.subtitle')}</p>
                    <h3 className="text-3xl font-headline mt-2">{t('home.maison_menu.tailoring.title')}</h3>
                    <p className="mt-2 text-white/90 max-w-xs">{t('home.maison_menu.tailoring.description')}</p>
                    <div className="mt-4 font-semibold flex items-center group-hover:underline">
                      {t('home.maison_menu.tailoring.cta')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
             {/* Couture & Soirée */}
            <Link href="/women" className="relative group h-[500px] overflow-hidden rounded-lg shadow-lg">
                <Image src="/homepage/maison-couture.jpg" alt={t('home.maison_menu.couture.title')} fill style={{objectFit:"cover"}} className="transition-transform duration-500 group-hover:scale-105" data-ai-hint="woman fashion pose"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
                    <p className="text-sm uppercase tracking-widest">{t('home.maison_menu.couture.subtitle')}</p>
                    <h3 className="text-3xl font-headline mt-2">{t('home.maison_menu.couture.title')}</h3>
                    <p className="mt-2 text-white/90 max-w-xs">{t('home.maison_menu.couture.description')}</p>
                    <div className="mt-4 font-semibold flex items-center group-hover:underline">
                      {t('home.maison_menu.couture.cta')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
             {/* Salon Accessoires */}
            <Link href="/accessories" className="relative group h-[500px] overflow-hidden rounded-lg shadow-lg">
                <Image src="/homepage/maison-accessories.jpg" alt={t('home.maison_menu.accessories.title')} fill style={{objectFit:"cover"}} className="transition-transform duration-500 group-hover:scale-105" data-ai-hint="luxury watch"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
                    <p className="text-sm uppercase tracking-widest">{t('home.maison_menu.accessories.subtitle')}</p>
                    <h3 className="text-3xl font-headline mt-2">{t('home.maison_menu.accessories.title')}</h3>
                    <p className="mt-2 text-white/90 max-w-xs">{t('home.maison_menu.accessories.description')}</p>
                    <div className="mt-4 font-semibold flex items-center group-hover:underline">
                      {t('home.maison_menu.accessories.cta')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('home.trending_products')}</h2>
            <p className="mt-2 text-muted-foreground text-lg">{t('home.trending_description')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">{t('home.view_all_products')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Brand Philosophy Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <Feather className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('philosophy.materials.title')}</h3>
              <p className="text-muted-foreground">{t('philosophy.materials.description')}</p>
            </div>
            <div className="flex flex-col items-center">
              <Gem className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('philosophy.craftsmanship.title')}</h3>
              <p className="text-muted-foreground">{t('philosophy.craftsmanship.description')}</p>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('philosophy.exclusivity.title')}</h3>
              <p className="text-muted-foreground">{t('philosophy.exclusivity.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('home.testimonials')}</h2>
            <p className="mt-2 text-muted-foreground text-lg">{t('home.testimonials_description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-background shadow-lg border-none">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 mb-6 border-2 border-primary">
                    <AvatarImage src={testimonial.avatar} alt={t(testimonial.name)} />
                    <AvatarFallback>{t(testimonial.name).charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-muted-foreground italic text-base">&ldquo;{t(testimonial.quote)}&rdquo;</p>
                  <p className="font-semibold mt-6 font-headline text-lg">{t(testimonial.name)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
