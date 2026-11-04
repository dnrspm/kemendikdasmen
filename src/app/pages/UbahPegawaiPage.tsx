import { useState, type ReactNode } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { ArrowLeft, Construction, Eye, Pencil, Plus, Trash2, UserPlus, X, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { StagingDataTable, type Column } from '@/app/components/StagingDataTable';
import imgTut from '@/assets/staging/tut-wuri-handayani.png';
import { AksiCell } from '@/app/components/AksiCell';
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
/** Kunci berawalan "_" adalah penanda tampilan (mis. _asn) dan bukan field data. */
type Tabel = { kunci: string; judul: string; data: string; kolom: string[]; baris: Rec[]; tambah?: boolean };
const fieldsOf = (r: Rec) => Object.entries(r).filter(([k]) => !k.startsWith('_'));

export const KELUARGA: Tabel[] = [
  { kunci: 'ortu', judul: 'Orang Tua', data: 'Orang Tua', kolom: ['Nama', 'Hubungan', 'Nomor Identitas', 'Status Hidup'], baris: [
    { Nama: 'Siti Nur Aisyah', Hubungan: 'Ibu', 'Nomor Identitas': '-', 'Status Hidup': 'Sudah Meninggal' },
    { Nama: 'Agus Trimawan', _asn: '1', Hubungan: 'Ayah', 'Nomor Identitas': '1234567890123457', 'Status Hidup': 'Masih Hidup' },
    { Nama: 'Siti Nur Aisyah', Hubungan: 'Ibu', 'Nomor Identitas': '-', 'Status Hidup': 'Masih Hidup' },
  ] },
  { kunci: 'pasangan', judul: 'Istri', data: 'Pasangan', kolom: ['Nama', 'Nomor Identitas', 'Status Pernikahan'], baris: [
    { Nama: 'Siti Nur Aisyah', _asn: '1', 'Nomor Identitas': '1234567890123456', 'Status Pernikahan': 'Menikah' },
    { Nama: 'Kushina', 'Nomor Identitas': '1234567890123456', 'Status Pernikahan': 'Menikah' },
    { Nama: 'Siti Nur Aisyah', 'Nomor Identitas': '1234567890123456', 'Status Pernikahan': 'Menikah' },
  ] },
  { kunci: 'anak', judul: 'Anak', data: 'Anak', kolom: ['Nama', 'Jenis Kelamin', 'Status Sekolah/Kerja', 'Status Pernikahan Anak'], baris: [
    { Nama: 'Fulanah', 'Jenis Kelamin': 'Perempuan', 'Status Sekolah/Kerja': 'Masih Sekolah', 'Status Pernikahan Anak': 'Belum Menikah' },
    { Nama: 'Fulan', 'Jenis Kelamin': 'Laki-laki', 'Status Sekolah/Kerja': '-', 'Status Pernikahan Anak': 'Belum Menikah' },
    { Nama: 'Fulan', 'Jenis Kelamin': 'Laki-laki', 'Status Sekolah/Kerja': '-', 'Status Pernikahan Anak': 'Belum Menikah' },
    { Nama: 'Fulan', 'Jenis Kelamin': 'Laki-laki', 'Status Sekolah/Kerja': '-', 'Status Pernikahan Anak': 'Belum Menikah' },
  ] },
];

const PENDIDIKAN: Tabel[] = [
  { kunci: 'formal', judul: 'Pendidikan Formal', data: 'Pendidikan', tambah: true, kolom: ['Status', 'Jenjang', 'Nama Sekolah', 'Jurusan', 'Keterangan', 'Tahun Lulus', 'Nomor Ijazah'], baris: [
    { Status: '-', Jenjang: 'S-1/Sarjana', 'Nama Sekolah': 'Kampus S1', Jurusan: 'D-III AKADEMI KEUANGAN DAN PERBANKAN RIAU', Keterangan: 'Dalam Negeri', 'Tahun Lulus': '2025', 'Nomor Ijazah': '2010130765' },
    { Status: '-', Jenjang: 'S-1/Sarjana', 'Nama Sekolah': 'Kampus S1 S1', Jurusan: 'S-1 IPND', Keterangan: 'Data tidak lengkap', 'Tahun Lulus': '2022', 'Nomor Ijazah': '2010130765' },
    { Status: '-', Jenjang: 'S-3/Doktor', 'Nama Sekolah': 'UNIVERSITAS INDONESIA', Jurusan: 'S-3 MANAJEMEN DAN BISNIS', Keterangan: 'Dalam Negeri', 'Tahun Lulus': '2019', 'Nomor Ijazah': '2019908701' },
    { Status: '-', Jenjang: 'S-2', 'Nama Sekolah': 'INSTITUT PERTANIAN BOGOR', Jurusan: 'S-2 MANAJEMEN DAN BISNIS', Keterangan: 'Dalam Negeri', 'Tahun Lulus': '2013', 'Nomor Ijazah': '2010130765' },
  ] },
  ...['Pelatihan SIASN', 'Pelatihan Struktural', 'Pelatihan Fungsional', 'Pelatihan Teknis/Seminar/Workshop/Kursus'].map((judul): Tabel => ({
    kunci: judul, judul, data: 'Pelatihan', kolom: ['Nama Pelatihan', 'Penyelenggara', 'Tahun', 'Nomor Sertifikat'], baris: [],
  })),
];

const RIWAYAT: Tabel[] = [
  { kunci: 'kepangkatan', judul: 'Kepangkatan', data: 'Kepangkatan', kolom: ['Pangkat', 'Golongan', 'Status', 'TMT Golongan', 'Masa Kerja'], baris: [
    { Pangkat: 'Penata Tingkat I', Golongan: 'III/d', Status: '-', 'TMT Golongan': '1 Oktober 2023', 'Masa Kerja': '11 tahun / 9 bulan' },
    { Pangkat: 'penata', Golongan: 'III/c', Status: '-', 'TMT Golongan': '1 Oktober 2021', 'Masa Kerja': '3 tahun / 7 bulan' },
    { Pangkat: 'penata', Golongan: 'III/c', Status: '-', 'TMT Golongan': '1 Oktober 2021', 'Masa Kerja': '3 tahun / 8 bulan' },
  ] },
  { kunci: 'jabatan', judul: 'Jabatan', data: 'Jabatan', tambah: true, kolom: ['Jabatan', 'Nomor SK', 'TMT Jabatan'], baris: [
    { Jabatan: 'Kepala Seksi Pemetaan Mutu dan Supervisi', 'Nomor SK': 'SK/2025/0042', 'TMT Jabatan': '1 Oktober 2025' },
  ] },
  { kunci: 'penghargaan', judul: 'Penghargaan', data: 'Penghargaan', kolom: ['Jenis Penghargaan', 'Tahun', 'Nomor SK'], baris: [] },
  { kunci: 'penugasan', judul: 'Penugasan', data: 'Penugasan', kolom: ['Jenis Penugasan', 'Tempat', 'Periode'], baris: [] },
  { kunci: 'sertifikasi', judul: 'Sertifikasi', data: 'Sertifikasi', tambah: true, kolom: ['Nama Sertifikat', 'Nomor Sertifikat', 'Berlaku Sampai'], baris: [
    { 'Nama Sertifikat': 'Pelatihan Manajemen Mutu', 'Nomor Sertifikat': 'SRT/2026/0123', 'Berlaku Sampai': '12 September 2028' },
  ] },
  { kunci: 'hukuman', judul: 'Hukuman Disiplin', data: 'Hukuman Disiplin', kolom: ['Jenis Hukuman', 'Nomor SK', 'TMT Hukuman'], baris: [] },
  { kunci: 'kgb', judul: 'Kenaikan Gaji Berkala', data: 'Kenaikan Gaji Berkala', kolom: ['Gaji Pokok', 'Nomor SK', 'TMT KGB'], baris: [] },
];

const NILAI: Tabel[] = [
  { kunci: 'kinerja', judul: 'Kinerja', data: 'Kinerja', kolom: ['Tahun', 'Hasil Kinerja', 'Perilaku Kerja', 'Kuadran Kinerja'], baris: [
    { Tahun: '2025', 'Hasil Kinerja': 'DIATAS EKSPEKTASI', 'Perilaku Kerja': 'DIATAS EKSPEKTASI', 'Kuadran Kinerja': 'SANGAT BAIK' },
    { Tahun: '2023', 'Hasil Kinerja': 'DIATAS EKSPEKTASI', 'Perilaku Kerja': 'DIATAS EKSPEKTASI', 'Kuadran Kinerja': 'SANGAT BAIK' },
  ] },
  { kunci: 'ninebox', judul: 'Asesmen Nine Box', data: 'Asesmen Nine Box', kolom: ['Tahun', 'Kotak', 'Keterangan'], baris: [] },
];

/* ---------- Modal pengajuan ---------- */
type Aksi =
  | { tipe: 'ubah-pribadi'; field: string }
  | { tipe: 'ubah-baris'; tabel: Tabel; baris: Rec }
  | { tipe: 'tambah'; tabel: Tabel }
  | { tipe: 'hapus'; tabel: Tabel; baris: Rec }
  | { tipe: 'ubah-kolom'; tabel: Tabel; field: string; lama: string }
  | { tipe: 'detail'; tabel: Tabel; baris: Rec };

const inputCls = 'w-full border border-[#c7c7c7] rounded-[4px] px-[10px] py-[8px] bg-white text-[#2f3031]';
const st = { fontSize: 'var(--text-sm)' } as const;
const LABEL = { fontSize: '14px', lineHeight: '20px' } as const;           // label/keterangan
const VALUE = { fontSize: '16px', fontWeight: 600, lineHeight: '24px' } as const; // nilai
const TD = { fontSize: '16px', lineHeight: '24px' } as const;
const TH = { fontSize: '14px', fontWeight: 700, lineHeight: '16px' } as const;

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

function AjukanModal({ aksi, pribadi, onClose, onDone }: { aksi: Exclude<Aksi, { tipe: 'detail' }>; pribadi: Rec; onClose: () => void; onDone: (r: { field: string; nilai: string; komite: boolean }) => void }) {
  const fields = aksi.tipe === 'ubah-baris' ? fieldsOf(aksi.baris).map(([k]) => k) : [];
  const [field, setField] = useState(aksi.tipe === 'ubah-pribadi' || aksi.tipe === 'ubah-kolom' ? aksi.field : fields[0] ?? '');
  const [nilai, setNilai] = useState('');
  const [tambah, setTambah] = useState<Rec>({});

  const kategori = aksi.tipe === 'ubah-pribadi' ? 'Data Pribadi' : aksi.tabel.data;
  const lama = aksi.tipe === 'ubah-pribadi' ? pribadi[aksi.field] : aksi.tipe === 'ubah-kolom' ? aksi.lama : aksi.tipe === 'ubah-baris' ? aksi.baris[field] : '';
  const jenis: Jenis = aksi.tipe === 'tambah' ? 'Tambah' : aksi.tipe === 'hapus' ? 'Hapus' : 'Ubah';
  const title = jenis === 'Ubah' ? `Ubah Data: ${aksi.tipe === 'ubah-pribadi' ? field : `${kategori} › ${field}`}` : jenis === 'Tambah' ? `Tambah ${kategori}` : `Hapus ${kategori}`;

  const detail: [string, string][] =
    aksi.tipe === 'ubah-pribadi' || aksi.tipe === 'ubah-baris' || aksi.tipe === 'ubah-kolom' ? [[field, nilai]]
    : aksi.tipe === 'hapus' ? fieldsOf(aksi.baris)
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
      <p className="rounded-[6px] bg-[#eaf3fe] px-[12px] py-[8px] text-[#0b3f9e]" style={LABEL}>
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
          <div><p className="text-[#65696c]" style={LABEL}>Data saat ini</p><p className="text-[#2f3031]" style={VALUE}>{lama || '-'}</p></div>
          <label className="flex flex-col gap-[4px]"><span className="font-semibold" style={st}>Data baru</span>
            <input autoFocus value={nilai} onChange={(e) => setNilai(e.target.value)} className={inputCls} style={TD} />
          </label>
        </>
      )}

      {aksi.tipe === 'tambah' && aksi.tabel.kolom.map((k, i) => (
        <label key={k} className="flex flex-col gap-[4px]"><span className="font-semibold" style={st}>{k}{i === 0 && ' *'}</span>
          <input value={tambah[k] ?? ''} onChange={(e) => setTambah({ ...tambah, [k]: e.target.value })} className={inputCls} style={TD} />
        </label>
      ))}

      {aksi.tipe === 'hapus' && (
        <div className="grid grid-cols-2 gap-[12px]">
          {fieldsOf(aksi.baris).map(([k, v]) => <div key={k}><p className="text-[#65696c]" style={LABEL}>{k}</p><p className="text-[#2f3031]" style={VALUE}>{v}</p></div>)}
        </div>
      )}
    </Modal>
  );
}

