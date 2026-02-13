import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { Colors } from '../constants/theme';
import { ToastProvider } from '../providers/toast';
import { Toast } from '../components/atoms/Toast';
import { useAppFonts } from '../hooks/useAppFonts';
import { useI18n } from '../hooks/useI18n';
import { useAuthSession } from '../hooks/useAuthSession';
import { useAuthGuard } from '../hooks/useAuthGuard';

export default function RootLayout() {
  const fontsLoaded = useAppFonts();
  const i18nReady = useI18n();
  const isSessionReady = useAuthSession();

  useAuthGuard(isSessionReady);

  if (!fontsLoaded || !i18nReady || !isSessionReady) {
    return null;
  }

  return (
    <ToastProvider>
      <View style={styles.root}>
        <Slot />
        <Toast />
      </View>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
