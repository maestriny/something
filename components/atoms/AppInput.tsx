import { type ReactNode, useState } from 'react';
import { TextInput, View, Pressable, StyleSheet, type TextInputProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppIcon } from './AppIcon';
import { AppText } from './AppText';
import { BorderRadius, FontSize, Fonts, Spacing, IconSize, Opacity } from '@/constants/theme';
import { useTheme } from '@/providers/theme';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
  variant?: 'default' | 'minimal';
  rightSection?: ReactNode;
}

export function AppInput({
  label,
  error,
  isPassword,
  variant = 'default',
  rightSection,
  style,
  onFocus,
  onBlur,
  textContentType,
  autoComplete,
  ...rest
}: AppInputProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus: TextInputProps['onFocus'] = e => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur: TextInputProps['onBlur'] = e => {
    setIsFocused(false);
    onBlur?.(e);
  };

  if (variant === 'minimal') {
    return (
      // minimal: no label, only underline, no error state, no focus state, optional right section
      <View style={[styles.minimalRow, { borderBottomColor: colors.inputBorder }]}>
        <TextInput
          {...rest}
          textContentType={textContentType ?? 'none'}
          autoComplete={autoComplete ?? 'off'}
          style={[styles.minimalInput, { color: colors.textPrimary }, style]}
          selectionColor={colors.inputBorderFocused}
          placeholderTextColor={colors.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {rightSection}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {label && (
        <AppText variant="caption" style={styles.label}>
          {label}
        </AppText>
      )}
      <View
        style={[
          styles.inputWrapper,
          { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder },
          isFocused && { borderColor: colors.inputBorderFocused },
          !!error && { borderColor: colors.error },
        ]}
      >
        <TextInput
          {...rest}
          textContentType={textContentType ?? 'none'}
          autoComplete={autoComplete ?? 'off'}
          style={[styles.input, { color: colors.textPrimary }, style]}
          selectionColor={colors.inputBorderFocused}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={isPassword && !showPassword}
          accessibilityLabel={label}
          accessibilityHint={isPassword ? t('input.passwordHint') : undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.toggle}
            hitSlop={Spacing.sm}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? t('input.hidePassword') : t('input.showPassword')}
          >
            <AppIcon
              name={showPassword ? 'IconEyeClosed' : 'IconEye'}
              size={IconSize.lg}
              color={colors.textMuted}
            />
          </Pressable>
        )}
      </View>
      {error && (
        <AppText variant="error" style={styles.error}>
          {error}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    marginBottom: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: BorderRadius.lg,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    fontFamily: Fonts.regular,
  },
  toggle: {
    paddingRight: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: Opacity.active,
  },
  minimalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: Spacing.sm,
  },
  minimalInput: {
    flex: 1,
    fontSize: FontSize.md,
    fontFamily: Fonts.regular,
  },
  error: {
    marginTop: Spacing.xs,
    marginLeft: Spacing.sm,
  },
});
