import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationState {
  enabled: boolean;
}

interface NotificationActions {
  setEnabled: (enabled: boolean) => void;
}

type NotificationStore = NotificationState & NotificationActions;

export const useNotificationStore = create<NotificationStore>()(
  persist(
    set => ({
      enabled: true,

      setEnabled: (enabled: boolean) => set({ enabled }),
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
