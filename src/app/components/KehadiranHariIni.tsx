import { Info } from 'lucide-react';

type StatusKehadiran = 'belum-presensi' | 'hadir' | 'terlambat' | 'selesai';

interface KehadiranHariIniProps {
  userName?: string;
  status?: StatusKehadiran;
  absenMasuk?: string;
  absenKeluar?: string;
}

const statusConfig: Record<StatusKehadiran, { label: string; bg: string; color: string }> = {
  'belum-presensi': { label: 'Belum Presensi', bg: '#ffe2a8', color: '#8a5a00' },
  'hadir': { label: 'Hadir', bg: '#eef6ee', color: 'var(--chart-2)' },
  'terlambat': { label: 'Terlambat', bg: '#fff8ec', color: 'var(--chart-4)' },
  'selesai': { label: 'Selesai Bekerja', bg: '#fff8ec', color: 'var(--chart-4)' },
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
    <div className="bg-card border rounded-[var(--radius-card)] overflow-hidden w-full" style={{ borderColor: '#c7c7c7' }}>
      <div className="px-[20px] py-[16px] flex flex-col gap-[8px]" style={{ backgroundColor: '#eaf3fe' }}>
        <span className="font-['Inter',sans-serif] uppercase font-semibold text-[#2f3031]" style={{ fontSize: '24px' }}>
          Halo, {userName}!
        </span>
        <span className="font-['Inter',sans-serif] text-[#65696c]" style={{ fontSize: 'var(--text-sm)' }}>
          Selamat datang di Portal Sivitas Kemendikdasmen. Kelola Administrasi Pegawai dalam Satu Platform
        </span>
      </div>

      <div className="px-[20px] py-[16px] flex flex-col gap-[12px]">
        <p className="font-['Inter',sans-serif] uppercase text-[#65696c] font-medium" style={{ fontSize: 'var(--text-sm)' }}>
          <span className="text-[#2f3031]">Kehadiran Hari Ini</span> | {today}
        </p>

        <div>
          <span
            className="inline-block rounded-full px-[10px] py-[2px] font-['Inter',sans-serif] font-semibold"
            style={{ fontSize: 'var(--text-xs)', backgroundColor: badge.bg, color: badge.color }}
          >
            {badge.label}
          </span>
        </div>

        <div className="flex items-stretch">
          <div className="flex flex-col gap-[2px] flex-1">
            <span className="text-[#65696c]" style={{ fontSize: 'var(--text-sm)' }}>Presensi Masuk</span>
            <span className="font-semibold text-[#2f3031]" style={{ fontSize: '20px' }}>{absenMasuk}</span>
          </div>
          <div className="w-px mx-[16px]" style={{ backgroundColor: 'var(--border)' }} />
          <div className="flex flex-col gap-[2px] flex-1">
            <span className="text-[#65696c]" style={{ fontSize: 'var(--text-sm)' }}>Presensi Keluar</span>
            <span className="font-semibold text-[#2f3031]" style={{ fontSize: '20px' }}>{absenKeluar}</span>
          </div>
        </div>

        <div className="flex items-center gap-[6px] text-[#1a5fe0]" style={{ fontSize: 'var(--text-xs)' }}>
          <Info className="size-[14px]" />
          <span>Hanya data presensi dari ASIGO yang akan tampil</span>
        </div>
      </div>
    </div>
  );
}
