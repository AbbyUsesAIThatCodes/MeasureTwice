export const orbitLimits=Object.freeze({minRadius:4,maxRadius:270,minPolar:.2,maxPolar:1.5});
export const roomBounds=Object.freeze({left:-144,right:144,back:-120,front:120,floor:0});
// Includes wall thickness, the projecting window sill/tools and near-plane
// clearance at laptop aspect ratios. No azimuth is disabled.
export const roomMargin=8;
export const preferredRadius=(distance,zoom,limits=orbitLimits)=>Math.max(limits.minRadius,Math.min(limits.maxRadius,distance*zoom));
// Enter clearance immediately; ease outward without changing the user's zoom.
export function recoverRadius(current,clear,seconds,reduced=false){
  if(reduced||clear<=current)return clear;
  const next=current+(clear-current)*(1-Math.exp(-8*Math.max(0,seconds)));
  return clear-next<.005?clear:next;
}
export function clearOrbitRadius(focus,direction,requested,bounds=roomBounds,limits=orbitLimits){
  let radius=Math.max(limits.minRadius,Math.min(limits.maxRadius,requested));
  for(const [axis,low,high] of [['x',bounds.left+roomMargin,bounds.right-roomMargin],['z',bounds.back+roomMargin,bounds.front-roomMargin]]){
    if(direction[axis]>1e-9)radius=Math.min(radius,(high-focus[axis])/direction[axis]);
    if(direction[axis]<-1e-9)radius=Math.min(radius,(low-focus[axis])/direction[axis]);
  }
  return radius;
}
