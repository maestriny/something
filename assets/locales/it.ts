import type { Translations } from './en';

const it: Translations = {
  common: {
    oops: 'Ops',
    somethingWentWrong: 'Qualcosa è andato storto',
    emailAlreadyExists: 'Esiste già un account con questa email',
    generalError: 'Qualcosa è andato storto. Riprova.',
    networkError: 'Impossibile connettersi. Controlla la tua connessione internet.',
    logout: 'Esci',
    back: 'Indietro',
    confirm: 'Conferma',
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
  todo: {
    heading: 'To Do',
    placeholder: 'Aggiungi elemento',
    add: 'Aggiungi',
    completed: 'Completate',
    emptyHome: 'Niente da fare per ora.\nAggiungi la tua prima attivit\u00e0!',
    emptyCompleted: 'Nessuna attivit\u00e0 completata.\nCe la puoi fare!',
    detail: {
      textPlaceholder: "Cosa c'\u00e8 da fare?",
      dueDate: 'Scadenza',
      none: 'Nessuna',
      dueDateClear: 'Rimuovi',
      category: 'Categoria',
      delete: 'Elimina attivit\u00e0',
      deleteConfirmTitle: "Eliminare l'attivit\u00e0?",
      deleteConfirmMessage: 'Questa azione non pu\u00f2 essere annullata.',
      deleteConfirmYes: 'Elimina',
      deleteConfirmNo: 'Annulla',
      today: 'Oggi',
    },
  },
  categories: {
    namePlaceholder: 'Nome della categoria',
    icon: 'Icona',
    color: 'Colore',
    save: 'Salva',
    cancel: 'Annulla',
    deleteConfirmTitle: 'Eliminare la categoria?',
    deleteConfirmMessage: 'Le attivit\u00e0 con questa categoria perderanno il tag.',
    deleteConfirmYes: 'Elimina',
    deleteConfirmNo: 'Annulla',
    default: {
      grocery: 'Lista della spesa',
      work: 'Lavoro',
      study: 'Studio',
      shopping: 'Shopping',
      health: 'Salute',
      home: 'Casa',
      personal: 'Personale',
      fitness: 'Fitness',
    },
  },
  settings: {
    heading: 'Impostazioni',
    accountInfo: {
      label: 'Account',
      heading: 'Account',
      labels: {
        username: 'Nome utente',
        email: 'Email',
      },
      placeholders: {
        username: 'Il tuo nome utente',
        email: 'tua@email.com',
      },
      validation: {
        usernameRequired: 'Inserisci un nome utente',
        usernameMin: 'Il nome utente deve avere almeno 3 caratteri',
        usernameMax: 'Il nome utente non può superare {{max}} caratteri',
        usernamePattern: 'Solo lettere, numeri, trattini bassi e trattini',
        emailRequired: 'Inserisci la tua email',
        emailInvalid: 'Inserisci un indirizzo email valido',
      },
      toast: {
        successMessage: 'Profilo aggiornato',
        successDescription: 'Le modifiche sono state salvate.',
        emailConfirmation: 'Controlla la tua email per confermare la modifica.',
      },
    },
    changePassword: {
      label: 'Cambia Password',
      heading: 'Cambia Password',
      labels: {
        currentPassword: 'Password attuale',
        newPassword: 'Nuova password',
        confirmPassword: 'Conferma password',
      },
      placeholders: {
        currentPassword: 'Inserisci la password attuale',
        newPassword: 'Almeno 8 caratteri',
        confirmPassword: 'Reinserisci la nuova password',
      },
      validation: {
        currentPasswordRequired: 'Inserisci la tua password attuale',
        newPasswordRequired: 'Inserisci una nuova password',
        newPasswordMin: 'La password deve avere almeno 8 caratteri',
        newPasswordUppercase: 'La password deve contenere almeno una lettera maiuscola',
        newPasswordNumber: 'La password deve contenere almeno un numero',
        newPasswordSpecial: 'La password deve contenere almeno un carattere speciale',
        confirmPasswordRequired: 'Conferma la nuova password',
        newPasswordSameAsCurrent: 'La nuova password deve essere diversa da quella attuale',
        confirmPasswordMismatch: 'Le password non corrispondono',
      },
      toast: {
        successMessage: 'Password modificata',
        successDescription: 'La tua password è stata aggiornata.',
      },
    },
    deleteAccount: {
      button: 'Elimina account',
      confirmTitle: 'Vuoi eliminare il tuo account?',
      confirmMessage:
        "Questo eliminerà permanentemente il tuo account e tutti i tuoi dati. Quest'azione è irreversibile.",
      confirmYes: 'Elimina',
      confirmNo: 'Annulla',
    },
    darkMode: 'Tema scuro',
    notifications: 'Notifiche',
    language: 'Lingua',
  },
  input: {
    passwordHint: 'Campo password, il testo è nascosto',
    hidePassword: 'Nascondi password',
    showPassword: 'Mostra password',
  },
} as const;

export default it;
