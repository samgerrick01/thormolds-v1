// src/app/router/routes.tsx
import { lazy } from 'react';

/* PUBLIC */
export const Home = lazy(() => import('@pages/Home'));
export const Login = lazy(() => import('@pages/Login'));
export const Cart = lazy(() => import('@pages/Cart'));
export const ProductDetails = lazy(() => import('@pages/ProductDetails'));

/* ADMIN */
export const AdminLogin = lazy(() => import('@admin-pages/Login'));
export const AdminDashboard = lazy(() => import('@admin-pages/Dashboard'));
export const AdminProducts = lazy(
  () => import('@admin-pages/products/ProductPage'),
);
export const AdminOrders = lazy(() => import('@admin-pages/orders/OrdersPage'));
export const AdminUsers = lazy(() => import('@/pages-admin/users/UsersPage'));
