import dayjs from '@/lib/dayjs';
import { URGENT_THRESHOLD_DAYS } from '@/constants/notifications';
import type { Todo } from '@/types/todo';

export const USERNAME_REGEX = /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/;
export const USERNAME_MAX_LENGTH = 20;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REGEX = {
  uppercase: /[A-Z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
} as const;

export function isUrgent(todo: Todo): boolean {
  return (
    todo.due_date !== null &&
    !todo.done &&
    dayjs(todo.due_date).diff(dayjs(), 'day') <= URGENT_THRESHOLD_DAYS
  );
}

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '';
  const [first, second] = trimmed.split(/\s+/);
  const initials = second ? first[0] + second[0] : first[0];
  return initials.toUpperCase();
}

export function darkenHex(hex: string, amount = 0.15): string {
  const n = parseInt(hex.replace('#', '').slice(0, 6), 16);
  const r = Math.max(0, Math.round(((n >> 16) & 0xff) * (1 - amount)));
  const g = Math.max(0, Math.round(((n >> 8) & 0xff) * (1 - amount)));
  const b = Math.max(0, Math.round((n & 0xff) * (1 - amount)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function lightenHex(hex: string, amount = 0.25): string {
  const n = parseInt(hex.replace('#', '').slice(0, 6), 16);
  const r = Math.min(255, Math.round(((n >> 16) & 0xff) + (255 - ((n >> 16) & 0xff)) * amount));
  const g = Math.min(255, Math.round(((n >> 8) & 0xff) + (255 - ((n >> 8) & 0xff)) * amount));
  const b = Math.min(255, Math.round((n & 0xff) + (255 - (n & 0xff)) * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function setOpacity(hex: string, opacity: number): string {
  const base = hex.replace('#', '').slice(0, 6);
  const alphaHex = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${base}${alphaHex}`;
}

// parse timestamp to ms for safe comparison (handles both "Z" and "+00:00" formats)
export function toMs(timestamp: string): number {
  return new Date(timestamp).getTime();
}
