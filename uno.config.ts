// uno.config.ts
import { defineConfig } from 'unocss';

export default defineConfig({
  // ...UnoCSS options
  // 做一个使用flex布局水平垂直居中的类名
  shortcuts: {
    'film-center': 'flex items-center justify-center',
  },
});
