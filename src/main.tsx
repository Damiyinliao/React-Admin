// import React from 'react';
import ReactDOM from 'react-dom/client';
import NProgress from 'nprogress';

import 'virtual:uno.css'; // unocss
import 'virtual:svg-icons-register'; // register svg icons
import 'nprogress/nprogress.css'

import App from './App.tsx';
import './index.css';
import './custom.css';

NProgress.configure({
  showSpinner: false,
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  parent: '#root'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // 开启严格模式 页面会被渲染两次
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
);
