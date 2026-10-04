import {responseRound} from './model.js';
// Original MeasureTwice wooden models. Coordinates and lengths are sixteenths
// of an inch; rendering uses the same two world units per inch as the frame.
export function createConstruction(house,checks){
  const steps=[],byId=new Map(checks.map(c=>[c.id,c]));
  const p=(from,to,extra={})=>({from,to,...extra});
  function add(project,n,title,placements,extra={}){const exercise=n?`MT-C${String(n).padStart(2,'0')}`:null,c=byId.get(exercise);steps.push({id:exercise||extra.id,project,title,exercise,length:c?.target??extra.length??null,placements,...extra})}
  const xbar=(length,y,z,extra)=>p([-length/2,y,z],[length/2,y,z],extra);
  const zbar=(length,x,y,extra)=>p([x,y,-length/2],[x,y,length/2],extra);
  add('chair',6,'Read the Chair Order',[]);
  add('chair',13,'Front Legs',[-9.5,9.5].map(x=>p([x,0,5],[x,17,5])));
  add('chair',15,'Back Posts',[-9.5,9.5].map(x=>p([x,0,-5],[x,35,-5])));
  add('chair',4,'Seat Rails and Backrest Rails',[xbar(19,16,5),xbar(19,16,-5),xbar(19,22,-5),xbar(19,34,-5),xbar(19,6,5)]);
  add('chair',29,'Three Seat Boards',[-5.04,0,5.04].map(z=>xbar(22,17.76,z,{tone:'light'})));
  add('chair',3,'Backrest Slats',[-5.04,0,5.04].map(x=>p([x,22,-5],[x,34,-5],{roll:Math.PI/2})));
  add('chair',1,'Arm Supports',[-9.5,9.5].map(x=>p([x,17,4],[x,23,4])));
  add('chair',7,'Armrests',[-9.5,9.5].map(x=>zbar(8,x,23.88)));
  add('chair',8,'Armrest Tips',[-9.5,9.5].map(x=>p([x-2,24.76,3.5],[x+2,24.76,3.5],{tone:'dark'})));
  add('chair',2,'Backrest Crown',[xbar(7,35,-5,{tone:'light'})]);
  add('chair',10,'Backrest Joint Caps',[-9.5,9.5].map(x=>p([x-.5,34,-2],[x+.5,34,-2],{tone:'dark'})));

  const body=10.76,wing=body+3.52,upper=wing+12;
  add('plane',28,'Lengthwise Display Foot',[zbar(37,0,.88,{tone:'dark'})]);
  add('plane',18,'Crosswise Display Foot',[xbar(48,2.64,0,{tone:'dark'})]);
  add('plane',12,'Landing Struts',[-1,1].map(sign=>p([0,1.76,sign*6],[0,body,-sign*6])));
  add('plane',14,'Fuselage',[zbar(30,0,body,{tone:'light'}),zbar(30,0,body+1.76,{tone:'light'})]);
  add('plane',17,'Lower Wing Boards',[-2.52,2.52].map(z=>xbar(47,wing,z)));
  add('plane',21,'Diagonal Wing Supports',[-1,1].flatMap(sign=>[-2.52,2.52].map(z=>p([sign*18,wing,z],[sign*2,upper,z]))));
  add('plane',16,'Upper Wing Boards',[-2.52,2.52].map(z=>xbar(40,upper+.88,z,{tone:'light'})));
  add('plane',22,'Tail Wing',[xbar(28,wing,-12)]);
  add('plane',20,'Tail Fin',[p([0,wing,-12],[0,wing+6,-12])]);
  add('plane',11,'Wooden Propeller',[p([-5.5,body,15.88],[5.5,body,15.88],{roll:Math.PI/2,tone:'dark'}),p([0,body-5.5,16.76],[0,body+5.5,16.76],{roll:Math.PI/2,tone:'dark'})]);

  add('house',26,'House Platform',[-7.56,-2.52,2.52,7.56].map(z=>xbar(48,-1.76,z,{tone:'dark'})));
  add('house',5,'Frame Uprights and Rafters',house.families[0].placements.map(v=>({...v,role:'frame'})));
  add('house',null,'Frame Front and Back Rails',house.families[1].placements.map(v=>({...v,role:'frame'})),{id:'house:front-and-back-rails',length:32});
  add('house',null,'Frame Sides, Ridge, and Side Walls',[
    ...house.families[2].placements.map(v=>({...v,role:'frame'})),
    ...[-17.76,17.76].flatMap(x=>[2.5,7.5,12.5,17.5].map(y=>zbar(16,x,y,{roll:Math.PI/2,role:'wall',tone:'light'})))
  ],{id:'house:side-rails-and-ridge',length:16});
  add('house',30,'Five Outer Wall Boards',[
    ...[2.5,7.5,12.5,17.5].map(y=>xbar(34,y,-8.88,{roll:Math.PI/2,role:'wall',tone:'light'})),
    xbar(34,17.5,8.88,{roll:Math.PI/2,role:'wall',tone:'light'})
  ]);
  add('house',19,'Wall Boards Beside the Door',[-1,1].flatMap(sign=>[2.5,7.5,12.5].map(y=>p([sign*12-4,y,8.88],[sign*12+4,y,8.88],{roll:Math.PI/2,role:'wall',tone:'light'}))));
  add('house',9,'Door Boards',[-5.04,0,5.04].map(x=>p([x,.88,9.12],[x,14.88,9.12],{roll:Math.PI/2,tone:'dark'})));
  add('house',23,'Window Frames',[-19.44,19.44].flatMap(x=>[
    ...[-5.5,5.5].map(z=>p([x,4.5,z],[x,15.5,z])),
    ...[4.5,15.5].map(y=>zbar(11,x,y,{roll:Math.PI/2}))
  ]));
  add('house',25,'Front and Back Fascia',[-10.4,10.4].map(z=>xbar(36,18,z,{roll:Math.PI/2})));
  // The original 12-16-20 roof triangle extends to 15-20-25 without scaling.
  add('house',24,'Pitched Roof Boards',[-1,1].flatMap(sign=>[-7.56,-2.52,2.52,7.56].map(z=>p([sign*(20+.6),17+.8,z],[sign*.6,32+.8,z],{role:'roof',tone:'dark'}))));
  add('house',27,'Door Handle',[p([4.8,8,10],[4.8,8,13],{tone:'light'})]);
  const projects=[{id:'chair',title:'Chair',origin:[3.35,2.58,-1.3]},{id:'plane',title:'Plane',origin:[3.35,2.58,-1.3]},{id:'house',title:'House Exterior',origin:[3.35,2.91,-1.3]}];
  return {revision:'2026-10-01-chair-plane-house-v1',projects,steps};
}
export const currentStep=(s,plan)=>plan.steps[s.step]??null;
export function displayProject(s,plan){const current=currentStep(s,plan)?.project;return s.parts.some(p=>p.project===current)?current:s.parts.at(-1)?.project??plan.projects[0].id}
export function finishStep(s,plan){
  const step=currentStep(s,plan);if(!step)return false;
  if(!s.builtSteps.includes(step.id))s.builtSteps.push(step.id);
  if(s.resumeStep!==null){s.step=s.resumeStep;s.resumeStep=null}else s.step++;
  return true;
}
export function beginRedo(s,index,plan){
  const step=plan.steps[index];if(s.phase!=='selecting'&&s.phase!=='complete'||!s.builtSteps.includes(step?.id))return false;
  s.resumeStep=s.resumeStep??s.step;s.step=index;s.phase='selecting';s.readyQuestion=null;
  if(step.length!==null&&!s.requiresNewCut.includes(step.id))s.requiresNewCut.push(step.id);
  return true;
}
export function reasoningReady(s,c){if(!c?.question)return true;const round=responseRound(s,c.id),r=s.responses.find(r=>r.id===c.id&&r.round===round),e=s.responses.find(r=>r.id===c.id+':explanation'&&r.round===round);return r?.correct===true&&(!c.explanation||Boolean(e?.answer.trim()))}
export function acknowledgeStep(s,plan,checks){
  const step=currentStep(s,plan),p=s.pending,c=checks.find(c=>c.id===step?.exercise);
  if(s.phase!=='inspecting'||!p||p.acknowledged||!step||p.context!==step.id)return null;
  if(p.correct&&!reasoningReady(s,c))return null;
  p.acknowledged=true;s.acknowledgements.push({attemptId:p.id,context:p.context,kept:p.correct,recordedAt:new Date().toISOString()});
  if(!p.correct){s.phase='selecting';s.pending=null;return {keep:false,step};}
  s.requiresNewCut=s.requiresNewCut.filter(id=>id!==step.id);
  const replay=s.builtSteps.includes(step.id);
  const parts=replay?[]:step.placements.map((placement,i)=>({id:s.parts.length+i+1,length:p.actual,project:step.project,step:step.id,context:p.context,placement:i,original:i===0,mode:s.mode,...placement}));
  s.parts.push(...parts);s.phase='assembling';return {keep:true,parts,replay,project:step.project,step};
}
