export const subtitleTime = (audioMs, offsetMs) => audioMs - offsetMs;
export const audioTime = (cueMs, offsetMs, durationMs) => Math.min(Math.max(0,durationMs),Math.max(0,cueMs+offsetMs));
