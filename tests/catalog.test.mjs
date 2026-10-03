import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import * as THREE from 'three';import {OBB} from 'three/examples/jsm/math/OBB.js';
import {checks} from '../src/content.js';import {newSession,commit} from '../src/model.js';
import {createRecipes,recipePlan} from '../src/recipes.js';import {acknowledgeStep,finishStep} from '../src/construction.js';
import {freshProgress,startRun,stableRun,completedRun,decodeProgress,createProgressStore,progressKey} from '../src/catalog-progress.js';
import {gridStep,snapToGrid,onGrid,pickVisible,ensureVisibleTarget} from '../src/grid.js';import {instruments} from '../src/instruments.js';
import {tableLegPositions,workshopLayout} from '../src/layout.js';import {compactBuild} from '../src/build-display.js';
const recipes=createRecipes(JSON.parse(fs.readFileSync('data/house.json')),checks);
function cut(s,r,n=r.steps[s.step].length){const st=r.steps[s.step];s.phase='selecting';s.subdivision=st.scale;s.selected=n;assert.equal(commit(s,st.length,st.id),true);s.phase='inspecting';return st;}
function solve(s,r){cut(s,r);assert.ok(acknowledgeStep(s,recipePlan(r,recipes),[]).keep);finishStep(s,recipePlan(r,recipes));s.phase=completedRun(s,r)?'complete':'selecting';s.pending=null;}
const memory=()=>{const values=new Map();return {values,getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)}};
test('The independent catalog retains all original measured parts and adds a connected ten-piece tree',()=>{
 assert.deepEqual(recipes.map(r=>[r.id,r.partCount,r.steps.length]),[['house',62,11],['plane',18,10],['chair',24,10],['tree',10,6]]);
 assert.equal(checks.length,30);assert.equal(recipes.flatMap(r=>r.steps).filter(st=>st.supportingQuestion).length,29);
 for(const r of recipes){assert.equal(new Set(r.steps.map(s=>s.length)).size,r.steps.length);const boxes=[];for(const st of r.steps){assert.ok(onGrid(st.length,{instrument:'inch-3',subdivision:st.scale}));for(const p of st.placements){assert.ok(Math.abs(Math.hypot(...p.to.map((n,i)=>n-p.from[i]))-st.length)<1e-9);const a=new THREE.Vector3(...p.from).multiplyScalar(1/8),b=new THREE.Vector3(...p.to).multiplyScalar(1/8),q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1,0,0),b.clone().sub(a).normalize());q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),p.roll??0));boxes.push(new OBB(a.clone().add(b).multiplyScalar(.5),new THREE.Vector3(st.length/16,.11,.315),new THREE.Matrix3().setFromMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q))));}}
 const seen=new Set([0]);let changed=true;while(changed){changed=false;for(let i=0;i<boxes.length;i++)if(!seen.has(i)&&[...seen].some(j=>boxes[i].intersectsOBB(boxes[j],1e-8))){seen.add(i);changed=true}}assert.equal(seen.size,boxes.length,r.id+' must be connected');}
});
test('All input bands share the visible imperial or metric grid and off-grid cuts are refused',()=>{
 for(const i of instruments)for(const scale of i.unit==='in'?[2,4,8,16]:[1,10]){const s={...newSession('free'),instrument:i.id,subdivision:scale};const step=gridStep(s);for(let n=0;n<=i.max;n+=step){assert.equal(snapToGrid(n,s),n);for(const f of [-.49,0,.49])assert.equal(pickVisible(24+(n+f*step)*14,0,i.max*14+48,s),n);}}
 const s=newSession('free');s.subdivision=2;s.selected=7;assert.equal(commit(s,8,'offgrid'),false);s.selected=8;assert.equal(commit(s,7,'offgridtarget'),false);s.selected=0;assert.equal(commit(s,8,'zero'),false);s.selected=8;assert.equal(commit(s,16,'wrongvisible'),true);assert.equal(s.pending.correct,false);
 const l=newSession('learn');l.subdivision=2;l.selected=7;ensureVisibleTarget(l,6);assert.equal(l.subdivision,8);assert.equal(l.selected,8);assert.equal(onGrid(6,l),true);
});
test('All four table corners have grounded supports and intermediate gaps are bounded',()=>{for(const n of [6,12,24,72,1000*80/1016]){const l=workshopLayout(n),p=tableLegPositions(l),xs=[...new Set(p.map(q=>q.x))];assert.ok(Math.abs(xs[0]-(l.tableLeft+.2))<1e-10);assert.ok(Math.abs(xs.at(-1)-(l.tableLeft+l.tableWidth-.2))<1e-10);for(let i=1;i<xs.length;i++)assert.ok(xs[i]-xs[i-1]<=4+1e-10);for(const x of xs)assert.deepEqual(p.filter(q=>q.x===x).map(q=>q.z),[l.tableZ-2.7,l.tableZ+2.7]);}});
test('Interrupted cutting restores one held attempt; acknowledged placement finishes exactly once',()=>{
 const r=recipes[3],d=freshProgress(recipes),s=startRun(d,r);cut(s,r,16);s.phase='cutting';let restored=decodeProgress(JSON.stringify(d),recipes).recipes.tree.runs[0];assert.equal(restored.phase,'inspecting');assert.equal(restored.attempts.length,1);assert.equal(restored.pending.correct,false);assert.equal(restored.step,0);
 s.phase='inspecting';acknowledgeStep(s,recipePlan(r,recipes),[]);s.phase='departing';restored=stableRun(s,r);assert.equal(restored.step,0);assert.equal(restored.parts.length,0);
 Object.assign(s,restored);cut(s,r);acknowledgeStep(s,recipePlan(r,recipes),[]);s.phase='duplicating';restored=decodeProgress(JSON.stringify(d),recipes).recipes.tree.runs[0];assert.equal(restored.step,1);assert.equal(restored.parts.length,2);assert.equal(restored.pending,null);
 finishStep(s,recipePlan(r,recipes));assert.equal(stableRun(s,r).step,1,'No second advancement after placement');
});
test('Completion and partial replays retain every original attempt and all badges through refresh',()=>{
 const d=freshProgress(recipes);for(const r of recipes){const s=startRun(d,r);while(s.step<r.steps.length)solve(s,r);assert.ok(completedRun(s,r));const prior=JSON.stringify(s),again=startRun(d,r);assert.equal(again.runNumber,2);solve(again,r);assert.equal(JSON.stringify(d.recipes[r.id].runs[0]),prior);}
 const saved=decodeProgress(JSON.stringify(d),recipes);for(const r of recipes){assert.equal(saved.recipes[r.id].runs.length,2);assert.equal(completedRun(saved.recipes[r.id].runs[0],r),true);assert.equal(saved.recipes[r.id].runs[1].step,1);}
});
test('Corrupt or unsupported saves are preserved; blocked storage and concurrent tabs do not erase progress',()=>{
 const m=memory();m.setItem(progressKey,'{bad');const store=createProgressStore(m,recipes);assert.ok([...m.values.keys()].some(k=>k.startsWith(progressKey+':recovery:')));assert.equal(store.save(),true);assert.equal([...m.values.values()].includes('{bad'),true);
 const first=createProgressStore(m,recipes),other=createProgressStore(m,recipes);startRun(first.data,recipes[0]);assert.ok(first.save());assert.equal(other.save(),false);assert.match(other.message,/Another Tab/);
 const full=createProgressStore({getItem:()=>JSON.stringify(freshProgress(recipes)),setItem(){throw Error('quota')}},recipes);assert.equal(full.save(),false);assert.match(full.message,/Full Or Unavailable/);
 const broken=JSON.parse(JSON.stringify(first.data));broken.recipes.house.runs[0].step=99;assert.throws(()=>decodeProgress(JSON.stringify(broken),recipes));broken.schemaVersion=99;assert.throws(()=>decodeProgress(JSON.stringify(broken),recipes));
});
test('Compact header identity derives from the manifest and excludes its timestamp',()=>{const m={version:'0.1.0',codename:'Predict Cut Inspect',scope:'local-catalog',ordinal:2,sourceRevision:'1234567890abcdef',builtAt:'2026-10-03T00:00:00Z'};const text=compactBuild(m);assert.match(text,/0.1.0.*Predict Cut Inspect.*local-catalog #002.*g1234567890ab/);assert.doesNotMatch(text,/2026|T00/);});
