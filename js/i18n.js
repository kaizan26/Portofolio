/**
 * Bobby Kamal Aizan Portfolio - Internationalization (i18n) Engine with Morphing Animations
 * Seamless bilingual translation system (Indonesian & English) with spring sliding pill & cross-fade
 */

const TRANSLATIONS = {
  id: {
    // Nav
    nav_home: "Home",
    nav_about: "Tentang",
    nav_explorer: "Arsitektur",
    nav_skills: "Keahlian",
    nav_projects: "Proyek",
    nav_research: "Riset",
    nav_socials: "Jejaring",
    nav_contact: "Kontak",
    nav_cta: "Hubungi",
    nav_connect: "Mari Terhubung",

    // Hero
    hero_badge: "Institut Teknologi Kalimantan (ITK) Alumnus",
    hero_focus: "Fokus pada",
    hero_bio: "Software Engineer & Information Systems Specialist. Berpengalaman dalam pengembangan sistem informasi berbasis web, arsitektur MVC (PHP / CodeIgniter / Laravel), JavaScript modern, serta evaluasi kualitas dan user-experience sistem menggunakan metode empiris WebQual 4.0 dan Importance-Performance Analysis (IPA).",
    hero_cta_projects: "Lihat Karya & Riset",
    hero_cta_contact: "Hubungi Saya",
    hero_stack_label: "STACK:",
    typing_roles: [
      "Software Engineering",
      "Information Systems Architecture",
      "WebQual 4.0 & UX Analytics",
      "Full-Stack Web Systems",
      "Institut Teknologi Kalimantan"
    ],
    terminal_status: "Terbuka untuk kolaborasi",

    // Stats
    stat_itk_label: "Sistem Informasi Alumnus",
    stat_syntax_label: "Peer-Reviewed Journal Author",
    stat_webqual_label: "4.0 Empirical Evaluation",
    stat_fullstack_label: "MVC & Web Architecture",

    // Interactive Explorer Section
    explorer_tagline: "Interaktif",
    explorer_title: "Eksplorasi Arsitektur & Rekayasa Sistem",
    explorer_subtitle: "Pilih pilar spesifikasi di bawah untuk menjelajahi metodologi rekayasa sistem, instrumen evaluasi empiris, dan implementasi teknologi nyata.",
    explorer_pill_1: "WebQual 4.0 & IPA Matrix",
    explorer_pill_2: "Arsitektur MVC CodeIgniter",
    explorer_pill_3: "Relational DB & Normalisasi",
    explorer_pill_4: "Digitalisasi Komunitas",
    explorer_pill_5: "Keamanan Sistem & Validasi",

    // About
    about_tagline: "Background",
    about_title: "Profil & Orientasi Profesional",
    about_subtitle: "Kombinasi antara keahlian teknis pengembangan perangkat lunak dan pendekatan analitis sistem informasi untuk menghasilkan solusi digital yang andal dan terukur.",
    about_heading: "Tentang Bobby Kamal Aizan",
    about_p1: "Saya merupakan lulusan program studi Sistem Informasi dari Institut Teknologi Kalimantan (ITK). Fokus keahlian saya mencakup perancangan sistem informasi berbasis web, arsitektur basis data relasional, implementasi pola MVC, serta evaluasi kualitas perangkat lunak secara kuantitatif dan kualitatif.",
    about_p2: "Melalui riset akademik dan pengalaman pengembangan sistem nyata, saya terbiasa menerjemahkan kebutuhan bisnis dan pengguna ke dalam struktur teknis yang teruji, mulai dari tahap analisis kebutuhan, perancangan database, penulisan kode terstruktur, hingga audit kegunaan sistem (Usability & Service Quality).",
    about_principles: "Prinsip Rekayasa Sistem",
    pillar_arch_title: "Arsitektur Terstruktur",
    pillar_arch_desc: "Penerapan pola MVC yang bersih, struktur database ternormalisasi, dan keterbacaan kode yang modular.",
    pillar_ux_title: "Evaluasi Kualitas Empiris",
    pillar_ux_desc: "Pemanfaatan WebQual 4.0 dan Importance-Performance Analysis (IPA) untuk membedah kualitas sistem nyata.",
    timeline_heading: "Jejak Akademik & Riset",
    timeline_1_title: "Penelitian Skripsi SIAT WebQual 4.0 & IPA",
    timeline_1_inst: "Institut Teknologi Kalimantan (ITK) & Universitas Balikpapan",
    timeline_1_desc: "Melakukan riset komprehensif evaluasi kualitas website Sistem Informasi Akademik Terpadu (SIAT) menggunakan instrumen WebQual 4.0 dan kuadran IPA. Terarsip di Repositori ITK.",
    timeline_2_title: "Publikasi Jurnal Ilmiah: SIREM (CodeIgniter)",
    timeline_2_inst: "Syntax: Journal of Software Engineering, CS & IT",
    timeline_2_desc: "Rancang bangun sistem informasi persewaan mobil (SIREM) berbasis web dengan framework CodeIgniter dan penulisan karya ilmiah yang diterbitkan pada jurnal terakreditasi.",
    timeline_3_title: "Optimalisasi Digitalisasi Pariwisata Lamaru",
    timeline_3_inst: "Program Pengabdian Masyarakat ITK",
    timeline_3_desc: "Kolaborasi optimalisasi potensi wisata lokal dan pemberdayaan UMKM melalui strategi integrasi sistem informasi di Kelurahan Lamaru, Balikpapan.",

    // Skills
    skills_tagline: "Kompetensi",
    skills_title: "Keahlian & Instrumen Teknis",
    skills_subtitle: "Teknologi, bahasa pemrograman, kerangka kerja, dan metode yang diaplikasikan dalam pembangunan dan evaluasi sistem.",
    skill_tab_all: "Semua Bidang",
    skill_tab_backend: "Backend & Basis Data",
    skill_tab_frontend: "Frontend & UI",
    skill_tab_analysis: "Analisis & Kualitas Sistem",

    // Projects
    projects_tagline: "Proyek & Publikasi",
    projects_title: "Karya Nyata & Dokumentasi Proyek",
    projects_subtitle: "Daftar karya autentik yang mencakup riset evaluasi sistem institusi, sistem manajemen operasional, dan program pemberdayaan masyarakat.",
    proj_filter_all: "Semua Proyek",
    proj_filter_research: "Riset & WebQual",
    proj_filter_web: "Sistem Informasi Web",
    proj_filter_community: "Pengabdian Masyarakat",
    proj_btn_view: "Lihat Detail & Analisis",
    modal_title_default: "Detail Proyek",
    modal_section_desc: "Deskripsi & Metodologi",
    modal_section_metrics: "Ringkasan Parameter & Luaran",
    modal_section_tech: "Teknologi & Instrumen Terkait",
    modal_btn_close: "Tutup",
    modal_btn_demo: "Tautan Resmi",

    // Publications
    pub_tagline: "Dokumentasi Akademik",
    pub_title: "Publikasi Ilmiah & Repositori",
    pub_subtitle: "Karya ilmiah dan penelitian terindeks yang dapat diakses secara publik pada repositori institusi dan jurnal software engineering.",
    pub_1_badge: "Skripsi Sarjana / Repositori ITK (2023)",
    pub_1_title: "Analisis Kualitas Website Sistem Informasi Akademik Terpadu (SIAT) Universitas Balikpapan Dengan Metode WebQual 4.0 Dan Importance-Performance Analysis",
    pub_1_desc: "Penelitian empiris yang mengukur kualitas website SIAT UNIBA melalui integrasi instrumen WebQual 4.0 (Usability, Information, Service Interaction) serta pemetaan kuadran IPA untuk menentukan titik prioritas perbaikan fungsionalitas dan antarmuka pengguna.",
    pub_1_btn: "Kunjungi Repositori ITK",
    pub_2_badge: "Syntax Journal (2021)",
    pub_2_title: "Pengembangan Sistem Informasi Rental Mobil (Sirem) Berbasis Website Menggunakan Framework Codeigniter",
    pub_2_desc: "Publikasi rekayasa perangkat lunak mengenai pengembangan sistem informasi persewaan mobil menggunakan kerangka kerja CodeIgniter. Mengimplementasikan alur manajemen armada, sistem penjadwalan peminjaman, serta kalkulasi transaksi berbasis basis data relasional.",
    pub_2_btn: "Baca di Syntax Journal",

    // Socials
    social_tagline: "Jejaring",
    social_title: "Profil & Kehadiran Daring",
    social_subtitle: "Kanal resmi untuk terhubung langsung dengan Bobby Kamal Aizan.",
    social_email_handle: "Kontak Langsung",

    // Contact
    contact_tagline: "Kontak",
    contact_title: "Kirim Pesan atau Konsultasi",
    contact_subtitle: "Diskusikan kebutuhan pengembangan sistem informasi, audit kualitas website, atau peluang kolaborasi rekayasa perangkat lunak.",
    contact_info_heading: "Informasi Kontak",
    contact_info_desc: "Terbuka untuk diskusi teknis seputar arsitektur web, implementasi sistem informasi, serta riset kualitas sistem berbasis data.",
    contact_email_title: "Alamat Email",
    contact_loc_title: "Domisili",
    contact_loc_val: "Balikpapan, Kalimantan Timur",
    contact_status_title: "Status",
    contact_status_val: "Terbuka untuk Peluang Kolaborasi",
    contact_label_name: "Nama Lengkap *",
    contact_placeholder_name: "Masukkan nama Anda",
    contact_label_email: "Alamat Email *",
    contact_placeholder_email: "nama@email.com",
    contact_label_subject: "Subjek Pesan",
    contact_placeholder_subject: "Topik atau keperluan diskusi",
    contact_label_message: "Isi Pesan *",
    contact_placeholder_message: "Tuliskan pesan, rincian proyek, atau pertanyaan Anda...",
    contact_btn_send: "Kirim Pesan",
    contact_toast_copied: "Alamat email berhasil disalin!",
    contact_toast_sent: "Pesan Anda berhasil dikirim! Bobby akan segera merespons.",

    // Footer
    footer_tagline: "Sistem Informasi • Institut Teknologi Kalimantan (ITK)",
    footer_copy: "© 2026 Bobby Kamal Aizan. Apple Liquid Glass Architecture.",
    footer_status: "All Systems Operational"
  },

  en: {
    // Nav
    nav_home: "Home",
    nav_about: "About",
    nav_explorer: "Architecture",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_research: "Research",
    nav_socials: "Socials",
    nav_contact: "Contact",
    nav_cta: "Contact",
    nav_connect: "Get in Touch",

    // Hero
    hero_badge: "Institut Teknologi Kalimantan (ITK) Alumnus",
    hero_focus: "Focus on",
    hero_bio: "Software Engineer & Information Systems Specialist. Experienced in web-based information systems development, MVC architecture (PHP / CodeIgniter / Laravel), modern JavaScript, and empirical software quality & user-experience evaluation using WebQual 4.0 and Importance-Performance Analysis (IPA).",
    hero_cta_projects: "Explore Work & Research",
    hero_cta_contact: "Contact Me",
    hero_stack_label: "STACK:",
    typing_roles: [
      "Software Engineering",
      "Information Systems Architecture",
      "WebQual 4.0 & UX Analytics",
      "Full-Stack Web Systems",
      "Institut Teknologi Kalimantan"
    ],
    terminal_status: "Open for opportunities",

    // Stats
    stat_itk_label: "Information Systems Alum",
    stat_syntax_label: "Peer-Reviewed Journal Author",
    stat_webqual_label: "4.0 Empirical Evaluation",
    stat_fullstack_label: "MVC & Web Architecture",

    // Interactive Explorer Section
    explorer_tagline: "Interactive",
    explorer_title: "Architecture & Systems Engineering Explorer",
    explorer_subtitle: "Select the specification hotspots below to explore systems architecture methodologies, empirical evaluation metrics, and real-world implementations.",
    explorer_pill_1: "WebQual 4.0 & IPA Matrix",
    explorer_pill_2: "CodeIgniter MVC Architecture",
    explorer_pill_3: "Relational DB & Normalization",
    explorer_pill_4: "Community Digital Platforms",
    explorer_pill_5: "Security & Clean Code",

    // About
    about_tagline: "Background",
    about_title: "Professional Overview & Orientation",
    about_subtitle: "Combining software engineering technical rigor with information systems analytical depth to deliver resilient, measurable digital solutions.",
    about_heading: "About Bobby Kamal Aizan",
    about_p1: "I am an Information Systems graduate from Institut Teknologi Kalimantan (ITK). My core expertise encompasses web-based information systems architecture, relational database design, MVC implementations, and quantitative & qualitative software quality auditing.",
    about_p2: "Through academic research and real-world system deployments, I bridge business requirements and user needs into structured technical foundations—from requirement engineering, database normalization, modular clean coding, to user experience (WebQual & Usability) optimization.",
    about_principles: "Core Engineering Principles",
    pillar_arch_title: "Structured Architecture",
    pillar_arch_desc: "Clean MVC patterns, normalized relational schemas, and modular maintainable codebases.",
    pillar_ux_title: "Empirical Quality Auditing",
    pillar_ux_desc: "Utilizing WebQual 4.0 and Importance-Performance Analysis (IPA) to assess and enhance real-world system quality.",
    timeline_heading: "Academic & Research Trajectory",
    timeline_1_title: "SIAT WebQual 4.0 & IPA Thesis Research",
    timeline_1_inst: "Institut Teknologi Kalimantan (ITK) & Universitas Balikpapan",
    timeline_1_desc: "Conducted comprehensive empirical quality evaluation on SIAT academic web portal utilizing WebQual 4.0 dimensions and IPA quadrant mapping. Archived in ITK Institutional Repository.",
    timeline_2_title: "Journal Publication: SIREM (CodeIgniter)",
    timeline_2_inst: "Syntax: Journal of Software Engineering, CS & IT",
    timeline_2_desc: "Designed and engineered the SIREM web ecosystem with CodeIgniter MVC and co-authored the research paper published in peer-reviewed Syntax Journal.",
    timeline_3_title: "Lamaru Tourism Digital Transformation",
    timeline_3_inst: "ITK Community Development Department",
    timeline_3_desc: "Collaborated on coastal tourism optimization and local MSME empowerment through digital information architecture in Lamaru, East Kalimantan.",

    // Skills
    skills_tagline: "Expertise",
    skills_title: "Technical Skills & Tooling",
    skills_subtitle: "Languages, frameworks, databases, and methodologies applied across systems development and evaluation.",
    skill_tab_all: "All Fields",
    skill_tab_backend: "Backend & Databases",
    skill_tab_frontend: "Frontend & UI",
    skill_tab_analysis: "Analysis & Quality",

    // Projects
    projects_tagline: "Showcase",
    projects_title: "Featured Works & Documentation",
    projects_subtitle: "Verified portfolio encompassing institutional research, operational management systems, and community initiatives.",
    proj_filter_all: "All Projects",
    proj_filter_research: "Research & WebQual",
    proj_filter_web: "Web Information Systems",
    proj_filter_community: "Community Platforms",
    proj_btn_view: "Explore Details & Analysis",
    modal_title_default: "Project Details",
    modal_section_desc: "Overview & Methodology",
    modal_section_metrics: "Key Parameters & Outcomes",
    modal_section_tech: "Technologies & Instruments",
    modal_btn_close: "Close",
    modal_btn_demo: "Official Reference",

    // Publications
    pub_tagline: "Scholarly Work",
    pub_title: "Scientific Publications & Repositories",
    pub_subtitle: "Indexed research papers and institutional contributions publicly accessible via academic repositories.",
    pub_1_badge: "Undergraduate Thesis / ITK Repository (2023)",
    pub_1_title: "Quality Analysis of Universitas Balikpapan SIAT Academic Website Using WebQual 4.0 and Importance-Performance Analysis",
    pub_1_desc: "Empirical study measuring SIAT UNIBA website quality through WebQual 4.0 dimensions (Usability, Information, Service Interaction) and IPA quadrant plotting to pinpoint functional enhancement priorities.",
    pub_1_btn: "Visit ITK Repository",
    pub_2_badge: "Syntax Journal (2021)",
    pub_2_title: "Development of Web-Based Car Rental Information System (SIREM) Using CodeIgniter Framework",
    pub_2_desc: "Software engineering publication detailing a web-based vehicle rental system built with CodeIgniter. Implemented fleet management workflows, reservation scheduling, and relational database billing.",
    pub_2_btn: "Read on Syntax Journal",

    // Socials
    social_tagline: "Presence",
    social_title: "Online Profiles & Social Hub",
    social_subtitle: "Official channels to connect directly with Bobby Kamal Aizan.",
    social_email_handle: "Direct Contact",

    // Contact
    contact_tagline: "Contact",
    contact_title: "Send a Message or Consultation",
    contact_subtitle: "Discuss web systems engineering, quality auditing, or software engineering collaboration opportunities.",
    contact_info_heading: "Contact Information",
    contact_info_desc: "Open for technical discussions regarding web architectures, information systems implementations, and data-driven quality research.",
    contact_email_title: "Email Address",
    contact_loc_title: "Location",
    contact_loc_val: "Balikpapan, East Kalimantan, Indonesia",
    contact_status_title: "Status",
    contact_status_val: "Open for Global Opportunities",
    contact_label_name: "Full Name *",
    contact_placeholder_name: "Enter your name",
    contact_label_email: "Email Address *",
    contact_placeholder_email: "name@email.com",
    contact_label_subject: "Inquiry Subject",
    contact_placeholder_subject: "Topic or project overview",
    contact_label_message: "Message *",
    contact_placeholder_message: "Write your message, project timeline, or inquiry...",
    contact_btn_send: "Send Message",
    contact_toast_copied: "Email address copied to clipboard!",
    contact_toast_sent: "Your message has been sent! Bobby will reach out to you shortly.",

    // Footer
    footer_tagline: "Information Systems • Institut Teknologi Kalimantan (ITK)",
    footer_copy: "© 2026 Bobby Kamal Aizan. Apple Liquid Glass Architecture.",
    footer_status: "All Systems Operational"
  }
};

