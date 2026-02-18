import { type ReactNode } from 'react';
import { TextInput, View, Pressable, StyleSheet, type TextInputProps } from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from './AppIcon';
import { AppText } from './AppText';
import {
  Colors,
  BorderRadius,
  FontSize,
  Fonts,
  Spacing,
  IconSize,
  Opacity,
} from '@/constants/theme';

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
      <View style={styles.minimalRow}>
        <TextInput
          {...rest}
          textContentType={textContentType ?? 'none'}
          autoComplete={autoComplete ?? 'off'}
          style={[styles.minimalInput, style]}
          selectionColor={Colors.inputBorderFocused}
          placeholderTextColor={Colors.placeholder}
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
          isFocused && styles.inputWrapperFocused,
          !!error && styles.inputWrapperError,
        ]}
      >
        <TextInput
          {...rest}
          textContentType={textContentType ?? 'none'}
          autoComplete={autoComplete ?? 'off'}
          style={[styles.input, style]}
          selectionColor={Colors.inputBorderFocused}
          placeholderTextColor={Colors.placeholder}
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
              color={Colors.textMuted}
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
    backgroundColor: Colors.inputBackground,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.lg,
  },
  inputWrapperFocused: {
    borderColor: Colors.inputBorderFocused,
  },
  inputWrapperError: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
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
    borderBottomColor: Colors.inputBorder,
    paddingBottom: Spacing.sm,
  },
  minimalInput: {
    flex: 1,
    fontSize: FontSize.md,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
  },
  error: {
    marginTop: Spacing.xs,
    marginLeft: Spacing.sm,
  },
});
