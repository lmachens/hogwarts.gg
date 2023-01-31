import type { Dictionary } from './types';

export const fallbackLang = 'en';
export const languages = [fallbackLang, 'de'];
export const loadDictionary = (language: string) => {
  return import(
    `#/lib/i18n/dictionaries/${language}.json`
  ) as Promise<Dictionary>;
};
