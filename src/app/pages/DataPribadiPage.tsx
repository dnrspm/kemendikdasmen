import { useState } from 'react';
import { Info, X, Eye, EyeOff, FilePenLine, User, IdCard, Contact, FolderOpen, ExternalLink, Download } from 'lucide-react';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
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
              <p className="p-[24px] text-[#65696c]" style={{ fontSize: 'var(--text-sm)' }}>Tab {tabs[tab]} belum disalin dari portal staging.</p>
            )}
          </div>
        </div>
      </div>
    </KepegawaianLayout>
  );
}
