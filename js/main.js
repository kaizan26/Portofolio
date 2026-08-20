/**
 * Bobby Kamal Aizan Portfolio - Apple Liquid Glass 3.0 Engine
 * Interactive 3D card tilt with mouse spotlight reflections, morphing ambient orbs, SVG banners, and animated metrics.
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

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Controllers with exact defined names
  initThemeToggle();
  initScrollProgress();
  initNavbarSpy();
  initDynamicTyping();
  initScrollReveal();
  initTerminalTabs();
  initAmbientCursorGlow();
  init3DSpotlightCards();
  initSkillTabs();
  initAppleFeatureExplorer();
  initProjectsRender();
  initProjectFilter();
  initBackToTop();
  initMobileMenu();
  initInteractiveBackground();
  initDynamicIsland();
});

/* ==========================================================================
   INTERACTIVE LIQUID BACKGROUND (FLUID MOUSE REPULSION PHYSICS)
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

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Distinct fluid multipliers for dramatic, tangible interactive depth
  const layerPhysics = [
    { factorX: 0.08, factorY: 0.07 },
    { factorX: -0.09, factorY: 0.08 },
    { factorX: 0.07, factorY: -0.09 },
    { factorX: -0.06, factorY: -0.07 },
    { factorX: 0.1, factorY: 0.08 }
  ];

  function animateFluidLayers() {
    // Smooth spring interpolation
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    const deltaX = (currentX - window.innerWidth / 2);
    const deltaY = (currentY - window.innerHeight / 2);

    orbLayers.forEach((layer, index) => {
      const phys = layerPhysics[index % layerPhysics.length];
      const moveX = deltaX * phys.factorX;
      const moveY = deltaY * phys.factorY;
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    if (titaniumGlow) {
      titaniumGlow.style.transform = `translateX(calc(-50% + ${deltaX * 0.04}px)) translateY(${deltaY * 0.03}px)`;
    }

    requestAnimationFrame(animateFluidLayers);
  }

  animateFluidLayers();
}

/* ==========================================================================
   DYNAMIC ISLAND CAPSULE CONTROLLER
   ========================================================================== */
function initDynamicIsland() {
  const island = document.getElementById('dynamic-island');
  if (!island) return;

  const islandBtns = island.querySelectorAll('.island-btn');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 350) {
      island.style.opacity = '1';
      island.style.pointerEvents = 'auto';
      island.style.transform = 'translateX(-50%) translateY(0)';
    } else {
      island.style.opacity = '0';
      island.style.pointerEvents = 'none';
      island.style.transform = 'translateX(-50%) translateY(20px)';
    }
  }, { passive: true });
}

/* ==========================================================================
   1. THEME TOGGLE (APPLE PRO LIQUID DARK / CERAMIC PEARL)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  if (!themeToggleBtn) return;
  
  const savedTheme = localStorage.getItem('bobby-portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    themeToggleBtn.classList.add('morphing');
    setTimeout(() => {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('bobby-portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
      themeToggleBtn.classList.remove('morphing');
    }, 150);
  });
  
  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'bi bi-moon-stars-fill';
      themeToggleBtn.setAttribute('title', 'Switch to Liquid Dark Mode');
    } else {
      themeIcon.className = 'bi bi-sun-fill';
      themeToggleBtn.setAttribute('title', 'Switch to Pearl Light Mode');
    }
  }
}

/* ==========================================================================
   2. SCROLL PROGRESS INDICATOR & NAVBAR SPY
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

function updateNavMorphPill(targetItem = null) {
  const pill = document.getElementById('nav-morph-pill');
  const container = document.querySelector('.nav-links-desktop');
  if (!pill || !container) return;

  const target = targetItem || container.querySelector('.nav-link-item.active') || container.querySelector('.nav-link-item');
  if (!target) return;

  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const offsetLeft = targetRect.left - containerRect.left;
  const width = targetRect.width;

  pill.style.opacity = '1';
  pill.style.transform = `translateX(${offsetLeft}px)`;
  pill.style.width = `${width}px`;
}

function initNavbarSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopContainer = document.querySelector('.nav-links-desktop');
  const desktopLinks = desktopContainer ? desktopContainer.querySelectorAll('.nav-link-item') : [];
  const allNavLinks = document.querySelectorAll('.nav-link-item');

  // Initial pill positioning
  setTimeout(updateNavMorphPill, 100);
  window.addEventListener('resize', () => updateNavMorphPill(), { passive: true });

  // Hover fluid preview on desktop navbar
  if (desktopContainer) {
    desktopLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        updateNavMorphPill(link);
      });
      link.addEventListener('click', (e) => {
        desktopLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        updateNavMorphPill(link);
      });
    });

    desktopContainer.addEventListener('mouseleave', () => {
      updateNavMorphPill();
    });
  }

  // ScrollSpy with Smooth Fluid Pill Sliding
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 220;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      let changed = false;
      allNavLinks.forEach(link => {
        const isMatch = link.getAttribute('href') === `#${current}`;
        if (isMatch && !link.classList.contains('active')) {
          changed = true;
        }
        link.classList.toggle('active', isMatch);
      });

      if (changed) {
        updateNavMorphPill();
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   3. DYNAMIC TYPING EFFECT
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
      "WebQual 4.0 & UX Analytics",
      "Full-Stack Web Systems",
      "Institut Teknologi Kalimantan"
    ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;
  
  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200;
      isDeleting = true;
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
   4. AMBIENT CURSOR GLOW FOLLOWER
   ========================================================================== */
function initAmbientCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  
  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      glow.style.opacity = '1';
    }, { passive: true });
    
    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  } else {
    glow.style.display = 'none';
  }
}

/* ==========================================================================
   5. TERMINAL CONSOLE TABS WITH MORPH PILL
   ========================================================================== */
function initTerminalTabs() {
  const terminalTabs = document.querySelectorAll('.terminal-tab-btn');
  const codeBody = document.getElementById('terminal-code-body');
  const terminalContainer = document.querySelector('.terminal-tabs');
  if (!terminalTabs.length || !codeBody) return;

  const snippets = {
    overview: `
<span class="term-comment"># Engineer & Information Systems Profile</span>
<span class="term-keyword">const</span> <span class="term-prop">engineer</span> = {
  <span class="term-prop">name</span>: <span class="term-string">"Bobby Kamal Aizan"</span>,
  <span class="term-prop">almaMater</span>: <span class="term-string">"ITK Kalimantan"</span>,
  <span class="term-prop">focus</span>: [
    <span class="term-string">"Web Systems"</span>,
    <span class="term-string">"Info Architecture"</span>,
    <span class="term-string">"UX Analytics"</span>
  ],
  <span class="term-prop">researchArea</span>: <span class="term-string">"WebQual 4.0 & IPA"</span>,
  <span class="term-prop">status</span>: <span class="term-val">"Available for Collaboration"</span>
};

<span class="term-cmd">console</span>.log(<span class="term-string">"System operational."</span>);`,
    
    research: `
<span class="term-comment">-- WebQual 4.0 & IPA Matrix Query</span>
<span class="term-keyword">SELECT</span> 
  dim.dimension_name,
  <span class="term-cmd">AVG</span>(eval.performance_score) 
    <span class="term-keyword">AS</span> mean_performance,
  <span class="term-cmd">AVG</span>(eval.importance_score) 
    <span class="term-keyword">AS</span> mean_importance,
  <span class="term-cmd">CASE</span> 
    <span class="term-keyword">WHEN</span> <span class="term-cmd">AVG</span>(eval.importance_score) >= 4.5 
      <span class="term-keyword">THEN</span> <span class="term-string">'Quadrant I: Priority Action'</span>
    <span class="term-keyword">ELSE</span> 
      <span class="term-string">'Quadrant II: Keep Up Work'</span>
  <span class="term-keyword">END AS</span> ipa_classification
<span class="term-keyword">FROM</span> webqual_evaluations eval
<span class="term-keyword">JOIN</span> webqual_dimensions dim 
  <span class="term-keyword">ON</span> eval.dimension_id = dim.id
<span class="term-keyword">GROUP BY</span> dim.dimension_name;`,

    stack: `
{
  <span class="term-prop">"architecture"</span>: <span class="term-string">"MVC / Layered Web"</span>,
  <span class="term-prop">"backend"</span>: [
    <span class="term-string">"PHP 8.x"</span>,
    <span class="term-string">"CodeIgniter"</span>,
    <span class="term-string">"Laravel"</span>,
    <span class="term-string">"Node.js"</span>
  ],
  <span class="term-prop">"frontend"</span>: [
    <span class="term-string">"Modern JS (ES6+)"</span>,
    <span class="term-string">"Tailwind CSS v4"</span>,
    <span class="term-string">"HTML5/CSS3"</span>
  ],
  <span class="term-prop">"databases"</span>: [
    <span class="term-string">"MySQL"</span>,
    <span class="term-string">"PostgreSQL"</span>,
    <span class="term-string">"Relational 3NF"</span>
  ],
  <span class="term-prop">"analytics"</span>: [
    <span class="term-string">"WebQual 4.0"</span>,
    <span class="term-string">"IPA Matrix"</span>,
    <span class="term-string">"SPSS Quantitative"</span>
  ]
}`
  };

  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (terminalContainer) updateSegmentedPill(terminalContainer, '#terminal-morph-pill', '.active');

      const snippetKey = tab.getAttribute('data-snippet');
      if (snippets[snippetKey]) {
        codeBody.innerHTML = snippets[snippetKey].trim();
      }
    });
  });
}

