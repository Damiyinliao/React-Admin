import request from '@/api/request';

export interface LoginDTO {
  account: string;
  password: string;
}

const loginService = {
  login: (data: LoginDTO) => request.post('/login', data),
  logout: () => request.post('/logout')
};

export default loginService;