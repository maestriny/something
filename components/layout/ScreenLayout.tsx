import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationBar } from './NavigationBar';
import { Wave } from '../atoms/Wave';
import { Spacing } from '../../constants/theme';
import { WavesColor, WavesHeight } from '../../constants/waves';
import type { ReactNode } from 'react';
import { ScreenHeading } from './ScreenHeading';

// shared layout for authenticated screens
// includes background waves, navigation bar, heading, content area, and optional footer

interface ScreenLayoutProps {
  title: string;
  subtitle?: string;
  leftButton?: 'back';
  rightButton?: 'settings';
  footer?: ReactNode;
  children: ReactNode;
}

export function ScreenLayout({
  title,
  subtitle,
  leftButton,
  rightButton,
  footer,
  children,
}: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* background waves */}
      <Wave position="top" />
      <Wave position="bottom" color={WavesColor.bottom} height={WavesHeight.bottom} />

      {/* navbar */}
      <View style={styles.above}>
        <NavigationBar leftButton={leftButton} rightButton={rightButton} />
      </View>

      {/* heading */}
      <View style={styles.above}>
        <ScreenHeading title={title} subtitle={subtitle} />
      </View>

      {/* content */}
      <View style={styles.content}>{children}</View>

      {/* footer */}
      {footer ? (
        <View style={[styles.footer, { paddingBottom: insets.bottom }]}>{footer}</View>
      ) : null}
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
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
});
