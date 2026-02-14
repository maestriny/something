import { useEffect } from 'react';
import { useRouter, useSegments, useNavigationContainerRef } from 'expo-router';
import { useAuthStore } from '@/stores/auth';
import { useWaveTransition } from '@/providers/waveTransition';
import { Routes, RouteGroups } from '@/constants/routes';

export function useAuthGuard(isInitialized: boolean) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const transition = useWaveTransition();
  const segments = useSegments();
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (!isInitialized || !navigationRef.isReady()) return;
    if (transition.isTransitioning) return;

    const inAuthGroup = segments[0] === RouteGroups.auth;

    if (!isAuthenticated && !inAuthGroup) {
      router.replace(Routes.auth.login);
    } else if (isAuthenticated && inAuthGroup) {
      // delay to let startTransition set the ref before redirecting
      setTimeout(() => {
        if (!transition.isTransitioning) {
          router.replace(Routes.app.home);
        }
      }, 100);
    }
  }, [isAuthenticated, isInitialized, segments, router, navigationRef, transition]);
}
