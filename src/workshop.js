// Adapted from the teacher-approved September 28 MeasureTwice source.
// Archive SHA-256 dc9a6aa15a42497c54bb52d3fc6d72d5fa6a358904ff7950dd1c86d1954ad992.
import * as THREE from '../vendor/three.module.js';
import {orbitLimits,roomBounds,clearOrbitRadius} from './view-limits.js';
export function createWorkshop(stage){
let renderer;try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true})}catch(e){throw new Error('WebGL could not start. Please enable hardware acceleration or try another browser.',{cause:e})}
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;renderer.setClearColor(0x000000,0);renderer.domElement.setAttribute('aria-label','A sunny 3D woodshop with a teal saw, a movable plank, a staging stack, and a model house.');renderer.domElement.setAttribute('role','img');stage.prepend(renderer.domElement);
const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(35,1,.1,100);scene.fog=new THREE.Fog(0xe5e9d2,35,70);
const roomSurfaces=[];
const homePos=new THREE.Vector3(8.6,9.4,15.3),homeLook=new THREE.Vector3(-.5,2.1,0),nearPos=new THREE.Vector3(0,6.4,12.3),nearLook=new THREE.Vector3(0,3.65,3.2);let look=homeLook.clone();camera.position.copy(homePos);camera.lookAt(look);
scene.add(new THREE.HemisphereLight(0xfff9df,0x829d78,2.25));const sun=new THREE.DirectionalLight(0xffefc8,3.3);sun.position.set(-6,12,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-13,right:13,top:11,bottom:-11,near:.5,far:35});sun.shadow.normalBias=.035;scene.add(sun);const fill=new THREE.DirectionalLight(0xd7f2e7,.7);fill.position.set(9,7,-6);scene.add(fill);
const mat=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.78,...extra});const teal=mat(0x448f7a),tealDark=mat(0x28564b),yellow=mat(0xe7b649),steel=mat(0xc4d0c8,{metalness:.5,roughness:.4}),wall=mat(0xcbe8ba),ivory=mat(0xf8eed3),dark=mat(0x36473f),ghost=mat(0x689385,{transparent:true,opacity:.14,depthWrite:false});
function woodTexture(){const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');x.fillStyle='#dfae67';x.fillRect(0,0,512,128);for(let i=0;i<18;i++){x.strokeStyle=i%3?'#b87f423b':'#f7dba764';x.lineWidth=i%4===0?2:1;x.beginPath();for(let j=0;j<=512;j+=16){const y=i*8+Math.sin(j*.018+i*3)*3;x.lineTo(j,y)}x.stroke()}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
const wood=mat(0xffffff,{map:woodTexture()}),woodDark=mat(0xbb8751),woodLight=mat(0xe7c083);const WORLD_PER_INCH=2,STOCK=6,SAW_X=-1.4,BOARD_Y=2.93,BOARD_Z=1.0;
function box(w,h,d,m,x=0,y=0,z=0,parent=scene){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh}
function cylinder(rt,rb,h,m,x,y,z,parent=scene,n=16){const q=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),m);q.position.set(x,y,z);q.castShadow=true;q.receiveShadow=true;parent.add(q);return q}
function line(points,color=0x456354,parent=scene){const q=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p))),new THREE.LineBasicMaterial({color}));parent.add(q);return q}
function plank(len,m=wood){const g=new THREE.Group();box(len,.22,.63,m,0,0,0,g);return g}
// A roomier backdrop plus clearance-aware zoom keeps all 360 degrees usable.
// Window/tools move with the back wall; no floating wall props.
roomSurfaces.push(box(54,.25,48,mat(0xd2dbb5),5,-.125,8));
roomSurfaces.push(box(54,18,.25,wall,5,9,roomBounds.back));
roomSurfaces.push(box(.25,18,48,mat(0xc9d8af),roomBounds.left,9,8));
box(54,.3,.35,ivory,5,.3,roomBounds.back+.22);
const backdrop=new THREE.Group();backdrop.position.set(0,0,roomBounds.back+.3);scene.add(backdrop);
box(7.6,6.2,.2,ivory,-8,6.2,0,backdrop);box(6.8,5.4,.23,mat(0xadd4cf,{emissive:0x7bbfc3,emissiveIntensity:.13}),-8,6.2,.14,backdrop);box(.18,5.4,.25,ivory,-8,6.2,.35,backdrop);box(6.8,.18,.25,ivory,-8,6.2,.35,backdrop);box(8.3,.2,.8,woodLight,-8,3.14,.3,backdrop);
box(6.8,4.2,.15,woodDark,3,6.2,0,backdrop);
for(let i=0;i<7;i++)for(let j=0;j<4;j++)cylinder(.05,.05,.1,dark,.2+i*.9,4.8+j*.86,.13,backdrop,6).rotation.set(Math.PI/2,0,0);
// Tools drawn as solid models rather than labels.
for(let i=0;i<4;i++){const x=1+i*1.3;box(.22,1.6,.25,woodLight,x,6.2,.3,backdrop);box(.96,.25,.35,steel,x,7.1,.3,backdrop)}
roomSurfaces.push(...backdrop.children);
box(12.8,.5,4.5,wood,-.5,2.22,.1);box(12.85,.12,4.56,woodLight,-.5,2.52,.1);box(12.3,.48,.18,woodDark,-.5,1.83,2.28);for(const x of[-6.1,5.1])for(const z of[-1.7,1.9])box(.36,2.0,.36,woodDark,x,1.02,z);box(11.6,.19,.2,woodDark,-.5,.55,1.88);
// Saw, with its blade plane perpendicular to the board's length.
box(2.1,.18,2.05,teal,SAW_X,2.7,.35);box(.48,1.22,.46,tealDark,SAW_X,3.28,-.39);const sawArm=box(.65,.32,1.55,teal,SAW_X,3.97,.14);
const bladeGroup=new THREE.Group();bladeGroup.position.set(SAW_X,4.03,BOARD_Z);scene.add(bladeGroup);const blade=cylinder(.69,.69,.065,steel,0,0,0,bladeGroup,48);blade.rotation.z=Math.PI/2;for(let i=0;i<24;i++){const a=i*Math.PI/12;const tooth=box(.073,.15,.12,steel,0,Math.cos(a)*.705,Math.sin(a)*.705,bladeGroup);tooth.rotation.x=a}const bolt=cylinder(.11,.11,.12,tealDark,0,0,0,bladeGroup);bolt.rotation.z=Math.PI/2;
const guard=new THREE.Mesh(new THREE.TorusGeometry(.73,.095,6,30,Math.PI),teal);guard.rotation.y=Math.PI/2;guard.position.copy(bladeGroup.position);scene.add(guard);
// The former isolated yellow box was the grip, not cut wood. Its two posts
// now overlap the saw housing and grip so it reads as one connected handle.
const sawHandle=new THREE.Group();sawHandle.name='Supported Saw Handle';scene.add(sawHandle);
for(const z of [.27,.83])box(.12,.49,.12,tealDark,SAW_X+.23,4.365,z,sawHandle);
box(.18,.15,.82,yellow,SAW_X+.23,4.65,.55,sawHandle);
// Staging tray and ghost model.
box(2.6,.12,1.28,tealDark,3.9,2.63,1.1);box(.09,.35,1.4,teal,5.23,2.79,1.1);box(.09,.35,1.4,teal,2.57,2.79,1.1);
// Plant and tool cup establish a cheerful workshop without crowding the measuring station.
const plant=new THREE.Group();plant.name='Leafy Workshop Plant';plant.position.set(-6,2.66,-1.34);scene.add(plant);
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
cylinder(.24,.2,.45,teal,-3.0,2.92,-1.5);for(let i=0;i<4;i++){const pen=box(.055,.95,.055,i%2?yellow:tealDark,-3+(i-1.5)*.09,3.42,-1.5);pen.rotation.z=(i-1.5)*.13}

function render(){camera.lookAt(look);renderer.render(scene,camera)}
function resize(){renderer.setSize(stage.clientWidth,stage.clientHeight);camera.aspect=stage.clientWidth/stage.clientHeight;camera.updateProjectionMatrix();render()}
new ResizeObserver(resize).observe(stage);
return {THREE,scene,camera,renderer,look,homePos,homeLook,nearPos,nearLook,render,resize,box,plank,line,mat,wood,woodLight,woodDark,ghost,bladeGroup,guard,STOCK,SAW_X,BOARD_Y,BOARD_Z,orbitLimits,roomBounds,roomSurfaces,sawHandle,sawArm,plant,clearOrbitRadius};
}
