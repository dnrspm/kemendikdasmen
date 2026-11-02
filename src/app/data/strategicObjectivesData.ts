// Strategic Objectives Data Structure
// Hierarchy: Sasaran Program > Sasaran Kinerja > SKP > Tugas

// IKP = Indikator Kinerja Program (Performance Indicator) / IKK = Indikator Kinerja Kegiatan
export interface IKP {
  id: string;
  description: string;
  target: number; // Target percentage
  current_value: number; // Current achievement
  unit: string; // e.g., "%", "unit", etc.
  sasaran_program_id?: string;
  sasaran_kinerja_id?: string;
  related_epic_ids?: string[]; // Epic/SKP IDs linked to this IKK
}

// Sasaran Program (Strategic Program Objective)
export interface SasaranProgram {
  id: string;
  code: string; // e.g., "SP1", "SP2"
  name: string;
  description: string;
  owner_org_id: string;
  owner_org_name: string;
  start_date: string;
  due_date: string;
  ikp: IKP[]; // Indikator Kinerja Program
  created_at: string;
  updated_at: string;
}

// Sasaran Kinerja (Performance Objective)
export interface SasaranKinerja {
  id: string;
  code: string; // e.g., "SK1", "SK2"
  name: string;
  description: string;
  sasaran_program_id: string;
  sasaran_program_name: string;
  owner_org_id: string;
  owner_org_name: string;
  biro_id?: string; // Optional: which biro owns this sasaran kinerja
  biro_name?: string;
  start_date: string;
  due_date: string;
  ikp: IKP[]; // Indikator Kinerja Program for this SK
  created_at: string;
  updated_at: string;
}

// ===== MOCK DATA =====

