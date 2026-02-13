import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types/auth';

const USERS_KEY = 'registered_users';

const StorageErrors = {
  EMAIL_EXISTS: 'common.emailAlreadyExists',
  SAVE_FAILED: 'common.saveFailed',
  GENERAL: 'common.generalError',
} as const;

export async function saveUser(user: User): Promise<void> {
  try {
    const existingData = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = existingData ? JSON.parse(existingData) : [];

    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === user.email.toLowerCase()
    );
    if (alreadyExists) {
      throw new Error(StorageErrors.EMAIL_EXISTS);
    }

    users.push(user);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    if (error instanceof Error && isStorageError(error.message)) {
      throw error;
    }
    throw new Error(StorageErrors.SAVE_FAILED);
  }
}

export async function verifyCredentials(
  credentials: { email: string; password: string }
): Promise<User | null> {
  try {
    const existingData = await AsyncStorage.getItem(USERS_KEY);
    if (!existingData) return null;

    const users: User[] = JSON.parse(existingData);
    const matchedUser = users.find(
      (u) =>
        u.email.toLowerCase() === credentials.email.toLowerCase() &&
        u.password === credentials.password
    );

    return matchedUser ?? null;
  } catch {
    throw new Error(StorageErrors.GENERAL);
  }
}

function isStorageError(message: string): boolean {
  return Object.values(StorageErrors).includes(message as typeof StorageErrors[keyof typeof StorageErrors]);
}
