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
  assert.deepEqual(ids(librarySelection(library,'albums','X','',[])),['A','B']);
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
