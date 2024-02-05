import { memo, useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import { mapMenusToRouter } from '@/utils/routerHelper';
import { useMenuStore } from '@/stores/menu';
import staticRoutes from './routes/staticRoutes';
import Layouts from '@/layouts';
import ErrorPage from '@/pages/error/404';

const Router = () => {
  const { menuList } = useMenuStore();

  const [routes, setRoutes] = useState<RouteObject[]>([
    ...staticRoutes,
    {
      path: '/',
      element: <Layouts />,
      errorElement: <ErrorPage />,
      children: [...mapMenusToRouter(menuList || [])]
    }
  ]);

  // 监听菜单数据变化，并重新生成路由
  useMemo(() => {
    setRoutes([
      ...staticRoutes,
      {
        path: '/',
        element: <Layouts />,
        errorElement: <ErrorPage />,
        children: [...mapMenusToRouter(menuList)]
      }
    ]);
  }, [menuList]);

  return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default memo(Router);
