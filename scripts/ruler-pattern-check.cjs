const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const report=JSON.parse(fs.readFileSync('latest-review.json')),root=report.directory,evidence=path.join('test-results',report.id),base='http://127.0.0.1:18456';fs.mkdirSync(evidence,{recursive:true});
 const server=http.createServer((req,res)=>{let file=path.resolve(root,'.'+new URL(req.url,base).pathname);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.writeHead(404).end();return}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/json');fs.createReadStream(file).pipe(res)});
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(18456,'127.0.0.1',resolve)});let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.MT_BROWSER||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-unsafe-swiftshader']});const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[],requests=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)requests.push(r.url())});await page.route('**/*',r=>{if(!r.request().url().startsWith(base+'/')){requests.push(r.request().url());return r.abort()}return r.continue()});
  await page.goto(base);await page.waitForFunction(()=>window.mtReview?.plan);await page.check('#reduced');assert.equal(await page.locator('#build-id').textContent(),report.id);
  const snap=()=>page.evaluate(()=>mtReview.snapshot());
  // Advance the held unit-planning step so Challenge's ruler is available.
  await page.click('#plan-order');const c=await page.evaluate(()=>mtReview.content().checks[5]);await page.getByRole('radio',{name:c.answer,exact:true}).check();await page.locator('#response-form button[type="submit"]').click();await page.click('#confirm-plan');
  const pattern=()=>page.locator('#ruler').evaluate(svg=>({width:svg.viewBox.baseVal.width,lines:[...svg.querySelectorAll('line[y1="17"]')].map(l=>({x:Number(l.getAttribute('x1')),height:Number(l.getAttribute('y2'))-17,width:Number(l.getAttribute('stroke-width'))})),labels:[...svg.querySelectorAll('text')].map(t=>({text:t.textContent,x:Number(t.getAttribute('x')),bounds:{left:t.getBBox().x,right:t.getBBox().x+t.getBBox().width}}))}));
  function validate(p){assert.equal(p.lines.length,49);assert.deepEqual(p.labels.map(t=>t.text),['0','1','2','3']);for(let i=0;i<=48;i++){const t=p.lines[i];assert.ok(Math.abs(t.x-(24+i/48*(p.width-48)))<1e-7);assert.equal(t.height,i%16===0?30:i%8===0?24:i%4===0?19:i%2===0?13:8);assert.equal(t.width,i%16===0?2:1)}for(let inch=0;inch<3;inch++)assert.equal(p.lines.filter(t=>t.x>p.lines[inch*16].x&&t.x<p.lines[(inch+1)*16].x).length,15);for(const label of p.labels)assert.ok(label.bounds.left>=0&&label.bounds.right<=p.width,'Whole-inch label fits');}
  let cases=0,pointerChecks=0;const screenshots=[];
  for(const viewport of [{width:1920,height:1080},{width:1366,height:768},{width:1024,height:768}]){
   await page.setViewportSize(viewport);
   for(const mode of ['free','learn','challenge']){
    await page.evaluate(mode=>mtReview.mode(mode),mode);if(mode==='learn')await page.evaluate(()=>mtReview.chooseLesson(2));
    for(const scale of [2,4,8,16])for(const magnified of [false,true]){
     if((await page.locator('#magnify').getAttribute('aria-pressed')==='true')!==magnified)await page.click('#magnify');await page.selectOption('#subdivision',String(scale));const p=await pattern();validate(p);cases++;
     // Equivalent fractions and whole-plus-fraction endpoints never change physical positions.
     for(const n of [8,12,16,17,32,40,48]){await page.evaluate(n=>mtReview.select(n),n);const x=Number(await page.locator('#ruler circle').getAttribute('cx'));assert.ok(Math.abs(x-p.lines[n].x)<1e-7);assert.equal((await snap()).selected,n)}
     for(const n of [1,15,16,17,31,32,33,47,48]){await page.evaluate(n=>mtReview.select(n),n);const xy=await page.locator('#ruler').evaluate((svg,n)=>{const pt=svg.createSVGPoint();pt.x=24+n/48*(svg.viewBox.baseVal.width-48);pt.y=40;const q=pt.matrixTransform(svg.getScreenCTM());return {x:q.x,y:q.y}},n);await page.mouse.click(xy.x,xy.y);assert.equal((await snap()).selected,n,'Pointer endpoint unchanged');pointerChecks++}
     await page.locator('#ruler').focus();for(const key of ['Home','ArrowRight','End','ArrowLeft']){await page.keyboard.press(key);assert.equal((await snap()).selected,{Home:1,ArrowRight:2,End:48,ArrowLeft:47}[key]);assert.equal(await page.locator('#ruler').evaluate(svg=>{const b=document.getElementById('ruler-scroll').getBoundingClientRect(),pt=svg.createSVGPoint();pt.x=Number(svg.querySelector('circle').getAttribute('cx'));pt.y=7;const q=pt.matrixTransform(svg.getScreenCTM());return q.x>=b.left&&q.x<=b.right}),true)}
     const before=await pattern();await page.evaluate(()=>{mtReview.orbit(.7,.1,.88);mtReview.orbit(-1.4,-.1,1.12)});assert.deepEqual(await pattern(),before,'3D camera cannot change ruler coordinates');await page.click('#home');
     if(mode==='challenge')assert.equal(await page.locator('#readout').textContent(),'Mark Your Prediction');
     if(viewport.width===1366&&mode==='learn'&&scale===2&&!magnified){await page.evaluate(()=>mtReview.select(8));await page.screenshot({path:path.join(evidence,'ruler-all-marks.png')});screenshots.push('ruler-all-marks.png')}
     if(viewport.width===1024&&mode==='free'&&scale===4&&magnified){await page.evaluate(()=>mtReview.select(16));await page.screenshot({path:path.join(evidence,'ruler-magnified.png')});screenshots.push('ruler-magnified.png')}
    }
   }
  }
  // Each lesson and its lower-support practice retains the same complete scale.
  await page.evaluate(()=>mtReview.mode('learn'));for(let i=0;i<5;i++){await page.evaluate(i=>mtReview.chooseLesson(i),i);validate(await pattern());await page.click('#practice');validate(await pattern())}
  // Existing equivalence demonstrations change denomination context, never erase marks.
  await page.uncheck('#reduced');for(const lesson of [1,2]){await page.evaluate(i=>mtReview.chooseLesson(i),lesson);const changed=page.waitForFunction(()=>mtReview.snapshot().subdivision===4);await page.click('#demo');await changed;validate(await pattern());assert.equal((await snap()).selected,8);for(const scale of [8,16]){await page.waitForFunction(n=>mtReview.snapshot().subdivision===n,scale);validate(await pattern());assert.equal((await snap()).selected,8)}await page.waitForFunction(()=>!mtReview.snapshot().demonstrating)}
  assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);const result={id:report.id,sourceRevision:report.sourceRevision,patternCases:cases,pointerChecks,marksPerInch:15,totalGraduations:49,denominators:[2,4,8,16],modes:['Free Play','Learn','Challenge'],zooms:['Normal','Magnified'],viewports:['1920x1080','1366x768','1024x768'],checks:['Hierarchical Tick Lengths and Whole-Inch Labels','Fixed Equivalent-Fraction and Integer Boundary Positions','Unchanged Sixteenth Pointer and Keyboard Precision','Magnified Marker Scrolling','Camera Orbit and Zoom Leave Ruler Coordinates Unchanged','All Five Guided and Practice Lessons','Both Existing Denominator Demonstrations','No Challenge Cursor Answer Readout'],screenshots,errors,requests};fs.writeFileSync(path.join(evidence,'ruler-pattern-verification.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
})().catch(e=>{console.error(e);process.exitCode=1});
