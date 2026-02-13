// map specific error codes from the API to i18n keys for user-friendly error messages
const CODE_MAP = {
  invalid_credentials: 'invalidCredentials',
  email_not_confirmed: 'emailNotConfirmed',
  user_already_exists: 'userAlreadyRegistered',
  over_email_send_rate_limit: 'rateLimited',
  over_request_rate_limit: 'rateLimited',
  weak_password: 'weakPassword',
  user_banned: 'userBanned',
  session_not_found: 'sessionExpired',
  refresh_token_not_found: 'sessionExpired',
} as const;

type AuthErrorKey = (typeof CODE_MAP)[keyof typeof CODE_MAP] | 'defaultError';

function resolveKey(error: unknown): AuthErrorKey {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
  ) {
    return CODE_MAP[error.code as keyof typeof CODE_MAP] ?? 'defaultError';
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
