'use client';

import { useTranslation } from '@/hooks/use-translation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  const { t } = useTranslation();

  const faqItems = [
    {
      question: 'faq.shipping.question',
      answer: 'faq.shipping.answer',
    },
    {
      question: 'faq.returns.question',
      answer: 'faq.returns.answer',
    },
    {
      question: 'faq.sizing.question',
      answer: 'faq.sizing.answer',
    },
    {
      question: 'faq.care.question',
      answer: 'faq.care.answer',
    },
    {
      question: 'faq.contact.question',
      answer: 'faq.contact.answer',
    },
  ];

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">{t('faq.title')}</h1>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">{t('faq.description')}</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold text-left">{t(item.question)}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {t(item.answer)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
