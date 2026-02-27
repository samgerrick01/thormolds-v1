import { Layout, Menu, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';

const { Sider, Content } = Layout;

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

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
        <div
          style={{
            padding: '16px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {user && (
            <Button
              type="primary"
              danger
              onClick={async () => {
                await logout();
                navigate('/admin/login', { replace: true });
              }}
            >
              Logout
            </Button>
          )}
        </div>

        <Content style={{ padding: '24px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
