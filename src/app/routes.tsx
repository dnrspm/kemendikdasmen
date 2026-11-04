import { createBrowserRouter, useNavigate, useParams, Outlet } from 'react-router';
import PortalMainLayout from '@/app/components/PortalMainLayout';
import { PusatInformasi } from '@/app/components/PusatInformasi';
import { PusatBantuan } from '@/app/components/PusatBantuan';
import { KategoriDetail } from '@/app/components/KategoriDetail';
import { ArtikelDetail } from '@/app/components/ArtikelDetail';
import { OrganizationDirectory } from '@/app/components/OrganizationDirectory';
import { OrganizationDetail } from '@/app/components/OrganizationDetail';
import { AnalyticsPage } from '@/app/components/AnalyticsPage';
import { DaftarLayanan } from '@/app/components/DaftarLayanan';
import { RepositoriSurat } from '@/app/components/RepositoriSurat';
import { PetaJabatan } from '@/app/components/PetaJabatan';
import { ProjectManagement } from '@/app/components/ProjectManagement';
import { DasborEksekutifPage } from '@/app/pages/DasborEksekutifPage';
import { ProfilASNStagingPage } from '@/app/pages/ProfilASNStagingPage';
import { PemberitahuanPage } from '@/app/pages/PemberitahuanPage';
import { PengaturanUmumPage } from '@/app/pages/PengaturanUmumPage';
import { DataPribadiPage } from '@/app/pages/DataPribadiPage';
import { KepegawaianSubPage } from '@/app/pages/KepegawaianSubPage';
import { DataPegawaiAktifPage, DataPPPKPage, DataNonAktifPage } from '@/app/pages/ProfilPegawaiPages';
import { DaftarSemuaSKPage, KoreksiSKPage, TandaTanganSKPage, RiwayatSKIndividuPage, LogTandaTanganSKPage } from '@/app/pages/PengelolaanSKPages';
import { UbahPegawaiPage, DetailKeluargaPage } from '@/app/pages/UbahPegawaiPage';
import { VerifikasiPerubahanPage, VerifikasiDataKomitePage } from '@/app/pages/VerifikasiPerubahanPages';
import { PemetaanKonfigurasiPage, PergeseranJabatanPage, VerifikasiUsulanPergeseranPage, InventarisKepmenPage } from '@/app/pages/PemetaanJabatanPages';
import { MasterDataPage, UnitKerjaPage, masterDataSlugs } from '@/app/pages/MasterDataPages';
import { RolePage, UserPage, PemberitahuanUmumPage, InformasiSistemPage, BannerUtamaPage } from '@/app/pages/PengaturanUmumStaging';
import { Navigate } from 'react-router';
import { UbahDataPribadiPage, TambahPasanganPage, TambahOrangTuaPage } from '@/app/pages/FormKepegawaianPages';
import { KartuPegawaiPage } from '@/app/pages/KartuPegawaiPage';
import { kepegawaianGroups } from '@/app/components/KepegawaianLayout';
import { organizations } from '@/app/data/organizationData';
import { getArticleData, getCategoryData } from '@/app/data/articleData';
import { Toaster } from 'sonner';

/* ─── Root Layout ─── */
function RootLayout() {
  return (
    <div className="size-full bg-background">
      <Outlet />
      <Toaster position="top-right" richColors />
    </div>
  );
}

/* ─── Page Wrappers ─── */

function HomePage() {
  const navigate = useNavigate();
  return (
    <PortalMainLayout
      onNavigateToPusatInformasi={() => navigate('/pusat-informasi')}
      onNavigateToOrganizations={() => navigate('/organisasi')}
      onNavigateToLayanan={() => navigate('/layanan')}
      onNavigateToPemberitahuan={() => navigate('/pemberitahuan')}
      onNavigateToPengaturanUmum={() => navigate('/pengaturan')}
      onNavigateToManajemenSKP={() => navigate('/manajemen-proyek')}
      onNavigateToDashboardAnalitik={() => navigate('/dashboard-analitik')}
      onNavigateToDataPribadi={() => navigate('/kepegawaian')}
      onNavigateToProfilASN={() => navigate('/profil-asn')}
    />
  );
}

