/**
 * Bobby Kamal Aizan Portfolio - Main UI & Interactive Engine
 */

let typingTimer = null;
let currentExplorerIndex = 0;

const EXPLORER_DATA = [
  {
    id: "webqual",
    pillColor: "#ff9f0a",
    id_title: "WebQual 4.0 & Importance-Performance Analysis (IPA)",
    id_desc: "Metodologi evaluasi empiris kualitas website berstandar internasional. Mengukur 3 dimensi utama: Usability (Kemudahan Penggunaan), Information Quality (Kualitas Informasi), dan Service Interaction (Interaksi Layanan), yang dipetakan ke dalam matriks 4-Kuadran IPA untuk menentukan prioritas perbaikan fungsional dan estetika antarmuka.",
    en_title: "WebQual 4.0 & Importance-Performance Analysis (IPA)",
    en_desc: "International empirical website quality evaluation methodology assessing Usability, Information Quality, and Service Interaction dimensions. Mapped across a 4-Quadrant IPA matrix to isolate critical optimization bottlenecks and maintain institutional service benchmarks.",
    svgType: "webqual"
  },
  {
    id: "mvc",
    pillColor: "#2997ff",
    id_title: "Arsitektur MVC (Model-View-Controller) Modular",
    id_desc: "Penerapan pola rekayasa perangkat lunak terstruktur pada framework CodeIgniter dan Laravel. Memisahkan logika manipulasi database (Model), perenderan antarmuka pengguna (View), dan pemrosesan alur bisnis (Controller) demi keterbacaan kode, skalabilitas, dan kemudahan audit.",
    en_title: "Modular MVC (Model-View-Controller) Architecture",
    en_desc: "Structured software engineering pattern deployed on CodeIgniter and Laravel ecosystems. Isolates database manipulation models, dynamic UI rendering views, and business controllers to guarantee high maintainability and security standards.",
    svgType: "mvc"
  },
  {
    id: "database",
    pillColor: "#30d158",
    id_title: "Relational Database Schema & Normalisasi Data",
    id_desc: "Perancangan skema basis data relasional (MySQL / PostgreSQL) dengan normalisasi hingga Third Normal Form (3NF). Memastikan integritas referensial antar-tabel, pencegahan anomali data, serta penulisan query terindeks untuk efisiensi latensi sistem.",
    en_title: "Relational Database Schema & 3NF Normalization",
    en_desc: "Relational database schema modeling (MySQL / PostgreSQL) normalized to 3NF. Ensures strict foreign key integrity, eliminates update anomalies, and leverages indexed queries to maintain sub-second response times.",
    svgType: "database"
  },
  {
    id: "community",
    pillColor: "#af52de",
    id_title: "Digitalisasi Komunitas & Pemetaan Potensi Wisata",
    id_desc: "Strategi integrasi sistem informasi dan pemetaan geografis (GIS) untuk optimalisasi aset pariwisata pesisir serta sentra UMKM di Kelurahan Lamaru, Balikpapan Timur. Menerjemahkan kebutuhan riil masyarakat ke dalam platform informasi yang mudah diakses.",
    en_title: "Community Digitalization & Tourism GIS Mapping",
    en_desc: "Information systems integration and GIS spatial mapping to optimize coastal tourism assets and local MSME artisan hubs in Lamaru, East Kalimantan. Bridges grassroots community needs with accessible digital information pathways.",
    svgType: "community"
  },
  {
    id: "security",
    pillColor: "#ff2d55",
    id_title: "Keamanan Sistem & Validasi Input Berlapis",
    id_desc: "Penerapan pertahanan berlapis pada aplikasi web meliputi sanitasi input data untuk pencegahan SQL Injection dan XSS, kontrol akses berbasis peran (Role-Based Access Control / RBAC), serta manajemen sesi pengguna yang aman dan terenkripsi.",
    en_title: "Multi-Layered Web Security & Input Sanitization",
    en_desc: "Multi-tier defense mechanisms safeguarding web applications: parameterized input sanitization preventing SQLi/XSS, granular Role-Based Access Control (RBAC), and encrypted session token handling.",
    svgType: "security"
  }
];

/* ==========================================================================
   HUD FLOATING TOAST CONTROLLER
   ========================================================================== */
