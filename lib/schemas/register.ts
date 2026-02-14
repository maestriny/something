import { z } from 'zod';
import type { TFunction } from 'i18next';
import { USERNAME_REGEX, USERNAME_MAX_LENGTH, EMAIL_REGEX, PASSWORD_REGEX } from '@/lib/utils';

export function createRegisterSchema(t: TFunction) {
  return z.object({
    username: z
      .string()
      .min(1, t('register.validation.usernameRequired'))
      .min(3, t('register.validation.usernameMin'))
      .max(USERNAME_MAX_LENGTH, t('register.validation.usernameMax', { max: USERNAME_MAX_LENGTH }))
      .regex(USERNAME_REGEX, t('register.validation.usernamePattern')),
    email: z
      .string()
      .min(1, t('register.validation.emailRequired'))
      .regex(EMAIL_REGEX, t('register.validation.emailInvalid')),
    password: z
      .string()
      .min(1, t('register.validation.passwordRequired'))
      .min(8, t('register.validation.passwordMin'))
      .regex(PASSWORD_REGEX.uppercase, t('register.validation.passwordUppercase'))
      .regex(PASSWORD_REGEX.number, t('register.validation.passwordNumber'))
      .regex(PASSWORD_REGEX.special, t('register.validation.passwordSpecial')),
  });
}

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
