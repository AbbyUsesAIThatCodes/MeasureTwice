const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const report=JSON.parse(fs.readFileSync('latest-review.json')),root=report.directory,evidence=path.join('test-results',report.id),base='http://127.0.0.1:18458';fs.mkdirSync(evidence,{recursive:true});
 const server=http.createServer((req,res)=>{let file=path.resolve(root,'.'+new URL(req.url,base).pathname);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.writeHead(404).end();return}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/json');fs.createReadStream(file).pipe(res)});
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(18458,'127.0.0.1',resolve)});let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.MT_BROWSER||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-unsafe-swiftshader']});const page=await browser.newPage(),errors=[],requests=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)requests.push(r.url())});await page.route('**/*',r=>{if(!r.request().url().startsWith(base+'/')){requests.push(r.request().url());return r.abort()}return r.continue()});
  let inspections=0;
  async function verify(actual){const v=await page.evaluate(()=>mtReview.view());assert.equal(v.comparisonPreviews,0);assert.equal(v.inspection.solidCutPieces,1);assert.equal(v.inspection.cutLength,actual/8);assert.equal(v.inspection.targetLength,20/8);assert.equal(v.piece?.visible??false,false);assert.equal(await page.locator('#needed').isVisible(),true);assert.equal(await page.locator('#actual').isVisible(),true);assert.equal(await page.locator('#result').getAttribute('data-result'),actual===20?'correct':actual<20?'short':'long');const a=await page.locator('#actual').boundingBox(),n=await page.locator('#needed').boundingBox();assert.ok(a.y>n.y+n.height,'Target and cut labels remain distinct');for(const b of [a,n])assert.ok(b.x>=0&&b.x+b.width<=page.viewportSize().width&&b.y>=0&&b.y+b.height<=page.viewportSize().height);assert.equal((await page.evaluate(()=>mtReview.snapshot())).phase,'inspecting')}
  for(const viewport of [{width:1920,height:1080},{width:1366,height:768},{width:1024,height:768}]){
   await page.setViewportSize(viewport);await page.goto(base);await page.waitForFunction(()=>window.mtReview?.plan);await page.check('#reduced');await page.evaluate(()=>mtReview.mode('free'));await page.selectOption('#free-target','20');
   for(const actual of [18,20,22,20,1,48]){
    // Reproduce the stale two-board preview from the supplied screenshots.
    await page.evaluate(async()=>{const {game}=await import('/src/app.js');game.comparison(18,20,false)});assert.equal((await page.evaluate(()=>mtReview.view())).comparisonPreviews,2);
    await page.evaluate(n=>{mtReview.select(n);mtReview.cut()},actual);await verify(actual);const original=JSON.stringify((await page.evaluate(()=>mtReview.snapshot())).attempts);await page.waitForTimeout(80);await verify(actual);
    await page.evaluate(()=>{mtReview.mode('learn');mtReview.mode('free')});await verify(actual);assert.equal(JSON.stringify((await page.evaluate(()=>mtReview.snapshot())).attempts),original);await page.click('#home');await verify(actual);inspections++;
    await page.evaluate(()=>mtReview.acknowledge());assert.equal((await page.evaluate(()=>mtReview.snapshot())).phase,'selecting');assert.equal((await page.evaluate(()=>mtReview.view())).inspection,null);
   }
   const history=JSON.stringify((await page.evaluate(()=>mtReview.snapshot())).attempts);await page.evaluate(()=>mtReview.restart());assert.equal((await page.evaluate(()=>mtReview.view())).comparisonPreviews,0);assert.equal(JSON.stringify((await page.evaluate(()=>mtReview.snapshot())).attempts),history);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);const result={id:report.id,sourceRevision:report.sourceRevision,inspections,viewports:['1920x1080','1366x768','1024x768'],checks:['Two Preview Boards Removed at Actual Cut Commitment','Exactly One Solid Cut Piece','Exact Target Outline and Actual Length','Short, Long, Correct and Endpoint Cuts','Held Reinspection and Mode Return Do Not Duplicate Geometry or Attempts','Target and Actual Labels Visible and Separate','Home View and Restart'],errors,requests};fs.writeFileSync(path.join(evidence,'inspection-verification.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
})().catch(e=>{console.error(e);process.exitCode=1});