let toastTimeout = null;
function showHudToast(message, iconClass = 'bi-lamp-fill') {
  const toast = document.getElementById('hud-toast');
  if (!toast) return;

  toast.innerHTML = `<i class="bi ${iconClass} text-warning"></i><span>${message}</span>`;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

/* ==========================================================================
   1. THEME TOGGLE (APPLE PRO LIQUID DARK / CERAMIC PEARL)
   Circular Reveal Transition Originating from Button Position
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const mobileThemeIcon = document.getElementById('mobile-theme-icon');

  const savedTheme = localStorage.getItem('bobby-portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  let isTransitioning = false;

  async function toggleThemeAction(btn, event) {
    if (isTransitioning) return;
    isTransitioning = true;

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Calculate exact button center coordinates
    let x, y;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if (event && event.clientX) {
      x = event.clientX;
      y = event.clientY;
    } else {
      x = window.innerWidth / 2;
      y = 40;
    }

    // Maximum distance from button to the 4 viewport corners
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Tactile button micro-animation
    if (btn) {
      btn.classList.add('morphing', 'btn-theme-active-pulse');
    }

    const currentLang = localStorage.getItem('bobby-portfolio-lang') || 'id';
    const toastText = newTheme === 'light'
      ? (currentLang === 'en' ? 'Light Mode Active' : 'Mode Terang Aktif')
      : (currentLang === 'en' ? 'Dark Mode Active' : 'Mode Gelap Aktif');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsViewTransitions = typeof document.startViewTransition === 'function' && !prefersReducedMotion;

    if (supportsViewTransitions) {
      document.documentElement.classList.add('theme-transitioning');

      const transition = document.startViewTransition(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('bobby-portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
      });

      transition.ready.then(() => {
        try {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ];
          document.documentElement.animate(
            {
              clipPath: clipPath
            },
            {
              duration: 650,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: '::view-transition-new(root)'
            }
          );
        } catch (err) {
          // Graceful fallback if pseudoElement animate is unsupported
        }
      }).catch(() => { });

      try {
        await transition.finished;
      } catch (e) {
        // Handled: transition interrupted or cancelled
      } finally {
        document.documentElement.classList.remove('theme-transitioning');
        if (btn) btn.classList.remove('morphing', 'btn-theme-active-pulse');
        isTransitioning = false;
        showHudToast(toastText, newTheme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill');
      }
    } else {
      // Fallback for browsers without View Transitions API or when reduced motion is preferred
      if (prefersReducedMotion) {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('bobby-portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
        if (btn) btn.classList.remove('morphing', 'btn-theme-active-pulse');
        isTransitioning = false;
        showHudToast(toastText, newTheme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill');
        return;
      }

      // Smooth circular ripple overlay fallback
      const ripple = document.createElement('div');
      ripple.className = 'theme-fallback-ripple';
      const rippleSize = 12;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = `${rippleSize}px`;
      ripple.style.height = `${rippleSize}px`;
      ripple.style.backgroundColor = newTheme === 'light' ? '#f2f2f6' : '#030306';
      document.body.appendChild(ripple);

      // Trigger expansion animation
      ripple.getBoundingClientRect();
      const scaleMultiplier = (endRadius * 2.2) / rippleSize;
      ripple.style.transform = `translate(-50%, -50%) scale(${scaleMultiplier})`;

      setTimeout(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('bobby-portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
      }, 260);

      setTimeout(() => {
        ripple.style.opacity = '0';
        if (btn) btn.classList.remove('morphing', 'btn-theme-active-pulse');
        isTransitioning = false;
        showHudToast(toastText, newTheme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill');
        setTimeout(() => {
          if (ripple.parentNode) ripple.remove();
        }, 350);
      }, 650);
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => toggleThemeAction(themeToggleBtn, e));
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', (e) => toggleThemeAction(mobileThemeToggleBtn, e));
  }

  function updateThemeIcon(theme) {
    const isLight = theme === 'light';
    const iconClass = isLight ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
    const titleText = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';

    // Synchronize Dynamic Color-Scheme & Theme Color Meta Tags
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.setAttribute('content', isLight ? 'light' : 'dark');
    }
    const metaThemeColor = document.getElementById('theme-color-meta');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isLight ? '#f5f5f7' : '#0e0e16');
    }

    if (themeIcon) {
      themeIcon.className = iconClass;
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', titleText);
    }
    if (mobileThemeIcon) {
      mobileThemeIcon.className = iconClass;
      if (mobileThemeToggleBtn) mobileThemeToggleBtn.setAttribute('title', titleText);
    }
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'bobby-portfolio-theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
      document.documentElement.setAttribute('data-theme', e.newValue);
      updateThemeIcon(e.newValue);
    }
  });

  // Programmatic Theme Setter (Callable from CLI or external controls)
  window.setPortfolioTheme = function (targetTheme) {
    if (targetTheme !== 'dark' && targetTheme !== 'light') {
      const cur = document.documentElement.getAttribute('data-theme') || 'dark';
      targetTheme = cur === 'dark' ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('bobby-portfolio-theme', targetTheme);
    updateThemeIcon(targetTheme);
    return targetTheme;
  };
}

/* ==========================================================================
   1.5. NIGHT LIGHT / EYE COMFORT TOGGLE (WARM AMBER / TRUE TONE)
   ========================================================================== */
function initNightLightToggle() {
  const nightLightBtn = document.getElementById('nightlight-toggle-btn');
  const mobileNightLightBtn = document.getElementById('mobile-nightlight-toggle-btn');
  const nightLightIcon = document.getElementById('nightlight-icon');
  const mobileNightLightIcon = document.getElementById('mobile-nightlight-icon');

  const savedNightLight = localStorage.getItem('bobby-portfolio-nightlight') === 'true';
  applyNightLightState(savedNightLight, false);

  function toggleNightLightAction(btn) {
    const currentState = document.documentElement.getAttribute('data-night-light') === 'true';
    const newState = !currentState;

    if (btn) btn.classList.add('morphing');
    setTimeout(() => {
      applyNightLightState(newState, true);
      localStorage.setItem('bobby-portfolio-nightlight', newState ? 'true' : 'false');
      if (btn) btn.classList.remove('morphing');
    }, 150);
  }

  if (nightLightBtn) {
    nightLightBtn.addEventListener('click', () => toggleNightLightAction(nightLightBtn));
  }
  if (mobileNightLightBtn) {
    mobileNightLightBtn.addEventListener('click', () => toggleNightLightAction(mobileNightLightBtn));
  }

  function applyNightLightState(isActive, triggerToast = false) {
    if (isActive) {
      document.documentElement.setAttribute('data-night-light', 'true');
    } else {
      document.documentElement.removeAttribute('data-night-light');
    }

    const currentLang = localStorage.getItem('bobby-portfolio-lang') || 'id';
    const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[currentLang]) ? TRANSLATIONS[currentLang] : null;

    const iconClass = isActive ? 'bi bi-lamp-fill' : 'bi bi-lamp';
    const tooltip = isActive
      ? (dict?.nav_nightlight_on || (currentLang === 'en' ? 'Disable Night Light' : 'Matikan Night Light (Filter Layar Hangat)'))
      : (dict?.nav_nightlight_off || (currentLang === 'en' ? 'Enable Night Light' : 'Aktifkan Night Light (Mode Nyaman Mata)'));

    if (nightLightBtn) {
      nightLightBtn.classList.toggle('nightlight-active', isActive);
      nightLightBtn.setAttribute('title', tooltip);
    }
    if (mobileNightLightBtn) {
      mobileNightLightBtn.classList.toggle('nightlight-active', isActive);
      mobileNightLightBtn.setAttribute('title', tooltip);
    }

    if (nightLightIcon) nightLightIcon.className = iconClass;
    if (mobileNightLightIcon) mobileNightLightIcon.className = iconClass;

    if (triggerToast) {
      const toastText = isActive
        ? (dict?.toast_nightlight_on || (currentLang === 'en' ? 'Night Light Mode Active' : 'Mode Night Light Aktif'))
        : (dict?.toast_nightlight_off || (currentLang === 'en' ? 'Standard Mode Restored' : 'Mode Standar Dikembalikan'));
      showHudToast(toastText, isActive ? 'bi-lamp-fill' : 'bi-lamp');
    }
  }
}

/* ==========================================================================
   1.6. ADAPTIVE 60 FPS PERFORMANCE ENGINE (FOR ENTRY-LEVEL HARDWARE)
   ========================================================================== */
function initPerformanceEngine() {
  const perfBtn = document.getElementById('perf-toggle-btn');
  const mobilePerfBtn = document.getElementById('mobile-perf-toggle-btn');
  const perfIcon = document.getElementById('perf-icon');
  const mobilePerfIcon = document.getElementById('mobile-perf-icon');

  const savedPerf = localStorage.getItem('bobby-portfolio-perf');

  // Auto-detect entry-level hardware: 4 or fewer CPU threads, or low RAM <= 4GB
  const isEntryLevelDevice = (typeof navigator !== 'undefined') && (
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4)
  );

  // Default to performance mode on entry-level hardware unless user manually changed it
  const initialPerfState = savedPerf !== null ? (savedPerf === 'true') : isEntryLevelDevice;
  applyPerfState(initialPerfState, false);

  function togglePerfAction(btn) {
    const currentState = document.documentElement.getAttribute('data-perf-mode') === 'true';
    const newState = !currentState;

    if (btn) btn.classList.add('morphing');
    setTimeout(() => {
      applyPerfState(newState, true);
      localStorage.setItem('bobby-portfolio-perf', newState ? 'true' : 'false');
      if (btn) btn.classList.remove('morphing');
    }, 150);
  }

  if (perfBtn) {
    perfBtn.addEventListener('click', () => togglePerfAction(perfBtn));
  }
  if (mobilePerfBtn) {
    mobilePerfBtn.addEventListener('click', () => togglePerfAction(mobilePerfBtn));
  }

  function applyPerfState(isActive, triggerToast = false) {
    if (isActive) {
      document.documentElement.setAttribute('data-perf-mode', 'true');
    } else {
      document.documentElement.removeAttribute('data-perf-mode');
    }

    const currentLang = localStorage.getItem('bobby-portfolio-lang') || 'id';
    const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[currentLang]) ? TRANSLATIONS[currentLang] : null;

    const iconClass = isActive ? 'bi bi-lightning-charge-fill' : 'bi bi-speedometer2';
    const tooltip = isActive
      ? (dict?.nav_perf_on || (currentLang === 'en' ? 'Disable Performance Mode' : 'Matikan Mode Performa'))
      : (dict?.nav_perf_off || (currentLang === 'en' ? 'Performance Mode' : 'Mode Performa'));

    if (perfBtn) {
      perfBtn.classList.toggle('perf-active', isActive);
      perfBtn.setAttribute('title', tooltip);
    }
    if (mobilePerfBtn) {
      mobilePerfBtn.classList.toggle('perf-active', isActive);
      mobilePerfBtn.setAttribute('title', tooltip);
    }

    if (perfIcon) perfIcon.className = iconClass;
    if (mobilePerfIcon) mobilePerfIcon.className = iconClass;

    if (triggerToast) {
      const toastText = isActive
        ? (dict?.toast_perf_on || (currentLang === 'en' ? 'Performance Mode Active' : '⚡ Mode Performa Aktif'))
        : (dict?.toast_perf_off || (currentLang === 'en' ? 'Full Visual Mode Active' : '✨ Mode Visual Lengkap Aktif'));
      showHudToast(toastText, isActive ? 'bi-lightning-charge-fill' : 'bi-speedometer2');
    }
  }

  // Programmatic Performance Setter (Callable from CLI or external controls)
  window.setPortfolioPerfMode = function (targetState, triggerToast = true) {
    if (typeof targetState !== 'boolean') {
      const cur = document.documentElement.getAttribute('data-perf-mode') === 'true';
      targetState = !cur;
    }
    applyPerfState(targetState, triggerToast);
    localStorage.setItem('bobby-portfolio-perf', targetState ? 'true' : 'false');
    return targetState;
  };
}

