import {newSession} from './model.js';
import {catalogRevision} from './recipes.js';
import {onGrid} from './grid.js';

export const progressKey='MeasureTwice:ChallengeCatalog:v1';
export const freshProgress=recipes=>({schemaVersion:1,catalogRevision,activeRecipeId:null,supportViewed:[],supportExposed:[],recipes:Object.fromEntries(recipes.map(r=>[r.id,{revision:r.revision,runs:[]}]))});
export const completedRun=(s,r)=>s.step===r.steps.length&&s.builtSteps.length===r.steps.length&&s.parts.length===r.partCount;
export const currentRun=(data,id)=>data.recipes[id]?.runs.at(-1)??null;
export function startRun(data,recipe,{replay=false}={}){
  const prior=currentRun(data,recipe.id);
  if(prior&&!completedRun(prior,recipe)&&!replay){data.activeRecipeId=recipe.id;return prior;}
  const s={...newSession('challenge'),activity:'catalog',recipeId:recipe.id,recipeRevision:recipe.revision,runNumber:data.recipes[recipe.id].runs.length+1,startedAt:new Date().toISOString(),completedAt:null};
  s.subdivision=recipe.steps[0].scale;s.selected=16;
  data.recipes[recipe.id].runs.push(s);data.activeRecipeId=recipe.id;return s;
}
function partsFor(s,recipe){return recipe.steps.filter(st=>s.builtSteps.includes(st.id)).flatMap(st=>st.placements.map((p,i)=>({length:st.length,project:recipe.id,step:st.id,context:st.id,placement:i,original:i===0,mode:'challenge',...p}))).map((p,i)=>({...p,id:i+1}));}
// Persist decisions. Interrupted animations resume at an acknowledged boundary,
// without creating a second attempt or awarding a second set of parts.
export function stableRun(input,recipe){
  const s=structuredClone(input),st=recipe.steps[s.step];
  if(['cutting','approaching'].includes(s.phase))s.phase='inspecting';
  if(['departing','duplicating','assembling'].includes(s.phase)){
    if(s.pending?.correct&&s.pending.acknowledged&&st&&s.pending.context===st.id&&!s.builtSteps.includes(st.id)){s.builtSteps.push(st.id);s.step++;}
    s.pending=null;s.phase='selecting';
  }
  s.parts=partsFor(s,recipe);
  if(completedRun(s,recipe)){s.phase='complete';s.pending=null;s.completedAt??=new Date().toISOString();}
  else if(s.phase==='selecting')s.pending=null;
  return s;
}
const fail=()=>{throw new Error('Saved progress has an unsupported or invalid structure');};
const list=(v,max=20000)=>{if(!Array.isArray(v)||v.length>max)fail();return v;};
function validateRun(raw,recipe,number){
  if(!raw||raw.recipeId!==recipe.id||raw.recipeRevision!==recipe.revision||raw.runNumber!==number||raw.mode!=='challenge'||raw.instrument!=='inch-3'||!Number.isInteger(raw.step)||raw.step<0||raw.step>recipe.steps.length||!['selecting','cutting','approaching','inspecting','departing','duplicating','assembling','complete'].includes(raw.phase))fail();
  if(![2,4,8,16].includes(raw.subdivision)||!onGrid(raw.selected,raw)||typeof raw.startedAt!=='string')fail();
  const ids=recipe.steps.map(st=>st.id);list(raw.builtSteps,ids.length);if(new Set(raw.builtSteps).size!==raw.builtSteps.length||raw.builtSteps.some(id=>!ids.includes(id)))fail();
  list(raw.attempts).forEach((a,i)=>{const st=recipe.steps.find(st=>st.id===a.context);if(!st||a.id!==i+1||a.recipeId!==recipe.id||a.runNumber!==number||a.target!==st.length||!onGrid(a.actual,{instrument:'inch-3',subdivision:a.scale})||a.actual===0||a.correct!==(a.actual===a.target)||a.physical?.ticks!==a.actual*127)fail();});
  list(raw.acknowledgements).forEach(a=>{if(!raw.attempts.some(t=>t.id===a.attemptId&&t.context===a.context&&t.correct===a.kept))fail();});
  for(const id of raw.builtSteps)if(!raw.acknowledgements.some(a=>a.context===id&&a.kept))fail();
  if(raw.step!==raw.builtSteps.length||raw.builtSteps.some((id,i)=>id!==ids[i]))fail();
  if(raw.pending){const a=raw.attempts.find(a=>a.id===raw.pending.id);if(!a||a.context!==recipe.steps[raw.step]?.id||a.actual!==raw.pending.actual||a.target!==raw.pending.target||a.correct!==raw.pending.correct)fail();if(raw.pending.acknowledged&&!raw.acknowledgements.some(q=>q.attemptId===a.id))fail();}
  if(['cutting','approaching','inspecting'].includes(raw.phase)&&!raw.pending)fail();
  list(raw.responses);list(raw.exposed);if(raw.exposed.some(v=>typeof v!=='string'))fail();
  return stableRun({...newSession('challenge'),...raw},recipe);
}
export function decodeProgress(text,recipes){
  if(typeof text!=='string'||text.length>8_000_000)fail();const data=JSON.parse(text);
  if(data.schemaVersion!==1||data.catalogRevision!==catalogRevision||!data.recipes||data.activeRecipeId!==null&&!recipes.some(r=>r.id===data.activeRecipeId))fail();
  list(data.supportViewed,100);if(data.supportViewed.some(id=>!/^MT-C\d{2}$/.test(id)))fail();
  list(data.supportExposed??[],100);if((data.supportExposed??[]).some(id=>!/^MT-C\d{2}$/.test(id)))fail();
  const out=freshProgress(recipes);out.supportExposed=[...(data.supportExposed??[])];out.activeRecipeId=data.activeRecipeId;out.supportViewed=[...data.supportViewed];
  for(const recipe of recipes){const entry=data.recipes[recipe.id];if(!entry||entry.revision!==recipe.revision)fail();out.recipes[recipe.id].runs=list(entry.runs,1000).map((s,i)=>validateRun(s,recipe,i+1));}
  if(out.activeRecipeId&&!currentRun(out,out.activeRecipeId))fail();return out;
}
export function createProgressStore(storage,recipes){
  let data=freshProgress(recipes),lastRaw=null,blocked=false,message='Progress Saves In This Browser';
  try{lastRaw=storage.getItem(progressKey);if(lastRaw)data=decodeProgress(lastRaw,recipes);}catch(error){
    if(lastRaw){try{storage.setItem(progressKey+':recovery:'+Date.now(),lastRaw);message='Unreadable Progress Preserved For Recovery; Starting A Fresh Catalog';}catch{blocked=true;message='Saved Progress Preserved; Browser Storage Is Unavailable';}}
    else {blocked=true;message='Browser Storage Is Unavailable; Export Before Closing';}
  }
  const api={get data(){return data},get message(){return message},get blocked(){return blocked},save(){
    if(blocked)return false;
    try{if(storage.getItem(progressKey)!==lastRaw){blocked=true;message='Progress Changed In Another Tab; Export This Session Before Reloading';return false;}
      const snapshot=structuredClone(data);for(const r of recipes)snapshot.recipes[r.id].runs=snapshot.recipes[r.id].runs.map(s=>stableRun(s,r));
      const raw=JSON.stringify(snapshot);storage.setItem(progressKey,raw);lastRaw=raw;return true;
    }catch{message='Browser Storage Is Full Or Unavailable; Export Before Closing';return false;}
  }};return api;
}
