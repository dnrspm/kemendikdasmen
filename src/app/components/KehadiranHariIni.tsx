import { Badge } from 'seragam-design-system';
import { Info } from 'lucide-react';

type StatusKehadiran = 'belum-presensi' | 'hadir' | 'terlambat' | 'selesai';

interface KehadiranHariIniProps {
  userName?: string;
  status?: StatusKehadiran;
  absenMasuk?: string;
  absenKeluar?: string;
}

const statusConfig: Record<StatusKehadiran, { label: string; tone: 'green' | 'amber' | 'red' | 'blue' | 'gray' }> = {
  'belum-presensi': { label: 'Belum Presensi', tone: 'amber' },
  'hadir': { label: 'Hadir', tone: 'green' },
  'terlambat': { label: 'Terlambat', tone: 'amber' },
  'selesai': { label: 'Selesai Bekerja', tone: 'amber' },
};

export function KehadiranHariIni({
  userName = 'Ahmad Wijaya',
  status = 'belum-presensi',
  absenMasuk = '-',
  absenKeluar = '-',
}: KehadiranHariIniProps) {
  const badge = statusConfig[status];
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-card border rounded-[var(--radius-card)] overflow-hidden w-full" style={{ borderColor: 'var(--sd-gray-20)' }}>
      <div className="px-[20px] py-[16px] flex flex-col gap-[8px]" style={{ backgroundColor: 'var(--sd-blue-5)' }}>
        <span className="font-['Inter',sans-serif] uppercase text-sd-gray-90" style={{ fontSize: '24px', fontWeight: 600, lineHeight: '28px' }}>
          Halo, {userName}!
        </span>
        <span className="font-['Inter',sans-serif] text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>
          Selamat datang di Portal Sivitas Kemendikdasmen. Kelola Administrasi Pegawai dalam Satu Platform
        </span>
      </div>

      <div className="px-[20px] py-[16px] flex flex-col gap-[12px]">
        <p className="font-['Inter',sans-serif] uppercase text-sd-gray-60" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}>
          Kehadiran Hari Ini | {today}
        </p>

        <div>
          <Badge tone={badge.tone}>{badge.label}</Badge>
        </div>

        <div className="flex items-stretch">
          <div className="flex flex-col gap-[2px] flex-1">
            <span className="text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>Presensi Masuk</span>
            <span className="text-sd-gray-90" style={{ fontSize: '19px', fontWeight: 600, lineHeight: '24px' }}>{absenMasuk}</span>
          </div>
          <div className="w-px mx-[16px]" style={{ backgroundColor: 'var(--border)' }} />
          <div className="flex flex-col gap-[2px] flex-1">
            <span className="text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>Presensi Keluar</span>
            <span className="text-sd-gray-90" style={{ fontSize: '19px', fontWeight: 600, lineHeight: '24px' }}>{absenKeluar}</span>
          </div>
        </div>

        <div className="flex items-center gap-[6px] text-[#4c8df6]" style={{ fontSize: '12px', lineHeight: '16px' }}>
          <Info className="size-[14px]" />
          <span style={{ fontSize: '12px', lineHeight: '16px' }}>Hanya data presensi dari ASIGO yang akan tampil</span>
        </div>
      </div>
    </div>
  );
}