/* ==========================================================================
   2. INTERACTIVE LIQUID BACKGROUND (FRAME-RATE INDEPENDENT & IDLE-AWARE)
   ========================================================================== */
function initInteractiveBackground() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const orbLayers = document.querySelectorAll('.liquid-orb-layer');
  const titaniumGlow = document.getElementById('ambient-titanium-glow');
  if (!orbLayers.length) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let scrollY = window.scrollY || 0;
  let currentScrollY = scrollY;
  let isAnimating = false;
  let lastTimestamp = performance.now();

  const layerPhysics = [
    { factorX: 0.08, factorY: 0.07 },
    { factorX: -0.09, factorY: 0.08 },
    { factorX: 0.07, factorY: -0.09 },
    { factorX: -0.06, factorY: -0.07 },
    { factorX: 0.1, factorY: 0.08 }
  ];

  // Pronounced multi-plane vertical parallax drift rates per orb layer
  const layerScrollFactors = [-0.38, -0.52, -0.42, -0.22, -0.14];

  function animateFluidLayers(now) {
    if (document.hidden || document.documentElement.getAttribute('data-perf-mode') === 'true') {
      isAnimating = false;
      return;
    }

    const deltaMs = now - lastTimestamp;
    lastTimestamp = now;
    // Normalize to 60fps timebase (~16.67ms) so physics feel identical on 60/90/120/144Hz displays
    const dt = Math.min(deltaMs / 16.67, 2.5);
    const lerpFactor = 1 - Math.pow(1 - 0.08, dt);

    currentX += (mouseX - currentX) * lerpFactor;
    currentY += (mouseY - currentY) * lerpFactor;
    currentScrollY += (scrollY - currentScrollY) * lerpFactor;

    const deltaX = (currentX - window.innerWidth / 2);
    const deltaY = (currentY - window.innerHeight / 2);

    orbLayers.forEach((layer, index) => {
      const phys = layerPhysics[index % layerPhysics.length];
      const sFactor = layerScrollFactors[index % layerScrollFactors.length];
      const moveX = (deltaX * phys.factorX).toFixed(2);
      const moveY = (deltaY * phys.factorY + currentScrollY * sFactor).toFixed(2);
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    if (titaniumGlow) {
      const glowX = (deltaX * 0.015).toFixed(2);
      const glowY = (deltaY * 0.02 + currentScrollY * -0.05).toFixed(2);
      titaniumGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    }

    // Stop RAF loop when settled to save CPU/GPU cycles
    const isMouseSettled = Math.abs(mouseX - currentX) < 0.08 && Math.abs(mouseY - currentY) < 0.08;
    const isScrollSettled = Math.abs(scrollY - currentScrollY) < 0.5;
    if (!isMouseSettled || !isScrollSettled) {
      requestAnimationFrame(animateFluidLayers);
    } else {
      isAnimating = false;
    }
  }

  window.addEventListener('mousemove', (e) => {
    if (document.documentElement.getAttribute('data-perf-mode') === 'true') return;
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isAnimating) {
      isAnimating = true;
      lastTimestamp = performance.now();
      requestAnimationFrame(animateFluidLayers);
    }
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (document.documentElement.getAttribute('data-perf-mode') === 'true') return;
    scrollY = window.scrollY || 0;

    if (!isAnimating) {
      isAnimating = true;
      lastTimestamp = performance.now();
      requestAnimationFrame(animateFluidLayers);
    }
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isAnimating = false;
    }
  });
}

/* ==========================================================================
   3. HIGH-PERFORMANCE UNIFIED SCROLL ARCHITECTURE (ZERO LAYOUT THRASHING)
   Consolidates Progress Bar, Navbar Spy, Dynamic Island, and Back-to-Top
   ========================================================================== */
let sectionOffsetCache = [];
let scrollTicking = false;

function cacheSectionPositions() {
  const sections = document.querySelectorAll('section[id]');
  sectionOffsetCache = Array.from(sections).map(sec => ({
    id: sec.getAttribute('id'),
    top: sec.offsetTop,
    height: sec.offsetHeight
  }));
}

function updateNavMorphPill(targetItem = null) {
  const pill = document.getElementById('nav-morph-pill');
  const container = document.querySelector('.nav-links-desktop');
  if (!pill || !container) return;

  const target = targetItem || container.querySelector('.nav-link-item.active') || container.querySelector('.nav-link-item');
  if (!target) return;

  const offsetLeft = target.offsetLeft;
  const width = target.offsetWidth;

  if (width > 0) {
    pill.style.opacity = '1';
    pill.style.transform = `translateX(${offsetLeft}px)`;
    pill.style.width = `${width}px`;
  }
}

