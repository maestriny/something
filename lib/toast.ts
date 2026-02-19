import i18n from '@/lib/i18n';
import { getAuthError } from '@/api/errors';

type ToastType = 'success' | 'error';

interface ToastData {
  message: string;
  description?: string;
  type: ToastType;
  color?: string;
}

type ToastListener = (data: ToastData | null) => void;

let current: ToastData | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
let listener: ToastListener = () => {};

function emit(data: ToastData | null) {
  current = data;
  listener(current);
}

function hide() {
  if (timer) clearTimeout(timer);
  timer = null;
  emit(null);
}

function show(data: ToastData) {
  if (timer) clearTimeout(timer);
  emit(data);
  const duration = data.type === 'success' ? 1600 : 4000;
  timer = setTimeout(() => {
    timer = null;
    emit(null);
  }, duration);
}

export const toast = {
  show,
  hide,
  success(data: Omit<ToastData, 'type'>) {
    show({ ...data, type: 'success' });
  },
  error(error: unknown) {
    const { title, description } = getAuthError(error);
    show({ type: 'error', message: i18n.t(title), description: i18n.t(description) });
  },
  subscribe(fn: ToastListener) {
    listener = fn;
    return () => {
      if (listener === fn) listener = () => {};
    };
  },
  get current() {
    return current;
  },
};
