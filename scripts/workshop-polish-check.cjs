const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const build=JSON.parse(fs.readFileSync('latest-review.json')),root=build.directory,out=path.join('test-results',build.id),port=18479,base='http://127.0.0.1:'+port;
 fs.mkdirSync(out,{recursive:true});
 const report={id:build.id,sourceRevision:build.sourceRevision,checks:[],environments:[],orbit:[],errors:[],externalRequests:[],physicalDeviceTest:false};
 const server=http.createServer((req,res)=>{let f=path.resolve(root,'.'+new URL(req.url,base).pathname);if(f!==root&&!f.startsWith(root+path.sep)){res.writeHead(403).end();return}if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');if(!fs.existsSync(f)){res.writeHead(404).end();return}res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml'})[path.extname(f)]||'application/json');fs.createReadStream(f).pipe(res)});
 await new Promise(r=>server.listen(port,'127.0.0.1',r));let browser,page;
 try{
  browser=await chromium.launch({executablePath:process.env.MT_BROWSER,headless:true,args:['--enable-unsafe-swiftshader']});page=await browser.newPage({viewport:{width:1920,height:1080}});
  page.on('pageerror',e=>report.errors.push(e.message));await page.route('**/*',r=>r.request().url().startsWith(base)||r.request().url().startsWith('data:')?r.continue():(report.externalRequests.push(r.request().url()),r.abort()));
  await page.goto(base);await page.waitForFunction(()=>window.mtReview?.ready);await page.check('#reduced');
  const environment=()=>page.evaluate(()=>mtReview.environment()),state=()=>page.evaluate(()=>mtReview.orbitState());
  const lights=(await environment()).lights,counts={};
  // Warm lazy GPU uploads before comparing two complete instrument cycles.
  for(let pass=0;pass<3;pass++)for(const id of ['inch-3','inch-6','inch-12','yardstick','cm-15','cm-30','metre']){
   await page.click('#instruments');await page.selectOption('#instrument-choice',id);await page.click('#begin-instrument');
   assert.equal(await page.locator('#view-focus').inputValue(),'cut');assert.equal((await page.evaluate(()=>mtReview.focusState())).choice,'cut');
   if(pass===1)await page.screenshot({path:path.join(out,'workshop-'+id+'-cut-focus.png')});
   await page.click('#home');
   for(const style of ['logs','timber']){
    await page.selectOption('#room-style',style);
    const env=await environment(),key=id+'-'+style;
    assert.deepEqual(env.lights,lights,'Instrument changes do not create or brighten lights');assert.equal(env.exposure,1.12);assert.equal(env.toneMapping,4);assert.equal(env.fog,null);
    assert.deepEqual(new Set(env.wallSides),new Set(['back Wall','front Wall','left Wall','right Wall']));
    const rear=env.detailCourses.filter(p=>p.side==='back');assert.ok(rear.some(p=>p.y<90&&p.start<-114&&p.end>-46));assert.ok(rear.some(p=>p.y>144&&p.start<-114&&p.end>-46));
    if(pass===1)counts[key]=env.memory;else if(pass===2)assert.deepEqual(env.memory,counts[key],'Changing instruments disposes replaced room geometry: '+key);
    report.environments.push({pass,id,style,lights:env.lights.length,exposure:env.exposure,fog:env.fog,memory:env.memory,floorRepeat:env.floorRepeat});
    if(pass===1&&['inch-3','inch-6','metre'].includes(id))await page.screenshot({path:path.join(out,'workshop-'+key+'.png')});
   }
  }
  await page.uncheck('#daylight');let env=await environment();assert.equal(env.lights.find(l=>l.type==='DirectionalLight'&&l.intensity!==.7).intensity,1.4);assert.equal(env.exposure,1.12);await page.check('#daylight');assert.deepEqual((await environment()).lights,lights);
  report.checks.push('Two Choose Instrument Cycles Across All Seven Spans And Both Room Styles; Stable Light Instances, Exposure And GPU Resource Counts; No Distance Fog; Four Walls; Detail Above And Below Window; Daylight Toggle');
  await page.evaluate(()=>mtReview.changeInstrument('inch-3'));await page.click('#home');
  const directions=await page.evaluate(()=>{const out=[];for(let n=0;n<24;n++){mtReview.orbit(Math.PI/12);out.push({angle:(n+1)*Math.PI/12,...mtReview.orbitState()})}return out});
  const clearAngle=directions.reduce((a,b)=>a.effective>b.effective?a:b).angle,blockedAngle=directions.reduce((a,b)=>a.effective<b.effective?a:b).angle;
  const obstacleTurn=blockedAngle-clearAngle;
  await page.click('#home');await page.evaluate(a=>mtReview.orbit(a),clearAngle);await page.uncheck('#reduced');
  const home=await state();report.orbit.push({step:'home',...home});
  await page.evaluate(a=>mtReview.orbit(a),obstacleTurn);const blocked=await state();assert.ok(blocked.effective<home.preferred-2);assert.equal(blocked.preferred,home.preferred);report.orbit.push({step:'blocked',...blocked});
  await page.evaluate(a=>mtReview.orbit(-a),obstacleTurn);const beginning=await state();assert.equal(beginning.preferred,home.preferred);assert.ok(beginning.recovering);assert.ok(beginning.effective<home.preferred-.1);
  const samples=await page.evaluate(async()=>{const out=[];for(let n=0;n<12;n++){await new Promise(requestAnimationFrame);out.push(mtReview.orbitState())}return out});
  for(let n=1;n<samples.length;n++)assert.ok(samples[n].effective>=samples[n-1].effective-1e-8);assert.ok(samples.some(s=>s.effective>blocked.effective+.1));report.orbit.push({step:'recovery-frames',samples});
  await page.waitForFunction(()=>!mtReview.orbitState().recovering);assert.ok(Math.abs((await state()).effective-home.preferred)<.01);
  await page.evaluate(a=>{mtReview.orbit(a);mtReview.orbit(0,0,.8)},obstacleTurn);const zoomed=await state();assert.ok(Math.abs(zoomed.preferred-home.preferred*.8)<1e-8);report.orbit.push({step:'zoom-while-blocked',...zoomed});
  await page.evaluate(a=>mtReview.orbit(-a),obstacleTurn);await page.waitForFunction(()=>!mtReview.orbitState().recovering);assert.ok(Math.abs((await state()).effective-zoomed.preferred)<.01);
  await page.check('#reduced');await page.click('#home');await page.evaluate(([clear,turn])=>{mtReview.orbit(clear);mtReview.orbit(turn);mtReview.orbit(-turn)},[clearAngle,obstacleTurn]);assert.ok(Math.abs((await state()).effective-home.preferred)<.01);assert.equal((await state()).recovering,false);
  await page.evaluate(()=>mtReview.orbit(0,0,100));assert.equal((await state()).preferred,(await page.evaluate(()=>mtReview.view())).limits.maxRadius);
  await page.evaluate(()=>mtReview.orbit(0,0,.0001));assert.equal((await state()).preferred,(await page.evaluate(()=>mtReview.view())).limits.minRadius);
  await page.uncheck('#reduced');await page.click('#home');await page.evaluate(()=>{mtReview.orbit(Math.PI);mtReview.orbit(-Math.PI);mtReview.select(16);mtReview.cut();mtReview.skip()});assert.equal((await state()).recovering,false);assert.equal(await page.evaluate(()=>mtReview.snapshot().phase),'inspecting');
  const inspection=await page.evaluate(()=>mtReview.camera());await page.evaluate(async()=>{for(let n=0;n<4;n++)await new Promise(requestAnimationFrame)});assert.deepEqual(await page.evaluate(()=>mtReview.camera()),inspection);await page.check('#reduced');await page.click('#ack');
  report.checks.push('Collision Shrinks Only Effective Radius; Smooth Monotonic Recovery To Preferred Zoom; Manual Zoom While Blocked; Bounds; Reduced Motion; Cutting Cancels Recovery And Holds Inspection');
  const hitPoint=kind=>page.evaluate(kind=>{const canvas=document.querySelector('canvas'),b=canvas.getBoundingClientRect(),dock=document.getElementById('dock').getBoundingClientRect();for(let y=b.top+30;y<dock.top-10;y+=10)for(let x=280;x<b.right-20;x+=10)if(document.elementFromPoint(x,y)===canvas&&mtReview.focusHit(x,y)===kind)return {x,y};return null},kind);
  for(const kind of ['cut','tray','build']){
   await page.click('#home');const p=await hitPoint(kind);assert.ok(p,'Visible clickable '+kind);await page.mouse.move(p.x,p.y);assert.match(await page.locator('#object-cue').textContent(),/Click To Focus/);await page.mouse.click(p.x,p.y);
   assert.equal((await page.evaluate(()=>mtReview.focusState())).choice,kind);assert.equal(await page.locator('#view-focus').inputValue(),kind);assert.equal((await page.evaluate(()=>mtReview.focusState())).moving,false);
   await page.evaluate(()=>mtReview.orbit(.2,0,.9));const freely=await page.evaluate(()=>mtReview.camera());await page.evaluate(async()=>{for(let n=0;n<4;n++)await new Promise(requestAnimationFrame)});assert.deepEqual(await page.evaluate(()=>mtReview.camera()),freely);
  }
  await page.click('#home');const dragPoint=await hitPoint('tray');await page.mouse.move(dragPoint.x,dragPoint.y);await page.mouse.down();for(let n=1;n<=12;n++)await page.mouse.move(dragPoint.x+n,dragPoint.y);await page.mouse.up();assert.equal((await page.evaluate(()=>mtReview.focusState())).choice,'workshop','Small incremental drag must not become a click');
  await page.click('#home');await page.uncheck('#reduced');const smoothPoint=await hitPoint('cut');const from=await page.evaluate(()=>mtReview.camera());await page.mouse.click(smoothPoint.x,smoothPoint.y);assert.equal((await page.evaluate(()=>mtReview.focusState())).moving,true);await page.waitForFunction(()=>!mtReview.focusState().moving);assert.notDeepEqual(await page.evaluate(()=>mtReview.camera()),from);
  await page.selectOption('#view-focus','tray');await page.evaluate(()=>mtReview.orbit(.1));assert.equal((await page.evaluate(()=>mtReview.focusState())).moving,false,'Orbit takes ownership of camera during focus transition');
  await page.check('#reduced');await page.selectOption('#view-focus','cut');const pointer=await page.evaluate(()=>mtReview.pointerScreen()),cam=await page.evaluate(()=>mtReview.camera()),beforeSelected=await page.evaluate(()=>mtReview.snapshot().selected);await page.mouse.move(pointer.x,pointer.y);assert.match(await page.locator('#object-cue').textContent(),/Drag Cut Pointer/);await page.mouse.down();await page.mouse.move(pointer.x+80,pointer.y,{steps:8});await page.mouse.up();assert.notEqual(await page.evaluate(()=>mtReview.snapshot().selected),beforeSelected);assert.deepEqual(await page.evaluate(()=>mtReview.camera()),cam);assert.equal(await page.locator('#view-focus').inputValue(),'cut');
  await page.selectOption('#view-focus','cut');const piecePoint=await hitPoint('piece');assert.ok(piecePoint);await page.mouse.click(piecePoint.x,piecePoint.y);assert.equal(await page.locator('#view-focus').inputValue(),'cut');assert.match(await page.locator('#object-cue').textContent(),/Selected/);
  await page.click('[data-mode="challenge"]');await page.click('[data-recipe="house"]');await page.evaluate(()=>{mtReview.select(mtReview.plan().steps[0].length);mtReview.cut();mtReview.skip();mtReview.acknowledge();mtReview.skip()});
  await page.selectOption('#view-focus','build');const modelPoint=await page.evaluate(async()=>{const THREE=await import('/vendor/three.module.js'),v=mtReview.view(),p=mtReview.geometry()[0].position;const c=new THREE.PerspectiveCamera(35,v.aspect,v.near,600);c.position.fromArray(v.camera);c.lookAt(new THREE.Vector3(...v.look));c.updateMatrixWorld();const point=new THREE.Vector3(p[0],p[1]+v.benchRise,p[2]).project(c),b=document.querySelector('canvas').getBoundingClientRect();return {x:b.left+(point.x+1)*b.width/2,y:b.top+(1-point.y)*b.height/2}});assert.equal(await page.evaluate(p=>mtReview.focusHit(p.x,p.y),modelPoint),'build');await page.mouse.click(modelPoint.x,modelPoint.y);assert.equal(await page.locator('#view-focus').inputValue(),'build');
  await page.click('[data-mode="free"]');
  for(const size of [{width:1366,height:768},{width:1024,height:600}]){
   await page.setViewportSize(size);await page.waitForFunction(()=>{const b=document.querySelector('canvas').getBoundingClientRect();return Math.abs(mtReview.view().aspect-b.width/b.height)<1e-9});
   await page.click('#instruments');await page.selectOption('#instrument-choice','inch-3');await page.click('#begin-instrument');
   const pointer=await page.evaluate(()=>mtReview.pointerScreen());assert.equal(await page.evaluate(p=>document.elementFromPoint(p.x,p.y)?.tagName,pointer),'CANVAS','Cut pointer reachable at '+size.width);
   for(const kind of ['cut','tray','build']){await page.click('#home');const p=await hitPoint(kind);assert.ok(p,kind+' visible at '+size.width);await page.mouse.click(p.x,p.y);assert.equal(await page.locator('#view-focus').inputValue(),kind)}
   await page.screenshot({path:path.join(out,'workshop-focus-laptop-'+size.width+'.png')});
  }
  await page.setViewportSize({width:1920,height:1080});
  report.checks.push('Workspace Switch Frames The Cutting Bench; Saw, Tray, Build Table And Model Click Focus Synchronize Dropdown; Cumulative Drag Threshold; Pointer And Existing Piece Click Priority; Hover Labels; Smooth/Reduced Motion; Free Orbit Cancels Focus Transition');
  report.checks.push('Cut Pointer And All Three Click Targets Reachable At 1366x768 And 1024x600');
  await page.evaluate(()=>mtReview.changeInstrument('inch-6'));await page.click('#home');await page.evaluate(()=>mtReview.orbit(0,0,2));await page.screenshot({path:path.join(out,'workshop-inch-6-zoom-out.png')});
  await page.evaluate(()=>mtReview.changeInstrument('inch-3'));await page.click('#home');
  for(const [name,angle] of [['back',0],['left',Math.PI/2],['front',Math.PI],['right',Math.PI*1.5]]){await page.click('#home');await page.evaluate(a=>mtReview.orbit(a),angle);await page.screenshot({path:path.join(out,'workshop-wall-'+name+'.png')})}
  assert.equal(await page.locator('#build-id').getAttribute('data-full-id'),build.id);assert.deepEqual(report.errors,[]);assert.deepEqual(report.externalRequests,[]);
 }catch(e){report.failure=e.stack;await page?.screenshot({path:path.join(out,'workshop-failure.png')}).catch(()=>{});throw e}
 finally{fs.writeFileSync(path.join(out,'workshop-polish-verification.json'),JSON.stringify(report,null,2));await browser?.close();await new Promise(r=>server.close(r));console.log(JSON.stringify(report));}
})().catch(e=>{console.error(e);process.exitCode=1});
