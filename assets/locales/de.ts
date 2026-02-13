import type { Translations } from './en';

const de: Translations = {
  common: {
    oops: 'Hoppla',
    somethingWentWrong: 'Etwas ist schiefgelaufen',
    emailAlreadyExists: 'Ein Konto mit dieser E-Mail-Adresse existiert bereits',
    saveFailed: 'Beim Speichern ist etwas schiefgelaufen. Bitte versuche es erneut.',
    generalError: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
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
      passwordSpecial: 'Das Passwort muss mindestens ein Sonderzeichen enthalten',
    },
    toast: {
      successMessage: 'Alles bereit!',
      successDescription: 'Dein Konto wurde erstellt.',
    },
  },
  input: {
    passwordHint: 'Passwortfeld, Eingabe ist verborgen',
    hidePassword: 'Passwort verbergen',
    showPassword: 'Passwort anzeigen',
  },
} as const;

export default de;
