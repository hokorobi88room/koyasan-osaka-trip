(()=>{
const sections=[
 {title:'真言密教',text:'真言とは、仏の真実のことば。空海の教えは、世界を遠くから眺めるだけではなく、自分の身体・ことば・心を通して、仏のはたらきに触れようとします。阿字は、あらゆるものが独立した実体として生まれるのではないという「本不生」を表します。阿字観では、その一字を入口に、自分と世界の関係を観じます。'},
 {title:'高野山',text:'弘仁七年、八一六年。空海は修行の場として高野山を願い出ました。山々に囲まれた盆地に伽藍が営まれ、その空間は曼荼羅として受け止められてきました。仏像、柱、声、身振り。一つの説明文だけでは収まらない教えが、ここでは身体を包む場所になっています。'},
 {title:'弘法大師',text:'空海は唐に渡り、長安の青龍寺で恵果から密教を受け継ぎました。経典を学び、書を書き、寺を営み、教えを社会へ開いた人です。奥之院では、弘法大師が今も入定を続けるという信仰のもと、日々の食事を届ける生身供が営まれています。知ることと、行うこと。その二つを往復しながら、空海のことばを読みます。'}
];
const opener=document.querySelector('.story-open'),roll=document.querySelector('.story-scroll');if(!opener||!roll)return;
const prose=sections.map(s=>`<section><h2>${s.title}</h2><p>${s.text}</p></section>`).join('');roll.innerHTML=prose;
const dialog=document.createElement('dialog');dialog.className='story-dialog';dialog.setAttribute('aria-label','真言密教・高野山・弘法大師');dialog.innerHTML='<div class="story-dialog-head"><span>高野山を知る</span><button type="button" class="story-close" aria-label="解説を閉じる">閉じる ×</button></div><article>'+prose+'<nav class="story-sources" aria-label="解説の出典"><a href="https://www.koyasan.or.jp/shingonshu/" target="_blank" rel="noopener">金剛峯寺 · 真言宗の教え ↗</a><a href="https://www.koyasan.or.jp/k1200/" target="_blank" rel="noopener">高野山開創の歴史 ↗</a><a href="https://www.koyasan.or.jp/sp/column/" target="_blank" rel="noopener">奥之院と生身供 ↗</a></nav><a class="story-library" href="study.html">五つの記事を読む →</a></article>';document.body.append(dialog);
opener.addEventListener('click',()=>dialog.showModal());dialog.querySelector('.story-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
})();