function initUnifiedScrollManager() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const allNavLinks = document.querySelectorAll('.nav-links-desktop .nav-link-item, #mobile-drawer .nav-link-item');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = reducedMotionQuery.matches;
  if (typeof reducedMotionQuery.addEventListener === 'function') {
    reducedMotionQuery.addEventListener('change', (e) => {
      prefersReducedMotion = e.matches;
    });
  }

  let lastScrollY = window.scrollY || 0;
  let lastScrollTime = performance.now();
  let smoothVelocity = 0;
  let tiltResetTimeout = null;

  cacheSectionPositions();

  // Debounced cache recalculation on resize/orientation changes
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      cacheSectionPositions();
      updateNavMorphPill();
    }, 120);
  }, { passive: true });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      cacheSectionPositions();
      updateNavMorphPill();
    });
  }

  function handleScrollTick() {
    const scrollY = window.scrollY;

    // 1. Reading Progress Bar
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        progressBar.style.width = `${progress}%`;
      }
    }

    // 3. Back to Top Button
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // 4. Multi-Plane Layered Parallax Engine (Desktop Multi-Plane Depth)
    const isPerf = document.documentElement.getAttribute('data-perf-mode') === 'true';
    const isMobileLayout = window.innerWidth <= 991;

    if (!prefersReducedMotion && !isPerf && !isMobileLayout) {
      // Calculate instantaneous and smoothed scroll velocity (px/ms)
      const now = performance.now();
      const dt = Math.max(10, now - lastScrollTime);
      const instantVelocity = (scrollY - lastScrollY) / dt;
      smoothVelocity += (instantVelocity - smoothVelocity) * 0.18;
      lastScrollY = scrollY;
      lastScrollTime = now;

      // Dynamic velocity pitch tilt (subtle momentum physical response)
      const tiltDeg = Math.max(-2.5, Math.min(2.5, smoothVelocity * 1.8));
      document.documentElement.style.setProperty('--scroll-velocity-tilt', `${tiltDeg.toFixed(2)}deg`);

      // Damping return to neutral 0deg when scroll pauses
      clearTimeout(tiltResetTimeout);
      tiltResetTimeout = setTimeout(() => {
        smoothVelocity = 0;
        document.documentElement.style.setProperty('--scroll-velocity-tilt', '0deg');
      }, 120);

      // Hero Text Spatial Departure (subtle scale & fade as user descends into the page)
      if (scrollY < 750) {
        const departureRatio = Math.min(1, scrollY / 650);
        const heroTextY = (scrollY * -0.09).toFixed(1);
        const heroTextScale = (1 - departureRatio * 0.04).toFixed(3);
        const heroTextOpacity = (1 - departureRatio * 0.45).toFixed(2);
        document.documentElement.style.setProperty('--hero-text-y', `${heroTextY}px`);
        document.documentElement.style.setProperty('--hero-text-scale', heroTextScale);
        document.documentElement.style.setProperty('--hero-text-opacity', heroTextOpacity);
      }

      // Smooth float lag for Hero Terminal (up to -70px on desktop)
      const terminalY = Math.max(-70, Math.min(20, scrollY * -0.10));
      document.documentElement.style.setProperty('--parallax-scroll-terminal', `${terminalY.toFixed(1)}px`);

      // Gentle elevated stats dock glide (max -20px on desktop, preventing any collision)
      const statsY = Math.max(-20, Math.min(10, (scrollY - 100) * -0.04));
      document.documentElement.style.setProperty('--parallax-scroll-stats', `${statsY.toFixed(1)}px`);

      // Multi-plane stagger for alternating cards on desktop (-32px to +32px)
      const stagger1 = Math.max(-32, Math.min(32, Math.sin(scrollY * 0.0022) * 28));
      const stagger2 = Math.max(-32, Math.min(32, -Math.sin(scrollY * 0.0022) * 28));
      document.documentElement.style.setProperty('--parallax-scroll-stagger-1', `${stagger1.toFixed(1)}px`);
      document.documentElement.style.setProperty('--parallax-scroll-stagger-2', `${stagger2.toFixed(1)}px`);
    }

    // 5. Navbar ScrollSpy using Cached Offsets (No synchronous DOM layout reading)
    const spyPosition = scrollY + 220;
    let activeSectionId = 'hero';

    for (let i = 0; i < sectionOffsetCache.length; i++) {
      const sec = sectionOffsetCache[i];
      if (spyPosition >= sec.top && spyPosition < sec.top + sec.height) {
        activeSectionId = sec.id;
        break;
      }
    }

    if (activeSectionId) {
      let navChanged = false;
      allNavLinks.forEach(link => {
        const isMatch = link.getAttribute('href') === `#${activeSectionId}`;
        if (isMatch && !link.classList.contains('active')) {
          navChanged = true;
        }
        link.classList.toggle('active', isMatch);
      });

      if (navChanged) {
        updateNavMorphPill();
      }
    }

    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(handleScrollTick);
    }
  }, { passive: true });

  // Initial trigger
  handleScrollTick();
}

/* ==========================================================================
   4. DESKTOP NAVBAR PILL INTERACTION
   ========================================================================== */
function initNavbarInteractions() {
  const desktopContainer = document.querySelector('.nav-links-desktop');
  if (!desktopContainer) return;

  const desktopLinks = desktopContainer.querySelectorAll('.nav-link-item');

  setTimeout(updateNavMorphPill, 100);

  desktopLinks.forEach(link => {
    link.addEventListener('mouseenter', () => updateNavMorphPill(link));
    link.addEventListener('click', () => {
      desktopLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      updateNavMorphPill(link);
    });
  });

  desktopContainer.addEventListener('mouseleave', () => updateNavMorphPill());
}

/* ==========================================================================
   5. DYNAMIC TYPING EFFECT
   ========================================================================== */
function initDynamicTyping() {
  const typingElement = document.getElementById('typing-role');
  if (!typingElement) return;

  if (typingTimer) clearTimeout(typingTimer);

  const roles = (typeof getTranslation === 'function' && typeof TRANSLATIONS !== 'undefined')
    ? (TRANSLATIONS[currentLanguage]?.typing_roles || TRANSLATIONS['id'].typing_roles)
    : [
      "Administrasi Transportasi",
      "Manajemen Data & Arsip",
      "Sistem Informasi ITK",
      "Penyusunan SOP & Kepatuhan",
      "Microsoft Office & Analisis"
    ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1600; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    typingTimer = setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   6. AMBIENT CURSOR GLOW FOLLOWER (TRANSLATE3D GPU ACCELERATED)
   ========================================================================== */
function initAmbientCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  if (window.matchMedia("(pointer: fine)").matches) {
    let glowVisible = false;
    let glowRafScheduled = false;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      if (document.hidden || document.documentElement.getAttribute('data-perf-mode') === 'true') {
        if (glowVisible) {
          glow.style.opacity = '0';
          glowVisible = false;
        }
        return;
      }
      targetX = e.clientX - 210;
      targetY = e.clientY - 210;

      if (!glowRafScheduled) {
        glowRafScheduled = true;
        requestAnimationFrame(() => {
          glow.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
          if (!glowVisible) {
            glow.style.opacity = '1';
            glowVisible = true;
          }
          glowRafScheduled = false;
        });
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
      glowVisible = false;
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        glow.style.opacity = '0';
        glowVisible = false;
      }
    });
  } else {
    glow.style.display = 'none';
  }
}

/* ==========================================================================
   7. TERMINAL CONSOLE TABS WITH MORPH PILL
   ========================================================================== */
const TERMINAL_SNIPPETS = {
  overview: `<span class="term-comment"># Professional & Administrative Systems Profile</span>
<span class="term-keyword">const</span> <span class="term-prop">professional</span> = {
  <span class="term-prop">name</span>: <span class="term-string">"Bobby Kamal Aizan"</span>,
  <span class="term-prop">role</span>: <span class="term-string">"Administrator Transportation"</span>,
  <span class="term-prop">company</span>: <span class="term-string">"PT. Abicam"</span>,
  <span class="term-prop">almaMater</span>: <span class="term-string">"Institut Teknologi Kalimantan (ITK)"</span>,
  <span class="term-prop">degree</span>: <span class="term-string">"Bachelor of Computer Science (GPA: 3.63)"</span>,
  <span class="term-prop">keyStrengths</span>: [
    <span class="term-string">"Data Management"</span>,
    <span class="term-string">"Fleet Coordination"</span>,
    <span class="term-string">"SOP Development"</span>
  ],
  <span class="term-prop">status</span>: <span class="term-val">"Active Transportation Administrator"</span>
};
<span class="term-cmd">console</span>.log(<span class="term-string">"Operational integrity verified."</span>);`,

  research: `<span class="term-comment">-- Transportation Logistics & Operational Scheduling Query</span>
<span class="term-keyword">SELECT</span> 
  fleet_id,
  route_destination,
  driver_assignment,
  permit_validity_status,
  compliance_check
<span class="term-keyword">FROM</span> pt_abicam_transportation_fleet
<span class="term-keyword">WHERE</span> operational_status = <span class="term-string">'Active'</span>
<span class="term-keyword">ORDER BY</span> travel_schedule <span class="term-keyword">ASC</span>;
<span class="term-comment">-- Managed by: Bobby Kamal Aizan (PT. Abicam)</span>`,

  stack: `<span class="term-comment">/* Core Professional & Technical Competencies */</span>
{
  <span class="term-prop">"hardSkills"</span>: [<span class="term-string">"Microsoft Office (Word, Excel, PowerPoint)"</span>, <span class="term-string">"Data Management"</span>, <span class="term-string">"Fleet Administration"</span>],
  <span class="term-prop">"softSkills"</span>: [<span class="term-string">"Detail-Oriented"</span>, <span class="term-string">"Excellent Time Management"</span>, <span class="term-string">"Problem Solving"</span>],
  <span class="term-prop">"systems"</span>: [<span class="term-string">"SOP Formulation"</span>, <span class="term-string">"Regulatory Compliance"</span>, <span class="term-string">"General Computer Systems"</span>],
  <span class="term-prop">"languages"</span>: [<span class="term-string">"Indonesian (Fluent)"</span>, <span class="term-string">"English (Fluent)"</span>]
}`
};

