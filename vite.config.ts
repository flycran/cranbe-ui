import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ vue() ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@c': path.resolve(__dirname, './packages/components/src'),
      '@p': path.resolve(__dirname, './packages'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'packages/components/dist'),
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, './packages/components/src/index.ts'), //指定组件编译入口文件
      name: 'cranbe-ui',
      fileName: 'cranbe-ui',
    }, //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [ 'vue', 'vue-router' ],
      output: {
        assetFileNames: 'assets/[name][extname]',
        globals: {
          vue: 'Vue',
        },
      },
    }, // rollup打包配置
  },
})
