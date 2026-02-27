import { Form, Input, Button, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@services/supabase';
import { useAuthStore } from '@store/auth.store';

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(values);
      if (error) throw error;
      if (!data.user) throw new Error('Login failed');

      // fetch role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;
      if (profile.role !== 'user') {
        await supabase.auth.signOut();
        message.error('Use admin login instead');
        return;
      }

      setUser({
        id: data.user.id,
        email: data.user.email!,
        role: 'user',
      });

      navigate('/', { replace: true });
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '100px auto' }}>
      <Title level={3}>User Login</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary" block htmlType="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
