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
    target: 'esnext',
    rollupOptions: {
      output: {
        // https://rollupjs.org/guide/en/#outputmanualchunks
        // manualChunks: {
        //   lodash: ['lodash']
        // }
      }
    }
  },
  css: {
    postcss: {
      plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
      ],
    },
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "./src/style/index.scss";' // 添加公共样式
      },
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
