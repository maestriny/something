import { Text, type TextProps, StyleSheet, Platform } from 'react-native';
import { Colors, FontSize, Fonts } from '@/constants/theme';

type Variant = 'heading' | 'subheading' | 'body' | 'caption' | 'error';

interface AppTextProps extends TextProps {
  variant?: Variant;
}

export function AppText({ variant = 'body', style, ...rest }: AppTextProps) {
  return (
    <Text
      style={[styles[variant], Platform.OS === 'android' && { includeFontPadding: false }, style]}
      {...rest}
      allowFontScaling={false}
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: FontSize.xxl,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
  },
  subheading: {
    fontSize: FontSize.lg,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  body: {
    fontSize: FontSize.md,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
  },
  caption: {
    fontSize: FontSize.sm,
    fontFamily: Fonts.medium,
    color: Colors.textMuted,
  },
  error: {
    fontSize: FontSize.sm,
    fontFamily: Fonts.regular,
    color: Colors.error,
  },
});
