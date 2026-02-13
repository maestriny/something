import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AppText } from '../../components/atoms/AppText';
import { AppButton } from '../../components/atoms/AppButton';
import { useAuthStore } from '../../stores/auth';
import { Colors, Spacing } from '../../constants/theme';

export default function HomeScreen() {
  const { user, logout, isLoading } = useAuthStore();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AppText variant="heading">{t('login.toast.successMessage')}</AppText>
        <AppText variant="subheading" style={styles.subtitle}>
          {user?.username || user?.email}
        </AppText>
        <AppButton
          title={t('common.logout')}
          onPress={logout}
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
    backgroundColor: Colors.background,
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
