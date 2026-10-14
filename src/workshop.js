// Adapted from the teacher-approved September 28 MeasureTwice source.
// Archive SHA-256 dc9a6aa15a42497c54bb52d3fc6d72d5fa6a358904ff7950dd1c86d1954ad992.
import * as THREE from '../vendor/three.module.js';
import {orbitLimits as defaults,roomBounds as defaultRoom,clearOrbitRadius as clearRadius} from './view-limits.js';
import {workshopLayout,workstation,tableLegPositions} from './layout.js';
import {createWindowDaylight} from './window-daylight.js';
import {createRoom} from './room.js';
export function createWorkshop(stage){
const orbitLimits={...defaults},roomBounds={...defaultRoom};
const clearOrbitRadius=(focus,direction,requested)=>clearRadius(focus,direction,requested,roomBounds,orbitLimits);
let renderer;try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true})}catch(e){throw new Error('WebGL could not start. Please enable hardware acceleration or try another browser.',{cause:e})}
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;renderer.setClearColor(0x000000,0);renderer.domElement.setAttribute('aria-label','A sunny 3D woodshop with a teal saw, a movable plank, a staging stack, and a model house.');renderer.domElement.setAttribute('role','img');stage.prepend(renderer.domElement);
// An indoor measuring workspace needs stable contrast at every supported span.
// Distance fog previously washed out the 6-inch room (near 24 / far 48).
const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(35,1,.1,600);
const roomSurfaces=[];let geometryParent=scene;const benchRise=0;
const homePos=new THREE.Vector3(25,182,75),homeLook=new THREE.Vector3(25,68,-5);let look=homeLook.clone();camera.position.copy(homePos);camera.lookAt(look);
scene.add(new THREE.HemisphereLight(0xfff9df,0x829d78,2.25));const sun=new THREE.DirectionalLight(0xffefc8,3.3);sun.position.set(-120,160,-240);sun.target.position.set(-40,0,-50);scene.add(sun.target);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-140,right:140,top:130,bottom:-130,near:.5,far:400});sun.shadow.normalBias=.08;scene.add(sun);const fill=new THREE.DirectionalLight(0xd7f2e7,.7);fill.position.set(90,140,-60);scene.add(fill);
const mat=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.78,...extra});const teal=mat(0x448f7a),tealDark=mat(0x28564b),yellow=mat(0xe7b649),steel=mat(0xc4d0c8,{metalness:.5,roughness:.4}),ivory=mat(0xf8eed3),dark=mat(0x36473f),ghost=mat(0x689385,{transparent:true,opacity:.14,depthWrite:false});
function woodTexture(){const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');x.fillStyle='#dfae67';x.fillRect(0,0,512,128);for(let i=0;i<18;i++){x.strokeStyle=i%3?'#b87f423b':'#f7dba764';x.lineWidth=i%4===0?2:1;x.beginPath();for(let j=0;j<=512;j+=16){const y=i*8+Math.sin(j*.018+i*3)*3;x.lineTo(j,y)}x.stroke()}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
const wood=mat(0xffffff,{map:woodTexture()}),woodDark=mat(0xbb8751),woodLight=mat(0xe7c083);const STOCK=6,SAW_X=workstation.sawX,BOARD_Y=workstation.boardY,BOARD_Z=workstation.boardZ;
function box(w,h,d,m,x=0,y=0,z=0,parent=geometryParent){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh}
function cylinder(rt,rb,h,m,x,y,z,parent=geometryParent,n=16){const q=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),m);q.position.set(x,y,z);q.castShadow=true;q.receiveShadow=true;parent.add(q);return q}
function line(points,color=0x456354,parent=geometryParent){const q=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p))),new THREE.LineBasicMaterial({color}));parent.add(q);return q}
function plank(len,m=wood){const g=new THREE.Group();box(len,.22,.63,m,0,0,0,g);return g}
const room=createRoom(THREE,scene,{box,cylinder,mat,woodDark,bounds:roomBounds});
const {timber,logs}=room;
const daylight=createWindowDaylight(THREE,{windowCenter:[-80,117,roomBounds.back+5],halfWidth:34,halfHeight:27});scene.add(daylight);
function setAtmosphere(style,lit){timber.visible=style!=='logs';logs.visible=style==='logs';daylight.visible=lit;sun.intensity=lit?3.3:1.4;render()}
const backdrop=new THREE.Group();backdrop.scale.setScalar(10);backdrop.position.set(0,55,roomBounds.back+3);scene.add(backdrop);
for(const x of [-11.6,-4.4])box(.4,6.2,.2,ivory,x,6.2,0,backdrop);for(const y of [3.3,9.1])box(7.6,.4,.2,ivory,-8,y,0,backdrop);box(6.8,5.4,.23,mat(0xadd4cf,{emissive:0x7bbfc3,emissiveIntensity:.13,transparent:true,opacity:.28}),-8,6.2,.14,backdrop).castShadow=false;box(.18,5.4,.25,ivory,-8,6.2,.35,backdrop);box(6.8,.18,.25,ivory,-8,6.2,.35,backdrop);box(8.3,.2,.8,woodLight,-8,3.14,.3,backdrop);
box(6.8,4.2,.15,woodDark,3,6.2,0,backdrop);
for(let i=0;i<7;i++)for(let j=0;j<4;j++)cylinder(.05,.05,.1,dark,.2+i*.9,4.8+j*.86,.13,backdrop,6).rotation.set(Math.PI/2,0,0);
// Tools drawn as solid models rather than labels.
// Each silhouette hangs from a visible hook on the existing pegboard.
for(const x of [.5,1.8,3.1,4.4,5.5]){box(.07,.18,.3,steel,x,7.55,.25,backdrop);box(.07,.1,.12,steel,x,7.49,.44,backdrop);}
box(.16,1.45,.18,woodLight,.5,6.65,.37,backdrop);box(.8,.25,.28,steel,.5,7.2,.37,backdrop);
box(.18,1.7,.16,woodDark,1.8,6.5,.35,backdrop);box(.95,.16,.15,steel,2.18,5.75,.35,backdrop);
box(.13,1.15,.13,steel,3.1,6.4,.35,backdrop);box(.27,.65,.27,yellow,3.1,7.17,.35,backdrop);
box(.8,1.45,.07,steel,4.4,6.45,.33,backdrop);box(.72,.24,.18,woodDark,4.4,7.25,.35,backdrop);
for(let j=0;j<7;j++)box(.15,.065,.1,steel,4+j*.12,5.7,.35,backdrop).rotation.z=Math.PI/4;
box(.12,1.6,.15,tealDark,5.5,6.6,.35,backdrop);for(const y of [5.85,7.35])box(.65,.16,.2,teal,5.76,y,.35,backdrop);box(.07,.65,.08,steel,6,6.1,.35,backdrop);
roomSurfaces.push(...room.surfaces,...backdrop.children);
const workRoot=new THREE.Group();workRoot.name="Raised Work Surface";workRoot.position.y=benchRise;scene.add(workRoot);geometryParent=workRoot;workRoot.add(camera);
const benchTop=box(204,4,72,woodLight,0,66,0);box(200,8,2,woodDark,0,60,34);
const benchLegs=tableLegPositions(workstation).map(({x,z})=>box(6,64,6,woodDark,x,32,z));
for(const z of [-30,30])box(192,4,4,woodDark,0,18,z);
// Fixed, integrated stock bed: same length/height for every instrument.
const stockBed=new THREE.Group();workRoot.add(stockBed);
for(const [left,right] of [[-102,SAW_X-24],[SAW_X+24,60]])box(right-left,2,3,woodLight,(left+right)/2,69,BOARD_Z,stockBed);
// Saw, with its blade plane perpendicular to the board's length.
const sawBase=box(48,2,48,teal,SAW_X,69,8),sawPost=box(5,22,5,tealDark,SAW_X,81,-10),sawArm=box(6,4,36,teal,SAW_X,93,6);
const bladeGroup=new THREE.Group();bladeGroup.position.set(SAW_X,workstation.bladeY,BOARD_Z);workRoot.add(bladeGroup);const blade=cylinder(10,10,.16,steel,0,0,0,bladeGroup,48);blade.rotation.z=Math.PI/2;for(let i=0;i<36;i++){const a=i*Math.PI/18;const tooth=box(.18,1,.8,steel,0,Math.cos(a)*10.1,Math.sin(a)*10.1,bladeGroup);tooth.rotation.x=a}const bolt=cylinder(1,1,.6,tealDark,0,0,0,bladeGroup);bolt.rotation.z=Math.PI/2;
const guard=new THREE.Mesh(new THREE.TorusGeometry(10.7,1,6,48,Math.PI),teal);guard.rotation.y=Math.PI/2;guard.position.copy(bladeGroup.position);workRoot.add(guard);
// Staging tray and ghost model.
const receivingTray=new THREE.Group();receivingTray.name='Ready To Assemble';workRoot.add(receivingTray);
box(80,.5,16,tealDark,54,68.25,-2,receivingTray);for(const z of [-10,6])box(80,.8,.5,teal,54,68.65,z,receivingTray);
function surfaceLabel(text,width,x,y,z,parent,color='#ecf4dc'){const c=document.createElement('canvas');c.width=1024;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle=color;ctx.font='bold 68px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,512,64);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const q=new THREE.Mesh(new THREE.PlaneGeometry(width,width/8),new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false}));q.rotation.x=-Math.PI/2;q.position.set(x,y,z);q.userData.annotation=true;parent.add(q);return q}surfaceLabel('Ready To Assemble',54,54,68.52,-6,receivingTray);
const stagingPosition=new THREE.Vector3(...workstation.staging);
// Plant and tool cup establish a cheerful workshop without crowding the measuring station.
const plant=new THREE.Group();plant.name='Leafy Workshop Plant';plant.position.set(-6,2.66,-1.34);workRoot.add(plant);
cylinder(.31,.24,.54,mat(0xc78055),0,.27,0,plant);
cylinder(.315,.315,.075,mat(0xe0a26e),0,.53,0,plant);
cylinder(.275,.275,.025,mat(0x574333),0,.559,0,plant);
const stemMaterial=mat(0x426b38),leafMaterials=[mat(0x518749,{side:THREE.DoubleSide}),mat(0x80ad58,{side:THREE.DoubleSide})];
// Folded, curved, pointed leaf surfaces rather than scaled solid spheres.
for(let i=0;i<7;i++){
  const angle=i*2.399,spread=.38+(i%3)*.13,height=.72+(i%3)*.15;
  const direction=new THREE.Vector3(Math.cos(angle),0,Math.sin(angle));
  const across=new THREE.Vector3(-Math.sin(angle),0,Math.cos(angle));
  const base=new THREE.Vector3(direction.x*.09,.56,direction.z*.09);
  const start=base.clone().addScaledVector(direction,.1).add(new THREE.Vector3(0,.27+(i%2)*.08,0));
  const stem=new THREE.Mesh(new THREE.CylinderGeometry(.013,.018,base.distanceTo(start),6),stemMaterial);
  stem.position.copy(base).add(start).multiplyScalar(.5);stem.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),start.clone().sub(base).normalize());plant.add(stem);
  const points=[],indices=[],vein=[];
  for(let j=0;j<=8;j++){
    const t=j/8,center=start.clone().addScaledVector(direction,spread*t);
    center.y+=height*t-.43*t*t;vein.push(center.clone().add(new THREE.Vector3(0,.007,0)));
    const width=Math.sin(Math.PI*t)*(.16+(i%2)*.035);
    for(const side of [-1,0,1]){const point=center.clone().addScaledVector(across,side*width);point.y-=Math.abs(side)*width*.3;points.push(...point.toArray())}
    if(j<8){const a=j*3;indices.push(a,a+3,a+1,a+1,a+3,a+4,a+1,a+4,a+2,a+2,a+4,a+5)}
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));geometry.setIndex(indices);geometry.computeVertexNormals();
  const leaf=new THREE.Mesh(geometry,leafMaterials[i%2]);leaf.name='Pointed Leaf';leaf.castShadow=true;leaf.receiveShadow=true;plant.add(leaf);
  const midrib=new THREE.Line(new THREE.BufferGeometry().setFromPoints(vein),new THREE.LineBasicMaterial({color:0xb3c779}));plant.add(midrib);
}
const pencilCup=new THREE.Group();pencilCup.name='Hollow Pencil Cup';pencilCup.position.set(-4.5,2.59,-1.25);workRoot.add(pencilCup);
const cupProfile=[[0,0],[.2,0],[.25,.46],[.21,.46],[.165,.06],[0,.06]].map(([x,y])=>new THREE.Vector2(x,y));
const cupShell=new THREE.Mesh(new THREE.LatheGeometry(cupProfile,32),teal);cupShell.castShadow=true;cupShell.receiveShadow=true;pencilCup.add(cupShell);
const pencils=[];
for(let i=0;i<4;i++){
 const base=new THREE.Vector3(i%2?.07:-.07,.065,i<2?-.07:.07),length=.85+i*.035;
 const direction=new THREE.Vector3(i%2?.045:-.045,1,i<2?-.025:.025).normalize();
 const pen=new THREE.Group();pen.position.copy(base);pen.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction);pencilCup.add(pen);
 cylinder(.027,.027,length-.1,i%2?yellow:tealDark,0,(length-.1)/2,0,pen,6);
 cylinder(0,.028,.1,woodLight,0,length-.05,0,pen,6);cylinder(0,.009,.035,dark,0,length-.0175,0,pen,6);
 pencils.push({base:base.toArray(),direction:direction.toArray(),length,radius:.028});
}