let currentLanguage = localStorage.getItem('bobby_portfolio_lang') || 'id';

function getTranslation(key) {
  const langPack = TRANSLATIONS[currentLanguage] || TRANSLATIONS['id'];
  return langPack[key] || key;
}

function setLanguage(lang, smooth = true) {
  if (lang !== 'id' && lang !== 'en') return;
  currentLanguage = lang;
  localStorage.setItem('bobby_portfolio_lang', lang);
  document.documentElement.setAttribute('lang', lang);
  
  updateLanguageSwitcherUI();

  const elements = document.querySelectorAll('[data-i18n]');
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');

  if (smooth) {
    elements.forEach(el => {
      el.classList.add('i18n-morph');
      el.classList.add('i18n-morph-fade');
    });

    setTimeout(() => {
      applyTranslations();
      elements.forEach(el => {
        el.classList.remove('i18n-morph-fade');
      });

      if (typeof initDynamicTyping === 'function') {
        initDynamicTyping();
      }
      if (typeof initProjectsRender === 'function') {
        initProjectsRender();
      }
      if (typeof updateExplorerContent === 'function') {
        updateExplorerContent();
      }
      if (typeof updateNavMorphPill === 'function') {
        updateNavMorphPill();
      }
      if (typeof refreshAllSegmentedPills === 'function') {
        refreshAllSegmentedPills();
      }
    }, 180);
  } else {
    applyTranslations();
    if (typeof initDynamicTyping === 'function') {
      initDynamicTyping();
    }
    if (typeof initProjectsRender === 'function') {
      initProjectsRender();
    }
    if (typeof updateExplorerContent === 'function') {
      updateExplorerContent();
    }
    if (typeof updateNavMorphPill === 'function') {
      updateNavMorphPill();
    }
    if (typeof refreshAllSegmentedPills === 'function') {
      refreshAllSegmentedPills();
    }
  }
}

