import { useState, type ReactNode } from 'react';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { StagingDataTable, PersonCell, Chip, EyeAction, MoreAction, type Column } from '@/app/components/StagingDataTable';

const UNIT = 'Balai Penjaminan Mutu Pendidikan Provinsi D.K.I. Jakarta - Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah - Kementerian Pendidikan Dasar dan Menengah - KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH';
const AHMAD = 'Prof. Dr. AHMAD WIJAYA M.M.';
const AHMAD_NIP = '198704182018031001';

function PageShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <KepegawaianLayout>
      <div className="p-[20px] flex flex-col gap-[12px]">
        <div>
          <h1 className="font-semibold text-[#2f3031]" style={{ fontSize: '24px' }}>{title}</h1>
          <p className="text-[#2f3031]" style={{ fontSize: 'var(--text-sm)' }}>{subtitle}</p>
        </div>
        <div className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden">{children}</div>
      </div>
    </KepegawaianLayout>
  );
}

function Tabs({ tabs, active, onChange }: { tabs: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div className="grid border-b border-[#e4e4e4]" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
      {tabs.map((t, i) => (
        <button key={t} onClick={() => onChange(i)} className={`py-[16px] border-b-[3px] ${i === active ? 'border-[#1a5fe0]' : 'border-transparent'}`} style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
          {t}
        </button>
      ))}
    </div>
  );
}

const pegawaiCols: Column[] = [
  { key: 'no', label: 'No', width: '48px' },
  { key: 'nama', label: 'Nama Pegawai' },
  { key: 'gol', label: 'Golongan', width: '100px' },
  { key: 'jabatan', label: 'Jabatan' },
  { key: 'unit', label: 'Unit Kerja' },
  { key: 'status', label: 'Status Pegawai', width: '110px' },
  { key: 'aksi', label: 'Aksi', width: '60px' },
];

export function DataPegawaiAktifPage() {
  const [tab, setTab] = useState(0);
  return (
    <PageShell title="Data Pegawai Aktif" subtitle="Kelola data pegawai aktif (PNS, CPNS, MPP) - tidak termasuk yang sudah pensiun, berhenti, atau meninggal">
      <Tabs tabs={['Semua Pegawai', 'PNS MPP']} active={tab} onChange={setTab} />
      <StagingDataTable
        title="Daftar Pegawai Aktif"
        subtitle="Klik pada status pegawai untuk mengubah statusnya"
        columns={pegawaiCols}
        rows={tab === 0 ? [{
          no: 1, nama: <PersonCell name={AHMAD} nip={AHMAD_NIP} />, gol: 'III/d',
          jabatan: 'Kepala Seksi Pemetaan Mutu dan Supervisi Lembaga Penjaminan Mutu Pendidikan Banten',
          unit: UNIT, status: <Chip tone="blue">PNS</Chip>, aksi: <MoreAction />,
        }] : []}
      />
    </PageShell>
  );
}

export function DataPPPKPage() {
  return (
    <PageShell title="Data PPPK" subtitle="Kelola data Pegawai Pemerintah dengan Perjanjian Kerja (PPPK) yang terdaftar">
      <StagingDataTable title="Daftar PPPK (0)" columns={pegawaiCols} rows={[]} />
    </PageShell>
  );
}

export function DataNonAktifPage() {
  return (
    <PageShell title="Data Pegawai Non Aktif" subtitle="Kelola data pegawai yang sudah tidak aktif karena pensiun, berhenti, atau meninggal">
      <StagingDataTable
        title="Daftar Pegawai Non Aktif (1)"
        columns={pegawaiCols}
        rows={[{
          no: 1, nama: <PersonCell name="Prof. Dr. Dummy Pegawai 1 S.Kom, MM, PhD" nip="GEN000000000000001" />, gol: '-',
          jabatan: 'Data tidak lengkap', unit: UNIT, status: <Chip tone="blue">PNS</Chip>, aksi: <MoreAction />,
        }]}
      />
    </PageShell>
  );
}

export function VerifikasiPerubahanPage() {
  const [tab, setTab] = useState(0);
  const cols: Column[] = [
    { key: 'no', label: 'No', width: '48px' },
    { key: 'nama', label: 'Nama Pegawai' },
    { key: 'unit', label: 'Unit Kerja' },
    { key: 'data', label: 'Perubahan Data', width: '130px' },
    { key: 'jenis', label: 'Jenis Perubahan', width: '130px' },
    { key: 'status', label: 'Status Pengusulan', width: '160px' },
    { key: 'aksi', label: 'Aksi', width: '60px' },
  ];
  const mk = (n: number, nama: ReactNode, data: string, jenis: 'Tambah' | 'Hapus') => ({
    no: n, nama, unit: UNIT, data, jenis: <Chip tone={jenis === 'Tambah' ? 'green' : 'red'}>{jenis}</Chip>,
    status: 'Menunggu diverifikasi', aksi: <EyeAction />,
  });
  const ahmad = <PersonCell name={AHMAD} nip={AHMAD_NIP} />;
  const rows = [
    mk(1, ahmad, 'Pasangan', 'Tambah'),
    mk(2, ahmad, 'Orang Tua', 'Tambah'),
    mk(3, ahmad, 'Orang Tua', 'Hapus'),
    mk(4, <PersonCell name="Prof. Dr. Dummy Pegawai 1 S.Kom, MM, PhD" nip="GEN000000000000001" />, 'Orang Tua', 'Tambah'),
  ];
  return (
    <PageShell title="Verifikasi Perubahan Data" subtitle="Kelola dan verifikasi perubahan data yang diajukan oleh pegawai">
      <Tabs tabs={['Daftar Usulan Perubahan Data', 'Daftar Usulan yang Telah Ditinjau']} active={tab} onChange={setTab} />
      <StagingDataTable columns={cols} rows={tab === 0 ? rows : []} />
    </PageShell>
  );
}
