'use client';

import { useTranslation } from '@/hooks/use-translation';

export default function TermsOfServicePage() {
  const { t } = useTranslation();

  const sections = [
    { title: 'agreement.title', content: 'agreement.content' },
    { title: 'accounts.title', content: 'accounts.content' },
    { title: 'products.title', content: 'products.content' },
    { title: 'payments.title', content: 'payments.content' },
    { title: 'intellectual_property.title', content: 'intellectual_property.content' },
    { title: 'limitation_of_liability.title', content: 'limitation_of_liability.content' },
    { title: 'governing_law.title', content: 'governing_law.content' },
    { title: 'contact.title', content: 'contact.content' },
  ];

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">{t('terms_of_service.title')}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{t('terms_of_service.last_updated')}</p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-3">{t(`terms_of_service.${section.title}`)}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(`terms_of_service.${section.content}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
