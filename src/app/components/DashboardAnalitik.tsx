import React, { useState } from 'react';
import { ChevronRight, Home, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, CheckCircle, FileText, Users, Building2, Target } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie, LabelList, ScatterChart, Scatter, ZAxis, ReferenceLine } from 'recharts';
import { HierarchicalFilter } from './HierarchicalFilter';
import { generateUnitChartData } from './dashboardAnalitikData';

interface DashboardAnalitikProps {
  onBack: () => void;
  onBackToHome: () => void;
}

type TabType = 'ringkasan' | 'jabatan' | 'kinerja' | 'tata-kelola';


export function DashboardAnalitik({ onBack, onBackToHome }: DashboardAnalitikProps) {
  const [activeTab, setActiveTab] = useState<TabType>('ringkasan');
  const [selectedUnit, setSelectedUnit] = useState<string>('kementerian');
  const [selectedJabatan, setSelectedJabatan] = useState<string>('semua');

  const unitData = generateUnitChartData(selectedUnit);

  return (
    <div className="bg-sd-gray-0 min-h-screen w-full flex flex-col">
      {/* Header */}
      <Header onLogoClick={onBackToHome} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-sd-badge-neutral">
        <div className="px-[24px] py-[16px]">
          <nav className="flex items-center gap-[8px]" aria-label="Breadcrumb">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-[6px] text-[var(--text-sm)] text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="w-[16px] h-[16px]" />
              <span>Beranda</span>
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <span className="text-[var(--text-sm)] text-foreground font-[var(--font-weight-medium)]">Dasbor Eksekutif</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-sd-badge-neutral">
        <div className="px-[24px] py-[20px]">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[4px]">Dasbor Eksekutif</h1>
              <p className="text-[var(--text-sm)] text-sd-gray-60">Dasbor Eksekutif SDM ASN</p>
            </div>

            {/* Filters */}
            <div className="flex items-end gap-[16px] ml-auto">
              {/* Filter Jabatan */}
              <div className="flex flex-col gap-[6px]">
                <span className="text-[var(--text-sm)] text-sd-gray-90"> Filter Jabatan</span>
                <select
                  value={selectedJabatan}
                  onChange={(e) => setSelectedJabatan(e.target.value)}
                  className="h-[42px] min-w-[260px] max-w-[420px] px-[13px] bg-white border border-sd-gray-50 rounded-[4px] text-[var(--text-sm)] text-sd-gray-90 appearance-none pr-[36px] outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%23656A6C' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                >
                  <option value="semua">Semua Jabatan</option>
                  <option value="manajerial">Manajerial</option>
                  <option value="jpt">JPT Madya & Pratama</option>
                  <option value="administrator">Administrator</option>
                  <option value="pengawas">Pengawas</option>
                  <option value="fungsional">Fungsional</option>
                  <option value="pelaksana">Pelaksana</option>
                </select>
              </div>

              {/* Filter Unit */}
              <div className="flex flex-col gap-[6px]">
                <span className="text-[var(--text-sm)] text-sd-gray-90"> Filter Unit</span>
                <HierarchicalFilter selectedUnit={selectedUnit} onSelect={setSelectedUnit} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[240px] bg-white border-r border-sd-badge-neutral overflow-y-auto sticky top-[64px] self-start h-[calc(100vh-64px)] z-40">
          <nav className="p-[16px]">
            <div className="space-y-[4px]">
              <button
                onClick={() => setActiveTab('ringkasan')}
                className={`w-full flex items-center justify-start gap-[12px] px-[12px] py-[10px] text-[var(--text-sm)] font-[var(--font-weight-medium)] rounded-[6px] transition-colors ${
                  activeTab === 'ringkasan'
                    ? 'bg-primary/10 text-primary'
                    : 'text-sd-gray-60 hover:bg-sd-gray-0 hover:text-foreground'
                }`}
              >
                <FileText className="w-[18px] h-[18px]" />
                <span className="text-left">Ringkasan Eksekutif</span>
              </button>
              <button
                onClick={() => setActiveTab('jabatan')}
                className={`w-full flex items-center justify-start gap-[12px] px-[12px] py-[10px] text-[var(--text-sm)] font-[var(--font-weight-medium)] rounded-[6px] transition-colors ${
                  activeTab === 'jabatan'
                    ? 'bg-primary/10 text-primary'
                    : 'text-sd-gray-60 hover:bg-sd-gray-0 hover:text-foreground'
                }`}
              >
                <Building2 className="w-[18px] h-[18px]" />
                <span className="text-left">Jabatan</span>
              </button>
              <button
                onClick={() => setActiveTab('kinerja')}
                className={`w-full flex items-center justify-start gap-[12px] px-[12px] py-[10px] text-[var(--text-sm)] font-[var(--font-weight-medium)] rounded-[6px] transition-colors ${
                  activeTab === 'kinerja'
                    ? 'bg-primary/10 text-primary'
                    : 'text-sd-gray-60 hover:bg-sd-gray-0 hover:text-foreground'
                }`}
              >
                <Target className="w-[18px] h-[18px]" />
                <span className="text-left">Kinerja & Talenta ASN</span>
              </button>
              <button
                onClick={() => setActiveTab('tata-kelola')}
                className={`w-full flex items-center justify-start gap-[12px] px-[12px] py-[10px] text-[var(--text-sm)] font-[var(--font-weight-medium)] rounded-[6px] transition-colors ${
                  activeTab === 'tata-kelola'
                    ? 'bg-primary/10 text-primary'
                    : 'text-sd-gray-60 hover:bg-sd-gray-0 hover:text-foreground'
                }`}
              >
                <CheckCircle className="w-[18px] h-[18px]" />
                <span className="text-left">Tata Kelola Organisasi</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-[24px]">
            {activeTab === 'ringkasan' && <RingkasanEksekutif selectedUnit={selectedUnit} unitData={unitData} />}
            {activeTab === 'jabatan' && <KeterisianJabatan selectedUnit={selectedUnit} unitData={unitData} />}
            {activeTab === 'kinerja' && <KinerjaTalenta selectedUnit={selectedUnit} unitData={unitData} />}
            {activeTab === 'tata-kelola' && <TataKelolaOrganisasi selectedUnit={selectedUnit} unitData={unitData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Tab 1: Ringkasan Eksekutif
function RingkasanEksekutif({ selectedUnit, unitData }: { selectedUnit: string; unitData: any }) {
  const {
    kinerjaData, nineBoxData, trendSakipData, trendWBKData, trendWBBMData, trendZIStackedData, trendRBData,
    kinerjaPositifPct, talentaSuksesiStr, talentaPotensialStr, c5AsStr,
    jabatanStrukturalKosong, jabatanFungsionalKosong, jabatanKritis, eselon12,
    totalPensiun2026,
  } = unitData;
  const perhatianPct = 100 - kinerjaPositifPct;
  const keterisianPct: number = unitData.ketersisiaanJabatan;

  return (
    <div className="space-y-[32px]">
      {/* Page Title */}
      <div>
        <h2 className="text-[24px] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
          Ringkasan Eksekutif
        </h2>
        <p className="text-[var(--text-sm)] text-sd-gray-60">
          Update terakhir: 24 April 2026, 09:00 WIB
        </p>
      </div>

      {/* Sintesis Eksekutif — pembuka utama */}
      <div className="bg-sd-blue-90 rounded-[8px] p-[24px] text-white">
        <div className="flex items-center gap-[12px] mb-[16px]">
          <Lightbulb className="w-[24px] h-[24px]" />
          <h3 className="text-[18px] font-[var(--font-weight-semibold)]">
            Sintesis Eksekutif
          </h3>
        </div>

        <p className="text-[var(--text-base)] mb-[20px] opacity-90">
          Sebagai upaya tindak lanjut untuk menjaga stabilitas dan mendorong kinerja organisasi, berikut adalah langkah strategis yang perlu dieksekusi:
        </p>

        <div className="space-y-[16px]">
          <div className="flex gap-[12px]">
            <CheckCircle className="w-[20px] h-[20px] shrink-0 mt-[2px]" />
            <p className="text-[var(--text-base)]">
              Segera buka seleksi terbuka atau talent mobility untuk mengisi kekosongan {jabatanStrukturalKosong} Jabatan Manajerial dan {jabatanFungsionalKosong} Jabatan Fungsional Utama-Madya.
            </p>
          </div>
          <div className="flex gap-[12px]">
            <CheckCircle className="w-[20px] h-[20px] shrink-0 mt-[2px]" />
            <p className="text-[var(--text-base)]">
              Fokuskan program akselerasi pada unit dengan risiko pensiun tinggi di Triwulan 4 ({totalPensiun2026} proyeksi pensiun), dorong talent dari kelompok VII, VIII, IX ({talentaSuksesiStr}) untuk suksesi.
            </p>
          </div>
          <div className="flex gap-[12px]">
            <CheckCircle className="w-[20px] h-[20px] shrink-0 mt-[2px]" />
            <p className="text-[var(--text-base)]">
              Rancang program pengembangan kompetensi targeted untuk mendorong {c5AsStr} talent di kelompok V (Standar) agar bisa berkinerja lebih tinggi ke kelompok atas.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Sinyal Stabilitas Organisasi */}
      <div>
        <div className="mb-[20px]">
          <div className="flex items-center gap-[16px] mb-[4px]">
            <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90">Sinyal Stabilitas Organisasi</h3>
            <div className="flex-1 h-[1px] bg-sd-badge-neutral"></div>
          </div>
          <span className="text-[var(--text-xs)] text-sd-gray-60">Apakah struktur organisasi stabil dalam beberapa periode ke depan?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] mb-[20px]">
          {/* Snapshot keterisian */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[8px]">Keterisian Jabatan</div>
            <div className="text-[36px] font-[var(--font-weight-bold)] text-sd-gray-90 mb-[6px]">{keterisianPct}%</div>
            <div className="w-full bg-sd-badge-neutral rounded-full h-[6px] mb-[8px]">
              <div className="bg-sd-green-60 h-[6px] rounded-full" style={{ width: `${keterisianPct}%` }} />
            </div>
            <div className="flex justify-between text-[var(--text-xs)] text-sd-gray-40">
              <span>Terisi</span>
              <span>Kosong: {100 - keterisianPct}%</span>
            </div>
          </div>

          {/* Jabatan manajerial kosong */}
          <div className="bg-sd-warning-surface rounded-[8px] border border-sd-yellow-50 p-[20px]">
            <div className="text-[var(--text-xs)] text-sd-yellow-50 uppercase tracking-wide mb-[8px] font-[var(--font-weight-semibold)]">Jabatan Manajerial Kosong</div>
            <div className="text-[36px] font-[var(--font-weight-bold)] text-sd-gray-90 mb-[4px]">{jabatanStrukturalKosong}</div>
            <div className="text-[var(--text-xs)] text-sd-gray-60">
              JPT: <span className="font-[var(--font-weight-semibold)] text-sd-yellow-50">{eselon12}</span> | Admin: {Math.round(jabatanStrukturalKosong * 0.4)} | Pengawas: {Math.round(jabatanStrukturalKosong * 0.35)}
            </div>
          </div>

          {/* Proyeksi kekosongan pensiun */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[8px]">Proyeksi Pensiun 2026</div>
            <div className="text-[36px] font-[var(--font-weight-bold)] text-sd-red-60 mb-[4px]">{totalPensiun2026}</div>
            <div className="text-[var(--text-xs)] text-sd-gray-60">
              Manajerial pensiun: <span className="font-[var(--font-weight-semibold)]">{jabatanKritis}</span> | JPT: {eselon12}
            </div>
          </div>

          {/* Indikasi unit/jabatan paling rawan */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[8px]">Unit Paling Rawan</div>
            <div className="space-y-[6px]">
              <div className="flex items-center gap-[6px]">
                <div className="w-[6px] h-[6px] rounded-full bg-sd-red-60 shrink-0"></div>
                <span className="text-[var(--text-xs)] text-sd-gray-90">Biro OSDM — Vacancy + Pensiun</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="w-[6px] h-[6px] rounded-full bg-sd-yellow-50 shrink-0"></div>
                <span className="text-[var(--text-xs)] text-sd-gray-90">Ditjen GTK — Pensiun Tinggi</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="w-[6px] h-[6px] rounded-full bg-sd-yellow-50 shrink-0"></div>
                <span className="text-[var(--text-xs)] text-sd-gray-90">Dit. SMK — Pensiun Tinggi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Sinyal Kinerja dan Talenta */}
      <div>
        <div className="mb-[20px]">
          <div className="flex items-center gap-[16px] mb-[4px]">
            <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90">Sinyal Kinerja dan Talenta</h3>
            <div className="flex-1 h-[1px] bg-sd-badge-neutral"></div>
          </div>
          <span className="text-[var(--text-xs)] text-sd-gray-60">Apakah people engine organisasi cukup kuat?</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[20px]">
          {/* Distribusi Kinerja */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">Distribusi Hasil Kinerja ASN</h3>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[12px]">Triwulan 1 2026</p>
            <div className="flex items-center gap-[16px] mb-[16px]">
              <div className="text-center">
                <div className="text-[28px] font-[var(--font-weight-bold)] text-primary">{kinerjaPositifPct}%</div>
                <div className="text-[var(--text-xs)] text-sd-gray-60">Kinerja Positif</div>
              </div>
              <div className="flex-1 bg-sd-badge-neutral rounded-full h-[10px]">
                <div className="bg-primary h-[10px] rounded-full" style={{ width: `${kinerjaPositifPct}%` }} />
              </div>
              <div className="text-center">
                <div className="text-[28px] font-[var(--font-weight-bold)] text-sd-yellow-50">{perhatianPct}%</div>
                <div className="text-[var(--text-xs)] text-sd-gray-60">Perlu Perhatian</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={kinerjaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="var(--sd-blue-70)" fill="var(--sd-blue-70)" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Distribusi Kelompok Talenta */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] flex flex-col">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px] shrink-0">Distribusi Kelompok Talenta</h3>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[12px] shrink-0">Triwulan 1 2026 — Nine-Box</p>
            <div className="grid grid-cols-3 gap-[4px] flex-1 mb-[12px]">
              {[
                { label: 'Box 7-9', desc: 'Suksesi', color: 'var(--sd-green-60)', bg: 'var(--sd-green-5)', val: talentaSuksesiStr },
                { label: 'Box 4-6', desc: 'Standar+', color: 'var(--sd-yellow-50)', bg: 'var(--sd-warning-surface)', val: c5AsStr },
                { label: 'Box 1-3', desc: 'Perhatian', color: 'var(--sd-red-60)', bg: 'var(--sd-red-5)', val: `${perhatianPct}%` },
              ].map(g => (
                <div key={g.label} className="rounded-[6px] p-[10px] text-center flex flex-col items-center justify-center" style={{ backgroundColor: g.bg }}>
                  <div className="text-[var(--text-xs)] font-[var(--font-weight-semibold)] mb-[2px]" style={{ color: g.color }}>{g.label}</div>
                  <div className="text-[20px] font-[var(--font-weight-bold)]" style={{ color: g.color }}>{g.val}</div>
                  <div className="text-[var(--text-xs)]" style={{ color: g.color }}>{g.desc}</div>
                </div>
              ))}
            </div>
            <div className="p-[10px] rounded-[6px] bg-sd-gray-0 shrink-0">
              <p className="text-[var(--text-xs)] text-sd-gray-60">
                Unit dengan talenta paling berisiko (box 1-3 terbanyak): <span className="font-[var(--font-weight-semibold)] text-sd-red-60">Biro OSDM, Dit. SMK</span>
              </p>
            </div>
          </div>
        </div>

        {/* Pengembangan Kompetensi Snapshot */}
        <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
          <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">Snapshot Pengembangan Kompetensi</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
            <div>
              <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[8px]">Perencanaan Bangkom</div>
              <div className="text-[28px] font-[var(--font-weight-bold)] text-sd-gray-90 mb-[6px]">85%</div>
              <div className="w-full bg-sd-badge-neutral rounded-full h-[6px]">
                <div className="bg-primary h-[6px] rounded-full" style={{ width: '85%' }} />
              </div>
              <p className="text-[var(--text-xs)] text-sd-gray-40 mt-[4px]">Dari total pegawai telah memiliki rencana bangkom</p>
            </div>
            <div>
              <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[8px]">Realisasi Pelatihan</div>
              <div className="text-[28px] font-[var(--font-weight-bold)] text-sd-yellow-50 mb-[6px]">42.5%</div>
              <div className="w-full bg-sd-badge-neutral rounded-full h-[6px]">
                <div className="bg-sd-yellow-50 h-[6px] rounded-full" style={{ width: '42.5%' }} />
              </div>
              <p className="text-[var(--text-xs)] text-sd-gray-40 mt-[4px]">Dari yang telah berencana, baru 42.5% terealisasi</p>
            </div>
            <div>
              <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[8px]">Pegawai Capai Target 20 JP</div>
              <div className="text-[28px] font-[var(--font-weight-bold)] text-sd-red-60 mb-[6px]">7%</div>
              <div className="w-full bg-sd-badge-neutral rounded-full h-[6px]">
                <div className="bg-sd-red-60 h-[6px] rounded-full" style={{ width: '7%' }} />
              </div>
              <p className="text-[var(--text-xs)] text-sd-gray-40 mt-[4px]">Hanya 7% pegawai sudah memenuhi target minimal 20 JP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: 3-Column Cards Row — Detail */}
      <div>
        <div className="flex items-center gap-[16px] mb-[20px]">
          <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90">Detail Tiga Sinyal Utama</h3>
          <div className="flex-1 h-[1px] bg-sd-badge-neutral"></div>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
        {/* Card 1 — Kinerja Pegawai */}
        <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] flex flex-col">
          <div className="flex items-center justify-between mb-[16px] shrink-0">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90">
              Kinerja Pegawai
            </h3>
            <span className="px-[8px] py-[4px] rounded-[4px] text-[var(--text-xs)] bg-sd-gray-0 text-sd-gray-60">
              Periode: Triwulan 1 2026
            </span>
          </div>

          <ResponsiveContainer width="100%" className="flex-1 min-h-0">
            <AreaChart data={kinerjaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="var(--sd-blue-70)" fill="var(--sd-blue-70)" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>

          <p className="mt-[16px] text-[var(--text-sm)] text-sd-gray-60 shrink-0">
            <span className="font-[var(--font-weight-semibold)] text-sd-gray-90">{kinerjaPositifPct}%</span> kinerjanya diatas baik, bisa dipertahankan di periode selanjutnya.
          </p>
        </div>

        {/* Card 2 — Komposisi Talenta (Nine-Box) */}
        <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
          <div className="flex items-center justify-between mb-[16px]">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90">
              Komposisi Talenta
            </h3>
            <span className="px-[8px] py-[4px] rounded-[4px] text-[var(--text-xs)] bg-sd-gray-0 text-sd-gray-60">
              Periode: Triwulan 1 2026
            </span>
          </div>

          {/* Nine-Box Grid */}
          <div className="mb-[16px]">
            <div className="grid grid-cols-4 gap-[4px]">
              {/* Header row */}
              <div></div>
              <div className="text-center text-[var(--text-xs)] text-sd-gray-60 pb-[8px]">Kurang</div>
              <div className="text-center text-[var(--text-xs)] text-sd-gray-60 pb-[8px]">Kinerja</div>
              <div className="text-center text-[var(--text-xs)] text-sd-gray-60 pb-[8px]">Baik</div>

              {/* Data rows */}
              {nineBoxData.map((row, rowIdx) => (
                <React.Fragment key={`row-${rowIdx}`}>
                  <div className="flex items-center justify-end pr-[8px] text-[var(--text-xs)] text-sd-gray-60">
                    {row.row}
                  </div>
                  {row.cols.map((col, colIdx) => (
                    <div
                      key={`cell-${rowIdx}-${colIdx}`}
                      className={`p-[12px] rounded-[4px] text-center border ${
                        col.highlight === 'primary'
                          ? 'bg-primary text-white border-primary'
                          : col.highlight === 'secondary'
                          ? 'bg-[#BFDBFE] text-primary border-primary'
                          : 'bg-sd-gray-0 text-sd-gray-90 border-sd-badge-neutral'
                      }`}
                    >
                      <div className="text-[var(--text-xs)] mb-[4px] opacity-70">{col.label}</div>
                      <div className="text-[var(--text-sm)] font-[var(--font-weight-semibold)]">{col.value}</div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          <p className="text-[var(--text-sm)] text-sd-gray-60">
            Berdasarkan Nine-Box, <span className="font-[var(--font-weight-semibold)] text-sd-gray-90">{c5AsStr}</span> masih di kelompok V dan kelompok rencana suksesi yaitu VII, VIII, IX sudah di <span className="font-[var(--font-weight-semibold)] text-sd-gray-90">{talentaSuksesiStr}</span>.
          </p>
        </div>

        {/* Card 3 — Risiko Jabatan Manajerial Kosong & Pensiun */}
        <div className="bg-sd-warning-surface rounded-[8px] border border-sd-yellow-50 p-[20px]">
          <div className="flex items-center gap-[8px] mb-[16px]">
            <AlertTriangle className="w-[20px] h-[20px] text-sd-yellow-50" />
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-yellow-50">
              Risiko Jabatan Manajerial Kosong & Pensiun
            </h3>
          </div>

          <div className="space-y-[16px] mb-[16px]">
            {/* Manajerial Kosong */}
            <div>
              <div className="flex items-center justify-between mb-[8px]">
                <span className="text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-sd-yellow-50">Manajerial Kosong</span>
                <span className="text-[20px] font-[var(--font-weight-bold)] text-sd-gray-90">{jabatanStrukturalKosong}</span>
              </div>
              <div className="space-y-[4px] pl-[12px] border-l-2 border-sd-yellow-50/30">
                {[
                  { label: 'JPT Madya & Pratama', val: eselon12 },
                  { label: 'Administrator', val: Math.round(jabatanStrukturalKosong * 0.4) },
                  { label: 'Pengawas', val: Math.round(jabatanStrukturalKosong * 0.35) },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[var(--text-xs)] text-sd-gray-60">{item.label}</span>
                    <span className="text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-sd-gray-90">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-sd-yellow-50/20"></div>

            {/* Manajerial Pensiun */}
            <div>
              <div className="flex items-center justify-between mb-[8px]">
                <span className="text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-sd-red-60">Manajerial Pensiun s.d. Tw 4</span>
                <span className="text-[20px] font-[var(--font-weight-bold)] text-sd-gray-90">{jabatanKritis}</span>
              </div>
              <div className="space-y-[4px] pl-[12px] border-l-2 border-sd-red-60/30">
                {[
                  { label: 'JPT Madya & Pratama', val: eselon12 },
                  { label: 'Administrator', val: Math.round(jabatanKritis * 0.3) },
                  { label: 'Pengawas', val: Math.round(jabatanKritis * 0.2) },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[var(--text-xs)] text-sd-gray-60">{item.label}</span>
                    <span className="text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-sd-gray-90">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-[12px] bg-sd-red-5 border border-sd-red-60 rounded-[6px]">
            <p className="text-[var(--text-sm)] text-sd-red-60">
              Perhatian pada jabatan manajerial: <span className="font-[var(--font-weight-semibold)]">{jabatanKritis}</span> posisi manajerial belum terisi dan <span className="font-[var(--font-weight-semibold)]">{eselon12}</span> pimpinan akan pensiun s.d. Triwulan 4 2026.
            </p>
          </div>
        </div>
      </div>
      </div>


      {/* Section 5: Trend Metrics Row — Capaian Tata Kelola */}

      {/* Section 5: KPI Summary Footer */}
    </div>
  );
}

// Trend Card Component
function TrendCard({ label, value, trend, data }: { label: string; value: string; trend: string; data: any[] }) {
  return (
    <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
      <div className="text-[var(--text-sm)] text-sd-gray-60 mb-[12px]">{label}</div>
      <div className="flex items-end justify-between mb-[12px]">
        <div className="text-[32px] font-[var(--font-weight-bold)] text-sd-gray-90">{value}</div>
        <div className="flex items-center gap-[4px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-green-60">
          <TrendingUp className="w-[16px] h-[16px]" />
          <span>{trend}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={60}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke="var(--sd-blue-70)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Tab 2: Profil ASN Kemendikdasmen
function ProfilASN({ selectedUnit, unitData }: { selectedUnit: string; unitData: any }) {
  const [activeSubTab, setActiveSubTab] = useState('ringkasan');
  const [filterJabatan, setFilterJabatan] = useState('semua');
  const [showPersentase, setShowPersentase] = useState(false);
  const [selectedMatrix, setSelectedMatrix] = useState('pendidikan-usia');

  const {
    totalASN, totalPNS, totalPPPK, pppkParuhWaktu, nonASN,
    distribusiUsiaData, jenisKelaminData, masaKerjaData, angkatanASNData, proyeksiPensiunData,
    pendidikanData, pendidikanByJenisPegawaiData, pendidikanByUsiaData,
    pegawaiPerUnitData, komposisiPerUnitData, jabatanPerUnitData,
    sebaranPusatData, sebaranTipeData, wilayahData, breakdownManajerialData,
    pendidikanUsiaMatrix: pendidikanUsiaData,
    jenisPegawaiUsiaMatrix: jenisPegawaiUsiaData,
    unitKerjaPendidikanMatrix: unitKerjaPendidikanData,
    unitKerjaJenisPegawaiMatrix: unitKerjaJenisPegawaiData,
  } = unitData;

  const komposisiPegawaiData = [
    { name: 'Non ASN', value: nonASN, fill: 'var(--sd-yellow-30)' },
    { name: 'PNS', value: totalPNS, fill: 'var(--sd-blue-90)' },
    { name: 'PPPK', value: totalPPPK, fill: 'var(--sd-blue-50)' },
    { name: 'PPPK Paruh Waktu', value: pppkParuhWaktu, fill: '#8B5CF6' }
  ];

  const getHeatmapIntensity = (value: number, maxValue: number) => {
    const percent = (value / maxValue) * 100;
    if (percent < 25) return 'bg-blue-50';
    if (percent < 50) return 'bg-blue-200';
    if (percent < 75) return 'bg-blue-400 text-white';
    return 'bg-blue-600 text-white';
  };

  // Get current matrix data and column headers based on selection
  const getCurrentMatrixConfig = () => {
    switch (selectedMatrix) {
      case 'pendidikan-usia':
        return {
          data: pendidikanUsiaData,
          columns: ['<25', '26-30', '31-40', '41-50', '>50'],
          maxValue: Math.max(...pendidikanUsiaData.flatMap(row => [row['<25'], row['26-30'], row['31-40'], row['41-50'], row['>50']]))
        };
      case 'jenis-pegawai-usia':
        return {
          data: jenisPegawaiUsiaData,
          columns: ['<25', '26-30', '31-40', '41-50', '>50'],
          maxValue: Math.max(...jenisPegawaiUsiaData.flatMap(row => [row['<25'], row['26-30'], row['31-40'], row['41-50'], row['>50']]))
        };
      case 'unit-kerja-pendidikan':
        return {
          data: unitKerjaPendidikanData,
          columns: ['S3/S2', 'S1/D4', 'D3/D2/D1', 'SMA/Sed'],
          maxValue: Math.max(...unitKerjaPendidikanData.flatMap(row => [row['S3/S2'], row['S1/D4'], row['D3/D2/D1'], row['SMA/Sed']]))
        };
      case 'unit-kerja-jenis-pegawai':
        return {
          data: unitKerjaJenisPegawaiData,
          columns: ['PNS', 'PPPK', 'PPPK Paruh Waktu', 'Non ASN'],
          maxValue: Math.max(...unitKerjaJenisPegawaiData.flatMap(row => [row.PNS, row.PPPK, row['PPPK Paruh Waktu'], row['Non ASN']]))
        };
      default:
        return {
          data: pendidikanUsiaData,
          columns: ['<25', '26-30', '31-40', '41-50', '>50'],
          maxValue: Math.max(...pendidikanUsiaData.flatMap(row => [row['<25'], row['26-30'], row['31-40'], row['41-50'], row['>50']]))
        };
    }
  };

  const matrixConfig = getCurrentMatrixConfig();

  const isManajerialFilter = ['semua', 'manajerial', 'jpt', 'administrator', 'pengawas'].includes(filterJabatan);

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'ringkasan':
        return (
          <div className="space-y-[24px]">
            <p className="text-[var(--text-sm)] text-sd-gray-60">
              Menampilkan gambaran umum profil pegawai Kemendikdasmen berdasarkan jenis pegawai, demografi, masa kerja, dan siklus kepegawaian.
            </p>

            {/* KPI Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-[20px]">
              <div className="bg-primary rounded-[8px] p-[20px] text-center text-white">
                <div className="text-[var(--text-sm)] mb-[8px] uppercase tracking-wide opacity-90">Total Pegawai</div>
                <div className="text-[36px] font-[var(--font-weight-bold)]">{totalASN.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] text-center">
                <div className="text-[var(--text-sm)] text-sd-gray-60 mb-[8px] uppercase tracking-wide">Total PNS</div>
                <div className="text-[36px] font-[var(--font-weight-bold)] text-sd-gray-90">{totalPNS.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] text-center">
                <div className="text-[var(--text-sm)] text-sd-gray-60 mb-[8px] uppercase tracking-wide">Total PPPK</div>
                <div className="text-[36px] font-[var(--font-weight-bold)] text-sd-gray-90">{totalPPPK.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] text-center">
                <div className="text-[var(--text-sm)] text-sd-gray-60 mb-[8px] uppercase tracking-wide">PPPK Paruh Waktu</div>
                <div className="text-[36px] font-[var(--font-weight-bold)] text-sd-gray-90">{pppkParuhWaktu.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] text-center">
                <div className="text-[var(--text-sm)] text-sd-gray-60 mb-[8px] uppercase tracking-wide">Non ASN</div>
                <div className="text-[36px] font-[var(--font-weight-bold)] text-sd-gray-90">{nonASN.toLocaleString()}</div>
              </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              {/* Komposisi Jenis Pegawai - Donut Chart */}
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                  Komposisi Jenis Pegawai
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={komposisiPegawaiData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label
                    >
                      {komposisiPegawaiData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-[16px] mt-[16px]">
                  {komposisiPegawaiData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-[8px]">
                      <div className="w-[12px] h-[12px] rounded-full" style={{ backgroundColor: entry.fill }}></div>
                      <span className="text-[var(--text-sm)] text-sd-gray-60">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribusi Usia */}
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                  Distribusi Usia
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={distribusiUsiaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                    <XAxis dataKey="range" tick={{ fontSize: 12 }} label={{ value: 'Rentang Usia', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <YAxis label={{ value: 'Jumlah Pegawai', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="var(--sd-blue-90)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              {/* Komposisi Jenis Kelamin - Donut Chart */}
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                  Komposisi Jenis Kelamin
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={jenisKelaminData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label
                    >
                      {jenisKelaminData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-[24px] mt-[16px]">
                  {jenisKelaminData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-[8px]">
                      <div className="w-[12px] h-[12px] rounded-full" style={{ backgroundColor: entry.fill }}></div>
                      <span className="text-[var(--text-sm)] text-sd-gray-60">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribusi Masa Kerja */}
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                  Distribusi Masa Kerja
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={masaKerjaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                    <XAxis dataKey="range" tick={{ fontSize: 12 }} label={{ value: 'Masa Kerja (Tahun)', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <YAxis label={{ value: 'Jumlah Pegawai', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="var(--sd-blue-40)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              {/* Angkatan ASN */}
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                  Angkatan ASN Berdasarkan TMT CPNS
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={angkatanASNData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="var(--sd-blue-50)" fill="var(--sd-blue-50)" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Proyeksi Pensiun */}
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <div className="flex items-center justify-between mb-[16px]">
                  <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90">
                    Proyeksi Pensiun 5 Thn
                  </h3>
                  <div className="flex items-center gap-[6px] bg-amber-100 px-[8px] py-[4px] rounded-[4px]">
                    <AlertTriangle className="w-[14px] h-[14px] text-amber-600" />
                    <span className="text-[12px] text-amber-800">Mengabaikan filter jabatan</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={proyeksiPensiunData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                    <XAxis dataKey="year" label={{ value: 'Tahun', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <YAxis label={{ value: 'Jumlah Pegawai', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="var(--sd-gray-40)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'pendidikan':
        return (
          <div className="space-y-[24px]">
            <p className="text-[var(--text-sm)] text-sd-gray-60">
              Menampilkan gambaran jenjang pendidikan terakhir pegawai Kemendikdasmen secara agregat.
            </p>

            {/* Row 1: KPI Left, Chart Right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-[20px]">
              {/* Left - 2 KPI Cards */}
              <div className="space-y-[20px]">
                <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                  <div className="text-[var(--text-sm)] text-sd-gray-60 mb-[8px] uppercase tracking-wide">Jenjang Terbanyak</div>
                  <div className="text-[36px] font-[var(--font-weight-bold)] text-sd-gray-90 mb-[8px]">S1 / D4</div>
                  <div className="text-[var(--text-sm)] text-sd-blue-70 font-[var(--font-weight-medium)]">65% dari total</div>
                </div>
                <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                  <div className="text-[var(--text-sm)] text-sd-gray-60 mb-[8px] uppercase tracking-wide">Proporsi S2/S3</div>
                  <div className="text-[36px] font-[var(--font-weight-bold)] text-sd-gray-90 mb-[8px]">12%</div>
                  <div className="text-[var(--text-sm)] text-sd-gray-60">Kapasitas kepemimpinan strategis</div>
                </div>
              </div>

              {/* Right - Chart */}
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                  Distribusi Pendidikan Terakhir
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={pendidikanData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                    <XAxis dataKey="jenjang" tick={{ fontSize: 12 }} label={{ value: 'Jenjang Pendidikan', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <YAxis label={{ value: 'Jumlah Pegawai', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="var(--sd-blue-90)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Row 2: 2 Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                  Pendidikan berdasarkan Jenis Pegawai
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={pendidikanByJenisPegawaiData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                    <XAxis dataKey="kategori" tick={{ fontSize: 12 }} label={{ value: 'Jenjang Pendidikan', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <YAxis label={{ value: 'Jumlah Pegawai', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Non ASN" stackId="a" fill="var(--sd-yellow-30)" name="Non ASN" />
                    <Bar dataKey="PNS" stackId="a" fill="var(--sd-blue-90)" name="PNS" />
                    <Bar dataKey="PPPK" stackId="a" fill="var(--sd-blue-50)" name="PPPK" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                  Pendidikan berdasarkan Rentang Usia
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={pendidikanByUsiaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                    <XAxis dataKey="rentang" tick={{ fontSize: 12 }} label={{ value: 'Rentang Usia', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <YAxis label={{ value: 'Jumlah Pegawai', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Di bawah S1" stackId="a" fill="var(--sd-blue-40)" name="Di bawah S1" />
                    <Bar dataKey="S1 ke Atas" stackId="a" fill="var(--sd-blue-90)" name="S1 ke Atas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'organisasi':
        return (
          <div className="space-y-[24px]">
            <p className="text-[var(--text-sm)] text-sd-gray-60">
              Menampilkan persebaran pegawai berdasarkan unit organisasi, kelompok jabatan, dan wilayah kerja Kemendikdasmen.
            </p>

            {/* Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                  Jumlah Pegawai per Unit Kerja
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pegawaiPerUnitData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                    <XAxis type="number" label={{ value: 'Jumlah Pegawai', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <YAxis dataKey="unit" type="category" width={100} tick={{ fontSize: 11 }} label={{ value: 'Unit Kerja', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="var(--sd-blue-90)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                  Komposisi Pegawai per Unit Kerja
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={komposisiPerUnitData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                    <XAxis dataKey="unit" tick={{ fontSize: 11 }} label={{ value: 'Unit Kerja', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <YAxis label={{ value: 'Jumlah Pegawai', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="PNS" stackId="a" fill="var(--sd-blue-90)" name="PNS" />
                    <Bar dataKey="PPPK" stackId="a" fill="var(--sd-blue-40)" name="PPPK" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Row 2: Full-width */}
            <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
              <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                Komposisi Jenis Jabatan per Unit Kerja
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jabatanPerUnitData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                  <XAxis dataKey="unit" tick={{ fontSize: 11 }} label={{ value: 'Unit Kerja', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                  <YAxis label={{ value: 'Jumlah Pegawai', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Fungsional" stackId="a" fill="var(--sd-blue-50)" name="Fungsional" />
                  <Bar dataKey="Manajerial" stackId="a" fill="var(--sd-blue-90)" name="Manajerial" />
                  <Bar dataKey="Pelaksana" stackId="a" fill="var(--sd-blue-40)" name="Pelaksana" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                  Sebaran Pusat vs UPT/Daerah
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={sebaranPusatData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label
                    >
                      {sebaranPusatData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-[8px] mt-[16px]">
                  {sebaranPusatData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-[8px]">
                      <div className="w-[12px] h-[12px] rounded-full" style={{ backgroundColor: entry.fill }}></div>
                      <span className="text-[var(--text-sm)] text-sd-gray-60">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                  Sebaran Tipe Unit
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={sebaranTipeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label
                    >
                      {sebaranTipeData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-[16px] mt-[16px]">
                  {sebaranTipeData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-[8px]">
                      <div className="w-[12px] h-[12px] rounded-full" style={{ backgroundColor: entry.fill }}></div>
                      <span className="text-[var(--text-sm)] text-sd-gray-60">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 4: Breakdown Manajerial (Conditional) */}
            <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
              <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[8px]">
                Breakdown Manajerial
              </h3>
              <p className="text-[var(--text-sm)] text-sd-gray-60 mb-[16px]">
                Hanya berlaku saat filter termasuk Manajerial/Semua
              </p>
              {isManajerialFilter ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={breakdownManajerialData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {breakdownManajerialData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      formatter={(value) => <span className="text-[var(--text-sm)]">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[200px] flex items-center justify-center">
                  <p className="text-[var(--text-sm)] text-sd-gray-40 italic">
                    Filter saat ini tidak mencakup jabatan manajerial
                  </p>
                </div>
              )}
            </div>

            {/* Row 5: Full-width */}
            <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
              <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
                Sebaran Pegawai Berdasarkan Wilayah Provinsi Utama
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={wilayahData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                  <XAxis dataKey="provinsi" tick={{ fontSize: 11 }} label={{ value: 'Provinsi', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                  <YAxis label={{ value: 'Jumlah Pegawai', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: 'var(--sd-gray-60)' } }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="var(--sd-blue-90)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'eksplorasi':
        return (
          <div className="space-y-[24px]">
            <p className="text-[var(--text-sm)] text-sd-gray-60">
              Menyediakan eksplorasi komparasi data pegawai dalam bentuk matriks agregat yang telah dikurasi agar tetap mudah dibaca dan aman untuk publik.
            </p>

            {/* Controls Row */}
            <div className="flex items-center justify-between">
              <select
                value={selectedMatrix}
                onChange={(e) => setSelectedMatrix(e.target.value)}
                className="px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-sm)] text-sd-gray-90 bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
              >
                <option value="pendidikan-usia">Pendidikan × Rentang Usia</option>
                <option value="jenis-pegawai-usia">Jenis Pegawai × Rentang Usia</option>
                <option value="unit-kerja-pendidikan">Unit Kerja × Pendidikan</option>
                <option value="unit-kerja-jenis-pegawai">Unit Kerja × Jenis Pegawai</option>
                <option disabled>Jenis Kelamin × Rentang Usia (segera hadir)</option>
                <option disabled>Unit Kerja × Rentang Usia (segera hadir)</option>
                <option disabled>Unit Kerja × Jenis Jabatan (segera hadir)</option>
                <option disabled>Unit Kerja × Wilayah (segera hadir)</option>
                <option disabled>Unit Kerja × Tipe Unit (segera hadir)</option>
                <option disabled>Wilayah × Pendidikan (segera hadir)</option>
                <option disabled>Wilayah × Jenis Pegawai (segera hadir)</option>
                <option disabled>Wilayah × Proyeksi Pensiun per Tahun (segera hadir)</option>
                <option disabled>Jenis Jabatan × Pendidikan (segera hadir)</option>
                <option disabled>Jenis Pegawai × Pendidikan (segera hadir)</option>
              </select>

              <div className="flex items-center gap-[12px]">
                <label className="text-[var(--text-sm)] text-sd-gray-90">Tampilkan Persentase Baris</label>
                <button
                  onClick={() => setShowPersentase(!showPersentase)}
                  className={`w-[44px] h-[24px] rounded-full transition-colors relative ${
                    showPersentase ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-[2px] w-[20px] h-[20px] rounded-full bg-white transition-transform ${
                      showPersentase ? 'translate-x-[22px]' : 'translate-x-[2px]'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Heatmap Table */}
            <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-sd-badge-neutral p-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-sd-gray-90 bg-sd-gray-0">
                      Kategori
                    </th>
                    {matrixConfig.columns.map((col) => (
                      <th key={col} className="border border-sd-badge-neutral p-[12px] text-center text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-sd-gray-90 bg-sd-gray-0">
                        {col}
                      </th>
                    ))}
                    <th className="border border-sd-badge-neutral p-[12px] text-center text-[var(--text-sm)] font-[var(--font-weight-bold)] text-sd-gray-90 bg-sd-badge-neutral">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matrixConfig.data.map((row: any) => (
                    <tr key={row.kategori}>
                      <td className="border border-sd-badge-neutral p-[12px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
                        {row.kategori}
                      </td>
                      {matrixConfig.columns.map((col) => {
                        const value = row[col];
                        return (
                          <td key={col} className={`border border-sd-badge-neutral p-[12px] text-center text-[var(--text-sm)] ${getHeatmapIntensity(value, matrixConfig.maxValue)}`}>
                            {value.toLocaleString()}{showPersentase && ` (${((value / row.total) * 100).toFixed(1)}%)`}
                          </td>
                        );
                      })}
                      <td className="border border-sd-badge-neutral p-[12px] text-center text-[var(--text-sm)] font-[var(--font-weight-bold)] text-sd-gray-90 bg-sd-gray-0">
                        {row.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-center gap-[8px] mt-[16px]">
                <span className="text-[var(--text-sm)] text-sd-gray-60">Heatmap Legend: Rendah</span>
                <div className="flex gap-[4px]">
                  <div className="w-[20px] h-[20px] rounded bg-blue-100 border border-sd-badge-neutral"></div>
                  <div className="w-[20px] h-[20px] rounded bg-blue-300 border border-sd-badge-neutral"></div>
                  <div className="w-[20px] h-[20px] rounded bg-blue-500 border border-sd-badge-neutral"></div>
                  <div className="w-[20px] h-[20px] rounded bg-blue-700 border border-sd-badge-neutral"></div>
                </div>
                <span className="text-[var(--text-sm)] text-sd-gray-60">Tinggi</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-[32px]">
      {/* Page Title */}
      <div>
        <h2 className="text-[24px] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
          Profil ASN Kemendikdasmen
        </h2>
        <p className="text-[var(--text-sm)] text-sd-gray-60">
          Update terakhir: 24 April 2026, 09:00 WIB
        </p>
      </div>

      {/* Sub-tab Navigation */}
      <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[16px]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[16px]">
          <div className="flex flex-wrap gap-[8px]">
            <button
              onClick={() => setActiveSubTab('ringkasan')}
              className={`px-[16px] py-[8px] rounded-full text-[var(--text-sm)] font-[var(--font-weight-medium)] transition-colors ${
                activeSubTab === 'ringkasan'
                  ? 'bg-primary text-white'
                  : 'bg-sd-gray-0 text-sd-gray-60 hover:bg-sd-badge-neutral'
              }`}
            >
              Ringkasan & Siklus ASN
            </button>
            <button
              onClick={() => setActiveSubTab('pendidikan')}
              className={`px-[16px] py-[8px] rounded-full text-[var(--text-sm)] font-[var(--font-weight-medium)] transition-colors ${
                activeSubTab === 'pendidikan'
                  ? 'bg-primary text-white'
                  : 'bg-sd-gray-0 text-sd-gray-60 hover:bg-sd-badge-neutral'
              }`}
            >
              Pendidikan & Kapasitas Pegawai
            </button>
            <button
              onClick={() => setActiveSubTab('organisasi')}
              className={`px-[16px] py-[8px] rounded-full text-[var(--text-sm)] font-[var(--font-weight-medium)] transition-colors ${
                activeSubTab === 'organisasi'
                  ? 'bg-primary text-white'
                  : 'bg-sd-gray-0 text-sd-gray-60 hover:bg-sd-badge-neutral'
              }`}
            >
              Organisasi, Jabatan & Wilayah
            </button>
            <button
              onClick={() => setActiveSubTab('eksplorasi')}
              className={`px-[16px] py-[8px] rounded-full text-[var(--text-sm)] font-[var(--font-weight-medium)] transition-colors ${
                activeSubTab === 'eksplorasi'
                  ? 'bg-primary text-white'
                  : 'bg-sd-gray-0 text-sd-gray-60 hover:bg-sd-badge-neutral'
              }`}
            >
              Eksplorasi Matriks Pegawai
            </button>
          </div>

          <div className="flex items-center gap-[8px]">
            <span className="text-[12px] text-sd-gray-60 uppercase tracking-wide">Filter Jenis Jabatan</span>
            <select
              value={filterJabatan}
              onChange={(e) => setFilterJabatan(e.target.value)}
              className="px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-sm)] text-sd-gray-90 bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
            >
              <option value="semua">Seluruh Jabatan</option>
              <option value="manajerial">Seluruh Manajerial</option>
              <option value="jpt">JPT</option>
              <option value="administrator">Administrator</option>
              <option value="pengawas">Pengawas</option>
              <option value="fungsional">Fungsional</option>
              <option value="pelaksana">Pelaksana</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sub-tab Content */}
      {renderSubTabContent()}
    </div>
  );
}

/// Tab 3: Keterisian Jabatan (renamed from Organisasi dan Keterisian Jabatan)
function KeterisianJabatan({ selectedUnit, unitData }: { selectedUnit: string; unitData: any }) {
  const [jabatanFilter, setJabatanFilter] = useState<'manajerial' | 'fungsional' | 'pelaksana'>('manajerial');

  const {
    fulfillmentData, jabatanKosongPerUnitData,
    pensiunPerKuartalData, pensiunPerJabatanData,
    jabatanStrukturalKosong, jabatanFungsionalKosong, jabatanKritis, eselon12,
  } = unitData;

  const keterisianPct: number = unitData.ketersisiaanJabatan;
  const kekosonganPct = 100 - keterisianPct;

  // Sparkline trend data (mocked — prev 4 quarters)
  const trendKeterisianData = [
    { q: 'Tw1\'25', v: keterisianPct - 5 },
    { q: 'Tw2\'25', v: keterisianPct - 3 },
    { q: 'Tw3\'25', v: keterisianPct - 2 },
    { q: 'Tw4\'25', v: keterisianPct - 1 },
    { q: 'Tw1\'26', v: keterisianPct },
  ];

  // Top 5 stable units (highest keterisian)
  const top5Stable = [
    { unit: 'Biro Perencanaan', pct: 97 },
    { unit: 'Inspektorat I', pct: 95 },
    { unit: 'Dit. SD', pct: 94 },
    { unit: 'Pusdatin', pct: 93 },
    { unit: 'Pus. Asesmen', pct: 92 },
  ];

  // Bottom 5 at-risk units (highest vacancy + pension)
  const bottom5Risk = [
    { unit: 'Biro OSDM', pct: 62, risk: 'Vacancy + Pensiun Tinggi' },
    { unit: 'Dit. SMK', pct: 65, risk: 'Pensiun Tinggi' },
    { unit: 'Ditjen Vokasi (Setjen)', pct: 68, risk: 'Vacancy Tinggi' },
    { unit: 'Pus. Pembinaan', pct: 70, risk: 'Vacancy + Pensiun' },
    { unit: 'Dit. SMA', pct: 72, risk: 'Pensiun Tinggi' },
  ];

  // Top jabatan paling sering lowong
  const topJabatanKosong = [
    { jabatan: 'Kepala Bagian Umum', jenis: 'Manajerial', bulanKosong: 8 },
    { jabatan: 'Analis Kebijakan Madya', jenis: 'Fungsional', bulanKosong: 6 },
    { jabatan: 'Kepala Subbagian TU', jenis: 'Manajerial', bulanKosong: 5 },
    { jabatan: 'Perencana Madya', jenis: 'Fungsional', bulanKosong: 4 },
    { jabatan: 'Kepala Seksi Program', jenis: 'Manajerial', bulanKosong: 3 },
  ];

  // Jabatan kosong detail per filter
  const jabatanKosongDetail: Record<string, { jabatan: string; unit: string; lama: string }[]> = {
    manajerial: [
      { jabatan: 'JPT Madya (Sekretariat Jenderal)', unit: 'Setjen', lama: '> 6 bulan' },
      { jabatan: 'Direktur Pendidikan Khusus', unit: 'Ditjen Vokasi', lama: '3 bulan' },
      { jabatan: 'Kepala Biro OSDM', unit: 'Setjen', lama: '> 6 bulan' },
      { jabatan: 'Kepala Bagian Perencanaan', unit: 'Itjen', lama: '2 bulan' },
    ],
    fungsional: [
      { jabatan: 'Analis Kebijakan Utama', unit: 'Biro Perencanaan', lama: '4 bulan' },
      { jabatan: 'Arsiparis Ahli Madya', unit: 'Setjen', lama: '5 bulan' },
      { jabatan: 'Pranata Komputer Ahli Madya', unit: 'Pusdatin', lama: '3 bulan' },
      { jabatan: 'Perencana Madya', unit: 'Biro Perencanaan', lama: '2 bulan' },
      { jabatan: 'Widyaiswara Madya', unit: 'Puslatsdm', lama: '6 bulan' },
    ],
    pelaksana: [
      { jabatan: 'Pengadministrasi Umum (Gr. A)', unit: 'Biro Umum', lama: '1 bulan' },
      { jabatan: 'Pengolah Data (Gr. B)', unit: 'Pusdatin', lama: '2 bulan' },
      { jabatan: 'Pengelola Keuangan (Gr. C)', unit: 'Biro Keuangan', lama: '3 bulan' },
    ],
  };

  // Risiko pensiun per jenis jabatan (yellow cards style)
  const risikoJabatan = [
    { label: 'Manajerial (JPT/Administrator/Pengawas)', count: jabatanKritis, prev: jabatanKritis - 2, risk: 'Tinggi' },
    { label: 'Fungsional Keahlian', count: Math.round(jabatanFungsionalKosong * 0.7), prev: Math.round(jabatanFungsionalKosong * 0.6), risk: 'Sedang' },
    { label: 'Pelaksana', count: Math.round(jabatanFungsionalKosong * 0.3), prev: Math.round(jabatanFungsionalKosong * 0.25), risk: 'Rendah' },
  ];

  // Top/Bottom 5 units at risk from pension
  const unitPensiunRisk = [
    { unit: 'Ditjen GTK', akan_pensiun: 42, pct_dari_total: 18 },
    { unit: 'Setjen', akan_pensiun: 31, pct_dari_total: 14 },
    { unit: 'Ditjen PAUD Dikdasmen', akan_pensiun: 28, pct_dari_total: 12 },
    { unit: 'Ditjen Vokasi', akan_pensiun: 22, pct_dari_total: 10 },
    { unit: 'Itjen', akan_pensiun: 15, pct_dari_total: 7 },
  ];
  const unitPensiunSafe = [
    { unit: 'Pus. Asesmen', akan_pensiun: 2, pct_dari_total: 1 },
    { unit: 'Pus. Perbukuan', akan_pensiun: 3, pct_dari_total: 1.5 },
    { unit: 'Pus. Standar', akan_pensiun: 4, pct_dari_total: 2 },
    { unit: 'Insp. Investigasi', akan_pensiun: 4, pct_dari_total: 2.5 },
    { unit: 'Puspeka', akan_pensiun: 5, pct_dari_total: 3 },
  ];

  // Pensiun per jabatan — manajerial vs non-manajerial
  const pensiunManajerialData = [
    { jabatan: 'JPT Madya', value: eselon12 },
    { jabatan: 'JPT Pratama', value: Math.round(jabatanKritis * 0.5) },
    { jabatan: 'Administrator', value: Math.round(jabatanKritis * 0.3) },
    { jabatan: 'Pengawas', value: Math.round(jabatanKritis * 0.2) },
  ];
  const pensiunNonManajerialData = [
    { jabatan: 'JF Keahlian Kls 11-15', value: Math.round(jabatanFungsionalKosong * 0.4) },
    { jabatan: 'JF Keahlian Kls 6-10', value: Math.round(jabatanFungsionalKosong * 0.35) },
    { jabatan: 'JF Keterampilan', value: Math.round(jabatanFungsionalKosong * 0.15) },
    { jabatan: 'Pelaksana', value: Math.round(jabatanFungsionalKosong * 0.1) },
  ];

  return (
    <div className="space-y-[32px]">
      {/* Page Title */}
      <div>
        <h2 className="text-[24px] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
          Keterisian Jabatan
        </h2>
        <p className="text-[var(--text-sm)] text-sd-gray-60">
          Update terakhir: 24 April 2026, 09:00 WIB
        </p>
      </div>

      {/* Insights Box */}
      <div className="bg-sd-blue-90 rounded-[8px] p-[20px] text-white">
        <div className="flex items-center gap-[10px] mb-[14px]">
          <Lightbulb className="w-[20px] h-[20px] shrink-0" />
          <span className="text-[var(--text-base)] font-[var(--font-weight-semibold)]">Ringkasan Eksekutif Jabatan</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]">
          <div className="bg-white/10 rounded-[6px] p-[14px]">
            <div className="text-[var(--text-xs)] opacity-70 uppercase tracking-wide mb-[6px]">Jabatan yang Harus Segera Diamankan</div>
            <p className="text-[var(--text-sm)] leading-[1.5]">
              <span className="font-[var(--font-weight-semibold)]">{jabatanStrukturalKosong} jabatan manajerial</span> kosong, termasuk {eselon12} posisi JPT yang berisiko tinggi pada kesinambungan kepemimpinan strategis.
            </p>
          </div>
          <div className="bg-white/10 rounded-[6px] p-[14px]">
            <div className="text-[var(--text-xs)] opacity-70 uppercase tracking-wide mb-[6px]">Unit dengan Risiko Tertinggi</div>
            <p className="text-[var(--text-sm)] leading-[1.5]">
              Biro OSDM dan Ditjen GTK memiliki kombinasi vacancy dan proyeksi pensiun tertinggi — perlu perhatian prioritas dalam 2 triwulan ke depan.
            </p>
          </div>
          <div className="bg-white/10 rounded-[6px] p-[14px]">
            <div className="text-[var(--text-xs)] opacity-70 uppercase tracking-wide mb-[6px]">Ancaman Utama</div>
            <p className="text-[var(--text-sm)] leading-[1.5]">
              Ancaman datang dari <span className="font-[var(--font-weight-semibold)]">dua sisi sekaligus</span>: vacancy saat ini ({kekosonganPct}% kosong) dan proyeksi pensiun {unitData.totalPensiun2026} pegawai s.d. akhir 2026.
            </p>
          </div>
        </div>
      </div>

      {/* Section A: Keterisian Jabatan Saat Ini */}
      <div>
        <div className="mb-[24px]">
          <div className="flex items-center gap-[16px] mb-[4px]">
            <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90">
              A. Keterisian Jabatan Saat Ini
            </h3>
            <div className="flex-1 h-[1px] bg-sd-badge-neutral"></div>
          </div>
          <span className="text-[var(--text-xs)] text-sd-gray-60">Fokus: posisi mana yang kosong dan seberapa besar gap saat ini</span>
        </div>

        {/* KPI Row — % Keterisian & Kekosongan with Trend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[24px]">
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="text-[var(--text-sm)] text-sd-gray-60 mb-[4px]">% Keterisian Jabatan</div>
            <div className="flex items-end justify-between mb-[8px]">
              <div>
                <div className="text-[40px] font-[var(--font-weight-bold)] text-sd-gray-90 leading-none">{keterisianPct}%</div>
                <div className="flex items-center gap-[4px] text-[var(--text-sm)] text-sd-green-60 mt-[6px]">
                  <TrendingUp className="w-[14px] h-[14px]" />
                  <span>+2% vs Tw 4 2025</span>
                </div>
              </div>
              <div className="w-[100px]">
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={trendKeterisianData}>
                    <Line type="monotone" dataKey="v" stroke="var(--sd-green-60)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="w-full bg-sd-badge-neutral rounded-full h-[6px]">
              <div className="bg-sd-green-60 h-[6px] rounded-full" style={{ width: `${keterisianPct}%` }} />
            </div>
          </div>

          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="text-[var(--text-sm)] text-sd-gray-60 mb-[4px]">% Kekosongan Jabatan</div>
            <div className="flex items-end justify-between mb-[8px]">
              <div>
                <div className="text-[40px] font-[var(--font-weight-bold)] text-sd-yellow-50 leading-none">{kekosonganPct}%</div>
                <div className="flex items-center gap-[4px] text-[var(--text-sm)] text-sd-red-60 mt-[6px]">
                  <TrendingDown className="w-[14px] h-[14px]" />
                  <span>-2% vs Tw 4 2025 (membaik)</span>
                </div>
              </div>
              <div className="w-[100px]">
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={trendKeterisianData.map(d => ({ ...d, v: 100 - d.v }))}>
                    <Line type="monotone" dataKey="v" stroke="var(--sd-yellow-50)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="w-full bg-sd-badge-neutral rounded-full h-[6px]">
              <div className="bg-sd-yellow-50 h-[6px] rounded-full" style={{ width: `${kekosonganPct}%` }} />
            </div>
          </div>
        </div>

        {/* Jabatan Detail Kosong — Filter Tabs */}
        <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] mb-[24px]">
          {/* Header */}
          <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[24px]">
            Jabatan Detail Kosong
          </h3>

          {/* Clickable category cards */}
          <div className="grid grid-cols-3 gap-[24px] mb-[24px]">
            {([
              { key: 'manajerial', label: 'Manajerial', count: jabatanStrukturalKosong },
              { key: 'fungsional', label: 'Fungsional', count: jabatanFungsionalKosong },
              { key: 'pelaksana',  label: 'Pelaksana',  count: Math.round(jabatanFungsionalKosong * 0.4) },
            ] as const).map(({ key, label, count }) => {
              const active = jabatanFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => setJabatanFilter(key)}
                  className="text-left bg-white rounded-[8px] p-[22px] relative transition-shadow hover:shadow-md focus:outline-none"
                  style={{
                    border: active ? '2px solid #0954d9' : '1px solid #c7c7c7',
                  }}
                >
                  <p className="text-[15px] font-normal text-sd-gray-90 mb-[8px]">{label}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '28px', fontWeight: 700, color: 'var(--sd-gray-90)', lineHeight: 1, marginBottom: '8px' }}>{count}</p>
                  <p className="text-[15px] font-normal text-sd-gray-90">Jabatan kosong</p>
                </button>
              );
            })}
          </div>

          {/* Detail table for selected category */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sd-badge-neutral">
                  <th className="text-left py-[8px] px-[12px] text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-90 uppercase">Jabatan</th>
                  <th className="text-left py-[8px] px-[12px] text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-90 uppercase">Unit</th>
                  <th className="text-center py-[8px] px-[12px] text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-90 uppercase">Lama Kosong</th>
                </tr>
              </thead>
              <tbody>
                {jabatanKosongDetail[jabatanFilter].map((item, idx) => (
                  <tr key={idx} className="border-b border-sd-gray-0 hover:bg-sd-gray-0">
                    <td className="py-[10px] px-[12px] text-[var(--text-sm)] text-sd-gray-90">{item.jabatan}</td>
                    <td className="py-[10px] px-[12px] text-[var(--text-sm)] text-sd-gray-60">{item.unit}</td>
                    <td className="py-[10px] px-[12px] text-center">
                      <span className={`px-[8px] py-[3px] rounded-full text-[var(--text-xs)] font-[var(--font-weight-medium)] ${
                        item.lama.includes('> 6') ? 'bg-sd-red-5 text-sd-red-60' : item.lama.includes('5') || item.lama.includes('4') ? 'bg-sd-warning-surface text-sd-yellow-50' : 'bg-sd-gray-0 text-sd-gray-60'
                      }`}>
                        {item.lama}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[12px] text-[var(--text-xs)] text-sd-gray-40 italic">
            Gunakan filter di atas untuk menganalisis lebih lanjut per kategori jabatan.
          </p>
        </div>

        {/* View Level Organisasi — Top 5 Stable & Bottom 5 At-Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[24px]">
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="flex items-center gap-[8px] mb-[4px]">
              <div className="w-[8px] h-[8px] rounded-full bg-sd-red-60"></div>
              <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90">Bottom 5 Unit Paling Rawan</h3>
            </div>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">Kekosongan jabatan</p>
            <div className="space-y-[10px]">
              {bottom5Risk.map((row, idx) => (
                <div key={idx} className="flex items-center gap-[10px]">
                  <div className="w-[20px] text-[var(--text-xs)] text-sd-gray-40 text-center font-[var(--font-weight-semibold)]">{idx + 1}</div>
                  <div className="flex-1">
                    <div className="text-[var(--text-sm)] text-sd-gray-90">{row.unit}</div>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[80px] bg-sd-badge-neutral rounded-full h-[6px]">
                      <div className="bg-sd-red-60 h-[6px] rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-red-60 w-[36px] text-right">{row.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="flex items-center gap-[8px] mb-[4px]">
              <div className="w-[8px] h-[8px] rounded-full bg-sd-green-60"></div>
              <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90">Top 5 Unit Paling Stabil</h3>
            </div>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">Keterisian jabatan tertinggi berdasarkan persentase</p>
            <div className="space-y-[10px]">
              {top5Stable.map((row, idx) => (
                <div key={idx} className="flex items-center gap-[10px]">
                  <div className="w-[20px] text-[var(--text-xs)] text-sd-gray-40 text-center font-[var(--font-weight-semibold)]">{idx + 1}</div>
                  <div className="flex-1 text-[var(--text-sm)] text-sd-gray-90">{row.unit}</div>
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[80px] bg-sd-badge-neutral rounded-full h-[6px]">
                      <div className="bg-sd-green-60 h-[6px] rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-green-60 w-[36px] text-right">{row.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View Per Jabatan — Top jabatan paling sering lowong */}
        <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
          <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
            Jabatan Paling Sering Lowong
          </h3>
          <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">Posisi yang kosong ≥ 3 bulan dalam setahun terakhir</p>
          <div className="space-y-[8px]">
            {topJabatanKosong.map((item, idx) => (
              <div key={idx} className="flex items-center gap-[12px] p-[10px] rounded-[6px] bg-sd-gray-0">
                <div className="w-[24px] h-[24px] rounded-full bg-sd-yellow-50 text-white text-[var(--text-xs)] font-[var(--font-weight-semibold)] flex items-center justify-center shrink-0">{idx + 1}</div>
                <div className="flex-1">
                  <div className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">{item.jabatan}</div>
                  <div className="text-[var(--text-xs)] text-sd-gray-60">{item.jenis}</div>
                </div>
                <div className="text-right">
                  <div className="text-[var(--text-sm)] font-[var(--font-weight-bold)] text-sd-yellow-50">{item.bulanKosong} bulan</div>
                  <div className="text-[var(--text-xs)] text-sd-gray-40">kosong</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section B: Risiko Kekosongan karena Pensiun */}
      <div>
        <div className="mb-[24px]">
          <div className="flex items-center gap-[16px] mb-[4px]">
            <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90">
              B. Risiko Kekosongan karena Pensiun
            </h3>
            <div className="flex-1 h-[1px] bg-sd-badge-neutral"></div>
          </div>
          <span className="text-[var(--text-xs)] text-sd-gray-60">Fokus: risiko struktur ke depan akibat pensiun</span>
        </div>

        {/* Forecast per Triwulan — quarterly only, no cumulative */}
        <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] mb-[24px]">
          <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
            Forecast Lowong per Triwulan (Pensiun 2026)
          </h3>
          <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">
            Jumlah jabatan yang akan lowong akibat pensiun per triwulan — bukan kumulatif
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={pensiunPerKuartalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
              <XAxis dataKey="periode" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="var(--sd-blue-50)" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="value" position="top" style={{ fontSize: '12px', fill: 'var(--sd-gray-60)', fontWeight: 600 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-[10px] text-[var(--text-xs)] text-sd-gray-60 italic">
            Triwulan 4 memiliki beban pensiun tertinggi — perlu percepatan proses pengisian jabatan di Tw 3.
          </p>
        </div>

        {/* Pensiun per Unit Utama */}
        <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] mb-[24px]">
          <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
            Pensiun per Unit Utama
          </h3>
          <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">Jumlah pegawai yang akan pensiun s.d. akhir 2026, per unit kerja utama</p>
          <div className="space-y-[10px]">
            {([
              { unit: 'Ditjen GTK',         jumlah: 42, pct: 18 },
              { unit: 'Setjen',             jumlah: 31, pct: 14 },
              { unit: 'Ditjen PAUD Dikdasmen', jumlah: 28, pct: 12 },
              { unit: 'Ditjen Vokasi',      jumlah: 22, pct: 10 },
              { unit: 'BSKAP',              jumlah: 17, pct: 8 },
              { unit: 'Itjen',              jumlah: 15, pct: 7 },
              { unit: 'Badan Bahasa',       jumlah: 12, pct: 5 },
            ]).map((row, idx) => (
              <div key={idx} className="flex items-center gap-[12px]">
                <div className="shrink-0 text-[var(--text-xs)] text-sd-gray-40 w-[20px] text-center font-[var(--font-weight-semibold)]">{idx + 1}</div>
                <div className="flex-1 text-[var(--text-sm)] text-sd-gray-90">{row.unit}</div>
                <div className="w-[140px]">
                  <div className="flex justify-between text-[var(--text-xs)] text-sd-gray-60 mb-[4px]">
                    <span>{row.jumlah} orang</span>
                    <span>{row.pct}%</span>
                  </div>
                  <div className="w-full bg-sd-badge-neutral rounded-full h-[6px]">
                    <div className="bg-sd-yellow-50 h-[6px] rounded-full" style={{ width: `${(row.jumlah / 42) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-[12px] text-[var(--text-xs)] text-sd-gray-40 italic">
            Total proyeksi pensiun: {unitData.totalPensiun2026} orang s.d. akhir 2026
          </p>
        </div>

        {/* Risiko per Jenis Jabatan — Yellow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mb-[24px]">
          {risikoJabatan.map((item, idx) => (
            <div key={idx} className="bg-sd-warning-surface rounded-[8px] border border-sd-yellow-50 p-[20px]">
              <div className="flex items-start justify-between mb-[12px]">
                <div className="text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-sd-yellow-50">{item.label}</div>
                <span className={`px-[8px] py-[3px] rounded-full text-[var(--text-xs)] font-[var(--font-weight-semibold)] shrink-0 ml-[8px] ${
                  item.risk === 'Tinggi' ? 'bg-sd-red-60 text-white' : item.risk === 'Sedang' ? 'bg-sd-yellow-50 text-white' : 'bg-sd-gray-40 text-white'
                }`}>
                  {item.risk}
                </span>
              </div>
              <div className="text-[36px] font-[var(--font-weight-bold)] text-sd-gray-90 mb-[8px]">{item.count}</div>
              <div className="text-[var(--text-xs)] text-sd-gray-60">
                Periode sebelumnya: <span className="font-[var(--font-weight-semibold)]">{item.prev}</span>
                <span className="ml-[6px] text-sd-red-60">(+{item.count - item.prev})</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pensiun berdasarkan Jabatan — Manajerial vs Non-Manajerial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[24px]">
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
              Top Jabatan Manajerial yang Pensiun
            </h3>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">Jabatan yang paling banyak ditinggalkan s.d. akhir 2026</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={pensiunManajerialData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="jabatan" type="category" width={110} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="var(--sd-yellow-50)" radius={[0, 4, 4, 0]}>
                  <LabelList dataKey="value" position="right" style={{ fontSize: '12px', fill: 'var(--sd-gray-60)' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
              Top Jabatan Non-Manajerial yang Pensiun
            </h3>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">Berdasarkan kelas jabatan (1–15) s.d. akhir 2026</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={[
                  { jabatan: 'Kelas Jabatan >10',  value: Math.round(jabatanFungsionalKosong * 0.35) },
                  { jabatan: 'Kelas Jabatan 9-10', value: Math.round(jabatanFungsionalKosong * 0.25) },
                  { jabatan: 'Kelas Jabatan 7-9',  value: Math.round(jabatanFungsionalKosong * 0.20) },
                  { jabatan: 'Kelas Jabatan 4-6',  value: Math.round(jabatanFungsionalKosong * 0.12) },
                  { jabatan: 'Kelas Jabatan 1-3',  value: Math.round(jabatanFungsionalKosong * 0.08) },
                ]}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="jabatan" type="category" width={150} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="var(--sd-blue-50)" radius={[0, 4, 4, 0]}>
                  <LabelList dataKey="value" position="right" style={{ fontSize: '12px', fill: 'var(--sd-gray-60)' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Unit yang Paling Terdampak */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="flex items-center gap-[8px] mb-[4px]">
              <AlertTriangle className="w-[16px] h-[16px] text-sd-red-60" />
              <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90">Top 5 Unit Paling Berisiko</h3>
            </div>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">Unit yang kehilangan paling banyak pegawai dari pensiun</p>
            <div className="space-y-[10px]">
              {unitPensiunRisk.map((row, idx) => (
                <div key={idx} className="flex items-center gap-[10px]">
                  <div className="w-[20px] text-[var(--text-xs)] text-sd-gray-40 text-center font-[var(--font-weight-semibold)]">{idx + 1}</div>
                  <div className="flex-1 text-[var(--text-sm)] text-sd-gray-90">{row.unit}</div>
                  <div className="text-right">
                    <div className="text-[var(--text-sm)] font-[var(--font-weight-bold)] text-sd-red-60">{row.akan_pensiun} orang</div>
                    <div className="text-[var(--text-xs)] text-sd-gray-40">{row.pct_dari_total}% dari total</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="flex items-center gap-[8px] mb-[4px]">
              <CheckCircle className="w-[16px] h-[16px] text-sd-green-60" />
              <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90">Bottom 5 Unit Paling Aman</h3>
            </div>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">Unit yang paling tidak berisiko kehilangan pegawai dari pensiun</p>
            <div className="space-y-[10px]">
              {unitPensiunSafe.map((row, idx) => (
                <div key={idx} className="flex items-center gap-[10px]">
                  <div className="w-[20px] text-[var(--text-xs)] text-sd-gray-40 text-center font-[var(--font-weight-semibold)]">{idx + 1}</div>
                  <div className="flex-1 text-[var(--text-sm)] text-sd-gray-90">{row.unit}</div>
                  <div className="text-right">
                    <div className="text-[var(--text-sm)] font-[var(--font-weight-bold)] text-sd-green-60">{row.akan_pensiun} orang</div>
                    <div className="text-[var(--text-xs)] text-sd-gray-40">{row.pct_dari_total}% dari total</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tab 4: Kinerja (renamed from Kinerja & Pengembangan Talenta)
function KinerjaTalenta({ selectedUnit, unitData }: { selectedUnit: string; unitData: any }) {
  const {
    kinerjaData, nineBoxData, kinerjaPerUnitData, topJabatanPerluPerhatianData,
    trendKinerjaData, aspekPenilaianData, driverKinerjaData, driverPotensialData,
    distribusiJPData, realisasiPelatihanData,
    kinerjaPositifPct, c5AsStr, talentaSuksesiStr, talentaPotensialStr,
  } = unitData;
  const talentaBelumPeta: number = unitData.talentaBelumPeta ?? Math.round((unitData.totalASN ?? 0) * 0.08);
  const perhatianPct = 100 - kinerjaPositifPct;

  // Color-coded ninebox cell style based on box number (row * 3 + col, 1-indexed)
  const getNineBoxStyle = (rowIdx: number, colIdx: number) => {
    // rowIdx 0=Tinggi, 1=Sedang, 2=Rendah; colIdx 0=Kurang, 1=Kinerja, 2=Baik
    const boxNum = (2 - rowIdx) * 3 + colIdx + 1; // 1-9, bottom-left=1, top-right=9
    if (boxNum <= 3) return { bg: 'var(--sd-red-5)', border: 'var(--sd-red-60)', text: 'var(--sd-red-60)' };
    if (boxNum <= 6) return { bg: 'var(--sd-warning-surface)', border: 'var(--sd-yellow-50)', text: 'var(--sd-yellow-50)' };
    return { bg: 'var(--sd-green-5)', border: 'var(--sd-green-60)', text: 'var(--sd-green-60)' };
  };

  // Distribusi kinerja per jenis jabatan
  const kinerjaPerJabatanData = [
    { jenis: 'JPT', 'Sangat Baik': 45, 'Baik': 40, 'Cukup': 10, 'Kurang': 4, 'Sangat Kurang': 1 },
    { jenis: 'Administrator', 'Sangat Baik': 38, 'Baik': 42, 'Cukup': 14, 'Kurang': 5, 'Sangat Kurang': 1 },
    { jenis: 'Pengawas', 'Sangat Baik': 32, 'Baik': 45, 'Cukup': 16, 'Kurang': 6, 'Sangat Kurang': 1 },
    { jenis: 'Fungsional', 'Sangat Baik': 30, 'Baik': 44, 'Cukup': 18, 'Kurang': 7, 'Sangat Kurang': 1 },
    { jenis: 'Pelaksana', 'Sangat Baik': 22, 'Baik': 43, 'Cukup': 24, 'Kurang': 9, 'Sangat Kurang': 2 },
  ];

  // Top 5 / Bottom 5 unit for kinerja
  const top5UnitKinerja = [
    { unit: 'Inspektorat I', positif: 94 },
    { unit: 'Biro Perencanaan', positif: 92 },
    { unit: 'Pus. Asesmen', positif: 90 },
    { unit: 'Pusdatin', positif: 88 },
    { unit: 'Dit. SD', positif: 87 },
  ];
  const bottom5UnitKinerja = [
    { unit: 'Dit. SMK', positif: 68 },
    { unit: 'Biro OSDM', positif: 70 },
    { unit: 'Pus. Pembinaan', positif: 72 },
    { unit: 'Balai Bahasa', positif: 74 },
    { unit: 'Dit. PLK', positif: 75 },
  ];

  // Scatter plot data — unit vs gap (plan vs realisasi)
  const scatterDevData = [
    { unit: 'Setjen', plan: 88, realisasi: 45, size: 320 },
    { unit: 'Itjen', plan: 82, realisasi: 68, size: 180 },
    { unit: 'Ditjen PAUD', plan: 75, realisasi: 38, size: 410 },
    { unit: 'Ditjen Vokasi', plan: 70, realisasi: 42, size: 290 },
    { unit: 'BSKAP', plan: 90, realisasi: 55, size: 150 },
    { unit: 'Badan Bahasa', plan: 65, realisasi: 52, size: 120 },
  ];

  // Percentile JP histogram
  const percentileJPData = [
    { range: '0–5 JP', pct: 35 },
    { range: '6–10 JP', pct: 28 },
    { range: '11–15 JP', pct: 18 },
    { range: '16–20 JP', pct: 12 },
    { range: '>20 JP', pct: 7 },
  ];

  // Trend realisasi (% of employees)
  const trendRealisasiPct = [
    { periode: 'Tw1\'25', rencana: 72, realisasi: 38 },
    { periode: 'Tw2\'25', rencana: 78, realisasi: 42 },
    { periode: 'Tw3\'25', rencana: 82, realisasi: 39 },
    { periode: 'Tw4\'25', rencana: 84, realisasi: 41 },
    { periode: 'Tw1\'26', rencana: 85, realisasi: 42.5 },
  ];

  return (
    <div className="space-y-[32px]">
      {/* Page Title */}
      <div>
        <h2 className="text-[24px] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">Kinerja & Talenta ASN</h2>
        <p className="text-[var(--text-sm)] text-sd-gray-60">
          Update terakhir: 24 April 2026, 09:00 WIB
        </p>
      </div>

      {/* Insights Box */}
      <div className="bg-sd-blue-90 rounded-[8px] p-[20px] text-white">
        <div className="flex items-center gap-[10px] mb-[14px]">
          <Lightbulb className="w-[20px] h-[20px] shrink-0" />
          <span className="text-[var(--text-base)] font-[var(--font-weight-semibold)]">Ringkasan Eksekutif Kinerja</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[12px]">
          <div className="bg-white/10 rounded-[6px] p-[14px]">
            <div className="text-[var(--text-xs)] opacity-70 uppercase tracking-wide mb-[6px]">Kualitas Performa</div>
            <p className="text-[var(--text-sm)] leading-[1.5]">{kinerjaPositifPct}% ASN berkinerja positif (Baik + Sangat Baik). Organisasi <span className="font-[var(--font-weight-semibold)]">ditopang kinerja sehat</span>.</p>
          </div>
          <div className="bg-white/10 rounded-[6px] p-[14px]">
            <div className="text-[var(--text-xs)] opacity-70 uppercase tracking-wide mb-[6px]">Komposisi Talenta</div>
            <p className="text-[var(--text-sm)] leading-[1.5]">Talenta suksesi (box 7-9) berjumlah {talentaSuksesiStr}. Komposisi <span className="font-[var(--font-weight-semibold)]">cukup kuat</span> namun perlu diperbesar.</p>
          </div>
          <div className="bg-white/10 rounded-[6px] p-[14px]">
            <div className="text-[var(--text-xs)] opacity-70 uppercase tracking-wide mb-[6px]">Pengembangan Kompetensi</div>
            <p className="text-[var(--text-sm)] leading-[1.5]">Bangkom <span className="font-[var(--font-weight-semibold)]">belum menjadi pengungkit optimal</span>. Realisasi 42.5% vs target 20 JP, rata-rata baru 5 JP/pegawai.</p>
          </div>
          <div className="bg-white/10 rounded-[6px] p-[14px]">
            <div className="text-[var(--text-xs)] opacity-70 uppercase tracking-wide mb-[6px]">Gap Plan vs Realisasi</div>
            <p className="text-[var(--text-sm)] leading-[1.5]">Gap besar antara rencana (85%) dan realisasi (42.5%) — perlu akselerasi di <span className="font-[var(--font-weight-semibold)]">Tw 2 dan Tw 3</span>.</p>
          </div>
        </div>
      </div>

      {/* Distribusi Ninebox — with color groups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
        <div className="lg:col-span-2 bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
          <div className="flex items-center justify-between mb-[16px]">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90">
              Distribusi Kelompok Talenta (Nine-Box)
            </h3>
            <span className="px-[8px] py-[4px] rounded-[4px] text-[var(--text-xs)] bg-sd-gray-0 text-sd-gray-60">
              Periode: Triwulan 1 2026
            </span>
          </div>
          <p className="text-[var(--text-sm)] text-sd-gray-60 mb-[16px]">
            Berdasarkan pemetaan Aspek Kinerja dan Aspek Potensial
          </p>
          <div className="flex gap-[8px] mb-[12px]">
            <span className="px-[10px] py-[4px] rounded-full text-[var(--text-xs)] font-[var(--font-weight-semibold)] bg-sd-red-5 text-sd-red-60">■ Box 1-3: Perlu Perhatian</span>
            <span className="px-[10px] py-[4px] rounded-full text-[var(--text-xs)] font-[var(--font-weight-semibold)] bg-sd-warning-surface text-sd-yellow-50">■ Box 4-6: Standar</span>
            <span className="px-[10px] py-[4px] rounded-full text-[var(--text-xs)] font-[var(--font-weight-semibold)] bg-sd-green-5 text-sd-green-60">■ Box 7-9: Suksesi</span>
          </div>

          {/* Nine-Box Grid with color codes */}
          <div className="grid grid-cols-4 gap-[4px] flex-1">
            <div></div>
            <div className="text-center text-[var(--text-xs)] text-sd-gray-60 pb-[8px]">Kurang</div>
            <div className="text-center text-[var(--text-xs)] text-sd-gray-60 pb-[8px]">Kinerja</div>
            <div className="text-center text-[var(--text-xs)] text-sd-gray-60 pb-[8px]">Baik</div>

            {nineBoxData.map((row, rowIdx) => (
              <React.Fragment key={`row-talent-${rowIdx}`}>
                <div className="flex items-center justify-end pr-[8px] text-[var(--text-xs)] text-sd-gray-60">
                  {row.row}
                </div>
                {row.cols.map((col, colIdx) => {
                  const style = getNineBoxStyle(rowIdx, colIdx);
                  return (
                    <div
                      key={`cell-talent-${rowIdx}-${colIdx}`}
                      className="p-[12px] rounded-[4px] text-center border flex flex-col items-center justify-center"
                      style={{
                        backgroundColor: ['I','II','III'].includes(col.label) ? 'var(--sd-red-5)' : ['IV','V','VI'].includes(col.label) ? 'var(--sd-warning-surface)' : 'var(--sd-green-5)',
                        borderColor:     ['I','II','III'].includes(col.label) ? 'var(--sd-red-60)' : ['IV','V','VI'].includes(col.label) ? 'var(--sd-yellow-50)' : 'var(--sd-green-60)',
                      }}
                    >
                      <div
                        className="text-[var(--text-xs)] mb-[4px]"
                        style={{ color: ['I','II','III'].includes(col.label) ? 'var(--sd-red-60)' : ['IV','V','VI'].includes(col.label) ? 'var(--sd-yellow-50)' : 'var(--sd-green-60)', opacity: 0.8 }}
                      >{col.label}</div>
                      <div
                        className="text-[var(--text-sm)] font-[var(--font-weight-semibold)]"
                        style={{ color: ['I','II','III'].includes(col.label) ? 'var(--sd-red-60)' : ['IV','V','VI'].includes(col.label) ? 'var(--sd-yellow-50)' : 'var(--sd-green-60)' }}
                      >{col.value}</div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {/* Banner: di dalam card nine-box */}
          <div className="flex items-start gap-[12px] bg-[#FFF7ED] border border-[#FDBA74] rounded-[8px] px-[16px] py-[12px] mt-[16px]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-[1px]" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm0 4.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6.5Zm0 7.25a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75Z" fill="var(--sd-yellow-50)"/>
            </svg>
            <div>
              <p className="text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-[#92400E] font-bold">
                {talentaBelumPeta.toLocaleString('id-ID')} pegawai belum lengkap data pemetaan talentanya.
              </p>
              <p className="text-[var(--text-xs)] text-[#B45309] mt-[2px]">
                Lengkapi datanya di menu Kepegawaian.
              </p>
            </div>
          </div>
        </div>

        {/* Highlight — 3 facts per color group */}
        <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
          <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[16px]">
            Highlight per Kelompok
          </h3>
          <div className="space-y-[16px]">
            <div className="p-[12px] rounded-[6px] bg-sd-green-5 border border-sd-green-60">
              <div className="text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-green-60 mb-[8px] uppercase">Box 7-9 — Suksesi</div>
              <div classNam font-bolde="space-y-[4px]">
                <p className="text-[var(--text-xs)] text-sd-gray-90">• {talentaSuksesiStr} talenta siap suksesi (box 7-9)</p>
                <p className="text-[var(--text-xs)] text-sd-gray-90">• Terkonsentrasi di Setjen dan Ditjen GTK</p>
                <p className="text-[var(--text-xs)] text-sd-gray-90">• Proporsi meningkat 1.2% dari Tw 4 2025</p>
              </div>
            </div>
            <div className="p-[12px] rounded-[6px] bg-sd-warning-surface border border-sd-yellow-50">
              <div className="text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-yellow-50 mb-[8px] uppercase">Box 4-6 — Standar</div>
              <div className="space-y-[4px]">
                <p className="text-[var(--text-xs)] text-sd-gray-90">• {c5AsStr} di kelompok standar (terbesar)</p>
                <p className="text-[var(--text-xs)] text-sd-gray-90">• 78% memiliki potensi upgrade ke box atas</p>
                <p className="text-[var(--text-xs)] text-sd-gray-90">• Rekomendasi: percepat bangkom untuk akselerasi</p>
              </div>
            </div>
            <div className="p-[12px] rounded-[6px] bg-sd-red-5 border border-sd-red-60">
              <div className="text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-red-60 mb-[8px] uppercase">Box 1-3 — Perlu Perhatian</div>
              <div className="space-y-[4px]">
                <p className="text-[var(--text-xs)] text-sd-gray-90">• {perhatianPct}% berada di kelompok perhatian</p>
                <p className="text-[var(--text-xs)] text-sd-gray-90">• Paling banyak di unit Biro OSDM dan Dit. SMK</p>
                <p className="text-[var(--text-xs)] text-sd-gray-90">• 3 unit mengalami peningkatan box 1-3 dari periode lalu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section A: Kinerja ASN */}
      <div>
        <div className="flex items-center gap-[16px] mb-[24px]">
          <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90">
            A. Kinerja ASN
          </h3>
          <div className="flex-1 h-[1px] bg-sd-badge-neutral"></div>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] mb-[24px]">
          {/* Distribusi Hasil Kinerja */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="flex items-center justify-between mb-[16px]">
              <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90">
                Distribusi Hasil Kinerja
              </h3>
              <span className="px-[8px] py-[4px] rounded-[4px] text-[var(--text-xs)] bg-sd-gray-0 text-sd-gray-60">
                Periode: Triwulan 1 2026
              </span>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={kinerjaData}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="var(--sd-blue-70)" fill="var(--sd-blue-70)" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Tren Triwulanan */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
              Tren Triwulanan
            </h3>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">
              % Kinerja Positif vs Perlu Perhatian
            </p>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={trendKinerjaData}>
                <XAxis dataKey="periode" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="positif" stroke="var(--sd-blue-50)" name="Kinerja Positif" />
                <Line type="monotone" dataKey="perhatian" stroke="var(--sd-yellow-50)" name="Perlu Perhatian" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* KPI */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="space-y-[20px]">
              <div>
                <div className="text-[var(--text-sm)] text-sd-gray-60 mb-[8px] font-bold">Persentase Pegawai dengan Predikat Kinerja Positif</div>
                <div className="text-[36px] font-[var(--font-weight-bold)] text-primary mb-[4px]">{kinerjaPositifPct}%</div>
                <p className="text-[var(--text-xs)] text-sd-gray-60">Pegawai dengan Predikat Baik dan Sangat Baik</p>
              </div>
              <div>
                <div className="text-[var(--text-sm)] text-sd-gray-60 mb-[8px] font-bold"><span className="font-[var(--font-weight-semibold)]"><span className="font-bold">Persentase Pegawai dengan Predikat Kinerja Perlu Perhatian</span></span></div>
                <div className="text-[36px] font-[var(--font-weight-bold)] text-sd-yellow-50 mb-[4px]">{perhatianPct}%</div>
                <p className="text-[var(--text-xs)] text-sd-gray-60">Pegawai dengan Predikat Butuh Perbaikan, Kurang, Sangat Kurang</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Distribusi per Jenis Jabatan + Top Jabatan Perlu Perhatian */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[24px]">
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] flex flex-col">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px] shrink-0">
              Distribusi Hasil Kerja per Jenis Jabatan
            </h3>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px] shrink-0">
              Persentase kategori kinerja berdasarkan jenis jabatan | Triwulan 1 2026
            </p>
            <div className="flex flex-col flex-1 gap-[10px] min-h-0">
              {kinerjaPerJabatanData.map((row) => (
                <div key={row.jenis} className="flex items-center gap-[8px] flex-1 min-h-0">
                  <div className="shrink-0 text-right text-[12px] text-sd-gray-60" style={{ width: 80 }}>
                    {row.jenis}
                  </div>
                  <div className="flex flex-1 min-h-[24px] h-full rounded-[2px] relative">
                    {[
                      { key: 'Sangat Kurang', color: 'var(--sd-red-60)' },
                      { key: 'Kurang', color: 'var(--sd-yellow-30)' },
                      { key: 'Cukup', color: 'var(--sd-yellow-10)' },
                      { key: 'Baik', color: 'var(--sd-blue-40)' },
                      { key: 'Sangat Baik', color: 'var(--sd-blue-80)' },
                    ].map((cat) => {
                      const val = (row as Record<string, number>)[cat.key];
                      return (
                        <div key={cat.key} style={{ width: `${val}%`, backgroundColor: cat.color }} className="flex items-center justify-center" title={`${cat.key}: ${val}%`}>
                          {val > 8 && <span className="text-[12px] font-[var(--font-weight-semibold)] text-white">{val}%</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-[16px] gap-y-[4px] mt-[12px] shrink-0">
              {[{ key: 'Sangat Kurang', color: 'var(--sd-red-60)' }, { key: 'Kurang', color: 'var(--sd-yellow-30)' }, { key: 'Cukup', color: 'var(--sd-yellow-10)' }, { key: 'Baik', color: 'var(--sd-blue-40)' }, { key: 'Sangat Baik', color: 'var(--sd-blue-80)' }].map(cat => (
                <div key={cat.key} className="flex items-center gap-[5px]">
                  <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-[12px] text-sd-gray-60">{cat.key}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Jabatan Perlu Perhatian — dipindah ke sini */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="flex items-center justify-between mb-[16px]">
              <div>
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
                  Top Jabatan "Perlu Perhatian"
                </h3>
                <p className="text-[var(--text-xs)] text-sd-gray-60">
                  Komposisi jumlah pegawai per indikator
                </p>
              </div>
              <span className="px-[8px] py-[4px] rounded-[4px] text-[var(--text-xs)] bg-sd-gray-0 text-sd-gray-60">
                Periode: Triwulan 1 2026
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-sd-badge-neutral">
                    <th className="text-left py-[8px] px-[8px] text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-60 uppercase">Predikat Kinerja</th>
                    <th className="text-left py-[8px] px-[8px] text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-60 uppercase">Jabatan</th>
                    <th className="text-right py-[8px] px-[8px] text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-60 uppercase">Jumlah Pegawai</th>
                    <th className="text-right py-[8px] px-[8px] text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-60 uppercase">Jumlah Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {topJabatanPerluPerhatianData.map((item, idx) => (
                    <tr key={idx} className="border-b border-sd-gray-0">
                      <td className="py-[10px] px-[8px]">
                        <span className="text-[var(--text-xs)] font-[var(--font-weight-medium)] px-[8px] py-[4px] rounded-[4px]" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                          {item.kategori}
                        </span>
                      </td>
                      <td className="py-[10px] px-[8px] text-[var(--text-sm)] text-sd-gray-90">{item.jabatan}</td>
                      <td className="py-[10px] px-[8px] text-right">
                        <span className="text-[var(--text-sm)] font-[var(--font-weight-semibold)]" style={{ color: item.color }}>{item.jumlah}</span>
                      </td>
                      <td className="py-[10px] px-[8px] text-right">
                        <span className="text-[var(--text-sm)] font-[var(--font-weight-semibold)]" style={{ color: item.color }}>{item.jumlah}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Row 3: Perbandingan antar unit — Top 5 / Bottom 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[24px]">
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="flex items-center gap-[8px] mb-[4px]">
              <div className="w-[8px] h-[8px] rounded-full bg-primary"></div>
              <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90">Top 5 Unit Kinerja Positif Tertinggi</h3>
            </div>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">Proporsi kinerja positif (Baik + Sangat Baik)</p>
            <div className="space-y-[10px]">
              {top5UnitKinerja.map((row, idx) => (
                <div key={idx} className="flex items-center gap-[10px]">
                  <div className="w-[20px] text-[var(--text-xs)] text-sd-gray-40 text-center font-[var(--font-weight-semibold)]">{idx + 1}</div>
                  <div className="flex-1 text-[var(--text-sm)] text-sd-gray-90">{row.unit}</div>
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[80px] bg-sd-badge-neutral rounded-full h-[6px]">
                      <div className="bg-primary h-[6px] rounded-full" style={{ width: `${row.positif}%` }} />
                    </div>
                    <span className="text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-primary w-[36px] text-right">{row.positif}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="flex items-center gap-[8px] mb-[4px]">
              <div className="w-[8px] h-[8px] rounded-full bg-sd-yellow-50"></div>
              <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90">Bottom 5 Unit Pegawai Perlu Perhatian Tertinggi</h3>
            </div>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">Unit dengan proporsi kinerja perlu perhatian terbanyak</p>
            <div className="space-y-[10px]">
              {bottom5UnitKinerja.map((row, idx) => (
                <div key={idx} className="flex items-center gap-[10px]">
                  <div className="w-[20px] text-[var(--text-xs)] text-sd-gray-40 text-center font-[var(--font-weight-semibold)]">{idx + 1}</div>
                  <div className="flex-1 text-[var(--text-sm)] text-sd-gray-90">{row.unit}</div>
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[80px] bg-sd-badge-neutral rounded-full h-[6px]">
                      <div className="bg-sd-yellow-50 h-[6px] rounded-full" style={{ width: `${row.positif}%` }} />
                    </div>
                    <span className="text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-yellow-50 w-[36px] text-right">{row.positif}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4: Distribusi Hasil Kerja per Unit — full width */}
        <div>
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] flex flex-col">
            <div className="flex items-center justify-between mb-[16px]">
              <div>
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
                  Distribusi Hasil Kerja per Unit
                </h3>
                <p className="text-[var(--text-xs)] text-sd-gray-60">
                  Persentase per indikator kinerja di tiap unit utama
                </p>
              </div>
              <span className="px-[8px] py-[4px] rounded-[4px] text-[var(--text-xs)] bg-sd-gray-0 text-sd-gray-60">
                Periode: Triwulan 1 2026
              </span>
            </div>
            {/* Custom stacked bar chart — bypasses Recharts v2 layout="vertical" stacking bug */}
            <div className="flex-1 min-h-0 flex flex-col justify-center">
              <div className="space-y-[10px]">
                {kinerjaPerUnitData.map((row) => (
                  <div key={row.unit} className="flex items-center gap-[8px]">
                    <div className="shrink-0 text-right text-[12px] text-sd-gray-60" style={{ width: 88 }}>
                      {row.unit}
                    </div>
                    <div className="flex flex-1 h-[24px] rounded-[2px] relative">
                      {[
                        { key: 'Sangat Kurang', color: 'var(--sd-red-60)' },
                        { key: 'Kurang', color: 'var(--sd-yellow-30)' },
                        { key: 'Cukup', color: 'var(--sd-yellow-10)' },
                        { key: 'Baik', color: 'var(--sd-blue-40)' },
                        { key: 'Sangat Baik', color: 'var(--sd-blue-80)' },
                      ].map((cat) => {
                        const val = (row as Record<string, number>)[cat.key];
                        return (
                          <div
                            key={cat.key}
                            style={{ width: `${val}%`, backgroundColor: cat.color }}
                            className="flex items-center justify-center relative"
                            title={`${cat.key}: ${val}%`}
                          >
                            {val > 8 && (
                              <span className="text-[12px] font-[var(--font-weight-semibold)] text-white">{val}%</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="shrink-0 text-[12px] text-sd-gray-40">100%</div>
                  </div>
                ))}
              </div>
              {/* X-axis tick labels */}
              <div className="flex justify-between text-[12px] text-sd-gray-40 mt-[8px]" style={{ paddingLeft: 96, paddingRight: 36 }}>
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-x-[16px] gap-y-[4px] mt-[16px]">
                {[
                  { key: 'Sangat Kurang', color: 'var(--sd-red-60)' },
                  { key: 'Kurang', color: 'var(--sd-yellow-30)' },
                  { key: 'Cukup', color: 'var(--sd-yellow-10)' },
                  { key: 'Baik', color: 'var(--sd-blue-40)' },
                  { key: 'Sangat Baik', color: 'var(--sd-blue-80)' },
                ].map((cat) => (
                  <div key={cat.key} className="flex items-center gap-[5px]">
                    <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="text-[12px] text-sd-gray-60">{cat.key}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Section B: Pemetaan Talenta ASN */}
      <div>
        <div className="flex items-center gap-[16px] mb-[24px]">
          <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90">
            B. Pemetaan Talenta ASN
          </h3>
          <div className="flex-1 h-[1px] bg-sd-badge-neutral"></div>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[24px]">
          {/* Tren Rata-rata Aspek */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] flex flex-col">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px] shrink-0">
              Tren Rata-rata Aspek Penilaian
            </h3>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px] shrink-0">
              Perkembangan Aspek Kinerja & Aspek Potensial ASN
            </p>
            <ResponsiveContainer width="100%" className="flex-1 min-h-0">
              <LineChart data={aspekPenilaianData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                <XAxis dataKey="periode" tick={{ fontSize: 11 }} />
                <YAxis domain={[50, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="kinerja" stroke="var(--sd-blue-50)" name="Aspek Kinerja" strokeWidth={2} />
                <Line type="monotone" dataKey="potensial" stroke="var(--sd-yellow-50)" name="Aspek Potensial" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Aspek Penilaian Ninebox — with median */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
              Aspek Penilaian Ninebox
            </h3>
            <p className="text-[var(--text-sm)] text-sd-gray-60 mb-[16px]">
              Evaluasi dua sumbu utama: Aspek Kinerja dan Aspek Potensial ASN
            </p>
            <div className="space-y-[16px]">
              <div className="p-[14px] rounded-[6px] bg-[#EFF6FF] border border-[#BFDBFE]">
                <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[8px]">Aspek Kinerja</div>
                <div className="grid grid-cols-2 gap-[12px]">
                  <div>
                    <div className="text-[var(--text-xs)] text-sd-gray-40 mb-[2px]">Rata-rata</div>
                    <div className="text-[28px] font-[var(--font-weight-bold)] text-primary">75.50</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-xs)] text-sd-gray-40 mb-[2px]">Median</div>
                    <div className="text-[28px] font-[var(--font-weight-bold)] text-sd-blue-50">76.20</div>
                  </div>
                </div>
                <p className="text-[var(--text-xs)] text-sd-gray-60 mt-[6px]">
                  Median &gt; Mean: distribusi cenderung ke atas — performa organisasi <span className="font-[var(--font-weight-semibold)] text-sd-green-60">cukup sehat</span>.
                </p>
              </div>
              <div className="p-[14px] rounded-[6px] bg-[#FFFBEB] border border-[#FDE68A]">
                <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[8px]">Aspek Potensial</div>
                <div className="grid grid-cols-2 gap-[12px]">
                  <div>
                    <div className="text-[var(--text-xs)] text-sd-gray-40 mb-[2px]">Rata-rata</div>
                    <div className="text-[28px] font-[var(--font-weight-bold)] text-sd-yellow-50">69.20</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-xs)] text-sd-gray-40 mb-[2px]">Median</div>
                    <div className="text-[28px] font-[var(--font-weight-bold)] text-sd-yellow-30">67.80</div>
                  </div>
                </div>
                <p className="text-[var(--text-xs)] text-sd-gray-60 mt-[6px]">
                  Median &lt; Mean: outlier potensial tinggi menarik rata-rata ke atas — masih ada <span className="font-[var(--font-weight-semibold)] text-sd-yellow-50">ruang perbaikan signifikan</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Driver Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[24px]">
          {/* Penjabaran Aspek Kinerja */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
              Penjabaran Aspek Kinerja
            </h3>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">
              Tren jumlah pegawai berdasarkan komponen penilaian (Januari – Maret 2026)
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={driverKinerjaData} id="chart-driver-kinerja">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 160]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="kplb" stroke="var(--sd-green-60)" name="KPLB" strokeWidth={2} />
                <Line type="monotone" dataKey="penghargaan" stroke="var(--sd-yellow-50)" name="Penghargaan" strokeWidth={2} />
                <Line type="monotone" dataKey="penugasan" stroke="var(--sd-blue-50)" name="Penugasan" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Penjabaran Aspek Potensial */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
              Penjabaran Aspek Potensial
            </h3>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">
              Tren jumlah pegawai berdasarkan komponen penilaian (Januari – Maret 2026)
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={driverPotensialData} id="chart-driver-potensial">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 1800]} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="asesmen_kompetensi" stroke="var(--sd-blue-90)" name="Asesmen Kompetensi" strokeWidth={2} />
                <Line type="monotone" dataKey="asesmen_potensi" stroke="var(--sd-blue-40)" name="Asesmen Potensi" strokeWidth={2} />
                <Line type="monotone" dataKey="pelatihan" stroke="var(--sd-yellow-50)" name="Pelatihan" strokeWidth={2} />
                <Line type="monotone" dataKey="pendidikan" stroke="#8B5CF6" name="Pendidikan S2/S3" strokeWidth={2} />
                <Line type="monotone" dataKey="sertifikasi" stroke="var(--sd-green-60)" name="Sertifikasi" strokeWidth={2} />
                <Line type="monotone" dataKey="hukuman" stroke="var(--sd-red-60)" strokeDasharray="5 5" name="Hukuman Disiplin" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section C: Pengembangan Kompetensi: Rencana vs Realisasi */}
      <div style={{ display: 'none' }}>
        <div className="flex items-center gap-[16px] mb-[24px]">
          <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90">
            C. Pengembangan Kompetensi: Rencana vs Realisasi
          </h3>
          <div className="flex-1 h-[1px] bg-sd-badge-neutral"></div>
        </div>

        {/* Dua card utama: Perencanaan (kiri) & Realisasi (kanan) — masing-masing dengan gauge + detail per unit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[24px]">

          {/* ── KIRI: Perencanaan Bangkom ── */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            {/* Gauge */}
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[10px]">Perencanaan Bangkom</div>
            <div className="flex items-end justify-between mb-[6px]">
              <div>
                <div className="text-[36px] font-[var(--font-weight-bold)] text-primary leading-none">85%</div>
                <div className="text-[var(--text-xs)] text-sd-gray-60">dari total pegawai</div>
              </div>
              <div className="text-right">
                <div className="text-[var(--text-xs)] text-sd-gray-60">Belum berencana</div>
                <div className="text-[20px] font-[var(--font-weight-bold)] text-sd-red-60">15%</div>
              </div>
            </div>
            <div className="w-full bg-sd-badge-neutral rounded-full h-[10px] mb-[6px]">
              <div className="bg-primary h-[10px] rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-[var(--text-xs)] text-sd-gray-40 mb-[20px]">
              Target: 100% — 15% belum menyusun rencana bangkom
            </p>

            {/* Per Unit */}
            <div className="border-t border-sd-badge-neutral pt-[16px]">
              <p className="text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-60 uppercase tracking-wide mb-[12px]">
                Gap per Unit
              </p>
              <div className="space-y-[8px]">
                {([
                  { unit: 'Itjen',            sudah: 94, belum: 6 },
                  { unit: 'Biro Perencanaan', sudah: 91, belum: 9 },
                  { unit: 'Pusdatin',         sudah: 89, belum: 11 },
                  { unit: 'BSKAP',            sudah: 87, belum: 13 },
                  { unit: 'Setjen',           sudah: 85, belum: 15 },
                  { unit: 'Ditjen PAUD',      sudah: 78, belum: 22 },
                  { unit: 'Ditjen Vokasi',    sudah: 75, belum: 25 },
                  { unit: 'Biro OSDM',        sudah: 72, belum: 28 },
                  { unit: 'Dit. SMK',         sudah: 68, belum: 32 },
                ]).map((row, idx) => (
                  <div key={idx} className="flex items-center gap-[8px]">
                    <div className="shrink-0 text-[12px] text-sd-gray-60 text-right" style={{ width: 96 }}>{row.unit}</div>
                    <div className="flex flex-1 h-[18px] rounded-[2px] overflow-hidden">
                      <div className="flex items-center justify-center bg-primary/70" style={{ width: `${row.sudah}%` }}>
                        {row.sudah > 14 && <span className="text-[12px] font-[var(--font-weight-semibold)] text-white">{row.sudah}%</span>}
                      </div>
                      <div className="flex items-center justify-center bg-sd-red-5" style={{ width: `${row.belum}%` }}>
                        {row.belum > 10 && <span className="text-[12px] font-[var(--font-weight-semibold)] text-sd-red-60">{row.belum}%</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-[14px] mt-[10px]">
                <div className="flex items-center gap-[4px]"><div className="w-[9px] h-[9px] rounded-sm bg-primary/70"></div><span className="text-[12px] text-sd-gray-60">Sudah berencana</span></div>
                <div className="flex items-center gap-[4px]"><div className="w-[9px] h-[9px] rounded-sm bg-sd-red-5 border border-sd-red-60"></div><span className="text-[12px] text-sd-gray-60">Belum berencana</span></div>
              </div>
            </div>
          </div>

          {/* ── KANAN: Realisasi Pelatihan ── */}
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            {/* Gauge */}
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[10px]">Realisasi Pelatihan</div>
            <div className="flex items-end justify-between mb-[6px]">
              <div>
                <div className="text-[36px] font-[var(--font-weight-bold)] text-sd-yellow-50 leading-none">42.5%</div>
                <div className="text-[var(--text-xs)] text-sd-gray-60">dari yang berencana</div>
              </div>
              <div className="text-right">
                <div className="text-[var(--text-xs)] text-sd-gray-60">Belum terealisasi</div>
                <div className="text-[20px] font-[var(--font-weight-bold)] text-sd-red-60">57.5%</div>
              </div>
            </div>
            <div className="w-full bg-sd-badge-neutral rounded-full h-[10px] mb-[6px]">
              <div className="bg-sd-yellow-50 h-[10px] rounded-full" style={{ width: '42.5%' }} />
            </div>
            <p className="text-[var(--text-xs)] text-sd-gray-40 mb-[20px]">
              Dari 85% yang berencana, hanya 42.5% sudah mengikuti pelatihan
            </p>

            {/* Gap per Unit */}
            <div className="border-t border-sd-badge-neutral pt-[16px]">
              <p className="text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-60 uppercase tracking-wide mb-[12px]">
                Gap Rencana vs Realisasi per Unit
              </p>
              <div className="space-y-[8px]">
                {scatterDevData.map((d, idx) => {
                  const gap = d.plan - d.realisasi;
                  return (
                    <div key={idx} className="flex items-center gap-[8px]">
                      <div className="shrink-0 text-[12px] text-sd-gray-60" style={{ width: 80 }}>{d.unit}</div>
                      <div className="flex-1 relative h-[18px]">
                        <div className="absolute inset-0 flex">
                          <div className="bg-sd-yellow-50/25 rounded-sm" style={{ width: `${d.realisasi}%` }}></div>
                          <div className="bg-sd-red-60/15 rounded-sm" style={{ width: `${gap}%` }}></div>
                        </div>
                        <div className="absolute h-full" style={{ left: `${d.realisasi}%` }}>
                          <div className="w-[2px] h-full bg-sd-red-60"></div>
                        </div>
                      </div>
                      <div className="shrink-0 text-[12px] text-sd-yellow-50 w-[32px] text-right">{d.realisasi}%</div>
                      <div className="shrink-0 text-[12px] text-sd-red-60 w-[32px] text-right">-{gap}%</div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-[14px] mt-[10px]">
                <div className="flex items-center gap-[4px]"><div className="w-[9px] h-[9px] rounded-sm bg-sd-yellow-50/25"></div><span className="text-[12px] text-sd-gray-60">Realisasi</span></div>
                <div className="flex items-center gap-[4px]"><div className="w-[9px] h-[9px] rounded-sm bg-sd-red-60/15 border border-sd-red-60"></div><span className="text-[12px] text-sd-gray-60">Gap ke rencana</span></div>
              </div>
              <p className="text-[var(--text-xs)] text-sd-gray-40 mt-[8px] italic">Itjen gap terkecil — best practice untuk unit lain.</p>
            </div>
          </div>
        </div>

        {/* Tren Perencanaan & Realisasi — full width */}
        <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] mb-[24px]">
          <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">
            Tren Perencanaan dan Realisasi Pelatihan
          </h3>
          <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">
            % pegawai yang berencana vs yang sudah terealisasi per triwulan
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendRealisasiPct}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
              <XAxis dataKey="periode" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend />
              <Line type="monotone" dataKey="rencana" stroke="var(--sd-blue-90)" name="% Berencana" strokeWidth={2.5} dot={{ r: 4, fill: 'var(--sd-blue-90)', strokeWidth: 0 }} />
              <Line type="monotone" dataKey="realisasi" stroke="var(--sd-yellow-50)" name="% Terealisasi" strokeWidth={2.5} strokeDasharray="6 3" dot={{ r: 4, fill: 'white', stroke: 'var(--sd-yellow-50)', strokeWidth: 2.5 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-[var(--text-xs)] text-sd-gray-40 mt-[8px] italic">
            Gap rencana–realisasi stabil di ~42 poin — perlu intervensi sistemik.
          </p>
        </div>
      </div>
    </div>
  );
}

// Tab 5: Tata Kelola Organisasi
function TataKelolaOrganisasi({ selectedUnit, unitData }: { selectedUnit: string; unitData: any }) {
  const { trendSakipData, trendZIStackedData, trendRBData } = unitData;

  const sakipPredikat = { nilai: 83.1, predikat: 'A', prevNilai: 81.5 };
  const aspekSAKIP = [
    { aspek: 'Perencanaan Kinerja', nilai: 28.5, maxNilai: 30, delta: 1.2 },
    { aspek: 'Pengukuran Kinerja', nilai: 19.8, maxNilai: 25, delta: 0.8 },
    { aspek: 'Pelaporan Kinerja', nilai: 13.2, maxNilai: 15, delta: -0.3 },
    { aspek: 'Evaluasi Internal', nilai: 9.6, maxNilai: 10, delta: 0.5 },
    { aspek: 'Capaian Kinerja', nilai: 12.0, maxNilai: 20, delta: 0.4 },
  ];
  const unitSakipData = [
    { unit: 'Itjen', nilai: 88.2, predikat: 'AA', delta: 1.5 },
    { unit: 'Setjen', nilai: 85.4, predikat: 'A', delta: 0.8 },
    { unit: 'BSKAP', nilai: 83.1, predikat: 'A', delta: 1.1 },
    { unit: 'Badan Bahasa', nilai: 80.7, predikat: 'A', delta: -0.4 },
    { unit: 'Ditjen PAUD', nilai: 78.3, predikat: 'BB', delta: 2.1 },
    { unit: 'Ditjen Vokasi', nilai: 75.9, predikat: 'BB', delta: 0.3 },
  ];
  const aspekZIData = [
    { aspek: 'Manajemen Perubahan', nilai: 8.2, maxNilai: 10, delta: 0.5 },
    { aspek: 'Penataan Tatalaksana', nilai: 7.8, maxNilai: 10, delta: 0.3 },
    { aspek: 'Penataan SDM', nilai: 9.1, maxNilai: 10, delta: 0.7 },
    { aspek: 'Penguatan Akuntabilitas', nilai: 8.5, maxNilai: 10, delta: -0.2 },
    { aspek: 'Penguatan Pengawasan', nilai: 7.4, maxNilai: 10, delta: 0.4 },
    { aspek: 'Peningkatan Layanan Publik', nilai: 9.3, maxNilai: 10, delta: 0.6 },
  ];
  const unitZIData = {
    belumZI: [{ unit: 'Dit. Penmas', aspekLemah: 'Manajemen Perubahan' }, { unit: 'Dit. PLK', aspekLemah: 'Penguatan Pengawasan' }],
    wbk: [{ unit: 'Pusdatin', aspekLemah: 'Penataan Tatalaksana' }, { unit: 'Biro Perencanaan', aspekLemah: 'Peningkatan Layanan' }, { unit: 'Inspektorat I', aspekLemah: 'Manajemen Perubahan' }],
    wbbm: [{ unit: 'Biro OSDM', aspekLemah: 'Penguatan Pengawasan' }, { unit: 'Dit. SD', aspekLemah: 'Penataan SDM' }],
  };
  const trendKelembagaanData = [
    { year: '2021', nilai: 58 }, { year: '2022', nilai: 63 }, { year: '2023', nilai: 68 },
    { year: '2024', nilai: 71 }, { year: '2025', nilai: 74 },
  ];
  const aspekKelembagaan = [
    { aspek: 'Kelembagaan', nilai: 82, delta: 5 },
    { aspek: 'Proses Bisnis', nilai: 74, delta: 3 },
    { aspek: 'SDM Aparatur', nilai: 71, delta: 4 },
    { aspek: 'Sarana & Prasarana', nilai: 68, delta: 2 },
  ];
  const unitKelembagaan = {
    top: [{ unit: 'Pusdatin', val: 'P5' }, { unit: 'Biro Perencanaan', val: 'P5' }, { unit: 'Itjen', val: 'P4' }],
    bottom: [{ unit: 'Dit. PLK', val: 'P2' }, { unit: 'Dit. Penmas', val: 'P2' }, { unit: 'Balai Bahasa', val: 'P3' }],
    membaik: [{ unit: 'Ditjen Vokasi', val: '+2 level' }, { unit: 'BSKAP', val: '+1 level' }],
    stagnan: [{ unit: 'Badan Bahasa', val: '0' }, { unit: 'Setjen', val: '0' }],
  };
  const areaRB = [
    { area: 'Manajemen Perubahan', nilai: 88, target: 90 },
    { area: 'Deregulasi Kebijakan', nilai: 82, target: 85 },
    { area: 'Penguatan Organisasi', nilai: 79, target: 85 },
    { area: 'Penataan Tatalaksana', nilai: 85, target: 88 },
    { area: 'Penataan SDM', nilai: 92, target: 90 },
    { area: 'Penguatan Akuntabilitas', nilai: 87, target: 90 },
    { area: 'Penguatan Pengawasan', nilai: 81, target: 88 },
    { area: 'Peningkatan Layanan', nilai: 94, target: 92 },
  ];

  const dc = (d: number) => d > 0 ? 'text-sd-green-60' : d < 0 ? 'text-sd-red-60' : 'text-sd-gray-40';
  const ds = (d: number) => d > 0 ? '+' : '';

  return (
    <div className="space-y-[32px]">
      <div>
        <h2 className="text-[24px] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">Tata Kelola Organisasi</h2>
        <p className="text-[var(--text-sm)] text-sd-gray-60">Update terakhir: 24 April 2026, 09:00 WIB</p>
      </div>

      {/* Insights Box */}
      <div className="bg-sd-blue-90 rounded-[8px] p-[20px] text-white">
        <div className="flex items-center gap-[10px] mb-[14px]">
          <Lightbulb className="w-[20px] h-[20px] shrink-0" />
          <span className="text-[var(--text-base)] font-[var(--font-weight-semibold)]">Ringkasan Eksekutif Tata Kelola</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]">
          <div className="bg-white/10 rounded-[6px] p-[14px]">
            <div className="text-[var(--text-xs)] opacity-70 uppercase tracking-wide mb-[6px]">Governance Signal Terkuat</div>
            <p className="text-[var(--text-sm)] leading-[1.5]">Penataan SDM dan Peningkatan Layanan Publik menjadi <span className="font-[var(--font-weight-semibold)]">pengungkit utama</span> — konsisten di atas target 3 tahun berturut-turut.</p>
          </div>
          <div className="bg-white/10 rounded-[6px] p-[14px]">
            <div className="text-[var(--text-xs)] opacity-70 uppercase tracking-wide mb-[6px]">Governance Area Terlemah</div>
            <p className="text-[var(--text-sm)] leading-[1.5]">Penguatan Pengawasan dan Manajemen Perubahan masih di bawah target — <span className="font-[var(--font-weight-semibold)]">2 unit belum ZI</span>, 3 unit stagnan di level P3.</p>
          </div>
          <div className="bg-white/10 rounded-[6px] p-[14px]">
            <div className="text-[var(--text-xs)] opacity-70 uppercase tracking-wide mb-[6px]">Tata Kelola sebagai Enabler</div>
            <p className="text-[var(--text-sm)] leading-[1.5]">Mulai menjadi <span className="font-[var(--font-weight-semibold)]">enabler nyata</span>: SAKIP naik ke A, RB predikat AA, 2 unit baru raih WBBM — namun gap implementasi di unit Es. II masih besar.</p>
          </div>
        </div>
      </div>

      {/* Section A: SAKIP */}
      <div>
        <div className="mb-[20px]">
          <div className="flex items-center gap-[16px] mb-[4px]">
            <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90">A. Penilaian SAKIP</h3>
            <div className="flex-1 h-[1px] bg-sd-badge-neutral"></div>
          </div>
          <span className="text-[var(--text-xs)] text-sd-gray-60">Fokus: akuntabilitas kinerja organisasi secara tahunan</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] mb-[20px]">
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[12px]">Nilai SAKIP Terbaru</div>
            <div className="flex items-end gap-[12px] mb-[8px]">
              <div className="text-[48px] font-[var(--font-weight-bold)] text-sd-gray-90 leading-none">{sakipPredikat.nilai}</div>
              <div className="mb-[4px]">
                <div className="text-[24px] font-[var(--font-weight-bold)] text-primary">{sakipPredikat.predikat}</div>
                <div className="text-[var(--text-xs)] text-sd-gray-60">Predikat</div>
              </div>
            </div>
            <div className="flex items-center gap-[4px] text-sd-green-60 text-[var(--text-sm)] mb-[8px]">
              <TrendingUp className="w-[14px] h-[14px]" />
              <span>+{(sakipPredikat.nilai - sakipPredikat.prevNilai).toFixed(1)} vs tahun lalu ({sakipPredikat.prevNilai})</span>
            </div>
            <p className="text-[var(--text-xs)] text-sd-gray-40 italic">Tren meningkat — akuntabilitas kinerja semakin kuat.</p>
          </div>
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] flex flex-col">
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[12px] shrink-0">Tren Nilai SAKIP (2021–2025)</div>
            <ResponsiveContainer width="100%" className="flex-1 min-h-0">
              <BarChart data={trendSakipData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis domain={[70, 90]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="var(--sd-yellow-30)" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="value" position="top" style={{ fontSize: '12px', fill: 'var(--sd-gray-60)' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[12px]">Aspek Penilaian SAKIP</div>
            <div className="space-y-[10px]">
              {aspekSAKIP.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[var(--text-xs)] mb-[3px]">
                    <span className="text-sd-gray-90">{item.aspek}</span>
                    <div className="flex items-center gap-[6px]">
                      <span className={`font-[var(--font-weight-semibold)] ${dc(item.delta)}`}>{ds(item.delta)}{item.delta}</span>
                      <span className="text-sd-gray-60">{item.nilai}/{item.maxNilai}</span>
                    </div>
                  </div>
                  <div className="w-full bg-sd-badge-neutral rounded-full h-[5px]">
                    <div className="bg-sd-yellow-30 h-[5px] rounded-full" style={{ width: `${(item.nilai / item.maxNilai) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-[10px] flex gap-[8px] flex-wrap">
              <span className="px-[8px] py-[3px] rounded-full text-[var(--text-xs)] bg-sd-green-5 text-sd-green-60 font-[var(--font-weight-medium)]">✓ Terkuat: Perencanaan</span>
              <span className="px-[8px] py-[3px] rounded-full text-[var(--text-xs)] bg-sd-red-5 text-sd-red-60 font-[var(--font-weight-medium)]">✗ Terlemah: Capaian</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
          <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-sd-gray-90 mb-[4px]">Distribusi Unit per Predikat SAKIP</h3>
          <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[16px]">Perbandingan nilai akhir unit utama vs tahun sebelumnya</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sd-badge-neutral">
                  <th className="text-left py-[8px] px-[12px] text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-60 uppercase">Unit</th>
                  <th className="text-center py-[8px] px-[12px] text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-60 uppercase">Nilai</th>
                  <th className="text-center py-[8px] px-[12px] text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-60 uppercase">Predikat</th>
                  <th className="text-center py-[8px] px-[12px] text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-sd-gray-60 uppercase">Delta</th>
                </tr>
              </thead>
              <tbody>
                {unitSakipData.map((row, idx) => (
                  <tr key={idx} className="border-b border-sd-gray-0 hover:bg-sd-gray-0">
                    <td className="py-[10px] px-[12px] text-[var(--text-sm)] text-sd-gray-90">{row.unit}</td>
                    <td className="py-[10px] px-[12px] text-center text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-sd-gray-90">{row.nilai}</td>
                    <td className="py-[10px] px-[12px] text-center">
                      <span className={`px-[8px] py-[3px] rounded-full text-[var(--text-xs)] font-[var(--font-weight-semibold)] ${row.predikat === 'AA' ? 'bg-sd-green-5 text-sd-green-60' : row.predikat === 'A' ? 'bg-[#EFF6FF] text-primary' : 'bg-sd-warning-surface text-sd-yellow-50'}`}>{row.predikat}</span>
                    </td>
                    <td className="py-[10px] px-[12px] text-center">
                      <span className={`text-[var(--text-sm)] font-[var(--font-weight-semibold)] ${dc(row.delta)}`}>{ds(row.delta)}{row.delta}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[10px] text-[var(--text-xs)] text-sd-gray-40 italic">Aspek terlemah rata-rata: Capaian Kinerja — perlu target output yang lebih terukur.</p>
        </div>
      </div>

      {/* Section B: Zona Integritas */}
      <div>
        <div className="mb-[20px]">
          <div className="flex items-center gap-[16px] mb-[4px]">
            <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90">B. Zona Integritas (ZI)</h3>
            <div className="flex-1 h-[1px] bg-sd-badge-neutral"></div>
          </div>
          <span className="text-[var(--text-xs)] text-sd-gray-60">Fokus: kematangan integritas unit kerja</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] mb-[20px]">
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] text-center">
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[12px]">Predikat ZI Terbaru</div>
            <div className="inline-block px-[28px] py-[14px] rounded-[8px] bg-primary text-white mb-[10px]">
              <div className="text-[40px] font-[var(--font-weight-bold)]">WBBM</div>
            </div>
            <p className="text-[var(--text-xs)] text-sd-gray-60 mb-[8px]">{unitData.unitWBBM} unit WBBM · {unitData.unitWBK} unit WBK</p>
            <div className="flex items-center justify-center gap-[4px] text-sd-green-60 text-[var(--text-xs)]">
              <TrendingUp className="w-[12px] h-[12px]" />
              <span>+2 unit baru raih WBBM vs tahun lalu</span>
            </div>
          </div>
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] flex flex-col">
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[12px] shrink-0">Tren ZI 5 Tahun</div>
            <ResponsiveContainer width="100%" className="flex-1 min-h-0">
              <BarChart data={trendZIStackedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Belum ZI" stackId="a" fill="var(--sd-red-60)" />
                <Bar dataKey="WBK" stackId="a" fill="var(--sd-blue-50)" />
                <Bar dataKey="WBBM" stackId="a" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[12px]">6 Aspek Pembangunan ZI</div>
            <div className="space-y-[8px]">
              {aspekZIData.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[var(--text-xs)] mb-[3px]">
                    <span className="text-sd-gray-90">{item.aspek}</span>
                    <div className="flex items-center gap-[6px]">
                      <span className={`font-[var(--font-weight-semibold)] ${dc(item.delta)}`}>{ds(item.delta)}{item.delta}</span>
                      <span className="text-sd-gray-60">{item.nilai}</span>
                    </div>
                  </div>
                  <div className="w-full bg-sd-badge-neutral rounded-full h-[5px]">
                    <div className="bg-primary h-[5px] rounded-full" style={{ width: `${(item.nilai / item.maxNilai) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-[10px] flex gap-[8px] flex-wrap">
              <span className="px-[8px] py-[3px] rounded-full text-[var(--text-xs)] bg-sd-green-5 text-sd-green-60 font-[var(--font-weight-medium)]">✓ Terkuat: Layanan Publik</span>
              <span className="px-[8px] py-[3px] rounded-full text-[var(--text-xs)] bg-sd-red-5 text-sd-red-60 font-[var(--font-weight-medium)]">✗ Terlemah: Pengawasan</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
          {([
            { label: 'Belum ZI', color: 'var(--sd-red-60)', bg: 'var(--sd-red-5)', units: unitZIData.belumZI },
            { label: 'WBK', color: 'var(--sd-blue-50)', bg: '#EFF6FF', units: unitZIData.wbk },
            { label: 'WBBM', color: '#10B981', bg: '#ECFDF5', units: unitZIData.wbbm },
          ] as const).map(group => (
            <div key={group.label} className="bg-white rounded-[8px] border border-sd-gray-30 p-[16px]">
              <div className="flex items-center gap-[8px] mb-[12px]">
                <span className="px-[10px] py-[4px] rounded-full text-[var(--text-xs)] font-[var(--font-weight-semibold)]" style={{ backgroundColor: group.bg, color: group.color }}>{group.label}</span>
                <span className="text-[var(--text-xs)] text-sd-gray-40">{group.units.length} unit</span>
              </div>
              <div className="space-y-[6px]">
                {group.units.map((u, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[var(--text-xs)] text-sd-gray-90">{u.unit}</span>
                    <span className="text-[var(--text-xs)] text-sd-red-60">Lemah: {u.aspekLemah}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section C: Indeks Kapabilitas Kelembagaan */}
      <div>
        <div className="mb-[20px]">
          <div className="flex items-center gap-[16px] mb-[4px]">
            <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90">C. Indeks Kapabilitas Kelembagaan</h3>
            <div className="flex-1 h-[1px] bg-sd-badge-neutral"></div>
          </div>
          <span className="text-[var(--text-xs)] text-sd-gray-60">Berdasarkan PermenPANRB No. 4 Tahun 2026</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] mb-[20px]">
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] text-center">
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[12px]">Level Terbaru</div>
            <div className="text-[56px] font-[var(--font-weight-bold)] text-primary leading-none mb-[4px]">P4</div>
            <div className="text-[var(--text-sm)] text-sd-gray-60 mb-[10px]">Skor: 74/100</div>
            <div className="flex items-center justify-center gap-[4px] text-sd-green-60 text-[var(--text-xs)] mb-[8px]">
              <TrendingUp className="w-[12px] h-[12px]" />
              <span>+1 level vs tahun lalu (P3)</span>
            </div>
            <p className="text-[var(--text-xs)] text-sd-gray-40 italic">Tren meningkat — organisasi semakin matang secara kelembagaan.</p>
          </div>
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] flex flex-col">
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[12px] shrink-0">Tren Skor Kelembagaan (2021–2025)</div>
            <ResponsiveContainer width="100%" className="flex-1 min-h-0">
              <BarChart data={trendKelembagaanData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis domain={[50, 80]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="nilai" fill="#8B5CF6" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="nilai" position="top" style={{ fontSize: '12px', fill: 'var(--sd-gray-60)' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
            <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[12px]">4 Aspek Penilaian</div>
            <div className="space-y-[10px]">
              {aspekKelembagaan.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[var(--text-xs)] mb-[3px]">
                    <span className="text-sd-gray-90">{item.aspek}</span>
                    <div className="flex items-center gap-[6px]">
                      <span className={`font-[var(--font-weight-semibold)] ${dc(item.delta)}`}>{ds(item.delta)}{item.delta}</span>
                      <span className="text-sd-gray-60">{item.nilai}</span>
                    </div>
                  </div>
                  <div className="w-full bg-sd-badge-neutral rounded-full h-[5px]">
                    <div className="bg-[#8B5CF6] h-[5px] rounded-full" style={{ width: `${item.nilai}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-[10px] flex gap-[8px] flex-wrap">
              <span className="px-[8px] py-[3px] rounded-full text-[var(--text-xs)] bg-sd-green-5 text-sd-green-60 font-[var(--font-weight-medium)]">✓ Terkuat: Kelembagaan</span>
              <span className="px-[8px] py-[3px] rounded-full text-[var(--text-xs)] bg-sd-red-5 text-sd-red-60 font-[var(--font-weight-medium)]">✗ Terlemah: Sarana & Prasarana</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[16px]">
          {([
            { label: 'Top Unit', color: 'var(--sd-green-60)', items: unitKelembagaan.top },
            { label: 'Bottom Unit', color: 'var(--sd-red-60)', items: unitKelembagaan.bottom },
            { label: 'Paling Membaik', color: 'var(--sd-yellow-50)', items: unitKelembagaan.membaik },
            { label: 'Stagnan', color: 'var(--sd-gray-40)', items: unitKelembagaan.stagnan },
          ] as const).map(group => (
            <div key={group.label} className="bg-white rounded-[8px] border border-sd-gray-30 p-[14px]">
              <div className="text-[var(--text-xs)] font-[var(--font-weight-semibold)] uppercase tracking-wide mb-[10px]" style={{ color: group.color }}>{group.label}</div>
              <div className="space-y-[6px]">
                {group.items.map((u, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[var(--text-xs)] text-sd-gray-90">{u.unit}</span>
                    <span className="text-[var(--text-xs)] font-[var(--font-weight-semibold)]" style={{ color: group.color }}>{u.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section D: Reformasi Birokrasi — kementerian only */}
      {selectedUnit === 'kementerian' && (
        <div>
          <div className="mb-[20px]">
            <div className="flex items-center gap-[16px] mb-[4px]">
              <h3 className="text-[18px] font-[var(--font-weight-semibold)] text-sd-gray-90">D. Reformasi Birokrasi</h3>
              <div className="flex-1 h-[1px] bg-sd-badge-neutral"></div>
            </div>
            <span className="text-[var(--text-xs)] text-sd-gray-60">Fokus: kemajuan transformasi tata kelola — hanya tersedia di level Kementerian</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
            <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
              <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[12px]">Nilai RB Terbaru</div>
              <div className="flex items-end gap-[8px] mb-[16px]">
                <div className="text-[48px] font-[var(--font-weight-bold)] text-sd-gray-90 leading-none">91.56</div>
                <div className="mb-[4px] text-[20px] font-[var(--font-weight-bold)] text-sd-success-border">AA</div>
              </div>
              <div className="space-y-[8px]">
                <div className="flex justify-between text-[var(--text-sm)]">
                  <span className="text-sd-gray-60">RB General</span>
                  <span className="font-[var(--font-weight-semibold)] text-sd-gray-90">84.7</span>
                </div>
                <div className="flex justify-between text-[var(--text-sm)]">
                  <span className="text-sd-gray-60">RB Tematik 2025</span>
                  <span className="font-[var(--font-weight-semibold)] text-sd-gray-90">6.86</span>
                </div>
              </div>
              <p className="mt-[12px] text-[var(--text-xs)] text-sd-gray-40 italic">Konsisten meningkat dan selalu di atas rerata nasional.</p>
            </div>
            <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] flex flex-col">
              <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[12px] shrink-0">Tren Nilai RB (2021–2025)</div>
              <ResponsiveContainer width="100%" className="flex-1 min-h-0">
                <BarChart data={trendRBData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis domain={[70, 95]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="Kemendikdasmen" fill="var(--sd-blue-50)" />
                  <Bar dataKey="Rerata Nasional" fill="var(--sd-yellow-30)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
              <div className="text-[var(--text-xs)] text-sd-gray-60 uppercase tracking-wide mb-[12px]">Area Utama Penguatan RB</div>
              <div className="space-y-[8px]">
                {areaRB.map((item, idx) => {
                  const atTarget = item.nilai >= item.target;
                  return (
                    <div key={idx}>
                      <div className="flex justify-between text-[var(--text-xs)] mb-[3px]">
                        <span className="text-sd-gray-90">{item.area}</span>
                        <span className={`font-[var(--font-weight-semibold)] ${atTarget ? 'text-sd-green-60' : 'text-sd-yellow-50'}`}>{item.nilai} {atTarget ? '✓' : '↑'}</span>
                      </div>
                      <div className="w-full bg-sd-badge-neutral rounded-full h-[5px]">
                        <div className={`h-[5px] rounded-full ${atTarget ? 'bg-sd-green-60' : 'bg-sd-yellow-50'}`} style={{ width: `${item.nilai}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-[10px] text-[var(--text-xs)] text-sd-gray-40 italic">✓ = memenuhi/melampaui target · ↑ = masih di bawah target</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
