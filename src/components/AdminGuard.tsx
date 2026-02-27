import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';
import type { JSX } from 'react';

export default function AdminGuard({ children }: { children: JSX.Element }) {
  const user = useAuthStore((s) => s.user);

  if (!user) return <Navigate to="/admin/login" />;
  if (user.role !== 'admin') return <Navigate to="/" />;

  return children;
}
