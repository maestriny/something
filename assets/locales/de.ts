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
    confirm: 'Bestätigen',
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
      username: 'Name',
      email: 'E-Mail',
      password: 'Passwort',
    },
    placeholders: {
      username: 'Dein Name',
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
      usernamePattern: 'Nur Buchstaben, Zahlen und Leerzeichen',
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
    heading: 'To do',
    placeholder: 'Element hinzuf\u00fcgen',
    add: 'Hinzuf\u00fcgen',
    completed: 'Abgeschlossen',
    emptyHome: 'Noch nichts zu tun.\nF\u00fcge deine erste Aufgabe hinzu!',
    emptyCompleted: 'Noch keine erledigten Aufgaben.\nDu schaffst das!',
    detail: {
      textPlaceholder: 'Was muss erledigt werden?',
      dueDate: 'F\u00e4lligkeitsdatum',
      none: 'Keine',
      dueDateClear: 'Entfernen',
      category: 'Kategorie',
      delete: 'Aufgabe l\u00f6schen',
      deleteConfirmTitle: 'Aufgabe l\u00f6schen?',
      deleteConfirmMessage: 'Diese Aktion kann nicht r\u00fcckg\u00e4ngig gemacht werden.',
      deleteConfirmYes: 'L\u00f6schen',
      deleteConfirmNo: 'Abbrechen',
      today: 'Heute',
    },
  },
  categories: {
    namePlaceholder: 'Kategoriename',
    icon: 'Symbol',
    color: 'Farbe',
    save: 'Speichern',
    cancel: 'Abbrechen',
    deleteConfirmTitle: 'Kategorie l\u00f6schen?',
    deleteConfirmMessage: 'Aufgaben mit dieser Kategorie verlieren ihr Tag.',
    deleteConfirmYes: 'L\u00f6schen',
    deleteConfirmNo: 'Abbrechen',
    default: {
      grocery: 'Einkaufsliste',
      work: 'Arbeit',
      study: 'Studium',
      shopping: 'Shopping',
      health: 'Gesundheit',
      home: 'Zuhause',
      personal: 'Pers\u00f6nlich',
      fitness: 'Fitness',
    },
  },
  settings: {
    heading: 'Einstellungen',
    accountInfo: {
      label: 'Konto',
      heading: 'Konto',
      subheading: 'Das wissen wir über dich',
      labels: {
        username: 'Name',
        email: 'E-Mail',
      },
      placeholders: {
        username: 'Dein Name',
        email: 'deine@email.com',
      },
      validation: {
        usernameRequired: 'Bitte gib einen Benutzernamen ein',
        usernameMin: 'Der Benutzername muss mindestens 3 Zeichen lang sein',
        usernameMax: 'Der Benutzername darf {{max}} Zeichen nicht überschreiten',
        usernamePattern: 'Nur Buchstaben, Zahlen und Leerzeichen',
        emailRequired: 'Bitte gib deine E-Mail-Adresse ein',
        emailInvalid: 'Bitte gib eine gültige E-Mail-Adresse ein',
      },
      toast: {
        successMessage: 'Profil aktualisiert',
        successDescription: 'Deine Änderungen wurden gespeichert.',
        emailConfirmation: 'Überprüfe deine E-Mail, um die Änderung zu bestätigen.',
      },
    },
    changePassword: {
      label: 'Passwort ändern',
      heading: 'Passwort ändern',
      subheading: 'Halte dein Konto sicher',
      labels: {
        currentPassword: 'Aktuelles Passwort',
        newPassword: 'Neues Passwort',
        confirmPassword: 'Passwort bestätigen',
      },
      placeholders: {
        currentPassword: 'Aktuelles Passwort eingeben',
        newPassword: 'Mindestens 8 Zeichen',
        confirmPassword: 'Neues Passwort erneut eingeben',
      },
      validation: {
        currentPasswordRequired: 'Bitte gib dein aktuelles Passwort ein',
        newPasswordRequired: 'Bitte gib ein neues Passwort ein',
        newPasswordMin: 'Das Passwort muss mindestens 8 Zeichen lang sein',
        newPasswordUppercase: 'Das Passwort muss mindestens einen Großbuchstaben enthalten',
        newPasswordNumber: 'Das Passwort muss mindestens eine Zahl enthalten',
        newPasswordSpecial: 'Das Passwort muss mindestens ein Sonderzeichen enthalten',
        confirmPasswordRequired: 'Bitte bestätige dein neues Passwort',
        newPasswordSameAsCurrent: 'Das neue Passwort muss sich vom aktuellen unterscheiden',
        confirmPasswordMismatch: 'Die Passwörter stimmen nicht überein',
      },
      toast: {
        successMessage: 'Passwort geändert',
        successDescription: 'Dein Passwort wurde aktualisiert.',
      },
    },
    deleteAccount: {
      button: 'Konto löschen',
      confirmTitle: 'Dein Konto löschen?',
      confirmMessage:
        'Dies wird dein Konto und alle deine Daten dauerhaft löschen. Diese Aktion kann nicht rückgängig gemacht werden.',
      confirmYes: 'Löschen',
      confirmNo: 'Abbrechen',
    },
    darkMode: 'Dunkelmodus',
    notifications: 'Benachrichtigungen',
    language: 'Sprache',
  },
  notifications: {
    channels: {
      daily: 'Tägliche Übersicht',
      reminder: 'Aufgaben-Erinnerungen',
    },
    morningBriefing: {
      title: 'Guten Morgen!',
      body: 'Du hast heute {{total}} Aufgaben auf deiner Liste.',
      bodyWithUrgent: 'Du hast heute {{total}} Dinge zu tun, {{urgent}} davon laufen bald ab.',
    },
    taskDueTomorrow: {
      title: 'Kleine Erinnerung',
      body: '"{{task}}" ist morgen fällig. Du hast noch Zeit!',
    },
    taskOverdue: {
      title: 'Etwas verpasst?',
      body: '"{{task}}" war gestern fällig. Es ist noch nicht zu spät!',
    },
  },
  input: {
    passwordHint: 'Passwortfeld, Eingabe ist verborgen',
    hidePassword: 'Passwort verbergen',
    showPassword: 'Passwort anzeigen',
  },
} as const;

export default de;
