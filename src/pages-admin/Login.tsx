import { Form, Input, Button, Typography, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { adminSignIn } from '@features/auth/api';
import { useAuthStore } from '@store/auth.store';
import { useState } from 'react';
import Lightning from '@/components/reactbits/Lightning';

const { Title } = Typography;

export default function AdminLogin() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const admin = await adminSignIn(values.username, values.password);
      setUser(admin);
      message.success('Logged in successfully!');
      navigate('/admin', { replace: true });
    } catch (err: any) {
      message.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {/* Full-page Lightning background */}
      <div className="lightning-bg">
        <Lightning hue={260} xOffset={0} speed={1} intensity={1} size={1} />
      </div>

      {/* Centered login card */}
      <div className="login-card-wrapper">
        <Card className="login-card">
          <Title level={3} className="login-title">
            Thor Admin Back Panel
          </Title>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: 'Please enter your username' },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Button
              type="primary"
              danger
              block
              htmlType="submit"
              loading={loading}
            >
              Login as Admin
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}
