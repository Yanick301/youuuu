'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/global/logo';
import { UserNav } from '@/components/global/user-nav';
import { Button } from '@/components/ui/button';
import { Heart, Menu, Search, ShoppingCart, Languages } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from '@/hooks/use-translation';
import { usePathname } from 'next/navigation';
import { SearchDialog } from '@/components/search/search-dialog';
import { useCart } from '@/contexts/cart-context';
import { Badge } from '@/components/ui/badge';


export function Header() {
  const { t, setLanguage, currentLanguage } = useTranslation();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { href: '/women', label: t('nav.women') },
    { href: '/men', label: t('nav.men') },
    { href: '/clothing', label: t('nav.clothing') },
    { href: '/accessories', label: t('nav.accessories') },
    { href: '/recommendations', label: t('nav.ai_stylist') },
  ];

  const languages = [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'it', name: 'Italiano' },
    { code: 'ja', name: '日本語' },
  ];

  // A simple way to handle closing the sheet on navigation
  const [sheetOpen, setSheetOpen] = useState(false);
  React.useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden lg:flex">
            <Logo />
          </div>
          
          <div className="lg:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t('header.toggle_menu')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="p-4">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-4 mt-8 px-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-2 py-1 text-lg font-medium text-foreground hover:text-accent"
                      onClick={() => setSheetOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex lg:hidden flex-1 justify-center">
               <Logo />
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-accent font-semibold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end space-x-1 md:space-x-2">
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={t('header.select_language')}>
                          <Languages className="h-5 w-5" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      {languages.map(lang => (
                          <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)} disabled={currentLanguage === lang.code}>
                              {lang.name}
                          </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
              </DropdownMenu>
            <Button variant="ghost" size="icon" aria-label={t('header.search')} onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label={t('header.favorites')}>
              <Link href="/account/favorites">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label={t('header.cart')} className="relative">
               <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0 text-xs">
                        {itemCount}
                    </Badge>
                  )}
               </Link>
            </Button>
            <div className="w-px h-6 bg-border mx-2 hidden sm:block"></div>
            <UserNav />
          </div>
        </div>
      </header>
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