function PusatInformasiPage() {
  const navigate = useNavigate();
  return (
    <PusatInformasi
      onBack={() => navigate('/')}
      onNavigateToPusatBantuan={() => navigate('/pusat-bantuan')}
      onNavigateToKategori={(categoryTitle: string) => navigate(`/kategori/${encodeURIComponent(categoryTitle)}`)}
      onNavigateToOrganizations={() => navigate('/organisasi')}
      onNavigateToAnalytics={(orgId: string) => navigate(`/organisasi/${orgId}/analytics`)}
      onNavigateToLayanan={() => navigate('/layanan')}
      onNavigateToRepositoriSurat={() => navigate('/layanan/repositori-surat')}
      onNavigateToProjectManagement={(orgId?: string) => orgId ? navigate(`/organisasi/${orgId}/proyek`) : navigate('/organisasi')}
      onNavigateToPemberitahuan={() => navigate('/pemberitahuan')}
    />
  );
}

function PusatBantuanPage() {
  const navigate = useNavigate();
  return (
    <PusatBantuan
      onBack={() => navigate('/')}
      onNavigateToPusatInformasi={() => navigate('/pusat-informasi')}
    />
  );
}

function KategoriDetailPage() {
  const navigate = useNavigate();
  const { categoryTitle } = useParams();
  const decodedTitle = decodeURIComponent(categoryTitle || '');
  const categoryData = getCategoryData(decodedTitle);

  if (!categoryData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 style={{ fontSize: 'var(--text-xl)' }}>Kategori tidak ditemukan</h2>
          <button
            onClick={() => navigate('/pusat-informasi')}
            className="mt-[16px] px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[var(--radius-button)]"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            Kembali ke Pusat Informasi
          </button>
        </div>
      </div>
    );
  }

  return (
    <KategoriDetail
      category={categoryData}
      onBack={() => navigate('/')}
      onBackToPusatInformasi={() => navigate('/pusat-informasi')}
      onNavigateToArtikel={(articleId: string) => navigate(`/artikel/${encodeURIComponent(decodedTitle)}/${articleId}`)}
    />
  );
}

function ArtikelDetailPage() {
  const navigate = useNavigate();
  const { categoryTitle, articleId } = useParams();
  const decodedCategory = decodeURIComponent(categoryTitle || '');
  const articleData = getArticleData(articleId || '');

  if (!articleData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 style={{ fontSize: 'var(--text-xl)' }}>Artikel tidak ditemukan</h2>
          <button
            onClick={() => navigate('/pusat-informasi')}
            className="mt-[16px] px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[var(--radius-button)]"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            Kembali ke Pusat Informasi
          </button>
        </div>
      </div>
    );
  }

  return (
    <ArtikelDetail
      article={articleData}
      categoryName={decodedCategory}
      onBack={() => navigate('/')}
      onBackToPusatInformasi={() => navigate('/pusat-informasi')}
      onBackToCategory={() => navigate(`/kategori/${encodeURIComponent(decodedCategory)}`)}
      onNavigateToPusatBantuan={() => navigate('/pusat-bantuan')}
    />
  );
}

function OrganizationDirectoryPage() {
  const navigate = useNavigate();
  return (
    <OrganizationDirectory
      onBack={() => navigate('/')}
      onNavigateToDetail={(orgId: string) => navigate(`/organisasi/${orgId}`)}
      onNavigateToAnalytics={(orgId: string) => navigate(`/organisasi/${orgId}/analytics`)}
    />
  );
}

function OrganizationDetailPage() {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const organization = organizations.find(org => org.id === orgId);

  if (!organization) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 style={{ fontSize: 'var(--text-xl)' }}>Organisasi tidak ditemukan</h2>
          <button
            onClick={() => navigate('/organisasi')}
            className="mt-[16px] px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[var(--radius-button)]"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            Kembali ke Direktori
          </button>
        </div>
      </div>
    );
  }

  return (
    <OrganizationDetail
      organization={organization}
      onBack={() => navigate('/')}
      onBackToDirectory={() => navigate('/organisasi')}
      onNavigateToAnalytics={(id: string) => navigate(`/organisasi/${id}/analytics`)}
      onNavigateToProjectManagement={(id?: string) => navigate(`/organisasi/${id || orgId}/proyek`)}
    />
  );
}

