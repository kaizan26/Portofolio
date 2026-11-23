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
    nav_nightlight_on: "Matikan Night Light (Filter Layar Hangat)",
    nav_nightlight_off: "Aktifkan Night Light (Mode Nyaman Mata)",
    toast_nightlight_on: "Mode Night Light Aktif",
    toast_nightlight_off: "Mode Standar Dikembalikan",
    nav_perf_on: "Matikan Mode Performa",
    nav_perf_off: "Mode Performa",
    toast_perf_on: "Mode Performa Aktif",
    toast_perf_off: "Mode Visual Lengkap Aktif",

    // Hero
    hero_badge: "Institut Teknologi Kalimantan (ITK) Alumnus",
    hero_focus: "Fokus pada",
    hero_bio: "Profesional administrasi yang berorientasi pada detail dengan latar belakang akademis Sistem Informasi dari Institut Teknologi Kalimantan (IPK 3.63). Berpengalaman di PT. Abicam dalam optimalisasi rute dan jadwal armada, kepatuhan regulasi transportasi, manajemen data, dokumentasi administratif, koordinasi sistem operasional, serta penyusunan SOP di Balai Diklat Keuangan.",
    hero_cta_projects: "Lihat Karya & Riset",
    hero_cta_contact: "Hubungi Saya",
    hero_cta_cv: "Ringkasan CV",
    hero_stack_label: "KOMPETENSI:",
    typing_roles: [
      "Administrasi Transportasi",
      "Manajemen Data & Arsip",
      "Sistem Informasi ITK",
      "Penyusunan SOP & Kepatuhan",
      "Microsoft Office & Analisis"
    ],
    terminal_status: "Terbuka untuk kolaborasi",
    cli_welcome_hint: "Ketik help atau klik chip di atas untuk menjelajah portofolio via CLI.",
    modal_cv_title: "Curriculum Vitae",
    modal_cv_name: "Bobby Kamal Aizan, S.Kom",
    modal_cv_badge: "Profil Terverifikasi • Alumnus ITK (IPK 3.63)",
    modal_cv_role: "Administrator & Information Systems Specialist",
    modal_cv_contact_cta: "Hubungi",
    modal_cv_sec_summary: "Executive Summary",
    modal_cv_summary_text: "Profesional administrasi yang berorientasi pada detail dengan latar belakang akademis Sistem Informasi dari Institut Teknologi Kalimantan. Berpengalaman dalam mengefisiensikan proses operasional, memiliki keterampilan kuat dalam manajemen data, dokumentasi administratif, dan koordinasi sistem untuk meningkatkan akurasi dan efisiensi. Dengan ketelitian tinggi dan pendekatan terstruktur dalam pemecahan masalah, saya unggul dalam pengelolaan rekam data, memastikan kepatuhan prosedural, serta mendukung operasional harian.",
    modal_cv_sec_education: "Pendidikan & Almamater",
    modal_cv_edu_desc: "Lulus Januari 2024 • Sarjana Komputer • Fakultas Matematika dan Teknologi Informasi • IPK: 3.63 (Sangat Memuaskan)",
    modal_cv_sec_publication: "Pengalaman Kerja Utama",
    modal_cv_pub_desc: "Administrator Transportation di PT. Abicam (Des 2022 – Sekarang) & Magang Pengembangan SOP di Balai Diklat Keuangan (Jun 2021 – Agu 2021).",
    modal_cv_sec_tech: "Kompetensi Utama (Core Competencies)",
    modal_cv_tech_languages: "MICROSOFT OFFICE",
    modal_cv_tech_backend: "OPERASIONAL & ARMADA",
    modal_cv_tech_research: "SISTEM & DOKUMEN",
    modal_cv_tech_tools: "SOFT SKILLS & BAHASA",
    modal_cv_invite_chat: "Ajak Diskusi / Kolaborasi",

    // CV Dual Format (Visual QuickLook vs ATS)
    cv_tab_visual: "QuickLook (Visual)",
    cv_tab_ats: "Standar ATS",
    cv_active_visual: "Format: Apple QuickLook (Visual)",
    cv_active_ats: "Format: Standar ATS (HR Parser Ready)",
    cv_ats_summary_title: "ABOUT ME (RINGKASAN PROFESIONAL)",
    cv_ats_summary_text: "Profesional administrasi yang berorientasi pada detail dengan latar belakang akademis Sistem Informasi dari Institut Teknologi Kalimantan. Berpengalaman dalam mengefisiensikan proses operasional, memiliki keterampilan kuat dalam manajemen data, dokumentasi administratif, dan koordinasi sistem untuk meningkatkan akurasi dan efisiensi. Dengan ketelitian tinggi dan pendekatan terstruktur dalam pemecahan masalah, saya unggul dalam pengelolaan rekam data, memastikan kepatuhan prosedural, serta mendukung operasional harian.",
    cv_ats_exp_title: "EXPERIENCE (PENGALAMAN KERJA)",
    cv_ats_exp_job1_role: "Administrator Transportation",
    cv_ats_exp_job1_company: "PT. Abicam | Balikpapan",
    cv_ats_exp_job1_period: "Des 2022 – Sekarang",
    cv_ats_exp_job1_b1: "Mengoptimalkan efisiensi operasional dengan menyempurnakan jadwal perjalanan dan rute armada.",
    cv_ats_exp_job1_b2: "Memastikan kepatuhan terhadap regulasi transportasi, menjaga standar keselamatan dan operasional melalui pemantauan kinerja armada secara berkala.",
    cv_ats_exp_job1_b3: "Memfasilitasi komunikasi antara pengemudi, mekanik, dan pelanggan, meningkatkan kepuasan pelanggan serta meminimalkan kendala mobilitas.",
    cv_ats_exp_job1_b4: "Mengelola dokumentasi administratif, termasuk laporan perjalanan, izin kendaraan, dan sertifikasi pemeliharaan, memastikan kelengkapan serta pembaruan tepat waktu.",
    cv_ats_exp_job2_role: "Intern",
    cv_ats_exp_job2_company: "Balai Diklat Keuangan | Balikpapan",
    cv_ats_exp_job2_period: "Jun 2021 – Agu 2021",
    cv_ats_exp_job2_b1: "Mengembangkan Standar Operasional Prosedur (SOP) untuk inisiatif pembelajaran daring.",
    cv_ats_edu_title: "EDUCATION (PENDIDIKAN)",
    cv_ats_edu_school: "Institut Teknologi Kalimantan (ITK)",
    cv_ats_edu_degree: "Information Systems — Sarjana Komputer",
    cv_ats_edu_period: "Januari 2024 | Balikpapan",
    cv_ats_edu_faculty: "Sarjana Komputer, Fakultas Matematika dan Teknologi Informasi",
    cv_ats_edu_gpa: "Indeks Prestasi Kumulatif (IPK): 3.63 / 4.00 (Sangat Memuaskan)",
    cv_ats_skills_title: "SKILLS (KEAHLIAN)",
    cv_ats_skills_soft_lbl: "Soft skills:",
    cv_ats_skills_soft_val: "Berorientasi pada detail (detail-oriented) dan manajemen waktu yang sangat baik (excellent time management).",
    cv_ats_skills_hard_lbl: "Hard skills:",
    cv_ats_skills_hard_val: "Mahir Microsoft Office (Word, Excel, dll.), koordinasi operasional armada, dan pengetahuan komputer umum.",
    cv_ats_skills_lang_lbl: "Languages:",
    cv_ats_skills_lang_val: "Fasih berbahasa Indonesia dan Inggris (Fluent in Indonesian and English).",

    // Stats
    stat_itk_label: "IPK 3.63 (Sistem Informasi)",
    stat_syntax_label: "Administrator Transportasi",
    stat_webqual_label: "PT. Abicam (Des 2022 - Sekarang)",
    stat_fullstack_label: "MS Office & Data Management",

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
    about_subtitle: "Kombinasi antara keahlian operasional administrasi, koordinasi sistem transportasi, dan latar belakang analitis Sistem Informasi dari Institut Teknologi Kalimantan.",
    about_heading: "Tentang Bobby Kamal Aizan",
    about_p1: "Saya merupakan lulusan program studi Sistem Informasi dari Institut Teknologi Kalimantan (ITK) dengan IPK 3.63 (Sangat Memuaskan). Saat ini saya aktif berkarier sebagai Administrator Transportation di PT. Abicam Balikpapan serta memiliki pengalaman magang di Balai Diklat Keuangan Balikpapan.",
    about_p2: "Dengan ketelitian tinggi dan pendekatan terstruktur dalam pemecahan masalah, saya memiliki keterampilan kuat dalam manajemen data, dokumentasi administratif, koordinasi armada & sistem operasional, kepatuhan prosedural, serta penyusunan Standar Operasional Prosedur (SOP).",
    about_principles: "Prinsip Kerja & Operasional",
    pillar_arch_title: "Manajemen Data & Kepatuhan",
    pillar_arch_desc: "Pengelolaan dokumentasi administratif, izin kendaraan, dan sertifikasi pemeliharaan secara tertib dan akurat.",
    pillar_ux_title: "Efisiensi Operasional",
    pillar_ux_desc: "Optimalisasi jadwal perjalanan armada dan rute guna menekan kendala mobilitas serta meningkatkan kepuasan pelanggan.",
    timeline_heading: "Jejak Karier & Pendidikan",
    timeline_1_title: "Administrator Transportation — PT. Abicam",
    timeline_1_inst: "PT. Abicam | Balikpapan (Des 2022 – Sekarang)",
    timeline_1_desc: "Mengoptimalkan efisiensi operasional dengan menyempurnakan jadwal perjalanan dan rute armada, memastikan kepatuhan regulasi keselamatan, memfasilitasi komunikasi pengemudi-mekanik-pelanggan, dan mengelola perizinan serta sertifikasi kendaraan.",
    timeline_2_title: "Kelulusan S1 Sistem Informasi (IPK 3.63)",
    timeline_2_inst: "Institut Teknologi Kalimantan (ITK) — Jan 2024",
    timeline_2_desc: "Lulus Sarjana Komputer (S.Kom) pada Fakultas Matematika dan Teknologi Informasi dengan predikat Sangat Memuaskan (IPK: 3.63/4.00).",
    timeline_3_title: "Magang Pengembangan SOP Pembelajaran Daring",
    timeline_3_inst: "Balai Diklat Keuangan | Balikpapan (Jun 2021 – Agu 2021)",
    timeline_3_desc: "Mengembangkan Standar Operasional Prosedur (SOP) terstruktur untuk mendukung inisiatif dan kelancaran program pembelajaran daring instansi.",

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
    contact_btn_sending: "Mengirim Pesan...",
    contact_btn_sent: "Pesan Terkirim!",
    contact_err_required: "Mohon lengkapi semua kolom yang wajib diisi (*).",
    contact_err_email: "Format alamat email tidak valid.",
    contact_toast_copied: "Alamat email berhasil disalin ke clipboard!",
    contact_toast_sent: "Terima kasih {name}! Pesan Anda telah diterima. Bobby akan segera menghubungi Anda di {email}.",

    // Footer
    footer_tagline: "Sistem Informasi • Institut Teknologi Kalimantan (ITK)",
    footer_copy: "© 2026 Bobby Kamal Aizan.",
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
    nav_nightlight_on: "Disable Night Light (Warm Screen Filter)",
    nav_nightlight_off: "Enable Night Light (Eye Comfort Mode)",
    toast_nightlight_on: "Night Light Mode Active",
    toast_nightlight_off: "Standard Mode Restored",
    nav_perf_on: "Disable Performance Mode",
    nav_perf_off: "Performance Mode",
    toast_perf_on: "Performance Mode Active",
    toast_perf_off: "Full Visual Mode Active",

    // Hero
    hero_badge: "Institut Teknologi Kalimantan (ITK) Alumnus",
    hero_focus: "Focus on",
    hero_bio: "A detail-oriented administrative professional with an academic background in Information Systems from Institut Teknologi Kalimantan (GPA 3.63). Experienced at PT. Abicam in fleet route and schedule optimization, regulatory compliance, data management, administrative documentation, operational system coordination, and SOP development at Balai Diklat Keuangan.",
    hero_cta_projects: "Explore Work & Research",
    hero_cta_contact: "Contact Me",
    hero_cta_cv: "CV Summary",
    hero_stack_label: "COMPETENCIES:",
    typing_roles: [
      "Transportation Administration",
      "Data & Records Management",
      "ITK Information Systems",
      "SOP Development & Compliance",
      "Microsoft Office & Analytics"
    ],
    terminal_status: "Open for Collaboration",
    cli_welcome_hint: "Type help or click the chips above to explore the portfolio via CLI.",
    modal_cv_title: "Curriculum Vitae",
    modal_cv_name: "Bobby Kamal Aizan, S.Kom",
    modal_cv_badge: "Verified Profile • ITK Alumnus (GPA 3.63)",
    modal_cv_role: "Administrator & Information Systems Specialist",
    modal_cv_contact_cta: "Contact",
    modal_cv_sec_summary: "Executive Summary",
    modal_cv_summary_text: "A detail-oriented administrative professional with an academic background in Information Systems from Institut Teknologi Kalimantan. Experienced in streamlining operational processes, I possess strong skills in data management, administrative documentation, and system coordination to improve accuracy and efficiency. With a sharp eye for detail and a structured approach to problem-solving, I excel in maintaining records, ensuring procedural compliance, and supporting daily operations—making me a strong fit for the Administrator position.",
    modal_cv_sec_education: "Education & Alma Mater",
    modal_cv_edu_desc: "Graduated Jan 2024 • Bachelor of Computer Science • Faculty of Mathematics and IT • GPA: 3.63",
    modal_cv_sec_publication: "Professional Experience",
    modal_cv_pub_desc: "Administrator Transportation at PT. Abicam (Dec 2022 – Present) & SOP Development Intern at Balai Diklat Keuangan (Jun 2021 – Aug 2021).",
    modal_cv_sec_tech: "Core Competencies",
    modal_cv_tech_languages: "MICROSOFT OFFICE",
    modal_cv_tech_backend: "OPERATIONS & FLEET",
    modal_cv_tech_research: "SYSTEMS & RECORDS",
    modal_cv_tech_tools: "SOFT SKILLS & LANGUAGES",
    modal_cv_invite_chat: "Discuss / Collaborate",

    // CV Dual Format (Visual QuickLook vs ATS)
    cv_tab_visual: "QuickLook (Visual)",
    cv_tab_ats: "ATS-Friendly",
    cv_active_visual: "Format: Apple QuickLook (Visual)",
    cv_active_ats: "Format: Standard ATS (HR Parser Ready)",
    cv_ats_summary_title: "ABOUT ME",
    cv_ats_summary_text: "A detail-oriented administrative professional with an academic background in Information Systems from Institut Teknologi Kalimantan. Experienced in streamlining operational processes, I possess strong skills in data management, administrative documentation, and system coordination to improve accuracy and efficiency. With a sharp eye for detail and a structured approach to problem-solving, I excel in maintaining records, ensuring procedural compliance, and supporting daily operations—making me a strong fit for the Administrator position.",
    cv_ats_exp_title: "EXPERIENCE",
    cv_ats_exp_job1_role: "Administrator Transportation",
    cv_ats_exp_job1_company: "PT. Abicam | Balikpapan",
    cv_ats_exp_job1_period: "Dec 2022 – Present",
    cv_ats_exp_job1_b1: "Optimized operational efficiency by enhancing travel schedules and fleet routes.",
    cv_ats_exp_job1_b2: "Ensured compliance with transportation regulations, maintaining safety and operational standards through regular fleet performance monitoring.",
    cv_ats_exp_job1_b3: "Facilitated communication among drivers, mechanics, and customers, improving customer satisfaction and minimizing mobility constraints.",
    cv_ats_exp_job1_b4: "Managed administrative documentation, including travel reports, vehicle permits, and maintenance certifications, ensuring completeness and timely updates.",
    cv_ats_exp_job2_role: "Intern",
    cv_ats_exp_job2_company: "Balai Diklat Keuangan | Balikpapan",
    cv_ats_exp_job2_period: "Jun 2021 – Aug 2021",
    cv_ats_exp_job2_b1: "Developed Standard Operating Procedures for online learning initiatives.",
    cv_ats_edu_title: "EDUCATION",
    cv_ats_edu_school: "Institut Teknologi Kalimantan",
    cv_ats_edu_degree: "Information Systems — Bachelor of Computer Science",
    cv_ats_edu_period: "Jan 2024 | Balikpapan",
    cv_ats_edu_faculty: "Faculty of Mathematics and Information Technology",
    cv_ats_edu_gpa: "GPA: 3.63 / 4.00",
    cv_ats_skills_title: "SKILLS",
    cv_ats_skills_soft_lbl: "Soft skills:",
    cv_ats_skills_soft_val: "Detail-oriented and excellent time management.",
    cv_ats_skills_hard_lbl: "Hard skills:",
    cv_ats_skills_hard_val: "Proficient in Microsoft Office (Word, Excel, etc.) and general computer knowledge.",
    cv_ats_skills_lang_lbl: "Languages:",
    cv_ats_skills_lang_val: "Fluent in Indonesian and English.",

    // Stats
    stat_itk_label: "GPA 3.63 (Info Systems)",
    stat_syntax_label: "Transportation Administrator",
    stat_webqual_label: "PT. Abicam (Dec 2022 - Present)",
    stat_fullstack_label: "MS Office & Data Management",

    // Interactive Explorer Section
    explorer_tagline: "Interactive",
    explorer_title: "Architecture & Systems Engineering Explorer",
    explorer_subtitle: "Select the specification hotspots below to explore systems architecture methodologies, empirical evaluation metrics, and real-world implementations.",
    explorer_pill_1: "WebQual 4.0 & IPA Matrix",
    explorer_pill_2: "CodeIgniter MVC Architecture",
    explorer_pill_3: "Relational DB & Normalization",
    explorer_pill_4: "Community Digitalization",
    explorer_pill_5: "System Security & Validation",

    // About
    about_tagline: "Background",
    about_title: "Professional Overview & Orientation",
    about_subtitle: "Combining operational administrative diligence, transportation systems coordination, and analytical Information Systems depth from Institut Teknologi Kalimantan.",
    about_heading: "About Bobby Kamal Aizan",
    about_p1: "I am an Information Systems graduate from Institut Teknologi Kalimantan (ITK) with a 3.63 GPA (Distinction). Currently working as Administrator Transportation at PT. Abicam Balikpapan, with previous internship experience at Balai Diklat Keuangan Balikpapan.",
    about_p2: "With a sharp eye for detail and a structured approach to problem-solving, I possess strong skills in data management, administrative documentation, fleet and operational systems coordination, procedural compliance, and Standard Operating Procedure (SOP) development.",
    about_principles: "Operational & Professional Principles",
    pillar_arch_title: "Data Management & Compliance",
    pillar_arch_desc: "Managing administrative records, vehicle permits, and maintenance certifications with precision and procedural rigor.",
    pillar_ux_title: "Operational Efficiency",
    pillar_ux_desc: "Optimizing travel schedules and fleet routes to minimize mobility constraints and improve customer satisfaction.",
    timeline_heading: "Career & Education Trajectory",
    timeline_1_title: "Administrator Transportation — PT. Abicam",
    timeline_1_inst: "PT. Abicam | Balikpapan (Dec 2022 – Present)",
    timeline_1_desc: "Optimizing fleet travel schedules and routes, ensuring compliance with transportation regulations, facilitating driver-mechanic-customer communication, and managing vehicle permits and maintenance certifications.",
    timeline_2_title: "Graduation: S1 Information Systems (GPA 3.63)",
    timeline_2_inst: "Institut Teknologi Kalimantan (ITK) — Jan 2024",
    timeline_2_desc: "Earned Bachelor of Computer Science from Faculty of Mathematics and Information Technology with academic distinction (GPA: 3.63/4.00).",
    timeline_3_title: "Online Learning SOP Internship",
    timeline_3_inst: "Balai Diklat Keuangan | Balikpapan (Jun 2021 – Aug 2021)",
    timeline_3_desc: "Formulated and developed Standard Operating Procedures (SOP) supporting the institution's online learning initiatives.",

    // Skills
    skills_tagline: "Competencies",
    skills_title: "Technical Skills & Tooling",
    skills_subtitle: "Technologies, programming languages, frameworks, and methodologies applied across systems development and evaluation.",
    skill_tab_all: "All Fields",
    skill_tab_backend: "Backend & Databases",
    skill_tab_frontend: "Frontend & UI",
    skill_tab_analysis: "System Analysis & Quality",

    // Projects
    projects_tagline: "Projects & Publications",
    projects_title: "Featured Works & Project Documentation",
    projects_subtitle: "Verified portfolio encompassing institutional research, operational management systems, and community empowerment initiatives.",
    proj_filter_all: "All Projects",
    proj_filter_research: "Research & WebQual",
    proj_filter_web: "Web Information Systems",
    proj_filter_community: "Community Service",
    proj_btn_view: "View Details & Analysis",
    modal_title_default: "Project Details",
    modal_section_desc: "Description & Methodology",
    modal_section_metrics: "Key Parameters & Outcomes Summary",
    modal_section_tech: "Related Technologies & Instruments",
    modal_btn_close: "Close",
    modal_btn_demo: "Official Link",

    // Publications
    pub_tagline: "Academic Documentation",
    pub_title: "Scientific Publications & Repositories",
    pub_subtitle: "Indexed research papers and publications publicly accessible on institutional repositories and software engineering journals.",
    pub_1_badge: "Undergraduate Thesis / ITK Repository (2023)",
    pub_1_title: "Quality Analysis of Universitas Balikpapan SIAT Academic Website Using WebQual 4.0 and Importance-Performance Analysis",
    pub_1_desc: "Empirical study measuring SIAT UNIBA website quality through WebQual 4.0 dimensions (Usability, Information, Service Interaction) and IPA quadrant plotting to determine functional enhancement and user interface priorities.",
    pub_1_btn: "Visit ITK Repository",
    pub_2_badge: "Syntax Journal (2021)",
    pub_2_title: "Development of Web-Based Car Rental Information System (SIREM) Using CodeIgniter Framework",
    pub_2_desc: "Software engineering publication detailing a web-based vehicle rental system built with CodeIgniter framework. Implemented fleet management workflows, reservation scheduling, and relational database billing calculation.",
    pub_2_btn: "Read on Syntax Journal",

    // Socials
    social_tagline: "Socials",
    social_title: "Profiles & Online Presence",
    social_subtitle: "Official channels to connect directly with Bobby Kamal Aizan.",
    social_email_handle: "Direct Contact",

    // Contact
    contact_tagline: "Contact",
    contact_title: "Send a Message or Consultation",
    contact_subtitle: "Discuss information systems development needs, website quality auditing, or software engineering collaboration opportunities.",
    contact_info_heading: "Contact Information",
    contact_info_desc: "Open for technical discussions regarding web architectures, information systems implementations, and data-driven quality research.",
    contact_email_title: "Email Address",
    contact_loc_title: "Location",
    contact_loc_val: "Balikpapan, East Kalimantan, Indonesia",
    contact_status_title: "Status",
    contact_status_val: "Open for Collaboration Opportunities",
    contact_label_name: "Full Name *",
    contact_placeholder_name: "Enter your name",
    contact_label_email: "Email Address *",
    contact_placeholder_email: "name@email.com",
    contact_label_subject: "Message Subject",
    contact_placeholder_subject: "Topic or purpose of discussion",
    contact_label_message: "Message Body *",
    contact_placeholder_message: "Write your message, project details, or questions...",
    contact_btn_send: "Send Message",
    contact_btn_sending: "Sending Message...",
    contact_btn_sent: "Message Sent Successfully!",
    contact_err_required: "Please fill out all required fields (*).",
    contact_err_email: "Please enter a valid email address.",
    contact_toast_copied: "Email address copied to clipboard!",
    contact_toast_sent: "Thank you {name}! Your message has been received. Bobby will reach out to you shortly at {email}.",

    // Footer
    footer_tagline: "Information Systems • Institut Teknologi Kalimantan (ITK)",
    footer_copy: "© 2026 Bobby Kamal Aizan.",
    footer_status: "All Systems Operational"
  }
};

