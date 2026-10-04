export const lessonStageKey=s=>`${s.lesson}:${s.lessonStage}`;
export const waitingForLessonReasoning=s=>s.mode==='learn'&&(s.lessonAccepted??[]).includes(lessonStageKey(s))&&!(s.lessonFinished??[]).includes(lessonStageKey(s));
export function acceptLessonCut(s){if(s.mode!=='learn'||s.pending?.kind==='demonstration'||!s.pending?.correct)return false;const key=lessonStageKey(s);s.lessonFinished=(s.lessonFinished??[]).filter(k=>k!==key);s.lessonAccepted??=[];if(!s.lessonAccepted.includes(key))s.lessonAccepted.push(key);return true}
export function finishLessonStage(s,count){
 if(!waitingForLessonReasoning(s))return false;const key=lessonStageKey(s);s.lessonFinished??=[];s.lessonFinished.push(key);
 const index=s.lesson*2+(s.lessonStage==='practice'?1:0);for(let offset=1;offset<=count*2;offset++){const n=(index+offset)%(count*2),stage=n%2?'practice':'guided',lesson=Math.floor(n/2);if(!s.lessonFinished.includes(`${lesson}:${stage}`)){s.lesson=lesson;s.lessonStage=stage;s.hint=false;return true}}
 s.lessonStage='complete';return true;
}
