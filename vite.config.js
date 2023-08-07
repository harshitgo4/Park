import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { VitePWA } from 'vite-plugin-pwa'

// Load environment variables from .env file
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  define: {
    'process.env': process.env,
    ...(process.env.NODE_ENV === 'production' ? {} : { global: 'window' }),
  },
  css: {
    postcss,
  },
  plugins: [
    react(),
    VitePWA({
      srcDir: 'src', // Replace 'src' with the path to your service worker file
      filename: 'sw.js', // Ensure the filename matches your service worker file name
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, '')
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    outDir: 'build',
  },
})
