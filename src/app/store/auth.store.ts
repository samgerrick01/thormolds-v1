// src/app/store/auth.store.ts
import { create } from 'zustand';

type AuthUser = {
  id: string;
  email: string;
  role: 'admin' | 'user';
};

type AuthState = {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
