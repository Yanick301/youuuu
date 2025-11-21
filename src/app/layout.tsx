import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/global/header';
import { Footer } from '@/components/global/footer';
import { Toaster } from "@/components/ui/toaster";
import { TranslationProvider } from '@/contexts/translation-context';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { CartProvider } from '@/contexts/cart-context';


export const metadata: Metadata = {
  title: 'EZENTIALS',
  description: 'Luxus und elegante Mode für Damen und Herren.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <TranslationProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </TranslationProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
