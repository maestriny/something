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
  error: '#E88B8B',
  inputBackground: '#FFFFFF',
  inputBorder: '#E2E2EE',
  inputBorderFocused: '#5B5FE699',
  placeholder: '#B0B0C0',
  buttonPrimary: '#1A1A2E',
  buttonText: '#FFFFFF',
  link: '#5B5FE6',
} as const;

export const Spacing = {
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
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 34,
} as const;

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
  sm: 20,
  md: 24,
  lg: 28,
} as const;

export const Opacity = {
  active: 0.8,
  disabled: 0.6,
} as const;

export const Shadow = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
} as const;
