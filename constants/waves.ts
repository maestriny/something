import { Colors } from './theme';

export const WavesHeight = {
  top: 190,
  bottom: 100,
} as const;

export const WavesColor = {
  top: Colors.primaryLight,
  bottom: Colors.peach,
} as const;

export const WavesDuration = {
  entrance: 1200,
  morph: 800,
  cover: 1100,
  hold: 100,
  reveal: 1200,
} as const;

export const WavesRegisterOffset = {
  top: -30,
  bottom: 40,
} as const;
