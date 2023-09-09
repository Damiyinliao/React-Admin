import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

const LoginForm: React.FC = () => {
  type FieldType = {
    account: string;
    password: string;
    remember: boolean;
  }

  const onFinish = (values: unknown) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="basic"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      size="large"
    >
      <Form.Item<FieldType> name="account" rules={[{ required: true, message: '请输入账号!' }]}>
        <Input prefix={<UserOutlined />} size="large" />
      </Form.Item>
      <Form.Item<FieldType> name="password">
        <Input.Password
          prefix={<LockOutlined />}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <Form.Item<FieldType> name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button block htmlType="submit" type="primary">登录</Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;