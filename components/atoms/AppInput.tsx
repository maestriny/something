import { TextInput, View, Pressable, StyleSheet, type TextInputProps } from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconEye, IconEyeClosed } from '@tabler/icons-react-native';
import { AppText } from './AppText';
import {
  Colors,
  BorderRadius,
  FontSize,
  Fonts,
  Spacing,
  IconSize,
  Opacity,
} from '../../constants/theme';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

export function AppInput({
  label,
  error,
  isPassword,
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

  return (
    <View style={styles.container}>
      {label ? (
        <AppText variant="caption" style={styles.label}>
          {label}
        </AppText>
      ) : null}
      <View style={styles.inputWrapper}>
        <TextInput
          {...rest}
          textContentType={textContentType ?? (isPassword ? 'newPassword' : 'none')}
          autoComplete={autoComplete ?? (isPassword ? 'new-password' : 'off')}
          style={[
            styles.input,
            isPassword && styles.inputWithToggle,
            isFocused && styles.inputFocused,
            !!error && styles.inputError,
            style,
          ]}
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
            {showPassword ? (
              <IconEyeClosed size={IconSize.md} color={Colors.textMuted} />
            ) : (
              <IconEye size={IconSize.md} color={Colors.textMuted} />
            )}
          </Pressable>
        )}
      </View>
      {error ? (
        <AppText variant="error" style={styles.error}>
          {error}
        </AppText>
      ) : null}
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
  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
  },
  inputWrapper: {
    position: 'relative',
  },
  inputWithToggle: {
    paddingRight: Spacing.xl + Spacing.md,
  },
  inputFocused: {
    borderColor: Colors.inputBorderFocused,
  },
  toggle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: Opacity.active,
  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    marginTop: Spacing.xs,
    marginLeft: Spacing.sm,
  },
});
