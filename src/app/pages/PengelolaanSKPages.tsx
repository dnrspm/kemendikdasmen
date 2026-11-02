import { useState, type ReactNode } from 'react';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { StagingDataTable, PersonCell, Chip, MoreAction, type Column } from '@/app/components/StagingDataTable';

/* Data contoh fiktif — bukan data pegawai sebenarnya. */
const UNIT_PUSDATIN = 'Pusat Data dan Teknologi Informasi - Sekretariat Jenderal - Kementerian Pendidikan Dasar dan Menengah - KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH';

function PageShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <KepegawaianLayout>
      <div className="px-[24px] pt-[24px] pb-[64px] flex flex-col gap-[16px]">
        <div>
          <h1 className="text-[#2f3031]" style={{ fontSize: '24px', fontWeight: 700, lineHeight: '28px' }}>{title}</h1>
          <p className="text-[#2f3031]" style={{ fontSize: '14px', lineHeight: '20px' }}>{subtitle}</p>
        </div>
        <div className="bg-white border border-[#efefef] rounded-[6px] overflow-hidden">{children}</div>
      </div>
    </KepegawaianLayout>
  );
}

function Tabs({ tabs, active, onChange }: { tabs: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div className="grid border-b border-[#e4e4e4]" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
      {tabs.map((t, i) => (
        <button key={t} onClick={() => onChange(i)} className={`py-[16px] border-b-[3px] ${i === active ? 'border-[#1a5fe0]' : 'border-transparent'}`} style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
          {t}
        </button>
      ))}
    </div>
  );
}

const nomorTanggal = (no: string, tgl: string) => (
  <div className="flex flex-col"><span>{no}</span><span className="text-[#8a8d90]" style={{ fontSize: 'var(--text-xs)' }}>{tgl}</span></div>
);

const skCols: Column[] = [
  { key: 'no', label: 'No', width: '48px' },
  { key: 'pemilik', label: 'Pemilik SK' },
  { key: 'kategori', label: 'Kategori SK' },
  { key: 'nomor', label: 'Nomor & Tanggal SK' },
  { key: 'gol', label: 'Golongan', width: '90px' },
  { key: 'jabatan', label: 'Jabatan' },
  { key: 'unit', label: 'Unit Kerja' },
  { key: 'status', label: 'Status', width: '130px' },
  { key: 'aksi', label: 'Aksi', width: '60px' },
];

const sampleSK = [
  ['Pegawai Contoh Satu', '100000000000000001', 'SK MUTASI', '001/01/2026', '23 September 2025', 'IV/a', 'Sedang Dikoreksi'],
  ['Pegawai Contoh Satu', '100000000000000001', 'SK KENAIKAN GAJI', '002/03/2026', '17 September 2025', 'IV/a', 'Sudah Dikoreksi & Dikembalikan'],
  ['Pegawai Contoh Dua', '100000000000000002', 'SK KENAIKAN PANGKAT PEGAWAI', '003/SK/2026', '5 September 2025', 'III/b', 'Sudah dikirim'],
  ['Pegawai Contoh Tiga', '100000000000000003', 'SK MUTASI PERMINTAAN SENDIRI', '004/B/07/2025', '27 Juli 2025', 'III/d', 'Sedang Dikoreksi'],
].map(([nama, nip, kat, no, tgl, gol, st], i) => ({
  no: i + 1, pemilik: <PersonCell name={nama} nip={nip} />, kategori: kat, nomor: nomorTanggal(no, tgl), gol,
  jabatan: 'Bidang Tata Kelola Sistem Pemerintahan Berbasis Elektronik dan Transformasi Digital', unit: UNIT_PUSDATIN,
  status: st, aksi: <MoreAction />,
}));

export function DaftarSemuaSKPage() {
  const [tab, setTab] = useState(0);
  const filtered = [sampleSK, sampleSK.filter((r) => r.status === 'Sedang Dikoreksi'), sampleSK.filter((r) => r.status.includes('Dikembalikan')), []][tab];
  return (
    <PageShell title="Daftar Semua SK" subtitle="Kelola seluruh data Surat Keputusan (SK) yang tersedia">
      <Tabs tabs={['Seluruh SK', 'Menunggu Dikoreksi', 'SK Dikembalikan', 'Menunggu TTD']} active={tab} onChange={setTab} />
      <StagingDataTable columns={skCols} rows={filtered} />
    </PageShell>
  );
}

