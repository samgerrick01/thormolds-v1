import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './api';

export const useProducts = () =>
  useQuery({ queryKey: ['products'], queryFn: api.getProducts });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
};
