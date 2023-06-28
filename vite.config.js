import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

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
    react()
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
