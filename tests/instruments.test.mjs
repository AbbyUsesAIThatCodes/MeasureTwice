import test from 'node:test';
import assert from 'node:assert/strict';
import {instruments,instrument,physicalTicks,worldLength,pickStep,startInstrument} from '../src/instruments.js';
import {newSession,commit,acknowledge} from '../src/model.js';
import {workshopLayout,comparisonPosition} from '../src/layout.js';
test('inch and metric lengths are exact, distinct and monotonic at every supported position',()=>{
  assert.equal(physicalTicks(16,'inch-3'),2032);
  assert.equal(physicalTicks(1000,'metre'),80000);
  assert.equal(physicalTicks(576,'yardstick'),73152);
  assert.notEqual(worldLength(576,'yardstick'),worldLength(1000,'metre'));
  for(const i of instruments)for(let n=1;n<=i.max;n++){
    assert.equal(physicalTicks(n,i.id)-physicalTicks(n-1,i.id),i.ticksPerStep);
    for(const f of [-.49,0,.49])assert.equal(pickStep(24+(n+f)*14,0,i.max*14+48,i.max),n);
    const l=workshopLayout(worldLength(i.max,i.id)),p=comparisonPosition(0,worldLength(n,i.id),l);
    assert.ok(p.x-worldLength(n,i.id)/2>=l.tableLeft);
    assert.ok(p.x+worldLength(n,i.id)/2<=l.tableLeft+l.tableWidth);
    assert.ok(l.tableLeft-l.benchRight>=.899999);
  }
});
test('switching instruments is explicit, unavailable during inspection, and preserves committed evidence',()=>{
  const s=newSession('free');s.selected=6;commit(s,10,'initial');const first=JSON.stringify(s.attempts[0]);
  assert.equal(startInstrument(s,'metre'),false);s.phase='inspecting';assert.equal(startInstrument(s,'metre'),false);
  acknowledge(s,{families:[]});s.phase='selecting';assert.equal(startInstrument(s,'metre'),true);
  assert.equal(s.parts.length,0);assert.equal(s.freeTarget,null);assert.equal(JSON.stringify(s.attempts[0]),first);
  s.selected=999;commit(s,1000,'metric');assert.deepEqual(s.pending.physical,{ticks:79920,tickUnit:'1/80 mm',stepUnit:'1 mm'});
  assert.equal(s.pending.correct,false);assert.equal(s.pending.instrument,'metre');assert.equal(s.pending.targetPhysical.ticks,80000);
  const c=newSession('challenge');assert.equal(startInstrument(c,'metre'),false);assert.equal(instrument(c).id,'inch-3');
});
