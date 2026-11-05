import { useState, type ReactNode } from 'react';
import { Badge } from 'seragam-design-system';
import { useNavigate } from 'react-router';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { StagingDataTable, PersonCell, Chip, type Column } from '@/app/components/StagingDataTable';
import { Tabs } from 'seragam-design-system';
import { AksiCell } from '@/app/components/AksiCell';

const UNIT = 'Balai Penjaminan Mutu Pendidikan Provinsi D.K.I. Jakarta - Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah - Kementerian Pendidikan Dasar dan Menengah - KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH';
const AHMAD = 'Prof. Dr. AHMAD WIJAYA M.M.';
const AHMAD_NIP = '198704182018031001';

function PageShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <KepegawaianLayout>
      <div className="px-[24px] pt-[24px] pb-[64px] flex flex-col gap-[16px]">
        <div>
          <h1 className="text-sd-gray-90" style={{ fontSize: '24px', fontWeight: 600, lineHeight: '28px' }}>{title}</h1>
          <p className="text-sd-gray-90" style={{ fontSize: '13px', lineHeight: '20px' }}>{subtitle}</p>
        </div>
        <div className="bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.08),0_2px_1px_-1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.10)] rounded-[8px] overflow-hidden">{children}</div>
      </div>
    </KepegawaianLayout>
  );
}

const pegawaiCols: Column[] = [
  { key: 'no', label: 'No', width: '48px' },
  { key: 'nama', label: 'Nama Pegawai' },
  { key: 'gol', label: 'Golongan', width: '100px' },
  { key: 'jabatan', label: 'Jabatan' },
  { key: 'unit', label: 'Unit Kerja' },
  { key: 'status', label: 'Status Pegawai', width: '110px' },
  { key: 'aksi', label: 'Aksi', width: '170px' },
];

export function DataPegawaiAktifPage() {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  return (
    <PageShell title="Data Pegawai Aktif" subtitle="Kelola data pegawai aktif (PNS, CPNS, MPP) - tidak termasuk yang sudah pensiun, berhenti, atau meninggal">
      <Tabs fill items={['Semua Pegawai', 'PNS MPP']} active={tab} onChange={setTab} />
      <StagingDataTable
        title={`Daftar Pegawai Aktif (${tab === 0 ? 1 : 0})`}
        subtitle="Klik pada status pegawai untuk mengubah statusnya"
        columns={pegawaiCols}
        rows={tab === 0 ? [{
          no: 1, nama: <PersonCell name={AHMAD} nip={AHMAD_NIP} />, gol: <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '13px', fontWeight: 700, lineHeight: '20px' }}>III/d</span>,
          jabatan: 'Kepala Seksi Pemetaan Mutu dan Supervisi Lembaga Penjaminan Mutu Pendidikan Banten',
          unit: UNIT, status: <Chip tone="green">PNS</Chip>, aksi: <AksiCell items={[{ label: 'Lihat & Ubah Data', onClick: () => navigate(`/kepegawaian/ubah-pegawai/${AHMAD_NIP}?tipe=aktif`) }]} />,
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
  const navigate = useNavigate();
  return (
    <PageShell title="Data Pegawai Non Aktif" subtitle="Kelola data pegawai yang sudah tidak aktif karena pensiun, berhenti, atau meninggal">
      <StagingDataTable
        title="Daftar Pegawai Non Aktif (1)"
        columns={pegawaiCols}
        rows={[{
          no: 1, nama: <PersonCell name="Prof. Dr. Dummy Pegawai 1 S.Kom, MM, PhD" nip="GEN000000000000001" />,
          gol: <span className="text-sd-red-60">Data tidak lengkap</span>, jabatan: '-', unit: UNIT,
          status: <Badge>PNS</Badge>,
          aksi: <AksiCell items={[{ label: 'Lihat & Ubah Data', onClick: () => navigate('/kepegawaian/ubah-pegawai/GEN000000000000001?tipe=nonaktif') }]} />,
        }]}
      />
    </PageShell>
  );
}
