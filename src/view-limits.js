export const orbitLimits=Object.freeze({minRadius:4,maxRadius:27,minPolar:.2,maxPolar:1.5});
export const roomBounds=Object.freeze({left:-22,right:32,back:-16,front:32,floor:0});
// Includes wall thickness, the projecting window sill/tools and near-plane
// clearance at laptop aspect ratios. No azimuth is disabled.
export const roomMargin=1.5;
export function clearOrbitRadius(focus,direction,requested,bounds=roomBounds,limits=orbitLimits){
  let radius=Math.max(limits.minRadius,Math.min(limits.maxRadius,requested));
  for(const [axis,low,high] of [['x',bounds.left+roomMargin,bounds.right-roomMargin],['z',bounds.back+roomMargin,bounds.front-roomMargin]]){
    if(direction[axis]>1e-9)radius=Math.min(radius,(high-focus[axis])/direction[axis]);
    if(direction[axis]<-1e-9)radius=Math.min(radius,(low-focus[axis])/direction[axis]);
  }
  return radius;
}
