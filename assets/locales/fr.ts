import type { Translations } from './en';

const fr: Translations = {
  common: {
    oops: 'Oups',
    somethingWentWrong: 'Quelque chose a mal tourné',
    emailAlreadyExists: 'Un compte avec cette adresse email existe déjà',
    saveFailed: "Quelque chose a mal tourné lors de l'enregistrement. Veuillez réessayer.",
    generalError: 'Quelque chose a mal tourné. Veuillez réessayer.',
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
  input: {
    passwordHint: 'Champ mot de passe, le texte est masqué',
    hidePassword: 'Masquer le mot de passe',
    showPassword: 'Afficher le mot de passe',
  },
} as const;

export default fr;
