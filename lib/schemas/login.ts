import { z } from 'zod';
import type { TFunction } from 'i18next';
import { EMAIL_REGEX } from '@/lib/utils';

export function createLoginSchema(t: TFunction) {
  return z.object({
    email: z
      .string()
      .min(1, t('login.validation.emailRequired'))
      .regex(EMAIL_REGEX, t('login.validation.emailInvalid')),
    password: z.string().min(1, t('login.validation.passwordRequired')),
  });
}

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
