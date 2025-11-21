'use client';

import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import de from '@/locales/de.json';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import es from '@/locales/es.json';
import it from '@/locales/it.json';
import ja from '@/locales/ja.json';
import { Translations } from '@/lib/definitions';

const translations: Record<string, Translations> = { de, en, fr, es, it, ja };

type TranslationContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, replacements?: { [key: string]: string }, lang?: string) => string;
  currentLanguage: string;
};

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const getNestedValue = (obj: any, key: string): string | undefined => {
  return key.split('.').reduce((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return acc[part];
    }
    return undefined;
  }, obj);
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState('de');

  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang && translations[storedLang]) {
      setLanguageState(storedLang);
      document.documentElement.lang = storedLang;
    } else {
      document.documentElement.lang = 'de';
    }
  }, []);

  const setLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
    }
  };

  const t = useCallback((key: string, replacements?: { [key: string]: string }, lang?: string): string => {
    const langToUse = lang || language;
    const translationSet = translations[langToUse] || translations.de;
    let text = getNestedValue(translationSet, key);

    if (text === undefined) {
      // Fallback to German if key not found in current language
      const fallbackText = getNestedValue(translations.de, key);
      if (fallbackText === undefined) {
          console.warn(`Translation key "${key}" not found in language "${langToUse}" or fallback "de".`);
          return key;
      }
      text = fallbackText;
    }
    
    if (replacements && typeof text === 'string') {
      Object.keys(replacements).forEach(placeholder => {
        text = (text as string).replace(`{{${placeholder}}}`, replacements[placeholder]);
      });
    }

    return text as string;
  }, [language]);


  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, currentLanguage: language }}>
      {children}
    </TranslationContext.Provider>
  );
};
