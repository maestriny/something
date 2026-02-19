import { useTranslation } from 'react-i18next';
import type { Category } from '@/types/category';

// returns a function that generates a label for a category, translating the name if it's a default category.
export function useCategoryLabel() {
  const { t } = useTranslation();
  return (category: Category) =>
    category.is_default ? (t as (k: string) => string)(category.name) : category.name;
}
