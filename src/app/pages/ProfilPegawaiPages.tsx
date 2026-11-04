import { useState, type ReactNode } from 'react';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { StagingDataTable, PersonCell, Chip, MoreAction, type Column } from '@/app/components/StagingDataTable';

const UNIT = 'Balai Penjaminan Mutu Pendidikan Provinsi D.K.I. Jakarta - Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah - Kementerian Pendidikan Dasar dan Menengah - KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH';
const AHMAD = 'Prof. Dr. AHMAD WIJAYA M.M.';
const AHMAD_NIP = '198704182018031001';

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
        title={`Daftar Pegawai Aktif (${tab === 0 ? 1 : 0})`}
        subtitle="Klik pada status pegawai untuk mengubah statusnya"
        columns={pegawaiCols}
        rows={tab === 0 ? [{
          no: 1, nama: <PersonCell name={AHMAD} nip={AHMAD_NIP} />, gol: <span style={{ fontSize: '14px', fontWeight: 700, lineHeight: '20px' }}>III/d</span>,
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
