import { Tabs as SdTabs } from '@/app/components/seragam/Tabs';
import { Checkbox } from '@/app/components/seragam/Checkbox';
import { useState } from 'react';
import { Header } from '@/app/components/Header';
import {
  Search,
  X,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Settings,
  ArrowLeft,
  PanelLeftClose,
  PanelLeft,
  Bell,
  Shield,
  Users,
  Plus,
  Calendar,
  Info,
  Image,
  AlertTriangle,
  GripVertical,
  Trash2,
  Upload,
  Link as LinkIcon,
  ArrowUpDown,
  Check,
  StopCircle,
  Pencil,
} from 'lucide-react';
import { ToggleSwitch } from '@/app/components/ToggleSwitch';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// Helper to check if ReactQuill content is effectively empty
function isQuillContentEmpty(html: string): boolean {
  const stripped = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  return stripped.length === 0;
}

interface PengaturanUmumPageProps {
  onBack: () => void;
}

type SidebarMenu = 'role' | 'user' | 'pemberitahuan-umum' | 'banner-utama' | 'informasi-sistem';

interface BeritaItem {
  id: number;
  judul: string;
  dipublikasikan: string;
  terakhirDiperbarui: string;
  disampaikan?: string;
  deskripsi?: string;
  status: 'Sudah Tidak Aktif' | 'Aktif';
}

const mockBerita: BeritaItem[] = [
  {
    id: 1,
    judul: 'Pengingat - Pengisian Laporan Kinerja Pegawai Triwulan II',
    dipublikasikan: '26 Januari 2026 - 28 Februari 2026',
    terakhirDiperbarui: '26 Januari 2026 11:06',
    disampaikan: '26 Januari 2026 11:06',
    deskripsi:
      'Seluruh pegawai diwajibkan mengisi Laporan Kinerja Pegawai (LKP) Triwulan II melalui aplikasi e-Kinerja paling lambat tanggal 5 bulan depan ya!',
    status: 'Sudah Tidak Aktif',
  },
  {
    id: 2,
    judul: 'Tes 1a',
    dipublikasikan: '19 Desember 2025 - 20 Desember 2025',
    terakhirDiperbarui: '23 Desember 2025 13:45',
    deskripsi: 'Tes 1a',
    status: 'Sudah Tidak Aktif',
  },
  {
    id: 3,
    judul: 'Pengingat - Pengisian Laporan Kinerja Triwulan II',
    dipublikasikan: '19 Desember 2025 - 18 Desember 2025',
    terakhirDiperbarui: '23 Desember 2025 13:44',
    deskripsi:
      'Seluruh pegawai diwajibkan mengisi Laporan Kinerja Pegawai (LKP) Triwulan II melalui aplikasi e-Kinerja paling lambat tanggal 5 bulan depan ya!',
    status: 'Sudah Tidak Aktif',
  },
  {
    id: 4,
    judul: 'Peluncuran Portal Kemendikdasmen Terbaru',
    dipublikasikan: '13 Desember 2025 - 23 Desember 2025',
    terakhirDiperbarui: '15 Desember 2025 14:18',
    disampaikan: '15 Desember 2025 14:18',
    deskripsi:
      'Dalam rangka meningkatkan kualitas layanan dan kemudahan akses informasi di bidang pendidikan dasar dan menengah, Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen) dengan bangga meluncurkan Portal Kemendikdasmen Terbaru. Portal ini hadir dengan tampilan yang lebih modern, fitur yang lebih lengkap, serta integrasi layanan yang memudahkan pemangku kepentingan dalam memperoleh informasi dan layanan pendidikan secara cepat, transparan, dan terpadu.',
    status: 'Sudah Tidak Aktif',
  },
  {
    id: 5,
    judul:
      'Optimalisasi Layanan Digital Pendidikan: Portal Kemendikdasmen Kini Hadir dengan Fitur Terbaru',
    dipublikasikan: '10 Desember 2025 - 20 Desember 2025',
    terakhirDiperbarui: '12 Desember 2025 09:30',
    deskripsi:
      'Portal Kemendikdasmen telah diperbarui dengan berbagai fitur terbaru untuk meningkatkan efisiensi layanan digital pendidikan bagi seluruh pemangku kepentingan.',
    status: 'Sudah Tidak Aktif',
  },
];

