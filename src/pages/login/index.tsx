import React from 'react';
import SvgIcon from '@/components/SvgIcon';
import LoginForm from './components/LoginForm';
import './index.scss';

const Login: React.FC = () => {
  return (
    <div className='login-page'>
      <div className="logo-wrapper">
        <SvgIcon name="F" />
        <SvgIcon name="I" />
        <SvgIcon name="L" />
        <SvgIcon name="M" />
      </div>
      <div className="gradient-wrapper">
        <div className="gradient film-center">
          <h1 className="intro-title">Go For It</h1>
        </div>
        <div className="login-wrapper">
          <div className="login-title">
            <h1 className="mb-[10px]">Film Admin</h1>
            <h3 className="text-[rgba(0,0,0,.45)]">一个高颜值后台管理系统</h3>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
export default Login;
