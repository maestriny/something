import type { CategoryIconName } from '@/constants/categories';

export type Category = {
  id: string;
  name: string;
  icon: CategoryIconName;
  color: string;
  isDefault: boolean;
};
