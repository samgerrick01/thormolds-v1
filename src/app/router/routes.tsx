import { lazy } from 'react';

/* =======================
   PUBLIC PAGES
======================= */
export const Home = lazy(() => import('@pages/Home'));
export const Login = lazy(() => import('@pages/Login'));
export const Cart = lazy(() => import('@pages/Cart'));
export const ProductDetails = lazy(() => import('@pages/ProductDetails'));

/* =======================
   ADMIN PAGES
======================= */
export const AdminDashboard = lazy(() => import('@admin-pages/Dashboard'));
export const AdminProducts = lazy(() => import('@admin-pages/Products'));
export const AdminOrders = lazy(() => import('@admin-pages/Orders'));
export const AdminUsers = lazy(() => import('@admin-pages/Users'));
