import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import SvgIcon from '@/components/SvgIcon';
import loginService, { LoginDTO } from '@/api/login';
import useRequest from '@/hooks/useRequest';
import { useGlobalStore } from '@/stores/global';

const LoginForm: React.FC = () => {
  type FieldType = {
    username: string;
    password: string;
    code: string;
    remember: boolean;
  }

  const { setToken, setRefreshToken } = useGlobalStore();
  const { data: captcha, refresh: refreshCaptcha } = useRequest(loginService.getCaptcha);
  const { runAsync: login } = useRequest(loginService.login, { manual: true });

  const onFinish = async (values: LoginDTO) => {
    if (!captcha) return; // 验证码未加载完成
    values.captchaId = captcha.id;
    values.remember && delete values.remember;
    const [loginError, loginResult] = await login(values);
    if (loginError) {
      refreshCaptcha();
      return;
    }
    console.log('登录结果', loginResult);
    useGlobalStore.setState({
      token: loginResult.token,
      refreshToken: loginResult.refreshToken
    });
    setToken(loginResult.token);
    setRefreshToken(loginResult.refreshToken)
  };


  return (
    <Form
      name="basic"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      size="large"
    >
      <Form.Item<FieldType> name="username" rules={[{ required: true, message: '请输入账号!' }]}>
        <Input prefix={<UserOutlined />} size="large" />
      </Form.Item>
      <Form.Item<FieldType> name="password">
        <Input.Password
          prefix={<LockOutlined />}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <Form.Item<FieldType>
        name="code"
        rules={[{ required: true, message: '请输入验证码!' }]}
      >
        <Input
          placeholder="验证码"
          size="large"
          prefix={<SvgIcon name="captcha" />}
          suffix={(
            <img className="cursor-pointer" src={captcha?.imageBase64} onClick={refreshCaptcha} />
          )}
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