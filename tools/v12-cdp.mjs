import {execFileSync} from 'node:child_process';
import {writeFileSync,mkdirSync} from 'node:fs';
export const adb='C:/Users/Public/Android/Sdk/platform-tools/adb.exe';
export const serial='emulator-5588';
export const sh=(...args)=>execFileSync(adb,['-s',serial,...args],{encoding:'utf8'}).trim();
export const delay=ms=>new Promise(r=>setTimeout(r,ms));
export async function connect(){
 let page;
 for(let i=0;i<40;i++){
  try {
   const pid=sh('shell','pidof','local.dlsound.player.debug').split(' ')[0];
   const socket=sh('shell','cat','/proc/net/unix').split('\n').find(l=>l.includes('@webview_devtools_remote_'+pid))?.trim().split(' ').at(-1)?.slice(1);
   if(socket){sh('forward','tcp:9229','localabstract:'+socket);const pages=await (await fetch('http://127.0.0.1:9229/json')).json();page=pages.find(p=>p.url==='https://app.dlsound.local/');if(page)break;}
  }catch{}
  await delay(250);
 }
 if(!page)throw Error('Player WebView is not ready');
 const ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let id=0;const pending=new Map();const events=[];
 ws.onmessage=e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);if(p){pending.delete(d.id);d.error?p.reject(Error(JSON.stringify(d.error))):p.resolve(d.result);}}else events.push(d);};
 const call=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
 const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result?.value;};
 await call('Runtime.enable');await call('Page.enable');for(let i=0;i<40;i++){if(await evaluate("typeof window.dlSoundEvent==='function' && document.querySelector('.phone')!==null"))break;await delay(200);}await delay(500);
 const click=async text=>{const bounds=await evaluate(`(()=>{const e=[...document.querySelectorAll('button')].find(e=>e.getAttribute('aria-label')===${JSON.stringify(text)}||e.textContent.trim()===${JSON.stringify(text)});if(!e)return null;e.scrollIntoView({block:'nearest'});const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);if(!bounds)throw Error('Missing button '+text);await call('Input.dispatchMouseEvent',{type:'mousePressed',...bounds,button:'left',clickCount:1});await call('Input.dispatchMouseEvent',{type:'mouseReleased',...bounds,button:'left',clickCount:1});await delay(400);};
 const capture=async name=>{const data=execFileSync(adb,['-s',serial,'exec-out','screencap','-p']);mkdirSync('artifacts/v1.2',{recursive:true});writeFileSync('artifacts/v1.2/'+name+'.png',data);};
 return {call,evaluate,click,capture,events,close:()=>ws.close()};
}
if(process.argv[1]?.endsWith('v12-cdp.mjs')){const c=await connect();console.log(await c.evaluate('document.body.innerText'));await c.capture('first-launch');c.close();}