/* ---------- Tab ---------- */
/* Gaya pill/chip dan tombol mengikuti staging dan sistem ini. */
const outlineBtn = 'flex items-center gap-[8px] border border-[#a8a8a8] rounded-[4px] bg-white px-[16px] py-[8px] text-[#2f3031] hover:bg-[#f4f4f4]';
const outlineTxt = { fontSize: '16px', fontWeight: 600, lineHeight: '24px' } as const;

const Diperbarui = () => (
  <p className="text-[#808489]" style={LABEL}>Terakhir diperbarui: <span style={{ fontWeight: 500 }}>4 November 2026</span></p>
);

function SubPills({ items, active, onChange }: { items: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div className="flex gap-[8px] flex-wrap">
      {items.map((t, i) => (
        <button key={t} onClick={() => onChange(i)} className={`border px-[12px] py-[4px] ${i === active ? 'border-[#0b5fef] bg-[#ecf5fe] text-[#0b5fef]' : 'border-[#2f3031] bg-white text-[#2f3031]'}`} style={{ borderRadius: '24px', fontSize: '16px', lineHeight: '20px', fontWeight: 600 }}>{t}</button>
      ))}
    </div>
  );
}

const Tag = ({ bg, children }: { bg: string; children: ReactNode }) => (
  <span className="inline-block rounded-full px-[10px] py-[2px] text-[#2f3031] whitespace-nowrap" style={{ background: bg, fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>{children}</span>
);

function cell(t: Tabel, k: string, b: Rec): ReactNode {
  const v = b[k];
  if (k === 'Nama' && b._asn) return <span className="inline-flex items-center gap-[6px] flex-wrap">{v}<Tag bg="#fae1ae">ASN</Tag></span>;
  if (k === 'Jenis Kelamin') return <Tag bg={v === 'Perempuan' ? '#fce9e9' : '#a6d8f8'}>{v}</Tag>;
  if (v === 'Data tidak lengkap') return <span className="text-[#e02d38]">{v}</span>;
  return v;
}

/** Tabel memakai komponen tabel sistem (StagingDataTable) agar gayanya seragam di semua halaman. */
function TabelEdit({ t, onAksi, editable = true, pagination = true, menu = false }: { t: Tabel; onAksi: (a: Aksi) => void; editable?: boolean; pagination?: boolean; menu?: boolean }) {
  const cols: Column[] = [
    { key: 'no', label: 'No', width: '48px' },
    ...t.kolom.map((k) => ({ key: k, label: k })),
    ...(editable ? [{ key: 'aksi', label: 'Aksi', width: '160px' }] : []),
  ];
  const rows = t.baris.map((b, i) => {
    const r: Record<string, ReactNode> = { no: i + 1 };
    t.kolom.forEach((k) => { r[k] = cell(t, k, b); });
    r.aksi = (
      <AksiCell items={[
        // Keluarga: "Ubah" membuka halaman edit per field; tabel lain mengajukan langsung dari modal.
        { label: 'Ubah', icon: <Pencil className="size-[16px]" />, onClick: () => onAksi(menu ? { tipe: 'detail', tabel: t, baris: b } : { tipe: 'ubah-baris', tabel: t, baris: b }) },
        { label: 'Hapus', icon: <Trash2 className="size-[16px]" />, danger: true, onClick: () => onAksi({ tipe: 'hapus', tabel: t, baris: b }) },
      ]} />
    );
    return r;
  });
  return <StagingDataTable hideFilter showPagination={pagination} columns={cols} rows={rows} />;
}

/** Kartu per kelompok keluarga: judul + tombol Tambah, lalu tabel (seperti staging). */
function KartuKeluarga({ t, onAksi }: { t: Tabel; onAksi: (a: Aksi) => void }) {
  return (
    <section className="border border-[#efefef] rounded-[6px] overflow-hidden">
      <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-[#efefef]">
        <h3 className="text-[#65696c]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>{t.judul}</h3>
        <button onClick={() => onAksi({ tipe: 'tambah', tabel: t })} className={outlineBtn} style={outlineTxt}><UserPlus className="size-[18px]" /> Tambah</button>
      </div>
      <TabelEdit t={t} onAksi={onAksi} pagination={false} menu />
    </section>
  );
}

/** Tab dengan sub-tab pill, "Lihat Data SIASN", dan tabel (Pendidikan dan Pelatihan, Riwayat, Penilaian). */
function TabSub({ tabel, onAksi, siasn = true, editable = true }: { tabel: Tabel[]; onAksi: (a: Aksi) => void; siasn?: boolean; editable?: boolean }) {
  const [i, setI] = useState(0);
  const t = tabel[i];
  return (
    <div className="flex flex-col gap-[16px]">
      <SubPills items={tabel.map((x) => x.judul)} active={i} onChange={setI} />
      <div className="flex items-center justify-between gap-[8px] flex-wrap">
        <Diperbarui />
        <div className="flex gap-[8px]">
          {siasn && <button onClick={() => toast.info('Prototipe: data SIASN tidak ditampilkan.')} className={outlineBtn} style={outlineTxt}><Eye className="size-[18px]" /> Lihat Data SIASN</button>}
          {editable && t.tambah && <button onClick={() => onAksi({ tipe: 'tambah', tabel: t })} className={outlineBtn} style={outlineTxt}><Plus className="size-[18px]" /> Tambah</button>}
        </div>
      </div>
      <div className="border border-[#efefef] rounded-[6px] overflow-hidden">
        <TabelEdit t={t} onAksi={onAksi} editable={editable && t.baris.length > 0} />
      </div>
    </div>
  );
}

function DataPribadiTab({ values, onAksi }: { values: Rec; onAksi: (a: Aksi) => void }) {
  const usulan = useUsulan();
  const pending = (f: string) => usulan.find((u) => u.nip === AHMAD_PROFIL.nip && u.data === 'Data Pribadi' && u.jenis === 'Ubah' && u.detail[0][0] === f && u.status === 'menunggu-komite');
  return (
    <div className="flex flex-col gap-[20px]">
      {Object.entries(FIELD_DATA_PRIBADI).map(([bagian, fields]) => (
        <section key={bagian} className="border border-[#efefef] rounded-[6px] overflow-hidden">
          <div className="bg-[#f4f4f4] px-[14px] py-[8px] text-[#65696c]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>{bagian}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[24px] gap-y-[4px] p-[14px]">
            {fields.map((f) => {
              const p = pending(f);
              return (
                <div key={f} className="flex items-start justify-between gap-[8px] py-[6px] border-b border-[#f0f0f0]">
                  <div className="min-w-0">
                    <p className="text-[#65696c]" style={LABEL}>{f}</p>
                    <p className="text-[#2f3031] break-words" style={VALUE}>{values[f] || '-'}</p>
                    {p && <p className="text-[#7a5a00]" style={LABEL}>{STATUS_LABEL[p.status]}</p>}
                  </div>
                  <button onClick={() => onAksi({ tipe: 'ubah-pribadi', field: f })} aria-label={`Ubah ${f}`} className="shrink-0 border border-[#a8a8a8] rounded-[4px] p-[6px] hover:bg-[#f4f4f4]"><Pencil className="size-[14px]" /></button>
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <p className="text-[#808489]" style={LABEL}>NIP tidak dapat diubah dari halaman ini.</p>
    </div>
  );
}

export function UbahPegawaiPage() {
  const navigate = useNavigate();
  const { nip } = useParams();
  const [params] = useSearchParams();
  const [tab, setTab] = useState(params.get('tab') === 'keluarga' ? 1 : 0);
  const [aksi, setAksiState] = useState<Aksi | null>(null);
  const [pribadi, setPribadi] = useState<Rec>(PRIBADI_AWAL);

  const setAksi = (a: Aksi | null) => {
    if (a?.tipe === 'detail') {
      const slug = a.tabel.kunci === 'ortu' ? 'orang-tua' : a.tabel.kunci;
      navigate(`/kepegawaian/ubah-pegawai/${nip ?? AHMAD_PROFIL.nip}/${slug}/${a.tabel.baris.indexOf(a.baris)}`);
      return;
    }
    setAksiState(a);
  };

  // Data pokok yang tidak perlu Komite langsung tampil ter-update; sisanya menunggu status di bawah field.
  const selesai = (r: { field: string; nilai: string; komite: boolean }) => {
    if (aksi?.tipe === 'ubah-pribadi' && !r.komite) setPribadi((p) => ({ ...p, [r.field]: r.nilai }));
    setAksiState(null);
  };

  return (
    <KepegawaianLayout>
      <div className="px-[24px] pt-[16px] pb-[64px] flex flex-col gap-[16px]">
        <button onClick={() => navigate('/kepegawaian/data-pegawai-aktif')} className="flex items-center gap-[6px] text-[#2f3031] w-fit" style={LABEL}><ArrowLeft className="size-[16px]" /> Kembali</button>
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-[#2f3031]" style={{ fontSize: '24px', fontWeight: 700, lineHeight: '28px' }}>Edit Data Pegawai Aktif</h1>
          <p className="text-[#2f3031]" style={LABEL}>Setiap pengajuan hanya mengubah satu field. Data jabatan dan sertifikasi memerlukan persetujuan Komite Talenta sebelum disinkronkan ke SIASN.</p>
        </div>

        <div className="flex items-center gap-[20px] bg-white border border-[#efefef] rounded-[6px] p-[20px]">
          <img alt="" src={imgTut} className="size-[72px] shrink-0 rounded-full object-cover" />
          <div className="min-w-0 flex flex-col gap-[6px]">
            <p className="text-[#2f3031]" style={VALUE}>{AHMAD_PROFIL.nama}</p>
            <p className="text-[#808489]" style={TD}>{nip ?? AHMAD_PROFIL.nip}</p>
            <div className="flex items-center gap-[8px] flex-wrap mt-[4px]">
              <span className="rounded-[4px] border border-[#a8a8a8] px-[6px] text-[#2f3031]" style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px', fontWeight: 700, lineHeight: '18px' }}>III/d</span>
              <span className="rounded-[4px] bg-[#9ae5b9] px-[6px] text-[#2f3031]" style={{ fontSize: '12px', fontWeight: 700, lineHeight: '18px' }}>PNS</span>
              <span className="rounded-[4px] bg-[#efefef] px-[8px] text-[#2f3031]" style={{ fontSize: '12px', fontWeight: 600, lineHeight: '18px' }}>Kepala Seksi Pemetaan Mutu dan Supervisi Lembaga Penjaminan Mutu Pendidikan Banten</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#efefef] rounded-[6px] overflow-hidden">
          <div className="flex gap-[13px] px-[16px] border-b border-[#e4e4e4] overflow-x-auto">
            {TABS.map((t, i) => (
              <button key={t} onClick={() => setTab(i)} className="relative whitespace-nowrap text-[#2f3031]" style={{ height: '56px', padding: '12px 7.5px', fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
                {t}
                {i === tab && <span className="absolute left-0 right-0 bottom-0 bg-[#0b5fef]" style={{ height: '4px', borderRadius: '24px 24px 0 0' }} />}
              </button>
            ))}
          </div>
          <div className="p-[16px] flex flex-col gap-[16px]">
            {tab === 0 && <DataPribadiTab values={pribadi} onAksi={setAksi} />}
            {tab === 1 && <><Diperbarui />{KELUARGA.map((t) => <KartuKeluarga key={t.kunci} t={t} onAksi={setAksi} />)}</>}
            {tab === 2 && <TabSub tabel={PENDIDIKAN} onAksi={setAksi} />}
            {tab === 3 && <TabSub tabel={NILAI} onAksi={setAksi} siasn={false} editable={false} />}
            {tab === 4 && <TabSub tabel={RIWAYAT} onAksi={setAksi} />}
            {tab === 5 && (
              <div className="rounded-[6px] bg-[#f4f4f4] py-[56px] flex flex-col items-center gap-[8px] text-center">
                <div className="size-[72px] rounded-full bg-white grid place-items-center"><Construction className="size-[36px] text-[#b98900]" /></div>
                <p className="text-[#2f3031]" style={{ fontSize: '14px', fontWeight: 700, lineHeight: '20px' }}>Sedang dalam pengembangan</p>
                <p className="text-[#808489]" style={{ fontSize: '14px', lineHeight: '20px' }}>Fitur ini sedang dalam tahap pengembangan dan akan segera tersedia.<br />Terima kasih atas kesabaran Anda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {aksi && aksi.tipe !== 'detail' && <AjukanModal aksi={aksi} pribadi={pribadi} onClose={() => setAksiState(null)} onDone={selesai} />}
    </KepegawaianLayout>
  );
}

/* ---------- Halaman detail keluarga (aksi Lihat), mengikuti staging ---------- */
type Kartu = { judul: string; fields: [string, string][]; dokumen?: boolean };

function kartuKeluarga(jenis: string, r: Rec): Kartu[] {
  const g = (k: string, d = '-') => r[k] || d;
  if (jenis === 'orang-tua') return [
    { judul: 'Data Diri', fields: [['Hubungan', g('Hubungan')], ['Status Hidup', g('Status Hidup')], ['Nama', g('Nama')], ['Tanggal Lahir', '1 Oktober 1983'], ['Status ASN', r._asn ? 'ASN' : 'Bukan ASN'], ['NIP', r._asn ? '987654321087654321' : '-'], ['Agama', 'Islam'], ['Status Pernikahan', 'Menikah']] },
    { judul: 'Identitas dan Kontak', fields: [['Jenis Identitas', 'KTP'], ['Nomor Identitas', g('Nomor Identitas')], ['Nomor HP', '-'], ['Nomor Telepon', '-'], ['Email', '-'], ['Alamat', '-']] },
    { judul: 'Dokumen Pendukung', dokumen: true, fields: [['Dokumen Kartu Keluarga', 'file'], ['Dokumen Akta Kelahiran', '-'], [`Pas Foto ${g('Hubungan', 'Orang Tua')}`, '-']] },
  ];
  if (jenis === 'pasangan') return [
    { judul: 'Data Diri', fields: [['Nama', g('Nama')], ['Status ASN', r._asn ? 'ASN' : 'Bukan ASN'], ['NIP', '-'], ['Status Pernikahan', g('Status Pernikahan')], ['Tanggal Lahir', '29 Oktober 1990'], ['Jenis Kelamin', 'Perempuan'], ['Agama', 'Islam']] },
    { judul: 'Identitas dan Kontak', fields: [['Nomor KK', '0000000000000000'], ['Jenis Dokumen Identitas', 'KTP'], ['Nomor Identitas', g('Nomor Identitas')], ['Nomor HP', '-'], ['Email', '-'], ['Alamat', '-']] },
    { judul: 'Dokumen Pendukung', dokumen: true, fields: [['Dokumen Akta Menikah', 'file'], ['Pas Foto Istri', '-']] },
  ];
  return [
    { judul: 'Data Diri', fields: [['Nama', g('Nama')], ['Jenis Kelamin', g('Jenis Kelamin')], ['Tanggal Lahir', '12 Mei 2015'], ['Status Sekolah/Kerja', g('Status Sekolah/Kerja')], ['Status Pernikahan Anak', g('Status Pernikahan Anak')]] },
    { judul: 'Identitas dan Kontak', fields: [['Nomor Identitas', '0000000000000000'], ['Nomor HP', '-'], ['Email', '-'], ['Alamat', '-']] },
    { judul: 'Dokumen Pendukung', dokumen: true, fields: [['Dokumen Akta Kelahiran', 'file'], ['Pas Foto Anak', '-']] },
  ];
}

export function DetailKeluargaPage() {
  const navigate = useNavigate();
  const { nip, jenis = '', idx = '0' } = useParams();
  const t = KELUARGA.find((x) => (x.kunci === 'ortu' ? 'orang-tua' : x.kunci) === jenis);
  const r = t?.baris[Number(idx)];
  const [aksi, setAksi] = useState<Aksi | null>(null);
  const [baru, setBaru] = useState<Rec>({});
  const kembali = () => navigate(`/kepegawaian/ubah-pegawai/${nip ?? AHMAD_PROFIL.nip}?tipe=aktif&tab=keluarga`);
  const nama = jenis === 'orang-tua' ? r?.Hubungan ?? 'Orang Tua' : jenis === 'pasangan' ? 'Istri' : 'Anak';
  const kartu = r ? kartuKeluarga(jenis, r) : [];

  const render = (k: Kartu) => (
    <section key={k.judul} className="border border-[#efefef] rounded-[6px] overflow-hidden self-start">
      <div className="px-[16px] py-[12px] border-b border-[#efefef] text-[#65696c]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>{k.judul}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[16px] p-[16px]">
        {k.fields.map(([f, v]) => {
          const nilai = baru[f] ?? v;
          return (
            <div key={f} className={`flex items-start justify-between gap-[8px] ${f === 'Nama' || f === 'Alamat' || f === 'NIP' || k.dokumen ? 'sm:col-span-2' : ''}`}>
              <div className="min-w-0">
                <p className="text-[#65696c]" style={LABEL}>{f}</p>
                {v === 'file'
                  ? <button onClick={() => toast.info('Prototipe: berkas tidak ditampilkan.')} className="flex items-center gap-[6px] text-[#2f3031]" style={VALUE}><FileText className="size-[18px]" /> Lihat File</button>
                  : <p className="text-[#2f3031] break-words" style={VALUE}>{nilai}</p>}
              </div>
              {!k.dokumen && t && (
                <button onClick={() => setAksi({ tipe: 'ubah-kolom', tabel: t, field: f, lama: nilai })} aria-label={`Ubah ${f}`} className="shrink-0 border border-[#a8a8a8] rounded-[4px] p-[6px] hover:bg-[#f4f4f4]"><Pencil className="size-[14px]" /></button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );

  // Data keluarga tidak memerlukan Komite: nilai baru langsung tampil setelah diajukan.
  const selesai = (res: { field: string; nilai: string; komite: boolean }) => {
    if (!res.komite) setBaru((b) => ({ ...b, [res.field]: res.nilai }));
    setAksi(null);
  };

  return (
    <KepegawaianLayout>
      <div className="px-[24px] pt-[16px] pb-[64px] flex flex-col gap-[16px]">
        <button onClick={kembali} className="flex items-center gap-[6px] text-[#2f3031] w-fit" style={LABEL}><ArrowLeft className="size-[16px]" /> Kembali</button>
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-[#2f3031]" style={{ fontSize: '24px', fontWeight: 700, lineHeight: '28px' }}>Edit Data {nama}</h1>
          <p className="text-[#2f3031]" style={LABEL}>Pilih ikon pensil pada field yang ingin diubah. Setiap pengajuan hanya mengubah satu field.</p>
        </div>
        {r ? (
          <div className="bg-white border border-[#efefef] rounded-[6px] p-[16px] grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
            {kartu.map(render)}
          </div>
        ) : (
          <p className="rounded-[4px] bg-[#f4f4f4] py-[24px] text-center text-[#65696c]" style={LABEL}>Data tidak ditemukan.</p>
        )}
      </div>
      {aksi && aksi.tipe !== 'detail' && <AjukanModal aksi={aksi} pribadi={{}} onClose={() => setAksi(null)} onDone={selesai} />}
    </KepegawaianLayout>
  );
}
