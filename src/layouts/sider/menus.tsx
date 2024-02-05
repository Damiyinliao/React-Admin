import React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useMatches } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useGlobalStore } from '@/stores/global';
import { MenuItem } from '@/interface';
import { useMenuStore } from '@/stores/menu';
import { transformTree } from '@/utils/treeHelper';
import { AntdIcons } from '@/components/AntdIcons';

type AntMenuItem = Required<MenuProps>['items'][number];

const Menus: React.FC = () => {
  const { pathname } = useLocation();
  const [defaultSelectedKeys] = useState([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { collapsed } = useGlobalStore();
  const { menuList } = useMenuStore();
  const matches = useMatches();

  // 展开菜单
  useEffect(() => {
    if (collapsed) {
      setOpenKeys([]);
    }
  }, [collapsed]);

  // 如果菜单是一级菜单，直接返回菜单标题，否则返回Link
  const getMenuTitle = (menu: MenuItem) => {
    if (menu.children?.length) {
      return menu.title;
    }
    return <Link to={menu.path}>{menu.title}</Link>;
  };

  const treeMenuData = useCallback((menus: MenuItem[]): AntMenuItem[] => {
    // 将菜单列表根据id和parentId转换成树形结构，并根据sort排序
    const menuTree = transformTree(menus, 'id', 'parentId').sort((a, b) => a.sort - b.sort);
    // 递归遍历树形结构，生成AntD想要的菜单
    return menuTree.map((menu: MenuItem) => {
      const children = menu.children?.filter((item) => !item.hidden) || [];
      return {
        key: menu.path,
        label: getMenuTitle(menu),
        icon: menu.icon && AntdIcons[menu.icon] && React.createElement(AntdIcons[menu.icon]),
        children: children.length ? treeMenuData(children || []) : null
      };
    });
  }, []);
  // 生成菜单数据并缓存
  const menuData = useMemo(() => {
    return treeMenuData(menuList.filter((item) => !item.hidden));
  }, []);

  const handleSetOpenKeys = (keys: string[]) => {
    setOpenKeys(keys);
    console.log('keys', keys);
    console.log('matches', matches);
  };

  return (
    <Menu
      className="bg-primary color-transition text-[16px]"
      defaultSelectedKeys={defaultSelectedKeys}
      openKeys={openKeys}
      mode="inline"
      items={menuData}
      onOpenChange={(keys) => handleSetOpenKeys(keys as string[])}
    />
  );
};

export default Menus;
