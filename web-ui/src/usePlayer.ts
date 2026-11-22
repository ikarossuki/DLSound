import {useEffect,useState,useSyncExternalStore} from 'react';
import {toast} from 'sonner';
export type Track={id:string;title:string;artist:string;album:string;albumId?:string;albumArtist?:string;trackNumber?:number;discNumber?:number;duration:number;folder:string;folderName?:string;demo:boolean;size?:number;cover?:string;comment?:string;fileName?:string};
export type QueueItem={itemId:string;track:Track};
declare global {interface Window {DLSound?:{send:(s:string)=>boolean;readFolderBrowser:()=>string|null;saveFolderBrowser:(tree:boolean,path:string)=>boolean};dlSoundEvent?:(s:any)=>void;dlSoundBack?:()=>boolean;}}
export const initial:any={tracks:[],queue:[],index:-1,time:0,duration:0,playing:false,loading:false,mediaPermission:false,libraryLoading:true,sourceError:'',doc:null,cues:[],subtitleError:'',subtitleStatus:'',manual:false,readingBusy:false,readingFailed:false,offset:0,offsetKey:'',favorites:[],playlists:[],fontScale:1,reducedMotion:false,systemDark:false,prefs:{theme:'system',language:'ja',ruby:true,font:20,rubyScale:.42,depth:true,speed:1,repeat:'all',shuffle:false},sleep:{mode:'off'}};
const pending=new Map<number,{resolve:(v:any)=>void;reject:(e:Error)=>void;timer:ReturnType<typeof setTimeout>}>();let serial=0;
export function command(action:string,data:any={}):Promise<any>{
 return new Promise((resolve,reject)=>{
   const bridge=window.DLSound;
   if(!bridge){reject(Error('本地播放器尚未连接'));return;}
   const id=++serial;
   const timer=setTimeout(()=>{pending.delete(id);reject(Error(action==='refresh'?'刷新超时，请重试':'操作超时，请重试'));},30000);
   pending.set(id,{resolve,reject,timer});
   try{
     if(bridge.send(JSON.stringify({id,action,data}))===false)throw Error('请求过大，请减少所选音轨数量');
   }catch(error){
     clearTimeout(timer);pending.delete(id);reject(error);
   }
 });
}
let refreshPending=false;
async function refreshLibrary(){
 if(refreshPending)return;
 refreshPending=true;
 try{
   await command('refresh');
   toast.success('刷新完成',{id:'library-refresh'});
 }catch(e){
   toast.error(e instanceof Error?e.message:'刷新失败，请重试',{id:'library-refresh'});
 }finally{refreshPending=false;}
}

export function act(action:string,data:any={}){return command(action,data).catch(e=>{toast.error(e.message);});}
export function readSaved<T>(key:string,fallback:T):T {try{return JSON.parse(sessionStorage.getItem(key)||'null')??fallback;}catch{return fallback;}}
export function save(key:string,value:unknown){try{sessionStorage.setItem(key,JSON.stringify(value));}catch{}}
let playbackTime=0;
const clockListeners=new Set<()=>void>();
const currentTime=()=>playbackTime;
function subscribeClock(listener:()=>void){
 clockListeners.add(listener);
 return ()=>{clockListeners.delete(listener);};
}
const ignoreClock=()=>()=>{};
export function usePlaybackTime(enabled=true){
 return useSyncExternalStore(enabled?subscribeClock:ignoreClock,currentTime);
}
export function usePlayer(watchClock:boolean){
 const time=usePlaybackTime(watchClock);
 const [s,setState]=useState(initial);
 useEffect(()=>{
   window.dlSoundEvent=(event:any)=>{
     if(event.reply){
       const request=pending.get(event.reply);
       if(request){
         clearTimeout(request.timer);pending.delete(event.reply);
         if(event.error)request.reject(Error(event.error));else request.resolve(event.value);
       }
       return;
     }
     if(event.error){toast.error(event.error);return;}
     const {time:position,...changes}=event;
     if(typeof position==='number' && position!==playbackTime){
       playbackTime=position;clockListeners.forEach(listener=>listener());
     }
     if(Object.keys(changes).length){
       setState((old:any)=>({...old,...changes,prefs:changes.prefs?{...old.prefs,...changes.prefs}:old.prefs}));
     }
   };
   void act('ready');return()=>{window.dlSoundEvent=undefined;};
 },[]);
 const item=s.queue[s.index],track=item?.track;
 return {...s,time,item,track,source:null,manualDocs:track&&s.manual?{[track.id]:s.doc}:{},
 pref:(key:string,value:any)=>act('pref',{key,value}),toggle:()=>act('toggle'),pause:()=>act('pause'),seek:(ms:number)=>act('seek',{ms}),
 select:(t:Track,_play=true,collection?:Track[])=>act('play',{ids:(collection?.some(x=>x.id===t.id)?collection:[t]).map(x=>x.id),startId:t.id}),playCollection:(ts:Track[])=>act('play',{ids:ts.map(x=>x.id)}),
 skip:(step:number)=>act('skip',{step}),jump:(i:number)=>act('jump',{itemId:s.queue[i]?.itemId}),append:(t:Track,next=false)=>act('append',{id:t.id,next}),
 remove:(itemId:string)=>act('remove',{itemId}),move:(itemId:string,targetId:string)=>act('move',{itemId,targetId}),clear:()=>command('clear'),
 setSleep:(v:any)=>act('sleep',v),setOffset:(value:number)=>act('offset',{value,key:s.offsetKey}),importSubtitle:()=>act('importSubtitle'),automatic:()=>act('automatic'),
 correction:(cueId?:string,index?:number)=>act('correction',{cueId,index,key:s.offsetKey}),requestVideo:()=>act('requestVideo'),closeExternal:()=>act('closeExternal'),requestMedia:()=>act('requestMedia'),requestTree:()=>act('requestTree'),refresh:refreshLibrary,
 favorite:(id:string)=>act('favorite',{id}),playlist:(action:string,data:any)=>command('playlist',{operation:action,...data}),
 };
}
