import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Category } from '@/types/category';
import { DEFAULT_CATEGORIES } from '@/constants/categories';

interface CategoryState {
  categories: Category[];
}

interface CategoryActions {
  addCategory: (category: Omit<Category, 'id' | 'isDefault'>) => string;
  updateCategory: (id: string, updates: Partial<Pick<Category, 'name' | 'icon' | 'color'>>) => void;
  removeCategory: (id: string) => void;
}

type CategoryStore = CategoryState & CategoryActions;

export const useCategoryStore = create<CategoryStore>()(
  persist(
    set => ({
      categories: DEFAULT_CATEGORIES,

      addCategory: category => {
        const id = Date.now().toString();
        set(state => ({
          categories: [...state.categories, { ...category, id, isDefault: false }],
        }));
        return id;
      },

      updateCategory: (id, updates) => {
        set(state => ({
          categories: state.categories.map(cat => (cat.id === id ? { ...cat, ...updates } : cat)),
        }));
      },

      removeCategory: id => {
        set(state => {
          const category = state.categories.find(cat => cat.id === id);
          if (!category || category.isDefault) return state;
          return { categories: state.categories.filter(cat => cat.id !== id) };
        });
      },
    }),
    {
      name: 'category-storage',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
