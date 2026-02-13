// mapping of supabase error messages to our internal keys for i18n
// could be done better? maybe

const SUPABASE_ERRORS = {
  'Invalid login credentials': 'invalidCredentials',
  'Email not confirmed': 'emailNotConfirmed',
  'User already registered': 'userAlreadyRegistered',
  'Email rate limit exceeded': 'rateLimited',
  'Request rate limit reached': 'rateLimited',
  'For security purposes, you can only request this once every 60 seconds': 'rateLimited',
  'Password should be at least 6 characters': 'weakPassword',
  'User banned': 'userBanned',
  'Auth session missing': 'sessionExpired',
  'Invalid Refresh Token: Refresh Token Not Found': 'sessionExpired',
} as const;

type AuthErrorKey = (typeof SUPABASE_ERRORS)[keyof typeof SUPABASE_ERRORS] | 'defaultError';

function resolveKey(error: unknown): AuthErrorKey {
  if (error instanceof Error) {
    return SUPABASE_ERRORS[error.message as keyof typeof SUPABASE_ERRORS] ?? 'defaultError';
  }
  return 'defaultError';
}

export function getAuthError(error: unknown): {
  title: `authErrors.${AuthErrorKey}.title`;
  description: `authErrors.${AuthErrorKey}.description`;
} {
  const key = resolveKey(error);
  return {
    title: `authErrors.${key}.title`,
    description: `authErrors.${key}.description`,
  };
}
