(function(root){
'use strict';
const normalize=v=>String(v??'').normalize('NFKC').toLowerCase().replace(/[\s.,:;"'`()[\]{}!?·_-]/g,'');
const round=n=>Math.round(n*100)/100;
function grade(q,a){
  if(q.type==='mc')return {score:Number.isInteger(a?.choice)&&a.choice===q.correct?5:0,confirmed:true};
  const output=normalize(a?.answer),reason=normalize(a?.reason);
  const outputOK=!!output&&q.accepted.some(v=>normalize(v)===output);
  const hits=q.groups.map(g=>!!reason&&g.some(v=>reason.includes(normalize(v))));
  const autoScore=round((outputOK?2:0)+hits.filter(Boolean).length*3/q.groups.length);
  const manual=typeof a?.manualScore==='number'&&Number.isFinite(a.manualScore)?Math.min(5,Math.max(0,a.manualScore)):null;
  return {score:manual??autoScore,autoScore,outputOK,hits,confirmed:manual!==null};
}
function summarize(ids,answers,lookup){
 const rows=ids.map(id=>({id,...grade(lookup[id],answers[id])}));
 const points=round(rows.reduce((n,r)=>n+r.score,0)), max=ids.length*5;
 return {rows,points,max,percent:max?round(points/max*100):0,correct:rows.filter(r=>r.score===5).length,pending:rows.filter(r=>!r.confirmed).length};
}
function latestWrong(attempts,lookup){
 const latest=new Map();
 [...attempts].sort((a,b)=>a.finishedAt-b.finishedAt).forEach(a=>a.questionIds.forEach(id=>{if(lookup[id])latest.set(id,grade(lookup[id],a.answers[id]));}));
 return [...latest].filter(([,g])=>g.score<5).map(([id])=>id);
}
function elapsed(d,now=Date.now()){return Math.max(0,Math.floor((d.accumulatedMs+(d.runningSince?Math.max(0,now-d.runningSince):0))/1000));}
function isAnswered(q,a){return q.type==='mc'?Number.isInteger(a?.choice):!!a?.answer?.trim()&&!!a?.reason?.trim();}
function validateState(data,lookup){
 if(!data||data.version!==1||!Array.isArray(data.attempts)||data.attempts.length>2000)throw Error('지원하지 않는 기록 파일입니다.');
 const cleanAnswers=(answers,ids)=>{
  if(!answers||typeof answers!=='object')throw Error('답안 형식이 올바르지 않습니다.');
  const out={};
  ids.forEach(id=>{const a=answers[id];if(!a)return;const q=lookup[id];
   if(typeof a!=='object')throw Error('답안 형식이 올바르지 않습니다.');
   if(q.type==='mc'){if(a.choice!==undefined&&(!Number.isInteger(a.choice)||a.choice<0||a.choice>3))throw Error('선택 답안이 올바르지 않습니다.');out[id]={choice:a.choice};}
   else {if((a.answer?.length||0)>4000||(a.reason?.length||0)>10000)throw Error('답안이 너무 깁니다.');out[id]={answer:String(a.answer??''),reason:String(a.reason??'')};if(a.manualScore!==undefined){if(typeof a.manualScore!=='number'||!Number.isFinite(a.manualScore)||a.manualScore<0||a.manualScore>5)throw Error('점수가 올바르지 않습니다.');out[id].manualScore=a.manualScore;}}
  });return out;
 };
 const validIds=ids=>Array.isArray(ids)&&ids.length>0&&ids.length<=80&&new Set(ids).size===ids.length&&ids.every(id=>Object.hasOwn(lookup,id));
 const attempts=data.attempts.map(a=>{
  if(!a||typeof a.id!=='string'||!validIds(a.questionIds)||!Number.isFinite(a.finishedAt)||!Number.isFinite(a.duration)||a.duration<0||!['exam','review'].includes(a.mode))throw Error('풀이 기록이 올바르지 않습니다.');
  return {id:a.id,examId:String(a.examId??''),title:String(a.title??'풀이 기록').slice(0,100),mode:a.mode,questionIds:a.questionIds,answers:cleanAnswers(a.answers,a.questionIds),finishedAt:a.finishedAt,duration:a.duration};
 });
 if(new Set(attempts.map(a=>a.id)).size!==attempts.length)throw Error('중복된 풀이 기록입니다.');
 let draft=null;
 if(data.draft){const d=data.draft;
  if(!validIds(d.questionIds)||!Number.isInteger(d.index)||d.index<0||d.index>=d.questionIds.length||!Number.isFinite(d.accumulatedMs)||d.accumulatedMs<0||!(d.runningSince===null||Number.isFinite(d.runningSince))||!['exam','review'].includes(d.mode))throw Error('진행 중 답안이 올바르지 않습니다.');
  draft={examId:String(d.examId??''),title:String(d.title??'진행 중 시험').slice(0,100),mode:d.mode,questionIds:d.questionIds,answers:cleanAnswers(d.answers,d.questionIds),index:d.index,flagged:Array.isArray(d.flagged)?d.flagged.filter(id=>d.questionIds.includes(id)):[],accumulatedMs:d.accumulatedMs,runningSince:d.runningSince,startedAt:Number.isFinite(d.startedAt)?d.startedAt:Date.now()};
 }
 return {version:1,attempts:attempts.slice(-200),draft};
}
root.ExamCore={normalize,round,grade,summarize,latestWrong,elapsed,isAnswered,validateState};
if(typeof module!=='undefined')module.exports=root.ExamCore;
})(typeof window!=='undefined'?window:globalThis);
