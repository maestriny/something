import { supabase } from './supabase';
import type { AuthCredentials, SignUpData, ProfileUpdate } from '@/types/auth';

export async function signUp({ email, password, username }: SignUpData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });
  if (error) throw error;
  if (!data.user?.identities?.length) {
    throw Object.assign(new Error(), { code: 'user_already_exists' });
  }
  return data;
}

export async function signIn({ email, password }: AuthCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

export async function updateProfile({ email, username }: ProfileUpdate) {
  const { data, error } = await supabase.auth.updateUser({
    email,
    data: { username },
  });
  if (error) throw error;
  return data.user;
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  return data.user;
}

export async function deleteAccount() {
  const { error } = await supabase.rpc('delete_account');
  if (error) throw error;
}
