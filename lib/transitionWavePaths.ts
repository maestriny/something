import { primaryTopPoints, primaryBottomPoints, quadToCubic, lineToCubic } from './wavePaths';

const WAVE_HEIGHT = 190;

// offset all y-coordinates in a 32-number point array
function offsetY(points: number[], dy: number): number[] {
  return points.map((v, i) => (i % 2 === 1 ? v + dy : v));
}

// top wave resting: same shape and position as the login screen top wave
export function transitionTopResting(w: number, _h: number): number[] {
  return primaryTopPoints(w, WAVE_HEIGHT);
}

// top wave covering: fills from top to ~62% of screen height with wavy bottom edge
export function transitionTopCovering(w: number, h: number): number[] {
  const bottom = h * 0.62;
  return [
    0,
    0,
    ...lineToCubic(0, 0, w, 0),
    ...lineToCubic(w, 0, w, bottom - h * 0.04),
    ...quadToCubic(w, bottom - h * 0.04, w * 0.72, bottom + h * 0.03, w * 0.5, bottom - h * 0.01),
    ...quadToCubic(w * 0.5, bottom - h * 0.01, w * 0.28, bottom - h * 0.06, 0, bottom + h * 0.02),
    ...lineToCubic(0, bottom + h * 0.02, 0, 0),
  ];
}

// bottom wave resting: same shape and position as the login screen bottom wave
export function transitionBottomResting(w: number, h: number): number[] {
  return offsetY(primaryBottomPoints(w, WAVE_HEIGHT), h - WAVE_HEIGHT);
}

// bottom wave covering: fills from ~45% of screen height to bottom with wavy top edge
export function transitionBottomCovering(w: number, h: number): number[] {
  const top = h * 0.45;
  return [
    0,
    top + h * 0.02,
    ...quadToCubic(0, top + h * 0.02, w * 0.28, top - h * 0.03, w * 0.5, top + h * 0.01),
    ...quadToCubic(w * 0.5, top + h * 0.01, w * 0.72, top + h * 0.06, w, top + h * 0.04),
    ...lineToCubic(w, top + h * 0.04, w, h),
    ...lineToCubic(w, h, 0, h),
    ...lineToCubic(0, h, 0, top + h * 0.02),
  ];
}
