import test from 'node:test';
import assert from 'node:assert/strict';
import {clearOrbitRadius,roomBounds,roomMargin,preferredRadius,recoverRadius,orbitLimits} from '../src/view-limits.js';
test('Every orbit direction and zoom stays clear of walls and mounted props',()=>{
  for(const focus of [{x:-.5,z:0},{x:2.94,z:3.7},{x:.7375,z:1.95},{x:3.3,z:-3.09},{x:9.3,z:-6.09}]){
    for(let angle=0;angle<Math.PI*2;angle+=Math.PI/90)for(const polar of [.2,.85,1.5])for(const requested of [.01,4,27,100]){
      const direction={x:Math.sin(polar)*Math.sin(angle),z:Math.sin(polar)*Math.cos(angle)},radius=clearOrbitRadius(focus,direction,requested);
      assert.ok(radius>=4-1e-9&&radius<=orbitLimits.maxRadius+1e-9);
      const x=focus.x+direction.x*radius,z=focus.z+direction.z*radius;
      assert.ok(x>=roomBounds.left+roomMargin-1e-9&&x<=roomBounds.right-roomMargin+1e-9);
      assert.ok(z>=roomBounds.back+roomMargin-1e-9&&z<=roomBounds.front-roomMargin+1e-9);
    }
  }
});
test('Wall clearance changes the effective radius only in the obstructed direction',()=>{
  const focus={x:0,z:40};assert.equal(clearOrbitRadius(focus,{x:0,z:-1},120),120);
  assert.equal(clearOrbitRadius(focus,{x:0,z:1},120),72);
  assert.equal(clearOrbitRadius(focus,{x:0,z:-1},4),4);
});
test('Collision recovery preserves zoom preference and responds to a manual zoom change',()=>{
  const focus={x:0,z:40},preferred=preferredRadius(120,1),blocked=clearOrbitRadius(focus,{x:0,z:1},preferred);
  assert.equal(blocked,72);assert.equal(preferred,120);
  const clear=clearOrbitRadius(focus,{x:0,z:-1},preferred);
  let effective=blocked;
  for(let frame=0;frame<120;frame++){const next=recoverRadius(effective,clear,1/60);assert.ok(next>=effective&&next<=preferred);effective=next}
  assert.equal(effective,preferred);
  assert.equal(preferredRadius(preferred,.8),96);
  assert.equal(recoverRadius(120,72,1/60),72,'Entering an obstruction is immediate');
  assert.equal(recoverRadius(72,120,1/60,true),120,'Reduced motion restores without easing');
  assert.equal(preferredRadius(120,100),270);assert.equal(preferredRadius(120,.001),4);
});
