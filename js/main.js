/**
 * Bobby Kamal Aizan Portfolio - Apple Liquid Glass 3.0 Engine
 * Performance-tuned for mobile low-end devices and 120Hz/ProMotion high refresh rate displays.
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
      ? (currentLang === 'en' ? 'Ceramic Pearl Light Mode' : 'Mode Pearl Light Aktif')
      : (currentLang === 'en' ? 'Pro Liquid Dark Mode' : 'Mode Liquid Dark Aktif');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsViewTransitions = typeof document.startViewTransition === 'function' && !prefersReducedMotion;

    if (supportsViewTransitions) {
      document.documentElement.classList.add('theme-transitioning');

      const transition = document.startViewTransition(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('bobby-portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
        if (typeof globalApplyGlassLevel === 'function') {
          globalApplyGlassLevel(currentGlassLevel, false);
        }
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
      }).catch(() => {});

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
        if (typeof globalApplyGlassLevel === 'function') {
          globalApplyGlassLevel(currentGlassLevel, false);
        }
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
        if (typeof globalApplyGlassLevel === 'function') {
          globalApplyGlassLevel(currentGlassLevel, false);
        }
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
    const titleText = isLight ? 'Switch to Liquid Dark Mode' : 'Switch to Pearl Light Mode';

    if (themeIcon) {
      themeIcon.className = iconClass;
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', titleText);
    }
    if (mobileThemeIcon) {
      mobileThemeIcon.className = iconClass;
      if (mobileThemeToggleBtn) mobileThemeToggleBtn.setAttribute('title', titleText);
    }
  }
}

/* ==========================================================================
   1.2. APPLE iOS 26 GLASS ANIMATION SLIDER
   Interactive horizontal glass capsule slider based on iOS 26 concept
   ========================================================================== */
let globalApplyGlassLevel = null;
let currentGlassLevel = 75;

