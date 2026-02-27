import { create } from 'zustand';
import { supabase } from '@services/supabase';

export type AuthUser = {
  id: string;
  email: string;
  role: 'admin' | 'user';
};

type AuthState = {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
