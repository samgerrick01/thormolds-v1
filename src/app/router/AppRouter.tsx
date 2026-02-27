// src/app/router/AppRouter.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import AdminRouter from './AdminRouter';

import { Home, Login, Cart, ProductDetails, AdminLogin } from './routes';
import { Suspense } from 'react';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* USER SIDE */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>

          {/* ADMIN LOGIN (NO LAYOUT) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ADMIN PANEL */}
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
