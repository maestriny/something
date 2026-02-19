import { useState, useCallback } from 'react';
import { useWindowDimensions, Pressable, StyleSheet, View } from 'react-native';
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
import { AppTag } from '@/components/atoms/AppTag';
import { useCategoryStore } from '@/stores/category';
import { useCategoryLabel } from '@/hooks/useCategoryLabel';
import dayjs from '@/lib/dayjs';
import { useTranslation } from 'react-i18next';
import { Opacity, Spacing } from '@/constants/theme';
import { useTheme } from '@/providers/theme';
import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onPress: (id: string) => void;
  drag?: () => void;
  isActive?: boolean;
}

const ANIMATION_DELAY = 250;
const ANIMATION_DURATION = 500;

export function TodoItem({ todo, onToggle, onPress, drag, isActive }: TodoItemProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [isChecked, setIsChecked] = useState(todo.done);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const { width } = useWindowDimensions();
  const categories = useCategoryStore(s => s.categories);
  const categoryLabel = useCategoryLabel();
  const category = todo.categoryId ? categories.find(c => c.id === todo.categoryId) : undefined;
  // due date is urgent if it's within 2 days and not done
  const isUrgent = todo.dueDate && !todo.done && dayjs(todo.dueDate).diff(dayjs(), 'day') <= 2;
  const dueDateColor = isUrgent ? colors.error : colors.textMuted;

  // if due date is today, show "today", otherwise show relative time
  const dueDateLabel = todo.dueDate
    ? dayjs(todo.dueDate).isToday()
      ? t('todo.detail.today')
      : dayjs(todo.dueDate).fromNow()
    : '';

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

  // when pressing the item (not the checkbox) navigate to detail screen
  const handlePress = useCallback(() => {
    onPress(todo.id);
  }, [todo.id, onPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle, isActive && styles.containerDragging]}>
      <Checkbox checked={isChecked} onPress={handleToggle} />
      <Pressable
        onPress={handlePress}
        onLongPress={drag}
        style={({ pressed }) => [styles.content, pressed && { opacity: Opacity.active }]}
        accessibilityRole="button"
      >
        {/* todo item */}
        <AppText style={styles.text}>{todo.text}</AppText>

        {/* category and due date tags */}
        {(category || todo.dueDate) && (
          <View style={styles.tags}>
            {category && (
              <AppTag
                icon={category.icon}
                label={categoryLabel(category)}
                color={category.color}
                size="sm"
              />
            )}
            {todo.dueDate && (
              <AppTag
                icon="IconCalendar"
                label={dueDateLabel}
                color={dueDateColor}
                variant="subtle"
                size="sm"
              />
            )}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm + Spacing.xs,
  },
  containerDragging: {
    opacity: 0.9,
  },
  content: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  text: {
    flex: 1,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
});
