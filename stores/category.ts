import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto';
import type { Category } from '@/types/category';
import { DEFAULT_CATEGORIES } from '@/constants/categories';
import { useTodoStore } from '@/stores/todo';
import { useSyncStore } from '@/stores/sync';

interface CategoryState {
  categories: Category[];
}

interface CategoryActions {
  addCategory: (category: Omit<Category, 'id' | 'is_default' | 'updated_at'>) => string;
  updateCategory: (id: string, updates: Partial<Pick<Category, 'name' | 'icon' | 'color'>>) => void;
  removeCategory: (id: string) => void;
  _replace: (categories: Category[]) => void;
}

type CategoryStore = CategoryState & CategoryActions;

export const useCategoryStore = create<CategoryStore>()(
  persist(
    set => ({
      categories: DEFAULT_CATEGORIES,

      addCategory: category => {
        const now = new Date().toISOString();
        const id = randomUUID();
        set(state => ({
          categories: [
            ...state.categories,
            { ...category, id, is_default: false, updated_at: now },
          ],
        }));
        return id;
      },

      updateCategory: (id, updates) => {
        const now = new Date().toISOString();
        set(state => ({
          categories: state.categories.map(cat =>
            cat.id === id ? { ...cat, ...updates, updated_at: now } : cat,
          ),
        }));
      },

      removeCategory: id => {
        set(state => {
          const category = state.categories.find(cat => cat.id === id);
          if (!category || category.is_default) return state;
          useTodoStore.getState().clearCategory(id);
          useSyncStore.getState().addPendingDelete('category', id);
          return { categories: state.categories.filter(cat => cat.id !== id) };
        });
      },

      _replace: categories => set({ categories }),
    }),
    {
      name: 'category-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
