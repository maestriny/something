import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '../constants/theme';
import { WaveProvider } from '../providers/waves';
import { ToastProvider } from '../providers/toast';
import { Wave } from '../components/atoms/Wave';
import { Toast } from '../components/atoms/Toast';
import { useAppFonts } from '../hooks/useAppFonts';
import { useI18n } from '../hooks/useI18n';

export default function RootLayout() {
  const fontsLoaded = useAppFonts();
  const i18nReady = useI18n();

  if (!fontsLoaded || !i18nReady) {
    return null;
  }

  return (
    <WaveProvider>
      <ToastProvider>
        <View style={styles.root}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: Colors.background },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
          </Stack>
          <Wave position="top" />
          <Wave position="bottom" />
          <Toast />
        </View>
      </ToastProvider>
    </WaveProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
