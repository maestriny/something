import { Modal, View, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/components/atoms/AppText';
import { AppIcon } from '@/components/atoms/AppIcon';
import { AppButton } from '@/components/atoms/AppButton';
import { AppSwitch } from '@/components/atoms/AppSwitch';
import { Fonts, FontSize, IconSize, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/providers/theme';

interface QuickMenuProps {
  visible: boolean;
  onClose: () => void;
  username: string;
  email: string;
  onLogout: () => void;
}

export function QuickMenu({ visible, onClose, username, email, onLogout }: QuickMenuProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { colors, isDark, shadow, toggleTheme } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[styles.overlay, { backgroundColor: colors.overlay }]} onPress={onClose}>
        <View
          style={[
            styles.menu,
            { top: insets.top + IconSize.xl + Spacing.md, backgroundColor: colors.surface },
            shadow.soft,
          ]}
        >
          {/* user info */}
          <View style={styles.userSection}>
            <AppText style={[styles.username, { color: colors.textPrimary }]} numberOfLines={1}>
              {username}
            </AppText>
            <AppText style={[styles.email, { color: colors.textSecondary }]} numberOfLines={1}>
              {email}
            </AppText>
          </View>

          <View style={[styles.separator, { backgroundColor: colors.inputBorder }]} />

          {/* dark mode toggle */}
          <View style={styles.row}>
            <AppIcon name="IconMoon" size={IconSize.sm} color={colors.textPrimary} />
            <AppText style={[styles.rowLabel, { color: colors.textPrimary }]}>
              {t('settings.darkMode')}
            </AppText>
            <AppSwitch value={isDark} onValueChange={toggleTheme} />
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
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  userSection: {
    marginBottom: Spacing.sm,
  },
  username: {
    fontSize: FontSize.sm,
    fontFamily: Fonts.semiBold,
  },
  email: {
    fontSize: FontSize.xs,
    marginTop: Spacing.xxs,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
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
  },
  logoutButton: {
    marginTop: Spacing.sm,
  },
});
