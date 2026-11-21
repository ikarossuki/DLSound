import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {fileURLToPath,URL} from 'node:url';
export default defineConfig({base:'/',cacheDir:'../.local/vite',plugins:[react(),tailwindcss()],resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url))}},publicDir:false,build:{outDir:'../android/app/src/main/assets/player',emptyOutDir:true}});