// Sasaran Program Data
export const sasaranPrograms: SasaranProgram[] = [
  {
    id: 'sp-001',
    code: 'SP1',
    name: 'Meningkatnya tata kelola dan kualitas layanan pendidikan',
    description: 'Meningkatkan efektivitas tata kelola, transparansi, dan akuntabilitas dalam penyelenggaraan layanan pendidikan di seluruh jenjang',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Sekretariat Jenderal',
    start_date: '2024-01-01',
    due_date: '2024-12-31',
    ikp: [
      {
        id: 'ikp-1-1',
        description: 'Persentase unit kerja yang menerapkan sistem manajemen mutu ISO 9001',
        target: 80,
        current_value: 65,
        unit: '%',
        sasaran_program_id: 'sp-001'
      },
      {
        id: 'ikp-1-2',
        description: 'Tingkat kepuasan stakeholder terhadap layanan administrasi',
        target: 85,
        current_value: 78,
        unit: '%',
        sasaran_program_id: 'sp-001'
      },
      {
        id: 'ikp-1-3',
        description: 'Persentase dokumen kebijakan yang terbit tepat waktu',
        target: 90,
        current_value: 82,
        unit: '%',
        sasaran_program_id: 'sp-001'
      }
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-05-04T00:00:00Z'
  },
  {
    id: 'sp-002',
    code: 'SP2',
    name: 'Meningkatnya kualitas pembelajaran, kompetensi, dan karakter pada pendidikan anak usia dini, dasar, menengah, khusus, layanan khusus, dan kesetaraan',
    description: 'Meningkatkan kualitas proses pembelajaran dan hasil belajar peserta didik melalui peningkatan kompetensi pendidik, inovasi pembelajaran, dan penguatan karakter',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Sekretariat Jenderal',
    start_date: '2024-01-01',
    due_date: '2024-12-31',
    ikp: [
      {
        id: 'ikp-2-1',
        description: 'Persentase Guru dan Tenaga Kependidikan Non ASN yang mendapatkan tunjangan atau bantuan tepat waktu',
        target: 100,
        current_value: 100,
        unit: '%',
        sasaran_program_id: 'sp-002'
      },
      {
        id: 'ikp-2-2',
        description: 'Persentase peserta didik yang berprestasi pada Tingkat Internasional',
        target: 40,
        current_value: 28,
        unit: '%',
        sasaran_program_id: 'sp-002'
      },
      {
        id: 'ikp-2-3',
        description: 'Persentase satuan pendidikan yang memanfaatkan TIK untuk tujuan pembelajaran',
        target: 50,
        current_value: 35,
        unit: '%',
        sasaran_program_id: 'sp-002'
      },
      {
        id: 'ikp-2-4',
        description: 'Persentase inovasi pendidikan, sains, dan kerja sama di kawasan Asia Tenggara yang diimplementasikan',
        target: 70,
        current_value: 48,
        unit: '%',
        sasaran_program_id: 'sp-002'
      },
      {
        id: 'ikp-2-5',
        description: 'Persentase provinsi dan kabupaten/kota yang menyelenggarakan layanan penguatan pendidikan karakter yang bermutu',
        target: 8.3,
        current_value: 5.2,
        unit: '%',
        sasaran_program_id: 'sp-002'
      }
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-05-04T00:00:00Z'
  },
  {
    id: 'sp-003',
    code: 'SP3',
    name: 'Meningkatnya pemerataan akses pendidikan yang berkeadilan',
    description: 'Memperluas akses pendidikan berkualitas bagi seluruh warga negara tanpa diskriminasi, dengan fokus pada daerah 3T dan kelompok marginal',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Sekretariat Jenderal',
    start_date: '2024-01-01',
    due_date: '2024-12-31',
    ikp: [
      {
        id: 'ikp-3-1',
        description: 'Persentase daerah 3T yang memiliki akses internet untuk pendidikan',
        target: 75,
        current_value: 58,
        unit: '%',
        sasaran_program_id: 'sp-003'
      },
      {
        id: 'ikp-3-2',
        description: 'Angka Partisipasi Kasar (APK) pendidikan menengah',
        target: 95,
        current_value: 96,
        unit: '%',
        sasaran_program_id: 'sp-003'
      },
      {
        id: 'ikp-3-3',
        description: 'Persentase peserta didik berkebutuhan khusus yang mendapat layanan pendidikan inklusif',
        target: 60,
        current_value: 42,
        unit: '%',
        sasaran_program_id: 'sp-003'
      }
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-05-04T00:00:00Z'
  }
];

// Sasaran Kinerja Data
export const sasaranKinerjas: SasaranKinerja[] = [
  {
    id: 'sk-002',
    code: 'SK3',
    name: 'Terlaksananya reformasi birokrasi yang efektif',
    description: 'Implementasi reformasi birokrasi untuk meningkatkan kualitas pelayanan publik dan efisiensi organisasi',
    sasaran_program_id: 'sp-001',
    sasaran_program_name: 'Meningkatnya tata kelola dan kualitas layanan pendidikan',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Sekretariat Jenderal',
    biro_id: 'biro-perencanaan',
    biro_name: 'Biro Perencanaan',
    start_date: '2024-01-01',
    due_date: '2024-12-31',
    ikp: [
      {
        id: 'ikp-sk-2-1',
        description: 'Persentase proses bisnis yang telah disederhanakan',
        target: 70,
        current_value: 55,
        unit: '%',
        sasaran_kinerja_id: 'sk-002',
        related_epic_ids: ['epic-setjen-5']
      },
      {
        id: 'ikp-sk-2-2',
        description: 'Indeks Kepuasan Masyarakat terhadap layanan publik',
        target: 80,
        current_value: 76,
        unit: 'poin',
        sasaran_kinerja_id: 'sk-002',
        related_epic_ids: []
      }
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-05-04T00:00:00Z'
  },
  {
    id: 'sk-003',
    code: 'SK4',
    name: 'Meningkatnya kompetensi dan profesionalisme pendidik',
    description: 'Pengembangan kompetensi pendidik melalui pelatihan, sertifikasi, dan program pengembangan profesional berkelanjutan',
    sasaran_program_id: 'sp-002',
    sasaran_program_name: 'Meningkatnya kualitas pembelajaran, kompetensi, dan karakter',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Sekretariat Jenderal',
    start_date: '2024-01-01',
    due_date: '2024-12-31',
    ikp: [
      {
        id: 'ikp-sk-3-1',
        description: 'Persentase guru yang memiliki sertifikat kompetensi profesional',
        target: 90,
        current_value: 78,
        unit: '%',
        sasaran_kinerja_id: 'sk-003'
      },
      {
        id: 'ikp-sk-3-2',
        description: 'Rata-rata skor uji kompetensi guru',
        target: 75,
        current_value: 68,
        unit: 'poin',
        sasaran_kinerja_id: 'sk-003'
      }
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-05-04T00:00:00Z'
  },
  {
    id: 'sk-004',
    code: 'SK5',
    name: 'Terwujudnya inovasi pembelajaran berbasis teknologi',
    description: 'Pengembangan dan implementasi model pembelajaran inovatif yang memanfaatkan teknologi informasi dan komunikasi',
    sasaran_program_id: 'sp-002',
    sasaran_program_name: 'Meningkatnya kualitas pembelajaran, kompetensi, dan karakter',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Sekretariat Jenderal',
    start_date: '2024-01-01',
    due_date: '2024-12-31',
    ikp: [
      {
        id: 'ikp-sk-4-1',
        description: 'Persentase sekolah yang menerapkan pembelajaran berbasis TIK',
        target: 65,
        current_value: 48,
        unit: '%',
        sasaran_kinerja_id: 'sk-004'
      },
      {
        id: 'ikp-sk-4-2',
        description: 'Jumlah konten pembelajaran digital yang dikembangkan',
        target: 500,
        current_value: 342,
        unit: 'konten',
        sasaran_kinerja_id: 'sk-004'
      }
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-05-04T00:00:00Z'
  },
  {
    id: 'sk-005',
    code: 'SK6',
    name: 'Meningkatnya akses pendidikan di daerah 3T',
    description: 'Perluasan akses dan peningkatan kualitas layanan pendidikan di daerah Terdepan, Terluar, dan Tertinggal',
    sasaran_program_id: 'sp-003',
    sasaran_program_name: 'Meningkatnya pemerataan akses pendidikan yang berkeadilan',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Sekretariat Jenderal',
    start_date: '2024-01-01',
    due_date: '2024-12-31',
    ikp: [
      {
        id: 'ikp-sk-5-1',
        description: 'Jumlah sekolah baru yang dibangun di daerah 3T',
        target: 150,
        current_value: 98,
        unit: 'sekolah',
        sasaran_kinerja_id: 'sk-005'
      },
      {
        id: 'ikp-sk-5-2',
        description: 'Persentase guru di daerah 3T yang mendapat insentif khusus',
        target: 100,
        current_value: 85,
        unit: '%',
        sasaran_kinerja_id: 'sk-005'
      }
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-05-04T00:00:00Z'
  },

  // SK Baru untuk Biro Perencanaan - SP3 SK1
  {
    id: 'sk-perencanaan-sp3-1',
    code: 'SK1',
    name: 'Meningkatnya efektivitas perencanaan penganggaran, akuntabilitas kinerja, kerja sama, dan tata kelola',
    description: 'Peningkatan kualitas perencanaan penganggaran, sistem akuntabilitas kinerja, kerja sama strategis, dan tata kelola organisasi yang efektif',
    sasaran_program_id: 'sp-003',
    sasaran_program_name: 'Meningkatnya kapasitas dan akuntabilitas kelembagaan',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Biro Perencanaan dan Kerja Sama',
    biro_id: 'biro-perencanaan',
    biro_name: 'Biro Perencanaan',
    start_date: '2026-01-01',
    due_date: '2026-12-31',
    ikp: [
      {
        id: 'ikp-sk-perencanaan-1-1',
        description: 'Persentase Unit Kerja dengan Predikat Akuntabilitas Kinerja Instansi Pemerintah Minimal BB',
        target: 85,
        current_value: 72,
        unit: '%',
        sasaran_kinerja_id: 'sk-perencanaan-sp3-1',
        related_epic_ids: ['epic-perencanaan-1']
      },
      {
        id: 'ikp-sk-perencanaan-1-2',
        description: 'Persentase Satuan Kerja dengan Kategori Nilai Kinerja Anggaran Sangat Baik',
        target: 80,
        current_value: 68,
        unit: '%',
        sasaran_kinerja_id: 'sk-perencanaan-sp3-1',
        related_epic_ids: ['epic-perencanaan-2']
      },
      {
        id: 'ikp-sk-perencanaan-1-3',
        description: 'Persentase Kerja Sama Bilateral, Multilateral, dan Nasional yang Ditindaklanjuti',
        target: 90,
        current_value: 75,
        unit: '%',
        sasaran_kinerja_id: 'sk-perencanaan-sp3-1',
        related_epic_ids: ['epic-perencanaan-3']
      },
      {
        id: 'ikp-sk-perencanaan-1-4',
        description: 'Persentase Satker Pusat dengan Predikat Indeks Perencanaan Pembangunan Nasional minimal baik',
        target: 85,
        current_value: 70,
        unit: '%',
        sasaran_kinerja_id: 'sk-perencanaan-sp3-1',
        related_epic_ids: ['epic-perencanaan-4']
      }
    ],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-05-20T00:00:00Z'
  },

  // SK Baru untuk Biro Perencanaan - SP2 SK2
  {
    id: 'sk-perencanaan-sp2-2',
    code: 'SK2',
    name: 'Meningkatnya inovasi pengembangan pendidikan, sains, dan kerja sama di kawasan Asia Tenggara',
    description: 'Pengembangan inovasi pendidikan dan sains serta penguatan kerja sama regional melalui program SEAMEO Centre',
    sasaran_program_id: 'sp-002',
    sasaran_program_name: 'Meningkatnya kualitas pembelajaran, kompetensi, dan karakter',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Biro Perencanaan dan Kerja Sama',
    biro_id: 'biro-perencanaan',
    biro_name: 'Biro Perencanaan',
    start_date: '2026-01-01',
    due_date: '2026-12-31',
    ikp: [
      {
        id: 'ikp-sk-perencanaan-2-1',
        description: 'Persentase lembaga yang dijadikan model dalam pengembangan dan kajian pendidikan, sains, dan kerja sama di kawasan Asia Tenggara',
        target: 75,
        current_value: 60,
        unit: '%',
        sasaran_kinerja_id: 'sk-perencanaan-sp2-2'
      },
      {
        id: 'ikp-sk-perencanaan-2-2',
        description: 'Persentase pendidik dan tenaga kependidikan yang dijadikan model dalam implementasi inovasi dan pengembangan pendidikan, sains, dan kerja sama di kawasan Asia Tenggara',
        target: 70,
        current_value: 55,
        unit: '%',
        sasaran_kinerja_id: 'sk-perencanaan-sp2-2'
      }
    ],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-05-20T00:00:00Z'
  },

  // SK Baru untuk Pusdatin - SP2 SK1
  {
    id: 'sk-pusdatin-sp2-1',
    code: 'SK1',
    name: 'Meningkatnya jumlah satuan pendidikan dalam pemanfaatan TIK untuk tujuan pembelajaran',
    description: 'Peningkatan pemanfaatan teknologi informasi dan komunikasi pada satuan pendidikan formal untuk mendukung pembelajaran digital',
    sasaran_program_id: 'sp-002',
    sasaran_program_name: 'Meningkatnya kualitas pembelajaran, kompetensi, dan karakter',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Pusat Data dan Teknologi Informasi',
    biro_id: 'pusdatin',
    biro_name: 'Pusdatin',
    start_date: '2026-01-01',
    due_date: '2026-12-31',
    ikp: [
      {
        id: 'ikp-sk-pusdatin-1-1',
        description: 'Persentase satuan pendidikan formal yang memanfaatkan komputer dan internet untuk tujuan pembelajaran',
        target: 85,
        current_value: 68,
        unit: '%',
        sasaran_kinerja_id: 'sk-pusdatin-sp2-1',
        related_epic_ids: ['epic-pusdatin-11']
      },
      {
        id: 'ikp-sk-pusdatin-1-2',
        description: 'Persentase peningkatan peserta didik, pendidik, dan tenaga kependidikan dalam memanfaatkan Platform Digital Pendidikan',
        target: 80,
        current_value: 65,
        unit: '%',
        sasaran_kinerja_id: 'sk-pusdatin-sp2-1',
        related_epic_ids: ['epic-pusdatin-12']
      }
    ],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-05-20T00:00:00Z'
  },

  // SK Baru untuk Pusdatin - SP3 SK2
  {
    id: 'sk-pusdatin-sp3-2',
    code: 'SK2',
    name: 'Meningkatnya integritas data, pendayagunaan data pokok pendidikan, pemanfaatan TIK, dan tata kelola Pusdatin',
    description: 'Peningkatan kualitas pengelolaan data pendidikan, keamanan siber, infrastruktur TIK, dan tata kelola organisasi Pusdatin',
    sasaran_program_id: 'sp-003',
    sasaran_program_name: 'Meningkatnya kapasitas dan akuntabilitas kelembagaan',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Pusat Data dan Teknologi Informasi',
    biro_id: 'pusdatin',
    biro_name: 'Pusdatin',
    start_date: '2026-01-01',
    due_date: '2026-12-31',
    ikp: [
      {
        id: 'ikp-sk-pusdatin-2-1',
        description: 'Persentase Unit Utama yang mengimplementasi Sistem Manajemen Keamanan Informasi',
        target: 90,
        current_value: 70,
        unit: '%',
        sasaran_kinerja_id: 'sk-pusdatin-sp3-2',
        related_epic_ids: ['epic-pusdatin-13']
      },
      {
        id: 'ikp-sk-pusdatin-2-2',
        description: 'Persentase kualitas layanan OLA (Operational Level Agreement) jaringan intra kementerian',
        target: 95,
        current_value: 82,
        unit: '%',
        sasaran_kinerja_id: 'sk-pusdatin-sp3-2',
        related_epic_ids: ['epic-pusdatin-14']
      },
      {
        id: 'ikp-sk-pusdatin-2-3',
        description: 'Persentase rekomendasi yang diterbitkan berdasarkan usulan clearance TIK',
        target: 92,
        current_value: 78,
        unit: '%',
        sasaran_kinerja_id: 'sk-pusdatin-sp3-2',
        related_epic_ids: []
      },
      {
        id: 'ikp-sk-pusdatin-2-4',
        description: 'Persentase kualitas data pendidikan',
        target: 88,
        current_value: 72,
        unit: '%',
        sasaran_kinerja_id: 'sk-pusdatin-sp3-2',
        related_epic_ids: []
      },
      {
        id: 'ikp-sk-pusdatin-2-5',
        description: 'Persentase pendayagunaan dan pelayanan data pokok pendidikan',
        target: 85,
        current_value: 70,
        unit: '%',
        sasaran_kinerja_id: 'sk-pusdatin-sp3-2',
        related_epic_ids: []
      },
      {
        id: 'ikp-sk-pusdatin-2-6',
        description: 'Capaian Nilai Kinerja Anggaran Pusat Data dan Teknologi Informasi dengan kategori Sangat Baik',
        target: 90,
        current_value: 75,
        unit: 'poin',
        sasaran_kinerja_id: 'sk-pusdatin-sp3-2',
        related_epic_ids: []
      },
      {
        id: 'ikp-sk-pusdatin-2-7',
        description: 'Predikat Akuntabilitas Kinerja Instansi Pemerintah Pusat Data dan Teknologi Informasi minimal A',
        target: 85,
        current_value: 78,
        unit: 'poin',
        sasaran_kinerja_id: 'sk-pusdatin-sp3-2',
        related_epic_ids: []
      }
    ],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-05-20T00:00:00Z'
  },

  // SK OSDM 1
  {
    id: 'sk-osdm-1',
    code: 'SK1',
    name: 'Meningkatnya efektivitas pengelolaan organisasi dan sumber daya manusia, serta kualitas pelayanan publik di lingkungan kemendikdasmen',
    description: 'Peningkatan efektivitas pengelolaan organisasi, pengembangan SDM, digitalisasi manajemen ASN, dan kualitas pelayanan publik di lingkungan Kemendikdasmen',
    sasaran_program_id: 'sp-003',
    sasaran_program_name: 'Meningkatnya kapasitas dan akuntabilitas kelembagaan',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Biro Organisasi dan Sumber Daya Manusia',
    biro_id: 'biro-osdm',
    biro_name: 'Biro OSDM',
    start_date: '2026-01-01',
    due_date: '2026-12-31',
    ikp: [
      {
        id: 'ikk-osdm-1-1',
        description: 'Persentase Unit Kerja berpredikat pelayanan publik minimal Sangat Baik',
        target: 85,
        current_value: 85,
        unit: '%',
        sasaran_kinerja_id: 'sk-osdm-1',
        related_epic_ids: ['epic-osdm-1-1-1', 'epic-osdm-1-1-2', 'epic-osdm-1-1-3']
      },
      {
        id: 'ikk-osdm-1-2',
        description: 'Persentase penataan unit organisasi di lingkungan Kemendikdasmen yang efektif',
        target: 90,
        current_value: 0,
        unit: '%',
        sasaran_kinerja_id: 'sk-osdm-1',
        related_epic_ids: ['epic-osdm-1-2-1', 'epic-osdm-1-2-2', 'epic-osdm-1-2-3']
      },
      {
        id: 'ikk-osdm-1-3',
        description: 'Indeks Manajemen ASN Kementerian',
        target: 88,
        current_value: 72,
        unit: 'poin',
        sasaran_kinerja_id: 'sk-osdm-1',
        related_epic_ids: [
          'epic-osdm-1-3-1', 'epic-osdm-1-3-2', 'epic-osdm-1-3-3',
          'epic-osdm-1-3-4', 'epic-osdm-1-3-5', 'epic-osdm-1-3-6',
          'epic-osdm-1-3-7', 'epic-osdm-1-3-8', 'epic-osdm-1-3-9',
          'epic-osdm-1-3-10', 'epic-osdm-1-3-11', 'epic-osdm-1-3-12'
        ]
      },
      {
        id: 'ikk-osdm-1-4',
        description: 'Capaian Nilai Kinerja Anggaran Biro Organisasi dan Sumber Daya Manusia dengan kategori Sangat Baik',
        target: 90,
        current_value: 90,
        unit: 'poin',
        sasaran_kinerja_id: 'sk-osdm-1',
        related_epic_ids: ['epic-osdm-1-4-1', 'epic-osdm-1-4-2', 'epic-osdm-1-4-3']
      },
      {
        id: 'ikk-osdm-1-5',
        description: 'Predikat Akuntabilitas Kinerja Instansi Pemerintah Biro Organisasi dan Sumber Daya Manusia minimal A',
        target: 85,
        current_value: 0,
        unit: 'poin',
        sasaran_kinerja_id: 'sk-osdm-1',
        related_epic_ids: ['epic-osdm-1-5-1', 'epic-osdm-1-5-2', 'epic-osdm-1-5-3']
      }
    ],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-05-20T00:00:00Z'
  },

  // SK OSDM 2
  {
    id: 'sk-osdm-2',
    code: 'SK2',
    name: 'Tercapainya pemenuhan pengembangan kompetensi pegawai di lingkungan Biro OSDM Sesuai dengan Ketentuan yang Berlaku',
    description: 'Pemenuhan pengembangan kompetensi pegawai Biro OSDM sesuai dengan kebutuhan organisasi dan ketentuan yang berlaku',
    sasaran_program_id: 'sp-003',
    sasaran_program_name: 'Meningkatnya kapasitas dan akuntabilitas kelembagaan',
    owner_org_id: 'sekretariat-jenderal',
    owner_org_name: 'Biro Organisasi dan Sumber Daya Manusia',
    biro_id: 'biro-osdm',
    biro_name: 'Biro OSDM',
    start_date: '2026-01-01',
    due_date: '2026-12-31',
    ikp: [
      {
        id: 'ikk-osdm-2-1',
        description: '80% Pegawai telah melaksanakan Pengembangan Kompetensi Pegawai Sesuai dengan Kebutuhan Organisasi',
        target: 80,
        current_value: 80,
        unit: '%',
        sasaran_kinerja_id: 'sk-osdm-2',
        related_epic_ids: ['epic-osdm-2-1-1', 'epic-osdm-2-1-2', 'epic-osdm-2-1-3']
      }
    ],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-05-20T00:00:00Z'
  }
];

// Helper function to calculate overall progress from IKP
export function calculateOverallProgress(ikp: IKP[]): number {
  if (ikp.length === 0) return 0;

  const totalProgress = ikp.reduce((sum, indicator) => {
    const progress = (indicator.current_value / indicator.target) * 100;
    return sum + Math.min(progress, 100); // Cap at 100%
  }, 0);

  return Math.round(totalProgress / ikp.length);
}

// Helper function to get achievement percentage for a single IKP
export function getIKPProgress(ikp: IKP): number {
  return Math.round((ikp.current_value / ikp.target) * 100);
}
