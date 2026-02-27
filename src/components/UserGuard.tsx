import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';
import type { JSX } from 'react';

export default function UserGuard({ children }: { children: JSX.Element }) {
  const user = useAuthStore((s) => s.user);
  if (!user || user.role !== 'user') return <Navigate to="/login" replace />;
  return children;
}
