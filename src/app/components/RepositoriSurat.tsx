import { useState, useMemo } from 'react';
import { 
  Search, 
  Home, 
  ChevronRight, 
  Download,
  X,
  ChevronDown,
  FileText
} from 'lucide-react';
import { Header } from '@/app/components/Header';

interface DocumentData {
  id: string;
  title: string;
  number: string;
  type: 'Surat JF' | 'Kepmen';
  year: number;
  jfDetails?: {
    jenjang: string;
    jumlah: number;
  }[];
  kepmenDetails?: {
    no: number;
    namaJabatan: string;
    kelasJabatan: string;
    persediaanPegawai: number;
  }[];
}

interface RepositoriSuratProps {
  onBack: () => void;
}

export function RepositoriSurat({ onBack }: RepositoriSuratProps) {
  const [selectedTipe, setSelectedTipe] = useState<string>('surat-jf');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const [detailDocument, setDetailDocument] = useState<DocumentData | null>(null);

  // Mock data
  const documentsData: DocumentData[] = [
    {
      id: '1',
      title: 'Surat Persetujuan Kebutuhan Jabatan Fungsional Analis Kebijakan',
      number: 'B-1234/KEP/2024',
      type: 'Surat JF',
      year: 2024,
      jfDetails: [
        { jenjang: 'Ahli Utama', jumlah: 2 },
        { jenjang: 'Ahli Madya', jumlah: 5 },
        { jenjang: 'Ahli Muda', jumlah: 12 },
        { jenjang: 'Ahli Pertama', jumlah: 18 }
      ]
    },
    {
      id: '2',
      title: 'Keputusan Menteri tentang Peta Jabatan Fungsional',
      number: 'Kepmen-5678/2024',
      type: 'Kepmen',
      year: 2024,
      kepmenDetails: [
        { no: 1, namaJabatan: 'Analis Kebijakan Ahli Utama', kelasJabatan: '14', persediaanPegawai: 3 },
        { no: 2, namaJabatan: 'Analis Kebijakan Ahli Madya', kelasJabatan: '12', persediaanPegawai: 8 },
        { no: 3, namaJabatan: 'Analis Kebijakan Ahli Muda', kelasJabatan: '11', persediaanPegawai: 15 },
        { no: 4, namaJabatan: 'Analis Kebijakan Ahli Pertama', kelasJabatan: '9', persediaanPegawai: 22 },
        { no: 5, namaJabatan: 'Perencana Ahli Utama', kelasJabatan: '14', persediaanPegawai: 2 },
        { no: 6, namaJabatan: 'Perencana Ahli Madya', kelasJabatan: '12', persediaanPegawai: 6 }
      ]
    },
    {
      id: '3',
      title: 'Surat Persetujuan Kebutuhan JF Pranata Komputer',
      number: 'B-2345/KEP/2024',
      type: 'Surat JF',
      year: 2024,
      jfDetails: [
        { jenjang: 'Ahli Utama', jumlah: 1 },
        { jenjang: 'Ahli Madya', jumlah: 3 },
        { jenjang: 'Ahli Muda', jumlah: 8 },
        { jenjang: 'Ahli Pertama', jumlah: 15 },
        { jenjang: 'Terampil', jumlah: 10 }
      ]
    },
    {
      id: '4',
      title: 'Keputusan Menteri Penetapan Peta Jabatan Fungsional Tahun 2023',
      number: 'Kepmen-9012/2023',
      type: 'Kepmen',
      year: 2023,
      kepmenDetails: [
        { no: 1, namaJabatan: 'Pranata Komputer Ahli Utama', kelasJabatan: '14', persediaanPegawai: 2 },
        { no: 2, namaJabatan: 'Pranata Komputer Ahli Madya', kelasJabatan: '12', persediaanPegawai: 5 },
        { no: 3, namaJabatan: 'Pranata Komputer Ahli Muda', kelasJabatan: '11', persediaanPegawai: 10 },
        { no: 4, namaJabatan: 'Pranata Komputer Ahli Pertama', kelasJabatan: '9', persediaanPegawai: 18 }
      ]
    },
    {
      id: '5',
      title: 'Surat Persetujuan Kebutuhan JF Arsiparis',
      number: 'B-3456/KEP/2023',
      type: 'Surat JF',
      year: 2023,
      jfDetails: [
        { jenjang: 'Ahli Madya', jumlah: 2 },
        { jenjang: 'Ahli Muda', jumlah: 6 },
        { jenjang: 'Ahli Pertama', jumlah: 12 },
        { jenjang: 'Terampil', jumlah: 8 }
      ]
    },
    {
      id: '6',
      title: 'Surat Persetujuan Kebutuhan JF Pengelola Pengadaan Barang/Jasa',
      number: 'B-4567/KEP/2024',
      type: 'Surat JF',
      year: 2024,
      jfDetails: [
        { jenjang: 'Ahli Madya', jumlah: 3 },
        { jenjang: 'Ahli Muda', jumlah: 7 },
        { jenjang: 'Ahli Pertama', jumlah: 14 }
      ]
    },
    {
      id: '7',
      title: 'Keputusan Menteri Peta Jabatan Fungsional Formasi Tahun 2023',
      number: 'Kepmen-1122/2023',
      type: 'Kepmen',
      year: 2023,
      kepmenDetails: [
        { no: 1, namaJabatan: 'Auditor Ahli Utama', kelasJabatan: '14', persediaanPegawai: 1 },
        { no: 2, namaJabatan: 'Auditor Ahli Madya', kelasJabatan: '12', persediaanPegawai: 4 },
        { no: 3, namaJabatan: 'Auditor Ahli Muda', kelasJabatan: '11', persediaanPegawai: 9 },
        { no: 4, namaJabatan: 'Auditor Ahli Pertama', kelasJabatan: '9', persediaanPegawai: 16 }
      ]
    },
    {
      id: '8',
      title: 'Surat Persetujuan Kebutuhan JF Auditor',
      number: 'B-5678/KEP/2022',
      type: 'Surat JF',
      year: 2022,
      jfDetails: [
        { jenjang: 'Ahli Utama', jumlah: 1 },
        { jenjang: 'Ahli Madya', jumlah: 4 },
        { jenjang: 'Ahli Muda', jumlah: 9 },
        { jenjang: 'Ahli Pertama', jumlah: 16 }
      ]
    }
  ];

  // Get unique years
  const yearOptions = useMemo(() => {
    const years = [...new Set(documentsData.map(d => d.year))];
    return years.sort((a, b) => b - a);
  }, []);

  // Filter documents based on tab, search, and year
  const filteredDocuments = useMemo(() => {
    return documentsData.filter(doc => {
      // Tab filter
      if (selectedTipe === 'surat-jf' && doc.type !== 'Surat JF') return false;
      if (selectedTipe === 'kepmen' && doc.type !== 'Kepmen') return false;

      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = !searchQuery || 
        doc.title.toLowerCase().includes(searchLower) ||
        doc.number.toLowerCase().includes(searchLower);
      
      if (!matchSearch) return false;

      // Year filter
      if (selectedYear !== 'all' && doc.year !== parseInt(selectedYear)) return false;

      return true;
    });
  }, [selectedTipe, searchQuery, selectedYear]);

  const handleDownload = (doc: DocumentData) => {
    // Mock download functionality
    console.log('Downloading:', doc.number);
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
              onClick={onBack}
              className="text-[var(--text-sm)] text-muted-foreground hover:text-primary transition-colors"
            >
              Layanan
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <span className="text-[var(--text-sm)] text-foreground font-[var(--font-weight-medium)]">
              Repositori Surat Persetujuan Kebutuhan JF
            </span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-[#EFEFEF]">
        <div className="max-w-[1440px] mx-auto px-[24px] py-[32px]">
          <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[8px]">
            Repositori Surat Persetujuan Kebutuhan JF
          </h1>
          <p className="text-[var(--text-base)] text-[#656a6c]">
            Akses dan unduh surat persetujuan kebutuhan jabatan fungsional dari berbagai tahun
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-[24px] py-[24px]">
        <div className="bg-white border border-[#E2E8F0] rounded-[8px] overflow-hidden">

          {/* ── Baris 1: Tab navigasi jenis dokumen ─────────────────────────── */}
          <div className="px-[24px] border-b border-[#E2E8F0]">
            <div className="flex gap-[32px]">
              {([
                { value: 'surat-jf', label: 'Surat Kebutuhan JF' },
                { value: 'kepmen',   label: 'Kepmen Peta Jabatan' },
              ] as const).map(({ value, label }) => {
                const isActive = selectedTipe === value;
                return (
                  <button
                    key={value}
                    onClick={() => setSelectedTipe(value)}
                    className="relative py-[16px] transition-all"
                  >
                    <span
                      className="text-[15px] leading-[22px] whitespace-nowrap"
                      style={{
                        fontWeight: 'var(--font-weight-semibold)',
                        color: isActive ? '#0b5fef' : '#65686c',
                      }}
                    >
                      {label}
                    </span>
                    {/* Active underline */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full transition-all"
                      style={{ backgroundColor: isActive ? '#0b5fef' : 'transparent' }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Baris 2: Search + Filter tahun ──────────────────────────────── */}
          <div className="px-[24px] py-[16px] border-b border-[#E2E8F0] flex items-center gap-[12px]">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#808489]" />
              <input
                type="text"
                placeholder="Cari nama atau nomor dokumen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[40px] pl-[42px] pr-[16px] border border-[#c7c7c7] rounded-[4px] text-[var(--text-base)] text-[#2f3031] placeholder:text-[#808489] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white"
              />
            </div>

            {/* Year Filter */}
            <div className="relative">
              <button
                onClick={() => setShowYearDropdown(!showYearDropdown)}
                className="flex items-center gap-[8px] h-[40px] px-[14px] border border-[#c7c7c7] rounded-[4px] bg-white text-[var(--text-base)] text-[#2f3031] hover:border-[#1A5BA6] transition-colors min-w-[148px] justify-between"
              >
                <span>{selectedYear === 'all' ? 'Semua Tahun' : selectedYear}</span>
                <ChevronDown className="w-[16px] h-[16px] text-[#656a6c]" />
              </button>

              {showYearDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowYearDropdown(false)}
                  />
                  <div className="absolute top-full mt-[8px] right-0 bg-white border border-[#E2E8F0] rounded-[8px] shadow-lg min-w-[148px] z-50">
                    <div className="p-[8px]">
                      <button
                        onClick={() => {
                          setSelectedYear('all');
                          setShowYearDropdown(false);
                        }}
                        className={`w-full text-left px-[12px] py-[8px] rounded-[4px] text-[var(--text-sm)] transition-colors ${
                          selectedYear === 'all' ? 'bg-[#EBF2FF] text-[#1A5BA6]' : 'hover:bg-[#F9FAFB]'
                        }`}
                      >
                        Semua Tahun
                      </button>
                      {yearOptions.map(year => (
                        <button
                          key={year}
                          onClick={() => {
                            setSelectedYear(year.toString());
                            setShowYearDropdown(false);
                          }}
                          className={`w-full text-left px-[12px] py-[8px] rounded-[4px] text-[var(--text-sm)] transition-colors ${
                            selectedYear === year.toString() ? 'bg-[#EBF2FF] text-[#1A5BA6]' : 'hover:bg-[#F9FAFB]'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Baris 3: Tabel dokumen ──────────────────────────────────────── */}
          {filteredDocuments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F9FAFB] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="px-[20px] py-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] uppercase tracking-wider">
                      Nama Dokumen
                    </th>
                    <th className="px-[20px] py-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] uppercase tracking-wider w-[200px]">
                      Nomor Dokumen
                    </th>
                    <th className="px-[20px] py-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] uppercase tracking-wider w-[180px]">
                      Tipe
                    </th>
                    <th className="px-[20px] py-[12px] text-center text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] uppercase tracking-wider w-[100px]">
                      Tahun
                    </th>
                    <th className="px-[20px] py-[12px] text-center text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] uppercase tracking-wider w-[200px]">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-[#F9FAFB] transition-colors">
                      {/* Document Name */}
                      <td className="px-[20px] py-[14px]">
                        <p className="text-[var(--text-base)] text-[#2f3031] leading-snug">
                          {doc.title}
                        </p>
                      </td>

                      {/* Document Number */}
                      <td className="px-[20px] py-[14px]">
                        <p className="text-[var(--text-sm)] text-[#656a6c]">
                          {doc.number}
                        </p>
                      </td>

                      {/* Type */}
                      <td className="px-[20px] py-[14px]">
                        <span className={`inline-flex px-[12px] py-[6px] rounded-[16px] text-[var(--text-sm)] font-[var(--font-weight-medium)] ${
                          doc.type === 'Surat JF'
                            ? 'bg-[#DBEAFE] text-[#1E40AF]'
                            : 'bg-[#FEF3C7] text-[#92400E]'
                        }`}>
                          {doc.type}
                        </span>
                      </td>

                      {/* Year */}
                      <td className="px-[20px] py-[14px] text-center">
                        <span className="text-[var(--text-base)] text-[#2f3031]">
                          {doc.year}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-[20px] py-[14px] w-[240px]">
                        <div className="flex items-center justify-center gap-[8px]">
                          <button
                            onClick={() => setDetailDocument(doc)}
                            className="whitespace-nowrap px-[12px] py-[6px] bg-transparent hover:bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] rounded-[var(--radius-button)] text-[var(--text-sm)] transition-colors"
                          >
                            Lihat Detail
                          </button>
                          <button
                            onClick={() => handleDownload(doc)}
                            className="whitespace-nowrap flex items-center gap-[6px] px-[12px] py-[6px] bg-transparent hover:bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] rounded-[var(--radius-button)] text-[var(--text-sm)] transition-colors"
                          >
                            <Download className="w-[16px] h-[16px]" />
                            Unduh
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty State */
            <div className="p-[64px] text-center">
              <div className="max-w-[400px] mx-auto">
                <Search className="w-[64px] h-[64px] text-[#808489] mx-auto mb-[16px]" />
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[8px]">
                  Dokumen Tidak Ditemukan
                </h3>
                <p className="text-[var(--text-sm)] text-[#656a6c] mb-[24px]">
                  Tidak ada dokumen yang sesuai dengan kriteria pencarian Anda.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedYear('all');
                  }}
                  className="px-[24px] py-[12px] bg-primary text-primary-foreground rounded-[4px] text-[var(--text-base)] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity"
                >
                  Reset Pencarian
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {detailDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
          <div className="bg-white rounded-[12px] w-full max-w-[800px] max-h-[90vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-[24px] border-b border-[#E2E8F0]">
              <div className="flex-1 pr-[16px]">
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[4px]">
                  Detail Dokumen
                </h3>
                <p className="text-[var(--text-sm)] text-[#656a6c]">
                  {detailDocument.title}
                </p>
                <p className="text-[var(--text-sm)] text-[#656a6c] mt-[4px]">
                  {detailDocument.number}
                </p>
              </div>
              <button
                onClick={() => setDetailDocument(null)}
                className="p-[8px] rounded-[6px] hover:bg-[#F9FAFB] transition-colors"
              >
                <X className="w-[20px] h-[20px] text-[#656a6c]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-[24px]">
              {detailDocument.type === 'Surat JF' && detailDocument.jfDetails ? (
                /* JF Detail Table */
                <div>
                  <h4 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[16px]">
                    Rincian Kebutuhan Jabatan Fungsional
                  </h4>
                  <div className="border border-[#E2E8F0] rounded-[8px] overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-[#F9FAFB]">
                        <tr>
                          <th className="px-[16px] py-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] border-b border-[#E2E8F0]">
                            Jenjang Jabatan
                          </th>
                          <th className="px-[16px] py-[12px] text-right text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] border-b border-[#E2E8F0] w-[200px]">
                            Jumlah Kebutuhan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailDocument.jfDetails.map((item, idx) => (
                          <tr key={idx} className="border-b border-[#E2E8F0] last:border-b-0">
                            <td className="px-[16px] py-[10px] text-[var(--text-sm)] text-[#2f3031]">
                              {item.jenjang}
                            </td>
                            <td className="px-[16px] py-[10px] text-[var(--text-sm)] text-[#2f3031] text-right">
                              {item.jumlah}
                            </td>
                          </tr>
                        ))}
                        {/* Total Row */}
                        <tr className="bg-[#F9FAFB]">
                          <td className="px-[16px] py-[12px] text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031]">
                            Total
                          </td>
                          <td className="px-[16px] py-[12px] text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] text-right">
                            {detailDocument.jfDetails.reduce((sum, item) => sum + item.jumlah, 0)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : detailDocument.type === 'Kepmen' && detailDocument.kepmenDetails ? (
                /* Kepmen Detail Table */
                <div>
                  <h4 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[16px]">
                    Peta Jabatan Fungsional
                  </h4>
                  <div className="border border-[#E2E8F0] rounded-[8px] overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-[#F9FAFB]">
                        <tr>
                          <th className="px-[16px] py-[12px] text-center text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] border-b border-[#E2E8F0] w-[60px]">
                            No
                          </th>
                          <th className="px-[16px] py-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] border-b border-[#E2E8F0]">
                            Nama Jabatan
                          </th>
                          <th className="px-[16px] py-[12px] text-center text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] border-b border-[#E2E8F0] w-[140px]">
                            Kelas Jabatan
                          </th>
                          <th className="px-[16px] py-[12px] text-right text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] border-b border-[#E2E8F0] w-[180px]">
                            Persediaan Pegawai
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailDocument.kepmenDetails.map((item, idx) => (
                          <tr key={idx} className="border-b border-[#E2E8F0] last:border-b-0">
                            <td className="px-[16px] py-[10px] text-[var(--text-sm)] text-[#2f3031] text-center">
                              {item.no}
                            </td>
                            <td className="px-[16px] py-[10px] text-[var(--text-sm)] text-[#2f3031]">
                              {item.namaJabatan}
                            </td>
                            <td className="px-[16px] py-[10px] text-[var(--text-sm)] text-[#2f3031] text-center">
                              {item.kelasJabatan}
                            </td>
                            <td className="px-[16px] py-[10px] text-[var(--text-sm)] text-[#2f3031] text-right">
                              {item.persediaanPegawai}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="p-[24px] border-t border-[#E2E8F0] flex justify-end gap-[12px]">
              <button
                onClick={() => setDetailDocument(null)}
                className="px-[20px] py-[10px] border border-[#c7c7c7] text-[#2f3031] rounded-[4px] text-[var(--text-base)] font-[var(--font-weight-medium)] hover:bg-[#F9FAFB] transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={() => handleDownload(detailDocument)}
                className="flex items-center gap-[8px] px-[20px] py-[10px] bg-[#1A5BA6] text-white rounded-[4px] text-[var(--text-base)] font-[var(--font-weight-medium)] hover:bg-[#154A8C] transition-colors"
              >
                <Download className="w-[16px] h-[16px]" />
                Download Dokumen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}