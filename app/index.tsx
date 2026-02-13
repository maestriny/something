import { Redirect } from 'expo-router';
import { useAuthStore } from '../stores/auth';
import { Routes } from '../constants/routes';

export default function Index() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  return <Redirect href={isAuthenticated ? Routes.app.home : Routes.auth.login} />;
}
