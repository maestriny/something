import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../assets/locales/en';
import it from '../assets/locales/it';
import fr from '../assets/locales/fr';
import es from '../assets/locales/es';
import de from '../assets/locales/de';

const LANGUAGE_KEY = 'user_language';

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

async function getStoredLanguage(): Promise<SupportedLanguage | null> {
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (stored && isSupportedLanguage(stored)) {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

export async function setLanguage(lang: SupportedLanguage): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  await i18n.changeLanguage(lang);
}

export async function initI18n(): Promise<void> {
  const storedLang = await getStoredLanguage();
  const language = storedLang ?? getDeviceLanguage();

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

export { SUPPORTED_LANGUAGES, type SupportedLanguage };
export default i18n;
