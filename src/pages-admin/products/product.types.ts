export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: { id: string; name: string };
  sales?: number; // added this
}
