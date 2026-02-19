import type { CategoryIconName } from '@/constants/categories';

export type Category = {
  id: string;
  name: string;
  icon: CategoryIconName;
  color: string;
  is_default: boolean;
  updated_at: string;
};
