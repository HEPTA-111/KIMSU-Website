/* js/cookies.js
   Lightweight cookie consent manager for KIMSU site.
   - Stores preferences in localStorage as 'kimsu_cookie_consent'
   - Exposes hooks: loadAnalytics(), loadMarketing()
   - Default: essential = true, analytics = false, marketing = false
*/

(function () {
  const STORAGE_KEY = 'kimsu_cookie_consent';
  const banner = document.getElementById('cookie-banner');
  const modal = document.getElementById('cookie-modal');

  const btnAccept = document.getElementById('cookie-accept');
  const btnReject = document.getElementById('cookie-reject');
  const btnPrefs = document.getElementById('cookie-preferences');

  const btnSave = document.getElementById('cookie-save');
  const btnAnalytics = document.getElementById('cookie-analytics');
  const btnMarketing = document.getElementById('cookie-marketing');

  const closeButtons = Array.from(document.querySelectorAll('.cookie-close'));

  // helper: read stored consent
  function getConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  // helper: write consent with timestamp
  function setConsent(obj) {
    const out = Object.assign({ essential: true, analytics: false, marketing: false }, obj || {});
    out.updated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(out));
    applyConsent(out);
    hideBanner();
  }

  // show banner
  function showBanner() {
    if (!banner) return;
    banner.setAttribute('aria-hidden', 'false');
    banner.style.display = 'block';
  }

  function hideBanner() {
    if (!banner) return;
    banner.setAttribute('aria-hidden', 'true');
    banner.style.display = 'none';
  }

  // show modal
  function showModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // set toggles to current consent
    const consent = getConsent() || { analytics: false, marketing: false };
    if (btnAnalytics) btnAnalytics.checked = !!consent.analytics;
    if (btnMarketing) btnMarketing.checked = !!consent.marketing;
    // focus for accessibility
    const focusEl = modal.querySelector('.modal-panel');
    if (focusEl) focusEl.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Apply consent: call loaders for allowed categories
  function applyConsent(consent) {
    // Essential always enabled (no-op)
    if (consent.analytics) {
      loadAnalytics();
    } else {
      disableAnalytics();
    }

    if (consent.marketing) {
      loadMarketing();
    } else {
      disableMarketing();
    }
  }

  // Placeholder functions — implement loading your trackers here
  // Example: insert script tags for Google Analytics / Matomo / Facebook Pixel etc.
  function loadAnalytics() {
    if (window._kimsu_analytics_loaded) return;
    window._kimsu_analytics_loaded = true;
    console.log('Cookie: enabling analytics (placeholder)');

    /* Example to load an analytics script (replace with real analytics tag):
    const s = document.createElement('script');
    s.src = 'https://example-analytics.com/analytics.js';
    s.async = true;
    document.head.appendChild(s);
    */
  }
  function disableAnalytics() {
    // If you added analytics scripts dynamically, remove them here
    // This is a best-effort placeholder (most analytics libraries do not provide simple removal)
    console.log('Cookie: analytics disabled.');
  }
  function loadMarketing() {
    if (window._kimsu_marketing_loaded) return;
    window._kimsu_marketing_loaded = true;
    console.log('Cookie: enabling marketing (placeholder)');
    // Insert marketing pixels or retargeting scripts here as above
  }
  function disableMarketing() {
    console.log('Cookie: marketing disabled.');
  }

  // wire up buttons
  if (btnAccept) {
    btnAccept.addEventListener('click', () => {
      setConsent({ analytics: true, marketing: true });
    });
  }
  if (btnReject) {
    btnReject.addEventListener('click', () => {
      setConsent({ analytics: false, marketing: false });
    });
  }
  if (btnPrefs) {
    btnPrefs.addEventListener('click', () => {
      showModal();
    });
  }
  if (btnSave) {
    btnSave.addEventListener('click', () => {
      const analytics = !!(btnAnalytics && btnAnalytics.checked);
      const marketing = !!(btnMarketing && btnMarketing.checked);
      setConsent({ analytics, marketing });
      closeModal();
    });
  }

  // modal close
  closeButtons.forEach(b => b.addEventListener('click', () => closeModal()));
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    const consent = getConsent();
    if (!consent) {
      // first-time visitor: show banner
      showBanner();
    } else {
      // apply existing preferences immediately
      applyConsent(consent);
      hideBanner();
    }
  });

  // Expose API for other scripts if needed
  window.KIMSU_Cookies = {
    getConsent,
    setConsent,
    showPreferences: showModal
  };
})();
