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
            { key: '1', label: 'Dashboard', onClick: () => navigate('/admin') },
            {
              key: '2',
              label: 'Products',
              onClick: () => navigate('/admin/products'),
            },
            {
              key: '3',
              label: 'Orders',
              onClick: () => navigate('/admin/orders'),
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
