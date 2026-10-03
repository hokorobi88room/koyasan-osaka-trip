(()=>{
  const key='trip-ruby-mode-v1',valid=['all','hard','off'];
  let mode='hard';
  try{const saved=localStorage.getItem(key);if(valid.includes(saved))mode=saved;}catch{}
  document.documentElement.dataset.rubyMode=mode;
  function boot(){
    const buttons=Array.from(document.querySelectorAll('.ruby-toolbar button[data-ruby-mode]'));
    function apply(next){
      mode=next;document.documentElement.dataset.rubyMode=mode;
      buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.rubyMode===mode)));
      try{localStorage.setItem(key,mode);}catch{}
    }
    buttons.forEach(button=>button.addEventListener('click',()=>apply(button.dataset.rubyMode)));
    apply(mode);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