function initIosGlassSlider() {
  const toggleBtn = document.getElementById('glass-slider-toggle-btn');
  const popover = document.getElementById('ios-glass-popover');

  // Desktop slider elements
  const desktopSlider = document.getElementById('desktop-ios-slider');
  const desktopFill = document.getElementById('desktop-slider-fill');
  const desktopThumb = document.getElementById('desktop-slider-thumb');
  const minIcon = document.getElementById('glass-icon-min');
  const maxIcon = document.getElementById('glass-icon-max');

  // Mobile slider elements
  const mobileToggleBtn = document.getElementById('mobile-glass-toggle-btn');
  const mobileSlider = document.getElementById('mobile-ios-slider');
  const mobileFill = document.getElementById('mobile-slider-fill');
  const mobileThumb = document.getElementById('mobile-slider-thumb');
  const mobileMinIcon = document.getElementById('mobile-glass-icon-min');
  const mobileMaxIcon = document.getElementById('mobile-glass-icon-max');

  const cores = document.querySelectorAll('.ios-26-thumb-core');

  const savedLevelStr = localStorage.getItem('bobby-portfolio-glass-level');
  const savedLevel = savedLevelStr !== null ? parseInt(savedLevelStr, 10) : 75;
  currentGlassLevel = (!isNaN(savedLevel) && savedLevel >= 0 && savedLevel <= 100) ? savedLevel : 75;

  let glideAnimationTimer = null;

  function applyGlassLevel(level, save = true, animate = false) {
    level = Math.max(0, Math.min(100, Math.round(level)));
    const prevLevel = currentGlassLevel;
    currentGlassLevel = level;
    if (save) {
      localStorage.setItem('bobby-portfolio-glass-level', level);
    }

    const factor = level / 75; // 75 is baseline 1.0
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Blur calculations
    const blurBase = Math.round(20 * factor);
    const blurSm = Math.round(10 * factor);
    const blurLg = Math.round(28 * factor);
    const blurXl = Math.round(36 * factor);

    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--glass-factor', factor.toFixed(2));
    rootStyle.setProperty('--glass-blur', `${blurBase}px`);
    rootStyle.setProperty('--glass-blur-sm', `${blurSm}px`);
    rootStyle.setProperty('--glass-blur-lg', `${blurLg}px`);
    rootStyle.setProperty('--glass-blur-xl', `${blurXl}px`);

    // Dynamic glass background opacities
    if (isLight) {
      const cardA = (0.94 - 0.35 * (level / 100)).toFixed(2);
      const navA = (0.92 - 0.32 * (level / 100)).toFixed(2);
      rootStyle.setProperty('--glass-bg-card', `rgba(255, 255, 255, ${cardA})`);
      rootStyle.setProperty('--glass-bg-nav', `rgba(255, 255, 255, ${navA})`);
    } else {
      const cardA = (0.85 - 0.52 * (level / 100)).toFixed(2);
      const navA = (0.88 - 0.48 * (level / 100)).toFixed(2);
      rootStyle.setProperty('--glass-bg-card', `rgba(25, 25, 36, ${cardA})`);
      rootStyle.setProperty('--glass-bg-nav', `rgba(20, 20, 28, ${navA})`);
    }

    // Saturation and border reflection
    const sat = Math.round(110 + 120 * (level / 100));
    rootStyle.setProperty('--glass-saturate', `${sat}%`);
    const borderA = (0.05 + 0.16 * (level / 100)).toFixed(2);
    rootStyle.setProperty('--glass-border', `rgba(255, 255, 255, ${borderA})`);

    // Update UI elements with fluid physics
    updateUI(level, animate, prevLevel);
  }

  globalApplyGlassLevel = applyGlassLevel;

  function updateUI(level, animate, prevLevel) {
    const delta = level - (prevLevel !== undefined ? prevLevel : level);
    const allThumbs = [desktopThumb, mobileThumb].filter(Boolean);
    const allFills = [desktopFill, mobileFill].filter(Boolean);

    cores.forEach(c => {
      c.style.opacity = level <= 2 ? '0' : '1';
    });

    if (animate && Math.abs(delta) > 1) {
      // Smooth fluid glide transition
      allFills.forEach(f => f.style.transition = 'width 0.4s cubic-bezier(0.34, 1.25, 0.64, 1)');
      allThumbs.forEach(t => {
        t.style.transition = 'left 0.4s cubic-bezier(0.34, 1.25, 0.64, 1)';
        t.style.transform = '';
        t.classList.remove('glide-right', 'glide-left', 'fluid-bounce');
        t.classList.add(delta > 0 ? 'glide-right' : 'glide-left');
      });

      clearTimeout(glideAnimationTimer);
      glideAnimationTimer = setTimeout(() => {
        allThumbs.forEach(t => {
          t.classList.remove('glide-right', 'glide-left');
          void t.offsetWidth; // trigger reflow
          t.classList.add('fluid-bounce');
        });
        setTimeout(() => {
          allThumbs.forEach(t => t.classList.remove('fluid-bounce'));
        }, 550);
      }, 190);
    } else if (!animate) {
      // Active dragging: disable transition for direct responsive touch
      allFills.forEach(f => f.style.transition = 'none');
      allThumbs.forEach(t => t.style.transition = 'none');
    }

    if (desktopFill) desktopFill.style.width = `${level}%`;
    if (desktopThumb) desktopThumb.style.left = `${level}%`;
    if (desktopSlider) desktopSlider.setAttribute('aria-valuenow', level);

    if (mobileFill) mobileFill.style.width = `${level}%`;
    if (mobileThumb) mobileThumb.style.left = `${level}%`;
    if (mobileSlider) mobileSlider.setAttribute('aria-valuenow', level);
  }

  // Initial apply
  applyGlassLevel(currentGlassLevel, false, false);

  // Popover toggle for desktop navbar button
  if (toggleBtn && popover) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = popover.classList.contains('show');
      if (isOpen) {
        popover.classList.remove('show');
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        popover.classList.add('show');
        toggleBtn.setAttribute('aria-expanded', 'true');
        // Trigger subtle arrival bounce
        if (desktopThumb) {
          desktopThumb.classList.remove('fluid-bounce');
          void desktopThumb.offsetWidth;
          desktopThumb.classList.add('fluid-bounce');
          setTimeout(() => desktopThumb.classList.remove('fluid-bounce'), 550);
        }
      }
    });

    popover.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
      if (popover.classList.contains('show') && !popover.contains(e.target) && e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
        popover.classList.remove('show');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popover.classList.contains('show')) {
        popover.classList.remove('show');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mobile toggle button inside drawer
  const mobileGlassCard = document.getElementById('mobile-glass-card');
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileGlassCard) {
        const isCollapsed = mobileGlassCard.classList.contains('collapsed');
        mobileGlassCard.classList.toggle('collapsed', !isCollapsed);
        mobileToggleBtn.classList.toggle('active', isCollapsed);
        if (isCollapsed && mobileThumb) {
          mobileThumb.classList.remove('fluid-bounce');
          void mobileThumb.offsetWidth;
          mobileThumb.classList.add('fluid-bounce');
          setTimeout(() => mobileThumb.classList.remove('fluid-bounce'), 550);
        }
      }
    });
  }

  // Hook up side min / max icons to fluidly glide to preset levels
  if (minIcon) minIcon.addEventListener('click', () => applyGlassLevel(10, true, true));
  if (maxIcon) maxIcon.addEventListener('click', () => applyGlassLevel(100, true, true));
  if (mobileMinIcon) mobileMinIcon.addEventListener('click', () => applyGlassLevel(10, true, true));
  if (mobileMaxIcon) mobileMaxIcon.addEventListener('click', () => applyGlassLevel(100, true, true));

  // Fluid velocity physics slider controller
  function setupHorizontalSlider(track, thumb) {
    if (!track || !thumb) return;
    let isDragging = false;
    let lastX = 0;
    let lastTime = 0;
    let decayTimer = null;
    let startX = 0;

    function getTrackPct(clientX) {
      const rect = track.getBoundingClientRect();
      const clampedX = Math.max(rect.left, Math.min(rect.right, clientX));
      return Math.round(((clampedX - rect.left) / rect.width) * 100);
    }

    function handlePointerMove(clientX) {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const dx = clientX - lastX;
      const vx = dx / dt; // velocity in px/ms

      lastX = clientX;
      lastTime = now;

      // Real-time fluid velocity squash & stretch
      // As user accelerates sideways, droplet elongates horizontally and squashes vertically
      const speed = Math.min(Math.abs(vx) * 0.22, 0.40); // max 40% elongation
      const scaleX = (1 + speed).toFixed(3);
      const scaleY = (1 / Math.sqrt(1 + speed)).toFixed(3);
      const skewX = Math.max(-10, Math.min(10, -vx * 6)).toFixed(1);

      thumb.style.transform = `translate(-50%, -50%) scaleX(${scaleX}) scaleY(${scaleY}) skewX(${skewX}deg)`;

      // Decay deformation back to round droplet if dragging stops without releasing
      clearTimeout(decayTimer);
      decayTimer = setTimeout(() => {
        if (isDragging) {
          thumb.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      }, 70);

      const pct = getTrackPct(clientX);
      applyGlassLevel(pct, true, false);
    }

    track.addEventListener('mousedown', (e) => {
      // If clicking directly on side icons, don't trigger track drag
      if (e.target.closest('.ios-26-side-icon')) return;

      const targetPct = getTrackPct(e.clientX);
      const diff = Math.abs(targetPct - currentGlassLevel);

      // If user tapped far from the thumb, glide smoothly with liquid stretch & bounce!
      if (diff > 5 && !e.target.closest('.ios-26-glass-thumb')) {
        applyGlassLevel(targetPct, true, true);
        return;
      }

      isDragging = true;
      startX = e.clientX;
      lastX = e.clientX;
      lastTime = performance.now();
      track.classList.add('dragging');
      thumb.classList.remove('glide-right', 'glide-left', 'fluid-bounce');
      handlePointerMove(e.clientX);
    });

    track.addEventListener('touchstart', (e) => {
      if (!e.touches[0] || e.target.closest('.ios-26-side-icon')) return;

      const clientX = e.touches[0].clientX;
      const targetPct = getTrackPct(clientX);
      const diff = Math.abs(targetPct - currentGlassLevel);

      if (diff > 5 && !e.target.closest('.ios-26-glass-thumb')) {
        applyGlassLevel(targetPct, true, true);
        return;
      }

      isDragging = true;
      startX = clientX;
      lastX = clientX;
      lastTime = performance.now();
      track.classList.add('dragging');
      thumb.classList.remove('glide-right', 'glide-left', 'fluid-bounce');
      handlePointerMove(clientX);
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      handlePointerMove(e.clientX);
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      handlePointerMove(e.touches[0].clientX);
    }, { passive: true });

    const stopDragging = () => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('dragging');
      clearTimeout(decayTimer);

      // Clear inline transform and execute elastic jelly spring rebound
      thumb.style.transform = '';
      thumb.classList.remove('fluid-bounce');
      void thumb.offsetWidth; // trigger reflow
      thumb.classList.add('fluid-bounce');
      setTimeout(() => {
        thumb.classList.remove('fluid-bounce');
      }, 550);
    };

    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);

    // Keyboard navigation with fluid animation
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        applyGlassLevel(currentGlassLevel + 6, true, true);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        applyGlassLevel(currentGlassLevel - 6, true, true);
      }
    });
  }

  // Initialize both desktop and mobile sliders
  setupHorizontalSlider(desktopSlider, desktopThumb);
  setupHorizontalSlider(mobileSlider, mobileThumb);
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
  let isAnimating = false;
  let lastTimestamp = performance.now();

  const layerPhysics = [
    { factorX: 0.08, factorY: 0.07 },
    { factorX: -0.09, factorY: 0.08 },
    { factorX: 0.07, factorY: -0.09 },
    { factorX: -0.06, factorY: -0.07 },
    { factorX: 0.1, factorY: 0.08 }
  ];

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

    const deltaX = (currentX - window.innerWidth / 2);
    const deltaY = (currentY - window.innerHeight / 2);

    orbLayers.forEach((layer, index) => {
      const phys = layerPhysics[index % layerPhysics.length];
      const moveX = (deltaX * phys.factorX).toFixed(2);
      const moveY = (deltaY * phys.factorY).toFixed(2);
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    if (titaniumGlow) {
      const glowX = (deltaX * 0.04).toFixed(2);
      const glowY = (deltaY * 0.03).toFixed(2);
      titaniumGlow.style.transform = `translateX(calc(-50% + ${glowX}px)) translateY(${glowY}px)`;
    }

    // Stop RAF loop when settled to save CPU/GPU cycles
    const isSettled = Math.abs(mouseX - currentX) < 0.08 && Math.abs(mouseY - currentY) < 0.08;
    if (!isSettled) {
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

function updateIslandMorphPill(targetItem = null) {
  const island = document.getElementById('dynamic-island');
  const pill = document.getElementById('island-morph-pill');
  if (!island || !pill) return;

  const target = targetItem || island.querySelector('.island-btn.active') || island.querySelector('.island-btn');
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
  const island = document.getElementById('dynamic-island');
  const backToTopBtn = document.getElementById('back-to-top');
  const allNavLinks = document.querySelectorAll('.nav-links-desktop .nav-link-item, #mobile-drawer .nav-link-item');
  const islandBtns = island ? island.querySelectorAll('.island-btn') : [];

  cacheSectionPositions();

  // Debounced cache recalculation on resize/orientation changes
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      cacheSectionPositions();
      updateNavMorphPill();
      if (typeof updateIslandMorphPill === 'function') updateIslandMorphPill();
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

    // 2. Dynamic Island Capsule Visibility
    if (island) {
      if (scrollY > 300) {
        island.style.opacity = '1';
        island.style.pointerEvents = 'auto';
        island.style.transform = 'translateX(-50%) translateY(0)';
      } else {
        island.style.opacity = '0';
        island.style.pointerEvents = 'none';
        island.style.transform = 'translateX(-50%) translateY(20px)';
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

    // 4. Navbar ScrollSpy using Cached Offsets (No synchronous DOM layout reading)
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

      // Sync Dynamic Island buttons
      if (islandBtns.length) {
        let islandChanged = false;
        islandBtns.forEach(btn => {
          const isMatch = btn.getAttribute('href') === `#${activeSectionId}`;
          if (isMatch && !btn.classList.contains('active')) {
            islandChanged = true;
          }
          btn.classList.toggle('active', isMatch);
        });

        if (islandChanged) {
          updateIslandMorphPill();
        }
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
   4. DESKTOP NAVBAR & DYNAMIC ISLAND PILL INTERACTION
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

function initDynamicIslandInteractions() {
  const island = document.getElementById('dynamic-island');
  if (!island) return;

  const islandBtns = island.querySelectorAll('.island-btn');
  setTimeout(() => updateIslandMorphPill(), 150);

  islandBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => updateIslandMorphPill(btn));
    btn.addEventListener('click', () => {
      islandBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateIslandMorphPill(btn);
    });
  });

  island.addEventListener('mouseleave', () => updateIslandMorphPill());
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
      "Software Engineering",
      "Information Systems Architecture",
      "UX Research & WebQual 4.0 Analysis",
      "Full-Stack Web Systems"
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
  overview: `
<span class="term-comment"># Engineer & Information Systems Profile</span>
<span class="term-keyword">const</span> <span class="term-prop">engineer</span> = {
  <span class="term-prop">name</span>: <span class="term-string">"Bobby Kamal Aizan"</span>,
  <span class="term-prop">almaMater</span>: <span class="term-string">"Institut Teknologi Kalimantan (ITK)"</span>,
  <span class="term-prop">focus</span>: [<span class="term-string">"Web Systems"</span>, <span class="term-string">"Information Architecture"</span>, <span class="term-string">"UX Analytics"</span>],
  <span class="term-prop">researchArea</span>: <span class="term-string">"WebQual 4.0 & Importance-Performance Analysis"</span>,
  <span class="term-prop">status</span>: <span class="term-val">"Available for Engineering & Systems Collaboration"</span>
};

<span class="term-cmd">console</span>.log(<span class="term-string">"System initialized with high reliability."</span>);
`,

  research: `
<span class="term-comment">-- WebQual 4.0 & IPA Matrix Evaluation Query</span>
<span class="term-keyword">SELECT</span> 
  dimension,
  <span class="term-cmd">AVG</span>(usability_score) <span class="term-keyword">AS</span> usability,
  <span class="term-cmd">AVG</span>(info_quality_score) <span class="term-keyword">AS</span> info_quality,
  <span class="term-cmd">AVG</span>(service_interaction_score) <span class="term-keyword">AS</span> service_interaction,
  <span class="term-keyword">CASE</span> 
    <span class="term-keyword">WHEN</span> performance < importance <span class="term-keyword">THEN</span> <span class="term-string">'Quadrant I: Concentrate Here'</span>
    <span class="term-keyword">ELSE</span> <span class="term-string">'Quadrant II: Keep Up Good Work'</span>
  <span class="term-keyword">END AS</span> ipa_priority
<span class="term-keyword">FROM</span> siat_academic_evaluations
<span class="term-keyword">GROUP BY</span> dimension;
`,

  stack: `
<span class="term-comment">/* Verified Technical Tooling */</span>
{
  <span class="term-prop">"languages"</span>: [<span class="term-string">"JavaScript (ES6+)"</span>, <span class="term-string">"PHP"</span>, <span class="term-string">"SQL"</span>, <span class="term-string">"HTML5/CSS3"</span>],
  <span class="term-prop">"frameworks"</span>: [<span class="term-string">"CodeIgniter"</span>, <span class="term-string">"Laravel"</span>, <span class="term-string">"Bootstrap 5"</span>, <span class="term-string">"Tailwind"</span>],
  <span class="term-prop">"databases"</span>: [<span class="term-string">"MySQL"</span>, <span class="term-string">"PostgreSQL"</span>],
  <span class="term-prop">"methods"</span>: [<span class="term-string">"WebQual 4.0"</span>, <span class="term-string">"IPA Matrix"</span>, <span class="term-string">"MVC Architecture"</span>],
  <span class="term-prop">"tools"</span>: [<span class="term-string">"Git"</span>, <span class="term-string">"SPSS"</span>, <span class="term-string">"Figma"</span>, <span class="term-string">"VS Code"</span>]
}
`
};

function initTerminalTabs() {
  const terminalTabs = document.querySelectorAll('.terminal-tab-btn');
  const codeBody = document.getElementById('terminal-code-body');
  const terminalContainer = document.querySelector('.terminal-tabs');
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

  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (terminalContainer) {
        updateSegmentedPill(terminalContainer, '#terminal-morph-pill', '.active');
      }
      setSnippet(tab.getAttribute('data-snippet'));
    });
  });

  const activeTab = document.querySelector('.terminal-tab-btn.active');
  if (activeTab && terminalContainer) {
    setTimeout(() => {
      updateSegmentedPill(terminalContainer, '#terminal-morph-pill', '.active');
    }, 100);
  }
}

