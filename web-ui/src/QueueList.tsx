import {useEffect,useRef} from 'react';
import {Volume2,X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import type {QueueItem} from './usePlayer';

type Props = {
  queue:QueueItem[]; current?:string;
  jump:(index:number)=>void; move:(itemId:string,targetId:string)=>void; remove:(itemId:string)=>void;
};

export function QueueList({queue,current,jump,move,remove}:Props) {
  const list=useRef<HTMLDivElement>(null);
  const moveRef=useRef(move);
  moveRef.current=move;

  useEffect(()=>{
    const root=list.current!;
    const scroller=root.closest<HTMLElement>('.sheet-scroll')!;
    let source:HTMLElement|null=null, target:HTMLElement|null=null;
    let timer=0, frame=0, finger=-1, startX=0, startY=0, y=0, grabOffset=0;
    let dragging=false, scrolling=false, lastTime=0, velocity=0;

    function reset() {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      if(source){source.classList.remove('queue-dragging');source.style.removeProperty('transform');}
      target?.removeAttribute('data-drop');
      source=null;target=null;finger=-1;dragging=false;scrolling=false;
    }
    function draw() {
      if(!source?.isConnected || !dragging){reset();return;}
      const bounds=scroller.getBoundingClientRect();
      const margin=Math.min(48,bounds.height/4);
      if(y<bounds.top+margin)scroller.scrollTop-=Math.min(12,(bounds.top+margin-y)/3);
      if(y>bounds.bottom-margin)scroller.scrollTop+=Math.min(12,(y-bounds.bottom+margin)/3);
      const box=root.getBoundingClientRect();
      const touchY=Math.max(box.top+1,Math.min(box.bottom-1,Math.max(bounds.top+1,Math.min(bounds.bottom-1,y))));
      const hovered=document.elementFromPoint(box.left+box.width/2,touchY)?.closest<HTMLElement>('[data-queue-id]');
      target?.removeAttribute('data-drop');
      target=hovered && root.contains(hovered)?hovered:null;
      if(target && target!==source)target.dataset.drop=source.compareDocumentPosition(target)&Node.DOCUMENT_POSITION_FOLLOWING?'after':'before';
      // Rows are direct children of the positioned list; offsetTop ignores the drag transform.
      source.style.transform='translateY('+(touchY-grabOffset-box.top-source.offsetTop)+'px)';
      frame=requestAnimationFrame(draw);
    }
    function start(event:TouchEvent) {
      reset();
      const button=(event.target as Element).closest('.queue-select');
      if(!button || event.touches.length!==1 || root.children.length<2)return;
      source=button.closest<HTMLElement>('[data-queue-id]');
      if(!source)return;
      event.preventDefault();
      const touch=event.touches[0];
      finger=touch.identifier;startX=touch.clientX;startY=y=touch.clientY;
      grabOffset=startY-source.getBoundingClientRect().top;
      lastTime=performance.now();velocity=0;
      timer=window.setTimeout(()=>{
        if(!source?.isConnected)return;
        dragging=true;source.classList.add('queue-dragging');
        draw();
      },420);
    }
    function track(event:TouchEvent) {
      if(!source)return;
      event.preventDefault();
      const touch=Array.from(event.touches).find(t=>t.identifier===finger);
      if(!touch || event.touches.length!==1){reset();return;}
      if(dragging){y=touch.clientY;return;}
      if(!scrolling && Math.hypot(touch.clientX-startX,touch.clientY-startY)<=8)return;
      window.clearTimeout(timer);scrolling=true;
      const now=performance.now(), dy=y-touch.clientY;
      velocity=dy/Math.max(8,now-lastTime);
      scroller.scrollTop+=dy;
      y=touch.clientY;lastTime=now;
    }
    function end(event:TouchEvent) {
      if(!Array.from(event.changedTouches).some(t=>t.identifier===finger))return;
      event.preventDefault();
      if(dragging){
        cancelAnimationFrame(frame);y=event.changedTouches[0].clientY;draw();
        if(source?.dataset.queueId && target?.dataset.queueId && source!==target)moveRef.current(source.dataset.queueId,target.dataset.queueId);
      }else if(!scrolling){
        source?.querySelector<HTMLButtonElement>('.queue-select')?.click();
      }
      const coast=scrolling && performance.now()-lastTime<80;
      reset();
      if(coast){
        let step=Math.max(-32,Math.min(32,velocity*16));
        const glide=()=>{
          const old=scroller.scrollTop;
          scroller.scrollTop+=step;step*=0.88;
          if(Math.abs(step)>0.75 && scroller.scrollTop!==old)frame=requestAnimationFrame(glide);
        };
        frame=requestAnimationFrame(glide);
      }
    }
    // The lifted row ignores hit testing, so WebView can dispatch the long-press menu to the list underneath.
    function contextMenu(event:MouseEvent){if(source)event.preventDefault();}
    document.addEventListener('contextmenu',contextMenu,true);
    root.addEventListener('touchstart',start,{passive:false});
    root.addEventListener('touchmove',track,{passive:false});
    root.addEventListener('touchend',end,{passive:false});
    root.addEventListener('touchcancel',reset);
    return ()=>{
      document.removeEventListener('contextmenu',contextMenu,true);
      reset();root.removeEventListener('touchstart',start);root.removeEventListener('touchmove',track);
      root.removeEventListener('touchend',end);root.removeEventListener('touchcancel',reset);
    };
  },[]);

  return <><p className="queue-hint">长按曲目可拖动排序</p><div ref={list} className="queue-list">
    {queue.map((item,index)=><div key={item.itemId} data-queue-id={item.itemId} className={'queue-row'+(item.itemId===current?' queue-current':'')}>
      <button className="queue-select" onContextMenu={e=>e.preventDefault()} onClick={()=>jump(index)}
        aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown" onKeyDown={e=>{
          if(!e.altKey || !['ArrowUp','ArrowDown'].includes(e.key))return;
          e.preventDefault();
          const neighbor=queue[index+(e.key==='ArrowUp'?-1:1)];
          if(neighbor)move(item.itemId,neighbor.itemId);
        }}>
        <span className="queue-number">{item.itemId===current?<Volume2/>:String(index+1).padStart(2,'0')}</span>
        <span><strong>{item.track.title}</strong><small>{item.track.artist}</small></span>
      </button>
      <div className="queue-actions"><Button variant="ghost" size="icon" aria-label={'移除第'+(index+1)+'首'} onClick={()=>remove(item.itemId)}><X/></Button></div>
    </div>)}
  </div></>;
}
