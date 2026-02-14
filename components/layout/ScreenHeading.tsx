import { View, StyleSheet } from 'react-native';
import { AppText } from '@/components/atoms/AppText';
import { Spacing } from '@/constants/theme';

interface ScreenHeadingProps {
  title: string;
  subtitle?: string;
}

export function ScreenHeading({ title, subtitle }: ScreenHeadingProps) {
  return (
    <View style={styles.container}>
      <AppText variant="heading">{title}</AppText>
      {subtitle ? (
        <AppText variant="subheading" style={styles.subtitle}>
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.xxl + Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  subtitle: {
    marginTop: Spacing.sm,
  },
});
