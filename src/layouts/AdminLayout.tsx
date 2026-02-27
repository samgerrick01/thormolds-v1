import { useAuthStore } from '@store/auth.store';
import { Button, Layout, Menu } from 'antd';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Menu items
  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', path: '/admin' },
    { key: 'products', label: 'Products', path: '/admin/products' },
    { key: 'orders', label: 'Orders', path: '/admin/orders' },
    { key: 'users', label: 'Users', path: '/admin/users' },
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (isMobile) setCollapsed(true); // auto-close on mobile/tablet
  };

  return (
    <div className="admin-layout">
      <Layout className="layout-content">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="md"
          collapsedWidth={0}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 6,
            }}
          >
            <img
              src="/navLogo.png"
              alt="Logo"
              style={{ height: '100%', padding: 4 }}
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            items={menuItems.map((item) => ({
              key: item.key,
              label: item.label,
              onClick: () => handleMenuClick(item.path),
            }))}
          />
        </Sider>

        <Layout>
          <div className="header-actions">
            {user && (
              <Button
                type="primary"
                danger
                className="logout-button"
                onClick={async () => {
                  await logout();
                  navigate('/admin/login', { replace: true });
                }}
              >
                Logout
              </Button>
            )}
          </div>

          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
