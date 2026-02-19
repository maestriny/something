import type { ReactNode } from 'react';
import { View, Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/components/atoms/AppText';
import { AppIcon, type IconName } from '@/components/atoms/AppIcon';
import { FontSize, IconSize, Spacing, Opacity } from '@/constants/theme';
import { useTheme } from '@/providers/theme';

interface AppRowProps {
  icon: IconName;
  label: string;
  value?: string;
  placeholder?: string;
  onPress: () => void;
  onClear?: () => void;
  expanded?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export function AppRow({
  icon,
  label,
  value,
  placeholder,
  onPress,
  onClear,
  expanded,
  disabled,
  style,
  children,
}: AppRowProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const displayPlaceholder = placeholder ?? t('todo.detail.none');

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.row,
        styles.container,
        style,
        pressed && !disabled && { opacity: Opacity.active },
      ]}
    >
      {/* Left: icon and label */}
      <AppIcon name={icon} color={colors.textMuted} />
      <AppText style={[styles.label, { color: colors.textSecondary }]}>{label}</AppText>

      {/* Right: value or placeholder and chevron */}
      <View style={[styles.row, styles.right]}>
        {children ?? (
          <AppText
            style={[
              styles.placeholder,
              { color: colors.textMuted },
              value && { color: colors.textPrimary },
            ]}
          >
            {value ?? displayPlaceholder}
          </AppText>
        )}
        {onClear && !disabled && (value || children) ? (
          <Pressable onPress={onClear} hitSlop={8}>
            <AppIcon name="IconX" size={IconSize.xxs + Spacing.xxs} color={colors.textMuted} />
          </Pressable>
        ) : (
          !disabled && (
            <AppIcon
              name={expanded ? 'IconChevronUp' : 'IconChevronDown'}
              size={IconSize.xs}
              color={colors.textMuted}
            />
          )
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSize.sm,
    flex: 1,
  },
  right: {
    gap: Spacing.xs,
  },
  placeholder: {
    fontSize: FontSize.sm,
  },
});
