export const plainJa = cue => typeof cue.ja === 'string' ? cue.ja : (cue.ja || []).map(t => t.text).join('');
export const activeCues = (cues,time) => cues.filter(c => c.startMs <= time && time < c.endMs);
export const formatTime = ms => {const s=Math.floor(Math.max(0,ms||0)/1000);return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;};

export function indexTimeline(cues) {
 const rows=cues.map((cue,order)=>({cue,order})).filter(({cue})=>cue.startMs<cue.endMs)
   .sort((a,b)=>a.cue.startMs-b.cue.startMs);
 function build(items){
   if(!items.length)return null;
   const center=items[items.length>>1].cue.startMs;
   const left=[],right=[],crossing=[];
   for(const row of items){
     if(row.cue.endMs<=center)left.push(row);
     else if(row.cue.startMs>center)right.push(row);
     else crossing.push(row);
   }
   return {center,left:build(left),right:build(right),byStart:crossing,
     byEnd:crossing.slice().sort((a,b)=>b.cue.endMs-a.cue.endMs)};
 }
 const root=build(rows);
 return time=>{
   const hits=[];
   for(let node=root;node;){
     const before=time<node.center;
     for(const row of before?node.byStart:node.byEnd){
       if(before?row.cue.startMs>time:row.cue.endMs<=time)break;
       hits.push(row);
     }
     node=before?node.left:node.right;
   }
   return hits.sort((a,b)=>a.order-b.order).map(item=>item.cue);
 };
}
export function lyricLabel(cue, language, ruby) {
 const parts=[formatTime(cue.startMs)];
 if(cue.unlabelledText||language!=='zh') parts.push((cue.ja||[]).map(piece=>ruby&&piece.reading?piece.text+'（'+piece.reading+'）':piece.text).join('')||'暂无日文');
 if(!cue.unlabelledText&&language!=='ja') parts.push(cue.zh||'暂无中文翻译');
 return parts.concat('点击跳转').join('，');
}
