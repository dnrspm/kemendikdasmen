import React from 'react';

type StatusKehadiran = 'belum-presensi' | 'hadir' | 'terlambat' | 'selesai';

interface KehadiranHariIniProps {
  status?: StatusKehadiran;
  absenMasuk?: string;
  absenKeluar?: string;
  lastUpdate?: Date;
  timezone?: 'WIB' | 'WITA' | 'WIT';
}

const statusConfig: Record<StatusKehadiran, { label: string; bg: string; color: string }> = {
  'belum-presensi': { label: 'Belum Presensi', bg: '#feefef', color: 'var(--destructive)' },
  'hadir': { label: 'Hadir', bg: '#eef6ee', color: 'var(--chart-2)' },
  'terlambat': { label: 'Terlambat', bg: '#fff8ec', color: 'var(--chart-4)' },
  'selesai': { label: 'Selesai Bekerja', bg: '#fff8ec', color: 'var(--chart-4)' },
};

// Helper function to get timezone based on UTC offset
function getTimezoneFromOffset(offsetMinutes: number): 'WIB' | 'WITA' | 'WIT' {
  const offsetHours = Math.abs(offsetMinutes / 60);
  if (offsetHours === 7) return 'WIB'; // UTC+7 (Jakarta, West Indonesia)
  if (offsetHours === 8) return 'WITA'; // UTC+8 (Central Indonesia)
  if (offsetHours === 9) return 'WIT'; // UTC+9 (East Indonesia)
  return 'WIB'; // Default to WIB
}

// Helper function to format date in Indonesian
function formatIndonesianDate(date: Date, timezone: 'WIB' | 'WITA' | 'WIT'): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `Pembaruan terakhir: ${hours}.${minutes} ${timezone}`;
}

export function KehadiranHariIni({
  status = 'belum-presensi',
  absenMasuk = '--:--',
  absenKeluar = '--:--',
  lastUpdate,
  timezone,
}: KehadiranHariIniProps) {
  const badge = statusConfig[status];

  // Determine timezone and format date
  const now = lastUpdate || new Date();
  const detectedTimezone = timezone || getTimezoneFromOffset(now.getTimezoneOffset());
  const formattedDate = formatIndonesianDate(now, detectedTimezone);

  return (
    <div className="bg-card border rounded-[var(--radius-card)] overflow-hidden w-full" style={{ borderColor: '#c7c7c7' }}>
      {/* Greeting Section */}
      <div
        className="px-[24px] py-[20px] flex flex-col gap-[8px]"
        style={{ backgroundColor: 'rgba(11, 95, 239, 0.08)' }}
      >
        <span
          className="font-['Inter',sans-serif] uppercase"
          style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}
        >
          Halo, Sarah!
        </span>
        <span
          className="font-['Inter',sans-serif]"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-normal)', color: 'var(--foreground)' }}
        >
          Selamat datang di Portal Sivitas Kemendikdasmen. Kelola Administrasi Pegawai dalam Satu Platform
        </span>
      </div>

      {/* Kehadiran Section */}
      <div className="p-[20px] flex flex-col gap-[16px]">
        {/* Header - Title with Date */}
        <div className="flex items-center justify-between">
          <p className="font-['Inter',sans-serif] uppercase tracking-[0.5px]" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
            <span style={{ color: 'var(--foreground)' }}>Kehadiran Hari Ini | </span>
            <span style={{ color: 'var(--muted-foreground)' }}>
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}
            </span>
          </p>
        </div>

        {/* Absen Masuk / Keluar */}
        <div className="flex items-stretch">
          <div className="flex flex-col gap-[4px] flex-1">
            <span
              className="font-['Inter',sans-serif]"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-normal)', color: 'var(--muted-foreground)' }}
            >
              Absen Masuk
            </span>
            <span
              className="font-['Inter',sans-serif]"
              style={{ fontSize: '20px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}
            >
              {absenMasuk} <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>WIB</span>
            </span>
          </div>

          {/* Divider */}
          <div className="w-px mx-[24px]" style={{ backgroundColor: 'var(--border)' }} />

          <div className="flex flex-col gap-[4px] flex-1">
            <span
              className="font-['Inter',sans-serif]"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-normal)', color: 'var(--muted-foreground)' }}
            >
              Absen Keluar
            </span>
            <span
              className="font-['Inter',sans-serif]"
              style={{ fontSize: '20px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}
            >
              {absenKeluar} <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>WIB</span>
            </span>
          </div>
        </div>

        {/* Bottom Row - Pembaruan Terakhir & Badge */}
        <div className="flex items-center justify-between">
          <span
            className="font-['Inter',sans-serif]"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-normal)', color: 'var(--muted-foreground)' }}
          >
            {formattedDate}
          </span>
          <div className="flex items-center gap-[8px]">
            <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: badge.color }} />
            <span
              className="rounded-full px-[12px] py-[4px] font-['Inter',sans-serif]"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                backgroundColor: badge.bg,
                color: badge.color,
              }}
            >
              {badge.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}