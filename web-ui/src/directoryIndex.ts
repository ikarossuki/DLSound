import type {Track} from './usePlayer';

export type Directory = {
  name: string;
  path: string;
  parent: string;
  children: Map<string, Directory>;
  tracks: Track[];
  total: number;
};

function directory(name: string, path: string, parent: string): Directory {
  return {name, path, parent, children: new Map(), tracks: [], total: 0};
}

function storagePath(folder: string) {
  const parts = folder.split('/').filter(Boolean);
  if (parts[0] === 'storage' && parts[1] === 'emulated' && parts[2]) {
    return [{key: parts.slice(0, 3).join('/'), name: '内部存储'}, ...parts.slice(3).map(part)];
  }
  if (parts[0] === 'storage' && parts[1]) {
    return [{key: parts.slice(0, 2).join('/'), name: parts[1]}, ...parts.slice(2).map(part)];
  }
  if (parts[0] === 'sdcard') {
    return [{key: 'storage/emulated/0', name: '内部存储'}, ...parts.slice(1).map(part)];
  }
  return folder === 'local' || !parts.length
    ? [{key: 'unknown', name: '本地音乐'}]
    : parts.map(part);
}

function part(name: string) { return {key: name, name}; }

export function nearestDirectory(nodes: Map<string, Directory>, path: string): Directory {
  while (path && !nodes.has(path)) {
    path = path.slice(0, Math.max(0, path.lastIndexOf('/')));
  }
  return nodes.get(path)!;
}

export function indexDirectories(tracks: Track[]) {
  const root = directory('本地音乐', '', '');
  const nodes = new Map([['', root]]);
  for (const track of tracks) {
    let current = root;
    current.total++;
    for (const {key, name} of storagePath(track.folder)) {
      let child = current.children.get(key);
      if (!child) {
        child = directory(name, current.path + '/' + key, current.path);
        current.children.set(key, child);
        nodes.set(child.path, child);
      }
      current = child;
      current.total++;
    }
    current.tracks.push(track);
  }
  return nodes;
}
