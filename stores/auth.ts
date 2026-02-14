import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import * as routes from '@/api/routes';
import { type User, type AuthCredentials, type SignUpData, toAppUser } from '@/types/auth';

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
}

interface AuthActions {
  initialize: () => Promise<void>;
  login: (credentials: AuthCredentials) => Promise<User>;
  register: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
  setSession: (session: Session | null) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    try {
      set({ isLoading: true });
      const session = await routes.getSession();
      if (session?.user) {
        set({
          user: toAppUser(session.user),
          session,
          isAuthenticated: true,
        });
      }
    } catch {
      // no valid session, do nothing
    } finally {
      set({ isLoading: false, isInitialized: true });
    }
  },

  login: async credentials => {
    set({ isLoading: true });
    try {
      const { user: supabaseUser, session } = await routes.signIn(credentials);
      if (!supabaseUser || !session) {
        throw new Error('common.somethingWentWrong');
      }
      const user = toAppUser(supabaseUser);
      set({ user, session, isAuthenticated: true, isLoading: false });
      return user;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async data => {
    set({ isLoading: true });
    try {
      await routes.signUp(data);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await routes.signOut();
    } finally {
      set({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  setSession: session => {
    if (session?.user) {
      set({
        user: toAppUser(session.user),
        session,
        isAuthenticated: true,
      });
    } else {
      set({
        user: null,
        session: null,
        isAuthenticated: false,
      });
    }
  },
}));
