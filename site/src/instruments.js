// Exact canonical length: one tick = 1/80 mm. An inch = 2032 ticks;
// a sixteenth inch = 127 ticks, and a millimetre = 80 ticks.
export const instruments=Object.freeze([
  {id:'inch-3',title:'3-Inch Ruler',unit:'in',max:48,ticksPerStep:127},
  {id:'inch-6',title:'6-Inch Ruler',unit:'in',max:96,ticksPerStep:127},
  {id:'inch-12',title:'12-Inch Ruler',unit:'in',max:192,ticksPerStep:127},
  {id:'yardstick',title:'36-Inch Yardstick',unit:'in',max:576,ticksPerStep:127},
  {id:'cm-15',title:'15-Centimetre Ruler',unit:'mm',max:150,ticksPerStep:80},
  {id:'cm-30',title:'30-Centimetre Ruler',unit:'mm',max:300,ticksPerStep:80},
  {id:'metre',title:'Metre Stick — 100 cm',unit:'mm',max:1000,ticksPerStep:80}
]);
export const instrument=s=>instruments.find(i=>i.id===(typeof s==='string'?s:s.instrument))||instruments[0];
export const physicalTicks=(n,s)=>n*instrument(s).ticksPerStep;
export const worldLength=(n,s)=>physicalTicks(n,s)/1016;
export function exactRecord(n,s){return {ticks:physicalTicks(n,s),tickUnit:'1/80 mm',stepUnit:instrument(s).unit==='in'?'1/16 in':'1 mm'};}
export function startInstrument(s,id){
  const i=instruments.find(i=>i.id===id);
  if(s.mode!=='free'||s.phase!=='selecting'||!i)return false;
  s.instrument=id;s.workspace=(s.workspace||0)+1;s.selected=i.unit==='in'?16:10;
  s.freeTarget=null;s.parts=[];s.pending=null;s.subdivision=i.unit==='in'?16:10;
  return true;
}
export function pickStep(clientX,left,width,max=48){return Math.max(1,Math.min(max,Math.round((clientX-left-24)/(width-48)*max)));}