const skSelectCols: Column[] = [
  { key: 'cb', label: '', width: '36px' },
  { key: 'no', label: 'No', width: '48px' },
  { key: 'pemilik', label: 'Pemilik SK' },
  { key: 'kategori', label: 'Kategori SK' },
  { key: 'nomor', label: 'Nomor & Tanggal SK' },
  { key: 'gol', label: 'Golongan', width: '90px' },
  { key: 'jabatan', label: 'Jabatan' },
  { key: 'pangkat', label: 'Pangkat' },
  { key: 'unit', label: 'Unit Kerja' },
  { key: 'aksi', label: 'Aksi', width: '60px' },
];

export function KoreksiSKPage() {
  const [tab, setTab] = useState(0);
  return (
    <PageShell title="Koreksi SK" subtitle="Kelola data koreksi Surat Keputusan (SK) yang tersedia">
      <Tabs tabs={['Belum Koreksi', 'Sudah Koreksi', 'Antrean Koreksi']} active={tab} onChange={setTab} />
      <StagingDataTable columns={skSelectCols} rows={[]} />
    </PageShell>
  );
}

export function TandaTanganSKPage() {
  const [tab, setTab] = useState(0);
  return (
    <PageShell title="Tanda Tangan SK" subtitle="Kelola data tanda tangan Surat Keputusan (SK) yang tersedia">
      <Tabs tabs={['Belum Tanda Tangan', 'Sudah Tanda Tangan', 'Antrean Tanda Tangan']} active={tab} onChange={setTab} />
      <StagingDataTable columns={skSelectCols} rows={[]} />
    </PageShell>
  );
}

export function RiwayatSKIndividuPage() {
  const cols: Column[] = [
    { key: 'no', label: 'No', width: '48px' },
    { key: 'kategori', label: 'Kategori SK' },
    { key: 'nomor', label: 'Nomor & Tanggal SK' },
    { key: 'unit', label: 'Unit Kerja' },
    { key: 'status', label: 'Status' },
    { key: 'aksi', label: 'Aksi', width: '60px' },
  ];
  return (
    <PageShell title="Riwayat SK Individu" subtitle="Lihat riwayat Surat Keputusan (SK) yang pernah diterbitkan untuk Anda">
      <StagingDataTable columns={cols} rows={[]} />
    </PageShell>
  );
}

export function LogTandaTanganSKPage() {
  const cols: Column[] = [
    { key: 'no', label: 'No', width: '48px' },
    { key: 'pegawai', label: 'Pegawai' },
    { key: 'status', label: 'Status', width: '110px' },
    { key: 'ket', label: 'Keterangan' },
    { key: 'file', label: 'ID File' },
    { key: 'tgl', label: 'Tanggal' },
    { key: 'nik', label: 'NIK Penandatangan' },
    { key: 'aksi', label: 'Aksi', width: '60px' },
  ];
  const rows = [
    ['Pegawai Contoh Satu', 'Berhasil', 'Berhasil tandatangan.'],
    ['Pegawai Contoh Dua', 'Gagal', '{"error":"Internal Server Error","status_code":0}'],
    ['Pegawai Contoh Tiga', 'Berhasil', 'Berhasil tandatangan.'],
  ].map(([nama, st, ket], i) => ({
    no: i + 1, pegawai: nama, status: <Chip tone={st === 'Berhasil' ? 'green' : 'red'}>{st}</Chip>, ket,
    file: `contoh-file-${i + 1}`, tgl: '2 November 2026', nik: '••••••••••••', aksi: <MoreAction />,
  }));
  return (
    <PageShell title="Log Tanda Tangan SK" subtitle="Lihat log aktivitas tanda tangan digital untuk Surat Keputusan (SK)">
      <StagingDataTable columns={cols} rows={rows} />
    </PageShell>
  );
}
