import { createContext, useContext, useMemo, useCallback, type ReactNode } from 'react';
import { useColorScheme, type ViewStyle } from 'react-native';
import { useThemeStore } from '@/stores/theme';
import { colorSchemes, type ThemeColors } from '@/constants/colors';

interface ThemeContextValue {
  colors: ThemeColors;
  isDark: boolean;
  shadow: { soft: ViewStyle };
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const preference = useThemeStore(s => s.preference);
  const setPreference = useThemeStore(s => s.setPreference);

  const isDark = preference === 'system' ? systemScheme === 'dark' : preference === 'dark';

  const colors = isDark ? colorSchemes.dark : colorSchemes.light;

  const shadow = useMemo(
    () => ({
      soft: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0 : 0.06,
        shadowRadius: 8,
        elevation: isDark ? 0 : 2,
      } as ViewStyle,
    }),
    [isDark],
  );

  const toggleTheme = useCallback(() => {
    setPreference(preference !== 'system' ? 'system' : isDark ? 'light' : 'dark');
  }, [preference, isDark, setPreference]);

  const value = useMemo<ThemeContextValue>(
    () => ({ colors, isDark, shadow, toggleTheme }),
    [colors, isDark, shadow, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
