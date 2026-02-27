import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import MainLayout from '@layouts/MainLayout';
import AdminRouter from './AdminRouter';

import { Home, Login, Cart, ProductDetails } from './routes';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* PUBLIC */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>

          {/* ADMIN */}
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
