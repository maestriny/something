const en = {
  common: {
    oops: 'Oops',
    somethingWentWrong: 'Something went wrong',
    emailAlreadyExists: 'An account with this email already exists',
    saveFailed: 'Something went wrong while saving. Please try again.',
    generalError: 'Something went wrong. Please try again.',
  },
  login: {
    heading: 'Welcome back',
    subheading: 'Sign in to continue',
    labels: {
      email: 'Email',
      password: 'Password',
    },
    placeholders: {
      email: 'your@email.com',
      password: 'Your password',
    },
    button: 'Sign In',
    prompt: {
      message: "Don't have an account?",
      action: 'Sign Up',
    },
    validation: {
      emailRequired: 'Please enter your email',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Please enter a password',
    },
    toast: {
      errorMessage: "Hmm, that didn't work",
      errorDescription: 'Check your email and password.',
      successMessage: 'Welcome back!',
      successDescription: 'Good to see you, {{username}}.',
    },
  },
  register: {
    heading: 'Create account',
    subheading: "Let's get you started",
    labels: {
      username: 'Username',
      email: 'Email',
      password: 'Password',
    },
    placeholders: {
      username: 'What should we call you?',
      email: 'your@email.com',
      password: 'At least 8 characters',
    },
    button: 'Get started',
    prompt: {
      message: 'Already have an account?',
      action: 'Sign In',
    },
    validation: {
      usernameRequired: 'Please enter a username',
      usernameMin: 'Username should be at least 3 characters',
      usernameMax: "Username can't exceed {{max}} characters",
      usernamePattern: 'Only letters, numbers, underscores and hyphens',
      emailRequired: 'Please enter your email',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Please enter a password',
      passwordMin: 'Password should be at least 8 characters',
      passwordUppercase: 'Password needs at least one uppercase letter',
      passwordSpecial: 'Password needs at least one special character',
    },
    toast: {
      successMessage: "You're all set!",
      successDescription: 'Your account has been created.',
    },
  },
  input: {
    passwordHint: 'Password field, input is hidden',
    hidePassword: 'Hide password',
    showPassword: 'Show password',
  },
} as const;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export default en;
export type Translations = DeepStringify<typeof en>;
