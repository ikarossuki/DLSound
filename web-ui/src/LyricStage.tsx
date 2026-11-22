import {useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode} from 'react';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {audioTime} from './timeline.mjs';
import {WindowedRows} from './WindowedRows';
import {lyricLabel,formatTime, plainJa} from './domain.mjs';
import {stepSpring,stepInertia,lyricProjection} from './lyricMotion.mjs';

type Props = {offset:number; duration:number; cues:any[]; active:any[]; time:number; follow:boolean; setFollow:(v:boolean)=>void; language:string; depth:boolean; reducedMotion:boolean; rubyVisible:boolean; layoutRevision:number; font:number; rubyScale:number; trackKey:string; onSeek:(cue:any)=>void; onCorrect:(cue:any)=>void; renderJapanese:(cue:any)=>ReactNode};

/** Audio selection and visual focus are independent. Touch position is direct;
 * release inertia and wheel/auto-follow springs repaint the same geometry. */
export function LyricStage({offset,duration,cues,active,time,follow,setFollow,language,depth,reducedMotion,rubyVisible,layoutRevision,font,rubyScale,trackKey,onSeek,onCorrect,renderJapanese}:Props){
 const long=cues.length>120;
 const focusIndex=useMemo(()=>active.length?cues.indexOf(active[0]):-1,[cues,active[0]]);
 const viewport=useRef<HTMLDivElement>(null), frame=useRef(0), moved=useRef(false), start=useRef({x:0,y:0});
 const holdingDrag=useRef(false);
 const [previewStart,setPreviewStart]=useState<number|null>(null);
 const clearPreview=()=>{holdingDrag.current=false;setPreviewStart(null);};
 const motion=useRef({frame:0,target:0,velocity:0,last:0,kind:'spring'});
 const [mediaReduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const reduced=mediaReduced||reducedMotion;
 const activeKey=active.map(c=>c.key).join('|');
 const followRef=useRef(follow);followRef.current=follow;
 const displayRef=useRef({depth,reduced});displayRef.current={depth,reduced};
 const layoutKey=`${trackKey}:${language}:${font}:${rubyScale}:${cues.length}:${rubyVisible}:${layoutRevision}`;
 const paint=()=>{
  const el=viewport.current;if(!el)return;
  const focus=el.scrollTop+el.clientHeight*.46;
  const rows=Array.from(el.querySelectorAll<HTMLElement>('.lyric-row'));
  // Read the untransformed row geometry first; effects never change hit boxes.
  const origin=el.getBoundingClientRect().top-el.scrollTop;
  const positions=rows.map(row=>row.getBoundingClientRect().top-origin+row.offsetHeight/2);
  if(holdingDrag.current && rows.length){
   const middle=el.scrollTop+el.clientHeight/2;
   const target=rows.find((row,i)=>positions[i]+row.offsetHeight/2>middle) ?? rows[rows.length-1];
   setPreviewStart(Number(target.dataset.start));
  }
  rows.forEach((row,i)=>{
   const distance=(positions[i]-focus)/Math.max(110,el.clientHeight*.30);
   const v=lyricProjection(distance,displayRef.current.depth&&!displayRef.current.reduced);
   row.style.setProperty('--line-scale',String(v.scale));
   row.style.setProperty('--line-angle',`${v.angle}deg`);
   row.style.setProperty('--line-z',`${v.z}px`);
   row.style.setProperty('--line-alpha',String(v.opacity));
   row.dataset.distance=distance.toFixed(3);
  });
 };
 const schedule=()=>{if(frame.current)return;frame.current=requestAnimationFrame(()=>{frame.current=0;paint();});};
 const stopMotion=()=>{cancelAnimationFrame(motion.current.frame);motion.current.frame=0;motion.current.velocity=0;};
 const animateTo=(target:number)=>{
  const el=viewport.current;if(!el)return;
  if(motion.current.kind==='inertia')stopMotion();motion.current.kind='spring';
  const m=motion.current;m.target=Math.max(0,Math.min(target,el.scrollHeight-el.clientHeight));
  if(reduced){stopMotion();el.scrollTop=m.target;schedule();return;}
  if(m.frame)return;m.last=performance.now();
  const tick=(now:number)=>{
   const next=stepSpring(el.scrollTop,m.velocity,m.target,(now-m.last)/1000);m.last=now;m.velocity=next.velocity;
   el.scrollTop=next.position;schedule();
   if(Math.abs(el.scrollTop-m.target)<.65&&Math.abs(m.velocity)<8){el.scrollTop=m.target;m.frame=0;m.velocity=0;schedule();return;}
   m.frame=requestAnimationFrame(tick);
  };m.frame=requestAnimationFrame(tick);
 };
 const center=(smooth=true)=>{
  const el=viewport.current;if(!el)return;
  el.style.setProperty('--lyric-pad',`${el.clientHeight*.46}px`);
  const rows=Array.from(el.querySelectorAll<HTMLElement>('.lyric-row'));
  if(long){schedule();return;}
  const target=rows.find(row=>row.dataset.active==='true')||rows.find(row=>Number(row.dataset.start)>=time)||rows.at(-1);
  if(!target)return;
  const y=Math.max(0,target.offsetTop+target.offsetHeight/2-el.clientHeight*.46);
  if(smooth)animateTo(y);else{stopMotion();el.scrollTop=y;}
  schedule();
 };
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
 useLayoutEffect(()=>{if(follow)center(false);else schedule();},[layoutKey]);
 useEffect(()=>{if(follow)center();},[activeKey,follow]);
 useEffect(()=>{schedule();if(reduced)stopMotion();},[depth,reduced]);
 useEffect(()=>{const el=viewport.current;if(!el)return;const observer=new ResizeObserver(()=>{el.style.setProperty('--lyric-pad',`${el.clientHeight*.46}px`);if(followRef.current)center(false);else schedule();});observer.observe(el);return()=>{observer.disconnect();cancelAnimationFrame(frame.current);frame.current=0;stopMotion();};},[layoutKey]);
 useEffect(()=>{const el=viewport.current;if(!el)return;const wheel=(e:WheelEvent)=>{e.preventDefault();setFollow(false);const delta=e.deltaY*(e.deltaMode===1?20:e.deltaMode===2?el.clientHeight:1);animateTo((motion.current.frame&&motion.current.kind==='spring'?motion.current.target:el.scrollTop)+delta);};el.addEventListener('wheel',wheel,{passive:false});return()=>el.removeEventListener('wheel',wheel);},[reduced,layoutKey]);
 useEffect(()=>{
  const el=viewport.current;if(!el)return;
  let axis='',originScroll=0,lastY=0,lastTime=0,velocity=0;
  const begin=(e:TouchEvent)=>{stopMotion();clearPreview();moved.current=false;axis='';if(e.touches.length!==1){axis='multi';moved.current=true;return;}velocity=0;originScroll=el.scrollTop;lastY=e.touches[0].clientY;lastTime=performance.now();start.current={x:e.touches[0].clientX,y:lastY};};
  const drag=(e:TouchEvent)=>{
   if(e.touches.length!==1)return;const point=e.touches[0],dy=point.clientY-start.current.y,dx=point.clientX-start.current.x;
   if(!axis&&Math.max(Math.abs(dx),Math.abs(dy))>8){axis=Math.abs(dy)>Math.abs(dx)?'y':'x';moved.current=true;if(axis==='y'){holdingDrag.current=true;setFollow(false);}}
   if(axis!=='y')return;e.preventDefault();
   const now=performance.now(),dt=Math.max(8,now-lastTime),instant=(lastY-point.clientY)/dt*1000;
   velocity=velocity*.25+Math.max(-2500,Math.min(2500,instant))*.75;
   el.scrollTop=originScroll-dy;lastY=point.clientY;lastTime=now;schedule();
  };
  const end=(e:TouchEvent)=>{
   clearPreview();
   if(axis!=='y'||e.type==='touchcancel'||displayRef.current.reduced||performance.now()-lastTime>100)return;
   const m=motion.current;m.kind='inertia';m.velocity=velocity;m.last=performance.now();
   const tick=(now:number)=>{const next=stepInertia(el.scrollTop,m.velocity,(now-m.last)/1000);m.last=now;m.velocity=next.velocity;const bounded=Math.max(0,Math.min(next.position,el.scrollHeight-el.clientHeight));el.scrollTop=bounded;schedule();if(Math.abs(m.velocity)<12||bounded!==next.position){m.frame=0;m.velocity=0;return;}m.frame=requestAnimationFrame(tick);};
   m.frame=requestAnimationFrame(tick);
  };
  el.addEventListener('touchstart',begin,{passive:true});el.addEventListener('touchmove',drag,{passive:false});el.addEventListener('touchend',end);el.addEventListener('touchcancel',end);
  return()=>{clearPreview();el.removeEventListener('touchstart',begin);el.removeEventListener('touchmove',drag);el.removeEventListener('touchend',end);el.removeEventListener('touchcancel',end);stopMotion();};
 },[layoutKey]);
 function manual(){setFollow(false);stopMotion();}
const renderRow=(c:any)=>{const current=active.some(a=>a.key===c.key);return <button key={c.key} data-start={c.startMs} data-active={current}
     onContextMenu={e=>{e.preventDefault();onCorrect(c);}} className={cn('lyric-row',current&&'lyric-active')} aria-current={current?'true':undefined}
     aria-label={(current?'当前台词，':'')+lyricLabel(c,language,rubyVisible)}
     onClick={()=>{if(moved.current){moved.current=false;return;}onSeek(c);setFollow(true);}}>
     {current&&<span className="current-line-mark" aria-hidden="true"/>}
     <span className="lyric-text">
      {(c.unlabelledText||language!=='zh')&&<span className="ja-line" lang={c.unlabelledText?'':'ja'}>{plainJa(c)?renderJapanese(c):'暂无日文'}</span>}
      {!c.unlabelledText&&language!=='ja'&&<span lang="zh-Hans" className={cn('zh-line',language==='zh'&&'zh-primary')}>{c.zh||'暂无中文翻译'}</span>}
     </span>
    </button>;};
 return <div className="lyric-stage" data-depth={depth&&!reduced}>
  <div className="lyric-window">
  <div ref={viewport} className="lyrics-scroll" tabIndex={0} aria-label="连续歌词，点击台词跳转" onScroll={schedule}
   onKeyDown={e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key))manual();}}>
   <div className="lyrics-inner">
    {long ? <WindowedRows items={cues} keyOf={c=>c.key} estimate={Math.max(76,font*3)} scrollSelector=".lyrics-scroll" centerIndex={follow?focusIndex:undefined} render={renderRow}/> : cues.map(renderRow)}
   </div>
  </div>
  {previewStart!==null&&<div className="drag-guide" aria-hidden="true"><span/><time>{formatTime(audioTime(previewStart,offset,duration))}</time></div>}
  </div>
  <div className="follow-line">{!follow&&<Button size="sm" variant="secondary" onClick={()=>{setFollow(true);center();}}>回到当前</Button>}</div>
 </div>;
}
