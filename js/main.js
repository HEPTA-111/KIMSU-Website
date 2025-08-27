// main.js
(() => {
  // DOM helpers
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // Theme (light/dark)
  const root = document.documentElement;
  const themeKey = 'kimsu_theme';
  function applyTheme(theme){
    if(theme === 'dark'){
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      document.body.removeAttribute('data-theme');
    }
  }
  const saved = localStorage.getItem(themeKey) || 'light';
  applyTheme(saved);
  $$('#btn-theme, #btn-theme-2, #btn-theme-3, #btn-theme-4, #btn-theme-5, #btn-theme-6').forEach(btn=>{
    btn?.addEventListener('click', () => {
      const cur = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
      const next = cur === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(themeKey, next);
    });
  });

  // Mobile nav toggle
  const nav = $('#nav');
  const btnNav = $('#btn-nav') || $('#btn-nav-2') || $('#btn-nav-3') || $('#btn-nav-4') || $('#btn-nav-5') || $('#btn-nav-6');
  if(btnNav){
    btnNav.addEventListener('click', () => {
      nav.classList.toggle('open');
      btnNav.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // Intersection observer for subtle reveal
  const io = new IntersectionObserver((entries) => {
    for(const e of entries){
      if(e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    }
  }, {threshold: 0.12});
  $$('[data-animate]').forEach(el => io.observe(el));

  // Back to top
  const btt = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 320) btt.style.display = 'block';
    else btt.style.display = 'none';
  });
  btt?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Modal (appointments)
  const modal = $('#appointment-modal');
  const openAptButtons = $$('.btn[href="appointments.html"], .btn[href="#"]'); // fallback
  const aptTriggers = $$('.btn').filter(b => b.textContent && b.textContent.toLowerCase().includes('appointment') || b.textContent.toLowerCase().includes('book'));
  // open when user clicks a "Book" button on page
  $$('.btn').forEach(b => {
    if(b.href && b.href.indexOf('appointments.html')!==-1){
      b.addEventListener('click', (e)=> {
        // let normal link work; on same-page open modal
        if(location.pathname.endsWith('index.html') || location.pathname.endsWith('/')) {
          e.preventDefault();
          openModal();
        }
      });
    }
  });
  function openModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  $$('.modal-close').forEach(b => b.addEventListener('click', closeModal));
  modal?.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeModal(); });

  // Basic form client validation (appointments page)
  const aptForm = document.getElementById('appointmentPageForm') || document.getElementById('apt-form');
  aptForm?.addEventListener('submit', (e) => {
    // basic required check
    const name = aptForm.querySelector('[name="name"]');
    const phone = aptForm.querySelector('[name="phone"]');
    if(!name.value.trim() || !phone.value.trim()){
      e.preventDefault();
      alert('Please provide your name and phone number.');
    } else {
      // allow submission (action should be configured)
      // optionally: show spinner or disable button
    }
  });

  // Fill year in footers
  const years = new Date().getFullYear();
  ['#year','#year2','#year3','#year4','#year5','#year6','#year7'].forEach(id => {
    const el = document.querySelector(id);
    if(el) el.textContent = years;
  });
})();
/* ---- Ensure back-to-top exists and wire behavior (add to js/main.js) ---- */
(function ensureBackToTop(){
  // if button already exists, we don't duplicate
  if (document.querySelector('.back-to-top')) return;

  // create button
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label','Back to top');
  btn.type = 'button';
  btn.innerText = '↑';
  // small initial hidden style for non-FOUC
  btn.style.display = 'none';
  btn.style.opacity = '0';
  btn.style.transition = 'opacity 0.22s ease, transform 0.22s ease';

  // append to body
  document.body.appendChild(btn);

  // show/hide on scroll
  const showAt = 320;
  function update() {
    if (window.scrollY > showAt) {
      btn.style.display = 'block';
      // small delay to allow display change
      requestAnimationFrame(() => { btn.style.opacity = '1'; btn.style.transform = 'translateY(0)'; });
    } else {
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(6px)';
      // hide after transition
      setTimeout(()=> { if (btn.style.opacity === '0') btn.style.display = 'none'; }, 220);
    }
  }
  window.addEventListener('scroll', update, { passive: true });
  // initial state
  update();

  // click -> smooth scroll to top
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // keyboard accessibility: show on focus within page via tabbing (optional)
  window.addEventListener('keyup', (e) => {
    if (e.key === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // expose for debugging
  window.__kimsu_backToTop = btn;
})();
