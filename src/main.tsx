import React from 'react';
import ReactDOM from 'react-dom/client';

import 'virtual:uno.css'; // unocss
import 'virtual:svg-icons-register'; // register svg icons

import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
