import { StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from '@/providers/theme';
import { WaveTransitionProvider } from '@/providers/waveTransition';
import { Toast } from '@/components/atoms/Toast';
import { WaveTransitionOverlay } from '@/components/atoms/WaveTransitionOverlay';
import { useAppReady } from '@/hooks/useAppReady';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useSync } from '@/hooks/useSync';
import { useNotifications } from '@/hooks/useNotifications';

export default function RootLayout() {
  const isReady = useAppReady();

  if (!isReady) {
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
  useNotifications();
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
