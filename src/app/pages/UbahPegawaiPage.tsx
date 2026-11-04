import { useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Info, MoreVertical, Pencil, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import {
  AHMAD_PROFIL, FIELD_DATA_PRIBADI, STATUS_LABEL, ajukanUsulan, perluKomite, useUsulan, type Jenis,
} from '@/app/data/usulanPerubahan';

const TABS = ['Data Pribadi', 'Keluarga', 'Pendidikan dan Pelatihan', 'Penilaian', 'Riwayat', 'Biometrik'];
const UNIT = 'Balai Penjaminan Mutu Pendidikan Provinsi D.K.I. Jakarta';

/** Nilai awal Data Pribadi (contoh dari halaman Edit Data Pegawai Aktif di staging). */
const PRIBADI_AWAL: Record<string, string> = {
  'Gelar Depan': 'Prof. Dr.', 'Nama Lengkap': 'AHMAD WIJAYA', 'Gelar Belakang': 'M.M.', 'Jenis Kelamin': 'Laki-laki',
  'Unit Organisasi': UNIT, 'Jabatan': 'Kepala Seksi Pemetaan Mutu dan Supervisi Lembaga Penjaminan Mutu Pendidikan Banten',
  'NIK': '3171000000000001', 'Nomor KK': '3171000000000000', 'Tempat Lahir': 'Jakarta', 'Tanggal Lahir': '18 April 1987',
  'Tingkat Pendidikan': 'S-2', 'Pendidikan': 'S-2 Manajemen', 'Status Perkawinan': 'Menikah', 'Agama': 'Islam',
  'Email Dikdasmen': 'ahmad.wijaya@kemdikdasmen.go.id', 'Email Lain': '-', 'Alamat': 'Jl. Lama No. 5, Jakarta Pusat', 'Nomor HP': '-',
  'Nomor Kontak Darurat': '-', 'Jenis Pegawai': 'PNS Pusat yang bekerja pada Departemen/Lembaga', 'Masa Kerja Golongan': '-',
  'Masa Kerja Swasta': '0 tahun 0 bulan', 'Lokasi Kerja': '-', 'Golongan Ruang Awal': 'III/b - Penata Muda Tingkat I',
  'Golongan Ruang Terakhir': 'III/d - Penata Tingkat I', 'TMT Golongan': '1 Oktober 2023', 'TMT ASN': '-', 'Nomor SK ASN': '-', 'Status ASN': 'PNS',
  'Nomor Surat Keterangan Dokter': '-', 'Tanggal Surat Keterangan Dokter': '-', 'Nomor Surat Bebas Narkoba': '-',
  'Tanggal Surat Bebas Narkoba': '-', 'Nomor Catatan Kepolisian': '-', 'Tanggal Catatan Kepolisian': '-', 'Nomor Akte Kelahiran': '-',
  'Nomor BPJS': '-', 'NPWP': '-', 'Tanggal NPWP': '-', 'Nomor TASPEN': '-',
};

type Rec = Record<string, string>;
type Tabel = { kunci: string; judul: string; data: string; kolom: string[]; baris: Rec[] };

const KELUARGA: Tabel[] = [
  { kunci: 'ortu', judul: 'Orang Tua', data: 'Orang Tua', kolom: ['Nama', 'Hubungan', 'Nomor Identitas', 'Status Hidup'], baris: [
    { Nama: 'Siti Nur Aisyah', Hubungan: 'Ibu', 'Nomor Identitas': '-', 'Status Hidup': 'Sudah Meninggal' },
    { Nama: 'Agus Trimawan', Hubungan: 'Ayah', 'Nomor Identitas': '1234567890123457', 'Status Hidup': 'Masih Hidup' },
  ] },
  { kunci: 'pasangan', judul: 'Istri', data: 'Pasangan', kolom: ['Nama', 'Nomor Identitas', 'Status Pernikahan'], baris: [
    { Nama: 'Siti Nur Aisyah', 'Nomor Identitas': '1234567890123456', 'Status Pernikahan': 'Menikah' },
    { Nama: 'Kushina', 'Nomor Identitas': '1234567890123456', 'Status Pernikahan': 'Menikah' },
  ] },
  { kunci: 'anak', judul: 'Anak', data: 'Anak', kolom: ['Nama', 'Jenis Kelamin', 'Status Sekolah/Kerja', 'Status Pernikahan Anak'], baris: [
    { Nama: 'Fulanah', 'Jenis Kelamin': 'Perempuan', 'Status Sekolah/Kerja': 'Masih Sekolah', 'Status Pernikahan Anak': 'Belum Menikah' },
    { Nama: 'Fulan', 'Jenis Kelamin': 'Laki-laki', 'Status Sekolah/Kerja': '-', 'Status Pernikahan Anak': 'Belum Menikah' },
  ] },
];

const RIWAYAT: Tabel[] = [
  { kunci: 'jabatan', judul: 'Jabatan', data: 'Jabatan', kolom: ['Jabatan', 'Nomor SK', 'TMT Jabatan'], baris: [
    { Jabatan: 'Kepala Seksi Pemetaan Mutu dan Supervisi', 'Nomor SK': 'SK/2025/0042', 'TMT Jabatan': '1 Oktober 2025' },
  ] },
  { kunci: 'sertifikasi', judul: 'Sertifikasi', data: 'Sertifikasi', kolom: ['Nama Sertifikat', 'Nomor Sertifikat', 'Berlaku Sampai'], baris: [
    { 'Nama Sertifikat': 'Pelatihan Manajemen Mutu', 'Nomor Sertifikat': 'SRT/2026/0123', 'Berlaku Sampai': '12 September 2028' },
  ] },
];

/* ---------- Modal pengajuan ---------- */
type Aksi =
  | { tipe: 'ubah-pribadi'; field: string }
  | { tipe: 'ubah-baris'; tabel: Tabel; baris: Rec }
  | { tipe: 'tambah'; tabel: Tabel }
  | { tipe: 'hapus'; tabel: Tabel; baris: Rec };

const inputCls = 'w-full border border-[#c7c7c7] rounded-[4px] px-[10px] py-[8px] bg-white';
const st = { fontSize: 'var(--text-sm)' } as const;

function Modal({ title, onClose, children, footer }: { title: string; onClose: () => void; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 grid place-items-center p-[16px]" onClick={onClose} role="presentation">
      <div role="dialog" aria-label={title} onClick={(e) => e.stopPropagation()} className="bg-white rounded-[12px] w-full max-w-[560px] max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#e4e4e4]">
          <h2 style={{ fontSize: 'var(--text-lg)' }}>{title}</h2>
          <button onClick={onClose} aria-label="Close" className="border border-[#1a5fe0] rounded-[4px] p-[2px]"><X className="size-[16px] text-[#1a5fe0]" /></button>
        </div>
        <div className="overflow-y-auto p-[20px] flex flex-col gap-[14px]">{children}</div>
        <div className="flex justify-end gap-[8px] px-[20px] py-[12px] border-t border-[#e4e4e4]">{footer}</div>
      </div>
    </div>
  );
}

const btnGhost = 'border border-[#a8a8a8] rounded-[4px] px-[16px] py-[8px] font-semibold';
const btnPrimary = 'bg-[#1a5fe0] text-white rounded-[4px] px-[16px] py-[8px] font-semibold disabled:opacity-50';

function AjukanModal({ aksi, pribadi, onClose, onDone }: { aksi: Aksi; pribadi: Rec; onClose: () => void; onDone: (r: { field: string; nilai: string; komite: boolean }) => void }) {
  const fields = aksi.tipe === 'ubah-baris' ? Object.keys(aksi.baris) : [];
  const [field, setField] = useState(aksi.tipe === 'ubah-pribadi' ? aksi.field : fields[0] ?? '');
  const [nilai, setNilai] = useState('');
  const [tambah, setTambah] = useState<Rec>({});

  const kategori = aksi.tipe === 'ubah-pribadi' ? 'Data Pribadi' : aksi.tabel.data;
  const lama = aksi.tipe === 'ubah-pribadi' ? pribadi[aksi.field] : aksi.tipe === 'ubah-baris' ? aksi.baris[field] : '';
  const jenis: Jenis = aksi.tipe === 'tambah' ? 'Tambah' : aksi.tipe === 'hapus' ? 'Hapus' : 'Ubah';
  const title = jenis === 'Ubah' ? `Ubah Data: ${aksi.tipe === 'ubah-pribadi' ? field : `${kategori} › ${field}`}` : jenis === 'Tambah' ? `Tambah ${kategori}` : `Hapus ${kategori}`;

  const detail: [string, string][] =
    aksi.tipe === 'ubah-pribadi' || aksi.tipe === 'ubah-baris' ? [[field, nilai]]
    : aksi.tipe === 'hapus' ? Object.entries(aksi.baris)
    : aksi.tabel.kolom.map((k) => [k, tambah[k] || '-']);
  const valid = jenis === 'Hapus' || (jenis === 'Ubah' ? nilai.trim() !== '' && nilai !== lama : aksi.tipe === 'tambah' && !!tambah[aksi.tabel.kolom[0]]?.trim());
  const komite = perluKomite({ data: kategori, jenis, detail });

  const kirim = () => {
    ajukanUsulan({ ...AHMAD_PROFIL, data: kategori, jenis, detail, lama: jenis === 'Ubah' ? lama : undefined });
    toast.success(komite ? 'Pengajuan dikirim dan menunggu peninjauan Komite Talenta.' : 'Pengajuan dikirim. Data pokok tidak memerlukan validasi Komite.');
    onDone({ field, nilai, komite });
  };

  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={<><button onClick={onClose} className={btnGhost} style={st}>Batal</button><button disabled={!valid} onClick={kirim} className={btnPrimary} style={st}>Ajukan Perubahan</button></>}
    >
      <p className="rounded-[6px] bg-[#eaf3fe] px-[12px] py-[8px] text-[#0b3f9e]" style={{ fontSize: 'var(--text-xs)' }}>
        Pengajuan ini dianggap sudah diverifikasi Admin Satker. {komite ? 'Usulan akan ditinjau oleh Komite Talenta sebelum disinkronkan ke SIASN.' : 'Data pokok tidak memerlukan validasi Komite.'}
      </p>

      {aksi.tipe === 'ubah-baris' && (
        <label className="flex flex-col gap-[4px]"><span className="font-semibold" style={st}>Field yang diubah (satu field per pengajuan)</span>
          <Select value={field} onValueChange={(v) => { setField(v); setNilai(''); }}>
            <SelectTrigger className="w-full bg-white border-[#c7c7c7]" style={st}><SelectValue /></SelectTrigger>
            <SelectContent>{fields.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
          </Select>
        </label>
      )}

      {jenis === 'Ubah' && (
        <>
          <div><p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>Data saat ini</p><p className="font-semibold" style={st}>{lama || '-'}</p></div>
          <label className="flex flex-col gap-[4px]"><span className="font-semibold" style={st}>Data baru</span>
            <input autoFocus value={nilai} onChange={(e) => setNilai(e.target.value)} className={inputCls} style={st} />
          </label>
        </>
      )}

      {aksi.tipe === 'tambah' && aksi.tabel.kolom.map((k, i) => (
        <label key={k} className="flex flex-col gap-[4px]"><span className="font-semibold" style={st}>{k}{i === 0 && ' *'}</span>
          <input value={tambah[k] ?? ''} onChange={(e) => setTambah({ ...tambah, [k]: e.target.value })} className={inputCls} style={st} />
        </label>
      ))}

      {aksi.tipe === 'hapus' && (
        <div className="grid grid-cols-2 gap-[12px]">
          {Object.entries(aksi.baris).map(([k, v]) => <div key={k}><p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>{k}</p><p className="font-semibold" style={st}>{v}</p></div>)}
        </div>
      )}
    </Modal>
  );
}

/* ---------- Tab ---------- */
function TabelData({ t, onAksi }: { t: Tabel; onAksi: (a: Aksi) => void }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-[8px]">
        <h3 style={{ fontSize: '19px', fontWeight: 600, lineHeight: '24px' }}>{t.judul}</h3>
        <button onClick={() => onAksi({ tipe: 'tambah', tabel: t })} className="flex items-center gap-[6px] rounded-[4px] bg-[#2f3031] px-[14px] py-[6px] text-white font-semibold" style={st}><Plus className="size-[16px]" /> Tambah</button>
      </div>
      <div className="overflow-x-auto border border-[#efefef] rounded-[6px]">
        <table className="w-full text-left" style={{ fontSize: 'var(--text-sm)' }}>
          <thead><tr className="border-b border-[#e4e4e4] uppercase text-[#65696c]" style={{ fontSize: '12px' }}>
            <th className="p-[12px] w-[48px]">No</th>{t.kolom.map((k) => <th key={k} className="p-[12px]">{k}</th>)}<th className="p-[12px] w-[60px]">Aksi</th>
          </tr></thead>
          <tbody>
            {t.baris.map((b, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-[#fafafa]' : ''}>
                <td className="p-[12px]">{i + 1}</td>{t.kolom.map((k) => <td key={k} className="p-[12px]">{b[k]}</td>)}
                <td className="p-[12px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><button aria-label="Aksi"><MoreVertical className="size-[18px] text-[#45474a]" /></button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => onAksi({ tipe: 'ubah-baris', tabel: t, baris: b })}>Ubah</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => onAksi({ tipe: 'hapus', tabel: t, baris: b })}>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DataPribadiTab({ values, onAksi }: { values: Rec; onAksi: (a: Aksi) => void }) {
  const usulan = useUsulan();
  const pending = (f: string) => usulan.find((u) => u.nip === AHMAD_PROFIL.nip && u.data === 'Data Pribadi' && u.jenis === 'Ubah' && u.detail[0][0] === f && u.status === 'menunggu-komite');
  return (
    <div className="flex flex-col gap-[20px]">
      {Object.entries(FIELD_DATA_PRIBADI).map(([bagian, fields]) => (
        <section key={bagian} className="border border-[#efefef] rounded-[6px] overflow-hidden">
          <div className="bg-[#f4f4f4] px-[14px] py-[8px] font-semibold" style={st}>{bagian}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[24px] gap-y-[4px] p-[14px]">
            {fields.map((f) => {
              const p = pending(f);
              return (
                <div key={f} className="flex items-start justify-between gap-[8px] py-[6px] border-b border-[#f0f0f0]">
                  <div className="min-w-0">
                    <p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>{f}</p>
                    <p className="font-semibold break-words" style={st}>{values[f] || '-'}</p>
                    {p && <p className="text-[#7a5a00]" style={{ fontSize: '12px' }}>{STATUS_LABEL[p.status]}</p>}
                  </div>
                  <button onClick={() => onAksi({ tipe: 'ubah-pribadi', field: f })} aria-label={`Ubah ${f}`} className="shrink-0 border border-[#a8a8a8] rounded-[4px] p-[6px] hover:bg-[#f4f4f4]"><Pencil className="size-[14px]" /></button>
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>NIP tidak dapat diubah dari halaman ini.</p>
    </div>
  );
}

export function UbahPegawaiPage() {
  const navigate = useNavigate();
  const { nip } = useParams();
  const [tab, setTab] = useState(0);
  const [riwayatTab, setRiwayatTab] = useState(0);
  const [aksi, setAksi] = useState<Aksi | null>(null);
  const [pribadi, setPribadi] = useState<Rec>(PRIBADI_AWAL);

  // Data pokok yang tidak perlu Komite langsung tampil ter-update; sisanya menunggu status di bawah field.
  const selesai = (r: { field: string; nilai: string; komite: boolean }) => {
    if (aksi?.tipe === 'ubah-pribadi' && !r.komite) setPribadi((p) => ({ ...p, [r.field]: r.nilai }));
    setAksi(null);
  };

  return (
    <KepegawaianLayout>
      <div className="px-[24px] pt-[16px] pb-[64px] flex flex-col gap-[16px]">
        <button onClick={() => navigate('/kepegawaian/data-pegawai-aktif')} className="flex items-center gap-[6px] text-[#2f3031] w-fit" style={st}><ArrowLeft className="size-[16px]" /> Kembali</button>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, lineHeight: '28px' }}>Edit Data Pegawai Aktif</h1>
          <p style={{ fontSize: '14px', lineHeight: '20px' }}>Setiap pengajuan hanya mengubah satu field. Data tertentu (jabatan, sertifikasi) memerlukan persetujuan Komite Talenta sebelum disinkronkan ke SIASN.</p>
        </div>
        <div className="flex items-start gap-[8px] rounded-[6px] bg-[#eaf3fe] border border-[#c9defa] px-[14px] py-[10px] text-[#0b3f9e]" style={{ fontSize: '14px', lineHeight: '20px' }}>
          <Info className="size-[16px] mt-[2px] shrink-0" />
          <span>Perubahan tidak langsung tersimpan. Anda bertindak sebagai Admin Satker, sehingga pengajuan dianggap sudah diverifikasi dan dapat dipantau di halaman <b>Verifikasi Perubahan Data</b>.</span>
        </div>

        <div className="flex items-center gap-[14px] bg-white border border-[#efefef] rounded-[6px] p-[14px]">
          <div className="size-[48px] rounded-full bg-[#d6e6fd]" />
          <div>
            <p className="font-semibold">{AHMAD_PROFIL.nama}</p>
            <p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>{nip ?? AHMAD_PROFIL.nip}</p>
            <p style={{ fontSize: '12px' }}>III/d · PNS · Kepala Seksi Pemetaan Mutu dan Supervisi Lembaga Penjaminan Mutu Pendidikan Banten</p>
          </div>
        </div>

        <div className="bg-white border border-[#efefef] rounded-[6px] overflow-hidden">
          <div className="flex border-b border-[#e4e4e4] overflow-x-auto">
            {TABS.map((t, i) => (
              <button key={t} onClick={() => setTab(i)} className={`px-[20px] py-[14px] border-b-[3px] whitespace-nowrap ${i === tab ? 'border-[#1a5fe0] text-[#1a5fe0]' : 'border-transparent'}`} style={{ fontSize: '16px', fontWeight: 600 }}>{t}</button>
            ))}
          </div>
          <div className="p-[16px] flex flex-col gap-[20px]">
            {tab === 0 && <DataPribadiTab values={pribadi} onAksi={setAksi} />}
            {tab === 1 && KELUARGA.map((t) => <TabelData key={t.kunci} t={t} onAksi={setAksi} />)}
            {tab === 4 && (
              <>
                <div className="flex gap-[8px] flex-wrap">
                  {RIWAYAT.map((t, i) => (
                    <button key={t.kunci} onClick={() => setRiwayatTab(i)} className={`rounded-full border px-[12px] py-[2px] ${i === riwayatTab ? 'border-[#1a5fe0] bg-[#eaf3fe] text-[#1a5fe0]' : 'border-[#2f3031]'}`} style={{ ...st, fontWeight: 600 }}>{t.judul}</button>
                  ))}
                </div>
                <TabelData t={RIWAYAT[riwayatTab]} onAksi={setAksi} />
              </>
            )}
            {[2, 3, 5].includes(tab) && (
              <p className="rounded-[4px] bg-[#f4f4f4] py-[24px] text-center text-[#65696c]" style={st}>
                {tab === 3 ? 'Data penilaian bersifat baca saja dan tidak dapat diubah dari halaman ini.' : 'Bagian ini belum tersedia pada prototipe.'}
              </p>
            )}
          </div>
        </div>
      </div>
      {aksi && <AjukanModal aksi={aksi} pribadi={pribadi} onClose={() => setAksi(null)} onDone={selesai} />}
    </KepegawaianLayout>
  );
}
