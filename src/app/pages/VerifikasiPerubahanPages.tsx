import { useMemo, useState, type ReactNode } from 'react';
import { X, Check, RotateCcw, Info } from 'lucide-react';
import { toast } from 'sonner';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { StagingDataTable, PersonCell, Chip, EyeAction, type Column } from '@/app/components/StagingDataTable';
import {
  useUsulan, verifikasiAdmin, putusKomite, sinkronSiasn, simpanPortal, butuhKomite,
  STATUS_LABEL, STATUS_SHORT, STATUS_TONE, type Usulan, type StatusUsulan, type Asal,
} from '@/app/data/usulanPerubahan';

type Role = 'admin' | 'komite';

const TONE_STYLE = {
  green: ['#d6f5e3', '#17653a'], red: ['#fbd5d5', '#a11d1d'], amber: ['#fdf0c8', '#7a5a00'], blue: ['#d6e6fd', '#0b3f9e'],
} as const;

function StatusBadge({ status, short }: { status: StatusUsulan; short?: boolean }) {
  const [bg, fg] = TONE_STYLE[STATUS_TONE[status]];
  return (
    <span className="inline-block rounded-[6px] px-[8px] py-[2px]" style={{ background: bg, color: fg, fontSize: '12px', fontWeight: 600, lineHeight: '16px' }}>
      {short ? STATUS_SHORT[status] : STATUS_LABEL[status]}
    </span>
  );
}

function AsalBadge({ asal }: { asal: Asal }) {
  const admin = asal === 'Admin Satker';
  return (
    <span className="inline-block rounded-full border px-[8px] py-[1px]" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 600, borderColor: admin ? '#8a6bd6' : '#a8a8a8', color: admin ? '#5b3fa8' : '#45474a' }}>
      {asal}
    </span>
  );
}

function PageShell({ title, subtitle, role, children }: { title: string; subtitle: string; role: Role; children: ReactNode }) {
  return (
    <KepegawaianLayout>
      <div className="px-[24px] pt-[24px] pb-[64px] flex flex-col gap-[16px]">
        <div>
          <h1 className="text-[#2f3031]" style={{ fontSize: '24px', fontWeight: 700, lineHeight: '28px' }}>{title}</h1>
          <p className="text-[#2f3031]" style={{ fontSize: '14px', lineHeight: '20px' }}>{subtitle}</p>
        </div>
        <div className="flex items-start gap-[8px] rounded-[6px] bg-[#eaf3fe] border border-[#c9defa] px-[14px] py-[10px] text-[#0b3f9e]" style={{ fontSize: '14px', lineHeight: '20px' }}>
          <Info className="size-[16px] mt-[2px] shrink-0" />
          <span>Anda bertindak sebagai <b>{role === 'admin' ? 'Admin Satker' : 'Komite Talenta'}</b>. {role === 'admin' ? 'Verifikasi dan validasi pengajuan data pegawai pada unit kerja Anda.' : 'Tinjau data pengajuan, lalu berikan persetujuan atau penolakan.'}</span>
        </div>
        <div className="bg-white border border-[#efefef] rounded-[6px] overflow-hidden">{children}</div>
      </div>
    </KepegawaianLayout>
  );
}