let currentLanguage = localStorage.getItem('bobby_portfolio_lang') || localStorage.getItem('bobby-portfolio-lang') || 'id';

function getTranslation(key) {
  const langPack = TRANSLATIONS[currentLanguage] || TRANSLATIONS['id'];
  return langPack[key] || key;
}

function setLanguage(lang, smooth = true) {
  if (lang !== 'id' && lang !== 'en') return;
  currentLanguage = lang;
  localStorage.setItem('bobby_portfolio_lang', lang);
  localStorage.setItem('bobby-portfolio-lang', lang);
  document.documentElement.setAttribute('lang', lang);

  updateLanguageSwitcherUI();

  const elements = document.querySelectorAll('[data-i18n]');

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
      if (typeof initNightLightToggle === 'function') {
        initNightLightToggle();
      }
      if (typeof initPerformanceEngine === 'function') {
        initPerformanceEngine();
      }
      if (typeof showHudToast === 'function' && smooth) {
        const toastMsg = lang === 'id' ? 'Bahasa Indonesia Aktif' : 'English Language Active';
        const flagIcon = lang === 'id' ? 'bi-translate' : 'bi-translate';
        showHudToast(toastMsg, flagIcon);
      }
    }, 150);
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
    if (typeof initPerformanceEngine === 'function') {
      initPerformanceEngine();
    }
  }
}

function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = getTranslation(key);
    if (!text) return;

    // Check if element contains an icon <i>
    const icon = el.querySelector('i');
    if (icon) {
      const iconClone = icon.cloneNode(true);
      el.innerHTML = '';
      el.appendChild(iconClone);
      el.appendChild(document.createTextNode(' ' + text));
    } else {
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
