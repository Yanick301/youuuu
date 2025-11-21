'use client';

import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { products } from '@/lib/data';
import { Product } from '@/lib/definitions';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';
import { FileQuestion } from 'lucide-react';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const { t, currentLanguage } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  const performSearch = useCallback(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filteredProducts = products.filter(product => {
      const productName = t(product.name, undefined, currentLanguage).toLowerCase();
      const productDescription = t(product.description, undefined, currentLanguage).toLowerCase();
      return productName.includes(lowerCaseQuery) || productDescription.includes(lowerCaseQuery);
    });
    setResults(filteredProducts);
  }, [query, t, currentLanguage]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, performSearch]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{t('search.title')}</DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="text-lg"
          />
        </div>
        <div className="p-6 pt-0 max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="grid gap-4">
              {results.map(product => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="flex items-center gap-4 p-2 -mx-2 rounded-lg hover:bg-muted"
                  onClick={() => onOpenChange(false)}
                >
                  <Image
                    src={product.imageUrl}
                    alt={t(product.name)}
                    width={48}
                    height={64}
                    className="rounded-md object-cover w-12 h-16"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{t(product.name)}</p>
                    <p className="text-sm text-primary font-bold">{product.price.toFixed(2)} €</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.length > 1 ? (
             <div className="text-center py-10">
                <FileQuestion className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">{t('search.no_results')}</p>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
