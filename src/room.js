export const windowOpening=Object.freeze({left:-114,right:-46,bottom:90,top:144});
export const wallHeight=192;
const height=wallHeight;
export function wallSections(b){
 const w=windowOpening;
 return [
  {side:'back',start:b.left,end:w.left,bottom:0,top:height},
  {side:'back',start:w.right,end:b.right,bottom:0,top:height},
  {side:'back',start:w.left,end:w.right,bottom:0,top:w.bottom},
  {side:'back',start:w.left,end:w.right,bottom:w.top,top:height},
  {side:'front',start:b.left,end:b.right,bottom:0,top:height},
  ...['left','right'].map(side=>({side,start:b.back,end:b.front,bottom:0,top:height}))
 ];
}
export function wallCourses(b){
 const rows=[],w=windowOpening;
 for(let row=0,y=10;y<height;row++,y+=14){
  // Bury the log ends under the existing trim so caps cannot show in the glass.
  const spans=y+3.3>w.bottom&&y-3.3<w.top?[[b.left,w.left-2],[w.right+2,b.right]]:[[b.left,b.right]];
  for(const [start,end] of spans)rows.push({side:'back',start,end,y,row});
  rows.push({side:'front',start:b.left,end:b.right,y,row});
  for(const side of ['left','right'])rows.push({side,start:b.back,end:b.front,y,row});
 }
 return rows;
}
// Procedural plank flooring stays subdued and keeps the established warm palette.
function floorTexture(THREE){
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;
 const ctx=canvas.getContext('2d'),tones=['#c6b18a','#cab78f','#c4af88','#ceba94'];
 for(let row=0;row<4;row++){
  const y=row*128;ctx.fillStyle=tones[row];ctx.fillRect(0,y,512,128);
  ctx.fillStyle='#9d896455';ctx.fillRect(0,y,512,2);
  const joint=row%2?170:420;ctx.fillRect(joint,y,2,128);
  for(let j=0;j<7;j++){
   ctx.strokeStyle=j%2?'#a08b5e22':'#ebd3a92b';ctx.lineWidth=1;ctx.beginPath();
   for(let x=0;x<=512;x+=16)ctx.lineTo(x,y+12+j*16+Math.sin(x*.025+j+row)*2);
   ctx.stroke();
  }
 }
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=4;return texture;
}
export function createRoom(THREE,scene,{box,cylinder,mat,woodDark,bounds}){
 const root=new THREE.Group();root.name='Workshop Room';scene.add(root);
 const timber=new THREE.Group(),logs=new THREE.Group(),surfaces=[],details=[];
 timber.name='Warm Timber Detailing';logs.name='Log Cabin Detailing';root.add(timber,logs);logs.visible=false;
 const wallMaterial=mat(0xcdaa7c),sideMaterial=mat(0xc49d70),logMaterials=[mat(0xbd9568),mat(0xc7a175)];
 const texture=floorTexture(THREE),floor=box(1,.25,1,mat(0xffffff,{map:texture}),0,-.125,0,root);
 floor.name='Plank Floor';floor.castShadow=false;
 const position=(side,along,y,inset)=>side==='back'?[along,y,bounds.back+inset]:side==='front'?[along,y,bounds.front-inset]:side==='left'?[bounds.left+inset,y,along]:[bounds.right-inset,y,along];
 function configure(){
  for(const group of [timber,logs])for(const q of [...group.children]){group.remove(q);q.geometry.dispose()}
  for(const q of surfaces){if(q!==floor){root.remove(q);q.geometry.dispose()}}
  surfaces.length=0;details.length=0;
  const width=bounds.right-bounds.left,depth=bounds.front-bounds.back;
  floor.scale.set(width,1,depth);floor.position.set((bounds.left+bounds.right)/2,-.125,(bounds.back+bounds.front)/2);
  texture.repeat.set(width/48,depth/48);surfaces.push(floor);
  for(const p of wallSections(bounds)){
   const along=(p.start+p.end)/2,y=(p.bottom+p.top)/2,span=p.end-p.start,h=p.top-p.bottom,across=['back','front'].includes(p.side);
   const q=box(across?span:2.5,h,across?2.5:span,p.side==='back'?wallMaterial:sideMaterial,...position(p.side,along,y,0),root);
   q.name=p.side+' Wall';surfaces.push(q);
  }
  for(const p of wallCourses(bounds)){
   const across=['back','front'].includes(p.side),span=p.end-p.start,along=(p.start+p.end)/2;
   const seam=box(across?span:.35,.35,across?.35:span,woodDark,...position(p.side,along,p.y,1.5),timber);
   seam.castShadow=false;
   const log=cylinder(3.3,3.3,span,logMaterials[p.row%2],...position(p.side,along,p.y,.3),logs,10);
   log.rotation[across?'z':'x']=Math.PI/2;
   details.push(p);
  }
  for(const side of ['back','front','left','right']){
   const across=['back','front'].includes(side),start=across?bounds.left:bounds.back,end=across?bounds.right:bounds.front;
   const count=Math.ceil((end-start)/100);
   for(let n=0;n<=count;n++){
    const along=start+3.5+(end-start-7)*n/count;
    if(side==='back'&&along>windowOpening.left-3&&along<windowOpening.right+3)continue;
    box(3,height,3.5,woodDark,...position(side,along,height/2,2.2),timber);
   }
  }
 }
 configure();
 return {root,floor,surfaces,timber,logs,configure,details};
}
