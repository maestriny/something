import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import en from '@/assets/locales/en';
import it from '@/assets/locales/it';
import fr from '@/assets/locales/fr';
import es from '@/assets/locales/es';
import de from '@/assets/locales/de';

const SUPPORTED_LANGUAGES = ['en', 'it', 'fr', 'es', 'de'] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function isSupportedLanguage(code: string): code is SupportedLanguage {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(code);
}

function getDeviceLanguage(): SupportedLanguage {
  const locales = getLocales();
  for (const locale of locales) {
    const code = locale.languageCode;
    if (code && isSupportedLanguage(code)) {
      return code;
    }
  }
  return 'en';
}

export async function initI18n(): Promise<void> {
  const language = getDeviceLanguage();

  // eslint-disable-next-line import/no-named-as-default-member
  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      it: { translation: it },
      fr: { translation: fr },
      es: { translation: es },
      de: { translation: de },
    },
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'English',
  it: 'Italiano',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
};

export { SUPPORTED_LANGUAGES, type SupportedLanguage };
export default i18n;
