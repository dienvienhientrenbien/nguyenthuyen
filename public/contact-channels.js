document.querySelectorAll('[data-contact-widget]').forEach(widget=>{const trigger=widget.querySelector('summary');widget.querySelector('[data-close-contact]').addEventListener('click',()=>{widget.open=false;trigger.focus()});widget.addEventListener('keydown',e=>{if(e.key==='Escape'){widget.open=false;trigger.focus()}});document.addEventListener('click',e=>{if(widget.open&&!widget.contains(e.target))widget.open=false});});

document.querySelectorAll('[data-copy-wechat]').forEach(button=>button.addEventListener('click',async()=>{const card=button.closest('[data-wechat]'),status=card.querySelector('[data-wechat-status]'),fallback=card.querySelector('[data-wechat-fallback]');try{await navigator.clipboard.writeText(button.dataset.value);fallback.hidden=true;status.textContent=button.dataset.success}catch{fallback.hidden=false;fallback.focus();fallback.select();status.textContent=button.dataset.failure}}));

(() => {
 const boundary=document.querySelector('[data-contact-boundary]'),widget=document.querySelector('.contact-slot .contact-widget');
 if(!boundary||!widget)return;
 let pending=false;
 const update=()=>{pending=false;widget.classList.toggle('is-docked',boundary.getBoundingClientRect().top<window.innerHeight-30)};
 const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(update)}};
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);update();
})();
