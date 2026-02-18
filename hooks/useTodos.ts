import { useMemo } from 'react';
import { useTodoStore } from '@/stores/todo';

// returns active todos sorted by display order
export function useActiveTodos() {
  const todos = useTodoStore(s => s.todos);
  return useMemo(() => todos.filter(t => !t.done).sort((a, b) => a.order - b.order), [todos]);
}

// returns completed todos
export function useDoneTodos() {
  const todos = useTodoStore(s => s.todos);
  return useMemo(() => todos.filter(t => t.done), [todos]);
}
