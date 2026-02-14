import { useEffect, useState } from 'react';
import { initI18n } from '@/lib/i18n';

export function useI18n(): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setIsReady(true));
  }, []);

  return isReady;
}
