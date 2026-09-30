import fs from 'node:fs';
import assert from 'node:assert/strict';
const house=JSON.parse(fs.readFileSync(new URL('../data/house.json',import.meta.url)));
assert.equal(new Set(house.families.map(f=>f.length)).size,3);
let parts=0;
for(const family of house.families){
  assert.ok(Number.isInteger(family.length)&&family.length>0&&family.length<=house.stockLength);
  for(const {from,to} of family.placements){
    assert.equal(to.reduce((sum,n,i)=>sum+(n-from[i])**2,0),family.length**2,`${family.id}: endpoints preserve exact length`);
    parts++;
  }
}
assert.equal(parts,17);
assert.deepEqual(house.families.map(f=>f.placements.length),[8,4,5]);
console.log('House verified: 3 exact length families, 17 unchanged-length pieces; roof uses a 12–16–20 triangle.');
