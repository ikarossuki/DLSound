'use strict';
(() => {
  const transcript = document.getElementById('transcript');
  const empty = document.getElementById('empty');
  let cues = [];
  let fingerprint = '';
  let options = { mode: 'JAPANESE', furigana: true, labels: {} };
  let follow = true;
  let current = '';
  let position = 0;
  let duration = 0;
  const rows = new Map();
  const safeBridge = (method, ...args) => {
    if (window.Himitsu && typeof window.Himitsu[method] === 'function') window.Himitsu[method](...args);
  };
  const anchor = () => {
    const row = [...transcript.children].find(item => item.getBoundingClientRect().bottom > 0);
    return row ? { id: row.dataset.id, y: row.getBoundingClientRect().top } : null;
  };
  const restoreAnchor = old => {
    if (!old) return;
    const row = rows.get(old.id);
    if (row) window.scrollBy(0, row.getBoundingClientRect().top - old.y);
  };
  const time = millis => {
    const seconds = Math.floor(millis / 1000);
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  };
  const missing = (kind, label) => {
    const result = document.createElement('div');
    result.className = `missing missing-${kind}`;
    result.dataset.missing = kind;
    result.textContent = label || '';
    return result;
  };
  const cueLabel = cue => {
    const parts = [options.labels.seek, time(cue.startMs)];
    if (cue.unlabelledText || options.mode !== 'CHINESE') parts.push(cue.pieces.map(piece => piece.text).join('') || options.labels.missingJapanese);
    if (!cue.unlabelledText && options.mode !== 'JAPANESE') parts.push(cue.chinese || options.labels.missingChinese);
    return parts.filter(Boolean).join('，');
  };
  function setOptions(next) {
    const old = anchor();
    options = next;
    document.body.dataset.mode = next.mode;
    document.body.dataset.furigana = String(next.furigana);
    const root = document.documentElement.style;
    for (const [key, value] of Object.entries(next.colors || {})) root.setProperty(`--${key}`, value);
    root.setProperty('--font-size', `${next.fontSize}px`);
    empty.textContent = next.emptyMessage || '';
    transcript.querySelectorAll('[data-missing]').forEach(node => {
      node.textContent = next.labels[node.dataset.missing === 'ja' ? 'missingJapanese' : 'missingChinese'] || '';
    });
    cues.forEach(cue => {
      const row = rows.get(cue.id);
      if (row) row.setAttribute('aria-label', cueLabel(cue));
    });
    requestAnimationFrame(() => restoreAnchor(old));
  }
  function setDocument(data) {
    const sameDocument = fingerprint === data.fingerprint;
    const old = sameDocument ? anchor() : null;
    fingerprint = data.fingerprint;
    cues = data.cues || [];
    current = '';
    rows.clear();
    while (transcript.firstChild) transcript.removeChild(transcript.firstChild);
    const fragment = document.createDocumentFragment();
    cues.forEach(cue => {
      if (cue.kind === 'CLEAR') return;
      const row = document.createElement('section');
      row.dataset.id = cue.id;
      row.className = cue.kind === 'SCENE' ? 'cue scene' : 'cue';
      row.tabIndex = 0;
      row.setAttribute('role', 'button');
      row.setAttribute('aria-label', cueLabel(cue));
      const stamp = document.createElement('div');
      stamp.className = 'time';
      stamp.textContent = time(cue.startMs);
      row.append(stamp);
      if (cue.pieces.length) {
        const ja = document.createElement('div');
        ja.className = cue.unlabelledText ? 'ja unlabelled' : 'ja';
        ja.lang = cue.unlabelledText ? '' : 'ja';
        cue.pieces.forEach((piece, index) => {
          if (!piece.reading) {
            ja.append(document.createTextNode(piece.text));
            return;
          }
          const ruby = document.createElement('ruby');
          ruby.append(document.createTextNode(piece.text));
          ruby.setAttribute('aria-label', piece.text);
          const reading = document.createElement('rt');
          reading.textContent = piece.reading;
          reading.setAttribute('aria-hidden', 'true');
          ruby.append(reading);
          ruby.addEventListener('contextmenu', event => {
            event.preventDefault(); event.stopPropagation();
            safeBridge('correct', fingerprint, cue.id, index);
          });
          ja.append(ruby);
        });
        row.append(ja);
      } else row.append(missing('ja', options.labels.missingJapanese));
      if (cue.chinese) {
        const zh = document.createElement('div');
        zh.className = 'zh'; zh.lang = 'zh-Hans'; zh.textContent = cue.chinese;
        row.append(zh);
      } else if (!cue.unlabelledText) row.append(missing('zh', options.labels.missingChinese));
      const seek = () => { follow = true; safeBridge('seek', fingerprint, cue.id); };
      row.addEventListener('click', seek);
      row.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); seek(); }
      });
      rows.set(cue.id, row);
      fragment.append(row);
    });
    transcript.append(fragment);
    empty.hidden = cues.some(cue => cue.kind !== 'CLEAR');
    if (!sameDocument) { follow = true; window.scrollTo(0, 0); }
    requestAnimationFrame(() => { restoreAnchor(old); setPosition(position, duration); });
  }
  function setPosition(nextPosition, nextDuration) {
    position = nextPosition; duration = nextDuration;
    const active = cues.filter(cue => cue.kind === 'DIALOGUE' && position >= cue.startMs &&
      position < (cue.endMs === null ? Infinity : cue.endMs) && (duration <= 0 || position < duration));
    const key = active.map(cue => cue.id).join('|');
    if (key === current) return;
    current = key;
    rows.forEach(row => { row.classList.remove('current'); row.removeAttribute('aria-current'); });
    active.forEach(cue => { const row = rows.get(cue.id); if (row) { row.classList.add('current'); row.setAttribute('aria-current', 'true'); } });
    if (follow && active.length) {
      const first = rows.get(active[0].id);
      if (first) first.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
  }
  function resumeFollow() {
    follow = true;
    current = '';
    setPosition(position, duration);
  }
  let touchY = null;
  document.addEventListener('touchstart', event => { touchY = event.touches[0] ? event.touches[0].clientY : null; }, { passive: true });
  document.addEventListener('touchmove', event => {
    if (touchY !== null && Math.abs(event.touches[0].clientY - touchY) > 8) follow = false;
  }, { passive: true });
  document.addEventListener('wheel', () => { follow = false; }, { passive: true });
  document.addEventListener('keydown', event => { if (['PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown'].includes(event.key)) follow = false; });
  window.HimitsuReader = { setOptions, setDocument, setPosition, resumeFollow };
  safeBridge('ready');
})();
