import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type TouchableOpacityProps,
} from 'react-native';
import { Colors, BorderRadius, FontSize, Fonts, Spacing, Opacity } from '@/constants/theme';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

export function AppButton({ title, isLoading, style, disabled, ...rest }: AppButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, (disabled || isLoading) && styles.buttonDisabled, style]}
      disabled={disabled || isLoading}
      activeOpacity={Opacity.active}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || isLoading, busy: isLoading }}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.buttonText} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.buttonPrimary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: Opacity.disabled,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: FontSize.md,
    fontFamily: Fonts.semiBold,
  },
});