function Tabs({ tabs, active, onChange }: { tabs: { label: string; count: number }[]; active: number; onChange: (i: number) => void }) {
  return (
    <div className="grid border-b border-[#e4e4e4]" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
      {tabs.map((t, i) => (
        <button key={t.label} onClick={() => onChange(i)} className={`py-[16px] border-b-[3px] ${i === active ? 'border-[#1a5fe0] text-[#1a5fe0]' : 'border-transparent'}`} style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
          {t.label} <span className="ml-[4px] rounded-full bg-[#f0f0f0] text-[#45474a] px-[8px]" style={{ fontSize: '12px' }}>{t.count}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------- Filter ---------- */
type Filters = { q: string; data: string; jenis: string; asal: string; status: string };
const emptyFilters: Filters = { q: '', data: '', jenis: '', asal: '', status: '' };

function FilterBar({ f, setF, statuses }: { f: Filters; setF: (f: Filters) => void; statuses?: StatusUsulan[] }) {
  const sel = (key: keyof Filters, placeholder: string, options: string[], labels?: Record<string, string>) => (
    <select value={f[key]} onChange={(e) => setF({ ...f, [key]: e.target.value })} className="border border-[#c7c7c7] rounded-[4px] px-[10px] py-[8px] bg-white" style={{ fontSize: 'var(--text-sm)' }}>
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{labels?.[o] ?? o}</option>)}
    </select>
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] p-[16px] bg-[#fafafa] border-b border-[#eee]">
      <input value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} placeholder="Cari nama atau NIP" className="border border-[#c7c7c7] rounded-[4px] px-[10px] py-[8px] bg-white" style={{ fontSize: 'var(--text-sm)' }} />
      {sel('data', 'Semua Perubahan Data', ['Pasangan', 'Orang Tua', 'Jabatan', 'Sertifikat'])}
      {sel('jenis', 'Semua Jenis Perubahan', ['Tambah', 'Ubah', 'Hapus'])}
      {sel('asal', 'Semua Asal Pengajuan', ['Pegawai', 'Admin Satker'])}
      {statuses && sel('status', 'Semua Status', statuses, STATUS_LABEL)}
      <div className="flex justify-end md:col-start-3">
        <button onClick={() => setF(emptyFilters)} className="border border-[#a8a8a8] rounded-[4px] px-[16px] py-[8px] font-semibold bg-white" style={{ fontSize: 'var(--text-sm)' }}>Reset</button>
      </div>
    </div>
  );
}

const applyFilters = (rows: Usulan[], f: Filters) =>
  rows.filter((u) =>
    (!f.q || (u.nama + u.nip).toLowerCase().includes(f.q.toLowerCase())) &&
    (!f.data || u.data === f.data) && (!f.jenis || u.jenis === f.jenis) &&
    (!f.asal || u.asal === f.asal) && (!f.status || u.status === f.status));

/* ---------- Stepper alur status ---------- */
type Step = { label: string; state: 'done' | 'current' | 'todo' | 'failed' | 'skipped' };

function buildSteps(u: Usulan, showSiasn: boolean): Step[] {
  const s = u.status;
  const pegawai = u.asal === 'Pegawai';
  const steps: Step[] = [];
  steps.push({ label: pegawai ? 'Diajukan Pegawai' : 'Diajukan Admin Satker', state: 'done' });
  if (pegawai) {
    steps.push({
      label: s === 'ditolak-admin' ? 'Pengusulan Ditolak Admin Satker' : 'Verifikasi Admin Satker',
      state: s === 'menunggu-diverifikasi' ? 'current' : s === 'ditolak-admin' ? 'failed' : 'done',
    });
  } else {
    steps.push({ label: 'Verifikasi Admin Satker (otomatis)', state: 'done' });
  }
  if (s === 'ditolak-admin') return steps;
  const needKomite = butuhKomite(u.data) || !['menunggu-diverifikasi'].includes(s);
  if (needKomite) {
    const pendingKomite = s === 'menunggu-komite';
    const before = s === 'menunggu-diverifikasi';
    steps.push({
      label: s === 'ditolak-komite' ? 'Pengusulan Ditolak Komite Talenta' : 'Persetujuan Komite Talenta',
      state: before ? 'todo' : pendingKomite ? 'current' : s === 'ditolak-komite' ? 'failed' : 'done',
    });
    if (s === 'ditolak-komite') return steps;
    if (showSiasn) {
      const sync = s === 'disetujui-komite' ? 'current' : s === 'gagal-siasn' ? 'failed' : ['berhasil-siasn', 'berhasil-diperbarui'].includes(s) ? 'done' : 'todo';
      steps.push({ label: s === 'gagal-siasn' ? 'Gagal Sinkronisasi ke SIASN' : 'Sinkronisasi ke SIASN', state: sync });
      steps.push({ label: 'Pembaruan Data pada Portal', state: s === 'berhasil-diperbarui' ? 'done' : s === 'berhasil-siasn' ? 'current' : 'todo' });
    }
  } else {
    steps.push({ label: 'Persetujuan Komite Talenta (tidak diperlukan)', state: 'skipped' });
  }
  return steps;
}

function Stepper({ steps }: { steps: Step[] }) {
  const color = { done: '#2d8a4e', current: '#1a5fe0', todo: '#c7c7c7', failed: '#e0243a', skipped: '#c7c7c7' } as const;
  return (
    <ol className="flex flex-col gap-[10px]">
      {steps.map((st, i) => (
        <li key={i} className="flex items-center gap-[10px]" style={{ fontSize: 'var(--text-sm)', color: st.state === 'todo' || st.state === 'skipped' ? '#808489' : '#2f3031' }}>
          <span className="size-[20px] rounded-full grid place-items-center text-white shrink-0" style={{ background: color[st.state] }}>
            {st.state === 'done' ? <Check className="size-[12px]" /> : st.state === 'failed' ? <X className="size-[12px]" /> : <span style={{ fontSize: '11px' }}>{i + 1}</span>}
          </span>
          <span style={{ fontWeight: st.state === 'current' ? 600 : 400, textDecoration: st.state === 'skipped' ? 'line-through' : undefined }}>{st.label}</span>
          {st.state === 'current' && <span className="text-[#1a5fe0]" style={{ fontSize: '12px' }}>Sedang berjalan</span>}
        </li>
      ))}
    </ol>
  );
}

/* ---------- Modal detail ---------- */
type Mode = 'verifikasi' | 'putusan' | 'lihat';

function DetailModal({ u, role, mode, onClose }: { u: Usulan; role: Role; mode: Mode; onClose: () => void }) {
  const [catatan, setCatatan] = useState('');
  const steps = buildSteps(u, true); // Komite memakai Opsi 2: progres SIASN tampil (READ saja)
  const tolakButuhCatatan = (fn: () => void) => () => {
    if (!catatan.trim()) return toast.error('Isi catatan penolakan terlebih dahulu.');
    fn();
  };
  const close = (msg: string) => { toast.success(msg); onClose(); };
  const canRetry = role === 'admin' && u.status === 'gagal-siasn';

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 grid place-items-center p-[16px]" onClick={onClose} role="presentation">
      <div role="dialog" aria-label="Detail Usulan Perubahan" onClick={(e) => e.stopPropagation()} className="bg-white rounded-[12px] w-full max-w-[880px] max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#e4e4e4]">
          <h2 style={{ fontSize: 'var(--text-lg)' }}>Detail Usulan Perubahan: <b className="uppercase">{u.data}</b></h2>
          <button onClick={onClose} aria-label="Close" className="border border-[#1a5fe0] rounded-[4px] p-[2px]"><X className="size-[16px] text-[#1a5fe0]" /></button>
        </div>
        <div className="overflow-y-auto p-[20px] flex flex-col gap-[14px]">
          <div className="flex items-center gap-[14px] bg-[#f4f4f4] rounded-[8px] p-[12px]">
            <div className="size-[48px] rounded-full bg-[#d6e6fd]" />
            <div className="flex-1">
              <p className="font-semibold">{u.nama}</p>
              <p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>{u.nip}</p>
            </div>
            <div className="flex flex-col items-end gap-[4px]"><AsalBadge asal={u.asal} /><StatusBadge status={u.status} short /></div>
          </div>

          <div className="border border-[#efefef] rounded-[6px] p-[14px]">
            <p className="font-semibold mb-[10px]" style={{ fontSize: 'var(--text-sm)' }}>Alur Pengusulan</p>
            <Stepper steps={steps} />
            {u.status === 'gagal-siasn' && <p className="mt-[10px] text-[#a11d1d]" style={{ fontSize: 'var(--text-xs)' }}>Sinkronisasi ke SIASN gagal. {canRetry ? 'Anda dapat mencoba lagi.' : 'Komite Talenta hanya dapat melihat informasi ini.'}</p>}
            {u.status === 'berhasil-siasn' && <p className="mt-[10px] text-[#7a5a00]" style={{ fontSize: 'var(--text-xs)' }}>Sinkronisasi SIASN berhasil, namun penyimpanan pada Portal belum berhasil.</p>}
            {u.catatan && <p className="mt-[10px]" style={{ fontSize: 'var(--text-xs)' }}>Catatan: {u.catatan}</p>}
          </div>

          <div className="border border-[#efefef] rounded-[6px] overflow-hidden">
            <div className="flex items-center justify-between bg-[#f4f4f4] px-[14px] py-[8px]">
              <span className="flex items-center gap-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>Detail <Chip tone={u.jenis === 'Hapus' ? 'red' : 'green'}>{u.jenis === 'Tambah' ? 'Penambahan Data' : u.jenis === 'Ubah' ? 'Perubahan Data' : 'Penghapusan Data'}</Chip></span>
              <span style={{ fontSize: 'var(--text-xs)' }}>Diajukan pada: 29 Oktober 2026 09:32 WIB</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[16px] gap-y-[12px] p-[14px]">
              {u.detail.map(([k, v]) => (
                <div key={k}>
                  <p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>{k}</p>
                  <p className="font-semibold text-[#2d8a4e]" style={{ fontSize: 'var(--text-sm)' }}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          {u.asal === 'Pegawai' && role === 'admin' && mode === 'verifikasi' && (
            <div className="border border-[#efefef] rounded-[6px] p-[14px]">
              <p className="font-semibold mb-[4px]" style={{ fontSize: 'var(--text-sm)' }}>Perbandingan Data dengan SIASN</p>
              <p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>Data usulan dibandingkan dengan data SIASN sesuai proses existing. Tidak ditemukan perbedaan yang memerlukan perhatian khusus.</p>
            </div>
          )}
          {u.asal === 'Admin Satker' && mode !== 'lihat' && (
            <p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>Usulan ini diajukan Admin Satker sehingga dianggap sudah diverifikasi. Perbandingan data SIASN untuk usulan Admin Satker menunggu konfirmasi mapping.</p>
          )}

          {mode !== 'lihat' && (
            <div>
              <label className="font-semibold" style={{ fontSize: 'var(--text-sm)' }}>Catatan (wajib diisi jika menolak)</label>
              <textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} rows={2} className="mt-[4px] w-full border border-[#c7c7c7] rounded-[4px] px-[10px] py-[8px]" style={{ fontSize: 'var(--text-sm)' }} />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-[20px] py-[12px] border-t border-[#e4e4e4]">
          <button onClick={onClose} className="border border-[#a8a8a8] rounded-[4px] px-[16px] py-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>{mode === 'lihat' ? 'Tutup' : 'Batal'}</button>
          <div className="flex gap-[8px]">
            {canRetry && (
              <button onClick={() => { sinkronSiasn(u.id, true); close('Sinkronisasi ke SIASN berhasil. Data Portal diperbarui.'); simpanPortal(u.id); }} className="flex items-center gap-[6px] bg-[#1a5fe0] text-white rounded-[4px] px-[16px] py-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}><RotateCcw className="size-[14px]" /> Coba Lagi</button>
            )}
            {u.status === 'disetujui-komite' && role === 'admin' && (
              <button onClick={() => { sinkronSiasn(u.id, true); close('Sinkronisasi ke SIASN berhasil.'); }} className="bg-[#1a5fe0] text-white rounded-[4px] px-[16px] py-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>Jalankan Sinkronisasi SIASN</button>
            )}
            {u.status === 'berhasil-siasn' && role === 'admin' && (
              <button onClick={() => { simpanPortal(u.id); close('Data pada Portal berhasil diperbarui.'); }} className="bg-[#1a5fe0] text-white rounded-[4px] px-[16px] py-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>Simpan ke Portal</button>
            )}
            {mode === 'verifikasi' && (
              <>
                <button onClick={tolakButuhCatatan(() => { verifikasiAdmin(u.id, false, catatan); close('Usulan ditolak Admin Satker.'); })} className="bg-[#e0243a] text-white rounded-[4px] px-[16px] py-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>✕ Tolak</button>
                <button onClick={() => { verifikasiAdmin(u.id, true, catatan); close(butuhKomite(u.data) ? 'Usulan diteruskan ke Komite Talenta.' : 'Usulan disetujui. Data pokok tidak memerlukan validasi Komite.'); }} className="bg-[#1a5fe0] text-white rounded-[4px] px-[16px] py-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>✓ Setujui</button>
              </>
            )}
            {mode === 'putusan' && (
              <>
                <button onClick={tolakButuhCatatan(() => { putusKomite(u.id, false, catatan); close('Usulan ditolak Komite Talenta.'); })} className="bg-[#e0243a] text-white rounded-[4px] px-[16px] py-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>✕ Tolak</button>
                <button onClick={() => { putusKomite(u.id, true, catatan); close('Usulan disetujui Komite Talenta. Sinkronisasi SIASN diproses.'); }} className="bg-[#1a5fe0] text-white rounded-[4px] px-[16px] py-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>✓ Setujui</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Halaman bersama ---------- */
function useCols(withStatus: boolean, onOpen: (u: Usulan) => void) {
  const cols: Column[] = [
    { key: 'no', label: 'No', width: '48px' },
    { key: 'nama', label: 'Nama Pegawai' },
    { key: 'unit', label: 'Unit Kerja' },
    { key: 'data', label: 'Perubahan Data', width: '130px' },
    { key: 'jenis', label: 'Jenis Perubahan', width: '120px' },
    { key: 'asal', label: 'Asal Pengajuan', width: '130px' },
    { key: 'status', label: 'Status Pengusulan', width: '190px' },
    { key: 'aksi', label: 'Aksi', width: '60px' },
  ];
  const toRow = (u: Usulan, i: number) => ({
    no: i + 1,
    nama: <PersonCell name={u.nama} nip={u.nip} />,
    unit: u.unit,
    data: u.data,
    jenis: <Chip tone={u.jenis === 'Hapus' ? 'red' : 'green'}>{u.jenis}</Chip>,
    asal: <AsalBadge asal={u.asal} />,
    status: <StatusBadge status={u.status} short={!withStatus} />,
    aksi: <EyeAction onClick={() => onOpen(u)} />,
  });
  return { cols, toRow };
}

function VerifikasiPage({ role }: { role: Role }) {
  const all = useUsulan();
  const [tab, setTab] = useState(0);
  const [f, setF] = useState<Filters>(emptyFilters);
  const [sel, setSel] = useState<Usulan | null>(null);
  const [showFilter, setShowFilter] = useState(true);

  const pendingStatus: StatusUsulan = role === 'admin' ? 'menunggu-diverifikasi' : 'menunggu-komite';
  const pending = useMemo(() => all.filter((u) => u.status === pendingStatus), [all, pendingStatus]);
  // Komite hanya melihat usulan yang butuh validasi Komite; Admin melihat semua status pada riwayat.
  const reviewed = useMemo(() => {
    const base = all.filter((u) => u.status !== pendingStatus);
    return role === 'admin' ? base : base.filter((u) => butuhKomite(u.data) && !['menunggu-diverifikasi', 'ditolak-admin'].includes(u.status));
  }, [all, pendingStatus, role]);

  const list = applyFilters(tab === 0 ? pending : reviewed, f);
  const { cols, toRow } = useCols(tab === 1, (u) => setSel(u));
  const reviewedStatuses: StatusUsulan[] = role === 'admin'
    ? ['menunggu-komite', 'ditolak-admin', 'disetujui-komite', 'ditolak-komite', 'berhasil-siasn', 'gagal-siasn', 'berhasil-diperbarui']
    : ['disetujui-komite', 'ditolak-komite', 'berhasil-siasn', 'gagal-siasn', 'berhasil-diperbarui'];

  const mode: Mode = tab === 1 ? 'lihat' : role === 'admin' ? 'verifikasi' : 'putusan';

  return (
    <PageShell
      role={role}
      title={role === 'admin' ? 'Verifikasi Perubahan Data' : 'Verifikasi Validasi Pengajuan Data Pegawai'}
      subtitle={role === 'admin' ? 'Kelola dan verifikasi perubahan data yang diajukan oleh pegawai' : 'Verifikasi dan validasi pengajuan data pegawai yang telah disetujui oleh Admin Satker.'}
    >
      <Tabs
        tabs={[
          { label: role === 'admin' ? 'Daftar Usulan Perubahan Data' : 'Daftar Pengajuan Menunggu Validasi', count: pending.length },
          { label: role === 'admin' ? 'Daftar Usulan yang Telah Ditinjau' : 'Daftar Pengajuan yang Telah Ditinjau', count: reviewed.length },
        ]}
        active={tab}
        onChange={(i) => { setTab(i); setF(emptyFilters); }}
      />
      <div className="flex justify-end px-[16px] pt-[12px]">
        <button onClick={() => setShowFilter(!showFilter)} className="text-[#0b5fef]" style={{ fontSize: '14px', fontWeight: 600 }}>{showFilter ? 'Sembunyikan Filter' : 'Tampilkan Filter'}</button>
      </div>
      {showFilter && <FilterBar f={f} setF={setF} statuses={tab === 1 ? reviewedStatuses : undefined} />}
      <StagingDataTable hideFilter columns={cols} rows={list.map(toRow)} />
      {tab === 1 && role === 'komite' && (
        <p className="px-[16px] pb-[16px] text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>
          Penyajian riwayat Komite Talenta menggunakan Opsi 2 (status mengikuti seluruh proses). Komite hanya memiliki akses baca terhadap informasi sinkronisasi SIASN, tanpa aksi Coba Lagi.
        </p>
      )}
      {sel && <DetailModal key={sel.id + sel.status} u={all.find((x) => x.id === sel.id) ?? sel} role={role} mode={mode} onClose={() => setSel(null)} />}
    </PageShell>
  );
}

export const VerifikasiPerubahanPage = () => <VerifikasiPage role="admin" />;
export const VerifikasiDataKomitePage = () => <VerifikasiPage role="komite" />;
