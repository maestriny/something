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
    confirm: 'Confirmar',
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
    placeholder: 'A\u00f1adir elemento',
    add: 'A\u00f1adir',
    completed: 'Completadas',
    emptyHome: 'Nada que hacer a\u00fan.\n\u00a1A\u00f1ade tu primera tarea!',
    emptyCompleted: 'No hay tareas completadas a\u00fan.\n\u00a1T\u00fa puedes!',
    detail: {
      textPlaceholder: '\u00bfQu\u00e9 hay que hacer?',
      dueDate: 'Fecha l\u00edmite',
      none: 'Ninguna',
      dueDateClear: 'Quitar',
      category: 'Categor\u00eda',
      delete: 'Eliminar tarea',
      deleteConfirmTitle: '\u00bfEliminar tarea?',
      deleteConfirmMessage: 'Esta acci\u00f3n no se puede deshacer.',
      deleteConfirmYes: 'Eliminar',
      deleteConfirmNo: 'Cancelar',
      today: 'Hoy',
    },
  },
  categories: {
    namePlaceholder: 'Nombre de la categor\u00eda',
    icon: 'Icono',
    color: 'Color',
    save: 'Guardar',
    cancel: 'Cancelar',
    deleteConfirmTitle: '\u00bfEliminar categor\u00eda?',
    deleteConfirmMessage: 'Las tareas que usen esta categor\u00eda perder\u00e1n su etiqueta.',
    deleteConfirmYes: 'Eliminar',
    deleteConfirmNo: 'Cancelar',
    default: {
      grocery: 'Lista de compras',
      work: 'Trabajo',
      study: 'Estudio',
      shopping: 'Compras',
      health: 'Salud',
      home: 'Hogar',
      personal: 'Personal',
      fitness: 'Fitness',
    },
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
