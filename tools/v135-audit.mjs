import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {connect,delay} from './v12-cdp.mjs';

// Run on the dedicated API 37 emulator after installing the debug variant.
const d=await connect(), ev=d.evaluate;
const evidence={package:process.env.DLSOUND_TEST_PACKAGE||'local.dlsound.player.debug'}, dir='artifacts/v1.3.5/qa';
mkdirSync(dir,{recursive:true});
const save=()=>writeFileSync(dir+'/interactions.json',JSON.stringify(evidence,null,2));
async function until(expr){for(let i=0;i<60;i++){if(await ev(expr))return;await delay(120);}throw Error(expr+': '+(await ev('document.body.innerText')).slice(-350));}
let seq=9600;
async function cmd(action,data={}){
 const id=++seq;await ev('DLSound.send('+JSON.stringify(JSON.stringify({id,action,data}))+')');
 await until('replies['+id+']');const reply=await ev('replies['+id+']');assert.ok(!reply.error,reply.error);
}
async function button(label){await d.click(label);}
let listId;
try{
 await ev('window.q={};window.replies={};window.previousEvent=dlSoundEvent;window.dlSoundEvent=e=>{previousEvent(e);if(e.reply)replies[e.reply]=e;else Object.assign(q,e)}');
 await cmd('ready');await until('q.tracks?.length>0');
 const testTrack=await ev('q.tracks.find(t=>t.title==="DLMatrix-mp3-vtt")');
 assert.ok(testTrack);
 await button('专辑');await button('搜索');
 evidence.search={};
 for(const count of [5000,10000]){
  const result=await ev(`(async()=>{
    const rows=Array.from({length:${count}},(_,i)=>({id:'qa'+i,title:'Track '+i,artist:'Artist',album:'Collection',folder:'/Music/Test',duration:30000}));
    dlSoundEvent({tracks:rows});const frame=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    await frame();const input=document.querySelector('input'),setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;
    const broad=[],narrow=[];let maxRows=0;
    for(let i=0;i<64;i++){
      const query=i%2?'Track 499':'Track',start=performance.now();setter.call(input,query);input.dispatchEvent(new Event('input',{bubbles:true}));await frame();
      if(i>=4)(i%2?narrow:broad).push(Math.round(performance.now()-start));maxRows=Math.max(maxRows,document.querySelectorAll('.track-row').length);
    }
    setter.call(input,'Track');input.dispatchEvent(new Event('input',{bubbles:true}));await frame();
    const scroller=document.querySelector('.library-scroll');scroller.scrollTop=scroller.scrollHeight;await frame();
    return {broad,narrow,maxRows,last:document.querySelector('.track-row:last-child .track-copy strong')?.textContent,
       tail:[...document.querySelectorAll('.track-copy strong')].at(-1)?.textContent};
  })()`);
  assert.ok(result.maxRows>0 && result.maxRows<100);assert.equal(result.tail,'Track '+(count-1));
  for(const key of ['broad','narrow']){const sorted=result[key].slice().sort((a,b)=>a-b);result[key+'Ms']={p50:sorted[14],p95:sorted[28]};}
  evidence.search[count]=result;save();
 }
 await cmd('ready');await button('关闭搜索');
 const add='QA-135-'+Date.now();await cmd('playlist',{operation:'create',name:add});
 await until('q.playlists.some(p=>p.name==='+JSON.stringify(add)+')');
 listId=await ev('q.playlists.find(p=>p.name==='+JSON.stringify(add)+').id');
 await cmd('playlist',{operation:'add',id:listId,trackId:testTrack.id});
 await button('歌单');await ev('Array.from(document.querySelectorAll(".album-row")).find(n=>n.innerText.includes('+JSON.stringify(add)+')).click()');
 await button('编辑');await button('删除歌单');await until('document.body.innerText.includes("1 条歌单记录")');
 await button('取消');await button('关闭面板');await button('编辑');await button('删除歌单');await button('确认删除');
 await until('!q.playlists.some(l=>l.id==='+JSON.stringify(listId)+')');listId=null;evidence.playlist='取消后保留，确认后删除';save();
 await cmd('play',{ids:[testTrack.id]});await until('q.cues?.length&&q.playing');await cmd('pause');
 await ev('document.querySelector(".mini-open").click()');await button('歌词');
 const tab=await ev('(()=>{const b=document.querySelector("[aria-label=歌词]"),r=b.getBoundingClientRect();return [b.textContent,r.width,r.height]})()');assert.ok(tab[0]==='歌词'&&tab[1]>=48&&tab[2]>=48);evidence.lyricsEntry=tab;
 await cmd('pref',{key:'language',value:'both'});await cmd('pref',{key:'ruby',value:true});await cmd('seek',{ms:2000+await ev('q.offset')});
 await until('document.querySelector(".lyric-row[aria-current]")?.getAttribute("aria-label").includes("あした")');
 const label=await ev('document.querySelector(".lyric-row[aria-current]").ariaLabel');assert.ok(label.includes('明天见'));evidence.screenReader=label;
 await ev('dlSoundEvent({cues:Array.from({length:1800},(_,i)=>({key:"L"+i,id:"L"+i,startMs:i*2000,endMs:i*2000+1800,kind:"dialogue",ja:[{text:"曲目"+i}],zh:"译文"+i})),time:3000500+(q.offset||0)})');
 await until('document.querySelector(".lyric-row[aria-current]")?.textContent.includes("1500")');
 const long=await ev('({mounted:document.querySelectorAll(".lyric-row").length,active:document.querySelector(".lyric-row[aria-current]").textContent})');assert.ok(long.mounted<100);evidence.longLyrics=long;save();
 await ev('dlSoundEvent({doc:null,cues:[],offsetKey:"",subtitleName:"",subtitleStatus:"没有找到同名字幕"})');
 await button('播放与显示设置');await ev('document.querySelector("button[aria-label^=音轨字幕设置]").click()');
 const disabled=await ev('Array.from(document.querySelectorAll(".setting-row:disabled")).map(x=>x.innerText)');assert.ok(disabled.some(s=>s.includes('字幕偏移'))&&disabled.some(s=>s.includes('个人读音')));evidence.noSubtitle=disabled;
 await ev('window.dlSoundBack();');await delay(150);await ev('window.dlSoundBack();');await delay(150);await ev('window.dlSoundBack();');await delay(150);
 await cmd('ready');await button('我的');await button('打开播放队列');await button('清空播放队列');await button('取消');assert.ok(await ev('q.queue.length'));await button('清空播放队列');await button('确认清空');await button('返回曲库');
 await until('document.querySelector(".bottom-nav [aria-current=page]")?.textContent==="文件夹"');evidence.queue='取消保留，清空成功后返回文件夹';save();
}finally{
 if(listId)await cmd('playlist',{operation:'delete',id:listId}).catch(()=>{});
 await ev('window.dlSoundEvent=window.previousEvent').catch(()=>{});d.close();save();
}
