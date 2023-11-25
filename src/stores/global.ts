import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface State {
  token: string;
  refreshToken: string;
  collapsed: boolean;
  themeMode: 'dark' | 'light';
}

interface Action {
  setToken: (token: State['token']) => void;
  setRefreshToken: (token: State['refreshToken']) => void;
  setCollapsed: (collapsed: State['collapsed']) => void;
  setThemeMode: (darkMode: State['themeMode']) => void;
}

export const useGlobalStore = create<State & Action>()(
  devtools(
    persist(
      (set) => {
        return {
          token: '',
          refreshToken: '',
          collapsed: false,
          themeMode: 'light',
          setToken: (token: State['refreshToken']) => set({ token }, false, '设置token'),
          setRefreshToken: (refreshToken: State['token']) => set({ refreshToken }, false, '设置refreshToken'),
          setCollapsed: (collapse: State['collapsed']) => set({ collapsed: collapse }, false, '设置collapsed'),
          setThemeMode: (themeMode: State['themeMode']) => set({ themeMode: themeMode }, false, '设置themeMode')
        }
      },
      {
        name: 'globalStore',
        storage: createJSONStorage(() => localStorage)
      }
    ),
    { name: 'globalStore'}
  )
)