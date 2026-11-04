import { useState, type ReactNode } from 'react';
import { Home, TrendingUp, ChevronDown, Filter, TriangleAlert, SearchX, ArrowLeftCircle, Info } from 'lucide-react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Header } from '@/app/components/Header';
import imgAnalytic from '@/assets/staging/img-analytic.png';

type Tone = 'red' | 'amber' | 'green';
const tone: Record<Tone, { bg: string; bd: string; fg: string }> = {
  red: { bg: '#fdeeee', bd: '#f3b4b4', fg: '#d8445a' },
  amber: { bg: '#fff8ec', bd: '#f1c27a', fg: '#d99a1f' },
  green: { bg: '#e8faee', bd: '#9fdcb4', fg: '#2f9e5b' },
};

/* Baris: potensial Tinggi → Rendah; kolom: kinerja Kurang → Baik */
const nineBox: { roman: string; pct: string; n: number; tone: Tone }[][] = [
  [{ roman: 'IV', pct: '0%', n: 0, tone: 'amber' }, { roman: 'VII', pct: '0%', n: 0, tone: 'green' }, { roman: 'IX', pct: '0%', n: 0, tone: 'green' }],
  [{ roman: 'II', pct: '0%', n: 0, tone: 'red' }, { roman: 'V', pct: '22,2%', n: 2, tone: 'amber' }, { roman: 'VIII', pct: '0%', n: 0, tone: 'green' }],
  [{ roman: 'I', pct: '0%', n: 0, tone: 'red' }, { roman: 'III', pct: '66,7%', n: 6, tone: 'red' }, { roman: 'VI', pct: '11,1%', n: 1, tone: 'amber' }],
];

const highlights: { title: string; lines: string[]; tone: Tone }[] = [
  { title: 'BOX 7-9 — SUKSESI', tone: 'green', lines: ['0% talenta berada di kelompok Suksesi', 'Naik 0 poin dari Agustus 2026'] },
  { title: 'BOX 4-6 — STANDAR', tone: 'amber', lines: ['33,3% talenta berada di kelompok Standar', 'Turun 4,2 poin dari Agustus 2026'] },
  { title: 'BOX 1-3 — PERLU PERHATIAN', tone: 'red', lines: ['66,7% talenta berada di kelompok Perlu Perhatian', 'Naik 4,2 poin dari Agustus 2026'] },
];

function Panel({ title, subtitle, right, children }: { title: string; subtitle?: string; right?: ReactNode; children: ReactNode }) {
  return (
    <section className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden">
      <header className="flex items-center justify-between px-[16px] py-[14px] border-b border-[#eee]">
        <div>
          <h3 className="text-[#727272]" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{title}</h3>
          {subtitle && <p className="text-[#727272]" style={{ fontSize: 'var(--text-xs)' }}>{subtitle}</p>}
        </div>
        {right}
      </header>
      <div className="p-[16px]">{children}</div>
    </section>
  );
}

const NoData = () => (
  <div className="py-[40px] flex flex-col items-center gap-[6px] text-[#727272]">
    <SearchX className="size-[22px]" />
    <span style={{ fontSize: 'var(--text-sm)' }}>Data belum tersedia untuk kombinasi filter ini.</span>
  </div>
);

