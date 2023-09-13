import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    UnoCSS(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')], // svg文件夹路径
      svgoOptions: true, // 启用svgo压缩
      symbolId: 'icon-[dir]-[name]' // 使用图标文件的名称作为symbol的id
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    host: 'localhost',
    port: 5678,
    open: true, // 自动打开浏览器
    cors: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    manifest: true,
    sourcemap: true,
  }
});
