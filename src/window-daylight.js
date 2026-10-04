// Reusable Sunny Woodshop extension. This static floor projection is an
// explicitly authored low-cost approximation; it is not volumetric lighting.
export function createWindowDaylight(THREE,{windowCenter,halfWidth=3.4,halfHeight=2.7,floorY=.008,direction=[.3,-1,1.15]}){
  const group=new THREE.Group();group.name='Window Daylight';
  const [cx,cy,cz]=windowCenter,[dx,dy,dz]=direction;
  if(dy>=0)throw new Error('Daylight must point down toward the floor.');
  const project=(x,y)=>{const t=(floorY-y)/dy;return [x+t*dx,floorY,cz+t*dz]};
  // Four panes leave the sill/mullions unlit and stay inside the opening.
  for(const [x0,x1] of [[-halfWidth,-.09],[.09,halfWidth]])for(const [y0,y1] of [[-halfHeight,-.09],[.09,halfHeight]]){
    const points=[project(cx+x0,cy+y0),project(cx+x1,cy+y0),project(cx+x1,cy+y1),project(cx+x0,cy+y1)];
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(points.flat(),3));geometry.setIndex([0,1,2,0,2,3]);geometry.computeVertexNormals();
    const mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0xffe3a0,transparent:true,opacity:.22,depthWrite:false,side:THREE.DoubleSide}));mesh.name='Projected Window Pane';group.add(mesh);
  }
  group.userData.recipe={windowCenter,halfWidth,halfHeight,floorY,direction,approximation:'Static Four-Pane Floor Projection',source:'Sunny Woodshop'};
  return group;
}
