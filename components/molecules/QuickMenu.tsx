import { Modal, View, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/components/atoms/AppText';
import { AppIcon } from '@/components/atoms/AppIcon';
import { AppButton } from '@/components/atoms/AppButton';
import { AppSwitch } from '@/components/atoms/AppSwitch';
import {
  Colors,
  Fonts,
  FontSize,
  IconSize,
  Spacing,
  BorderRadius,
  Shadow,
} from '@/constants/theme';

interface QuickMenuProps {
  visible: boolean;
  onClose: () => void;
  username: string;
  email: string;
  darkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
  onLogout: () => void;
}

export function QuickMenu({
  visible,
  onClose,
  username,
  email,
  darkMode,
  onDarkModeChange,
  onLogout,
}: QuickMenuProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.menu, { top: insets.top + IconSize.xl + Spacing.md }]}>
          {/* user info */}
          <View style={styles.userSection}>
            <AppText style={styles.username} numberOfLines={1}>
              {username}
            </AppText>
            <AppText style={styles.email} numberOfLines={1}>
              {email}
            </AppText>
          </View>

          <View style={styles.separator} />

          {/* dark mode toggle */}
          <View style={styles.row}>
            <AppIcon name="IconMoon" size={IconSize.sm} color={Colors.textPrimary} />
            <AppText style={styles.rowLabel}>{t('settings.darkMode')}</AppText>
            <AppSwitch value={darkMode} onValueChange={onDarkModeChange} />
          </View>

          {/* logout button */}
          <AppButton
            title={t('common.logout')}
            size="sm"
            onPress={() => {
              onClose();
              onLogout();
            }}
            style={styles.logoutButton}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    right: Spacing.lg,
    width: 220,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Shadow.soft,
    shadowOpacity: 0.12,
    elevation: 4,
  },
  userSection: {
    marginBottom: Spacing.sm,
  },
  username: {
    fontSize: FontSize.sm,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  email: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xxs,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.inputBorder,
    marginBottom: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  rowLabel: {
    flex: 1,
    fontSize: FontSize.sm,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
  },
  logoutButton: {
    marginTop: Spacing.sm,
  },
});
