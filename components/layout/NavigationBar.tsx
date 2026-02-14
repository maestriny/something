import { View, Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { IconArrowLeft, IconSettingsFilled } from '@tabler/icons-react-native';
import { Routes } from '@/constants/routes';
import { Colors, Spacing, IconSize, Opacity } from '@/constants/theme';
import type { ComponentType } from 'react';

function NavButton({
  onPress,
  style,
  label,
  icon: Icon,
}: {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  label: string;
  icon: ComponentType<{ size: number; color: string }>;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={12}
      style={({ pressed }) => [styles.button, style, pressed && { opacity: Opacity.active }]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Icon size={IconSize.lg} color={Colors.textSecondary} />
    </Pressable>
  );
}

interface NavigationBarProps {
  leftButton?: 'back';
  rightButton?: 'settings';
}

export function NavigationBar({ leftButton, rightButton }: NavigationBarProps) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {leftButton === 'back' ? (
        <NavButton
          onPress={() => router.back()}
          style={styles.leftButton}
          label={t('common.back')}
          icon={IconArrowLeft}
        />
      ) : null}

      {rightButton === 'settings' ? (
        <NavButton
          onPress={() => router.push(Routes.app.settings)}
          style={styles.rightButton}
          label={t('settings.heading')}
          icon={IconSettingsFilled}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    minHeight: IconSize.lg + Spacing.xs * 2,
  },
  button: {
    paddingVertical: Spacing.xs,
  },
  leftButton: {
    marginLeft: -Spacing.sm,
  },
  rightButton: {
    marginLeft: 'auto',
  },
});
