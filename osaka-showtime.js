(() => {
  'use strict';
  const root=document.documentElement, key='osaka-appearance-v1', motionKey='osaka-motion-v1';
  const read=(k,fallback)=>{try{return localStorage.getItem(k)||fallback}catch{return fallback}};
  const write=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  root.dataset.look=read(key,'showtime')==='simple'?'simple':'showtime';
  root.dataset.motion=reduce.matches?'off':read(motionKey,'on');
  function boot(){
    const isTrip=!!document.getElementById('day8'); root.dataset.page=isTrip?'itinerary':'catalog';
    const header=document.querySelector('body>header');
    const controls=document.createElement('div');controls.className='show-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label','見た目と演出の切替');
    controls.innerHTML='<button type="button" data-appearance="showtime">大阪ネオン</button><button type="button" data-appearance="simple">シンプル</button><button type="button" class="motion-switch" aria-pressed="false">演出 ON</button>';
    header.append(controls);
    const hero=document.createElement('section');hero.className='osaka-extra show-hero';hero.setAttribute('aria-label','大阪旅行の表紙');
    hero.innerHTML=`<div class="show-orbit" aria-hidden="true"></div><div class="show-kicker"><span class="show-live-dot" aria-hidden="true"></span>YOUR OWN OSAKA ADVENTURE <span class="show-edition">2026 / PRIVATE EDITION</span></div><div class="show-main"><div class="show-copy"><div class="show-word" aria-hidden="true">OSAKA!</div><h1 class="show-title"><span class="show-outline">好奇心、てんこ盛り。</span>大阪を、遊び倒す。</h1><p>街の上へ。水の上へ。太古の世界へ。<br>寄り道までおいしい、欲張りな3日間。</p><div class="show-cta-row"><a class="show-cta" href="${isTrip?'#day6':'itinerary.html'}">${isTrip?'6日の旅をはじめる':'3日間の時間割へ'} <span aria-hidden="true">↗</span></a><a class="show-secondary" href="${isTrip?'#map':'#cards'}">${isTrip?'まずは地図をひらく':'写真から行き先を探す'}</a></div></div><div class="show-collage"><figure class="show-photo show-photo-main"><img src="assets/free-07.jpg" alt="道頓堀の川沿いに並ぶ夜の看板"><figcaption>01 / DOTONBORI — 水の都を、特等席で。</figcaption></figure><figure class="show-photo show-photo-sub"><img src="assets/free-18.jpg" alt="大阪城天守閣"><figcaption>02 / OSAKA CASTLE</figcaption></figure><figure class="show-photo show-photo-third"><img src="assets/free-36.jpg" alt="大阪市立自然史博物館"><figcaption>03 / NATURAL HISTORY</figcaption></figure><div class="show-neon" aria-hidden="true">大阪満喫</div><div class="show-stamp" aria-hidden="true"><small>GO BIG. GO OSAKA.</small>寄り道<br>大歓迎</div><span class="show-star" aria-hidden="true">✳</span><span class="show-star second" aria-hidden="true">✧</span></div></div><div class="show-hero-bottom"><div class="show-dates">10.06 <small>TUE</small> — 10.08 <small>THU</small></div><div class="show-bottom-note">6・7日は大阪周遊パス<br>8日は自然史と梅田のお店巡り</div><button class="show-hype" type="button">✦ 無駄に盛り上がる</button></div>`;
    document.querySelector('.hero').before(hero);
    const marquee=document.createElement('div');marquee.className='osaka-extra show-marquee';marquee.setAttribute('aria-hidden','true');
    const strip='UMEDA ↗ DOTONBORI ↗ OSAKA BAY ↗ SHINSEKAI ↗ NAGAI ↗ UMEDA ↗ まいど、おおきに！ ✦ ';
    marquee.innerHTML='<div class="show-marquee-track">'+Array.from({length:4},()=>'<span>'+strip+'</span>').join('')+'</div>';hero.after(marquee);
    const tickets=document.createElement('div');tickets.className='osaka-extra show-day-pass';tickets.setAttribute('aria-label','日別ショートカット');
    tickets.innerHTML=[['06','TUE','CITY & BAY','街と海、夜まで。','パス DAY 1'],['07','WED','CASTLE & TOWER','城から、新世界へ。','パス DAY 2'],['08','THU','NATURE & SHOPPING','自然史から、お店巡り。','自由に寄り道']].map(d=>`<a class="show-day-ticket" href="${isTrip?'':'itinerary.html'}#day${Number(d[0])}"><div class="ticket-top"><span>${d[2]}</span><span>${d[4]}</span></div><b>10.${d[0]}</b> <small>${d[1]}</small><span class="ticket-arrow" aria-hidden="true">↗</span><p>${d[3]}</p></a>`).join('');marquee.after(tickets);
    const progress=document.createElement('div');progress.className='osaka-extra show-scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
    const confetti=document.createElement('div');confetti.className='osaka-extra show-celebrate-layer';confetti.setAttribute('aria-hidden','true');document.body.append(confetti);
    const toast=document.createElement('div');toast.className='show-toast';toast.hidden=true;toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.append(toast);
    const dock=document.createElement('div');dock.className='look-dock';dock.setAttribute('aria-label','表示切替のショートカット');dock.innerHTML='<button class="dock-look" type="button"></button><button class="dock-motion" type="button"></button><button class="dock-top" type="button" aria-label="ページの先頭へ戻る">↑</button>';document.body.append(dock);
    dock.querySelector('.dock-look').onclick=()=>{root.dataset.look=root.dataset.look==='showtime'?'simple':'showtime';write(key,root.dataset.look);sync()};
    dock.querySelector('.dock-motion').onclick=()=>{root.dataset.motion=root.dataset.motion==='on'?'off':'on';write(motionKey,root.dataset.motion);sync()};
    dock.querySelector('.dock-top').onclick=()=>scrollTo({top:0,behavior:root.dataset.motion==='on'&&!reduce.matches?'smooth':'instant'});
    let cleanup=0, turn=0;
    function clearShow(){clearTimeout(cleanup);confetti.replaceChildren();toast.hidden=true;}
    function sync(){
      controls.querySelectorAll('[data-appearance]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.appearance===root.dataset.look)));
      const on=root.dataset.motion==='on'&&root.dataset.look==='showtime'&&!reduce.matches;
      controls.querySelector('.motion-switch').textContent=on?'演出 ON':'演出 OFF';
      controls.querySelector('.motion-switch').setAttribute('aria-pressed',String(on));
      controls.querySelector('.motion-switch').disabled=root.dataset.look==='simple'||reduce.matches;
      controls.querySelector('.motion-switch').title=reduce.matches?'端末の「動きを減らす」設定に合わせています':'大阪ネオンの見た目のまま、動きだけ切り替えます';
      hero.querySelector('.show-hype').disabled=!on;
      if(!on)clearShow();
      dock.querySelector('.dock-look').textContent=root.dataset.look==='showtime'?'シンプル表示に戻す':'ド派手表示にする';
      dock.querySelector('.dock-motion').textContent=on?'動きを止める':'動きをつける';dock.querySelector('.dock-motion').disabled=root.dataset.look==='simple'||reduce.matches;
      document.dispatchEvent(new CustomEvent('osaka:appearance',{detail:{look:root.dataset.look,motion:root.dataset.motion}}));
      // Leaflet listens for window resize; recalculate the existing map without changing its markers.
      requestAnimationFrame(()=>window.dispatchEvent(new Event('resize')));
    }
    controls.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.appearance){root.dataset.look=b.dataset.appearance;write(key,root.dataset.look);}else if(b.classList.contains('motion-switch')){root.dataset.motion=root.dataset.motion==='on'?'off':'on';write(motionKey,root.dataset.motion);}sync();});
    reduce.addEventListener('change',()=>{root.dataset.motion=reduce.matches?'off':read(motionKey,'on');sync();});
    hero.querySelector('.show-hype').addEventListener('click',()=>{
      if(root.dataset.look!=='showtime'||root.dataset.motion!=='on'||reduce.matches)return;clearShow();
      const lines=['まいど、おおきに！','好奇心、てんこ盛り！','寄り道こそ、ごちそう。'];
      toast.replaceChildren(document.createTextNode(lines[turn++%lines.length]));const sub=document.createElement('small');sub.textContent='とくに何も起こりません。気分だけ、大阪。';toast.append(sub);toast.hidden=false;
      const colors=['#ffdf65','#e9533d','#b4e8e6','#c6a3cf','#fff3d5'];
      for(let i=0;i<55;i++){const p=document.createElement('i');p.className='show-confetti';p.style.cssText=`--x:${Math.random()*100}%;--w:${5+Math.random()*7}px;--h:${8+Math.random()*13}px;--c:${colors[i%colors.length]};--t:${2.3+Math.random()*1.4}s;--delay:${Math.random()*.35}s;--r:${Math.random()*360}deg;--drift:${Math.random()*260-130}px`;confetti.append(p);}
      cleanup=setTimeout(clearShow,4200);
    });
    let ticking=false;function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.setProperty('--reading',`${max>0?100*scrollY/max:0}%`);ticking=false;}
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateProgress)}},{passive:true});
    addEventListener('resize',updateProgress,{passive:true});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)clearShow()});
    sync();updateProgress();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
