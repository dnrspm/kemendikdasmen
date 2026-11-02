import { Fragment, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router';
import { TriangleAlert, UserPlus, Plus, SlidersHorizontal, RefreshCw, ChevronRight, ChevronDown, ChevronUp, Info, X, Eye, EyeOff, FilePenLine, User, IdCard, Contact, FolderOpen, ExternalLink, Download, ChartLine } from 'lucide-react';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { StagingDataTable, Chip, MoreAction, type Column } from '@/app/components/StagingDataTable';
import imgPhoto from '@/assets/staging/tut-wuri-handayani.png';

const tabs = ['Data Pribadi', 'Keluarga', 'Pendidikan dan Pelatihan', 'Penilaian', 'Riwayat'];

const dataDiri = [
  ['NIP', '198001012005011001'], ['NIK', '3171010101800001'], ['Nomor KK', '3171010101090001'],
  ['Jenis Kelamin', 'Laki-laki'], ['Tempat Lahir', 'Jakarta'], ['Tanggal Lahir', '1 Januari 1980'],
  ['Tingkat Pendidikan', 'S3'], ['Pendidikan', 'Doktor'], ['Status Perkawinan', 'Kawin'], ['Agama', 'Islam'],
];
const dataKepegawaian = [
  ['Jenis Pegawai', 'PNS'], ['Masa Kerja Keseluruhan', '21 Tahun 4 Bulan', true], ['Masa Kerja Golongan', '4 Tahun 2 Bulan', true],
  ['Jenis Jabatan', 'Struktural'], ['Jabatan', 'Kepala Seksi Pemetaan Mutu dan Supervisi'],
  ['Lokasi Kerja', 'DKI Jakarta'], ['Pangkat dan Golongan Aktif', 'Pembina Tk. I (IV/b)'],
  ['Golongan Ruang Awal', 'III/a'], ['Golongan Ruang Terakhir', 'IV/b'], ['TMT Golongan', '1 April 2022'],
  ['TMT ASN', '1 Januari 2006'], ['Nomor SK ASN', '-'], ['Status PNS', 'PNS'],
];
const kontak = [
  ['Email Dikdasmen', 'ahmad.wijaya@kemendikdasmen.go.id'], ['Email Lain', '-'], ['Alamat', '-'],
  ['Nomor HP', '-'], ['Nomor Kontak Darurat', '-'],
];
const dataLainnya = [
  ['Nomor Surat Keterangan Dokter', '-'], ['Tanggal Surat Keterangan Dokter', '-'],
  ['Nomor Surat Bebas Narkoba', '-'], ['Tanggal Surat Bebas Narkoba', '-'],
  ['Nomor Catatan Kepolisian', '-'], ['Tanggal Catatan Kepolisian', '-'],
  ['Nomor Akte Kelahiran', '-'], ['Nomor BPJS', '-'], ['NPWP', '-'], ['Tanggal NPWP', '-'],
  ['Nomor TASPEN', '-'], ['Gaji Pokok', '-'],
];
const units = [
  'Balai Penjaminan Mutu Pendidikan Provinsi D.K.I. Jakarta',
  'Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah',
  'Kementerian Pendidikan Dasar dan Menengah',
  'KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH',
];

type Row = (string | boolean | undefined)[];

function Card({ icon, title, rows, cols = 2, hidden, full = [] }: { icon: React.ReactNode; title: string; rows: Row[]; cols?: number; hidden: boolean; full?: string[] }) {
  return (
    <section className="bg-white border border-[#efefef] rounded-[6px] overflow-hidden">
      <header className="flex items-center gap-[8px] px-[16px] py-[12px] border-b border-[#eee] text-[#65696c]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
        {icon} {title}
      </header>
      <div className={`grid gap-x-[16px] gap-y-[14px] p-[16px] ${cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {rows.map(([label, value, info]) => (
          <div key={label as string} className={`flex flex-col gap-[2px] ${full.includes(label as string) ? 'col-span-2' : ''}`}>
            <span className="text-[#65696c] flex items-center gap-[4px]" style={{ fontSize: '14px', lineHeight: '20px' }}>
              {label as string} {info ? <Info className="size-[13px]" /> : null}
            </span>
            <span className="text-[#2f3031] break-words" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
              {hidden ? '••••••••••••••' : (value as string)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───── Tab lain (data contoh fiktif) ───── */

function SubTabs({ items, active, onChange }: { items: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div className="flex gap-[8px] flex-wrap px-[16px] pt-[16px] pb-[28px]">
      {items.map((t, i) => (
        <button key={t} onClick={() => onChange(i)} className={`border px-[12px] py-[4px] ${i === active ? 'border-[#0b5fef] bg-[#ecf5fe] text-[#0b5fef]' : 'border-[#2f3031] bg-white text-[#2f3031]'}`} style={{ borderRadius: '24px', fontSize: '16px', lineHeight: '20px', fontWeight: 600 }}>
          {t}
        </button>
      ))}
    </div>
  );
}

const col = (key: string, label: string, width?: string): Column => ({ key, label, width });

function Updated() {
  return (
    <p className="px-[16px] pt-[12px] pb-[16px] text-[#808489]" style={{ fontSize: '14px', lineHeight: '20px' }}>
      Terakhir diperbarui: <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>2 November 2026</span>
    </p>
  );
}

const MASK = '••••••••••••••';

function FamilyCard({ title, to, cols, rows }: { title: string; to: string; cols: { label: string; width?: string }[]; rows: number }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-[8px] border border-[#efefef] bg-white p-[16px] mb-[16px]">
      <div className="flex items-center justify-between pb-[12px]">
        <span className="text-[#65696c]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>{title}</span>
        <button
          onClick={() => to && navigate(to)}
          className="flex items-center gap-[6px] rounded-[6px] border border-[#808489] bg-white px-[16px] py-[8px] text-[#2f3031]"
          style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}
        >
          <UserPlus className="size-[20px]" /> Tambah
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-y border-[#efefef]">
            <th className="p-[8px] text-left text-[#2f3031]" style={{ fontSize: '14px', fontWeight: 700, lineHeight: '16px', width: '48px' }}>NO</th>
            {cols.map((c) => (
              <th key={c.label} className="p-[8px] text-left text-[#2f3031] uppercase" style={{ fontSize: '14px', fontWeight: 700, lineHeight: '16px' }}>{c.label}</th>
            ))}
            <th className="p-[8px] text-center text-[#2f3031]" style={{ fontSize: '14px', fontWeight: 700, lineHeight: '16px', width: '60px' }}>AKSI</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-[#fafafa]' : ''}>
              <td className="p-[12px_8px] text-[#2f3031]" style={{ fontSize: '16px', lineHeight: '24px' }}>{i + 1}</td>
              {cols.map((c) => (
                <td key={c.label} className="p-[12px_8px] text-[#2f3031]" style={{ fontSize: '16px', lineHeight: '24px' }}>{MASK}</td>
              ))}
              <td className="p-[12px_8px] text-center"><MoreAction /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Keluarga() {
  return (
    <div>
      <Updated />
      <div className="m-[16px] rounded-[8px] border border-[#f3e3b0] bg-[#fff6dc] p-[16px] flex gap-[12px]">
        <TriangleAlert className="size-[20px] text-[#b57f21] shrink-0 mt-[2px]" />
        <div className="text-[#2f3031]" style={{ fontSize: '16px', lineHeight: '24px' }}>
          <p style={{ fontWeight: 600 }} className="mb-[8px]">Usulan Perubahan Data</p>
          <p>
            Anda memiliki 4 usulan perubahan data. Data yang <b style={{ fontWeight: 600 }}>Diusulkan</b> sedang dalam proses verifikasi oleh Biro SDM. Usulan yang telah <b style={{ fontWeight: 600 }}>Disetujui</b> sudah melewati proses verifikasi dan data Anda telah diperbarui.
          </p>
          <p className="mt-[8px]">Anda dapat melihat detail perubahan data yang diajukan di bawah ini:</p>
          <button className="mt-[8px] underline" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>Selengkapnya</button>
        </div>
      </div>
      <div className="px-[16px]">
        <FamilyCard title="Orang Tua" to="/kepegawaian/keluarga/orang-tua/tambah" cols={[{ label: 'Nama' }, { label: 'Hubungan' }, { label: 'Nomor Identitas' }, { label: 'Status Hidup' }]} rows={3} />
        <FamilyCard title="Istri" to="/kepegawaian/keluarga/pasangan/tambah" cols={[{ label: 'Nama' }, { label: 'Nomor Identitas' }, { label: 'Status Pernikahan' }]} rows={2} />
        <FamilyCard title="Anak" to="" cols={[{ label: 'Nama' }, { label: 'Jenis Kelamin' }, { label: 'Status Sekolah/Kerja' }, { label: 'Status Pernikahan Anak' }]} rows={1} />
      </div>
    </div>
  );
}

/* Data contoh fiktif: kolom mengikuti staging, isi sel dibuat otomatis. */
type LayoutOpt = 1 | 2;
const ProtoCtx = createContext<{ scenario: string; setScenario: (s: string) => void; layout: LayoutOpt; setLayout: (l: LayoutOpt) => void }>({ scenario: 'normal', setScenario: () => {}, layout: 2, setLayout: () => {} });

function sample(label: string, i: number): string {
  const l = label.toLowerCase();
  if (l.includes('nomor') || l.startsWith('no ')) return `00${i + 1}/CONTOH/2025`;
  if (l.includes('tanggal') || l.startsWith('tmt')) return `${i + 1} Oktober 2025`;
  if (l.includes('tahun') && !l.includes('masa')) return String(2025 - i);
  if (l.includes('gaji')) return 'Rp 5.000.000';
  if (l.includes('jam') || l.includes('lama') || l.includes('masa')) return String(40 + i);
  if (l.includes('institusi') || l.includes('lembaga') || l.includes('satuan') || l.includes('unit')) return 'Lembaga Contoh';
  if (l.includes('golongan')) return 'III/d';
  if (l.includes('deskripsi') || l.includes('kesimpulan')) return 'Keterangan contoh';
  if (l.includes('berkas')) return 'File';
  if (l.includes('plt') || l.includes('terakhir')) return '-';
  return `${label} Contoh ${i + 1}`;
}

type SubDef = { name: string; cols: string[]; rows?: number; usulanCols?: string[]; usulan?: number; tambah?: boolean };

const subDefs: Record<string, SubDef[]> = {
  'Pendidikan dan Pelatihan': [
    { name: 'Pendidikan Formal', cols: ['Status', 'Jenjang', 'Nama Sekolah', 'Jurusan', 'Keterangan', 'Tahun Lulus', 'Nomor Ijazah'] },
    { name: 'Pelatihan SIASN', cols: ['Jenis Diklat', 'Nama Diklat', 'Tanggal Mulai', 'Tanggal Selesai', 'Tahun', 'Institusi Penyelenggara', 'Nomor Sertifikat'], usulan: 1, tambah: true,
      usulanCols: ['Jenis Diklat', 'Nomor Sertifikat', 'Nama Diklat', 'Institusi Penyelenggara', 'Tanggal Mulai', 'Tanggal Selesai', 'Tahun', 'Durasi (Jam)', 'Berkas'] },
    { name: 'Pelatihan Struktural', cols: ['Nama Diklat', 'Nomor', 'Institusi Penyelenggara', 'Jenis Pelatihan', 'Tanggal Diklat'], usulan: 2, tambah: true,
      usulanCols: ['Nama Diklat', 'Nomor', 'Institusi Penyelenggara', 'Jenis Pelatihan ID', 'Tanggal Diklat', 'Lama (Jam)', 'Berkas'] },
    { name: 'Pelatihan Fungsional', cols: ['Jenis Diklat Fungsional', 'Nama Diklat', 'Institusi Penyelenggara', 'Nomor Sertifikat', 'Tanggal Mulai', 'Tanggal Selesai', 'Tahun'] },
    { name: 'Pelatihan Teknis/Seminar/Workshop/Kursus', cols: ['Tipe Pelatihan', 'Jenis Pelatihan', 'Nama Pelatihan', 'Tanggal Mulai', 'Tanggal Selesai', 'Tahun', 'Institusi Penyelenggara', 'Nomor Sertifikat'] },
  ],
  Penilaian: [
    { name: 'Kinerja', cols: ['Tahun', 'Hasil Kinerja', 'Perilaku Kerja', 'Kuadran Kinerja'], rows: 2 },
    { name: 'Asesmen Nine Box', cols: ['Tahun', 'Kesimpulan'], rows: 0 },
  ],
  Riwayat: [
    { name: 'Kepangkatan', cols: ['Pangkat', 'Golongan', 'Status', 'TMT Golongan', 'Masa Kerja'] },
    { name: 'Jabatan', cols: ['Status', 'Jabatan', 'Satuan Kerja', 'Unit Organisasi', 'TMT'], usulan: 1, tambah: true,
      usulanCols: ['Jenis Jabatan', 'Jabatan', 'TMT Jabatan', 'Satuan Kerja', 'Nomor SK', 'Unit Organisasi', 'Tanggal SK', 'Tanggal Mulai Periode Jabatan', 'Tanggal Akhir Periode Jabatan', 'Status PLT', 'Jabatan Terakhir'] },
    { name: 'Penghargaan', cols: ['Jenis Penghargaan', 'Nama Penghargaan', 'Nomor SK Penghargaan', 'Kelompok Penghargaan', 'Tanggal Penghargaan'], usulan: 3, tambah: true,
      usulanCols: ['Jenis Penghargaan', 'Tanggal Penghargaan', 'Kelompok Penghargaan', 'Nama Penghargaan', 'Nomor SK Penghargaan', 'Deskripsi', 'Berkas'] },
    { name: 'Penugasan', cols: ['Tipe Jabatan', 'Nama Jabatan', 'Deskripsi', 'Tanggal Mulai', 'Tanggal Selesai'], tambah: true },
    { name: 'Sertifikasi', cols: ['Nama Sertifikasi', 'No Sertifikat', 'Tanggal', 'Lembaga Sertifikasi', 'Rumpun Jabatan Sertifikasi'], usulan: 2, tambah: true,
      usulanCols: ['Nama Sertifikasi', 'Nomor Sertifikat', 'Tanggal', 'Lembaga Sertifikasi', 'Rumpun Jabatan Sertifikasi', 'Deskripsi', 'Berkas'] },
    { name: 'Hukuman Disiplin', cols: ['Jenis Hukuman', 'Masa Hukuman', 'Nomor SK', 'Tanggal SK'], usulan: 1, tambah: true,
      usulanCols: ['Jenis Hukuman', 'Golongan', 'Nomor SK', 'Tanggal SK', 'Tanggal Mulai', 'Tanggal Akhir', 'Masa Hukuman (Tahun)', 'Masa Hukuman (Bulan)'] },
    { name: 'Kenaikan Gaji Berkala', cols: ['TMT KGB', 'Golongan', 'Nomor SK', 'Tanggal SK', 'Gaji Pokok'], usulan: 3, tambah: true,
      usulanCols: ['Golongan', 'TMT Golongan', 'Masa Kerja Golongan (Tahun)', 'Masa Kerja Golongan (Bulan)', 'Nomor SK', 'Tanggal SK', 'Gaji Pokok Baru', 'Jabatan', 'TMT Jabatan'] },
  ],
};

function UsulanBanner({ count, onToggle, open }: { count: number; onToggle: () => void; open: boolean }) {
  return (
    <div className="mx-[16px] mb-[16px] rounded-[8px] border border-[#f3e3b0] bg-[#fff6dc] p-[16px] flex gap-[12px]">
      <TriangleAlert className="size-[20px] text-[#b57f21] shrink-0 mt-[2px]" />
      <div className="text-[#2f3031]" style={{ fontSize: '16px', lineHeight: '24px' }}>
        <p style={{ fontWeight: 600 }} className="mb-[8px]">Usulan Perubahan Data</p>
        <p>
          Anda memiliki {count} usulan perubahan data. Usulan yang telah <b style={{ fontWeight: 600 }}>Disetujui</b> sudah melewati proses verifikasi dan data Anda telah diperbarui.
        </p>
        <p className="mt-[8px]">Anda dapat melihat detail perubahan data yang diajukan di bawah ini:</p>
        <button onClick={onToggle} className="mt-[8px] underline flex items-center gap-[4px]" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>
          {open ? 'Sembunyikan' : 'Selengkapnya'}
        </button>
      </div>
    </div>
  );
}

/* Penilaian > Kinerja: tabel gabungan tahunan + triwulan (prototipe Opsi 3). Data contoh fiktif. */
type KRow = { tahun: number; tw: number; hk?: string; pk?: string; pred?: string; belum?: string; prov?: boolean };
const KDATA: Record<string, KRow[]> = {
  normal: [
    { tahun: 2026, tw: 2, hk: 'Diatas Ekspektasi', pk: 'Diatas Ekspektasi', pred: 'Sangat Baik' },
    { tahun: 2026, tw: 1, hk: 'Diatas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
  ],
  belum: [
    { tahun: 2026, tw: 2, belum: 'Tidak dinilai' },
    { tahun: 2026, tw: 1, hk: 'Diatas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
  ],
  variasi: [
    { tahun: 2026, tw: 2, hk: 'Dibawah Ekspektasi', pk: 'Dibawah Ekspektasi', pred: 'Sangat Kurang' },
    { tahun: 2026, tw: 1, hk: 'Dibawah Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Butuh Perbaikan' },
  ],
  masa: [
    { tahun: 2026, tw: 3, hk: 'Sesuai Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik', prov: true },
    { tahun: 2026, tw: 2, hk: 'Diatas Ekspektasi', pk: 'Diatas Ekspektasi', pred: 'Sangat Baik' },
    { tahun: 2026, tw: 1, hk: 'Diatas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
  ],
  masaBelum: [
    { tahun: 2026, tw: 3, belum: 'Dalam Penilaian' },
    { tahun: 2026, tw: 2, hk: 'Diatas Ekspektasi', pk: 'Diatas Ekspektasi', pred: 'Sangat Baik' },
    { tahun: 2026, tw: 1, hk: 'Diatas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
  ],
  tersedia: [
    { tahun: 2026, tw: 2, belum: 'Belum tersedia' },
    { tahun: 2026, tw: 1, hk: 'Diatas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
  ],
};
const KTAHUNAN: Record<string, { tahun: number; hk: string; pk: string; pred: string }[]> = {
  normal: [
    { tahun: 2025, hk: 'Diatas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
    { tahun: 2024, hk: 'Sesuai Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
    { tahun: 2023, hk: 'Sesuai Ekspektasi', pk: 'Diatas Ekspektasi', pred: 'Baik' },
  ],
  variasi: [
    { tahun: 2025, hk: 'Sesuai Ekspektasi', pk: 'Dibawah Ekspektasi', pred: 'Kurang' },
    { tahun: 2024, hk: 'Dibawah Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Butuh Perbaikan' },
    { tahun: 2023, hk: 'Dibawah Ekspektasi', pk: 'Dibawah Ekspektasi', pred: 'Sangat Kurang' },
    { tahun: 2022, hk: 'Sesuai Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
    { tahun: 2021, hk: 'Diatas Ekspektasi', pk: 'Diatas Ekspektasi', pred: 'Sangat Baik' },
  ],
};
const SCENARIOS: [string, string][] = [
  ['normal', 'Normal: Tw 1–2 2026 sudah dinilai'],
  ['variasi', 'Variasi predikat (contoh seluruh warna chip)'],
  ['belum', 'Tw 2 tidak dinilai, dikonfirmasi eSKP setelah kunci (EK-5.4)'],
  ['tersedia', 'Tw 2 belum tersedia, gagal diambil (EK-5.4)'],
  ['masa', 'Tw 3 sudah dinilai, belum final — dibuka 10 Okt 2026 (EK-5.3)'],
  ['masaBelum', 'Tw 3 belum dinilai, Dalam Penilaian — dibuka 10 Okt 2026 (EK-5.3)'],
  ['nip', 'NIP tidak ditemukan di eSKP (EK-5.5)'],
  ['stale', 'Data tertunda — Tw 3 belum terambil pada 29 Okt 2026 (EK-5.6)'],
  ['empty', 'Belum ada triwulan bernilai (Empty)'],
  ['loading', 'Memuat (Loading)'],
  ['error', 'Gagal dimuat (Error)'],
];
// Status tanpa nilai ditampilkan seragam; penjelasan rinci tetap ada di tooltip.
const NO_DATA = ['Belum tersedia', 'Tidak dinilai', 'Dalam Penilaian'];
const PRED_BG: Record<string, string> = {
  'Sangat Baik': '#9ae5b9', Baik: '#9ae5b9', 'Butuh Perbaikan': '#ffdfa3',
  Kurang: '#ffe9ea', 'Sangat Kurang': '#ffe9ea',
};
const BULAN_TUTUP: Record<number, [string, number]> = { 1: ['April', 0], 2: ['Juli', 0], 3: ['Oktober', 0], 4: ['Januari', 1] };
const BULAN_TW: Record<number, string> = { 1: 'Januari–Maret', 2: 'April–Juni', 3: 'Juli–September', 4: 'Oktober–Desember' };
const KMESSAGES: Record<string, string> = {
  loading: 'Memuat data triwulan dari eSKP…',
  error: 'Data kinerja triwulan gagal dimuat.',
  empty: 'Belum ada hasil evaluasi kinerja triwulanan. Data akan tampil setelah Anda dinilai di eSKP.',
  nip: 'Data penilaian belum ditemukan di eSKP. Silakan hubungi pengelola kepegawaian unit Anda.',
};

function tipText(v: string, r: KRow): string {
  if (v === 'Dalam Penilaian') { const [b, plus] = BULAN_TUTUP[r.tw]; return `Evaluasi belum dibuat atau belum dinilai atasan. Masa penilaian ditutup tanggal 25 ${b} ${r.tahun + plus}.`; }
  if (v === 'Tidak dinilai') return 'Tidak ada nilai hingga masa penilaian ditutup. Kemungkinan evaluasi belum dibuat atau belum dinilai atasan. Cek di aplikasi eSKP.';
  if (v === 'Belum tersedia') return 'Nilai belum berhasil diambil dari eSKP. Cek di aplikasi eSKP.';
  return '';
}

function PredBadge({ v, row }: { v: string; row?: KRow }) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const badge = (
    <span className="inline-flex items-center rounded-full px-[10px] py-[2px] text-[#2f3031]" style={{ background: PRED_BG[v] ?? '#efefef', fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>{NO_DATA.includes(v) ? 'Data Tidak Tersedia' : v}</span>
  );
  const tt = row ? tipText(v, row) : '';
  if (!tt) return badge;
  const show = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const w = 260;
    let top = r.top - 70;
    if (top < 8) top = r.bottom + 6;
    setPos({ left: Math.min(Math.max(8, r.right - w), window.innerWidth - w - 8), top });
  };
  return (
    <span
      className="relative inline-flex items-center gap-[4px] cursor-help rounded-full"
      tabIndex={0}
      onMouseEnter={(e) => show(e.currentTarget)}
      onFocus={(e) => show(e.currentTarget)}
      onMouseLeave={() => setPos(null)}
      onBlur={() => setPos(null)}
      onKeyDown={(e) => { if (e.key === 'Escape') setPos(null); }}
    >
      {badge}
      <Info className="size-[16px] text-[#727272]" aria-hidden="true" />
      {pos && (
        <span role="tooltip" className="fixed z-[60] rounded-[4px] bg-[#2f3031] px-[10px] py-[8px] text-white" style={{ left: pos.left, top: pos.top, width: 260, fontSize: '12px', lineHeight: '18px', fontWeight: 400, boxShadow: '0 2px 8px rgba(0,0,0,.2)' }}>
          {tt}
        </span>
      )}
    </span>
  );
}

/* Grafik garis riwayat predikat kinerja per NIP. */
const PRED_LEVEL: Record<string, number> = { 'Sangat Kurang': 1, Kurang: 2, 'Butuh Perbaikan': 3, Baik: 4, 'Sangat Baik': 5 };
const LEVEL_LABEL: Record<number, string> = { 1: 'Sangat Kurang', 2: 'Kurang', 3: 'Butuh Perbaikan', 4: 'Baik', 5: 'Sangat Baik' };

/* Triwulan historis fiktif untuk tahun-tahun sebelumnya, dibuat konsisten dengan predikat tahunannya. */
function historyQuarters(a: { tahun: number; hk: string; pk: string; pred: string }): KRow[] {
  const lvl = PRED_LEVEL[a.pred] ?? 4;
  const up = LEVEL_LABEL[Math.min(5, lvl + 1)];
  const preds = [a.pred, a.pred, up, a.pred];
  return [4, 3, 2, 1].map((tw) => ({ tahun: a.tahun, tw, hk: a.hk, pk: a.pk, pred: preds[tw - 1] }));
}

type ChartPoint = { label: string; level: number | null; hk?: string; pk?: string; pred: string };

const CHART_H = 300;
const PLOT_TOP = 8;

/* Label sumbu X dimiringkan 45° agar semua triwulan muat tanpa scroll. */
function RotatedTick({ x = 0, y = 0, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text textAnchor="end" fill="#65696c" fontSize={14} dy={4} transform="rotate(-45)">{payload?.value}</text>
    </g>
  );
}

function KinerjaChart({ annual, quarterly }: { annual: { tahun: number; hk: string; pk: string; pred: string }[]; quarterly: KRow[] }) {
  const [mode, setMode] = useState<'tahunan' | 'triwulan'>('tahunan');
  const years = [...new Set([2026, ...annual.map((r) => r.tahun)])].sort((a, b) => a - b);
  const annualPoints: ChartPoint[] = years.map((y) => {
    const a = annual.find((r) => r.tahun === y);
    return a ? { label: String(y), level: PRED_LEVEL[a.pred] ?? null, hk: a.hk, pk: a.pk, pred: a.pred } : { label: String(y), level: null, pred: 'Data Tidak Tersedia' };
  });
  // Setiap tahun selalu menampilkan Tw1–Tw4; triwulan tanpa data menjadi titik kosong.
  const quarterPoints: ChartPoint[] = years.flatMap((y) =>
    [1, 2, 3, 4].map((tw): ChartPoint => {
      const r = quarterly.find((q) => q.tahun === y && q.tw === tw);
      const label = `Tw${tw} ${y}`;
      if (!r || r.belum) return { label, level: null, pred: 'Data Tidak Tersedia' };
      return { label, level: PRED_LEVEL[r.pred!] ?? null, hk: r.hk, pk: r.pk, pred: r.pred! };
    }));
  // Hanya periode yang ada datanya yang ditampilkan.
  const data = (mode === 'tahunan' ? annualPoints : quarterPoints).filter((d) => d.level !== null);
  const hasAny = data.some((d) => d.level !== null);
  const rotate = mode === 'triwulan';
  const xH = rotate ? 76 : 44;
  const plotH = CHART_H - PLOT_TOP - xH;

  return (
    <div>
      <div className="flex items-center justify-between gap-[12px] flex-wrap mb-[8px]">
        <div className="flex gap-[8px]">
          {([['tahunan', 'Tahunan'], ['triwulan', 'Triwulanan']] as const).map(([k, l]) => (
            <button key={k} onClick={() => setMode(k)} aria-pressed={mode === k}
              className={`border px-[12px] py-[2px] ${mode === k ? 'border-[#0b5fef] bg-[#ecf5fe] text-[#0b5fef]' : 'border-[#2f3031] bg-white text-[#2f3031]'}`}
              style={{ borderRadius: '24px', fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>{l}</button>
          ))}
        </div>
      </div>
      {hasAny ? (
        <div className="flex">
          {/* Label sumbu Y dibuat terpisah agar tetap terlihat saat grafik digeser. */}
          <div className="relative shrink-0" style={{ width: 150, height: CHART_H }} aria-hidden="true">
            {[5, 4, 3, 2, 1].map((v) => (
              <span key={v} className="absolute right-[16px] whitespace-nowrap text-[#65696c]" style={{ top: PLOT_TOP + ((5.5 - v) / 5) * plotH, transform: 'translateY(-50%)', fontSize: '14px', lineHeight: '20px' }}>{LEVEL_LABEL[v]}</span>
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <div style={{ width: '100%', height: CHART_H }}>
              <ResponsiveContainer>
                <LineChart data={data} margin={{ top: PLOT_TOP, right: 24, bottom: 0, left: 0 }}>
                  <CartesianGrid horizontal={false} vertical={false} />
                  {[1, 2, 3, 4, 5].map((v) => <ReferenceLine key={v} y={v} stroke="#efefef" />)}
                  <XAxis dataKey="label" interval={0} height={xH} tickMargin={rotate ? 12 : 16} padding={{ left: rotate ? 56 : 16, right: 16 }} tick={rotate ? <RotatedTick /> : { fontSize: 14, fill: '#65696c' }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[0.5, 5.5]} ticks={[1, 2, 3, 4, 5]} width={0} />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload as ChartPoint;
                      return (
                        <div className="rounded-[4px] bg-[#2f3031] px-[10px] py-[8px] text-white" style={{ fontSize: '12px', lineHeight: '18px' }}>
                          <div style={{ fontWeight: 600 }}>{d.label}</div>
                          <div>Predikat: {d.pred}</div>
                          {d.hk && <div>Hasil Kerja: {d.hk}</div>}
                          {d.pk && <div>Perilaku Kerja: {d.pk}</div>}
                        </div>
                      );
                    }}
                  />
                  <Line type="linear" dataKey="level" stroke="#0b5fef" strokeWidth={2} dot={{ r: 4, fill: '#0b5fef', stroke: '#0b5fef', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#0b5fef', stroke: '#0b5fef', strokeWidth: 0 }} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <p className="py-[32px] text-center text-[#808489]" style={{ fontSize: '14px', lineHeight: '20px' }}>Belum ada data untuk ditampilkan pada grafik.</p>
      )}
    </div>
  );
}

function KinerjaChartModal({ annual, quarterly, onClose }: { annual: { tahun: number; hk: string; pk: string; pred: string }[]; quarterly: KRow[]; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-[16px]" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Grafik riwayat predikat kinerja" className="w-full max-w-[960px] max-h-full overflow-auto rounded-[8px] bg-white p-[24px]" style={{ boxShadow: '0 8px 24px rgba(0,0,0,.2)' }} onClick={(e) => e.stopPropagation()}>
        <div className="mb-[16px] flex items-center justify-between gap-[12px]">
          <span className="text-[#2f3031]" style={{ fontSize: '20px', fontWeight: 600, lineHeight: '28px' }}>Grafik riwayat predikat kinerja</span>
          <button onClick={onClose} aria-label="Tutup" className="rounded-[4px] p-[4px] text-[#65696c] hover:bg-[#f7f7f7]"><X className="size-[20px]" /></button>
        </div>
        <KinerjaChart annual={annual} quarterly={quarterly} />
      </div>
    </div>
  );
}

function wibNow(): string {
  const d = new Date();
  const tgl = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' });
  const jam = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' });
  return `${tgl}, ${jam} WIB`;
}
// Data terbaru dari eSKP yang menimpa data lama saat "Perbarui data" dijalankan.
const freshFor = (sc: string) => (sc === 'variasi' ? 'variasi' : sc === 'masa' || sc === 'masaBelum' ? 'masa' : 'normal');

function KinerjaTabel() {
  const { scenario: ctxScenario, setScenario, layout } = useContext(ProtoCtx);
  const [open, setOpen] = useState<number | null>(2026);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [showChart, setShowChart] = useState(false);
  // Skenario prototipe diganti => kembali ke data bawaan skenario tersebut.
  useEffect(() => { setFetchedAt(null); }, [ctxScenario]);
  const scenario = fetchedAt ? freshFor(ctxScenario) : ctxScenario;
  const getData = () => {
    if (fetching) return;
    setFetching(true);
    setTimeout(() => {
      setFetching(false);
      setFetchedAt(wibNow());
      toast.success('Data NIP ini berhasil diambil dari eSKP. Data lama telah ditimpa dengan data terbaru.');
    }, 1200);
  };
  const toggle = (y: number) => setOpen((o) => (o === y ? null : y));

  const annual = KTAHUNAN[scenario === 'variasi' ? 'variasi' : 'normal'];
  const quarterly = KDATA[['belum', 'tersedia', 'variasi', 'masa', 'masaBelum'].includes(scenario) ? scenario : 'normal'];
  const years = [...new Set([2026, ...annual.map((r) => r.tahun)])].sort((x, y) => y - x);
  const syncAt = fetchedAt ?? (['masa', 'masaBelum'].includes(scenario) ? '9 Oktober 2026, 22.35 WIB' : '26 Juli 2026, 22.40 WIB');
  const showSync = !['loading', 'error', 'nip'].includes(scenario);
  const quartersOf = (y: number): KRow[] => {
    if (y === 2026) return quarterly;
    const a = annual.find((r) => r.tahun === y);
    return a ? historyQuarters(a) : [];
  };
  const allQuarters = years.flatMap((y) => (y === 2026 && ['loading', 'error', 'nip', 'empty'].includes(scenario) ? [] : quartersOf(y)));

  const th = 'px-[16px] py-[16px] text-left uppercase text-[#65696c] bg-white border-y border-[#efefef]';
  const thStyle = { fontSize: '14px', fontWeight: 700, lineHeight: '16px' } as const;
  const td = 'px-[16px] py-[12px] border-b border-[#efefef] text-[#2f3031] bg-white';
  const tdOpen = td.replace('bg-white', 'bg-[#fafafa]');
  const tdStyle = { fontSize: '16px', lineHeight: '24px' } as const;
  const sub = { fontSize: '14px', lineHeight: '20px', fontWeight: 400 } as const;
  // Garis biru sejajar dengan awal teks tahun; abu pudar dimulai dari garis biru; teks rincian menjorok setelahnya.
  const bar = { backgroundImage: 'linear-gradient(#0954d9, #0954d9), linear-gradient(#fafafa, #fafafa)', backgroundSize: '3px 100%, calc(100% - 16px) 100%', backgroundPosition: '16px 0, 16px 0', backgroundRepeat: 'no-repeat', paddingLeft: '35px' } as const;
  // Antar baris rincian: pembatas digambar mulai setelah garis biru supaya garis biru tidak terpotong.
  const barMid = {
    ...bar,
    backgroundImage: 'linear-gradient(#0954d9, #0954d9), linear-gradient(#efefef, #efefef), linear-gradient(#fafafa, #fafafa)',
    backgroundSize: '3px 100%, calc(100% - 19px) 1px, calc(100% - 16px) 100%',
    backgroundPosition: '16px 0, 19px 100%, 16px 0',
    borderBottom: 'none',
  } as const;

  const detail = (y: number) => {
    const rowsFor = quartersOf(y);
    if (y === 2026 && KMESSAGES[scenario]) {
      return (
        <tr><td colSpan={4} className={`${td} text-[#65696c]`} role="status" style={{ ...tdStyle, ...bar }}>
          {KMESSAGES[scenario]}{' '}
          {scenario === 'error' && (
            <button onClick={() => setScenario('normal')} className="ml-[8px] rounded-[4px] border border-[#808489] bg-white px-[14px] py-[4px] text-[#2f3031]" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>Coba Lagi</button>
          )}
        </td></tr>
      );
    }
    return (
      <>
        {y === 2026 && scenario === 'stale' && (
          <tr><td colSpan={4} className="py-[12px] pr-[16px] border-b border-[#efefef] bg-white" style={bar}>
            <div role="status" className="rounded-[4px] border border-[#b98900] bg-[#fff5db] px-[16px] py-[12px] text-[#2f3031]" style={{ fontSize: '14px', lineHeight: '20px' }}>
              <b style={{ fontWeight: 600 }}>Data triwulan terbaru tertunda.</b> Menampilkan data hingga Triwulan 2 2026.
            </div>
          </td></tr>
        )}
        {rowsFor.map((r, qi) => (
          <tr key={r.tw}>
            <td className={td} style={{ ...tdStyle, ...(qi < rowsFor.length - 1 ? barMid : bar) }}>
              Triwulan {r.tw}
              <span className="block text-[#65696c]" style={sub}>{BULAN_TW[r.tw]}</span>
            </td>
            <td className={tdOpen} style={tdStyle}>{r.belum ? '—' : r.hk}</td>
            <td className={tdOpen} style={tdStyle}>{r.belum ? '—' : r.pk}</td>
            <td className={tdOpen} style={tdStyle}>
              {r.belum ? <PredBadge v={r.belum} row={r} /> : <PredBadge v={r.pred!} />}
              {r.prov && <span className="ml-[6px] whitespace-nowrap text-[#65696c]" style={sub}>Belum final</span>}
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className={layout === 2 ? 'mx-[16px] mb-[16px] -mt-[12px] rounded-[6px] border border-[#cfd2d4]' : 'px-[16px] pb-[16px]'}>
      <div className={`flex items-center justify-between gap-[12px] flex-wrap ${layout === 2 ? 'border-b border-[#cfd2d4] p-[16px]' : 'mb-[12px]'}`}>
        {layout === 2 ? (
          <div>
            <h3 className="text-[#2f3031]" style={{ fontSize: '18px', fontWeight: 600, lineHeight: '28px' }}>Riwayat Penilaian Kinerja</h3>
            {showSync && (
              <div className="text-[#808489]" style={{ fontSize: '14px', lineHeight: '20px' }}>
                Dicek dari eSKP: {syncAt}
              </div>
            )}
          </div>
        ) : (
          <div className="text-[#808489]" style={{ fontSize: '14px', lineHeight: '20px' }}>
            {showSync ? <>Dicek dari eSKP: {syncAt}</> : 'Belum pernah diperbarui dari eSKP'}
          </div>
        )}
        <div className="flex items-center gap-[8px]">
        {scenario !== 'loading' && (
          <button
            onClick={() => setShowChart(true)}
            className="inline-flex items-center gap-[8px] rounded-[4px] border border-[#808489] bg-white px-[16px] py-[8px] text-[#2f3031] hover:bg-[#f7f7f7]"
            style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}
          >
            <ChartLine className="size-[18px]" />
            Lihat grafik
          </button>
        )}
        <button
          onClick={getData}
          disabled={fetching}
          title="Ambil data penilaian NIP ini dari eSKP. Data baru akan menimpa data lama."
          className="inline-flex items-center gap-[8px] rounded-[4px] border border-[#808489] bg-white px-[16px] py-[8px] text-[#2f3031] hover:bg-[#f7f7f7] disabled:cursor-not-allowed disabled:opacity-60"
          style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}
        >
          <RefreshCw className={`size-[18px] ${fetching ? 'animate-spin' : ''}`} />
          {fetching ? 'Mengambil data…' : 'Perbarui data'}
        </button>
        </div>
      </div>
      {showChart && <KinerjaChartModal annual={annual} quarterly={allQuarters} onClose={() => setShowChart(false)} />}
      <div className="overflow-auto">
        <table className="w-full border-collapse" style={{ minWidth: '640px' }} aria-label="Penilaian tahunan dan triwulan">
          <thead>
            <tr>{['Tahun / Periode', 'Hasil Kerja', 'Perilaku Kerja', 'Predikat Kinerja'].map((h) => <th key={h} className={th} style={thStyle}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {years.map((y) => {
              const a = annual.find((r) => r.tahun === y);
              const isOpen = open === y;
              return (
                <Fragment key={y}>
                  <tr onClick={() => toggle(y)} className={`cursor-pointer ${isOpen ? '' : 'hover:bg-[#fafafa]'}`}>
                    <td className={td} style={{ ...tdStyle, fontWeight: isOpen ? 600 : 400 }}>{y}</td>
                    <td className={td} style={tdStyle}>{a ? a.hk : '—'}</td>
                    <td className={td} style={tdStyle}>{a ? a.pk : '—'}</td>
                    <td className={td} style={tdStyle}>
                      <div className="flex items-center justify-between gap-[12px]">
                        <PredBadge v={a ? a.pred : 'Belum tersedia'} />
                        <button
                          onClick={(e) => { e.stopPropagation(); toggle(y); }}
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? 'Tutup' : 'Buka'} rincian triwulan ${y}`}
                          className="grid size-[32px] place-items-center rounded-full text-[#2f3031] hover:bg-black/5"
                        >
                          {isOpen ? <ChevronUp className="size-[20px]" /> : <ChevronDown className="size-[20px]" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {isOpen && detail(y)}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className={layout === 2 ? 'border-t border-[#cfd2d4] p-[16px] text-[#808489]' : 'mt-[12px] text-[#808489]'} style={{ fontSize: '14px', lineHeight: '20px' }}>
        Predikat tahunan merupakan evaluasi tersendiri, bukan gabungan nilai Triwulan 1–4.
      </p>
    </div>
  );
}

function ProtoBar({ admin, setAdmin }: { admin: boolean; setAdmin: (v: boolean) => void }) {
  const { scenario, setScenario } = useContext(ProtoCtx);
  return (
    <div role="region" aria-label="Kontrol prototipe" className="flex flex-wrap items-center gap-[16px] border-b border-dashed border-[#828282] bg-[#f1f1f1] px-[24px] py-[8px]" style={{ fontSize: '12px', lineHeight: '16px' }}>
      <span className="inline-flex items-center gap-[6px]" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 600 }}><SlidersHorizontal className="size-[12px]" />Kontrol prototipe · Opsi 3: Tabel per tahun</span>
      <span className="text-[#727272]" style={{ fontSize: '12px', lineHeight: '16px' }}>Bukan bagian produk</span>
      <label className="inline-flex items-center gap-[8px]" style={{ fontSize: '12px', lineHeight: '16px' }}>Skenario (AC EK-5)
        <select value={scenario} onChange={(e) => setScenario(e.target.value)} aria-label="Skenario prototipe" className="max-w-full rounded-[4px] border border-[#828282] bg-white px-[8px] py-[4px]" style={{ fontSize: '12px' }}>
          {SCENARIOS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
      <label className="inline-flex items-center gap-[6px] cursor-pointer" style={{ fontSize: '12px', lineHeight: '16px' }}>
        <input type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)} /> Tampilan admin, lihat pegawai lain (EK-5.8)
      </label>
    </div>
  );
}

function LayoutSwitch() {
  const { layout, setLayout } = useContext(ProtoCtx);
  return (
    <div role="group" aria-label="Pilihan tata letak prototipe" className="fixed bottom-[16px] right-[16px] z-[90] flex items-center gap-[8px] rounded-[8px] border border-dashed border-[#828282] bg-[#f1f1f1] px-[12px] py-[8px]" style={{ fontSize: '12px', lineHeight: '16px', boxShadow: '0 2px 8px rgba(0,0,0,.15)' }}>
      <span style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 600 }}>Tata letak</span>
      {([[1, 'Opsi 1'], [2, 'Opsi 2']] as const).map(([v, l]) => (
        <button key={v} onClick={() => setLayout(v)} aria-pressed={layout === v}
          className={`rounded-[4px] border px-[10px] py-[4px] ${layout === v ? 'border-[#0b5fef] bg-[#ecf5fe] text-[#0b5fef]' : 'border-[#828282] bg-white text-[#2f3031]'}`}
          style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 600 }}>{l}</button>
      ))}
    </div>
  );
}

function SubTabContent({ tab }: { tab: string }) {
  const defs = subDefs[tab];
  const [sub, setSub] = useState(0);
  const [openUsulan, setOpenUsulan] = useState(false);
  const d = defs[sub];
  const nRows = d.rows ?? 3;

  const mainRows = Array.from({ length: nRows }).map((_, i) => {
    const r: Record<string, React.ReactNode> = { no: i + 1, aksi: <MoreAction /> };
    d.cols.forEach((c) => {
      let v: React.ReactNode = sample(c, i);
      if (c === 'Status') v = '-';
      if (c === 'Jenjang') v = ['S-1/Sarjana', 'S-2', 'S-3/Doktor'][i % 3];
      if (c === 'Keterangan') v = i === 1 ? <span style={{ color: '#e02d38' }}>Data tidak lengkap</span> : 'Dalam Negeri';
      if (c === 'Nama Sekolah') v = ['Kampus Contoh A', 'Kampus Contoh B', 'UNIVERSITAS CONTOH'][i % 3];
      if (c === 'Jurusan') v = ['S-1 MANAJEMEN', 'S-1 ADMINISTRASI', 'S-3 MANAJEMEN DAN BISNIS'][i % 3];
      if (c === 'Pangkat') v = ['Penata', 'Penata', 'Penata Tingkat I'][i];
      if (c === 'Golongan' && d.name === 'Kepangkatan') v = ['III/c', 'III/c', 'III/d'][i];
      if (c === 'Masa Kerja' && d.name === 'Kepangkatan') v = ['3 tahun / 7 bulan', '3 tahun / 8 bulan', '1 tahun / 2 bulan'][i];
      if (c === 'Hasil Kinerja' || c === 'Perilaku Kerja') v = 'BAIK';
      if (c === 'Kuadran Kinerja') v = 'Kuadran 5';
      if (c === 'Tahun' && d.name === 'Kinerja') v = String(2025 - i);
      if (c === 'Jabatan' && d.name === 'Jabatan') v = i === 0 ? <span>Jabatan Contoh <Chip tone="green">PLT</Chip></span> : 'Jabatan Contoh';
      if (c === 'Status' && d.name === 'Jabatan') v = i === 0 ? <i>Aktif</i> : '-';
      r[c] = v;
    });
    return r;
  });
  const mainCols: Column[] = [col('no', 'No', '48px'), ...d.cols.map((c) => col(c, c)), col('aksi', 'Aksi', '60px')];

  const usulanRows = (d.usulanCols ? Array.from({ length: d.usulan ?? 0 }) : []).map((_, i) => {
    const r: Record<string, React.ReactNode> = { aksi: <MoreAction />, status: <Chip tone="blue">Menunggu diverifikasi</Chip>, jenis: ['Tambah', 'Ubah', 'Hapus'][i % 3] };
    d.usulanCols!.forEach((c) => { r[c] = c === 'Berkas' ? <span className="inline-flex items-center gap-[4px] text-[#0b5fef]">File</span> : sample(c, i); });
    return r;
  });
  const usulanTableCols: Column[] = [col('aksi', 'Aksi', '60px'), col('status', 'Status'), col('jenis', 'Jenis'), ...(d.usulanCols ?? []).map((c) => col(c, c))];

  return (
    <div>
      <SubTabs items={defs.map((x) => x.name)} active={sub} onChange={(i) => { setSub(i); setOpenUsulan(false); }} />
      {tab === 'Penilaian' && d.name === 'Kinerja' ? <KinerjaTabel /> : <>
      <div className="flex items-center justify-between pr-[16px]">
        <Updated />
        {d.tambah && (
          <button className="flex items-center gap-[8px] rounded-[4px] bg-[#2f3031] px-[16px] py-[8px] text-white" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
            <Plus className="size-[20px]" /> Tambah
          </button>
        )}
      </div>
      {usulanRows.length > 0 && <UsulanBanner count={usulanRows.length} open={openUsulan} onToggle={() => setOpenUsulan(!openUsulan)} />}
      {openUsulan && usulanRows.length > 0 && <StagingDataTable hideFilter showPagination={false} columns={usulanTableCols} rows={usulanRows} />}
      <StagingDataTable hideFilter columns={mainCols} rows={mainRows} />
      </>}
    </div>
  );
}

function OtherTab({ name }: { name: string }) {
  if (name === 'Keluarga') return <Keluarga />;
  return <SubTabContent key={name} tab={name} />;
}

export function DataPribadiPage({ onBack: _onBack }: { onBack?: () => void }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [showNotice, setShowNotice] = useState(true);
  const [scenario, setScenario] = useState('normal');
  const [adminOn, setAdminOn] = useState(false);
  const [layout, setLayout] = useState<LayoutOpt>(2);
  const onPenilaian = tabs[tab] === 'Penilaian';
  const admin = adminOn && onPenilaian;

  return (
    <ProtoCtx.Provider value={{ scenario, setScenario, layout, setLayout }}>
    <KepegawaianLayout topBar={onPenilaian ? <ProtoBar admin={adminOn} setAdmin={setAdminOn} /> : undefined}>
      <div className="px-[24px] pt-[24px] pb-[64px] flex flex-col gap-[16px]">
        <div>
          {admin && (
            <div className="flex items-center gap-[6px] mb-[8px] text-[#727272]" style={{ fontSize: '12px', lineHeight: '16px' }}>
              Profil Pegawai <ChevronRight className="size-[14px]" /> <span className="text-[#2f3031]" style={{ fontWeight: 500 }}>Data Pribadi Pegawai</span>
            </div>
          )}
          <h1 className="text-[#2f3031]" style={{ fontSize: '24px', fontWeight: 700, lineHeight: '28px' }}>{admin ? 'Data Pribadi Pegawai' : 'Data Pribadi'}</h1>
          <p className="text-[#2f3031]" style={{ fontSize: '14px', lineHeight: '20px' }}>{admin ? 'Melihat data pribadi pegawai yang dipilih' : 'Kelola data pribadi Anda di Portal Kemendikdasmen'}</p>
        </div>

        {showNotice && (
          <div className="bg-[#e3f1fd] border border-[#a9d2f7] rounded-[6px] p-[16px] flex gap-[10px]">
            <Info className="size-[18px] mt-[2px] text-[#1a5fe0] shrink-0" />
            <div className="flex-1" style={{ fontSize: '16px', lineHeight: '24px' }}>
              <p className="mb-[6px]" style={{ fontWeight: 600 }}>Perhatian</p>
              <p>Silakan ajukan perubahan data jika ada kesalahan atau ada perubahan data diri Anda.</p>
              <p>Permintaan perubahan yang Anda lakukan akan diverifikasi oleh kepegawaian Satker/UPT Anda, setelah itu data akan diverifikasi ulang oleh Biro SDM.</p>
            </div>
            <button onClick={() => setShowNotice(false)} aria-label="Tutup"><X className="size-[18px]" /></button>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[275px_1fr] gap-[16px] items-start">
          <div className="flex flex-col gap-[16px]">
            <div className="bg-white border border-[#efefef] rounded-[6px] overflow-hidden">
              <img alt="" src={imgPhoto} className="w-full object-cover bg-[#d9d9d9]" style={{ height: 279 }} />
              <div className="p-[16px] text-center flex flex-col gap-[6px]">
                <h2 className="uppercase text-[#2f3031]" style={{ fontSize: '19px', fontWeight: 600, lineHeight: '24px' }}>{admin ? 'Pegawai Contoh Lain' : 'Prof. Dr. Ahmad Wijaya M.M.'}</h2>
                <p className="text-[#2f3031]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
                  {admin ? 'Pranata Komputer Ahli Pertama' : 'Kepala Seksi Pemetaan Mutu dan Supervisi Lembaga Penjaminan Mutu Pendidikan Banten'}
                </p>
                <p className="text-[#2f3031]" style={{ fontSize: '14px', lineHeight: '20px' }}>(Karir)<br />TMT 1 Oktober 2023</p>
              </div>
            </div>

            <div className="bg-white border border-[#efefef] rounded-[6px] p-[12px] flex flex-col gap-[12px]">
              <div className="flex gap-[10px]">
                <div className="size-[64px] shrink-0 bg-[#f4f4f4] grid place-items-center text-[10px] text-[#65696c]">QR</div>
                <div>
                  <p style={{ fontSize: '12px', lineHeight: '16px' }}>Scan QR untuk melihat profil publik (Kartu Pegawai). Klik gambar untuk memperbesar.</p>
                  <a className="text-[#0b5fef] inline-flex items-center gap-[4px] mt-[2px]" style={{ fontSize: '12px', lineHeight: '16px' }} href="/profil/contoh" target="_blank" rel="noreferrer"><ExternalLink className="size-[11px]" /> Lihat Profil Publik</a>
                </div>
              </div>
              <button className="w-full border border-[#c7c7c7] rounded-[4px] py-[8px] flex items-center justify-center gap-[8px] hover:bg-[#f7f7f7]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
                <Download className="size-[16px]" /> Unduh QR
              </button>
            </div>

            <div className="bg-white border border-[#efefef] rounded-[6px] overflow-hidden">
              <header className="px-[16px] py-[12px] bg-[#fafafa] border-b border-[#eee] text-[#65696c]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>Unit Organisasi</header>
              <ul className="list-disc pl-[32px] pr-[16px] py-[12px] flex flex-col gap-[4px]" style={{ fontSize: '16px', lineHeight: '24px' }}>
                {units.map((u) => <li key={u}>{u}</li>)}
              </ul>
            </div>
          </div>

          <div className="bg-white border border-[#efefef] rounded-[6px] min-w-0">
            <div className="flex gap-[13px] px-[16px] border-b border-[#e4e4e4] overflow-x-auto">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  className="relative whitespace-nowrap text-[#2f3031]"
                  style={{ height: '56px', padding: '12px 7.5px', fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}
                >
                  {t}
                  {i === tab && (
                    <span className="absolute left-0 right-0 bottom-0 bg-[#0b5fef]" style={{ height: '4px', borderRadius: '24px 24px 0 0' }} />
                  )}
                </button>
              ))}
            </div>

            {tab === 0 ? (
              <div className="p-[14px] flex flex-col gap-[14px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#808489]" style={{ fontSize: '14px', lineHeight: '20px' }}>Terakhir diperbarui: <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>2 November 2026</span></span>
                  <div className="flex items-center gap-[12px]">
                    <button onClick={() => setHidden(!hidden)} aria-label="Tampilkan atau sembunyikan data">
                      {hidden ? <EyeOff className="size-[20px] text-[#45474a]" /> : <Eye className="size-[20px] text-[#45474a]" />}
                    </button>
                    <button onClick={() => navigate('/kepegawaian/ubah-data-pribadi')} className="bg-[#2f3031] text-white rounded-[4px] px-[14px] py-[8px] flex items-center gap-[8px] " style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
                      <FilePenLine className="size-[16px]" /> Ubah Data
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px] items-start">
                  <div className="flex flex-col gap-[14px]">
                    <Card icon={<User className="size-[16px]" />} title="Data Diri" rows={dataDiri} hidden={hidden} />
                    <Card icon={<IdCard className="size-[16px]" />} title="Data Kepegawaian" rows={dataKepegawaian} hidden={hidden} />
                  </div>
                  <div className="flex flex-col gap-[14px]">
                    <Card icon={<Contact className="size-[16px]" />} title="Kontak" rows={kontak} hidden={hidden} full={['Email Dikdasmen', 'Email Lain', 'Alamat']} />
                    <Card icon={<FolderOpen className="size-[16px]" />} title="Data Lainnya" rows={dataLainnya} hidden={hidden} />
                  </div>
                </div>
              </div>
            ) : (
              <OtherTab name={tabs[tab]} />
            )}
          </div>
        </div>
      </div>
    </KepegawaianLayout>
    {onPenilaian && <LayoutSwitch />}
    </ProtoCtx.Provider>
  );
}
