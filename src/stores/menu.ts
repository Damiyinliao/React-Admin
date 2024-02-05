import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export interface MenuItem {
  id: number;
  parentId: number;
  name: string;
  path: string;
  title: string;
  component: string;
  type: string;
  icon: string;
  sort: number;
  hidden: boolean;
  external: boolean;
  cache: boolean;
  permission?: string;
  authCode: string;
  children?: MenuItem[];
  // createTime: string;
  // updateTime: string;
  parentPath: string;
}

interface State {
  menuList: MenuItem[];
  currentMenu: MenuItem;
  openKeys: string[];
  selectedKeys: string[];
  isSetMenu: boolean;
  treeMenuList?: MenuItem[];
}

interface Action {
  setMenuList: (menuList: State['menuList']) => void;
  setCurrentMenu: (currentMenu: State['currentMenu']) => void;
  setOpenKeys: (openKeys: State['openKeys']) => void;
  setSelectedKeys: (selectedKeys: State['selectedKeys']) => void;
  setIsSetMenu: (isSetMenu: State['isSetMenu']) => void;
  setTreeMenuList: (treeMenuList: State['treeMenuList']) => void;
}

export const useMenuStore = create<State & Action>()(
  devtools(
    persist(
      (set) => {
        return {
          menuList: [
            {
              id: 1,
              parentId: 0,
              name: "home",
              title: "首页",
              path: "/home",
              type: "2",
              parentPath: "/",
              component: "/pages/home",
              icon: "HomeOutlined",
              sort: 1,
              hidden: false,
              external: false,
              permission: "laboris Ut",
              cache: true,
              authCode: "5"
            },
            {
              id: 8,
              parentId: 0,
              name: "system",
              title: "系统设置",
              path: "/system",
              type: "1",
              parentPath: "/",
              component: "/system",
              icon: "SettingOutlined",
              sort: 2,
              hidden: false,
              external: false,
              permission: "",
              cache: true,
              authCode: "null"
            },
            {
              id: 9,
              parentId: 8,
              name: "menu",
              title: "菜单",
              path: "/system/menu",
              type: "2",
              parentPath: "/system",
              component: "/pages/system/menu",
              icon: "MenuOutlined",
              sort: 21,
              hidden: false,
              external: false,
              permission: "",
              cache: true,
              authCode: "null"
            },
            {
              id: 10,
              parentId: 8,
              name: "role",
              title: "角色",
              path: "/system/role",
              type: "2",
              parentPath: "/system",
              component: "/pages/system/role",
              icon: "TeamOutlined",
              sort: 22,
              hidden: false,
              external: false,
              permission: "",
              cache: true,
              authCode: "null"
            },
            {
              id: 11,
              parentId: 0,
              name: "website",
              title: "网址",
              path: "/website",
              type: "2",
              parentPath: "/",
              component: "/pages/website",
              icon: "IeOutlined",
              sort: 10,
              hidden: false,
              external: false,
              permission: "null",
              cache: true,
              authCode: "null"
            },
            {
              id: 12,
              parentId: 0,
              name: "test",
              title: "测试",
              path: "/test",
              type: "2",
              parentPath: "/",
              component: "/pages/test",
              icon: "PushpinOutlined",
              sort: 11,
              hidden: false,
              external: false,
              permission: "null",
              cache: true,
              authCode: "null"
            },
            {
              id: 14,
              parentId: 0,
              name: "工具",
              title: "tool",
              path: "/tool",
              type: "1",
              parentPath: "/",
              component: "null",
              icon: "ToolOutlined",
              sort: 6,
              hidden: false,
              external: false,
              permission: "null",
              cache: true,
              authCode: "null"
            },
            {
              id: 15,
              parentId: 14,
              name: "图片裁剪",
              title: "cropper",
              path: "/tool/cropper",
              type: "2",
              parentPath: "/tool",
              component: "/pages/tool/cropper",
              icon: "PictureOutlined",
              sort: 61,
              hidden: false,
              external: false,
              permission: "null",
              cache: true,
              authCode: "null"
            }
          ],
          currentMenu: {} as MenuItem,
          openKeys: [],
          selectedKeys: [],
          isSetMenu: false,
          treeMenuList: [],
          setMenuList: (menuList: State['menuList']) => set({ menuList }, false, '设置menuList'),
          setCurrentMenu: (currentMenu: State['currentMenu']) => set({ currentMenu }, false, '设置currentMenu'),
          setOpenKeys: (openKeys: State['openKeys']) => set({ openKeys }, false, '设置openKeys'),
          setSelectedKeys: (selectedKeys: State['selectedKeys']) => set({ selectedKeys }, false, '设置selectedKeys'),
          setIsSetMenu: (isSetMenu: State['isSetMenu']) => set({ isSetMenu }, false, '设置isSetMenu'),
          setTreeMenuList: (treeMenuList: State['treeMenuList']) => set({ treeMenuList }, false, '设置treeMenuList')
        }
      },
      {
        name: 'menuStore',
        storage: createJSONStorage(() => localStorage)
      }
    ),
    { name: 'menuStore' }
  )
)