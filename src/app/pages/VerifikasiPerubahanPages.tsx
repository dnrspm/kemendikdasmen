import { useMemo, useState, type ReactNode } from 'react';
import { X, Check, RotateCcw, Info, Search, SlidersHorizontal, FileText, Plus, Pencil, Trash2, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { toast } from 'sonner';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { Tabs } from '@/app/components/seragam/Tabs';
import { Badge } from '@/app/components/seragam/Badge';
import { Banner } from '@/app/components/seragam/Banner';
import { buttonClass, buttonStyle } from '@/app/components/seragam/Button';
import { StagingDataTable, PersonCell, Chip, type Column } from '@/app/components/StagingDataTable';
import {
  useUsulan, KATEGORI_DATA, verifikasiAdmin, putusKomite, sinkronSiasn, simpanPortal, perluKomite,
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
          <h1 className="text-[#323232]" style={{ fontSize: '24px', fontWeight: 600, lineHeight: '28px' }}>{title}</h1>
          <p className="text-[#323232]" style={{ fontSize: '14px', lineHeight: '20px' }}>{subtitle}</p>
        </div>
        <Banner tone="info">
          Anda bertindak sebagai <b style={{ fontWeight: 600 }}>{role === 'admin' ? 'Admin Satker' : 'Komite Talenta'}</b>. {role === 'admin' ? 'Verifikasi dan validasi pengajuan data pegawai pada unit kerja Anda.' : 'Tinjau data pengajuan, lalu berikan persetujuan atau penolakan.'}
        </Banner>
        <div className="bg-white border border-[#efefef] rounded-[8px] overflow-hidden">{children}</div>
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

/** Pencarian teks (nama, NIP) dipisah dari filter pilihan (dropdown seragam). */
function FilterBar({ f, setF, statuses }: { f: Filters; setF: (f: Filters) => void; statuses?: StatusUsulan[] }) {
  const [open, setOpen] = useState(false);
  const active = SELECT_KEYS.filter((k) => f[k]).length;
  const st = { fontSize: 'var(--text-sm)' } as const;

  const dropdown = (key: (typeof SELECT_KEYS)[number], label: string, all: string, options: string[], labels?: Record<string, string>) => (
    <div className="flex flex-col gap-[4px]">
      <span className="font-semibold" style={st}>{label}</span>
      <Select value={f[key] || ALL} onValueChange={(v) => setF({ ...f, [key]: v === ALL ? '' : v })}>
        <SelectTrigger className="w-full bg-white border-[#ADADAD]" style={st}><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>{all}</SelectItem>
          {options.map((o) => <SelectItem key={o} value={o}>{labels?.[o] ?? o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="border-b border-[#eee]">
      <div className="flex flex-wrap items-center gap-[12px] p-[16px]">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="size-[16px] absolute left-[10px] top-1/2 -translate-y-1/2 text-[#727272]" />
          <input value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} placeholder="Cari nama atau NIP" className="w-full border border-[#ADADAD] rounded-[4px] pl-[32px] pr-[10px] py-[8px] bg-white" style={st} />
        </div>
        <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex items-center gap-[6px] border border-[#828282] rounded-[4px] px-[14px] py-[8px] font-semibold bg-white" style={st}>
          <SlidersHorizontal className="size-[16px]" /> Filter
          {active > 0 && <span className="rounded-full bg-[#0954D9] text-white px-[6px]" style={{ fontSize: '11px' }}>{active}</span>}
        </button>
        {(active > 0 || f.q) && <button onClick={() => setF(emptyFilters)} className="text-[#0954D9] font-semibold" style={st}>Reset</button>}
      </div>
      {open && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] px-[16px] pb-[16px]">
          {dropdown('unit', 'Unit Kerja', 'Semua Unit Kerja', UNIT_OPTIONS)}
          {dropdown('data', 'Data yang Diubah', 'Semua Data', KATEGORI_DATA)}
          {dropdown('jenis', 'Jenis Perubahan', 'Semua Jenis', ['Tambah', 'Ubah', 'Hapus'])}
          {dropdown('asal', 'Asal Pengajuan', 'Semua', ['Pegawai', 'Admin Satker'])}
          {statuses && dropdown('status', 'Status Pengajuan', 'Semua Status', statuses, STATUS_LABEL)}
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
          : st.state === 'failed' ? <span className="size-[20px] rounded-full bg-[#DF2121] grid place-items-center text-white"><X className="size-[12px]" /></span>
          : st.state === 'current' ? <span className="size-[20px] rounded-full border-2 border-[#0954D9] bg-white grid place-items-center"><span className="size-[8px] rounded-full bg-[#0954D9]" /></span>
          : <span className="size-[20px] rounded-full border-2 border-[#ADADAD] bg-white" />;
        return (
          <li key={i} className="flex gap-[12px]">
            <div className="flex flex-col items-center">
              {marker}
              {!last && <span className="w-[2px] flex-1 min-h-[16px] my-[2px]" style={{ background: st.state === 'done' ? '#2d8a4e' : '#e4e4e4' }} />}
            </div>
            <div className={`flex flex-col gap-[2px] ${last ? '' : 'pb-[16px]'}`}>
              <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: st.state === 'current' ? 600 : 400, color: muted ? '#727272' : '#323232', textDecoration: st.state === 'skipped' ? 'line-through' : undefined }}>{st.label}</span>
              {st.info && <span className="text-[#727272]" style={{ fontSize: '12px', lineHeight: '16px' }}>{st.info}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- Perubahan: data lama (SIASN) dan data baru (usulan); data SIASN contoh, isi final menunggu mapping ---------- */
const SIASN_LAMA: Record<string, string> = {
  'Jabatan': 'Analis Kebijakan Ahli Muda', 'Nomor SK': 'SK/2025/0042', 'TMT Jabatan': '1 Oktober 2025', 'Berlaku Sampai': '12 September 2028',
  'Alamat': 'Jl. Lama No. 5, Jakarta Pusat', 'Nomor HP': '-', 'Email Lain': '-', 'Nomor KK': '3171000000000000',
};
const siasnValue = (u: Usulan, k: string, v: string) => (u.jenis === 'Tambah' ? '-' : u.jenis === 'Ubah' ? u.lama ?? SIASN_LAMA[k] ?? '-' : v);

/* Skala tipografi modal: judul 19 · judul bagian dan nilai 16 · label dan keterangan 14. */
const BODY = { fontSize: '16px', lineHeight: '24px' } as const;
const SMALL = { fontSize: '14px', lineHeight: '20px' } as const;
const VALUE = { fontSize: '16px', fontWeight: 600, lineHeight: '24px' } as const;
/** Label kecil kolom samping: 14px, huruf biasa, abu. */
const TH_STYLE = { fontSize: '14px', fontWeight: 500, lineHeight: '20px' } as const;
const HEADING = { fontSize: '16px', fontWeight: 600, lineHeight: '24px' } as const;

function Field({ label, children, muted }: { label: string; children: ReactNode; muted?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-[#727272]" style={SMALL}>{label}</p>
      <div className={`break-words ${muted ? 'text-[#727272]' : 'text-[#323232]'}`} style={BODY}>{children}</div>
    </div>
  );
}

/** Inti modal: apa yang berubah. Ubah = lama menjadi baru; Tambah/Hapus = data utuh. */
function PerubahanPanel({ u }: { u: Usulan }) {
  const dariAdmin = u.asal === 'Admin Satker';
  if (u.jenis === 'Ubah') {
    const [k, v] = u.detail[0];
    return (
      <section className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden">
        <h4 className="px-[16px] py-[12px] border-b border-[#efefef] text-[#323232]" style={HEADING}>{k}</h4>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
          <div className="p-[16px]">
            <Field label="Data Lama (SIASN)" muted>{dariAdmin ? <span className="text-[#727272]">Menunggu konfirmasi mapping</span> : siasnValue(u, k, v)}</Field>
          </div>
          <div className="hidden md:grid place-items-center px-[8px] text-[#727272]"><ArrowRight className="size-[20px]" /></div>
          <div className="p-[16px]">
            <Field label="Data Baru (Usulan)">{v}</Field>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between gap-[12px] px-[16px] py-[12px] border-b border-[#efefef]">
        <h4 className="text-[#323232]" style={HEADING}>{u.jenis === 'Tambah' ? 'Data yang Ditambahkan' : 'Data yang Dihapus'}</h4>
        {!dariAdmin && <span className="text-[#727272]" style={SMALL}>{u.jenis === 'Tambah' ? 'Belum ada di SIASN' : 'Ditemukan di SIASN'}</span>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[16px] p-[16px]">
        {u.detail.map(([k, v]) => <Field key={k} label={k}>{v}</Field>)}
      </div>
    </section>
  );
}

/* ---------- Modal detail ---------- */
type Mode = 'verifikasi' | 'putusan' | 'lihat';

const btnText = buttonStyle;

function DetailModal({ u, role, mode, onClose }: { u: Usulan; role: Role; mode: Mode; onClose: () => void }) {
  const [catatan, setCatatan] = useState('');
  const steps = buildSteps(u, true); // Komite memakai Opsi 2: progres SIASN tampil (READ saja)
  const tolakButuhCatatan = (fn: () => void) => () => {
    if (!catatan.trim()) return toast.error('Isi catatan penolakan terlebih dahulu.');
    fn();
  };
  const close = (msg: string) => { toast.success(msg); onClose(); };
  const canRetry = role === 'admin' && u.status === 'gagal-siasn';
  const field = u.detail[0]?.[0] ?? u.data;
  const headline = `${u.jenis === 'Tambah' ? 'Penambahan' : u.jenis === 'Ubah' ? 'Perubahan' : 'Penghapusan'} Data ${u.jenis === 'Ubah' ? field : u.data}`;
  const tone = u.jenis === 'Tambah' ? '#a9e5c1' : u.jenis === 'Ubah' ? '#a6d8f8' : '#fce9e9';

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 grid place-items-center p-[16px]" onClick={onClose} role="presentation">
      <div role="dialog" aria-label="Detail Usulan Perubahan" onClick={(e) => e.stopPropagation()} className="bg-white rounded-[4px] w-full max-w-[1040px] h-[min(88vh,760px)] flex flex-col overflow-hidden shadow-[0_12px_17px_2px_rgba(0,0,0,0.08),0_5px_22px_4px_rgba(0,0,0,0.02),0_7px_8px_-4px_rgba(0,0,0,0.10)]">
        <div className="flex items-center justify-between gap-[16px] px-[20px] py-[16px] border-b border-[#C9CBCF] bg-[#F5F5F5]">
          <h2 className="text-[#323232]" style={HEADING}>Detail Usulan Perubahan</h2>
          <button onClick={onClose} aria-label="Tutup" className="shrink-0 rounded-[4px] border border-[#ADADAD] p-[4px] hover:bg-[#F1F1F1]"><X className="size-[18px] text-[#323232]" /></button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="min-h-full grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Kolom utama (kanan di layar lebar): apa yang berubah, bukti, dan keputusan */}
          <div className="order-1 lg:order-2 bg-[#F9F9F9] p-[24px] flex flex-col gap-[24px]">
            <div className="flex items-center gap-[12px]">
              <div className="size-[40px] shrink-0 rounded-full grid place-items-center text-[#323232]" style={{ background: tone }}>
                {u.jenis === 'Tambah' ? <Plus className="size-[20px]" /> : u.jenis === 'Ubah' ? <Pencil className="size-[19px]" /> : <Trash2 className="size-[19px]" />}
              </div>
              <h3 className="flex-1 min-w-0 text-[#323232]" style={{ fontSize: 'var(--text-lg)', fontWeight: 600, lineHeight: '28px' }}>{headline}</h3>
              <StatusBadge status={u.status} short />
            </div>

            <PerubahanPanel u={u} />

            {u.asal === 'Admin Satker' && (
              <p className="text-[#727272] -mt-[8px]" style={SMALL}>Usulan Admin Satker dianggap sudah diverifikasi. Perbandingan dengan data SIASN menunggu konfirmasi mapping.</p>
            )}

            {u.dokumen.length > 0 && (
              <section className="flex flex-col gap-[8px]">
                <h4 className="text-[#323232]" style={HEADING}>Dokumen Pendukung</h4>
                <ul className="bg-white border border-[#e4e4e4] rounded-[8px] divide-y divide-[#efefef]">
                  {u.dokumen.map((d) => (
                    <li key={d} className="flex items-center justify-between gap-[12px] px-[16px] py-[12px]">
                      <span className="flex items-center gap-[8px] text-[#323232]" style={BODY}><FileText className="size-[18px] text-[#727272]" /> {d}</span>
                      <button onClick={() => toast.info('Prototipe: berkas tidak ditampilkan.')} className="text-[#0954D9] hover:underline" style={{ ...SMALL, fontWeight: 600 }}>Lihat File</button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {mode !== 'lihat' && (
              <section className="bg-white border border-[#e4e4e4] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
                <div className="flex items-baseline justify-between gap-[12px]">
                  <h4 className="text-[#323232]" style={HEADING}>Catatan</h4>
                  <span className="text-[#727272]" style={SMALL}>Wajib diisi jika menolak</span>
                </div>
                <textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} rows={3} placeholder="Tulis alasan atau catatan untuk usulan ini" className="w-full border border-[#ADADAD] rounded-[4px] px-[12px] py-[8px] text-[#323232]" style={BODY} />
              </section>
            )}
          </div>

          {/* Kolom samping (kiri di layar lebar): konteks pegawai, status, dan alur */}
          <aside className="order-2 lg:order-1 bg-white border-t lg:border-t-0 lg:border-r border-[#e4e4e4]">
            {/* Isi sidebar menempel di atas saat kolom utama di-scroll; latar putih tetap setinggi modal. */}
            <div className="lg:sticky lg:top-0 p-[24px] flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[4px]">
              <p className="text-[#45474a] mb-[2px]" style={TH_STYLE}>Diajukan oleh ({u.asal})</p>
              <p className="text-[#323232]" style={VALUE}>{u.nama}</p>
              <p className="text-[#727272]" style={SMALL}>NIP {u.nip}</p>
              <p className="text-[#727272]" style={SMALL}>{shortUnit(u.unit)}</p>
            </div>
            <div className="flex flex-col gap-[16px] border-t border-[#ADADAD] pt-[20px] mt-[4px]">
              <h4 className="text-[#45474a]" style={TH_STYLE}>Alur Pengusulan</h4>
              <Stepper steps={steps} />
              {u.status === 'gagal-siasn' && <p className="rounded-[8px] bg-[#fce9e9] px-[12px] py-[8px] text-[#323232]" style={SMALL}>Sinkronisasi ke SIASN gagal. {canRetry ? 'Anda dapat mencoba lagi.' : 'Komite Talenta hanya dapat melihat informasi ini.'}</p>}
              {u.status === 'berhasil-siasn' && <p className="rounded-[8px] bg-[#fef6e0] px-[12px] py-[8px] text-[#323232]" style={SMALL}>Sinkronisasi SIASN berhasil, namun penyimpanan pada Portal belum berhasil.</p>}
            </div>
            </div>
          </aside>
          </div>
        </div>

        <div className="flex items-center justify-between gap-[12px] px-[20px] py-[16px] border-t border-[#D9DBDD] bg-white">
          <button onClick={onClose} className={buttonClass('outline', 'lg')} style={btnText}>{mode === 'lihat' ? 'Tutup' : 'Batal'}</button>
          <div className="flex gap-[8px]">
            {canRetry && (
              <button onClick={() => { sinkronSiasn(u.id, true); close('Sinkronisasi ke SIASN berhasil. Data Portal diperbarui.'); simpanPortal(u.id); }} className={buttonClass('primary', 'lg')} style={btnText}><RotateCcw className="size-[16px]" /> Coba Lagi</button>
            )}
            {u.status === 'disetujui-komite' && role === 'admin' && (
              <button onClick={() => { sinkronSiasn(u.id, true); close('Sinkronisasi ke SIASN berhasil.'); }} className={buttonClass('primary', 'lg')} style={btnText}>Jalankan Sinkronisasi SIASN</button>
            )}
            {u.status === 'berhasil-siasn' && role === 'admin' && (
              <button onClick={() => { simpanPortal(u.id); close('Data pada Portal berhasil diperbarui.'); }} className={buttonClass('primary', 'lg')} style={btnText}>Simpan ke Portal</button>
            )}
            {mode === 'verifikasi' && (
              <>
                <button onClick={tolakButuhCatatan(() => { verifikasiAdmin(u.id, false, catatan); close('Usulan ditolak Admin Satker.'); })} className={buttonClass('danger-outline', 'lg')} style={btnText}>Tolak</button>
                <button onClick={() => { verifikasiAdmin(u.id, true, catatan); close(perluKomite(u) ? 'Usulan diteruskan ke Komite Talenta.' : 'Usulan disetujui. Data pokok tidak memerlukan validasi Komite.'); }} className={buttonClass('primary', 'lg')} style={btnText}>Setujui</button>
              </>
            )}
            {mode === 'putusan' && (
              <>
                <button onClick={tolakButuhCatatan(() => { putusKomite(u.id, false, catatan); close('Usulan ditolak Komite Talenta.'); })} className={buttonClass('danger-outline', 'lg')} style={btnText}>Tolak</button>
                <button onClick={() => { putusKomite(u.id, true, catatan); close('Usulan disetujui Komite Talenta. Sinkronisasi SIASN diproses.'); }} className={buttonClass('primary', 'lg')} style={btnText}>Setujui</button>
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
    data: u.jenis === 'Ubah' ? <div className="flex flex-col"><span>{u.data}</span><span className="text-[#727272]" style={{ fontSize: '14px', lineHeight: '20px' }}>{u.detail[0][0]}</span></div> : u.data,
    jenis: u.jenis,
    asal: u.asal,
    status: <StatusBadge status={u.status} short={!withStatus} />,
    aksi: <button onClick={() => onOpen(u)} className={buttonClass('outline', 'sm')} style={buttonStyle}>Cek Detail</button>,
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
      <StagingDataTable hideFilter dense columns={cols} rows={list.map(toRow)} />
      {tab === 1 && role === 'komite' && (
        <p className="px-[16px] pb-[16px] text-[#727272]" style={{ fontSize: 'var(--text-xs)' }}>
          Penyajian riwayat Komite Talenta menggunakan Opsi 2 (status mengikuti seluruh proses). Komite hanya memiliki akses baca terhadap informasi sinkronisasi SIASN, tanpa aksi Coba Lagi.
        </p>
      )}
      {sel && <DetailModal key={sel.id + sel.status} u={all.find((x) => x.id === sel.id) ?? sel} role={role} mode={mode} onClose={() => setSel(null)} />}
    </PageShell>
  );
}

export const VerifikasiPerubahanPage = () => <VerifikasiPage role="admin" />;
export const VerifikasiDataKomitePage = () => <VerifikasiPage role="komite" />;
