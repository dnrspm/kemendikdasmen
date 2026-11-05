import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { X, Check, RotateCcw, Info, Search, ChevronDown, SlidersHorizontal, FileText, ArrowRight, CirclePlus, Trash2, Pencil, FilePlus, List, Inbox } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { toast } from 'sonner';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { fieldClass, Tabs, Badge, Banner, buttonClass } from 'seragam-design-system';
import { StagingDataTable, PersonCell, Chip, type Column } from '@/app/components/StagingDataTable';
import {
  useUsulan, KATEGORI_DATA, FIELD_DATA_PRIBADI, detailFor, verifikasiAdmin, putusKomite, sinkronSiasn, simpanPortal, perluKomite,
  UNIT_SHORT, STATUS_LABEL, STATUS_SHORT, STATUS_TONE, type Usulan, type StatusUsulan, type Asal,
} from '@/app/data/usulanPerubahan';

type Role = 'admin' | 'komite';

const TONE_MAP = { green: 'green', amber: 'amber', red: 'red', blue: 'blue' } as const;

function StatusBadge({ status, short }: { status: StatusUsulan; short?: boolean }) {
  return <Badge tone={TONE_MAP[STATUS_TONE[status]]}>{short ? STATUS_SHORT[status] : STATUS_LABEL[status]}</Badge>;
}

function PageShell({ title, subtitle, role, children }: { title: string; subtitle: string; role: Role; children: ReactNode }) {
  return (
    <KepegawaianLayout>
      <div className="px-[24px] pt-[24px] pb-[64px] flex flex-col gap-[16px]">
        <div>
          <h1 className="text-sd-gray-90" style={{ fontSize: '24px', fontWeight: 600, lineHeight: '28px' }}>{title}</h1>
          <p className="text-sd-gray-90" style={{ fontSize: '13px', lineHeight: '20px' }}>{subtitle}</p>
        </div>
        <Banner tone="info">
          Anda bertindak sebagai <b style={{ fontWeight: 600 }}>{role === 'admin' ? 'Admin Satker' : 'Komite Talenta'}</b>. {role === 'admin' ? 'Verifikasi dan validasi pengajuan data pegawai pada unit kerja Anda.' : 'Tinjau data pengajuan, lalu berikan persetujuan atau penolakan.'}
        </Banner>
        <div className="bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.08),0_2px_1px_-1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.10)] rounded-[8px] overflow-hidden">{children}</div>
      </div>
    </KepegawaianLayout>
  );
}

/* ---------- Filter ---------- */
type Filters = { q: string; unit: string; data: string; jenis: string; asal: string; status: string };
const emptyFilters: Filters = { q: '', unit: '', data: '', jenis: '', asal: '', status: '' };
const shortUnit = (u: string) => u.split(' - ')[0];
const UNIT_OPTIONS = [UNIT_SHORT];
const ALL = '__all';
const SELECT_KEYS = ['unit', 'data', 'jenis', 'asal', 'status'] as const;
const TEXT_KEYS = ['q'] as const;
const ALL_KEYS = [...TEXT_KEYS, ...SELECT_KEYS] as const;

