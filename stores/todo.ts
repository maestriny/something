import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto';
import type { Todo } from '@/types/todo';
import { useSyncStore } from '@/stores/sync';

interface TodoState {
  todos: Todo[];
}

interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (
    id: string,
    updates: Partial<Pick<Todo, 'text' | 'due_date' | 'category_id'>>,
  ) => void;
  reorderTodos: (orderedIds: string[]) => void;
  clearCategory: (categoryId: string) => void;
  _replace: (todos: Todo[]) => void;
}

type TodoStore = TodoState & TodoActions;

// calculate order to place new or toggled items at the front of the list
function getFirst(todos: Todo[]): number {
  return todos.reduce((min, todo) => (!todo.done ? Math.min(min, todo.order) : min), 0) - 1;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    set => ({
      todos: [],

      addTodo: text => {
        const now = new Date().toISOString();
        set(state => {
          const todo: Todo = {
            id: randomUUID(),
            text,
            done: false,
            created_at: now,
            due_date: null,
            category_id: null,
            order: getFirst(state.todos),
            updated_at: now,
          };
          return { todos: [todo, ...state.todos] };
        });
      },

      toggleTodo: id => {
        const now = new Date().toISOString();
        set(state => {
          // move toggled item to the front so the most recent action always appears first
          const todo = state.todos.find(t => t.id === id);
          if (!todo) return state;
          const rest = state.todos.filter(t => t.id !== id);
          const toggled = { ...todo, done: !todo.done, updated_at: now };
          if (!toggled.done) {
            toggled.order = getFirst(rest);
          }
          return { todos: [toggled, ...rest] };
        });
      },

      removeTodo: id => {
        useSyncStore.getState().addPendingDelete('todo', id);
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id),
        }));
      },

      updateTodo: (id, updates) => {
        const now = new Date().toISOString();
        set(state => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, ...updates, updated_at: now } : todo,
          ),
        }));
      },

      reorderTodos: orderedIds => {
        const now = new Date().toISOString();
        set(state => ({
          todos: state.todos.map(todo => {
            const newOrder = orderedIds.indexOf(todo.id);
            return newOrder !== -1 ? { ...todo, order: newOrder, updated_at: now } : todo;
          }),
        }));
      },

      clearCategory: categoryId => {
        const now = new Date().toISOString();
        set(state => ({
          todos: state.todos.map(todo =>
            todo.category_id === categoryId
              ? { ...todo, category_id: null, updated_at: now }
              : todo,
          ),
        }));
      },

      _replace: todos => set({ todos }),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
