import { useState, type ReactNode } from 'react';
import { ArrowLeft, Download, Filter, ChevronDown } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, LabelList, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Header } from '@/app/components/Header';

const BLUE = '#3578c0';
const tabs = ['Ringkasan Umum ASN', 'Jenjang Pendidikan ASN', 'Gambaran Umum Unit Organisasi', 'Matriks Komparasi'];

const stats = [
  ['Total Pegawai', 75], ['Total PNS', 40], ['Total PPPK', 3], ['PPPK PARUH WAKTU', 2], ['NON ASN', 7],
] as const;

const gender = [
  { name: 'Laki-laki', value: 29, fill: '#1fa57a' },
  { name: 'Perempuan', value: 12, fill: '#6db1ea' },
  { name: 'Belum diketahui', value: 1, fill: '#e9a93a' },
  { name: '-', value: 9, fill: '#e9a93a' },
  { name: '- ', value: 9, fill: '#8678d9' },
  { name: 'Belum diketahui ', value: 15, fill: '#3578c0' },
];
const usia = [['<=25', 1], ['26-30', 0], ['31-35', 12], ['36-40', 35], ['41-45', 5], ['46-50', 2], ['>50', 3]];
const golPPPK = [['PPP-B', 1], ['PPP-C', 1], ['PPP-D', 1]];
const masaKerja = [['<5', 2], ['5-10', 4], ['11-15', 5], ['16-20', 3], ['>20', 12]];
const golPNS = [['II/d', 1], ['III/a', 2], ['III/b', 6], ['III/c', 1], ['III/d', 5], ['IV/a', 1], ['IV/b', 2], ['Belum diketahui', 22]];
const angkatan = [['2019', 0], ['2020', 1], ['2021', 0], ['2022', 2], ['2023', 0], ['2024', 0], ['2025', 0], ['2026', 0], ['Belum diketahui', 49]];
const pensiun = [['2026', 0], ['2027', 1], ['2028', 0], ['2029', 0], ['2030', 0]];

const pendidikan = [['S3', 1], ['S2', 7], ['S1/D4', 24], ['D3/D2/D1', 6], ['SMA/ sederajat', 4], ['SMP/ sederajat', 2], ['SD/ sederajat', 1], ['Belum diketahui', 30]];

const toData = (rows: (string | number)[][]) => rows.map(([name, value]) => ({ name, value }));

function Card({ title, right, children, className = '' }: { title: string; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden ${className}`}>
      <header className="flex items-center justify-between px-[16px] py-[12px] border-b border-[#eee]">
        <h3 className="text-[#65696c]" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{title}</h3>
        {right}
      </header>
      <div className="p-[16px]">{children}</div>
    </section>
  );
}

function BarCard({ title, rows, xLabel, right, className }: { title: string; rows: (string | number)[][]; xLabel: string; right?: ReactNode; className?: string }) {
  return (
    <Card title={title} right={right} className={className}>
      <p className="text-[#65696c] mb-[4px]" style={{ fontSize: '11px' }}>Jumlah Pegawai</p>
      <div style={{ height: 270 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={toData(rows)} margin={{ top: 20, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid vertical={false} stroke="#e4e4e4" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} label={{ value: xLabel, position: 'insideBottomRight', offset: -4, fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
            <Bar dataKey="value" fill={BLUE} maxBarSize={60}>
              <LabelList dataKey="value" position="top" fontSize={11} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function Pill({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-full border px-[12px] py-[2px] ${active ? 'border-[#1a5fe0] bg-[#eaf3fe] text-[#1a5fe0]' : 'border-[#2f3031]'}`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
      {children}
    </button>
  );
}

function Ringkasan() {
  const [usiaMode, setUsiaMode] = useState<'rentang' | 'generasi'>('rentang');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-[16px]">
      <Card title="Komposisi Jenis Kelamin">
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={gender} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} isAnimationActive={false} label={({ name, value }) => `${String(name).trim()} ${value}`} labelLine>
                {gender.map((g) => <Cell key={g.name} fill={g.fill} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <BarCard
        title="Distribusi Usia"
        rows={usiaMode === 'rentang' ? usia : usia.map(([n, v]) => [n, v])}
        xLabel="Kategori Usia"
        right={<div className="flex gap-[8px]"><Pill active={usiaMode === 'rentang'} onClick={() => setUsiaMode('rentang')}>Rentang Usia</Pill><Pill active={usiaMode === 'generasi'} onClick={() => setUsiaMode('generasi')}>Generasi</Pill></div>}
      />
      <BarCard title="Distribusi Golongan PPPK" rows={golPPPK} xLabel="Golongan PPPK" />
      <BarCard title="Distribusi Masa Kerja" rows={masaKerja} xLabel="Masa Kerja" />
      <BarCard title="Distribusi Golongan PNS" rows={golPNS} xLabel="Golongan PNS" />
      <BarCard title="Angkatan ASN Berdasarkan TMT CPNS" rows={angkatan} xLabel="Tahun" />
      <BarCard title="Proyeksi Pensiun 5 Tahun ke Depan" rows={pensiun} xLabel="Tahun" className="lg:col-span-2" />
    </div>
  );
}

