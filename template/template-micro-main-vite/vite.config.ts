import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => /^micro-app/.test(tag),
        },
      },
    }),
    vueJsx(),
    AutoImport({
      dts: true,
      imports: ['vue', 'pinia'],
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
        }),
      ],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      include: ['./src/**/*.{js,jsx,ts,tsx,vue,html}'],
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
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