/* ==========================================================================
   8. 3D CARD TILT WITH DYNAMIC SPECULAR SPOTLIGHT
   ========================================================================== */
function init3DSpotlightCards() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const cards = document.querySelectorAll('.glass-card, .hero-terminal-glass, .stats-bar-card, .apple-explorer-wrapper, .stage-device-frame');

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
          const rotateX = ((y - centerY) / centerY) * -4;
          const rotateY = ((x - centerX) / centerX) * 4;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`;
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
  return `<img src="${src}" class="stage-svg-visual" alt="Arsitektur Sistem - ${type}" loading="lazy" decoding="async">`;
}

function initAppleFeatureExplorer() {
  const stack = document.getElementById('explorer-pills-stack');
  const stage = document.getElementById('explorer-stage-container');
  const upBtn = document.getElementById('stepper-btn-up');
  const downBtn = document.getElementById('stepper-btn-down');

  if (!stack || !stage) return;

  window.updateExplorerContent = function () {
    const lang = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en') ? 'en' : 'id';
    const current = EXPLORER_DATA[currentExplorerIndex];
    const indicator = document.getElementById('explorer-indicator-text');

    if (indicator) {
      const prefix = lang === 'en' ? 'SPECIFICATION' : 'PILAR REKAYASA';
      indicator.textContent = `${prefix} 0${currentExplorerIndex + 1} / 0${EXPLORER_DATA.length}`;
    }

    stack.innerHTML = EXPLORER_DATA.map((item, idx) => {
      const isActive = idx === currentExplorerIndex;
      const title = lang === 'en' ? item.en_title : item.id_title;
      const desc = lang === 'en' ? item.en_desc : item.id_desc;

      if (isActive) {
        return `
          <div class="explorer-callout-card" style="border-left: 3.5px solid ${item.pillColor};">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="pill-icon-dot" style="width:10px;height:10px;border-radius:50%;background:${item.pillColor};box-shadow:0 0 10px ${item.pillColor};display:inline-block;"></span>
              <h5 class="callout-title">${title}</h5>
            </div>
            <p class="callout-desc">${desc}</p>
          </div>
        `;
      } else {
        return `
          <div class="explorer-pill-item" onclick="selectExplorerFeature(${idx})">
            <span class="pill-icon-plus">+</span>
            <span>${title.split(' ')[0]} ${title.split(' ')[1] || ''}</span>
          </div>
        `;
      }
    }).join('');

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

  projectsGrid.innerHTML = projects.map((proj) => `
    <div class="col-lg-4 col-md-6 mb-4 project-item" data-category="${proj.category}">
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
    </div>
  `).join('');

  init3DSpotlightCards();
}

function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectsContainer = document.querySelector('.project-filter-bar');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (projectsContainer) {
        updateSegmentedPill(projectsContainer, '#project-filter-morph-pill', '.active');
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }

      const filter = btn.getAttribute('data-filter');
      const projectItems = document.querySelectorAll('.project-item');

      projectItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInCard 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
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
        <h5 class="modal-section-title">${sectionDesc}</h5>
        <div class="modal-desc-body">${formatProjectMarkdown(project.fullDescription)}</div>
      </div>
      
      <div class="mb-6">
        <h5 class="modal-section-title">${sectionMetrics}</h5>
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
        <h5 class="modal-section-title">${sectionTech}</h5>
        <div class="flex flex-wrap gap-2">
          ${project.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>
      </div>
    `;
  }

  if (modalBackdrop) {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeProjectModal = function () {
  const modalBackdrop = document.getElementById('appleProjectModal');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
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
  const projectsContainer = document.querySelector('.project-filter-bar');
  const terminalContainer = document.querySelector('.terminal-tabs');

  if (skillsContainer) updateSegmentedPill(skillsContainer, '#skill-filter-morph-pill', '.active');
  if (projectsContainer) updateSegmentedPill(projectsContainer, '#project-filter-morph-pill', '.active');
  if (terminalContainer) updateSegmentedPill(terminalContainer, '#terminal-morph-pill', '.active');
  if (typeof updateNavMorphPill === 'function') updateNavMorphPill();
  if (typeof updateIslandMorphPill === 'function') updateIslandMorphPill();
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

  const projectsContainer = document.querySelector('.project-filter-bar');
  if (projectsContainer) {
    setupSegmentedMorphContainer(projectsContainer, '#project-filter-morph-pill', '.filter-btn');
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

          const skillFills = entry.target.querySelectorAll('.skill-bar-fill');
          skillFills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width') || '85%';
            fill.style.width = targetWidth;
          });

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
  initIosGlassSlider();
  initDynamicTyping();
  initTerminalTabs();
  initAmbientCursorGlow();
  init3DSpotlightCards();
  initAppleFeatureExplorer();
  initProjectsRender();
  initProjectFilter();
  initSkillTabs();
  initAllSegmentedMorphPills();
  initNavbarInteractions();
  initDynamicIslandInteractions();
  initMobileMenu();
  initBackToTop();
  initScrollReveal();
  initInteractiveBackground();
  initUnifiedScrollManager();
});
