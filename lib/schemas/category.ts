import { z } from 'zod';
import { CATEGORY_ICON_NAMES } from '@/constants/categories';

export const categorySchema = z.object({
  name: z.string().min(2).max(20),
  icon: z.enum(CATEGORY_ICON_NAMES),
  color: z.string(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
