import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

export type User = {
  id: string;
  email: string;
  username: string;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type SignUpData = AuthCredentials & Pick<User, 'username'>;

export type { Session };

// extracts only the fields we care about from the supabase user object and maps them to our app's User type
export function toAppUser(supabaseUser: SupabaseUser): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? '',
    username: (supabaseUser.user_metadata?.username as string) ?? '',
  };
}
