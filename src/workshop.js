// Adapted from the teacher-approved September 28 MeasureTwice source.
// Archive SHA-256 dc9a6aa15a42497c54bb52d3fc6d72d5fa6a358904ff7950dd1c86d1954ad992.
import * as THREE from '../vendor/three.module.js';
import {orbitLimits as defaults,roomBounds as defaultRoom,clearOrbitRadius as clearRadius} from './view-limits.js';
import {workshopLayout} from './layout.js';
import {createWindowDaylight} from './window-daylight.js';
export function createWorkshop(stage){
const orbitLimits={...defaults},roomBounds={...defaultRoom};
const clearOrbitRadius=(focus,direction,requested)=>clearRadius(focus,direction,requested,roomBounds,orbitLimits);
let renderer;try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true})}catch(e){throw new Error('WebGL could not start. Please enable hardware acceleration or try another browser.',{cause:e})}
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;renderer.setClearColor(0x000000,0);renderer.domElement.setAttribute('aria-label','A sunny 3D woodshop with a teal saw, a movable plank, a staging stack, and a model house.');renderer.domElement.setAttribute('role','img');stage.prepend(renderer.domElement);
const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(35,1,.1,600);scene.fog=new THREE.Fog(0xe5e9d2,35,70);
const roomSurfaces=[];let geometryParent=scene;const benchRise=1.35;
const homePos=new THREE.Vector3(20,13,24),homeLook=new THREE.Vector3(6,2.4,-1),nearPos=new THREE.Vector3(0,6.4,12.3),nearLook=new THREE.Vector3(0,3.65,3.2);let look=homeLook.clone();camera.position.copy(homePos);camera.lookAt(look);
scene.add(new THREE.HemisphereLight(0xfff9df,0x829d78,2.25));const sun=new THREE.DirectionalLight(0xffefc8,3.3);sun.position.set(-12,16,-24);sun.target.position.set(-4,0,-5);scene.add(sun.target);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-13,right:13,top:11,bottom:-11,near:.5,far:35});sun.shadow.normalBias=.035;scene.add(sun);const fill=new THREE.DirectionalLight(0xd7f2e7,.7);fill.position.set(9,7,-6);scene.add(fill);
const mat=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.78,...extra});const teal=mat(0x448f7a),tealDark=mat(0x28564b),yellow=mat(0xe7b649),steel=mat(0xc4d0c8,{metalness:.5,roughness:.4}),wall=mat(0xcdaa7c),ivory=mat(0xf8eed3),dark=mat(0x36473f),ghost=mat(0x689385,{transparent:true,opacity:.14,depthWrite:false});
function woodTexture(){const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');x.fillStyle='#dfae67';x.fillRect(0,0,512,128);for(let i=0;i<18;i++){x.strokeStyle=i%3?'#b87f423b':'#f7dba764';x.lineWidth=i%4===0?2:1;x.beginPath();for(let j=0;j<=512;j+=16){const y=i*8+Math.sin(j*.018+i*3)*3;x.lineTo(j,y)}x.stroke()}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
const wood=mat(0xffffff,{map:woodTexture()}),woodDark=mat(0xbb8751),woodLight=mat(0xe7c083);const WORLD_PER_INCH=2,STOCK=6,SAW_X=-1.4,BOARD_Y=2.93,BOARD_Z=1.0;
function box(w,h,d,m,x=0,y=0,z=0,parent=geometryParent){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh}
function cylinder(rt,rb,h,m,x,y,z,parent=geometryParent,n=16){const q=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),m);q.position.set(x,y,z);q.castShadow=true;q.receiveShadow=true;parent.add(q);return q}
function line(points,color=0x456354,parent=geometryParent){const q=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p))),new THREE.LineBasicMaterial({color}));parent.add(q);return q}
function plank(len,m=wood){const g=new THREE.Group();box(len,.22,.63,m,0,0,0,g);return g}
// A roomier backdrop plus clearance-aware zoom keeps all 360 degrees usable.
// Window/tools move with the back wall; no floating wall props.
const floor=box(54,.25,48,mat(0xd6c49d),5,-.125,8);roomSurfaces.push(floor);
// Four wall sections form a real aperture behind the window.
const backLeft=box(10.6,18,.25,wall,-16.7,9,roomBounds.back),backRight=box(36.6,18,.25,wall,13.7,9,roomBounds.back);
const backBelow=box(6.8,3.5,.25,wall,-8,1.75,roomBounds.back),backAbove=box(6.8,9.1,.25,wall,-8,13.45,roomBounds.back);
const sideWall=box(.25,18,48,mat(0xc49d70),roomBounds.left,9,8);
roomSurfaces.push(backLeft,backRight,backBelow,backAbove,sideWall);
const timber=new THREE.Group(),logs=new THREE.Group();scene.add(timber,logs);logs.visible=false;
for(let y=1;y<18;y+=1.4){for(const [cx,width] of [[-16.7,10.6],[13.7,36.6]]){box(width,.035,.035,woodDark,cx,y,roomBounds.back+.15,timber);const log=cylinder(.33,.33,width,mat(y%2?0xbd9568:0xc7a175),cx,y,roomBounds.back+.03,logs,10);log.rotation.z=Math.PI/2;}}
for(const x of [-21,-12,8,30])box(.3,18,.35,woodDark,x,9,roomBounds.back+.22,timber);
const daylight=createWindowDaylight(THREE,{windowCenter:[-8,6.2,roomBounds.back+.5]});scene.add(daylight);
function setAtmosphere(style,lit){timber.visible=style!=='logs';logs.visible=style==='logs';daylight.visible=lit;sun.intensity=lit?3.3:1.4;render()}
const backdrop=new THREE.Group();backdrop.position.set(0,0,roomBounds.back+.3);scene.add(backdrop);
for(const x of [-11.6,-4.4])box(.4,6.2,.2,ivory,x,6.2,0,backdrop);for(const y of [3.3,9.1])box(7.6,.4,.2,ivory,-8,y,0,backdrop);box(6.8,5.4,.23,mat(0xadd4cf,{emissive:0x7bbfc3,emissiveIntensity:.13,transparent:true,opacity:.28}),-8,6.2,.14,backdrop);box(.18,5.4,.25,ivory,-8,6.2,.35,backdrop);box(6.8,.18,.25,ivory,-8,6.2,.35,backdrop);box(8.3,.2,.8,woodLight,-8,3.14,.3,backdrop);
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
roomSurfaces.push(...backdrop.children);
const workRoot=new THREE.Group();workRoot.name="Raised Work Surface";workRoot.position.y=benchRise;scene.add(workRoot);geometryParent=workRoot;workRoot.add(camera);
box(19,.5,4.5,wood,2.6,2.22,.1);const benchTop=box(19.05,.12,4.56,woodLight,2.6,2.52,.1);box(18.6,.48,.18,woodDark,2.6,1.83,2.28);
const benchLegs=[];for(const x of[-6.1,2.6,11.3])for(const z of[-1.7,1.9])benchLegs.push(box(.36,2+benchRise,.36,woodDark,x,1.02-benchRise/2,z));box(18,.19,.2,woodDark,2.6,.55-benchRise/2,1.88);
// Saw, with its blade plane perpendicular to the board's length.
box(2.1,.18,2.05,teal,SAW_X,2.7,.35);box(.48,1.22,.46,tealDark,SAW_X,3.28,-.39);const sawArm=box(.65,.32,1.55,teal,SAW_X,3.97,.14);
const bladeGroup=new THREE.Group();bladeGroup.position.set(SAW_X,4.03,BOARD_Z);workRoot.add(bladeGroup);const blade=cylinder(.69,.69,.065,steel,0,0,0,bladeGroup,48);blade.rotation.z=Math.PI/2;for(let i=0;i<24;i++){const a=i*Math.PI/12;const tooth=box(.073,.15,.12,steel,0,Math.cos(a)*.705,Math.sin(a)*.705,bladeGroup);tooth.rotation.x=a}const bolt=cylinder(.11,.11,.12,tealDark,0,0,0,bladeGroup);bolt.rotation.z=Math.PI/2;
const guard=new THREE.Mesh(new THREE.TorusGeometry(.73,.095,6,30,Math.PI),teal);guard.rotation.y=Math.PI/2;guard.position.copy(bladeGroup.position);workRoot.add(guard);
// Staging tray and ghost model.
const receivingTray=new THREE.Group();receivingTray.name='Receiving Tray';workRoot.add(receivingTray);
box(6.6,.12,1.6,tealDark,8.3,2.74,1.35,receivingTray);for(const x of [4.95,11.65])box(.09,.35,1.7,teal,x,2.79,1.35,receivingTray);
const stagingPosition=new THREE.Vector3(8.3,2.8,1.35);
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
let currentLayout=workshopLayout();
function configureSpan(length){
 currentLayout=workshopLayout(length);const l=currentLayout;
 for(const q of [...extensions.children]){extensions.remove(q);q.geometry?.dispose()}
 roomBounds.left=l.roomLeft;roomBounds.right=l.roomRight;roomBounds.front=l.long?32+length*2:32;floor.scale.z=(roomBounds.front-roomBounds.back)/48;floor.position.z=(roomBounds.front+roomBounds.back)/2;sideWall.scale.z=floor.scale.z;sideWall.position.z=floor.position.z;orbitLimits.maxRadius=l.long?Math.max(50,length*2.5):34;
 floor.scale.x=(l.roomRight-l.roomLeft)/54;floor.position.x=(l.roomRight+l.roomLeft)/2;
 sideWall.position.x=l.roomLeft;
 backLeft.scale.x=(-11.4-l.roomLeft)/10.6;backLeft.position.x=(l.roomLeft-11.4)/2;
 backRight.scale.x=(l.roomRight+4.6)/36.6;backRight.position.x=(l.roomRight-4.6)/2;
 scene.fog.near=l.long?length*2:35;scene.fog.far=l.long?length*4:70;
 if(l.long){
  for(const [left,right] of [[l.benchLeft,-6.925],[12.125,l.benchRight]])if(right>left){box(right-left,.12,1.4,woodLight,(left+right)/2,2.78,BOARD_Z,extensions);for(let x=left+.2;x<right;x+=4)box(.2,2.72+benchRise,.6,woodDark,x,(2.72-benchRise)/2,BOARD_Z,extensions);}
  receivingTray.visible=false;stagingPosition.fromArray(l.staging);
  box(length+.6,.12,1.2,tealDark,l.staging[0],2.74,l.staging[2],extensions);
  for(let x=l.staging[0]-length/2;x<=l.staging[0]+length/2;x+=4)box(.2,2.68+benchRise,.5,woodDark,x,(2.68-benchRise)/2,l.staging[2],extensions);
 }else{receivingTray.visible=true;stagingPosition.fromArray(l.staging)}
 return l;
}

