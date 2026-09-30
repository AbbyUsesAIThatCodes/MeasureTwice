export const orbitLimits=Object.freeze({minRadius:4,maxRadius:27,minPolar:.2,maxPolar:1.5});
export const roomBounds=Object.freeze({left:-22,right:32,back:-16,front:32,floor:0});
// Includes wall thickness, the projecting window sill/tools and near-plane
// clearance at laptop aspect ratios. No azimuth is disabled.
export const roomMargin=1.5;
export function clearOrbitRadius(focus,direction,requested){
  let radius=Math.max(orbitLimits.minRadius,Math.min(orbitLimits.maxRadius,requested));
  for(const [axis,low,high] of [['x',roomBounds.left+roomMargin,roomBounds.right-roomMargin],['z',roomBounds.back+roomMargin,roomBounds.front-roomMargin]]){
    if(direction[axis]>1e-9)radius=Math.min(radius,(high-focus[axis])/direction[axis]);
    if(direction[axis]<-1e-9)radius=Math.min(radius,(low-focus[axis])/direction[axis]);
  }
  return radius;
}
