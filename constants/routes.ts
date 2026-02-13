export const RouteGroups = {
  auth: '(auth)',
  app: '(app)',
} as const;

export const Routes = {
  auth: {
    login: '/(auth)/login',
    register: '/(auth)/register',
  },
  app: {
    home: '/(app)/home',
  },
} as const;
