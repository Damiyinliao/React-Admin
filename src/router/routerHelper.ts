import { MenuItem } from "@/interface";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";


export const modules = import.meta.glob('../pages/**/index.tsx') as any; // 获取所有的路由文件
export const pagePaths = Object.keys(modules)
  .map((path: string) => path.replace('../pages', '/pages')
  .replace('/index.tsx', ''));

// 将路由文件映射到路由组件
export const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
  const key = cur.replace('../pages', '/pages').replace('/index.tsx', '');
  prev[key] = lazy(() => modules[cur]());
  return prev;
}, {});
/**
 * @description 将菜单映射到路由
 * @param {MenuItem[]} menus
 * @returns {RouteObject[]}
 */
export function mapMenusToRouter(menus: MenuItem[] | undefined): RouteObject[] {
  if (!menus) {
    return [];
  }
  const routes: RouteObject[] = [];
  menus.forEach((menu) => {
    if (menu.type !== '2') return;
    const route: RouteObject = {
      path: menu.path,
      Component: components[menu.component],
    };
    routes.push(route);
  });
  return routes;
}