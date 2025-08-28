(() => {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

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

  const nav = $('#nav');
  const btnNav = $('#btn-nav') || $('#btn-nav-2') || $('#btn-nav-3') || $('#btn-nav-4') || $('#btn-nav-5') || $('#btn-nav-6');
  if(btnNav){
    btnNav.addEventListener('click', () => {
      nav.classList.toggle('open');
      btnNav.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  const io = new IntersectionObserver((entries) => {
    for(const e of entries){
      if(e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    }
  }, {threshold: 0.12});
  $$('[data-animate]').forEach(el => io.observe(el));

  const btt = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 320) btt.style.display = 'block';
    else btt.style.display = 'none';
  });
  btt?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  const modal = $('#appointment-modal');
  const openAptButtons = $$('.btn[href="appointments.html"], .btn[href="#"]');
  const aptTriggers = $$('.btn').filter(b => b.textContent && b.textContent.toLowerCase().includes('appointment') || b.textContent.toLowerCase().includes('book'));
  $$('.btn').forEach(b => {
    if(b.href && b.href.indexOf('appointments.html')!==-1){
      b.addEventListener('click', (e)=> {
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

  const aptForm = document.getElementById('appointmentPageForm') || document.getElementById('apt-form');
  aptForm?.addEventListener('submit', (e) => {
    const name = aptForm.querySelector('[name="name"]');
    const phone = aptForm.querySelector('[name="phone"]');
    if(!name.value.trim() || !phone.value.trim()){
      e.preventDefault();
      alert('Please provide your name and phone number.');
    } else {
    }
  });

  const years = new Date().getFullYear();
  ['#year','#year2','#year3','#year4','#year5','#year6','#year7'].forEach(id => {
    const el = document.querySelector(id);
    if(el) el.textContent = years;
  });
})();

(function ensureBackToTop(){
  if (document.querySelector('.back-to-top')) return;

  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label','Back to top');
  btn.type = 'button';
  btn.innerText = '↑';
  btn.style.display = 'none';
  btn.style.opacity = '0';
  btn.style.transition = 'opacity 0.22s ease, transform 0.22s ease';

  document.body.appendChild(btn);

  const showAt = 320;
  function update() {
    if (window.scrollY > showAt) {
      btn.style.display = 'block';
      requestAnimationFrame(() => { btn.style.opacity = '1'; btn.style.transform = 'translateY(0)'; });
    } else {
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(6px)';
      setTimeout(()=> { if (btn.style.opacity === '0') btn.style.display = 'none'; }, 220);
    }
  }
  window.addEventListener('scroll', update, { passive: true });
  update();

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.__kimsu_backToTop = btn;
})();


(function() {
  const navToggleBtn = document.querySelector('.header .mobile-only');
  const navMenu = document.querySelector('.nav');

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', function() {
      navMenu.classList.toggle('nav-open');

      const icon = navToggleBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('nav-open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

})();