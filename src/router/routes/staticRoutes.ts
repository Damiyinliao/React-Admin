import { RouteObject } from 'react-router-dom';
import Login from '@/pages/login';
import ErrorPage from '@/pages/error/404';

const staticRoutes: RouteObject[] = [
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/error',
    Component: ErrorPage
  }
];
export default staticRoutes;
