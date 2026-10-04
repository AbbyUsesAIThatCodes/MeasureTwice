import {responseRound} from './model.js';

// Completion describes current automatic components, never curriculum mastery.
export function exerciseStatus(s,c){
  const round=responseRound(s,c.id),cuts=s.attempts.filter(a=>a.context===c.id&&a.kind!=='demonstration'),responses=s.responses.filter(r=>r.id===c.id),explanations=s.responses.filter(r=>r.id===c.id+':explanation');
  // Reasoning-only retries retain a correctly measured held piece. A deliberate
  // completed-step redo explicitly requires a fresh cut until acknowledged.
  const cut=cuts.at(-1),response=responses.filter(r=>r.round===round).at(-1),explanation=explanations.filter(r=>r.round===round).at(-1);
  const cutCorrect=c.kind!=='cut'||Boolean(!s.requiresNewCut.includes(c.id)&&cut?.correct&&s.acknowledgements.some(a=>a.attemptId===cut.id&&a.kept));
  const choiceCorrect=!c.question||response?.correct===true;
  const explanationSaved=!c.explanation||Boolean(explanation?.answer.trim());
  const complete=cutCorrect&&choiceCorrect&&explanationSaved;
  const originals=[...(c.kind==='cut'?[cuts[0]]:[]),...(c.question?[responses[0]]:[])];
  return {id:c.id,round,complete,cutCorrect,choiceCorrect,explanationSaved,cut,response,explanation,firstIndependentCorrect:complete&&originals.every(r=>r?.correct===true&&!r.assisted&&!r.retry),cuts,responses,explanations};
}
export function challengeStatus(s,checks,plan){
  const exercises=checks.map(c=>exerciseStatus(s,c));
  const projects=plan.projects.map(p=>{const steps=plan.steps.filter(st=>st.project===p.id),expected=steps.reduce((n,st)=>n+st.placements.length,0),parts=s.parts.filter(part=>part.project===p.id);return {id:p.id,title:p.title,expected,pieces:parts.length,complete:steps.every(st=>s.builtSteps.includes(st.id))&&parts.length===expected}});
  const houseComplete=projects.find(p=>p.id==='house').complete;
  return {exercises,projects,correctCount:exercises.filter(e=>e.complete).length,total:checks.length,houseComplete,complete:projects.every(p=>p.complete)&&exercises.every(e=>e.complete)&&s.requiresNewCut.length===0&&s.resumeStep===null&&['selecting','complete'].includes(s.phase)};
}
const evidence=r=>`${r.recordedAt} | Round ${r.round+1} | ${r.retry?'Retry':'Original'} | ${r.assisted?'Assisted / Previously Exposed':'No Recorded Assistance'} | ${r.correct===null?'Teacher Review':r.correct?'Correct':'Incorrect'}`;
export function teacherReport(s,checks,plan,manifest,provenance){
  const status=challengeStatus(s,checks,plan);
  if(!status.complete)throw new Error('Complete every objective and the chair, plane and house before downloading the report.');
  if(!manifest?.id||!manifest?.sourceRevision)throw new Error('An identified build is required for a completion report.');
  const lines=['MeasureTwice Challenge Completion Report','',`Build: ${manifest.id}`,`Built At UTC: ${manifest.builtAt}`,`Source Revision: ${manifest.sourceRevision}`,`Source Fingerprint: ${manifest.fingerprint}`,`Content Revision: ${provenance.revision}`,`Construction Revision: ${plan.revision}`,`Exported At UTC: ${new Date().toISOString()}`,'',`Automatic Components Complete: ${status.correctCount}/${status.total}`,...status.projects.map(p=>`${p.title}: ${p.pieces}/${p.expected} Exact Pieces; Complete`),`Original House Frame: ${s.parts.filter(p=>p.role==='frame').length}/17 Members Preserved`,'This is completion evidence, not a grade or a claim of unassisted mastery.','Current activities record choices and measured cuts. Independent written reasoning is not assessed. Legacy explanations below remain for Teacher Review.','No Recorded Assistance means no in-game support was recorded; it cannot rule out help outside the game.','The report is an editable offline file, not a signed assessment record.','Save this file and attach it to Google Classroom yourself. Nothing is uploaded automatically.','','Exercise Results'];
  for(const c of checks){
    const e=exerciseStatus(s,c);
    const step=plan.steps.find(st=>st.exercise===c.id);lines.push(`Construction: ${step.project} / ${step.id} / ${step.title}`);
    lines.push('',`${c.id} — ${c.title}`,`Prompt: ${c.prompt}`,`Mapping: DM 1.3 ${c.goals.join(', ')}; ${c.pages}; ${c.mapping}`,c.extension||'Source-Backed Digital Measurement Practice',`Final Automatic Result: Correct${c.explanation?'; Explanation Saved for Teacher Review':''}`,`First Attempt: ${e.firstIndependentCorrect?'All Automatic Components Correct With No Recorded Assistance':'Do Not Count as Independent First-Attempt Success'}`);
    for(const a of e.cuts)lines.push(`Cut #${a.id}: ${a.actual}/16 in; Target ${a.target}/16 in; Scale 1/${a.scale} in; ${evidence(a)}`);
    for(const a of e.responses)lines.push(`Choice: ${a.answer} | ${evidence(a)}`);
    for(const a of e.explanations)lines.push(`Explanation: ${JSON.stringify(a.answer)} | ${evidence(a)}`);
  }
  lines.push('','Additional House Frame Measurements');
  for(const a of s.attempts.filter(a=>a.context.startsWith('house:')))lines.push(`${a.context}: ${a.actual}/16 in; Needed ${a.target}/16 in | ${evidence(a)}`);
  lines.push('','Preserved Raw Observation History (Original Records Are Never Rewritten)',JSON.stringify({attempts:s.attempts,responses:s.responses,acknowledgements:s.acknowledgements,exposed:s.exposed,responseRounds:s.responseRounds,builtSteps:s.builtSteps,parts:s.parts},null,2));
  return lines.join('\n')+'\n';
}