/* ==========================================================================
   6. 3D CARD TILT WITH DYNAMIC SPECULAR MOUSE SPOTLIGHT
   ========================================================================== */
function init3DSpotlightCards() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  
  const cards = document.querySelectorAll('.glass-card, .hero-terminal-glass, .stats-bar-card, .apple-explorer-wrapper, .stage-device-frame');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6.5;
      const rotateY = ((x - centerX) / centerX) * 6.5;
      
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) translateY(-3px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0) translateY(0)';
    });
  });
}

/* ==========================================================================
   6. SCROLL REVEAL & ANIMATED METRICS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
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
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });
  
  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. APPLE PRO INTERACTIVE ARCHITECTURE EXPLORER
   ========================================================================== */
function renderExplorerStageSVG(type) {
  if (type === 'webqual') {
    return `
      <svg class="stage-svg-visual" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="420" height="260" rx="16" fill="rgba(255, 159, 10, 0.05)" stroke="rgba(255, 159, 10, 0.3)" stroke-width="1.5" />
        <line x1="230" y1="30" x2="230" y2="270" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" stroke-dasharray="4 4" />
        <line x1="30" y1="150" x2="430" y2="150" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" stroke-dasharray="4 4" />
        
        <circle cx="230" cy="150" r="85" stroke="rgba(255, 159, 10, 0.25)" stroke-width="1.5" stroke-dasharray="6 6" />
        <polygon points="230,85 295,130 265,210 195,210 165,130" fill="rgba(255, 159, 10, 0.2)" stroke="#ff9f0a" stroke-width="2.5" />
        
        <circle cx="230" cy="85" r="6" fill="#ff9f0a" filter="drop-shadow(0 0 10px #ff9f0a)" />
        <text x="230" y="72" text-anchor="middle" fill="#ff9f0a" font-size="11" font-weight="bold">Usability (4.6)</text>
        
        <circle cx="295" cy="130" r="6" fill="#ff9f0a" filter="drop-shadow(0 0 10px #ff9f0a)" />
        <text x="345" y="135" text-anchor="middle" fill="#ff9f0a" font-size="11" font-weight="bold">Information (4.8)</text>
        
        <circle cx="165" cy="130" r="6" fill="#ff9f0a" filter="drop-shadow(0 0 10px #ff9f0a)" />
        <text x="110" y="135" text-anchor="middle" fill="#ff9f0a" font-size="11" font-weight="bold">Service (4.4)</text>
        
        <text x="330" y="55" fill="#38bdf8" font-size="10" font-weight="bold">Quadrant II: Keep Up</text>
        <text x="130" y="55" fill="#ff453a" font-size="10" font-weight="bold">Quadrant I: Priority</text>
      </svg>
    `;
  } else if (type === 'mvc') {
    return `
      <svg class="stage-svg-visual" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="420" height="260" rx="16" fill="rgba(41, 151, 255, 0.05)" stroke="rgba(41, 151, 255, 0.3)" stroke-width="1.5" />
        
        <!-- Controller Node -->
        <rect x="175" y="50" width="110" height="50" rx="12" fill="rgba(41, 151, 255, 0.25)" stroke="#2997ff" stroke-width="2" />
        <text x="230" y="80" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Controller</text>
        
        <!-- Model Node -->
        <rect x="70" y="180" width="110" height="50" rx="12" fill="rgba(175, 82, 222, 0.25)" stroke="#af52de" stroke-width="2" />
        <text x="125" y="210" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model (DB)</text>
        
        <!-- View Node -->
        <rect x="280" y="180" width="110" height="50" rx="12" fill="rgba(48, 209, 88, 0.25)" stroke="#30d158" stroke-width="2" />
        <text x="335" y="210" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">View (UI)</text>
        
        <!-- Connection Paths -->
        <path d="M 210,100 L 140,180" stroke="#2997ff" stroke-width="2" stroke-dasharray="5 5" />
        <path d="M 250,100 L 320,180" stroke="#30d158" stroke-width="2" stroke-dasharray="5 5" />
        <path d="M 180,205 L 280,205" stroke="#af52de" stroke-width="1.5" stroke-dasharray="4 4" />
        
        <circle cx="175" cy="140" r="4" fill="#2997ff" filter="drop-shadow(0 0 6px #2997ff)" />
        <circle cx="285" cy="140" r="4" fill="#30d158" filter="drop-shadow(0 0 6px #30d158)" />
      </svg>
    `;
  } else if (type === 'database') {
    return `
      <svg class="stage-svg-visual" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="420" height="260" rx="16" fill="rgba(48, 209, 88, 0.05)" stroke="rgba(48, 209, 88, 0.3)" stroke-width="1.5" />
        
        <!-- Table 1: Users -->
        <rect x="50" y="60" width="140" height="85" rx="10" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(48, 209, 88, 0.6)" stroke-width="1.5" />
        <rect x="50" y="60" width="140" height="24" rx="10 10 0 0" fill="rgba(48, 209, 88, 0.3)" />
        <text x="120" y="77" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">users (PK)</text>
        <text x="62" y="102" fill="#86868b" font-size="9.5">🔑 id: INT</text>
        <text x="62" y="118" fill="#86868b" font-size="9.5">👤 name: VARCHAR</text>
        <text x="62" y="134" fill="#86868b" font-size="9.5">📧 email: VARCHAR</text>
        
        <!-- Table 2: Rentals -->
        <rect x="270" y="60" width="140" height="85" rx="10" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(56, 189, 248, 0.6)" stroke-width="1.5" />
        <rect x="270" y="60" width="140" height="24" rx="10 10 0 0" fill="rgba(56, 189, 248, 0.3)" />
        <text x="340" y="77" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">rentals (FK)</text>
        <text x="282" y="102" fill="#86868b" font-size="9.5">🔑 id: INT</text>
        <text x="282" y="118" fill="#86868b" font-size="9.5">🔗 user_id: INT</text>
        <text x="282" y="134" fill="#86868b" font-size="9.5">🚗 car_id: INT</text>
        
        <!-- Relation Line -->
        <path d="M 190,102 C 230,102 230,118 270,118" stroke="#30d158" stroke-width="2" fill="none" />
        <circle cx="190" cy="102" r="3" fill="#30d158" />
        <circle cx="270" cy="118" r="3" fill="#30d158" />
        
        <text x="230" y="240" text-anchor="middle" fill="#30d158" font-size="12" font-weight="bold">Third Normal Form (3NF) Verified</text>
      </svg>
    `;
  } else if (type === 'community') {
    return `
      <svg class="stage-svg-visual" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="420" height="260" rx="16" fill="rgba(175, 82, 222, 0.05)" stroke="rgba(175, 82, 222, 0.3)" stroke-width="1.5" />
        <path d="M 50,150 Q 150,80 230,140 T 410,120" stroke="rgba(175, 82, 222, 0.4)" stroke-width="3" fill="none" />
        
        <!-- Pin 1 -->
        <circle cx="120" cy="110" r="18" fill="rgba(175, 82, 222, 0.2)" stroke="#af52de" stroke-width="2" />
        <circle cx="120" cy="110" r="5" fill="#af52de" filter="drop-shadow(0 0 8px #af52de)" />
        <text x="120" y="145" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">Pantai Lamaru</text>
        
        <!-- Pin 2 -->
        <circle cx="260" cy="160" r="18" fill="rgba(41, 151, 255, 0.2)" stroke="#2997ff" stroke-width="2" />
        <circle cx="260" cy="160" r="5" fill="#2997ff" filter="drop-shadow(0 0 8px #2997ff)" />
        <text x="260" y="195" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">Sentra UMKM</text>
        
        <!-- Pin 3 -->
        <circle cx="360" cy="110" r="18" fill="rgba(48, 209, 88, 0.2)" stroke="#30d158" stroke-width="2" />
        <circle cx="360" cy="110" r="5" fill="#30d158" filter="drop-shadow(0 0 8px #30d158)" />
        <text x="360" y="145" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">Ekowisata</text>
      </svg>
    `;
  } else {
    return `
      <svg class="stage-svg-visual" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="420" height="260" rx="16" fill="rgba(255, 45, 85, 0.05)" stroke="rgba(255, 45, 85, 0.3)" stroke-width="1.5" />
        
        <path d="M 230,60 L 310,100 V 170 C 310,215 230,245 230,245 C 230,245 150,215 150,170 V 100 Z" fill="rgba(255, 45, 85, 0.18)" stroke="#ff2d55" stroke-width="2.5" />
        <circle cx="230" cy="140" r="24" fill="rgba(255, 45, 85, 0.3)" stroke="#ff2d55" stroke-width="2" />
        <path d="M 222,140 L 228,146 L 240,134" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        
        <text x="230" y="195" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">RBAC & Data Encryption</text>
        <text x="230" y="270" text-anchor="middle" fill="#ff2d55" font-size="11">SQLi & XSS Shield Active</text>
      </svg>
    `;
  }
}

