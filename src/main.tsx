import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './app/router/AppRouter';
import { QueryProvider } from './app/providers/QueryProvider';
import 'antd/dist/reset.css';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  </React.StrictMode>,
);
