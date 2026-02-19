import { View, Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { AppIcon, type IconName } from '@/components/atoms/AppIcon';
import { Routes } from '@/constants/routes';
import { Spacing, IconSize, Opacity } from '@/constants/theme';
import { useTheme } from '@/providers/theme';

function NavButton({
  onPress,
  onLongPress,
  style,
  label,
  icon,
  color,
}: {
  onPress: () => void;
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
  label: string;
  icon: IconName;
  color: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      hitSlop={12}
      style={({ pressed }) => [styles.button, style, pressed && { opacity: Opacity.active }]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <AppIcon name={icon} size={IconSize.xl} color={color} />
    </Pressable>
  );
}

interface NavigationBarProps {
  leftButton?: 'back';
  rightButton?: 'settings';
  rightSecondaryButton?: 'completed';
  onSettingsLongPress?: () => void;
}

export function NavigationBar({
  leftButton,
  rightButton,
  rightSecondaryButton,
  onSettingsLongPress,
}: NavigationBarProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Left: Go Back button */}
      {leftButton === 'back' && (
        <NavButton
          onPress={() => router.back()}
          style={styles.leftButton}
          label={t('common.back')}
          icon="IconArrowLeft"
          color={colors.textSecondary}
        />
      )}

      {/* Right: Completed todos + Settings */}
      <View style={styles.rightGroup}>
        {rightSecondaryButton === 'completed' && (
          <NavButton
            onPress={() => router.push(Routes.app.completed)}
            label={t('todo.completed')}
            icon="IconListCheck"
            color={colors.textSecondary}
          />
        )}
        {rightButton === 'settings' && (
          <NavButton
            onPress={() => router.push(Routes.app.settings)}
            onLongPress={onSettingsLongPress}
            label={t('settings.heading')}
            icon="IconSettingsFilled"
            color={colors.textSecondary}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    minHeight: IconSize.xl + Spacing.sm,
  },
  button: {
    paddingVertical: Spacing.xs,
  },
  leftButton: {
    marginLeft: -Spacing.sm,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: -Spacing.xs,
    gap: Spacing.md,
  },
});
