const test=require('node:test');
const assert=require('node:assert/strict');
const C=require('../core.js'),exams=require('../questions.js');
const lookup=Object.fromEntries(exams.flatMap(e=>e.questions.map(q=>[q.id,q])));
const gold=q=>q.type==='mc'?{choice:q.correct}:{answer:q.accepted[0],reason:q.model};
test('4 exams contain 80 unique questions, 18 objective + 2 written each',()=>{
 assert.equal(exams.length,4);assert.equal(Object.keys(lookup).length,80);
 exams.forEach(e=>{assert.equal(e.questions.length,20);assert.equal(e.questions.filter(q=>q.type==='mc').length,18);assert.equal(e.questions.filter(q=>q.type==='written').length,2);assert.deepEqual([...new Set(e.questions.map(q=>q.chapter))].sort(),[1,2,3,4,5]);e.questions.forEach(q=>{assert(q.source);assert(q.explanation);if(q.type==='mc'){assert.equal(q.options.length,4);assert(q.correct>=0&&q.correct<=3);assert.equal(new Set(q.options).size,4);}});});
});
test('answer key yields 100 for all four exams; blank answers yield zero',()=>{
 exams.forEach(e=>{const ids=e.questions.map(q=>q.id),answers=Object.fromEntries(e.questions.map(q=>[q.id,gold(q)]));const s=C.summarize(ids,answers,lookup);assert.equal(s.points,100,e.id);assert.equal(s.percent,100);assert.equal(s.correct,20);assert.equal(s.pending,2);assert.equal(C.summarize(ids,{},lookup).points,0);});
});
test('objective wrong answers and written partial/manual scores are handled',()=>{
 const mc=exams[0].questions[0],w=exams[0].questions[18];assert.equal(C.grade(mc,{choice:(mc.correct+1)%4}).score,0);
 assert.equal(C.grade(w,{answer:' 11 ',reason:''}).score,2);assert.equal(C.grade(w,{answer:'11',reason:'참조'}).score,3.5);
 assert.deepEqual(C.grade(w,{...gold(w),manualScore:0}).score,0);assert.equal(C.grade(w,{...gold(w),manualScore:4.5}).score,4.5);
 assert.equal(C.grade(w,{manualScore:5}).confirmed,true);
});
test('latest wrong tracks partial answers and removes mastered items without erasing history',()=>{
 const q=exams[0].questions[0],w=exams[0].questions[18];const a={finishedAt:1,questionIds:[q.id,w.id],answers:{[q.id]:{choice:0},[w.id]:{answer:'9'}}};
 assert.deepEqual(C.latestWrong([a],lookup),[q.id,w.id]);
 const b={finishedAt:2,questionIds:[q.id],answers:{[q.id]:gold(q)}};assert.deepEqual(C.latestWrong([b,a],lookup),[w.id]);
 const c={finishedAt:3,questionIds:[w.id],answers:{[w.id]:{...gold(w),manualScore:5}}};assert.deepEqual(C.latestWrong([c,b,a],lookup),[]);assert.equal(a.answers[q.id].choice,0);
});
test('wall clock survives resume; paused clock does not accumulate',()=>{
 assert.equal(C.elapsed({accumulatedMs:3000,runningSince:1000},6000),8);assert.equal(C.elapsed({accumulatedMs:3000,runningSince:null},99999),3);
 assert.equal(C.elapsed({accumulatedMs:0,runningSince:10000},500),0);
});
test('record export/import round trip retains answers, score overrides and draft',()=>{
 const q=exams[0].questions[18],id=q.id;
 const data={version:1,attempts:[{id:'a1',examId:'exam1',title:'테스트',mode:'exam',questionIds:[id],answers:{[id]:{...gold(q),manualScore:4.5}},duration:75,finishedAt:123}],draft:{examId:'exam1',title:'진행 중',mode:'exam',questionIds:[id],answers:{[id]:gold(q)},index:0,flagged:[id],accumulatedMs:5000,runningSince:null,startedAt:100}};
 const restored=C.validateState(JSON.parse(JSON.stringify(data)),lookup);assert.deepEqual(restored,data);assert.equal(C.summarize([id],restored.attempts[0].answers,lookup).points,4.5);
});
test('malformed records cannot inject unknown questions, duplicate attempts or scores',()=>{
 const base={version:1,attempts:[],draft:null};assert.throws(()=>C.validateState({version:99,attempts:[]},lookup));
 const q=exams[0].questions[18],a={id:'a',mode:'exam',questionIds:[q.id],answers:{[q.id]:{manualScore:99}},finishedAt:1,duration:1};assert.throws(()=>C.validateState({...base,attempts:[a]},lookup));
 assert.throws(()=>C.validateState({...base,attempts:[{...a,questionIds:['__proto__']}]},lookup));
 assert.throws(()=>C.validateState({...base,draft:{questionIds:['bad']}},lookup));
});
