const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const report=JSON.parse(fs.readFileSync('latest-pages.json')),root=report.reviewDirectory,evidence=path.join('test-results',report.id);fs.mkdirSync(evidence,{recursive:true});
 const server=http.createServer((req,res)=>{let file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.writeHead(404).end();return}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':file.endsWith('.md')?'text/plain':'application/json');fs.createReadStream(file).pipe(res)});
 await new Promise(r=>server.listen(18447,'127.0.0.1',r));let browser;
 try {
  browser=await chromium.launch({executablePath:process.env.MT_BROWSER||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true,args:['--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[],badRequests=[],requests=[];
  const base='http://127.0.0.1:18447/MeasureTwice/';page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>{const url=route.request().url();requests.push(url);if(!url.startsWith(base)){badRequests.push(url);return route.abort()}return route.continue()});
  page.on('response',response=>{if(response.status()>=400)badRequests.push(response.url()+': '+response.status())});
  await page.goto(base);await page.waitForFunction(()=>window.mtReview?.chooseCheck);assert.equal(await page.locator('#build-id').textContent(),report.id);assert.equal(await page.locator('canvas').count()>0,true);
  await page.screenshot({path:path.join(evidence,'pages-workshop.png')});await page.check('#reduced');
  await page.evaluate(()=>{mtReview.select(18);mtReview.cut()});assert.equal(await page.evaluate(()=>mtReview.snapshot().phase),'inspecting');assert.equal(await page.evaluate(()=>mtReview.snapshot().pending.correct),false);
  await page.evaluate(()=>{mtReview.acknowledge();for(const n of [20,32,16]){mtReview.select(n);mtReview.cut();mtReview.acknowledge()}});assert.equal(await page.evaluate(()=>mtReview.snapshot().parts.length),17);
  await page.screenshot({path:path.join(evidence,'pages-house.png')});
  await page.evaluate(()=>{mtReview.chooseCheck(2)});assert.equal((await page.locator('#target').textContent()).trim(),'6/8 in');
  await page.click('#curriculum');const link=page.getByRole('link',{name:'Content Index',exact:true});assert.equal(await link.getAttribute('href'),'docs/curriculum-content.md');
  const [popup]=await Promise.all([page.waitForEvent('popup'),link.click()]);await popup.waitForLoadState();assert.equal(popup.url(),base+'docs/curriculum-content.md');assert.match(await popup.locator('body').innerText(),/Curriculum Content/);await popup.close();await page.click('#close-panel');
  await page.evaluate(()=>{mtReview.mode('learn');mtReview.chooseLesson(2)});assert.match(await page.locator('#guidance').textContent(),/Three quarters/);await page.evaluate(()=>mtReview.mode('free'));assert.equal(await page.locator('#free-controls').isVisible(),true);
  assert.deepEqual(errors,[]);assert.deepEqual(badRequests,[]);assert.ok(requests.some(url=>url.endsWith('/data/house.json')));assert.ok(requests.some(url=>url.endsWith('/vendor/three.core.js')));
  const result={id:report.id,sourceRevision:report.sourceRevision,basePath:'/MeasureTwice/',checks:['Real WebGL at Project Subpath','Relative Modules and Data','Visible Manifest Identity','Wrong Cut Inspection','17-Piece House','C03 Authored Representation','Curriculum Link at Project Subpath','Learn and Free Play'],errors,badRequests};fs.writeFileSync(path.join(evidence,'pages-verification.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 } finally {await browser?.close();await new Promise(r=>server.close(r))}
})().catch(error=>{console.error(error);process.exitCode=1});
