import type { Translations } from '../assets/locales/en';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: Translations;
    };
  }
}
