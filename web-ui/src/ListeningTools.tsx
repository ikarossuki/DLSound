import {useEffect,useState} from 'react';
import {Bookmark,Trash2} from 'lucide-react';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {command,type Track} from './usePlayer';
import {formatTime,plainJa} from './domain.mjs';
import {audioTime} from './timeline.mjs';

// One key per record lets the library and external player update different records independently.
export function useRecords<T extends {key:string}>(collection:string) {
 const prefix='dlsound/'+collection+'/';
 function read(){
  const rows:T[]=[];
  for(let i=0;i<localStorage.length;i++){
   const k=localStorage.key(i);
   if(k?.startsWith(prefix)){
    try{const entry=JSON.parse(localStorage.getItem(k)!);if(entry?.key===k.slice(prefix.length))rows.push(entry);}catch{/* Ignore a damaged entry. */}
   }
  }
  return rows;
 }
 const [rows,setRows]=useState(read);
 useEffect(()=>{
  const refresh=(event:StorageEvent)=>{if(!event.key||event.key.startsWith(prefix))setRows(read());};
  window.addEventListener('storage',refresh);
  return ()=>window.removeEventListener('storage',refresh);
 },[prefix]);
 function update(key:string,value?:T){
  try{
   if(value)localStorage.setItem(prefix+key,JSON.stringify(value));
   else localStorage.removeItem(prefix+key);
   setRows(read());return true;
  }catch{toast.error('设备存储不可用，未能保存更改');return false;}
 }
 return {rows,update};
}
export type Mark={key:string;source:string;title:string;name:string;start:number;end?:number;created:number};
export function sourceKey(track?:Track){
 if(!track)return '';
 const canonical=(path:string)=>('/'+path.replace(/^\/+/, '')).replace(/^\/sdcard\//,'/storage/emulated/0/');
 if(track.folder&&track.folder!=='local'&&track.fileName)return canonical(track.folder.replace(/\/$/,'')+'/'+track.fileName);
 if(track.id.startsWith('file://')){try{return canonical(decodeURIComponent(track.id.slice(7)));}catch{}}
 if(track.parentDocument?.startsWith('content://com.android.externalstorage.documents/document/')&&track.fileName){
  try{
   const parent=decodeURIComponent(track.parentDocument.split('/document/')[1]);
   const split=parent.indexOf(':');
   if(split>0){
    const volume=parent.slice(0,split),folder=parent.slice(split+1);
    return canonical(['/storage',volume==='primary'?'emulated/0':volume,folder,track.fileName].filter(Boolean).join('/'));
   }
  }catch{/* Keep the exact provider URI when the document cannot be identified. */}
 }
 return track.id;
}
export function MarkList({marks,play,remove}:{marks:Mark[];play:(m:Mark)=>void;remove:(key:string)=>void}){
 if(!marks.length)return <p>还没有书签。播放时打开「复听与书签」，即可保存时间点或片段。</p>;
 return <div>{[...marks].sort((a,b)=>b.created-a.created).map(m=><div key={m.key} className="track-row">
 <button className="track-main" onClick={()=>play(m)}><Bookmark/><span className="track-copy"><strong>{m.name}</strong><small>{m.title} · {formatTime(m.start)}{m.end!==undefined?' – '+formatTime(m.end):''}</small></span></button>
 <Button variant="ghost" size="icon" aria-label={'删除书签 '+m.name} onClick={()=>remove(m.key)}><Trash2/></Button></div>)}</div>;
}
type Bounds={start:number;end?:number};
export async function listen(track:string,start?:number,end?:number,passes=1,open=false,pauseAtEnd=false){
 await command('listen',{track,start,end,passes,open,pauseAtEnd});
}
export function ListeningTools({p,cue,offset,marks,save,remove,draft,onDraft}:{p:any;cue:any;offset:number;marks:Mark[];save:(m:Mark)=>boolean;remove:(key:string)=>void;draft:Bounds|null;onDraft:(v:Bounds|null)=>void}){
 const [passes,setPasses]=useState(3),[name,setName]=useState('');
 const track=p.track as Track|undefined;
 if(!track)return <p>请先打开音轨。</p>;
 const position=Math.min(Math.max(0,p.time),p.duration);
 async function start(bounds:Bounds,pauseAtEnd=false){
  try{await listen(track!.id,bounds.start,bounds.end,passes,false,pauseAtEnd);}catch(e){toast.error((e as Error).message);}
 }
 function bookmark(bounds:Bounds){
  if(bounds.start>=p.duration){toast.error('请先移到音轨结束之前');return;}
  const key=Array.from(crypto.getRandomValues(new Uint32Array(4))).join('-');
  if(save({key,source:sourceKey(track),title:track!.title,name:name.trim()||track!.title+' '+formatTime(bounds.start),...bounds,created:Date.now()})){
   setName('');toast.success('书签已保存');
  }
 }
 const range=p.listenRange;
 const sentence=cue&&{start:audioTime(cue.startMs,offset,p.duration),end:audioTime(cue.endMs,offset,p.duration)};
 return <div className="study-tools">
 <label className="profile-choice">播放遍数<select value={passes} onChange={e=>setPasses(Number(e.target.value))}>{[1,3,5,0].map(n=><option value={n} key={n}>{n?n+' 遍':'无限循环'}</option>)}</select></label>
 <Button disabled={!sentence||sentence.end<=sentence.start} onClick={()=>start(sentence)}>复听当前句</Button>
 {cue&&<small lang="ja">{plainJa(cue)}</small>}
 <div className="study-actions"><Button variant="outline" onClick={()=>onDraft({start:position})}>设 A 点{draft?' · '+formatTime(draft.start):''}</Button>
 <Button variant="outline" disabled={!draft||position<=draft.start} onClick={()=>onDraft({...draft!,end:position})}>设 B 点{draft?.end!==undefined?' · '+formatTime(draft.end):''}</Button></div>
 <label className="study-position">播放位置 · {formatTime(position)}<input aria-label="调整取点位置" type="range" min="0" max={p.duration||1} step="100" value={position} onChange={e=>p.seek(+e.target.value)}/></label>
 <Button variant="outline" disabled={draft?.end===undefined} onClick={()=>draft&&start(draft)}>播放 A–B 区间</Button>
 {range&&<Button variant="secondary" onClick={()=>listen(track.id).catch(e=>toast.error(e.message))}>结束复听 · {range.passes?'剩 '+range.passes+' 遍':'无限循环'}</Button>}
 <h3>保存书签</h3><Input aria-label="书签名称" placeholder="书签名称（可选）" value={name} maxLength={100} onChange={e=>setName(e.target.value)}/>
 <div className="study-actions"><Button variant="outline" onClick={()=>bookmark({start:position})}>保存当前时间点</Button><Button variant="outline" disabled={draft?.end===undefined} onClick={()=>draft&&bookmark(draft)}>收藏 A–B 片段</Button></div>
 <h3>本曲书签</h3><MarkList marks={marks} remove={remove} play={m=>start(m,true)}/></div>;
}
