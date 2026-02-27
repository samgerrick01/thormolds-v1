import { supabase } from '@services/supabase';

export type AuthUser = {
  id: string;
  username?: string; // optional for users
  email: string; // required for store
  role: 'admin' | 'user';
};

export const adminSignIn = async (
  username: string,
  password: string,
): Promise<AuthUser> => {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, username, email, role')
    .eq('username', username)
    .single();

  if (profileError || !profile) throw new Error('Invalid username or password');
  if (profile.role !== 'admin') throw new Error('Not an admin account');

  const { data, error } = await supabase.auth.signInWithPassword({
    email: profile.email!,
    password,
  });

  if (error) throw error;
  if (!data.user) throw new Error('Authentication failed');

  return {
    id: data.user.id,
    username: profile.username,
    email: profile.email!, // ← include email here
    role: profile.role,
  };
};
