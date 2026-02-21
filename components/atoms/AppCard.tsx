import type { ReactNode } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, { type AnimatedStyle, FadeIn } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/providers/theme';

interface AppCardProps {
  onClose: () => void;
  blurIntensity?: number;
  animated?: boolean;
  containerStyle?: StyleProp<AnimatedStyle<ViewStyle>>;
  style?: StyleProp<ViewStyle>;
  onCardLayout?: (event: LayoutChangeEvent) => void;
  children: ReactNode;
}

export function AppCard({
  onClose,
  blurIntensity = 30,
  animated,
  containerStyle,
  style,
  onCardLayout,
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
      <Animated.View style={[styles.container, containerStyle]} pointerEvents="box-none">
        <Card
          onLayout={onCardLayout}
          entering={animated ? FadeIn.duration(250) : undefined}
          style={[styles.shadowWrapper, shadow.soft, style]}
        >
          <View style={[styles.card, { backgroundColor: colors.surface }]}>{children}</View>
        </Card>
      </Animated.View>
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
  shadowWrapper: {
    borderRadius: BorderRadius.xl,
  },
  card: {
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    overflow: 'hidden',
  },
});
