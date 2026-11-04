import { buttonClass } from 'seragam-design-system';
import { useState } from 'react';
import {
  ChevronRight,
  Home,
  Building2,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  Clock,
  FileText,
  Calendar,
  Users,
  Download,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  Navigation,
  FolderKanban
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Header } from '@/app/components/Header';
import { Organization } from '@/app/data/organizationData';

interface OrganizationDetailProps {
  organization: Organization;
  onBack: () => void;
  onBackToDirectory: () => void;
  onNavigateToAnalytics?: (id: string) => void;
}

type TabType = 'about' | 'services' | 'structure' | 'contact' | 'performance';

export function OrganizationDetail({ organization, onBack, onBackToDirectory, onNavigateToAnalytics }: OrganizationDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>('about');

  // Get organization color
  const getColorFromName = (name: string) => {
    const colors = ['var(--sd-blue-70)', 'var(--sd-success-border)', '#906CEF', 'var(--sd-warning-border)', 'var(--sd-red-60)'];
    const index = name.length % colors.length;
    return colors[index];
  };

  // Get initials for logo fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const bgColor = getColorFromName(organization.name);

  // Tab configuration
  const tabs = [
    { id: 'about', label: 'Tentang', icon: Building2 },
    { id: 'services', label: 'Tugas dan Fungsi', icon: FolderKanban },
    { id: 'structure', label: 'Struktur Organisasi', icon: Users },
    { id: 'contact', label: 'Kontak & Lokasi', icon: MapPin },
    { id: 'performance', label: 'Capaian Kinerja', icon: TrendingUp }
  ];

  // Calculate position summary percentage
  const positionPercentage = organization.position_summary
    ? Math.round((organization.position_summary.filled_positions / organization.position_summary.total_positions) * 100)
    : 0;

  // Get latest performance score
  const latestScore = organization.performance_scores && organization.performance_scores.length > 0
    ? organization.performance_scores[organization.performance_scores.length - 1].score
    : 0;

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
            <button
              onClick={onBackToDirectory}
              className="text-[var(--text-sm)] text-muted-foreground hover:text-primary transition-colors"
            >
              Organisasi
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <span className="text-[var(--text-sm)] text-foreground font-[var(--font-weight-medium)]">
              {organization.short_name}
            </span>
          </nav>
        </div>
      </div>

      {/* Organization Header */}
      <div className="bg-white border-b border-sd-badge-neutral">
        <div className="max-w-[1280px] mx-auto px-[24px] py-[32px]">
          <div className="flex flex-col md:flex-row items-start gap-[24px] mb-[32px]">
            {/* Logo */}
            <div
              className="w-[96px] h-[96px] rounded-[8px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${bgColor}15` }}
            >
              {organization.logo_url ? (
                <img
                  src={organization.logo_url}
                  alt={organization.name}
                  className="w-full h-full object-contain rounded-[8px]"
                />
              ) : (
                <span
                  className="text-[32px] font-[var(--font-weight-medium)]"
                  style={{ color: bgColor }}
                >
                  {getInitials(organization.name)}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-[16px] mb-[12px]">
                <div>
                  <div className="flex items-center gap-[12px] mb-[8px]">
                    <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-sd-gray-90">
                      {organization.name}
                    </h1>
                    <span
                      className="px-[12px] py-[4px] rounded-[4px] text-[var(--text-sm)] font-[var(--font-weight-medium)]"
                      style={{ backgroundColor: `${bgColor}15`, color: bgColor }}
                    >
                      {organization.category}
                    </span>
                  </div>
                  <p className="text-[var(--text-base)] text-sd-gray-60">
                    {organization.short_description}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mt-[24px]">
                {/* Members Count */}
                <div className="flex items-center gap-[12px] p-[16px] bg-sd-gray-0 rounded-[8px]">
                  <div className="w-[40px] h-[40px] rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-[20px] h-[20px] text-primary" />
                  </div>
                  <div>
                    <div className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-sd-gray-90">
                      {organization.members.length}
                    </div>
                    <div className="text-[var(--text-xs)] text-sd-gray-60">Anggota</div>
                  </div>
                </div>

                {/* Position Summary */}
                {organization.position_summary && (
                  <div className="flex items-center gap-[12px] p-[16px] bg-sd-gray-0 rounded-[8px]">
                    <div className="w-[40px] h-[40px] rounded-full bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-[20px] h-[20px] text-primary" />
                    </div>
                    <div>
                      <div className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-sd-gray-90">
                        {positionPercentage}%
                      </div>
                      <div className="text-[var(--text-xs)] text-sd-gray-60">Jabatan Terisi</div>
                    </div>
                  </div>
                )}

                {/* Latest Performance Score */}
                {organization.performance_scores && organization.performance_scores.length > 0 && (
                  <div className="flex items-center gap-[12px] p-[16px] bg-sd-gray-0 rounded-[8px]">
                    <div className="w-[40px] h-[40px] rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="w-[20px] h-[20px] text-primary" />
                    </div>
                    <div>
                      <div className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-sd-gray-90">
                        {latestScore}
                      </div>
                      <div className="text-[var(--text-xs)] text-sd-gray-60">Skor Kinerja</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-[12px] mt-[24px]">
                <button
                  className={buttonClass('ultimate', 'lg')}
                  onClick={() => onNavigateToAnalytics?.(organization.id)}
                >
                  <BarChart3 className="w-[20px] h-[20px]" />
                  <span>Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-sd-badge-neutral sticky top-0 z-10">
        <div className="max-w-[1280px] mx-auto px-[24px]">
          <div className="flex gap-[8px] overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-[8px] px-[20px] py-[16px] text-[var(--text-base)] font-[var(--font-weight-medium)] border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-sd-gray-60 hover:text-foreground'
                  }`}
                >
                  <Icon className="w-[20px] h-[20px]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-[1280px] mx-auto px-[24px] py-[40px]">
        {/* Tab: Tentang */}
        {activeTab === 'about' && (
          <div className="space-y-[32px]">
            {/* Description */}
            <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
              <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[16px]">
                Deskripsi
              </h2>
              <p className="text-[var(--text-base)] text-sd-gray-60 leading-[1.6]">
                {organization.description}
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              {/* Vision */}
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[12px]">
                  Visi
                </h3>
                <p className="text-[var(--text-base)] text-sd-gray-60 leading-[1.6]">
                  {organization.vision}
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[12px]">
                  Misi
                </h3>
                <ul className="space-y-[8px]">
                  {organization.mission.map((item, index) => (
                    <li key={index} className="flex gap-[8px] text-[var(--text-base)] text-sd-gray-60">
                      <span className="text-primary font-[var(--font-weight-medium)] shrink-0">
                        {index + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Summary Jabatan */}
            {organization.position_summary && (
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
                <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[16px]">
                  Summary Jabatan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  {/* Visual Percentage */}
                  <div>
                    <div className="relative w-full h-[200px] flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 200 200">
                        {/* Background circle */}
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="var(--sd-badge-neutral)"
                          strokeWidth="16"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke={bgColor}
                          strokeWidth="16"
                          strokeDasharray={`${(positionPercentage / 100) * 502.4} 502.4`}
                          strokeLinecap="round"
                          transform="rotate(-90 100 100)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-[var(--text-3xl)] font-[var(--font-weight-medium)] text-sd-gray-90">
                          {positionPercentage}%
                        </div>
                        <div className="text-[var(--text-sm)] text-sd-gray-60">Terisi</div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-center space-y-[16px]">
                    <div className="flex items-center justify-between p-[16px] bg-sd-gray-0 rounded-[8px]">
                      <div className="flex items-center gap-[12px]">
                        <Briefcase className="w-[20px] h-[20px] text-sd-gray-60" />
                        <span className="text-[var(--text-base)] text-sd-gray-60">Total Jabatan</span>
                      </div>
                      <span className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90">
                        {organization.position_summary.total_positions}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-[16px] bg-sd-gray-0 rounded-[8px]">
                      <div className="flex items-center gap-[12px]">
                        <CheckCircle2 className="w-[20px] h-[20px] text-primary" />
                        <span className="text-[var(--text-base)] text-sd-gray-60">Jabatan Terisi</span>
                      </div>
                      <span className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-primary">
                        {organization.position_summary.filled_positions}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-[16px] bg-sd-gray-0 rounded-[8px]">
                      <div className="flex items-center gap-[12px]">
                        <Users className="w-[20px] h-[20px] text-sd-gray-60" />
                        <span className="text-[var(--text-base)] text-sd-gray-60">Jabatan Kosong</span>
                      </div>
                      <span className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-60">
                        {organization.position_summary.total_positions - organization.position_summary.filled_positions}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Tugas dan Fungsi */}
        {activeTab === 'services' && (
          <div className="space-y-[24px]">
            {/* Main Services */}
            <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
              <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[20px]">
                Layanan dan Fungsi Utama
              </h2>
              <div className="space-y-[16px]">
                {organization.services.length > 0 ? (
                  organization.services.map((service, index) => (
                    <div
                      key={service.id}
                      className="p-[20px] rounded-[8px] border border-sd-gray-30 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-[16px]">
                        <div 
                          className="w-[40px] h-[40px] rounded-[8px] bg-primary/10 flex items-center justify-center shrink-0"
                        >
                          <span className="text-[19px] font-[var(--font-weight-medium)] text-primary">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[8px]">
                            {service.title}
                          </h3>
                          <p className="text-[var(--text-base)] text-sd-gray-60 leading-[1.6]">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-[48px] text-center">
                    <FolderKanban className="w-[48px] h-[48px] text-sd-gray-60 mx-auto mb-[16px]" />
                    <p className="text-[var(--text-base)] text-sd-gray-60">
                      Belum ada layanan yang tersedia
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Tasks */}
            {organization.tasks_detail && organization.tasks_detail.length > 0 && (
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
                <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[20px]">
                  Rincian Tugas
                </h2>
                <div className="space-y-[16px]">
                  {organization.tasks_detail.map((task) => (
                    <div
                      key={task.id}
                      className="p-[20px] rounded-[8px] bg-sd-gray-0 border border-sd-badge-neutral"
                    >
                      <div className="flex items-start gap-[12px] mb-[12px]">
                        <span
                          className="px-[12px] py-[4px] rounded-[4px] text-[var(--text-xs)] font-[var(--font-weight-medium)] bg-primary/10 text-primary"
                        >
                          {task.category}
                        </span>
                      </div>
                      <h4 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[8px]">
                        {task.title}
                      </h4>
                      <p className="text-[var(--text-base)] text-sd-gray-60 mb-[12px]">
                        {task.description}
                      </p>
                      {task.sub_tasks && task.sub_tasks.length > 0 && (
                        <div className="mt-[12px]">
                          <div className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-60 mb-[8px]">
                            Sub-Tugas:
                          </div>
                          <ul className="space-y-[4px]">
                            {task.sub_tasks.map((subTask, index) => (
                              <li key={index} className="flex items-start gap-[8px] text-[var(--text-sm)] text-sd-gray-60">
                                <CheckCircle2 className="w-[16px] h-[16px] text-primary mt-[2px] shrink-0" />
                                <span>{subTask}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Struktur Organisasi */}
        {activeTab === 'structure' && (
          <div className="space-y-[24px]">
            <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
              <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[20px]">
                Anggota Tim
              </h2>
              <div className="space-y-[16px]">
                {organization.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-[16px] p-[16px] rounded-[8px] hover:bg-muted transition-colors"
                  >
                    {/* Avatar */}
                    <div className="w-[56px] h-[56px] rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      {member.photo_url ? (
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-[20px] font-[var(--font-weight-medium)] text-primary">
                          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h4 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[4px]">
                        {member.name}
                      </h4>
                      <p className="text-[var(--text-sm)] text-sd-gray-60 mb-[4px]">
                        {member.position}
                      </p>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-[var(--text-sm)] text-primary hover:underline"
                      >
                        {member.email}
                      </a>
                    </div>

                    {/* Level Indicator */}
                    {member.level === 0 && (
                      <span className="px-[12px] py-[4px] bg-primary/10 text-primary text-[var(--text-xs)] font-[var(--font-weight-medium)] rounded-[4px]">
                        Pimpinan
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Kontak & Lokasi */}
        {activeTab === 'contact' && (
          <div className="space-y-[24px]">
            {/* Building Photo */}
            {organization.building_photo_url && (
              <div className="bg-white rounded-[8px] border border-sd-gray-30 overflow-hidden">
                <img
                  src={organization.building_photo_url}
                  alt={`Gedung ${organization.name}`}
                  className="w-full h-[300px] object-cover"
                />
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
              <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[24px]">
                Informasi Kontak
              </h2>
              <div className="space-y-[20px]">
                {/* Email */}
                <div className="flex items-start gap-[16px]">
                  <div className="w-[40px] h-[40px] rounded-[8px] bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-[20px] h-[20px] text-primary" />
                  </div>
                  <div>
                    <div className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-60 mb-[4px]">
                      Email
                    </div>
                    <a
                      href={`mailto:${organization.contact.email}`}
                      className="text-[var(--text-base)] text-primary hover:underline"
                    >
                      {organization.contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-[16px]">
                  <div className="w-[40px] h-[40px] rounded-[8px] bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-[20px] h-[20px] text-primary" />
                  </div>
                  <div>
                    <div className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-60 mb-[4px]">
                      Telepon
                    </div>
                    <div className="text-[var(--text-base)] text-sd-gray-90">
                      {organization.contact.phone}
                      {organization.contact.extension && ` ext. ${organization.contact.extension}`}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-[16px]">
                  <div className="w-[40px] h-[40px] rounded-[8px] bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-[20px] h-[20px] text-primary" />
                  </div>
                  <div>
                    <div className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-60 mb-[4px]">
                      Lokasi
                    </div>
                    <div className="text-[var(--text-base)] text-sd-gray-90">
                      {organization.contact.location}
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-[16px]">
                  <div className="w-[40px] h-[40px] rounded-[8px] bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-[20px] h-[20px] text-primary" />
                  </div>
                  <div>
                    <div className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-60 mb-[4px]">
                      Jam Operasional
                    </div>
                    <div className="text-[var(--text-base)] text-sd-gray-90">
                      {organization.contact.office_hours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Detail */}
            {organization.address_detail && (
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
                <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[24px]">
                  Detail Alamat
                </h2>
                <div className="space-y-[12px]">
                  <div className="flex items-start gap-[12px]">
                    <Building2 className="w-[20px] h-[20px] text-sd-gray-60 mt-[2px]" />
                    <div>
                      <div className="text-[var(--text-sm)] text-sd-gray-60">Jalan</div>
                      <div className="text-[var(--text-base)] text-sd-gray-90 font-[var(--font-weight-medium)]">
                        {organization.address_detail.street}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-[12px]">
                    <MapPin className="w-[20px] h-[20px] text-sd-gray-60 mt-[2px]" />
                    <div>
                      <div className="text-[var(--text-sm)] text-sd-gray-60">Kota / Provinsi</div>
                      <div className="text-[var(--text-base)] text-sd-gray-90 font-[var(--font-weight-medium)]">
                        {organization.address_detail.city}, {organization.address_detail.province}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-[12px]">
                    <Mail className="w-[20px] h-[20px] text-sd-gray-60 mt-[2px]" />
                    <div>
                      <div className="text-[var(--text-sm)] text-sd-gray-60">Kode Pos</div>
                      <div className="text-[var(--text-base)] text-sd-gray-90 font-[var(--font-weight-medium)]">
                        {organization.address_detail.postal_code}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-[12px]">
                    <Navigation className="w-[20px] h-[20px] text-sd-gray-60 mt-[2px]" />
                    <div>
                      <div className="text-[var(--text-sm)] text-sd-gray-60">Koordinat</div>
                      <div className="text-[var(--text-base)] text-sd-gray-90 font-[var(--font-weight-medium)]">
                        {organization.address_detail.geo_location.lat}, {organization.address_detail.geo_location.lng}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mock Map Placeholder */}
                <div className="mt-[24px] w-full h-[200px] bg-sd-gray-0 rounded-[8px] flex items-center justify-center border border-sd-badge-neutral">
                  <div className="text-center">
                    <MapPin className="w-[48px] h-[48px] text-sd-gray-60 mx-auto mb-[8px]" />
                    <div className="text-[var(--text-sm)] text-sd-gray-60">Peta Lokasi</div>
                    <div className="text-[var(--text-xs)] text-sd-gray-60 mt-[4px]">
                      Lat: {organization.address_detail.geo_location.lat}, Lng: {organization.address_detail.geo_location.lng}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Capaian Kinerja */}
        {activeTab === 'performance' && (
          <div className="space-y-[24px]">
            {organization.performance_scores && organization.performance_scores.length > 0 ? (
              <>
                {/* Performance Summary */}
                <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
                  <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[24px]">
                    Ringkasan Kinerja
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
                    <div className="p-[20px] bg-sd-gray-0 rounded-[8px] text-center">
                      <div className="text-[var(--text-3xl)] font-[var(--font-weight-medium)] text-primary mb-[4px]">
                        {latestScore}
                      </div>
                      <div className="text-[var(--text-sm)] text-sd-gray-60">Skor Terkini</div>
                    </div>
                    <div className="p-[20px] bg-sd-gray-0 rounded-[8px] text-center">
                      <div className="text-[var(--text-3xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[4px]">
                        {Math.round(
                          organization.performance_scores.reduce((acc, curr) => acc + curr.score, 0) /
                            organization.performance_scores.length
                        )}
                      </div>
                      <div className="text-[var(--text-sm)] text-sd-gray-60">Rata-rata</div>
                    </div>
                    <div className="p-[20px] bg-sd-gray-0 rounded-[8px] text-center">
                      <div className="text-[var(--text-3xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[4px]">
                        {organization.performance_scores.length}
                      </div>
                      <div className="text-[var(--text-sm)] text-sd-gray-60">Periode Evaluasi</div>
                    </div>
                  </div>
                </div>

                {/* Performance Trend Chart */}
                <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
                  <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[24px]">
                    Trend Nilai Evaluasi
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={organization.performance_scores}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--sd-badge-neutral)" />
                      <XAxis
                        dataKey="period"
                        stroke="var(--sd-gray-60)"
                        style={{ fontSize: '14px' }}
                      />
                      <YAxis
                        stroke="var(--sd-gray-60)"
                        style={{ fontSize: '14px' }}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #c7c7c7',
                          borderRadius: '8px',
                          padding: '12px'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke={bgColor}
                        strokeWidth={3}
                        dot={{ fill: bgColor, r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Performance Details */}
                <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
                  <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[20px]">
                    Detail Capaian per Periode
                  </h2>
                  <div className="space-y-[12px]">
                    {organization.performance_scores.map((score, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-[16px] rounded-[8px] bg-sd-gray-0 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-[12px]">
                          <Calendar className="w-[20px] h-[20px] text-sd-gray-60" />
                          <div>
                            <div className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90">
                              {score.period}
                            </div>
                            <div className="text-[var(--text-sm)] text-sd-gray-60">{score.category}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          <div
                            className="text-[var(--text-xl)] font-[var(--font-weight-medium)]"
                            style={{ color: score.score >= 80 ? bgColor : 'var(--sd-gray-60)' }}
                          >
                            {score.score}
                          </div>
                          {score.score >= 80 && (
                            <TrendingUp className="w-[20px] h-[20px]" style={{ color: bgColor }} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[48px] text-center">
                <BarChart3 className="w-[48px] h-[48px] text-sd-gray-60 mx-auto mb-[16px]" />
                <p className="text-[var(--text-base)] text-sd-gray-60">
                  Belum ada data capaian kinerja yang tersedia
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}