import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Home,
  ChevronRight,
  Search,
  X,
  Building2,
  MapPin,
  Users,
  Layers,
} from 'lucide-react';
import { Header } from '@/app/components/Header';

// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * Struktur kebutuhan per jabatan:
 * - Keahlian    : terampil · mahir · penyelia  (3 level)
 * - Keterampilan: pertama  · muda  · madya · utama (4 level)
 *
 * Setiap jabatan selalu menampilkan kedua kategori;
 * nilai 0 berarti tidak ada yang tersedia di level tersebut.
 */
interface LevelKebutuhan {
  // Keahlian
  terampil: number;
  mahir: number;
  penyelia: number;
  // Keterampilan
  pertama: number;
  muda: number;
  madya: number;
  utama: number;
}

interface JabatanPerSatker {
  satkerId: string;
  levels: LevelKebutuhan;
}

interface Jabatan {
  id: string;
  nama: string;
  distribusi: JabatanPerSatker[];
}

interface Unit {
  id: string;
  nama: string;
  singkatan: string;
  warna: string;
}

interface SatuanKerja {
  id: string;
  nama: string;
  singkatan: string;
  unitId: string;
}

interface PetaJabatanProps {
  onBack: () => void;
  onNavigateToLayanan: () => void;
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function empty(): LevelKebutuhan {
  return { terampil: 0, mahir: 0, penyelia: 0, pertama: 0, muda: 0, madya: 0, utama: 0 };
}

function lv(
  terampil: number, mahir: number, penyelia: number,
  pertama: number, muda: number, madya: number, utama: number
): LevelKebutuhan {
  return { terampil, mahir, penyelia, pertama, muda, madya, utama };
}

function totalKeahlian(l: LevelKebutuhan) { return l.terampil + l.mahir + l.penyelia; }
function totalKeterampilan(l: LevelKebutuhan) { return l.pertama + l.muda + l.madya + l.utama; }
function totalAll(l: LevelKebutuhan) { return totalKeahlian(l) + totalKeterampilan(l); }

// ─── Static Data ──────────────────────────────────────────────────────────────

const units: Unit[] = [
  { id: 'setjen',        nama: 'Sekretariat Jenderal',                               singkatan: 'Setjen',        warna: '#0954D9' },
  { id: 'ditjen-paud',   nama: 'Ditjen PAUD Dikdasmen',                              singkatan: 'PAUD Dikdasmen',warna: '#4CA375' },
  { id: 'ditjen-gtk',    nama: 'Ditjen Guru dan Tenaga Kependidikan',                singkatan: 'Ditjen GTK',    warna: '#906CEF' },
  { id: 'ditjen-vokasi', nama: 'Ditjen Pendidikan Vokasi',                           singkatan: 'Ditjen Vokasi', warna: '#EDA62B' },
  { id: 'bskap',         nama: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan',   singkatan: 'BSKAP',         warna: '#E0452A' },
  { id: 'badan-bahasa',  nama: 'Badan Pengembangan dan Pembinaan Bahasa',            singkatan: 'Badan Bahasa',  warna: '#0E9A8E' },
  { id: 'itjen',         nama: 'Inspektorat Jenderal',                               singkatan: 'Itjen',         warna: '#C4541E' },
];

const satuanKerja: SatuanKerja[] = [
  // Setjen
  { id: 'setjen-pusdatin', nama: 'Pusat Data dan Teknologi Informasi', singkatan: 'Pusdatin', unitId: 'setjen' },
  { id: 'setjen-biro-perencanaan', nama: 'Biro Perencanaan dan Anggaran', singkatan: 'Biro Perencanaan', unitId: 'setjen' },
  { id: 'setjen-biro-hukum', nama: 'Biro Hukum dan Organisasi', singkatan: 'Biro Hukum', unitId: 'setjen' },
  
  // Ditjen PAUD
  { id: 'paud-dit-paud', nama: 'Direktorat Pendidikan Anak Usia Dini', singkatan: 'Dit. PAUD', unitId: 'ditjen-paud' },
  { id: 'paud-dit-sd', nama: 'Direktorat Sekolah Dasar', singkatan: 'Dit. SD', unitId: 'ditjen-paud' },
  { id: 'paud-dit-smp', nama: 'Direktorat Sekolah Menengah Pertama', singkatan: 'Dit. SMP', unitId: 'ditjen-paud' },
  
  // Ditjen GTK
  { id: 'gtk-dit-gtk-paud', nama: 'Direktorat GTK PAUD dan Dikmas', singkatan: 'Dit. GTK PAUD', unitId: 'ditjen-gtk' },
  { id: 'gtk-dit-gtk-dikdas', nama: 'Direktorat GTK Pendidikan Dasar', singkatan: 'Dit. GTK Dikdas', unitId: 'ditjen-gtk' },
  { id: 'gtk-dit-gtk-dikmen', nama: 'Direktorat GTK Pendidikan Menengah', singkatan: 'Dit. GTK Dikmen', unitId: 'ditjen-gtk' },
  
  // Ditjen Vokasi
  { id: 'vokasi-dit-smk', nama: 'Direktorat Sekolah Menengah Kejuruan', singkatan: 'Dit. SMK', unitId: 'ditjen-vokasi' },
  { id: 'vokasi-dit-kemitraan', nama: 'Direktorat Kemitraan dan Penyelarasan DUDI', singkatan: 'Dit. Kemitraan', unitId: 'ditjen-vokasi' },
  
  // BSKAP
  { id: 'bskap-pusat-kurikulum', nama: 'Pusat Kurikulum dan Pembelajaran', singkatan: 'Pusat Kurikulum', unitId: 'bskap' },
  { id: 'bskap-pusat-asesmen', nama: 'Pusat Asesmen Pendidikan', singkatan: 'Pusat Asesmen', unitId: 'bskap' },
  { id: 'bskap-pusat-standar', nama: 'Pusat Standar dan Kebijakan Pendidikan', singkatan: 'Pusat Standar', unitId: 'bskap' },
  
  // Badan Bahasa
  { id: 'bahasa-pusat-pembinaan', nama: 'Pusat Pembinaan Bahasa dan Sastra', singkatan: 'Pusat Pembinaan', unitId: 'badan-bahasa' },
  { id: 'bahasa-pusat-pengembangan', nama: 'Pusat Pengembangan dan Pelindungan', singkatan: 'Pusat Pengembangan', unitId: 'badan-bahasa' },
  
  // Itjen
  { id: 'itjen-inspektorat-1', nama: 'Inspektorat I', singkatan: 'Inspektorat I', unitId: 'itjen' },
  { id: 'itjen-inspektorat-2', nama: 'Inspektorat II', singkatan: 'Inspektorat II', unitId: 'itjen' },
  { id: 'itjen-inspektorat-3', nama: 'Inspektorat III', singkatan: 'Inspektorat III', unitId: 'itjen' },
];

//
// Data: lv(terampil, mahir, penyelia,  pertama, muda, madya, utama)
//
const jabatanList: Jabatan[] = [
  {
    id: 'analis-kebijakan', nama: 'Analis Kebijakan',
    distribusi: [
      { satkerId: 'setjen-biro-perencanaan', levels: lv(2, 1, 1,  5, 8, 3, 1) },
      { satkerId: 'setjen-biro-hukum', levels: lv(1, 1, 0,  3, 4, 2, 1) },
      { satkerId: 'paud-dit-paud', levels: lv(1, 1, 0,  4, 6, 2, 0) },
      { satkerId: 'paud-dit-sd', levels: lv(1, 0, 0,  3, 5, 2, 1) },
      { satkerId: 'paud-dit-smp', levels: lv(0, 0, 0,  3, 4, 2, 0) },
      { satkerId: 'gtk-dit-gtk-paud', levels: lv(1, 1, 0,  3, 4, 1, 1) },
      { satkerId: 'gtk-dit-gtk-dikdas', levels: lv(1, 1, 1,  3, 5, 2, 1) },
      { satkerId: 'gtk-dit-gtk-dikmen', levels: lv(0, 0, 0,  3, 4, 1, 0) },
      { satkerId: 'vokasi-dit-smk', levels: lv(1, 1, 0,  4, 6, 2, 1) },
      { satkerId: 'vokasi-dit-kemitraan', levels: lv(0, 0, 0,  3, 5, 1, 0) },
      { satkerId: 'bskap-pusat-kurikulum', levels: lv(1, 1, 1,  3, 4, 2, 1) },
      { satkerId: 'bskap-pusat-standar', levels: lv(1, 0, 0,  3, 5, 2, 1) },
      { satkerId: 'bahasa-pusat-pembinaan', levels: lv(1, 0, 0,  2, 4, 2, 1) },
      { satkerId: 'bahasa-pusat-pengembangan', levels: lv(0, 1, 0,  2, 3, 1, 0) },
      { satkerId: 'itjen-inspektorat-1', levels: lv(1, 0, 0,  1, 2, 1, 0) },
      { satkerId: 'itjen-inspektorat-2', levels: lv(0, 0, 0,  1, 2, 1, 1) },
      { satkerId: 'itjen-inspektorat-3', levels: lv(0, 0, 0,  1, 1, 0, 0) },
    ],
  },
  {
    id: 'pranata-komputer', nama: 'Pranata Komputer',
    distribusi: [
      { satkerId: 'setjen-pusdatin', levels: lv(3, 2, 1,  6, 5, 2, 1) },
      { satkerId: 'setjen-biro-perencanaan', levels: lv(1, 1, 1,  4, 3, 2, 0) },
      { satkerId: 'paud-dit-paud', levels: lv(1, 1, 0,  3, 2, 1, 0) },
      { satkerId: 'paud-dit-sd', levels: lv(1, 1, 1,  2, 2, 1, 0) },
      { satkerId: 'paud-dit-smp', levels: lv(0, 0, 0,  1, 1, 0, 0) },
      { satkerId: 'gtk-dit-gtk-paud', levels: lv(1, 1, 0,  3, 2, 1, 0) },
      { satkerId: 'gtk-dit-gtk-dikdas', levels: lv(1, 1, 1,  2, 2, 1, 1) },
      { satkerId: 'gtk-dit-gtk-dikmen', levels: lv(1, 0, 0,  2, 2, 1, 0) },
      { satkerId: 'vokasi-dit-smk', levels: lv(1, 1, 1,  3, 2, 1, 0) },
      { satkerId: 'vokasi-dit-kemitraan', levels: lv(1, 0, 0,  2, 2, 1, 0) },
      { satkerId: 'bskap-pusat-kurikulum', levels: lv(1, 1, 0,  3, 3, 2, 1) },
      { satkerId: 'bskap-pusat-asesmen', levels: lv(2, 1, 1,  5, 3, 1, 0) },
      { satkerId: 'bahasa-pusat-pembinaan', levels: lv(1, 1, 0,  2, 2, 1, 0) },
      { satkerId: 'bahasa-pusat-pengembangan', levels: lv(0, 0, 0,  2, 1, 0, 0) },
      { satkerId: 'itjen-inspektorat-1', levels: lv(1, 0, 0,  1, 1, 0, 0) },
      { satkerId: 'itjen-inspektorat-2', levels: lv(0, 1, 0,  1, 1, 1, 0) },
      { satkerId: 'itjen-inspektorat-3', levels: lv(0, 0, 0,  1, 0, 0, 0) },
    ],
  },
  {
    id: 'arsiparis', nama: 'Arsiparis',
    distribusi: [
      { satkerId: 'setjen-pusdatin', levels: lv(4, 3, 2,  2, 3, 1, 0) },
      { satkerId: 'setjen-biro-perencanaan', levels: lv(1, 1, 0,  1, 1, 1, 0) },
      { satkerId: 'paud-dit-paud', levels: lv(1, 1, 0,  1, 1, 0, 0) },
      { satkerId: 'paud-dit-sd', levels: lv(1, 1, 1,  1, 1, 1, 0) },
      { satkerId: 'paud-dit-smp', levels: lv(1, 0, 0,  0, 1, 0, 0) },
      { satkerId: 'gtk-dit-gtk-paud', levels: lv(2, 1, 0,  1, 1, 1, 0) },
      { satkerId: 'gtk-dit-gtk-dikdas', levels: lv(1, 1, 1,  1, 1, 0, 0) },
      { satkerId: 'gtk-dit-gtk-dikmen', levels: lv(1, 1, 0,  0, 1, 0, 0) },
      { satkerId: 'vokasi-dit-smk', levels: lv(2, 1, 1,  1, 1, 1, 0) },
      { satkerId: 'vokasi-dit-kemitraan', levels: lv(1, 1, 0,  1, 1, 0, 0) },
      { satkerId: 'bskap-pusat-kurikulum', levels: lv(1, 1, 1,  1, 1, 1, 0) },
      { satkerId: 'bskap-pusat-asesmen', levels: lv(1, 1, 0,  1, 1, 0, 0) },
      { satkerId: 'bskap-pusat-standar', levels: lv(1, 0, 0,  0, 1, 0, 0) },
      { satkerId: 'bahasa-pusat-pembinaan', levels: lv(1, 1, 1,  1, 1, 1, 0) },
      { satkerId: 'bahasa-pusat-pengembangan', levels: lv(1, 1, 0,  0, 1, 0, 0) },
      { satkerId: 'itjen-inspektorat-1', levels: lv(1, 1, 0,  1, 0, 0, 0) },
      { satkerId: 'itjen-inspektorat-2', levels: lv(1, 0, 1,  0, 1, 0, 0) },
      { satkerId: 'itjen-inspektorat-3', levels: lv(0, 0, 0,  0, 0, 0, 0) },
    ],
  },
  {
    id: 'auditor', nama: 'Auditor',
    distribusi: [
      { satkerId: 'itjen-inspektorat-1', levels: lv(2, 1, 1,  6, 8, 3, 1) },
      { satkerId: 'itjen-inspektorat-2', levels: lv(1, 1, 1,  5, 7, 3, 1) },
      { satkerId: 'itjen-inspektorat-3', levels: lv(1, 1, 0,  4, 5, 2, 1) },
    ],
  },
  {
    id: 'perencana', nama: 'Perencana',
    distribusi: [
      { satkerId: 'setjen-biro-perencanaan', levels: lv(2, 1, 1,  5, 8, 3, 1) },
      { satkerId: 'paud-dit-paud', levels: lv(1, 1, 0,  2, 3, 1, 0) },
      { satkerId: 'paud-dit-sd', levels: lv(0, 0, 0,  2, 3, 1, 0) },
      { satkerId: 'vokasi-dit-smk', levels: lv(1, 1, 0,  3, 5, 2, 0) },
    ],
  },
  {
    id: 'widyaiswara', nama: 'Widyaiswara',
    distribusi: [
      { satkerId: 'paud-dit-paud', levels: lv(0, 0, 0,  1, 2, 2, 1) },
      { satkerId: 'paud-dit-sd', levels: lv(0, 0, 0,  1, 2, 1, 0) },
      { satkerId: 'paud-dit-smp', levels: lv(0, 0, 0,  1, 1, 1, 1) },
      { satkerId: 'gtk-dit-gtk-paud', levels: lv(0, 0, 0,  1, 2, 2, 1) },
      { satkerId: 'gtk-dit-gtk-dikdas', levels: lv(0, 0, 0,  2, 2, 2, 1) },
      { satkerId: 'gtk-dit-gtk-dikmen', levels: lv(0, 0, 0,  1, 2, 1, 1) },
      { satkerId: 'vokasi-dit-smk', levels: lv(0, 0, 0,  2, 3, 2, 1) },
      { satkerId: 'vokasi-dit-kemitraan', levels: lv(0, 0, 0,  1, 1, 1, 0) },
      { satkerId: 'bskap-pusat-kurikulum', levels: lv(0, 0, 0,  1, 2, 2, 1) },
      { satkerId: 'bskap-pusat-asesmen', levels: lv(0, 0, 0,  1, 1, 1, 1) },
    ],
  },
  {
    id: 'pengembang-tp', nama: 'Pengembang Teknologi Pembelajaran',
    distribusi: [
      { satkerId: 'paud-dit-paud', levels: lv(1, 1, 0,  2, 3, 1, 0) },
      { satkerId: 'paud-dit-sd', levels: lv(1, 1, 1,  2, 3, 2, 1) },
      { satkerId: 'gtk-dit-gtk-paud', levels: lv(1, 1, 0,  2, 3, 1, 0) },
      { satkerId: 'gtk-dit-gtk-dikdas', levels: lv(2, 1, 1,  3, 4, 3, 1) },
      { satkerId: 'bskap-pusat-kurikulum', levels: lv(2, 2, 1,  4, 5, 3, 1) },
      { satkerId: 'bskap-pusat-asesmen', levels: lv(1, 1, 0,  2, 3, 2, 1) },
    ],
  },
  {
    id: 'pengelola-pengadaan', nama: 'Pengelola Pengadaan Barang/Jasa',
    distribusi: [
      { satkerId: 'setjen-pusdatin', levels: lv(2, 1, 1,  6, 8, 3, 0) },
      { satkerId: 'vokasi-dit-smk', levels: lv(1, 1, 0,  3, 4, 2, 0) },
    ],
  },
  {
    id: 'statistisi', nama: 'Statistisi',
    distribusi: [
      { satkerId: 'paud-dit-paud', levels: lv(1, 1, 0,  1, 1, 1, 0) },
      { satkerId: 'paud-dit-sd', levels: lv(1, 1, 1,  1, 2, 1, 1) },
      { satkerId: 'gtk-dit-gtk-dikdas', levels: lv(1, 1, 0,  1, 1, 1, 0) },
      { satkerId: 'gtk-dit-gtk-dikmen', levels: lv(0, 1, 1,  1, 1, 0, 0) },
      { satkerId: 'vokasi-dit-smk', levels: lv(1, 1, 0,  1, 1, 1, 0) },
      { satkerId: 'vokasi-dit-kemitraan', levels: lv(1, 0, 1,  0, 1, 0, 0) },
      { satkerId: 'bskap-pusat-asesmen', levels: lv(1, 2, 1,  2, 3, 2, 1) },
    ],
  },
  {
    id: 'pustakawan', nama: 'Pustakawan',
    distribusi: [
      { satkerId: 'bskap-pusat-kurikulum', levels: lv(2, 2, 1,  1, 2, 1, 0) },
      { satkerId: 'bskap-pusat-standar', levels: lv(1, 1, 1,  1, 1, 0, 0) },
      { satkerId: 'bahasa-pusat-pembinaan', levels: lv(3, 3, 1,  2, 3, 1, 1) },
      { satkerId: 'bahasa-pusat-pengembangan', levels: lv(1, 1, 1,  1, 1, 1, 0) },
    ],
  },
  {
    id: 'pranata-humas', nama: 'Pranata Hubungan Masyarakat',
    distribusi: [
      { satkerId: 'setjen-pusdatin', levels: lv(3, 3, 2,  2, 3, 1, 0) },
      { satkerId: 'bahasa-pusat-pembinaan', levels: lv(1, 1, 1,  1, 1, 1, 0) },
      { satkerId: 'bahasa-pusat-pengembangan', levels: lv(1, 1, 0,  0, 1, 0, 0) },
    ],
  },
  {
    id: 'assessor-sdm', nama: 'Assessor SDM Aparatur',
    distribusi: [
      { satkerId: 'setjen-pusdatin', levels: lv(0, 0, 0,  3, 4, 2, 1) },
      { satkerId: 'gtk-dit-gtk-paud', levels: lv(0, 0, 0,  1, 1, 1, 0) },
      { satkerId: 'gtk-dit-gtk-dikdas', levels: lv(0, 0, 0,  1, 2, 0, 0) },
    ],
  },
  {
    id: 'analis-anggaran', nama: 'Analis Anggaran',
    distribusi: [
      { satkerId: 'setjen-biro-perencanaan', levels: lv(1, 1, 0,  4, 5, 2, 0) },
      { satkerId: 'itjen-inspektorat-1', levels: lv(0, 0, 0,  1, 1, 0, 0) },
      { satkerId: 'itjen-inspektorat-2', levels: lv(0, 0, 0,  1, 2, 1, 0) },
    ],
  },
  {
    id: 'pranata-keuangan', nama: 'Pranata Keuangan APBN',
    distribusi: [
      { satkerId: 'setjen-biro-perencanaan', levels: lv(5, 4, 2,  0, 0, 0, 0) },
      { satkerId: 'setjen-pusdatin', levels: lv(3, 2, 1,  0, 0, 0, 0) },
    ],
  },
  {
    id: 'penerjemah', nama: 'Penerjemah',
    distribusi: [
      { satkerId: 'bahasa-pusat-pembinaan', levels: lv(2, 1, 1,  4, 6, 3, 1) },
      { satkerId: 'bahasa-pusat-pengembangan', levels: lv(1, 1, 0,  2, 4, 2, 1) },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Tabel level kebutuhan — selalu menampilkan kedua kategori:
 *   Keahlian     : Terampil · Mahir · Penyelia
 *   Keterampilan : Pertama  · Muda  · Madya  · Utama
 */
function LevelTable({ levels }: { levels: LevelKebutuhan }) {
  const keahlianRows: { label: string; value: number }[] = [
    { label: 'Terampil', value: levels.terampil },
    { label: 'Mahir',    value: levels.mahir    },
    { label: 'Penyelia', value: levels.penyelia },
  ];
  const keterampilanRows: { label: string; value: number }[] = [
    { label: 'Pertama', value: levels.pertama },
    { label: 'Muda',    value: levels.muda    },
    { label: 'Madya',   value: levels.madya   },
    { label: 'Utama',   value: levels.utama   },
  ];

  const totKeahlian    = totalKeahlian(levels);
  const totKeterampilan = totalKeterampilan(levels);

  return (
    <div className="border border-[#E2E8F0] rounded-[var(--radius-card)] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr style={{ backgroundColor: 'var(--secondary)' }}>
            <th
              className="px-[14px] py-[8px] text-left border-b border-[#E2E8F0]"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontWeight: 'var(--font-weight-medium)' }}
            >
              Level
            </th>
            <th
              className="px-[14px] py-[8px] text-right border-b border-[#E2E8F0] w-[80px]"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontWeight: 'var(--font-weight-medium)' }}
            >
              Tersedia
            </th>
          </tr>
        </thead>
        <tbody>
          {/* ── Keahlian section ── */}
          <tr>
            <td
              colSpan={2}
              className="px-[14px] py-[6px] border-b border-[#E2E8F0]"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--foreground)',
                backgroundColor: 'var(--secondary)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Keahlian
            </td>
          </tr>
          {keahlianRows.map((row) => (
            <tr key={row.label} className="border-b border-[#F0F0F0]">
              <td
                className="px-[14px] py-[8px]"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}
              >
                {row.label}
              </td>
              <td
                className="px-[14px] py-[8px] text-right"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: row.value > 0 ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                  color: row.value > 0 ? 'var(--foreground)' : 'var(--muted-foreground)',
                }}
              >
                {row.value > 0 ? row.value : <span className="opacity-40">—</span>}
              </td>
            </tr>
          ))}
          {/* Keahlian subtotal */}
          <tr className="border-b border-[#E2E8F0]" style={{ backgroundColor: 'var(--secondary)' }}>
            <td
              className="px-[14px] py-[7px]"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}
            >
              Subtotal Keahlian
            </td>
            <td
              className="px-[14px] py-[7px] text-right"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}
            >
              {totKeahlian}
            </td>
          </tr>

          {/* ── Keterampilan section ── */}
          <tr>
            <td
              colSpan={2}
              className="px-[14px] py-[6px] border-b border-[#E2E8F0]"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--foreground)',
                backgroundColor: 'var(--secondary)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Keterampilan
            </td>
          </tr>
          {keterampilanRows.map((row) => (
            <tr key={row.label} className="border-b border-[#F0F0F0]">
              <td
                className="px-[14px] py-[8px]"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}
              >
                {row.label}
              </td>
              <td
                className="px-[14px] py-[8px] text-right"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: row.value > 0 ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                  color: row.value > 0 ? 'var(--foreground)' : 'var(--muted-foreground)',
                }}
              >
                {row.value > 0 ? row.value : <span className="opacity-40">—</span>}
              </td>
            </tr>
          ))}
          {/* Keterampilan subtotal */}
          <tr className="border-b border-[#E2E8F0]" style={{ backgroundColor: 'var(--secondary)' }}>
            <td
              className="px-[14px] py-[7px]"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}
            >
              Subtotal Keterampilan
            </td>
            <td
              className="px-[14px] py-[7px] text-right"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}
            >
              {totKeterampilan}
            </td>
          </tr>

          {/* ── Grand Total ── */}
          <tr style={{ backgroundColor: 'var(--secondary)' }}>
            <td
              className="px-[14px] py-[9px]"
              style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}
            >
              Total Tersedia
            </td>
            <td
              className="px-[14px] py-[9px] text-right"
              style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}
            >
              {totKeahlian + totKeterampilan}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function PetaJabatan({ onBack, onNavigateToLayanan }: PetaJabatanProps) {
  const [activeTab, setActiveTab] = useState<'unit' | 'jabatan'>('unit');

  // Mode A
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedSatker, setSelectedSatker] = useState<SatuanKerja | null>(null);
  const [satkerSearchQuery, setSatkerSearchQuery] = useState('');
  const [detailJabatan, setDetailJabatan] = useState<{
    jabatan: Jabatan;
    distribusi: JabatanPerSatker;
    satker: SatuanKerja;
  } | null>(null);

  // Mode B
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedJabatan, setSelectedJabatan] = useState<Jabatan | null>(null);
  const [detailJabatanModeB, setDetailJabatanModeB] = useState<{
    jabatan: Jabatan;
    distribusi: JabatanPerSatker;
    satker: SatuanKerja;
    unit: Unit;
  } | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return jabatanList.filter(j => j.nama.toLowerCase().includes(q));
  }, [searchQuery]);

  const satkerInUnit = useMemo(() => {
    if (!selectedUnit) return [];
    return satuanKerja.filter(sk => sk.unitId === selectedUnit.id);
  }, [selectedUnit]);

  const jabatanInSatker = useMemo(() => {
    if (!selectedSatker) return [];
    let results = jabatanList
      .map(j => ({ jabatan: j, distribusi: j.distribusi.find(d => d.satkerId === selectedSatker.id)! }))
      .filter(item => !!item.distribusi)
      .sort((a, b) => totalAll(b.distribusi.levels) - totalAll(a.distribusi.levels));
    
    // Filter by search query
    if (satkerSearchQuery.trim()) {
      const q = satkerSearchQuery.toLowerCase();
      results = results.filter(({ jabatan }) => jabatan.nama.toLowerCase().includes(q));
    }
    
    return results;
  }, [selectedSatker, satkerSearchQuery]);

  const satkerDistribusi = useMemo(() => {
    if (!selectedJabatan) return [];
    return selectedJabatan.distribusi
      .map(d => {
        const satker = satuanKerja.find(sk => sk.id === d.satkerId)!;
        const unit = units.find(u => u.id === satker?.unitId)!;
        return { distribusi: d, satker, unit };
      })
      .filter(item => !!item.satker && !!item.unit)
      .sort((a, b) => totalAll(b.distribusi.levels) - totalAll(a.distribusi.levels));
  }, [selectedJabatan]);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--background)' }}>
      <Header onLogoClick={onBack} />

      {/* Breadcrumb */}
      <div className="border-b" style={{ backgroundColor: 'var(--card)', borderColor: '#EFEFEF' }}>
        <div className="max-w-[1440px] mx-auto px-[24px] py-[16px]">
          <nav className="flex items-center gap-[8px]">
            <button onClick={onBack} className="flex items-center gap-[6px] transition-colors hover:opacity-70" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
              <Home className="w-[16px] h-[16px]" />
              <span>Beranda</span>
            </button>
            <ChevronRight className="w-[14px] h-[14px]" style={{ color: 'var(--border)' }} />
            <button onClick={onNavigateToLayanan} className="transition-colors hover:opacity-70" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
              Layanan
            </button>
            <ChevronRight className="w-[14px] h-[14px]" style={{ color: 'var(--border)' }} />
            <button onClick={onNavigateToLayanan} className="transition-colors hover:opacity-70" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
              Analisis Jabatan
            </button>
            <ChevronRight className="w-[14px] h-[14px]" style={{ color: 'var(--border)' }} />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}>
              Lihat Peta Jabatan
            </span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="border-b" style={{ backgroundColor: 'var(--card)', borderColor: '#EFEFEF' }}>
        <div className="max-w-[1440px] mx-auto px-[24px] py-[28px] flex items-start gap-[16px]">
          <div className="w-[48px] h-[48px] rounded-[var(--radius-card)] flex items-center justify-center shrink-0" style={{ backgroundColor: '#EBF2FF' }}>
            <MapPin className="w-[24px] h-[24px]" style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', marginBottom: '6px' }}>Peta Jabatan</h1>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--muted-foreground)' }}>Eksplorasi distribusi dan ketersedian jabatan berdasarkan unit dan satuan kerja</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-[24px] py-[32px]">

        {/* Tab Toggle */}
        <div
          className="inline-flex gap-[4px] p-[5px] rounded-[var(--radius-card)] border mb-[32px]"
          style={{ backgroundColor: 'var(--card)', borderColor: '#E2E8F0' }}
        >
          {([ 
            { key: 'unit',    icon: Building2, label: 'Cari berdasarkan Unit' },
            { key: 'jabatan', icon: Search,    label: 'Cari berdasarkan Jabatan' },
          ] as const).map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setSelectedUnit(null);
                setSelectedSatker(null);
                setDetailJabatan(null);
                setSelectedJabatan(null);
                setSearchQuery('');
                setSatkerSearchQuery('');
              }}
              className="flex items-center gap-[8px] px-[20px] py-[9px] rounded-[6px] transition-all"
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: activeTab === key ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                backgroundColor: activeTab === key ? 'var(--primary)' : 'transparent',
                color: activeTab === key ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
              }}
            >
              <Icon className="w-[16px] h-[16px]" />
              {label}
            </button>
          ))}
        </div>

        {/* ── MODE A: Berdasarkan Unit ──────────────────────────────────────── */}
        {activeTab === 'unit' && (
          <div>
            <p className="mb-[16px]" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
              Pilih unit utama untuk melihat satuan kerja dan jabatan yang tersedia
            </p>

            {/* Unit cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[12px] mb-[32px]">
              {units.map((unit) => {
                const isActive = selectedUnit?.id === unit.id;
                const satkerCount = satuanKerja.filter(sk => sk.unitId === unit.id).length;
                return (
                  <button
                    key={unit.id}
                    onClick={() => {
                      setSelectedUnit(isActive ? null : unit);
                      setSelectedSatker(null);
                      setSatkerSearchQuery('');
                    }}
                    className="text-left p-[16px] rounded-[var(--radius-card)] border transition-all"
                    style={{
                      backgroundColor: isActive ? unit.warna : 'var(--card)',
                      borderColor: isActive ? unit.warna : '#E2E8F0',
                      boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.15)' : undefined,
                    }}
                  >
                    <div
                      className="w-[36px] h-[36px] rounded-[8px] flex items-center justify-center mb-[10px]"
                      style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : `${unit.warna}20` }}
                    >
                      <Building2 className="w-[18px] h-[18px]" style={{ color: isActive ? '#fff' : unit.warna }} />
                    </div>
                    <p
                      className="leading-snug mb-[4px]"
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: isActive ? '#fff' : 'var(--foreground)',
                      }}
                    >
                      {unit.singkatan}
                    </p>
                    <p style={{ fontSize: 'var(--text-xs)', color: isActive ? 'rgba(255,255,255,0.7)' : 'var(--muted-foreground)' }}>
                      {satkerCount} satuan kerja
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Satuan Kerja cards */}
            {selectedUnit && satkerInUnit.length > 0 && (
              <>
                <div className="flex items-center gap-[10px] mb-[16px]">
                  <div className="w-[4px] h-[28px] rounded-full" style={{ backgroundColor: selectedUnit.warna }} />
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>Unit yang dipilih</p>
                    <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
                      {selectedUnit.nama}
                    </p>
                  </div>
                </div>

                <p className="mb-[12px]" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                  Pilih satuan kerja untuk melihat jabatan
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px] mb-[32px]">
                  {satkerInUnit.map((satker) => {
                    const isActive = selectedSatker?.id === satker.id;
                    const jabatanCount = jabatanList.filter(j => j.distribusi.some(d => d.satkerId === satker.id)).length;
                    return (
                      <button
                        key={satker.id}
                        onClick={() => {
                          setSelectedSatker(isActive ? null : satker);
                          setSatkerSearchQuery('');
                        }}
                        className="text-left p-[14px] rounded-[var(--radius-card)] border transition-all"
                        style={{
                          backgroundColor: isActive ? `${selectedUnit.warna}15` : 'var(--card)',
                          borderColor: isActive ? selectedUnit.warna : '#E2E8F0',
                          borderWidth: isActive ? '2px' : '1px',
                        }}
                      >
                        <div className="flex items-center gap-[10px] mb-[8px]">
                          <div
                            className="w-[32px] h-[32px] rounded-[6px] flex items-center justify-center shrink-0"
                            style={{ backgroundColor: isActive ? `${selectedUnit.warna}25` : `${selectedUnit.warna}10` }}
                          >
                            <Layers className="w-[16px] h-[16px]" style={{ color: selectedUnit.warna }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className="truncate leading-snug"
                              style={{
                                fontSize: 'var(--text-sm)',
                                fontWeight: 'var(--font-weight-medium)',
                                color: isActive ? 'var(--foreground)' : 'var(--foreground)',
                              }}
                            >
                              {satker.singkatan}
                            </p>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                              {jabatanCount} jabatan
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Selected satker label + search */}
            {selectedSatker && (
              <div className="flex items-center justify-between gap-[16px] mb-[20px]">
                <div className="flex items-center gap-[10px]">
                  <div className="w-[4px] h-[28px] rounded-full" style={{ backgroundColor: selectedUnit!.warna }} />
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>Satuan Kerja yang dipilih</p>
                    <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
                      {selectedSatker.nama}
                    </p>
                  </div>
                </div>
                
                {/* Search bar for jabatan */}
                <div className="relative w-full max-w-[400px]">
                  <Search className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px]" style={{ color: 'var(--muted-foreground)' }} />
                  <input
                    type="text"
                    placeholder="Cari jabatan..."
                    value={satkerSearchQuery}
                    onChange={(e) => setSatkerSearchQuery(e.target.value)}
                    className="w-full h-[42px] pl-[42px] pr-[38px] border rounded-[var(--radius)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                    style={{
                      borderColor: satkerSearchQuery ? 'var(--primary)' : '#E2E8F0',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--foreground)',
                      backgroundColor: 'var(--input-background)',
                    }}
                  />
                  {satkerSearchQuery && (
                    <button
                      onClick={() => setSatkerSearchQuery('')}
                      className="absolute right-[12px] top-1/2 -translate-y-1/2 p-[4px] rounded-[4px] hover:bg-[var(--secondary)] transition-colors"
                    >
                      <X className="w-[14px] h-[14px]" style={{ color: 'var(--muted-foreground)' }} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Jabatan list */}
            {selectedSatker && jabatanInSatker.length > 0 && (
              <div className="border rounded-[var(--radius-card)] overflow-hidden" style={{ backgroundColor: 'var(--card)', borderColor: '#E2E8F0' }}>
                <div className="px-[24px] py-[14px] border-b flex items-center justify-between" style={{ borderColor: '#E2E8F0' }}>
                  <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
                    Daftar Jabatan — {selectedSatker.singkatan}
                  </p>
                  <span className="px-[10px] py-[3px] rounded-[12px]" style={{ fontSize: 'var(--text-xs)', backgroundColor: '#EBF2FF', color: 'var(--primary)' }}>
                    {jabatanInSatker.length} jabatan
                  </span>
                </div>
                <div className="divide-y" style={{ borderColor: '#E2E8F0' }}>
                  {jabatanInSatker.map(({ jabatan, distribusi }) => {
                    const totK = totalKeahlian(distribusi.levels);
                    const totT = totalKeterampilan(distribusi.levels);
                    return (
                      <button
                        key={jabatan.id}
                        onClick={() => setDetailJabatan({ jabatan, distribusi, satker: selectedSatker })}
                        className="w-full px-[24px] py-[16px] transition-colors text-left flex items-center justify-between gap-[16px] group hover:bg-[#F9FAFB]"
                      >
                        <div className="flex items-center gap-[12px] flex-1 min-w-0">
                          <div className="w-[36px] h-[36px] rounded-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: `${selectedUnit!.warna}15` }}>
                            <Users className="w-[16px] h-[16px]" style={{ color: selectedUnit!.warna }} />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
                              {jabatan.nama}
                            </p>
                            <div className="flex items-center gap-[8px] mt-[4px]">
                              <span className="inline-flex items-center gap-[4px]" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                                <span className="w-[6px] h-[6px] rounded-full inline-block" style={{ backgroundColor: 'var(--muted-foreground)' }} />
                                Keahlian: {totK}
                              </span>
                              <span className="inline-flex items-center gap-[4px]" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                                <span className="w-[6px] h-[6px] rounded-full inline-block" style={{ backgroundColor: 'var(--muted-foreground)' }} />
                                Keterampilan: {totT}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-[16px] shrink-0">
                          <div className="text-right">
                            <p style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
                              {totK + totT}
                            </p>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>total</p>
                          </div>
                          <ChevronRight className="w-[16px] h-[16px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--muted-foreground)' }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty state */}
            {!selectedUnit && (
              <div className="border rounded-[var(--radius-card)] p-[64px] text-center" style={{ backgroundColor: 'var(--card)', borderColor: '#E2E8F0' }}>
                <Building2 className="w-[48px] h-[48px] mx-auto mb-[16px]" style={{ color: 'var(--muted-foreground)', opacity: 0.3 }} />
                <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', marginBottom: '8px' }}>
                  Pilih Unit Utama
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                  Klik salah satu kartu unit di atas untuk melihat satuan kerja dan jabatan
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── MODE B: Berdasarkan Jabatan ──────────────────────────────────── */}
        {activeTab === 'jabatan' && (
          <div>
            <p className="mb-[12px]" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
              Ketik nama jabatan untuk melihat distribusinya di seluruh satuan kerja
            </p>

            {/* Search bar */}
            <div className="max-w-[600px] mb-[32px]" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px]" style={{ color: 'var(--muted-foreground)' }} />
                <input
                  type="text"
                  placeholder="Cari nama jabatan..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                    if (!e.target.value) setSelectedJabatan(null);
                  }}
                  onFocus={() => { if (searchQuery) setShowDropdown(true); }}
                  className="w-full h-[48px] pl-[48px] pr-[44px] border rounded-[var(--radius)] focus:outline-none"
                  style={{
                    borderColor: '#c7c7c7',
                    fontSize: 'var(--text-base)',
                    color: 'var(--foreground)',
                    backgroundColor: 'var(--input-background)',
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedJabatan(null); setShowDropdown(false); }}
                    className="absolute right-[14px] top-1/2 -translate-y-1/2 p-[4px] rounded-[4px] hover:bg-[var(--secondary)] transition-colors"
                  >
                    <X className="w-[16px] h-[16px]" style={{ color: 'var(--muted-foreground)' }} />
                  </button>
                )}

                {/* Dropdown */}
                {showDropdown && searchQuery && searchResults.length > 0 && (
                  <div className="absolute top-full mt-[6px] left-0 right-0 border rounded-[var(--radius-card)] shadow-lg z-50 overflow-hidden max-h-[280px] overflow-y-auto" style={{ backgroundColor: 'var(--card)', borderColor: '#E2E8F0' }}>
                    {searchResults.map((j) => (
                      <button
                        key={j.id}
                        onClick={() => { setSelectedJabatan(j); setSearchQuery(j.nama); setShowDropdown(false); }}
                        className="w-full px-[16px] py-[12px] text-left transition-colors border-b last:border-b-0 hover:bg-[#F9FAFB]"
                        style={{ borderColor: '#F0F0F0' }}
                      >
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>{j.nama}</span>
                      </button>
                    ))}
                  </div>
                )}
                {showDropdown && searchQuery && searchResults.length === 0 && (
                  <div className="absolute top-full mt-[6px] left-0 right-0 border rounded-[var(--radius-card)] shadow-lg z-50 px-[16px] py-[20px] text-center" style={{ backgroundColor: 'var(--card)', borderColor: '#E2E8F0' }}>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>Jabatan tidak ditemukan</p>
                  </div>
                )}
              </div>
            </div>

            {/* Result cards */}
            {selectedJabatan && (
              <div>
                <div className="mb-[24px]">
                  <p style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', marginBottom: '4px' }}>
                    {selectedJabatan.nama}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                    Tersedia di {satkerDistribusi.length} satuan kerja · Total kebutuhan:{' '}
                    <span style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--primary)' }}>
                      {satkerDistribusi.reduce((s, { distribusi }) => s + totalAll(distribusi.levels), 0)}
                    </span>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px]">
                  {satkerDistribusi.map(({ unit, satker, distribusi }) => (
                    <button
                      key={satker.id}
                      onClick={() => setDetailJabatanModeB({ jabatan: selectedJabatan, distribusi, satker, unit })}
                      className="border rounded-[var(--radius-card)] overflow-hidden transition-all hover:shadow-md hover:border-[var(--primary)]"
                      style={{ backgroundColor: 'var(--card)', borderColor: '#E2E8F0' }}
                    >
                      {/* Card header */}
                      <div className="px-[20px] py-[14px] border-b flex items-center gap-[10px]" style={{ borderColor: '#E2E8F0' }}>
                        <div className="w-[10px] h-[10px] rounded-full shrink-0" style={{ backgroundColor: unit.warna }} />
                        <div className="min-w-0 flex-1 text-left">
                          <p className="truncate" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
                            {satker.singkatan}
                          </p>
                          <p className="truncate" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                            {unit.singkatan}
                          </p>
                        </div>
                      </div>
                      <div className="px-[16px] pt-[12px] pb-[8px]">
                        <div className="flex items-center justify-between mb-[10px]">
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>Keahlian</span>
                          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}>{totalKeahlian(distribusi.levels)}</span>
                        </div>
                        <div className="flex items-center justify-between mb-[10px]">
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>Keterampilan</span>
                          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}>{totalKeterampilan(distribusi.levels)}</span>
                        </div>
                        <div className="pt-[8px] border-t" style={{ borderColor: '#F0F0F0' }}>
                          <div className="flex items-center justify-between">
                            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>Total</span>
                            <span style={{ fontSize: 'var(--text-lg)', color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}>{totalAll(distribusi.levels)}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {!selectedJabatan && (
              <div className="border rounded-[var(--radius-card)] p-[64px] text-center" style={{ backgroundColor: 'var(--card)', borderColor: '#E2E8F0' }}>
                <Search className="w-[48px] h-[48px] mx-auto mb-[16px]" style={{ color: 'var(--muted-foreground)', opacity: 0.3 }} />
                <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', marginBottom: '8px' }}>
                  Cari Jabatan Fungsional
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                  Ketik minimal 1 karakter untuk melihat saran jabatan
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Detail Modal (Mode A) ──────────────────────────────────────────── */}
      {detailJabatan && selectedUnit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-[24px]">
          <div className="rounded-[var(--radius-card)] w-full max-w-[520px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
            {/* Modal header */}
            <div className="px-[24px] py-[20px] border-b flex items-start justify-between gap-[12px]" style={{ borderColor: '#E2E8F0' }}>
              <div>
                <p style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', marginBottom: '4px' }}>
                  {detailJabatan.jabatan.nama}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                  {detailJabatan.satker.nama} · {selectedUnit.singkatan}
                </p>
              </div>
              <button
                onClick={() => setDetailJabatan(null)}
                className="p-[8px] rounded-[6px] hover:bg-[var(--secondary)] transition-colors shrink-0"
              >
                <X className="w-[18px] h-[18px]" style={{ color: 'var(--muted-foreground)' }} />
              </button>
            </div>
            {/* Modal body */}
            <div className="flex-1 overflow-auto p-[24px]">
              <LevelTable levels={detailJabatan.distribusi.levels} />
            </div>
            {/* Modal footer */}
            <div className="px-[24px] py-[16px] border-t flex justify-end" style={{ borderColor: '#E2E8F0' }}>
              <button
                onClick={() => setDetailJabatan(null)}
                className="px-[20px] py-[9px] border rounded-[var(--radius-button)] transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--secondary-foreground)',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--secondary)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail Modal (Mode B) ──────────────────────────────────────────── */}
      {detailJabatanModeB && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-[24px]">
          <div className="rounded-[var(--radius-card)] w-full max-w-[520px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
            {/* Modal header */}
            <div className="px-[24px] py-[20px] border-b flex items-start justify-between gap-[12px]" style={{ borderColor: '#E2E8F0' }}>
              <div>
                <p style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', marginBottom: '4px' }}>
                  {detailJabatanModeB.jabatan.nama}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                  {detailJabatanModeB.satker.nama} · {detailJabatanModeB.unit.singkatan}
                </p>
              </div>
              <button
                onClick={() => setDetailJabatanModeB(null)}
                className="p-[8px] rounded-[6px] hover:bg-[var(--secondary)] transition-colors shrink-0"
              >
                <X className="w-[18px] h-[18px]" style={{ color: 'var(--muted-foreground)' }} />
              </button>
            </div>
            {/* Modal body */}
            <div className="flex-1 overflow-auto p-[24px]">
              <LevelTable levels={detailJabatanModeB.distribusi.levels} />
            </div>
            {/* Modal footer */}
            <div className="px-[24px] py-[16px] border-t flex justify-end" style={{ borderColor: '#E2E8F0' }}>
              <button
                onClick={() => setDetailJabatanModeB(null)}
                className="px-[20px] py-[9px] border rounded-[var(--radius-button)] transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--secondary-foreground)',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--secondary)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}