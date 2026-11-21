// Project-owned motion equations. No external lyric renderer/source is included.
export function stepSpring(position,velocity,target,seconds){
 const dt=Math.min(.032,Math.max(.001,seconds));
 const acceleration=(target-position)*230-velocity*30;
 const speed=velocity+acceleration*dt;
 return {position:position+speed*dt,velocity:speed};
}
export function lyricProjection(distance,enabled=true){
 const amount=Math.min(2.5,Math.abs(distance));
 return enabled?{scale:1-amount*.072,angle:Math.max(-13,Math.min(13,-distance*7)),z:-amount*24,opacity:Math.max(.64,1-amount*.13)}:{scale:1,angle:0,z:0,opacity:1};
}

export function stepInertia(position,velocity,seconds){
 const dt=Math.min(.032,Math.max(.001,seconds)),decay=Math.exp(-7*dt);
 return {position:position+velocity*(1-decay)/7,velocity:velocity*decay};
}
