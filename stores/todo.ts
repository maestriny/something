import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Todo } from '../types/todo';

interface TodoState {
  todos: Todo[];
}

interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

type TodoStore = TodoState & TodoActions;

export const useTodoStore = create<TodoStore>()(
  persist(
    set => ({
      todos: [],

      addTodo: text => {
        const todo: Todo = {
          id: Date.now().toString(),
          text,
          done: false,
        };
        set(state => ({ todos: [todo, ...state.todos] }));
      },

      // move toggled item to the front so the most recent action always appears first
      toggleTodo: id => {
        set(state => {
          const todo = state.todos.find(t => t.id === id);
          if (!todo) return state;
          const rest = state.todos.filter(t => t.id !== id);
          return { todos: [{ ...todo, done: !todo.done }, ...rest] };
        });
      },

      removeTodo: id => {
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id),
        }));
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
