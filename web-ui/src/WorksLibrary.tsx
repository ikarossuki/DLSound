import {useMemo,useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Folder} from 'lucide-react';
import {toast} from 'sonner';
import type {Directory} from './directoryIndex';
import type {Track} from './usePlayer';
import {useRecords} from './ListeningTools';

type Work={key:string;name:string;actor:string;circle:string;version:string};
function blank(dir:Directory):Work{return {key:dir.path,name:dir.name,actor:'',circle:'',version:''};}
const rj=(name:string)=>name.match(/RJ\d{5,}/i)?.[0].toUpperCase()||'';
const ordered=(a:Track,b:Track)=>(a.discNumber||0)-(b.discNumber||0)||(a.trackNumber||0)-(b.trackNumber||0)||(a.fileName||a.title).localeCompare(b.fileName||b.title,undefined,{numeric:true});
function versionsOf(dir:Directory|undefined,roots:Set<string>){
 const versions=new Map<string,Track[]>();
 if(!dir)return versions;
 if(dir.tracks.length)versions.set('',[...dir.tracks].sort(ordered));
 function collect(node:Directory,tracks:Track[]){
  if(roots.has(node.path))return;
  for(const track of node.tracks)tracks.push(track);node.children.forEach(child=>collect(child,tracks));
 }
 dir.children.forEach(child=>{const tracks:Track[]=[];collect(child,tracks);if(tracks.length)versions.set(child.name,tracks.sort(ordered));});
 return versions;
}
export function WorksLibrary({directories,play}:{directories:Map<string,Directory>;play:(t:Track,list:Track[])=>void}){
 const saved=useRecords<Work>('works');
 const [selected,setSelected]=useState(''),[editing,setEditing]=useState(false),[root,setRoot]=useState(''),[query,setQuery]=useState(''),[mode,setMode]=useState('作品');
 const works=useMemo(()=>{
  const map=new Map<string,Work>();
  directories.forEach(dir=>{if(rj(dir.name))map.set(dir.path,blank(dir));});
  saved.rows.forEach(row=>map.set(row.key,row));
  return [...map.values()].sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}));
 },[directories,saved.rows]);
 const work=works.find(row=>row.key===selected);
 const roots=useMemo(()=>new Set(works.map(w=>w.key)),[works]);
 const versions=useMemo(()=>versionsOf(directories.get(selected),roots),[directories,selected,roots]);
 const preferred=work&&versions.has(work.version)?work.version:(versions.keys().next().value??'');
 const tracks=versions.get(preferred)||[];
 const [fields,setFields]=useState({name:'',actor:'',circle:''});
 function edit(work:Work){setRoot(work.key);setFields(work);setEditing(true);}
 if(editing)return <form className="study-tools" onSubmit={e=>{
  e.preventDefault();const dir=directories.get(root);if(!dir||!fields.name.trim())return;
  const prior=works.find(w=>w.key===root);
  if(saved.update(root,{key:root,name:fields.name.trim(),actor:fields.actor.trim(),circle:fields.circle.trim(),version:prior?.version||''})){
   setSelected(root);setEditing(false);toast.success('作品信息已保存');
  }
 }}>
 <label className="study-field">作品根目录<select required disabled={!!work} aria-label="作品根目录" value={root} onChange={e=>{setRoot(e.target.value);const dir=directories.get(e.target.value);if(dir)setFields(works.find(w=>w.key===dir.path)||blank(dir));}}>
 <option value="">选择一个音乐目录</option>{[...directories.values()].filter(d=>d.path).map(d=><option key={d.path} value={d.path}>{d.path}</option>)}</select></label>
 {(['name','actor','circle'] as const).map((key,i)=><label className="study-field" key={key}>{['作品名','声优','社团'][i]}<Input required={key==='name'} maxLength={160} value={fields[key]} onChange={e=>setFields({...fields,[key]:e.target.value})}/></label>)}
 <div className="study-actions"><Button type="submit">保存作品</Button><Button type="button" variant="ghost" onClick={()=>setEditing(false)}>取消</Button></div>
 {saved.rows.some(w=>w.key===root)&&<Button type="button" variant="ghost" onClick={()=>{
  if(saved.update(root)){setSelected('');setEditing(false);toast.success('已移除本地整理信息');}
 }}>{rj(directories.get(root)?.name||'')?'重置作品信息':'移除作品整理'}</Button>}</form>;
 if(work)return <div className="study-tools"><Button variant="ghost" onClick={()=>setSelected('')}>返回作品列表</Button>
 <h2>{work.name}</h2><small>{[rj(work.key.split('/').pop()||''),work.actor&&'声优 '+work.actor,work.circle&&'社团 '+work.circle].filter(Boolean).join(' · ')}</small>
 <Button variant="outline" onClick={()=>edit(work)}>编辑作品信息</Button>
 {tracks.length?<><label className="profile-choice">偏好版本<select aria-label="偏好版本" value={preferred} onChange={e=>saved.update(work.key,{...work,version:e.target.value})}>{[...versions.keys()].map(v=><option key={v} value={v}>{v||'根目录音轨'}</option>)}</select></label>
 <Button onClick={()=>play(tracks[0],tracks)}>播放此版本 · {tracks.length} 首</Button>{tracks.map((t,i)=><button key={t.id} className="track-main" onClick={()=>play(t,tracks)}><span className="track-number">{i+1}</span>{t.title}</button>)}</>:<p>作品目录里没有可读取的音轨。请检查存储设备并刷新曲库。</p>}</div>;
 const q=query.trim().toLowerCase(),groups=new Map<string,Work[]>();
 works.filter(w=>[w.name,w.actor,w.circle,rj(w.key)].some(v=>v.toLowerCase().includes(q))).forEach(w=>{
  const keys=mode==='声优'?w.actor.split(/[,，、;；]/).map(v=>v.trim()).filter(Boolean):[mode==='社团'?w.circle:''];
  for(const k of new Set(keys.length?keys:[''])){const rows=groups.get(k)||[];rows.push(w);groups.set(k,rows);}
 });
 return <div className="study-tools"><Button variant="outline" onClick={()=>{setRoot('');setFields({name:'',actor:'',circle:''});setEditing(true);}}>指定作品根目录</Button>
 <Input aria-label="搜索作品" placeholder="作品名、RJ 编号、声优或社团" value={query} onChange={e=>setQuery(e.target.value)}/>
 <label className="profile-choice">分组方式<select value={mode} onChange={e=>setMode(e.target.value)}>{['作品','声优','社团'].map(x=><option key={x}>{x}</option>)}</select></label>
 {!groups.size&&<p>{q?'没有匹配的作品。':'选择作品根目录即可开始整理；名称带 RJ 编号的目录会自动出现在这里。'}</p>}
 {[...groups].sort(([a],[b])=>a.localeCompare(b)).map(([group,rows])=><section key={group}>{mode!=='作品'&&<h3>{group||'未填写'+mode}</h3>}{rows.map(w=><button className="folder-row" key={w.key} onClick={()=>setSelected(w.key)}><Folder/><strong>{w.name}</strong><small>{w.actor}</small></button>)}</section>)}</div>;
}
