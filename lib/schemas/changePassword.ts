import { z } from 'zod';
import type { TFunction } from 'i18next';
import { PASSWORD_REGEX } from '@/lib/utils';

export function createChangePasswordSchema(t: TFunction) {
  return z
    .object({
      currentPassword: z
        .string()
        .min(1, t('settings.changePassword.validation.currentPasswordRequired')),
      newPassword: z
        .string()
        .min(1, t('settings.changePassword.validation.newPasswordRequired'))
        .min(8, t('settings.changePassword.validation.newPasswordMin'))
        .regex(
          PASSWORD_REGEX.uppercase,
          t('settings.changePassword.validation.newPasswordUppercase'),
        )
        .regex(PASSWORD_REGEX.number, t('settings.changePassword.validation.newPasswordNumber'))
        .regex(PASSWORD_REGEX.special, t('settings.changePassword.validation.newPasswordSpecial')),
      confirmPassword: z
        .string()
        .min(1, t('settings.changePassword.validation.confirmPasswordRequired')),
    })
    .refine(data => data.newPassword !== data.currentPassword, {
      message: t('settings.changePassword.validation.newPasswordSameAsCurrent'),
      path: ['newPassword'],
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: t('settings.changePassword.validation.confirmPasswordMismatch'),
      path: ['confirmPassword'],
    });
}

export type ChangePasswordFormData = z.infer<ReturnType<typeof createChangePasswordSchema>>;
