// src/app/router/AdminRouter.tsx
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import AdminLayout from '@layouts/AdminLayout';
import AdminGuard from '@/components/AdminGuard';

import {
  AdminDashboard,
  AdminProducts,
  AdminOrders,
  AdminUsers,
} from './routes';

export default function AdminRouter() {
  return (
    <AdminGuard>
      <Suspense fallback={<div>Loading admin...</div>}>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </Suspense>
    </AdminGuard>
  );
}
