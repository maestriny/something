import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useTheme } from '@/providers/theme';

const SIZE = 22;
const BORDER_WIDTH = 1.5;

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
}

export function Checkbox({ checked, onPress }: CheckboxProps) {
  const { colors } = useTheme();

  const fillStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(checked ? 1 : 0, {
          duration: 200,
          easing: Easing.out(Easing.ease),
        }),
      },
    ],
    opacity: withTiming(checked ? 1 : 0, { duration: 200 }),
  }));

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { borderColor: colors.textMuted }]}
      hitSlop={8}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <Animated.View style={[styles.fill, { backgroundColor: colors.primary }, fillStyle]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: BORDER_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    width: SIZE - BORDER_WIDTH * 2,
    height: SIZE - BORDER_WIDTH * 2,
    borderRadius: (SIZE - BORDER_WIDTH * 2) / 2,
  },
});
