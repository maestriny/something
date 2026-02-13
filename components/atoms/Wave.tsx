import { useEffect, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../../constants/theme";
import { useWave } from "../../providers/waves";
import {
  primaryTopPoints,
  secondaryTopPoints,
  primaryBottomPoints,
  secondaryBottomPoints,
  buildInterpolatedPath,
} from "../../lib/wavePaths";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const HEIGHT = 190;
const ENTRANCE_DURATION = 1200;

interface WaveProps {
  position: "top" | "bottom";
  color?: string;
  height?: number;
}

export function Wave({
  position,
  color = Colors.primaryLight,
  height = HEIGHT,
}: WaveProps) {
  const { width } = useWindowDimensions();
  const { morphProgress } = useWave();

  // preset start and end points for the wave paths
  const startPoints = useMemo(
    () =>
      position === "top"
        ? primaryTopPoints(width, height)
        : primaryBottomPoints(width, height),
    [position, width, height]
  );
  const endPoints = useMemo(
    () =>
      position === "top"
        ? secondaryTopPoints(width, height)
        : secondaryBottomPoints(width, height),
    [position, width, height]
  );

  // on first render, position the wave off-screen (above for top wave, below for bottom wave) then animate it into view
  const translateY = useSharedValue(position === "top" ? -height : height);
  useEffect(() => {
    translateY.value = withDelay(
      50,
      withTiming(0, {
        duration: ENTRANCE_DURATION,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [translateY]);

  // interpolate position offset between login (0) and register values
  const registerOffsetY = position === "top" ? -30 : 40;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value + registerOffsetY * morphProgress.value
      },
    ],
  }));

  const animatedProps = useAnimatedProps(() => ({
    d: buildInterpolatedPath(startPoints, endPoints, morphProgress.value),
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        position === "top" ? styles.top : styles.bottom,
        animatedStyle,
      ]}
      pointerEvents="none"
      accessible={false}
      importantForAccessibility="no-hide-descendants">
      <Svg width={width} height={height}>
        <AnimatedPath animatedProps={animatedProps} fill={color} />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  top: {
    top: 0,
  },
  bottom: {
    bottom: 0,
  },
});
