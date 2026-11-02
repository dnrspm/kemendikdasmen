// Mock data untuk organisasi/unit kerja

export interface Organization {
  id: string;
  name: string;
  short_name: string;
  logo_url?: string;
  short_description: string;
  description: string;
  vision: string;
  mission: string[];
  category: string;
  services: Service[];
  tasks_detail?: TaskDetail[]; // Rincian tugas lebih detail
  members: Member[];
  contact: Contact;
  address_detail?: AddressDetail; // Detail alamat lengkap
  building_photo_url?: string; // Foto gedung
  performance_scores?: PerformanceScore[]; // Data capaian kinerja
  position_summary?: PositionSummary; // Summary jabatan
  announcements: Announcement[];
  documents: Document[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  access_method: string;
}

export interface TaskDetail {
  id: string;
  category: string;
  title: string;
  description: string;
  sub_tasks?: string[];
}

export interface AddressDetail {
  street: string;
  city: string;
  province: string;
  postal_code: string;
  geo_location: {
    lat: number;
    lng: number;
  };
}

export interface PerformanceScore {
  period: string;
  score: number;
  category: string;
}

export interface PositionSummary {
  total_positions: number;
  filled_positions: number;
}

export interface Member {
  id: string;
  name: string;
  position: string;
  photo_url?: string;
  email: string;
  level: number; // untuk org chart hierarchy
}

export interface Contact {
  email: string;
  phone: string;
  extension?: string;
  location: string;
  office_hours: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  url: string;
  size: string;
}

export const organizations: Organization[] = [
  {
    id: 'sekretariat-jenderal',
    name: 'Sekretariat Jenderal',
    short_name: 'Setjen',
    short_description: 'Menyelenggarakan koordinasi pelaksanaan tugas, pembinaan, dan pemberian dukungan administrasi kepada seluruh unit organisasi di lingkungan Kementerian.',
    description: 'Sekretariat Jenderal mempunyai tugas menyelenggarakan koordinasi pelaksanaan tugas, pembinaan, dan pemberian dukungan administrasi kepada seluruh unit organisasi di lingkungan Kementerian Pendidikan Dasar dan Menengah.',
    vision: 'Menjadi sekretariat yang profesional, responsif, dan mendukung kinerja optimal kementerian.',
    mission: [
      'Mengoordinasikan kegiatan antar unit kerja',
      'Menyediakan layanan administratif dan umum yang berkualitas',
      'Mengelola hubungan masyarakat dan komunikasi publik',
      'Mendukung pengambilan keputusan strategis kementerian',
      'Mengelola keuangan, kepegawaian, dan aset kementerian'
    ],
    category: 'Sekretariat',
    services: [
      {
        id: 'setjen-1',
        title: 'Layanan Administrasi Umum',
        description: 'Pengelolaan surat menyurat, kearsipan, dan layanan administrasi umum kementerian.',
        access_method: 'Melalui sistem persuratan elektronik atau langsung ke sekretariat'
      },
      {
        id: 'setjen-2',
        title: 'Layanan Informasi Publik',
        description: 'Permintaan informasi publik sesuai UU Keterbukaan Informasi Publik.',
        access_method: 'Email ke ppid@kemdikdasmen.go.id atau portal PPID'
      },
      {
        id: 'setjen-3',
        title: 'Layanan Keuangan',
        description: 'Pengelolaan anggaran, pencairan dana, dan pelaporan keuangan.',
        access_method: 'Melalui aplikasi SAKTI dan sistem keuangan kementerian'
      },
      {
        id: 'setjen-4',
        title: 'Layanan Kepegawaian',
        description: 'Pengelolaan data kepegawaian, cuti, kenaikan pangkat, dan kesejahteraan pegawai.',
        access_method: 'Melalui Portal Sivitas menu Kepegawaian'
      }
    ],
    tasks_detail: [
      {
        id: 'task-setjen-1',
        category: 'Koordinasi',
        title: 'Koordinasi Pelaksanaan Tugas',
        description: 'Mengoordinasikan pelaksanaan tugas antar unit organisasi di lingkungan kementerian.',
        sub_tasks: [
          'Koordinasi rapat dan pertemuan lintas unit',
          'Monitoring dan evaluasi pelaksanaan program',
          'Fasilitasi komunikasi antar unit kerja'
        ]
      },
      {
        id: 'task-setjen-2',
        category: 'Administrasi',
        title: 'Dukungan Administrasi',
        description: 'Memberikan dukungan administrasi kepada seluruh unit organisasi.',
        sub_tasks: [
          'Pengelolaan surat menyurat',
          'Pengelolaan arsip dan dokumentasi',
          'Layanan umum dan protokol'
        ]
      },
      {
        id: 'task-setjen-3',
        category: 'Keuangan',
        title: 'Pengelolaan Keuangan',
        description: 'Mengelola perencanaan, pelaksanaan, dan pelaporan anggaran kementerian.',
        sub_tasks: [
          'Penyusunan RKA-K/L',
          'Pelaksanaan dan pencairan anggaran',
          'Pelaporan keuangan'
        ]
      },
      {
        id: 'task-setjen-4',
        category: 'Kepegawaian',
        title: 'Pembinaan Kepegawaian',
        description: 'Mengelola administrasi dan pembinaan kepegawaian.',
        sub_tasks: [
          'Pengelolaan data kepegawaian',
          'Pengembangan kompetensi pegawai',
          'Pengelolaan kesejahteraan pegawai'
        ]
      }
    ],
    members: [
      {
        id: 'setjen-001',
        name: 'Ir. Andi Wijaya, M.M',
        position: 'Sekretaris Jenderal',
        email: 'andi.wijaya@kemdikdasmen.go.id',
        level: 0
      },
      {
        id: 'setjen-002',
        name: 'Dra. Sri Mulyani, M.Si',
        position: 'Kepala Biro Perencanaan',
        email: 'sri.mulyani@kemdikdasmen.go.id',
        level: 1
      },
      {
        id: 'setjen-003',
        name: 'Drs. Hendra Wijaya, M.M',
        position: 'Kepala Biro Kepegawaian',
        email: 'hendra.wijaya@kemdikdasmen.go.id',
        level: 1
      },
      {
        id: 'setjen-004',
        name: 'Ir. Bambang Sutrisno, M.M',
        position: 'Kepala Biro Keuangan',
        email: 'bambang.sutrisno@kemdikdasmen.go.id',
        level: 1
      }
    ],
    contact: {
      email: 'setjen@kemdikdasmen.go.id',
      phone: '021-5725600',
      extension: '100',
      location: 'Gedung A Lantai 5, Kompleks Kemendikdasmen',
      office_hours: 'Senin - Jumat: 08.00 - 16.00 WIB'
    },
    address_detail: {
      street: 'Jl. Jenderal Sudirman Kav. 1-3',
      city: 'Jakarta Pusat',
      province: 'DKI Jakarta',
      postal_code: '10110',
      geo_location: {
        lat: -6.175392,
        lng: 106.827153
      }
    },
    building_photo_url: 'https://images.unsplash.com/photo-1694702722584-05adc8802e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTE5OTAyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    performance_scores: [
      { period: '2024 Q3', score: 85, category: 'Koordinasi' },
      { period: '2024 Q4', score: 87, category: 'Administrasi' },
      { period: '2025 Q1', score: 88, category: 'Keuangan' },
      { period: '2025 Q2', score: 90, category: 'Kepegawaian' },
      { period: '2026 Q1', score: 91, category: 'Koordinasi' }
    ],
    position_summary: {
      total_positions: 45,
      filled_positions: 42
    },
    announcements: [
      {
        id: 'ann-setjen-1',
        title: 'Pengumuman Libur Nasional',
        content: 'Dalam rangka Hari Raya Nyepi, kantor libur pada tanggal 17 Maret 2026.',
        date: '2026-02-10'
      }
    ],
    documents: [
      {
        id: 'doc-setjen-1',
        title: 'Panduan Persuratan Elektronik',
        type: 'PDF',
        url: '#',
        size: '1.2 MB'
      },
      {
        id: 'doc-setjen-2',
        title: 'SOP Layanan Administrasi',
        type: 'PDF',
        url: '#',
        size: '2.5 MB'
      }
    ],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2026-02-16'
  },
  {
    id: 'ditjen-paud-dikdasmen',
    name: 'Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah',
    short_name: 'Ditjen PAUD Dikdasmen',
    short_description: 'Merumuskan dan melaksanakan kebijakan di bidang pendidikan anak usia dini, pendidikan dasar, dan pendidikan menengah sesuai dengan kebijakan Kementerian.',
    description: 'Direktorat Jenderal PAUD, Pendidikan Dasar dan Pendidikan Menengah mempunyai tugas merumuskan serta melaksanakan kebijakan dan standardisasi teknis di bidang pendidikan anak usia dini, pendidikan dasar, dan pendidikan menengah.',
    vision: 'Terwujudnya layanan pendidikan berkualitas untuk semua jenjang dari PAUD hingga pendidikan menengah.',
    mission: [
      'Meningkatkan akses dan kualitas pendidikan PAUD',
      'Meningkatkan mutu pembelajaran di jenjang SD dan SMP',
      'Mengembangkan kurikulum yang relevan dan inovatif',
      'Membina kepala sekolah dan guru yang kompeten',
      'Menyediakan sarana prasarana pendidikan yang memadai'
    ],
    category: 'Direktorat Jenderal',
    services: [
      {
        id: 'paud-1',
        title: 'Bantuan Operasional PAUD',
        description: 'Informasi dan pengajuan Bantuan Operasional Penyelenggaraan PAUD.',
        access_method: 'Melalui sistem Dapodik PAUD'
      },
      {
        id: 'dikdas-1',
        title: 'Bantuan Operasional Sekolah (BOS)',
        description: 'Informasi dan pengelolaan BOS untuk SD dan SMP.',
        access_method: 'Portal BOS Kemendikdasmen'
      },
      {
        id: 'dikmen-1',
        title: 'Program Sekolah Penggerak',
        description: 'Informasi dan pendaftaran program sekolah penggerak.',
        access_method: 'Platform Merdeka Mengajar'
      },
      {
        id: 'dikdasmen-2',
        title: 'Akreditasi Sekolah',
        description: 'Proses akreditasi lembaga pendidikan PAUD, SD, SMP, dan SMA/SMK.',
        access_method: 'Konsultasi dengan tim akreditasi'
      }
    ],
    tasks_detail: [
      {
        id: 'task-paud-1',
        category: 'PAUD',
        title: 'Pembinaan PAUD',
        description: 'Melakukan pembinaan dan pengembangan pendidikan anak usia dini.',
        sub_tasks: [
          'Pengembangan kurikulum PAUD',
          'Pelatihan pendidik PAUD',
          'Monitoring dan evaluasi PAUD'
        ]
      },
      {
        id: 'task-sd-1',
        category: 'Pendidikan Dasar',
        title: 'Pembinaan Sekolah Dasar',
        description: 'Melakukan pembinaan dan peningkatan mutu pendidikan dasar.',
        sub_tasks: [
          'Pengembangan kurikulum SD',
          'Pelatihan guru SD',
          'Penyediaan sarana prasarana'
        ]
      },
      {
        id: 'task-smp-1',
        category: 'Pendidikan Dasar',
        title: 'Pembinaan Sekolah Menengah Pertama',
        description: 'Melakukan pembinaan dan peningkatan mutu SMP.',
        sub_tasks: [
          'Pengembangan kurikulum SMP',
          'Pelatihan guru SMP',
          'Program sekolah penggerak'
        ]
      },
      {
        id: 'task-sma-1',
        category: 'Pendidikan Menengah',
        title: 'Pembinaan Sekolah Menengah Atas',
        description: 'Melakukan pembinaan dan peningkatan mutu SMA.',
        sub_tasks: [
          'Implementasi Merdeka Belajar',
          'Pelatihan guru SMA',
          'Persiapan pendidikan tinggi'
        ]
      }
    ],
    members: [
      {
        id: 'paud-001',
        name: 'Prof. Dr. Iwan Syahril, Ph.D',
        position: 'Direktur Jenderal',
        email: 'iwan.syahril@kemdikdasmen.go.id',
        level: 0
      },
      {
        id: 'paud-002',
        name: 'Dr. Ani Suryani, M.Pd',
        position: 'Direktur PAUD',
        email: 'ani.suryani@kemdikdasmen.go.id',
        level: 1
      },
      {
        id: 'sd-001',
        name: 'Prof. Dr. Bambang Haryanto, M.Pd',
        position: 'Direktur SD',
        email: 'bambang.haryanto@kemdikdasmen.go.id',
        level: 1
      },
      {
        id: 'smp-001',
        name: 'Dr. Lina Marlina, M.Pd',
        position: 'Direktur SMP',
        email: 'lina.marlina@kemdikdasmen.go.id',
        level: 1
      },
      {
        id: 'sma-001',
        name: 'Prof. Dr. Eko Prasetyo, M.Sc',
        position: 'Direktur SMA',
        email: 'eko.prasetyo@kemdikdasmen.go.id',
        level: 1
      }
    ],
    contact: {
      email: 'pauddikdasmen@kemdikdasmen.go.id',
      phone: '021-5725620',
      extension: '200',
      location: 'Gedung C Lantai 1-4, Kompleks Kemendikdasmen',
      office_hours: 'Senin - Jumat: 08.00 - 16.00 WIB'
    },
    address_detail: {
      street: 'Jl. Jenderal Sudirman Kav. 1-3',
      city: 'Jakarta Pusat',
      province: 'DKI Jakarta',
      postal_code: '10110',
      geo_location: {
        lat: -6.175410,
        lng: 106.827200
      }
    },
    building_photo_url: 'https://images.unsplash.com/photo-1662728132385-11fee9b3db9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcxMTMzODIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    performance_scores: [
      { period: '2024 Q3', score: 83, category: 'PAUD' },
      { period: '2024 Q4', score: 85, category: 'Pendidikan Dasar' },
      { period: '2025 Q1', score: 87, category: 'Pendidikan Menengah' },
      { period: '2025 Q2', score: 89, category: 'Kurikulum' },
      { period: '2026 Q1', score: 90, category: 'PAUD' }
    ],
    position_summary: {
      total_positions: 65,
      filled_positions: 60
    },
    announcements: [
      {
        id: 'ann-paud-1',
        title: 'Pendaftaran Program Sekolah Penggerak',
        content: 'Pendaftaran program sekolah penggerak gelombang 3 dibuka mulai 1 Maret 2026.',
        date: '2026-02-15'
      }
    ],
    documents: [
      {
        id: 'doc-paud-1',
        title: 'Panduan Kurikulum Merdeka',
        type: 'PDF',
        url: '#',
        size: '5.2 MB'
      },
      {
        id: 'doc-paud-2',
        title: 'Pedoman BOS 2026',
        type: 'PDF',
        url: '#',
        size: '3.8 MB'
      }
    ],
    is_active: true,
    created_at: '2024-01-15',
    updated_at: '2026-02-16'
  },
  {
    id: 'ditjen-vokasi-khusus',
    name: 'Direktorat Jenderal Pendidikan Vokasi dan Pendidikan Khusus',
    short_name: 'Ditjen Vokasi Khusus',
    short_description: 'Mengelola pendidikan vokasi (SMK) serta pendidikan khusus dan layanan khusus untuk memenuhi kebutuhan pendidikan yang beragam.',
    description: 'Direktorat Jenderal Pendidikan Vokasi dan Pendidikan Khusus mempunyai tugas merumuskan serta melaksanakan kebijakan dan standardisasi teknis di bidang pendidikan vokasi dan pendidikan khusus.',
    vision: 'Terwujudnya pendidikan vokasi yang link and match dengan dunia industri dan pendidikan khusus yang inklusif.',
    mission: [
      'Meningkatkan kualitas dan relevansi pendidikan vokasi',
      'Mengembangkan kemitraan dengan dunia usaha dan industri',
      'Menyediakan pendidikan khusus yang berkualitas dan inklusif',
      'Meningkatkan kompetensi lulusan SMK',
      'Memfasilitasi pendidikan layanan khusus'
    ],
    category: 'Direktorat Jenderal',
    services: [
      {
        id: 'vokasi-1',
        title: 'Program Revitalisasi SMK',
        description: 'Program peningkatan kualitas SMK melalui kemitraan dengan industri.',
        access_method: 'Melalui koordinator SMK atau website ditjen vokasi'
      },
      {
        id: 'vokasi-2',
        title: 'Sertifikasi Kompetensi',
        description: 'Layanan sertifikasi kompetensi siswa SMK.',
        access_method: 'Melalui LSP P1 di SMK'
      },
      {
        id: 'khusus-1',
        title: 'Layanan Pendidikan Inklusif',
        description: 'Pendampingan dan fasilitasi pendidikan inklusif di sekolah.',
        access_method: 'Konsultasi dengan koordinator pendidikan khusus'
      },
      {
        id: 'vokasi-3',
        title: 'Program Teaching Factory',
        description: 'Implementasi pembelajaran berbasis produksi di SMK.',
        access_method: 'Pendaftaran melalui platform SMK Pusat Keunggulan'
      }
    ],
    tasks_detail: [
      {
        id: 'task-vokasi-1',
        category: 'Pendidikan Vokasi',
        title: 'Pembinaan SMK',
        description: 'Melakukan pembinaan dan peningkatan mutu pendidikan vokasi.',
        sub_tasks: [
          'Pengembangan kurikulum berbasis industri',
          'Kemitraan dengan DUDI',
          'Program teaching factory',
          'Sertifikasi kompetensi'
        ]
      },
      {
        id: 'task-vokasi-2',
        category: 'Pendidikan Vokasi',
        title: 'Link and Match',
        description: 'Menyelaraskan pendidikan vokasi dengan kebutuhan industri.',
        sub_tasks: [
          'MoU dengan industri',
          'Prakerin dan magang',
          'Job matching lulusan'
        ]
      },
      {
        id: 'task-khusus-1',
        category: 'Pendidikan Khusus',
        title: 'Pendidikan Inklusif',
        description: 'Mengembangkan dan membina pendidikan inklusif.',
        sub_tasks: [
          'Pelatihan guru pendidikan khusus',
          'Penyediaan fasilitas aksesibilitas',
          'Pendampingan sekolah inklusif'
        ]
      },
      {
        id: 'task-khusus-2',
        category: 'Layanan Khusus',
        title: 'Pendidikan Layanan Khusus',
        description: 'Memberikan layanan pendidikan di daerah khusus.',
        sub_tasks: [
          'Pendidikan di daerah 3T',
          'Sekolah Indonesia di luar negeri',
          'Pendidikan untuk anak berkebutuhan khusus'
        ]
      }
    ],
    members: [
      {
        id: 'vokasi-001',
        name: 'Dr. Wikan Sakarinto, M.Sc',
        position: 'Direktur Jenderal',
        email: 'wikan.sakarinto@kemdikdasmen.go.id',
        level: 0
      },
      {
        id: 'vokasi-002',
        name: 'Ir. Bakrun, S.T, M.M',
        position: 'Direktur SMK',
        email: 'bakrun@kemdikdasmen.go.id',
        level: 1
      },
      {
        id: 'khusus-001',
        name: 'Dr. Erni Sulistiani, M.Pd',
        position: 'Direktur Pendidikan Khusus',
        email: 'erni.sulistiani@kemdikdasmen.go.id',
        level: 1
      }
    ],
    contact: {
      email: 'vokasikhusus@kemdikdasmen.go.id',
      phone: '021-5725630',
      extension: '300',
      location: 'Gedung E Lantai 1-3, Kompleks Kemendikdasmen',
      office_hours: 'Senin - Jumat: 08.00 - 16.00 WIB'
    },
    address_detail: {
      street: 'Jl. Jenderal Sudirman Kav. 1-3',
      city: 'Jakarta Pusat',
      province: 'DKI Jakarta',
      postal_code: '10110',
      geo_location: {
        lat: -6.175430,
        lng: 106.827250
      }
    },
    building_photo_url: 'https://images.unsplash.com/photo-1692133211836-52846376d66f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzEyMjc3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    performance_scores: [
      { period: '2024 Q3', score: 81, category: 'Vokasi' },
      { period: '2024 Q4', score: 83, category: 'Link and Match' },
      { period: '2025 Q1', score: 86, category: 'Pendidikan Khusus' },
      { period: '2025 Q2', score: 88, category: 'Vokasi' },
      { period: '2026 Q1', score: 89, category: 'Link and Match' }
    ],
    position_summary: {
      total_positions: 38,
      filled_positions: 35
    },
    announcements: [
      {
        id: 'ann-vokasi-1',
        title: 'Kompetisi SMK Tingkat Nasional',
        content: 'Pendaftaran Lomba Kompetensi Siswa (LKS) SMK tingkat nasional dibuka hingga 31 Maret 2026.',
        date: '2026-02-14'
      }
    ],
    documents: [
      {
        id: 'doc-vokasi-1',
        title: 'Panduan SMK Pusat Keunggulan',
        type: 'PDF',
        url: '#',
        size: '4.3 MB'
      },
      {
        id: 'doc-vokasi-2',
        title: 'Pedoman Teaching Factory',
        type: 'PDF',
        url: '#',
        size: '3.1 MB'
      }
    ],
    is_active: true,
    created_at: '2024-01-18',
    updated_at: '2026-02-16'
  },
  {
    id: 'ditjen-gtk',
    name: 'Direktorat Jenderal Guru dan Tenaga Kependidikan',
    short_name: 'Ditjen GTK',
    short_description: 'Mengelola kebijakan guru, tenaga kependidikan, dan pendidikan profesi untuk meningkatkan kualitas dan profesionalisme pendidik.',
    description: 'Direktorat Jenderal Guru dan Tenaga Kependidikan bertanggung jawab atas perencanaan, pengembangan, dan pembinaan guru serta tenaga kependidikan di seluruh Indonesia untuk meningkatkan mutu pendidikan nasional.',
    vision: 'Terwujudnya guru dan tenaga kependidikan yang profesional, bermartabat, dan sejahtera.',
    mission: [
      'Meningkatkan kualitas dan kompetensi guru dan tenaga kependidikan',
      'Menyediakan program pengembangan profesional berkelanjutan',
      'Memastikan kesejahteraan guru dan tenaga kependidikan',
      'Mengembangkan sistem manajemen guru yang efektif',
      'Menyelenggarakan pendidikan profesi guru (PPG)'
    ],
    category: 'Direktorat Jenderal',
    services: [
      {
        id: 'gtk-1',
        title: 'Sertifikasi Guru',
        description: 'Layanan pengajuan dan pengelolaan sertifikasi pendidik untuk peningkatan profesionalisme guru.',
        access_method: 'Melalui portal SIMPKB atau hubungi sekretariat Direktorat GTK'
      },
      {
        id: 'gtk-2',
        title: 'Program PPG',
        description: 'Pendidikan Profesi Guru untuk calon guru dan guru dalam jabatan.',
        access_method: 'Pendaftaran melalui portal PPG Kemendikdasmen'
      },
      {
        id: 'gtk-3',
        title: 'Tunjangan Profesi Guru',
        description: 'Pengelolaan dan pencairan tunjangan profesi untuk guru bersertifikat.',
        access_method: 'Info melalui Dapodik dan SIMPKB'
      },
      {
        id: 'gtk-4',
        title: 'Pelatihan dan Diklat',
        description: 'Program pelatihan dan pendidikan untuk peningkatan kompetensi guru.',
        access_method: 'Platform Merdeka Mengajar dan SIMPKB'
      }
    ],
    tasks_detail: [
      {
        id: 'task-gtk-1',
        category: 'Pengembangan',
        title: 'Pendidikan Profesi Guru',
        description: 'Menyelenggarakan program PPG untuk meningkatkan profesionalisme guru.',
        sub_tasks: [
          'PPG Prajabatan',
          'PPG Dalam Jabatan',
          'Uji Kompetensi Guru'
        ]
      },
      {
        id: 'task-gtk-2',
        category: 'Sertifikasi',
        title: 'Sertifikasi Pendidik',
        description: 'Melaksanakan program sertifikasi guru untuk peningkatan kompetensi.',
        sub_tasks: [
          'Verifikasi berkas sertifikasi',
          'Pelaksanaan uji kompetensi',
          'Penerbitan sertifikat pendidik'
        ]
      },
      {
        id: 'task-gtk-3',
        category: 'Pelatihan',
        title: 'Peningkatan Kompetensi',
        description: 'Melakukan pelatihan untuk meningkatkan kompetensi guru.',
        sub_tasks: [
          'Pelatihan kurikulum merdeka',
          'Pelatihan teknologi informasi',
          'Diklat struktural dan fungsional'
        ]
      },
      {
        id: 'task-gtk-4',
        category: 'Pengelolaan',
        title: 'Pengelolaan Data GTK',
        description: 'Mengelola data guru dan tenaga kependidikan secara nasional.',
        sub_tasks: [
          'Pemutakhiran data Dapodik',
          'Verifikasi dan validasi data',
          'Sistem informasi GTK'
        ]
      }
    ],
    members: [
      {
        id: 'gtk-001',
        name: 'Dr. Ahmad Santoso, M.Pd',
        position: 'Direktur Jenderal',
        email: 'ahmad.santoso@kemdikdasmen.go.id',
        level: 0
      },
      {
        id: 'gtk-002',
        name: 'Siti Nurhaliza, S.Pd, M.Si',
        position: 'Direktur Sertifikasi',
        email: 'siti.nurhaliza@kemdikdasmen.go.id',
        level: 1
      },
      {
        id: 'gtk-003',
        name: 'Budi Prasetyo, M.Pd',
        position: 'Direktur PPG',
        email: 'budi.prasetyo@kemdikdasmen.go.id',
        level: 1
      },
      {
        id: 'gtk-004',
        name: 'Dr. Rina Kusuma, M.Pd',
        position: 'Direktur Pengembangan',
        email: 'rina.kusuma@kemdikdasmen.go.id',
        level: 1
      }
    ],
    contact: {
      email: 'direktorat.gtk@kemdikdasmen.go.id',
      phone: '021-5725606',
      extension: '301',
      location: 'Gedung D Lantai 1-3, Kompleks Kemendikdasmen',
      office_hours: 'Senin - Jumat: 08.00 - 16.00 WIB'
    },
    address_detail: {
      street: 'Jl. Jenderal Sudirman Kav. 1-3',
      city: 'Jakarta Pusat',
      province: 'DKI Jakarta',
      postal_code: '10110',
      geo_location: {
        lat: -6.175392,
        lng: 106.827153
      }
    },
    building_photo_url: 'https://images.unsplash.com/photo-1764476751235-82addb009cd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnb3Zlcm5tZW50JTIwb2ZmaWNlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcxMjE0OTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    performance_scores: [
      { period: '2024 Q3', score: 82, category: 'Pengembangan' },
      { period: '2024 Q4', score: 85, category: 'Sertifikasi' },
      { period: '2025 Q1', score: 87, category: 'PPG' },
      { period: '2025 Q2', score: 90, category: 'Pelatihan' },
      { period: '2026 Q1', score: 91, category: 'Pengembangan' }
    ],
    position_summary: {
      total_positions: 52,
      filled_positions: 48
    },
    announcements: [
      {
        id: 'ann-gtk-1',
        title: 'Pendaftaran PPG Prajabatan Dibuka',
        content: 'Pendaftaran Program Pendidikan Profesi Guru (PPG) Prajabatan gelombang 2 telah dibuka mulai 1 Februari 2026.',
        date: '2026-02-01'
      }
    ],
    documents: [
      {
        id: 'doc-gtk-1',
        title: 'Panduan Sertifikasi Guru 2026',
        type: 'PDF',
        url: '#',
        size: '2.4 MB'
      },
      {
        id: 'doc-gtk-2',
        title: 'Pedoman PPG 2026',
        type: 'PDF',
        url: '#',
        size: '3.7 MB'
      }
    ],
    is_active: true,
    created_at: '2024-01-15',
    updated_at: '2026-02-16'
  },
  {
    id: 'inspektorat-jenderal',
    name: 'Inspektorat Jenderal',
    short_name: 'Itjen',
    short_description: 'Melaksanakan pengawasan intern di lingkungan kementerian terhadap pelaksanaan tugas dalam rangka pencapaian tujuan organisasi.',
    description: 'Inspektorat Jenderal bertanggung jawab atas pengawasan internal, audit, dan evaluasi pelaksanaan program serta anggaran di lingkungan kementerian untuk memastikan akuntabilitas dan transparansi.',
    vision: 'Terwujudnya pengawasan yang efektif untuk meningkatkan akuntabilitas kementerian.',
    mission: [
      'Melakukan audit internal secara berkala',
      'Mengevaluasi efektivitas program dan penggunaan anggaran',
      'Menindaklanjuti temuan audit',
      'Memberikan rekomendasi perbaikan sistem',
      'Mencegah dan mendeteksi fraud'
    ],
    category: 'Inspektorat',
    services: [
      {
        id: 'itjen-1',
        title: 'Whistleblowing System',
        description: 'Sistem pelaporan pelanggaran dan gratifikasi.',
        access_method: 'Portal whistleblowing atau hotline 08001234567'
      },
      {
        id: 'itjen-2',
        title: 'Audit Internal',
        description: 'Pelaksanaan audit kinerja dan keuangan unit kerja.',
        access_method: 'Koordinasi dengan Inspektur bidang'
      },
      {
        id: 'itjen-3',
        title: 'Konsultasi Sistem Pengendalian',
        description: 'Layanan konsultasi perbaikan sistem pengendalian internal.',
        access_method: 'Email ke itjen@kemdikdasmen.go.id'
      },
      {
        id: 'itjen-4',
        title: 'Monitoring Tindak Lanjut',
        description: 'Monitoring pelaksanaan tindak lanjut hasil audit.',
        access_method: 'Sistem monitoring e-audit'
      }
    ],
    tasks_detail: [
      {
        id: 'task-itjen-1',
        category: 'Pengawasan',
        title: 'Audit Internal',
        description: 'Melaksanakan audit internal terhadap unit kerja.',
        sub_tasks: [
          'Audit kinerja',
          'Audit keuangan',
          'Audit dengan tujuan tertentu',
          'Evaluasi LAKIP'
        ]
      },
      {
        id: 'task-itjen-2',
        category: 'Pencegahan',
        title: 'Pencegahan Korupsi',
        description: 'Melakukan upaya pencegahan korupsi dan penyalahgunaan kewenangan.',
        sub_tasks: [
          'Sosialisasi antikorupsi',
          'Pengelolaan gratifikasi',
          'Whistleblowing system',
          'Asesmen risiko fraud'
        ]
      },
      {
        id: 'task-itjen-3',
        category: 'Evaluasi',
        title: 'Monitoring dan Evaluasi',
        description: 'Monitoring pelaksanaan program dan tindak lanjut audit.',
        sub_tasks: [
          'Monitoring tindak lanjut',
          'Evaluasi kinerja unit',
          'Penilaian maturitas SPIP'
        ]
      },
      {
        id: 'task-itjen-4',
        category: 'Konsultasi',
        title: 'Quality Assurance',
        description: 'Memberikan konsultasi perbaikan sistem dan prosedur.',
        sub_tasks: [
          'Konsultasi SPIP',
          'Review SOP',
          'Assessment risiko'
        ]
      }
    ],
    members: [
      {
        id: 'itjen-001',
        name: 'Drs. Budi Santoso, M.Si, Ak',
        position: 'Inspektur Jenderal',
        email: 'budi.santoso.itjen@kemdikdasmen.go.id',
        level: 0
      },
      {
        id: 'itjen-002',
        name: 'Dr. Andi Firmansyah, S.H, M.M',
        position: 'Inspektur I',
        email: 'andi.firmansyah@kemdikdasmen.go.id',
        level: 1
      },
      {
        id: 'itjen-003',
        name: 'Dra. Ratna Sari, M.Ak',
        position: 'Inspektur II',
        email: 'ratna.sari@kemdikdasmen.go.id',
        level: 1
      }
    ],
    contact: {
      email: 'itjen@kemdikdasmen.go.id',
      phone: '021-5725617',
      extension: '1301',
      location: 'Gedung A Lantai 4, Kompleks Kemendikdasmen',
      office_hours: 'Senin - Jumat: 08.00 - 16.00 WIB'
    },
    address_detail: {
      street: 'Jl. Jenderal Sudirman Kav. 1-3',
      city: 'Jakarta Pusat',
      province: 'DKI Jakarta',
      postal_code: '10110',
      geo_location: {
        lat: -6.175450,
        lng: 106.827300
      }
    },
    building_photo_url: 'https://images.unsplash.com/photo-1769008302060-74c03f712dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGJ1aWxkaW5nJTIwZmFjYWRlfGVufDF8fHx8MTc3MTIzMzc3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    performance_scores: [
      { period: '2024 Q3', score: 86, category: 'Audit' },
      { period: '2024 Q4', score: 88, category: 'Pengawasan' },
      { period: '2025 Q1', score: 89, category: 'Evaluasi' },
      { period: '2025 Q2', score: 91, category: 'Audit' },
      { period: '2026 Q1', score: 92, category: 'Pengawasan' }
    ],
    position_summary: {
      total_positions: 28,
      filled_positions: 26
    },
    announcements: [
      {
        id: 'ann-itjen-1',
        title: 'Sosialisasi Zona Integritas',
        content: 'Akan dilaksanakan sosialisasi pembangunan zona integritas menuju WBK/WBBM pada 25 Februari 2026.',
        date: '2026-02-13'
      }
    ],
    documents: [
      {
        id: 'doc-itjen-1',
        title: 'Pedoman Audit Internal',
        type: 'PDF',
        url: '#',
        size: '2.8 MB'
      },
      {
        id: 'doc-itjen-2',
        title: 'Panduan Whistleblowing',
        type: 'PDF',
        url: '#',
        size: '1.5 MB'
      }
    ],
    is_active: true,
    created_at: '2024-01-06',
    updated_at: '2026-02-16'
  },
  {
    id: 'bskap',
    name: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan',
    short_name: 'BSKAP',
    short_description: 'Mengelola standar nasional pendidikan, pengembangan kurikulum, dan pelaksanaan asesmen pendidikan untuk meningkatkan mutu pembelajaran.',
    description: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan mempunyai tugas melaksanakan penyusunan dan pengembangan standar, kurikulum, asesmen, dan perbukuan pendidikan.',
    vision: 'Terwujudnya standar, kurikulum, dan asesmen pendidikan yang berkualitas dan adaptif.',
    mission: [
      'Mengembangkan standar nasional pendidikan',
      'Menyusun dan mengembangkan kurikulum yang inovatif',
      'Melaksanakan asesmen pendidikan yang valid dan reliabel',
      'Mengelola perbukuan pendidikan yang berkualitas',
      'Memberikan rekomendasi kebijakan berbasis data'
    ],
    category: 'Badan',
    services: [
      {
        id: 'bskap-1',
        title: 'Konsultasi Kurikulum',
        description: 'Layanan konsultasi implementasi kurikulum merdeka di sekolah.',
        access_method: 'Email ke konsultasi.kurikulum@kemdikdasmen.go.id'
      },
      {
        id: 'bskap-2',
        title: 'Asesmen Nasional',
        description: 'Pelaksanaan Asesmen Nasional (AN) berbasis komputer.',
        access_method: 'Portal Asesmen Nasional'
      },
      {
        id: 'bskap-3',
        title: 'Perbukuan',
        description: 'Penyediaan buku teks dan bahan ajar berkualitas.',
        access_method: 'Platform Merdeka Mengajar dan buku.kemdikbud.go.id'
      },
      {
        id: 'bskap-4',
        title: 'Platform Rapor Pendidikan',
        description: 'Akses data dan analisis hasil asesmen nasional.',
        access_method: 'Platform Rapor Pendidikan'
      }
    ],
    tasks_detail: [
      {
        id: 'task-bskap-1',
        category: 'Standar',
        title: 'Pengembangan Standar',
        description: 'Menyusun dan mengembangkan standar nasional pendidikan.',
        sub_tasks: [
          'Standar kompetensi lulusan',
          'Standar isi',
          'Standar proses',
          'Standar penilaian'
        ]
      },
      {
        id: 'task-bskap-2',
        category: 'Kurikulum',
        title: 'Pengembangan Kurikulum',
        description: 'Menyusun dan mengembangkan kurikulum pendidikan.',
        sub_tasks: [
          'Kurikulum Merdeka',
          'Capaian pembelajaran',
          'Modul ajar',
          'Pelatihan implementasi'
        ]
      },
      {
        id: 'task-bskap-3',
        category: 'Asesmen',
        title: 'Asesmen Nasional',
        description: 'Melaksanakan asesmen pendidikan berbasis komputer.',
        sub_tasks: [
          'Asesmen Kompetensi Minimum (AKM)',
          'Survei Karakter',
          'Survei Lingkungan Belajar',
          'Rapor Pendidikan'
        ]
      },
      {
        id: 'task-bskap-4',
        category: 'Perbukuan',
        title: 'Pengelolaan Perbukuan',
        description: 'Mengelola penyediaan buku teks dan bahan ajar.',
        sub_tasks: [
          'Penilaian buku teks',
          'Platform buku digital',
          'Distribusi buku'
        ]
      }
    ],
    members: [
      {
        id: 'bskap-001',
        name: 'Prof. Dr. Anindito Aditomo',
        position: 'Kepala Badan',
        email: 'anindito.aditomo@kemdikdasmen.go.id',
        level: 0
      },
      {
        id: 'bskap-002',
        name: 'Dr. Asep Sukmayadi, M.Pd',
        position: 'Kepala Pusat Kurikulum',
        email: 'asep.sukmayadi@kemdikdasmen.go.id',
        level: 1
      },
      {
        id: 'bskap-003',
        name: 'Dr. Hendarman, M.Pd',
        position: 'Kepala Pusat Asesmen',
        email: 'hendarman@kemdikdasmen.go.id',
        level: 1
      },
      {
        id: 'bskap-004',
        name: 'Dra. Sri Wahyuningsih, M.Pd',
        position: 'Kepala Pusat Perbukuan',
        email: 'sri.wahyuningsih@kemdikdasmen.go.id',
        level: 1
      }
    ],
    contact: {
      email: 'bskap@kemdikdasmen.go.id',
      phone: '021-5725640',
      extension: '400',
      location: 'Gedung F Lantai 1-4, Kompleks Kemendikdasmen',
      office_hours: 'Senin - Jumat: 08.00 - 16.00 WIB'
    },
    address_detail: {
      street: 'Jl. Jenderal Sudirman Kav. 1-3',
      city: 'Jakarta Pusat',
      province: 'DKI Jakarta',
      postal_code: '10110',
      geo_location: {
        lat: -6.175470,
        lng: 106.827350
      }
    },
    building_photo_url: 'https://images.unsplash.com/photo-1713370511096-9088b80480d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG1pbmlzdHJhdGl2ZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MTIzMzc3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    performance_scores: [
      { period: '2024 Q3', score: 84, category: 'Kurikulum' },
      { period: '2024 Q4', score: 86, category: 'Asesmen' },
      { period: '2025 Q1', score: 88, category: 'Standar' },
      { period: '2025 Q2', score: 90, category: 'Asesmen' },
      { period: '2026 Q1', score: 92, category: 'Kurikulum' }
    ],
    position_summary: {
      total_positions: 48,
      filled_positions: 44
    },
    announcements: [
      {
        id: 'ann-bskap-1',
        title: 'Pelaksanaan Asesmen Nasional 2026',
        content: 'Asesmen Nasional untuk jenjang SD, SMP, dan SMA/SMK akan dilaksanakan pada bulan Agustus-September 2026.',
        date: '2026-02-12'
      }
    ],
    documents: [
      {
        id: 'doc-bskap-1',
        title: 'Panduan Kurikulum Merdeka',
        type: 'PDF',
        url: '#',
        size: '5.2 MB'
      },
      {
        id: 'doc-bskap-2',
        title: 'Pedoman Asesmen Nasional',
        type: 'PDF',
        url: '#',
        size: '3.9 MB'
      }
    ],
    is_active: true,
    created_at: '2024-01-20',
    updated_at: '2026-02-16'
  },
  {
    id: 'badanbahasa',
    name: 'Badan Pengembangan dan Pembinaan Bahasa',
    short_name: 'Badan Bahasa',
    short_description: 'Mengelola pengembangan, pembinaan, dan pelindungan bahasa serta sastra Indonesia untuk memperkuat identitas dan karakter bangsa.',
    description: 'Badan Pengembangan dan Pembinaan Bahasa mempunyai tugas melaksanakan pengembangan, pembinaan, dan pelindungan bahasa dan sastra Indonesia serta daerah.',
    vision: 'Terwujudnya bahasa Indonesia sebagai jati diri bangsa dan bahasa internasional.',
    mission: [
      'Mengembangkan bahasa Indonesia sebagai bahasa ilmu pengetahuan',
      'Membina dan melindungi bahasa dan sastra daerah',
      'Meningkatkan kemampuan berbahasa Indonesia masyarakat',
      'Mengembangkan pembelajaran bahasa Indonesia bagi penutur asing',
      'Mengelola dan menyebarluaskan informasi kebahasaan'
    ],
    category: 'Badan',
    services: [
      {
        id: 'bahasa-1',
        title: 'Konsultasi Kebahasaan',
        description: 'Layanan konsultasi tentang penggunaan bahasa Indonesia yang baik dan benar.',
        access_method: 'Email ke konsultasi@badanbahasa.kemdikbud.go.id atau hotline bahasa'
      },
      {
        id: 'bahasa-2',
        title: 'Uji Kemahiran Berbahasa Indonesia (UKBI)',
        description: 'Tes standar untuk mengukur kemampuan berbahasa Indonesia.',
        access_method: 'Pendaftaran melalui portal UKBI'
      },
      {
        id: 'bahasa-3',
        title: 'BIPA (Bahasa Indonesia bagi Penutur Asing)',
        description: 'Program pembelajaran bahasa Indonesia untuk orang asing.',
        access_method: 'Pendaftaran melalui balai/kantor bahasa setempat'
      },
      {
        id: 'bahasa-4',
        title: 'Kamus dan Glosarium',
        description: 'Penyediaan kamus dan glosarium bahasa Indonesia.',
        access_method: 'Portal Kamus Besar Bahasa Indonesia (KBBI) online'
      }
    ],
    tasks_detail: [
      {
        id: 'task-bahasa-1',
        category: 'Pengembangan',
        title: 'Pengembangan Bahasa',
        description: 'Mengembangkan dan memodernisasi bahasa Indonesia.',
        sub_tasks: [
          'Penyusunan kamus',
          'Pengembangan istilah',
          'Penelitian kebahasaan',
          'KBBI online'
        ]
      },
      {
        id: 'task-bahasa-2',
        category: 'Pembinaan',
        title: 'Pembinaan Bahasa',
        description: 'Membina penggunaan bahasa Indonesia yang baik dan benar.',
        sub_tasks: [
          'Pelatihan kebahasaan',
          'Penyuluhan bahasa',
          'Uji Kemahiran Berbahasa Indonesia',
          'Gerakan literasi nasional'
        ]
      },
      {
        id: 'task-bahasa-3',
        category: 'Pelindungan',
        title: 'Pelindungan Bahasa Daerah',
        description: 'Melindungi dan melestarikan bahasa serta sastra daerah.',
        sub_tasks: [
          'Pendokumentasian bahasa daerah',
          'Revitalisasi bahasa daerah',
          'Pelindungan warisan budaya takbenda'
        ]
      },
      {
        id: 'task-bahasa-4',
        category: 'Internasionalisasi',
        title: 'Bahasa Indonesia bagi Penutur Asing',
        description: 'Mengembangkan pembelajaran bahasa Indonesia di luar negeri.',
        sub_tasks: [
          'Program BIPA',
          'Pengembangan materi BIPA',
          'Pelatihan pengajar BIPA',
          'Kerjasama internasional'
        ]
      }
    ],
    members: [
      {
        id: 'bahasa-001',
        name: 'Prof. Dr. E. Aminudin Aziz, M.A',
        position: 'Kepala Badan',
        email: 'aminudin.aziz@badanbahasa.kemdikbud.go.id',
        level: 0
      },
      {
        id: 'bahasa-002',
        name: 'Dr. Emi Emilia, M.Ed',
        position: 'Kepala Pusat Pengembangan Bahasa',
        email: 'emi.emilia@badanbahasa.kemdikbud.go.id',
        level: 1
      },
      {
        id: 'bahasa-003',
        name: 'Dr. Yeyen Maryani, M.Hum',
        position: 'Kepala Pusat Pembinaan Bahasa',
        email: 'yeyen.maryani@badanbahasa.kemdikbud.go.id',
        level: 1
      },
      {
        id: 'bahasa-004',
        name: 'Prof. Dr. Dadang Sunendar, M.Hum',
        position: 'Kepala Pusat Pelindungan Bahasa',
        email: 'dadang.sunendar@badanbahasa.kemdikbud.go.id',
        level: 1
      }
    ],
    contact: {
      email: 'info@badanbahasa.kemdikbud.go.id',
      phone: '021-4706287',
      extension: '500',
      location: 'Jl. Daksinapati Barat IV, Rawamangun, Jakarta Timur',
      office_hours: 'Senin - Jumat: 08.00 - 16.00 WIB'
    },
    address_detail: {
      street: 'Jl. Daksinapati Barat IV',
      city: 'Jakarta Timur',
      province: 'DKI Jakarta',
      postal_code: '13220',
      geo_location: {
        lat: -6.195270,
        lng: 106.893810
      }
    },
    building_photo_url: 'https://images.unsplash.com/photo-1694702722584-05adc8802e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTE5OTAyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    performance_scores: [
      { period: '2024 Q3', score: 83, category: 'Pengembangan' },
      { period: '2024 Q4', score: 85, category: 'Pembinaan' },
      { period: '2025 Q1', score: 87, category: 'Pelindungan' },
      { period: '2025 Q2', score: 89, category: 'BIPA' },
      { period: '2026 Q1', score: 90, category: 'Pengembangan' }
    ],
    position_summary: {
      total_positions: 35,
      filled_positions: 32
    },
    announcements: [
      {
        id: 'ann-bahasa-1',
        title: 'Bulan Bahasa dan Sastra 2026',
        content: 'Peringatan Bulan Bahasa dan Sastra akan dilaksanakan pada bulan Oktober 2026 dengan berbagai lomba dan seminar.',
        date: '2026-02-11'
      }
    ],
    documents: [
      {
        id: 'doc-bahasa-1',
        title: 'Pedoman Umum Ejaan Bahasa Indonesia',
        type: 'PDF',
        url: '#',
        size: '2.1 MB'
      },
      {
        id: 'doc-bahasa-2',
        title: 'Panduan BIPA',
        type: 'PDF',
        url: '#',
        size: '3.4 MB'
      }
    ],
    is_active: true,
    created_at: '2024-01-22',
    updated_at: '2026-02-16'
  }
];
