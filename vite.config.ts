import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import { wrapperEnv } from './build/getEnv';

export default defineConfig(({ mode }: ConfigEnv) => {
  //console.log('mode', mode); // mode development
  const root = process.cwd(); // vite运行的目录即根目录
  //console.log('root', root); // root E:\React\React-Admin
  const env = loadEnv(mode, root); // vite的环境变量
  // console.log('env', env);
  const viteEnv = wrapperEnv(env); // vite的环境变量
  return {
    base: viteEnv.VITE_BASE_PATH, //指定在构建生产版本时，HTML 文件所在的基础路径。
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
      port: viteEnv.VITE_PORT, // 指定服务器端口
      open: viteEnv.VITE_OPEN, // 自动打开浏览器
      cors: true,
      proxy: { // 代理
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
  }
});