const cameraObstacles=[benchTop,...benchLegs,sawArm,bladeGroup,guard,plant,pencilCup,receivingTray,extensions];
const addCameraObstacle=q=>cameraObstacles.push(q);
function render(){
 scene.updateMatrixWorld(true);const point=camera.getWorldPosition(new THREE.Vector3());
 const clearance=camera.near*Math.sqrt(1+Math.tan(camera.fov*Math.PI/360)**2*(1+camera.aspect**2))+.025;
 for(const q of cameraObstacles){if(!q.visible)continue;const b=new THREE.Box3().setFromObject(q);if(b.isEmpty())continue;if(b.distanceToPoint(point)<clearance){const rise=b.max.y+clearance-point.y;camera.position.y+=rise;point.y+=rise;}}
 camera.lookAt(look.clone().add(workRoot.position));renderer.render(scene,camera);
}
function resize(){renderer.setSize(stage.clientWidth,stage.clientHeight);camera.aspect=stage.clientWidth/stage.clientHeight;camera.updateProjectionMatrix();render()}
new ResizeObserver(resize).observe(stage);
return {THREE,scene:workRoot,camera,renderer,look,homePos,homeLook,nearPos,nearLook,render,resize,box,plank,line,mat,wood,woodLight,woodDark,ghost,bladeGroup,guard,STOCK,SAW_X,BOARD_Y,BOARD_Z,orbitLimits,roomBounds,roomSurfaces,sawArm,plant,clearOrbitRadius,addCameraObstacle,cameraObstacles,configureSpan,setAtmosphere,daylight,extensions,benchRise,benchTop,benchLegs,pencilCup,cupProfile,pencils,receivingTray,stagingPosition};
}
