const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const report=JSON.parse(fs.readFileSync('latest-review.json')),root=report.directory,evidence=path.join('test-results',report.id);
 fs.mkdirSync(evidence,{recursive:true});
 const port=18453,base=`http://127.0.0.1:${port}`;
 const server=http.createServer((req,res)=>{let file=path.resolve(root,'.'+new URL(req.url,base).pathname);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.writeHead(404).end();return}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/json');fs.createReadStream(file).pipe(res)});
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve)});let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.MT_BROWSER||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[],badRequests=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>{if(!route.request().url().startsWith(base+'/')){badRequests.push(route.request().url());return route.abort()}return route.continue()});
  page.on('response',r=>{if(r.status()>=400)badRequests.push(r.url())});
  await page.goto(base);await page.waitForFunction(()=>window.mtReview?.view&&window.mtReview?.chooseCheck);
  assert.equal(await page.locator('#build-id').textContent(),report.id);
  await page.screenshot({path:path.join(evidence,'workshop-home.png')});
  await page.evaluate(()=>mtReview.orbit(-.28,.12,.72));
  await page.screenshot({path:path.join(evidence,'workshop-close.png')});
  const view=await page.evaluate(()=>mtReview.view());
  fs.writeFileSync(path.join(evidence,'visual-preview.json'),JSON.stringify({id:report.id,view,errors,badRequests},null,2));
  if(process.argv.includes('--preview')){console.log(JSON.stringify({id:report.id,evidence,errors,badRequests}));return}
  const snap=()=>page.evaluate(()=>mtReview.snapshot()),visual=()=>page.evaluate(()=>mtReview.view());
  const intersects=(a,b)=>a.min.every((n,i)=>n<=b.max[i]&&a.max[i]>=b.min[i]);
  function supported(v){assert.equal(v.handle.length,3);for(const post of v.handle.slice(0,2)){assert.ok(intersects(post,v.handle[2]),'Grip intersects its post');assert.ok(intersects(post,v.handleMount),'Post intersects saw housing')}}
  supported(view);assert.equal(view.leaves.length,7);assert.equal(view.piece,null);assert.equal(view.offcut,null);assert.equal(view.stock.visible,true);
  const checks=['Supported Grip at Rest','Seven Pointed Leaves','No Cut Piece Before Commitment'];
  assert.ok(Math.abs(view.benchTop.max[1]-3.93)<1e-6);
  for(const leg of view.benchLegs)assert.ok(Math.abs(leg.min[1]-.02)<1e-6,'Raised bench legs remain seated on floor');
  const cup=view.pencilCup;assert.ok(cup.profile.some(p=>p[0]===.21&&p[1]===.46),'Cup has an inner lip');
  for(let y=.065;y<=.46;y+=.01){const points=cup.pencils.map(p=>{const t=(y-p.base[1])/p.direction[1];return {x:p.base[0]+t*p.direction[0],z:p.base[2]+t*p.direction[2],r:p.radius}});for(let i=0;i<points.length;i++){const p=points[i],inner=.165+(y-.06)/.4*.045;assert.ok(Math.hypot(p.x,p.z)+p.r<inner,'Pencil clears inner cup wall');for(let j=0;j<i;j++)assert.ok(Math.hypot(p.x-points[j].x,p.z-points[j].z)>p.r+points[j].r,'Pencils do not intersect')}}
  await page.check('#reduced');
  for(const n of [1,16,47,48]){await page.evaluate(n=>mtReview.select(n),n);let v=await visual();assert.ok(v.stock.bounds.max[0]<v.receivingTray.min[0]);await page.evaluate(()=>mtReview.cut());v=await visual();if(v.offcut)assert.ok(v.offcut.bounds.max[0]<v.receivingTray.min[0]);await page.evaluate(()=>mtReview.restart())}
  await page.uncheck('#reduced');await page.reload();await page.waitForFunction(()=>window.mtReview?.view&&window.mtReview?.chooseCheck);
  checks.push('Hollow Cup and Four Seated Nonintersecting Pencils','Raised Bench With Grounded Legs','Minimum and Maximum Stock/Offcut Clear Receiving Tray');
  await page.click('#home');
  await page.evaluate(()=>{mtReview.select(18);mtReview.cut();mtReview.cut()});
  await page.waitForTimeout(300);assert.equal((await snap()).phase,'cutting');supported(await visual());assert.equal((await visual()).stock.visible,true);
  await page.waitForFunction(()=>mtReview.snapshot().phase==='approaching');let v=await visual();assert.equal(v.piece.length,18/8);assert.equal(v.offcut.length,30/8);assert.equal(v.piece.visible,true);supported(v);
  await page.waitForFunction(()=>mtReview.snapshot().phase==='inspecting');assert.equal((await snap()).attempts.length,1);assert.equal((await visual()).inspection.visible,true);
  await page.screenshot({path:path.join(evidence,'inspection-short.png')});await page.waitForTimeout(350);assert.equal((await snap()).phase,'inspecting');
  await page.evaluate(()=>mtReview.acknowledge());await page.waitForFunction(()=>mtReview.snapshot().phase==='selecting');assert.equal((await snap()).parts.length,0);assert.equal((await visual()).piece,null);
  // Correct full animation retains its original and visibly duplicates it.
  await page.evaluate(()=>{mtReview.select(20);mtReview.cut()});await page.waitForFunction(()=>mtReview.snapshot().phase==='inspecting');
  await page.evaluate(()=>mtReview.acknowledge());await page.waitForFunction(()=>mtReview.snapshot().phase==='duplicating');supported(await visual());
  assert.equal((await page.evaluate(()=>mtReview.geometry())).length,8);for(const part of await page.evaluate(()=>mtReview.geometry())){const v=await visual();assert.ok(part.position[0]-part.meshLength/2>v.receivingTray.min[0]);assert.ok(part.position[0]+part.meshLength/2<v.receivingTray.max[0])}await page.waitForFunction(()=>mtReview.snapshot().phase==='assembling');await page.waitForFunction(()=>mtReview.snapshot().phase==='selecting');
  await page.check('#reduced');await page.evaluate(()=>{for(const length of [32,16]){mtReview.select(length);mtReview.cut();mtReview.acknowledge();mtReview.acknowledge()}});
  let s=await snap();assert.equal(s.parts.length,17);assert.equal(s.attempts.length,4);assert.equal(s.phase,'complete');
  for(const p of await page.evaluate(()=>mtReview.geometry())){assert.equal(p.meshLength,p.length/8);assert.deepEqual(p.scale,[1,1,1])}
  await page.screenshot({path:path.join(evidence,'house-complete.png')});checks.push('Full Wrong Cut and Held Inspection','Exact Retained and Offcut Lengths','Full Correct Cut and Visible Duplication','17 Exact House Parts','Reduced Motion and Duplicate Acknowledgement');
  let cameraSamples=0,minWallClearance=Infinity;const cameraContexts=[];
  async function sweep(label){
    const result=await page.evaluate(()=>{
      const out=[],initial=mtReview.view(),dx=initial.camera[0]-initial.look[0],dy=initial.camera[1]-initial.look[1],dz=initial.camera[2]-initial.look[2];
      const r=Math.hypot(dx,dy,dz);mtReview.orbit(-Math.atan2(dx,dz),.2-Math.acos(dy/r),1);
      for(const radius of [4,27])for(const phi of [.2,.85,1.5]){
        let v=mtReview.view(),offset=v.camera.map((n,i)=>n-v.look[i]),current=Math.hypot(...offset);
        mtReview.orbit(0,phi-Math.acos(offset[1]/current),radius/current);
        for(let angle=0;angle<24;angle++){v=mtReview.view();current=Math.hypot(...v.camera.map((n,i)=>n-v.look[i]));mtReview.orbit(Math.PI/12,0,radius/current);v=mtReview.view();out.push({camera:v.camera,look:v.look,near:v.near,aspect:v.aspect,walls:v.walls})}
      }
      return out;
    });
    for(const sample of result){
      // Camera/near-plane sphere must never touch any actual wall or floor box.
      const margin=sample.near*Math.sqrt(1+(Math.tan(35*Math.PI/360)**2)*(1+sample.aspect**2));
      for(const box of sample.walls){const distance=Math.hypot(...sample.camera.map((n,i)=>Math.max(box.min[i]-n,0,n-box.max[i])));assert.ok(distance>margin,`${label}: room clipping`);minWallClearance=Math.min(minWallClearance,distance-margin)}
      cameraSamples++;
    }
    cameraContexts.push(label);
  }
  for(const viewport of [{width:1920,height:1080},{width:1366,height:768},{width:1024,height:768}]){
    await page.setViewportSize(viewport);await page.click('#home');await sweep(`house-${viewport.width}x${viewport.height}`);
    await page.click('#home');await page.evaluate(()=>mtReview.orbit(Math.PI,0,1.3));await page.screenshot({path:path.join(evidence,`room-rear-${viewport.width}.png`)});
  }
  await page.setViewportSize({width:1366,height:768});await page.evaluate(()=>{mtReview.restart();mtReview.select(22);mtReview.cut()});assert.equal((await snap()).pending.actual,22);assert.equal((await snap()).pending.correct,false);
  await sweep('long-inspection');await page.click('#home');assert.equal((await snap()).phase,'inspecting');assert.equal(await page.locator('#ack').isVisible(),true);
  await page.evaluate(()=>mtReview.mode('free'));await page.evaluate(()=>mtReview.mode('challenge'));assert.equal((await snap()).phase,'inspecting');assert.equal((await snap()).pending.actual,22);
  await page.uncheck('#reduced');await page.evaluate(()=>{mtReview.restart();mtReview.select(7);mtReview.cut();mtReview.skip()});assert.equal((await snap()).phase,'inspecting');assert.equal((await snap()).pending.actual,7);
  await page.evaluate(()=>{mtReview.restart();mtReview.select(19);mtReview.cut();mtReview.mode('learn');mtReview.mode('challenge')});assert.equal((await snap()).phase,'inspecting');assert.equal((await snap()).pending.actual,19);
  await page.evaluate(()=>mtReview.restart());assert.equal((await snap()).phase,'selecting');v=await visual();assert.equal(v.piece,null);assert.equal(v.offcut,null);assert.equal(v.inspection,null);assert.equal(v.stock.visible,true);supported(v);
  await page.check('#reduced');await page.evaluate(()=>{mtReview.mode('free');for(const length of [7,26,48,16,20,12,32]){mtReview.select(length);mtReview.cut();mtReview.acknowledge()}});assert.equal((await snap()).parts.length,7);
  await page.locator('#piece-list button').first().click();await sweep('retained-free-piece');await page.click('#home');await page.screenshot({path:path.join(evidence,'free-comparison.png')});
  checks.push('Full Allowed 360-Degree Orbit, Polar Limits and Zoom Extremes','1920x1080, 1366x768 and 1024x768','Inspection and Free-Piece Focus Camera Ranges','Skip and Mid-Cut Mode Switching','Reset Removes Only Transient Pieces','Retained Free Play Comparisons');
  await page.evaluate(()=>{mtReview.mode('challenge');mtReview.restart()});await page.setViewportSize({width:1366,height:768});await page.screenshot({path:path.join(evidence,'workshop-laptop.png')});
  assert.deepEqual(errors,[]);assert.deepEqual(badRequests,[]);
  const result={id:report.id,sourceRevision:report.sourceRevision,checks,cameraSamples,cameraContexts,minWallClearance,errors,badRequests};
  fs.writeFileSync(path.join(evidence,'visual-verification.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
})().catch(error=>{console.error(error);process.exitCode=1});
