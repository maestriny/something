import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

type AuthScreen = 'login' | 'register';

interface WaveContextValue {
  morphProgress: SharedValue<number>;
  setScreen: (screen: AuthScreen) => void;
}

const WaveContext = createContext<WaveContextValue | null>(null);

export function WaveProvider({ children }: { children: ReactNode }) {
  const morphProgress = useSharedValue(0);

  const value = useMemo<WaveContextValue>(() => ({
    morphProgress,
    setScreen: (screen: AuthScreen) => {
      morphProgress.value = withTiming(screen === 'register' ? 1 : 0, {
        duration: 800,
        easing: Easing.inOut(Easing.cubic),
      });
    },
  }), [morphProgress]);

  return (
    <WaveContext.Provider value={value}>
      {children}
    </WaveContext.Provider>
  );
}

export function useWave(): WaveContextValue {
  const ctx = useContext(WaveContext);
  if (!ctx) {
    throw new Error('useWave must be used within a WaveProvider');
  }
  return ctx;
}
