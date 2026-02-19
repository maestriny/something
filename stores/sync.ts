import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SyncState {
  lastSyncedAt: string | null;
  isSyncing: boolean;
  todoDeleteQueue: string[];
  categoryDeleteQueue: string[];
}

interface SyncActions {
  setSyncing: (syncing: boolean) => void;
  setLastSyncedAt: (timestamp: string) => void;
  addPendingDelete: (type: 'todo' | 'category', id: string) => void;
  clearDeleteQueues: () => void;
  reset: () => void;
}

type SyncStore = SyncState & SyncActions;

const initialState: SyncState = {
  lastSyncedAt: null,
  isSyncing: false,
  todoDeleteQueue: [],
  categoryDeleteQueue: [],
};

export const useSyncStore = create<SyncStore>()(
  persist(
    set => ({
      ...initialState,

      setSyncing: syncing => set({ isSyncing: syncing }),

      // store last successful sync time to calculate deltas for next sync
      setLastSyncedAt: timestamp => set({ lastSyncedAt: timestamp }),

      // queue deleted item ids to be hard deleted from remote on next sync
      addPendingDelete: (type, id) =>
        set(state =>
          type === 'todo'
            ? { todoDeleteQueue: [...state.todoDeleteQueue, id] }
            : { categoryDeleteQueue: [...state.categoryDeleteQueue, id] },
        ),

      clearDeleteQueues: () => set({ todoDeleteQueue: [], categoryDeleteQueue: [] }),

      reset: () => set(initialState),
    }),
    {
      name: 'sync-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ lastSyncedAt, todoDeleteQueue, categoryDeleteQueue }) => ({
        lastSyncedAt,
        todoDeleteQueue,
        categoryDeleteQueue,
      }),
    },
  ),
);
