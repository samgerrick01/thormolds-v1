export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'shipped'
  | 'completed'
  | 'cancelled';

export interface Order {
  id: string;
  product_name: string;
  product_image?: string;
  unit_price: number;
  quantity: number;
  actual_payment: number;
  buyer_name: string;
  buyer_email: string;
  payment_method: string;
  delivery_method: string;
  status: OrderStatus;
  created_at: string;
}