function initAppleFeatureExplorer() {
  const stack = document.getElementById('explorer-pills-stack');
  const stage = document.getElementById('explorer-stage-container');
  const upBtn = document.getElementById('stepper-btn-up');
  const downBtn = document.getElementById('stepper-btn-down');
  
  if (!stack || !stage) return;
  
  window.updateExplorerContent = function() {
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
    
    // Update Stage Visual
    stage.innerHTML = renderExplorerStageSVG(current.svgType);
  };
  
  window.selectExplorerFeature = function(index) {
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
   8. HERO TERMINAL TABS CONTROLLER (WITH TYPING SIMULATION)
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
  const tabs = document.querySelectorAll('.terminal-tab-btn');
  const body = document.getElementById('terminal-code-body');
  
  if (!body) return;
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const snippetKey = tab.getAttribute('data-snippet');
      if (TERMINAL_SNIPPETS[snippetKey]) {
        body.style.opacity = '0';
        body.style.transform = 'translateY(6px)';
        body.style.transition = 'all 0.2s ease';
        
        setTimeout(() => {
          body.innerHTML = TERMINAL_SNIPPETS[snippetKey].trim();
          body.style.opacity = '1';
          body.style.transform = 'translateY(0)';
        }, 120);
      }
    });
  });
}

/* ==========================================================================
   9. BESPOKE SVG PROJECT BANNERS (APPLE LIQUID GLASS)
   ========================================================================== */
