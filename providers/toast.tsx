import { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';

type ToastType = 'success' | 'error';

interface ToastData {
  message: string;
  description?: string;
  type: ToastType;
  color?: string;
}

interface ToastContextValue {
  toast: ToastData | null;
  showToast: (data: ToastData) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastData | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideToast = useCallback(() => {
    setToast(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const showToast = useCallback((data: ToastData) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast(data);
    const duration = data.type === 'success' ? 1600 : 4000;
    timerRef.current = setTimeout(() => {
      setToast(null);
      timerRef.current = null;
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
