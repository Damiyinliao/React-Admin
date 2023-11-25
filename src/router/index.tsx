import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouteObject } from "react-router-dom";
import Layouts from "@/layouts";
import ErrorPage from "@/pages/error/404";
import { mapMenusToRouter } from "./routerHelper";
import { memo, useMemo, useState } from "react";
import staticRoutes from "./staticRoutes";
import { useMenuStore } from "@/stores/menu";

const Router = () => {

  const { menuList } = useMenuStore();

  const [routes, setRoutes] = useState<RouteObject[]>([
    ...staticRoutes,
    {
      path: "/",
      element: <Layouts />,
      errorElement: <ErrorPage />,
      children: [
        ...mapMenusToRouter(menuList || []),
      ]
    }
  ]);

  // 监听菜单数据变化，并重新生成路由
  useMemo(() => {
    setRoutes([
      ...staticRoutes,
      {
        path: "/",
        element: <Layouts />,
        errorElement: <ErrorPage />,
        children: [
          ...mapMenusToRouter(menuList),
        ]
      }
    ])
  }, [menuList])


  return (
    <RouterProvider router={createBrowserRouter(routes)} />
  );
}

export default memo(Router);