export function PengaturanUmumPage({ onBack }: PengaturanUmumPageProps) {
  const [activeMenu, setActiveMenu] = useState<SidebarMenu>('pemberitahuan-umum');
  const [pengaturanAplikasiExpanded, setPengaturanAplikasiExpanded] = useState(true);
  const [informasiUmumExpanded, setInformasiUmumExpanded] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBerita = mockBerita.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'role':
        return <RoleContent />;
      case 'user':
        return <UserContent />;
      case 'banner-utama':
        return <BannerUtamaContent />;
      case 'informasi-sistem':
        return <InformasiSistemContent />;
      case 'pemberitahuan-umum':
        return (
          <PemberitahuanUmumContent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredBerita={filteredBerita}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="size-full bg-background flex flex-col">
      <Header onLogoClick={onBack} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-card border-r border-[color:var(--border)]/20 flex flex-col transition-all duration-200 ${
            sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-[260px] min-w-[260px]'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="px-[16px] pt-[20px] pb-[12px]">
              <p
                className="text-primary tracking-wider"
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                PENGATURAN UMUM
              </p>
            </div>

            {/* Kembali ke Beranda */}
            <button
              onClick={onBack}
              className="flex items-center gap-[8px] px-[16px] py-[10px] text-muted-foreground hover:bg-muted/50 transition-colors w-full text-left"
            >
              <ArrowLeft
                className="shrink-0"
                style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
              />
              <span style={{ fontSize: 'var(--text-sm)' }}>Kembali ke Beranda Portal</span>
            </button>

            {/* Divider */}
            <div className="mx-[16px] border-b border-[color:var(--border)]/20" />

            {/* Menu Items */}
            <nav className="flex-1 py-[8px] overflow-y-auto">
              {/* Pengaturan Aplikasi */}
              <button
                onClick={() => setPengaturanAplikasiExpanded(!pengaturanAplikasiExpanded)}
                className="flex items-center justify-between w-full px-[16px] py-[10px] hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-[8px]">
                  <Settings
                    className="text-foreground shrink-0"
                    style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
                  />
                  <span
                    className="text-foreground"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-normal)' }}
                  >
                    Pengaturan Aplikasi
                  </span>
                </div>
                {pengaturanAplikasiExpanded ? (
                  <ChevronUp
                    className="text-muted-foreground"
                    style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
                  />
                ) : (
                  <ChevronDown
                    className="text-muted-foreground"
                    style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
                  />
                )}
              </button>

              {pengaturanAplikasiExpanded && (
                <div className="ml-[24px]">
                  <button
                    onClick={() => setActiveMenu('role')}
                    className={`flex items-center gap-[8px] w-full px-[16px] py-[8px] transition-colors ${
                      activeMenu === 'role'
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Shield
                      className="shrink-0"
                      style={{ width: 'var(--text-sm)', height: 'var(--text-sm)' }}
                    />
                    <span style={{ fontSize: 'var(--text-sm)' }}>Role</span>
                  </button>
                  <button
                    onClick={() => setActiveMenu('user')}
                    className={`flex items-center gap-[8px] w-full px-[16px] py-[8px] transition-colors ${
                      activeMenu === 'user'
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Users
                      className="shrink-0"
                      style={{ width: 'var(--text-sm)', height: 'var(--text-sm)' }}
                    />
                    <span style={{ fontSize: 'var(--text-sm)' }}>User</span>
                  </button>
                </div>
              )}

              {/* Informasi Umum - Collapsible Menu */}
              <button
                onClick={() => setInformasiUmumExpanded(!informasiUmumExpanded)}
                className="flex items-center justify-between w-full px-[16px] py-[10px] hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-[8px]">
                  <Info
                    className="text-foreground shrink-0"
                    style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
                  />
                  <span
                    className="text-foreground"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-normal)' }}
                  >
                    Informasi Umum
                  </span>
                </div>
                {informasiUmumExpanded ? (
                  <ChevronUp
                    className="text-muted-foreground"
                    style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
                  />
                ) : (
                  <ChevronDown
                    className="text-muted-foreground"
                    style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
                  />
                )}
              </button>

              {informasiUmumExpanded && (
                <div className="ml-[24px]">
                  <button
                    onClick={() => setActiveMenu('banner-utama')}
                    className={`flex items-center gap-[8px] w-full px-[16px] py-[8px] transition-colors ${
                      activeMenu === 'banner-utama'
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Image
                      className="shrink-0"
                      style={{ width: 'var(--text-sm)', height: 'var(--text-sm)' }}
                    />
                    <span style={{ fontSize: 'var(--text-sm)' }}>Banner Utama</span>
                  </button>
                  <button
                    onClick={() => setActiveMenu('informasi-sistem')}
                    className={`flex items-center gap-[8px] w-full px-[16px] py-[8px] transition-colors ${
                      activeMenu === 'informasi-sistem'
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <AlertTriangle
                      className="shrink-0"
                      style={{ width: 'var(--text-sm)', height: 'var(--text-sm)' }}
                    />
                    <span style={{ fontSize: 'var(--text-sm)' }}>Informasi Sistem</span>
                  </button>
                  <button
                    onClick={() => setActiveMenu('pemberitahuan-umum')}
                    className={`flex items-center gap-[8px] w-full px-[16px] py-[8px] transition-colors ${
                      activeMenu === 'pemberitahuan-umum'
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Bell
                      className="shrink-0"
                      style={{ width: 'var(--text-sm)', height: 'var(--text-sm)' }}
                    />
                    <span style={{ fontSize: 'var(--text-sm)' }}>Pemberitahuan Umum</span>
                  </button>
                </div>
              )}
            </nav>

            {/* Sidebar Footer */}
            <div className="border-t border-[color:var(--border)]/20 px-[16px] py-[12px]">
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="flex items-center gap-[8px] text-muted-foreground hover:text-foreground transition-colors w-full"
              >
                <PanelLeftClose
                  className="shrink-0"
                  style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
                />
                <span style={{ fontSize: 'var(--text-sm)' }}>Sembunyikan Menu</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Show sidebar toggle when collapsed */}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="fixed left-[8px] bottom-[16px] z-40 bg-card border border-[color:var(--border)]/30 p-[8px] rounded-[var(--radius)] hover:bg-muted/50 transition-colors"
            title="Tampilkan Menu"
          >
            <PanelLeft
              className="text-muted-foreground"
              style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
            />
          </button>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}

/* ─── Pemberitahuan Umum Content ─── */

function PemberitahuanUmumContent({
  searchQuery,
  setSearchQuery,
  filteredBerita,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredBerita: BeritaItem[];
}) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    linkUrl: '',
    jadwalPublikasi: '',
    jadwalHilang: '',
    pinned: false,
  });

  const handleSubmit = () => {
    // Mock submit
    setShowModal(false);
    setFormData({
      judul: '',
      deskripsi: '',
      linkUrl: '',
      jadwalPublikasi: '',
      jadwalHilang: '',
      pinned: false,
    });
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData({
      judul: '',
      deskripsi: '',
      linkUrl: '',
      jadwalPublikasi: '',
      jadwalHilang: '',
      pinned: false,
    });
  };

  return (
    <div className="p-[32px] max-w-full">
      {/* Page Header */}
      <div className="mb-[24px]">
        <h2 className="text-foreground" style={{ fontSize: 'var(--text-xl)' }}>
          Pemberitahuan Umum
        </h2>
        <p
          className="text-muted-foreground mt-[4px]"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          Kelola pemberitahuan umum untuk pengguna sistem
        </p>
      </div>

      {/* Search + Action Bar */}
      <div className="flex items-center justify-between gap-[16px] mb-[24px] flex-wrap">
        {/* Search */}
        <div className="relative w-full max-w-[320px]">
          <Search
            className="absolute left-[12px] top-1/2 -translate-y-1/2 text-muted-foreground"
            style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
          />
          <input
            type="text"
            placeholder="Cari judul berita..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-[36px] pr-[36px] py-[8px] border border-sd-gray-50 rounded-[4px] bg-white text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
            style={{ fontSize: 'var(--text-sm)' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-[12px] top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
            </button>
          )}
        </div>

        {/* Buat Berita Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-[6px] px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          <Plus style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
          <span style={{ fontSize: 'var(--text-sm)' }}>Buat Berita</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-[var(--radius-card)] border border-[color:var(--border)]/20 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[60px_1fr_180px_60px] items-center px-[16px] py-[12px] border-b border-[color:var(--border)]/20 bg-muted/30">
          <span
            className="text-muted-foreground"
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            NO
          </span>
          <span
            className="text-muted-foreground"
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            JUDUL DAN DESKRIPSI BERITA
          </span>
          <span
            className="text-muted-foreground"
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            STATUS
          </span>
          <span
            className="text-muted-foreground text-center"
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            AKSI
          </span>
        </div>

        {/* Table Body */}
        {filteredBerita.length === 0 ? (
          <div className="px-[16px] py-[40px] text-center">
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              Tidak ada berita yang ditemukan.
            </p>
          </div>
        ) : (
          filteredBerita.map((item) => (
            <BeritaRow key={item.id} item={item} />
          ))
        )}
      </div>

      {/* Modal Tambah Berita Baru */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleCancel}
          />

          {/* Modal Content */}
          <div
            className="relative bg-card rounded-[var(--radius-card)] w-full max-w-[640px] max-h-[90vh] overflow-y-auto mx-[16px]"
            style={{ border: '1px solid rgba(128, 132, 137, 0.2)' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-[24px] pt-[24px] pb-[20px]">
              <h3
                className="text-foreground"
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                Tambah Berita Baru
              </h3>
              <button
                onClick={handleCancel}
                className="p-[4px] hover:bg-muted/50 rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground"
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Divider */}
            <div className="border-b border-[color:var(--border)]/20 mx-[24px]" />

            {/* Modal Body */}
            <div className="px-[24px] py-[24px] space-y-[20px]">
              {/* Judul Berita */}
              <div>
                <label
                  className="block text-foreground mb-[6px]"
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Judul Berita <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan judul berita"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  className="w-full px-[12px] py-[10px] border border-sd-gray-50 rounded-[4px] bg-white text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>

              {/* Deskripsi Berita */}
              <div>
                <label
                  className="block text-foreground mb-[6px]"
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Deskripsi Berita <span className="text-destructive">*</span>
                </label>
                <div className="border border-[color:var(--border)]/30 rounded-[var(--radius)] overflow-hidden rich-text-editor">
                  <ReactQuill
                    value={formData.deskripsi}
                    onChange={(value) => setFormData({ ...formData, deskripsi: value })}
                    placeholder="Masukkan deskripsi berita"
                    theme="snow"
                    modules={{
                      toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link'],
                        ['clean']
                      ]
                    }}
                    style={{ height: '150px' }}
                  />
                </div>
              </div>

              {/* Link URL */}
              <div>
                <label
                  className="block text-foreground mb-[6px]"
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Link URL
                </label>
                <div className="relative">
                  <LinkIcon
                    className="absolute left-[12px] top-1/2 -translate-y-1/2 text-muted-foreground"
                    style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
                  />
                  <input
                    type="url"
                    placeholder="https://contoh.com/halaman-tujuan"
                    value={formData.linkUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, linkUrl: e.target.value })
                    }
                    className="w-full pl-[36px] pr-[12px] py-[10px] border border-sd-gray-50 rounded-[4px] bg-white text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
              </div>

              {/* Date Fields Row */}
              <div className="grid grid-cols-2 gap-[16px]">
                {/* Jadwal Publikasi */}
                <div>
                  <label
                    className="block text-foreground mb-[6px]"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    Atur Jadwal Publikasi <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.jadwalPublikasi}
                      onChange={(e) =>
                        setFormData({ ...formData, jadwalPublikasi: e.target.value })
                      }
                      className="w-full px-[12px] py-[10px] pr-[40px] border border-sd-gray-50 rounded-[4px] bg-white text-foreground placeholder:text-muted-foreground appearance-none outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                      style={{ fontSize: 'var(--text-sm)' }}
                      placeholder="Pilih tanggal"
                    />
                    <Calendar
                      className="absolute right-[12px] top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                      style={{ width: '16px', height: '16px' }}
                    />
                  </div>
                </div>

                {/* Jadwal Informasi Hilang */}
                <div>
                  <label
                    className="block text-foreground mb-[6px]"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    Atur Jadwal Informasi Hilang <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.jadwalHilang}
                      onChange={(e) =>
                        setFormData({ ...formData, jadwalHilang: e.target.value })
                      }
                      className="w-full px-[12px] py-[10px] pr-[40px] border border-sd-gray-50 rounded-[4px] bg-white text-foreground placeholder:text-muted-foreground appearance-none outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                      style={{ fontSize: 'var(--text-sm)' }}
                      placeholder="Pilih tanggal"
                    />
                    <Calendar
                      className="absolute right-[12px] top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                      style={{ width: '16px', height: '16px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Pin Checkbox */}
              <div className="flex items-center gap-[8px]">
                <Checkbox
                  checked={formData.pinned}
                  onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
                  label="Pin informasi di bagian atas"
                />
              </div>

              {/* Info Box */}
              <div
                className="rounded-[var(--radius)] p-[16px]"
                style={{
                  backgroundColor: 'rgba(11, 95, 239, 0.06)',
                  border: '1px solid rgba(11, 95, 239, 0.15)',
                }}
              >
                <div className="flex items-center gap-[6px] mb-[10px]">
                  <Info
                    className="text-primary shrink-0"
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span
                    className="text-foreground"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    Informasi tentang Pin
                  </span>
                </div>
                <ul
                  className="space-y-[4px] pl-[22px]"
                  style={{ fontSize: 'var(--text-xs)', listStyleType: 'disc' }}
                >
                  <li className="text-foreground">
                    Jika berita sudah dipublikasikan, Anda hanya dapat mengubah: Deskripsi Berita dan Jadwal Informasi Hilang.
                  </li>
                  <li className="text-foreground">
                    Informasi yang di-<em>pin</em> akan selalu ditampilkan pada posisi teratas.
                  </li>
                  <li className="text-foreground">
                    Pada portal pengguna, hanya satu pengumuman yang ditampilkan di-<em>pin</em> dalam satu periode.
                  </li>
                  <li className="text-foreground">
                    Jika ada beberapa pengumuman yang di-<em>pin</em>, yang ditampilkan ter-<em>pin</em> adalah pengumuman dengan waktu <em>pin</em> paling baru
                  </li>
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-[color:var(--border)]/20 mx-[24px]" />

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-[24px] py-[16px]">
              <button
                onClick={handleCancel}
                className="px-[20px] py-[8px] border border-[color:var(--border)]/30 rounded-[var(--radius-button)] text-foreground hover:bg-muted/50 transition-colors bg-card"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-[20px] py-[8px] rounded-[var(--radius-button)] text-primary-foreground hover:opacity-90 transition-opacity"
                style={{
                  fontSize: 'var(--text-sm)',
                  backgroundColor: 'rgba(47, 48, 49, 1)',
                }}
              >
                Simpan Berita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BeritaRow({ item }: { item: BeritaItem }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="grid grid-cols-[60px_1fr_180px_60px] px-[16px] py-[14px] border-b border-[color:var(--border)]/10 hover:bg-muted/20 transition-colors items-start">
      {/* NO */}
      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {item.id}
      </span>

      {/* Judul + Deskripsi */}
      <div className="pr-[16px]">
        <p
          className="text-foreground"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}
        >
          {item.judul}
        </p>
        <div className="mt-[4px] space-y-[1px]">
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
            Dipublikasikan pada &nbsp;: {item.dipublikasikan}
          </p>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
            Terakhir diperbarui &nbsp;: {item.terakhirDiperbarui}
          </p>
          {item.disampaikan && (
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
              Disampaikan pada &nbsp;&nbsp;&nbsp;&nbsp;: {item.disampaikan}
            </p>
          )}
        </div>
        {item.deskripsi && (
          <p
            className="text-muted-foreground mt-[6px] line-clamp-3"
            style={{ fontSize: 'var(--text-xs)' }}
          >
            {item.deskripsi}
          </p>
        )}
      </div>

      {/* Status */}
      <div>
        <span
          className={`inline-block px-[10px] py-[3px] rounded-[var(--radius)] ${
            item.status === 'Aktif'
              ? 'bg-chart-2/10 text-chart-2'
              : 'bg-muted text-muted-foreground'
          }`}
          style={{ fontSize: 'var(--text-xs)' }}
        >
          {item.status}
        </span>
      </div>

      {/* Aksi */}
      <div className="flex justify-center relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-[4px] hover:bg-muted/50 rounded-[var(--radius)] transition-colors"
        >
          <MoreVertical
            className="text-muted-foreground"
            style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
          />
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-[28px] z-50 bg-card border border-[color:var(--border)]/20 rounded-[var(--radius)] py-[4px] min-w-[140px]">
              <button
                className="w-full text-left px-[12px] py-[8px] hover:bg-muted/50 transition-colors text-foreground"
                style={{ fontSize: 'var(--text-sm)' }}
                onClick={() => setMenuOpen(false)}
              >
                Edit
              </button>
              <button
                className="w-full text-left px-[12px] py-[8px] hover:bg-muted/50 transition-colors text-foreground"
                style={{ fontSize: 'var(--text-sm)' }}
                onClick={() => setMenuOpen(false)}
              >
                Lihat Detail
              </button>
              <button
                className="w-full text-left px-[12px] py-[8px] hover:bg-muted/50 transition-colors text-destructive"
                style={{ fontSize: 'var(--text-sm)' }}
                onClick={() => setMenuOpen(false)}
              >
                Hapus
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Role Content (placeholder) ─── */

function RoleContent() {
  const roles = [
    { id: 1, name: 'Super Admin', description: 'Akses penuh ke seluruh fitur sistem', users: 2 },
    { id: 2, name: 'Admin', description: 'Mengelola konten dan pengguna', users: 5 },
    { id: 3, name: 'Editor', description: 'Mengelola dan mempublikasikan konten', users: 12 },
    { id: 4, name: 'Viewer', description: 'Hanya dapat melihat konten', users: 150 },
  ];

  return (
    <div className="p-[32px] max-w-full">
      <div className="mb-[24px]">
        <h2 className="text-foreground" style={{ fontSize: 'var(--text-xl)' }}>
          Role
        </h2>
        <p className="text-muted-foreground mt-[4px]" style={{ fontSize: 'var(--text-sm)' }}>
          Kelola role dan hak akses pengguna sistem
        </p>
      </div>

      <div className="flex items-center justify-end mb-[24px]">
        <button className="flex items-center gap-[6px] px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:opacity-90 transition-opacity">
          <Plus style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
          <span style={{ fontSize: 'var(--text-sm)' }}>Tambah Role</span>
        </button>
      </div>

      <div className="bg-card rounded-[var(--radius-card)] border border-[color:var(--border)]/20 overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_1fr_100px_60px] items-center px-[16px] py-[12px] border-b border-[color:var(--border)]/20 bg-muted/30">
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>NO</span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>NAMA ROLE</span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>DESKRIPSI</span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>PENGGUNA</span>
          <span className="text-muted-foreground text-center" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>AKSI</span>
        </div>

        {roles.map((role) => (
          <div
            key={role.id}
            className="grid grid-cols-[60px_1fr_1fr_100px_60px] items-center px-[16px] py-[14px] border-b border-[color:var(--border)]/10 hover:bg-muted/20 transition-colors"
          >
            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{role.id}</span>
            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>{role.name}</span>
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{role.description}</span>
            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{role.users}</span>
            <div className="flex justify-center">
              <button className="p-[4px] hover:bg-muted/50 rounded-[var(--radius)] transition-colors">
                <MoreVertical className="text-muted-foreground" style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── User Content (placeholder) ─── */

function UserContent() {
  const users = [
    { id: 1, name: 'Joddy Irvan Rizky', email: 'joddy.irvan@kemendikdasmen.go.id', role: 'Super Admin', status: 'Aktif' },
    { id: 2, name: 'Sarah Citra', email: 'sarah.citra@kemendikdasmen.go.id', role: 'Admin', status: 'Aktif' },
    { id: 3, name: 'Ahmad Fauzi', email: 'ahmad.fauzi@kemendikdasmen.go.id', role: 'Editor', status: 'Aktif' },
    { id: 4, name: 'Dewi Lestari', email: 'dewi.lestari@kemendikdasmen.go.id', role: 'Editor', status: 'Aktif' },
    { id: 5, name: 'Budi Santoso', email: 'budi.santoso@kemendikdasmen.go.id', role: 'Viewer', status: 'Tidak Aktif' },
  ];

  return (
    <div className="p-[32px] max-w-full">
      <div className="mb-[24px]">
        <h2 className="text-foreground" style={{ fontSize: 'var(--text-xl)' }}>
          User
        </h2>
        <p className="text-muted-foreground mt-[4px]" style={{ fontSize: 'var(--text-sm)' }}>
          Kelola pengguna yang terdaftar dalam sistem
        </p>
      </div>

      <div className="flex items-center justify-between gap-[16px] mb-[24px] flex-wrap">
        <div className="relative w-full max-w-[320px]">
          <Search
            className="absolute left-[12px] top-1/2 -translate-y-1/2 text-muted-foreground"
            style={{ width: 'var(--text-base)', height: 'var(--text-base)' }}
          />
          <input
            type="text"
            placeholder="Cari pengguna..."
            className="w-full pl-[36px] pr-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] bg-white text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
        <button className="flex items-center gap-[6px] px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:opacity-90 transition-opacity whitespace-nowrap">
          <Plus style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
          <span style={{ fontSize: 'var(--text-sm)' }}>Tambah User</span>
        </button>
      </div>

      <div className="bg-card rounded-[var(--radius-card)] border border-[color:var(--border)]/20 overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_1fr_120px_120px_60px] items-center px-[16px] py-[12px] border-b border-[color:var(--border)]/20 bg-muted/30">
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>NO</span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>NAMA</span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>EMAIL</span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>ROLE</span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>STATUS</span>
          <span className="text-muted-foreground text-center" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>AKSI</span>
        </div>

        {users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-[60px_1fr_1fr_120px_120px_60px] items-center px-[16px] py-[14px] border-b border-[color:var(--border)]/10 hover:bg-muted/20 transition-colors"
          >
            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{user.id}</span>
            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>{user.name}</span>
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{user.email}</span>
            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{user.role}</span>
            <div>
              <span
                className={`inline-block px-[10px] py-[3px] rounded-[var(--radius)] ${
                  user.status === 'Aktif' ? 'bg-chart-2/10 text-chart-2' : 'bg-muted text-muted-foreground'
                }`}
                style={{ fontSize: 'var(--text-xs)' }}
              >
                {user.status}
              </span>
            </div>
            <div className="flex justify-center">
              <button className="p-[4px] hover:bg-muted/50 rounded-[var(--radius)] transition-colors">
                <MoreVertical className="text-muted-foreground" style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Banner Utama Content ─── */

interface BannerSlide {
  id: number;
  judul: string;
  desktopImageUrl: string;
  desktopFileName: string;
  mobileImageUrl: string;
  mobileFileName: string;
  jadwalPublikasi: string;
  jadwalHilang: string;
  status: 'Dijadwalkan' | 'Aktif' | 'Tidak Aktif';
  tanggalDibuat: string;
}

interface BannerFormData {
  judul: string;
  desktopFileName: string;
  mobileFileName: string;
  jadwalPublikasi: string;
  jadwalHilang: string;
}

const emptyBannerForm: BannerFormData = {
  judul: '',
  desktopFileName: '',
  mobileFileName: '',
  jadwalPublikasi: '',
  jadwalHilang: '',
};

function BannerUtamaContent() {
  const [banners, setBanners] = useState<BannerSlide[]>([
    {
      id: 1,
      judul: 'Banner Core Values ASN BerAKHLAK',
      desktopImageUrl: '',
      desktopFileName: 'banner-berakhlak-desktop.png',
      mobileImageUrl: '',
      mobileFileName: 'banner-berakhlak-mobile.png',
      jadwalPublikasi: '2026-03-01',
      jadwalHilang: '2026-06-30',
      status: 'Aktif',
      tanggalDibuat: '28 Februari 2026',
    },
    {
      id: 2,
      judul: 'Banner Peluncuran Portal Baru',
      desktopImageUrl: '',
      desktopFileName: 'banner-peluncuran-desktop.png',
      mobileImageUrl: '',
      mobileFileName: 'banner-peluncuran-mobile.png',
      jadwalPublikasi: '2026-03-10',
      jadwalHilang: '2026-04-10',
      status: 'Aktif',
      tanggalDibuat: '5 Maret 2026',
    },
    {
      id: 3,
      judul: 'Banner Kinerja Q2',
      desktopImageUrl: '',
      desktopFileName: 'banner-kinerja-desktop.png',
      mobileImageUrl: '',
      mobileFileName: 'banner-kinerja-mobile.png',
      jadwalPublikasi: '2026-04-15',
      jadwalHilang: '2026-05-15',
      status: 'Dijadwalkan',
      tanggalDibuat: '20 Maret 2026',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<BannerFormData>(emptyBannerForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Tab state
  const [activeTab, setActiveTab] = useState<'Aktif' | 'Tidak Aktif' | 'Dijadwalkan'>('Aktif');

  // Reorder mode state
  const [isReordering, setIsReordering] = useState(false);
  const [reorderBanners, setReorderBanners] = useState<BannerSlide[]>([]);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const handleOpenAdd = () => {
    setFormData(emptyBannerForm);
    setEditingId(null);
    setShowAddModal(true);
  };

  const handleOpenEdit = (banner: BannerSlide) => {
    setFormData({
      judul: banner.judul,
      desktopFileName: banner.desktopFileName,
      mobileFileName: banner.mobileFileName,
      jadwalPublikasi: banner.jadwalPublikasi,
      jadwalHilang: banner.jadwalHilang,
    });
    setEditingId(banner.id);
    setShowAddModal(true);
    setOpenMenuId(null);
  };

  const handleSubmit = () => {
    if (!formData.judul.trim() || !formData.desktopFileName || !formData.mobileFileName || !formData.jadwalPublikasi || !formData.jadwalHilang) return;

    if (editingId !== null) {
      // Edit existing
      setBanners(
        banners.map((b) =>
          b.id === editingId
            ? {
                ...b,
                judul: formData.judul.trim(),
                desktopFileName: formData.desktopFileName,
                mobileFileName: formData.mobileFileName,
                jadwalPublikasi: formData.jadwalPublikasi,
                jadwalHilang: formData.jadwalHilang,
              }
            : b
        )
      );
    } else {
      // Add new
      const newId = Math.max(0, ...banners.map((b) => b.id)) + 1;
      setBanners([
        ...banners,
        {
          id: newId,
          judul: formData.judul.trim(),
          desktopImageUrl: '',
          desktopFileName: formData.desktopFileName,
          mobileImageUrl: '',
          mobileFileName: formData.mobileFileName,
          jadwalPublikasi: formData.jadwalPublikasi,
          jadwalHilang: formData.jadwalHilang,
          status: 'Dijadwalkan',
          tanggalDibuat: '31 Maret 2026',
        },
      ]);
    }

    setFormData(emptyBannerForm);
    setEditingId(null);
    setShowAddModal(false);
  };

  const handleCancel = () => {
    setFormData(emptyBannerForm);
    setEditingId(null);
    setShowAddModal(false);
  };

  const handleDelete = (id: number) => {
    setBanners(banners.filter((b) => b.id !== id));
    setOpenMenuId(null);
  };

  // Reorder mode handlers
  const enterReorderMode = () => {
    // Only reorder active banners
    setReorderBanners([...aktifBanners]);
    setIsReordering(true);
  };

  const confirmReorder = () => {
    // Merge reordered active banners back into all banners
    const nonAktifBanners = banners.filter((b) => b.status !== 'Aktif');
    setBanners([...reorderBanners, ...nonAktifBanners]);
    setIsReordering(false);
    setReorderBanners([]);
  };

  const cancelReorder = () => {
    setIsReordering(false);
    setReorderBanners([]);
  };

  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedId === null || draggedId === targetId) return;
    const dragIndex = reorderBanners.findIndex((b) => b.id === draggedId);
    const targetIndex = reorderBanners.findIndex((b) => b.id === targetId);
    if (dragIndex === -1 || targetIndex === -1) return;
    const updated = [...reorderBanners];
    const [dragged] = updated.splice(dragIndex, 1);
    updated.splice(targetIndex, 0, dragged);
    setReorderBanners(updated);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...reorderBanners];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setReorderBanners(updated);
  };

  const moveDown = (index: number) => {
    if (index === reorderBanners.length - 1) return;
    const updated = [...reorderBanners];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setReorderBanners(updated);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getStatusBadge = (status: BannerSlide['status']) => {
    switch (status) {
      case 'Aktif':
        return 'bg-chart-2/10 text-chart-2';
      case 'Dijadwalkan':
        return 'bg-primary/10 text-primary';
      case 'Tidak Aktif':
        return 'bg-muted text-muted-foreground';
    }
  };

  // Filter banners by status
  const dijadwalkanBanners = banners.filter((b) => b.status === 'Dijadwalkan');
  const aktifBanners = banners.filter((b) => b.status === 'Aktif');
  const tidakAktifBanners = banners.filter((b) => b.status === 'Tidak Aktif');

  const isFormValid = formData.judul.trim() && formData.desktopFileName && formData.mobileFileName && formData.jadwalPublikasi && formData.jadwalHilang;

  // Get current tab banners
  const getCurrentTabBanners = () => {
    if (isReordering) return reorderBanners;

    switch (activeTab) {
      case 'Aktif':
        return aktifBanners;
      case 'Dijadwalkan':
        return dijadwalkanBanners;
      case 'Tidak Aktif':
        return tidakAktifBanners;
      default:
        return [];
    }
  };

  const currentTabBanners = getCurrentTabBanners();

  return (
    <div className="p-[32px] max-w-full">
      {/* Page Header */}
      <div className="mb-[24px]">
        <h2 className="text-foreground" style={{ fontSize: 'var(--text-xl)' }}>
          Banner Utama
        </h2>
        <p className="text-muted-foreground mt-[4px]" style={{ fontSize: 'var(--text-sm)' }}>
          Kelola slide banner yang ditampilkan di halaman utama portal. Maksimal 5 banner.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-[16px] mb-[24px]">
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          {aktifBanners.length} dari 5 slot banner aktif
        </p>
        <div className="flex items-center gap-[8px]">
          {!isReordering ? (
            <>
              {/* Atur Urutan button only visible on Aktif tab */}
              {activeTab === 'Aktif' && aktifBanners.length > 1 && (
                <button
                  onClick={enterReorderMode}
                  className="flex items-center gap-[6px] px-[16px] py-[8px] border border-[color:var(--border)]/30 rounded-[var(--radius-button)] text-foreground hover:bg-muted/50 transition-colors bg-card whitespace-nowrap"
                >
                  <ArrowUpDown style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
                  <span style={{ fontSize: 'var(--text-sm)' }}>Atur Urutan</span>
                </button>
              )}
              <button
                onClick={handleOpenAdd}
                disabled={aktifBanners.length >= 5}
                className={`flex items-center gap-[6px] px-[16px] py-[8px] rounded-[var(--radius-button)] transition-opacity whitespace-nowrap ${
                  aktifBanners.length >= 5
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:opacity-90'
                }`}
              >
                <Plus style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
                <span style={{ fontSize: 'var(--text-sm)' }}>Tambah Banner</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={cancelReorder}
                className="flex items-center gap-[6px] px-[16px] py-[8px] border border-[color:var(--border)]/30 rounded-[var(--radius-button)] text-foreground hover:bg-muted/50 transition-colors bg-card whitespace-nowrap"
              >
                <X style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
                <span style={{ fontSize: 'var(--text-sm)' }}>Batal</span>
              </button>
              <button
                onClick={confirmReorder}
                className="flex items-center gap-[6px] px-[16px] py-[8px] rounded-[var(--radius-button)] text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
                style={{ backgroundColor: 'rgba(47, 48, 49, 1)' }}
              >
                <Check style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
                <span style={{ fontSize: 'var(--text-sm)' }}>Simpan Urutan</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Reorder Mode Banner */}
      {isReordering && (
        <div
          className="rounded-[var(--radius)] px-[16px] py-[12px] flex items-center gap-[10px] mb-[24px]"
          style={{
            backgroundColor: 'rgba(255, 193, 7, 0.15)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
          }}
        >
          <AlertTriangle
            className="shrink-0"
            style={{ width: '16px', height: '16px', color: 'var(--sd-yellow-30)' }}
          />
          <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
            Mode pengaturan urutan aktif. Gunakan tombol panah atau drag & drop untuk mengubah posisi banner, lalu klik &quot;Simpan Urutan&quot; untuk menyimpan perubahan.
          </p>
        </div>
      )}

      {/* Info Box (only when not reordering) */}
      {!isReordering && (
        <div
          className="rounded-[var(--radius)] p-[16px] mb-[24px]"
          style={{
            backgroundColor: 'rgba(11, 95, 239, 0.06)',
            border: '1px solid rgba(11, 95, 239, 0.15)',
          }}
        >
          <div className="flex items-center gap-[6px] mb-[6px]">
            <Info
              className="text-primary shrink-0"
              style={{ width: '16px', height: '16px' }}
            />
            <span
              className="text-foreground"
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              Petunjuk Pengaturan Banner
            </span>
          </div>
          <ul
            className="space-y-[4px] pl-[22px]"
            style={{ fontSize: 'var(--text-xs)', listStyleType: 'disc' }}
          >
            <li className="text-foreground">
              Klik &quot;Atur Urutan&quot; untuk mengubah posisi banner, lalu konfirmasi perubahan.
            </li>
            <li className="text-foreground">
              Maksimal 5 banner aktif yang dapat ditampilkan secara bersamaan.
            </li>
            <li className="text-foreground">
              Banner dijadwalkan berdasarkan Jadwal Publikasi dan Jadwal Hilang.
            </li>
            <li className="text-foreground">
              Setiap banner memerlukan 2 file: Desktop (rasio 2.618:1) dan Mobile (rasio 3:2).
            </li>
          </ul>
        </div>
      )}

      {/* Tabs */}
      <SdTabs
        className="mb-[20px]"
        items={[
          { label: 'Aktif', count: aktifBanners.length },
          { label: 'Tidak Aktif', count: tidakAktifBanners.length },
          { label: 'Dijadwalkan', count: dijadwalkanBanners.length },
        ]}
        active={['Aktif', 'Tidak Aktif', 'Dijadwalkan'].indexOf(activeTab)}
        onChange={(i) => {
          setActiveTab((['Aktif', 'Tidak Aktif', 'Dijadwalkan'] as const)[i]);
          if (isReordering) cancelReorder();
        }}
      />

      {/* Table */}
      <div className="bg-card rounded-[var(--radius-card)] border border-[color:var(--border)]/20 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[60px_1fr_140px_140px_110px_80px] items-center px-[16px] py-[12px] border-b border-[color:var(--border)]/20 bg-muted/30">
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            NO
          </span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            INFORMASI
          </span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            JADWAL PUBLIKASI
          </span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            JADWAL HILANG
          </span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            STATUS
          </span>
          <span className="text-muted-foreground text-center" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            AKSI
          </span>
        </div>

        {/* Table Body */}
        {currentTabBanners.length === 0 ? (
          <div className="px-[16px] py-[40px] text-center">
            <Image
              className="mx-auto text-muted-foreground mb-[12px]"
              style={{ width: '40px', height: '40px' }}
            />
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              Belum ada banner {activeTab.toLowerCase()}.
            </p>
          </div>
        ) : (
          currentTabBanners.map((banner, index) => (
            <div
              key={banner.id}
              draggable={isReordering}
              onDragStart={isReordering ? () => handleDragStart(banner.id) : undefined}
              onDragOver={isReordering ? (e) => handleDragOver(e, banner.id) : undefined}
              onDragEnd={isReordering ? handleDragEnd : undefined}
              className={`grid grid-cols-[60px_1fr_140px_140px_110px_80px] px-[16px] py-[14px] border-b border-[color:var(--border)]/10 hover:bg-muted/20 transition-colors items-start ${
                isReordering ? (draggedId === banner.id ? 'opacity-50' : 'cursor-move') : ''
              }`}
            >
              <div className="flex items-center gap-[8px]">
                {/* Drag Handle (only in reorder mode) */}
                {isReordering && (
                  <div className="cursor-grab active:cursor-grabbing text-muted-foreground">
                    <GripVertical style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
                  </div>
                )}
                <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  {index + 1}
                </span>
              </div>
              <div className="pr-[16px]">
                <p className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  {banner.judul}
                </p>
                <p className="text-muted-foreground mt-[2px]" style={{ fontSize: 'var(--text-xs)' }}>
                  Dibuat: {banner.tanggalDibuat}
                </p>
                <div className="mt-[4px] flex flex-col gap-[2px]">
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                    Desktop: {banner.desktopFileName}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                    Mobile: {banner.mobileFileName}
                  </p>
                </div>
              </div>
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {formatDate(banner.jadwalPublikasi)}
              </span>
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {formatDate(banner.jadwalHilang)}
              </span>
              <div>
                <span
                  className={`inline-block px-[10px] py-[3px] rounded-[var(--radius)] ${getStatusBadge(banner.status)}`}
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {banner.status}
                </span>
              </div>
              <div className="flex justify-center items-center gap-[4px]">
                {isReordering ? (
                  /* Move Buttons (only in reorder mode) */
                  <>
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className={`p-[4px] rounded-[var(--radius)] transition-colors ${
                        index === 0
                          ? 'text-muted-foreground/30 cursor-not-allowed'
                          : 'text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      <ChevronUp style={{ width: '16px', height: '16px' }} />
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === currentTabBanners.length - 1}
                      className={`p-[4px] rounded-[var(--radius)] transition-colors ${
                        index === currentTabBanners.length - 1
                          ? 'text-muted-foreground/30 cursor-not-allowed'
                          : 'text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      <ChevronDown style={{ width: '16px', height: '16px' }} />
                    </button>
                  </>
                ) : (
                  /* Normal mode: dropdown menu */
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === banner.id ? null : banner.id)}
                      className="p-[4px] hover:bg-muted/50 rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground"
                      title="Aksi"
                    >
                      <MoreVertical style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === banner.id && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                        <div
                          className="absolute right-0 top-[32px] z-50 bg-card rounded-[var(--radius-card)] border border-[color:var(--border)]/20 py-[4px] min-w-[180px]"
                          style={{ boxShadow: 'none' }}
                        >
                          <button
                            onClick={() => handleOpenEdit(banner)}
                            className="flex items-center gap-[8px] w-full px-[14px] py-[8px] text-foreground hover:bg-muted/30 transition-colors text-left"
                            style={{ fontSize: 'var(--text-sm)' }}
                          >
                            <Pencil style={{ width: 'var(--text-sm)', height: 'var(--text-sm)' }} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(banner.id)}
                            className="flex items-center gap-[8px] w-full px-[14px] py-[8px] text-destructive hover:bg-destructive/5 transition-colors text-left"
                            style={{ fontSize: 'var(--text-sm)' }}
                          >
                            <Trash2 style={{ width: 'var(--text-sm)', height: 'var(--text-sm)' }} />
                            Hapus
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Banner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={handleCancel} />

          {/* Modal */}
          <div
            className="relative bg-card rounded-[var(--radius-card)] w-full max-w-[640px] mx-[16px] max-h-[90vh] overflow-y-auto"
            style={{ border: '1px solid rgba(128, 132, 137, 0.2)' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-[24px] pt-[24px] pb-[20px] sticky top-0 bg-card z-10">
              <h3
                className="text-foreground"
                style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-medium)' }}
              >
                {editingId !== null ? 'Edit Banner' : 'Tambah Banner Baru'}
              </h3>
              <button
                onClick={handleCancel}
                className="p-[4px] hover:bg-muted/50 rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground"
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            <div className="border-b border-[color:var(--border)]/20 mx-[24px]" />

            {/* Modal Body */}
            <div className="px-[24px] py-[24px] space-y-[20px]">
              {/* Judul Informasi */}
              <div>
                <label
                  className="block text-foreground mb-[6px]"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}
                >
                  Judul Informasi <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan judul informasi"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full px-[12px] py-[10px] border border-sd-gray-50 rounded-[4px] bg-white text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>

              {/* Upload Banner Desktop */}
              <div>
                <label
                  className="block text-foreground mb-[6px]"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}
                >
                  Banner Desktop <span className="text-destructive">*</span>
                </label>
                <div className="flex items-center gap-[12px] w-full px-[16px] py-[12px] border border-[color:var(--border)]/30 rounded-[var(--radius)] bg-input-background">
                  <span className="flex-1 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {formData.desktopFileName || 'Belum ada file'}
                  </span>
                  <button
                    type="button"
                    onClick={() => document.getElementById('modal-banner-desktop')?.click()}
                    className="px-[20px] py-[8px] rounded-[var(--radius-button)] text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
                    style={{ fontSize: 'var(--text-sm)', backgroundColor: 'rgba(47, 48, 49, 1)' }}
                  >
                    Pilih file
                  </button>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="modal-banner-desktop"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData({ ...formData, desktopFileName: file.name });
                  }}
                />
                <p className="text-muted-foreground mt-[6px]" style={{ fontSize: 'var(--text-xs)' }}>
                  Rekomendasi ratio 2.618:1. Format: JPG, PNG. Maks: 2MB
                </p>
              </div>

              {/* Upload Banner Mobile */}
              <div>
                <label
                  className="block text-foreground mb-[6px]"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}
                >
                  Banner Mobile <span className="text-destructive">*</span>
                </label>
                <div className="flex items-center gap-[12px] w-full px-[16px] py-[12px] border border-[color:var(--border)]/30 rounded-[var(--radius)] bg-input-background">
                  <span className="flex-1 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {formData.mobileFileName || 'Belum ada file'}
                  </span>
                  <button
                    type="button"
                    onClick={() => document.getElementById('modal-banner-mobile')?.click()}
                    className="px-[20px] py-[8px] rounded-[var(--radius-button)] text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
                    style={{ fontSize: 'var(--text-sm)', backgroundColor: 'rgba(47, 48, 49, 1)' }}
                  >
                    Pilih file
                  </button>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="modal-banner-mobile"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData({ ...formData, mobileFileName: file.name });
                  }}
                />
                <p className="text-muted-foreground mt-[6px]" style={{ fontSize: 'var(--text-xs)' }}>
                  Rekomendasi ratio 3:2. Format: JPG, PNG. Maks: 2MB
                </p>
              </div>

              {/* Jadwal Publikasi & Jadwal Hilang */}
              <div className="grid grid-cols-2 gap-[16px]">
                {/* Jadwal Publikasi */}
                <div>
                  <label
                    className="block text-foreground mb-[6px]"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}
                  >
                    Jadwal Publikasi <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.jadwalPublikasi}
                    onChange={(e) => setFormData({ ...formData, jadwalPublikasi: e.target.value })}
                    className="w-full px-[12px] py-[10px] border border-sd-gray-50 rounded-[4px] bg-white text-foreground outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>

                {/* Jadwal Informasi Hilang */}
                <div>
                  <label
                    className="block text-foreground mb-[6px]"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}
                  >
                    Jadwal Informasi Hilang <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.jadwalHilang}
                    onChange={(e) => setFormData({ ...formData, jadwalHilang: e.target.value })}
                    className="w-full px-[12px] py-[10px] border border-sd-gray-50 rounded-[4px] bg-white text-foreground outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-[color:var(--border)]/20 mx-[24px]" />

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-[24px] py-[16px] sticky bottom-0 bg-card">
              <button
                onClick={handleCancel}
                className="px-[20px] py-[8px] border border-[color:var(--border)]/30 rounded-[var(--radius-button)] text-foreground hover:bg-muted/50 transition-colors bg-card"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`px-[20px] py-[8px] rounded-[var(--radius-button)] transition-opacity ${
                  isFormValid
                    ? 'text-primary-foreground hover:opacity-90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
                style={isFormValid ? { fontSize: 'var(--text-sm)', backgroundColor: 'rgba(47, 48, 49, 1)' } : { fontSize: 'var(--text-sm)' }}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Informasi Sistem Content ─── */

interface InformasiSistemItem {
  id: number;
  judul: string;
  isi: string;
  status: 'Aktif' | 'Dijadwalkan' | 'Dihentikan';
  jadwalPublikasi: string;
  jadwalHilang: string;
  tanggalDibuat: string;
}

interface InfoSistemFormData {
  judul: string;
  isi: string;
  jadwalPublikasi: string;
  jadwalHilang: string;
}

const emptyInfoSistemForm: InfoSistemFormData = {
  judul: '',
  isi: '',
  jadwalPublikasi: '',
  jadwalHilang: '',
};

function InformasiSistemContent() {
  const [items, setItems] = useState<InformasiSistemItem[]>([
    {
      id: 1,
      judul: 'Pemeliharaan Sistem Maret 2026',
      isi: '<p>Pemeliharaan sistem akan dilakukan pada tanggal 20 Maret 2026 pukul 22:00 - 04:00 WIB. Selama periode tersebut, beberapa layanan mungkin tidak dapat diakses.</p>',
      status: 'Aktif',
      jadwalPublikasi: '2026-03-15',
      jadwalHilang: '2026-03-21',
      tanggalDibuat: '15 Maret 2026',
    },
    {
      id: 2,
      judul: 'Pengisian LKP Triwulan I 2026',
      isi: '<p>Pengisian Laporan Kinerja Pegawai (LKP) Triwulan I 2026 telah dibuka. Silakan akses melalui menu e-Kinerja.</p>',
      status: 'Dijadwalkan',
      jadwalPublikasi: '2026-04-01',
      jadwalHilang: '2026-04-15',
      tanggalDibuat: '10 Maret 2026',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<InfoSistemFormData>(emptyInfoSistemForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showStopConfirm, setShowStopConfirm] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleOpenAdd = () => {
    setFormData(emptyInfoSistemForm);
    setEditingId(null);
    setShowModal(true);
  };

  const handleOpenEdit = (item: InformasiSistemItem) => {
    setFormData({
      judul: item.judul,
      isi: item.isi,
      jadwalPublikasi: item.jadwalPublikasi,
      jadwalHilang: item.jadwalHilang,
    });
    setEditingId(item.id);
    setShowModal(true);
    setOpenMenuId(null);
  };

  const handleSubmit = () => {
    if (!formData.judul.trim() || isQuillContentEmpty(formData.isi) || !formData.jadwalPublikasi || !formData.jadwalHilang) return;

    if (editingId !== null) {
      // Edit existing
      setItems(
        items.map((i) =>
          i.id === editingId
            ? { ...i, judul: formData.judul.trim(), isi: formData.isi, jadwalPublikasi: formData.jadwalPublikasi, jadwalHilang: formData.jadwalHilang }
            : i
        )
      );
    } else {
      // Add new — new info becomes Aktif, deactivate others (only 1 active at a time)
      const newId = Math.max(0, ...items.map((i) => i.id)) + 1;
      setItems([
        {
          id: newId,
          judul: formData.judul.trim(),
          isi: formData.isi,
          status: 'Aktif',
          jadwalPublikasi: formData.jadwalPublikasi,
          jadwalHilang: formData.jadwalHilang,
          tanggalDibuat: '17 Maret 2026',
        },
        ...items.map((i) =>
          i.status === 'Aktif' ? { ...i, status: 'Dihentikan' as const } : i
        ),
      ]);
    }

    setFormData(emptyInfoSistemForm);
    setEditingId(null);
    setShowModal(false);
  };

  const handleCancel = () => {
    setFormData(emptyInfoSistemForm);
    setEditingId(null);
    setShowModal(false);
  };

  const handleStop = (id: number) => {
    setItems(
      items.map((i) =>
        i.id === id ? { ...i, status: 'Dihentikan' as const } : i
      )
    );
    setShowStopConfirm(null);
    setOpenMenuId(null);
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
    setOpenMenuId(null);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getStatusBadge = (status: InformasiSistemItem['status']) => {
    switch (status) {
      case 'Aktif':
        return 'bg-chart-2/10 text-chart-2';
      case 'Dijadwalkan':
        return 'bg-primary/10 text-primary';
      case 'Dihentikan':
        return 'bg-muted text-muted-foreground';
    }
  };

  const isFormValid = formData.judul.trim() && !isQuillContentEmpty(formData.isi) && formData.jadwalPublikasi && formData.jadwalHilang;

  return (
    <div className="p-[32px] max-w-full">
      {/* Page Header */}
      <div className="mb-[24px]">
        <h2 className="text-foreground" style={{ fontSize: 'var(--text-xl)' }}>
          Informasi Sistem
        </h2>
        <p className="text-muted-foreground mt-[4px]" style={{ fontSize: 'var(--text-sm)' }}>
          Kelola informasi teks yang ditampilkan sebagai banner berwarna kuning di halaman utama portal. Hanya 1 informasi yang dapat aktif pada satu waktu.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-[16px] mb-[24px]">
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          {items.filter((i) => i.status === 'Aktif').length} informasi aktif
        </p>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-[6px] px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          <Plus style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
          <span style={{ fontSize: 'var(--text-sm)' }}>Tambah Informasi</span>
        </button>
      </div>

      {/* Preview Box */}
      {items.some((i) => i.status === 'Aktif') && (
        <div className="mb-[24px]">
          <p
            className="text-muted-foreground mb-[8px]"
            style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}
          >
            PREVIEW DI HALAMAN UTAMA
          </p>
          <div
            className="rounded-[var(--radius)] px-[16px] py-[12px] flex items-start gap-[10px]"
            style={{
              backgroundColor: 'rgba(255, 193, 7, 0.15)',
              border: '1px solid rgba(255, 193, 7, 0.3)',
            }}
          >
            <AlertTriangle
              className="shrink-0 mt-[2px]"
              style={{ width: '16px', height: '16px', color: 'var(--sd-yellow-30)' }}
            />
            <div>
              <p className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                {items.find((i) => i.status === 'Aktif')?.judul}
              </p>
              <div
                className="text-foreground mt-[2px] [&_p]:m-0"
                style={{ fontSize: 'var(--text-sm)' }}
                dangerouslySetInnerHTML={{ __html: items.find((i) => i.status === 'Aktif')?.isi || '' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="bg-card rounded-[var(--radius-card)] border border-[color:var(--border)]/20 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[60px_1fr_140px_140px_110px_80px] items-center px-[16px] py-[12px] border-b border-[color:var(--border)]/20 bg-muted/30">
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            NO
          </span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            INFORMASI
          </span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            JADWAL PUBLIKASI
          </span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            JADWAL HILANG
          </span>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            STATUS
          </span>
          <span className="text-muted-foreground text-center" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            AKSI
          </span>
        </div>

        {/* Table Body */}
        {items.length === 0 ? (
          <div className="px-[16px] py-[40px] text-center">
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              Belum ada informasi sistem.
            </p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[60px_1fr_140px_140px_110px_80px] px-[16px] py-[14px] border-b border-[color:var(--border)]/10 hover:bg-muted/20 transition-colors items-start"
            >
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {index + 1}
              </span>
              <div className="pr-[16px]">
                <p className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  {item.judul}
                </p>
                <p className="text-muted-foreground mt-[2px]" style={{ fontSize: 'var(--text-xs)' }}>
                  Dibuat: {item.tanggalDibuat}
                </p>
              </div>
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {formatDate(item.jadwalPublikasi)}
              </span>
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {formatDate(item.jadwalHilang)}
              </span>
              <div>
                <span
                  className={`inline-block px-[10px] py-[3px] rounded-[var(--radius)] ${getStatusBadge(item.status)}`}
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {item.status}
                </span>
              </div>
              <div className="flex justify-center relative">
                <button
                  onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                  className="p-[4px] hover:bg-muted/50 rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground"
                  title="Aksi"
                >
                  <MoreVertical style={{ width: 'var(--text-base)', height: 'var(--text-base)' }} />
                </button>

                {/* Dropdown Menu */}
                {openMenuId === item.id && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                    <div
                      className="absolute right-0 top-[32px] z-50 bg-card rounded-[var(--radius-card)] border border-[color:var(--border)]/20 py-[4px] min-w-[180px]"
                      style={{ boxShadow: 'none' }}
                    >
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-[8px] w-full px-[14px] py-[8px] text-destructive hover:bg-destructive/5 transition-colors text-left"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        <Trash2 style={{ width: 'var(--text-sm)', height: 'var(--text-sm)' }} />
                        Hapus
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stop Confirmation Modal */}
      {showStopConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowStopConfirm(null)} />
          <div
            className="relative bg-card rounded-[var(--radius-card)] w-full max-w-[420px] mx-[16px] p-[24px]"
            style={{ border: '1px solid rgba(128, 132, 137, 0.2)' }}
          >
            <div className="flex items-center gap-[12px] mb-[16px]">
              <div
                className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(237, 166, 43, 0.15)' }}
              >
                <StopCircle style={{ width: '20px', height: '20px', color: 'var(--chart-4)' }} />
              </div>
              <div>
                <h3
                  className="text-foreground"
                  style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}
                >
                  Hentikan Informasi?
                </h3>
                <p className="text-muted-foreground mt-[4px]" style={{ fontSize: 'var(--text-sm)' }}>
                  Informasi ini akan dihentikan dan tidak lagi ditampilkan di halaman utama.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[8px] justify-end">
              <button
                onClick={() => setShowStopConfirm(null)}
                className="px-[16px] py-[8px] border border-[color:var(--border)]/30 rounded-[var(--radius-button)] text-foreground hover:bg-muted/50 transition-colors bg-card"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Batal
              </button>
              <button
                onClick={() => handleStop(showStopConfirm)}
                className="px-[16px] py-[8px] rounded-[var(--radius-button)] text-primary-foreground hover:opacity-90 transition-opacity"
                style={{ fontSize: 'var(--text-sm)', backgroundColor: 'var(--chart-4)' }}
              >
                Ya, Hentikan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={handleCancel} />

          {/* Modal Content */}
          <div
            className="relative bg-card rounded-[var(--radius-card)] w-full max-w-[640px] max-h-[90vh] overflow-y-auto mx-[16px]"
            style={{ border: '1px solid rgba(128, 132, 137, 0.2)' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-[24px] pt-[24px] pb-[20px]">
              <h3
                className="text-foreground"
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {editingId !== null ? 'Edit Informasi Sistem' : 'Tambah Informasi Baru'}
              </h3>
              <button
                onClick={handleCancel}
                className="p-[4px] hover:bg-muted/50 rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground"
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Divider */}
            <div className="border-b border-[color:var(--border)]/20 mx-[24px]" />

            {/* Modal Body */}
            <div className="px-[24px] py-[24px] space-y-[20px]">
              {/* Judul Informasi */}
              <div>
                <label
                  className="block text-foreground mb-[6px]"
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Judul Informasi <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan judul informasi"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full px-[12px] py-[10px] border border-sd-gray-50 rounded-[4px] bg-white text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>

              {/* Isi Informasi */}
              <div>
                <label
                  className="block text-foreground mb-[6px]"
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Isi Informasi <span className="text-destructive">*</span>
                </label>
                <div className="border border-[color:var(--border)]/30 rounded-[var(--radius)] overflow-hidden rich-text-editor">
                  <ReactQuill
                    value={formData.isi}
                    onChange={(value) => setFormData({ ...formData, isi: value })}
                    placeholder="Masukkan isi informasi yang akan ditampilkan sebagai banner kuning di halaman utama..."
                    theme="snow"
                    modules={{
                      toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link'],
                        ['clean']
                      ]
                    }}
                    style={{ height: '150px' }}
                  />
                </div>
              </div>

              {/* Schedule Fields Row */}
              <div className="grid grid-cols-2 gap-[16px]">
                {/* Jadwal Publikasi */}
                <div>
                  <label
                    className="block text-foreground mb-[6px]"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    Jadwal Publikasi <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.jadwalPublikasi}
                      onChange={(e) => setFormData({ ...formData, jadwalPublikasi: e.target.value })}
                      className="w-full px-[12px] py-[10px] border border-sd-gray-50 rounded-[4px] bg-white text-foreground outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>
                </div>

                {/* Jadwal Hilang */}
                <div>
                  <label
                    className="block text-foreground mb-[6px]"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    Jadwal Informasi Hilang <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.jadwalHilang}
                      onChange={(e) => setFormData({ ...formData, jadwalHilang: e.target.value })}
                      className="w-full px-[12px] py-[10px] border border-sd-gray-50 rounded-[4px] bg-white text-foreground outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-[color:var(--border)]/20 mx-[24px]" />

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-[8px] px-[24px] py-[20px]">
              <button
                onClick={handleCancel}
                className="px-[16px] py-[8px] border border-[color:var(--border)]/30 rounded-[var(--radius-button)] text-foreground hover:bg-muted/50 transition-colors bg-card"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`px-[16px] py-[8px] rounded-[var(--radius-button)] transition-opacity ${
                  isFormValid
                    ? 'text-primary-foreground hover:opacity-90'
                    : 'text-muted-foreground bg-muted cursor-not-allowed'
                }`}
                style={{
                  fontSize: 'var(--text-sm)',
                  backgroundColor: isFormValid ? 'rgba(47, 48, 49, 1)' : undefined,
                }}
              >
                {editingId !== null ? 'Simpan Perubahan' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}