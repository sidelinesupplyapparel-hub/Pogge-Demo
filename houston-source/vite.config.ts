import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],base:'/Pogge-Demo/houston/',publicDir:false,build:{outDir:'../houston',assetsDir:'_app',emptyOutDir:false}});
