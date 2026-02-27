import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@auth/api';
import { useAuthStore } from '@store/auth.store';

export default function AdminLogin() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const onFinish = async (values: any) => {
    try {
      const user = await signIn(values.email, values.password);

      if (user.role !== 'admin') {
        message.error('Unauthorized admin access');
        return;
      }

      setUser(user);
      navigate('/admin');
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <h2>Admin Login</h2>
      <Form.Item name="email" rules={[{ required: true }]}>
        <Input placeholder="Admin Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Button type="primary" danger htmlType="submit">
        Login as Admin
      </Button>
    </Form>
  );
}
