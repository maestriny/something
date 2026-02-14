import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { AppText } from './AppText';
import { useToast } from '@/providers/toast';
import { Colors, BorderRadius, Spacing, Shadow } from '@/constants/theme';

const TOAST_COLORS = {
  success: Colors.green,
  error: Colors.error,
} as const;

export function Toast() {
  const { toast } = useToast();

  if (!toast) return null;

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}
        style={[
          styles.toast,
          { backgroundColor: toast.color ?? TOAST_COLORS[toast.type] },
          Shadow.soft,
        ]}
      >
        <AppText variant="body" style={styles.title}>
          {toast.message}
        </AppText>
        {toast.description ? (
          <AppText variant="caption" style={styles.description}>
            {toast.description}
          </AppText>
        ) : null}
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
    fontFamily: 'Sora-SemiBold',
    color: Colors.textPrimary,
  },
  description: {
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
});
