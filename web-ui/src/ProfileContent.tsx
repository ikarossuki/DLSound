import {useState} from 'react';
import {AudioLines,BookOpen,ChevronRight,FileText,FolderOpen,Info,Languages,RefreshCw,SlidersHorizontal,SunMoon,UserRound,Volume2} from 'lucide-react';
import {command,act,usePlayer} from './usePlayer';
import gpl from '../../android/LICENSE?raw';
import kuromoji from '../../licenses/kuromoji/LICENSE.md?raw';
import ipadic from '../../licenses/kuromoji/NOTICE.md?raw';
import ui from '../THIRD_PARTY_NOTICES.md?raw';
import logo from './dl-sound.svg';
export const titles:Record<string,string>={me:'我的',settings:'设置',about:'关于',playback:'播放',subtitles:'字幕与读音',appearance:'外观',files:'文件与曲库',track:'音轨字幕设置',licenses:'开源许可',statements:'第三方声明',gpl:'GNU GPL v3',kuromoji:'Kuromoji 许可证',ipadic:'IPADIC 词典声明',ui:'界面组件声明'};
const notices:Record<string,string>={gpl,kuromoji,ipadic,ui};
export function ProfileRow({label,detail,value,icon:Icon,action,disabled=false}:{label:string;detail?:string;value?:string;icon?:typeof Info;action:()=>void;disabled?:boolean}){
 return <button className="profile-row" aria-label={label} onClick={action} disabled={disabled}>{Icon&&<Icon/>}<span><strong>{label}</strong>{detail&&<small>{detail}</small>}</span>{value&&<small>{value}</small>}<ChevronRight/></button>;
}
export function ProfileContent({page,p,go,panel,tree,changeTree}:{page:string;p:ReturnType<typeof usePlayer>;go:(page:string)=>void;panel:(id:string)=>void;tree:boolean;changeTree:(tree:boolean)=>void}){
 const [checking,setChecking]=useState(false),[status,setStatus]=useState(''),[available,setAvailable]=useState(false);
 async function check(){
  setChecking(true);setStatus('正在检查更新…');setAvailable(false);
  try{const result=await command('checkUpdate');setStatus(result.message);setAvailable(result.available);}
  catch{setStatus('未能连接到 GitHub，请稍后重试。');}finally{setChecking(false);}
 }
 const theme=({system:'跟随系统',light:'浅色',dark:'深色'} as Record<string,string>)[p.prefs.theme];
 if(page==='me')return <><div className="profile-identity"><div className="profile-avatar"><UserRound/></div><div><h2>本地用户</h2><small>偏好保存在此设备</small></div></div>
 <ProfileRow label="设置" detail="播放、字幕与文件访问" icon={SlidersHorizontal} action={()=>go('settings')}/><ProfileRow label="关于 DL Sound" detail="版本、更新与开源许可" icon={Info} action={()=>go('about')}/></>;
 if(page==='settings')return <><h2>全局偏好</h2><ProfileRow label="播放" detail="速度、顺序与睡眠定时" icon={Volume2} value={p.prefs.speed+'×'} action={()=>go('playback')}/>
 <ProfileRow label="字幕与读音" detail="语言、假名与字幕样式" icon={Languages} value={p.prefs.language==='both'?'日中双语':p.prefs.language==='ja'?'日文':'中文'} action={()=>go('subtitles')}/>
 <ProfileRow label="外观" icon={SunMoon} value={theme} action={()=>go('appearance')}/><ProfileRow label="文件与曲库" detail="目录授权、浏览方式与刷新" icon={FolderOpen} action={()=>go('files')}/>
 <h2>仅对当前音轨生效</h2><ProfileRow label="音轨字幕设置" detail={p.track?'《'+p.track.title+'》的字幕和读音修正':'播放一首音轨后可设置字幕'} icon={AudioLines} disabled={!p.track} action={()=>go('track')}/></>;
 if(page==='appearance')return <><h2>显示</h2><ProfileRow label="主题" value={theme} icon={SunMoon} action={()=>panel('theme')}/></>;
 if(page==='files')return <><h2>访问权限</h2><ProfileRow label="音乐库访问" detail="读取设备中的音频" value={p.mediaPermission?'已允许':'未授权'} action={p.requestMedia}/>
 <ProfileRow label="字幕目录" detail="匹配同目录的字幕" value={p.treeGranted?'已选择':'选择目录'} action={p.requestTree}/><h2>曲库</h2>
 <label className="profile-choice">文件夹浏览方式<select value={tree?'tree':'flat'} onChange={e=>changeTree(e.target.value==='tree')}><option value="flat">平铺列表</option><option value="tree">按目录浏览</option></select></label>
 <ProfileRow label="刷新音乐库" icon={RefreshCw} action={p.refresh}/></>;
 if(page==='about')return <><div className="profile-identity about-brand"><img src={logo} alt=""/><div><h2>DL Sound</h2><small>本地音乐与日语音声播放器</small></div></div>
 <h2>版本信息</h2><div className="profile-info">当前版本<small>{p.appVersion}</small></div><div className="profile-info">构建类型<small>{p.buildKind} · {p.buildCode}</small></div>
 <ProfileRow label="检查更新" icon={RefreshCw} action={check} disabled={checking}/><p role="status">{status}</p>{available&&<ProfileRow label="前往 GitHub 下载" action={()=>act('openRelease')}/>}
 <h2>开源与声明</h2><ProfileRow label="开源许可" detail="播放器与离线注音组件" icon={BookOpen} action={()=>go('licenses')}/><ProfileRow label="第三方声明" detail="词典数据与界面组件" icon={FileText} action={()=>go('statements')}/></>;
 if(page==='licenses')return <><ProfileRow label="DL Sound 与上游播放器" detail="GNU GPL v3" icon={BookOpen} action={()=>go('gpl')}/><ProfileRow label="Kuromoji" detail="Apache License 2.0" icon={BookOpen} action={()=>go('kuromoji')}/></>;
 if(page==='statements')return <><ProfileRow label="IPADIC 词典" detail="原始数据及版权说明" icon={FileText} action={()=>go('ipadic')}/><ProfileRow label="界面组件" detail="依赖版本、作者与许可证" icon={FileText} action={()=>go('ui')}/></>;
 return <pre className="profile-legal">{notices[page]}</pre>;
}