function getProjectBannerSVG(projectId) {
  if (projectId === 'siat-webqual') {
    return `
      <svg class="project-banner-svg" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="80" r="58" stroke="rgba(56, 189, 248, 0.25)" stroke-width="1.5" stroke-dasharray="4 4" />
        <circle cx="200" cy="80" r="38" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.5" />
        <line x1="200" y1="12" x2="200" y2="148" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1.2" />
        <line x1="130" y1="80" x2="270" y2="80" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1.2" />
        <polygon points="200,28 244,65 224,120 176,120 156,65" fill="rgba(56, 189, 248, 0.22)" stroke="#38bdf8" stroke-width="2.5" />
        <circle cx="200" cy="28" r="5" fill="#38bdf8" filter="drop-shadow(0 0 8px #38bdf8)" />
        <circle cx="244" cy="65" r="5" fill="#38bdf8" filter="drop-shadow(0 0 8px #38bdf8)" />
        <circle cx="224" cy="120" r="5" fill="#38bdf8" filter="drop-shadow(0 0 8px #38bdf8)" />
        <circle cx="176" cy="120" r="5" fill="#38bdf8" filter="drop-shadow(0 0 8px #38bdf8)" />
        <circle cx="156" cy="65" r="5" fill="#38bdf8" filter="drop-shadow(0 0 8px #38bdf8)" />
        <text x="200" y="148" text-anchor="middle" fill="#94a3b8" font-size="9.5" font-family="sans-serif" font-weight="600">WebQual 4.0 &bull; IPA Matrix Analysis</text>
      </svg>
    `;
  } else if (projectId === 'sirem-fleet') {
    return `
      <svg class="project-banner-svg" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 70,80 Q 140,25 200,80 T 330,80" stroke="rgba(168, 85, 247, 0.5)" stroke-width="2.5" fill="none" stroke-dasharray="6 6" />
        <rect x="60" y="55" width="70" height="46" rx="10" fill="rgba(168, 85, 247, 0.25)" stroke="#a855f7" stroke-width="2" />
        <text x="95" y="83" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Model</text>
        <rect x="165" y="55" width="70" height="46" rx="10" fill="rgba(236, 72, 153, 0.25)" stroke="#ec4899" stroke-width="2" />
        <text x="200" y="83" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">View</text>
        <rect x="270" y="55" width="70" height="46" rx="10" fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" stroke-width="2" />
        <text x="305" y="83" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Controller</text>
        <text x="200" y="148" text-anchor="middle" fill="#94a3b8" font-size="9.5" font-family="sans-serif" font-weight="600">CodeIgniter MVC &bull; Fleet Telemetry</text>
      </svg>
    `;
  } else {
    return `
      <svg class="project-banner-svg" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 110,100 Q 150,45 200,95 T 290,70" stroke="rgba(16, 185, 129, 0.5)" stroke-width="3" fill="none" />
        <circle cx="150" cy="62" r="16" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="2" />
        <circle cx="150" cy="62" r="5" fill="#10b981" filter="drop-shadow(0 0 8px #10b981)" />
        <circle cx="250" cy="80" r="16" fill="rgba(6, 182, 212, 0.25)" stroke="#06b6d4" stroke-width="2" />
        <circle cx="250" cy="80" r="5" fill="#06b6d4" filter="drop-shadow(0 0 8px #06b6d4)" />
        <text x="200" y="148" text-anchor="middle" fill="#94a3b8" font-size="9.5" font-family="sans-serif" font-weight="600">GIS Tourism &bull; Community Digitalization</text>
      </svg>
    `;
  }
}

