import { ArrowLeft } from 'lucide-react';
import imgKemendikdasmen from "@/imports/image__20_-2.png";

interface DataPribadiPageProps {
  onBack: () => void;
}

export function DataPribadiPage({ onBack }: DataPribadiPageProps) {
  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-[24px] py-[16px]">
        <div className="flex items-center gap-[12px]">
          <button
            onClick={onBack}
            className="flex items-center gap-[8px] text-[#6B7280] hover:text-[#1F2937] transition-colors"
          >
            <ArrowLeft className="w-[20px] h-[20px]" />
            <span className="text-[var(--text-sm)]">Layanan Kepegawaian</span>
          </button>
        </div>
        <h1 className="text-[var(--text-xl)] font-[var(--font-weight-semibold)] text-[#1F2937] mt-[8px]">
          Data Pribadi
        </h1>
        <p className="text-[var(--text-sm)] text-[#6B7280] mt-[4px]">
          Silakan lengkapi data Anda di Form Pendaftaran
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-[24px]">
          <div className="flex gap-[8px] overflow-x-auto">
            <button className="px-[16px] py-[12px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#2563EB] border-b-2 border-[#2563EB] whitespace-nowrap">
              Data Pribadi
            </button>
            <button className="px-[16px] py-[12px] text-[var(--text-sm)] text-[#6B7280] hover:text-[#1F2937] border-b-2 border-transparent hover:border-[#D1D5DB] whitespace-nowrap">
              Data Keluarga
            </button>
            <button className="px-[16px] py-[12px] text-[var(--text-sm)] text-[#6B7280] hover:text-[#1F2937] border-b-2 border-transparent hover:border-[#D1D5DB] whitespace-nowrap">
              Riwayat Pendidikan
            </button>
            <button className="px-[16px] py-[12px] text-[var(--text-sm)] text-[#6B7280] hover:text-[#1F2937] border-b-2 border-transparent hover:border-[#D1D5DB] whitespace-nowrap">
              Pengalaman Jabatan
            </button>
            <button className="px-[16px] py-[12px] text-[var(--text-sm)] text-[#6B7280] hover:text-[#1F2937] border-b-2 border-transparent hover:border-[#D1D5DB] whitespace-nowrap">
              Riwayat Diklat
            </button>
            <button className="px-[16px] py-[12px] text-[var(--text-sm)] text-[#6B7280] hover:text-[#1F2937] border-b-2 border-transparent hover:border-[#D1D5DB] whitespace-nowrap">
              Master Data
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-[24px]">
          <div className="max-w-[1200px] mx-auto">
            {/* Info Banner */}
            <div className="bg-[#DBEAFE] border border-[#93C5FD] rounded-[8px] p-[16px] mb-[24px]">
              <p className="text-[var(--text-sm)] text-[#1E40AF]">
                Pastikan Anda melengkapi data pribadi yang benar dengan lengkap sesuai data di BKN. Kesalahan data dapat menyebabkan kesulitan Anda pada proses ke depan.
              </p>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] shadow-sm p-[32px]">
              <div className="flex flex-col lg:flex-row gap-[48px]">
                {/* Left Column - Profile Image and Basic Info */}
                <div className="lg:w-[300px] flex-shrink-0">
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Image */}
                    <div className="w-[140px] h-[140px] rounded-full overflow-hidden bg-[#F3F4F6] mb-[20px] border-4 border-white shadow-lg">
                      <img
                        src={imgKemendikdasmen}
                        alt="DR. AHMAD AFWAN NAIM"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name and Title */}
                    <h2 className="text-[var(--text-xl)] font-[var(--font-weight-semibold)] text-[#1F2937] mb-[8px]">
                      DR. AHMAD AFWAN NAIM
                    </h2>
                    <p className="text-[var(--text-sm)] text-[#6B7280] mb-[4px]">
                      NIP. 197308232002121003
                    </p>
                    <p className="text-[var(--text-sm)] text-[#6B7280] mb-[20px]">
                      Sekretaris Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah
                    </p>

                    {/* QR Code */}
                    <div className="bg-white p-[16px] rounded-[8px] border border-[#E5E7EB] inline-block">
                      <div className="w-[120px] h-[120px] bg-[#F3F4F6] flex items-center justify-center">
                        <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100">
                          <rect width="100" height="100" fill="white"/>
                          <g fill="black">
                            <rect x="10" y="10" width="8" height="8"/>
                            <rect x="26" y="10" width="8" height="8"/>
                            <rect x="42" y="10" width="8" height="8"/>
                            <rect x="58" y="10" width="8" height="8"/>
                            <rect x="74" y="10" width="8" height="8"/>
                            <rect x="10" y="26" width="8" height="8"/>
                            <rect x="42" y="26" width="8" height="8"/>
                            <rect x="74" y="26" width="8" height="8"/>
                            <rect x="10" y="42" width="8" height="8"/>
                            <rect x="26" y="42" width="8" height="8"/>
                            <rect x="42" y="42" width="8" height="8"/>
                            <rect x="58" y="42" width="8" height="8"/>
                            <rect x="74" y="42" width="8" height="8"/>
                            <rect x="10" y="58" width="8" height="8"/>
                            <rect x="42" y="58" width="8" height="8"/>
                            <rect x="74" y="58" width="8" height="8"/>
                            <rect x="10" y="74" width="8" height="8"/>
                            <rect x="26" y="74" width="8" height="8"/>
                            <rect x="42" y="74" width="8" height="8"/>
                            <rect x="58" y="74" width="8" height="8"/>
                            <rect x="74" y="74" width="8" height="8"/>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <p className="text-[var(--text-xs)] text-[#9CA3AF] mt-[8px]">Scan untuk info lebih lanjut</p>
                  </div>
                </div>

                {/* Right Column - Detailed Information */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-x-[40px] gap-y-[24px]">
                    {/* Left Grid */}
                    <div className="space-y-[24px]">
                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Pekerjaan
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">Laki-laki</p>
                      </div>

                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Lokasi/Instansi
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">Sekretariat Direktorat Jenderal</p>
                      </div>

                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Email Individu
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">ahmadafwan.naim@gmail.com</p>
                      </div>

                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Telepon
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">+62-</p>
                      </div>

                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Gelar Depan
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">Dr</p>
                      </div>

                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Tempat Dilahirkan
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">-</p>
                      </div>

                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Agama
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">Islam</p>
                      </div>
                    </div>

                    {/* Right Grid */}
                    <div className="space-y-[24px]">
                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Tempat
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">ahmadafwan.naim@kemdikbud.go.id</p>
                      </div>

                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Email Kemdikdasmen
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">ahmadafwan.naim@kemdikdasmen.go.id</p>
                      </div>

                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Alamat
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">
                          Jl. Lapangan Banteng Sel. No. 3-4, RT 01/RW 03, Kb. Kelapa, Kec. Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10710
                        </p>
                      </div>

                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Nama
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">AHMAD AFWAN NAIM</p>
                      </div>

                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Gelar Belakang
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">-</p>
                      </div>

                      <div>
                        <label className="block text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[#6B7280] mb-[6px]">
                          Tanggal Lahir
                        </label>
                        <p className="text-[var(--text-sm)] text-[#1F2937]">23 Agustus 1973</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-[12px] mt-[32px] pt-[24px] border-t border-[#E5E7EB]">
                    <button className="px-[20px] py-[10px] rounded-[6px] border border-[#D1D5DB] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#374151] hover:bg-[#F9FAFB] transition-colors">
                      Batal
                    </button>
                    <button className="px-[20px] py-[10px] rounded-[6px] bg-[#2563EB] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-white hover:bg-[#1D4ED8] transition-colors">
                      Simpan Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
