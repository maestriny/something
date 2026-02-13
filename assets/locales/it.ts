import type { Translations } from './en';

const it: Translations = {
  common: {
    oops: 'Ops',
    somethingWentWrong: 'Qualcosa è andato storto',
    emailAlreadyExists: 'Esiste già un account con questa email',
    generalError: 'Qualcosa è andato storto. Riprova.',
    networkError: 'Impossibile connettersi. Controlla la tua connessione internet.',
    logout: 'Esci',
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
      passwordNumber: 'La password deve contenere almeno un numero',
      passwordSpecial: 'La password deve contenere almeno un carattere speciale',
    },
    toast: {
      successMessage: 'Tutto pronto!',
      successDescription: 'Il tuo account è stato creato.',
    },
  },
  authErrors: {
    emailNotConfirmed: {
      title: 'Controlla la tua inbox',
      description: 'Ci siamo quasi! Conferma il tuo indirizzo email per accedere.',
    },
    invalidCredentials: {
      title: 'Hmm, non ha funzionato',
      description: 'Email o password non validi. Riprova.',
    },
    userAlreadyRegistered: {
      title: 'Ops',
      description: 'Esiste già un account associato a questa email.',
    },
    rateLimited: {
      title: 'Piano, piano',
      description: 'Troppi tentativi. Aspetta un momento e riprova.',
    },
    weakPassword: {
      title: 'Password debole',
      description: 'La password è troppo corta. Scegline una più sicura.',
    },
    userBanned: {
      title: 'Account sospeso',
      description: 'Questo account è stato sospeso. Contatta il supporto per assistenza.',
    },
    sessionExpired: {
      title: 'Sessione scaduta',
      description: 'La tua sessione è scaduta. Accedi di nuovo.',
    },
    defaultError: {
      title: 'Ops',
      description: 'Qualcosa è andato storto. Riprova.',
    },
  },
  input: {
    passwordHint: 'Campo password, il testo è nascosto',
    hidePassword: 'Nascondi password',
    showPassword: 'Mostra password',
  },
} as const;

export default it;
