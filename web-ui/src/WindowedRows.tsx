import {useLayoutEffect, useMemo, useRef, useState, type ReactNode} from 'react';

type Props<T> = {
  items: T[]; keyOf:(item:T)=>string; estimate:number;
  render:(item:T,index:number)=>ReactNode;
  centerIndex?:number; scrollSelector:string;
};

function rowAt(offsets:number[], y:number) {
  let low=0, high=offsets.length-1;
  while(low<high) {
    const mid=(low+high+1)>>>1;
    if(offsets[mid]<=y) low=mid; else high=mid-1;
  }
  return low;
}

/** Measure wrapped rows as they enter the overscan area. A focused row remains
 * mounted while scrolling so keyboard and accessibility focus stay on it. */
export function WindowedRows<T>({items,keyOf,estimate,render,centerIndex,scrollSelector}:Props<T>) {
  const root=useRef<HTMLDivElement>(null);
  const heights=useMemo(()=>new Map<number,number>(),[items,estimate]);
  const [revision,resize]=useState(0);
  const offsets=useMemo(()=>{
    const positions=[0];
    for(let i=0;i<items.length;i++) positions.push(positions[i]+(heights.get(i)??estimate));
    return positions;
  },[heights,estimate,items,revision]);
  const [view,setView]=useState({top:0,height:800});
  const [focus,setFocus]=useState(-1);
  useLayoutEffect(()=>{
    const list=root.current!, scroller=list.closest<HTMLElement>(scrollSelector)!;
    const update=()=>{
      const top=scroller.getBoundingClientRect().top-list.getBoundingClientRect().top;
      const height=scroller.clientHeight;
      setView(old=>old.top===top&&old.height===height?old:{top,height});
    };
    const observer=new ResizeObserver(update);
    observer.observe(scroller); observer.observe(list); update();
    scroller.addEventListener('scroll',update,{passive:true});
    return ()=>{observer.disconnect();scroller.removeEventListener('scroll',update);};
  },[scrollSelector,items]);
  const first=Math.max(0,rowAt(offsets,view.top)-6);
  const end=Math.min(items.length,rowAt(offsets,view.top+view.height)+8);
  const indices=Array.from({length:Math.max(0,end-first)},(_,i)=>i+first);
  if(focus>=0&&focus<items.length&&(focus<first||focus>=end)) indices.push(focus);
  useLayoutEffect(()=>{
    const list=root.current!;
    const measure=()=>{
      let changed=false;
      for(const child of Array.from(list.children) as HTMLElement[]) {
        const index=Number(child.dataset.index), height=child.offsetHeight;
        if(height>0&&(heights.get(index)??estimate)!==height){heights.set(index,height);changed=true;}
      }
      if(changed)resize(v=>v+1);
    };
    measure();
    const observer=new ResizeObserver(measure);
    for(const child of Array.from(list.children))observer.observe(child);
    return ()=>observer.disconnect();
  },[first,end,focus,heights,estimate]);
  useLayoutEffect(()=>{
    if(centerIndex===undefined||centerIndex<0||centerIndex>=items.length)return;
    const list=root.current!, scroller=list.closest<HTMLElement>(scrollSelector)!;
    const origin=list.getBoundingClientRect().top-scroller.getBoundingClientRect().top+scroller.scrollTop;
    scroller.scrollTop=origin+(offsets[centerIndex]+offsets[centerIndex+1])/2-scroller.clientHeight*.46;
  },[centerIndex,offsets,scrollSelector,items]);
  return <div ref={root} style={{position:'relative',height:offsets[items.length]}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setFocus(-1);}}>
    {indices.map(i=><div key={keyOf(items[i])} data-index={i} onFocus={()=>setFocus(i)}
      style={{position:'absolute',top:offsets[i],left:0,right:0}}>{render(items[i],i)}</div>)}
  </div>;
}