function AnalyticsPageWrapper() {
  const navigate = useNavigate();
  const { orgId } = useParams();

  if (orgId === 'keseluruhan') {
    return (
      <AnalyticsPage
        organization={{
          id: 'keseluruhan',
          name: 'Analytics Unit Utama Kemendikdasmen',
          short_name: 'Analytics Keseluruhan',
          category: 'Analitik',
          short_description: 'Data analytics gabungan dari 7 unit utama',
          description: 'Halaman analytics yang menampilkan data gabungan dari semua unit utama di Kemendikdasmen',
          vision: '',
          mission: [],
          services: [],
          members: [],
          contact: {
            email: '',
            phone: '',
            location: '',
            office_hours: ''
          },
          announcements: [],
          documents: [],
          is_active: true,
          created_at: '',
          updated_at: ''
        }}
        onBack={() => navigate('/')}
        onBackToDirectory={() => navigate('/organisasi')}
        onBackToDetail={() => navigate('/organisasi')}
      />
    );
  }

  const organization = organizations.find(org => org.id === orgId);

  if (!organization) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 style={{ fontSize: 'var(--text-xl)' }}>Organisasi tidak ditemukan</h2>
          <button
            onClick={() => navigate('/organisasi')}
            className="mt-[16px] px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[var(--radius-button)]"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            Kembali ke Direktori
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnalyticsPage
      organization={organization}
      onBack={() => navigate('/')}
      onBackToDirectory={() => navigate('/organisasi')}
      onBackToDetail={() => navigate(`/organisasi/${orgId}`)}
    />
  );
}

function ProjectManagementPage() {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const organization = organizations.find(org => org.id === orgId);

  if (!organization) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 style={{ fontSize: 'var(--text-xl)' }}>Organisasi tidak ditemukan</h2>
          <button
            onClick={() => navigate('/organisasi')}
            className="mt-[16px] px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[var(--radius-button)]"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            Kembali ke Direktori
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProjectManagement
      organization={organization}
      onBack={() => navigate(`/organisasi/${orgId}`)}
      onBackToHome={() => navigate('/')}
      onBackToDirectory={() => navigate('/organisasi')}
    />
  );
}

function ManajemenSKPPage() {
  const navigate = useNavigate();
  // Default ke Sekretariat Jenderal untuk Sasaran Kinerja Pegawai
  const defaultOrgId = 'sekretariat-jenderal';
  const organization = organizations.find(org => org.id === defaultOrgId);

  if (!organization) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 style={{ fontSize: 'var(--text-xl)' }}>Organisasi tidak ditemukan</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-[16px] px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[var(--radius-button)]"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProjectManagement
      organization={organization}
      onBack={() => navigate('/')}
      onBackToHome={() => navigate('/')}
      onBackToDirectory={() => navigate('/organisasi')}
    />
  );
}

function DaftarLayananPage() {
  const navigate = useNavigate();
  return (
    <DaftarLayanan
      onBack={() => navigate('/')}
      onNavigateToRepositoriSurat={() => navigate('/layanan/repositori-surat')}
      onNavigateToPetaJabatan={() => navigate('/layanan/peta-jabatan')}
    />
  );
}

function RepositoriSuratPage() {
  const navigate = useNavigate();
  return (
    <RepositoriSurat
      onBack={() => navigate('/')}
    />
  );
}

function PetaJabatanPage() {
  const navigate = useNavigate();
  return (
    <PetaJabatan
      onBack={() => navigate('/')}
      onNavigateToLayanan={() => navigate('/layanan')}
    />
  );
}

function PemberitahuanPageWrapper() {
  const navigate = useNavigate();
  return (
    <PemberitahuanPage
      onBack={() => navigate('/')}
    />
  );
}

function PengaturanUmumPageWrapper() {
  const navigate = useNavigate();
  return (
    <PengaturanUmumPage
      onBack={() => navigate('/')}
    />
  );
}

function DashboardAnalitikPage() {
  const navigate = useNavigate();
  return (
    <DasborEksekutifPage onBack={() => navigate('/')} />
  );
}

function ProfilASNPageWrapper() {
  const navigate = useNavigate();
  return (
    <ProfilASNStagingPage onBack={() => navigate('/')} />
  );
}

function DataPribadiPageWrapper() {
  const navigate = useNavigate();
  return (
    <DataPribadiPage
      onBack={() => navigate('/')}
    />
  );
}

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-foreground mb-[8px]" style={{ fontSize: 'var(--text-2xl)' }}>
          404
        </h2>
        <p className="text-muted-foreground mb-[24px]" style={{ fontSize: 'var(--text-base)' }}>
          Halaman tidak ditemukan
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-[20px] py-[10px] bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:opacity-90 transition-opacity"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

