import { createContext, useContext, useMemo, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import { useSharedValue, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { WavesDuration } from '../constants/waves';

interface WaveTransitionContextValue {
  coverProgress: SharedValue<number>;
  isTransitioning: boolean;
  startTransition: (router: { replace: (href: string) => void }, destination: string) => void;
}

const WaveTransitionContext = createContext<WaveTransitionContextValue | null>(null);

export function WaveTransitionProvider({ children }: { children: ReactNode }) {
  const coverProgress = useSharedValue(0);
  const isTransitioningRef = useRef(false);
  const routerRef = useRef<{ replace: (href: string) => void } | null>(null);
  const destinationRef = useRef('');

  const markDone = useCallback(() => {
    isTransitioningRef.current = false;
  }, []);

  const startReveal = useCallback(() => {
    coverProgress.value = withTiming(
      0,
      {
        duration: WavesDuration.reveal,
        easing: Easing.inOut(Easing.cubic),
      },
      finished => {
        if (finished) {
          runOnJS(markDone)();
        }
      },
    );
  }, [coverProgress, markDone]);

  const navigateAndReveal = useCallback(() => {
    routerRef.current?.replace(destinationRef.current);
    setTimeout(startReveal, WavesDuration.hold);
  }, [startReveal]);

  const startTransition = useCallback(
    (router: { replace: (href: string) => void }, destination: string) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      routerRef.current = router;
      destinationRef.current = destination;

      coverProgress.value = withTiming(
        1,
        {
          duration: WavesDuration.cover,
          easing: Easing.out(Easing.cubic),
        },
        finished => {
          if (finished) {
            runOnJS(navigateAndReveal)();
          }
        },
      );
    },
    [coverProgress, navigateAndReveal],
  );

  const value = useMemo<WaveTransitionContextValue>(
    () => ({
      coverProgress,
      get isTransitioning() {
        return isTransitioningRef.current;
      },
      startTransition,
    }),
    [coverProgress, startTransition],
  );

  return <WaveTransitionContext.Provider value={value}>{children}</WaveTransitionContext.Provider>;
}

export function useWaveTransition(): WaveTransitionContextValue {
  const ctx = useContext(WaveTransitionContext);
  if (!ctx) {
    throw new Error('useWaveTransition must be used within WaveTransitionProvider');
  }
  return ctx;
}
