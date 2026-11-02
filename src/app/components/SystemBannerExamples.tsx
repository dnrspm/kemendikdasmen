import { SystemBanner } from './SystemBanner';

/**
 * Contoh penggunaan komponen SystemBanner
 * 
 * Komponen ini dapat digunakan untuk menampilkan pemberitahuan sistem
 * seperti maintenance, peringatan, atau informasi penting lainnya.
 */

export function SystemBannerExamples() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Contoh 1: Banner Maintenance */}
      <SystemBanner 
        type="maintenance"
        message="Sistem sedang dalam pemeliharaan terjadwal pada Sabtu, 15 Maret 2026 pukul 22:00 - 02:00 WIB. Beberapa layanan mungkin tidak tersedia."
        dismissible={true}
        showIcon={true}
      />

      {/* Contoh 2: Banner Warning */}
      <SystemBanner 
        type="warning"
        message="Perhatian! Batas waktu pengisian laporan kinerja akan berakhir dalam 3 hari. Segera lengkapi data Anda."
        dismissible={true}
        showIcon={true}
      />

      {/* Contoh 3: Banner Info */}
      <SystemBanner 
        type="info"
        message="Fitur baru telah ditambahkan: Kini Anda dapat mengunduh sertifikat pelatihan langsung dari portal."
        dismissible={true}
        showIcon={true}
      />

      {/* Contoh 4: Banner tanpa tombol dismiss */}
      <SystemBanner 
        type="info"
        message="Sistem akan diperbarui dengan fitur keamanan terbaru. Terima kasih atas kesabaran Anda."
        dismissible={false}
        showIcon={true}
      />
    </div>
  );
}

/**
 * Props yang tersedia:
 * 
 * @param type - Tipe banner: 'info' | 'warning' | 'maintenance'
 *   - 'info': Banner informasi berwarna biru
 *   - 'warning': Banner peringatan berwarna merah
 *   - 'maintenance': Banner maintenance berwarna kuning
 * 
 * @param message - Pesan yang ditampilkan di banner
 * 
 * @param dismissible - Apakah banner bisa ditutup oleh user? (default: false)
 * 
 * @param showIcon - Tampilkan icon di samping pesan? (default: true)
 */
