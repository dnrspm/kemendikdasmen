// Mock data untuk Analytics Unit Kerja

export interface AnalyticsData {
  orgId: string;
  lastUpdated: string;
  totalASN: TotalASNData;
  statistikUmum: StatistikUmumData;
  statistikJabatan: StatistikJabatanData;
  jabatanFungsional: JabatanFungsionalData;
  jabatanPelaksana: JabatanPelaksanaData;
}

// ===== Statistik Umum =====
export interface TotalASNData {
  total: number;
  delta: number; // perubahan dari periode sebelumnya
  pns: number;
  pppk: number;
}

export interface StatistikUmumData {
  byUnitKerja: DataItem[];
  byJenisKelamin: DataItem[];
  byUsia: DataItem[];
  byMasaKerja: DataItem[];
  byPendidikan: DataItem[];
  byGolongan: GolonganItem[];
}

// ===== Statistik Jabatan =====
export interface StatistikJabatanData {
  overview: {
    manajerial: number;
    fungsional: number;
    pelaksana: number;
  };
  manajerial: {
    byUnitKerja: DataItem[];
    byUsia: DataItem[];
    byJenisKelamin: DataItem[];
    byPendidikan: DataItem[];
  };
}

// ===== Jabatan Fungsional =====
export interface JabatanFungsionalData {
  byUnitKerja: DataItem[];
  byJenjang: DataItem[];
  byMasaKerja: DataItem[];
  byUsia: DataItem[];
  byPendidikan: DataItem[];
  kebutuhanVsPersediaan: GapAnalysisItem[];
}

// ===== Jabatan Pelaksana =====
export interface JabatanPelaksanaData {
  byUnitKerja: DataItem[];
  byUsia: DataItem[];
  byPendidikan: DataItem[];
}

// ===== Helper Interfaces =====
export interface DataItem {
  name: string;
  value: number;
  percentage: number;
}

export interface GolonganItem {
  golongan: string;
  subGolongan: string;
  value: number;
  percentage: number;
}

export interface GapAnalysisItem {
  name: string;
  kebutuhan: number;
  persediaan: number;
  gap: number;
}

