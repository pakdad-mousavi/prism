import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import 'dotenv/config';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: './',
  build: {
    outDir: 'dist-vue',
  },
  server: {
    port: Number(process.env.PORT),
    strictPort: true,
  },
});
