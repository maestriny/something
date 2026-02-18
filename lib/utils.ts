export const USERNAME_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9 _-]*[a-zA-Z0-9]$/;
export const USERNAME_MAX_LENGTH = 20;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REGEX = {
  uppercase: /[A-Z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
} as const;

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getInitials(name: string): string {
  const [first, second] = name.trim().split(/\s+/);
  const initials = second ? first[0] + second[0] : first[0];
  return initials.toUpperCase();
}

export function darkenHex(hex: string, amount = 0.15): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.round(((n >> 16) & 0xff) * (1 - amount)));
  const g = Math.max(0, Math.round(((n >> 8) & 0xff) * (1 - amount)));
  const b = Math.max(0, Math.round((n & 0xff) * (1 - amount)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
