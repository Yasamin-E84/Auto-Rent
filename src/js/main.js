

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

// hamburger
(function () {
  const btn = document.getElementById('navToggle');
  const menu = document.getElementById('mobileNav');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
})();
// hamburger rotate toggle
const navToggle = document.getElementById('navToggle');

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('rotate-90'); // Tailwind class for rotation
});

// theme mode buttons
 const THEME_KEY = 'theme'; // 'light' | 'dark'

  function applyTheme(mode) {
    localStorage.setItem(THEME_KEY, mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');

    // ✅ correct toggle logic now
    const showLight = mode === 'light'; // show the moon when light, sun when dark
    document.querySelectorAll('.js-dark').forEach(b => b.classList.toggle('hidden', !showLight)); // show 🌙 when light
    document.querySelectorAll('.js-light').forEach(b => b.classList.toggle('hidden', showLight));  // show ☀️ when dark
  }

  (function init() {
    const saved = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(saved);
  })();

  document.addEventListener('click', (e) => {
    if (e.target.closest('.js-dark'))  applyTheme('dark');  // 🌙 click → dark mode
    if (e.target.closest('.js-light')) applyTheme('light'); // ☀️ click → light mode
  });

   const root   = document.getElementById('priceDual');
  const minR   = document.getElementById('minR');
  const maxR   = document.getElementById('maxR');
  const minLbl = document.getElementById('minLabel');
  const maxLbl = document.getElementById('maxLabel');

  // constants
  const MIN = +minR.min, MAX = +minR.max, GAP = 1_000_000;
  const fa = new Intl.NumberFormat('fa-IR');

  const pct = v => ((v - MIN) / (MAX - MIN)) * 100 + '%';

  function update() {
    let a = +minR.value, b = +maxR.value;

    // keep handles from crossing
    if (b - a < GAP) {
      if (document.activeElement === minR) { a = b - GAP; minR.value = a; }
      else { b = a + GAP; maxR.value = b; }
    }

    // paint filled segment via CSS vars
    root.style.setProperty('--min', pct(+minR.value));
    root.style.setProperty('--max', pct(+maxR.value));

    // RTL labels like your screenshot
    maxLbl.textContent = `تا ${fa.format(+maxR.value)} تومان`;
    minLbl.textContent = `از ${fa.format(+minR.value)} تومان`;
  }

  ['input','change'].forEach(ev => {
    minR.addEventListener(ev, update);
    maxR.addEventListener(ev, update);
  });

  update(); // init


   function updateDualRange() {
    const minRange = document.getElementById('minRange');
    const maxRange = document.getElementById('maxRange');
    const fillTrack = document.getElementById('fillTrack');
    const minLabel = document.getElementById('minLabel');
    const maxLabel = document.getElementById('maxLabel');

    let minVal = parseInt(minRange.value);
    let maxVal = parseInt(maxRange.value);
    const minGap = 2000000;

    // Prevent overlap
    if (maxVal - minVal <= minGap) {
      if (event.target.id === 'minRange') minVal = maxVal - minGap;
      else maxVal = minVal + minGap;
    }

    // Update labels (formatted)
    minLabel.textContent = "از " + minVal.toLocaleString("fa-IR") + " تومان";
    maxLabel.textContent = "تا " + maxVal.toLocaleString("fa-IR") + " تومان";

    const rangeMin = parseInt(minRange.min);
    const rangeMax = parseInt(minRange.max);
    const percentMin = ((minVal - rangeMin) / (rangeMax - rangeMin)) * 100;
    const percentMax = ((maxVal - rangeMin) / (rangeMax - rangeMin)) * 100;

    // Update blue fill position
    fillTrack.style.left = percentMin + "%";
    fillTrack.style.width = (percentMax - percentMin) + "%";

    // Update values back to sliders
    minRange.value = minVal;
    maxRange.value = maxVal;
  }

  // Initialize once
  updateDualRange();
  