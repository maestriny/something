import { rs } from '@/lib/responsive';

export const Colors = {
  // primary palette
  primary: '#5B5FE6',
  primaryLight: '#C8C8F4',
  peach: '#FFBE98',
  peachLight: '#FFF0E5',
  blue: '#A8D8EA',
  blueDeep: '#7EC8E3',
  green: '#C1E1C1',
  yellow: '#F5D76E',

  // functional
  background: '#F7F7FB',
  surface: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B6B80',
  textMuted: '#9B9BAE',
  textLight: '#6A6A7E',
  error: '#E88B8B',
  inputBackground: '#FFFFFF',
  switchTrack: '#E0E0E8',
  inputBorder: '#E2E2EE',
  inputBorderFocused: '#5B5FE699',
  placeholder: '#B0B0C0',
  buttonPrimary: '#1A1A2E',
  buttonText: '#FFFFFF',
  link: '#5B5FE6',
  overlay: 'rgba(0,0,0,0.3)',
} as const;

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 30,
} as const;

export const FontSize = {
  xs: rs(12),
  sm: rs(14),
  md: rs(16),
  lg: rs(20),
  xl: rs(28),
  xxl: rs(34),
};

export const Fonts = {
  thin: 'Sora-Thin',
  extraLight: 'Sora-ExtraLight',
  light: 'Sora-Light',
  regular: 'Sora-Regular',
  medium: 'Sora-Medium',
  semiBold: 'Sora-SemiBold',
  bold: 'Sora-Bold',
  extraBold: 'Sora-ExtraBold',
} as const;

export const IconSize = {
  xxs: rs(12),
  xs: rs(16),
  sm: rs(18),
  md: rs(20),
  lg: rs(24),
  xl: rs(28),
  xxl: rs(32),
};

export const Opacity = {
  active: 0.8,
  disabled: 0.6,
} as const;

// palette for user-generated categories and custom app theme
export const Palette = [
  '#C1E1C1',
  '#F0A8A8',
  '#C8C8F4',
  '#FFBE98',
  '#A8D8EA',
  '#F5D76E',
  '#F0C8A8',
  '#C8E0E0',
  '#F4B4C4',
  '#A8C8E8',
  '#D4B8E0',
  '#E8C8C8',
] as const;

export const Shadow = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
} as const;
