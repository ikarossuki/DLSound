import type {Track} from './usePlayer';

export function indexLibrary(tracks: Track[]) {
  const byId = new Map<string, Track>();
  const folders = new Map<string, {name: string; tracks: Track[]}>();
  const albums = new Map<string, Track[]>();
  for (const track of tracks) {
    byId.set(track.id, track);
    let folder = folders.get(track.folder);
    if (!folder) {
      folder = {name: track.folderName || track.folder, tracks: []};
      folders.set(track.folder, folder);
    }
    folder.tracks.push(track);
    let album = albums.get(track.album);
    if (!album) albums.set(track.album, album = []);
    album.push(track);
  }
  return {tracks, byId, folders, albums};
}

export function librarySelection(library: ReturnType<typeof indexLibrary>, section: string,
    folder: string, query: string, favorites: string[], playlistIds: string[] = []) {
  if (query) {
    const needle = query.toLowerCase();
    return library.tracks.filter(t => (t.title+' '+t.artist+' '+t.album).toLowerCase().includes(needle));
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
