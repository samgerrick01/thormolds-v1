import { supabase } from '@/services/supabase';

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createProduct = async (payload: any) => {
  const { error } = await supabase.from('products').insert(payload);
  if (error) throw error;
};

export const updateProduct = async ({ id, ...payload }: any) => {
  const { error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id);

  if (error) throw error;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
};

export const getCategories = async () => {
  const { data, error } = await supabase.from('category').select('*');
  if (error) throw error;
  return data;
};
