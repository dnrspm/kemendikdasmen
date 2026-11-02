import { useState } from 'react';
import { TriangleAlert, Plus, Info, X, Eye, EyeOff, FilePenLine, User, IdCard, Contact, FolderOpen, ExternalLink, Download } from 'lucide-react';
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
    <section className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden">
      <header className="flex items-center gap-[8px] px-[16px] py-[12px] border-b border-[#eee] text-[#65696c] font-medium" style={{ fontSize: 'var(--text-sm)' }}>
        {icon} {title}
      </header>
      <div className={`grid gap-x-[16px] gap-y-[14px] p-[16px] ${cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {rows.map(([label, value, info]) => (
          <div key={label as string} className={`flex flex-col gap-[2px] ${full.includes(label as string) ? 'col-span-2' : ''}`}>
            <span className="text-[#65696c] flex items-center gap-[4px]" style={{ fontSize: 'var(--text-xs)' }}>
              {label as string} {info ? <Info className="size-[13px]" /> : null}
            </span>
            <span className="text-[#2f3031] break-words" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, letterSpacing: hidden ? '2px' : undefined }}>
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
    <div className="flex gap-[8px] flex-wrap px-[14px] pt-[14px]">
      {items.map((t, i) => (
        <button key={t} onClick={() => onChange(i)} className={`rounded-full border px-[14px] py-[4px] ${i === active ? 'border-[#1a5fe0] bg-[#eaf3fe] text-[#1a5fe0]' : 'border-[#c7c7c7] text-[#2f3031]'}`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          {t}
        </button>
      ))}
    </div>
  );
}

const col = (key: string, label: string, width?: string): Column => ({ key, label, width });

function Updated() {
  return <p className="px-[14px] pt-[12px] text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>Terakhir diperbarui: 2 November 2026</p>;
}

function Keluarga() {
  const sectionCols = [col('aksi', 'Aksi', '60px'), col('status', 'Status'), col('jenis', 'Jenis'), col('hub', 'Hubungan'), col('hidup', 'Status Hidup'), col('asn', 'Status ASN'), col('nama', 'Nama'), col('tgl', 'Tanggal Lahir')];
  const pasanganCols = [col('aksi', 'Aksi', '60px'), col('status', 'Status'), col('jenis', 'Jenis'), col('ke', 'Pasangan Ke'), col('asn', 'Status ASN'), col('hidup', 'Status Hidup'), col('nama', 'Nama'), col('tgl', 'Tanggal Lahir')];
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-between px-[14px] pt-[16px]">
      <h3 className="font-semibold text-[#2f3031]" style={{ fontSize: 'var(--text-base)' }}>{children}</h3>
      <button className="border border-[#1a5fe0] text-[#1a5fe0] rounded-[4px] px-[12px] py-[4px] flex items-center gap-[6px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>
        <Plus className="size-[14px]" /> Tambah
      </button>
    </div>
  );
  return (
    <div>
      <Updated />
      <div className="m-[14px] rounded-[8px] border border-[#f1c27a] bg-[#fff8ec] p-[14px] flex gap-[10px]" style={{ fontSize: 'var(--text-sm)' }}>
        <TriangleAlert className="size-[18px] text-[#d99a1f] shrink-0 mt-[2px]" />
        <div>
          <p className="font-semibold">Usulan Perubahan Data</p>
          <p>Anda memiliki 4 usulan perubahan data. Data yang Diusulkan sedang dalam proses verifikasi oleh Biro SDM. Usulan yang telah Disetujui sudah melewati proses verifikasi dan data Anda telah diperbarui.</p>
          <p>Anda dapat melihat detail perubahan data yang diajukan di bawah ini:</p>
        </div>
      </div>
      <SectionTitle>Data Orang Tua</SectionTitle>
      <StagingDataTable hideFilter columns={sectionCols} rows={[
        { aksi: <MoreAction />, status: <Chip tone="blue">Menunggu diverifikasi</Chip>, jenis: 'Hapus', hub: 'Ayah', hidup: 'Masih Hidup', asn: 'Bukan ASN', nama: 'Contoh Orang Tua', tgl: '-' },
      ]} />
      <SectionTitle>Data Pasangan</SectionTitle>
      <StagingDataTable hideFilter columns={pasanganCols} rows={[
        { aksi: <MoreAction />, status: <Chip tone="blue">Menunggu diverifikasi</Chip>, jenis: 'Tambah', ke: '1', asn: 'Bukan ASN', hidup: 'Masih Hidup', nama: 'Contoh Pasangan', tgl: '-' },
      ]} />
      <SectionTitle>Data Anak</SectionTitle>
      <StagingDataTable hideFilter columns={[col('aksi', 'Aksi', '60px'), col('nama', 'Nama'), col('tgl', 'Tanggal Lahir'), col('jk', 'Jenis Kelamin')]} rows={[]} />
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
  const formal = [['S3', 'Universitas Contoh', 'Pendidikan', '2018'], ['S2', 'Universitas Contoh', 'Manajemen', '2010'], ['S1', 'Universitas Contoh', 'Manajemen', '2004']].map(([j, s, jr, t], i) => ({
    no: i + 1, status: <Chip tone="green">Aktif</Chip>, jenjang: j, sekolah: s, jurusan: jr, ket: '-', tahun: t, ijazah: '-', aksi: <MoreAction />,
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
  const [tab, setTab] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [showNotice, setShowNotice] = useState(true);

  return (
    <KepegawaianLayout>
      <div className="p-[20px] flex flex-col gap-[16px]">
        <div>
          <h1 className="font-semibold text-[#2f3031]" style={{ fontSize: '24px' }}>Data Pribadi</h1>
          <p className="text-[#2f3031]" style={{ fontSize: 'var(--text-sm)' }}>Kelola data pribadi Anda di Portal Kemendikdasmen</p>
        </div>

        {showNotice && (
          <div className="bg-[#e3f1fd] border border-[#a9d2f7] rounded-[8px] p-[16px] flex gap-[10px]">
            <Info className="size-[18px] mt-[2px] text-[#1a5fe0] shrink-0" />
            <div className="flex-1" style={{ fontSize: 'var(--text-sm)' }}>
              <p className="font-semibold mb-[6px]">Perhatian</p>
              <p>Silakan ajukan perubahan data jika ada kesalahan atau ada perubahan data diri Anda.</p>
              <p>Permintaan perubahan yang Anda lakukan akan diverifikasi oleh kepegawaian Satker/UPT Anda, setelah itu data akan diverifikasi ulang oleh Biro SDM.</p>
            </div>
            <button onClick={() => setShowNotice(false)} aria-label="Tutup"><X className="size-[18px]" /></button>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[248px_1fr] gap-[16px] items-start">
          <div className="flex flex-col gap-[16px]">
            <div className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden">
              <img alt="" src={imgPhoto} className="w-full aspect-square object-cover bg-[#d9d9d9]" />
              <div className="p-[16px] text-center flex flex-col gap-[6px]">
                <h2 className="font-semibold uppercase text-[#2f3031]" style={{ fontSize: 'var(--text-base)' }}>Prof. Dr. Ahmad Wijaya M.M.</h2>
                <p className="font-semibold text-[#2f3031]" style={{ fontSize: 'var(--text-sm)' }}>
                  Kepala Seksi Pemetaan Mutu dan Supervisi Lembaga Penjaminan Mutu Pendidikan Banten
                </p>
                <p style={{ fontSize: 'var(--text-xs)' }}>(Karir)<br />TMT 1 Oktober 2023</p>
              </div>
            </div>

            <div className="bg-white border border-[#e4e4e4] rounded-[8px] p-[12px] flex flex-col gap-[12px]">
              <div className="flex gap-[10px]">
                <div className="size-[64px] shrink-0 bg-[#f4f4f4] grid place-items-center text-[10px] text-[#65696c]">QR</div>
                <div>
                  <p style={{ fontSize: '11px', lineHeight: '14px' }}>Scan QR untuk melihat profil publik (Kartu Pegawai). Klik gambar untuk memperbesar.</p>
                  <a className="text-[#1a5fe0] inline-flex items-center gap-[4px] mt-[2px]" style={{ fontSize: '11px' }} href="#"><ExternalLink className="size-[11px]" /> Lihat Profil Publik</a>
                </div>
              </div>
              <button className="w-full border border-[#c7c7c7] rounded-[4px] py-[8px] flex items-center justify-center gap-[8px] font-semibold hover:bg-[#f7f7f7]" style={{ fontSize: 'var(--text-sm)' }}>
                <Download className="size-[16px]" /> Unduh QR
              </button>
            </div>

            <div className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden">
              <header className="px-[16px] py-[12px] bg-[#fafafa] border-b border-[#eee] font-semibold text-[#65696c]" style={{ fontSize: 'var(--text-sm)' }}>Unit Organisasi</header>
              <ul className="list-disc pl-[32px] pr-[16px] py-[12px] flex flex-col gap-[4px]" style={{ fontSize: 'var(--text-sm)' }}>
                {units.map((u) => <li key={u}>{u}</li>)}
              </ul>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e4] rounded-[8px] min-w-0">
            <div className="flex gap-[24px] px-[16px] border-b border-[#e4e4e4] overflow-x-auto">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  className={`py-[16px] whitespace-nowrap border-b-[3px] ${i === tab ? 'border-[#1a5fe0] font-semibold' : 'border-transparent text-[#2f3031]'}`}
                  style={{ fontSize: 'var(--text-sm)', fontWeight: i === tab ? 600 : 500 }}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === 0 ? (
              <div className="p-[14px] flex flex-col gap-[14px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>Terakhir diperbarui: 2 November 2026</span>
                  <div className="flex items-center gap-[12px]">
                    <button onClick={() => setHidden(!hidden)} aria-label="Tampilkan atau sembunyikan data">
                      {hidden ? <EyeOff className="size-[20px] text-[#45474a]" /> : <Eye className="size-[20px] text-[#45474a]" />}
                    </button>
                    <button className="bg-[#2f3031] text-white rounded-[4px] px-[14px] py-[8px] flex items-center gap-[8px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>
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
