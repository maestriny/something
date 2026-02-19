import { useSyncExternalStore } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { AppText } from './AppText';
import { toast } from '@/lib/toast';
import { Fonts, BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/providers/theme';

export function Toast() {
  const { colors, shadow } = useTheme();
  const data = useSyncExternalStore(toast.subscribe, () => toast.current);

  const toastColors = {
    success: colors.green,
    error: colors.error,
  } as const;

  if (!data) return null;

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}
        style={[
          styles.toast,
          { backgroundColor: data.color ?? toastColors[data.type] },
          shadow.soft,
        ]}
      >
        <AppText variant="body" style={[styles.title, { color: colors.toastText }]}>
          {data.message}
        </AppText>
        {data.description && (
          <AppText variant="caption" style={[styles.description, { color: colors.toastText }]}>
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
  },
  description: {
    marginTop: Spacing.xs,
  },
});
