import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TriangleAlert, UserPlus, Info, X, Eye, EyeOff, FilePenLine, User, IdCard, Contact, FolderOpen, ExternalLink, Download } from 'lucide-react';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { StagingDataTable, Chip, MoreAction, type Column } from '@/app/components/StagingDataTable';
import imgPhoto from '@/assets/staging/tut-wuri-handayani.png';

const tabs = ['Data Pribadi', 'Keluarga', 'Pendidikan dan Pelatihan', 'Penilaian', 'Riwayat'];

const dataDiri = [
  ['NIP', '198001012005011001'], ['NIK', '3171010101800001'], ['Nomor KK', '3171010101090001'],
  ['Jenis Kelamin', 'Laki-laki'], ['Tempat Lahir', 'Jakarta'], ['Tanggal Lahir', '1 Januari 1980'],
  ['Tingkat Pendidikan', 'S3'], ['Pendidikan', 'Doktor'], ['Status Perkawinan', 'Kawin'], ['Agama', 'Islam'],
];
const dataKepegawaian = [
  ['Jenis Pegawai', 'PNS'], ['Masa Kerja Keseluruhan', '21 Tahun 4 Bulan', true], ['Masa Kerja Golongan', '4 Tahun 2 Bulan', true],
  ['Jenis Jabatan', 'Struktural'], ['Jabatan', 'Kepala Seksi Pemetaan Mutu dan Supervisi'],
  ['Lokasi Kerja', 'DKI Jakarta'], ['Pangkat dan Golongan Aktif', 'Pembina Tk. I (IV/b)'],
  ['Golongan Ruang Awal', 'III/a'], ['Golongan Ruang Terakhir', 'IV/b'], ['TMT Golongan', '1 April 2022'],
  ['TMT ASN', '1 Januari 2006'], ['Nomor SK ASN', '-'], ['Status PNS', 'PNS'],
];
const kontak = [
  ['Email Dikdasmen', 'ahmad.wijaya@kemendikdasmen.go.id'], ['Email Lain', '-'], ['Alamat', '-'],
  ['Nomor HP', '-'], ['Nomor Kontak Darurat', '-'],
];
const dataLainnya = [
  ['Nomor Surat Keterangan Dokter', '-'], ['Tanggal Surat Keterangan Dokter', '-'],
  ['Nomor Surat Bebas Narkoba', '-'], ['Tanggal Surat Bebas Narkoba', '-'],
  ['Nomor Catatan Kepolisian', '-'], ['Tanggal Catatan Kepolisian', '-'],
  ['Nomor Akte Kelahiran', '-'], ['Nomor BPJS', '-'], ['NPWP', '-'], ['Tanggal NPWP', '-'],
  ['Nomor TASPEN', '-'], ['Gaji Pokok', '-'],
];
const units = [
  'Balai Penjaminan Mutu Pendidikan Provinsi D.K.I. Jakarta',
  'Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah',
  'Kementerian Pendidikan Dasar dan Menengah',
  'KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH',
];

type Row = (string | boolean | undefined)[];

