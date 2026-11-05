import { useMemo, useState, type ReactNode } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { ArrowLeft, ArrowRight, Construction, Eye, Pencil, Plus, Trash2, UserPlus, X, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { StagingDataTable, type Column } from '@/app/components/StagingDataTable';
import imgTut from '@/assets/staging/tut-wuri-handayani.png';
import { fieldClass, Tabs, ChipGroup, Badge, buttonClass } from 'seragam-design-system';
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

/** Pegawai non aktif (contoh dari staging): NIP berawalan GEN. */
const PROFIL_NONAKTIF = { nama: 'Prof. Dr. Dummy Pegawai 1 S.Kom, MM, PhD', nip: 'GEN000000000000001' };
const profilByNip = (nip?: string) => (nip?.startsWith('GEN') ? PROFIL_NONAKTIF : AHMAD_PROFIL);
const PRIBADI_NONAKTIF: Rec = {
  ...PRIBADI_AWAL, 'Nama Lengkap': 'Dummy Pegawai 1', 'Gelar Belakang': 'S.Kom, MM, PhD', Jabatan: '-',
  'Golongan Ruang Awal': '-', 'Golongan Ruang Terakhir': '-', 'TMT Golongan': '-', NIK: '-', 'Nomor KK': '-', 'Tempat Lahir': '-', 'Tanggal Lahir': '-',
};
/** Kunci berawalan "_" adalah penanda tampilan (mis. _asn) dan bukan field data. */
export type Tabel = { kunci: string; judul: string; data: string; kolom: string[]; baris: Rec[]; tambah?: boolean };
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

const inputCls = `${fieldClass} px-[12px] py-[8px]`;
const st = { fontSize: 'var(--text-sm)' } as const;
const LABEL = { fontSize: '13px', lineHeight: '20px' } as const;           // label/keterangan
const VALUE = { fontSize: '15px', fontWeight: 600, lineHeight: '22px' } as const; // nilai
const TD = { fontSize: '15px', lineHeight: '22px' } as const;
const TH = { fontSize: '13px', fontWeight: 700, lineHeight: '16px' } as const;

/* Modal pengajuan: struktur dan skala tipografi sama dengan modal Detail Usulan di halaman Verifikasi. */
function Modal({ title, wide, onClose, children, footer }: { title: string; wide?: boolean; onClose: () => void; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 grid place-items-center p-[16px]" onClick={onClose} role="presentation">
      <div role="dialog" aria-label={title} onClick={(e) => e.stopPropagation()} className={`bg-white rounded-[4px] shadow-[0_12px_17px_2px_rgba(0,0,0,0.08),0_5px_22px_4px_rgba(0,0,0,0.02),0_7px_8px_-4px_rgba(0,0,0,0.10)] w-full ${wide ? 'max-w-[760px]' : 'max-w-[660px]'} max-h-[92vh] flex flex-col overflow-hidden`}>
        <div className="flex items-center justify-between gap-[16px] px-[20px] py-[16px] border-b border-sd-modal-border bg-sd-modal-header">
          <h2 className="text-sd-gray-90" style={{ fontSize: '15px', fontWeight: 600, lineHeight: '22px' }}>{title}</h2>
          <button onClick={onClose} aria-label="Tutup" className="shrink-0 rounded-[4px] border border-sd-gray-30 p-[4px] hover:bg-sd-gray-5"><X className="size-[18px] text-sd-gray-90" /></button>
        </div>
        <div className="overflow-y-auto bg-sd-gray-0 px-[24px] py-[20px] flex flex-col gap-[16px] [&>*]:shrink-0">{children}</div>
        <div className="flex justify-end gap-[8px] px-[20px] py-[16px] border-t border-sd-modal-footer-border bg-white">{footer}</div>
      </div>
    </div>
  );
}

const btnGhost = buttonClass('secondary', 'lg');
const btnPrimary = buttonClass('ultimate', 'lg');
const btnDanger = buttonClass('destructive', 'lg');

function Panel({ title, right, children }: { title: string; right?: ReactNode; children: ReactNode }) {
  return (
    <section className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between gap-[12px] px-[16px] py-[12px] border-b border-sd-badge-neutral">
        <h4 className="text-sd-gray-90" style={{ fontSize: '15px', fontWeight: 600, lineHeight: '22px' }}>{title}</h4>
        {right && <span className="text-sd-gray-60" style={LABEL}>{right}</span>}
      </div>
      <div className="p-[16px]">{children}</div>
    </section>
  );
}

function AjukanModal({ aksi, pribadi, onClose, onDone }: { aksi: Exclude<Aksi, { tipe: 'detail' }>; pribadi: Rec; onClose: () => void; onDone: (r: { field: string; nilai: string; komite: boolean }) => void }) {
  const { nip: nipParam } = useParams();
  const fields = aksi.tipe === 'ubah-baris' ? fieldsOf(aksi.baris).map(([k]) => k) : [];
  const [field, setField] = useState(aksi.tipe === 'ubah-pribadi' || aksi.tipe === 'ubah-kolom' ? aksi.field : fields[0] ?? '');
  const [nilai, setNilai] = useState('');
  const [tambah, setTambah] = useState<Rec>({});

  const kategori = aksi.tipe === 'ubah-pribadi' ? 'Data Pribadi' : aksi.tabel.data;
  const lama = aksi.tipe === 'ubah-pribadi' ? pribadi[aksi.field] : aksi.tipe === 'ubah-kolom' ? aksi.lama : aksi.tipe === 'ubah-baris' ? aksi.baris[field] : '';
  const jenis: Jenis = aksi.tipe === 'tambah' ? 'Tambah' : aksi.tipe === 'hapus' ? 'Hapus' : 'Ubah';
  const headline = `${jenis === 'Tambah' ? 'Penambahan' : jenis === 'Ubah' ? 'Perubahan' : 'Penghapusan'} Data ${jenis === 'Ubah' ? field : kategori}`;
  const tone = jenis === 'Tambah' ? '#a9e5c1' : jenis === 'Ubah' ? 'var(--sd-badge-info)' : 'var(--sd-red-5)';

  const detail: [string, string][] =
    aksi.tipe === 'ubah-pribadi' || aksi.tipe === 'ubah-baris' || aksi.tipe === 'ubah-kolom' ? [[field, nilai]]
    : aksi.tipe === 'hapus' ? fieldsOf(aksi.baris)
    : aksi.tabel.kolom.map((k) => [k, tambah[k] || '-']);
  const valid = jenis === 'Hapus' || (jenis === 'Ubah' ? nilai.trim() !== '' && nilai !== lama : aksi.tipe === 'tambah' && !!tambah[aksi.tabel.kolom[0]]?.trim());
  const komite = perluKomite({ data: kategori, jenis, detail });

  const kirim = () => {
    ajukanUsulan({ ...profilByNip(nipParam), data: kategori, jenis, detail, lama: jenis === 'Ubah' ? lama : undefined });
    toast.success(komite ? 'Pengajuan dikirim dan menunggu peninjauan Komite Talenta.' : 'Pengajuan dikirim. Data pokok tidak memerlukan validasi Komite.');
    onDone({ field, nilai, komite });
  };

  return (
    <Modal
      title="Ajukan Perubahan Data"
      wide={aksi.tipe === 'tambah'}
      onClose={onClose}
      footer={<>
        <button onClick={onClose} className={btnGhost}>Batal</button>
        <button disabled={!valid} onClick={kirim} className={jenis === 'Hapus' ? btnDanger : btnPrimary}>
          {jenis === 'Tambah' ? 'Ajukan Penambahan' : jenis === 'Hapus' ? 'Ajukan Penghapusan' : 'Ajukan Perubahan'}
        </button>
      </>}
    >
      <div className="flex items-center gap-[12px]">
        <div className="size-[40px] shrink-0 rounded-full grid place-items-center text-sd-gray-90" style={{ background: tone }}>
          {jenis === 'Tambah' ? <Plus className="size-[20px]" /> : jenis === 'Ubah' ? <Pencil className="size-[19px]" /> : <Trash2 className="size-[19px]" />}
        </div>
        <h3 className="text-sd-gray-90" style={{ fontSize: 'var(--text-lg)', fontWeight: 600, lineHeight: '28px' }}>{headline}</h3>
      </div>

      {aksi.tipe === 'ubah-baris' && (
        <Panel title="Field yang Diubah" right="Satu field per pengajuan">
          <Select value={field} onValueChange={(v) => { setField(v); setNilai(''); }}>
            <SelectTrigger className="w-full bg-white border-sd-gray-30" style={TD}><SelectValue /></SelectTrigger>
            <SelectContent>{fields.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
          </Select>
        </Panel>
      )}

      {jenis === 'Ubah' && (
        <Panel title={field}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-x-[16px] gap-y-[12px] items-start">
            <div>
              <p className="text-sd-gray-60" style={LABEL}>Data Saat Ini</p>
              <p className="text-sd-gray-60 break-words" style={TD}>{lama || '-'}</p>
            </div>
            <div className="hidden md:grid place-items-center self-center text-sd-gray-60"><ArrowRight className="size-[20px]" /></div>
            <label className="block">
              <span className="block text-sd-gray-60" style={LABEL}>Data Baru</span>
              <input autoFocus value={nilai} onChange={(e) => setNilai(e.target.value)} className={inputCls} style={TD} />
            </label>
          </div>
        </Panel>
      )}

      {aksi.tipe === 'tambah' && (
        <Panel title="Data yang Ditambahkan">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[16px]">
            {aksi.tabel.kolom.map((k, i) => (
              <label key={k} className="block">
                <span className="block text-sd-gray-60" style={LABEL}>{k}{i === 0 && ' *'}</span>
                <input value={tambah[k] ?? ''} onChange={(e) => setTambah({ ...tambah, [k]: e.target.value })} className={inputCls} style={TD} />
              </label>
            ))}
          </div>
        </Panel>
      )}

      {aksi.tipe === 'hapus' && (
        <Panel title="Data yang Dihapus">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[16px]">
            {fieldsOf(aksi.baris).map(([k, v]) => (
              <div key={k} className="min-w-0">
                <p className="text-sd-gray-60" style={LABEL}>{k}</p>
                <p className="text-sd-gray-90 break-words" style={TD}>{v}</p>
              </div>
            ))}
          </div>
        </Panel>
      )}

      <p className="text-sd-gray-60" style={LABEL}>
        Pengajuan ini dianggap sudah diverifikasi Admin Satker. {komite ? 'Usulan akan ditinjau oleh Komite Talenta sebelum disinkronkan ke SIASN.' : 'Data pokok tidak memerlukan validasi Komite.'}
      </p>
    </Modal>
  );
}

/* ---------- Tab ---------- */
/* Gaya pill/chip dan tombol mengikuti staging dan sistem ini. */
const outlineBtn = buttonClass('secondary', 'md');

const Diperbarui = () => (
  <p className="text-sd-gray-60" style={LABEL}>Terakhir diperbarui: <span style={{ fontWeight: 500 }}>4 November 2026</span></p>
);

const SubPills = ChipGroup;

const Tag = ({ bg, children }: { bg: string; children: ReactNode }) => (
  <Badge tone={bg === '#fae1ae' ? 'amber' : bg === 'var(--sd-red-5)' ? 'red' : bg === 'var(--sd-badge-info)' ? 'blue' : 'gray'}>{children}</Badge>
);

export function cell(t: Tabel, k: string, b: Rec): ReactNode {
  const v = b[k];
  if (k === 'Nama' && b._asn) return <span className="inline-flex items-center gap-[6px] flex-wrap">{v}<Tag bg="#fae1ae">ASN</Tag></span>;
  if (k === 'Jenis Kelamin') return <Tag bg={v === 'Perempuan' ? 'var(--sd-red-5)' : 'var(--sd-badge-info)'}>{v}</Tag>;
  if (v === 'Data tidak lengkap') return <span className="text-sd-red-60">{v}</span>;
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
    <section className="border border-sd-badge-neutral rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-sd-badge-neutral">
        <h3 className="text-sd-gray-60" style={{ fontSize: '15px', fontWeight: 600, lineHeight: '22px' }}>{t.judul}</h3>
        <button onClick={() => onAksi({ tipe: 'tambah', tabel: t })} className={outlineBtn}><UserPlus className="size-[18px]" /> Tambah</button>
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
          {siasn && <button onClick={() => toast.info('Prototipe: data SIASN tidak ditampilkan.')} className={outlineBtn}><Eye className="size-[18px]" /> Lihat Data SIASN</button>}
          {editable && t.tambah && <button onClick={() => onAksi({ tipe: 'tambah', tabel: t })} className={outlineBtn}><Plus className="size-[18px]" /> Tambah</button>}
        </div>
      </div>
      <div className="border border-sd-badge-neutral rounded-[8px] overflow-hidden">
        <TabelEdit t={t} onAksi={onAksi} editable={editable && t.baris.length > 0} />
      </div>
    </div>
  );
}

function DataPribadiTab({ values, onAksi }: { values: Rec; onAksi: (a: Aksi) => void }) {
  const usulan = useUsulan();
  const { nip: nipParam } = useParams();
  const pending = (f: string) => usulan.find((u) => u.nip === profilByNip(nipParam).nip && u.data === 'Data Pribadi' && u.jenis === 'Ubah' && u.detail[0][0] === f && u.status === 'menunggu-komite');
  return (
    <div className="flex flex-col gap-[20px]">
      {Object.entries(FIELD_DATA_PRIBADI).map(([bagian, fields]) => (
        <section key={bagian} className="border border-sd-badge-neutral rounded-[8px] overflow-hidden">
          <div className="bg-sd-gray-5 px-[14px] py-[8px] text-sd-gray-60" style={{ fontSize: '15px', fontWeight: 600, lineHeight: '22px' }}>{bagian}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[24px] gap-y-[4px] p-[14px]">
            {fields.map((f) => {
              const p = pending(f);
              return (
                <div key={f} className="flex items-start justify-between gap-[8px] py-[6px] border-b border-sd-gray-5">
                  <div className="min-w-0">
                    <p className="text-sd-gray-60" style={LABEL}>{f}</p>
                    <p className="text-sd-gray-90 break-words" style={VALUE}>{values[f] || '-'}</p>
                    {p && <p className="text-[#7a5a00]" style={LABEL}>{STATUS_LABEL[p.status]}</p>}
                  </div>
                  <button onClick={() => onAksi({ tipe: 'ubah-pribadi', field: f })} aria-label={`Ubah ${f}`} className="shrink-0 border border-sd-gray-50 rounded-[4px] p-[6px] hover:bg-sd-gray-5"><Pencil className="size-[14px]" /></button>
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <p className="text-sd-gray-60" style={LABEL}>NIP tidak dapat diubah dari halaman ini.</p>
    </div>
  );
}

export function UbahPegawaiPage() {
  const navigate = useNavigate();
  const { nip } = useParams();
  const [params] = useSearchParams();
  const tipe = params.get('tipe') === 'nonaktif' ? 'nonaktif' : 'aktif';
  const profil = profilByNip(nip);
  const [tab, setTab] = useState(params.get('tab') === 'keluarga' ? 1 : 0);
  const [aksi, setAksiState] = useState<Aksi | null>(null);
  // Nilai Data Pribadi di Portal = data awal + usulan Ubah yang sudah berstatus "Berhasil Memperbarui Data" (yang terbaru menang).
  const semuaUsulan = useUsulan();
  const pribadi = useMemo<Rec>(() => {
    const berhasil = semuaUsulan
      .filter((u) => u.nip === (nip ?? profil.nip) && u.data === 'Data Pribadi' && u.jenis === 'Ubah' && u.status === 'berhasil-diperbarui')
      .sort((a, b) => a.id - b.id);
    return berhasil.reduce<Rec>((acc, u) => ({ ...acc, [u.detail[0][0]]: u.detail[0][1] }), { ...(tipe === 'nonaktif' ? PRIBADI_NONAKTIF : PRIBADI_AWAL) });
  }, [semuaUsulan, nip, tipe, profil.nip]);

  const setAksi = (a: Aksi | null) => {
    if (a?.tipe === 'detail') {
      const slug = a.tabel.kunci === 'ortu' ? 'orang-tua' : a.tabel.kunci;
      navigate(`/kepegawaian/ubah-pegawai/${nip ?? profil.nip}/${slug}/${a.tabel.baris.indexOf(a.baris)}?tipe=${tipe}`);
      return;
    }
    setAksiState(a);
  };

  // Data pokok langsung tampil ter-update (lewat store); jabatan menunggu Komite dan statusnya tampil di bawah field.
  const selesai = () => setAksiState(null);

  return (
    <KepegawaianLayout>
      <div className="px-[24px] pt-[16px] pb-[64px] flex flex-col gap-[16px]">
        <button onClick={() => navigate(tipe === 'nonaktif' ? '/kepegawaian/data-nonaktif' : '/kepegawaian/data-pegawai-aktif')} className="flex items-center gap-[6px] text-sd-gray-90 w-fit" style={LABEL}><ArrowLeft className="size-[16px]" /> Kembali</button>
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-sd-gray-90" style={{ fontSize: '24px', fontWeight: 600, lineHeight: '28px' }}>Edit Data Pegawai {tipe === 'nonaktif' ? 'Non Aktif' : 'Aktif'}</h1>
          <p className="text-sd-gray-90" style={LABEL}>Setiap pengajuan hanya mengubah satu field. Data jabatan dan sertifikasi memerlukan persetujuan Komite Talenta sebelum disinkronkan ke SIASN.</p>
        </div>

        <div className="flex items-center gap-[20px] bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.08),0_2px_1px_-1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.10)] rounded-[8px] p-[20px]">
          <img alt="" src={imgTut} className="size-[72px] shrink-0 rounded-full object-cover" />
          <div className="min-w-0 flex flex-col gap-[6px]">
            <p className="text-sd-gray-90" style={VALUE}>{profil.nama}</p>
            <p className="text-sd-gray-60" style={TD}>{nip ?? profil.nip}</p>
            <div className="flex items-center gap-[8px] flex-wrap mt-[4px]">
              {tipe === 'nonaktif' ? (
                <span className="rounded-[4px] bg-sd-badge-neutral px-[6px] text-sd-gray-90" style={{ fontSize: '12px', fontWeight: 700, lineHeight: '18px' }}>PNS</span>
              ) : (
                <>
              <span className="rounded-[4px] border border-sd-gray-50 px-[6px] text-sd-gray-90" style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px', fontWeight: 700, lineHeight: '18px' }}>III/d</span>
              <span className="rounded-[4px] bg-sd-badge-success px-[6px] text-sd-gray-90" style={{ fontSize: '12px', fontWeight: 700, lineHeight: '18px' }}>PNS</span>
              <span className="rounded-[4px] bg-sd-badge-neutral px-[8px] text-sd-gray-90" style={{ fontSize: '12px', fontWeight: 600, lineHeight: '18px' }}>Kepala Seksi Pemetaan Mutu dan Supervisi Lembaga Penjaminan Mutu Pendidikan Banten</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.08),0_2px_1px_-1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.10)] rounded-[8px] overflow-hidden">
          <Tabs items={TABS} active={tab} onChange={setTab} />
          <div className="p-[16px] flex flex-col gap-[16px]">
            {tab === 0 && <DataPribadiTab values={pribadi} onAksi={setAksi} />}
            {tab === 1 && <><Diperbarui />{KELUARGA.map((t) => <KartuKeluarga key={t.kunci} t={t} onAksi={setAksi} />)}</>}
            {tab === 2 && <TabSub tabel={PENDIDIKAN} onAksi={setAksi} />}
            {tab === 3 && <TabSub tabel={NILAI} onAksi={setAksi} siasn={false} editable={false} />}
            {tab === 4 && <TabSub tabel={RIWAYAT} onAksi={setAksi} />}
            {tab === 5 && (
              <div className="rounded-[8px] bg-sd-gray-5 py-[56px] flex flex-col items-center gap-[8px] text-center">
                <div className="size-[72px] rounded-full bg-white grid place-items-center"><Construction className="size-[36px] text-[#b98900]" /></div>
                <p className="text-sd-gray-90" style={{ fontSize: '13px', fontWeight: 700, lineHeight: '20px' }}>Sedang dalam pengembangan</p>
                <p className="text-sd-gray-60" style={{ fontSize: '13px', lineHeight: '20px' }}>Fitur ini sedang dalam tahap pengembangan dan akan segera tersedia.<br />Terima kasih atas kesabaran Anda.</p>
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
  const [qs] = useSearchParams();
  const tipeDetail = qs.get('tipe') === 'nonaktif' ? 'nonaktif' : 'aktif';
  const t = KELUARGA.find((x) => (x.kunci === 'ortu' ? 'orang-tua' : x.kunci) === jenis);
  const r = t?.baris[Number(idx)];
  const [aksi, setAksi] = useState<Aksi | null>(null);
  const [baru, setBaru] = useState<Rec>({});
  const kembali = () => navigate(`/kepegawaian/ubah-pegawai/${nip ?? profilByNip(nip).nip}?tipe=${tipeDetail}&tab=keluarga`);
  const nama = jenis === 'orang-tua' ? r?.Hubungan ?? 'Orang Tua' : jenis === 'pasangan' ? 'Istri' : 'Anak';
  const kartu = r ? kartuKeluarga(jenis, r) : [];

  const render = (k: Kartu) => (
    <section key={k.judul} className="border border-sd-badge-neutral rounded-[8px] overflow-hidden self-start">
      <div className="px-[16px] py-[12px] border-b border-sd-badge-neutral text-sd-gray-60" style={{ fontSize: '15px', fontWeight: 600, lineHeight: '22px' }}>{k.judul}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[16px] p-[16px]">
        {k.fields.map(([f, v]) => {
          const nilai = baru[f] ?? v;
          return (
            <div key={f} className={`flex items-start justify-between gap-[8px] ${f === 'Nama' || f === 'Alamat' || f === 'NIP' || k.dokumen ? 'sm:col-span-2' : ''}`}>
              <div className="min-w-0">
                <p className="text-sd-gray-60" style={LABEL}>{f}</p>
                {v === 'file'
                  ? <button onClick={() => toast.info('Prototipe: berkas tidak ditampilkan.')} className="flex items-center gap-[6px] text-sd-gray-90" style={VALUE}><FileText className="size-[18px]" /> Lihat File</button>
                  : <p className="text-sd-gray-90 break-words" style={VALUE}>{nilai}</p>}
              </div>
              {!k.dokumen && t && (
                <button onClick={() => setAksi({ tipe: 'ubah-kolom', tabel: t, field: f, lama: nilai })} aria-label={`Ubah ${f}`} className="shrink-0 border border-sd-gray-50 rounded-[4px] p-[6px] hover:bg-sd-gray-5"><Pencil className="size-[14px]" /></button>
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
        <button onClick={kembali} className="flex items-center gap-[6px] text-sd-gray-90 w-fit" style={LABEL}><ArrowLeft className="size-[16px]" /> Kembali</button>
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-sd-gray-90" style={{ fontSize: '24px', fontWeight: 600, lineHeight: '28px' }}>Edit Data {nama}</h1>
          <p className="text-sd-gray-90" style={LABEL}>Pilih ikon pensil pada field yang ingin diubah. Setiap pengajuan hanya mengubah satu field.</p>
        </div>
        {r ? (
          <div className="bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.08),0_2px_1px_-1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.10)] rounded-[8px] p-[16px] grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
            {kartu.map(render)}
          </div>
        ) : (
          <p className="rounded-[4px] bg-sd-gray-5 py-[24px] text-center text-sd-gray-60" style={LABEL}>Data tidak ditemukan.</p>
        )}
      </div>
      {aksi && aksi.tipe !== 'detail' && <AjukanModal aksi={aksi} pribadi={{}} onClose={() => setAksi(null)} onDone={selesai} />}
    </KepegawaianLayout>
  );
}
