import { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import { useNotificationStore } from '@/stores/notification';
import { useTodoStore } from '@/stores/todo';
import { useLanguageStore } from '@/stores/language';
import { RESCHEDULE_DEBOUNCE_MS } from '@/constants/notifications';
import {
  configureNotificationHandler,
  setupAndroidChannels,
  scheduleAllNotifications,
  cancelAllNotifications,
} from '@/lib/notifications';

// manages the full notification lifecycle: setup, permissions, scheduling, and cleanup
export function useNotifications(): void {
  const enabled = useNotificationStore(s => s.enabled);
  const hasHydrated = useNotificationStore(s => s.hasHydrated);
  const todos = useTodoStore(s => s.todos);
  const language = useLanguageStore(s => s.language);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enabledRef = useRef(enabled);

  // configures the notification handler, creates Android channels, and reschedules notifications when the app comes back to foreground
  useEffect(() => {
    configureNotificationHandler();
    void setupAndroidChannels();

    const appState = { current: AppState.currentState };
    const subscription = AppState.addEventListener('change', (next: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && next === 'active') {
        if (!enabledRef.current) return;
        const currentTodos = useTodoStore.getState().todos;
        void scheduleAllNotifications(currentTodos);
      }
      appState.current = next;
    });

    return () => subscription.remove();
  }, []);

  // reacts to the notification toggle: cancels everything when off, requests permissions and schedules when on
  useEffect(() => {
    if (!hasHydrated) return;
    enabledRef.current = enabled;

    if (!enabled) {
      void cancelAllNotifications();
      return;
    }

    const currentTodos = useTodoStore.getState().todos;
    void scheduleAllNotifications(currentTodos).then(granted => {
      if (!granted) useNotificationStore.getState().setEnabled(false);
    });
  }, [enabled, hasHydrated]);

  // reschedules after todo or language changes, debounced to avoid redundant calls when multiple todos change in quick succession
  useEffect(() => {
    if (!hasHydrated) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (!enabledRef.current) return;
      const currentTodos = useTodoStore.getState().todos;
      void scheduleAllNotifications(currentTodos);
    }, RESCHEDULE_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [todos, language, hasHydrated]);
}
