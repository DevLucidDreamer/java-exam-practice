/* Chapter reading UI. The host app owns persistence and question practice. */
(function(root){
'use strict';
root.createStudyView=function({chapters,questions,getState,save,esc,button}){
 let chapterId=null,sectionId='',query='';
 const progress=()=>{const state=getState();if(!state.study)state.study={completed:[],lastChapter:1,lastSection:null};return state.study;};
 const completed=s=>progress().completed.includes(s.key);
 const count=c=>c.sections.filter(completed).length;
 const link=(ch,section='')=>`#learn/${ch}${section?'/'+section:''}`;
 const total=chapters.reduce((n,c)=>n+c.sections.length,0);
 function progressBar(c){return `<div class="study-progress-label"><span>학습 완료 <b data-chapter-progress="${c.id}">${count(c)} / ${c.sections.length}</b></span><span>${c.minutes}분 내외</span></div><div class="progress"><i data-chapter-bar="${c.id}" style="width:${count(c)/c.sections.length*100}%"></i></div>`;}
 function open(ch=null,section=''){
  const hash=ch?link(ch,section):'#learn';
  if(location.hash===hash)return false;
  location.hash=hash;return true;
 }
 function readHash(){
  const match=location.hash.match(/^#learn(?:\/([1-5]))?(?:\/([a-z0-9-]+))?$/);
  if(!match)return false;
  chapterId=match[1]?Number(match[1]):null;sectionId=match[2]||'';
  if(chapterId){const c=chapters.find(c=>c.id===chapterId);if(sectionId&&!c.sections.some(s=>s.id===sectionId))sectionId='';const p=progress();p.lastChapter=chapterId;p.lastSection=sectionId?`ch${chapterId}-${sectionId}`:null;save();}
  return true;
 }
 function renderHub(){
  const done=chapters.reduce((n,c)=>n+count(c),0),p=progress(),last=chapters.find(c=>c.id===p.lastChapter),lastSection=last.sections.find(s=>s.key===p.lastSection);
  return `<section class="study-hero"><div><div class="eyebrow">UNDERSTAND FIRST, PRACTICE NEXT</div><h1>시험 전에,<br>개념부터 차근차근.</h1><p class="sub">1~5장을 핵심 설명과 짧은 예제로 읽고,<br>내 말로 설명할 수 있는지 확인해 보세요.</p><div class="hero-meta"><span class="pill">5개 챕터 · ${total}개 개념</span><span class="pill outline">개념 → 예제 → 확인 질문</span></div></div><aside class="study-summary"><div class="eyebrow">MY STUDY PROGRESS</div><strong>${done}<small> / ${total}</small></strong><p>직접 완료 표시한 개념</p><div class="progress"><i style="width:${done/total*100}%"></i></div><a class="btn primary full-width" href="${link(last.id,lastSection?.id||'')}">${p.lastSection?'읽던 개념 이어 보기':'최근 챕터 열기'} →</a><span class="mini">${last.id}장 · ${esc(lastSection?.title||last.title)}</span></aside></section>
  <div class="study-search"><label for="concept-search">개념 찾기</label><input id="concept-search" type="search" placeholder="예: 생성자, 업캐스팅, 배열" value="${esc(query)}" maxlength="100" autocomplete="off"><span class="mini">제목·핵심어·설명으로 검색</span></div><div id="concept-search-results" aria-live="polite"></div>
  <div class="section-head"><h2>오늘 공부할 챕터를 골라 보세요</h2><span class="mini">읽은 뒤 ‘학습 완료’ 표시</span></div><div class="lesson-grid">${chapters.map(c=>`<article class="lesson-card"><div class="card-top"><span class="book-number">CHAPTER / 0${c.id}</span><span class="tag">${c.sections.length}개 개념</span></div><h2>${c.id}장. ${esc(c.title)}</h2><p class="sub">${esc(c.intro)}</p><div class="card-tags">${c.keywords.map(k=>`<span class="tag">${esc(k)}</span>`).join('')}</div>${progressBar(c)}<div class="card-bottom"><a class="btn primary" href="${link(c.id)}">개념 공부 →</a>${button('확인 문제','chapter-practice','text',`data-chapter="${c.id}"`)}</div></article>`).join('')}</div><p class="privacy">강의자료 1~5장과 Java 10 문법 기준으로 새로 정리한 학습 노트입니다. 읽기 시간은 대략적인 안내이며, 완료 표시는 시험 점수와 별개로 이 브라우저에 저장됩니다. 기록 내보내기·가져오기에 학습 진도도 포함됩니다.</p>`;
 }
 function table(t){return `<div class="concept-table-wrap"><table class="concept-table"><thead><tr>${t.headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(row=>`<tr>${row.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
 function section(s,i){return `<section id="concept-${s.key}" class="lesson-section ${completed(s)?'read':''}" tabindex="-1"><div class="concept-heading"><span class="concept-number">${String(i+1).padStart(2,'0')}</span><h2>${esc(s.title)}</h2></div><p class="concept-summary">${esc(s.summary)}</p>${(s.paragraphs||[]).map(p=>`<p>${esc(p)}</p>`).join('')}${s.bullets?`<ul>${s.bullets.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>`:''}${s.table?table(s.table):''}${s.code?`<pre class="code"><code>${esc(s.code)}</code></pre>`:''}${s.pitfall?`<aside class="concept-pitfall"><b>헷갈리지 않기</b><p>${esc(s.pitfall)}</p></aside>`:''}<details class="concept-check"><summary><span>스스로 확인</span>${esc(s.check.q)}</summary><p>${esc(s.check.a)}</p></details><div class="concept-bottom"><span class="source">복습 위치: ${esc(s.source)}${s.references?'<br>'+s.references.map(r=>`<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.label)} ↗</a>`).join(' · '):''}</span><button class="btn read-toggle ${completed(s)?'is-read':''}" data-action="complete-section" data-section="${s.key}" aria-pressed="${completed(s)}">${completed(s)?'✓ 학습 완료':'학습 완료 표시'}</button></div></section>`;}
 function renderChapter(){
  const c=chapters.find(c=>c.id===chapterId),ids=questions.filter(q=>q.chapter===c.id).map(q=>q.id);
  return `<div class="study-breadcrumb"><a href="#learn">개념 공부</a><span>/</span><span>${c.id}장</span></div><nav class="chapter-tabs" aria-label="챕터 선택">${chapters.map(ch=>`<a href="${link(ch.id)}" ${ch.id===c.id?'aria-current="page"':''}>${ch.id}장 <span>${esc(ch.title)}</span></a>`).join('')}</nav><div class="learning-layout"><aside class="lesson-toc"><div class="eyebrow">CHAPTER 0${c.id}</div><h2>${esc(c.title)}</h2>${progressBar(c)}<nav aria-label="${c.id}장 개념 목차">${c.sections.map((s,i)=>`<a href="${link(c.id,s.id)}" data-section-link="${s.key}" ${s.id===sectionId?'aria-current="location"':''}><span data-read-marker="${s.key}" class="${completed(s)?'checked':''}">${completed(s)?'✓':String(i+1).padStart(2,'0')}</span>${esc(s.title)}</a>`).join('')}</nav>${button(`이 장 확인 문제 ${ids.length}개 →`,'chapter-practice','primary full-width',`data-chapter="${c.id}"`)}<p class="mini">기존 모의고사의 관련 문제입니다.<br>전체 모의고사 점수와 별도로 기록합니다.</p></aside><article class="lesson-content"><header class="chapter-intro"><div class="eyebrow">READ · UNDERSTAND · RECALL</div><h1>${c.id}장. ${esc(c.title)}</h1><p class="sub">${esc(c.intro)}</p><div class="learning-goals"><b>이 장을 공부하고 나면</b><ul>${c.goals.map(g=>`<li>${esc(g)}</li>`).join('')}</ul></div></header>${c.sections.map(section).join('')}<section class="chapter-finish"><div class="eyebrow">PUT IT INTO PRACTICE</div><h2>개념을 문제로 확인해 볼까요?</h2><p class="sub">${c.id}장 문제 ${ids.length}개를 모았습니다. 학습 진도와 별도로 채점하고 풀이 기록을 남깁니다.</p><div class="toolbar">${button('이 챕터 문제 풀기 →','chapter-practice','primary',`data-chapter="${c.id}"`)}${c.id<5?`<a class="btn" href="${link(c.id+1)}">다음 장 공부 →</a>`:'<a class="btn" href="#learn">챕터 목록으로</a>'}</div></section></article></div>`;
 }
 function search(value){query=value;const el=document.querySelector('#concept-search-results');if(!el)return;const term=query.trim().toLocaleLowerCase();if(!term){el.innerHTML='';return;}
  const found=chapters.flatMap(c=>c.sections.map(s=>({c,s}))).filter(({c,s})=>[c.title,s.title,s.summary,...(s.paragraphs||[]),...(s.bullets||[]),s.code||'',...(s.table?.rows.flat()||[])].join(' ').toLocaleLowerCase().includes(term));
  el.innerHTML=`<section class="search-results"><p class="mini">검색 결과 ${found.length}개</p>${found.map(({c,s})=>`<a href="${link(c.id,s.id)}"><span class="tag">${c.id}장</span><span><b>${esc(s.title)}</b><small>${esc(s.summary)}</small></span><span aria-hidden="true">↗</span></a>`).join('')||'<p class="sub">일치하는 개념이 없습니다. 짧은 핵심어로 다시 검색해 보세요.</p>'}</section>`;
 }
 function render(){document.title=chapterId?`${chapterId}장 ${chapters.find(c=>c.id===chapterId).title} · JAVA STUDY ROOM`:'개념 공부 · JAVA STUDY ROOM';document.querySelector('#main').innerHTML=chapterId?renderChapter():renderHub();if(!chapterId)search(query);}
 function afterRender(){requestAnimationFrame(()=>{const target=chapterId&&sectionId?document.getElementById(`concept-ch${chapterId}-${sectionId}`):document.querySelector('#main');target?.focus({preventScroll:true});if(chapterId&&sectionId)target?.scrollIntoView({block:'start'});else window.scrollTo({top:0,behavior:'instant'});});}
 function toggle(key){const c=chapters.find(c=>c.sections.some(s=>s.key===key));if(!c)return;const p=progress(),isRead=p.completed.includes(key);p.completed=isRead?p.completed.filter(id=>id!==key):[...p.completed,key];p.lastChapter=c.id;p.lastSection=key;save();
  document.getElementById(`concept-${key}`)?.classList.toggle('read',!isRead);
  const b=document.querySelector(`[data-action="complete-section"][data-section="${key}"]`);if(b){b.textContent=!isRead?'✓ 학습 완료':'학습 완료 표시';b.setAttribute('aria-pressed',String(!isRead));b.classList.toggle('is-read',!isRead);}
  const marker=document.querySelector(`[data-read-marker="${key}"]`);if(marker){marker.textContent=!isRead?'✓':String(c.sections.findIndex(s=>s.key===key)+1).padStart(2,'0');marker.classList.toggle('checked',!isRead);}
  document.querySelectorAll(`[data-chapter-progress="${c.id}"]`).forEach(el=>el.textContent=`${count(c)} / ${c.sections.length}`);document.querySelectorAll(`[data-chapter-bar="${c.id}"]`).forEach(el=>el.style.width=`${count(c)/c.sections.length*100}%`);
 }
 return {open,readHash,render,afterRender,toggle,search};
};
})(window);
