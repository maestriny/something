import { z } from 'zod';
import type { TFunction } from 'i18next';
import { USERNAME_REGEX, USERNAME_MAX_LENGTH, EMAIL_REGEX } from '@/lib/utils';

export function createAccountInfoSchema(t: TFunction) {
  return z.object({
    username: z
      .string()
      .min(1, t('settings.accountInfo.validation.usernameRequired'))
      .min(3, t('settings.accountInfo.validation.usernameMin'))
      .max(
        USERNAME_MAX_LENGTH,
        t('settings.accountInfo.validation.usernameMax', { max: USERNAME_MAX_LENGTH }),
      )
      .regex(USERNAME_REGEX, t('settings.accountInfo.validation.usernamePattern')),
    email: z
      .string()
      .min(1, t('settings.accountInfo.validation.emailRequired'))
      .regex(EMAIL_REGEX, t('settings.accountInfo.validation.emailInvalid')),
  });
}

export type AccountInfoFormData = z.infer<ReturnType<typeof createAccountInfoSchema>>;
