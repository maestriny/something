import { useSyncExternalStore } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { AppText } from './AppText';
import { toast } from '@/lib/toast';
import { Colors, Fonts, BorderRadius, Spacing, Shadow } from '@/constants/theme';

const TOAST_COLORS = {
  success: Colors.green,
  error: Colors.error,
} as const;

export function Toast() {
  const data = useSyncExternalStore(toast.subscribe, () => toast.current);

  if (!data) return null;

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}
        style={[
          styles.toast,
          { backgroundColor: data.color ?? TOAST_COLORS[data.type] },
          Shadow.soft,
        ]}
      >
        <AppText variant="body" style={styles.title}>
          {data.message}
        </AppText>
        {data.description && (
          <AppText variant="caption" style={styles.description}>
            {data.description}
          </AppText>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  toast: {
    width: 300,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  title: {
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  description: {
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
});