function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = getTranslation(key);
    if (text) {
      el.textContent = text;
    }
  });

  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = getTranslation(key);
    if (text) {
      el.setAttribute('placeholder', text);
    }
  });
}

function updateLanguageSwitcherUI() {
  const switchers = document.querySelectorAll('.lang-switcher-pro');
  const idBtns = document.querySelectorAll('.lang-btn-id');
  const enBtns = document.querySelectorAll('.lang-btn-en');
  
  switchers.forEach(s => {
    s.setAttribute('data-lang', currentLanguage);
  });
  
  if (currentLanguage === 'id') {
    idBtns.forEach(b => b.classList.add('active'));
    enBtns.forEach(b => b.classList.remove('active'));
  } else {
    idBtns.forEach(b => b.classList.remove('active'));
    enBtns.forEach(b => b.classList.add('active'));
  }
}

function initI18n() {
  document.querySelectorAll('.lang-switcher-pro').forEach(switcher => {
    if (!switcher.querySelector('.lang-morph-pill')) {
      const morphPill = document.createElement('div');
      morphPill.className = 'lang-morph-pill';
      switcher.prepend(morphPill);
    }
  });

  setLanguage(currentLanguage, false);
  
  document.querySelectorAll('.lang-btn-id').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentLanguage !== 'id') {
        setLanguage('id', true);
      }
    });
  });

  document.querySelectorAll('.lang-btn-en').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentLanguage !== 'en') {
        setLanguage('en', true);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initI18n);
