import { Tabs, Checkbox, ChipGroup, Banner, buttonClass } from 'seragam-design-system';
import { KELUARGA, cell as selKeluarga, type Tabel } from '@/app/pages/UbahPegawaiPage';
import { Fragment, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router';
import { TriangleAlert, UserPlus, Plus, SlidersHorizontal, RefreshCw, ChevronRight, ChevronDown, ChevronUp, Info, X, Eye, EyeOff, FilePenLine, User, IdCard, Contact, FolderOpen, ExternalLink, Download, ChartLine, ArrowUp, ArrowDown, Check, Equal } from 'lucide-react';
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
    <section className="bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.08),0_2px_1px_-1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.10)] rounded-[8px] overflow-hidden">
      <header className="flex items-center gap-[8px] px-[16px] py-[12px] border-b border-[#eee] text-sd-gray-60" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
        {icon} {title}
      </header>
      <div className={`grid gap-x-[16px] gap-y-[14px] p-[16px] ${cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {rows.map(([label, value, info]) => (
          <div key={label as string} className={`flex flex-col gap-[2px] ${full.includes(label as string) ? 'col-span-2' : ''}`}>
            <span className="text-sd-gray-60 flex items-center gap-[4px]" style={{ fontSize: '14px', lineHeight: '20px' }}>
              {label as string} {info ? <Info className="size-[13px]" /> : null}
            </span>
            <span className="text-sd-gray-90 break-words" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
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
  return <ChipGroup items={items} active={active} onChange={onChange} className="px-[16px] pt-[16px] pb-[28px]" />;
}

const col = (key: string, label: string, width?: string): Column => ({ key, label, width });

function Updated() {
  return (
    <p className="px-[16px] pt-[12px] pb-[16px] text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>
      Terakhir diperbarui: <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>2 November 2026</span>
    </p>
  );
}

const MASK = '••••••••••••••';

function FamilyCard({ tabel, to, hidden }: { tabel: Tabel; to: string; hidden: boolean }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-[8px] bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.08),0_2px_1px_-1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.10)] p-[16px] mb-[16px]">
      <div className="flex items-center justify-between pb-[12px]">
        <span className="text-sd-gray-60" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>{tabel.judul}</span>
        <button
          onClick={() => to && navigate(to)}
          className={buttonClass('secondary', 'md')}
        >
          <UserPlus className="size-[20px]" /> Tambah
        </button>
      </div>
      <div className="-mx-[16px] -mb-[16px]">
      <StagingDataTable
        hideFilter
        showPagination={false}
        columns={[
          { key: 'no', label: 'No', width: '48px' },
          ...tabel.kolom.map((c) => ({ key: c, label: c })),
          { key: 'aksi', label: 'Aksi', width: '60px' },
        ]}
        rows={tabel.baris.map((b, i) => {
          const r: Record<string, React.ReactNode> = { no: i + 1, aksi: <MoreAction /> };
          tabel.kolom.forEach((c) => { r[c] = hidden ? '••••••••' : selKeluarga(tabel, c, b); });
          return r;
        })}
      />
      </div>
    </div>
  );
}

function Keluarga({ hidden, onToggle }: { hidden: boolean; onToggle: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between px-[16px] pt-[12px] pb-[16px]">
        <span className="text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>Terakhir diperbarui: <span style={{ fontWeight: 500 }}>4 November 2026</span></span>
        <button onClick={onToggle} aria-label="Tampilkan atau sembunyikan data" aria-pressed={!hidden} className="rounded-[4px] p-[4px] hover:bg-sd-gray-5">
          {hidden ? <EyeOff className="size-[20px] text-sd-gray-80" /> : <Eye className="size-[20px] text-sd-gray-80" />}
        </button>
      </div>
      <Banner tone="warning" title="Usulan Perubahan Data" className="m-[16px]">
        <p>
            Anda memiliki 4 usulan perubahan data. Usulan berstatus <b style={{ fontWeight: 600 }}>Menunggu Verifikasi Data</b> sedang diverifikasi oleh Admin Satker. Usulan berstatus <b style={{ fontWeight: 600 }}>Berhasil Memperbarui Data</b> sudah melewati seluruh proses verifikasi dan data Anda telah diperbarui.
        </p>
        <p className="mt-[8px]">Anda dapat melihat detail perubahan data yang diajukan di bawah ini:</p>
        <button className="mt-[8px] underline" style={{ fontWeight: 600 }}>Selengkapnya</button>
      </Banner>
      <div className="px-[16px]">
        {KELUARGA.map((t) => (
          <FamilyCard key={t.kunci} tabel={t} hidden={hidden} to={t.kunci === 'ortu' ? '/kepegawaian/keluarga/orang-tua/tambah' : t.kunci === 'pasangan' ? '/kepegawaian/keluarga/pasangan/tambah' : ''} />
        ))}
      </div>
    </div>
  );
}

/* Data contoh fiktif: kolom mengikuti staging, isi sel dibuat otomatis. */
const ProtoCtx = createContext<{ scenario: string; setScenario: (s: string) => void }>({ scenario: 'sebagian', setScenario: () => {} });
/* Variasi gaya pill (prototipe): 1 = biru/merah saja, 2 = kepekatan warna + ikon, 3 = tanpa pill, ikon berwarna, 4 = hanya teks berwarna. */
type PillVariant = '1' | '2' | '3' | '4';
const PillCtx = createContext<PillVariant>('3');
const PILL_VARIANTS: PillVariant[] = ['1', '2', '3', '4'];

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
    <Banner tone="warning" title="Usulan Perubahan Data" className="mx-[16px] mb-[16px]">
      <p>
        Anda memiliki {count} usulan perubahan data. Usulan berstatus <b style={{ fontWeight: 600 }}>Berhasil Memperbarui Data</b> sudah melewati seluruh proses verifikasi dan data Anda telah diperbarui.
      </p>
      <p className="mt-[8px]">Anda dapat melihat detail perubahan data yang diajukan di bawah ini:</p>
      <button onClick={onToggle} className="mt-[8px] underline" style={{ fontWeight: 600 }}>
        {open ? 'Sembunyikan' : 'Selengkapnya'}
      </button>
    </Banner>
  );
}

/* Penilaian > Kinerja: tabel gabungan tahunan + triwulan (prototipe Opsi 3). Data contoh fiktif. */
type KRow = { tahun: number; tw: number; hk?: string; pk?: string; pred?: string; belum?: string; prov?: boolean };
const KDATA: Record<string, KRow[]> = {
  normal: [
    { tahun: 2026, tw: 2, hk: 'Di Atas Ekspektasi', pk: 'Di Atas Ekspektasi', pred: 'Sangat Baik' },
    { tahun: 2026, tw: 1, hk: 'Di Atas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
  ],
  belum: [
    { tahun: 2026, tw: 2, belum: 'Tidak dinilai' },
    { tahun: 2026, tw: 1, hk: 'Di Atas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
  ],
  variasi: [
    { tahun: 2026, tw: 2, hk: 'Di Bawah Ekspektasi', pk: 'Di Bawah Ekspektasi', pred: 'Sangat Kurang' },
    { tahun: 2026, tw: 1, hk: 'Di Bawah Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Butuh Perbaikan' },
  ],
  masa: [
    { tahun: 2026, tw: 3, hk: 'Sesuai Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik', prov: true },
    { tahun: 2026, tw: 2, hk: 'Di Atas Ekspektasi', pk: 'Di Atas Ekspektasi', pred: 'Sangat Baik' },
    { tahun: 2026, tw: 1, hk: 'Di Atas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
  ],
  masaBelum: [
    { tahun: 2026, tw: 3, belum: 'Dalam Penilaian' },
    { tahun: 2026, tw: 2, hk: 'Di Atas Ekspektasi', pk: 'Di Atas Ekspektasi', pred: 'Sangat Baik' },
    { tahun: 2026, tw: 1, hk: 'Di Atas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
  ],
  // Triwulan dan tahunan terpisah: Tw 2 kosong, Tw 4 belum ada; 2024–2025 tanpa triwulan.
  sebagian: [
    { tahun: 2026, tw: 3, hk: 'Di Atas Ekspektasi', pk: 'Di Atas Ekspektasi', pred: 'Sangat Baik' },
    { tahun: 2026, tw: 1, hk: 'Di Bawah Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Butuh Perbaikan' },
  ],
  tersedia: [
    { tahun: 2026, tw: 2, belum: 'Belum tersedia' },
    { tahun: 2026, tw: 1, hk: 'Di Atas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
  ],
};
const KTAHUNAN: Record<string, { tahun: number; hk: string; pk: string; pred?: string }[]> = {
  normal: [
    { tahun: 2025, hk: 'Di Atas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
    { tahun: 2024, hk: 'Sesuai Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
    { tahun: 2023, hk: 'Sesuai Ekspektasi', pk: 'Di Atas Ekspektasi', pred: 'Baik' },
  ],
  variasi: [
    { tahun: 2025, hk: 'Sesuai Ekspektasi', pk: 'Di Bawah Ekspektasi', pred: 'Kurang' },
    { tahun: 2024, hk: 'Di Bawah Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Butuh Perbaikan' },
    { tahun: 2023, hk: 'Di Bawah Ekspektasi', pk: 'Di Bawah Ekspektasi', pred: 'Sangat Kurang' },
    { tahun: 2022, hk: 'Sesuai Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
    { tahun: 2021, hk: 'Di Atas Ekspektasi', pk: 'Di Atas Ekspektasi', pred: 'Sangat Baik' },
  ],
};
KTAHUNAN.sebagian = [
  { tahun: 2026, hk: 'Di Atas Ekspektasi', pk: 'Sesuai Ekspektasi', pred: 'Baik' },
  { tahun: 2025, hk: 'Sesuai Ekspektasi', pk: 'Di Bawah Ekspektasi', pred: 'Kurang' },
  { tahun: 2024, hk: 'Di Bawah Ekspektasi', pk: 'Di Bawah Ekspektasi', pred: 'Sangat Kurang' },
];
// Seluruh kombinasi Hasil Kerja x Perilaku Kerja (3x3) dan kelima predikat. Predikat contoh fiktif.
{
  const E = ['Di Atas Ekspektasi', 'Sesuai Ekspektasi', 'Di Bawah Ekspektasi'];
  const P = [['Sangat Baik', 'Baik', 'Butuh Perbaikan'], ['Baik', 'Baik', 'Butuh Perbaikan'], ['Kurang', 'Kurang', 'Sangat Kurang']];
  KTAHUNAN.kombinasi = E.flatMap((hk, i) => E.map((pk, j) => ({ hk, pk, pred: P[i][j] }))).map((r, k) => ({ tahun: 2026 - k, ...r }));
}
const SCENARIOS: [string, string][] = [
  ['sebagian', 'Skenario Eksisting'],
  ['normal', 'Normal: Tw 1–2 2026 sudah dinilai'],
  ['kombinasi', 'Kombinasi status: semua Hasil Kerja × Perilaku Kerja, lima predikat'],
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
// Dua rona: biru = sesuai/di atas ekspektasi atau Baik/Sangat Baik; merah = di bawah ekspektasi atau di bawah Baik.
// Level dibedakan lewat kepekatan warna + ikon (ikon jadi penanda cadangan bagi pengguna buta warna). Kontras teks >= 4.5:1.
type PillStyle = { bg: string; fg: string; icon: 'up' | 'ok' | 'eq' | 'down' };
const BIRU_PEKAT: PillStyle = { bg: 'var(--sd-blue-70)', fg: '#ffffff', icon: 'up' };
const BIRU_MUDA: PillStyle = { bg: '#cde0ff', fg: '#0a3a8c', icon: 'ok' };
const PRED_STYLE: Record<string, PillStyle> = {
  'Sangat Baik': BIRU_PEKAT, Baik: BIRU_MUDA,
  'Butuh Perbaikan': { bg: '#ffe1e1', fg: '#8a1c1c', icon: 'down' },
  Kurang: { bg: '#ffbdbd', fg: '#7a1212', icon: 'down' },
  'Sangat Kurang': { bg: 'var(--sd-red-60)', fg: '#ffffff', icon: 'down' },
  'Di Atas Ekspektasi': BIRU_PEKAT, 'Sesuai Ekspektasi': { ...BIRU_MUDA, icon: 'eq' },
  'Di Bawah Ekspektasi': { bg: '#ffbdbd', fg: '#7a1212', icon: 'down' },
};
const FLAT: Record<'biru' | 'merah' | 'hijau', { bg: string; fg: string; dot: string }> = {
  biru: { bg: '#cde0ff', fg: '#0a3a8c', dot: 'var(--sd-blue-70)' },
  merah: { bg: '#ffbdbd', fg: '#7a1212', dot: 'var(--sd-red-60)' },
  hijau: { bg: '#cdf0dc', fg: '#0f5a2e', dot: '#16803c' }, // khusus Opsi 3: Sangat Baik / Di Atas Ekspektasi
};
const PILL_ICON = { up: ArrowUp, ok: Check, eq: Equal, down: ArrowDown };
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
  // Data kosong bukan status: tampil sebagai teks abu polos, bukan pill.
  if (NO_DATA.includes(v)) return <span className="text-sd-gray-60" style={{ fontSize: '16px', lineHeight: '20px', fontWeight: 400 }}>Data Tidak Tersedia</span>;
  const variant = useContext(PillCtx);
  const base = PRED_STYLE[v] ?? { bg: 'var(--sd-badge-neutral)', fg: 'var(--sd-gray-90)', icon: null };
  const tone = base.icon === 'down' ? 'merah' : 'biru';
  const Icon = base.icon ? PILL_ICON[base.icon] : null;
  let badge;
  const tone3 = base.icon === 'up' ? 'hijau' : tone;
  if (variant === '4' && base.icon) {
    // Hanya teks berwarna (biru/merah), tanpa pill dan tanpa ikon.
    badge = <span style={{ color: FLAT[tone].dot, fontSize: '16px', fontWeight: 400, lineHeight: '20px' }}>{v}</span>;
  } else if (variant === '3' && base.icon && Icon) {
    // Tanpa pill: ikon berwarna + teks standar.
    badge = (
      <span className="inline-flex items-center gap-[6px] text-sd-gray-90" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '20px' }}>
        <span className="inline-flex size-[22px] shrink-0 items-center justify-center rounded-full" style={{ background: FLAT[tone3].bg, color: FLAT[tone3].dot }}>
          <Icon className="size-[14px]" strokeWidth={2.5} aria-hidden="true" />
        </span>{v}
      </span>
    );
  } else {
    const st = variant === '1' && base.icon ? { ...FLAT[tone], icon: base.icon } : base;
    badge = (
      <span className="inline-flex items-center gap-[4px] rounded-full px-[10px] py-[2px]" style={{ background: st.bg, color: st.fg, fontSize: '16px', fontWeight: 400, lineHeight: '20px' }}>
        {variant === '2' && Icon && <Icon className="size-[14px] shrink-0" strokeWidth={2.5} aria-hidden="true" />}{v}
      </span>
    );
  }
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
      <Info className="size-[16px] text-sd-gray-60" aria-hidden="true" />
      {pos && (
        <span role="tooltip" className="fixed z-[60] rounded-[4px] bg-sd-gray-90 px-[10px] py-[8px] text-white" style={{ left: pos.left, top: pos.top, width: 260, fontSize: '12px', lineHeight: '18px', fontWeight: 400, boxShadow: '0 2px 8px rgba(0,0,0,.2)' }}>
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
function historyQuarters(a: { tahun: number; hk: string; pk: string; pred?: string }): KRow[] {
  const lvl = PRED_LEVEL[a.pred ?? ''] ?? 4;
  const up = LEVEL_LABEL[Math.min(5, lvl + 1)];
  const preds = [a.pred ?? 'Baik', a.pred ?? 'Baik', up, a.pred ?? 'Baik'];
  return [4, 3, 2, 1].map((tw) => ({ tahun: a.tahun, tw, hk: a.hk, pk: a.pk, pred: preds[tw - 1] }));
}


const CHART_H = 300;
const PLOT_TOP = 8;

/* Label sumbu X dimiringkan 45° agar semua triwulan muat tanpa scroll. */
function RotatedTick({ x = 0, y = 0, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text textAnchor="end" fill="var(--sd-gray-60)" fontSize={14} dy={4} transform="rotate(-45)">{payload?.value}</text>
    </g>
  );
}

/* Sumbu Y mengikuti indikator yang dipilih (bukan periode). Indikator Ekspektasi punya baris "Data Tidak Tersedia" (0). */
const EXP_LEVEL: Record<string, number> = { 'Di Bawah Ekspektasi': 1, 'Sesuai Ekspektasi': 2, 'Di Atas Ekspektasi': 3 };
const EXP_LABEL: Record<number, string> = { 0: 'Data Tidak Tersedia', 1: 'Di Bawah Ekspektasi', 2: 'Sesuai Ekspektasi', 3: 'Di Atas Ekspektasi' };
type Indikator = 'pred' | 'hk' | 'pk';
const INDIKATOR: [Indikator, string][] = [['pred', 'Predikat Kinerja'], ['hk', 'Hasil Kerja'], ['pk', 'Perilaku Kerja']];
type CP = { label: string; level: number | null; na: number | null; path: number; hk?: string; pk?: string; pred?: string };
const NA_TEXT = 'Data Tidak Tersedia';

function KinerjaChart({ annual, quarterly }: { annual: { tahun: number; hk: string; pk: string; pred?: string }[]; quarterly: KRow[] }) {
  const [mode, setMode] = useState<'tahunan' | 'triwulan'>('tahunan');
  const [ind, setInd] = useState<Indikator>('pred');
  const allYears = [2026, ...annual.map((r) => r.tahun), ...quarterly.map((r) => r.tahun)];
  const first = Math.min(...allYears);
  const years = Array.from({ length: 2026 - first + 1 }, (_, i) => first + i);

  const isPred = ind === 'pred';
  const levelMap = isPred ? PRED_LEVEL : EXP_LEVEL;
  const ticks = isPred ? [5, 4, 3, 2, 1, 0] : [3, 2, 1, 0];
  const labelOf = (v: number) => (v === 0 ? NA_TEXT : isPred ? LEVEL_LABEL[v] : EXP_LABEL[v]);

  type Src = { label: string; hk?: string; pk?: string; pred?: string };
  const sources: Src[] = mode === 'tahunan'
    ? years.map((y) => { const a = annual.find((r) => r.tahun === y); return { label: String(y), hk: a?.hk, pk: a?.pk, pred: a?.pred }; })
    : [...quarterly].sort((a, b) => a.tahun - b.tahun || a.tw - b.tw).map((r) => ({ label: `Tw${r.tw} ${r.tahun}`, hk: r.belum ? undefined : r.hk, pk: r.belum ? undefined : r.pk, pred: r.belum ? undefined : r.pred }));
  const all: CP[] = sources.map((d) => {
    const level = levelMap[d[ind] ?? ''] ?? null;
    return { ...d, level, na: level === null ? 0 : null, path: level ?? 0 };
  });
  // Semua indikator menandai periode tanpa nilai di baris "Data Tidak Tersedia".
  const data = all;
  const hasAny = data.some((d) => d.level !== null);

  const rotate = mode === 'triwulan';
  // Tinggi area sumbu X tetap agar sumbu Y tidak bergeser saat berpindah mode.
  const xH = 76;
  const plotH = CHART_H - PLOT_TOP - xH;
  const lo = Math.min(...ticks) - 0.5;
  const hi = Math.max(...ticks) + 0.5;
  const pill = (active: boolean) => `border px-[12px] py-[2px] ${active ? 'border-sd-blue-70 bg-[#ecf5fe] text-sd-blue-70' : 'border-sd-gray-90 bg-white text-sd-gray-90'}`;
  const pillStyle = { borderRadius: '24px', fontSize: '14px', fontWeight: 600, lineHeight: '20px' } as const;

  return (
    <div>
      <div className="mb-[24px] flex flex-col gap-[12px]">
        {([
          ['Periode', 'Periode', [['tahunan', 'Tahunan'], ['triwulan', 'Triwulan']], mode, (k: string) => setMode(k as 'tahunan' | 'triwulan')],
          ['Indikator', 'Indikator', INDIKATOR, ind, (k: string) => setInd(k as Indikator)],
        ] as const).map(([title, aria, opts, cur, set]) => (
          <div key={title} className="flex items-center gap-[16px]">
            <span className="w-[80px] shrink-0 text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>{title}</span>
            <div className="flex flex-wrap gap-[8px]" role="group" aria-label={aria}>
              {opts.map(([k, l]) => (
                <button key={k} onClick={() => set(k)} aria-pressed={cur === k} className={pill(cur === k)} style={pillStyle}>{l}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {hasAny ? (
        <div className="flex">
          {/* Label sumbu Y dibuat terpisah agar tetap terlihat saat grafik digeser. */}
          <div className="relative shrink-0" style={{ width: 180, height: CHART_H }} aria-hidden="true">
            {ticks.map((v) => (
              <span key={v} className="absolute right-[16px] whitespace-nowrap text-sd-gray-60" style={{ top: PLOT_TOP + ((hi - v) / (hi - lo)) * plotH, transform: 'translateY(-50%)', fontSize: '14px', lineHeight: '20px' }}>{labelOf(v)}</span>
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <div style={{ width: '100%', height: CHART_H }}>
              <ResponsiveContainer>
                <LineChart data={data} margin={{ top: PLOT_TOP, right: 24, bottom: 0, left: 0 }}>
                  <CartesianGrid horizontal={false} vertical={false} />
                  {ticks.map((v) => <ReferenceLine key={v} y={v} stroke="var(--sd-badge-neutral)" />)}
                  <XAxis dataKey="label" interval={0} height={xH} tickMargin={rotate ? 12 : 16} padding={{ left: rotate ? 56 : 16, right: 16 }} tick={rotate ? <RotatedTick /> : { fontSize: 14, fill: 'var(--sd-gray-60)' }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[lo, hi]} ticks={ticks} width={0} />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload as CP;
                      return (
                        <div className="rounded-[4px] bg-sd-gray-90 px-[10px] py-[8px] text-white" style={{ fontSize: '12px', lineHeight: '18px' }}>
                          <div style={{ fontWeight: 600 }}>{d.label}</div>
                          <div>{INDIKATOR.find(([k]) => k === ind)![1]}: {d[ind] ?? NA_TEXT}</div>
                        </div>
                      );
                    }}
                  />
                  {/* Garis putus-putus menghubungkan titik data ke titik "Data Tidak Tersedia"; garis penuh di atasnya hanya antar-data. */}
                  <Line type="linear" dataKey="path" stroke="var(--sd-gray-30)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} activeDot={false} isAnimationActive={false} />
                  <Line type="linear" dataKey="level" stroke="var(--sd-blue-70)" strokeWidth={2} dot={{ r: 4, fill: 'var(--sd-blue-70)', stroke: 'var(--sd-blue-70)', strokeWidth: 0 }} activeDot={{ r: 6, fill: 'var(--sd-blue-70)', stroke: 'var(--sd-blue-70)', strokeWidth: 0 }} isAnimationActive={false} />
                  {/* Titik abu di baris "Data Tidak Tersedia" untuk periode yang kosong. */}
                  {<Line type="linear" dataKey="na" stroke="none" dot={{ r: 4, fill: 'var(--sd-gray-30)', stroke: 'var(--sd-gray-30)', strokeWidth: 0 }} activeDot={{ r: 6, fill: 'var(--sd-gray-30)', stroke: 'var(--sd-gray-30)', strokeWidth: 0 }} isAnimationActive={false} />}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <p className="py-[32px] text-center text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>Belum ada data untuk ditampilkan pada grafik.</p>
      )}
    </div>
  );
}

function KinerjaChartModal({ annual, quarterly, onClose }: { annual: { tahun: number; hk: string; pk: string; pred?: string }[]; quarterly: KRow[]; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-[16px]" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Grafik Riwayat Penilaian Kinerja" className="w-full max-w-[960px] max-h-full overflow-auto rounded-[8px] bg-white p-[24px]" style={{ boxShadow: '0 8px 24px rgba(0,0,0,.2)' }} onClick={(e) => e.stopPropagation()}>
        <div className="mb-[16px] flex items-center justify-between gap-[12px]">
          <span className="text-sd-gray-90" style={{ fontSize: '20px', fontWeight: 600, lineHeight: '28px' }}>Grafik Riwayat Penilaian Kinerja</span>
          <button onClick={onClose} aria-label="Tutup" className="rounded-[4px] p-[4px] text-sd-gray-60 hover:bg-sd-gray-0"><X className="size-[20px]" /></button>
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
// Data terbaru dari eSKP yang menimpa data lama saat "Perbarui Data" dijalankan.
const freshFor = (sc: string) => (sc === 'variasi' || sc === 'sebagian' ? sc : sc === 'masa' || sc === 'masaBelum' ? 'masa' : 'normal');

function KinerjaTabel() {
  const { scenario: ctxScenario, setScenario } = useContext(ProtoCtx);
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

  const annual = KTAHUNAN[scenario === 'variasi' || scenario === 'sebagian' || scenario === 'kombinasi' ? scenario : 'normal'];
  const quarterly = KDATA[['belum', 'tersedia', 'variasi', 'masa', 'masaBelum', 'sebagian'].includes(scenario) ? scenario : 'normal'];
  // Daftar tahun = semua tahun dari yang terlama sampai 2026, termasuk tahun yang keduanya kosong.
  const firstYear = scenario === 'sebagian' ? 2023 : Math.min(2026, ...annual.map((r) => r.tahun));
  const years = Array.from({ length: 2026 - firstYear + 1 }, (_, i) => 2026 - i);
  const syncAt = fetchedAt ?? (['masa', 'masaBelum'].includes(scenario) ? '9 Oktober 2026, 22.35 WIB' : '26 Juli 2026, 22.40 WIB');
  const showSync = !['loading', 'error', 'nip'].includes(scenario);
  // Data triwulan yang benar-benar ada (tanpa mengarang dari predikat tahunan pada skenario 'sebagian').
  const quartersOf = (y: number): KRow[] => {
    if (y === 2026) return quarterly;
    if (scenario === 'sebagian') return [];
    const a = annual.find((r) => r.tahun === y);
    return a ? historyQuarters(a) : [];
  };
  const isFilled = (r: KRow) => !r.belum;
  // Tw1–Tw4 selalu lengkap untuk tahun lampau; tahun berjalan sampai triwulan terakhir yang ada. Yang kosong diisi baris "Data Tidak Tersedia".
  const quartersFull = (y: number): KRow[] => {
    const have = quartersOf(y);
    const last = y === 2026 ? Math.max(0, ...have.map((r) => r.tw)) : 4;
    return [4, 3, 2, 1].filter((tw) => tw <= last).map((tw) => have.find((r) => r.tw === tw) ?? { tahun: y, tw, belum: 'Belum tersedia' });
  };
  const allQuarters = years.flatMap((y) => (y === 2026 && ['loading', 'error', 'nip', 'empty'].includes(scenario) ? [] : quartersFull(y)));

  const th = 'px-[16px] py-[16px] text-left uppercase text-sd-gray-60 bg-white border-y border-sd-badge-neutral';
  const thStyle = { fontSize: '14px', fontWeight: 700, lineHeight: '16px' } as const;
  const td = 'px-[16px] py-[12px] border-b border-sd-badge-neutral text-sd-gray-90 bg-white';
  const tdOpen = td.replace('bg-white', 'bg-sd-gray-0');
  const tdStyle = { fontSize: '16px', lineHeight: '24px' } as const;
  const sub = { fontSize: '14px', lineHeight: '20px', fontWeight: 400 } as const;
  // Garis biru di tepi kiri baris rincian triwulan (tanpa menggeser isi).
  const bar = { boxShadow: 'inset 3px 0 0 #0954d9' } as const;
  const detail = (y: number) => {
    const rowsFor = quartersFull(y);
    if (y === 2026 && KMESSAGES[scenario]) {
      return (
        <tr><td colSpan={4} className={`${tdOpen} text-sd-gray-60`} role="status" style={{ ...tdStyle, ...bar }}>
          {KMESSAGES[scenario]}{' '}
          {scenario === 'error' && (
            <button onClick={() => setScenario('sebagian')} className="ml-[8px] rounded-[4px] border border-sd-gray-50 bg-white px-[14px] py-[4px] text-sd-gray-90" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>Coba Lagi</button>
          )}
        </td></tr>
      );
    }
    return (
      <>
        {y === 2026 && scenario === 'stale' && (
          <tr><td colSpan={4} className="px-[16px] py-[12px] border-b border-sd-badge-neutral bg-sd-gray-0" style={bar}>
            <div role="status" className="rounded-[4px] border border-[#b98900] bg-[#fff5db] px-[16px] py-[12px] text-sd-gray-90" style={{ fontSize: '14px', lineHeight: '20px' }}>
              <b style={{ fontWeight: 600 }}>Data triwulan terbaru tertunda.</b> Menampilkan data hingga Triwulan 2 2026.
            </div>
          </td></tr>
        )}
        {rowsFor.every((r) => !isFilled(r)) && (
          <tr><td colSpan={4} className={`${tdOpen} text-sd-gray-60`} role="status" style={{ ...tdStyle, ...bar }}>
            Belum ada data triwulan untuk tahun {y}.
          </td></tr>
        )}
        {rowsFor.some(isFilled) && rowsFor.map((r) => (
          <tr key={r.tw}>
            <td className={tdOpen} style={{ ...tdStyle, ...bar }}>
              Triwulan {r.tw}
              <span className="block text-sd-gray-60" style={sub}>{BULAN_TW[r.tw]}</span>
            </td>
            {/* Hasil Kerja, Perilaku Kerja, dan Predikat adalah indikator mandiri: tiap sel kosong menampilkan badge sendiri. */}
            <td className={tdOpen} style={tdStyle}>{!r.belum && r.hk ? <PredBadge v={r.hk} /> : <PredBadge v={r.belum ?? 'Belum tersedia'} />}</td>
            <td className={tdOpen} style={tdStyle}>{!r.belum && r.pk ? <PredBadge v={r.pk} /> : <PredBadge v={r.belum ?? 'Belum tersedia'} />}</td>
            <td className={tdOpen} style={tdStyle}>
              {!r.belum && r.pred ? <PredBadge v={r.pred} /> : <PredBadge v={r.belum ?? 'Belum tersedia'} />}
              {r.prov && <span className="ml-[6px] whitespace-nowrap text-sd-gray-60" style={sub}>Belum final</span>}
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="mx-[16px] mb-[16px] -mt-[12px] rounded-[8px] border border-[#cfd2d4]">
      <div className="flex items-center justify-between gap-[12px] flex-wrap border-b border-[#cfd2d4] p-[16px]">
        <div>
          <h3 className="text-sd-gray-90" style={{ fontSize: '19px', fontWeight: 600, lineHeight: '28px' }}>Riwayat Penilaian Kinerja</h3>
          {showSync && (
            <div className="text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>
              Dicek dari eSKP: {syncAt}
            </div>
          )}
        </div>
        <div className="flex items-center gap-[8px]">
        {scenario !== 'loading' && (
          <button
            onClick={() => setShowChart(true)}
            className={buttonClass('secondary', 'md')}
          >
            <ChartLine className="size-[18px]" />
            Lihat Grafik
          </button>
        )}
        <button
          onClick={getData}
          disabled={fetching}
          title="Ambil data penilaian NIP ini dari eSKP. Data baru akan menimpa data lama."
          className={buttonClass('secondary', 'md')}
        >
          <RefreshCw className={`size-[18px] ${fetching ? 'animate-spin' : ''}`} />
          {fetching ? 'Mengambil Data…' : 'Perbarui Data'}
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
                  <tr onClick={() => toggle(y)} className={`cursor-pointer ${isOpen ? '' : 'hover:bg-sd-gray-0'}`}>
                    <td className={td} style={{ ...tdStyle, fontWeight: isOpen ? 600 : 400 }}>{y}</td>
                    <td className={td} style={tdStyle}>{a?.hk ? <PredBadge v={a.hk} /> : <PredBadge v="Belum tersedia" />}</td>
                    <td className={td} style={tdStyle}>{a?.pk ? <PredBadge v={a.pk} /> : <PredBadge v="Belum tersedia" />}</td>
                    <td className={td} style={tdStyle}>
                      <div className="flex items-center justify-between gap-[12px]">
                        <PredBadge v={a?.pred ?? 'Belum tersedia'} />
                        <button
                          onClick={(e) => { e.stopPropagation(); toggle(y); }}
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? 'Tutup' : 'Buka'} rincian triwulan ${y}`}
                          className="grid size-[32px] place-items-center rounded-full text-sd-gray-90 hover:bg-black/5"
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
      <p className="border-t border-[#cfd2d4] p-[16px] text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>
        Hasil penilaian kinerja tahunan bukan merupakan gabungan dari penilaian kinerja triwulan 1-4.
      </p>
    </div>
  );
}

