import type {Track} from './usePlayer';

export function indexLibrary(tracks: Track[]) {
  const byId = new Map<string, Track>();
  const folders = new Map<string, {name: string; tracks: Track[]}>();
  const albums = new Map<string, Track[]>();
  const searchText=new Map<string,string>();
  for (const track of tracks) {
    byId.set(track.id, track);
    let folder = folders.get(track.folder);
    if (!folder) {
      folder = {name: track.folderName || track.folder, tracks: []};
      folders.set(track.folder, folder);
    }
    folder.tracks.push(track);
    searchText.set(track.id,[track.title,track.artist,track.album].join(" ").toLowerCase());
    const key=track.albumId && track.album!=='未知专辑'
      ? JSON.stringify(['id',track.albumId,track.albumArtist||track.folder.replace(/\/(?:cd|disc|disk)\s*\d+$/i,'')])
      : JSON.stringify([track.album,track.albumArtist||[track.folder,track.album==='未知专辑'?'':track.artist]]);
    let album = albums.get(key);
    if (!album) albums.set(key, album = []);
    album.push(track);
  }
  for(const album of albums.values())album.sort((a,b)=>(a.discNumber??1)-(b.discNumber??1)||(a.trackNumber??Infinity)-(b.trackNumber??Infinity)||(a.fileName||a.title).localeCompare(b.fileName||b.title,undefined,{numeric:true}));
  return {tracks, byId, folders, albums, searchText};
}

export function librarySelection(library: ReturnType<typeof indexLibrary>, section: string,
    folder: string, query: string, favorites: string[], playlistIds: string[] = []) {
  if (query) {
    const needle = query.toLowerCase();
    return library.tracks.filter(t => library.searchText.get(t.id)!.includes(needle));
  }
  if (section === 'playlists') {
    if (folder === 'favorites') {
      const ids = new Set(favorites);
      return library.tracks.filter(track => ids.has(track.id));
    }
    return playlistIds.flatMap(id => library.byId.get(id) ?? []);
  }
  if (!folder) return library.tracks;
  if (section === 'albums') return library.albums.get(folder) ?? [];
  return library.folders.get(folder)?.tracks ?? [];
}
