export const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;
export const USERNAME_MAX_LENGTH = 20;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_REGEX = {
  uppercase: /[A-Z]/,
  special: /[^A-Za-z0-9]/,
} as const;
