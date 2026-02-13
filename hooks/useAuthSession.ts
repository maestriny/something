import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth';
import { supabase } from '../api/supabase';

export function useAuthSession() {
  const initialize = useAuthStore(s => s.initialize);
  const setSession = useAuthStore(s => s.setSession);
  const isSessionReady = useAuthStore(s => s.isInitialized);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, [setSession]);

  return isSessionReady;
}
