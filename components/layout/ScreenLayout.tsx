import { View, StyleSheet, Animated, Platform } from 'react-native';
import { useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationBar } from './NavigationBar';
import { Wave } from '@/components/atoms/Wave';
import { Spacing } from '@/constants/theme';
import { WavesHeight, WavesDuration } from '@/constants/waves';
import type { ReactNode } from 'react';
import { ScreenHeading } from './ScreenHeading';
import { useTheme } from '@/providers/theme';

// shared layout for authenticated screens
// includes background waves, navigation bar, heading, content area, and optional footer

interface ScreenLayoutProps {
  title: string;
  subtitle?: string;
  leftButton?: 'back';
  rightButton?: 'settings';
  rightSecondaryButton?: 'completed';
  onSettingsLongPress?: () => void;
  footer?: ReactNode;
  fadeIn?: boolean;
  children: ReactNode;
}

export function ScreenLayout({
  title,
  subtitle,
  leftButton,
  rightButton,
  rightSecondaryButton,
  onSettingsLongPress,
  footer,
  fadeIn = false,
  children,
}: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const fadeAnimation = useRef(new Animated.Value(fadeIn ? 0 : 1)).current;
  useEffect(() => {
    if (!fadeIn) return;
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: WavesDuration.reveal * 0.6,
      delay: WavesDuration.hold + WavesDuration.reveal * 0.3,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation, fadeIn]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + (Platform.OS === 'android' ? Spacing.lg + Spacing.xxs : 0),
          backgroundColor: colors.background,
        },
      ]}
    >
      {/* background waves */}
      <Wave position="top" />
      <Wave position="bottom" color={colors.waveBottom} height={WavesHeight.bottom} />

      {/* navbar */}
      <View style={styles.above}>
        <NavigationBar
          leftButton={leftButton}
          rightButton={rightButton}
          rightSecondaryButton={rightSecondaryButton}
          onSettingsLongPress={onSettingsLongPress}
        />
      </View>

      {/* heading */}
      <View style={styles.above}>
        <ScreenHeading title={title} subtitle={subtitle} />
      </View>

      {/* content */}
      <Animated.View style={[styles.content, { opacity: fadeAnimation }]}>{children}</Animated.View>

      {/* footer */}
      {footer && <View style={[styles.footer, { paddingBottom: insets.bottom }]}>{footer}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  above: {
    zIndex: 2,
  },
  footer: {
    zIndex: 2,
    paddingHorizontal: Spacing.lg,
    marginBottom: -Spacing.xxs,
  },
});
