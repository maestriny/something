import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/atoms/AppText';
import { AppIcon, type IconName } from '@/components/atoms/AppIcon';
import { BorderRadius, FontSize, IconSize, Opacity, Spacing } from '@/constants/theme';
import { darkenHex, lightenHex, setOpacity } from '@/lib/utils';
import { useTheme } from '@/providers/theme';

interface AppTagProps {
  icon: IconName;
  label?: string;
  color?: string;
  size?: 'sm' | 'md';
  variant?: 'default' | 'subtle';
  selected?: boolean;
  onPress?: () => void;
}

export function AppTag({
  icon,
  label,
  color,
  size = 'md',
  variant = 'default',
  selected,
  onPress,
}: AppTagProps) {
  const { colors, isDark } = useTheme();
  const isSubtle = variant === 'subtle';
  const isSmall = size === 'sm';
  const hasLabel = label && label.length > 0;
  const baseColor = color ?? colors.textMuted;
  const iconSize = isSmall ? IconSize.xs : IconSize.sm;
  const iconColor = isSubtle ? baseColor : isDark ? lightenHex(baseColor) : darkenHex(baseColor);

  const content = (
    <View
      style={[
        styles.container,
        isSmall && styles.containerSm,
        isSubtle && styles.containerSubtle,
        !isSubtle && color && { backgroundColor: setOpacity(color, isDark ? 0.4 : 0.25) },
        !hasLabel && styles.containerIconOnly,
        selected && color && { borderColor: color },
      ]}
    >
      <View style={styles.iconWrapper}>
        <AppIcon name={icon} size={iconSize} color={iconColor} strokeWidth={isSubtle ? 1.6 : 2.1} />
      </View>

      {hasLabel && (
        <AppText
          numberOfLines={1}
          style={[
            styles.label,
            { color: colors.textPrimary },
            isSmall && styles.labelSm,
            isSubtle && { color: baseColor },
          ]}
        >
          {label}
        </AppText>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && { opacity: Opacity.active }]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 160,
    paddingHorizontal: Spacing.sm + Spacing.xs,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
    gap: Spacing.xs,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  containerSm: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    gap: Spacing.xxs,
  },
  containerSubtle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  containerIconOnly: {
    paddingHorizontal: Spacing.xs,
  },
  iconWrapper: {
    paddingRight: 1,
    marginBottom: 1,
  },
  label: {
    fontSize: FontSize.sm,
    flexShrink: 1,
  },
  labelSm: {
    fontSize: FontSize.xs,
  },
});
