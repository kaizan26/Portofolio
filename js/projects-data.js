/**
 * Bobby Kamal Aizan - Bilingual Projects Data Repository
 * Authenticated academic research & web systems (Indonesian & English)
 */

const PORTFOLIO_PROJECTS_BILINGUAL = [
  {
    id: "siat-webqual",
    category: "research",
    badgeType: "thesis",
    demoUrl: "https://repository.itk.ac.id",
    githubUrl: null,
    techStack: ["WebQual 4.0", "IPA Matrix", "Statistical Analysis", "Information Systems Audit", "SPSS", "UI/UX Heuristic"],
    id_content: {
      title: "SIAT Academic System Quality & UX Analysis",
      categoryLabel: "Riset Skripsi & Evaluasi UX",
      badgeLabel: "Repositori ITK 2023",
      shortDescription: "Evaluasi kualitas website Sistem Informasi Akademik Terpadu (SIAT) Universitas Balikpapan menggunakan metodologi WebQual 4.0 dan Importance-Performance Analysis (IPA) 4-Kuadran.",
      fullDescription: `Penelitian skripsi tingkat sarjana di Institut Teknologi Kalimantan (ITK) yang mengevaluasi secara empiris kualitas digital platform Sistem Informasi Akademik Terpadu (SIAT) pada Universitas Balikpapan.

### Metodologi & Temuan Kunci:
- **Dimensi WebQual 4.0**: Mengukur 3 dimensi utama yaitu Usability Quality (Kemudahan Penggunaan), Information Quality (Kualitas Informasi), dan Service Interaction Quality (Kualitas Interaksi Layanan).
- **Importance-Performance Analysis (IPA)**: Memetakan atribut sistem ke dalam matriks 4-Kuadran untuk mengidentifikasi area prioritas perbaikan (Concentrate Here) dan performa yang harus dipertahankan (Keep Up Good Work).
- **Dampak Praktis**: Memberikan rekomendasi restrukturisasi arsitektur navigasi dan perbaikan antarmuka pengguna bagi pemangku kepentingan universitas.
- **Pengarsipan**: Terkatalog secara resmi pada Repositori Institusi Institut Teknologi Kalimantan (ITK).`,
      metrics: [
        { label: "Metode Evaluasi", value: "WebQual 4.0 & IPA" },
        { label: "Objek Studi", value: "SIAT UNIBA" },
        { label: "Status Publikasi", value: "Tesis ITK 2023" }
      ]
    },
    en_content: {
      title: "SIAT Academic System Quality & UX Analysis",
      categoryLabel: "Academic Thesis & UX Research",
      badgeLabel: "ITK Repository 2023",
      shortDescription: "Comprehensive quality evaluation of Universitas Balikpapan's SIAT academic web portal utilizing WebQual 4.0 methodology and 4-Quadrant Importance-Performance Analysis (IPA).",
      fullDescription: `Undergraduate thesis research at Institut Teknologi Kalimantan (ITK) empirically assessing the multidimensional digital UX quality of Universitas Balikpapan's Integrated Academic Information System (SIAT).

### Key Methodology & Findings:
- **WebQual 4.0 Dimensions**: Evaluated 3 primary dimensions—Usability Quality, Information Quality, and Service Interaction Quality.
- **Importance-Performance Analysis (IPA)**: Mapped attributes into a 4-Quadrant matrix to isolate critical optimization bottlenecks (Concentrate Here) and core strengths (Keep Up Good Work).
- **Practical Impact**: Formulated targeted UX restructuring recommendations for university stakeholders to reduce task latency.
- **Archival**: Officially cataloged in the ITK Academic Institutional Repository.`,
      metrics: [
        { label: "Evaluation Method", value: "WebQual 4.0 & IPA" },
        { label: "Study Object", value: "SIAT UNIBA" },
        { label: "Publication Status", value: "ITK Thesis 2023" }
      ]
    }
  },
  {
    id: "sirem-fleet",
    category: "web-systems",
    badgeType: "journal",
    demoUrl: "https://ejurnal.dharmawangsa.ac.id/index.php/syntax",
    githubUrl: null,
    techStack: ["CodeIgniter", "PHP", "MySQL", "JavaScript", "Bootstrap", "MVC Pattern"],
    id_content: {
      title: "SIREM - Sistem Informasi Rental Mobil",
      categoryLabel: "Sistem Informasi Web Penuh",
      badgeLabel: "Syntax Journal 2021",
      shortDescription: "Pengembangan sistem informasi manajemen persewaan kendaraan berbasis web menggunakan framework CodeIgniter dengan arsitektur MVC, penjadwalan armada otomatis, dan billing.",
      fullDescription: `Publikasi ilmiah dan implementasi software engineering sistem informasi rental mobil berbasis web yang diterbitkan dalam *Syntax: Journal of Software Engineering, Computer Science and Information Technology*.

### Fitur & Arsitektur Sistem:
- **Arsitektur MVC**: Dibangun menggunakan CodeIgniter untuk pemisahan logika bisnis, pengelolaan model data, dan antarmuka dinamis yang terstruktur.
- **Manajemen Armada & Transaksi**: Alur otomatisasi pendataan kendaraan, ketersediaan unit real-time, pencatatan durasi rental, hingga kalkulasi tarif otomatis.
- **Keamanan & Validasi**: Validasi input berlapis, autentikasi multi-level user (Admin & Pelanggan), serta manajemen basis data relasional.
- **Publikasi Ilmiah**: Co-authored paper yang diindeks secara peer-reviewed pada Syntax Journal (2021).`,
      metrics: [
        { label: "Jurnal Ilmiah", value: "Syntax Journal" },
        { label: "Tahun Rilis", value: "2021" },
        { label: "Arsitektur", value: "MVC CodeIgniter" }
      ]
    },
    en_content: {
      title: "SIREM - Car Rental Information System",
      categoryLabel: "Full-Stack Web System",
      badgeLabel: "Syntax Journal 2021",
      shortDescription: "Development of a web-based vehicle rental and fleet management platform utilizing CodeIgniter MVC architecture, automated scheduling, and billing.",
      fullDescription: `Peer-reviewed software engineering publication detailing a web-based car rental platform published in *Syntax: Journal of Software Engineering, Computer Science and Information Technology*.

### Features & System Architecture:
- **MVC Architecture**: Engineered using CodeIgniter for modular separation of business logic, database queries, and responsive front-end views.
- **Fleet & Transaction Automation**: Automated fleet inventory tracking, real-time booking availability, rental duration calculation, and invoice generation.
- **Security & Validation**: Multi-level user role authentication (Admin & Client), sanitized input validation, and relational database integrity.
- **Publication**: Indexed peer-reviewed scientific paper on Syntax Journal (2021).`,
      metrics: [
        { label: "Scientific Journal", value: "Syntax Journal" },
        { label: "Release Year", value: "2021" },
        { label: "Architecture", value: "MVC CodeIgniter" }
      ]
    }
  },
  {
    id: "lamaru-smart-tourism",
    category: "community",
    badgeType: "community",
    demoUrl: "https://itk.ac.id",
    githubUrl: null,
    techStack: ["Information Architecture", "Community Development", "Digital Strategy", "GIS Mapping", "Web Platform"],
    id_content: {
      title: "Optimalisasi Pariwisata Kelurahan Lamaru",
      categoryLabel: "Pengabdian Masyarakat & Digitalisasi",
      badgeLabel: "Pengabdian ITK 2021",
      shortDescription: "Inisiatif pengabdian masyarakat dan digitalisasi pariwisata terpadu untuk optimalisasi potensi wisata pesisir serta pemberdayaan UMKM lokal di Kelurahan Lamaru.",
      fullDescription: `Program Pengabdian Masyarakat civitas akademika Institut Teknologi Kalimantan (ITK) yang berfokus pada digitalisasi dan strategi optimalisasi potensi pariwisata di Kelurahan Lamaru, Balikpapan Timur.

### Kontribusi & Luaran:
- **Pemetaan Potensi Wisata**: Pendataan komprehensif destinasi pesisir pantai, konservasi mangrove, dan sentra kerajinan UMKM masyarakat lokal.
- **Strategi Publikasi Digital**: Penyusunan arsitektur informasi media digital pariwisata untuk meningkatkan daya tarik kunjungan wisatawan domestik.
- **Pemberdayaan Komunitas**: Sosialisasi pemanfaatan teknologi informasi bagi pengelola destinasi wisata lokal.`,
      metrics: [
        { label: "Lokasi Program", value: "Kelurahan Lamaru" },
        { label: "Kemitraan", value: "Pengabdian ITK" },
        { label: "Fokus", value: "Pariwisata & UMKM" }
      ]
    },
    en_content: {
      title: "Lamaru Coastal Tourism Optimization",
      categoryLabel: "Community Development & Digitalization",
      badgeLabel: "ITK Community 2021",
      shortDescription: "Community development initiative focused on coastal tourism digital transformation and local MSME empowerment in Lamaru, East Kalimantan.",
      fullDescription: `Institutional community service initiative by Institut Teknologi Kalimantan (ITK) focused on digitalizing and optimizing local sustainable tourism potential in Kelurahan Lamaru, Balikpapan.

### Contributions & Key Deliverables:
- **Tourism Asset Mapping**: Comprehensive inventory of coastal beaches, mangrove trails, and local artisan MSME centers.
- **Digital Information Strategy**: Architected digital tourism information pathways to boost regional visitor visibility.
- **Community Empowerment**: IT training workshops for local community tourism stakeholders.`,
      metrics: [
        { label: "Location", value: "Kelurahan Lamaru" },
        { label: "Partnership", value: "ITK Community" },
        { label: "Focus", value: "Tourism & MSME" }
      ]
    }
  }
];

// Helper to get localized projects
function getLocalizedProjects() {
  const lang = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en') ? 'en' : 'id';
  return PORTFOLIO_PROJECTS_BILINGUAL.map(p => {
    const loc = lang === 'en' ? p.en_content : p.id_content;
    return {
      id: p.id,
      category: p.category,
      badgeType: p.badgeType,
      demoUrl: p.demoUrl,
      githubUrl: p.githubUrl,
      techStack: p.techStack,
      title: loc.title,
      categoryLabel: loc.categoryLabel,
      badgeLabel: loc.badgeLabel,
      shortDescription: loc.shortDescription,
      fullDescription: loc.fullDescription,
      metrics: loc.metrics
    };
  });
}
