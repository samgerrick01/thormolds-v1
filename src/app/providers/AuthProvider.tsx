// src/app/providers/AuthProvider.tsx
import { useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@services/supabase';
import { useAuthStore, type AuthUser } from '@store/auth.store';

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user;
      if (!sessionUser) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', sessionUser.id)
        .single();

      if (!profile?.role) {
        setLoading(false);
        return;
      }

      const user: AuthUser = {
        id: sessionUser.id,
        email: sessionUser.email!,
        role: profile.role,
      };

      setUser(user);
      setLoading(false);
    };

    restoreSession();

    // optional: listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') setUser(null as any);
    });

    return () => listener.subscription.unsubscribe();
  }, [setUser]);

  if (loading) return <div>Loading session...</div>;

  return <>{children}</>;
}
