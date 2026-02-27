import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { adminSignIn } from '@features/auth/api';
import { useAuthStore } from '@store/auth.store';
import { useState } from 'react';

const { Title } = Typography;

export default function AdminLogin() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false); // <-- loading state

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true); // start loading
    try {
      const admin = await adminSignIn(values.username, values.password);
      setUser(admin);
      message.success('Logged in successfully!');
      navigate('/admin', { replace: true });
    } catch (err: any) {
      message.error(err.message || 'Login failed');
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '100px auto' }}>
      <Title level={3}>Admin Login</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button
          type="primary"
          danger
          block
          htmlType="submit"
          loading={loading} // <-- show spinner
        >
          Login as Admin
        </Button>
      </Form>
    </div>
  );
}
