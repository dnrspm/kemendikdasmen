import { useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { StagingDataTable, PersonCell, Chip, EyeAction, MoreAction, type Column } from '@/app/components/StagingDataTable';

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

type Usulan = { data: string; jenis: 'Tambah' | 'Hapus'; detail: [string, string][] };

const detailPasangan: [string, string][] = [
  ['Pasangan Ke', '3'], ['Status ASN', 'Bukan ASN'], ['Status Hidup', 'Hidup'], ['Status Pernikahan', 'Menikah'], ['NIP', '-'],
  ['Nama', 'Pasangan Contoh'], ['Tanggal Lahir', '29 Oktober 2026'], ['Jenis Kelamin', 'Perempuan'], ['Agama', 'Islam'],
  ['Nomor KK', '0000000000000000'], ['Jenis Dokumen Identitas', 'KTP'], ['Nomor Identitas', '0000000000000000'],
  ['Nomor Akta Menikah', '0000000'], ['Tanggal Akta Menikah', '29 Oktober 2026'], ['Nomor Akta Cerai', '-'],
  ['Tanggal Akta Cerai', '-'], ['No. Akta Meninggal', '-'], ['Tanggal Meninggal', '-'], ['Nomor HP', '-'], ['Email', '-'], ['Alamat', '-'],
];
const detailOrtu: [string, string][] = [
  ['Hubungan', 'Ayah'], ['Status Hidup', 'Masih Hidup'], ['Status ASN', 'Bukan ASN'], ['NIP', '-'], ['Nama', 'Orang Tua Contoh'],
  ['Tanggal Lahir', '-'], ['Jenis Identitas', '-'], ['Nomor Identitas', '-'], ['Nomor HP', '-'], ['Email', '-'], ['Alamat', '-'],
];

function DetailUsulanModal({ usulan, onClose }: { usulan: Usulan; onClose: () => void }) {
  const done = (msg: string) => { toast.info(`Prototipe: ${msg} (tidak dikirim ke server).`); onClose(); };
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 grid place-items-center p-[16px]" onClick={onClose} role="presentation">
      <div role="dialog" aria-label="Detail Usulan Perubahan" onClick={(e) => e.stopPropagation()} className="bg-white rounded-[12px] w-full max-w-[880px] max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#e4e4e4]">
          <h2 style={{ fontSize: 'var(--text-lg)' }}>Detail Usulan Perubahan: <b className="uppercase">{usulan.data}</b></h2>
          <button onClick={onClose} aria-label="Close" className="border border-[#1a5fe0] rounded-[4px] p-[2px]"><X className="size-[16px] text-[#1a5fe0]" /></button>
        </div>
        <div className="overflow-y-auto p-[20px] flex flex-col gap-[14px]">
          <div className="flex items-center gap-[14px] bg-[#f4f4f4] rounded-[8px] p-[12px]">
            <div className="size-[48px] rounded-full bg-[#d6e6fd]" />
            <div>
              <p className="font-semibold">{AHMAD}</p>
              <p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>{AHMAD_NIP}</p>
              <p className="flex gap-[6px] flex-wrap mt-[2px]"><Chip tone="blue">III/d</Chip><Chip tone="green">PNS</Chip><span style={{ fontSize: '11px' }}>Kepala Seksi Pemetaan Mutu dan Supervisi Lembaga Penjaminan Mutu Pendidikan Banten</span></p>
            </div>
          </div>
          <div className="border border-[#efefef] rounded-[6px] overflow-hidden">
            <div className="flex items-center justify-between bg-[#f4f4f4] px-[14px] py-[8px]">
              <span className="flex items-center gap-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>Detail <Chip tone={usulan.jenis === 'Tambah' ? 'green' : 'red'}>{usulan.jenis === 'Tambah' ? 'Penambahan Data' : 'Penghapusan Data'}</Chip></span>
              <span style={{ fontSize: 'var(--text-xs)' }}>Diajukan pada: 29 Oktober 2026 09:32 WIB</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[16px] gap-y-[12px] p-[14px]">
              {usulan.detail.map(([k, v]) => (
                <div key={k}>
                  <p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>{k}</p>
                  <p className="font-semibold text-[#2d8a4e]" style={{ fontSize: 'var(--text-sm)' }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-[20px] py-[12px] border-t border-[#e4e4e4]">
          <button onClick={onClose} className="border border-[#a8a8a8] rounded-[4px] px-[16px] py-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>Batal</button>
          <div className="flex gap-[8px]">
            <button onClick={() => done('usulan ditolak')} className="bg-[#e0243a] text-white rounded-[4px] px-[16px] py-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>✕ Tolak</button>
            <button onClick={() => done('usulan disetujui')} className="bg-[#1a5fe0] text-white rounded-[4px] px-[16px] py-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>✓ Setujui</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VerifikasiPerubahanPage() {
  const [selected, setSelected] = useState<Usulan | null>(null);
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
    status: 'Menunggu diverifikasi',
    aksi: <EyeAction onClick={() => setSelected({ data, jenis, detail: data === 'Pasangan' ? detailPasangan : detailOrtu })} />,
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
      {selected && <DetailUsulanModal usulan={selected} onClose={() => setSelected(null)} />}
    </PageShell>
  );
}
