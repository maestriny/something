const en = {
  common: {
    oops: 'Oops',
    somethingWentWrong: 'Something went wrong',
    emailAlreadyExists: 'An account with this email already exists',
    generalError: 'Something went wrong. Please try again.',
    networkError: 'Unable to connect. Please check your internet connection.',
    logout: 'Sign Out',
    back: 'Go back',
    confirm: 'Confirm',
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
      usernamePattern: 'Only letters, numbers and spaces',
      emailRequired: 'Please enter your email',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Please enter a password',
      passwordMin: 'Password should be at least 8 characters',
      passwordUppercase: 'Password needs at least one uppercase letter',
      passwordNumber: 'Password needs at least one number',
      passwordSpecial: 'Password needs at least one special character',
    },
    toast: {
      successMessage: "You're all set!",
      successDescription: 'Your account has been created.',
    },
  },
  authErrors: {
    emailNotConfirmed: {
      title: 'Check your inbox',
      description: 'Almost there! Confirm your email address to sign in.',
    },
    invalidCredentials: {
      title: "Hmm, that didn't work",
      description: 'Invalid email or password. Please try again.',
    },
    userAlreadyRegistered: {
      title: 'Oops',
      description: 'An account associated with this email already exists.',
    },
    rateLimited: {
      title: 'Slow down',
      description: 'Too many attempts. Please wait a moment and try again.',
    },
    weakPassword: {
      title: 'Weak password',
      description: 'Your password is too short. Please choose a stronger one.',
    },
    userBanned: {
      title: 'Account suspended',
      description: 'This account has been suspended. Contact support for help.',
    },
    sessionExpired: {
      title: 'Session expired',
      description: 'Your session has expired. Please sign in again.',
    },
    defaultError: {
      title: 'Oops',
      description: 'Something went wrong. Please try again.',
    },
  },
  todo: {
    heading: 'To do',
    placeholder: 'Add item',
    add: 'Add',
    completed: 'Done',
    emptyHome: 'Nothing to do yet.\nAdd your first task!',
    emptyCompleted: 'No completed tasks yet.\nYou got this!',
    detail: {
      textPlaceholder: 'What needs to be done?',
      dueDate: 'Due date',
      none: 'None',
      dueDateClear: 'Clear',
      category: 'Category',
      delete: 'Delete task',
      deleteConfirmTitle: 'Delete task?',
      deleteConfirmMessage: 'This action cannot be undone.',
      deleteConfirmYes: 'Delete',
      deleteConfirmNo: 'Cancel',
      today: 'Today',
    },
  },
  categories: {
    namePlaceholder: 'Category name',
    icon: 'Icon',
    color: 'Color',
    save: 'Save',
    cancel: 'Cancel',
    deleteConfirmTitle: 'Delete category?',
    deleteConfirmMessage: 'Tasks using this category will lose their tag.',
    deleteConfirmYes: 'Delete',
    deleteConfirmNo: 'Cancel',
    default: {
      grocery: 'Grocery list',
      work: 'Work',
      study: 'Study',
      shopping: 'Shopping',
      health: 'Health',
      home: 'Home',
      personal: 'Personal',
      fitness: 'Fitness',
    },
  },
  settings: {
    heading: 'Settings',
    accountInfo: {
      label: 'Account',
      heading: 'Account',
      subheading: "Here's what we know about you",
      labels: {
        username: 'Username',
        email: 'Email',
      },
      placeholders: {
        username: 'Your username',
        email: 'your@email.com',
      },
      validation: {
        usernameRequired: 'Please enter a username',
        usernameMin: 'Username should be at least 3 characters',
        usernameMax: "Username can't exceed {{max}} characters",
        usernamePattern: 'Only letters, numbers and spaces',
        emailRequired: 'Please enter your email',
        emailInvalid: 'Please enter a valid email address',
      },
      toast: {
        successMessage: 'Profile updated',
        successDescription: 'Your changes have been saved.',
        emailConfirmation: 'Check your email to confirm the change.',
      },
    },
    changePassword: {
      label: 'Change password',
      heading: 'Change password',
      subheading: 'Keep your account secure',
      labels: {
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password',
      },
      placeholders: {
        currentPassword: 'Enter current password',
        newPassword: 'At least 8 characters',
        confirmPassword: 'Re-enter new password',
      },
      validation: {
        currentPasswordRequired: 'Please enter your current password',
        newPasswordRequired: 'Please enter a new password',
        newPasswordMin: 'Password should be at least 8 characters',
        newPasswordUppercase: 'Password needs at least one uppercase letter',
        newPasswordNumber: 'Password needs at least one number',
        newPasswordSpecial: 'Password needs at least one special character',
        confirmPasswordRequired: 'Please confirm your new password',
        newPasswordSameAsCurrent: 'New password must be different from current password',
        confirmPasswordMismatch: 'Passwords do not match',
      },
      toast: {
        successMessage: 'Password changed',
        successDescription: 'Your password has been updated.',
      },
    },
    deleteAccount: {
      button: 'Delete Account',
      confirmTitle: 'Delete your account?',
      confirmMessage:
        'This will permanently delete your account and all your data. This action cannot be undone.',
      confirmYes: 'Delete',
      confirmNo: 'Cancel',
    },
    darkMode: 'Dark Mode',
    notifications: 'Notifications',
    language: 'Language',
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
