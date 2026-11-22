import test from 'node:test';
import assert from 'node:assert/strict';
import {subtitleTime,audioTime} from '../src/timeline.mjs';
import {activeCues,indexTimeline,lyricLabel} from '../src/domain.mjs';
import {lyricProjection,stepInertia,stepSpring} from '../src/lyricMotion.mjs';
test('positive calibration delays highlight and click seeks to exactly the delayed start',()=>{assert.equal(subtitleTime(2000,1000),1000);assert.equal(audioTime(1000,1000,10000),2000);});
test('negative calibration and audio boundaries',()=>{assert.equal(subtitleTime(0,-1000),1000);assert.equal(audioTime(500,-1000,10000),0);assert.equal(audioTime(9500,1000,10000),10000);});
test('dialogue and scene overlaps share corrected time, end is exclusive',()=>{const cues=[{id:'a',startMs:1000,endMs:3000},{id:'b',startMs:2000,endMs:4000},{id:'scene',startMs:0,endMs:3500}];assert.deepEqual(activeCues(cues,subtitleTime(3000,1000)).map(c=>c.id),['a','b','scene']);assert.deepEqual(activeCues(cues,subtitleTime(4000,1000)).map(c=>c.id),['b','scene']);});
test('explicit gaps stay empty',()=>assert.deepEqual(activeCues([{startMs:0,endMs:1000},{startMs:2000,endMs:3000}],1500),[]));
test('projection is continuous and symmetric in scale with opposite tilt',()=>{const a=lyricProjection(.4),b=lyricProjection(-.4),near=lyricProjection(.401);assert.equal(a.scale,b.scale);assert.equal(a.angle,-b.angle);assert.ok(Math.abs(near.scale-a.scale)<.01);});
test('inertia decays without reversing',()=>{const x=stepInertia(100,600,.016);assert.ok(x.position>100);assert.ok(x.velocity>0&&x.velocity<600);});
test('spring converges on target',()=>{let x=0,v=0;for(let i=0;i<600;i++){const n=stepSpring(x,v,400,.016);x=n.position;v=n.velocity;}assert.ok(Math.abs(x-400)<.1);});

test('indexed timeline retains unsorted overlapping cues, ties, gaps and exclusive ends',()=>{
 const cues=[{startMs:3000,endMs:4500},{startMs:100,endMs:2300},{startMs:100,endMs:550}];
 const locate=indexTimeline(cues);
 for(let time=0;time<=5000;time+=25)assert.deepEqual(locate(time),activeCues(cues,time));
});
test('spoken lyrics follow language and reading preferences',()=>{
 const cue={startMs:0,ja:[{text:'明日',reading:'あした'}],zh:'明天'};
 assert.match(lyricLabel(cue,'both',true),/明日（あした）.*明天/);
 assert.doesNotMatch(lyricLabel(cue,'zh',true),/明日|あした/);
 assert.doesNotMatch(lyricLabel(cue,'ja',false),/明天|あした/);
});

test('a whole-track scene overlaps the last line without changing display order',()=>{
 const cues=[{startMs:0,endMs:3600000},...Array.from({length:1800},(_,i)=>({startMs:2000*i,endMs:2000*i+1500}))];
 assert.deepEqual(indexTimeline(cues)(3598100),[cues[0],cues[1800]]);
});
