import assert from 'node:assert/strict';
import {test} from 'node:test';
import {indexDirectories,nearestDirectory} from '../src/directoryIndex.ts';
import {indexLibrary,librarySelection} from '../src/libraryIndex.ts';

test('library views retain their own order, membership and missing-track behavior',()=>{
  const song=(id,folder,album)=>({id,folder,album,title:id,artist:'歌手'});
  const tracks=[song('A','/one','X'),song('B','/two','X'),song('C','/one','Y')];
  const library=indexLibrary(tracks);
  const ids=rows=>rows.map(t=>t.id);
  assert.deepEqual(ids(librarySelection(library,'playlists','my-list','',[],['C','missing','A','C'])),['C','A','C']);
  assert.deepEqual(ids(librarySelection(library,'folders','/one','',[])),['A','C']);
  const album=[...library.albums.keys()].find(key=>library.albums.get(key)[0].id==='A');
  assert.deepEqual(ids(librarySelection(library,'albums',album,'',[])),['A']);
  assert.deepEqual(ids(librarySelection(library,'playlists','favorites','',['C','B'])),['B','C']);
  assert.deepEqual(ids(librarySelection(library,'folders','/one','b',[])),['B']);
});

test('same folder names remain distinct across branches and storage volumes',()=>{
  const track=(id,folder)=>({id,folder});
  const library=indexDirectories([
    track('a','storage/emulated/0/Music/A/Disc 1'),
    track('b','/sdcard/Music/B/Disc 1'),
    track('c','/storage/ABCD-1234/Music/A/Disc 1'),
    track('d','/storage/emulated/0/Music/A')
  ]);
  const music=library.get('/storage/emulated/0/Music');
  assert.deepEqual([...music.children.keys()],['A','B']);
  assert.equal(music.total,3);
  assert.equal(music.tracks.length,0);
  assert.deepEqual(music.children.get('A').tracks.map(t=>t.id),['d']);
  assert.deepEqual(music.children.get('A').children.get('Disc 1').tracks.map(t=>t.id),['a']);
  assert.equal(library.get('/storage/ABCD-1234/Music/A/Disc 1').total,1);
  assert.equal(indexDirectories([]).get('').children.size,0);
});

test('restore resolves the saved path against the current music library',()=>{
  const saved='/storage/emulated/0/Music/Disc 2';
  const track={id:'1',folder:saved};
  assert.equal(nearestDirectory(indexDirectories([]),saved).path,'');
  assert.equal(nearestDirectory(indexDirectories([track]),saved).path,saved);
  const moved=indexDirectories([{...track,folder:'/sdcard/Music/Disc 1'}]);
  assert.equal(nearestDirectory(moved,saved).path,'/storage/emulated/0/Music');
  assert.equal(nearestDirectory(moved,'/storage/ABCD-1234/Music').path,'');
});

test('albums separate namesakes, combine compilation performers and order discs',()=>{
 const track=(id,albumArtist,discNumber,trackNumber)=>({id,title:id,album:'精选',albumArtist,artist:id,folder:'/Music/'+discNumber,discNumber,trackNumber});
 const rows=[track('z','合集',2,1),track('x','合集',1,3),track('y','合集',1,1),track('solo','另一组',1,1)];
 const {albums}=indexLibrary(rows);
 assert.deepEqual([...albums.values()].map(group=>group.map(t=>t.id)),[['y','x','z'],['solo']]);
});

test('a title-only album database ID does not merge separate release folders',()=>{
 const base={album:'精选',albumId:'1',artist:'歌手',title:'A'};
 const tracks=['/Music/A/CD1','/Music/A/CD2','/Music/B'].map((folder,i)=>({...base,folder,id:String(i)}));
 assert.deepEqual([...indexLibrary(tracks).albums.values()].map(a=>a.length),[2,1]);
});
