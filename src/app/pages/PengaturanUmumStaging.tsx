import { useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Home, Settings, Bell, Info, Image as ImageIcon, ChevronUp, ChevronDown, ArrowLeftCircle, Plus, Trash2 } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { StagingDataTable, Chip, MoreAction, type Column } from '@/app/components/StagingDataTable';
import imgSetting from '@/assets/staging/img-setting.png';

function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const p = pathname.replace(/\/$/, '');
  const [appOpen, setAppOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const item = (path: string, label: string, icon: ReactNode, indent = false) => (
    <button
      key={path}
      onClick={() => navigate(path)}
      className={`w-full flex items-center gap-[12px] py-[8px] rounded-[4px] text-left ${indent ? 'pl-[40px] pr-[8px]' : 'px-[8px]'} ${p === path ? 'bg-[#f0f0f0] font-semibold' : 'hover:bg-[#f7f7f7]'}`}
      style={{ fontSize: 'var(--text-sm)' }}
    >
      {icon}{label}
    </button>
  );
  return (
    <div className="flex flex-col h-screen bg-[#f4f4f4]">
      <Header fullWidth />
      <div className="flex flex-1 min-h-0">
        {!collapsed && (
          <aside className="w-[260px] shrink-0 bg-white border-r border-[#e4e4e4] flex flex-col">
            <div className="flex items-center gap-[10px] px-[16px] py-[10px] bg-[#eaf3fe]">
              <img alt="" src={imgSetting} className="size-[20px] object-contain" />
              <span className="font-semibold text-[#2f3031] uppercase" style={{ fontSize: 'var(--text-xs)' }}>Pengaturan Umum</span>
            </div>
            <button onClick={() => navigate('/')} className="flex items-center gap-[10px] px-[16px] py-[8px] bg-[#f3f8ff] text-[#45474a] text-left hover:bg-[#eaf3fe]" style={{ fontSize: '12px' }}>
              <Home className="size-[16px]" /> Kembali ke Beranda Portal
            </button>
            <nav className="flex-1 overflow-y-auto p-[8px] flex flex-col gap-[4px]">
              <button onClick={() => setAppOpen(!appOpen)} className="w-full flex items-center gap-[12px] px-[8px] py-[8px] rounded-[4px] bg-[#f0f0f0] text-left" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                <Settings className="size-[20px]" /><span className="flex-1">Pengaturan Aplikasi</span>
                {appOpen ? <ChevronUp className="size-[18px]" /> : <ChevronDown className="size-[18px]" />}
              </button>
              {appOpen && <>{item('/pengaturan/role', 'Role', null, true)}{item('/pengaturan/user', 'User', null, true)}</>}
              {item('/pengaturan/pemberitahuan-umum', 'Pemberitahuan Umum', <Bell className="size-[20px]" />)}
              {item('/pengaturan/informasi-sistem', 'Informasi Sistem', <Info className="size-[20px]" />)}
              {item('/pengaturan/banner-utama', 'Banner Utama', <ImageIcon className="size-[20px]" />)}
            </nav>
            <button onClick={() => setCollapsed(true)} className="flex items-center justify-center gap-[8px] py-[12px] border-t border-[#e4e4e4] text-[#45474a] hover:bg-[#f7f7f7]" style={{ fontSize: '12px' }}>
              <ArrowLeftCircle className="size-[18px]" /> Sembunyikan Menu
            </button>
          </aside>
        )}
        <main className="flex-1 min-w-0 overflow-y-auto p-[20px]">
          {collapsed && <button onClick={() => setCollapsed(false)} className="mb-[8px] text-[#1a5fe0]" style={{ fontSize: 'var(--text-sm)' }}>Tampilkan menu</button>}
          {children}
        </main>
      </div>
    </div>
  );
}

function Page({ title, subtitle, action, children }: { title: string; subtitle: string; action?: ReactNode; children: ReactNode }) {
  return (
    <Layout>
      <h1 className="font-semibold text-[#2f3031]" style={{ fontSize: '24px' }}>{title}</h1>
      <p className="text-[#2f3031] mb-[12px]" style={{ fontSize: 'var(--text-sm)' }}>{subtitle}</p>
      <div className="bg-white border border-[#e4e4e4] rounded-[8px] p-[16px]">
        {action && <div className="flex justify-end mb-[8px]">{action}</div>}
        {children}
      </div>
    </Layout>
  );
}

const DarkButton = ({ children }: { children: ReactNode }) => (
  <button className="bg-[#2f3031] text-white rounded-[4px] px-[14px] py-[8px] flex items-center gap-[6px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>
    <Plus className="size-[16px]" /> {children}
  </button>
);

const col = (key: string, label: string, width?: string): Column => ({ key, label, width });

export function RolePage() {
  const roles: [string, string][] = [
    ['Admin', 'Super Admin'], ['Admin Kelembagaan Unit Utama', 'User untuk melakukan Usulan Pergeseran Jabatan'],
    ['Admin Satker', 'Admin Ketatalaksanaan Unit Kerja'], ['Admin Unit', 'admin portal pada unit kerja'],
    ['Korektor SK', 'role untuk pengoreksi SK pegawai'], ['Pegawai', ''],
  ];
  return (
    <Page title="Manajemen Role" subtitle="Kelola role dan hak akses pengguna sistem" action={<DarkButton>Tambah Role</DarkButton>}>
      <StagingDataTable hideFilter columns={[col('no', 'No', '56px'), col('nama', 'Nama Role'), col('status', 'Status'), col('desk', 'Deskripsi'), col('aksi', 'Aksi', '80px')]}
        rows={roles.map(([n, d], i) => ({ no: i + 1, nama: n, status: <Chip>Aktif</Chip>, desk: d, aksi: <MoreAction /> }))} />
    </Page>
  );
}

