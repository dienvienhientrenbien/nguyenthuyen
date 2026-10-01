/* Shared web behavior. Preferences and content stay local to each brand. */
(() => {
  const root = document.documentElement;
  const contentLanguage = document.getElementById('top')?.getAttribute('lang');
  if (contentLanguage) root.lang = contentLanguage;
  const header = document.querySelector('header');
  const headerDetails = [...document.querySelectorAll('header details')];
  const panelSelector = '.preferences-panel,.language-panel,.mobile-panel,.appearance-panel,nav,fieldset,.languages>div';
  function layout() {
    if (header) root.style.setProperty('--ds-header-clearance', `${Math.ceil(header.getBoundingClientRect().height) + 32}px`);
    const viewport = window.visualViewport;
    const bottom = (viewport?.offsetTop || 0) + (viewport?.height || innerHeight);
    for (const details of headerDetails.filter(d => d.open)) {
      const panel = details.querySelector(panelSelector);
      if (!panel) continue;
      details.style.setProperty('--ds-panel-room', `${Math.max(100, bottom - panel.getBoundingClientRect().top - 16)}px`);
    }
  }
  for (const details of headerDetails) details.addEventListener('toggle', () => {
    if (details.open) {
      for (const other of headerDetails) if (other !== details) other.open = false;
      layout();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = [...document.querySelectorAll('header details[open],details.release[open],details.version[open]')];
    for (const d of open) { d.open = false; d.querySelector('summary')?.focus(); }
  });
  document.addEventListener('click', e => {
    for (const d of headerDetails) if (d.open && !d.contains(e.target)) d.open = false;
    const anchor = e.target.closest?.('a');
    if (!anchor) return;
    // Language switches retain a section on the one-page studio without carrying arbitrary query data.
    if (anchor.closest('header .languages') && root.dataset.brand === 'duncanai' && location.hash) anchor.hash = location.hash;
  });
  for (const anchor of document.querySelectorAll('a[href]')) {
    const url = new URL(anchor.getAttribute('href'), location.href);
    if (['http:','https:'].includes(url.protocol) && url.origin !== location.origin) {
      anchor.target = '_blank'; anchor.rel = 'noopener noreferrer';
    }
  }
  const menu = document.querySelector('[data-menu]');
  document.querySelectorAll('#navigation a').forEach(a => a.addEventListener('click', () => menu?.setAttribute('aria-expanded','false')));
  document.addEventListener('visibilitychange', () => root.toggleAttribute('data-page-hidden', document.hidden));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.target.dataset.inView = String(e.isIntersecting)));
    document.querySelectorAll('.hero-display,.hero-art,.sound-study,.scene').forEach(el => observer.observe(el));
  }
  window.addEventListener('resize', layout, {passive:true});
  window.visualViewport?.addEventListener('resize', layout, {passive:true});
  if (header && 'ResizeObserver' in window) new ResizeObserver(layout).observe(header);
  layout();
})();
