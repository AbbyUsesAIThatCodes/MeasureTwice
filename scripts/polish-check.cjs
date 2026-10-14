const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const build=JSON.parse(fs.readFileSync('latest-review.json')),root=build.directory,out=path.join('test-results',build.id),port=18480,base='http://127.0.0.1:'+port;
 fs.mkdirSync(out,{recursive:true});
 const report={id:build.id,sourceRevision:build.sourceRevision,checks:[],layouts:[],errors:[],externalRequests:[],physicalChromebookTest:false};
 const server=http.createServer((req,res)=>{
  let file=path.resolve(root,'.'+new URL(req.url,base).pathname);
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)){res.writeHead(404).end();return}
  res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml'})[path.extname(file)]||'application/json');
  fs.createReadStream(file).pipe(res);
 });
 await new Promise(resolve=>server.listen(port,'127.0.0.1',resolve));let browser,page;
 try{
  browser=await chromium.launch({executablePath:process.env.MT_BROWSER,headless:true,args:['--enable-unsafe-swiftshader']});
  page=await browser.newPage({viewport:{width:1366,height:768}});
  page.on('pageerror',e=>report.errors.push(e.message));
  await page.route('**/*',r=>r.request().url().startsWith(base)||r.request().url().startsWith('data:')?r.continue():(report.externalRequests.push(r.request().url()),r.abort()));
  const snap=()=>page.evaluate(()=>mtReview.snapshot());
  await page.goto(base);await page.waitForFunction(()=>window.mtReview?.ready);
  assert.equal(await page.locator('#build-id').getAttribute('data-full-id'),build.id);
  assert.equal(JSON.parse(fs.readFileSync(path.join(root,'BUILD_REPORT.json'))).id,build.id);
  assert.equal(path.basename(root),build.id);
  const manifestBefore=fs.readFileSync(path.join(root,'build-manifest.json'),'utf8');
  for(const size of [{width:1366,height:768},{width:1280,height:600},{width:1024,height:768},{width:1024,height:600},{width:900,height:600}]){
   await page.setViewportSize(size);
   for(const mode of ['free','learn','challenge']){
    await page.click('[data-mode="'+mode+'"]');
    if(await page.locator('#panel').evaluate(e=>e.open))await page.click('#close-panel');
    await page.waitForFunction(()=>{
     const dock=document.getElementById('dock').getBoundingClientRect(),order=document.getElementById('order').getBoundingClientRect(),camera=document.querySelector('.camera-controls').getBoundingClientRect();
     return dock.top-order.bottom>=11&&dock.top-camera.bottom>=11;
    });
    const layout=await page.evaluate(()=>{const rect=id=>document.getElementById(id).getBoundingClientRect();return {orderGap:rect('dock').top-rect('order').bottom,cameraGap:rect('dock').top-document.querySelector('.camera-controls').getBoundingClientRect().bottom,bodyOverflow:document.body.scrollWidth-innerWidth}});
    assert.ok(layout.bodyOverflow<=1);
    report.layouts.push({size,mode,...layout});
    if(mode==='learn'){
     // Tab/focus must reveal the last control inside the existing scrollable card.
     await page.locator('#practices').focus();
     assert.equal(await page.locator('#practices').evaluate(e=>{const r=e.getBoundingClientRect(),p=document.getElementById('order').getBoundingClientRect();return r.top>=p.top&&r.bottom<=p.bottom}),true);
     await page.locator('#order').evaluate(e=>e.scrollTop=0);
    }
    await page.screenshot({path:path.join(out,`polish-${mode}-${size.width}x${size.height}.png`)});
   }
  }
  report.checks.push('Lesson Card And Camera Clearance At Five Laptop/Zoom Viewports','Keyboard Access To Scrolled Lesson Controls');
  assert.match(await page.locator('#scale-help').textContent(),/Choose a build/);
  await page.setViewportSize({width:1366,height:768});await page.click('[data-mode="free"]');await page.check('#reduced');
  for(const n of [0,1,16,32,48]){
   const box=await page.locator('#ruler').boundingBox();
   await page.mouse.click(box.x+24+n/48*(box.width-48),box.y+30);
   assert.equal((await snap()).selected,n);assert.equal((await snap()).attempts.length,0);
   const clear=await page.locator('#ruler').evaluate(svg=>{const marker=svg.querySelector('line[stroke="#305e7a"]');return [...svg.querySelectorAll('text')].every(t=>t.getBBox().y>Number(marker.getAttribute('y2')))});
   assert.equal(clear,true,'Selection marker must leave the numeral row clear');
  }
  await page.locator('#ruler').press('Home');assert.equal(await page.locator('#cut').isDisabled(),true);
  await page.locator('#ruler').press('ArrowRight');await page.locator('#ruler').press('Enter');
  assert.equal((await snap()).pending.actual,1);assert.equal((await snap()).phase,'inspecting');
  await page.locator('#ack').press('Enter');assert.equal((await snap()).parts.length,1);
  await page.evaluate(()=>{const NativeAudio=window.AudioContext;window.qaAudioContexts=0;window.AudioContext=class extends NativeAudio{constructor(...args){super(...args);window.qaAudioContexts++}}});
  await page.uncheck('#reduced');await page.check('#mute');
  const before=(await snap()).attempts.length;
  await page.click('#cut');await page.evaluate(()=>{mtReview.cut();mtReview.cut()});
  assert.equal((await snap()).attempts.length,before+1);
  await page.click('#skip');assert.equal((await snap()).phase,'inspecting');
  assert.equal(await page.evaluate(()=>qaAudioContexts),0);
  await page.check('#reduced');await page.click('#ack');
  await page.uncheck('#mute');await page.click('#cut');assert.equal((await snap()).phase,'inspecting');
  assert.equal(await page.evaluate(()=>qaAudioContexts),1);
  await page.click('#ack');await page.check('#mute');await page.click('#cut');
  assert.equal(await page.evaluate(()=>qaAudioContexts),1);await page.click('#ack');
  report.checks.push('Skip Reaches Held Inspection; Repeated Cut Commits Once; Mute Gates Real AudioContext Creation (No Speaker Check)');
  await page.click('#fullscreen');await page.waitForFunction(()=>document.fullscreenElement);
  await page.waitForFunction(()=>document.getElementById('fullscreen').textContent==='Exit Full Screen');
  assert.equal(await page.locator('#fullscreen').getAttribute('aria-label'),'Exit Full Screen');
  await page.click('#fullscreen');await page.waitForFunction(()=>!document.fullscreenElement);
  await page.waitForFunction(()=>document.getElementById('fullscreen').textContent==='Full Screen');
  assert.equal(await page.locator('#fullscreen').getAttribute('aria-label'),'Enter Full Screen');
  await page.click('#fullscreen');await page.waitForFunction(()=>document.fullscreenElement);
  await page.evaluate(()=>document.exitFullscreen());await page.waitForFunction(()=>document.getElementById('fullscreen').textContent==='Full Screen');
  report.checks.push('Whole-Inch Numerals Clear Of Marker','Pointer/Keyboard Endpoints And Zero-Length Guard','Full-Screen Button And Browser-Initiated Exit Labels','Chooser Guidance Describes The Actual State');
  await page.reload();await page.waitForFunction(()=>window.mtReview?.ready);
  assert.equal(fs.readFileSync(path.join(root,'build-manifest.json'),'utf8'),manifestBefore);
  assert.equal(await page.locator('#build-id').getAttribute('data-full-id'),build.id);
  report.checks.push('Artifact Folder, Manifest, Report And Header Identity Agree; Reload Preserves Identity');
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.externalRequests,[]);
 }catch(e){report.failure=e.stack;await page?.screenshot({path:path.join(out,'polish-failure.png')}).catch(()=>{});throw e}
 finally{fs.writeFileSync(path.join(out,'polish-verification.json'),JSON.stringify(report,null,2));await browser?.close();await new Promise(resolve=>server.close(resolve));console.log(JSON.stringify(report));}
})().catch(e=>{console.error(e);process.exitCode=1});