// ===== Mock Data Generator =====
export function getAnalyticsData(orgId: string): AnalyticsData {
  // Base data - akan disesuaikan per unit kerja
  const baseTotal = 450;
  const variance = Math.floor(Math.random() * 200) - 100;
  const total = baseTotal + variance;

  // Data untuk Analytics Keseluruhan (semua unit utama digabung)
  if (orgId === 'all' || orgId === 'keseluruhan') {
    return {
      orgId,
      lastUpdated: new Date().toISOString(),
      totalASN: {
        total: 3150, // Total dari 7 unit utama
        delta: 25,
        pns: 2205, // 70%
        pppk: 945  // 30%
      },
      statistikUmum: {
        byUnitKerja: [
          { name: 'Sekretariat Jenderal', value: 495, percentage: 15.7 },
          { name: 'Direktorat Jenderal PAUD Dikdasmen', value: 485, percentage: 15.4 },
          { name: 'Direktorat Jenderal Vokasi dan Pendidikan Khusus', value: 450, percentage: 14.3 },
          { name: 'Direktorat Jenderal Guru dan Tenaga Kependidikan', value: 520, percentage: 16.5 },
          { name: 'Inspektorat Jenderal', value: 380, percentage: 12.1 },
          { name: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan', value: 420, percentage: 13.3 },
          { name: 'Badan Pengembangan dan Pembinaan Bahasa', value: 400, percentage: 12.7 }
        ],
        byJenisKelamin: [
          { name: 'Laki-laki', value: 1638, percentage: 52 },
          { name: 'Perempuan', value: 1512, percentage: 48 }
        ],
        byUsia: [
          { name: '< 25 tahun', value: 252, percentage: 8 },
          { name: '25-34 tahun', value: 882, percentage: 28 },
          { name: '35-44 tahun', value: 1103, percentage: 35 },
          { name: '45-54 tahun', value: 693, percentage: 22 },
          { name: '≥ 55 tahun', value: 220, percentage: 7 }
        ],
        byMasaKerja: [
          { name: '< 5 tahun', value: 788, percentage: 25 },
          { name: '5-10 tahun', value: 945, percentage: 30 },
          { name: '11-20 tahun', value: 882, percentage: 28 },
          { name: '21-30 tahun', value: 378, percentage: 12 },
          { name: '> 30 tahun', value: 157, percentage: 5 }
        ],
        byPendidikan: [
          { name: 'S3', value: 95, percentage: 3 },
          { name: 'S2', value: 693, percentage: 22 },
          { name: 'S1/D4', value: 1827, percentage: 58 },
          { name: 'D3', value: 315, percentage: 10 },
          { name: 'SMA/SMK', value: 189, percentage: 6 },
          { name: 'SMP', value: 31, percentage: 1 }
        ],
        byGolongan: [
          { golongan: 'IV', subGolongan: 'a', value: 85, percentage: 2.7 },
          { golongan: 'IV', subGolongan: 'b', value: 57, percentage: 1.8 },
          { golongan: 'IV', subGolongan: 'c', value: 35, percentage: 1.1 },
          { golongan: 'IV', subGolongan: 'd', value: 22, percentage: 0.7 },
          { golongan: 'III', subGolongan: 'a', value: 454, percentage: 14.4 },
          { golongan: 'III', subGolongan: 'b', value: 545, percentage: 17.3 },
          { golongan: 'III', subGolongan: 'c', value: 643, percentage: 20.4 },
          { golongan: 'III', subGolongan: 'd', value: 406, percentage: 12.9 },
          { golongan: 'II', subGolongan: 'a', value: 337, percentage: 10.7 },
          { golongan: 'II', subGolongan: 'b', value: 265, percentage: 8.4 },
          { golongan: 'II', subGolongan: 'c', value: 176, percentage: 5.6 },
          { golongan: 'II', subGolongan: 'd', value: 104, percentage: 3.3 },
          { golongan: 'I', subGolongan: 'a', value: 22, percentage: 0.7 }
        ]
      },
      statistikJabatan: {
        overview: {
          manajerial: 473, // 15%
          fungsional: 1733, // 55%
          pelaksana: 945 // 30%
        },
        manajerial: {
          byUnitKerja: [
            { name: 'Direktorat Jenderal Guru dan Tenaga Kependidikan', value: 85, percentage: 18.0 },
            { name: 'Sekretariat Jenderal', value: 75, percentage: 15.9 },
            { name: 'Direktorat Jenderal PAUD Dikdasmen', value: 72, percentage: 15.2 },
            { name: 'Direktorat Jenderal Vokasi dan Pendidikan Khusus', value: 68, percentage: 14.4 },
            { name: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan', value: 65, percentage: 13.7 },
            { name: 'Badan Pengembangan dan Pembinaan Bahasa', value: 58, percentage: 12.3 },
            { name: 'Inspektorat Jenderal', value: 50, percentage: 10.6 }
          ],
          byUsia: [
            { name: '< 35 tahun', value: 35, percentage: 7.4 },
            { name: '35-44 tahun', value: 153, percentage: 32.3 },
            { name: '45-54 tahun', value: 223, percentage: 47.1 },
            { name: '≥ 55 tahun', value: 62, percentage: 13.1 }
          ],
          byJenisKelamin: [
            { name: 'Laki-laki', value: 313, percentage: 66.2 },
            { name: 'Perempuan', value: 160, percentage: 33.8 }
          ],
          byPendidikan: [
            { name: 'S3', value: 56, percentage: 11.8 },
            { name: 'S2', value: 292, percentage: 61.7 },
            { name: 'S1/D4', value: 125, percentage: 26.4 }
          ]
        }
      },
      jabatanFungsional: {
        byUnitKerja: [
          { name: 'Direktorat Jenderal Guru dan Tenaga Kependidikan', value: 286, percentage: 16.5 },
          { name: 'Direktorat Jenderal PAUD Dikdasmen', value: 267, percentage: 15.4 },
          { name: 'Direktorat Jenderal Vokasi dan Pendidikan Khusus', value: 248, percentage: 14.3 },
          { name: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan', value: 231, percentage: 13.3 },
          { name: 'Badan Pengembangan dan Pembinaan Bahasa', value: 220, percentage: 12.7 },
          { name: 'Sekretariat Jenderal', value: 272, percentage: 15.7 },
          { name: 'Inspektorat Jenderal', value: 209, percentage: 12.1 }
        ],
        byJenjang: [
          { name: 'Ahli Utama', value: 35, percentage: 2.0 },
          { name: 'Ahli Madya', value: 127, percentage: 7.3 },
          { name: 'Ahli Muda', value: 454, percentage: 26.2 },
          { name: 'Ahli Pertama', value: 684, percentage: 39.5 },
          { name: 'Terampil', value: 293, percentage: 16.9 },
          { name: 'Mahir', value: 104, percentage: 6.0 },
          { name: 'Penyelia', value: 35, percentage: 2.0 }
        ],
        byMasaKerja: [
          { name: '< 5 tahun', value: 364, percentage: 21.0 },
          { name: '5-10 tahun', value: 546, percentage: 31.5 },
          { name: '11-20 tahun', value: 503, percentage: 29.0 },
          { name: '21-30 tahun', value: 244, percentage: 14.1 },
          { name: '> 30 tahun', value: 76, percentage: 4.4 }
        ],
        byUsia: [
          { name: '< 25 tahun', value: 55, percentage: 3.2 },
          { name: '25-34 tahun', value: 503, percentage: 29.0 },
          { name: '35-44 tahun', value: 664, percentage: 38.3 },
          { name: '45-54 tahun', value: 406, percentage: 23.4 },
          { name: '≥ 55 tahun', value: 104, percentage: 6.0 }
        ],
        byPendidikan: [
          { name: 'S3', value: 83, percentage: 4.8 },
          { name: 'S2', value: 594, percentage: 34.3 },
          { name: 'S1/D4', value: 963, percentage: 55.6 },
          { name: 'D3', value: 90, percentage: 5.2 }
        ],
        kebutuhanVsPersediaan: [
          { name: 'Analis Kebijakan', kebutuhan: 175, persediaan: 126, gap: -49 },
          { name: 'Pranata Komputer', kebutuhan: 210, persediaan: 245, gap: 35 },
          { name: 'Perencana', kebutuhan: 105, persediaan: 84, gap: -21 },
          { name: 'Analis SDM', kebutuhan: 140, persediaan: 154, gap: 14 },
          { name: 'Auditor', kebutuhan: 84, persediaan: 70, gap: -14 },
          { name: 'Pranata Humas', kebutuhan: 56, persediaan: 63, gap: 7 },
          { name: 'Arsiparis', kebutuhan: 70, persediaan: 56, gap: -14 },
          { name: 'Pustakawan', kebutuhan: 42, persediaan: 49, gap: 7 }
        ]
      },
      jabatanPelaksana: {
        byUnitKerja: [
          { name: 'Sekretariat Jenderal', value: 148, percentage: 15.7 },
          { name: 'Direktorat Jenderal PAUD Dikdasmen', value: 146, percentage: 15.4 },
          { name: 'Direktorat Jenderal Guru dan Tenaga Kependidikan', value: 156, percentage: 16.5 },
          { name: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan', value: 126, percentage: 13.3 },
          { name: 'Direktorat Jenderal Vokasi dan Pendidikan Khusus', value: 135, percentage: 14.3 },
          { name: 'Badan Pengembangan dan Pembinaan Bahasa', value: 120, percentage: 12.7 },
          { name: 'Inspektorat Jenderal', value: 114, percentage: 12.1 }
        ],
        byUsia: [
          { name: '< 25 tahun', value: 105, percentage: 11.1 },
          { name: '25-34 tahun', value: 336, percentage: 35.6 },
          { name: '35-44 tahun', value: 294, percentage: 31.1 },
          { name: '45-54 tahun', value: 175, percentage: 18.5 },
          { name: '≥ 55 tahun', value: 35, percentage: 3.7 }
        ],
        byPendidikan: [
          { name: 'S1/D4', value: 315, percentage: 33.3 },
          { name: 'D3', value: 224, percentage: 23.7 },
          { name: 'SMA/SMK', value: 336, percentage: 35.6 },
          { name: 'SMP', value: 70, percentage: 7.4 }
        ]
      }
    };
  }

  // Data unit kerja spesifik untuk Sekretariat Jenderal
  const setjenUnitKerja = [
    { name: 'Pusat Pelatihan Sumber Daya Manusia', value: 65, percentage: 14.4 },
    { name: 'Biro Hukum', value: 58, percentage: 12.9 },
    { name: 'Biro Komunikasi dan Hubungan Masyarakat', value: 52, percentage: 11.6 },
    { name: 'Biro Keuangan dan Barang Milik Negara', value: 48, percentage: 10.7 },
    { name: 'Pusat Prestasi Nasional', value: 42, percentage: 9.3 },
    { name: 'Pusat Penguatan Karakter', value: 38, percentage: 8.4 },
    { name: 'Pusat Data dan Teknologi Informasi', value: 45, percentage: 10.0 },
    { name: 'Biro Perencanaan dan Kerja Sama', value: 35, percentage: 7.8 },
    { name: 'Biro Organisasi dan Sumber Daya Manusia', value: 32, percentage: 7.1 },
    { name: 'Pusat Layanan Pembiayaan Pendidikan', value: 10, percentage: 2.2 }
  ];

  // Data unit kerja default untuk unit lainnya
  const defaultUnitKerja = [
    { name: 'Direktorat GTK', value: 85, percentage: 18.9 },
    { name: 'Biro Kepegawaian', value: 72, percentage: 16.0 },
    { name: 'Direktorat Kurikulum', value: 68, percentage: 15.1 },
    { name: 'Biro Keuangan', value: 55, percentage: 12.2 },
    { name: 'Pusat Data & TI', value: 48, percentage: 10.7 },
    { name: 'Biro Hukum', value: 42, percentage: 9.3 },
    { name: 'Sekretariat', value: 38, percentage: 8.4 },
    { name: 'Lainnya', value: 42, percentage: 9.3 }
  ];

  // Pilih data unit kerja berdasarkan orgId
  const byUnitKerja = orgId === 'sekretariat-jenderal' ? setjenUnitKerja : defaultUnitKerja;

  // Data manajerial unit kerja spesifik untuk Sekretariat Jenderal
  const setjenManajerialUnitKerja = [
    { name: 'Pusat Pelatihan Sumber Daya Manusia', value: 12, percentage: 17.6 },
    { name: 'Biro Hukum', value: 10, percentage: 14.7 },
    { name: 'Biro Komunikasi dan Hubungan Masyarakat', value: 9, percentage: 13.2 },
    { name: 'Biro Keuangan dan Barang Milik Negara', value: 8, percentage: 11.8 },
    { name: 'Pusat Data dan Teknologi Informasi', value: 7, percentage: 10.3 },
    { name: 'Biro Perencanaan dan Kerja Sama', value: 6, percentage: 8.8 },
    { name: 'Pusat Prestasi Nasional', value: 5, percentage: 7.4 },
    { name: 'Lainnya', value: 11, percentage: 16.2 }
  ];

  const defaultManajerialUnitKerja = [
    { name: 'Direktorat GTK', value: 12, percentage: 17.6 },
    { name: 'Biro Kepegawaian', value: 10, percentage: 14.7 },
    { name: 'Direktorat Kurikulum', value: 9, percentage: 13.2 },
    { name: 'Biro Keuangan', value: 8, percentage: 11.8 },
    { name: 'Pusat Data & TI', value: 7, percentage: 10.3 },
    { name: 'Biro Hukum', value: 6, percentage: 8.8 },
    { name: 'Sekretariat', value: 8, percentage: 11.8 },
    { name: 'Lainnya', value: 8, percentage: 11.8 }
  ];

  const manajerialByUnitKerja = orgId === 'sekretariat-jenderal' ? setjenManajerialUnitKerja : defaultManajerialUnitKerja;

  // Data jabatan fungsional unit kerja spesifik untuk Sekretariat Jenderal
  const setjenFungsionalUnitKerja = [
    { name: 'Pusat Pelatihan Sumber Daya Manusia', value: 42, percentage: 16.9 },
    { name: 'Biro Hukum', value: 38, percentage: 15.3 },
    { name: 'Biro Komunikasi dan Hubungan Masyarakat', value: 35, percentage: 14.1 },
    { name: 'Pusat Data dan Teknologi Informasi', value: 32, percentage: 12.9 },
    { name: 'Biro Keuangan dan Barang Milik Negara', value: 28, percentage: 11.3 },
    { name: 'Pusat Prestasi Nasional', value: 25, percentage: 10.1 },
    { name: 'Biro Perencanaan dan Kerja Sama', value: 22, percentage: 8.9 },
    { name: 'Lainnya', value: 26, percentage: 10.5 }
  ];

  const defaultFungsionalUnitKerja = [
    { name: 'Direktorat GTK', value: 52, percentage: 21.0 },
    { name: 'Direktorat Kurikulum', value: 45, percentage: 18.1 },
    { name: 'Pusat Data & TI', value: 35, percentage: 14.1 },
    { name: 'Biro Kepegawaian', value: 28, percentage: 11.3 },
    { name: 'Biro Keuangan', value: 25, percentage: 10.1 },
    { name: 'Biro Hukum', value: 22, percentage: 8.9 },
    { name: 'Sekretariat', value: 18, percentage: 7.3 },
    { name: 'Lainnya', value: 23, percentage: 9.3 }
  ];

  const fungsionalByUnitKerja = orgId === 'sekretariat-jenderal' ? setjenFungsionalUnitKerja : defaultFungsionalUnitKerja;

  // Data jabatan pelaksana unit kerja spesifik untuk Sekretariat Jenderal
  const setjenPelaksanaUnitKerja = [
    { name: 'Biro Keuangan dan Barang Milik Negara', value: 28, percentage: 20.7 },
    { name: 'Pusat Pelatihan Sumber Daya Manusia', value: 22, percentage: 16.3 },
    { name: 'Biro Hukum', value: 18, percentage: 13.3 },
    { name: 'Pusat Data dan Teknologi Informasi', value: 15, percentage: 11.1 },
    { name: 'Biro Organisasi dan Sumber Daya Manusia', value: 12, percentage: 8.9 },
    { name: 'Biro Komunikasi dan Hubungan Masyarakat', value: 8, percentage: 5.9 },
    { name: 'Lainnya', value: 7, percentage: 5.2 }
  ];

  const defaultPelaksanaUnitKerja = [
    { name: 'Biro Kepegawaian', value: 34, percentage: 25.2 },
    { name: 'Biro Keuangan', value: 22, percentage: 16.3 },
    { name: 'Sekretariat', value: 18, percentage: 13.3 },
    { name: 'Direktorat GTK', value: 16, percentage: 11.9 },
    { name: 'Pusat Data & TI', value: 14, percentage: 10.4 },
    { name: 'Biro Hukum', value: 12, percentage: 8.9 },
    { name: 'Direktorat Kurikulum', value: 10, percentage: 7.4 },
    { name: 'Lainnya', value: 9, percentage: 6.7 }
  ];

  const pelaksanaByUnitKerja = orgId === 'sekretariat-jenderal' ? setjenPelaksanaUnitKerja : defaultPelaksanaUnitKerja;

  return {
    orgId,
    lastUpdated: new Date().toISOString(),
    totalASN: {
      total,
      delta: Math.floor(Math.random() * 20) - 10,
      pns: Math.floor(total * 0.7),
      pppk: Math.floor(total * 0.3)
    },
    statistikUmum: {
      byUnitKerja,
      byJenisKelamin: [
        { name: 'Laki-laki', value: Math.floor(total * 0.52), percentage: 52 },
        { name: 'Perempuan', value: Math.floor(total * 0.48), percentage: 48 }
      ],
      byUsia: [
        { name: '< 25 tahun', value: Math.floor(total * 0.08), percentage: 8 },
        { name: '25-34 tahun', value: Math.floor(total * 0.28), percentage: 28 },
        { name: '35-44 tahun', value: Math.floor(total * 0.35), percentage: 35 },
        { name: '45-54 tahun', value: Math.floor(total * 0.22), percentage: 22 },
        { name: '≥ 55 tahun', value: Math.floor(total * 0.07), percentage: 7 }
      ],
      byMasaKerja: [
        { name: '< 5 tahun', value: Math.floor(total * 0.25), percentage: 25 },
        { name: '5-10 tahun', value: Math.floor(total * 0.30), percentage: 30 },
        { name: '11-20 tahun', value: Math.floor(total * 0.28), percentage: 28 },
        { name: '21-30 tahun', value: Math.floor(total * 0.12), percentage: 12 },
        { name: '> 30 tahun', value: Math.floor(total * 0.05), percentage: 5 }
      ],
      byPendidikan: [
        { name: 'S3', value: Math.floor(total * 0.03), percentage: 3 },
        { name: 'S2', value: Math.floor(total * 0.22), percentage: 22 },
        { name: 'S1/D4', value: Math.floor(total * 0.58), percentage: 58 },
        { name: 'D3', value: Math.floor(total * 0.10), percentage: 10 },
        { name: 'SMA/SMK', value: Math.floor(total * 0.06), percentage: 6 },
        { name: 'SMP', value: Math.floor(total * 0.01), percentage: 1 }
      ],
      byGolongan: [
        { golongan: 'IV', subGolongan: 'a', value: 12, percentage: 2.7 },
        { golongan: 'IV', subGolongan: 'b', value: 8, percentage: 1.8 },
        { golongan: 'IV', subGolongan: 'c', value: 5, percentage: 1.1 },
        { golongan: 'IV', subGolongan: 'd', value: 3, percentage: 0.7 },
        { golongan: 'III', subGolongan: 'a', value: 65, percentage: 14.4 },
        { golongan: 'III', subGolongan: 'b', value: 78, percentage: 17.3 },
        { golongan: 'III', subGolongan: 'c', value: 92, percentage: 20.4 },
        { golongan: 'III', subGolongan: 'd', value: 58, percentage: 12.9 },
        { golongan: 'II', subGolongan: 'a', value: 48, percentage: 10.7 },
        { golongan: 'II', subGolongan: 'b', value: 38, percentage: 8.4 },
        { golongan: 'II', subGolongan: 'c', value: 25, percentage: 5.6 },
        { golongan: 'II', subGolongan: 'd', value: 15, percentage: 3.3 },
        { golongan: 'I', subGolongan: 'a', value: 3, percentage: 0.7 }
      ]
    },
    statistikJabatan: {
      overview: {
        manajerial: Math.floor(total * 0.15),
        fungsional: Math.floor(total * 0.55),
        pelaksana: Math.floor(total * 0.30)
      },
      manajerial: {
        byUnitKerja: manajerialByUnitKerja,
        byUsia: [
          { name: '< 35 tahun', value: 5, percentage: 7.4 },
          { name: '35-44 tahun', value: 22, percentage: 32.4 },
          { name: '45-54 tahun', value: 32, percentage: 47.1 },
          { name: '≥ 55 tahun', value: 9, percentage: 13.2 }
        ],
        byJenisKelamin: [
          { name: 'Laki-laki', value: 45, percentage: 66.2 },
          { name: 'Perempuan', value: 23, percentage: 33.8 }
        ],
        byPendidikan: [
          { name: 'S3', value: 8, percentage: 11.8 },
          { name: 'S2', value: 42, percentage: 61.8 },
          { name: 'S1/D4', value: 18, percentage: 26.5 }
        ]
      }
    },
    jabatanFungsional: {
      byUnitKerja: fungsionalByUnitKerja,
      byJenjang: [
        { name: 'Ahli Utama', value: 5, percentage: 2.0 },
        { name: 'Ahli Madya', value: 18, percentage: 7.3 },
        { name: 'Ahli Muda', value: 65, percentage: 26.2 },
        { name: 'Ahli Pertama', value: 98, percentage: 39.5 },
        { name: 'Terampil', value: 42, percentage: 16.9 },
        { name: 'Mahir', value: 15, percentage: 6.0 },
        { name: 'Penyelia', value: 5, percentage: 2.0 }
      ],
      byMasaKerja: [
        { name: '< 5 tahun', value: 52, percentage: 21.0 },
        { name: '5-10 tahun', value: 78, percentage: 31.5 },
        { name: '11-20 tahun', value: 72, percentage: 29.0 },
        { name: '21-30 tahun', value: 35, percentage: 14.1 },
        { name: '> 30 tahun', value: 11, percentage: 4.4 }
      ],
      byUsia: [
        { name: '< 25 tahun', value: 8, percentage: 3.2 },
        { name: '25-34 tahun', value: 72, percentage: 29.0 },
        { name: '35-44 tahun', value: 95, percentage: 38.3 },
        { name: '45-54 tahun', value: 58, percentage: 23.4 },
        { name: '≥ 55 tahun', value: 15, percentage: 6.0 }
      ],
      byPendidikan: [
        { name: 'S3', value: 12, percentage: 4.8 },
        { name: 'S2', value: 85, percentage: 34.3 },
        { name: 'S1/D4', value: 138, percentage: 55.6 },
        { name: 'D3', value: 13, percentage: 5.2 }
      ],
      kebutuhanVsPersediaan: [
        { name: 'Analis Kebijakan', kebutuhan: 25, persediaan: 18, gap: -7 },
        { name: 'Pranata Komputer', kebutuhan: 30, persediaan: 35, gap: 5 },
        { name: 'Perencana', kebutuhan: 15, persediaan: 12, gap: -3 },
        { name: 'Analis SDM', kebutuhan: 20, persediaan: 22, gap: 2 },
        { name: 'Auditor', kebutuhan: 12, persediaan: 10, gap: -2 },
        { name: 'Pranata Humas', kebutuhan: 8, persediaan: 9, gap: 1 },
        { name: 'Arsiparis', kebutuhan: 10, persediaan: 8, gap: -2 },
        { name: 'Pustakawan', kebutuhan: 6, persediaan: 7, gap: 1 }
      ]
    },
    jabatanPelaksana: {
      byUnitKerja: pelaksanaByUnitKerja,
      byUsia: [
        { name: '< 25 tahun', value: 15, percentage: 11.1 },
        { name: '25-34 tahun', value: 48, percentage: 35.6 },
        { name: '35-44 tahun', value: 42, percentage: 31.1 },
        { name: '45-54 tahun', value: 25, percentage: 18.5 },
        { name: '≥ 55 tahun', value: 5, percentage: 3.7 }
      ],
      byPendidikan: [
        { name: 'S1/D4', value: 45, percentage: 33.3 },
        { name: 'D3', value: 32, percentage: 23.7 },
        { name: 'SMA/SMK', value: 48, percentage: 35.6 },
        { name: 'SMP', value: 10, percentage: 7.4 }
      ]
    }
  };
}

// Helper untuk generate warna chart
export const CHART_COLORS = {
  primary: '#0954D9',
  secondary: '#4CA375',
  accent: '#906CEF',
  warning: '#EDA62B',
  danger: '#E02D38',
  muted: '#808489',
  
  // Array untuk multiple series
  palette: [
    '#0954D9', // primary
    '#4CA375', // secondary
    '#906CEF', // accent
    '#EDA62B', // warning
    '#E02D38', // danger
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#06B6D4'  // cyan
  ]
};