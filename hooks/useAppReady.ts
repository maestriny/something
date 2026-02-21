import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useAppFonts } from '@/hooks/useAppFonts';
import { useI18n } from '@/hooks/useI18n';
import { useAuthSession } from '@/hooks/useAuthSession';

export function useAppReady(): boolean {
  const fontsLoaded = useAppFonts();
  const i18nReady = useI18n();
  const isSessionReady = useAuthSession();

  const isReady = fontsLoaded && i18nReady && isSessionReady;

  useEffect(() => {
    if (isReady) {
      SplashScreen.setOptions({ fade: true, duration: 500 });
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return isReady;
}