function initTerminalTabs() {
  const terminalTabs = document.querySelectorAll('.terminal-tab-btn');
  const codeBody = document.getElementById('terminal-code-body');
  const terminalContainer = document.querySelector('.terminal-tabs');
  const codeView = document.getElementById('terminal-code-view');
  const cliView = document.getElementById('terminal-cli-view');
  const cliLog = document.getElementById('cli-output-log');
  const cliInput = document.getElementById('cli-terminal-input');
  const cliForm = document.getElementById('cli-terminal-form');
  const cliChips = document.querySelectorAll('.cli-chip');

  if (!terminalTabs.length || !codeBody) return;

  function setSnippet(key) {
    if (TERMINAL_SNIPPETS[key]) {
      codeBody.style.opacity = '0';
      codeBody.style.transform = 'translateY(4px)';
      codeBody.style.transition = 'opacity 0.15s ease, transform 0.15s ease';

      setTimeout(() => {
        codeBody.innerHTML = TERMINAL_SNIPPETS[key].trim();
        codeBody.style.opacity = '1';
        codeBody.style.transform = 'translateY(0)';
      }, 90);
    }
  }

  function switchTerminalView(snippetKey) {
    if (snippetKey === 'interactive') {
      if (codeView) codeView.style.display = 'none';
      if (cliView) cliView.style.display = 'flex';
    } else {
      if (cliView) cliView.style.display = 'none';
      if (codeView) {
        codeView.style.display = 'block';
        setSnippet(snippetKey);
      }
    }
  }

  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (terminalContainer) {
        updateSegmentedPill(terminalContainer, '#terminal-morph-pill', '.active');
      }
      const snippetKey = tab.getAttribute('data-snippet');
      switchTerminalView(snippetKey);
    });
  });

  const activeTab = document.querySelector('.terminal-tab-btn.active');
  const activeSnippet = activeTab ? activeTab.getAttribute('data-snippet') : 'interactive';
  switchTerminalView(activeSnippet);
  if (terminalContainer) {
    setTimeout(() => {
      updateSegmentedPill(terminalContainer, '#terminal-morph-pill', '.active');
    }, 100);
  }

  // Interactive CLI Terminal
  const commandHistory = [];
  let historyIndex = -1;

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function getActiveLang() {
    return localStorage.getItem('bobby-portfolio-lang') || document.documentElement.lang || 'id';
  }

  function executeCliCommand(cmdString) {
    if (!cliLog) return;
    const trimmed = cmdString.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const lang = getActiveLang();
    const isEn = lang === 'en';

    if (cmd === 'clear') {
      cliLog.innerHTML = `
        <div class="cli-motd-header">
          <div class="text-cyan-400 font-semibold text-xs"><i class="bi bi-terminal-fill me-1"></i> Bobby Kamal Aizan &bull; Interactive Portfolio CLI</div>
          <div class="text-muted text-xs mt-0.5">${isEn ? 'Type <span class="cli-highlight">help</span> or tap chips above.' : 'Ketik <span class="cli-highlight">help</span> atau klik chip di atas.'}</div>
        </div>
      `;
      return;
    }

    let outputHtml = '';

    switch (cmd) {
      case 'help':
        outputHtml = isEn
          ? `<strong>Commands:</strong> <span class="cli-highlight">bio</span>, <span class="cli-highlight">skills</span>, <span class="cli-highlight">projects</span>, <span class="cli-highlight">publications</span>, <span class="cli-highlight">cv</span>, <span class="cli-highlight">contact</span>, <span class="cli-highlight">theme</span>, <span class="cli-highlight">perf</span>, <span class="cli-highlight">clear</span>`
          : `<strong>Perintah:</strong> <span class="cli-highlight">bio</span>, <span class="cli-highlight">skills</span>, <span class="cli-highlight">projects</span>, <span class="cli-highlight">publications</span>, <span class="cli-highlight">cv</span>, <span class="cli-highlight">contact</span>, <span class="cli-highlight">theme</span>, <span class="cli-highlight">perf</span>, <span class="cli-highlight">clear</span>`;
        break;

      case 'bio':
        outputHtml = isEn
          ? `<strong>Bobby Kamal Aizan, S.Kom</strong> &bull; Information Systems Alumnus (ITK, GPA 3.63) &bull; Administrator Transportation at PT. Abicam (Dec 2022 – Present) &bull; SOP Development Intern at Balai Diklat Keuangan.`
          : `<strong>Bobby Kamal Aizan, S.Kom</strong> &bull; Lulusan S1 Sistem Informasi ITK (IPK 3.63) &bull; Administrator Transportation di PT. Abicam (Des 2022 – Sekarang) &bull; Magang Pengembangan SOP di Balai Diklat Keuangan.`;
        break;

      case 'skills':
        outputHtml = `<strong>Keahlian:</strong> Microsoft Office (Word, Excel, PowerPoint), Data Management, Fleet &amp; Route Scheduling, SOP Formulation, Procedural Compliance, General Computer Knowledge, Indonesian &amp; English.`;
        break;

      case 'projects':
        outputHtml = isEn
          ? `[1] <strong>PT. Abicam</strong>: Fleet &amp; Route Optimization &bull; [2] <strong>Balai Diklat Keuangan</strong>: SOP Online Learning &bull; [3] <strong>ITK Information Systems</strong>: Data Architecture. <em>Type 'cv' for full document.</em>`
          : `[1] <strong>PT. Abicam</strong>: Optimalisasi Armada &amp; Rute &bull; [2] <strong>Balai Diklat Keuangan</strong>: SOP Pembelajaran Daring &bull; [3] <strong>Sistem Informasi ITK</strong>: Arsitektur Data. <em>Ketik 'cv' untuk dokumen lengkap.</em>`;
        break;

      case 'publications':
        outputHtml = isEn
          ? `&bull; <strong>SOP Development:</strong> Online learning guidelines at Balai Diklat Keuangan &bull; <strong>Academic Research:</strong> Information Systems at Institut Teknologi Kalimantan (GPA 3.63).`
          : `&bull; <strong>Pengembangan SOP:</strong> Prosedur pembelajaran daring di Balai Diklat Keuangan &bull; <strong>Riset Akademik:</strong> Sistem Informasi di Institut Teknologi Kalimantan (IPK 3.63).`;
        break;

      case 'cv':
        {
          const mode = args[0] ? args[0].toLowerCase() : 'quicklook';
          if (mode === 'ats') {
            outputHtml = `<span class="text-success"><i class="bi bi-file-earmark-text me-1"></i> [OK] Membuka CV <strong>Format ATS (HR Parser Ready)</strong>...</span>`;
            setTimeout(() => {
              if (typeof window.openCvModal === 'function') window.openCvModal('ats');
            }, 150);
          } else {
            outputHtml = `<span class="text-info"><i class="bi bi-apple me-1"></i> [OK] Membuka CV <strong>Apple QuickLook</strong> (Tersedia tombol opsi Standar ATS)...</span>`;
            setTimeout(() => {
              if (typeof window.openCvModal === 'function') window.openCvModal('quicklook');
            }, 150);
          }
        }
        break;

      case 'contact':
        outputHtml = isEn
          ? `Email: <a href="mailto:bobbykamalaizan@gmail.com" class="text-primary underline">bobbykamalaizan@gmail.com</a> &bull; Location: Balikpapan, Indonesia &bull; <a href="https://linkedin.com/in/bobbykamalaizan" target="_blank" class="text-info underline">LinkedIn</a> &bull; <a href="#contact" class="text-success underline">Send Message</a>`
          : `Email: <a href="mailto:bobbykamalaizan@gmail.com" class="text-primary underline">bobbykamalaizan@gmail.com</a> &bull; Lokasi: Balikpapan, Indonesia &bull; <a href="https://linkedin.com/in/bobbykamalaizan" target="_blank" class="text-info underline">LinkedIn</a> &bull; <a href="#contact" class="text-success underline">Form Kontak</a>`;
        break;

      case 'theme':
        {
          const mode = args[0] ? args[0].toLowerCase() : 'toggle';
          let appliedTheme = '';
          if (typeof window.setPortfolioTheme === 'function') {
            appliedTheme = window.setPortfolioTheme(mode);
          }
          outputHtml = `<span class="text-info"><i class="bi bi-circle-half me-1"></i> Theme updated: <strong>${appliedTheme || mode}</strong></span>`;
        }
        break;

      case 'perf':
        {
          const mode = args[0] ? args[0].toLowerCase() : 'toggle';
          let target = null;
          if (mode === 'on') target = true;
          else if (mode === 'off') target = false;
          if (typeof window.setPortfolioPerfMode === 'function') {
            target = window.setPortfolioPerfMode(target, true);
          }
          outputHtml = `<span class="text-warning"><i class="bi bi-lightning-charge me-1"></i> Performance mode: <strong>${target ? 'ENABLED' : 'DISABLED'}</strong></span>`;
        }
        break;

      case 'sudo':
        if (args.join(' ').toLowerCase().includes('hire')) {
          outputHtml = `⚡ <strong class="text-success">ACCESS GRANTED!</strong> Mengarahkan ke form kontak / pesan Bobby...`;
          setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.location.href = 'mailto:bobbykamalaizan@gmail.com?subject=Peluang%20Kolaborasi%20Profesional';
            }
          }, 500);
        } else {
          outputHtml = `<span class="text-danger">sudo: permission denied. (Coba '<span class="cli-highlight">sudo hire bobby</span>' 😉)</span>`;
        }
        break;

      case 'whoami':
        outputHtml = `visitor@bobby-portfolio (guest session) &bull; Terminal active`;
        break;

      case 'date':
        outputHtml = new Date().toLocaleString(isEn ? 'en-US' : 'id-ID', { dateStyle: 'medium', timeStyle: 'short' });
        break;

      default:
        outputHtml = `<span class="text-danger">command not found: "${escapeHtml(trimmed)}".</span> Ketik <span class="cli-highlight">help</span> atau klik chip.`;
        break;
    }

    const logEntry = document.createElement('div');
    logEntry.className = 'cli-log-entry';
    logEntry.innerHTML = `
      <div class="cli-log-cmd">
        <span class="cli-prompt-user">bobby</span><span class="cli-prompt-at">@</span><span class="cli-prompt-host">itk</span><span class="cli-prompt-symbol">:~$</span>
        <span class="cli-cmd-echo">${escapeHtml(trimmed)}</span>
      </div>
      <div class="cli-log-result">${outputHtml}</div>
    `;
    cliLog.replaceChildren(logEntry);
  }

  // Handle Form Submission
  if (cliForm && cliInput) {
    cliForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = cliInput.value.trim();
      if (!val) return;
      commandHistory.push(val);
      historyIndex = commandHistory.length;
      cliInput.value = '';
      executeCliCommand(val);
    });

    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex > 0) {
          historyIndex--;
          cliInput.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          cliInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          cliInput.value = '';
        }
      }
    });
  }

  // Handle Chips Click
  if (cliChips.length) {
    cliChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (!cmd) return;
        const interactiveTab = document.getElementById('tab-cli-interactive');
        if (interactiveTab && !interactiveTab.classList.contains('active')) {
          terminalTabs.forEach(t => t.classList.remove('active'));
          interactiveTab.classList.add('active');
          if (terminalContainer) {
            updateSegmentedPill(terminalContainer, '#terminal-morph-pill', '.active');
          }
          switchTerminalView('interactive');
        }
        commandHistory.push(cmd);
        historyIndex = commandHistory.length;
        if (cliInput) cliInput.value = '';
        executeCliCommand(cmd);
      });
    });
  }
}

