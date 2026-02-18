import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const DESIGN_WIDTH = 390; // iPhone 14 Pro width in pixels

export function rs(size: number): number {
  return wp((size / DESIGN_WIDTH) * 100);
}
