const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const build=JSON.parse(fs.readFileSync('latest-review.json')),root=build.directory,out=path.join('test-results',build.id),base='http://127.0.0.1:18468';fs.mkdirSync(out,{recursive:true});
 const server=http.createServer((req,res)=>{let f=path.resolve(root,'.'+new URL(req.url,base).pathname);if(!f.startsWith(root+path.sep)&&f!==root){res.writeHead(403).end();return}if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');if(!fs.existsSync(f)){res.writeHead(404).end();return}res.setHeader('Content-Type',f.endsWith('.js')?'text/javascript':f.endsWith('.css')?'text/css':f.endsWith('.html')?'text/html':'application/json');fs.createReadStream(f).pipe(res)});
 await new Promise(r=>server.listen(18468,'127.0.0.1',r));let browser;const result={id:build.id,sourceRevision:build.sourceRevision,cases:[],errors:[],syntheticStudentData:true};
 const overlap=(a,b)=>a.min.every((n,i)=>a.max[i]>b.min[i]+.00001&&n<b.max[i]-.00001);
 try{
  browser=await chromium.launch({executablePath:process.env.MT_BROWSER,headless:true,args:['--enable-unsafe-swiftshader']});const page=await browser.newPage({viewport:{width:1280,height:600}});page.on('pageerror',e=>result.errors.push(e.message));
  await page.goto(base);await page.waitForFunction(()=>mtReview?.changeInstrument);await page.click('[data-mode="free"]');
  for(const [id,max] of [['inch-3',48],['metre',1000]])for(const [n,motion] of [[1,'full'],[max,'full'],[max-1,'skipped'],[max,'reduced']]){
   await page.check('#reduced');await page.evaluate(id=>mtReview.changeInstrument(id),id);await page.selectOption('#free-target',String(max));await page.setChecked('#reduced',motion==='reduced');
   await page.evaluate(n=>{mtReview.select(n);window.framesQA=[];window.watchQA=true;function sample(){if(!watchQA)return;framesQA.push({phase:mtReview.snapshot().phase,bounds:mtReview.clearance()});requestAnimationFrame(sample)}sample();mtReview.cut()},n);
   if(motion==='skipped')await page.evaluate(()=>mtReview.skip());await page.waitForFunction(()=>mtReview.snapshot().phase==='inspecting');await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>mtReview.snapshot().phase),'inspecting');
   await page.evaluate(()=>mtReview.acknowledge());if(motion==='skipped')await page.evaluate(()=>mtReview.skip());await page.waitForFunction(()=>mtReview.snapshot().phase==='selecting');
   const frames=await page.evaluate(()=>{watchQA=false;return framesQA});
   for(const {phase,bounds:v} of frames){
    for(const a of [v.stock,v.offcut,v.movingCut,...v.parts].filter(a=>a?.visible))for(const b of [...v.tray,v.bench,v.rack])assert.equal(overlap(a,b),false,`${id}/${n}/${phase} Furniture Intersection ${JSON.stringify({a,b})}`);
    if(v.stock?.visible)for(const p of v.parts)assert.equal(overlap(p,v.stock),false,'Retained Wood In Stock Lane');
   }
   const snapshot=await page.evaluate(()=>mtReview.snapshot());assert.equal(snapshot.parts.length,1);assert.equal(snapshot.parts[0].length,n);result.cases.push({instrument:id,selected:n,motion,samples:frames.length,phases:[...new Set(frames.map(f=>f.phase))]});
  }
  assert.deepEqual(result.errors,[]);
 }catch(e){result.failure=e.stack;throw e}finally{fs.writeFileSync(path.join(out,'motion-clearance-verification.json'),JSON.stringify(result,null,2));await browser?.close();await new Promise(r=>server.close(r));console.log(JSON.stringify(result))}
})().catch(e=>{console.error(e);process.exitCode=1});
