import * as syncApi from '@/api/sync';
import { useTodoStore } from '@/stores/todo';
import { useCategoryStore } from '@/stores/category';
import { useSyncStore } from '@/stores/sync';
import { useAuthStore } from '@/stores/auth';
import { toMs } from '@/lib/utils';

interface Syncable {
  id: string;
  updated_at: string;
}

interface MergeResult<T> {
  merged: T[];
  toPush: T[];
}

// generic last-write-wins merge
function merge<T extends Syncable>(
  local: T[],
  remote: T[],
  lastSyncedAt: string | null,
  deleteQueue: string[],
): MergeResult<T> {
  const remoteMap = new Map(remote.map(r => [r.id, r]));
  const pendingSet = new Set(deleteQueue);
  const lastSyncMs = lastSyncedAt ? toMs(lastSyncedAt) : null;
  const merged: T[] = [];
  const toPush: T[] = [];

  // process local items
  for (const localItem of local) {
    const remoteItem = remoteMap.get(localItem.id);
    remoteMap.delete(localItem.id);

    if (!remoteItem) {
      // not on the server yet
      if (!lastSyncMs || toMs(localItem.updated_at) > lastSyncMs) {
        // created or edited offline —> push it to the server
        toPush.push(localItem);
        merged.push(localItem);
      }
      // else:  existed before sync but got deleted on another device -> drop it
    } else {
      // both sides have it —> keep the most recent version
      const localMs = toMs(localItem.updated_at);
      const remoteMs = toMs(remoteItem.updated_at);
      if (localMs >= remoteMs) {
        if (localMs > remoteMs) {
          // local is newer —> send it up
          toPush.push(localItem);
        }
        merged.push(localItem);
      } else {
        // remote is newer —> take the server version
        merged.push(remoteItem);
      }
    }
  }

  // remote items not in local
  for (const remoteItem of remoteMap.values()) {
    if (pendingSet.has(remoteItem.id)) {
      continue;
    }
    merged.push(remoteItem);
  }

  return { merged, toPush };
}

export async function syncAll(): Promise<void> {
  const userId = useAuthStore.getState().user?.id;
  if (!userId) return;

  const syncStore = useSyncStore.getState();
  if (syncStore.isSyncing) return;

  syncStore.setSyncing(true);

  try {
    const { lastSyncedAt } = syncStore;

    // pull all remote data
    const [remoteTodos, remoteCategories] = await Promise.all([
      syncApi.pullTodos(),
      syncApi.pullCategories(),
    ]);

    // read current local state + pending deletes RIGHT BEFORE merge
    const { todoDeleteQueue, categoryDeleteQueue } = useSyncStore.getState();

    // merge categories first (todos reference category_id)
    const localCategories = useCategoryStore.getState().categories;
    const catResult = merge(localCategories, remoteCategories, lastSyncedAt, categoryDeleteQueue);
    useCategoryStore.getState()._replace(catResult.merged);

    // merge todos
    const localTodos = useTodoStore.getState().todos;
    const todoResult = merge(localTodos, remoteTodos, lastSyncedAt, todoDeleteQueue);
    useTodoStore.getState()._replace(todoResult.merged);

    // push local changes + delete pending
    await Promise.all([
      syncApi.pushCategories(catResult.toPush, userId),
      syncApi.pushTodos(todoResult.toPush, userId),
      syncApi.deleteCategories(categoryDeleteQueue),
      syncApi.deleteTodos(todoDeleteQueue),
    ]);

    // mark sync complete
    syncStore.clearDeleteQueues();
    syncStore.setLastSyncedAt(new Date().toISOString());
  } catch (error) {
    //eslint-disable-next-line no-console
    console.warn('[sync] failed:', error);
  } finally {
    syncStore.setSyncing(false);
  }
}

// subscribe to store mutations and trigger sync after a debounce
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function setupMutationSync() {
  const debouncedSync = () => {
    // ignore store changes caused by sync itself
    if (useSyncStore.getState().isSyncing) return;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      syncAll();
    }, 2000);
  };

  const unsubTodos = useTodoStore.subscribe(debouncedSync);
  const unsubCategories = useCategoryStore.subscribe(debouncedSync);

  return () => {
    unsubTodos();
    unsubCategories();
    if (debounceTimer) clearTimeout(debounceTimer);
  };
}
