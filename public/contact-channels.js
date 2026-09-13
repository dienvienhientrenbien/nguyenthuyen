document.querySelectorAll('[data-contact-widget]').forEach(widget=>{const trigger=widget.querySelector('summary');widget.querySelector('[data-close-contact]').addEventListener('click',()=>{widget.open=false;trigger.focus()});widget.addEventListener('keydown',e=>{if(e.key==='Escape'){widget.open=false;trigger.focus()}});document.addEventListener('click',e=>{if(widget.open&&!widget.contains(e.target))widget.open=false});});

document.querySelectorAll('[data-copy-wechat]').forEach(button=>button.addEventListener('click',async()=>{const card=button.closest('[data-wechat]'),status=card.querySelector('[data-wechat-status]'),fallback=card.querySelector('[data-wechat-fallback]');try{await navigator.clipboard.writeText(button.dataset.value);fallback.hidden=true;status.textContent=button.dataset.success}catch{fallback.hidden=false;fallback.focus();fallback.select();status.textContent=button.dataset.failure}}));

(() => {
 const boundary=document.querySelector('[data-contact-boundary]'),widget=document.querySelector('.contact-slot .contact-widget');
 if(!boundary||!widget)return;
 const details=widget.querySelector('details'),trigger=widget.querySelector('summary'),header=document.querySelector('.header-wrap');
 let pending=false;
 const update=()=>{
  pending=false;
  const viewport=window.visualViewport,top=viewport?.offsetTop||0,bottom=top+(viewport?.height||window.innerHeight);
  const release=document.querySelector('.release-dock');
  const releaseTop=release&&getComputedStyle(release).position==='fixed'?release.getBoundingClientRect().top:bottom;
  const triggerBottom=Math.min(bottom-22,releaseTop-16);
  const slotPadding=parseFloat(getComputedStyle(widget.parentElement).paddingTop)||0;
  widget.classList.toggle('is-docked',boundary.getBoundingClientRect().bottom+slotPadding+trigger.getBoundingClientRect().height<=triggerBottom);
  const rect=trigger.getBoundingClientRect(),headerBottom=header?.getBoundingClientRect().bottom||0;
  const panelTop=Math.max(top+12,headerBottom+12);
  // Cap the panel at the actual space above its trigger, including a sticky header.
  widget.style.setProperty('--contact-panel-room',`${Math.max(0,Math.floor(rect.top-12-panelTop))}px`);
  // A footer trigger can scroll out of view; do not leave an orphaned panel open.
  if(details.open&&(rect.bottom<=panelTop||rect.top>=bottom))details.open=false;
 };
 const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(update)}};
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
 window.visualViewport?.addEventListener('resize',schedule);window.visualViewport?.addEventListener('scroll',schedule);
 details.addEventListener('toggle',schedule);
 const observer=new ResizeObserver(schedule);observer.observe(trigger);if(header)observer.observe(header);
 update();
})();