/* ==========================================================================
   8. 3D CARD TILT WITH DYNAMIC SPECULAR SPOTLIGHT
   ========================================================================== */
function init3DSpotlightCards() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const cards = document.querySelectorAll(
    '.skill-card-item, .project-card, .pub-card, .social-hub-card'
  );

  cards.forEach(card => {
    let cardRect = null;
    let rafScheduled = false;

    card.addEventListener('mouseenter', () => {
      if (document.documentElement.getAttribute('data-perf-mode') === 'true') return;
      cardRect = card.getBoundingClientRect();
    }, { passive: true });

    card.addEventListener('mousemove', (e) => {
      if (document.documentElement.getAttribute('data-perf-mode') === 'true') return;
      if (!cardRect) cardRect = card.getBoundingClientRect();

      const x = e.clientX - cardRect.left;
      const y = e.clientY - cardRect.top;

      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(() => {
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);

          const centerX = cardRect.width / 2;
          const centerY = cardRect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -2.5;
          const rotateY = ((x - centerX) / centerX) * 2.5;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;
          rafScheduled = false;
        });
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      rafScheduled = false;
      cardRect = null;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    }, { passive: true });
  });
}

/* ==========================================================================
   9. APPLE PRO INTERACTIVE ARCHITECTURE EXPLORER
   ========================================================================== */
function renderExplorerStageSVG(type) {
  const svgs = {
    webqual: 'assets/images/explorer/explorer-webqual.svg',
    mvc: 'assets/images/explorer/explorer-mvc.svg',
    database: 'assets/images/explorer/explorer-database.svg',
    community: 'assets/images/explorer/explorer-community.svg',
    security: 'assets/images/explorer/explorer-security.svg'
  };
  const src = svgs[type] || svgs.webqual;
  return `<img src="${src}" class="stage-svg-visual" width="460" height="300" alt="Ilustrasi Topik - ${type}" decoding="async">`;
}

function buildExplorerStackMarkup(activeIndex, lang) {
  return EXPLORER_DATA.map((item, idx) => {
    const isActive = idx === activeIndex;
    const title = lang === 'en' ? item.en_title : item.id_title;
    const desc = lang === 'en' ? item.en_desc : item.id_desc;

    if (isActive) {
      return `
        <div class="explorer-callout-card" style="border-color: ${item.pillColor}66;">
          <div class="flex items-center gap-2 mb-2">
            <span class="pill-icon-dot" style="width:10px;height:10px;border-radius:50%;background:${item.pillColor};display:inline-block;flex-shrink:0;"></span>
            <h3 class="callout-title">${title}</h3>
          </div>
          <p class="callout-desc">${desc}</p>
        </div>
      `;
    }
    return `
      <div class="explorer-pill-item" onclick="selectExplorerFeature(${idx})">
        <span class="pill-icon-plus">+</span>
        <span>${title.split(' ')[0]} ${title.split(' ')[1] || ''}</span>
      </div>
    `;
  }).join('');
}

