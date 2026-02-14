import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { AppText } from '../../components/atoms/AppText';
import { AppButton } from '../../components/atoms/AppButton';
import { useAuthStore } from '../../stores/auth';
import { useWaveTransition } from '../../providers/waveTransition';
import { Routes } from '../../constants/routes';
import { Spacing } from '../../constants/theme';

export default function HomeScreen() {
  const { user, logout, isLoading } = useAuthStore();
  const { startTransition } = useWaveTransition();
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogout = () => {
    startTransition(router, Routes.auth.login);
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AppText variant="heading">{t('login.toast.successMessage')}</AppText>
        <AppText variant="subheading" style={styles.subtitle}>
          {user?.username || user?.email}
        </AppText>
        <AppButton
          title={t('common.logout')}
          onPress={handleLogout}
          isLoading={isLoading}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  subtitle: {
    marginTop: Spacing.sm,
  },
  button: {
    marginTop: Spacing.xl,
  },
});
