import { useState, useMemo } from 'react';
import { Search, Building2, ChevronRight, Home, Grid3x3, List, X, BarChart3 } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { organizations } from '@/app/data/organizationData';

interface OrganizationDirectoryProps {
  onBack: () => void;
  onNavigateToDetail: (orgId: string) => void;
  onNavigateToAnalytics?: (orgId: string) => void;
}

export function OrganizationDirectory({ onBack, onNavigateToDetail, onNavigateToAnalytics }: OrganizationDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter organizations
  const filteredOrganizations = useMemo(() => {
    let filtered = organizations.filter(org => org.is_active);

    if (searchQuery) {
      filtered = filtered.filter(org =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.short_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.short_description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery]);

  // Get organization initials for logo fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Generate color based on name
  const getColorFromName = (name: string) => {
    const colors = ['var(--sd-blue-70)', 'var(--sd-success-border)', '#906CEF', 'var(--sd-warning-border)', 'var(--sd-red-60)'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-sd-gray-0 min-h-screen w-full">
      {/* Header */}
      <Header onLogoClick={onBack} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-sd-badge-neutral">
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
            <span className="text-[var(--text-sm)] text-foreground font-[var(--font-weight-medium)]">Organisasi & Unit Utama</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-sd-badge-neutral">
        <div className="max-w-[1280px] mx-auto px-[24px] py-[32px]">
          <div className="flex items-start justify-between gap-[16px] mb-[24px]">
            <div className="flex items-start gap-[16px] flex-1">
              <div className="w-[56px] h-[56px] rounded-[8px] bg-primary/10 flex items-center justify-center shrink-0">
                <Building2 className="w-[32px] h-[32px] text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[8px]">Organisasi & Unit Utama</h1>
                <p className="text-[var(--text-base)] text-sd-gray-60">Temukan informasi lengkap tentang seluruh unit utama di Kementerian Pendidikan Dasar dan Menengah</p>
              </div>
            </div>
            {/* Analytics Button */}
            {onNavigateToAnalytics && (
              <button
                onClick={() => onNavigateToAnalytics('keseluruhan')}
                className="flex items-center gap-[8px] px-[20px] py-[12px] bg-primary text-primary-foreground rounded-[4px] text-[var(--text-base)] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity shrink-0"
              >
                <BarChart3 className="w-[20px] h-[20px]" />
                <span>Profil Kemdikdasmen</span>
              </button>
            )}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-[16px]">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-sd-gray-60" />
              <input
                type="text"
                placeholder="Cari nama unit kerja..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[48px] pl-[48px] pr-[48px] border border-sd-gray-50 rounded-[4px] text-[15px] text-sd-gray-90 placeholder:text-sd-gray-60 bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-[16px] top-1/2 -translate-y-1/2 text-sd-gray-60 hover:text-foreground transition-colors"
                >
                  <X className="w-[20px] h-[20px]" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-[8px] bg-white border border-sd-gray-50 rounded-[4px] p-[4px]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-[8px] rounded-[4px] transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-sd-gray-60 hover:bg-muted'
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="w-[20px] h-[20px]" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-[8px] rounded-[4px] transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-sd-gray-60 hover:bg-muted'
                }`}
                aria-label="List view"
              >
                <List className="w-[20px] h-[20px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-[24px] py-[40px]">
        {/* Results Count */}
        <div className="mb-[24px]">
          <p className="text-[var(--text-sm)] text-sd-gray-60">
            Menampilkan {filteredOrganizations.length} unit kerja
            {searchQuery && ` untuk "${searchQuery}"`}
          </p>
        </div>

        {/* Organizations Grid/List */}
        {filteredOrganizations.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]'
                : 'flex flex-col gap-[16px]'
            }
          >
            {filteredOrganizations.map((org) => {
              const bgColor = getColorFromName(org.name);
              
              return (
                <div
                  key={org.id}
                  className={`bg-white rounded-[8px] border border-sd-gray-30 p-[20px] hover:shadow-md hover:border-primary transition-all cursor-pointer group ${
                    viewMode === 'list' ? 'flex items-start gap-[20px]' : 'flex flex-col'
                  }`}
                  onClick={() => onNavigateToDetail(org.id)}
                >
                  {/* Logo & Badge Row */}
                  <div className={`flex items-start justify-between ${viewMode === 'list' ? 'w-auto' : 'mb-[16px]'}`}>
                    {/* Logo */}
                    <div
                      className={`rounded-[8px] flex items-center justify-center shrink-0 ${
                        viewMode === 'list' ? 'w-[80px] h-[80px]' : 'w-[64px] h-[64px]'
                      }`}
                      style={{ backgroundColor: `${bgColor}15` }}
                    >
                      {org.logo_url ? (
                        <img
                          src={org.logo_url}
                          alt={org.name}
                          className="w-full h-full object-contain rounded-[8px]"
                        />
                      ) : (
                        <span
                          className="text-[24px] font-[var(--font-weight-medium)]"
                          style={{ color: bgColor }}
                        >
                          {getInitials(org.name)}
                        </span>
                      )}
                    </div>

                    {/* Category Badge */}
                    {viewMode === 'grid' && (
                      <span
                        className="inline-block px-[8px] py-[2px] rounded-[4px] text-[var(--text-xs)] font-[var(--font-weight-medium)]"
                        style={{ backgroundColor: `${bgColor}15`, color: bgColor }}
                      >
                        {org.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${viewMode === 'grid' ? 'flex flex-col' : ''}`}>
                    {/* Category Badge for list view */}
                    {viewMode === 'list' && (
                      <div className="flex items-center gap-[8px] mb-[8px]">
                        <span
                          className="inline-block px-[8px] py-[2px] rounded-[4px] text-[var(--text-xs)] font-[var(--font-weight-medium)]"
                          style={{ backgroundColor: `${bgColor}15`, color: bgColor }}
                        >
                          {org.category}
                        </span>
                      </div>
                    )}

                    {/* Name */}
                    <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[8px] group-hover:text-primary transition-colors">
                      {org.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-[var(--text-sm)] text-sd-gray-60 mb-[16px] line-clamp-2">
                      {org.short_description}
                    </p>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between pt-[12px] border-t border-sd-badge-neutral mt-auto">
                      <div className="flex items-center gap-[8px]">
                        <div className="text-[var(--text-xs)] text-sd-gray-60">
                          {org.members.length} anggota
                        </div>
                        <div className="w-[4px] h-[4px] rounded-full bg-sd-gray-20" />
                        <div className="text-[var(--text-xs)] text-sd-gray-60">
                          {org.services.length} tugas
                        </div>
                      </div>
                      <ChevronRight className="w-[20px] h-[20px] text-sd-gray-60 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[64px] text-center">
            <Building2 className="w-[64px] h-[64px] text-sd-gray-60 mx-auto mb-[16px]" />
            <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[8px]">
              Tidak Ada Unit Kerja Ditemukan
            </h3>
            <p className="text-[var(--text-sm)] text-sd-gray-60 mb-[24px]">
              Coba gunakan kata kunci yang berbeda atau hapus filter
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-[24px] py-[12px] bg-primary text-primary-foreground rounded-[4px] text-[var(--text-base)] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}