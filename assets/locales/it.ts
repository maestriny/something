import type { Translations } from './en';

const it: Translations = {
  common: {
    oops: 'Ops',
    somethingWentWrong: 'Qualcosa è andato storto',
    emailAlreadyExists: 'Esiste già un account con questa email',
    saveFailed: 'Qualcosa è andato storto durante il salvataggio. Riprova.',
    generalError: 'Qualcosa è andato storto. Riprova.',
  },
  login: {
    heading: 'Bentornato',
    subheading: 'Accedi per continuare',
    labels: {
      email: 'Email',
      password: 'Password',
    },
    placeholders: {
      email: 'tua@email.com',
      password: 'La tua password',
    },
    button: 'Accedi',
    prompt: {
      message: 'Non hai un account?',
      action: 'Registrati',
    },
    validation: {
      emailRequired: 'Inserisci la tua email',
      emailInvalid: 'Inserisci un indirizzo email valido',
      passwordRequired: 'Inserisci una password',
    },
    toast: {
      errorMessage: 'Hmm, non ha funzionato',
      errorDescription: 'Controlla email e password.',
      successMessage: 'Bentornato!',
      successDescription: 'Che bello rivederti, {{username}}.',
    },
  },
  register: {
    heading: 'Crea account',
    subheading: 'Iniziamo',
    labels: {
      username: 'Nome utente',
      email: 'Email',
      password: 'Password',
    },
    placeholders: {
      username: 'Come vuoi farti chiamare?',
      email: 'tua@email.com',
      password: 'Almeno 8 caratteri',
    },
    button: 'Inizia',
    prompt: {
      message: 'Hai già un account?',
      action: 'Accedi',
    },
    validation: {
      usernameRequired: 'Inserisci un nome utente',
      usernameMin: 'Il nome utente deve avere almeno 3 caratteri',
      usernameMax: 'Il nome utente non può superare {{max}} caratteri',
      usernamePattern: 'Solo lettere, numeri, trattini bassi e trattini',
      emailRequired: 'Inserisci la tua email',
      emailInvalid: 'Inserisci un indirizzo email valido',
      passwordRequired: 'Inserisci una password',
      passwordMin: 'La password deve avere almeno 8 caratteri',
      passwordUppercase: 'La password deve contenere almeno una lettera maiuscola',
      passwordSpecial: 'La password deve contenere almeno un carattere speciale',
    },
    toast: {
      successMessage: 'Tutto pronto!',
      successDescription: 'Il tuo account è stato creato.',
    },
  },
  input: {
    passwordHint: 'Campo password, il testo è nascosto',
    hidePassword: 'Nascondi password',
    showPassword: 'Mostra password',
  },
} as const;

export default it;
