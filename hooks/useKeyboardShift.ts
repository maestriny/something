import { useCallback } from 'react';
import { useWindowDimensions, type LayoutChangeEvent } from 'react-native';
import { useAnimatedKeyboard, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing } from '@/constants/theme';

// when the keyboard opens, checks if it overlaps other elements
// if it does, slides the element up just enough to stay visible but never above the safe area
// returns:
// animatedStyle: animated translateY to apply on the element container
// onLayout: attach to the element to measure its height

export function useKeyboardShift() {
  const { height: screenHeight } = useWindowDimensions();
  const { top: safeAreaTop } = useSafeAreaInsets();
  const keyboard = useAnimatedKeyboard();
  const elementHeight = useSharedValue(0);

  // measure the element height once it's laid out
  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      elementHeight.value = e.nativeEvent.layout.height;
    },
    [elementHeight],
  );

  const animatedStyle = useAnimatedStyle(() => {
    const keyboardHeight = keyboard.height.value;

    // nothing to do if keyboard is closed or element not measured yet
    if (keyboardHeight <= 0 || elementHeight.value <= 0) {
      return { transform: [{ translateY: 0 }] };
    }

    // how many pixels the keyboard covers the element
    const gap = Spacing.md;
    const elementBottom = (screenHeight + elementHeight.value) / 2;
    const keyboardTop = screenHeight - keyboardHeight;
    const overlap = elementBottom - keyboardTop + gap;

    // no overlap -> no shift needed
    if (overlap <= 0) return { transform: [{ translateY: 0 }] };

    // don't shift more than the space between element top and safe area
    const elementTop = (screenHeight - elementHeight.value) / 2;
    const maxShift = Math.max(0, elementTop - safeAreaTop - gap);

    return { transform: [{ translateY: -Math.min(overlap, maxShift) }] };
  });

  return { animatedStyle, onLayout } as const;
}