function initAppleFeatureExplorer() {
  const stack = document.getElementById('explorer-pills-stack');
  const stage = document.getElementById('explorer-stage-container');
  const upBtn = document.getElementById('stepper-btn-up');
  const downBtn = document.getElementById('stepper-btn-down');
  const wrapper = stack ? stack.closest('.apple-explorer-wrapper') : null;

  if (!stack || !stage) return;

  let lastMeasuredKey = '';

  function syncExplorerStackHeight(force = false) {
    const controls = stack.parentElement;
    const width = stack.clientWidth;
    if (!controls || !width) return;

    const lang = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en') ? 'en' : 'id';
    const cacheKey = `${lang}:${Math.round(width)}`;
    if (!force && cacheKey === lastMeasuredKey) return;
    lastMeasuredKey = cacheKey;

    const probe = document.createElement('div');
    probe.className = stack.className;
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;width:${width}px;z-index:-1;`;
    controls.appendChild(probe);

    let maxHeight = 0;
    for (let i = 0; i < EXPLORER_DATA.length; i++) {
      probe.innerHTML = buildExplorerStackMarkup(i, lang);
      const card = probe.querySelector('.explorer-callout-card');
      if (card) {
        card.style.animation = 'none';
        card.style.transform = 'none';
      }
      maxHeight = Math.max(maxHeight, probe.offsetHeight);
    }

    probe.remove();
    if (maxHeight > 0) {
      stack.style.minHeight = `${Math.ceil(maxHeight)}px`;
      // Also pin the outer wrapper so the glass card border never resizes
      if (wrapper) {
        // Reset first so we can measure the full outer height accurately
        wrapper.style.minHeight = '';
        requestAnimationFrame(() => {
          const outerH = wrapper.offsetHeight;
          if (outerH > 0) wrapper.style.minHeight = `${outerH}px`;
        });
      }
    }
  }

  window.updateExplorerContent = function () {
    const lang = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en') ? 'en' : 'id';
    const current = EXPLORER_DATA[currentExplorerIndex];
    const indicator = document.getElementById('explorer-indicator-text');

    if (indicator) {
      const prefix = lang === 'en' ? 'TOPIC' : 'TOPIK';
      indicator.textContent = `${prefix} 0${currentExplorerIndex + 1} / 0${EXPLORER_DATA.length}`;
    }

    syncExplorerStackHeight();
    stack.innerHTML = buildExplorerStackMarkup(currentExplorerIndex, lang);

    stage.innerHTML = renderExplorerStageSVG(current.svgType);
  };

  window.selectExplorerFeature = function (index) {
    currentExplorerIndex = index;
    updateExplorerContent();
  };

  if (upBtn) {
    upBtn.addEventListener('click', () => {
      currentExplorerIndex = (currentExplorerIndex - 1 + EXPLORER_DATA.length) % EXPLORER_DATA.length;
      updateExplorerContent();
    });
  }

  if (downBtn) {
    downBtn.addEventListener('click', () => {
      currentExplorerIndex = (currentExplorerIndex + 1) % EXPLORER_DATA.length;
      updateExplorerContent();
    });
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => syncExplorerStackHeight(true), 120);
  }, { passive: true });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => syncExplorerStackHeight(true));
  }

  updateExplorerContent();
}

/* ==========================================================================
   10. BESPOKE SVG PROJECT BANNERS (APPLE LIQUID GLASS)
   ========================================================================== */
function getProjectBannerSVG(projectId) {
  const bannerMap = {
    'siat-webqual': 'assets/images/projects/siat-webqual.svg',
    'sirem-fleet': 'assets/images/projects/sirem-fleet.svg',
    'lamaru-smart-tourism': 'assets/images/projects/lamaru-tourism.svg'
  };
  const src = bannerMap[projectId] || 'assets/images/projects/siat-webqual.svg';
  return `<img src="${src}" class="project-banner-svg" alt="Preview Proyek ${projectId}" loading="lazy" decoding="async">`;
}

/* ==========================================================================
   11. PROJECTS RENDER & MODAL PREVIEW (BILINGUAL)
   ========================================================================== */
function initProjectsRender() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid || typeof getLocalizedProjects !== 'function') return;

  const projects = getLocalizedProjects();
  const viewDetailsText = typeof getTranslation === 'function' ? getTranslation('proj_btn_view') : 'Lihat Detail & Analisis';

  const bannerClasses = {
    'siat-webqual': 'banner-siat',
    'sirem-fleet': 'banner-sirem',
    'lamaru-smart-tourism': 'banner-lamaru'
  };

  projectsGrid.innerHTML = projects.map((proj, idx) => {
    const staggerClass = idx % 2 === 0 ? 'parallax-card-stagger-1' : 'parallax-card-stagger-2';
    return `
    <div class="col-lg-4 col-md-6 mb-4 project-item ${staggerClass}" data-category="${proj.category}">
      <div class="glass-card project-card" onclick="openProjectModal('${proj.id}')">
        <div class="project-glass-banner ${bannerClasses[proj.id] || 'banner-siat'}">
          ${getProjectBannerSVG(proj.id)}
          <div class="project-badge-overlay">
            <span class="glass-badge">
              ${proj.badgeLabel}
            </span>
          </div>
        </div>
        
        <div class="project-content-body">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-summary">${proj.shortDescription}</p>
          
          <div class="project-tech-stack">
            ${proj.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('')}
          </div>
          
          <div class="project-actions pt-2">
            <button type="button" class="btn-apple-project-action" onclick="event.stopPropagation(); openProjectModal('${proj.id}')">
              <span>${viewDetailsText}</span>
              <div class="action-icon-circle">
                <img src="assets/icons/arrow-up-right.svg" alt="Detail" width="13" height="13">
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  init3DSpotlightCards();
}

// Lightweight in-modal markdown formatter
function formatInlineMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function formatProjectMarkdown(mdText) {
  if (!mdText) return '';
  const lines = mdText.split('\n');
  let html = '';
  let inList = false;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      continue;
    }

    if (trimmed.startsWith('### ')) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      const title = trimmed.replace(/^###\s+/, '');
      html += `<h6 class="modal-subheading">${formatInlineMarkdown(title)}</h6>`;
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) {
        html += '<ul class="modal-bullet-list">';
        inList = true;
      }
      const item = trimmed.replace(/^[-*]\s+/, '');
      html += `<li>${formatInlineMarkdown(item)}</li>`;
    } else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<p class="modal-desc-p mb-2">${formatInlineMarkdown(trimmed)}</p>`;
    }
  }

  if (inList) {
    html += '</ul>';
  }

  return html;
}

let lastFocusedBeforeModal = null;

// Global Apple Glass Modal Trigger
window.openProjectModal = function (projectId) {
  if (typeof getLocalizedProjects !== 'function') return;
  const projects = getLocalizedProjects();
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  const modalBackdrop = document.getElementById('appleProjectModal');
  const modalTitle = document.getElementById('projectModalTitle');
  const modalBody = document.getElementById('projectModalBody');

  const sectionDesc = typeof getTranslation === 'function' ? getTranslation('modal_section_desc') : 'Deskripsi & Metodologi';
  const sectionMetrics = typeof getTranslation === 'function' ? getTranslation('modal_section_metrics') : 'Ringkasan Parameter & Luaran';
  const sectionTech = typeof getTranslation === 'function' ? getTranslation('modal_section_tech') : 'Teknologi & Instrumen Terkait';
  const officialRefText = typeof getTranslation === 'function' ? getTranslation('modal_btn_demo') : 'Tautan Resmi';

  if (modalTitle) modalTitle.textContent = project.title;
  if (modalBody) {
    modalBody.innerHTML = `
      <div class="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-white/10">
        <span class="glass-badge"><i class="bi bi-bookmark-check-fill text-info"></i> ${project.categoryLabel}</span>
        <div>
          ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-glass-primary py-2 px-4 text-sm inline-flex items-center gap-2"><i class="bi bi-box-arrow-up-right"></i> ${officialRefText}</a>` : ''}
        </div>
      </div>
      
      <div class="mb-6">
        <h4 class="modal-section-title">${sectionDesc}</h4>
        <div class="modal-desc-body">${formatProjectMarkdown(project.fullDescription)}</div>
      </div>
      
      <div class="mb-6">
        <h4 class="modal-section-title">${sectionMetrics}</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${project.metrics.map(m => `
            <div class="glass-card-subtle p-3 text-center">
              <div class="gradient-text font-bold text-lg">${m.value}</div>
              <div class="text-muted text-xs mt-1">${m.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div>
        <h4 class="modal-section-title">${sectionTech}</h4>
        <div class="flex flex-wrap gap-2">
          ${project.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>
      </div>
    `;
  }

  if (modalBackdrop) {
    lastFocusedBeforeModal = document.activeElement;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }
};