/* ==========================================================================
   10. PROJECTS RENDER & MODAL PREVIEW (BILINGUAL)
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
            <button class="btn-apple-project-action" onclick="event.stopPropagation(); openProjectModal('${proj.id}')">
              <span>${viewDetailsText}</span>
              <div class="action-icon-circle">
                <i class="bi bi-arrow-up-right"></i>
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
          item.style.animation = 'fadeInCard 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Global Tailwind Apple Glass Modal Trigger
window.openProjectModal = function(projectId) {
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
        <h5 class="font-bold text-lg mb-2 text-white">${sectionDesc}</h5>
        <div class="text-secondary text-sm md:text-base leading-relaxed" style="white-space: pre-line;">${project.fullDescription}</div>
      </div>
      
      <div class="mb-6">
        <h5 class="font-bold text-lg mb-3 text-white">${sectionMetrics}</h5>
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
        <h5 class="font-bold text-lg mb-2 text-white">${sectionTech}</h5>
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

window.closeProjectModal = function() {
  const modalBackdrop = document.getElementById('appleProjectModal');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// Close modal when clicking outside card or pressing ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

/* ==========================================================================
   11. GENERIC FLUID SPRING MORPH PILL ENGINE
   ========================================================================== */
function updateSegmentedPill(container, pillSelector, activeSelector = '.active') {
  if (!container) return;
  const pill = container.querySelector(pillSelector);
  const activeItem = container.querySelector(activeSelector);
  if (!pill || !activeItem) return;

  const containerRect = container.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();
  const offsetLeft = itemRect.left - containerRect.left;
  const width = itemRect.width;

  pill.style.opacity = '1';
  pill.style.transform = `translateX(${offsetLeft}px)`;
  pill.style.width = `${width}px`;
}

