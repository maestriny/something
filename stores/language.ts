import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../lib/i18n';
import { type SupportedLanguage, SUPPORTED_LANGUAGES } from '../lib/i18n';

interface LanguageState {
  language: SupportedLanguage;
}

interface LanguageActions {
  setLanguage: (lang: SupportedLanguage) => Promise<void>;
}

type LanguageStore = LanguageState & LanguageActions;

export const useLanguageStore = create<LanguageStore>()(
  persist(
    set => ({
      language: 'en',

      setLanguage: async (lang: SupportedLanguage) => {
        await i18n.changeLanguage(lang);
        set({ language: lang });
      },
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        if (state?.language && SUPPORTED_LANGUAGES.includes(state.language)) {
          i18n.changeLanguage(state.language);
        }
      },
    },
  ),
);
