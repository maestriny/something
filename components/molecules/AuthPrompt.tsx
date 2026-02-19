import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '@/components/atoms/AppText';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/providers/theme';

interface AuthPromptProps {
  message: string;
  actionText: string;
  onPress: () => void;
}

export function AuthPrompt({ message, actionText, onPress }: AuthPromptProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <AppText variant="body" style={{ color: colors.textSecondary }}>
        {message}
      </AppText>
      <TouchableOpacity onPress={onPress} accessibilityRole="link" accessibilityLabel={actionText}>
        <AppText variant="body" style={[styles.link, { color: colors.link }]}>
          {actionText}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  link: {
    fontFamily: Fonts.semiBold,
    marginTop: Spacing.xs,
  },
});
