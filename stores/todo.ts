import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Todo } from '@/types/todo';

interface TodoState {
  todos: Todo[];
}

interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Pick<Todo, 'text' | 'dueDate' | 'categoryId'>>) => void;
  reorderTodos: (orderedIds: string[]) => void;
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
            id: Date.now().toString(),
            text,
            done: false,
            createdAt: now,
            order: getFirst(state.todos),
          };
          return { todos: [todo, ...state.todos] };
        });
      },

      toggleTodo: id => {
        set(state => {
          // move toggled item to the front so the most recent action always appears first
          const todo = state.todos.find(t => t.id === id);
          if (!todo) return state;
          const rest = state.todos.filter(t => t.id !== id);
          const toggled = { ...todo, done: !todo.done };
          // done->active
          if (!toggled.done) {
            toggled.order = getFirst(rest);
          }
          // active->done
          return { todos: [toggled, ...rest] };
        });
      },

      removeTodo: id => {
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id),
        }));
      },

      updateTodo: (id, updates) => {
        set(state => ({
          todos: state.todos.map(todo => (todo.id === id ? { ...todo, ...updates } : todo)),
        }));
      },

      reorderTodos: orderedIds => {
        set(state => ({
          todos: state.todos.map(todo => {
            const newOrder = orderedIds.indexOf(todo.id);
            return newOrder !== -1 ? { ...todo, order: newOrder } : todo;
          }),
        }));
      },
    }),
    {
      name: 'todo-storage',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
