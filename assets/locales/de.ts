import type { Translations } from './en';

const de: Translations = {
  common: {
    oops: 'Hoppla',
    somethingWentWrong: 'Etwas ist schiefgelaufen',
    emailAlreadyExists: 'Ein Konto mit dieser E-Mail-Adresse existiert bereits',
    generalError: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
    networkError: 'Verbindung nicht möglich. Bitte überprüfe deine Internetverbindung.',
    logout: 'Abmelden',
    back: 'Zurück',
  },
  login: {
    heading: 'Willkommen zurück',
    subheading: 'Melde dich an, um fortzufahren',
    labels: {
      email: 'E-Mail',
      password: 'Passwort',
    },
    placeholders: {
      email: 'deine@email.com',
      password: 'Dein Passwort',
    },
    button: 'Anmelden',
    prompt: {
      message: 'Noch kein Konto?',
      action: 'Registrieren',
    },
    validation: {
      emailRequired: 'Bitte gib deine E-Mail-Adresse ein',
      emailInvalid: 'Bitte gib eine gültige E-Mail-Adresse ein',
      passwordRequired: 'Bitte gib ein Passwort ein',
    },
    toast: {
      errorMessage: 'Hmm, das hat nicht geklappt',
      errorDescription: 'Überprüfe deine E-Mail-Adresse und dein Passwort.',
      successMessage: 'Willkommen zurück!',
      successDescription: 'Schön dich zu sehen, {{username}}.',
    },
  },
  register: {
    heading: 'Konto erstellen',
    subheading: 'Lass uns loslegen',
    labels: {
      username: 'Benutzername',
      email: 'E-Mail',
      password: 'Passwort',
    },
    placeholders: {
      username: 'Wie sollen wir dich nennen?',
      email: 'deine@email.com',
      password: 'Mindestens 8 Zeichen',
    },
    button: 'Loslegen',
    prompt: {
      message: 'Hast du schon ein Konto?',
      action: 'Anmelden',
    },
    validation: {
      usernameRequired: 'Bitte gib einen Benutzernamen ein',
      usernameMin: 'Der Benutzername muss mindestens 3 Zeichen lang sein',
      usernameMax: 'Der Benutzername darf {{max}} Zeichen nicht überschreiten',
      usernamePattern: 'Nur Buchstaben, Zahlen, Unterstriche und Bindestriche',
      emailRequired: 'Bitte gib deine E-Mail-Adresse ein',
      emailInvalid: 'Bitte gib eine gültige E-Mail-Adresse ein',
      passwordRequired: 'Bitte gib ein Passwort ein',
      passwordMin: 'Das Passwort muss mindestens 8 Zeichen lang sein',
      passwordUppercase: 'Das Passwort muss mindestens einen Großbuchstaben enthalten',
      passwordNumber: 'Das Passwort muss mindestens eine Zahl enthalten',
      passwordSpecial: 'Das Passwort muss mindestens ein Sonderzeichen enthalten',
    },
    toast: {
      successMessage: 'Alles bereit!',
      successDescription: 'Dein Konto wurde erstellt.',
    },
  },
  authErrors: {
    emailNotConfirmed: {
      title: 'Prüfe deinen Posteingang',
      description: 'Fast geschafft! Bestätige deine E-Mail-Adresse, um dich anzumelden.',
    },
    invalidCredentials: {
      title: 'Hmm, das hat nicht geklappt',
      description: 'Ungültige E-Mail-Adresse oder Passwort. Bitte versuche es erneut.',
    },
    userAlreadyRegistered: {
      title: 'Hoppla',
      description: 'Es existiert bereits ein Konto, das mit dieser E-Mail-Adresse verknüpft ist.',
    },
    rateLimited: {
      title: 'Langsam',
      description: 'Zu viele Versuche. Bitte warte einen Moment und versuche es erneut.',
    },
    weakPassword: {
      title: 'Schwaches Passwort',
      description: 'Dein Passwort ist zu kurz. Bitte wähle ein stärkeres.',
    },
    userBanned: {
      title: 'Konto gesperrt',
      description: 'Dieses Konto wurde gesperrt. Kontaktiere den Support für Hilfe.',
    },
    sessionExpired: {
      title: 'Sitzung abgelaufen',
      description: 'Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.',
    },
    defaultError: {
      title: 'Hoppla',
      description: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
    },
  },
  todo: {
    heading: 'To Do',
    placeholder: 'Element hinzufügen',
    add: 'Hinzufügen',
    completed: 'Abgeschlossen',
    emptyHome: 'Noch nichts zu tun.\nF\u00fcge deine erste Aufgabe hinzu!',
    emptyCompleted: 'Noch keine erledigten Aufgaben.\nDu schaffst das!',
  },
  settings: {
    heading: 'Einstellungen',
  },
  input: {
    passwordHint: 'Passwortfeld, Eingabe ist verborgen',
    hidePassword: 'Passwort verbergen',
    showPassword: 'Passwort anzeigen',
  },
} as const;

export default de;
