import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: [
  //     {
  //       find: "common",
  //       replacement: resolve(__dirname, "src/common"),
  //     },
  //   ],
  // },
  plugins: [svgr(), react()],
  server:{
    host: true,
    port: 4444
  }
})
