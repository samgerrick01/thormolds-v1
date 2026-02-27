import { Layout, Menu, Badge } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { useCartStore } from '@store/cart.store';
import { useAuthStore } from '@store/auth.store';

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const cartItems = useCartStore((s) => s.items);
  const user = useAuthStore((s) => s.user);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* HEADER */}
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* LOGO */}
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

        {/* NAV */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          items={
            [
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
              user?.role === 'admin'
                ? {
                    key: 'admin',
                    label: 'Admin',
                    onClick: () => navigate('/admin'),
                  }
                : null,
              user
                ? {
                    key: 'logout',
                    label: 'Logout',
                    onClick: () => {
                      // optional: call supabase.auth.signOut()
                      navigate('/login');
                    },
                  }
                : {
                    key: 'login',
                    label: 'Login',
                    onClick: () => navigate('/login'),
                  },
            ].filter(Boolean) as any
          }
        />
      </Header>

      {/* PAGE CONTENT */}
      <Content style={{ padding: '24px', background: '#fff' }}>
        <Outlet />
      </Content>

      {/* FOOTER */}
      <Footer style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} Thormolds. All rights reserved.
      </Footer>
    </Layout>
  );
}
