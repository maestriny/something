import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '../atoms/AppText';
import { Colors, Fonts, Spacing } from '../../constants/theme';

interface AuthPromptProps {
  message: string;
  actionText: string;
  onPress: () => void;
}

export function AuthPrompt({ message, actionText, onPress }: AuthPromptProps) {
  return (
    <View style={styles.container}>
      <AppText variant="body" style={styles.message}>
        {message}
      </AppText>
      <TouchableOpacity
        onPress={onPress}
        accessibilityRole="link"
        accessibilityLabel={actionText}
      >
        <AppText variant="body" style={styles.link}>
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
  message: {
    color: Colors.textSecondary,
  },
  link: {
    color: Colors.link,
    fontFamily: Fonts.semiBold,
    marginTop: Spacing.xs,
  },
});
