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
  permission: string;
  authCode: string;
  children?: MenuItem[];
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
          menuList: [],
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
    { name: 'menuStore'}
  )
)