import { useEffect } from 'react';
import { useRouter, useSegments, useNavigationContainerRef } from 'expo-router';
import { useAuthStore } from '../stores/auth';
import { Routes, RouteGroups } from '../constants/routes';

export function useAuthGuard(isInitialized: boolean) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const segments = useSegments();
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (!isInitialized || !navigationRef.isReady()) return;

    const inAuthGroup = segments[0] === RouteGroups.auth;

    if (isAuthenticated && inAuthGroup) {
      router.replace(Routes.app.home);
    } else if (!isAuthenticated && !inAuthGroup) {
      router.replace(Routes.auth.login);
    }
  }, [isAuthenticated, isInitialized, segments, router, navigationRef]);
}
