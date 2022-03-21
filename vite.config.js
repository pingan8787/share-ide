import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src")
    },
  },
  // https://github.com/vitejs/vite/issues/6985
  build: {
    target: 'esnext'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/style/style.scss";' // 添加公共样式
      }

    }
  },
  plugins: [
    vue(), 
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ]
})