/* ─── Router Config ─── */

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'pusat-informasi', Component: PusatInformasiPage },
      { path: 'pusat-bantuan', Component: PusatBantuanPage },
      { path: 'kategori/:categoryTitle', Component: KategoriDetailPage },
      { path: 'artikel/:categoryTitle/:articleId', Component: ArtikelDetailPage },
      { path: 'organisasi', Component: OrganizationDirectoryPage },
      { path: 'organisasi/:orgId', Component: OrganizationDetailPage },
      { path: 'organisasi/:orgId/analytics', Component: AnalyticsPageWrapper },
      { path: 'organisasi/:orgId/proyek', Component: ProjectManagementPage },
      { path: 'layanan', Component: DaftarLayananPage },
      { path: 'layanan/repositori-surat', Component: RepositoriSuratPage },
      { path: 'layanan/peta-jabatan', Component: PetaJabatanPage },
      { path: 'pemberitahuan', Component: PemberitahuanPageWrapper },
      { path: 'pengaturan', Component: () => <Navigate to="/pengaturan/role" replace /> },
      { path: 'pengaturan/role', Component: RolePage },
      { path: 'pengaturan/user', Component: UserPage },
      { path: 'pengaturan/pemberitahuan-umum', Component: PemberitahuanUmumPage },
      { path: 'pengaturan/informasi-sistem', Component: InformasiSistemPage },
      { path: 'pengaturan/banner-utama', Component: BannerUtamaPage },
      { path: 'manajemen-proyek', Component: ManajemenSKPPage },
      { path: 'dashboard-analitik', Component: DashboardAnalitikPage },
      { path: 'profil-asn', Component: ProfilASNPageWrapper },
      { path: 'data-pribadi', Component: DataPribadiPageWrapper },
      { path: 'kepegawaian', Component: DataPribadiPageWrapper },
      { path: 'profil/:token', Component: KartuPegawaiPage },
      { path: 'kepegawaian/ubah-data-pribadi', Component: UbahDataPribadiPage },
      { path: 'kepegawaian/keluarga/pasangan/tambah', Component: TambahPasanganPage },
      { path: 'kepegawaian/keluarga/orang-tua/tambah', Component: TambahOrangTuaPage },
      { path: 'kepegawaian/data-pegawai-aktif', Component: DataPegawaiAktifPage },
      { path: 'kepegawaian/ubah-pegawai/:nip', Component: UbahPegawaiPage },
      { path: 'kepegawaian/ubah-pegawai/:nip/:jenis/:idx', Component: DetailKeluargaPage },
      { path: 'kepegawaian/data-pppk', Component: DataPPPKPage },
      { path: 'kepegawaian/data-nonaktif', Component: DataNonAktifPage },
      { path: 'kepegawaian/verifikasi-perubahan', Component: VerifikasiPerubahanPage },
      { path: 'kepegawaian/verifikasi-komite', Component: VerifikasiDataKomitePage },
      { path: 'surat-keputusan/daftar-surat', Component: DaftarSemuaSKPage },
      { path: 'surat-keputusan/daftar-koreksi', Component: KoreksiSKPage },
      { path: 'surat-keputusan/daftar-tanda-tangan', Component: TandaTanganSKPage },
      { path: 'surat-keputusan/riwayat-individu', Component: RiwayatSKIndividuPage },
      { path: 'surat-keputusan/log-tanda-tangan', Component: LogTandaTanganSKPage },
      { path: 'pemetaan-jabatan/pemetaan-konfigurasi', Component: PemetaanKonfigurasiPage },
      { path: 'pemetaan-jabatan/pergeseran-jabatan', Component: PergeseranJabatanPage },
      { path: 'pemetaan-jabatan/verifikasi-usulan-pergeseran', Component: VerifikasiUsulanPergeseranPage },
      { path: 'pemetaan-jabatan/inventaris-kepmen-peta-jabatan', Component: InventarisKepmenPage },
      ...masterDataSlugs.map((slug) => ({ path: `master-data/${slug}`, Component: () => <MasterDataPage slug={slug} /> })),
      { path: 'master-data/unit-kerja', Component: UnitKerjaPage },
      ...kepegawaianGroups.flatMap((g) => g.children).filter((c) => !c.path.startsWith('/kepegawaian/') && !c.path.startsWith('/surat-keputusan/') && !c.path.startsWith('/pemetaan-jabatan/') && !c.path.startsWith('/master-data/')).map((c) => ({ path: c.path.slice(1), Component: KepegawaianSubPage })),
      { path: '*', Component: NotFoundPage },
    ],
  },
]);