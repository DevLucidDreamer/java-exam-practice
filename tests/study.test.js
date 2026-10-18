const test=require('node:test');
const assert=require('node:assert/strict');
const C=require('../core.js'),chapters=require('../lessons.js'),exams=require('../questions.js');
const lookup=Object.fromEntries(exams.flatMap(e=>e.questions.map(q=>[q.id,q])));
test('all five chapter notes have unique deep links, valid tables and recall answers',()=>{
 assert.deepEqual(chapters.map(c=>c.id),[1,2,3,4,5]);const sections=chapters.flatMap(c=>c.sections);
 assert.equal(new Set(sections.map(s=>s.key)).size,sections.length);
 chapters.forEach(c=>{assert(c.sections.length>=6);assert(c.goals.length);assert(Object.values(lookup).some(q=>q.chapter===c.id));c.sections.forEach(s=>{assert.equal(s.key,`ch${c.id}-${s.id}`);assert(s.title&&s.summary&&s.check.q&&s.check.a&&s.source);if(s.table){assert(s.table.rows.length);s.table.rows.forEach(row=>assert.equal(row.length,s.table.headers.length));}});});
});
test('old backups stay compatible and extended backups retain study progress and chapter attempts',()=>{
 const old={version:1,attempts:[],draft:null};assert.deepEqual(C.validateState(old,lookup),old);
 const q=exams[0].questions[0],study={completed:['ch1-flow','ch5-upcasting'],lastChapter:5,lastSection:'ch5-upcasting'};
 const a={id:'chapter-test',examId:'chapter1',title:'1장 확인 문제',mode:'chapter',questionIds:[q.id],answers:{[q.id]:{choice:q.correct}},finishedAt:10,duration:20};
 const data={...old,attempts:[a],study,draft:{examId:'chapter1',title:a.title,mode:'chapter',questionIds:[q.id],answers:{},index:0,flagged:[],accumulatedMs:0,runningSince:null,startedAt:10}};
 assert.deepEqual(C.validateState(JSON.parse(JSON.stringify(data)),lookup),data);
 assert.equal(C.summarize([q.id],data.attempts[0].answers,lookup).percent,100);
});
test('malformed study metadata is sanitized without rejecting valid exam history',()=>{
 const data={version:1,attempts:[],draft:null,study:{completed:['ch1-flow','ch1-flow','../../bad',42],lastChapter:9,lastSection:'invalid'}};
 assert.deepEqual(C.validateState(data,lookup).study,{completed:['ch1-flow'],lastChapter:1,lastSection:null});
});
