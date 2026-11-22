import {defineConfig} from 'vite';
import postcss from 'postcss';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {fileURLToPath,URL} from 'node:url';
export default defineConfig({base:'/',cacheDir:'../.local/vite',plugins:[react(),tailwindcss(),{
 name:'android-8-styles', enforce:'post',
 generateBundle(_,bundle) {
   const sheet=Object.values(bundle).find(asset=>asset.type==='asset'&&asset.fileName.endsWith('.css'));
   if(!sheet||sheet.type!=='asset')return;
   const css=postcss.parse(String(sheet.source));
   css.walkAtRules('layer',rule=>{if(rule.nodes)rule.replaceWith(...rule.nodes.slice());else rule.remove();});
   this.emitFile({type:'asset',fileName:'legacy.css',source:css.toString()});
 }
}],resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url))}},publicDir:false,build:{target:"chrome69",cssTarget:"chrome69",outDir:'../android/app/src/main/assets/player',emptyOutDir:true}});
