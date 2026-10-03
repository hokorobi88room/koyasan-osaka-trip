(()=>{
  const toc=document.querySelector('.reading-toc details');
  if(toc&&matchMedia('(max-width:950px)').matches)toc.open=false;
  const revealHash=()=>{
    if(!location.hash)return;
    let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
    const target=document.getElementById(id);if(!target)return;
    for(let el=target;el;el=el.parentElement)if(el.tagName==='DETAILS')el.open=true;
  };
  revealHash();window.addEventListener('hashchange',revealHash);
})();
