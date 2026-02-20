import type { Translations } from './en';

const fr: Translations = {
  common: {
    oops: 'Oups',
    somethingWentWrong: 'Quelque chose a mal tourné',
    emailAlreadyExists: 'Un compte avec cette adresse email existe déjà',
    generalError: 'Quelque chose a mal tourné. Veuillez réessayer.',
    networkError: 'Impossible de se connecter. Vérifiez votre connexion internet.',
    logout: 'Se déconnecter',
    back: 'Retour',
    confirm: 'Confirmer',
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
      usernamePattern: 'Uniquement lettres, chiffres et espaces',
      emailRequired: 'Veuillez entrer votre email',
      emailInvalid: 'Veuillez entrer une adresse email valide',
      passwordRequired: 'Veuillez entrer un mot de passe',
      passwordMin: 'Le mot de passe doit contenir au moins 8 caractères',
      passwordUppercase: 'Le mot de passe doit contenir au moins une lettre majuscule',
      passwordNumber: 'Le mot de passe doit contenir au moins un chiffre',
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
  todo: {
    heading: 'To do',
    placeholder: 'Ajouter un \u00e9l\u00e9ment',
    add: 'Ajouter',
    completed: 'Compl\u00e9t\u00e9es',
    emptyHome: 'Rien \u00e0 faire pour le moment.\nAjoute ta premi\u00e8re t\u00e2che !',
    emptyCompleted: 'Aucune t\u00e2che termin\u00e9e.\nTu vas y arriver !',
    detail: {
      textPlaceholder: "Qu'est-ce qui doit \u00eatre fait ?",
      dueDate: '\u00c9ch\u00e9ance',
      none: 'Aucune',
      dueDateClear: 'Supprimer',
      category: 'Cat\u00e9gorie',
      delete: 'Supprimer la t\u00e2che',
      deleteConfirmTitle: 'Supprimer la t\u00e2che ?',
      deleteConfirmMessage: 'Cette action est irr\u00e9versible.',
      deleteConfirmYes: 'Supprimer',
      deleteConfirmNo: 'Annuler',
      today: "Aujourd'hui",
    },
  },
  categories: {
    namePlaceholder: 'Nom de la cat\u00e9gorie',
    icon: 'Ic\u00f4ne',
    color: 'Couleur',
    save: 'Enregistrer',
    cancel: 'Annuler',
    deleteConfirmTitle: 'Supprimer la cat\u00e9gorie ?',
    deleteConfirmMessage: 'Les t\u00e2ches utilisant cette cat\u00e9gorie perdront leur tag.',
    deleteConfirmYes: 'Supprimer',
    deleteConfirmNo: 'Annuler',
    default: {
      grocery: 'Liste de courses',
      work: 'Travail',
      study: '\u00c9tudes',
      shopping: 'Shopping',
      health: 'Sant\u00e9',
      home: 'Maison',
      personal: 'Personnel',
      fitness: 'Fitness',
    },
  },
  settings: {
    heading: 'Paramètres',
    accountInfo: {
      label: 'Compte',
      heading: 'Compte',
      subheading: 'Voici ce que nous savons de vous',
      labels: {
        username: "Nom d'utilisateur",
        email: 'Email',
      },
      placeholders: {
        username: "Votre nom d'utilisateur",
        email: 'votre@email.com',
      },
      validation: {
        usernameRequired: "Veuillez entrer un nom d'utilisateur",
        usernameMin: "Le nom d'utilisateur doit contenir au moins 3 caractères",
        usernameMax: "Le nom d'utilisateur ne peut pas dépasser {{max}} caractères",
        usernamePattern: 'Uniquement lettres, chiffres et espaces',
        emailRequired: 'Veuillez entrer votre email',
        emailInvalid: 'Veuillez entrer une adresse email valide',
      },
      toast: {
        successMessage: 'Profil mis à jour',
        successDescription: 'Vos modifications ont été enregistrées.',
        emailConfirmation: 'Vérifiez votre email pour confirmer le changement.',
      },
    },
    changePassword: {
      label: 'Changer le mot de passe',
      heading: 'Changer le mot de passe',
      subheading: 'Protégez votre compte',
      labels: {
        currentPassword: 'Mot de passe actuel',
        newPassword: 'Nouveau mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
      },
      placeholders: {
        currentPassword: 'Entrez le mot de passe actuel',
        newPassword: 'Au moins 8 caractères',
        confirmPassword: 'Ressaisissez le nouveau mot de passe',
      },
      validation: {
        currentPasswordRequired: 'Veuillez entrer votre mot de passe actuel',
        newPasswordRequired: 'Veuillez entrer un nouveau mot de passe',
        newPasswordMin: 'Le mot de passe doit contenir au moins 8 caractères',
        newPasswordUppercase: 'Le mot de passe doit contenir au moins une lettre majuscule',
        newPasswordNumber: 'Le mot de passe doit contenir au moins un chiffre',
        newPasswordSpecial: 'Le mot de passe doit contenir au moins un caractère spécial',
        confirmPasswordRequired: 'Veuillez confirmer votre nouveau mot de passe',
        newPasswordSameAsCurrent:
          'Le nouveau mot de passe doit être différent du mot de passe actuel',
        confirmPasswordMismatch: 'Les mots de passe ne correspondent pas',
      },
      toast: {
        successMessage: 'Mot de passe changé',
        successDescription: 'Votre mot de passe a été mis à jour.',
      },
    },
    deleteAccount: {
      button: 'Supprimer le compte',
      confirmTitle: 'Supprimer votre compte ?',
      confirmMessage:
        'Cela supprimera définitivement votre compte et toutes vos données. Cette action est irréversible.',
      confirmYes: 'Supprimer',
      confirmNo: 'Annuler',
    },
    darkMode: 'Mode sombre',
    notifications: 'Notifications',
    language: 'Langue',
  },
  input: {
    passwordHint: 'Champ mot de passe, le texte est masqué',
    hidePassword: 'Masquer le mot de passe',
    showPassword: 'Afficher le mot de passe',
  },
} as const;

export default fr;
