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
    settings: '/(app)/settings',
    completed: '/(app)/completed',
    todoDetail: '/(app)/todo-detail',
  },
} as const;
