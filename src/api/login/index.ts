import request from '@/api/request';

export interface LoginDTO {
  account: string;
  password: string;
  captcha: string;
}

export interface CaptchaDTO {
  id: string;
  imageBase64: string;
}

const loginService = {
  // 登录
  login: (data: LoginDTO) => request.post('/api/auth/login', data),
  // 登出
  logout: () => request.post('/api/auth/logout'),
  // 获取验证码
  getCaptcha: () => request.get<CaptchaDTO>('/api/auth/captcha'),
};

export default loginService;