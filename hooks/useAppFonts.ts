import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export function useAppFonts() {
  const [fontsLoaded] = useFonts({
    'Sora-Thin': require('../assets/fonts/Sora-Thin.ttf'),
    'Sora-ExtraLight': require('../assets/fonts/Sora-ExtraLight.ttf'),
    'Sora-Light': require('../assets/fonts/Sora-Light.ttf'),
    'Sora-Regular': require('../assets/fonts/Sora-Regular.ttf'),
    'Sora-Medium': require('../assets/fonts/Sora-Medium.ttf'),
    'Sora-SemiBold': require('../assets/fonts/Sora-SemiBold.ttf'),
    'Sora-Bold': require('../assets/fonts/Sora-Bold.ttf'),
    'Sora-ExtraBold': require('../assets/fonts/Sora-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return fontsLoaded;
}
