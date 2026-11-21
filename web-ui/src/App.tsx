import {useEffect,useMemo,useRef,useState,type CSSProperties,type ReactNode} from 'react';
import {ArrowDown,ArrowLeft,ArrowUp,BatteryFull,BookOpen,Check,ChevronDown,ChevronRight,Clock3,Disc3,Folder,Headphones,Heart,Moon,MoreVertical,Repeat1,Type,Languages,AlignCenter,ListMusic,MoreHorizontal,Pause,Play,Plus,Repeat2,Search,Settings2,Shuffle,Signal,SkipBack,SkipForward,SunMoon,Timer,Trash2,Volume2,UserRound,Wifi,X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription,DialogClose} from '@/components/ui/dialog';
import {Slider} from '@/components/ui/slider';
import {ToggleGroup,ToggleGroupItem} from '@/components/ui/toggle-group';
import {Switch} from '@/components/ui/switch';
import {Field,FieldGroup,FieldLabel,FieldDescription} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {InputGroup,InputGroupAddon,InputGroupInput} from '@/components/ui/input-group';
import {Empty,EmptyHeader,EmptyTitle,EmptyDescription,EmptyContent} from '@/components/ui/empty';
import {Alert,AlertTitle,AlertDescription} from '@/components/ui/alert';
import {Separator} from '@/components/ui/separator';
import {Badge} from '@/components/ui/badge';
import {toast,Toaster} from 'sonner';
import {cn} from '@/lib/utils';
import {usePlayer,usePlaybackTime,type Track} from './usePlayer';
import {indexLibrary,librarySelection} from './libraryIndex';
import {indexDirectories,nearestDirectory} from './directoryIndex';
import {ProfileContent,titles} from './ProfileContent';
import {LyricStage} from './LyricStage';

import {activeCues,formatTime,plainJa} from './domain.mjs';
import {subtitleTime,audioTime} from './timeline.mjs';

function IconButton({label,icon:Icon,onClick,disabled=false,variant='ghost',className='',...rest}:any){return <Button title={label} aria-label={label} variant={variant} size="icon" disabled={disabled} onClick={onClick} className={className} {...rest}><Icon data-icon="inline-start"/></Button>;}
function Cover({track,small=false}:{track?:Track;small?:boolean}){return <div className={cn('record-cover',small&&'record-small')} aria-hidden="true"><img src={track?.cover||"/cover/0"} alt="" loading={small?'lazy':'eager'}/></div>;}
function SettingRow({label,value,icon:Icon,onClick}:{label:string;value?:string;icon:any;onClick:()=>void}){return <button className="setting-row" onClick={onClick}><Icon/><span>{label}</span><small>{value}</small><ChevronRight/></button>;}
function Choice({label,value,options,onChange}:{label:string;value:string;options:[string,string][];onChange:(v:string)=>void}){return <Field><FieldLabel>{label}</FieldLabel><ToggleGroup type="single" value={value} onValueChange={v=>v&&onChange(v)} aria-label={label} variant="outline" className="choice-group">{options.map(([v,t])=><ToggleGroupItem key={v} value={v}>{t}</ToggleGroupItem>)}</ToggleGroup></Field>;}
function Blank({title,description,children}:{title:string;description:string;children?:ReactNode}){return <Empty><EmptyHeader><EmptyTitle>{title}</EmptyTitle><EmptyDescription>{description}</EmptyDescription></EmptyHeader>{children&&<EmptyContent>{children}</EmptyContent>}</Empty>;}

function readFolderBrowser():{tree:boolean;path:string}{
 const stored=window.DLSound?.readFolderBrowser?.();
 if(stored)return JSON.parse(stored);
 return {tree:localStorage.getItem('folder-view')==='tree',path:localStorage.getItem('folder-directory') ?? ''};
}

function saveFolderBrowser(tree:boolean,path:string){
 if(window.DLSound?.saveFolderBrowser?.(tree,path))return;
 localStorage.setItem('folder-view',tree?'tree':'flat');
 localStorage.setItem('folder-directory',path);
}

function MiniProgress({duration}:{duration:number}){
 const time=usePlaybackTime();
 return <div className="mini-progress" style={{width:`${duration?time/duration*100:0}%`}}/>;
}

