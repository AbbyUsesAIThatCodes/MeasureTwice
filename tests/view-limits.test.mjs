import test from 'node:test';
import assert from 'node:assert/strict';
import {clearOrbitRadius,roomBounds,roomMargin} from '../src/view-limits.js';
test('Every orbit direction and zoom stays clear of walls and mounted props',()=>{
  for(const focus of [{x:-.5,z:0},{x:2.94,z:3.7},{x:.7375,z:1.95},{x:3.3,z:-3.09}]){
    for(let angle=0;angle<Math.PI*2;angle+=Math.PI/90)for(const polar of [.2,.85,1.5])for(const requested of [.01,4,27,100]){
      const direction={x:Math.sin(polar)*Math.sin(angle),z:Math.sin(polar)*Math.cos(angle)},radius=clearOrbitRadius(focus,direction,requested);
      assert.ok(radius>=4-1e-9&&radius<=27+1e-9);
      const x=focus.x+direction.x*radius,z=focus.z+direction.z*radius;
      assert.ok(x>=roomBounds.left+roomMargin-1e-9&&x<=roomBounds.right-roomMargin+1e-9);
      assert.ok(z>=roomBounds.back+roomMargin-1e-9&&z<=roomBounds.front-roomMargin+1e-9);
    }
  }
});
test('Open-front zoom retains its full range while a rear wall bounds only that direction',()=>{
  const focus={x:0,z:0};assert.equal(clearOrbitRadius(focus,{x:0,z:1},27),27);
  assert.equal(clearOrbitRadius(focus,{x:0,z:-1},27),14.5);
  assert.equal(clearOrbitRadius(focus,{x:0,z:-1},4),4);
});
