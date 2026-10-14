import test from 'node:test';
import assert from 'node:assert/strict';
import {wallSections,wallCourses,windowOpening as opening,wallHeight} from '../src/room.js';
import {workshopLayout} from '../src/layout.js';

test('Every supported room span is enclosed on four sides with only the window aperture open',()=>{
 for(const length of [6,12,24,72,150/12.7,300/12.7,1000/12.7]){
  const l=workshopLayout(length),b={left:l.roomLeft,right:l.roomRight,back:l.roomBack,front:l.roomFront},sections=wallSections(b);
  assert.deepEqual(new Set(sections.map(p=>p.side)),new Set(['back','front','left','right']));
  for(const side of ['back','front','left','right']){
   const across=['back','front'].includes(side),start=across?b.left:b.back,end=across?b.right:b.front;
   for(const y of [0,30,opening.bottom,117,opening.top,170,wallHeight-.001])for(let x=start+.01;x<end;x+=.37){
    const hits=sections.filter(p=>p.side===side&&x>=p.start&&x<p.end&&y>=p.bottom&&y<p.top).length;
    const aperture=side==='back'&&x>=opening.left&&x<opening.right&&y>=opening.bottom&&y<opening.top;
    assert.equal(hits,aperture?0:1,`${length}: ${side} ${x} ${y}`);
   }
  }
  const rows=wallCourses(b).filter(p=>p.side==='back');
  for(const y of [10,164,178])assert.ok(rows.some(p=>Math.abs(p.y-y)<1e-6&&p.start===b.left&&p.end===b.right),'Detail continues under and over the window');
  for(const p of rows.filter(p=>p.y+3.3>opening.bottom&&p.y-3.3<opening.top))assert.ok(p.end<=opening.left||p.start>=opening.right,'Logs leave the window clear');
 }
});
