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

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'cat-grocery',
    name: 'categories.default.grocery',
    icon: 'IconShoppingCart',
    color: Palette[0],
    isDefault: true,
  },
  {
    id: 'cat-work',
    name: 'categories.default.work',
    icon: 'IconBriefcase',
    color: Palette[4],
    isDefault: true,
  },
  {
    id: 'cat-study',
    name: 'categories.default.study',
    icon: 'IconBook',
    color: Palette[2],
    isDefault: true,
  },
  {
    id: 'cat-shopping',
    name: 'categories.default.shopping',
    icon: 'IconShoppingBag',
    color: Palette[3],
    isDefault: true,
  },
  {
    id: 'cat-home',
    name: 'categories.default.home',
    icon: 'IconHome',
    color: Palette[5],
    isDefault: true,
  },
  {
    id: 'cat-health',
    name: 'categories.default.health',
    icon: 'IconHeart',
    color: Palette[8],
    isDefault: true,
  },
  {
    id: 'cat-personal',
    name: 'categories.default.personal',
    icon: 'IconUser',
    color: Palette[10],
    isDefault: true,
  },
  {
    id: 'cat-fitness',
    name: 'categories.default.fitness',
    icon: 'IconRun',
    color: Palette[7],
    isDefault: true,
  },
];
