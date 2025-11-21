'use client';

import { useTranslation } from '@/hooks/use-translation';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  const sections = [
    { title: 'introduction.title', content: 'introduction.content' },
    { title: 'data_collected.title', content: 'data_collected.content' },
    { title: 'data_usage.title', content: 'data_usage.content' },
    { title: 'data_sharing.title', content: 'data_sharing.content' },
    { title: 'cookies.title', content: 'cookies.content' },
    { title: 'security.title', content: 'security.content' },
    { title: 'user_rights.title', content: 'user_rights.content' },
    { title: 'contact.title', content: 'contact.content' },
  ];

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">{t('privacy_policy.title')}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{t('privacy_policy.last_updated')}</p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-3">{t(`privacy_policy.${section.title}`)}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(`privacy_policy.${section.content}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
