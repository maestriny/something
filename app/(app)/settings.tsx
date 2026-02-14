import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/components/atoms/AppText';
import { AppButton } from '@/components/atoms/AppButton';
import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { useAuthStore } from '@/stores/auth';
import { useWaveTransition } from '@/providers/waveTransition';
import { Routes } from '@/constants/routes';
import { Spacing } from '@/constants/theme';

export default function SettingsScreen() {
  const { logout, isLoading } = useAuthStore();
  const { startTransition } = useWaveTransition();
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogout = () => {
    startTransition(router, Routes.auth.login);
    logout();
  };

  return (
    <ScreenLayout title={t('settings.heading')} leftButton="back">
      <View style={styles.content}>
        <AppText style={styles.lorem}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </AppText>
        <AppText style={styles.lorem}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </AppText>
        <AppButton
          title={t('common.logout')}
          onPress={handleLogout}
          isLoading={isLoading}
          style={styles.button}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  lorem: {
    marginBottom: Spacing.lg,
  },
  button: {
    marginTop: Spacing.md,
  },
});
