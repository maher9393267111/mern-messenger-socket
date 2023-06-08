 import { defineConfig } from 'vite'
 import react from '@vitejs/plugin-react'
 const path = require('path')


export default defineConfig({
  plugins: [react()],
  //root: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
 
 
})



