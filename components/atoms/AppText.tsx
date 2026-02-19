import { Text, type TextProps, StyleSheet, Platform } from 'react-native';
import { FontSize, Fonts } from '@/constants/theme';
import { useTheme } from '@/providers/theme';

type Variant = 'heading' | 'subheading' | 'body' | 'caption' | 'error';

interface AppTextProps extends TextProps {
  variant?: Variant;
}

export function AppText({ variant = 'body', style, ...rest }: AppTextProps) {
  const { colors } = useTheme();

  const variantColor =
    variant === 'error'
      ? colors.error
      : variant === 'caption'
        ? colors.textMuted
        : variant === 'subheading'
          ? colors.textSecondary
          : colors.textPrimary;

  return (
    <Text
      style={[
        styles[variant],
        { color: variantColor },
        Platform.OS === 'android' && { includeFontPadding: false },
        style,
      ]}
      {...rest}
      allowFontScaling={false}
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: FontSize.xxl,
    fontFamily: Fonts.bold,
  },
  subheading: {
    fontSize: FontSize.lg,
    fontFamily: Fonts.regular,
  },
  body: {
    fontSize: FontSize.md,
    fontFamily: Fonts.regular,
  },
  caption: {
    fontSize: FontSize.sm,
    fontFamily: Fonts.medium,
  },
  error: {
    fontSize: FontSize.sm,
    fontFamily: Fonts.regular,
  },
});