window.closeProjectModal = function () {
  const modalBackdrop = document.getElementById('appleProjectModal');
  if (modalBackdrop && modalBackdrop.classList.contains('open')) {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
      lastFocusedBeforeModal.focus();
      lastFocusedBeforeModal = null;
    }
  }
};

// CV Modal Trigger (QuickLook Visual & ATS Format)
window.openCvModal = function (format = 'quicklook') {
  const cvModalBackdrop = document.getElementById('appleCvModal');
  if (cvModalBackdrop) {
    lastFocusedBeforeModal = document.activeElement;
    if (format === 'ats') {
      window.switchCvFormat('ats');
    } else if (format === 'quicklook') {
      window.switchCvFormat('quicklook');
    }
    cvModalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    const activeTab = cvModalBackdrop.querySelector('.cv-segment-btn.active') || cvModalBackdrop.querySelector('.cv-exit-btn');
    if (activeTab) activeTab.focus();
  }
};

window.switchCvFormat = function (format) {
  const btnQuicklook = document.getElementById('btnCvFormatQuicklook');
  const btnAts = document.getElementById('btnCvFormatAts');
  const viewQuicklook = document.getElementById('cvViewQuicklook');
  const viewAts = document.getElementById('cvViewAts');
  const activeLabel = document.getElementById('cvActiveModeLabel');
  const isEn = (document.documentElement.lang === 'en');

  if (format === 'ats') {
    if (btnQuicklook) {
      btnQuicklook.classList.remove('active');
      btnQuicklook.setAttribute('aria-selected', 'false');
    }
    if (btnAts) {
      btnAts.classList.add('active');
      btnAts.setAttribute('aria-selected', 'true');
    }
    if (viewQuicklook) viewQuicklook.classList.remove('active');
    if (viewAts) viewAts.classList.add('active');
    if (activeLabel) {
      activeLabel.textContent = isEn ? 'Format: Standard ATS (HR Parser Ready)' : 'Format: Standar ATS (HR Parser Ready)';
    }
  } else {
    if (btnAts) {
      btnAts.classList.remove('active');
      btnAts.setAttribute('aria-selected', 'false');
    }
    if (btnQuicklook) {
      btnQuicklook.classList.add('active');
      btnQuicklook.setAttribute('aria-selected', 'true');
    }
    if (viewAts) viewAts.classList.remove('active');
    if (viewQuicklook) viewQuicklook.classList.add('active');
    if (activeLabel) {
      activeLabel.textContent = isEn ? 'Format: Apple QuickLook (Visual)' : 'Format: Apple QuickLook (Visual)';
    }
  }
};

window.closeCvModal = function () {
  const cvModalBackdrop = document.getElementById('appleCvModal');
  if (cvModalBackdrop && cvModalBackdrop.classList.contains('open')) {
    cvModalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
      lastFocusedBeforeModal.focus();
      lastFocusedBeforeModal = null;
    }
  }
};

window.printCv = function () {
  const cvModalBackdrop = document.getElementById('appleCvModal');
  if (cvModalBackdrop && !cvModalBackdrop.classList.contains('open')) {
    window.openCvModal();
  }
  setTimeout(() => {
    window.print();
  }, 60);
};

window.addEventListener('beforeprint', () => {
  const cvModalBackdrop = document.getElementById('appleCvModal');
  if (cvModalBackdrop) {
    cvModalBackdrop.classList.add('open');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeCvModal();
  }
});

/* ==========================================================================
   12. GENERIC FLUID SPRING MORPH PILL ENGINE
   ========================================================================== */
function updateSegmentedPill(container, pillSelector, activeSelector = '.active') {
  if (!container) return;
  const pill = container.querySelector(pillSelector);
  const activeItem = container.querySelector(activeSelector);
  if (!pill || !activeItem) return;

  const offsetLeft = activeItem.offsetLeft;
  const width = activeItem.offsetWidth;

  if (width > 0) {
    pill.style.opacity = '1';
    pill.style.transform = `translateX(${offsetLeft}px)`;
    pill.style.width = `${width}px`;
  }
}

function refreshAllSegmentedPills() {
  const skillsContainer = document.querySelector('.skill-category-tabs');
  const terminalContainer = document.querySelector('.terminal-tabs');

  if (skillsContainer) updateSegmentedPill(skillsContainer, '#skill-filter-morph-pill', '.active');
  if (terminalContainer) updateSegmentedPill(terminalContainer, '#terminal-morph-pill', '.active');
  if (typeof updateNavMorphPill === 'function') updateNavMorphPill();
}
window.refreshAllSegmentedPills = refreshAllSegmentedPills;

function setupSegmentedMorphContainer(container, pillSelector, itemSelector) {
  if (!container) return;
  const items = container.querySelectorAll(itemSelector);

  const update = () => updateSegmentedPill(container, pillSelector, '.active');

  update();
  requestAnimationFrame(update);
  setTimeout(update, 60);
  setTimeout(update, 200);

  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => update());
    ro.observe(container);
  }

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      updateSegmentedPill(container, pillSelector, `:is(${itemSelector}):hover`);
    });

    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      updateSegmentedPill(container, pillSelector, '.active');
    });
  });

  container.addEventListener('mouseleave', () => {
    updateSegmentedPill(container, pillSelector, '.active');
  });
}

function initAllSegmentedMorphPills() {
  const skillsContainer = document.querySelector('.skill-category-tabs');
  if (skillsContainer) {
    setupSegmentedMorphContainer(skillsContainer, '#skill-filter-morph-pill', '.skill-tab-btn');
  }

  const terminalContainer = document.querySelector('.terminal-tabs');
  if (terminalContainer) {
    setupSegmentedMorphContainer(terminalContainer, '#terminal-morph-pill', '.terminal-tab-btn');
  }
}

/* ==========================================================================
   13. SKILLS MATRIX TABS
   ========================================================================== */
function initSkillTabs() {
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillGroups = document.querySelectorAll('.skill-group-container');
  const skillsContainer = document.querySelector('.skill-category-tabs');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (skillsContainer) {
        updateSegmentedPill(skillsContainer, '#skill-filter-morph-pill', '.active');
        tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }

      const targetGroup = tab.getAttribute('data-skill-group');

      skillGroups.forEach(group => {
        if (targetGroup === 'all' || group.getAttribute('data-skill-group') === targetGroup) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   14. MOBILE NAVIGATION DRAWER WITH SMOOTH OPEN/CLOSE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('#mobile-drawer .nav-link-item');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isShowing = drawer.classList.contains('show');
    drawer.classList.toggle('show', !isShowing);
    toggleBtn.classList.toggle('open', !isShowing);
    const icon = toggleBtn.querySelector('i');
    if (!isShowing) {
      if (icon) icon.className = 'bi bi-x-lg';
    } else {
      if (icon) icon.className = 'bi bi-list';
    }
  });

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('show');
      toggleBtn.classList.remove('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'bi bi-list';
    });
  });

  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('show') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      drawer.classList.remove('show');
      toggleBtn.classList.remove('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'bi bi-list';
    }
  });
}

/* ==========================================================================
   15. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   16. SCROLL REVEAL OBSERVER (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('revealed'));
  }
}


/* ==========================================================================
   SINGLE APPLICATION INITIALIZATION PIPELINE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initPerformanceEngine();
  initNightLightToggle();
  initThemeToggle();
  initDynamicTyping();
  initTerminalTabs();
  initAmbientCursorGlow();
  init3DSpotlightCards();
  initAppleFeatureExplorer();
  initProjectsRender();
  initSkillTabs();
  initAllSegmentedMorphPills();
  initNavbarInteractions();
  initMobileMenu();
  initBackToTop();
  initScrollReveal();
  initInteractiveBackground();
  initUnifiedScrollManager();
});