function ProtoBar({ admin, setAdmin }: { admin: boolean; setAdmin: (v: boolean) => void }) {
  const { scenario, setScenario } = useContext(ProtoCtx);
  return (
    <div role="region" aria-label="Kontrol prototipe" className="flex flex-wrap items-center gap-[16px] border-b border-dashed border-sd-gray-50 bg-sd-gray-5 px-[24px] py-[8px]" style={{ fontSize: '12px', lineHeight: '16px' }}>
      <span className="inline-flex items-center gap-[6px]" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 600 }}><SlidersHorizontal className="size-[12px]" />Kontrol prototipe · Opsi 3: Tabel per tahun</span>
      <span className="text-sd-gray-60" style={{ fontSize: '12px', lineHeight: '16px' }}>Bukan bagian produk</span>
      <label className="inline-flex items-center gap-[8px]" style={{ fontSize: '12px', lineHeight: '16px' }}>Skenario (AC EK-5)
        <select value={scenario} onChange={(e) => setScenario(e.target.value)} aria-label="Skenario prototipe" className="max-w-full rounded-[4px] border border-sd-gray-50 bg-white px-[8px] py-[4px] outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]" style={{ fontSize: '12px' }}>
          {SCENARIOS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
      <Checkbox checked={admin} onChange={(e) => setAdmin(e.target.checked)} label="Tampilan admin, lihat pegawai lain (EK-5.8)" />
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
      if (c === 'Keterangan') v = i === 1 ? <span style={{ color: 'var(--sd-red-60)' }}>Data tidak lengkap</span> : 'Dalam Negeri';
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
    const r: Record<string, React.ReactNode> = { aksi: <MoreAction />, status: <Chip tone="amber">Menunggu Verifikasi Data</Chip>, jenis: ['Tambah', 'Ubah', 'Hapus'][i % 3] };
    d.usulanCols!.forEach((c) => { r[c] = c === 'Berkas' ? <span className="inline-flex items-center gap-[4px] text-sd-blue-70">File</span> : sample(c, i); });
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
          <button className={buttonClass('primary', 'md')}>
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

function OtherTab({ name, hidden, onToggle }: { name: string; hidden: boolean; onToggle: () => void }) {
  if (name === 'Keluarga') return <Keluarga hidden={hidden} onToggle={onToggle} />;
  return <SubTabContent key={name} tab={name} />;
}

export function DataPribadiPage({ onBack: _onBack }: { onBack?: () => void }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [showNotice, setShowNotice] = useState(true);
  const [scenario, setScenario] = useState('sebagian');
  const [adminOn, setAdminOn] = useState(false);
  const [pillVariant, setPillVariant] = useState<PillVariant>('3');
  const onPenilaian = tabs[tab] === 'Penilaian';
  const admin = adminOn && onPenilaian;

  return (
    <ProtoCtx.Provider value={{ scenario, setScenario }}>
    <PillCtx.Provider value={pillVariant}>
    <KepegawaianLayout topBar={onPenilaian ? <ProtoBar admin={adminOn} setAdmin={setAdminOn} /> : undefined}>
      <div className="px-[24px] pt-[24px] pb-[64px] flex flex-col gap-[16px]">
        <div>
          {admin && (
            <div className="flex items-center gap-[6px] mb-[8px] text-sd-gray-60" style={{ fontSize: '12px', lineHeight: '16px' }}>
              Profil Pegawai <ChevronRight className="size-[14px]" /> <span className="text-sd-gray-90" style={{ fontWeight: 500 }}>Data Pribadi Pegawai</span>
            </div>
          )}
          <h1 className="text-sd-gray-90" style={{ fontSize: '24px', fontWeight: 600, lineHeight: '28px' }}>{admin ? 'Data Pribadi Pegawai' : 'Data Pribadi'}</h1>
          <p className="text-sd-gray-90" style={{ fontSize: '14px', lineHeight: '20px' }}>{admin ? 'Melihat data pribadi pegawai yang dipilih' : 'Kelola data pribadi Anda di Portal Kemendikdasmen'}</p>
        </div>

        {showNotice && (
          <Banner tone="info" title="Perhatian" onClose={() => setShowNotice(false)}>
            <p>Silakan ajukan perubahan data jika ada kesalahan atau ada perubahan data diri Anda.</p>
            <p>Permintaan perubahan yang Anda lakukan akan diverifikasi oleh Admin Satker/UPT Anda. Untuk data tertentu, usulan akan ditinjau lebih lanjut oleh Komite Talenta.</p>
          </Banner>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[275px_1fr] gap-[16px] items-start">
          <div className="flex flex-col gap-[16px]">
            <div className="bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.08),0_2px_1px_-1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.10)] rounded-[8px] overflow-hidden">
              <img alt="" src={imgPhoto} className="w-full object-cover bg-[#d9d9d9]" style={{ height: 279 }} />
              <div className="p-[16px] text-center flex flex-col gap-[6px]">
                <h2 className="uppercase text-sd-gray-90" style={{ fontSize: '19px', fontWeight: 600, lineHeight: '24px' }}>{admin ? 'Pegawai Contoh Lain' : 'Prof. Dr. Ahmad Wijaya M.M.'}</h2>
                <p className="text-sd-gray-90" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
                  {admin ? 'Pranata Komputer Ahli Pertama' : 'Kepala Seksi Pemetaan Mutu dan Supervisi Lembaga Penjaminan Mutu Pendidikan Banten'}
                </p>
                <p className="text-sd-gray-90" style={{ fontSize: '14px', lineHeight: '20px' }}>(Karir)<br />TMT 1 Oktober 2023</p>
              </div>
            </div>

            <div className="bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.08),0_2px_1px_-1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.10)] rounded-[8px] p-[12px] flex flex-col gap-[12px]">
              <div className="flex gap-[10px]">
                <div className="size-[64px] shrink-0 bg-sd-gray-5 grid place-items-center text-[12px] text-sd-gray-60">QR</div>
                <div>
                  <p style={{ fontSize: '12px', lineHeight: '16px' }}>Scan QR untuk melihat profil publik (Kartu Pegawai). Klik gambar untuk memperbesar.</p>
                  <a className="text-sd-blue-70 inline-flex items-center gap-[4px] mt-[2px]" style={{ fontSize: '12px', lineHeight: '16px' }} href="/profil/contoh" target="_blank" rel="noreferrer"><ExternalLink className="size-[11px]" /> Lihat Profil Publik</a>
                </div>
              </div>
              <button className="w-full border border-sd-gray-30 rounded-[4px] py-[8px] flex items-center justify-center gap-[8px] hover:bg-sd-gray-0" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
                <Download className="size-[16px]" /> Unduh QR
              </button>
            </div>

            <div className="bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.08),0_2px_1px_-1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.10)] rounded-[8px] overflow-hidden">
              <header className="px-[16px] py-[12px] bg-sd-gray-0 border-b border-[#eee] text-sd-gray-60" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>Unit Organisasi</header>
              <ul className="list-disc pl-[32px] pr-[16px] py-[12px] flex flex-col gap-[4px]" style={{ fontSize: '16px', lineHeight: '24px' }}>
                {units.map((u) => <li key={u}>{u}</li>)}
              </ul>
            </div>
          </div>

          <div className="bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.08),0_2px_1px_-1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.10)] rounded-[8px] min-w-0">
            <Tabs items={tabs} active={tab} onChange={setTab} />

            {tab === 0 ? (
              <div className="p-[14px] flex flex-col gap-[14px]">
                <div className="flex items-center justify-between">
                  <span className="text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>Terakhir diperbarui: <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>2 November 2026</span></span>
                  <div className="flex items-center gap-[12px]">
                    <button onClick={() => setHidden(!hidden)} aria-label="Tampilkan atau sembunyikan data">
                      {hidden ? <EyeOff className="size-[20px] text-sd-gray-80" /> : <Eye className="size-[20px] text-sd-gray-80" />}
                    </button>
                    <button onClick={() => navigate('/kepegawaian/ubah-data-pribadi')} className={buttonClass('ultimate', 'md')}>
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
              <OtherTab name={tabs[tab]} hidden={hidden} onToggle={() => setHidden(!hidden)} />
            )}
          </div>
        </div>
      </div>
    </KepegawaianLayout>
    {onPenilaian && (
      <div role="group" aria-label="Gaya pill status (prototipe)" className="fixed bottom-[16px] right-[16px] z-[70] flex items-center gap-[8px] rounded-[8px] border border-dashed border-sd-gray-50 bg-sd-gray-5 px-[10px] py-[6px]" style={{ fontSize: '14px', lineHeight: '20px', boxShadow: '0 2px 8px rgba(0,0,0,.15)' }}>
        <span style={{ fontWeight: 600 }}>Gaya pill</span>
        {PILL_VARIANTS.map((k) => (
          <button key={k} onClick={() => setPillVariant(k)} aria-pressed={pillVariant === k} className={`rounded-full border px-[10px] py-[2px] ${pillVariant === k ? 'border-sd-blue-70 bg-[#ecf5fe] text-sd-blue-70' : 'border-sd-gray-90 bg-white text-sd-gray-90'}`} style={{ fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>Opsi {k}</button>
        ))}
      </div>
    )}
    </PillCtx.Provider>
    </ProtoCtx.Provider>
  );
}
