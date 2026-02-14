import { useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { WavesColor } from '@/constants/waves';
import { useWaveTransition } from '@/providers/waveTransition';
import { buildInterpolatedPath } from '@/lib/wavePaths';
import {
  transitionTopResting,
  transitionTopCovering,
  transitionBottomResting,
  transitionBottomCovering,
} from '@/lib/transitionWavePaths';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export function WaveTransitionOverlay() {
  const { width, height } = useWindowDimensions();
  const { coverProgress } = useWaveTransition();

  const topResting = useMemo(() => transitionTopResting(width, height), [width, height]);
  const topCovering = useMemo(() => transitionTopCovering(width, height), [width, height]);
  const bottomResting = useMemo(() => transitionBottomResting(width, height), [width, height]);
  const bottomCovering = useMemo(() => transitionBottomCovering(width, height), [width, height]);

  const topPathProps = useAnimatedProps(() => ({
    d: buildInterpolatedPath(topResting, topCovering, coverProgress.value),
  }));

  const bottomPathProps = useAnimatedProps(() => ({
    d: buildInterpolatedPath(bottomResting, bottomCovering, coverProgress.value),
  }));

  const [blocking, setBlocking] = useState(false);
  useAnimatedReaction(
    () => coverProgress.value > 0,
    active => {
      runOnJS(setBlocking)(active);
    },
  );

  const containerStyle = useAnimatedStyle(() => ({
    opacity: coverProgress.value > 0 ? 1 : 0,
  }));

  return (
    <Animated.View
      style={[styles.overlay, containerStyle]}
      pointerEvents={blocking ? 'auto' : 'none'}
    >
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <AnimatedPath animatedProps={topPathProps} fill={WavesColor.top} />
        <AnimatedPath animatedProps={bottomPathProps} fill={WavesColor.bottom} />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
