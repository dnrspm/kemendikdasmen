import { BannerType } from '@/app/components/SystemBanner';

export interface SystemBannerData {
  id: string;
  type: BannerType;
  message: string;
  dismissible: boolean;
  showIcon: boolean;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
}

/**
 * Data banner sistem yang dapat dikonfigurasi
 * Banner akan ditampilkan berdasarkan tanggal dan status aktif
 */
export const systemBanners: SystemBannerData[] = [
  {
    id: 'maintenance-march-2026',
    type: 'maintenance',
    message: 'Sistem sedang dalam pemeliharaan terjadwal pada Sabtu, 15 Maret 2026 pukul 22:00 - 02:00 WIB. Beberapa layanan mungkin tidak tersedia.',
    dismissible: true,
    showIcon: true,
    startDate: new Date('2026-03-13'),
    endDate: new Date('2026-03-16'),
    isActive: true
  },
  {
    id: 'info-new-feature',
    type: 'info',
    message: 'Fitur baru! Kini Anda dapat mengunduh sertifikat pelatihan langsung dari Portal Sivitas.',
    dismissible: true,
    showIcon: true,
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-03-31'),
    isActive: false // Set ke false untuk menonaktifkan
  },
  {
    id: 'warning-deadline',
    type: 'warning',
    message: 'Perhatian! Batas waktu pengisian laporan kinerja bulan Februari akan berakhir pada 5 Maret 2026. Segera lengkapi data Anda.',
    dismissible: true,
    showIcon: true,
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-03-05'),
    isActive: false
  }
];

/**
 * Fungsi untuk mendapatkan banner yang aktif berdasarkan tanggal
 */
export function getActiveBanners(currentDate: Date = new Date()): SystemBannerData[] {
  return systemBanners.filter(banner => {
    if (!banner.isActive) return false;
    
    // Jika tidak ada tanggal, selalu tampilkan
    if (!banner.startDate && !banner.endDate) return true;
    
    // Cek apakah dalam range tanggal
    const isAfterStart = !banner.startDate || currentDate >= banner.startDate;
    const isBeforeEnd = !banner.endDate || currentDate <= banner.endDate;
    
    return isAfterStart && isBeforeEnd;
  });
}
