import { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  Home, 
  ChevronRight,
  MapPin,
  FileText,
  Download,
  ClipboardList,
  TrendingUp,
  Building2,
  FolderKanban,
  GitBranch,
  History,
  BookOpen,
  BarChart3,
  Award,
  Database,
  FileCheck,
  Activity,
  ClipboardCheck,
  FileSearch,
  FilePlus,
  Eye,
  Shield,
  BadgeCheck,
  AlertCircle,
  UserCheck,
  Users,
  ArrowRightLeft,
  Trophy
} from 'lucide-react';
import { Header } from '@/app/components/Header';

interface LayananItem {
  id: string;
  name: string;
  description: string;
  timKerja: string;
  icon: any;
}

interface DaftarLayananProps {
  onBack: () => void;
  onNavigateToRepositoriSurat?: () => void;
  onNavigateToPetaJabatan?: () => void;
}

export function DaftarLayanan({ onBack, onNavigateToRepositoriSurat, onNavigateToPetaJabatan }: DaftarLayananProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<string>('Analisis Jabatan');
  const [isUserClick, setIsUserClick] = useState(false);
  
  // Refs for each section
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Data layanan grouped by Tim Kerja
  const layananData: LayananItem[] = [
    // Analisis Jabatan
    { 
      id: 'aj-1', 
      name: 'Peta Jabatan', 
      description: 'Visualisasi persebaran jabatan per satker',
      timKerja: 'Analisis Jabatan',
      icon: MapPin
    },
    { 
      id: 'aj-2', 
      name: 'Informasi Angka Kebutuhan Jabatan', 
      description: 'Data kebutuhan jabatan per unit',
      timKerja: 'Analisis Jabatan',
      icon: FileText
    },
    { 
      id: 'aj-3', 
      name: 'Repositori Surat Persetujuan Kebutuhan JF', 
      description: 'Unduh surat persetujuan kebutuhan JF',
      timKerja: 'Analisis Jabatan',
      icon: FileText
    },
    { 
      id: 'aj-4', 
      name: 'Ajukan Permohonan Analisis Jabatan', 
      description: 'Pengajuan kebutuhan analisis jabatan baru',
      timKerja: 'Analisis Jabatan',
      icon: ClipboardList
    },
    { 
      id: 'aj-5', 
      name: 'Track Usulan Analisis Jabatan', 
      description: 'Monitoring status usulan',
      timKerja: 'Analisis Jabatan',
      icon: TrendingUp
    },

    // Kelembagaan Organisasi
    { 
      id: 'ko-1', 
      name: 'Lihat Struktur Organisasi', 
      description: 'Struktur organisasi terkini',
      timKerja: 'Kelembagaan Organisasi',
      icon: Building2
    },
    { 
      id: 'ko-2', 
      name: 'Lihat Profil Satuan Kerja', 
      description: 'Data lengkap satuan kerja',
      timKerja: 'Kelembagaan Organisasi',
      icon: FolderKanban
    },
    { 
      id: 'ko-3', 
      name: 'Ajukan Penataan Organisasi', 
      description: 'Usulan pembentukan/perubahan organisasi',
      timKerja: 'Kelembagaan Organisasi',
      icon: GitBranch
    },
    { 
      id: 'ko-4', 
      name: 'Track Usulan Penataan Organisasi', 
      description: 'Monitoring status usulan',
      timKerja: 'Kelembagaan Organisasi',
      icon: History
    },
    { 
      id: 'ko-5', 
      name: 'Informasi Regulasi Penataan Organisasi', 
      description: 'Aturan & pedoman penataan',
      timKerja: 'Kelembagaan Organisasi',
      icon: BookOpen
    },

    // Pemantauan Pelayanan Publik
    { 
      id: 'ppp-1', 
      name: 'Lihat Nilai Evaluasi Organisasi', 
      description: 'Monitoring evaluasi organisasi',
      timKerja: 'Pemantauan Pelayanan Publik',
      icon: BarChart3
    },
    { 
      id: 'ppp-2', 
      name: 'Lihat Capaian ZI/RB', 
      description: 'Monitoring capaian ZI dan RB',
      timKerja: 'Pemantauan Pelayanan Publik',
      icon: Award
    },
    { 
      id: 'ppp-3', 
      name: 'Input Data Dukungan Pelayanan Publik', 
      description: 'Input data dukungan pelayanan publik',
      timKerja: 'Pemantauan Pelayanan Publik',
      icon: Database
    },
    { 
      id: 'ppp-4', 
      name: 'Track Pengajuan Nilai Pelayanan Publik', 
      description: 'Monitoring status pengajuan',
      timKerja: 'Pemantauan Pelayanan Publik',
      icon: FileCheck
    },
    { 
      id: 'ppp-5', 
      name: 'Monitoring IPP', 
      description: 'Monitoring Indeks Kepuasan Pelanggan',
      timKerja: 'Pemantauan Pelayanan Publik',
      icon: Activity
    },
    { 
      id: 'ppp-6', 
      name: 'Laporan Evaluasi Pelayanan Publik', 
      description: 'Laporan evaluasi pelayanan publik',
      timKerja: 'Pemantauan Pelayanan Publik',
      icon: ClipboardCheck
    },

    // Tata Laksana
    { 
      id: 'tl-1', 
      name: 'Cari SOP / POS', 
      description: 'Pencarian SOP dan POS',
      timKerja: 'Tata Laksana',
      icon: FileSearch
    },
    { 
      id: 'tl-2', 
      name: 'Ajukan Penyusunan POS AP Makro', 
      description: 'Pengajuan penyusunan POS AP Makro',
      timKerja: 'Tata Laksana',
      icon: FilePlus
    },
    { 
      id: 'tl-3', 
      name: 'Ajukan Penyusunan POS AP Mikro', 
      description: 'Pengajuan penyusunan POS AP Mikro',
      timKerja: 'Tata Laksana',
      icon: Eye
    },
    { 
      id: 'tl-4', 
      name: 'Monitoring Penerapan POS AP', 
      description: 'Monitoring penerapan POS AP',
      timKerja: 'Tata Laksana',
      icon: Shield
    },
    { 
      id: 'tl-5', 
      name: 'Fasilitasi Pembuatan Tanda Pengenal', 
      description: 'Pengajuan pembuatan tanda pengenal',
      timKerja: 'Tata Laksana',
      icon: BadgeCheck
    },

    // Administrasi Kepegawaian
    { 
      id: 'ak-1', 
      name: 'Kenaikan Pangkat', 
      description: 'Pengajuan kenaikan pangkat',
      timKerja: 'Administrasi Kepegawaian',
      icon: AlertCircle
    },
    { 
      id: 'ak-2', 
      name: 'Pengangkatan / Pemberhentian', 
      description: 'Pengajuan pengangkatan/pemberhentian',
      timKerja: 'Administrasi Kepegawaian',
      icon: UserCheck
    },
    { 
      id: 'ak-3', 
      name: 'Track Usulan Pensiun Saya', 
      description: 'Monitoring status pensiun',
      timKerja: 'Administrasi Kepegawaian',
      icon: Users
    },
    { 
      id: 'ak-4', 
      name: 'Track Sanksi Disiplin', 
      description: 'Monitoring status sanksi disiplin',
      timKerja: 'Administrasi Kepegawaian',
      icon: ArrowRightLeft
    },

    // Mutasi & Promosi
    { 
      id: 'mp-1', 
      name: 'Ajukan Mutasi', 
      description: 'Pengajuan mutasi jabatan',
      timKerja: 'Mutasi & Promosi',
      icon: Trophy
    },
    { 
      id: 'mp-2', 
      name: 'Ajukan Promosi Jabatan', 
      description: 'Pengajuan promosi jabatan',
      timKerja: 'Mutasi & Promosi',
      icon: MapPin
    },
    { 
      id: 'mp-3', 
      name: 'Track Usulan Mutasi', 
      description: 'Monitoring status mutasi',
      timKerja: 'Mutasi & Promosi',
      icon: FileText
    },
    { 
      id: 'mp-4', 
      name: 'Track Usulan Promosi', 
      description: 'Monitoring status promosi',
      timKerja: 'Mutasi & Promosi',
      icon: Download
    }
  ];

  // Group layanan by Tim Kerja
  const timKerjaList = [
    'Analisis Jabatan',
    'Kelembagaan Organisasi',
    'Pemantauan Pelayanan Publik',
    'Tata Laksana',
    'Administrasi Kepegawaian',
    'Mutasi & Promosi'
  ];

  // Filter layanan based on search
  const filteredLayanan = useMemo(() => {
    if (!searchQuery) return layananData;
    
    return layananData.filter(layanan =>
      layanan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      layanan.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      layanan.timKerja.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Group filtered layanan by Tim Kerja
  const groupedLayanan = useMemo(() => {
    const grouped: { [key: string]: LayananItem[] } = {};
    
    timKerjaList.forEach(timKerja => {
      grouped[timKerja] = filteredLayanan.filter(layanan => layanan.timKerja === timKerja);
    });
    
    return grouped;
  }, [filteredLayanan]);

  // Check if any results found
  const hasResults = filteredLayanan.length > 0;

  // Scroll to active section ONLY when menu clicked
  useEffect(() => {
    if (isUserClick && activeSection && sectionRefs.current[activeSection]) {
      const element = sectionRefs.current[activeSection];
      if (element) {
        const offset = 100; // Offset for fixed header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Reset flag after scroll
        setIsUserClick(false);
      }
    }
  }, [activeSection, isUserClick]);

  // Intersection Observer to track active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is ~20% from top
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    Object.entries(sectionRefs.current).forEach(([key, element]) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredLayanan]);

  return (
    <div className="bg-[#f9f9f9] min-h-screen w-full">
      {/* Header */}
      <Header onLogoClick={onBack} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#EFEFEF]">
        <div className="max-w-[1440px] mx-auto px-[24px] py-[16px]">
          <nav className="flex items-center gap-[8px]" aria-label="Breadcrumb">
            <button
              onClick={onBack}
              className="flex items-center gap-[6px] text-[var(--text-sm)] text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="w-[16px] h-[16px]" />
              <span>Beranda</span>
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <span className="text-[var(--text-sm)] text-foreground font-[var(--font-weight-medium)]">
              Layanan
            </span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-[#EFEFEF]">
        <div className="max-w-[1280px] mx-auto px-[24px] py-[32px]">
          <div className="mb-[24px]">
            <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[8px]">
              Layanan Portal Kemdikdasmen
            </h1>
            <p className="text-[var(--text-base)] text-[#656a6c]">
              Temukan dan akses layanan kepegawaian, organisasi, dan pelatihan dalam satu platform
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-[#808489]" />
            <input
              type="text"
              placeholder="Cari layanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] pl-[48px] pr-[16px] border border-[#808489] rounded-[4px] text-[16px] text-[#2f3031] placeholder:text-[#808489] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-[24px] py-[40px]">
        {hasResults ? (
          <div className="flex gap-[32px]">
            {/* Side Navigation - Sticky */}
            <aside className="w-[240px] shrink-0 hidden lg:block">
              <div className="sticky top-[24px]">
                <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-[16px]">
                  <h3 className="text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] mb-[12px] uppercase tracking-wider">Kategori LayanaN</h3>
                  <nav className="space-y-[4px]">
                    {timKerjaList.map((timKerja) => {
                      const items = groupedLayanan[timKerja];
                      if (items.length === 0) return null;

                      const isActive = activeSection === timKerja;

                      return (
                        <button
                          key={timKerja}
                          onClick={() => {
                            setActiveSection(timKerja);
                            setIsUserClick(true);
                          }}
                          className={`w-full text-left px-[12px] py-[8px] rounded-[4px] text-[var(--text-sm)] transition-all ${
                            isActive
                              ? 'bg-[#EBF2FF] text-[#1A5BA6] font-[var(--font-weight-medium)]'
                              : 'text-[#656a6c] hover:bg-[#F9FAFB] hover:text-[#2f3031]'
                          }`}
                        >
                          {timKerja}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-[48px]">
              {timKerjaList.map((timKerja) => {
                const items = groupedLayanan[timKerja];
                if (items.length === 0) return null;

                return (
                  <div key={timKerja} ref={el => sectionRefs.current[timKerja] = el} data-section={timKerja}>
                    {/* Tim Kerja Header */}
                    <h2 className="text-[var(--text-xl)] font-[var(--font-weight-bold)] text-[#2f3031] mb-[16px]">
                      {timKerja}
                    </h2>

                    {/* Service Cards - 2 Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                      {items.map((layanan) => {
                        const Icon = layanan.icon;
                        
                        return (
                          <button
                            key={layanan.id}
                            onClick={() => {
                              if (layanan.id === 'aj-1' && onNavigateToPetaJabatan) {
                                onNavigateToPetaJabatan();
                              }
                              if (layanan.id === 'aj-3' && onNavigateToRepositoriSurat) {
                                onNavigateToRepositoriSurat();
                              }
                            }}
                            className="group w-full bg-white border border-[#E2E8F0] rounded-[8px] p-[20px] hover:border-[#1A5BA6] hover:shadow-sm transition-all text-left"
                          >
                            <div className="flex items-start gap-[16px]">
                              {/* Icon Container */}
                              <div className="w-[48px] h-[48px] rounded-[8px] bg-[#EBF2FF] flex items-center justify-center shrink-0">
                                <Icon className="w-[24px] h-[24px] text-[#1A5BA6]" />
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[8px]">
                                  {layanan.name}
                                </h3>
                                <p className="text-[var(--text-sm)] text-[#656a6c] leading-relaxed">
                                  {layanan.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[64px] text-center">
            <div className="max-w-[400px] mx-auto">
              <Search className="w-[64px] h-[64px] text-[#808489] mx-auto mb-[16px]" />
              <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[8px]">
                Layanan Tidak Ditemukan
              </h3>
              <p className="text-[var(--text-sm)] text-[#656a6c] mb-[24px]">
                Coba gunakan kata kunci yang berbeda atau hapus pencarian
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-[24px] py-[12px] bg-primary text-primary-foreground rounded-[4px] text-[var(--text-base)] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity"
              >
                Reset Pencarian
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}