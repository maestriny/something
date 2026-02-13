import type { Translations } from './en';

const fr: Translations = {
  common: {
    oops: 'Oups',
    somethingWentWrong: 'Quelque chose a mal tourné',
    emailAlreadyExists: 'Un compte avec cette adresse email existe déjà',
    generalError: 'Quelque chose a mal tourné. Veuillez réessayer.',
    networkError: 'Impossible de se connecter. Vérifiez votre connexion internet.',
    logout: 'Se déconnecter',
  },
  login: {
    heading: 'Bon retour',
    subheading: 'Connectez-vous pour continuer',
    labels: {
      email: 'Email',
      password: 'Mot de passe',
    },
    placeholders: {
      email: 'votre@email.com',
      password: 'Votre mot de passe',
    },
    button: 'Se connecter',
    prompt: {
      message: "Vous n'avez pas de compte ?",
      action: "S'inscrire",
    },
    validation: {
      emailRequired: 'Veuillez entrer votre email',
      emailInvalid: 'Veuillez entrer une adresse email valide',
      passwordRequired: 'Veuillez entrer un mot de passe',
    },
    toast: {
      errorMessage: "Hmm, ça n'a pas marché",
      errorDescription: 'Vérifiez votre email et votre mot de passe.',
      successMessage: 'Bon retour !',
      successDescription: 'Ravi de vous revoir, {{username}}.',
    },
  },
  register: {
    heading: 'Créer un compte',
    subheading: 'Commençons',
    labels: {
      username: "Nom d'utilisateur",
      email: 'Email',
      password: 'Mot de passe',
    },
    placeholders: {
      username: 'Quel petit nom pour toi ?',
      email: 'votre@email.com',
      password: 'Au moins 8 caractères',
    },
    button: 'Commencer',
    prompt: {
      message: 'Vous avez déjà un compte ?',
      action: 'Se connecter',
    },
    validation: {
      usernameRequired: "Veuillez entrer un nom d'utilisateur",
      usernameMin: "Le nom d'utilisateur doit contenir au moins 3 caractères",
      usernameMax: "Le nom d'utilisateur ne peut pas dépasser {{max}} caractères",
      usernamePattern: 'Uniquement lettres, chiffres, tirets bas et tirets',
      emailRequired: 'Veuillez entrer votre email',
      emailInvalid: 'Veuillez entrer une adresse email valide',
      passwordRequired: 'Veuillez entrer un mot de passe',
      passwordMin: 'Le mot de passe doit contenir au moins 8 caractères',
      passwordUppercase: 'Le mot de passe doit contenir au moins une lettre majuscule',
      passwordSpecial: 'Le mot de passe doit contenir au moins un caractère spécial',
    },
    toast: {
      successMessage: 'Tout est prêt !',
      successDescription: 'Votre compte a été créé.',
    },
  },
  authErrors: {
    emailNotConfirmed: {
      title: 'Vérifiez votre boîte de réception',
      description: 'On y est presque ! Confirmez votre adresse email pour vous connecter.',
    },
    invalidCredentials: {
      title: "Hmm, ça n'a pas marché",
      description: 'Email ou mot de passe invalide. Veuillez réessayer.',
    },
    userAlreadyRegistered: {
      title: 'Oups',
      description: 'Un compte associé à cette adresse email existe déjà.',
    },
    rateLimited: {
      title: 'Doucement',
      description: 'Trop de tentatives. Patientez un instant et réessayez.',
    },
    weakPassword: {
      title: 'Mot de passe faible',
      description: 'Votre mot de passe est trop court. Choisissez-en un plus sûr.',
    },
    userBanned: {
      title: 'Compte suspendu',
      description: "Ce compte a été suspendu. Contactez le support pour obtenir de l'aide.",
    },
    sessionExpired: {
      title: 'Session expirée',
      description: 'Votre session a expiré. Veuillez vous reconnecter.',
    },
    defaultError: {
      title: 'Oups',
      description: 'Quelque chose a mal tourné. Veuillez réessayer.',
    },
  },
  input: {
    passwordHint: 'Champ mot de passe, le texte est masqué',
    hidePassword: 'Masquer le mot de passe',
    showPassword: 'Afficher le mot de passe',
  },
} as const;

export default fr;
