export const plainJa = cue => typeof cue.ja === 'string' ? cue.ja : (cue.ja || []).map(t => t.text).join('');
export const activeCues = (cues,time) => cues.filter(c => c.startMs <= time && time < c.endMs);
export const formatTime = ms => {const s=Math.floor(Math.max(0,ms||0)/1000);return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;};
