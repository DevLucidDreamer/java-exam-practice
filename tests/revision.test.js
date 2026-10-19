const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const exams=require('../questions.js'),chapters=require('../lessons.js'),C=require('../core.js');
const questions=exams.flatMap(e=>e.questions);
test('all new questions have distinct edition IDs and stay inside the revised scope',()=>{
 const context={window:{}};vm.runInNewContext(fs.readFileSync(require.resolve('../legacy-questions.js'),'utf8'),context);
 const legacy=context.window.JAVA_LEGACY_EXAMS.flatMap(e=>e.questions);
 const oldIds=new Set(legacy.map(q=>q.id));
 assert(questions.every(q=>q.id.startsWith('r2-')&&!oldIds.has(q.id)));
 assert(questions.every(q=>!legacy.some(o=>o.prompt===q.prompt&&o.code===q.code&&JSON.stringify(o.options)===JSON.stringify(q.options))));
 for(const q of questions.filter(q=>q.chapter===5)){
   assert(!/오버라이딩|동적 바인딩|인터페이스|추상 클래스/.test(JSON.stringify(q)));
   const pages=q.source.match(/p\.(\d+)(?:~(\d+))?/);assert(pages);assert(Number(pages[2]||pages[1])<=29);
 }
 const lookup=Object.fromEntries([...legacy,...questions].map(q=>[q.id,q]));
 const old=legacy[0];const a={id:'old',mode:'exam',questionIds:[old.id],answers:{[old.id]:{choice:old.correct}},finishedAt:1,duration:10};
 const restored=C.validateState({version:1,attempts:[a],draft:null},lookup);
 assert.equal(C.summarize(restored.attempts[0].questionIds,a.answers,lookup).percent,100);
 assert.equal(restored.attempts.filter(a=>a.questionIds.every(id=>questions.some(q=>q.id===id))).length,0);
});
test('all 34 concepts have concrete explanation, reading steps and exam guidance',()=>{
 assert.equal(chapters.flatMap(c=>c.sections).length,34);
 chapters.forEach(c=>c.sections.forEach(s=>{assert(s.easy.length>25);assert.equal(s.steps.length,3);assert(s.examTip.length>15);}));
 assert.deepEqual(chapters[4].sections.map(s=>s.id),['inheritance','inheritance-access','super-constructors','upcasting','downcasting','instanceof']);
 for(const s of chapters[4].sections){const p=s.source.match(/p\.(\d+)(?:~(\d+))?/);assert(Number(p[2]||p[1])<=29);}
});
