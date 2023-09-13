import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import SvgIcon from '@/components/SvgIcon';
import loginService from '@/api/login';
import { useRequest } from '@/hooks/useRequest';

const LoginForm: React.FC = () => {
  type FieldType = {
    account: string;
    password: string;
    remember: boolean;
  }

  const { data: captcha, refresh: refreshCaptcha } = useRequest(loginService.getCaptcha);

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
      <Form.Item
        name="captcha"
        rules={[{ required: true, message: '请输入验证码!' }]}
      >
        <Input
          placeholder="验证码"
          size="large"
          prefix={<SvgIcon name="captcha" />}
          suffix={(<img className="cursor-pointer" src={captcha?.imageBase64} onClick={refreshCaptcha} />)}
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