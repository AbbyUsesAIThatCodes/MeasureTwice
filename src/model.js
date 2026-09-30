export const gcd=(a,b)=>b?gcd(b,a%b):a;
export function fraction(n){const w=Math.floor(n/16),r=n%16;if(!r)return String(w);const d=gcd(r,16);return `${w?w+' ':''}${r/d}/${16/d}`}
export function pick(clientX,left,width){return Math.max(1,Math.min(48,Math.round((clientX-left-24)/(width-48)*48)))}
export function newSession(mode){return {mode,selected:16,phase:'selecting',family:0,attempts:[],parts:[],completed:[],pending:null,hint:false,lesson:0,lessonStage:'guided',check:0,activity:'house',responses:[],exposed:[],responseRounds:{},acknowledgements:[],freeTarget:null,subdivision:16,sparse:false,comparison:null}}
export const activityId=id=>String(id).match(/^MT-[LC]\d+/)?.[0]??id;
export function exposeActivity(s,id){const key=activityId(id);if(!s.exposed.includes(key))s.exposed.push(key)}
export const hasExposure=(s,id)=>s.exposed.includes(activityId(id));
export const isAssisted=(s,id)=>s.hint||s.mode==='learn'||hasExposure(s,id);
export function restartSession(s){return {...newSession(s.mode),exposed:[...s.exposed],attempts:[...s.attempts],responses:[...s.responses],responseRounds:{...s.responseRounds},acknowledgements:[...s.acknowledgements]}}
export const responseRound=(s,id)=>s.responseRounds[activityId(id)]??0;
export function beginRetry(s,id){const key=activityId(id);s.responseRounds[key]=responseRound(s,id)+1;s.readyQuestion=null;return s.responseRounds[key]}
export function commit(s,target,context,{copyCount=1}={}){
  if(s.phase!=='selecting'||!Number.isInteger(s.selected)||s.selected<1||s.selected>48)return false;
  const repeated=s.attempts.some(a=>a.context===context);
  const record={id:s.attempts.length+1,context,actual:s.selected,target,unit:'in',scale:s.subdivision,round:responseRound(s,context),copyCount,recordedAt:new Date().toISOString(),assisted:isAssisted(s,context)||(s.mode==='challenge'&&repeated),kind:s.demonstrating?'demonstration':'student-response',retry:repeated,correct:target===null?null:s.selected===target};
  s.attempts.push(record);s.pending={...record,acknowledged:false};s.phase='cutting';return true;
}
export function acknowledge(s,house){
  if(s.phase!=='inspecting'||!s.pending||s.pending.acknowledged)return null;
  const p=s.pending;p.acknowledged=true;
  s.acknowledgements.push({attemptId:p.id,context:p.context,kept:p.correct!==false||s.mode==='free',recordedAt:new Date().toISOString()});
  if(p.correct===false&&s.mode!=='free'){s.phase='selecting';s.pending=null;return {keep:false};}
  const f=s.mode==='challenge'&&s.activity==='house'?house.families[s.family]:null;
  const family=f?.id;
  if(f&&s.completed.includes(f.id))return null;
  const count=f?f.placements.length:p.copyCount??1;
  const parts=Array.from({length:count},(_,i)=>({id:s.parts.length+i+1,length:p.actual,family:family??null,context:p.context,placement:i,original:i===0,mode:s.mode}));
  s.parts.push(...parts);
  if(f){s.completed.push(f.id);s.family++}
  s.phase='assembling';return {keep:true,parts,family:f};
}
export function submitResponse(s,id,answer,expected){
  const round=responseRound(s,id);
  if(s.responses.some(r=>r.id===id&&r.round===round))return false;
  const retry=s.responses.some(r=>r.id===id);
  s.responses.push({id,answer,round,retry,recordedAt:new Date().toISOString(),correct:expected===null?null:answer===expected,review:expected===null?'Teacher Review':'Objective Component',assisted:isAssisted(s,id)||retry});
  return true;
}
export function comparisonPlacement(index,length){return {x:6.3+length/16,y:2.91+Math.floor(index/8)*.4,z:-1.05-(index%8)*(.63+.09)}}
