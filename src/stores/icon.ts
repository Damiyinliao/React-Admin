import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { AntdIcons as antdIconList } from '@/components/AntdIcons';
import antIcons from '@/components/IconPicker/antIcons';

interface State {
  panelTabKey: string | number;
  iconList: any[];
  open: boolean;
  filterKeywords: string;
  icon: string;
  antdIconList: any[];
  iconFontList: any[];
}
interface Action {
  setPanelTabKey: (panelTabKey: State['panelTabKey']) => void;
  setIconList: (iconList: State['iconList']) => void;
  setOpen: (open: State['open']) => void;
  setFilterKeywords: (filterKeywords: State['filterKeywords']) => void;
  setIcon: (icon: State['icon']) => void;
}

export const useIconStore = create<State & Action>()(
  devtools(
    (set) => {
      return {
        panelTabKey: 'antd',
        iconList: [...antIcons],
        open: false,
        filterKeywords: '',
        icon: '',
        antdIconList,
        iconFontList: [],
        setPanelTabKey: (panelTabKey: State['panelTabKey']) => set({ panelTabKey }, false, '设置panelTabKey'),
        setIconList: (iconList: State['iconList']) => set({ iconList }, false, '设置iconList'),
        setOpen: (open: State['open']) => set({ open }, false, '设置open'),
        setFilterKeywords: (filterKeywords: State['filterKeywords']) =>
          set({ filterKeywords }, false, '设置filterKeywords'),
        setIcon: (icon: State['icon']) => set({ icon }, false, '设置icon')
      };
    },
    { name: 'iconStore' }
  )
);

// 展示用户会看到icon list
export const displayListSelector = (s: typeof useIconStore) => {
  // 判断来自哪个数据源
  const list = s.panelTabKey === 'antd' ? s.antdIconList : s.iconFontList;
  // 结构拿到
  const { filterKeywords } = s;
  // 过滤
  const filterList = list.filter((item) => {
    if (!filterKeywords) return true;
    switch (s.type) {
      case 'antd':
      case 'integrnal':
        return item.name.includes(filterKeywords);
    }
  });
};
