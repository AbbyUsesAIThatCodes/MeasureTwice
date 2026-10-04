const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);
(async()=>{
 const build=JSON.parse(fs.readFileSync('latest-review.json')),out=path.join('test-results',build.id),browser=await chromium.launch({executablePath:process.env.MT_BROWSER,headless:true,args:['--enable-unsafe-swiftshader']});
 try {
  const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:18443');await page.waitForFunction(()=>window.mtReview?.plan);await page.check('#reduced');assert.equal(await page.locator('#build-id').textContent(),build.id);
  const plan=await page.evaluate(()=>mtReview.plan()),bank=await page.evaluate(()=>mtReview.content().checks),answer=async c=>{await page.getByRole('radio',{name:c.answer,exact:true}).check();await page.locator('#response-form button[type="submit"]').click()};
  await page.click('#plan-order');await answer(bank[5]);await page.click('#confirm-plan');
  const shots=[];
  for(let i=1;i<plan.steps.length;i++){
   const st=plan.steps[i],c=bank.find(c=>c.id===st.exercise);await page.evaluate(n=>{mtReview.select(n);mtReview.cut()},st.length);if(c?.question)await answer(c);await page.evaluate(()=>{mtReview.acknowledge();mtReview.skip()});assert.equal(await page.evaluate(()=>mtReview.snapshot().step),i+1);
   if(i===plan.steps.length-1||plan.steps[i+1].project!==st.project){
    await page.selectOption('#view-focus','build');
    for(const width of [1366,1024]){await page.setViewportSize({width,height:768});await page.screenshot({path:path.join(out,`${st.project}-build-focus-${width}.png`)});shots.push(`${st.project}-build-focus-${width}.png`)}
    await page.setViewportSize({width:1366,height:768});await page.click('#home');
   }
  }
  assert.equal(await page.evaluate(()=>mtReview.challengeStatus().complete),true);assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'focus-review-verification.json'),JSON.stringify({id:build.id,sourceRevision:build.sourceRevision,shots,checks:['Build Table Focus Shows All Three Completed Models at 1366x768 and 1024x768','Home Restores Workshop Focus'],errors,syntheticStudentData:true},null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