const extensions=new THREE.Group();workRoot.add(extensions);
// Furniture never grows with the selected ruler. Only stock geometry changes.
plant.scale.setScalar(12);plant.position.set(-80,68,-25);
pencilCup.scale.setScalar(8);pencilCup.position.set(-60,68,-25);
let currentLayout=workshopLayout();
function configureSpan(length){
 currentLayout=workshopLayout(length);return currentLayout;
}

const cameraObstacles=[benchTop,...benchLegs,stockBed,sawBase,sawPost,sawArm,bladeGroup,guard,plant,pencilCup,receivingTray];
const focusObjects=()=>({cut:[benchTop,stockBed,sawBase,sawPost,sawArm,bladeGroup,guard],tray:[receivingTray]});
const addCameraObstacle=q=>cameraObstacles.push(q);
function render(){
 scene.updateMatrixWorld(true);const point=camera.getWorldPosition(new THREE.Vector3());
 const clearance=camera.near*Math.sqrt(1+Math.tan(camera.fov*Math.PI/360)**2*(1+camera.aspect**2))+.025;
 for(const q of cameraObstacles){if(!q.visible)continue;const b=new THREE.Box3().setFromObject(q);if(b.isEmpty())continue;if(b.distanceToPoint(point)<clearance){const rise=b.max.y+clearance-point.y;camera.position.y+=rise;point.y+=rise;}}
 camera.lookAt(look.clone().add(workRoot.position));renderer.render(scene,camera);
}
function resize(){renderer.setSize(stage.clientWidth,stage.clientHeight);camera.aspect=stage.clientWidth/stage.clientHeight;camera.updateProjectionMatrix();render()}
new ResizeObserver(resize).observe(stage);
const environment=()=>{const lights=[];scene.traverse(q=>{if(q.isLight)lights.push({type:q.type,intensity:q.intensity,id:q.uuid})});return {lights,exposure:renderer.toneMappingExposure,toneMapping:renderer.toneMapping,fog:scene.fog?{near:scene.fog.near,far:scene.fog.far}:null,style:logs.visible?'logs':'timber',daylight:daylight.visible,memory:{...renderer.info.memory},wallSides:room.surfaces.filter(q=>q!==room.floor).map(q=>q.name),detailCourses:room.details.map(p=>({...p})),floorRepeat:room.floor.material.map.repeat.toArray()}};
return {THREE,scene:workRoot,camera,renderer,look,homePos,homeLook,render,resize,box,plank,line,mat,wood,woodLight,woodDark,ghost,bladeGroup,guard,STOCK,SAW_X,BOARD_Y,BOARD_Z,orbitLimits,roomBounds,roomSurfaces,sawArm,plant,clearOrbitRadius,addCameraObstacle,cameraObstacles,configureSpan,setAtmosphere,daylight,extensions,benchRise,benchTop,benchLegs,pencilCup,cupProfile,pencils,receivingTray,stagingPosition,environment,focusObjects,surfaceLabel};
}
