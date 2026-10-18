/* No network calls, analytics or remote storage. All answer data stays in this browser. */
(function(){
'use strict';
const C=window.ExamCore,exams=window.JAVA_EXAMS,lookup=Object.fromEntries(exams.flatMap(e=>e.questions.map(q=>[q.id,q])));
const KEY='java-study-room.v1',main=document.querySelector('#main'),modal=document.querySelector('#modal');
const blank=()=>({version:1,attempts:[],draft:null,study:{completed:[],lastChapter:1,lastSection:null}});
let state=blank(),route='home',resultId=null,resultFilter='all',storageOK=true,toastTimer;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
const date=t=>new Date(t).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});
const button=(label,action,cls='',extra='')=>`<button class="btn ${cls}" data-action="${action}" ${extra}>${label}</button>`;
const chapterNames=['','자바 실행 원리','자료형·연산·조건','반복·배열·예외','클래스와 객체','상속·다형성'];
function warn(message){storageOK=false;const el=document.querySelector('#save-warning');el.hidden=false;el.textContent=message;}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;document.querySelector('#save-warning').hidden=true;return true;}catch{warn('브라우저 저장 공간을 사용할 수 없어 이번 변경이 저장되지 않았습니다. 기록 내보내기로 보관해 주세요.');return false;}}
try{const raw=localStorage.getItem(KEY);if(raw)state=C.validateState(JSON.parse(raw),lookup);}catch{warn('저장된 기록을 읽지 못했습니다. 기존 데이터를 덮어쓰지 않도록 임시 모드로 열었습니다. 기록 내보내기 후 다시 확인해 주세요.');}
let readFailed=!storageOK;
const save=()=>readFailed?false:persist();
function toast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),3500);}
function dialog(title,body,actions){document.querySelector('#modal-body').innerHTML=`<h2 id="modal-title">${title}</h2>${body}<div class="toolbar">${actions}</div>`;if(!modal.open)modal.showModal();}
function close(){modal.close();}
function header(){document.querySelector('#wrong-count').textContent=C.latestWrong(state.attempts,lookup).length;document.querySelectorAll('.topbar nav button').forEach(b=>b.classList.toggle('active',b.dataset.action===route));}
function go(target,focus=true){if(target!=='learn'&&location.hash.startsWith('#learn'))history.pushState(null,'',location.pathname+location.search);route=target;render();if(focus){main.focus();window.scrollTo({top:0,behavior:'instant'});}}
function stat(label,value,suffix=''){return `<div class="stat"><span class="stat-label">${label}</span><strong>${value}</strong><small>${suffix}</small></div>`;}
function summary(a){return C.summarize(a.questionIds,a.answers,lookup);}
const studyView=window.createStudyView({chapters:window.JAVA_LESSONS,questions:Object.values(lookup),getState:()=>state,save,esc,button});
function showStudy(){route='learn';render();studyView.afterRender();}
function home(){
 const full=state.attempts.filter(a=>a.mode==='exam'),wrong=C.latestWrong(state.attempts,lookup),avg=full.length?C.round(full.reduce((n,a)=>n+summary(a).percent,0)/full.length):'—';
 const pending=full.some(a=>summary(a).pending);
 main.innerHTML=`<section class="hero"><div><div class="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div><h1>개념을 이해하고,<br>시험에 익숙해지는 시간.</h1><p class="sub">손코딩 없이, 기본 개념부터 코드 해석까지.<br>1~5장을 네 번에 나눠 점검하는 자바 중간고사 연습실입니다.</p><div class="hero-meta"><span class="pill">총 80문제</span><span class="pill">4지선다 + 서술형</span><span class="pill outline">이 기기에 기록 저장</span></div></div><div class="hero-art" aria-hidden="true"><span class="brace">{ J }</span><span class="art-label">THINK · SOLVE · UNDERSTAND</span></div></section>
 ${state.draft?`<div class="notice resume"><div><strong>풀던 시험이 기다리고 있어요.</strong>${esc(state.draft.title)} · ${state.draft.questionIds.filter(id=>C.isAnswered(lookup[id],state.draft.answers[id])).length}/${state.draft.questionIds.length}문제 응답 · <span data-time>${fmt(C.elapsed(state.draft))}</span></div>${button('이어서 풀기 →','resume','primary')}</div>`:''}
 <section class="stats-strip" aria-label="학습 요약">${stat('풀어 본 회차',new Set(full.map(a=>a.examId)).size,'/ 4회')}${stat(pending?'평균 잠정 점수':'평균 점수',avg,full.length?'점':'')}${stat('다시 볼 오답',wrong.length,'문제')}${stat('누적 풀이 시간',Math.round(state.attempts.reduce((n,a)=>n+a.duration,0)/60),'분')}</section>
 <section class="study-entry"><div><span class="eyebrow">CONCEPT NOTES · 1~5장</span><h2>문제 전에, 개념부터 살펴볼까요?</h2><p class="sub">챕터별 설명·비교표·예제와 스스로 확인 질문을 준비했어요.</p></div>${button('개념 공부 시작 →','learn','primary')}</section>
 <section><div class="section-head"><h2>네 번의 연습, 한 번의 자신감</h2><p class="sub">각 20문제 · 객관식 18 + 서술형 2 · 100점 만점</p></div><div class="exam-grid">${exams.map((e,i)=>{
  const attempts=full.filter(a=>a.examId===e.id),last=attempts.at(-1),s=last&&summary(last);
  return `<article class="exam-card"><div class="card-top"><span class="book-number">PRACTICE BOOK / 0${i+1}</span><span class="pill ${last?'':'outline'}">${last?`${attempts.length}회 풀이`:'새로운 연습'}</span></div><h3>${esc(e.title)}</h3><p class="sub">${esc(e.subtitle)}</p><div class="card-tags"><span class="tag">1~5장 고르게</span><span class="tag">개념 중심</span><span class="tag">시간 제한 없음</span></div><div class="card-bottom"><span class="card-result">${last?`최근 ${s.percent}점${s.pending?' · 서술형 미확정':''}`:'아직 풀지 않았어요'}</span>${button(last?'다시 도전 →':'시험 시작 →','start','primary',`data-exam="${e.id}"`)}</div></article>`;
 }).join('')}</div></section><div class="notice">시험 후기를 참고한 창작 연습문제입니다. 문항당 5점, 서술형은 결과 2점 + 이유 3점입니다. 서술형 핵심어 채점은 잠정 결과이며, 제출 후 모범답안과 비교해 직접 점수를 확정할 수 있어요.</div><p class="privacy">기록은 이 브라우저에만 보관됩니다. 다른 기기와 동기화되지 않으며, 사이트 데이터 삭제·시크릿 모드 종료 시 사라질 수 있습니다. ‘학습 기록’에서 JSON 파일로 내보내기·가져오기가 가능합니다.</p>`;
}
function start(examId,ids,mode='exam'){
 if(state.draft){dialog('풀던 시험을 먼저 정리해 주세요.','<p>현재 답안을 유지한 채 이어서 풀거나, 현재 시험을 중단하고 새 시험을 시작할 수 있습니다. 중단하면 진행 중 답안이 삭제됩니다.</p>',button('계속 풀기','resume','primary')+button('중단하고 새로 시작','replace-draft','danger',`data-exam="${esc(examId)}" data-mode="${mode}"`));window.pendingStart={examId,ids,mode};return;}
 const exam=exams.find(e=>e.id===examId);state.draft={examId,title:mode==='review'?`오답 복습 · ${ids.length}문제`:mode==='chapter'?`${lookup[ids[0]].chapter}장 확인 문제 · ${ids.length}문제`:exam.title,mode,questionIds:[...ids],answers:{},flagged:[],index:0,startedAt:Date.now(),accumulatedMs:0,runningSince:Date.now()};save();go('exam');
}
function examView(){
 const d=state.draft;if(!d){go('home',false);return;}
 const q=lookup[d.questionIds[d.index]],a=d.answers[q.id]||{},done=d.questionIds.filter(id=>C.isAnswered(lookup[id],d.answers[id])).length;
 main.innerHTML=`<div class="section-head page-title"><div><div class="eyebrow">${d.mode==='review'?'WRONG ANSWER PRACTICE':d.mode==='chapter'?'CHAPTER PRACTICE':'MOCK EXAMINATION'}</div><h2>${esc(d.title)}</h2></div>${button('학습실로','home','text')}</div>
 <div class="mobile-progress"><span>진행 <span data-done>${done}/${d.questionIds.length}</span> · <b data-time>${fmt(C.elapsed(d))}</b></span><button data-action="pause">${d.runningSince?'일시정지':'계속 풀기'}</button></div>
 <div class="exam-layout">${!d.runningSince?`<div class="paused"><div class="eyebrow">TAKE A BREATH</div><h2>잠시 쉬어 가는 중이에요.</h2><p class="sub">타이머와 풀이를 일시정지했습니다. 답안은 유지됩니다.</p>${button('계속 풀기','pause','primary big')}</div>`:`<section class="question-card"><div class="q-meta"><span class="q-position">QUESTION ${String(d.index+1).padStart(2,'0')} / ${d.questionIds.length}</span><button class="flag-button ${d.flagged.includes(q.id)?'on':''}" data-action="flag" aria-pressed="${d.flagged.includes(q.id)}">${d.flagged.includes(q.id)?'◆ 표시됨':'◇ 나중에 보기'}</button></div><div class="q-info"><span class="tag">${q.chapter}장 · ${esc(q.topic)}</span><span class="tag ${q.type==='written'?'written':''}">${q.type==='mc'?'객관식':'서술형'} · 5점</span></div><h1 class="q-prompt" id="question-title" tabindex="-1">${esc(q.prompt)}</h1>${q.code?`<pre class="code"><code>${esc(q.code)}</code></pre>`:''}
 ${q.type==='mc'?`<div class="choices" role="radiogroup" aria-labelledby="question-title">${q.options.map((o,i)=>`<label class="choice"><input type="radio" name="choice" value="${i}" ${a.choice===i?'checked':''}><span class="choice-index">${i+1}</span><span>${esc(o)}</span></label>`).join('')}</div>`:`<label class="answer-field">결과 또는 가능 여부 <span class="mini">· 2점</span><input name="written-answer" maxlength="4000" placeholder="출력 결과, 예외 이름 또는 가능/불가능" value="${esc(a.answer||'')}"></label><label class="answer-field">그렇게 판단한 이유 <span class="mini">· 3점</span><textarea name="written-reason" rows="4" maxlength="10000" placeholder="핵심 개념을 포함해 1~3문장으로 설명해 보세요.">${esc(a.reason||'')}</textarea></label><p class="field-hint">이유는 핵심어로 1차 채점합니다. 제출 후 모범답안으로 점수를 조정할 수 있어요.</p>`}
 <div class="q-navigation">${button('← 이전','prev','',d.index===0?'disabled':'')}${q.type==='mc'?button('선택 지우기','clear-answer','text'):''}${d.index===d.questionIds.length-1?button('답안 제출 →','submit','primary'):button('다음 →','next','primary')}</div><p class="draft-status">${storageOK?'답안을 이 브라우저에 자동 저장합니다.':'현재 저장 불가 · 기록 내보내기를 이용해 주세요.'}</p></section>`}
 <aside class="exam-aside"><div class="side-card timer-side"><span class="timer-label">현재 소요 시간</span><div class="timer" data-time>${fmt(C.elapsed(d))}</div>${button(d.runningSince?'Ⅱ 일시정지':'▶ 계속 풀기','pause')}<p class="mini">시간 제한은 없습니다.<br>탭을 닫아도 시간은 흐릅니다. 쉬려면 일시정지를 눌러 주세요.</p></div><div class="side-card"><h3>문제 이동 <span class="mini">${done}/${d.questionIds.length}</span></h3><div class="progress"><i style="width:${done/d.questionIds.length*100}%"></i></div><div class="q-grid">${d.questionIds.map((id,i)=>`<button class="q-dot ${i===d.index?'current':''} ${C.isAnswered(lookup[id],d.answers[id])?'answered':''} ${d.flagged.includes(id)?'flagged':''}" data-action="jump" data-index="${i}" ${!d.runningSince?'disabled':''} aria-label="${i+1}번 ${C.isAnswered(lookup[id],d.answers[id])?'응답 완료':'미응답'}" ${i===d.index?'aria-current="step"':''}>${i+1}</button>`).join('')}</div><p class="legend">연두: 응답 완료 · 점: 나중에 보기</p>${button('답안 제출하기','submit','primary')}${button('진행 중 답안 내보내기','export','text')}</div></aside></div>`;
}
function submitPrompt(){const d=state.draft;if(!d)return;const count=d.questionIds.filter(id=>!C.isAnswered(lookup[id],d.answers[id])).length;dialog('답안을 제출할까요?',`<p>${count?`아직 <b>${count}문제</b>의 답안이 완성되지 않았습니다. 빈 항목은 0점으로 처리합니다.`:'모든 문제에 답했습니다.'}<br>제출하면 점수·정답·해설을 확인할 수 있습니다.</p>`,button('계속 풀기','close')+button('제출하고 채점','finish','primary'));}
function finish(){const d=state.draft;if(!d)return;const a={id:crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random()}`,examId:d.examId,title:d.title,mode:d.mode,questionIds:[...d.questionIds],answers:structuredClone(d.answers),duration:C.elapsed(d),finishedAt:Date.now()};state.attempts.push(a);state.attempts=state.attempts.slice(-200);state.draft=null;save();resultId=a.id;resultFilter='all';close();go('result');}
function resultView(){
 const a=state.attempts.find(a=>a.id===resultId);if(!a){go('stats',false);return;}
 const s=summary(a),wrong=s.rows.filter(r=>r.score<5).length;
 main.innerHTML=`<div class="eyebrow">ONE STEP CLOSER</div><section class="result-top"><div class="score-ring"><b>${s.percent}</b><small>${s.pending?'서술형 포함 잠정 점수':'최종 점수'} / 100</small></div><div><span class="pill">${a.mode==='review'?'오답 복습 완료':a.mode==='chapter'?'챕터 확인 완료':'모의고사 완료'}</span><h1>${esc(a.title)}</h1><p class="sub">${s.pending?`서술형 ${s.pending}문제는 아직 확정 전입니다. 아래 모범답안과 비교해 점수를 확정해 주세요.`:s.percent>=90?'개념이 단단해지고 있어요. 이유까지 말할 수 있는지 한 번 더 확인해 보세요.':'틀린 이유를 한 번 더 읽고, 오답만 골라 다시 도전해 보세요.'}</p><div class="result-meta"><span>정답 <b>${s.correct}/${a.questionIds.length}</b></span><span>획득 <b>${s.points}/${s.max}점</b></span><span>소요 <b>${fmt(a.duration)}</b></span><span>${date(a.finishedAt)}</span></div></div></section>
 <div class="toolbar">${button(`이번 오답 ${wrong}문제 다시 풀기`,'retry-result','primary',wrong?'':'disabled')}${button('학습 기록 보기','stats')}${button('기록 내보내기','export','text')}</div>
 ${s.pending?'<div class="notice">서술형 자동 채점은 결과 일치와 핵심어 포함 여부만 검사합니다. 문맥·부정 표현·동의어를 완벽하게 판단하지 못하므로, 이유를 읽고 0~5점으로 수정·확정해 주세요. 부분 점수도 점수에 반영되며 5점 미만은 오답 복습 대상으로 남습니다.</div>':''}
 <div class="filter-row">${[['all','전체 해설'],['wrong','오답·부분 정답'],['written','서술형 점수 확정']].map(([key,label])=>button(label,'result-filter',resultFilter===key?'selected':'',`data-filter="${key}"`)).join('')}</div>
 <div class="result-list">${s.rows.filter(r=>resultFilter==='all'||(resultFilter==='wrong'&&r.score<5)||(resultFilter==='written'&&lookup[r.id].type==='written')).map(r=>reviewItem(a,lookup[r.id],r)).join('')||'<div class="empty"><p>이 분류에 해당하는 문제가 없습니다.</p></div>'}</div>`;
}
function reviewItem(attempt,q,g){
 const a=attempt.answers[q.id]||{},idx=attempt.questionIds.indexOf(q.id)+1;
 const label=q.type==='written'&&!g.confirmed?'잠정':g.score===5?'정답':g.score>0?'부분 정답':'오답';
 return `<details class="review-item" ${q.type==='written'&&!g.confirmed?'open':''}><summary><span class="status ${g.score===5?'':g.score>0?'partial':'bad'}">${label}</span><span>${idx}. ${esc(q.prompt)}</span><b style="margin-left:auto;white-space:nowrap">${g.score} / 5</b></summary><div class="review-detail"><div class="q-info"><span class="tag">${q.chapter}장 · ${esc(q.topic)}</span></div>${q.code?`<pre class="code"><code>${esc(q.code)}</code></pre>`:''}
 ${q.type==='mc'?`<p><b>내 답:</b> ${Number.isInteger(a.choice)?`${a.choice+1}. ${esc(q.options[a.choice])}`:'미응답'}</p><p><b>정답:</b> ${q.correct+1}. ${esc(q.options[q.correct])}</p>`:`<p><b>내 결과:</b> ${esc(a.answer||'미응답')}</p><p style="white-space:pre-wrap"><b>내 이유:</b> ${esc(a.reason||'미응답')}</p>`}
 <div class="explanation"><b>${q.type==='mc'?'해설':'모범답안'}</b><br>${esc(q.explanation)}</div>
 ${q.type==='written'?`<div class="manual-score"><div>핵심어 1차 채점: 결과 ${g.outputOK?'2':'0'}/2점 · 이유 ${C.round(g.autoScore-(g.outputOK?2:0))}/3점</div><div class="mini">이유 기준: ${q.groups.map(group=>esc(group[0])).join(' + ')} (각 ${3/q.groups.length}점)</div><label for="manual-${q.id}">내가 확인한 점수 <input id="manual-${q.id}" type="number" min="0" max="5" step="0.5" value="${g.score}" aria-label="${idx}번 서술형 확정 점수"></label> ${button(g.confirmed?'점수 수정':'점수 확정','confirm-grade','',`data-question="${q.id}"`)} ${g.confirmed?'<span class="mini">확정 완료</span>':''}</div>`:''}<p class="source">복습 위치: ${esc(q.source)}</p>${button('이 장 개념 복습 →','related-concepts','text',`data-chapter="${q.chapter}"`)}</div></details>`;
}
function statsView(){
 const full=state.attempts.filter(a=>a.mode==='exam'),scores=full.map(a=>summary(a));
 main.innerHTML=`<div class="page-title"><div class="eyebrow">YOUR LEARNING JOURNAL</div><h1>조금씩 쌓이는 학습 기록</h1><p class="sub">정답률은 5점 만점인 문제의 비율입니다. 평균 점수에는 부분 점수가 반영됩니다.<br>서술형 미확정 결과는 잠정 수치이며, 오답·챕터 문제 풀이도 장별 누적 통계에 포함합니다.</p></div>
 <section class="stats-strip">${stat('전체 시험 응시',full.length,'회')}${stat('최고 점수',scores.length?Math.max(...scores.map(s=>s.percent)):'—','점')}${stat('평균 점수',scores.length?C.round(scores.reduce((n,s)=>n+s.percent,0)/scores.length):'—','점')}${stat('서술형 미확정',state.attempts.reduce((n,a)=>n+summary(a).pending,0),'문제')}</section>
 <h2>장별 누적 정답률</h2><section class="chapter-grid">${[1,2,3,4,5].map(ch=>{const rows=state.attempts.flatMap(a=>summary(a).rows).filter(r=>lookup[r.id].chapter===ch),correct=rows.filter(r=>r.score===5).length,pct=rows.length?Math.round(correct/rows.length*100):null;return `<article class="chapter-card"><h3>${ch}장</h3><strong>${pct===null?'—':pct+'%'}</strong><div class="mini">${chapterNames[ch]}<br>${correct} / ${rows.length}회 정답</div><div class="progress"><i style="width:${pct||0}%"></i></div></article>`;}).join('')}</section>
 <div class="section-head"><h2>응시 기록</h2><div class="toolbar">${button('내보내기','export')}${button('가져오기','import')}</div></div>
 ${state.attempts.length?`<div class="table-wrap"><table class="history-table"><thead><tr><th>날짜</th><th>시험</th><th>점수</th><th>정답</th><th>시간</th><th>상세</th></tr></thead><tbody>${[...state.attempts].reverse().map(a=>{const s=summary(a);return `<tr><td>${date(a.finishedAt)}</td><td>${esc(a.title)}${a.mode==='review'?' <span class="tag">복습</span>':a.mode==='chapter'?' <span class="tag">챕터</span>':''}</td><td><b>${s.percent}점</b>${s.pending?' <span class="mini">잠정</span>':''}</td><td>${s.correct}/${a.questionIds.length}</td><td>${fmt(a.duration)}</td><td>${button('해설','result','',`data-id="${esc(a.id)}"`)}</td></tr>`;}).join('')}</tbody></table></div>`:`<div class="empty"><div class="symbol">{ }</div><h3>첫 번째 기록을 만들어 보세요.</h3><p>시험을 제출하면 점수와 소요 시간이 여기에 쌓입니다.</p>${button('모의고사 선택','home','primary')}</div>`}
 <p class="privacy">이 브라우저에 최근 200개 풀이를 보관합니다. 기록 파일에는 답안과 서술형 점수가 포함됩니다. 가져오기는 현재 기록을 대체하므로 먼저 내보내기로 백업해 주세요. 다른 기기로 옮길 때도 같은 기능을 사용할 수 있습니다. 개념 학습 진도도 함께 보관합니다.</p><div class="toolbar">${button('모든 학습 기록 삭제','reset','danger text')}</div>`;
}
function reviewView(){
 const ids=C.latestWrong(state.attempts,lookup);
 main.innerHTML=`<div class="page-title"><div class="eyebrow">TURN MISTAKES INTO UNDERSTANDING</div><h1>틀린 문제는, 한 번 더.</h1><p class="sub">문제별 가장 최근 풀이에서 5점 미만인 문제를 모았습니다.<br>복습에서 만점을 받으면 목록에서 빠집니다. 아직 풀지 않은 문제는 포함하지 않습니다.</p></div>${ids.length?`<div class="notice resume"><div><strong>지금 다시 볼 문제 ${ids.length}개</strong>부분 정답과 빈 답안도 포함합니다. 서술형 잠정 채점에 따라 목록이 바뀔 수 있어요.</div>${button('오답만 다시 풀기 →','review-start','primary')}</div><div class="review-list">${ids.map(id=>{const q=lookup[id],e=exams.find(e=>e.questions.some(q=>q.id===id));return `<article class="wrong-card"><span class="tag">${q.chapter}장 · ${esc(q.topic)}</span><h3>${esc(q.prompt)}</h3><p>${esc(e.title)} · ${q.number}번 · ${q.type==='mc'?'객관식':'서술형'}</p></article>`;}).join('')}</div>`:`<div class="empty"><div class="symbol">✓</div><h3>${state.attempts.length?'남아 있는 오답이 없어요.':'아직 모인 오답이 없어요.'}</h3><p>모의고사를 풀고 제출하면 틀린 문제를 여기서 복습할 수 있습니다.</p>${button('모의고사 선택','home','primary')}</div>`}`;
}
function render(){if(route!=='learn')document.title='JAVA STUDY ROOM · 자바 중간고사 연습';header();({home,learn:()=>studyView.render(),exam:examView,result:resultView,stats:statsView,review:reviewView}[route]||home)();}
function pause(){const d=state.draft;if(!d)return;if(d.runningSince){d.accumulatedMs+=Math.max(0,Date.now()-d.runningSince);d.runningSince=null;}else d.runningSince=Date.now();save();render();}
function exportData(){const blob=new Blob([JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`java-study-record-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('학습 기록 파일을 내보냈습니다.');}
document.addEventListener('input',e=>{
 if(e.target.id==='concept-search'){studyView.search(e.target.value);return;}
 if(route!=='exam'||!state.draft||!state.draft.runningSince)return;
 const d=state.draft,id=d.questionIds[d.index],a=d.answers[id]||(d.answers[id]={});
 if(e.target.name==='choice')a.choice=Number(e.target.value);
 else if(e.target.name==='written-answer')a.answer=e.target.value;
 else if(e.target.name==='written-reason')a.reason=e.target.value;
 else return;
 save();const done=d.questionIds.filter(id=>C.isAnswered(lookup[id],d.answers[id])).length;
 document.querySelectorAll('.q-dot').forEach((dot,i)=>{const answered=C.isAnswered(lookup[d.questionIds[i]],d.answers[d.questionIds[i]]);dot.classList.toggle('answered',answered);dot.setAttribute('aria-label',`${i+1}번 ${answered?'응답 완료':'미응답'}`);});
 document.querySelectorAll('[data-done]').forEach(el=>el.textContent=`${done}/${d.questionIds.length}`);
 const prog=document.querySelector('.side-card .progress i');if(prog)prog.style.width=`${done/d.questionIds.length*100}%`;
 const label=document.querySelector('.side-card h3 .mini');if(label)label.textContent=`${done}/${d.questionIds.length}`;
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-action]');if(!b||b.disabled)return;const action=b.dataset.action;
 if(['home','stats','review'].includes(action)){go(action);return;}
 const d=state.draft;
 switch(action){
 case 'learn':if(!studyView.open()){studyView.readHash();showStudy();}break;
 case 'complete-section':studyView.toggle(b.dataset.section);break;
 case 'chapter-practice':{const chapter=Number(b.dataset.chapter),ids=Object.values(lookup).filter(q=>q.chapter===chapter).map(q=>q.id);if(ids.length)start(`chapter${chapter}`,ids,'chapter');break;}
 case 'related-concepts':if(!studyView.open(Number(b.dataset.chapter))){studyView.readHash();showStudy();}break;
 case 'close':close();break;
 case 'start':{const ex=exams.find(e=>e.id===b.dataset.exam);start(ex.id,ex.questions.map(q=>q.id));break;}
 case 'resume':close();go('exam');break;
 case 'replace-draft':{const pending=window.pendingStart;state.draft=null;close();start(pending.examId,pending.ids,pending.mode);break;}
 case 'pause':pause();break;
 case 'prev':case 'next':case 'jump':if(d&&d.runningSince){d.index=action==='prev'?Math.max(0,d.index-1):action==='next'?Math.min(d.questionIds.length-1,d.index+1):Number(b.dataset.index);save();render();document.querySelector('.q-prompt')?.focus();window.scrollTo({top:0,behavior:'instant'});}break;
 case 'flag':if(d){const id=d.questionIds[d.index];d.flagged=d.flagged.includes(id)?d.flagged.filter(x=>x!==id):[...d.flagged,id];save();render();}break;
 case 'clear-answer':if(d){delete d.answers[d.questionIds[d.index]];save();render();}break;
 case 'submit':submitPrompt();break;
 case 'finish':finish();break;
 case 'result':resultId=b.dataset.id;resultFilter='all';go('result');break;
 case 'result-filter':resultFilter=b.dataset.filter;render();break;
 case 'confirm-grade':{const a=state.attempts.find(a=>a.id===resultId),id=b.dataset.question,input=document.getElementById(`manual-${id}`);if(!a||input.value==='')return toast('0~5점 사이 점수를 입력해 주세요.');const score=Number(input.value);if(!Number.isFinite(score)||score<0||score>5||score*2%1!==0)return toast('0~5점 사이에서 0.5점 단위로 입력해 주세요.');a.answers[id]={...a.answers[id],manualScore:score};save();render();toast('서술형 점수를 확정했습니다.');break;}
 case 'retry-result':{const a=state.attempts.find(a=>a.id===resultId),ids=summary(a).rows.filter(r=>r.score<5).map(r=>r.id);if(ids.length)start(a.examId,ids,'review');break;}
 case 'review-start':{const ids=C.latestWrong(state.attempts,lookup);if(ids.length)start('wrong',ids,'review');break;}
 case 'export':exportData();break;
 case 'import':document.querySelector('#import-file').click();break;
 case 'apply-import':if(window.pendingImport){state=window.pendingImport;readFailed=false;save();close();go('stats');toast('기록을 가져왔습니다.');}break;
 case 'reset':dialog('학습 기록을 삭제할까요?','<p>이 사이트의 응시 기록과 진행 중 답안, 개념 학습 진도가 삭제됩니다. 다른 사이트의 데이터에는 영향을 주지 않습니다. 필요하면 먼저 기록을 내보내세요.</p>',button('취소','close')+button('모든 기록 삭제','reset-confirm','danger'));break;
 case 'reset-confirm':state=blank();readFailed=false;save();close();go('home');toast('학습 기록을 삭제했습니다.');break;
 case 'info':dialog('문제와 기록에 대해','<p>강의자료 1~5장과 제공된 시험 후기를 참고해 새로 작성한 80문제입니다. 실제 기출의 재현이나 출제 보장은 아닙니다. Java 10 강의 문법을 기준으로 합니다.</p><p>객관식은 4지선다, 서술형은 결과·이유를 적는 방식입니다. 문항당 5점이며, 서술형 자동 점수는 핵심어 기반 잠정 채점입니다. 모범답안을 보고 직접 확정할 수 있습니다.</p><p>답안·오답·점수·소요 시간은 이 브라우저의 로컬 저장소에만 보관하며 서버로 전송하지 않습니다. 다른 기기·브라우저·사이트 주소와 기록이 공유되지 않습니다. 사이트 데이터 삭제 시 기록도 지워집니다.</p><p>시간 제한은 없으며 명시적으로 일시정지하지 않으면 탭을 닫은 시간도 포함됩니다. 최근 200개 풀이를 보관하고 JSON 내보내기·가져오기를 지원합니다.</p>',button('확인','close','primary'));break;
 }
});
document.querySelector('#import-file').addEventListener('change',async e=>{const file=e.target.files[0];e.target.value='';if(!file)return;if(file.size>5*1024*1024)return toast('5MB 이하의 기록 파일만 가져올 수 있습니다.');try{window.pendingImport=C.validateState(JSON.parse(await file.text()),lookup);dialog('기록을 가져올까요?',`<p>가져올 풀이 기록은 ${window.pendingImport.attempts.length}개입니다. 현재 기록과 진행 중 답안, 개념 학습 진도가 가져온 내용으로 대체됩니다. 이전 버전의 백업 파일에는 개념 진도가 없습니다. 먼저 현재 기록을 내보내 백업하는 것을 권장합니다.</p>`,button('취소','close')+button('현재 기록 내보내기','export')+button('대체하여 가져오기','apply-import','primary'));}catch(err){toast(`가져오기 실패: ${err.message}`);}});
window.addEventListener('storage',e=>{if(e.key===KEY){warn('다른 탭에서 학습 기록이 변경되었습니다. 이 탭의 변경을 저장하려면 먼저 기록을 내보낸 뒤 새로고침해 주세요.');readFailed=true;}});
setInterval(()=>{if(state.draft)document.querySelectorAll('[data-time]').forEach(el=>el.textContent=fmt(C.elapsed(state.draft)));},1000);
window.addEventListener('hashchange',()=>{if(studyView.readHash())showStudy();else go('home');});
if(studyView.readHash())showStudy();else render();
})();
