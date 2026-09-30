import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {checks,provenance} from '../src/content.js';
import {newSession,commit,acknowledge,submitResponse,beginRetry,exposeActivity,restartSession} from '../src/model.js';
import {challengeStatus,exerciseStatus,teacherReport} from '../src/assessment.js';
const house=JSON.parse(fs.readFileSync('data/house.json'));
const manifest={id:'verified-build-fixture',sourceRevision:'abc123',builtAt:'2026-09-30T00:00:00Z',fingerprint:'fixture'};
function solve(s,c){s.activity='check';s.phase='selecting';if(c.question)submitResponse(s,c.id,c.answer,c.answer);if(c.explanation)submitResponse(s,c.id+':explanation','My reasoning is saved.',null);if(c.kind==='cut'){s.selected=c.target;commit(s,c.target,c.id,{copyCount:c.copies??1});s.phase='inspecting';acknowledge(s,house);s.phase='selecting'}}
function buildHouse(s){s.activity='house';for(const f of house.families){s.phase='selecting';s.selected=f.length;commit(s,f.length,'house:'+f.id);s.phase='inspecting';acknowledge(s,house)}}
test('Thirty mapped checks preserve seed IDs, use exact printable marks, and keep authored equivalence names',()=>{
 assert.equal(checks.length,30);assert.equal(new Set(checks.map(c=>c.id)).size,30);assert.deepEqual(checks.slice(0,6).map(c=>c.target),[6,7,12,19,null,null]);
 for(const c of checks){assert.ok(c.goals.length&&c.pages&&c.mapping&&c.prompt&&c.feedback);if(c.kind==='cut'){assert.ok(c.target>=1&&c.target<=48);assert.equal(c.target%(16/c.scale),0)}if(c.question)assert.ok(c.options.includes(c.answer))}
 assert.equal(checks[2].targetLabel,'6/8');assert.deepEqual(checks.slice(18,22).map(c=>c.targetLabel),['2/4','6/16','10/8','14/8']);assert.equal(checks.slice(18,22).filter(c=>c.answer.startsWith('No')).length,2);
 assert.deepEqual(checks.slice(22,26).map(c=>c.answer),['Too Short','Too Long','The Right Length','Too Short']);assert.equal(checks.slice(6).filter(c=>c.kind==='cut').length,24);
});
test('A correct unacknowledged cut cannot finish an exercise; every objective and explanation is needed',()=>{
 const s=newSession('challenge'),c=checks[2];s.activity='check';s.selected=12;commit(s,12,c.id);assert.equal(exerciseStatus(s,c).complete,false);s.phase='inspecting';acknowledge(s,house);assert.equal(exerciseStatus(s,c).complete,false);submitResponse(s,c.id,c.answer,c.answer);assert.equal(exerciseStatus(s,c).complete,false);submitResponse(s,c.id+':explanation','Reason',null);assert.equal(exerciseStatus(s,c).complete,true);assert.equal(s.responses[1].correct,null);
});
test('Wrong objective can be retried without overwriting first responses or counting support as independent success',()=>{
 let s=newSession('challenge'),c=checks[5];submitResponse(s,c.id,'The Wood Color',c.answer);const original=JSON.stringify(s.responses[0]);assert.equal(exerciseStatus(s,c).complete,false);assert.equal(submitResponse(s,c.id,c.answer,c.answer),false);exposeActivity(s,c.id);beginRetry(s,c.id);submitResponse(s,c.id,c.answer,c.answer);assert.equal(exerciseStatus(s,c).complete,true);assert.equal(exerciseStatus(s,c).firstIndependentCorrect,false);assert.equal(s.responses[1].retry,true);assert.equal(s.responses[1].assisted,true);s=restartSession(s);assert.equal(JSON.stringify(s.responses[0]),original);assert.equal(exerciseStatus(s,c).complete,true);
});
test('All thirty exercises and the current complete house gate a build-identified offline report',()=>{
 let s=newSession('challenge');buildHouse(s);assert.equal(challengeStatus(s,checks,house).complete,false);assert.throws(()=>teacherReport(s,checks,house,manifest,provenance));for(const c of checks.slice(0,-1))solve(s,c);assert.equal(challengeStatus(s,checks,house).correctCount,29);assert.throws(()=>teacherReport(s,checks,house,manifest,provenance));solve(s,checks.at(-1));assert.equal(challengeStatus(s,checks,house).complete,true);const report=teacherReport(s,checks,house,manifest,provenance);for(const c of checks)assert.ok(report.includes(c.id));assert.ok(report.includes(manifest.id)&&report.includes(manifest.sourceRevision)&&report.includes('Teacher Review'));assert.throws(()=>teacherReport(s,checks,house,null,provenance));s=restartSession(s);assert.equal(challengeStatus(s,checks,house).correctCount,30);assert.equal(challengeStatus(s,checks,house).complete,false);buildHouse(s);assert.equal(challengeStatus(s,checks,house).complete,true);
});
test('Equal-copy tasks retain one original plus N minus one unchanged pieces',()=>{
 for(const c of checks.slice(-2)){const s=newSession('challenge');solve(s,c);assert.equal(s.parts.length,c.copies);assert.equal(s.parts.filter(p=>p.original).length,1);assert.ok(s.parts.every(p=>p.length===c.target));assert.equal(s.attempts.length,1)}
});