export function UserPage() {
  return (
    <Page title="Manajemen Pengguna" subtitle="Kelola pengguna dan role akses">
      <StagingDataTable columns={[col('no', 'No', '56px'), col('nip', 'NIP'), col('nama', 'Nama'), col('roles', 'Roles'), col('aksi', 'Aksi', '80px')]}
        rows={[
          { no: 1, nip: '100000000000000001', nama: <div><div>Pengguna Contoh Satu</div><div className="text-[#8a8d90]" style={{ fontSize: 'var(--text-xs)' }}>satu@contoh.example</div></div>, roles: 'Pegawai', aksi: <MoreAction /> },
          { no: 2, nip: '100000000000000002', nama: <div><div>Pengguna Contoh Dua</div><div className="text-[#8a8d90]" style={{ fontSize: 'var(--text-xs)' }}>dua@contoh.example</div></div>, roles: 'Korektor SK, Pegawai', aksi: <MoreAction /> },
        ]} />
    </Page>
  );
}

export function PemberitahuanUmumPage() {
  return (
    <Page title="Pemberitahuan Umum" subtitle="Kelola pemberitahuan umum untuk pengguna sistem" action={<DarkButton>Buat Berita</DarkButton>}>
      <StagingDataTable columns={[col('no', 'No', '56px'), col('judul', 'Judul dan Deskripsi Berita'), col('status', 'Status', '140px'), col('aksi', 'Aksi', '80px')]}
        rows={[{
          no: 1,
          judul: <div><div className="font-medium">Contoh Judul Pemberitahuan</div><div className="text-[#8a8d90]" style={{ fontSize: 'var(--text-xs)' }}>Dipublikasikan pada : 29 Oktober 2026 - 31 Oktober 2026</div><div className="text-[#8a8d90]" style={{ fontSize: 'var(--text-xs)' }}>Terakhir diperbarui : 29 Oktober 2026 09:07</div></div>,
          status: <Chip tone="blue">Berakhir</Chip>, aksi: <MoreAction />,
        }]} />
    </Page>
  );
}

export function InformasiSistemPage() {
  return (
    <Page title="Informasi Sistem" subtitle="Kelola informasi teks yang ditampilkan sebagai banner berwarna biru di halaman utama portal. Hanya 1 informasi yang dapat aktif pada satu waktu." action={<DarkButton>Tambah Informasi</DarkButton>}>
      <StagingDataTable hideFilter columns={[col('no', 'No', '56px'), col('info', 'Informasi'), col('pub', 'Jadwal Publikasi'), col('hilang', 'Jadwal Hilang'), col('status', 'Status'), col('aksi', 'Aksi', '100px')]}
        rows={[{ no: 1, info: 'Contoh informasi sistem', pub: '-', hilang: '-', status: <Chip tone="red">Tidak Aktif</Chip>, aksi: <span className="flex gap-[8px]"><Trash2 className="size-[18px]" /><MoreAction /></span> }]} />
    </Page>
  );
}

export function BannerUtamaPage() {
  const [tab, setTab] = useState(0);
  return (
    <Page title="Banner" subtitle="Kelola banner yang ditampilkan di halaman utama portal" action={<DarkButton>Buat Banner</DarkButton>}>
      <p className="mb-[8px] text-[#65696c]" style={{ fontSize: 'var(--text-sm)' }}>0 dari 5 slot banner aktif</p>
      <div className="rounded-[8px] bg-[#eaf3fe] border border-[#a9d2f7] p-[12px] mb-[12px]" style={{ fontSize: 'var(--text-sm)' }}>
        <p className="font-semibold flex items-center gap-[6px]"><Info className="size-[16px] text-[#1a5fe0]" /> Petunjuk Pengaturan Banner</p>
        <ul className="list-disc pl-[28px] mt-[4px]">
          <li>Klik "Atur Urutan" untuk mengubah posisi banner, lalu konfirmasi perubahan.</li>
          <li>Maksimal 5 banner aktif yang dapat ditampilkan secara bersamaan.</li>
          <li>Banner dijadwalkan berdasarkan Jadwal Publikasi dan Jadwal Hilang.</li>
          <li>Setiap banner memerlukan 2 file: Desktop (rasio 2.618:1, contoh: 2618x1000) dan Mobile (rasio 3:2, contoh: 1200x800).</li>
        </ul>
      </div>
      <div className="flex gap-[24px] border-b border-[#e4e4e4]">
        {['Aktif', 'Tidak Aktif', 'Dijadwalkan'].map((t, i) => (
          <button key={t} onClick={() => setTab(i)} className={`py-[10px] border-b-[3px] ${i === tab ? 'border-[#1a5fe0]' : 'border-transparent'}`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{t}</button>
        ))}
      </div>
      <div className="py-[40px] text-center text-[#65696c]" style={{ fontSize: 'var(--text-sm)' }}>
        <p className="font-semibold">Data Tidak Ditemukan</p>
        <p>{['Belum ada banner aktif.', 'Belum ada banner tidak aktif.', 'Belum ada banner dijadwalkan.'][tab]}</p>
      </div>
    </Page>
  );
}
