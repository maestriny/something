import { StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from '@/providers/theme';
import { WaveTransitionProvider } from '@/providers/waveTransition';
import { Toast } from '@/components/atoms/Toast';
import { WaveTransitionOverlay } from '@/components/atoms/WaveTransitionOverlay';
import { useAppFonts } from '@/hooks/useAppFonts';
import { useI18n } from '@/hooks/useI18n';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useSync } from '@/hooks/useSync';

export default function RootLayout() {
  const fontsLoaded = useAppFonts();
  const i18nReady = useI18n();
  const isSessionReady = useAuthSession();

  if (!fontsLoaded || !i18nReady || !isSessionReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <WaveTransitionProvider>
        <RootLayoutContent />
      </WaveTransitionProvider>
    </ThemeProvider>
  );
}

function RootLayoutContent() {
  useAuthGuard(true);
  useSync();
  const { colors, isDark } = useTheme();

  return (
    <GestureHandlerRootView style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Slot />
      <WaveTransitionOverlay />
      <Toast />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
