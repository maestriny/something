import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type TouchableOpacityProps,
} from 'react-native';
import { AppIcon, type IconName } from './AppIcon';
import {
  Colors,
  BorderRadius,
  FontSize,
  Fonts,
  IconSize,
  Spacing,
  Opacity,
} from '@/constants/theme';

// color configuration for each variant
const VARIANTS = {
  primary: { bg: Colors.buttonPrimary, text: Colors.buttonText },
  secondary: { bg: Colors.background, text: Colors.textSecondary },
  destructive: { bg: Colors.error, text: Colors.buttonText },
  ghost: { bg: undefined, text: Colors.textSecondary },
  danger: { bg: undefined, text: Colors.error },
} as const;

type Variant = keyof typeof VARIANTS;

// size configuration for each size
const SIZES = {
  lg: {
    container: {
      borderRadius: BorderRadius.xl,
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.xxl,
    },
    pill: undefined,
    iconSize: IconSize.lg,
    text: { fontSize: FontSize.lg - Spacing.xxs, fontFamily: Fonts.semiBold },
    iconOnly: { container: IconSize.xxl, iconSize: IconSize.lg },
  },
  md: {
    container: {
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.xl,
    },
    pill: undefined,
    iconSize: IconSize.md,
    text: { fontSize: FontSize.md, fontFamily: Fonts.semiBold },
    iconOnly: { container: IconSize.xl, iconSize: IconSize.md },
  },
  sm: {
    container: { paddingVertical: Spacing.xs },
    pill: {
      borderRadius: BorderRadius.pill,
      paddingVertical: Spacing.sm + Spacing.xxs,
      paddingHorizontal: Spacing.md,
    },
    iconSize: IconSize.sm,
    text: { fontSize: FontSize.sm, fontFamily: Fonts.medium },
    iconOnly: { container: IconSize.md, iconSize: IconSize.xxs },
  },
} as const;

type Size = keyof typeof SIZES;

interface AppButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: Variant;
  size?: Size;
  color?: string;
  icon?: IconName;
  iconOnly?: boolean;
  full?: boolean;
  isLoading?: boolean;
}

export function AppButton({
  title,
  variant = 'primary',
  size = 'md',
  color,
  icon,
  iconOnly,
  full,
  isLoading,
  style,
  disabled,
  ...rest
}: AppButtonProps) {
  const colorConfig = VARIANTS[variant];
  const sizeConfig = SIZES[size];
  const resolvedColor = color ?? colorConfig.text;
  const iconOnlyConfig = sizeConfig.iconOnly;

  const containerStyle = iconOnly
    ? [
        styles.base,
        colorConfig.bg && {
          width: iconOnlyConfig.container,
          height: iconOnlyConfig.container,
          borderRadius: iconOnlyConfig.container / 2,
          backgroundColor: colorConfig.bg,
        },
        (disabled || isLoading) && styles.buttonDisabled,
        style,
      ]
    : [
        styles.base,
        sizeConfig.container,
        colorConfig.bg && { backgroundColor: colorConfig.bg },
        colorConfig.bg && sizeConfig.pill,
        full && styles.full,
        (disabled || isLoading) && styles.buttonDisabled,
        style,
      ];

  const textStyle = [sizeConfig.text, { color: resolvedColor }];

  return (
    <TouchableOpacity
      style={containerStyle}
      disabled={disabled || isLoading}
      activeOpacity={Opacity.active}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || isLoading, busy: isLoading }}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={resolvedColor} />
      ) : iconOnly && icon ? (
        <AppIcon name={icon} size={iconOnlyConfig.iconSize} color={resolvedColor} />
      ) : (
        <View style={styles.row}>
          {icon && <AppIcon name={icon} size={sizeConfig.iconSize} color={resolvedColor} />}
          {title && <Text style={textStyle}>{title}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  full: {
    flex: 1,
  },
  buttonDisabled: {
    opacity: Opacity.disabled,
  },
});
