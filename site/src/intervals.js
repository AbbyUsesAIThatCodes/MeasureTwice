import {fraction} from './model.js';

// A graduation is a line; an interval is the space between adjacent lines.
// Counts always describe the visible scale, never a hidden denominator.
export function intervalExplanation(target, subdivision, solved=true) {
  const intro=`Each small interval is 1/${subdivision} inch.`;
  if(!solved)return `${intro} Begin at the zero graduation and count intervals, not lines.`;
  const count=target*subdivision/16;
  if(!Number.isInteger(count))return `${intro} This target requires finer visible graduations before cutting.`;
  const whole=Math.floor(target/16),remainder=target%16;
  if(whole&&remainder)return `${intro} Keep ${whole} whole ${whole===1?'inch':'inches'}, then count ${remainder*subdivision/16} more small intervals to ${fraction(target)} inches.`;
  const equivalent=`${count}/${subdivision} inch`;
  return `${intro} From zero, count ${count} small ${count===1?'interval':'intervals'}: ${equivalent}${fraction(target)===`${count}/${subdivision}`?'':` = ${fraction(target)} inch`}.${subdivision===16&&target%2===0?' Each pair of small intervals makes 1/8 inch.':''}`;
}

export function lessonGuidance(lesson,subdivision){
  if(lesson.id!=='MT-L01')return lesson.text;
  return 'Graduation marks are the lines. An interval is the space between neighboring graduations. '+intervalExplanation(lesson.guided,subdivision)+' Start at zero, not the ruler edge.';
}
