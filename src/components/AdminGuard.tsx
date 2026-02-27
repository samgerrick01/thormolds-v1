import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { useAuthStore } from '@/app/store/auth.store';

export default function AdminGuard({ children }: { children: JSX.Element }) {
  const user = useAuthStore((s) => s.user);

  if (!user) return <Navigate to="/login" />;

  if (user.role !== 'admin') return <Navigate to="/" />;

  return children;
}
