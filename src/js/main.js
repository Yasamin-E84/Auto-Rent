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

// Testimonials functionality
(function () {
  const testimonials = [
    {
      id: 1,
      name: 'فاطمه ابراهیمی فر',
      date: '۲۷ دی ماه ۱۳۸۰',
      image: './src/img/testimonials/img-4.png',
      text: 'سرویس عالی و پشتیبانی 24 ساعته. خودروها تمیز و با کیفیت هستند. قیمت‌ها هم بسیار مناسب است.',
      rating: 4
    },
    {
      id: 2,
      name: 'فرزانه حیدری',
      date: '۲۷ دی ماه ۱۳۸۰',
      image: './src/img/testimonials/img-3.png',
      text: 'تجربه فوق‌العاده‌ای داشتم. کارمندان خیلی مهربان و حرفه‌ای هستند. حتماً دوباره استفاده می‌کنم.',
      rating: 5
    },
    {
      id: 3,
      name: 'محمد جواد امینی',
      date: '۲۷ دی ماه ۱۳۹۹',
      image: './src/img/testimonials/img-2.png',
      text: 'بهترین سرویس اجاره خودرو در تهران. خودروها جدید و ایمن هستند. توصیه می‌کنم.',
      rating: 4
    },
    {
      id: 4,
      name: 'اولدوز بهاور',
      date: '۲۷ دی ماه ۱۳۸۰',
      image: './src/img/testimonials/img-1.png',
      text: 'اتو رنت بهترین سرویس اجاره خودرو است که تا حالا استفاده کردم. پشتیبانی عالی، هزینه‌های مناسب و فرآیند اجاره و رزرو بسیار آسان. حتماً دوباره از این سرویس استفاده خواهم کرد.',
      rating: 4
    }
  ];

  function updateMainTestimonial(testimonial) {
    const mainProfileImg = document.getElementById('mainProfileImg');
    const mainName = document.getElementById('mainName');
    const mainTestimonialText = document.getElementById('mainTestimonialText');
    
    if (mainProfileImg) mainProfileImg.src = testimonial.image;
    if (mainProfileImg) mainProfileImg.alt = testimonial.name;
    if (mainName) mainName.textContent = testimonial.name;
    if (mainTestimonialText) mainTestimonialText.textContent = testimonial.text;
  }

  function updateActiveTab(activeId) {
    const tabs = document.querySelectorAll('.testimonial-tab');
    tabs.forEach(tab => {
      const tabId = parseInt(tab.getAttribute('data-testimonial'));
      const img = tab.querySelector('img');
      
      if (tabId === activeId) {
        tab.classList.remove('bg-white');
        tab.classList.add('bg-[#FDB713]');
        if (img) img.classList.remove('grayscale');
      } else {
        tab.classList.remove('bg-[#FDB713]');
        tab.classList.add('bg-white');
        if (img) img.classList.add('grayscale');
      }
    });
  }

  // Add click listeners to testimonial tabs
  document.querySelectorAll('.testimonial-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const testimonialId = parseInt(this.getAttribute('data-testimonial'));
      const testimonial = testimonials.find(t => t.id === testimonialId);
      
      if (testimonial) {
        updateMainTestimonial(testimonial);
        updateActiveTab(testimonialId);
      }
    });
  });
})();