// uno.config.ts
import { defineConfig } from 'unocss';

export default defineConfig({
  // ...UnoCSS options
  // 做一个使用flex布局水平垂直居中的类名
  shortcuts: {
    'film-center': 'flex items-center justify-center',
    'flex-center': 'flex items-center justify-center',
    'flex-column': 'flex flex-col',
    'color-transition': 'transition-colors duration-200 ease-in-out delay-0',
    'bg-primary': 'dark:bg-bgPrimaryColor-dark light:bg-bgPrimaryColor-light bg-bgPrimaryColor-light',
    'btn-icon':
      'dark:bg-[rgb(41,49,79)] dark:text-[rgb(124,77,255)] w-[34px] text-[16px] h-[34px] flex items-center justify-center bg-[rgb(237,231,246)] text-[rgb(94,53,177)] rounded-[8px] color-transition select-none cursor-pointer hover:(bg-[rgb(94,53,177)] text-[rgb(237,231,246)])'
  },
  theme: {
    extend: {
      colors: {
        bgPrimaryColor: {
          dark: 'rgb(17, 25, 54)',
          light: '#ffffff'
        },
        bgContainerColor: {
          dark: 'rgb(26, 34, 63)',
          light: 'rgb(238, 242, 246)'
        },
        textPrimaryColor: {
          dark: '#ffffff',
          light: '#121926'
        }
      }
    }
  }
});
