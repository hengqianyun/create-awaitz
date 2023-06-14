import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver,
  AntDesignVueResolver,
} from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      dts: true,
      imports: ['vue', 'pinia'],
      resolvers: [ElementPlusResolver(), AntDesignVueResolver({ importStyle: 'less' })],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dts: true,
      include: ['./src/**/*.{js,jsx,ts,tsx,vue,html}'],
      resolvers: [ElementPlusResolver(), AntDesignVueResolver({ importStyle: 'less' })],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  // base: '/manager-child/goods/',  // 填写服务器地址
  server: {
    port: 3101,
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(
          __dirname,
          'src/style/base.less'
        )}";`,
        // modifyVars: {
        //   hack: `true; @import (reference) "${resolve(
        //     __dirname,
        //     'src/style/base.less'
        //   )}";`,
        // },
      },
    },
  },
})
