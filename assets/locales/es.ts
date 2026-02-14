import type { Translations } from './en';

const es: Translations = {
  common: {
    oops: 'Ups',
    somethingWentWrong: 'Algo salió mal',
    emailAlreadyExists: 'Ya existe una cuenta con este correo electrónico',
    generalError: 'Algo salió mal. Por favor, inténtalo de nuevo.',
    networkError: 'No se puede conectar. Comprueba tu conexión a internet.',
    logout: 'Cerrar sesión',
    back: 'Volver',
  },
  login: {
    heading: 'Bienvenido de nuevo',
    subheading: 'Inicia sesión para continuar',
    labels: {
      email: 'Correo electrónico',
      password: 'Contraseña',
    },
    placeholders: {
      email: 'tu@email.com',
      password: 'Tu contraseña',
    },
    button: 'Iniciar sesión',
    prompt: {
      message: '¿No tienes una cuenta?',
      action: 'Regístrate',
    },
    validation: {
      emailRequired: 'Por favor, introduce tu correo electrónico',
      emailInvalid: 'Por favor, introduce un correo electrónico válido',
      passwordRequired: 'Por favor, introduce una contraseña',
    },
    toast: {
      errorMessage: 'Hmm, eso no funcionó',
      errorDescription: 'Revisa tu correo electrónico y contraseña.',
      successMessage: '¡Bienvenido de nuevo!',
      successDescription: 'Qué bueno verte, {{username}}.',
    },
  },
  register: {
    heading: 'Crear cuenta',
    subheading: 'Empecemos',
    labels: {
      username: 'Nombre de usuario',
      email: 'Correo electrónico',
      password: 'Contraseña',
    },
    placeholders: {
      username: '¿Cómo quieres que te llamemos?',
      email: 'tu@email.com',
      password: 'Al menos 8 caracteres',
    },
    button: 'Empezar',
    prompt: {
      message: '¿Ya tienes una cuenta?',
      action: 'Iniciar sesión',
    },
    validation: {
      usernameRequired: 'Por favor, introduce un nombre de usuario',
      usernameMin: 'El nombre de usuario debe tener al menos 3 caracteres',
      usernameMax: 'El nombre de usuario no puede superar {{max}} caracteres',
      usernamePattern: 'Solo letras, números, guiones bajos y guiones',
      emailRequired: 'Por favor, introduce tu correo electrónico',
      emailInvalid: 'Por favor, introduce un correo electrónico válido',
      passwordRequired: 'Por favor, introduce una contraseña',
      passwordMin: 'La contraseña debe tener al menos 8 caracteres',
      passwordUppercase: 'La contraseña debe contener al menos una letra mayúscula',
      passwordNumber: 'La contraseña debe contener al menos un número',
      passwordSpecial: 'La contraseña debe contener al menos un carácter especial',
    },
    toast: {
      successMessage: '¡Todo listo!',
      successDescription: 'Tu cuenta ha sido creada.',
    },
  },
  authErrors: {
    emailNotConfirmed: {
      title: 'Revisa tu bandeja de entrada',
      description: '¡Ya casi! Confirma tu correo electrónico para acceder.',
    },
    invalidCredentials: {
      title: 'Hmm, eso no funcionó',
      description: 'Correo electrónico o contraseña no válidos. Inténtalo de nuevo.',
    },
    userAlreadyRegistered: {
      title: 'Ups',
      description: 'Ya existe una cuenta asociada a este correo electrónico.',
    },
    rateLimited: {
      title: 'Ve más despacio',
      description: 'Demasiados intentos. Espera un momento e inténtalo de nuevo.',
    },
    weakPassword: {
      title: 'Contraseña débil',
      description: 'Tu contraseña es demasiado corta. Elige una más segura.',
    },
    userBanned: {
      title: 'Cuenta suspendida',
      description: 'Esta cuenta ha sido suspendida. Contacta con soporte para obtener ayuda.',
    },
    sessionExpired: {
      title: 'Sesión expirada',
      description: 'Tu sesión ha expirado. Inicia sesión de nuevo.',
    },
    defaultError: {
      title: 'Ups',
      description: 'Algo salió mal. Por favor, inténtalo de nuevo.',
    },
  },
  todo: {
    heading: 'To Do',
    placeholder: 'Añadir elemento',
    add: 'Añadir',
    completed: 'Completadas',
    emptyHome: 'Nada que hacer a\u00fan.\n\u00a1A\u00f1ade tu primera tarea!',
    emptyCompleted: 'No hay tareas completadas a\u00fan.\n\u00a1T\u00fa puedes!',
  },
  settings: {
    heading: 'Ajustes',
  },
  input: {
    passwordHint: 'Campo de contraseña, el texto está oculto',
    hidePassword: 'Ocultar contraseña',
    showPassword: 'Mostrar contraseña',
  },
} as const;

export default es;
