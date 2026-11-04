import { useState } from 'react';
import {
  ChevronRight,
  Home,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  UserCheck,
  Briefcase,
  Building2,
  BarChart3
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Header } from '@/app/components/Header';
import { Organization } from '@/app/data/organizationData';
import { getAnalyticsData, CHART_COLORS } from '@/app/data/analyticsData';

interface AnalyticsPageProps {
  organization: Organization;
  onBack: () => void;
  onBackToDirectory: () => void;
  onBackToDetail: () => void;
}

type CategoryType = 'statistik-umum' | 'statistik-jabatan' | 'jabatan-fungsional' | 'jabatan-pelaksana';

export function AnalyticsPage({ organization, onBack, onBackToDirectory, onBackToDetail }: AnalyticsPageProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('statistik-umum');
  const analyticsData = getAnalyticsData(organization.id);

  // Categories for navigation
  const categories = [
    { id: 'statistik-umum' as CategoryType, label: 'Statistik Umum ASN', icon: Users },
    { id: 'statistik-jabatan' as CategoryType, label: 'Statistik Berdasarkan Jabatan', icon: Briefcase },
    { id: 'jabatan-fungsional' as CategoryType, label: 'Jabatan Fungsional', icon: UserCheck },
    { id: 'jabatan-pelaksana' as CategoryType, label: 'Jabatan Pelaksana', icon: Building2 }
  ];

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
            <button
              onClick={onBackToDirectory}
              className="text-[var(--text-sm)] text-muted-foreground hover:text-primary transition-colors"
            >
              Organisasi
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <button
              onClick={onBackToDetail}
              className="text-[var(--text-sm)] text-muted-foreground hover:text-primary transition-colors"
            >
              {organization.short_name}
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <span className="text-[var(--text-sm)] text-foreground font-[var(--font-weight-medium)]">
              Analytics
            </span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-[#EFEFEF]">
        <div className="max-w-[1280px] mx-auto px-[24px] py-[32px]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[16px] mb-[16px]">
            <div>
              <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-[#323232] mb-[8px]">
                Analytics — {organization.name}
              </h1>
              <p className="text-[var(--text-sm)] text-[#656a6c]">
                Data per: {formatDate(analyticsData.lastUpdated)}
              </p>
            </div>
            <div className="flex gap-[12px]">
              <button className="flex items-center gap-[8px] px-[16px] py-[10px] bg-white border border-[#828282] text-foreground rounded-[4px] font-[var(--font-weight-medium)] hover:bg-muted transition-colors">
                <Filter className="w-[18px] h-[18px]" />
                <span>Filter</span>
              </button>
              <button className="flex items-center gap-[8px] px-[16px] py-[10px] bg-primary text-primary-foreground rounded-[4px] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity">
                <Download className="w-[18px] h-[18px]" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b border-[#EFEFEF] sticky top-[64px] z-40">
        <div className="max-w-[1280px] mx-auto px-[24px]">
          <div className="flex gap-[8px] overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-[8px] px-[20px] py-[16px] text-[var(--text-base)] font-[var(--font-weight-medium)] border-b-2 transition-colors whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-[#656a6c] hover:text-foreground'
                  }`}
                >
                  <Icon className="w-[20px] h-[20px]" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-[24px] py-[40px]">
        {/* Kategori 1: Statistik Umum ASN */}
        {activeCategory === 'statistik-umum' && (
          <div className="space-y-[32px]">
            {/* Total ASN Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              {/* Total ASN */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <div className="flex items-start justify-between mb-[16px]">
                  <div className="w-[48px] h-[48px] rounded-[8px] bg-primary/10 flex items-center justify-center">
                    <Users className="w-[24px] h-[24px] text-primary" />
                  </div>
                  {analyticsData.totalASN.delta !== 0 && (
                    <div className={`flex items-center gap-[4px] px-[8px] py-[4px] rounded-[4px] ${
                      analyticsData.totalASN.delta > 0 ? 'bg-[#4CA375]/10 text-[#4CA375]' : 'bg-[#E02D38]/10 text-[#E02D38]'
                    }`}>
                      {analyticsData.totalASN.delta > 0 ? (
                        <TrendingUp className="w-[14px] h-[14px]" />
                      ) : (
                        <TrendingDown className="w-[14px] h-[14px]" />
                      )}
                      <span className="text-[var(--text-xs)] font-[var(--font-weight-medium)]">
                        {Math.abs(analyticsData.totalASN.delta)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-[32px] font-[var(--font-weight-medium)] text-[#323232] mb-[4px]">
                  {analyticsData.totalASN.total.toLocaleString('id-ID')}
                </div>
                <div className="text-[var(--text-sm)] text-[#656a6c]">Total ASN</div>
              </div>

              {/* Total PNS */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <div className="flex items-start justify-between mb-[16px]">
                  <div className="w-[48px] h-[48px] rounded-[8px] bg-[#4CA375]/10 flex items-center justify-center">
                    <UserCheck className="w-[24px] h-[24px] text-[#4CA375]" />
                  </div>
                </div>
                <div className="text-[32px] font-[var(--font-weight-medium)] text-[#323232] mb-[4px]">
                  {analyticsData.totalASN.pns.toLocaleString('id-ID')}
                </div>
                <div className="text-[var(--text-sm)] text-[#656a6c]">Total PNS</div>
                <div className="text-[var(--text-xs)] text-[#727272] mt-[8px]">
                  {((analyticsData.totalASN.pns / analyticsData.totalASN.total) * 100).toFixed(1)}% dari total
                </div>
              </div>

              {/* Total PPPK */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <div className="flex items-start justify-between mb-[16px]">
                  <div className="w-[48px] h-[48px] rounded-[8px] bg-[#906CEF]/10 flex items-center justify-center">
                    <Users className="w-[24px] h-[24px] text-[#906CEF]" />
                  </div>
                </div>
                <div className="text-[32px] font-[var(--font-weight-medium)] text-[#323232] mb-[4px]">
                  {analyticsData.totalASN.pppk.toLocaleString('id-ID')}
                </div>
                <div className="text-[var(--text-sm)] text-[#656a6c]">Total PPPK</div>
                <div className="text-[var(--text-xs)] text-[#727272] mt-[8px]">
                  {((analyticsData.totalASN.pppk / analyticsData.totalASN.total) * 100).toFixed(1)}% dari total
                </div>
              </div>
            </div>

            {/* Komposisi per Unit Kerja */}
            <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
              <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                Komposisi ASN Berdasarkan Unit Kerja Penugasan
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.statistikUmum.byUnitKerja} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                  <XAxis type="number" stroke="#727272" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="name" type="category" width={150} stroke="#727272" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #c7c7c7', 
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                  <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
              
              {/* Table */}
              <div className="mt-[24px] overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#EFEFEF]">
                      <th className="text-left py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                        Unit Kerja
                      </th>
                      <th className="text-right py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                        Jumlah
                      </th>
                      <th className="text-right py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                        Persentase
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.statistikUmum.byUnitKerja.map((item, index) => (
                      <tr key={index} className="border-b border-[#EFEFEF] hover:bg-muted transition-colors">
                        <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#323232]">{item.name}</td>
                        <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#323232] text-right font-[var(--font-weight-medium)]">
                          {item.value.toLocaleString('id-ID')}
                        </td>
                        <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#656a6c] text-right">
                          {item.percentage.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grid 2 kolom untuk chart kecil */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
              {/* Komposisi per Jenis Kelamin */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                  Komposisi Berdasarkan Jenis Kelamin
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.statistikUmum.byJenisKelamin}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.statistikUmum.byJenisKelamin.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS.palette[index % CHART_COLORS.palette.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                {/* Table */}
                <div className="mt-[16px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#EFEFEF]">
                        <th className="text-left py-[8px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Jenis Kelamin
                        </th>
                        <th className="text-right py-[8px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Jumlah
                        </th>
                        <th className="text-right py-[8px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.statistikUmum.byJenisKelamin.map((item, index) => (
                        <tr key={index} className="border-b border-[#EFEFEF]">
                          <td className="py-[8px] text-[var(--text-sm)] text-[#323232]">{item.name}</td>
                          <td className="py-[8px] text-[var(--text-sm)] text-[#323232] text-right font-[var(--font-weight-medium)]">
                            {item.value}
                          </td>
                          <td className="py-[8px] text-[var(--text-sm)] text-[#656a6c] text-right">
                            {item.percentage}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Komposisi per Usia */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                  Komposisi Berdasarkan Usia
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.statistikUmum.byUsia}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="name" stroke="#727272" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#727272" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #c7c7c7', 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                    <Bar dataKey="value" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                {/* Table */}
                <div className="mt-[16px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#EFEFEF]">
                        <th className="text-left py-[8px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Rentang Usia
                        </th>
                        <th className="text-right py-[8px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Jumlah
                        </th>
                        <th className="text-right py-[8px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.statistikUmum.byUsia.map((item, index) => (
                        <tr key={index} className="border-b border-[#EFEFEF]">
                          <td className="py-[8px] text-[var(--text-sm)] text-[#323232]">{item.name}</td>
                          <td className="py-[8px] text-[var(--text-sm)] text-[#323232] text-right font-[var(--font-weight-medium)]">
                            {item.value}
                          </td>
                          <td className="py-[8px] text-[var(--text-sm)] text-[#656a6c] text-right">
                            {item.percentage}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Komposisi per Masa Kerja */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                  Komposisi Berdasarkan Masa Kerja
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.statistikUmum.byMasaKerja}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="name" stroke="#727272" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#727272" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #c7c7c7', 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                    <Bar dataKey="value" fill={CHART_COLORS.accent} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                {/* Table */}
                <div className="mt-[16px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#EFEFEF]">
                        <th className="text-left py-[8px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Masa Kerja
                        </th>
                        <th className="text-right py-[8px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Jumlah
                        </th>
                        <th className="text-right py-[8px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.statistikUmum.byMasaKerja.map((item, index) => (
                        <tr key={index} className="border-b border-[#EFEFEF]">
                          <td className="py-[8px] text-[var(--text-sm)] text-[#323232]">{item.name}</td>
                          <td className="py-[8px] text-[var(--text-sm)] text-[#323232] text-right font-[var(--font-weight-medium)]">
                            {item.value}
                          </td>
                          <td className="py-[8px] text-[var(--text-sm)] text-[#656a6c] text-right">
                            {item.percentage}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Komposisi per Pendidikan */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                  Komposisi Berdasarkan Jenjang Pendidikan
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.statistikUmum.byPendidikan} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis type="number" stroke="#727272" style={{ fontSize: '12px' }} />
                    <YAxis dataKey="name" type="category" width={80} stroke="#727272" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #c7c7c7', 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                    <Bar dataKey="value" fill={CHART_COLORS.warning} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                {/* Table */}
                <div className="mt-[16px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#EFEFEF]">
                        <th className="text-left py-[8px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Pendidikan
                        </th>
                        <th className="text-right py-[8px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Jumlah
                        </th>
                        <th className="text-right py-[8px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.statistikUmum.byPendidikan.map((item, index) => (
                        <tr key={index} className="border-b border-[#EFEFEF]">
                          <td className="py-[8px] text-[var(--text-sm)] text-[#323232]">{item.name}</td>
                          <td className="py-[8px] text-[var(--text-sm)] text-[#323232] text-right font-[var(--font-weight-medium)]">
                            {item.value}
                          </td>
                          <td className="py-[8px] text-[var(--text-sm)] text-[#656a6c] text-right">
                            {item.percentage}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Komposisi per Golongan */}
            <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
              <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                Komposisi ASN Berdasarkan Golongan
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.statistikUmum.byGolongan}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                  <XAxis 
                    dataKey={(item) => `${item.golongan}${item.subGolongan}`} 
                    stroke="#727272" 
                    style={{ fontSize: '12px' }} 
                  />
                  <YAxis stroke="#727272" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #c7c7c7', 
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    formatter={(value: number, name: string, props: any) => [
                      value,
                      `Golongan ${props.payload.golongan}${props.payload.subGolongan}`
                    ]}
                  />
                  <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              {/* Table */}
              <div className="mt-[24px] overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#EFEFEF]">
                      <th className="text-left py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                        Golongan
                      </th>
                      <th className="text-center py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                        Sub-Golongan
                      </th>
                      <th className="text-right py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                        Jumlah
                      </th>
                      <th className="text-right py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                        Persentase
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.statistikUmum.byGolongan.map((item, index) => (
                      <tr key={index} className="border-b border-[#EFEFEF] hover:bg-muted transition-colors">
                        <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#323232]">{item.golongan}</td>
                        <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#323232] text-center">
                          {item.subGolongan}
                        </td>
                        <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#323232] text-right font-[var(--font-weight-medium)]">
                          {item.value.toLocaleString('id-ID')}
                        </td>
                        <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#656a6c] text-right">
                          {item.percentage.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Kategori 2: Statistik ASN Berdasarkan Jabatan */}
        {activeCategory === 'statistik-jabatan' && (
          <div className="space-y-[32px]">
            {/* Overview Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#0954D9]/10 flex items-center justify-center mb-[16px]">
                  <Briefcase className="w-[24px] h-[24px] text-[#0954D9]" />
                </div>
                <div className="text-[32px] font-[var(--font-weight-medium)] text-[#323232] mb-[4px]">
                  {analyticsData.statistikJabatan.overview.manajerial}
                </div>
                <div className="text-[var(--text-sm)] text-[#656a6c] mb-[8px]">Jabatan Manajerial</div>
                <div className="text-[var(--text-xs)] text-[#727272]">
                  {((analyticsData.statistikJabatan.overview.manajerial / analyticsData.totalASN.total) * 100).toFixed(1)}% dari total ASN
                </div>
              </div>

              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#4CA375]/10 flex items-center justify-center mb-[16px]">
                  <UserCheck className="w-[24px] h-[24px] text-[#4CA375]" />
                </div>
                <div className="text-[32px] font-[var(--font-weight-medium)] text-[#323232] mb-[4px]">
                  {analyticsData.statistikJabatan.overview.fungsional}
                </div>
                <div className="text-[var(--text-sm)] text-[#656a6c] mb-[8px]">Jabatan Fungsional</div>
                <div className="text-[var(--text-xs)] text-[#727272]">
                  {((analyticsData.statistikJabatan.overview.fungsional / analyticsData.totalASN.total) * 100).toFixed(1)}% dari total ASN
                </div>
              </div>

              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#906CEF]/10 flex items-center justify-center mb-[16px]">
                  <Users className="w-[24px] h-[24px] text-[#906CEF]" />
                </div>
                <div className="text-[32px] font-[var(--font-weight-medium)] text-[#323232] mb-[4px]">
                  {analyticsData.statistikJabatan.overview.pelaksana}
                </div>
                <div className="text-[var(--text-sm)] text-[#656a6c] mb-[8px]">Jabatan Pelaksana</div>
                <div className="text-[var(--text-xs)] text-[#727272]">
                  {((analyticsData.statistikJabatan.overview.pelaksana / analyticsData.totalASN.total) * 100).toFixed(1)}% dari total ASN
                </div>
              </div>
            </div>

            {/* Overview Pie Chart */}
            <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
              <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                Gambaran Umum Jenis Jabatan ASN
              </h2>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Manajerial', value: analyticsData.statistikJabatan.overview.manajerial },
                      { name: 'Fungsional', value: analyticsData.statistikJabatan.overview.fungsional },
                      { name: 'Pelaksana', value: analyticsData.statistikJabatan.overview.pelaksana }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill={CHART_COLORS.primary} />
                    <Cell fill={CHART_COLORS.secondary} />
                    <Cell fill={CHART_COLORS.accent} />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Section: Pejabat Manajerial */}
            <div className="space-y-[24px]">
              <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-[#323232] border-b border-[#EFEFEF] pb-[12px]">
                Gambaran Pejabat Manajerial
              </h2>

              {/* Grid 2 kolom */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
                {/* Per Unit Kerja */}
                <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                  <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                    Distribusi per Unit Kerja Penugasan
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.statistikJabatan.manajerial.byUnitKerja} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                      <XAxis type="number" stroke="#727272" style={{ fontSize: '11px' }} />
                      <YAxis dataKey="name" type="category" width={120} stroke="#727272" style={{ fontSize: '11px' }} />
                      <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #c7c7c7', borderRadius: '4px', fontSize: '13px' }} />
                      <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Per Usia */}
                <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                  <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                    Distribusi per Usia
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.statistikJabatan.manajerial.byUsia}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                      <XAxis dataKey="name" stroke="#727272" style={{ fontSize: '11px' }} />
                      <YAxis stroke="#727272" style={{ fontSize: '11px' }} />
                      <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #c7c7c7', borderRadius: '4px', fontSize: '13px' }} />
                      <Bar dataKey="value" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Per Jenis Kelamin */}
                <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                  <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                    Distribusi per Jenis Kelamin
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={analyticsData.statistikJabatan.manajerial.byJenisKelamin}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analyticsData.statistikJabatan.manajerial.byJenisKelamin.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS.palette[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Per Pendidikan */}
                <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                  <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                    Distribusi per Jenjang Pendidikan
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.statistikJabatan.manajerial.byPendidikan} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                      <XAxis type="number" stroke="#727272" style={{ fontSize: '11px' }} />
                      <YAxis dataKey="name" type="category" width={60} stroke="#727272" style={{ fontSize: '11px' }} />
                      <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #c7c7c7', borderRadius: '4px', fontSize: '13px' }} />
                      <Bar dataKey="value" fill={CHART_COLORS.warning} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Kategori 3: Jabatan Fungsional */}
        {activeCategory === 'jabatan-fungsional' && (
          <div className="space-y-[32px]">
            <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-[#323232]">
              Gambaran Jabatan Fungsional
            </h2>

            {/* Grid 2 kolom untuk chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
              {/* Per Unit Kerja */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                  Distribusi per Unit Kerja Penugasan
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.jabatanFungsional.byUnitKerja} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis type="number" stroke="#727272" style={{ fontSize: '11px' }} />
                    <YAxis dataKey="name" type="category" width={120} stroke="#727272" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #c7c7c7', borderRadius: '4px', fontSize: '13px' }} />
                    <Bar dataKey="value" fill={CHART_COLORS.secondary} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Per Jenjang Jabatan */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                  Distribusi per Jenjang Jabatan
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.jabatanFungsional.byJenjang}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="name" stroke="#727272" style={{ fontSize: '11px' }} angle={-20} textAnchor="end" height={80} />
                    <YAxis stroke="#727272" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #c7c7c7', borderRadius: '4px', fontSize: '13px' }} />
                    <Bar dataKey="value" fill={CHART_COLORS.accent} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Per Masa Kerja */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                  Distribusi per Masa Kerja
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.jabatanFungsional.byMasaKerja}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="name" stroke="#727272" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#727272" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #c7c7c7', borderRadius: '4px', fontSize: '13px' }} />
                    <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Per Usia */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                  Distribusi per Usia
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.jabatanFungsional.byUsia}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="name" stroke="#727272" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#727272" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #c7c7c7', borderRadius: '4px', fontSize: '13px' }} />
                    <Bar dataKey="value" fill={CHART_COLORS.warning} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Per Pendidikan */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                  Distribusi per Jenjang Pendidikan
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.jabatanFungsional.byPendidikan} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis type="number" stroke="#727272" style={{ fontSize: '11px' }} />
                    <YAxis dataKey="name" type="category" width={60} stroke="#727272" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #c7c7c7', borderRadius: '4px', fontSize: '13px' }} />
                    <Bar dataKey="value" fill={CHART_COLORS.secondary} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gap Analysis - Full Width */}
            <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
              <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                Perbandingan Kebutuhan vs Persediaan
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.jabatanFungsional.kebutuhanVsPersediaan}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                  <XAxis dataKey="name" stroke="#727272" style={{ fontSize: '12px' }} angle={-20} textAnchor="end" height={100} />
                  <YAxis stroke="#727272" style={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #c7c7c7', borderRadius: '4px', fontSize: '14px' }} />
                  <Legend />
                  <Bar dataKey="kebutuhan" fill={CHART_COLORS.danger} name="Kebutuhan" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="persediaan" fill={CHART_COLORS.secondary} name="Persediaan" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              {/* Gap Table */}
              <div className="mt-[24px] overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#EFEFEF]">
                      <th className="text-left py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                        Jabatan Fungsional
                      </th>
                      <th className="text-right py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                        Kebutuhan
                      </th>
                      <th className="text-right py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                        Persediaan
                      </th>
                      <th className="text-right py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                        Selisih (Gap)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.jabatanFungsional.kebutuhanVsPersediaan.map((item, index) => (
                      <tr key={index} className="border-b border-[#EFEFEF] hover:bg-muted transition-colors">
                        <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#323232]">{item.name}</td>
                        <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#323232] text-right">
                          {item.kebutuhan}
                        </td>
                        <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#323232] text-right">
                          {item.persediaan}
                        </td>
                        <td className={`py-[12px] px-[16px] text-[var(--text-sm)] text-right font-[var(--font-weight-medium)] ${
                          item.gap < 0 ? 'text-[#E02D38]' : 'text-[#4CA375]'
                        }`}>
                          {item.gap > 0 ? '+' : ''}{item.gap}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Kategori 4: Jabatan Pelaksana */}
        {activeCategory === 'jabatan-pelaksana' && (
          <div className="space-y-[32px]">
            <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-[#323232]">
              Gambaran Jabatan Pelaksana
            </h2>

            {/* Grid 2 kolom */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
              {/* Per Unit Kerja */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                  Distribusi per Unit Kerja Penugasan
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.jabatanPelaksana.byUnitKerja} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis type="number" stroke="#727272" style={{ fontSize: '11px' }} />
                    <YAxis dataKey="name" type="category" width={120} stroke="#727272" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #c7c7c7', borderRadius: '4px', fontSize: '13px' }} />
                    <Bar dataKey="value" fill={CHART_COLORS.accent} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                {/* Table */}
                <div className="mt-[16px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#EFEFEF]">
                        <th className="text-left py-[8px] text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Unit Kerja
                        </th>
                        <th className="text-right py-[8px] text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Jumlah
                        </th>
                        <th className="text-right py-[8px] text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.jabatanPelaksana.byUnitKerja.map((item, index) => (
                        <tr key={index} className="border-b border-[#EFEFEF]">
                          <td className="py-[6px] text-[var(--text-xs)] text-[#323232]">{item.name}</td>
                          <td className="py-[6px] text-[var(--text-xs)] text-[#323232] text-right font-[var(--font-weight-medium)]">
                            {item.value}
                          </td>
                          <td className="py-[6px] text-[var(--text-xs)] text-[#656a6c] text-right">
                            {item.percentage}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Per Usia */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                  Distribusi per Usia
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.jabatanPelaksana.byUsia}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="name" stroke="#727272" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#727272" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #c7c7c7', borderRadius: '4px', fontSize: '13px' }} />
                    <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                {/* Table */}
                <div className="mt-[16px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#EFEFEF]">
                        <th className="text-left py-[8px] text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Rentang Usia
                        </th>
                        <th className="text-right py-[8px] text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Jumlah
                        </th>
                        <th className="text-right py-[8px] text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.jabatanPelaksana.byUsia.map((item, index) => (
                        <tr key={index} className="border-b border-[#EFEFEF]">
                          <td className="py-[6px] text-[var(--text-xs)] text-[#323232]">{item.name}</td>
                          <td className="py-[6px] text-[var(--text-xs)] text-[#323232] text-right font-[var(--font-weight-medium)]">
                            {item.value}
                          </td>
                          <td className="py-[6px] text-[var(--text-xs)] text-[#656a6c] text-right">
                            {item.percentage}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Per Pendidikan - Full Width */}
              <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[24px] lg:col-span-2">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[24px]">
                  Distribusi per Jenjang Pendidikan
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.jabatanPelaksana.byPendidikan}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="name" stroke="#727272" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#727272" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #c7c7c7', borderRadius: '4px', fontSize: '14px' }} />
                    <Bar dataKey="value" fill={CHART_COLORS.warning} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                {/* Table */}
                <div className="mt-[24px] max-w-[600px] mx-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#EFEFEF]">
                        <th className="text-left py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Jenjang Pendidikan
                        </th>
                        <th className="text-right py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Jumlah
                        </th>
                        <th className="text-right py-[12px] px-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#656a6c]">
                          Persentase
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.jabatanPelaksana.byPendidikan.map((item, index) => (
                        <tr key={index} className="border-b border-[#EFEFEF] hover:bg-muted transition-colors">
                          <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#323232]">{item.name}</td>
                          <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#323232] text-right font-[var(--font-weight-medium)]">
                            {item.value}
                          </td>
                          <td className="py-[12px] px-[16px] text-[var(--text-sm)] text-[#656a6c] text-right">
                            {item.percentage}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}