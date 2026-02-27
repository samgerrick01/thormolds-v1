import { Layout, Menu, Badge, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCartStore } from '@store/cart.store';
import { useAuthStore } from '@store/auth.store';

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const cartItems = useCartStore((s) => s.items);
  const { user, logout } = useAuthStore();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          Thormolds
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            items={[
              {
                key: 'home',
                label: 'Home',
                onClick: () => navigate('/'),
              },
              {
                key: 'cart',
                label: (
                  <Badge count={cartItems.length} size="small">
                    <ShoppingCartOutlined /> Cart
                  </Badge>
                ),
                onClick: () => navigate('/cart'),
              },
            ]}
          />

          {user && (
            <Button
              type="primary"
              danger
              onClick={async () => {
                await logout();
                navigate('/login', { replace: true });
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </Header>

      <Content style={{ padding: '24px', background: '#fff' }}>
        {/* This will render the current route content */}
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} Thormolds. All rights reserved.
      </Footer>
    </Layout>
  );
}
