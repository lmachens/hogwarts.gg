import type { Dictionary } from './types';

export const fallbackLang = 'en';
export const languages = [fallbackLang, 'de'];
export const loadDictionary = (language: string) => {
  const lang = languages.includes(language) ? language : fallbackLang;
  return import(`#/lib/i18n/dictionaries/${lang}.json`) as Promise<Dictionary>;
};
export const labels: {
  [language: string]: string;
} = {
  en: 'English',
  de: 'Deutsch',
};
