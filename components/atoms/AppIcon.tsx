import type { ComponentType } from 'react';
import { IconSize } from '@/constants/theme';
import {
  IconArrowLeft,
  IconBolt,
  IconBook,
  IconBriefcase,
  IconCalendar,
  IconCar,
  IconCash,
  IconChevronDown,
  IconChevronUp,
  IconCoffee,
  IconDeviceGamepad2,
  IconDeviceLaptop,
  IconEye,
  IconEyeClosed,
  IconFlame,
  IconGift,
  IconHeart,
  IconHome,
  IconLeaf,
  IconListCheck,
  IconMusic,
  IconPalette,
  IconPaw,
  IconPencil,
  IconPill,
  IconPlane,
  IconPlus,
  IconRun,
  IconSettingsFilled,
  IconShoppingBag,
  IconShoppingCart,
  IconStar,
  IconTag,
  IconTrash,
  IconUser,
  IconX,
} from '@tabler/icons-react-native';

type IconComponent = ComponentType<{ size: number; color: string; strokeWidth?: number }>;

const ICONS = {
  IconArrowLeft,
  IconBolt,
  IconBook,
  IconBriefcase,
  IconCalendar,
  IconCar,
  IconCash,
  IconChevronDown,
  IconChevronUp,
  IconCoffee,
  IconDeviceGamepad2,
  IconDeviceLaptop,
  IconEye,
  IconEyeClosed,
  IconFlame,
  IconGift,
  IconHeart,
  IconHome,
  IconLeaf,
  IconListCheck,
  IconMusic,
  IconPalette,
  IconPaw,
  IconPencil,
  IconPill,
  IconPlane,
  IconPlus,
  IconRun,
  IconSettingsFilled,
  IconShoppingBag,
  IconShoppingCart,
  IconStar,
  IconTag,
  IconTrash,
  IconUser,
  IconX,
} as const satisfies Record<string, IconComponent>;

export type IconName = keyof typeof ICONS;

interface AppIconProps {
  name: IconName;
  size?: number;
  color: string;
  strokeWidth?: number;
}

export function AppIcon({ name, size = IconSize.md, color, strokeWidth }: AppIconProps) {
  const Icon = ICONS[name];
  return <Icon size={size} color={color} strokeWidth={strokeWidth} />;
}