function TrendChart({ labels, series, yMax, colors }: { labels: string[]; series: string[]; yMax: number; colors: string[] }) {
  const data = labels.map((l) => ({ name: l }));
  return (
    <div style={{ height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="#e4e4e4" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, yMax]} tick={{ fontSize: 11 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {series.map((s, i) => <Line key={s} dataKey={s} stroke={colors[i]} dot={false} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const Hint = () => (
  <p className="flex items-center gap-[6px] text-[#727272] mt-[4px]" style={{ fontSize: 'var(--text-xs)' }}>
    <Info className="size-[13px]" /> Klik keterangan label untuk menyembunyikan atau menampilkan data
  </p>
);

export function DasborEksekutifPage({ onBack }: { onBack: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex flex-col h-screen bg-[#F1F1F1]">
      <Header fullWidth />
      <div className="flex flex-1 min-h-0">
        {!collapsed && (
          <aside className="w-[260px] shrink-0 bg-white border-r border-[#e4e4e4] flex flex-col">
            <div className="flex items-center gap-[10px] px-[16px] py-[10px] bg-[#eaf3fe]">
              <img alt="" src={imgAnalytic} className="size-[20px] object-contain" />
              <span className="font-semibold text-[#323232] uppercase" style={{ fontSize: 'var(--text-xs)' }}>Dasbor Eksekutif</span>
            </div>
            <button onClick={onBack} className="flex items-center gap-[10px] px-[16px] py-[8px] bg-[#f3f8ff] text-[#45474a] text-left hover:bg-[#eaf3fe]" style={{ fontSize: '12px' }}>
              <Home className="size-[16px]" /> Kembali ke Beranda Portal
            </button>
            <nav className="flex-1 p-[8px]">
              <div className="flex items-center gap-[12px] px-[8px] py-[8px] rounded-[4px] bg-[#f0f0f0] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>
                <TrendingUp className="size-[20px]" /> Kinerja & Talenta ASN
              </div>
            </nav>
            <button onClick={() => setCollapsed(true)} className="flex items-center justify-center gap-[8px] py-[12px] border-t border-[#e4e4e4] text-[#45474a] hover:bg-[#F9F9F9]" style={{ fontSize: '12px' }}>
              <ArrowLeftCircle className="size-[18px]" /> Sembunyikan Menu
            </button>
          </aside>
        )}

        <main className="flex-1 min-w-0 overflow-y-auto p-[20px]">
          {collapsed && <button onClick={() => setCollapsed(false)} className="mb-[8px] text-[#0954D9]" style={{ fontSize: 'var(--text-sm)' }}>Tampilkan menu</button>}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-semibold text-[#323232]" style={{ fontSize: '24px' }}>Kinerja & Talenta ASN</h1>
              <p className="text-[#323232]" style={{ fontSize: 'var(--text-sm)' }}>Lihat sebaran kelompok talenta dan hasil kinerja ASN Kemendikdasmen secara agregat</p>
            </div>
            <span className="flex items-center gap-[6px] text-[#323232]" style={{ fontSize: 'var(--text-sm)' }}>
              <span className="size-[8px] rounded-full bg-[#1fa57a]" /> Update terakhir: 8 Oktober 2026
            </span>
          </div>

          <div className="mt-[16px] bg-white border border-[#e4e4e4] rounded-[8px] px-[16px] py-[10px] flex items-center gap-[10px] flex-wrap" style={{ fontSize: 'var(--text-sm)' }}>
            <Filter className="size-[16px]" /> <span className="font-semibold">Filter</span>
            {[['Unit Kerja', 'Seluruh'], ['Jabatan', 'Seluruh'], ['Tahun', '2026']].map(([k, v]) => (
              <span key={k} className="rounded-full border border-[#323232] px-[10px] py-[1px]"><b>{k}:</b> {v}</span>
            ))}
            <button className="ml-auto border border-[#0954D9] text-[#0954D9] rounded-[4px] px-[12px] py-[4px] font-semibold flex items-center gap-[6px]">
              Ubah filter <ChevronDown className="size-[14px]" />
            </button>
          </div>

          <h2 className="mt-[24px] font-semibold text-[#323232]" style={{ fontSize: '20px' }}>Manajemen Talenta</h2>
          <p className="text-[#727272] mb-[12px]" style={{ fontSize: 'var(--text-sm)' }}>Sebaran kelompok talenta ASN berdasarkan kombinasi aspek kinerja dan potensial</p>

          <div className="grid grid-cols-1 xl:grid-cols-[1.9fr_1fr] gap-[16px]">
            <Panel title="Distribusi Kelompok Talenta (Nine-Box)" right={<span className="bg-[#eee] rounded-full px-[12px] py-[4px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>Periode: September 2026</span>}>
              <p className="mb-[10px]" style={{ fontSize: 'var(--text-base)' }}>Berdasarkan pemetaan Aspek Kinerja dan Aspek Potensial</p>
              <div className="flex gap-[8px] flex-wrap mb-[14px]">
                {([['red', 'Box 1-3: Perlu Perhatian'], ['amber', 'Box 4-6: Standar'], ['green', 'Box 7-9: Suksesi']] as [Tone, string][]).map(([t, l]) => (
                  <span key={l} className="rounded-full border px-[10px] py-[3px] flex items-center gap-[6px]" style={{ borderColor: tone[t].bd, background: tone[t].bg, fontSize: 'var(--text-sm)' }}>
                    <span className="size-[8px] rounded-[2px]" style={{ background: tone[t].fg }} /> {l}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-[72px_1fr_1fr_1fr] gap-[8px] items-center">
                <span />
                {['Kurang', 'Kinerja', 'Baik'].map((c) => <span key={c} className="text-center text-[#727272]" style={{ fontSize: 'var(--text-sm)' }}>{c}</span>)}
                {['Tinggi', 'Potensial', 'Rendah'].map((rowLabel, r) => (
                  <>
                    <span key={rowLabel} className="text-right pr-[8px] text-[#727272]" style={{ fontSize: 'var(--text-sm)' }}>{rowLabel}</span>
                    {nineBox[r].map((b) => (
                      <div key={b.roman} className="rounded-[6px] border text-center py-[14px]" style={{ background: tone[b.tone].bg, borderColor: tone[b.tone].bd }}>
                        <div style={{ color: tone[b.tone].fg, fontSize: 'var(--text-sm)' }}>{b.roman}</div>
                        <div className="font-semibold" style={{ color: tone[b.tone].fg, fontSize: '18px' }}>{b.pct}</div>
                        <div className="text-[#727272]" style={{ fontSize: 'var(--text-xs)' }}>{b.n} pegawai</div>
                      </div>
                    ))}
                  </>
                ))}
              </div>
              <div className="mt-[14px] rounded-[6px] bg-[#fff4e0] border border-[#f1c27a] px-[12px] py-[8px] flex items-center gap-[8px]" style={{ fontSize: 'var(--text-sm)' }}>
                <TriangleAlert className="size-[16px] text-[#d99a1f]" />
                29 pegawai belum lengkap data pemetaan talentanya. Lengkapi datanya di menu Kepegawaian.
              </div>
            </Panel>

            <Panel title="Highlight per Kelompok">
              <div className="flex flex-col gap-[12px]">
                {highlights.map((h) => (
                  <div key={h.title} className="rounded-[6px] border p-[12px] min-h-[110px]" style={{ background: tone[h.tone].bg, borderColor: tone[h.tone].bd }}>
                    <p className="font-semibold" style={{ fontSize: 'var(--text-sm)' }}>{h.title}</p>
                    <ul className="mt-[6px] text-[#555]" style={{ fontSize: 'var(--text-sm)' }}>
                      {h.lines.map((l) => <li key={l}>• {l}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <h2 className="mt-[28px] mb-[12px] font-semibold text-[#323232]" style={{ fontSize: '20px' }}>Kinerja ASN</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
            <Panel title="Distribusi Hasil Kinerja"><NoData /></Panel>
            <Panel title="Tren Triwulanan Hasil Kinerja" subtitle="% Kinerja Positif vs Perlu Perhatian">
              <TrendChart labels={['Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026']} series={['Kinerja Positif', 'Perlu Perhatian']} yMax={60} colors={['#2f9e5b', '#d8445a']} />
              <Hint />
            </Panel>
            <Panel title="Persentase Pegawai per Predikat Kinerja"><NoData /></Panel>
            <Panel title="Distribusi Hasil Kerja per Jenis Jabatan" subtitle="Persentase kategori kinerja berdasarkan jenis jabatan"><NoData /></Panel>
            <Panel title='Top Jabatan "Perlu Perhatian"' subtitle="Komposisi jumlah pegawai per indikator">
              <table className="w-full text-left" style={{ fontSize: 'var(--text-xs)' }}>
                <thead><tr className="border-b border-[#eee] uppercase text-[#727272]"><th className="py-[8px]">Predikat Kinerja</th><th>Jabatan</th><th>Jumlah Pegawai</th><th>Jumlah Unit</th></tr></thead>
              </table>
              <div className="py-[24px] text-center text-[#727272]" style={{ fontSize: 'var(--text-xs)' }}>Data tidak ditemukan</div>
            </Panel>
            <Panel title="Top 5 Unit Kinerja Positif Tertinggi" subtitle="Proporsi kinerja positif (Baik + Sangat Baik)"><NoData /></Panel>
            <Panel title="Bottom 5 Unit Pegawai Perlu Perhatian Tertinggi" subtitle="Unit dengan proporsi kinerja perlu perhatian terbanyak"><NoData /></Panel>
            <Panel title="Distribusi Hasil Kerja per Unit" subtitle="Persentase per indikator kinerja di tiap unit utama"><NoData /></Panel>
          </div>

          <h2 className="mt-[28px] mb-[12px] font-semibold text-[#323232]" style={{ fontSize: '20px' }}>Pemetaan Talenta ASN</h2>
          <div className="grid grid-cols-1 gap-[16px]">
            <Panel title="Tren Rata-rata Aspek Penilaian" subtitle="Perkembangan Aspek Kinerja & Aspek Potensial ASN">
              <TrendChart labels={['Jan 2026', 'Mar 2026', 'Mei 2026', 'Jul 2026', 'Sep 2026']} series={['Aspek Kinerja', 'Aspek Potensial']} yMax={100} colors={['#3578c0', '#e9a93a']} />
              <Hint />
            </Panel>
            <Panel title="Aspek Penilaian Ninebox" subtitle="Evaluasi dua sumbu utama: Aspek Kinerja dan Aspek Potensial ASN">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                {[
                  { t: 'ASPEK KINERJA', avg: '51,33', med: '48,00', note: 'Rata-rata > Median: sebagian kecil pegawai berkinerja sangat tinggi menarik rata-rata ke atas — mayoritas pegawai masih di bawah rata-rata, ada ruang perbaikan.' },
                  { t: 'ASPEK POTENSIAL', avg: '74,17', med: '75,33', note: 'Rata-rata < Median: distribusi potensi cenderung ke atas — mayoritas talenta di atas rata-rata, kesiapan potensial satuan kerja baik.' },
                ].map((a) => (
                  <div key={a.t} className="border border-[#e4e4e4] rounded-[8px] p-[16px]">
                    <p className="font-semibold text-[#727272]" style={{ fontSize: 'var(--text-sm)' }}>{a.t}</p>
                    <div className="grid grid-cols-2 gap-[12px] my-[10px]">
                      <div><p className="text-[#727272]" style={{ fontSize: 'var(--text-xs)' }}>Rata-rata</p><p className="font-semibold" style={{ fontSize: '22px' }}>{a.avg}</p></div>
                      <div><p className="text-[#727272]" style={{ fontSize: 'var(--text-xs)' }}>Median</p><p className="font-semibold" style={{ fontSize: '22px' }}>{a.med}</p></div>
                    </div>
                    <p className="text-[#555]" style={{ fontSize: 'var(--text-xs)' }}>{a.note}</p>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Penjabaran Aspek Kinerja" subtitle="Tren jumlah pegawai per komponen Kinerja Jabatan, Penghargaan, dan KPLB">
              <TrendChart labels={['Jan 2026', 'Mar 2026', 'Mei 2026', 'Jul 2026', 'Sep 2026']} series={['Kinerja Jabatan', 'Penghargaan', 'KPLB']} yMax={2500} colors={['#3578c0', '#e9a93a', '#8678d9']} />
              <Hint />
            </Panel>
            <Panel title="Penjabaran Aspek Potensial" subtitle="Tren jumlah pegawai berdasarkan komponen penilaian">
              <TrendChart labels={['Jan 2026', 'Mar 2026', 'Mei 2026', 'Jul 2026', 'Sep 2026']} series={['Kompetensi', 'Potensi', 'Pendidikan', 'Pengembangan Kompetensi', 'Sertifikasi', 'Hukuman Disiplin']} yMax={2100} colors={['#3578c0', '#e9a93a', '#1fa57a', '#8678d9', '#d8445a', '#888']} />
              <Hint />
            </Panel>
          </div>
        </main>
      </div>
    </div>
  );
}