function setupSegmentedMorphContainer(container, pillSelector, itemSelector) {
  if (!container) return;
  const items = container.querySelectorAll(itemSelector);

  setTimeout(() => updateSegmentedPill(container, pillSelector, '.active'), 80);

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
  // Skills Tabs
  const skillsContainer = document.querySelector('.skill-category-tabs');
  if (skillsContainer) {
    setupSegmentedMorphContainer(skillsContainer, '#skill-filter-morph-pill', '.skill-tab-btn');
  }

  // Project Filter Tabs
  const projectsContainer = document.querySelector('.project-filter-bar');
  if (projectsContainer) {
    setupSegmentedMorphContainer(projectsContainer, '#project-filter-morph-pill', '.filter-btn');
  }

  // Terminal Console Tabs
  const terminalContainer = document.querySelector('.terminal-tabs');
  if (terminalContainer) {
    setupSegmentedMorphContainer(terminalContainer, '#terminal-morph-pill', '.terminal-tab-btn');
  }

  window.addEventListener('resize', () => {
    if (skillsContainer) updateSegmentedPill(skillsContainer, '#skill-filter-morph-pill', '.active');
    if (projectsContainer) updateSegmentedPill(projectsContainer, '#project-filter-morph-pill', '.active');
    if (terminalContainer) updateSegmentedPill(terminalContainer, '#terminal-morph-pill', '.active');
    updateIslandMorphPill();
  }, { passive: true });
}

/* ==========================================================================
   12. DYNAMIC ISLAND WITH FLUID SPRING MORPH PILL
   ========================================================================== */
function updateIslandMorphPill(targetItem = null) {
  const island = document.getElementById('dynamic-island');
  const pill = document.getElementById('island-morph-pill');
  if (!island || !pill) return;

  const target = targetItem || island.querySelector('.island-btn.active') || island.querySelector('.island-btn');
  if (!target) return;

  const islandRect = island.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const offsetLeft = targetRect.left - islandRect.left;
  const width = targetRect.width;

  pill.style.opacity = '1';
  pill.style.transform = `translateX(${offsetLeft}px)`;
  pill.style.width = `${width}px`;
}

function initDynamicIsland() {
  const island = document.getElementById('dynamic-island');
  if (!island) return;

  const islandBtns = island.querySelectorAll('.island-btn');

  // Initial pill update
  setTimeout(() => updateIslandMorphPill(), 150);

  islandBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      updateIslandMorphPill(btn);
    });

    btn.addEventListener('click', () => {
      islandBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateIslandMorphPill(btn);
    });
  });

  island.addEventListener('mouseleave', () => {
    updateIslandMorphPill();
  });

  // Reveal & sync Dynamic Island on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 300) {
      island.style.opacity = '1';
      island.style.pointerEvents = 'auto';
      island.style.transform = 'translateX(-50%) translateY(0)';
    } else {
      island.style.opacity = '0';
      island.style.pointerEvents = 'none';
      island.style.transform = 'translateX(-50%) translateY(20px)';
    }

    // Sync active island button with visible section
    const sections = [
      { id: 'hero', name: 'hero' },
      { id: 'explorer', name: 'explorer' },
      { id: 'projects', name: 'projects' },
      { id: 'contact', name: 'contact' }
    ];

    let currentSection = 'hero';
    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el && scrollPos + 260 >= el.offsetTop) {
        currentSection = sec.id;
      }
    });

    let changed = false;
    islandBtns.forEach(btn => {
      const isMatch = btn.getAttribute('href') === `#${currentSection}`;
      if (isMatch && !btn.classList.contains('active')) {
        changed = true;
      }
      btn.classList.toggle('active', isMatch);
    });

    if (changed) {
      updateIslandMorphPill();
    }
  }, { passive: true });
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
   14. MOBILE NAVIGATION DRAWER WITH APPLE LIQUID EXPAND
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
      icon.className = 'bi bi-x-lg';
    } else {
      icon.className = 'bi bi-list';
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
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }, { passive: true });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   16. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!reveals.length) return;

  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('revealed');
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    });

    reveals.forEach(el => {
      if (!el.classList.contains('revealed')) {
        observer.observe(el);
      }
    });
  } else {
    reveals.forEach(el => el.classList.add('revealed'));
  }
}

/* ==========================================================================
   INITIALIZATION PIPELINE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initInteractiveBackground();
  initThemeToggle();
  initScrollProgress();
  initNavbarSpy();
  initDynamicTyping();
  initTerminalTabs();
  initAmbientCursorGlow();
  init3DTiltEffects();
  initArchitectureExplorer();
  initProjectsRender();
  initProjectFilter();
  initSkillTabs();
  initDynamicIsland();
  initAllSegmentedMorphPills();
  initMobileMenu();
  initBackToTop();
  initScrollReveal();
});

