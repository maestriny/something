import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/components/atoms/AppText';
import { AppButton } from '@/components/atoms/AppButton';
import { SettingsRow } from '@/components/atoms/SettingsRow';
import { LanguagePicker } from '@/components/molecules/LanguagePicker';
import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';
import { useWaveTransition } from '@/providers/waveTransition';
import { useTheme } from '@/providers/theme';
import { Routes } from '@/constants/routes';
import { Fonts, FontSize, IconSize, Spacing } from '@/constants/theme';
import { getInitials, setOpacity } from '@/lib/utils';

export default function SettingsScreen() {
  const { logout, isLoading, user } = useAuthStore();
  const { startTransition } = useWaveTransition();
  const { colors, isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  const notifications = useNotificationStore(s => s.enabled);
  const setNotifications = useNotificationStore(s => s.setEnabled);
  const [showLangPicker, setShowLangPicker] = useState(false);

  const handleLogout = () => {
    startTransition(router, Routes.auth.login);
    logout();
  };

  const handleLanguagePress = () => {
    setShowLangPicker(true);
  };

  return (
    <ScreenLayout title={t('settings.heading')} leftButton="back">
      <View style={styles.content}>
        <View style={styles.profile}>
          {/* Avatar with initials */}
          <View style={[styles.avatar, { backgroundColor: setOpacity(colors.primary, 0.2) }]}>
            <AppText style={[styles.initials, { color: colors.primary }]}>
              {getInitials(user?.username ?? '')}
            </AppText>
          </View>
          {/* Username + Email */}
          <View style={styles.profileInfo}>
            <AppText style={[styles.username, { color: colors.textPrimary }]}>
              {user?.username}
            </AppText>
            <AppText style={[styles.email, { color: colors.textSecondary }]}>{user?.email}</AppText>
          </View>
        </View>

        <View style={styles.rows}>
          {/* Account Info */}
          <SettingsRow
            type="press"
            icon="IconUser"
            label={t('settings.accountInfo.label')}
            onPress={() => router.push(Routes.app.accountInfo)}
          />

          {/* Change Password */}
          <SettingsRow
            type="press"
            icon="IconLock"
            label={t('settings.changePassword.label')}
            onPress={() => router.push(Routes.app.changePassword)}
          />

          {/* Dark Mode */}
          <SettingsRow
            type="toggle"
            icon="IconMoon"
            label={t('settings.darkMode')}
            value={isDark}
            onValueChange={toggleTheme}
          />

          {/* Notifications */}
          <SettingsRow
            type="toggle"
            icon="IconBell"
            label={t('settings.notifications')}
            value={notifications}
            onValueChange={setNotifications}
          />

          {/* Language */}
          <SettingsRow
            type="press"
            icon="IconWorld"
            label={t('settings.language')}
            onPress={handleLanguagePress}
          />
        </View>

        {/* Logout Button */}
        <AppButton
          title={t('common.logout')}
          onPress={handleLogout}
          isLoading={isLoading}
          style={styles.button}
        />
      </View>

      {/* Language Picker Modal */}
      <LanguagePicker visible={showLangPicker} onClose={() => setShowLangPicker(false)} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: IconSize.xl * 2,
    height: IconSize.xl * 2,
    borderRadius: IconSize.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: FontSize.lg,
    fontFamily: Fonts.semiBold,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: FontSize.md,
    fontFamily: Fonts.semiBold,
  },
  email: {
    fontSize: FontSize.xs,
    marginTop: Spacing.xxs,
  },
  rows: {
    marginBottom: Spacing.lg,
  },
  button: {
    marginTop: Spacing.md,
  },
});
