import React from 'react';
import ReactDOM from 'react-dom/client';

import AppRouter from './app/router/AppRouter';
import { QueryProvider } from './app/providers/QueryProvider';
import AuthProvider from './app/providers/AuthProvider';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import i18n from 'i18next';

import 'antd/dist/reset.css';
import '@styles/main.scss';
import '@/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={i18n.language === 'zh' ? zhCN : enUS}>
      <AuthProvider>
        <QueryProvider>
          <AppRouter />
        </QueryProvider>
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
