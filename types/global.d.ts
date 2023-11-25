export {};
declare global {
  type Recordable<K extends string | number | symbol = string, T = any> = Record<K extends null | undefined ? string : K, T>;

  interface ViteEnv {
    VITE_NODE_ENV: 'development' | 'production';
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_DROP_CONSOLE: boolean;
    VITE_DROP_DEBUGGER: boolean;
    VITE_GLOB_APP_TITLE: string;
    VITE_API_URL: string;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  }
}