function Card({ icon, title, rows, cols = 2, hidden, full = [] }: { icon: React.ReactNode; title: string; rows: Row[]; cols?: number; hidden: boolean; full?: string[] }) {
  return (
    <section className="bg-white border border-[#efefef] rounded-[6px] overflow-hidden">
      <header className="flex items-center gap-[8px] px-[16px] py-[12px] border-b border-[#eee] text-[#65696c]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
        {icon} {title}
      </header>
      <div className={`grid gap-x-[16px] gap-y-[14px] p-[16px] ${cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {rows.map(([label, value, info]) => (
          <div key={label as string} className={`flex flex-col gap-[2px] ${full.includes(label as string) ? 'col-span-2' : ''}`}>
            <span className="text-[#65696c] flex items-center gap-[4px]" style={{ fontSize: '14px', lineHeight: '20px' }}>
              {label as string} {info ? <Info className="size-[13px]" /> : null}
            </span>
            <span className="text-[#2f3031] break-words" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
              {hidden ? '••••••••••••••' : (value as string)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───── Tab lain (data contoh fiktif) ───── */

function SubTabs({ items, active, onChange }: { items: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div className="flex gap-[8px] flex-wrap px-[16px] pt-[16px] pb-[28px]">
      {items.map((t, i) => (
        <button key={t} onClick={() => onChange(i)} className={`rounded-[24px] border px-[12px] py-[4px] ${i === active ? 'border-[#0b5fef] bg-[#ecf5fe] text-[#0b5fef]' : 'border-[#2f3031] bg-white text-[#2f3031]'}`} style={{ fontSize: '16px', lineHeight: '20px', fontWeight: 600 }}>
          {t}
        </button>
      ))}
    </div>
  );
}

const col = (key: string, label: string, width?: string): Column => ({ key, label, width });

function Updated() {
  return (
    <p className="px-[16px] pt-[12px] pb-[16px] text-[#808489]" style={{ fontSize: '14px', lineHeight: '20px' }}>
      Terakhir diperbarui: <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>2 November 2026</span>
    </p>
  );
}

const MASK = '••••••••••••••';

function FamilyCard({ title, to, cols, rows }: { title: string; to: string; cols: { label: string; width?: string }[]; rows: number }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-[8px] border border-[#efefef] bg-white p-[16px] mb-[16px]">
      <div className="flex items-center justify-between pb-[12px]">
        <span className="text-[#65696c]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>{title}</span>
        <button
          onClick={() => to && navigate(to)}
          className="flex items-center gap-[6px] rounded-[6px] border border-[#808489] bg-white px-[16px] py-[8px] text-[#2f3031]"
          style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}
        >
          <UserPlus className="size-[20px]" /> Tambah
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-y border-[#efefef]">
            <th className="p-[8px] text-left text-[#2f3031]" style={{ fontSize: '14px', fontWeight: 700, lineHeight: '16px', width: '48px' }}>NO</th>
            {cols.map((c) => (
              <th key={c.label} className="p-[8px] text-left text-[#2f3031] uppercase" style={{ fontSize: '14px', fontWeight: 700, lineHeight: '16px' }}>{c.label}</th>
            ))}
            <th className="p-[8px] text-center text-[#2f3031]" style={{ fontSize: '14px', fontWeight: 700, lineHeight: '16px', width: '60px' }}>AKSI</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-[#fafafa]' : ''}>
              <td className="p-[12px_8px] text-[#2f3031]" style={{ fontSize: '16px', lineHeight: '24px' }}>{i + 1}</td>
              {cols.map((c) => (
                <td key={c.label} className="p-[12px_8px] text-[#2f3031]" style={{ fontSize: '16px', lineHeight: '24px' }}>{MASK}</td>
              ))}
              <td className="p-[12px_8px] text-center"><MoreAction /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Keluarga() {
  return (
    <div>
      <Updated />
      <div className="m-[16px] rounded-[8px] border border-[#f3e3b0] bg-[#fff6dc] p-[16px] flex gap-[12px]">
        <TriangleAlert className="size-[20px] text-[#b57f21] shrink-0 mt-[2px]" />
        <div className="text-[#2f3031]" style={{ fontSize: '16px', lineHeight: '24px' }}>
          <p style={{ fontWeight: 600 }} className="mb-[8px]">Usulan Perubahan Data</p>
          <p>
            Anda memiliki 4 usulan perubahan data. Data yang <b style={{ fontWeight: 600 }}>Diusulkan</b> sedang dalam proses verifikasi oleh Biro SDM. Usulan yang telah <b style={{ fontWeight: 600 }}>Disetujui</b> sudah melewati proses verifikasi dan data Anda telah diperbarui.
          </p>
          <p className="mt-[8px]">Anda dapat melihat detail perubahan data yang diajukan di bawah ini:</p>
          <button className="mt-[8px] underline" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>Selengkapnya</button>
        </div>
      </div>
      <div className="px-[16px]">
        <FamilyCard title="Orang Tua" to="/kepegawaian/keluarga/orang-tua/tambah" cols={[{ label: 'Nama' }, { label: 'Hubungan' }, { label: 'Nomor Identitas' }, { label: 'Status Hidup' }]} rows={3} />
        <FamilyCard title="Istri" to="/kepegawaian/keluarga/pasangan/tambah" cols={[{ label: 'Nama' }, { label: 'Nomor Identitas' }, { label: 'Status Pernikahan' }]} rows={2} />
        <FamilyCard title="Anak" to="" cols={[{ label: 'Nama' }, { label: 'Jenis Kelamin' }, { label: 'Status Sekolah/Kerja' }, { label: 'Status Pernikahan Anak' }]} rows={1} />
      </div>
    </div>
  );
}

function PendidikanPelatihan() {
  const [sub, setSub] = useState(0);
  const items = ['Pendidikan Formal', 'Pelatihan SIASN', 'Pelatihan Struktural', 'Pelatihan Fungsional', 'Pelatihan Teknis/Seminar/Workshop/Kursus'];
  const cols = [
    [col('no', 'No', '48px'), col('status', 'Status'), col('jenjang', 'Jenjang'), col('sekolah', 'Nama Sekolah'), col('jurusan', 'Jurusan'), col('ket', 'Keterangan'), col('tahun', 'Tahun Lulus'), col('ijazah', 'Nomor Ijazah'), col('aksi', 'Aksi', '60px')],
    [col('no', 'No', '48px'), col('nama', 'Nama Pelatihan'), col('tahun', 'Tahun'), col('aksi', 'Aksi', '60px')],
  ];
  const formal = [
    ['S-1/Sarjana', 'Kampus Contoh A', 'S-1 MANAJEMEN', 'Dalam Negeri', '2025', '0000000001'],
    ['S-1/Sarjana', 'Kampus Contoh B', 'S-1 ADMINISTRASI', 'Data tidak lengkap', '2022', '0000000002'],
    ['S-3/Doktor', 'UNIVERSITAS CONTOH', 'S-3 MANAJEMEN DAN BISNIS', 'Dalam Negeri', '2019', '0000000003'],
  ].map(([j, s, jr, k, t, ij], i) => ({
    no: i + 1, status: '-', jenjang: j, sekolah: s, jurusan: jr,
    ket: k === 'Data tidak lengkap' ? <span style={{ color: '#e02d38' }}>{k}</span> : k, tahun: t, ijazah: ij, aksi: <MoreAction />,
  }));
  return (
    <div>
      <SubTabs items={items} active={sub} onChange={setSub} />
      <Updated />
      <StagingDataTable hideFilter columns={sub === 0 ? cols[0] : cols[1]} rows={sub === 0 ? formal : []} />
    </div>
  );
}

function Penilaian() {
  const [sub, setSub] = useState(0);
  const cols = sub === 0
    ? [col('no', 'No', '48px'), col('tahun', 'Tahun'), col('hasil', 'Hasil Kinerja'), col('perilaku', 'Perilaku Kerja'), col('kuadran', 'Kuadran Kinerja')]
    : [col('no', 'No', '48px'), col('tahun', 'Tahun'), col('kinerja', 'Aspek Kinerja'), col('potensial', 'Aspek Potensial'), col('box', 'Kotak')];
  const rows = sub === 0
    ? [{ no: 1, tahun: '2025', hasil: 'Baik', perilaku: 'Baik', kuadran: 'Kuadran 5' }, { no: 2, tahun: '2024', hasil: 'Baik', perilaku: 'Baik', kuadran: 'Kuadran 5' }]
    : [];
  return (
    <div>
      <SubTabs items={['Kinerja', 'Asesmen Nine Box']} active={sub} onChange={setSub} />
      <Updated />
      <StagingDataTable hideFilter columns={cols} rows={rows} />
    </div>
  );
}

function RiwayatTab() {
  const [sub, setSub] = useState(0);
  const items = ['Kepangkatan', 'Jabatan', 'Penghargaan', 'Penugasan', 'Sertifikasi', 'Hukuman Disiplin', 'Kenaikan Gaji Berkala'];
  const rows = [['Penata', 'III/c', '1 Oktober 2021', '3 tahun / 7 bulan'], ['Penata', 'III/c', '1 Oktober 2021', '3 tahun / 8 bulan'], ['Penata Tingkat I', 'III/d', '1 Oktober 2023', '1 tahun / 2 bulan']].map(([p, g, t, m], i) => ({
    no: i + 1, pangkat: p, gol: g, status: '-', tmt: t, masa: m, aksi: <MoreAction />,
  }));
  return (
    <div>
      <SubTabs items={items} active={sub} onChange={setSub} />
      <Updated />
      <StagingDataTable hideFilter
        columns={sub === 0
          ? [col('no', 'No', '48px'), col('pangkat', 'Pangkat'), col('gol', 'Golongan'), col('status', 'Status'), col('tmt', 'TMT Golongan'), col('masa', 'Masa Kerja'), col('aksi', 'Aksi', '60px')]
          : [col('no', 'No', '48px'), col('nama', items[sub]), col('tgl', 'Tanggal'), col('aksi', 'Aksi', '60px')]}
        rows={sub === 0 ? rows : []} />
    </div>
  );
}

function OtherTab({ name }: { name: string }) {
  if (name === 'Keluarga') return <Keluarga />;
  if (name === 'Pendidikan dan Pelatihan') return <PendidikanPelatihan />;
  if (name === 'Penilaian') return <Penilaian />;
  return <RiwayatTab />;
}

export function DataPribadiPage({ onBack: _onBack }: { onBack?: () => void }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [showNotice, setShowNotice] = useState(true);

  return (
    <KepegawaianLayout>
      <div className="px-[24px] pt-[24px] pb-[64px] flex flex-col gap-[16px]">
        <div>
          <h1 className="text-[#2f3031]" style={{ fontSize: '24px', fontWeight: 700, lineHeight: '28px' }}>Data Pribadi</h1>
          <p className="text-[#2f3031]" style={{ fontSize: '14px', lineHeight: '20px' }}>Kelola data pribadi Anda di Portal Kemendikdasmen</p>
        </div>

        {showNotice && (
          <div className="bg-[#e3f1fd] border border-[#a9d2f7] rounded-[6px] p-[16px] flex gap-[10px]">
            <Info className="size-[18px] mt-[2px] text-[#1a5fe0] shrink-0" />
            <div className="flex-1" style={{ fontSize: '16px', lineHeight: '24px' }}>
              <p className="mb-[6px]" style={{ fontWeight: 600 }}>Perhatian</p>
              <p>Silakan ajukan perubahan data jika ada kesalahan atau ada perubahan data diri Anda.</p>
              <p>Permintaan perubahan yang Anda lakukan akan diverifikasi oleh kepegawaian Satker/UPT Anda, setelah itu data akan diverifikasi ulang oleh Biro SDM.</p>
            </div>
            <button onClick={() => setShowNotice(false)} aria-label="Tutup"><X className="size-[18px]" /></button>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[275px_1fr] gap-[16px] items-start">
          <div className="flex flex-col gap-[16px]">
            <div className="bg-white border border-[#efefef] rounded-[6px] overflow-hidden">
              <img alt="" src={imgPhoto} className="w-full object-cover bg-[#d9d9d9]" style={{ height: 279 }} />
              <div className="p-[16px] text-center flex flex-col gap-[6px]">
                <h2 className="uppercase text-[#2f3031]" style={{ fontSize: '19px', fontWeight: 600, lineHeight: '24px' }}>Prof. Dr. Ahmad Wijaya M.M.</h2>
                <p className="text-[#2f3031]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
                  Kepala Seksi Pemetaan Mutu dan Supervisi Lembaga Penjaminan Mutu Pendidikan Banten
                </p>
                <p className="text-[#2f3031]" style={{ fontSize: '14px', lineHeight: '20px' }}>(Karir)<br />TMT 1 Oktober 2023</p>
              </div>
            </div>

            <div className="bg-white border border-[#efefef] rounded-[6px] p-[12px] flex flex-col gap-[12px]">
              <div className="flex gap-[10px]">
                <div className="size-[64px] shrink-0 bg-[#f4f4f4] grid place-items-center text-[10px] text-[#65696c]">QR</div>
                <div>
                  <p style={{ fontSize: '12px', lineHeight: '16px' }}>Scan QR untuk melihat profil publik (Kartu Pegawai). Klik gambar untuk memperbesar.</p>
                  <a className="text-[#0b5fef] inline-flex items-center gap-[4px] mt-[2px]" style={{ fontSize: '12px', lineHeight: '16px' }} href="/profil/contoh" target="_blank" rel="noreferrer"><ExternalLink className="size-[11px]" /> Lihat Profil Publik</a>
                </div>
              </div>
              <button className="w-full border border-[#c7c7c7] rounded-[4px] py-[8px] flex items-center justify-center gap-[8px] hover:bg-[#f7f7f7]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
                <Download className="size-[16px]" /> Unduh QR
              </button>
            </div>

            <div className="bg-white border border-[#efefef] rounded-[6px] overflow-hidden">
              <header className="px-[16px] py-[12px] bg-[#fafafa] border-b border-[#eee] text-[#65696c]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>Unit Organisasi</header>
              <ul className="list-disc pl-[32px] pr-[16px] py-[12px] flex flex-col gap-[4px]" style={{ fontSize: '16px', lineHeight: '24px' }}>
                {units.map((u) => <li key={u}>{u}</li>)}
              </ul>
            </div>
          </div>

          <div className="bg-white border border-[#efefef] rounded-[6px] min-w-0">
            <div className="flex gap-[24px] px-[16px] border-b border-[#e4e4e4] overflow-x-auto">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  className={`py-[16px] whitespace-nowrap border-b-[3px] ${i === tab ? 'border-[#1a5fe0]' : 'border-transparent'} text-[#2f3031]`}
                  style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === 0 ? (
              <div className="p-[14px] flex flex-col gap-[14px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#808489]" style={{ fontSize: '14px', lineHeight: '20px' }}>Terakhir diperbarui: <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>2 November 2026</span></span>
                  <div className="flex items-center gap-[12px]">
                    <button onClick={() => setHidden(!hidden)} aria-label="Tampilkan atau sembunyikan data">
                      {hidden ? <EyeOff className="size-[20px] text-[#45474a]" /> : <Eye className="size-[20px] text-[#45474a]" />}
                    </button>
                    <button onClick={() => navigate('/kepegawaian/ubah-data-pribadi')} className="bg-[#2f3031] text-white rounded-[4px] px-[14px] py-[8px] flex items-center gap-[8px] " style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
                      <FilePenLine className="size-[16px]" /> Ubah Data
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px] items-start">
                  <div className="flex flex-col gap-[14px]">
                    <Card icon={<User className="size-[16px]" />} title="Data Diri" rows={dataDiri} hidden={hidden} />
                    <Card icon={<IdCard className="size-[16px]" />} title="Data Kepegawaian" rows={dataKepegawaian} hidden={hidden} />
                  </div>
                  <div className="flex flex-col gap-[14px]">
                    <Card icon={<Contact className="size-[16px]" />} title="Kontak" rows={kontak} hidden={hidden} full={['Email Dikdasmen', 'Email Lain', 'Alamat']} />
                    <Card icon={<FolderOpen className="size-[16px]" />} title="Data Lainnya" rows={dataLainnya} hidden={hidden} />
                  </div>
                </div>
              </div>
            ) : (
              <OtherTab name={tabs[tab]} />
            )}
          </div>
        </div>
      </div>
    </KepegawaianLayout>
  );
}
