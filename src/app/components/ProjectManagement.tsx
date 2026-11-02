import { useState } from 'react';
import { ChevronRight, ChevronDown, Home, FolderKanban, ListTodo, Map, Target, TrendingUp } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Organization, organizations } from '@/app/data/organizationData';
import { ProjectKanban } from '@/app/components/project/ProjectKanban';
import { ProjectList } from '@/app/components/project/ProjectList';
import { SasaranProgramList } from '@/app/components/strategic/SasaranProgramList';
import { SasaranKinerjaList } from '@/app/components/strategic/SasaranKinerjaList';

interface ProjectManagementProps {
  organization: Organization;
  onBack: () => void;
  onBackToHome: () => void;
  onBackToDirectory: () => void;
}

type TabType = 'sasaran-program' | 'sasaran-kinerja' | 'sasaran-kinerja-pegawai' | 'rincian-skp';

export function ProjectManagement({
  organization,
  onBack,
  onBackToHome,
  onBackToDirectory
}: ProjectManagementProps) {
  // Get selected organization based on selectedUnitId
  const [selectedUnitId, setSelectedUnitId] = useState<string>(organization.id);
  const [periodFilter, setPeriodFilter] = useState<string>('bulan-ini');
  const [skpMenuOpen, setSkpMenuOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('sasaran-program');
  const [skFilters, setSkFilters] = useState<{ sasaranKinerjaId?: string; sasaranProgramId?: string; biroId?: string } | undefined>();
  const [skpFilters, setSkpFilters] = useState<{ epicId?: string; biroId?: string } | undefined>();

  // Handle navigation to SK with pre-filled filters
  const handleNavigateToSK = (skId: string, spId: string, biroId: string) => {
    setSkFilters({ sasaranKinerjaId: skId, sasaranProgramId: spId, biroId });
    setSkpFilters(undefined);
    setActiveTab('sasaran-kinerja');
  };

  // Handle navigation to SKP with pre-filled filters
  const handleNavigateToSKP = (epicId: string, biroId?: string) => {
    setSkpFilters({ epicId, biroId });
    setSkFilters(undefined);
    setActiveTab('sasaran-kinerja-pegawai');
  };

  const selectedOrganization = organizations.find(org => org.id === selectedUnitId) || organization;

  // Determine organization level based on category
  const getOrganizationLevel = () => {
    if (organization.category === 'Sekretariat') return 'sekretariat';
    if (organization.category === 'Unit Utama') return 'unit-utama';
    if (organization.category === 'Unit Kerja') return 'unit-kerja';
    return 'tim-kerja';
  };

  const level = getOrganizationLevel();

  return (
    <div className="bg-[#f9f9f9] min-h-screen w-full flex flex-col">
      {/* Header */}
      <Header onLogoClick={onBackToHome} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#EFEFEF]">
        <div className="px-[24px] py-[16px]">
          <nav className="flex items-center gap-[8px]" aria-label="Breadcrumb">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-[6px] text-[var(--text-sm)] text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="w-[16px] h-[16px]" />
              <span>Beranda</span>
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <span className="text-[var(--text-sm)] text-foreground font-[var(--font-weight-medium)]">Manajemen Tugas</span>
          </nav>
        </div>
      </div>

      {/* Page Header with Unit Selector */}
      <div className="bg-white border-b border-[#EFEFEF]">
        <div className="px-[24px] py-[20px] flex items-center justify-between">
          <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-[#2f3031]">Manajemen Tugas</h1>

          {/* Unit Utama Selector */}
          <div className="flex items-center gap-[8px]">
            <span className="text-[var(--text-sm)] text-[#656a6c]">Unit Utama:</span>
            <select
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(e.target.value)}
              className="px-[12px] py-[8px] border border-[#808489] rounded-[4px] text-[var(--text-sm)] text-[#2f3031] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            >
              {organizations.map(org => (
                <option key={org.id} value={org.id}>
                  {org.short_name || org.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[240px] bg-white border-r border-[#EFEFEF] overflow-y-auto sticky top-[64px] self-start h-[calc(100vh-64px)] z-40">
          <nav className="p-[16px]">
            <div className="space-y-[4px]">
              {/* Sasaran Program */}
              <button
                onClick={() => {
                  setActiveTab('sasaran-program');
                  setSkFilters(undefined);
                  setSkpFilters(undefined);
                }}
                className={`w-full flex items-center gap-[12px] px-[12px] py-[10px] text-[var(--text-sm)] font-[var(--font-weight-medium)] rounded-[6px] transition-colors ${
                  activeTab === 'sasaran-program'
                    ? 'bg-primary/10 text-primary'
                    : 'text-[#656a6c] hover:bg-[#f9f9f9] hover:text-foreground'
                }`}
              >
                <Target className="w-[18px] h-[18px]" />
                <span>Sasaran Program</span>
              </button>

              {/* Sasaran Kinerja */}
              <button
                onClick={() => {
                  setActiveTab('sasaran-kinerja');
                  setSkFilters(undefined);
                  setSkpFilters(undefined);
                }}
                className={`w-full flex items-center gap-[12px] px-[12px] py-[10px] text-[var(--text-sm)] font-[var(--font-weight-medium)] rounded-[6px] transition-colors ${
                  activeTab === 'sasaran-kinerja'
                    ? 'bg-primary/10 text-primary'
                    : 'text-[#656a6c] hover:bg-[#f9f9f9] hover:text-foreground'
                }`}
              >
                <TrendingUp className="w-[18px] h-[18px]" />
                <span>Sasaran Kinerja</span>
              </button>

              {/* Sasaran Kinerja Pegawai className="text-left" */}
              <button
                onClick={() => {
                  setActiveTab('sasaran-kinerja-pegawai');
                  setSkFilters(undefined);
                  setSkpFilters(undefined);
                }}
                className={`w-full flex items-center gap-[12px] px-[12px] py-[10px] text-[var(--text-sm)] font-[var(--font-weight-medium)] rounded-[6px] transition-colors ${
                  activeTab === 'sasaran-kinerja-pegawai'
                    ? 'bg-primary/10 text-primary'
                    : 'text-[#656a6c] hover:bg-[#f9f9f9] hover:text-foreground'
                }`}
              >
                <FolderKanban className="w-[18px] h-[18px]" />
                <span className="text-left">Sasaran Kinerja Pegawai</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-[24px]">
            {activeTab === 'sasaran-program' && (
              <SasaranProgramList
                organization={selectedOrganization}
                onNavigateToSK={handleNavigateToSK}
              />
            )}

            {activeTab === 'sasaran-kinerja' && (
              <SasaranKinerjaList
                organization={selectedOrganization}
                periodFilter={periodFilter}
                level={level}
                initialFilters={skFilters}
                onNavigateToSKP={handleNavigateToSKP}
              />
            )}

            {activeTab === 'sasaran-kinerja-pegawai' && (
              <ProjectList
                organization={selectedOrganization}
                periodFilter={periodFilter}
                initialFilters={skpFilters}
              />
            )}

            {activeTab === 'rincian-skp' && (
              <ProjectKanban
                organization={selectedOrganization}
                periodFilter={periodFilter}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
