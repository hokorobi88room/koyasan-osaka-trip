(() => {
 'use strict';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const stampKey='osaka-visited-v1';let visited={};try{visited=JSON.parse(localStorage.getItem(stampKey)||'{}')}catch{}
 if(!visited||Array.isArray(visited)||typeof visited!=='object')visited={};
 window.mountOsakaGuide=(host,id)=>{
  const g=window.OSAKA_GUIDES?.[String(id)];if(!g||host.dataset.mounted)return;host.dataset.mounted='true';
  host.innerHTML=`<details class="visit-guide"><summary><span class="guide-summary-icon" aria-hidden="true">✦</span><span>見どころ・へーポイント<small>概要 ／ 雑学 ／ おすすめ ／ メモ</small></span><span class="guide-plus" aria-hidden="true">＋</span></summary><div class="guide-content">${g.image?`<figure class="osaka-extra guide-photo"><img loading="lazy" src="${esc(g.image)}" alt="${esc(g.name)}"><figcaption>${esc(g.hook)}</figcaption></figure>${g.imageNote?`<small class="guide-image-credit">${esc(g.imageNote)}</small>`:''}`:''}<div class="guide-grid"><section><h4><i aria-hidden="true">01</i> 概要</h4><p>${esc(g.overview)}</p></section><section><h4><i aria-hidden="true">02</i> 雑学（へーポイント）</h4><p>${esc(g.trivia)}</p></section><section><h4><i aria-hidden="true">03</i> おすすめ（見逃さない！）</h4><ul>${g.tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><small>時間配分と回り方は、この旅程向けの提案です。</small></section><section><h4><i aria-hidden="true">04</i> その他メモ</h4><p>${esc(g.memo)}</p></section></div><div class="guide-sources"><b>確認元 · ${esc(g.checked)}</b>${g.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)} ↗</a>`).join('')}<small>口コミは過去の個人の感想。当日の営業・展示・空席を保証しません。</small></div></div></details>${String(id)!=='0'?`<div class="osaka-extra visit-stamp-tools"><button type="button" class="visit-stamp-button" data-stamp="${esc(id)}" aria-pressed="false">○ 行ったらスタンプ！</button></div>`:''}`;
  syncStamps();
 };
 function syncStamps(){document.querySelectorAll('[data-stamp]').forEach(b=>{const yes=!!visited[b.dataset.stamp];b.setAttribute('aria-pressed',String(yes));b.textContent=yes?'✓ 行った！ スタンプ済み':'○ 行ったらスタンプ！';b.closest('[data-visit-id]')?.classList.toggle('is-visited',yes)});const ids=Object.keys(window.OSAKA_GUIDES||{}).filter(x=>x!=='0');const n=ids.filter(x=>visited[x]).length;document.querySelectorAll('.stamp-score').forEach(e=>e.textContent=`${n} / ${ids.length} 候補訪問`)}
 function mount(){document.querySelectorAll('.guide-host[data-guide-id]').forEach(h=>window.mountOsakaGuide(h,h.dataset.guideId));}
 function boot(){
  mount();
  const score=document.createElement('div');score.className='osaka-extra stamp-passport';score.innerHTML='<div><small>MY OSAKA PASSPORT</small><b>思い出、スタンプにしとこ。</b><p>「行ったらスタンプ！」で訪問を記録。立寄り候補と特別展を含む19件。記録はこのブラウザだけに保存します。</p></div><strong class="stamp-score"></strong><button type="button" class="stamp-sound" aria-label="大阪気分のおみくじを引く">✦ 気分のおみくじ</button><span class="stamp-fortune" role="status" aria-live="polite"></span>';
  const target=document.querySelector('.layout')||document.querySelector('main');if(document.getElementById('day8'))target.before(score);
  let fortuneIndex=0;score.querySelector('.stamp-sound').onclick=()=>{const lines=['大吉！ 寄り道が主役になる予感。','超大吉！ 川の上に、へぇ〜が待ってる。','特大吉！ 今日も好奇心は満タン。','大吉！ 予定を変える自由も、お守り。'];score.querySelector('.stamp-fortune').textContent=lines[fortuneIndex++%lines.length]+'（ただの遊びです）'};
  document.addEventListener('click',e=>{const b=e.target.closest('[data-stamp]');if(!b)return;const id=b.dataset.stamp;visited[id]=!visited[id];try{localStorage.setItem(stampKey,JSON.stringify(visited))}catch{}syncStamps();});
  const modal=document.getElementById('detailBody');if(modal)new MutationObserver(mount).observe(modal,{childList:true});
  syncStamps();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
