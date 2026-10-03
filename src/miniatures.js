// Thumbnails use each recipe's actual constant-profile parts and endpoints.
export function createMiniatures(THREE,recipes){
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setSize(240,170);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;
  const material=new THREE.MeshStandardMaterial({color:0xc4944c,roughness:.75}),images={};
  for(const recipe of recipes){
    const scene=new THREE.Scene(),model=new THREE.Group();scene.add(model,new THREE.HemisphereLight(0xfff6cf,0x657260,2));const sun=new THREE.DirectionalLight(0xffffff,3);sun.position.set(-4,9,7);scene.add(sun);
    for(const st of recipe.steps)for(const part of st.placements){const a=new THREE.Vector3(...part.from).multiplyScalar(1/8),b=new THREE.Vector3(...part.to).multiplyScalar(1/8),mesh=new THREE.Mesh(new THREE.BoxGeometry(st.length/8,.22,.63),material);mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(1,0,0),b.sub(a).normalize());mesh.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),part.roll??0));model.add(mesh);}
    const bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3());model.position.sub(bounds.getCenter(new THREE.Vector3()));
    const camera=new THREE.PerspectiveCamera(35,240/170,.1,100),radius=size.length()*.5,distance=radius/Math.sin(35*Math.PI/360)*1.12;camera.position.set(1,.7,1.25).normalize().multiplyScalar(distance);camera.lookAt(0,0,0);renderer.render(scene,camera);images[recipe.id]=renderer.domElement.toDataURL('image/png');model.traverse(o=>o.geometry?.dispose());
  }
  material.dispose();renderer.dispose();renderer.forceContextLoss();return images;
}
