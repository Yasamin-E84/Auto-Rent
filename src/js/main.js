// Overlay open/close logic for global search
(function () {
  const openBtn = document.getElementById('openSearch');
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('globalSearch');
  const recentWrap = document.getElementById('recentChips');

  const STORAGE_KEY = 'ar_recent_searches_v1';
  const seedRecent = [
    'Tiggo 8 Pro',
    'پرشیا ELX سفید',
    'Rolls Royce Cullinan',
    'DS 3',
    'بنز S500',
  ];

  function getRecent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : seedRecent;
    } catch {
      return seedRecent;
    }
  }

  function setRecent(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 12)));
    } catch {}
  }

  function renderRecent() {
    if (!recentWrap) return;
    recentWrap.innerHTML = '';
    getRecent().forEach((term) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'px-4 py-2 rounded-full border border-[#E5E7EB] text-[#374151] bg-white hover:bg-gray-50';
      btn.textContent = term;
      btn.addEventListener('click', () => {
        input && (input.value = term);
        input && input.focus();
      });
      recentWrap.appendChild(btn);
    });
  }

  function addRecent(term) {
    const clean = term.trim();
    if (!clean) return;
    const list = getRecent();
    const next = [clean, ...list.filter((t) => t !== clean)];
    setRecent(next);
    renderRecent();
  }

  function openOverlay() {
    if (!overlay) return;
    overlay.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
    openBtn && openBtn.setAttribute('aria-expanded', 'true');
    window.setTimeout(() => input && input.focus(), 150);
    renderRecent();
  }

  function closeOverlay() {
    if (!overlay) return;
    overlay.classList.add('invisible', 'opacity-0', 'pointer-events-none');
    openBtn && openBtn.setAttribute('aria-expanded', 'false');
  }

  openBtn && openBtn.addEventListener('click', function (e) {
    e.preventDefault();
    openOverlay();
  });

  overlay && overlay.addEventListener('click', function (e) {
    const target = e.target;
    if (target === overlay || (target instanceof Element && target.closest('[data-close]'))) {
      closeOverlay();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeOverlay();
  });

  // Save on Enter
  input && input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      addRecent(input.value || '');
    }
  });
})();

(function () {
      const openBtn = document.getElementById('openSearch');
      const overlay = document.getElementById('searchOverlay');
      const input = document.getElementById('globalSearch');

      function openOverlay() {
        overlay.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
        openBtn?.setAttribute('aria-expanded', 'true');
        window.setTimeout(() => input?.focus(), 150);
      }

      function closeOverlay() {
        overlay.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        openBtn?.setAttribute('aria-expanded', 'false');
      }

      openBtn?.addEventListener('click', function (e) {
        e.preventDefault();
        openOverlay();
      });

      overlay?.addEventListener('click', function (e) {
        if (e.target === overlay || (e.target instanceof Element && e.target.closest('[data-close]'))) {
          closeOverlay();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeOverlay();
      });
    })();