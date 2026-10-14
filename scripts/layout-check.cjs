const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const build=JSON.parse(fs.readFileSync('latest-review.json')),root=build.directory,out=path.join('test-results',build.id),base='http://127.0.0.1:18481';fs.mkdirSync(out,{recursive:true});
 const report={id:build.id,sourceRevision:build.sourceRevision,checks:[],instruments:[],errors:[],externalRequests:[],syntheticData:true};
 const server=http.createServer((req,res)=>{let f=path.resolve(root,'.'+new URL(req.url,base).pathname);if(f!==root&&!f.startsWith(root+path.sep)){res.writeHead(403).end();return}if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');if(!fs.existsSync(f)){res.writeHead(404).end();return}res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.svg':'image/svg+xml'})[path.extname(f)]||'application/json');fs.createReadStream(f).pipe(res)});await new Promise(r=>server.listen(18481,'127.0.0.1',r));let browser,page;
 try{
  browser=await chromium.launch({executablePath:process.env.MT_BROWSER,headless:true,args:['--enable-unsafe-swiftshader']});page=await browser.newPage({viewport:{width:1366,height:768}});page.on('pageerror',e=>report.errors.push(e.message));await page.route('**/*',r=>r.request().url().startsWith(base)||r.request().url().startsWith('data:')?r.continue():(report.externalRequests.push(r.request().url()),r.abort()));await page.goto(base);await page.waitForFunction(()=>window.mtReview?.ready);await page.check('#reduced');
  const shot=n=>page.screenshot({path:path.join(out,'layout-'+n+'.png')}),snap=()=>page.evaluate(()=>mtReview.snapshot());
  await shot('initial-cut');await page.click('#home');await shot('overview');
  const baseline=await page.evaluate(()=>{const v=mtReview.view();return {bench:v.benchTop,legs:v.benchLegs,room:v.room,tray:v.receivingTray,limits:v.limits}});
  assert.equal(baseline.legs.length,6);assert.deepEqual(baseline.bench,{min:[-102,64,-36],max:[102,68,36]});
  for(const id of ['inch-3','inch-6','inch-12','yardstick','cm-15','cm-30','metre']){
   await page.click('#instruments');await page.selectOption('#instrument-choice',id);await page.click('#begin-instrument');assert.equal(await page.locator('#view-focus').inputValue(),'cut');
   const v=await page.evaluate(()=>mtReview.view());assert.deepEqual({bench:v.benchTop,legs:v.benchLegs,room:v.room,tray:v.receivingTray,limits:v.limits},baseline);
   const max=Number(await page.locator('#ruler').getAttribute('aria-valuemax'));
   for(const n of [0,max]){await page.evaluate(n=>mtReview.select(n),n);const bounds=await page.evaluate(()=>mtReview.view().stock.bounds);assert.ok(bounds.min[0]>=baseline.bench.min[0]&&bounds.max[0]<=baseline.bench.max[0]);assert.ok(bounds.min[1]>=70);}
   await page.selectOption('#view-focus','cut');await shot(id+'-cut');
   await page.evaluate(()=>{mtReview.cut();mtReview.skip()});assert.equal((await snap()).phase,'inspecting');await shot(id+'-inspection');await page.evaluate(()=>{mtReview.acknowledge();mtReview.skip()});
   const g=await page.evaluate(()=>mtReview.geometry());assert.equal(g.length,1);assert.deepEqual(g[0].scale,[1,1,1]);assert.ok(Math.abs(g[0].meshLength-g[0].physical.ticks/1016)<1e-8);
   const c=await page.evaluate(()=>mtReview.clearance());const b=c.parts[0];assert.ok(b.min[0]>=c.layout.tableLeft&&b.max[0]<=c.layout.tableLeft+c.layout.tableWidth);assert.ok(b.max[2]<c.layout.staging[2]-8,'Comparison cuts remain behind staging');
   await page.click('#home');await shot(id+'-overview');report.instruments.push({id,max,stockLength:g[0].meshLength,bench:baseline.bench,legCount:6,preferred:await page.evaluate(()=>mtReview.orbitState().preferred)});
  }
  report.checks.push('All Seven Instruments Keep Identical Bench, Six Legs, Room, Tray And Orbit Limits; Full Stock Travel Supported; Exact Kept Lengths; Comparison Cuts Behind Tray');
  await page.evaluate(()=>mtReview.changeInstrument('inch-3'));await page.click('[data-mode="challenge"]');await page.click('[data-recipe="house"]');
  await page.evaluate(()=>{mtReview.select(mtReview.plan().steps[0].length);mtReview.cut();mtReview.skip()});await page.uncheck('#reduced');await page.click('#ack');await page.waitForFunction(()=>mtReview.snapshot().phase==='duplicating');await shot('ready-to-assemble');await page.waitForFunction(()=>mtReview.snapshot().phase==='assembling');await shot('assembly-motion');await page.waitForFunction(()=>mtReview.snapshot().phase==='selecting');
  await page.check('#reduced');await page.selectOption('#view-focus','build');await shot('model-focus');await page.selectOption('#view-focus','tray');await shot('tray-focus');await page.click('#home');await shot('house-progress-overview');
  report.checks.push('Kept Pieces Visit Ready To Assemble Before Duplication And Front-Right Placement; Existing Model And Tray Focus');
  for(const size of [{width:1024,height:600},{width:1920,height:1080}]){await page.setViewportSize(size);await page.waitForFunction(()=>{const b=document.querySelector('canvas').getBoundingClientRect();return Math.abs(mtReview.view().aspect-b.width/b.height)<1e-9});await page.click('#home');await shot('overview-'+size.width);await page.selectOption('#view-focus','cut');const pointer=await page.evaluate(()=>mtReview.pointerScreen());assert.equal(await page.evaluate(p=>document.elementFromPoint(p.x,p.y)?.tagName,pointer),'CANVAS');await shot('cut-'+size.width)}
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.externalRequests,[]);
 }catch(e){report.failure=e.stack;await page?.screenshot({path:path.join(out,'layout-failure.png')}).catch(()=>{});throw e}
 finally{fs.writeFileSync(path.join(out,'layout-verification.json'),JSON.stringify(report,null,2));await browser?.close();await new Promise(r=>server.close(r));console.log(JSON.stringify(report));}
})().catch(e=>{console.error(e);process.exitCode=1});
