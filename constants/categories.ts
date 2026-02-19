import type { Category } from '@/types/category';
import { Palette } from '@/constants/theme';

export const CATEGORY_ICON_NAMES = [
  'IconStar',
  'IconShoppingCart',
  'IconBriefcase',
  'IconBook',
  'IconShoppingBag',
  'IconHeart',
  'IconHome',
  'IconLeaf',
  'IconRun',
  'IconMusic',
  'IconCash',
  'IconPaw',
  'IconPlane',
  'IconCar',
  'IconDeviceGamepad2',
  'IconPalette',
  'IconDeviceLaptop',
  'IconGift',
  'IconPill',
  'IconCoffee',
  'IconUser',
  'IconPencil',
  'IconFlame',
  'IconBolt',
] as const;

export type CategoryIconName = (typeof CATEGORY_ICON_NAMES)[number];

// fixed updated_at for default categories so they don't get treated as new/updated items on every sync
const DEFAULT_UPDATED_AT = '2025-01-01T00:00:00.000Z';

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'cat-grocery',
    name: 'categories.default.grocery',
    icon: 'IconShoppingCart',
    color: Palette[0],
    is_default: true,
    updated_at: DEFAULT_UPDATED_AT,
  },
  {
    id: 'cat-work',
    name: 'categories.default.work',
    icon: 'IconBriefcase',
    color: Palette[4],
    is_default: true,
    updated_at: DEFAULT_UPDATED_AT,
  },
  {
    id: 'cat-study',
    name: 'categories.default.study',
    icon: 'IconBook',
    color: Palette[2],
    is_default: true,
    updated_at: DEFAULT_UPDATED_AT,
  },
  {
    id: 'cat-shopping',
    name: 'categories.default.shopping',
    icon: 'IconShoppingBag',
    color: Palette[3],
    is_default: true,
    updated_at: DEFAULT_UPDATED_AT,
  },
  {
    id: 'cat-home',
    name: 'categories.default.home',
    icon: 'IconHome',
    color: Palette[5],
    is_default: true,
    updated_at: DEFAULT_UPDATED_AT,
  },
  {
    id: 'cat-health',
    name: 'categories.default.health',
    icon: 'IconHeart',
    color: Palette[8],
    is_default: true,
    updated_at: DEFAULT_UPDATED_AT,
  },
  {
    id: 'cat-personal',
    name: 'categories.default.personal',
    icon: 'IconUser',
    color: Palette[10],
    is_default: true,
    updated_at: DEFAULT_UPDATED_AT,
  },
  {
    id: 'cat-fitness',
    name: 'categories.default.fitness',
    icon: 'IconRun',
    color: Palette[7],
    is_default: true,
    updated_at: DEFAULT_UPDATED_AT,
  },
];
