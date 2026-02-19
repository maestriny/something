import { useEffect, useRef, useCallback } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useAuthStore } from '@/stores/auth';
import { syncAll, setupMutationSync } from '@/lib/sync/engine';

export function useSync() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const isInitialized = useAuthStore(s => s.isInitialized);
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const triggerSync = useCallback(() => {
    if (!isAuthenticated) return;
    syncAll();
  }, [isAuthenticated]);

  // sync on login / app start
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      triggerSync();
    }
  }, [isInitialized, isAuthenticated, triggerSync]);

  // sync on app resume from background
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (next: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && next === 'active') {
        triggerSync();
      }
      appState.current = next;
    });
    return () => subscription.remove();
  }, [triggerSync]);

  // sync on network reconnection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        triggerSync();
      }
    });
    return () => unsubscribe();
  }, [triggerSync]);

  // debounced sync after local mutations
  useEffect(() => {
    if (!isAuthenticated) return;
    return setupMutationSync();
  }, [isAuthenticated]);
}