/** Pencarian teks (nama, NIP) dipisah dari filter pilihan (dropdown seragam). */
function FilterBar({ f, setF, statuses }: { f: Filters; setF: (f: Filters) => void; statuses?: StatusUsulan[] }) {
  const [open, setOpen] = useState(true);
  // Semua isian disimpan sementara; tombol Cari (atau Enter) menerapkannya sekaligus.
  const [pilih, setPilih] = useState(f);
  useEffect(() => setPilih(f), [f]);
  const terapkan = () => setF({ ...pilih, q: pilih.q.trim() });
  const active = ALL_KEYS.filter((k) => f[k]).length;
  const SMALL_TXT = { fontSize: '13px', lineHeight: '20px' } as const;
  const NAMA: Record<(typeof ALL_KEYS)[number], string> = { q: 'Pencarian', unit: 'Unit Kerja', data: 'Data', jenis: 'Jenis', asal: 'Asal', status: 'Status' };
  const reset = () => { setPilih(emptyFilters); setF(emptyFilters); };
  const tags = ALL_KEYS.filter((k) => f[k]).map((k) => ({ key: k, label: NAMA[k], value: k === 'status' ? STATUS_LABEL[f[k] as StatusUsulan] : k === 'unit' ? shortUnit(f[k]) : f[k], clear: () => setF({ ...f, [k]: '' }) }));
  const st = { fontSize: 'var(--text-sm)' } as const;

  const dropdown = (key: (typeof SELECT_KEYS)[number], label: string, all: string, options: string[], labels?: Record<string, string>) => (
    <div className="flex flex-col gap-[4px]">
      <span className="font-semibold" style={st}>{label}</span>
      <Select value={pilih[key] || ALL} onValueChange={(v) => setPilih({ ...pilih, [key]: v === ALL ? '' : v })}>
        <SelectTrigger className="w-full bg-white border-sd-gray-30" style={st}><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>{all}</SelectItem>
          {options.map((o) => <SelectItem key={o} value={o}>{labels?.[o] ?? o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div>
      <div className="flex justify-end px-[16px] pt-[16px]">
        <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex items-center gap-[6px] text-sd-blue-70 font-semibold" style={st}>
          <SlidersHorizontal className="size-[16px]" /> {open ? 'Sembunyikan Filter' : 'Tampilkan Filter'}
          {active > 0 && <span className="rounded-full bg-sd-blue-70 text-white px-[6px]" style={{ fontSize: '12px' }}>{active}</span>}
          <ChevronDown className={`size-[16px] transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {open && (
        <div className="m-[16px] mb-[12px] p-[16px] rounded-[8px] bg-sd-gray-0 border border-[#eee] flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <label htmlFor="cari-nama-nip" className="font-semibold" style={st}>Nama atau NIP</label>
            <div className="relative">
              <Search className="size-[16px] absolute left-[10px] top-1/2 -translate-y-1/2 text-sd-gray-60" />
              <input id="cari-nama-nip" value={pilih.q} onChange={(e) => setPilih({ ...pilih, q: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && terapkan()} placeholder="Cari nama atau NIP" className={`${fieldClass} h-[40px] pl-[32px] pr-[10px] py-[8px]`} style={st} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]">
            {dropdown('unit', 'Unit Kerja', 'Semua Unit Kerja', UNIT_OPTIONS)}
            {dropdown('data', 'Data yang Diubah', 'Semua Data', KATEGORI_DATA)}
            {dropdown('jenis', 'Jenis Perubahan', 'Semua Jenis', ['Tambah', 'Ubah', 'Hapus'])}
            {dropdown('asal', 'Asal Pengajuan', 'Semua', ['Pegawai', 'Admin Satker'])}
            {statuses && dropdown('status', 'Status Pengajuan', 'Semua Status', statuses, STATUS_LABEL)}
          </div>
          {/* Cari menerapkan semua isian sekaligus. */}
          <div className="flex justify-end gap-[8px]">
            <button onClick={reset} className={buttonClass('secondary', 'md')}>Reset</button>
            <button onClick={terapkan} className={buttonClass('primary', 'md')}>Cari</button>
          </div>
        </div>
      )}
      {tags.length > 0 && (
        <div className={`flex flex-wrap items-center gap-[8px] px-[16px] pb-[12px] ${open ? '' : 'pt-[12px]'}`} style={SMALL_TXT} aria-live="polite">
          {tags.map((t) => (
            <span key={t.key} className="inline-flex items-center gap-[4px] rounded-full bg-sd-gray-5 pl-[10px] pr-[4px] py-[2px] text-sd-gray-90">
              <span className="text-sd-gray-60">{t.label}:</span> {t.value}
              <button onClick={t.clear} aria-label={`Hapus ${t.label}`} className="rounded-full p-[2px] hover:bg-sd-gray-10"><X className="size-[12px]" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

const has = (v: string, q: string) => !q || v.toLowerCase().includes(q.toLowerCase());
const applyFilters = (rows: Usulan[], f: Filters) =>
  rows.filter((u) =>
    (has(u.nama, f.q) || has(u.nip, f.q)) &&
    (!f.unit || shortUnit(u.unit) === f.unit) &&
    (!f.data || u.data === f.data) && (!f.jenis || u.jenis === f.jenis) &&
    (!f.asal || u.asal === f.asal) && (!f.status || u.status === f.status));

/* ---------- Stepper alur status ---------- */
type Step = { label: string; info?: string; state: 'done' | 'current' | 'todo' | 'failed' | 'skipped' };

const BULAN_SINGKAT: Record<string, string> = {
  Januari: 'Jan', Februari: 'Feb', Maret: 'Mar', April: 'Apr', Mei: 'Mei', Juni: 'Jun',
  Juli: 'Jul', Agustus: 'Agu', September: 'Sep', Oktober: 'Okt', November: 'Nov', Desember: 'Des',
};
/** Nama bulan disingkat untuk keterangan di Alur Pengusulan, mis. "21 Oktober 2026" menjadi "21 Okt 2026". */
const singkatBulan = (t?: string) => t?.replace(/\b(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\b/g, (m) => BULAN_SINGKAT[m]);

function buildSteps(u: Usulan, showSiasn: boolean): Step[] {
  const s = u.status;
  const pegawai = u.asal === 'Pegawai';
  const info = (k: keyof Usulan['log']) => {
    const l = u.log[k];
    return l ? `${singkatBulan(l.waktu)}${l.catatan ? ` · Catatan: ${l.catatan}` : ''}` : undefined;
  };
  const steps: Step[] = [];
  // Pengaju sudah tampil di kolom samping, jadi langkah ini hanya menampilkan waktunya.
  steps.push({ label: 'Usulan Diajukan', info: singkatBulan(u.log.ajukan?.waktu), state: 'done' });
  if (pegawai) {
    steps.push({
      label: s === 'ditolak-admin' ? 'Pengusulan Ditolak Admin Satker' : 'Verifikasi Admin Satker',
      info: info('admin'),
      state: s === 'menunggu-diverifikasi' ? 'current' : s === 'ditolak-admin' ? 'failed' : 'done',
    });
  } else {
    steps.push({ label: 'Verifikasi Admin Satker (otomatis)', info: info('admin'), state: 'done' });
  }
  if (s === 'ditolak-admin') return steps;
  if (perluKomite(u)) {
    steps.push({
      label: s === 'ditolak-komite' ? 'Pengusulan Ditolak Komite Talenta' : 'Persetujuan Komite Talenta',
      info: info('komite'),
      state: s === 'menunggu-diverifikasi' ? 'todo' : s === 'menunggu-komite' ? 'current' : s === 'ditolak-komite' ? 'failed' : 'done',
    });
    if (s === 'ditolak-komite') return steps;
  } else {
    steps.push({ label: 'Persetujuan Komite Talenta (tidak diperlukan)', state: 'skipped' });
  }
  if (showSiasn) {
    const sync = s === 'disetujui-komite' ? 'current' : s === 'gagal-siasn' ? 'failed' : ['berhasil-siasn', 'berhasil-diperbarui'].includes(s) ? 'done' : 'todo';
    steps.push({ label: s === 'gagal-siasn' ? 'Gagal Sinkronisasi ke SIASN' : 'Sinkronisasi ke SIASN', info: info('siasn'), state: sync });
    steps.push({ label: 'Pembaruan Data pada Portal', info: info('portal'), state: s === 'berhasil-diperbarui' ? 'done' : s === 'berhasil-siasn' ? 'current' : 'todo' });
  }
  return steps;
}

/** Penanda langkah tanpa angka: selesai (centang), berjalan (cincin biru), menunggu (cincin abu), gagal (silang). */
function Stepper({ steps }: { steps: Step[] }) {
  return (
    <ol>
      {steps.map((st, i) => {
        const last = i === steps.length - 1;
        const muted = st.state === 'todo' || st.state === 'skipped';
        const marker =
          st.state === 'done' ? <span className="size-[20px] rounded-full bg-[#2d8a4e] grid place-items-center text-white"><Check className="size-[12px]" /></span>
          : st.state === 'failed' ? <span className="size-[20px] rounded-full bg-sd-red-60 grid place-items-center text-white"><X className="size-[12px]" /></span>
          : st.state === 'current' ? <span className="size-[20px] rounded-full border-2 border-sd-blue-70 bg-white grid place-items-center"><span className="size-[8px] rounded-full bg-sd-blue-70" /></span>
          : <span className="size-[20px] rounded-full border-2 border-sd-gray-30 bg-white" />;
        return (
          <li key={i} className="flex gap-[12px]">
            <div className="flex flex-col items-center">
              {marker}
              {!last && <span className="w-[2px] flex-1 min-h-[16px] my-[2px]" style={{ background: st.state === 'done' ? '#2d8a4e' : '#e4e4e4' }} />}
            </div>
            <div className={`flex flex-col gap-[2px] ${last ? '' : 'pb-[16px]'}`}>
              <span style={{ fontSize: '13px', lineHeight: '20px', fontWeight: st.state === 'current' ? 600 : 400, color: muted ? 'var(--sd-gray-60)' : 'var(--sd-gray-90)', textDecoration: st.state === 'skipped' ? 'line-through' : undefined }}>{st.label}</span>
              {st.info && <span className="text-sd-gray-60" style={{ fontSize: '12px', lineHeight: '16px' }}>{st.info}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- Perubahan: data lama dan data baru (usulan); nilai lama contoh, isi final menunggu mapping ---------- */
const SIASN_LAMA: Record<string, string> = {
  'Jabatan': 'Analis Kebijakan Ahli Muda', 'Nomor SK': 'SK/2025/0042', 'TMT Jabatan': '1 Oktober 2025', 'Berlaku Sampai': '12 September 2028',
  'Alamat': 'Jl. Lama No. 5, Jakarta Pusat', 'Nomor HP': '-', 'Email Lain': '-', 'Nomor KK': '3171000000000000',
};
const siasnValue = (u: Usulan, k: string, v: string) => (u.jenis === 'Tambah' ? '-' : u.jenis === 'Ubah' ? (u.detail.length === 1 ? u.lama : undefined) ?? SIASN_LAMA[k] ?? '-' : v);

/* Skala tipografi modal: judul 19 · judul bagian dan nilai 16 · label dan keterangan 14. */
const BODY = { fontSize: '15px', lineHeight: '22px' } as const;
const SMALL = { fontSize: '13px', lineHeight: '20px' } as const;
const VALUE = { fontSize: '15px', fontWeight: 600, lineHeight: '22px' } as const;
/** Label kecil kolom samping: 14px, huruf biasa, abu. */
const TH_STYLE = { fontSize: '13px', fontWeight: 500, lineHeight: '20px' } as const;
const HEADING = { fontSize: '15px', fontWeight: 600, lineHeight: '22px' } as const;

function Field({ label, children, muted }: { label: string; children: ReactNode; muted?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-sd-gray-60" style={SMALL}>{label}</p>
      <div className={`break-words ${muted ? 'text-sd-gray-60' : 'text-sd-gray-90'}`} style={BODY}>{children}</div>
    </div>
  );
}

type Baris = { label: string; baru: string; lama?: string; berubah: boolean };

/** Seluruh data segmen. Hanya data yang benar-benar ditambah, diubah, atau dihapus yang ditandai. */
function segmen(u: Usulan, lamaTeks: (k: string, v: string) => string): Baris[] {
  const kosong = (v: string) => !v || v === '-';
  if (u.jenis !== 'Ubah') return u.detail.map(([label, baru]) => ({ label, baru, berubah: !kosong(baru) }));
  const ubah = new Map(u.detail);
  const pertama = u.detail[0]?.[0];
  const dasar: [string, string][] = u.data === 'Data Pribadi'
    ? (Object.values(FIELD_DATA_PRIBADI).find((g) => g.includes(pertama)) ?? [...ubah.keys()]).map((f) => [f, SIASN_LAMA[f] ?? '-'] as [string, string])
    : detailFor(u.data);
  return dasar.map(([label, nilai]) =>
    ubah.has(label) ? { label, baru: ubah.get(label)!, lama: lamaTeks(label, ubah.get(label)!), berubah: true } : { label, baru: nilai, berubah: false });
}

const JENIS_UI = {
  Tambah: { tone: 'success', bar: 'var(--sd-success-border)', info: 'Data yang ditambahkan ditandai garis hijau.' },
  Ubah: { tone: 'warning', bar: 'var(--sd-warning-border)', info: 'Data yang berubah ditandai garis kuning.' },
  Hapus: { tone: 'critical', bar: 'var(--sd-red-60)', info: 'Data yang dihapus ditandai garis merah.' },
} as const;

/** Inti modal: semua data segmen, dengan penanda data yang berubah (hijau tambah, kuning ubah, merah hapus). */
function PerubahanPanel({ u }: { u: Usulan }) {
  const dariAdmin = u.asal === 'Admin Satker';
  const ui = JENIS_UI[u.jenis];
  const baris = segmen(u, (k, v) => (dariAdmin ? 'Menunggu konfirmasi mapping' : siasnValue(u, k, v)));
  const Sel = ({ r }: { r: Baris }) => (
    <div key={r.label} className="min-w-0">
      <p className="text-sd-gray-60" style={SMALL}>{r.label}</p>
      <div className={`break-words ${r.berubah ? 'border-l-[4px] pl-[10px]' : ''}`} style={r.berubah ? { borderLeftColor: ui.bar } : undefined}>
        <p className="text-sd-gray-90" style={r.berubah ? VALUE : BODY}>{r.baru}</p>
      </div>
    </div>
  );
  const grid = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-[24px] gap-y-[16px]';
  const berubah = baris.filter((r) => r.lama !== undefined);
  const lain = baris.filter((r) => r.lama === undefined);
  return (
    <div className="flex flex-col gap-[12px]">
      <Banner tone={ui.tone}><span style={BODY}>{ui.info}</span></Banner>
      <section className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden p-[16px] flex flex-col gap-[20px]">
        {u.jenis === 'Ubah' ? (
          <>
            {/* Data yang diubah dikelompokkan: sebelum dan sesudah berdampingan dengan panah. */}
            <div className="flex flex-col gap-[8px]">
              <h4 className="text-sd-gray-90" style={HEADING}>Data yang berubah</h4>
              <div className="flex flex-col gap-[12px]">
                {berubah.map((r) => (
                  <div key={r.label} className="border-l-[4px] pl-[12px]" style={{ borderLeftColor: ui.bar }}>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-x-[16px] gap-y-[8px]">
                      <div className="min-w-0">
                        <p className="text-sd-gray-60" style={SMALL}>{r.label} (Data Lama)</p>
                        <p className="text-sd-gray-60 break-words" style={BODY}>{r.lama}</p>
                      </div>
                      <ArrowRight className="hidden md:block size-[20px] mt-[22px] text-sd-gray-60" aria-hidden />
                      <div className="min-w-0">
                        <p className="text-sd-gray-60" style={SMALL}>{r.label} (Data Baru)</p>
                        <p className="text-sd-gray-90 break-words" style={VALUE}>{r.baru}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {lain.length > 0 && (
              <div className="flex flex-col gap-[8px] border-t border-sd-badge-neutral pt-[20px]">
                <h4 className="text-sd-gray-90" style={HEADING}>Data lainnya</h4>
                <div className={grid}>{lain.map((r) => <Sel key={r.label} r={r} />)}</div>
              </div>
            )}
          </>
        ) : (
          <div className={grid}>{baris.map((r) => <Sel key={r.label} r={r} />)}</div>
        )}
      </section>
    </div>
  );
}

/** Kolom samping bersama: pengaju, status, dan Alur Pengusulan (dipakai modal detail dan modal sinkronisasi). */
function UsulanSidebar({ u, steps, canRetry }: { u: Usulan; steps: Step[]; canRetry: boolean }) {
  return (
  <aside className="order-2 lg:order-1 bg-white border-t lg:border-t-0 lg:border-r border-[#e4e4e4]">
    {/* Isi sidebar menempel di atas saat kolom utama di-scroll; latar putih tetap setinggi modal. */}
    <div className="lg:sticky lg:top-0 p-[24px] flex flex-col gap-[20px]">
    <div className="flex flex-col gap-[4px]">
      <p className="text-sd-gray-80 mb-[2px]" style={TH_STYLE}>Diajukan oleh ({u.asal})</p>
      <p className="text-sd-gray-90" style={VALUE}>{u.nama}</p>
      <p className="text-sd-gray-60" style={SMALL}>NIP {u.nip}</p>
      <p className="text-sd-gray-60" style={SMALL}>{shortUnit(u.unit)}</p>
    </div>
    <div className="flex flex-col gap-[16px] border-t border-sd-gray-30 pt-[20px] mt-[4px]">
      <h4 className="text-sd-gray-80" style={TH_STYLE}>Alur Pengusulan</h4>
      <Stepper steps={steps} />
      {u.status === 'gagal-siasn' && <p className="rounded-[8px] bg-sd-red-5 px-[12px] py-[8px] text-sd-gray-90" style={SMALL}>Sinkronisasi ke SIASN gagal. {canRetry ? 'Anda dapat mencoba lagi.' : 'Komite Talenta hanya dapat melihat informasi ini.'}</p>}
      {u.status === 'berhasil-siasn' && <p className="rounded-[8px] bg-[#fef6e0] px-[12px] py-[8px] text-sd-gray-90" style={SMALL}>Sinkronisasi SIASN berhasil, namun penyimpanan pada Portal belum berhasil.</p>}
    </div>
    </div>
  </aside>
  );
}

/* ---------- Konfirmasi Sinkronisasi SIASN (langkah setelah Komite menyetujui) ---------- */
/** Pola komparasi dua kolom: Data Portal (usulan) di kiri, Data SIASN di kanan. Data SIASN di sini masih contoh. */
function SinkronModal({ u, onBack, onConfirm }: { u: Usulan; onBack: () => void; onConfirm: () => void }) {
  const baris = segmen(u, (k, v) => siasnValue(u, k, v));
  const portal = u.jenis === 'Hapus' ? [] : baris;
  const ada = u.jenis !== 'Tambah'; // Tambah: tidak ada data yang cocok di SIASN
  const siasn = baris.map((r) => ({ label: r.label, nilai: r.lama ?? r.baru, beda: r.lama !== undefined }));
  const judul = u.data.toUpperCase();
  const aksen = u.jenis === 'Hapus' ? 'var(--sd-red-60)' : 'var(--sd-warning-border)';
  const segJudul = u.jenis === 'Tambah' ? { teks: 'Data baru akan ditambahkan', warna: 'var(--sd-green-70)', Icon: CirclePlus }
    : u.jenis === 'Hapus' ? { teks: 'Data yang akan dihapus', warna: 'var(--sd-red-70)', Icon: Trash2 }
    : { teks: `Data yang akan diperbarui (${siasn.filter((r) => r.beda).length})`, warna: 'var(--sd-gray-90)', Icon: Pencil };
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 grid place-items-center p-[16px]" onClick={onBack} role="presentation">
      <div role="dialog" aria-label="Konfirmasi Sinkronisasi Data SIASN" onClick={(e) => e.stopPropagation()} className="bg-white rounded-[4px] w-full max-w-[1040px] h-[min(88vh,760px)] flex flex-col overflow-hidden shadow-[0_12px_17px_2px_rgba(0,0,0,0.08),0_5px_22px_4px_rgba(0,0,0,0.02),0_7px_8px_-4px_rgba(0,0,0,0.10)]">
        <div className="flex items-center justify-between gap-[16px] px-[20px] py-[16px] border-b border-sd-modal-border bg-sd-modal-header">
          <h2 className="text-sd-gray-90" style={HEADING}>Konfirmasi Sinkronisasi Data SIASN: <b style={{ fontWeight: 700 }}>{judul}</b></h2>
          <button onClick={onBack} aria-label="Tutup" className="shrink-0 rounded-[4px] border border-sd-gray-30 p-[4px] hover:bg-sd-gray-5"><X className="size-[18px] text-sd-gray-90" /></button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="min-h-full grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="order-1 lg:order-2 bg-sd-gray-0 p-[24px] flex flex-col gap-[16px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] items-start">
            <section className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden">
              <h3 className="px-[16px] py-[12px] bg-sd-gray-5 border-b border-[#e4e4e4] text-sd-gray-90" style={HEADING}>Data Portal</h3>
              <div className="p-[16px] flex flex-col gap-[12px]">
                {portal.length === 0
                  ? <p className="text-sd-gray-60" style={BODY}>Data ini akan dihapus dari Portal.</p>
                  : portal.map((r) => <Field key={r.label} label={r.label}><span style={r.berubah ? VALUE : BODY}>{r.baru}</span></Field>)}
              </div>
            </section>

            <section className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden">
              <h3 className="px-[16px] py-[12px] bg-sd-gray-5 border-b border-[#e4e4e4] text-sd-gray-90" style={HEADING}>Data SIASN</h3>
              <div className="p-[16px] flex flex-col gap-[16px]">
                {/* Segmen 1: data pada SIASN yang terdampak usulan ini */}
                <div className="flex flex-col gap-[8px]">
                  <h4 className="flex items-center gap-[8px]" style={{ ...BODY, fontWeight: 600, color: segJudul.warna }}>
                    <segJudul.Icon className="size-[18px]" aria-hidden /> {segJudul.teks}
                  </h4>
                  {ada ? (
                    <div className="flex flex-col gap-[12px]">
                      {siasn.map((r) => (
                        <div key={r.label} className={r.beda ? 'border-l-[4px] pl-[10px]' : ''} style={r.beda ? { borderLeftColor: aksen } : undefined}>
                          <p className="text-sd-gray-60" style={SMALL}>{r.label}</p>
                          <p className="text-sd-gray-90 break-words" style={r.beda ? VALUE : BODY}>{r.nilai}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[8px] border border-dashed border-sd-green-30 bg-sd-green-5 p-[24px] flex flex-col items-center gap-[8px] text-center text-sd-gray-70" style={BODY}>
                      <FilePlus className="size-[24px] text-sd-gray-90" aria-hidden />
                      Data baru akan ditambahkan. Tidak ada data yang cocok di SIASN.
                    </div>
                  )}
                </div>
                {/* Segmen 2: data lain milik pegawai di SIASN */}
                <div className="border-t border-sd-badge-neutral pt-[16px] flex flex-col gap-[8px]">
                  <h4 className="flex items-center gap-[8px] text-sd-gray-90" style={{ ...BODY, fontWeight: 600 }}>
                    <List className="size-[18px]" aria-hidden /> Data lainnya di SIASN (0)
                  </h4>
                  <div className="rounded-[8px] border border-[#e4e4e4] p-[24px] flex flex-col items-center gap-[8px] text-center text-sd-gray-60" style={BODY}>
                    <Inbox className="size-[24px] text-sd-gray-90" aria-hidden />
                    Tidak ada data lain di SIASN
                  </div>
                </div>
              </div>
            </section>
          </div>
          </div>
          <UsulanSidebar u={u} steps={buildSteps(u, true)} canRetry={false} />
          </div>
        </div>
        <div className="flex items-center justify-between gap-[12px] px-[20px] py-[16px] border-t border-sd-modal-footer-border bg-white">
          <button onClick={onBack} className={buttonClass('secondary', 'lg')}>Kembali</button>
          <button onClick={onConfirm} className={buttonClass('ultimate', 'lg')}><Check className="size-[16px]" /> Konfirmasi &amp; Sinkronkan</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Modal detail ---------- */
type Mode = 'verifikasi' | 'putusan' | 'lihat';


function DetailModal({ u, role, mode, onClose }: { u: Usulan; role: Role; mode: Mode; onClose: () => void }) {
  const [catatan, setCatatan] = useState('');
  const [sinkron, setSinkron] = useState(false); // langkah 2 Komite: konfirmasi sinkronisasi SIASN
  const steps = buildSteps(u, true); // Komite memakai Opsi 2: progres SIASN tampil (READ saja)
  const tolakButuhCatatan = (fn: () => void) => () => {
    if (!catatan.trim()) return toast.error('Isi catatan penolakan terlebih dahulu.');
    fn();
  };
  const close = (msg: string) => { toast.success(msg); onClose(); };
  const canRetry = role === 'admin' && u.status === 'gagal-siasn';
  const field = u.detail.length === 1 ? u.detail[0][0] : u.data;
  const headline = `${u.jenis === 'Tambah' ? 'Penambahan' : u.jenis === 'Ubah' ? 'Perubahan' : 'Penghapusan'} Data ${(u.jenis === 'Ubah' ? field : u.data).replace(/^Data /, '')}`;

  if (sinkron) {
    return <SinkronModal u={u} onBack={() => setSinkron(false)} onConfirm={() => { putusKomite(u.id, true, catatan); sinkronSiasn(u.id, true); close('Usulan disetujui Komite Talenta dan berhasil disinkronkan ke SIASN.'); }} />;
  }
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 grid place-items-center p-[16px]" onClick={onClose} role="presentation">
      <div role="dialog" aria-label="Detail Usulan Perubahan" onClick={(e) => e.stopPropagation()} className="bg-white rounded-[4px] w-full max-w-[1040px] h-[min(88vh,760px)] flex flex-col overflow-hidden shadow-[0_12px_17px_2px_rgba(0,0,0,0.08),0_5px_22px_4px_rgba(0,0,0,0.02),0_7px_8px_-4px_rgba(0,0,0,0.10)]">
        <div className="flex items-center justify-between gap-[16px] px-[20px] py-[16px] border-b border-sd-modal-border bg-sd-modal-header">
          <h2 className="text-sd-gray-90" style={HEADING}>Detail Usulan Perubahan</h2>
          <button onClick={onClose} aria-label="Tutup" className="shrink-0 rounded-[4px] border border-sd-gray-30 p-[4px] hover:bg-sd-gray-5"><X className="size-[18px] text-sd-gray-90" /></button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="min-h-full grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Kolom utama (kanan di layar lebar): apa yang berubah, bukti, dan keputusan */}
          <div className="order-1 lg:order-2 bg-sd-gray-0 p-[24px] flex flex-col gap-[24px]">
            <div className="flex items-center gap-[12px]">
              <h3 className="flex-1 min-w-0 text-sd-gray-90" style={{ fontSize: 'var(--text-lg)', fontWeight: 600, lineHeight: '28px' }}>{headline}</h3>
              <StatusBadge status={u.status} short />
            </div>

            <PerubahanPanel u={u} />

            {u.asal === 'Admin Satker' && (
              <p className="text-sd-gray-60 -mt-[8px]" style={SMALL}>Usulan Admin Satker dianggap sudah diverifikasi.</p>
            )}

            {u.dokumen.length > 0 && (
              <section className="flex flex-col gap-[8px]">
                <h4 className="text-sd-gray-90" style={HEADING}>Dokumen Pendukung</h4>
                <ul className="bg-white border border-[#e4e4e4] rounded-[8px] divide-y divide-sd-badge-neutral">
                  {u.dokumen.map((d) => (
                    <li key={d} className="flex items-center justify-between gap-[12px] px-[16px] py-[12px]">
                      <span className="flex items-center gap-[8px] text-sd-gray-90" style={BODY}><FileText className="size-[18px] text-sd-gray-60" /> {d}</span>
                      <button onClick={() => toast.info('Prototipe: berkas tidak ditampilkan.')} className="text-sd-blue-70 hover:underline" style={{ ...SMALL, fontWeight: 600 }}>Lihat File</button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {mode !== 'lihat' && (
              <section className="flex flex-col gap-[8px]">
                <div className="flex items-baseline justify-between gap-[12px]">
                  <h4 className="text-sd-gray-90" style={HEADING}>Catatan</h4>
                  <span className="text-sd-gray-60" style={SMALL}>Wajib diisi jika menolak</span>
                </div>
                <textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} rows={3} placeholder="Tulis alasan atau catatan untuk usulan ini" className={`${fieldClass} px-[12px] py-[8px]`} style={BODY} />
              </section>
            )}
          </div>

          {/* Kolom samping (kiri di layar lebar): konteks pegawai, status, dan alur */}
          <UsulanSidebar u={u} steps={steps} canRetry={canRetry} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-[12px] px-[20px] py-[16px] border-t border-sd-modal-footer-border bg-white">
          <button onClick={onClose} className={buttonClass('secondary', 'lg')}>{mode === 'lihat' ? 'Tutup' : 'Batal'}</button>
          <div className="flex gap-[8px]">
            {canRetry && (
              <button onClick={() => { sinkronSiasn(u.id, true); close('Sinkronisasi ke SIASN berhasil. Data Portal diperbarui.'); simpanPortal(u.id); }} className={buttonClass('ultimate', 'lg')}><RotateCcw className="size-[16px]" /> Coba Lagi</button>
            )}
            {u.status === 'disetujui-komite' && role === 'admin' && (
              <button onClick={() => { sinkronSiasn(u.id, true); close('Sinkronisasi ke SIASN berhasil.'); }} className={buttonClass('ultimate', 'lg')}>Jalankan Sinkronisasi SIASN</button>
            )}
            {u.status === 'berhasil-siasn' && role === 'admin' && (
              <button onClick={() => { simpanPortal(u.id); close('Data pada Portal berhasil diperbarui.'); }} className={buttonClass('ultimate', 'lg')}>Simpan ke Portal</button>
            )}
            {mode === 'verifikasi' && (
              <>
                <button onClick={tolakButuhCatatan(() => { verifikasiAdmin(u.id, false, catatan); close('Usulan ditolak Admin Satker.'); })} className={buttonClass('destructive-secondary', 'lg')}>Tolak</button>
                <button onClick={() => { verifikasiAdmin(u.id, true, catatan); close(perluKomite(u) ? 'Usulan diteruskan ke Komite Talenta.' : 'Usulan disetujui. Data pokok tidak memerlukan validasi Komite.'); }} className={buttonClass('ultimate', 'lg')}>Setujui</button>
              </>
            )}
            {mode === 'putusan' && (
              <>
                <button onClick={tolakButuhCatatan(() => { putusKomite(u.id, false, catatan); close('Usulan ditolak Komite Talenta.'); })} className={buttonClass('destructive-secondary', 'lg')}>Tolak</button>
                <button onClick={() => setSinkron(true)} className={buttonClass('ultimate', 'lg')}>Setujui</button>
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
    { key: 'no', label: 'No', width: '40px' },
    { key: 'nama', label: 'Nama Pegawai' },
    { key: 'unit', label: 'Unit Kerja' },
    { key: 'data', label: 'Data yang Diubah' },
    { key: 'jenis', label: 'Jenis Perubahan' },
    { key: 'asal', label: 'Asal Pengajuan' },
    { key: 'status', label: 'Status Pengajuan' },
    { key: 'aksi', label: 'Aksi', width: '110px' },
  ];
  const toRow = (u: Usulan, i: number) => ({
    no: i + 1,
    nama: <PersonCell name={u.nama} nip={u.nip} />,
    unit: <span className="block w-[150px] line-clamp-3" title={u.unit}>{shortUnit(u.unit)}</span>,
    data: u.jenis === 'Ubah' ? <div className="flex flex-col"><span>{u.data}</span><span className="text-sd-gray-60 line-clamp-2" style={{ fontSize: '13px', lineHeight: '20px' }}>{u.detail.map(([k]) => k).join(', ')}</span></div> : u.data,
    jenis: u.jenis,
    asal: u.asal,
    status: <StatusBadge status={u.status} short={!withStatus} />,
    aksi: <button onClick={() => onOpen(u)} className={buttonClass('secondary', 'sm')}>Cek Detail</button>,
  });
  return { cols, toRow };
}

function VerifikasiPage({ role }: { role: Role }) {
  const all = useUsulan();
  const [tab, setTab] = useState(0);
  const [f, setF] = useState<Filters>(emptyFilters);
  const [sel, setSel] = useState<Usulan | null>(null);

  const pendingStatus: StatusUsulan = role === 'admin' ? 'menunggu-diverifikasi' : 'menunggu-komite';
  const pending = useMemo(() => all.filter((u) => u.status === pendingStatus), [all, pendingStatus]);
  // Komite hanya melihat usulan yang butuh validasi Komite; Admin melihat semua status pada riwayat.
  const reviewed = useMemo(() => {
    const base = all.filter((u) => u.status !== pendingStatus);
    return role === 'admin' ? base : base.filter((u) => perluKomite(u) && !['menunggu-diverifikasi', 'ditolak-admin'].includes(u.status));
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
        fill
        items={[
          { label: role === 'admin' ? 'Daftar Usulan Perubahan Data' : 'Daftar Pengajuan Menunggu Validasi', count: pending.length },
          { label: role === 'admin' ? 'Daftar Usulan yang Telah Ditinjau' : 'Daftar Pengajuan yang Telah Ditinjau', count: reviewed.length },
        ]}
        active={tab}
        onChange={(i) => { setTab(i); setF(emptyFilters); }}
      />
      <FilterBar f={f} setF={setF} statuses={tab === 1 ? reviewedStatuses : undefined} />
      <StagingDataTable hideFilter dense noTopRule columns={cols} rows={list.map(toRow)} />
      {tab === 1 && role === 'komite' && (
        <p className="px-[16px] pb-[16px] text-sd-gray-60" style={{ fontSize: 'var(--text-xs)' }}>
          Penyajian riwayat Komite Talenta menggunakan Opsi 2 (status mengikuti seluruh proses). Komite hanya memiliki akses baca terhadap informasi sinkronisasi SIASN, tanpa aksi Coba Lagi.
        </p>
      )}
      {sel && <DetailModal key={sel.id + sel.status} u={all.find((x) => x.id === sel.id) ?? sel} role={role} mode={mode} onClose={() => setSel(null)} />}
    </PageShell>
  );
}

export const VerifikasiPerubahanPage = () => <VerifikasiPage role="admin" />;
export const VerifikasiDataKomitePage = () => <VerifikasiPage role="komite" />;