function Pendidikan() {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        <div className="bg-white border border-[#e4e4e4] rounded-[8px] p-[16px]">
          <p className="text-[#65696c]" style={{ fontSize: 'var(--text-sm)' }}>Jenjang Pendidikan Terbanyak</p>
          <p className="font-semibold text-[#2f3031]" style={{ fontSize: '24px' }}>Belum diketahui</p>
          <p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>30 pegawai</p>
        </div>
        <div className="bg-white border border-[#e4e4e4] rounded-[8px] p-[16px]">
          <p className="text-[#65696c]" style={{ fontSize: 'var(--text-sm)' }}>Proporsi S2/S3</p>
          <p className="font-semibold text-[#2f3031]" style={{ fontSize: '24px' }}>8</p>
          <p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>pegawai</p>
        </div>
      </div>
      <BarCard title="Distribusi Pendidikan Terakhir" rows={pendidikan} xLabel="Jenjang Pendidikan" />
    </div>
  );
}

export function ProfilASNStagingPage({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState(0);
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Header />
      <div className="bg-white">
        <div className="max-w-[1280px] mx-auto px-[24px] pt-[24px]">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-[6px] text-[#2f3031]" style={{ fontSize: 'var(--text-sm)' }}>
              <ArrowLeft className="size-[14px]" /> Kembali
            </button>
            <span className="flex items-center gap-[6px] text-[#2f3031]" style={{ fontSize: 'var(--text-sm)' }}>
              <span className="size-[8px] rounded-full bg-[#1fa57a]" /> Data diperbarui pada 02/11/2026 01:00 WIB
            </span>
          </div>
          <h1 className="font-semibold text-[#2f3031] mt-[12px]" style={{ fontSize: '24px' }}>Profil ASN Kemendikdasmen</h1>
          <p className="text-[#2f3031]" style={{ fontSize: 'var(--text-sm)' }}>Lihat statistik dan profil ASN Kemendikdasmen secara agregat</p>
          <div className="flex items-end justify-between mt-[16px]">
            <div className="flex gap-[24px] overflow-x-auto">
              {tabs.map((t, i) => (
                <button key={t} onClick={() => setTab(i)} className={`py-[14px] whitespace-nowrap border-b-[3px] ${i === tab ? 'border-[#1a5fe0]' : 'border-transparent'}`} style={{ fontSize: 'var(--text-base)', fontWeight: i === tab ? 600 : 500 }}>
                  {t}
                </button>
              ))}
            </div>
            <button className="mb-[8px] bg-[#2f3031] text-white rounded-[4px] px-[16px] py-[10px] flex items-center gap-[8px] font-semibold">
              <Download className="size-[16px]" /> Export
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-[24px] py-[16px] flex flex-col gap-[16px]">
        <div className="bg-white border border-[#e4e4e4] rounded-[8px] px-[16px] py-[10px] flex items-center gap-[10px] flex-wrap" style={{ fontSize: 'var(--text-sm)' }}>
          <Filter className="size-[16px]" /> <span className="font-semibold">Filter</span>
          {['Unit Kerja: Seluruh', 'Jabatan: Seluruh', 'Mode: Absolut', 'Periode: View Terbaru'].map((f) => {
            const [k, v] = f.split(': ');
            return <span key={f} className="rounded-full border border-[#2f3031] px-[10px] py-[1px]"><b>{k}:</b> {v}</span>;
          })}
          <button className="ml-auto border border-[#1a5fe0] text-[#1a5fe0] rounded-[4px] px-[12px] py-[4px] font-semibold flex items-center gap-[6px]">
            Ubah filter <ChevronDown className="size-[14px]" />
          </button>
        </div>

        {tab <= 1 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-[16px]">
            {stats.map(([label, value], i) => (
              <div key={label} className={`rounded-[8px] border p-[14px] ${i === 0 ? 'bg-[#4a8bf0] text-white border-[#4a8bf0]' : 'bg-white border-[#e4e4e4]'}`}>
                <p style={{ fontSize: 'var(--text-sm)' }}>{label}</p>
                <p className="font-semibold" style={{ fontSize: '28px' }}>{value}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 0 && <Ringkasan />}
        {tab === 1 && <Pendidikan />}
        {tab > 1 && (
          <div className="bg-white border border-[#e4e4e4] rounded-[8px] p-[24px] text-[#65696c]" style={{ fontSize: 'var(--text-sm)' }}>
            Tab {tabs[tab]} belum disalin dari portal staging.
          </div>
        )}
      </div>
    </div>
  );
}
