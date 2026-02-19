// color schemes for light and dark modes

const light = {
  primary: '#5B5FE6',
  green: '#C1E1C1',
  waveTop: '#C8C8F4',
  waveBottom: '#FFBE98',
  background: '#F7F7FB',
  surface: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B6B80',
  textMuted: '#9B9BAE',
  error: '#E88B8B',
  inputBackground: '#FFFFFF',
  switchTrack: '#E0E0E8',
  inputBorder: '#E2E2EE',
  inputBorderFocused: '#5B5FE699',
  placeholder: '#B0B0C0',
  buttonPrimary: '#1A1A2E',
  buttonText: '#FFFFFF',
  toastText: '#1A1A2E',
  link: '#5B5FE6',
  overlay: 'rgba(0,0,0,0.3)',
};

export type ThemeColors = typeof light;

const dark: ThemeColors = {
  primary: '#7B7FFF',
  green: '#7DAE7D',
  waveTop: '#2A2C5E',
  waveBottom: '#2A2C5E',
  background: '#1A1A2E',
  surface: '#252540',
  textPrimary: '#E8E8F0',
  textSecondary: '#A0A0B8',
  textMuted: '#6B6B80',
  error: '#D47A7A',
  inputBackground: '#2A2A48',
  switchTrack: '#3A3A55',
  inputBorder: '#3A3A55',
  inputBorderFocused: '#7B7FFF99',
  placeholder: '#5A5A72',
  buttonPrimary: '#E8E8F0',
  buttonText: '#1A1A2E',
  toastText: '#FFFFFF',
  link: '#7B7FFF',
  overlay: 'rgba(0,0,0,0.5)',
};

export const colorSchemes = { light, dark } as const;
