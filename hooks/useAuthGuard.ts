import { useEffect } from 'react';
import { useRouter, useSegments, useNavigationContainerRef } from 'expo-router';
import { useAuthStore } from '../stores/auth';
import { useWaveTransition } from '../providers/waveTransition';
import { Routes, RouteGroups } from '../constants/routes';

export function useAuthGuard(isInitialized: boolean) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const { isTransitioning } = useWaveTransition();
  const segments = useSegments();
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (!isInitialized || !navigationRef.isReady()) return;
    if (isTransitioning) return;

    const inAuthGroup = segments[0] === RouteGroups.auth;

    if (!isAuthenticated && !inAuthGroup) {
      router.replace(Routes.auth.login);
    }
  }, [isAuthenticated, isInitialized, segments, router, navigationRef, isTransitioning]);
}