export default function App(){
 const [scrub,setScrub]=useState<number|null>(null);
 const [expanded,setExpanded]=useState(false),[page,setPage]=useState('cover'),[section,setSection]=useState('folders'),[folder,setFolder]=useState(''),[query,setQuery]=useState('');
 const [settingsPath,setSettingsPath]=useState<string[]>([]),[showSearch,setShowSearch]=useState(false);

 const settingsPage=settingsPath.at(-1)||'';
 const closeSettings=()=>setSettingsPath(path=>path.slice(0,-1));
 const p=usePlayer(expanded || settingsPage==='track' || settingsPage==='subtitles');
 const [panel,setPanel]=useState(''),[actionTrack,setActionTrack]=useState<Track|null>(null),[follow,setFollow]=useState(true);
 const favorites:string[]=p.favorites;
 const playlists:{id:string;name:string;trackIds:string[]}[]=p.playlists;
 const library=useMemo(()=>indexLibrary(p.tracks),[p.tracks]);
 const [browser,setBrowser]=useState(readFolderBrowser);
 const {tree:treeMode,path:directoryPath}=browser;
 const directories=useMemo(()=>indexDirectories(p.tracks),[p.tracks]);
 const directory=nearestDirectory(directories,directoryPath);
 function openDirectory(path:string){
   saveFolderBrowser(true,path);
   setBrowser({tree:true,path});
 }
 const tree=treeMode && section==='folders';
 const browsingTree=tree && !query;
 const children=useMemo(()=>Array.from(directory.children.values()).sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true})),[directory]);
 const crumbs=[];
 for(let node=directory;;node=directories.get(node.parent)!){
   crumbs.unshift(node);
   if(!node.path)break;
 }
 function changeFolderMode(useTree:boolean){
   if(useTree===treeMode)return;
   saveFolderBrowser(useTree,directoryPath);
   setBrowser({tree:useTree,path:directoryPath});
   setFolder('');
 }
 const [listName,setListName]=useState(''),[editingList,setEditingList]=useState('');

 const [formError,setFormError]=useState('');
 const mediaPermission=p.mediaPermission,subtitlePermission=true;
 const touch=useRef<{x:number;y:number}|null>(null),panelTrigger=useRef<HTMLElement|null>(null);
 const dark=p.prefs.theme==='system'?p.systemDark:p.prefs.theme==='dark';
 useEffect(()=>{document.documentElement.classList.toggle('dark',dark);document.documentElement.style.setProperty('--system-font-scale',String(p.fontScale));},[dark,p.fontScale]);
 const openPanel=(name:string)=>{panelTrigger.current=document.activeElement as HTMLElement;setPanel(name);};
 const openSettings=(page='playback')=>{setPanel('');setSettingsPath(path=>path.at(-1)===page?path:[...path,page]);};
 const offset=p.offset;
 const openPlayer=()=>{setPage('cover');setExpanded(true);};
 const playTrack=(track:Track)=>{p.select(track,true,listed);setPage('cover');setExpanded(true);setFollow(true);};
 useEffect(()=>{setFollow(true);},[p.item?.itemId]);
 useEffect(()=>{const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'&&!e.defaultPrevented&&!panel){if(settingsPage)closeSettings();else if(expanded)setExpanded(false);};};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape);},[panel,expanded,settingsPage]);
 // This ref keeps the browser back handler in sync without multiplying history entries.
 const nav=useRef({panel,expanded,folder,settingsPage,tree,dir:directory.path,parent:directory.parent,showSearch});nav.current={panel,expanded,folder,settingsPage,tree,dir:directory.path,parent:directory.parent,showSearch};
 useEffect(()=>{window.dlSoundBack=()=>{const n=nav.current;if(n.panel)setPanel('');else if(n.settingsPage)closeSettings();else if(n.expanded)setExpanded(false);else if(n.showSearch){setShowSearch(false);setQuery('');}else if(n.tree&&n.dir)openDirectory(n.parent);else if(n.folder)setFolder('');else return false;return true;};return()=>{window.dlSoundBack=undefined;};},[]);
 const visibleCues=p.cues;
 const active=activeCues(visibleCues,subtitleTime(p.time,offset)),dialogues=useMemo(()=>visibleCues.filter((c:any)=>c.kind==='dialogue'),[visibleCues]),activeDialogue=active.filter((c:any)=>c.kind==='dialogue');
 const activeKey=activeDialogue.map((c:any)=>c.key).join('|');
 const favorite=(id:string)=>p.favorite(id);
 const selectedList=playlists.find(l=>l.id===folder);
 const listed=useMemo(()=>browsingTree ? directory.tracks
   : librarySelection(library,section,folder,query,favorites,selectedList?.trackIds),
   [browsingTree,directory,library,section,folder,query,favorites,selectedList]);
 const title=tree?(directory.path?directory.name:'文件夹'):section==='folders'?(library.folders.get(folder)?.name||'文件夹'):section==='albums'?(folder||'专辑'):folder==='favorites'?'我的收藏':selectedList?.name||'歌单';
 function TrackRow({track,index=0}:{track:Track;index?:number}){return <div className="track-row"><button className="track-main" onClick={()=>playTrack(track)}><span className="track-number">{p.track?.id===track.id?<Volume2 className="playing-mark"/>:index+1}</span><span className="track-copy"><strong className={p.track?.id===track.id?'is-current':''}>{track.title}</strong><small>{track.artist} · {formatTime(p.track?.id===track.id?p.duration:track.duration)}</small></span></button><IconButton label={'更多操作：'+track.title} icon={MoreHorizontal} onClick={()=>{setActionTrack(track);openPanel('track');}}/></div>;}
 function Japanese({cue}:{cue:any}){return <>{(cue.ja||[]).map((t:any,i:number)=>t.reading&&p.prefs.ruby?<ruby key={i}>{t.text}<rt aria-hidden="true">{t.reading}</rt></ruby>:<span key={i}>{t.text}</span>)}</>;}
 const subtitleUnavailable=!subtitlePermission||p.subtitleError||!dialogues.length;
 const panelTitle:Record<string,string>={settings:'播放与显示',speed:'播放速度',repeat:'播放顺序',sleep:'睡眠定时',theme:'外观',font:'字幕字号',rubySize:'读音大小',offset:'字幕偏移',menu:'更多',queue:'播放队列',language:'歌词语言',track:actionTrack?.title||'音轨操作',correction:'修正当前句读音',permissions:'文件访问',playlist:editingList?'重命名歌单':'创建歌单',addPlaylist:'加入歌单'};
 const languageNames:Record<string,string>={ja:'日语',zh:'中文',both:'双语'};
 const order=p.prefs.shuffle?'随机播放':p.prefs.repeat==='one'?'单曲循环':p.prefs.repeat==='all'?'列表循环':'顺序播放';
 function openCorrection(){p.correction();}
 function Mini(){return p.track?<div className="mini-player"><MiniProgress duration={p.duration}/><button className="mini-open" onClick={()=>{setSettingsPath([]);openPlayer();}}><Cover track={p.track} small/><span><strong>{p.track.title}</strong><small>{p.track.artist}</small></span></button><IconButton label={p.playing?'暂停':'播放'} icon={p.playing?Pause:Play} onClick={p.toggle}/><IconButton label="打开播放队列" icon={ListMusic} onClick={()=>openPanel('queue')}/></div>:null;}
 const bottomNav=<nav className="bottom-nav" aria-label="曲库导航">{[['folders','文件夹',Folder],['albums','专辑',Disc3],['playlists','歌单',ListMusic],['me','我的',UserRound]].map(([id,label,Icon]:any)=><button key={id} aria-current={section===id?'page':undefined} onClick={()=>{setSettingsPath([]);setExpanded(false);setSection(id);setFolder('');setQuery('');setShowSearch(false);}}><Icon/><span>{label}</span></button>)}</nav>;
 const profilePage=settingsPage||'me';
 return <>
 <main className="phone" style={{'--lyric-size':`${p.prefs.font*p.fontScale}px`,'--ruby-scale':p.prefs.rubyScale} as CSSProperties}>
 {settingsPage||(!expanded&&section==='me')?<div className="settings-page"><header className="compact-header">
 {settingsPage&&<IconButton label="返回上一页" icon={ArrowLeft} onClick={closeSettings}/>}<h1>{titles[profilePage]}</h1>
 <IconButton label={dark?'切换浅色':'切换深色'} icon={dark?SunMoon:Moon} onClick={()=>p.pref('theme',dark?'light':'dark')}/></header><div key={profilePage} className="settings-scroll profile-scroll">
 {settingsPage==='playback'?<>
 <SettingRow label="播放速度" value={p.prefs.speed+'×'} icon={Volume2} onClick={()=>openPanel('speed')}/>
 <SettingRow label="播放顺序" value={order} icon={Repeat2} onClick={()=>openPanel('repeat')}/>
 <SettingRow label="睡眠定时" value={p.sleep.mode==='off'?'关闭':p.sleep.mode==='end'?'本首结束':p.sleep.minutes+' 分钟'} icon={Timer} onClick={()=>openPanel('sleep')}/>
 </>:settingsPage==='subtitles'?<>
 <h2>字幕预览</h2><div className="font-preview">{p.prefs.language!=='zh'&&<p lang="ja" style={{fontSize:p.prefs.font*p.fontScale}}>{p.prefs.ruby?<ruby>明日<rt style={{fontSize:p.prefs.rubyScale+'em'}}>あした</rt></ruby>:'明日'}、また。</p>}{p.prefs.language!=='ja'&&<p>明天见。</p>}</div>
 <SettingRow label="字幕语言" value={languageNames[p.prefs.language]} icon={Languages} onClick={()=>openPanel('language')}/>
 <Field orientation="horizontal" className="setting-switch"><FieldLabel htmlFor="ruby"><Type/>显示读音</FieldLabel><Switch id="ruby" checked={p.prefs.ruby} onCheckedChange={v=>p.pref('ruby',v)}/></Field>
 <SettingRow label="字幕字号" value={p.prefs.font+' sp'} icon={Type} onClick={()=>openPanel('font')}/>
 <SettingRow label="读音大小" value={Math.round(p.prefs.rubyScale*100)+'%'} icon={Type} onClick={()=>openPanel('rubySize')}/>

 <Field orientation="horizontal" className="setting-switch"><FieldLabel htmlFor="depth"><AlignCenter/>立体歌词</FieldLabel><Switch id="depth" checked={p.prefs.depth} onCheckedChange={v=>p.pref('depth',v)}/></Field>
 </>:settingsPage==='track'?(p.track?<><h2>{p.track.title}</h2>
 <SettingRow label="导入字幕" icon={Folder} onClick={()=>p.importSubtitle()}/>
 <SettingRow label="字幕来源" value={p.manual?'手动选择':'自动匹配'} icon={BookOpen} onClick={()=>{if(p.manual)p.automatic();else toast(p.subtitleName||p.subtitleStatus);}}/>
 {p.subtitleError&&<p className="subtitle-status" role="status">{p.subtitleError}</p>}

 <div className="setting-gap"/><SettingRow label="个人读音" value={activeDialogue.length?'修正当前句':'当前没有台词'} icon={Type} onClick={openCorrection}/>
 <SettingRow label="字幕偏移" value={(offset>0?'+':'')+offset+' ms'} icon={Timer} onClick={()=>openPanel('offset')}/>
 </>:<p>请先播放一首音轨。</p>):<ProfileContent page={profilePage} p={p} go={openSettings} panel={openPanel} tree={treeMode} changeTree={changeFolderMode}/>}
 </div>{Mini()}{section==='me'&&!expanded&&bottomNav}</div>:!expanded?<div className="library">
 <header className="compact-header">
 {tree&&directory.path&&<IconButton label="返回上一级目录" icon={ArrowLeft} onClick={()=>{openDirectory(directory.parent);setQuery('');}}/>}
 {folder&&<IconButton label="返回文件列表" icon={ArrowLeft} onClick={()=>{setFolder('');setQuery('');}}/>}
 {showSearch?<InputGroup><InputGroupInput autoFocus aria-label="搜索音轨或专辑" placeholder="搜索音轨、专辑" value={query} onChange={e=>setQuery(e.target.value)}/><InputGroupAddon><Search/></InputGroupAddon></InputGroup>:<h1>{title}</h1>}
 <IconButton label={showSearch?'关闭搜索':'搜索'} icon={showSearch?X:Search} onClick={()=>{setShowSearch(!showSearch);setQuery('');}}/>
 {!showSearch&&section==='playlists'&&!folder&&<IconButton label="新建歌单" icon={Plus} onClick={()=>{setEditingList('');setListName('');setFormError('');openPanel('playlist');}}/>}
 <IconButton label="更多" icon={MoreVertical} onClick={()=>openPanel('menu')}/>
 </header>
 {section==='folders'&&!showSearch&&<div className="folder-view" role="group" aria-label="文件夹浏览方式">
   <button aria-pressed={!treeMode} onClick={()=>changeFolderMode(false)}><span>平铺列表</span></button>
   <button aria-pressed={treeMode} onClick={()=>changeFolderMode(true)}><span>按目录浏览</span></button>
 </div>}
 {browsingTree&&<nav className="directory-crumbs" aria-label="当前路径">{crumbs.map((node,index)=><span key={node.path}>{index>0&&<ChevronRight/>}<button aria-current={node===directory?'location':undefined} onClick={()=>openDirectory(node.path)}>{node.name}</button></span>)}</nav>}
 {!tree&&!folder&&!query&&section==='folders'&&<div className="breadcrumb">本地音乐 <ChevronRight/> 文件夹</div>}
 <div className="library-scroll" key={browsingTree?directory.path:section}>
 {!mediaPermission?<Blank title="允许读取音乐文件" description="授权后可浏览本地音乐。"><Button onClick={()=>p.requestMedia()}>允许访问</Button></Blank>:<>
 {browsingTree&&p.tracks.length>0?<>{children.map(child=><button className="folder-row" key={child.path} onClick={()=>openDirectory(child.path)}><Folder/><strong>{child.name}</strong><small>{child.total} 首</small><ChevronRight/></button>)}
 {listed.length>0&&<><div className="list-toolbar"><Button variant="ghost" size="sm" onClick={()=>{p.playCollection(listed);setPage('cover');setExpanded(true);setFollow(true);}}><Play/>播放本层 · {listed.length} 首</Button></div>{listed.map((track:Track,index:number)=><div key={track.id}>{TrackRow({track,index})}</div>)}</>}</>:!folder&&!query&&section==='folders'?(!p.tracks.length?<Blank title={p.libraryLoading?'正在读取音乐库':'还没有找到音频'} description="将音乐放入手机后刷新，支持 MP3、WAV、MP4 等本地音频。"><Button onClick={()=>p.refresh()}>刷新音乐库</Button></Blank>:[...library.folders].map(([id,f])=><button className="folder-row" key={id} onClick={()=>setFolder(id)}><Folder/><strong>{f.name}</strong><small>{f.tracks.length}</small><ChevronRight/></button>)):!folder&&!query&&section==='albums'?[...library.albums].map(([album,ts])=>{return <button className="album-row" key={album} onClick={()=>setFolder(album)}><Cover track={ts[0]} small/><span><strong>{album}</strong><small>{ts[0].artist} · {ts.length} 首</small></span><ChevronRight/></button>;}):!folder&&!query&&section==='playlists'?<><button className="album-row" onClick={()=>setFolder('favorites')}><span className="favorite-art"><Heart/></span><span><strong>我的收藏</strong><small>{favorites.length} 首</small></span><ChevronRight/></button>{playlists.map(l=><button className="album-row" key={l.id} onClick={()=>setFolder(l.id)}><Cover track={library.byId.get(l.trackIds[0])} small/><span><strong>{l.name}</strong><small>{l.trackIds.length} 首</small></span><ChevronRight/></button>)}</>:<>
 <div className="list-toolbar"><Button variant="ghost" size="sm" disabled={!listed.length} onClick={()=>{p.playCollection(listed);setPage('cover');setExpanded(true);setFollow(true);}}><Play data-icon="inline-start"/>播放全部 · {listed.length} 首</Button>{selectedList&&<Button variant="ghost" size="sm" onClick={()=>{setEditingList(selectedList.id);setListName(selectedList.name);setFormError('');openPanel('playlist');}}>编辑</Button>}</div>
 {listed.length?listed.map((t:Track,i:number)=><div key={t.id}>{TrackRow({track:t,index:i})}</div>):<Blank title={query?'没有找到音轨':'暂无音轨'} description={query?'试试其他关键词。':'可以从音轨的更多操作加入歌单。'}/>}
 </>}
 {p.sourceError&&<Alert><AlertTitle>音乐库暂时不可用</AlertTitle><AlertDescription>{p.sourceError}</AlertDescription></Alert>}
 </>}
 </div>{Mini()}
 {bottomNav}
 </div>:<div className="player">
 <header className="compact-header player-header"><IconButton label="收起播放器，返回曲库" icon={ChevronDown} onClick={()=>setExpanded(false)}/><strong>{p.track?.title||'暂无播放'}</strong><IconButton label="音轨操作" icon={MoreVertical} disabled={!p.track} onClick={()=>{setActionTrack(p.track);openPanel('track');}}/></header>
 <Tabs value={page} onValueChange={setPage} className="player-tabs">
 <div className="player-tools" aria-label="播放快捷操作"><Button className="speed-shortcut" size="sm" variant="ghost" aria-label="调整播放速度" onClick={()=>openPanel('speed')}>{String(p.prefs.speed)}×</Button><IconButton label="睡眠定时" aria-pressed={p.sleep.mode!=='off'} icon={Clock3} onClick={()=>openPanel('sleep')}/><div className="page-dots"><TabsList aria-label="播放页面"><TabsTrigger value="info" aria-label="简介"><span aria-hidden="true"/></TabsTrigger><TabsTrigger value="cover" aria-label="封面"><span aria-hidden="true"/></TabsTrigger><TabsTrigger value="lyrics" aria-label="歌词"><span aria-hidden="true"/></TabsTrigger></TabsList></div><Button className="language-cycle" size="sm" variant="ghost" aria-label={'字幕语言：'+languageNames[p.prefs.language]+'，点击切换'} onClick={()=>{const modes=['ja','zh','both'];p.pref('language',modes[(modes.indexOf(p.prefs.language)+1)%modes.length]);}}><span aria-hidden="true">{({ja:'日',zh:'中',both:'双'} as any)[p.prefs.language]}</span></Button><IconButton label="播放与显示设置" icon={Settings2} onClick={()=>openSettings('settings')}/></div>
 <div className="player-pages" onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}} onTouchEnd={e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;touch.current=null;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5){const pages=['info','cover','lyrics'],i=pages.indexOf(page);setPage(pages[Math.max(0,Math.min(2,i+(dx<0?1:-1)))]);}}}>
 <TabsContent value="cover" className="cover-page"><Cover track={p.track}/><div className="cover-title"><h1>{p.track?.title||'还没有播放音轨'}</h1><p>{p.track?.artist}</p></div></TabsContent>
 <TabsContent value="info" className="info-page"><div className="info-identity"><Cover track={p.track} small/><div><h2>{p.track?.title||'暂无音轨'}</h2><p>{p.track?.artist}</p></div></div><p>{p.track?.comment||'本地音频'}</p><dl><div><dt>专辑</dt><dd>{p.track?.album||'—'}</dd></div><div><dt>时长</dt><dd>{formatTime(p.duration)}</dd></div><div><dt>来源</dt><dd>{p.track?.fileName||'本地文件'}</dd></div><div><dt>字幕</dt><dd>{p.subtitleName||p.subtitleStatus}</dd></div></dl></TabsContent>
 <TabsContent value="lyrics" className="lyrics-page">
 <div className="lyric-overlay"><span className="scene-caption">{active.filter((c:any)=>c.kind==='scene').map((c:any)=>p.prefs.language==='ja'?plainJa(c):p.prefs.language==='zh'?c.zh||'暂无中文翻译':[plainJa(c),c.zh].filter(Boolean).join(' / ')).join(' · ')}</span></div>
 {subtitleUnavailable?<Blank title={!subtitlePermission?'需要字幕目录权限':p.subtitleError?'字幕暂时无法读取':'这首音轨还没有字幕'} description={p.subtitleStatus||"音乐播放不受影响。"}><Button disabled={!p.track} onClick={()=>!subtitlePermission?openPanel('permissions'):p.importSubtitle()}>{!subtitlePermission?'管理权限':'选择字幕'}</Button></Blank>:<LyricStage cues={dialogues} active={activeDialogue} time={subtitleTime(p.time,offset)} follow={follow} setFollow={setFollow} language={p.prefs.language} depth={p.prefs.depth} reducedMotion={p.reducedMotion} rubyVisible={p.prefs.ruby} layoutRevision={p.renderRevision||0} font={p.prefs.font*p.fontScale} rubyScale={p.prefs.rubyScale} offset={offset} duration={p.duration} trackKey={(p.item?.itemId||'')+':'+(p.doc?.fingerprint||'')} onCorrect={c=>p.correction(c.id)} onSeek={c=>p.seek(audioTime(c.startMs,offset,p.duration))} renderJapanese={c=>Japanese({cue:c})}/>}
 {p.readingBusy&&<Badge variant="secondary">读音生成中</Badge>}{p.readingFailed&&<Button variant="ghost" size="sm" onClick={()=>p.pref('ruby',true)}>自动读音失败，点此重试</Button>}
 </TabsContent>
 </div></Tabs>
 <footer className="transport"><Slider aria-label="播放进度" value={[scrub??p.time]} max={p.duration||1} step={100} disabled={!p.track||!p.duration} onValueChange={([t])=>setScrub(t)} onValueCommit={([t])=>{p.seek(t);setScrub(null);}}/><div className="time-labels"><span>{formatTime(p.time)}</span><span>{p.loading?'加载中':''}</span><span>{formatTime(p.duration)}</span></div>
 <div className="transport-controls"><IconButton label={order} icon={p.prefs.shuffle?Shuffle:p.prefs.repeat==='one'?Repeat1:Repeat2} onClick={()=>openPanel('repeat')}/><IconButton label="上一首" icon={SkipBack} disabled={!p.track} onClick={()=>p.skip(-1)}/><Button size="play" aria-label={p.playing?'暂停':'播放'} disabled={!p.track} onClick={p.toggle}>{p.playing?<Pause data-icon="inline-start"/>:<Play data-icon="inline-start"/>}</Button><IconButton label="下一首" icon={SkipForward} disabled={!p.track} onClick={()=>p.skip(1)}/><IconButton label="打开播放队列" icon={ListMusic} onClick={()=>openPanel('queue')}/></div>

 </footer></div>}
 </main>
 <Dialog open={!!panel} onOpenChange={open=>!open&&setPanel('')}><DialogContent className="app-sheet" showCloseButton={false} onEscapeKeyDown={e=>e.stopPropagation()} onCloseAutoFocus={e=>{e.preventDefault();panelTrigger.current?.focus();}}><DialogHeader><div className="sheet-heading"><DialogTitle>{panelTitle[panel]||'设置'}</DialogTitle><DialogClose asChild><IconButton label="关闭面板" icon={X}/></DialogClose></div><DialogDescription className="sr-only">{panel==='queue'?`${p.queue.length} 首音轨`:panelTitle[panel]||'调整选项'}</DialogDescription></DialogHeader>
 <div className="sheet-scroll">
 {panel==='menu'&&<div className="action-list"><Button variant="ghost" onClick={()=>openSettings('playback')}><Settings2 data-icon="inline-start"/>播放设置</Button><Button variant="ghost" onClick={()=>openSettings('subtitles')}><Languages data-icon="inline-start"/>字幕与读音</Button><Button variant="ghost" onClick={()=>setPanel('permissions')}>文件访问</Button><Button variant="ghost" onClick={()=>{p.refresh();setPanel('');}}>刷新音乐库</Button></div>}
 {panel==='speed'&&<Choice label="播放速度" value={String(p.prefs.speed)} options={['0.5','0.75','1','1.25','1.5','2'].map(v=>[v,v+'×'])} onChange={v=>p.pref('speed',Number(v))}/>}
 {panel==='repeat'&&<Choice label="播放顺序" value={p.prefs.shuffle?'shuffle':p.prefs.repeat} options={[["off","顺序播放"],["all","列表循环"],["one","单曲循环"],["shuffle","随机播放"]]} onChange={v=>{p.pref('repeat',v==='shuffle'?'all':v);p.pref('shuffle',v==='shuffle');}}/>}
 {panel==='sleep'&&<div className="radio-options" role="radiogroup" aria-label="睡眠定时">{[['off','关闭'],['15','15 分钟'],['30','30 分钟'],['60','60 分钟'],['end','本首结束']].map(([v,label])=>{const selected=(p.sleep.mode==='timer'?String(p.sleep.minutes):p.sleep.mode)===v;return <button key={v} role="radio" aria-checked={selected} onClick={()=>{p.setSleep(v==='off'||v==='end'?{mode:v}:{mode:'timer',minutes:Number(v),until:Date.now()+Number(v)*60000});setPanel('');}}><span>{label}</span><span className="radio-dot"/></button>;})}</div>}
 {panel==='theme'&&<Choice label="外观" value={p.prefs.theme} options={[["light","浅色"],["dark","深色"],["system","跟随系统"]]} onChange={v=>p.pref('theme',v)}/>}
 {panel==='font'&&<FieldGroup><Choice label="字幕字号" value={String(p.prefs.font)} options={[["16","16"],["18","18"],["20","20"],["23","23"],["24","24"],["28","28"],["32","32"],["40","40"]]} onChange={v=>p.pref('font',Number(v))}/><p className="font-preview" style={{fontSize:p.prefs.font*p.fontScale}}>今日は、ゆっくり歩いて帰ろう。</p></FieldGroup>}
 {panel==='rubySize'&&<FieldGroup><Choice label="读音大小" value={String(p.prefs.rubyScale)} options={[["0.34","小"],["0.42","标准"],["0.55","大"]]} onChange={v=>p.pref('rubyScale',Number(v))}/><p className="font-preview"><ruby>今日<rt style={{fontSize:24*p.prefs.rubyScale*p.fontScale}}>きょう</rt></ruby>は、ゆっくり。</p></FieldGroup>}
 {panel==='offset'&&<FieldGroup><Field><FieldLabel>字幕偏移 · {offset>0?'+':''}{offset} ms</FieldLabel><Slider aria-label="字幕偏移" min={-5000} max={5000} step={100} value={[offset]} onValueChange={([v])=>p.setOffset(v)}/><FieldDescription>正值让字幕晚出现，负值让字幕提前。仅应用于当前音轨和字幕。</FieldDescription></Field><Button variant="outline" onClick={()=>p.setOffset(0)}>重置为 0 ms</Button></FieldGroup>}
 {panel==='language'&&<FieldGroup><Choice label="显示语言" value={p.prefs.language} options={[["ja","日文"],["zh","中文"],["both","日中双语"]]} onChange={v=>p.pref('language',v)}/><Field orientation="horizontal"><FieldLabel htmlFor="lang-ruby">显示假名</FieldLabel><Switch id="lang-ruby" checked={p.prefs.ruby} onCheckedChange={v=>p.pref('ruby',v)}/></Field><Button variant="outline" onClick={()=>openSettings('subtitles')}>更多歌词设置</Button></FieldGroup>}
 {panel==='queue'&&<>{!p.queue.length?<Blank title="队列是空的" description="从音轨的更多操作中添加下一首，或直接播放音轨。"><Button onClick={()=>{setPanel('');setExpanded(false);}}>返回曲库</Button></Blank>:<><div className="queue-list">{p.queue.map((q:any,i:number)=><div key={q.itemId} className={cn('queue-row',i===p.index&&'queue-current')}><button className="queue-select" onClick={()=>p.jump(i)}><span className="queue-number">{i===p.index?<Volume2/>:String(i+1).padStart(2,'0')}</span><span><strong>{q.track.title}</strong><small>{q.track.artist}</small></span></button><div className="queue-actions"><IconButton label={`上移第${i+1}首`} icon={ArrowUp} disabled={i===0} onClick={()=>p.move(q.itemId,-1)}/><IconButton label={`下移第${i+1}首`} icon={ArrowDown} disabled={i===p.queue.length-1} onClick={()=>p.move(q.itemId,1)}/><IconButton label={`移除第${i+1}首`} icon={X} onClick={()=>p.remove(q.itemId)}/></div></div>)}</div><Button variant="outline" onClick={()=>{p.clear();toast('已清空队列，文件保持不变');}}><Trash2 data-icon="inline-start"/>清空播放队列</Button></> }</>}
 {panel==='track'&&actionTrack&&<div className="action-list"><Button variant="ghost" onClick={()=>{playTrack(actionTrack);setPanel('');}}><Play data-icon="inline-start"/>立即播放</Button><Button variant="ghost" onClick={()=>{p.append(actionTrack,true);setPanel('');}}><SkipForward data-icon="inline-start"/>下一首播放</Button><Button variant="ghost" onClick={()=>{p.append(actionTrack);setPanel('');}}><Plus data-icon="inline-start"/>加入播放队列</Button><Button variant="ghost" onClick={()=>favorite(actionTrack.id)}><Heart data-icon="inline-start"/>{favorites.includes(actionTrack.id)?'取消收藏':'收藏音轨'}</Button><Button variant="ghost" onClick={()=>setPanel('addPlaylist')}><ListMusic data-icon="inline-start"/>加入歌单</Button>{selectedList&&<Button variant="ghost" onClick={()=>{p.playlist('remove',{id:selectedList.id,trackId:actionTrack.id}).then(()=>{setPanel('');toast('已从歌单移除，文件保持不变');}).catch((e:Error)=>toast.error(e.message));}}>从当前歌单移除</Button>}</div>}
 {panel==='playlist'&&<form onSubmit={e=>{e.preventDefault();const name=listName.trim();if(!name){setFormError('请填写歌单名称。');return;}if(playlists.some(l=>l.name===name&&l.id!==editingList)){setFormError('这个名称已经存在，请换一个。');return;}p.playlist(editingList?'rename':'create',{id:editingList,name}).then(()=>{setPanel('');toast.success(editingList?'歌单已重命名':'歌单已创建');}).catch((e:Error)=>setFormError(e.message));}}><FieldGroup><Field data-invalid={!!formError}><FieldLabel htmlFor="list-name">歌单名称</FieldLabel><Input id="list-name" maxLength={60} value={listName} onChange={e=>setListName(e.target.value)} aria-invalid={!!formError} placeholder="例如：睡前慢听"/>{formError&&<FieldDescription>{formError}</FieldDescription>}</Field><Button type="submit">保存歌单</Button>{editingList&&<Button type="button" variant="outline" onClick={()=>{p.playlist('delete',{id:editingList}).then(()=>{setFolder('');setPanel('');toast('歌单已删除，音频文件不变');}).catch((e:Error)=>toast.error(e.message));}}>删除歌单</Button>}</FieldGroup></form>}
 {panel==='addPlaylist'&&actionTrack&&<div className="action-list">{playlists.length?playlists.map(l=><Button key={l.id} variant="outline" onClick={()=>{p.playlist('add',{id:l.id,trackId:actionTrack.id}).then(()=>{setPanel('');toast.success('已加入 '+l.name);}).catch((e:Error)=>toast.error(e.message));}}><ListMusic data-icon="inline-start"/>{l.name}</Button>):<Blank title="先创建一张歌单" description="创建后，回到音轨的更多操作即可加入。"><Button onClick={()=>{setEditingList('');setListName('');setFormError('');setPanel('playlist');}}>创建歌单</Button></Blank>}</div>}
 {panel==='permissions'&&<FieldGroup><p>音乐访问与字幕目录授权相互独立。音频及字幕原文件保持不变。</p><SettingRow icon={Folder} label="音乐库访问" value={mediaPermission?'已允许':'未授权'} onClick={()=>p.requestMedia()}/><SettingRow icon={BookOpen} label="字幕目录" value={p.treeGranted?'已选择':'选择目录'} onClick={()=>p.requestTree()}/><Button variant="outline" onClick={()=>p.refresh()}>刷新音乐库</Button></FieldGroup>}

 </div></DialogContent></Dialog>
 <Toaster theme={dark?'dark':'light'} position="top-center" richColors={false}/>
 </>;
}
