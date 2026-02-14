import { useState, useCallback } from 'react';
import { useWindowDimensions, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Checkbox } from '@/components/atoms/Checkbox';
import { AppText } from '@/components/atoms/AppText';
import { Spacing } from '@/constants/theme';
import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

const ANIMATION_DELAY = 250;
const ANIMATION_DURATION = 500;

export function TodoItem({ todo, onToggle }: TodoItemProps) {
  const [isChecked, setIsChecked] = useState(todo.done);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const { width } = useWindowDimensions();

  const handleToggle = useCallback(() => {
    if (todo.done) {
      onToggle(todo.id);
      return;
    }

    setIsChecked(true);

    const slideDistance = width * 0.6;

    opacity.value = withDelay(
      ANIMATION_DELAY + ANIMATION_DURATION * 0.5,
      withTiming(0, {
        duration: ANIMATION_DURATION * 0.5,
        easing: Easing.out(Easing.ease),
      }),
    );
    translateX.value = withDelay(
      ANIMATION_DELAY,
      withTiming(
        slideDistance,
        {
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.ease),
        },
        () => {
          runOnJS(onToggle)(todo.id);
        },
      ),
    );
  }, [todo.id, todo.done, onToggle, opacity, translateX, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Checkbox checked={isChecked} onPress={handleToggle} />
      <AppText style={styles.text}>{todo.text}</AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm + Spacing.xs,
  },
  text: {
    marginLeft: Spacing.md,
    flex: 1,
  },
});
