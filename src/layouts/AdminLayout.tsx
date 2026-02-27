// src/layouts/AdminLayout.tsx
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: 'dashboard',
              label: 'Dashboard',
              onClick: () => navigate('/admin'),
            },
            {
              key: 'products',
              label: 'Products',
              onClick: () => navigate('/admin/products'),
            },
            {
              key: 'orders',
              label: 'Orders',
              onClick: () => navigate('/admin/orders'),
            },
            {
              key: 'users',
              label: 'Users',
              onClick: () => navigate('/admin/users'),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
