'use client';

import { Logo } from '@/components/global/logo';
import { Github, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
            <div className="flex gap-4 mt-2">
              <Link href="#" aria-label="Twitter"><Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('footer.shop')}</h3>
            <ul className="space-y-3">
              <li><Link href="/women" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('nav.women')}</Link></li>
              <li><Link href="/men" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('nav.men')}</Link></li>
              <li><Link href="/clothing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('nav.clothing')}</Link></li>
              <li><Link href="/accessories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('nav.accessories')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('footer.help')}</h3>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.contact')}</Link></li>
              <li><Link href="/account/orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.order_tracking')}</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.returns')}</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.faq')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.terms')}</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EZENTIALS. {t('footer.rights_reserved')}</p>
        </div>
      </div>
    </footer>
  );
}
