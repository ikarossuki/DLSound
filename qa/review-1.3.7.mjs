import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {adb, serial, connect, delay} from '../tools/v12-cdp.mjs';

const d = await connect();
const ev = d.evaluate;
let sequence = 35000;
async function until(expression, timeout = 15000) {
  const end = Date.now() + timeout;
  do {
    const value = await ev(expression);
    if (value) return value;
    await delay(60);
  } while (Date.now() < end);
  throw new Error('Timed out waiting for ' + expression);
}
async function command(action, data = {}) {
  const id = ++sequence;
  await ev('DLSound.send(' + JSON.stringify(JSON.stringify({action, data, id})) + ')');
  const reply = await until('window.reviewReplies[' + id + ']');
  assert.ok(!reply.error, reply.error);
}
try {
  await ev(`window.reviewState={};window.reviewReplies={};
    const handler=window.dlSoundEvent;
    window.dlSoundEvent=e=>{handler(e);if(e.reply)window.reviewReplies[e.reply]=e;else Object.assign(window.reviewState,e)}`);
  await command('ready');
  await until('reviewState.tracks?.length >= 4');
  await command('pref', {key:'shuffle',value:false});
  const tracks = await ev('reviewState.tracks.filter(t=>t.title.startsWith("DLMatrix-")&&t.duration>3000)');
  assert.ok(tracks.length >= 4);
  const [a,b,c,e] = tracks.slice(0,4).map(t=>t.id);
  await command('play', {ids:[a,b,c], startId:a});
  await until('reviewState.queue.length===3 && reviewState.index===0');
  const originalItems = await ev('reviewState.queue.map(q=>q.itemId)');
  await command('listen', {track:b, start:100, end:2400, open:true, passes:1, pauseAtEnd:true});
  await until('reviewState.index===1');
  assert.deepEqual(await ev('reviewState.queue.map(q=>q.itemId)'),originalItems);
  await command('listen', {track:e, start:100, end:2400, open:true, passes:1, pauseAtEnd:true});
  await until('reviewState.queue.length===4 && reviewState.index===3');
  assert.deepEqual(await ev('reviewState.queue.slice(0,3).map(q=>q.itemId)'),originalItems);
  console.log('PASS 01 bookmark inside and outside queue preserves original item IDs and order');
  await command('listen', {track:e});
  await command('refresh');
  await until('reviewState.tracks.length>=4');
  console.log('PASS 02 successful real MediaStore refresh');

  await command('play', {ids:[a,b,c]});
  await until('reviewState.playing');
  await command('sleep',{mode:'timer',minutes:1});
  for(let i=0;i<5;i++){
    await delay(240);await command('pause');await until('!reviewState.playing');
    await delay(60);await command('toggle');await until('reviewState.playing');
  }
  const remaining = await ev('reviewState.sleep.remainingMs');
  assert.ok(remaining < 59200 && remaining > 45000, 'short intervals remaining='+remaining);
  await command('sleep',{mode:'off'});
  await command('pause');
  console.log('PASS 11 subsecond playback intervals accumulate, remaining',remaining);

  const sql = statement => execFileSync(adb,['-s',serial,'shell','-T','run-as','local.dlsound.player.debug',
    'sqlite3','databases/music_player_database'],{input:'.bail on\n'+statement+'\n',encoding:'utf8'});
  await command('play',{ids:[a,b,c],startId:a});
  await until('reviewState.queue.length===3 && reviewState.index===0');
  const oldItem = await ev('reviewState.queue[0].itemId');
  try {
    sql("CREATE TRIGGER review_fail_queue BEFORE INSERT ON play_queue BEGIN SELECT RAISE(ABORT,'review-test'); END;");
    await assert.rejects(command('play',{ids:[b,c]}));
  } finally { sql('DROP TRIGGER IF EXISTS review_fail_queue;'); }
  await command('remove',{itemId:oldItem});
  await until('reviewState.queue.length===2 && reviewState.index>=0 && reviewState.queue[reviewState.index].itemId!=='+JSON.stringify(oldItem));
  await command('pause');
  console.log('PASS 12 actual Room failure followed by active-item deletion and valid next item');

  await d.click('作品库');
  await until('!!document.querySelector(".study-tools")');
  const work = await ev('document.querySelector(".study-tools .folder-row")?.textContent');
  assert.ok(work);
  await ev('document.querySelector(".study-tools .folder-row").click()');
  await d.click('编辑作品信息');
  assert.equal(await ev('document.querySelector("select[aria-label=作品根目录]").disabled'),true);
  await d.click('取消');
  console.log('PASS 09 existing work root locked');
  if(process.argv[2]) {
    const id = process.argv[2];
    assert.match(id,/^\d+$/);
    const list = await until('reviewState.playlists.find(l=>l.id==='+JSON.stringify(id)+')');
    assert.equal(list.trackIds[0],list.trackIds[2]);
    assert.notEqual(list.entryIds[0],list.entryIds[2]);
    await command('play',{ids:list.trackIds,startId:list.trackIds[2],startIndex:2});
    await until('reviewState.index===2');
    await command('playlist',{operation:'remove',id,entryId:list.entryIds[2]});
    await until('reviewState.playlists.find(l=>l.id==='+JSON.stringify(id)+').entryIds.length===2');
    assert.deepEqual(await ev('reviewState.playlists.find(l=>l.id==='+JSON.stringify(id)+').entryIds'),list.entryIds.slice(0,2));
    await command('playlist',{operation:'delete',id});
    console.log('PASS 06 second duplicate selected and only its entry removed');
  }
} finally {
  d.close();
}
