import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types/auth';

const USERS_KEY = 'registered_users';

export async function saveUser(user: User): Promise<void> {
  try {
    const existingData = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = existingData ? JSON.parse(existingData) : [];

    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === user.email.toLowerCase()
    );
    if (alreadyExists) {
      throw new Error('An account with this email already exists');
    }

    users.push(user);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Something went wrong while saving. Please try again.');
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
    throw new Error('Something went wrong. Please try again.');
  }
}
