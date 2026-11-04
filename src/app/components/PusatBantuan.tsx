import { ChevronDown, Upload, X, ChevronRight, Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Header } from "@/app/components/Header";

interface PusatBantuanProps {
  onBack: () => void;
  onNavigateToPusatInformasi?: () => void;
}

export function PusatBantuan({ onBack, onNavigateToPusatInformasi }: PusatBantuanProps) {
  const [formData, setFormData] = useState({
    jenis: '',
    kategori: '',
    detailPertanyaan: ''
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Reset scroll position to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jenisOptions = [
    { value: 'pertanyaan', label: 'Pertanyaan' },
    { value: 'permintaan', label: 'Permintaan' },
    { value: 'keluhan', label: 'Keluhan' },
    { value: 'saran', label: 'Saran' }
  ];

  const kategoriOptions = [
    { value: 'kepegawaian', label: 'Kepegawaian' },
    { value: 'snde', label: 'SNDE' },
    { value: 'kehadiran', label: 'Kehadiran' },
    { value: 'kinerja', label: 'Kinerja' },
    { value: 'layanan', label: 'Layanan' },
    { value: 'wiyata-kinarya', label: 'Wiyata Kinarya' },
    { value: 'teknis-it', label: 'Teknis & IT' },
    { value: 'lainnya', label: 'Lainnya' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData, uploadedFile);
    // Handle form submission logic here
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen w-full">
      {/* Navigation Header */}
      <Header onLogoClick={onBack} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0954D9] to-[#4C8DF6] text-white">
        <div className="max-w-[1440px] mx-auto px-[24px] py-[48px]">
          <div className="max-w-[800px] mx-auto text-center flex flex-col gap-[16px]">
            <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-medium)]">
              Pusat Bantuan
            </h1>
            <p className="text-[var(--text-lg)] opacity-90 leading-[1.6]">
              Sampaikan pertanyaan, permintaan, keluhan, atau saran Anda. Tim kami siap membantu memberikan solusi terbaik untuk Anda.
            </p>
          </div>
        </div>
      </div>

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
              onClick={onNavigateToPusatInformasi}
              className="text-[var(--text-sm)] text-muted-foreground hover:text-primary transition-colors"
            >
              Pusat Informasi
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <span className="text-[var(--text-sm)] text-foreground font-[var(--font-weight-medium)]">
              Pusat Bantuan
            </span>
          </nav>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-[1440px] mx-auto px-[24px] py-[40px]">
        <div className="max-w-[800px] mx-auto">
          <div className="bg-white rounded-[var(--radius-card)] border border-[#ADADAD] p-[32px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
              {/* Jenis Field */}
              <div className="flex flex-col gap-[8px]">
                <label htmlFor="jenis" className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#323232]">
                  Jenis <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <select
                    id="jenis"
                    required
                    value={formData.jenis}
                    onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                    className="w-full h-[48px] px-[16px] pr-[40px] border border-[#828282] rounded-[var(--radius)] text-[var(--text-base)] text-[#323232] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)] appearance-none cursor-pointer"
                  >
                    <option value="">Pilih jenis</option>
                    {jenisOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-[#727272] pointer-events-none" />
                </div>
              </div>

              {/* Kategori Field */}
              <div className="flex flex-col gap-[8px]">
                <label htmlFor="kategori" className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#323232]">
                  Layanan Kepegawaian <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <select
                    id="kategori"
                    required
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full h-[48px] px-[16px] pr-[40px] border border-[#828282] rounded-[var(--radius)] text-[var(--text-base)] text-[#323232] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)] appearance-none cursor-pointer"
                  >
                    <option value="">Pilih kategori</option>
                    {kategoriOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-[#727272] pointer-events-none" />
                </div>
              </div>

              {/* Detail Pertanyaan Field */}
              <div className="flex flex-col gap-[8px]">
                <label htmlFor="detail" className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#323232]">
                  Detail Pertanyaan <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="detail"
                  required
                  rows={6}
                  value={formData.detailPertanyaan}
                  onChange={(e) => setFormData({ ...formData, detailPertanyaan: e.target.value })}
                  placeholder="Jelaskan pertanyaan, permintaan, keluhan, atau saran Anda secara detail..."
                  className="w-full px-[16px] py-[12px] border border-[#828282] rounded-[var(--radius)] text-[var(--text-base)] text-[#323232] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)] placeholder:text-[#727272] resize-none"
                />
              </div>

              {/* File Upload Field */}
              <div className="flex flex-col gap-[8px]">
                <label htmlFor="file" className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#323232]">
                  Lampiran (Opsional)
                </label>
                <p className="text-[var(--text-sm)] text-[#656a6c] leading-[1.5]">
                  Upload file pendukung seperti screenshot atau dokumen (Maks. 5 MB)
                </p>
                
                {uploadedFile ? (
                  <div className="flex items-center justify-between p-[16px] bg-[#F5F5F5] border border-[#EFEFEF] rounded-[var(--radius)]">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[40px] h-[40px] bg-primary/10 rounded-[var(--radius)] flex items-center justify-center">
                        <svg className="w-[20px] h-[20px] text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[var(--text-base)] text-[#323232] font-[var(--font-weight-medium)]">
                          {uploadedFile.name}
                        </span>
                        <span className="text-[var(--text-sm)] text-[#656a6c]">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-[8px] hover:bg-destructive/10 rounded-[var(--radius)] transition-colors"
                    >
                      <X className="w-[20px] h-[20px] text-destructive" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center gap-[12px] p-[32px] border-2 border-dashed border-[#828282] rounded-[var(--radius)] cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <div className="w-[48px] h-[48px] bg-primary/10 rounded-full flex items-center justify-center">
                      <Upload className="w-[24px] h-[24px] text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-[var(--text-base)] text-[#323232] font-[var(--font-weight-medium)]">
                        Klik untuk upload file
                      </p>
                      <p className="text-[var(--text-sm)] text-[#656a6c] mt-[4px]">
                        PNG, JPG, PDF (Maks. 5 MB)
                      </p>
                    </div>
                    <input
                      id="file"
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-[8px]">
                <button
                  type="submit"
                  className="px-[32px] py-[12px] bg-primary text-primary-foreground rounded-[var(--radius-button)] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-[24px] p-[20px] bg-[#FFF9E6] border border-[#EDA62B] rounded-[var(--radius-card)]">
            <div className="flex gap-[12px]">
              <svg className="w-[24px] h-[24px] text-[#EDA62B] shrink-0 mt-[2px]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="flex flex-col gap-[4px]">
                <p className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#323232]">
                  Waktu Respons
                </p>
                <p className="text-[var(--text-sm)] text-[#656a6c] leading-[1.6]">
                  Tim kami akan merespons pertanyaan Anda dalam waktu 1x24 jam pada hari kerja. Untuk pertanyaan mendesak, silakan hubungi hotline kami di (021) 5733125.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}