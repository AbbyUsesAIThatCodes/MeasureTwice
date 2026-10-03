import {instrument} from './instruments.js';

export const availableScales=s=>instrument(s).unit==='in'?[2,4,8,16]:[1,10];
export function gridStep(s,scale=s.subdivision){
  if(!availableScales(s).includes(scale))throw new Error('Unsupported visible scale');
  return instrument(s).unit==='in'?16/scale:10/scale;
}
export const onGrid=(n,s,scale=s.subdivision)=>Number.isInteger(n)&&n>=0&&n<=instrument(s).max&&n%gridStep(s,scale)===0;
export function snapToGrid(n,s){const step=gridStep(s);return Math.max(0,Math.min(instrument(s).max,Math.round(n/step)*step));}
export function pickVisible(clientX,left,width,s){return snapToGrid((clientX-left-24)/(width-48)*instrument(s).max,s);}
export function ensureVisibleTarget(s,target){
  if(target!==null&&!onGrid(target,s)){
    const scale=availableScales(s).find(n=>n>=s.subdivision&&onGrid(target,s,n));
    if(!scale)throw new Error('Target has no exact visible graduation');
    s.subdivision=scale;
  }
  s.selected=snapToGrid(s.selected,s);
}
export const intervalName=s=>instrument(s).unit==='in'?`1/${s.subdivision} Inch`:s.subdivision===1?'1 Centimetre':'1 Millimetre';
