import type { ReactNode } from 'react';
import { View, Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/providers/theme';

interface AppCardProps {
  onClose: () => void;
  blurIntensity?: number;
  animated?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export function AppCard({
  onClose,
  blurIntensity = 30,
  animated,
  containerStyle,
  style,
  children,
}: AppCardProps) {
  const { colors, isDark, shadow } = useTheme();

  // if animated, use Animated.View
  // otherwise use regular View
  const Root = animated ? Animated.View : View;
  const Card = animated ? Animated.View : View;

  return (
    // overlay with blur and pressable to close when tapping outside the card
    <Root entering={animated ? FadeIn.duration(200) : undefined} style={styles.overlay}>
      <BlurView
        intensity={blurIntensity}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

      {/* Card */}
      <View style={[styles.container, containerStyle]}>
        <Card
          entering={animated ? FadeIn.duration(250) : undefined}
          style={[styles.card, { backgroundColor: colors.surface }, shadow.soft, style]}
        >
          {children}
        </Card>
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
});
