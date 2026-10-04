import {createConstruction} from './construction.js';

export const catalogRevision='2026-10-03-independent-builds-v1';
export function createRecipes(house,checks){
  const original=createConstruction(house,checks);
  const recipes=['house','plane','chair'].map(id=>{
    const project=original.projects.find(p=>p.id===id);
    return {...project,title:id==='house'?'House':project.title,revision:'original-geometry-catalog-v1',
      description:id==='house'?'Frame, Walls And Roof':id==='plane'?'A Wooden Display Biplane':'A Chair With Arms And A Backrest',
      steps:original.steps.filter(st=>st.project===id&&st.length!==null).map(st=>({...st,id:`build:${id}:${st.id}`,supportingQuestion:st.exercise,exercise:null,scale:checks.find(c=>c.id===st.exercise)?.scale??16}))};
  });
  const bar=(n,y,z=0)=>({from:[-n/2,y,z],to:[n/2,y,z]});
  const treeSteps=[
    {id:'base',title:'Crossed Display Feet',length:24,scale:2,placements:[bar(24,.88),{from:[0,2.64,-12],to:[0,2.64,12]}]},
    {id:'trunk',title:'Tree Trunk',length:32,scale:2,placements:[{from:[0,1.76,0],to:[0,33.76,0]}]},
    {id:'lower',title:'Lower Branches',length:28,scale:4,placements:[bar(28,10,0),bar(28,13,0)]},
    {id:'middle',title:'Middle Branches',length:20,scale:4,placements:[bar(20,19,0),bar(20,22,0)]},
    {id:'upper',title:'Upper Branches',length:12,scale:4,placements:[bar(12,28,0),bar(12,31,0)]},
    {id:'crown',title:'Tree Crown',length:4,scale:4,placements:[bar(4,34,0)]}
  ].map(st=>({...st,id:'build:tree:'+st.id,project:'tree',exercise:null,supportingQuestion:null,placements:st.placements.map(p=>({...p,tone:'light'}))}));
  recipes.push({id:'tree',title:'Tree',revision:'wooden-tree-v1',origin:[0,2.78,0],description:'A Stepped Wooden Tree On Crossed Feet',steps:treeSteps,extension:'Original local construction extension; not a new curriculum requirement.'});
  return recipes.map(r=>({...r,partCount:r.steps.reduce((n,st)=>n+st.placements.length,0)}));
}
export const recipePlan=(recipe,recipes)=>({revision:recipe?.revision??catalogRevision,projects:recipes,steps:recipe?.steps??[]});
