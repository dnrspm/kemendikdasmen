import { Info } from 'lucide-react';

type StatusKehadiran = 'belum-presensi' | 'hadir' | 'terlambat' | 'selesai';

interface KehadiranHariIniProps {
  userName?: string;
  status?: StatusKehadiran;
  absenMasuk?: string;
  absenKeluar?: string;
}

const statusConfig: Record<StatusKehadiran, { label: string; bg: string; color: string }> = {
  'belum-presensi': { label: 'Belum Presensi', bg: '#ffe2a8', color: '#b57f21' },
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
        <span className="font-['Inter',sans-serif] uppercase text-[#323232]" style={{ fontSize: '24px', fontWeight: 600, lineHeight: '28px' }}>
          Halo, {userName}!
        </span>
        <span className="font-['Inter',sans-serif] text-[#727272]" style={{ fontSize: '14px', lineHeight: '20px' }}>
          Selamat datang di Portal Sivitas Kemendikdasmen. Kelola Administrasi Pegawai dalam Satu Platform
        </span>
      </div>

      <div className="px-[20px] py-[16px] flex flex-col gap-[12px]">
        <p className="font-['Inter',sans-serif] uppercase text-[#727272]" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}>
          Kehadiran Hari Ini | {today}
        </p>

        <div>
          <span
            className="inline-block rounded-full px-[10px] py-[2px] font-['Inter',sans-serif]"
            style={{ fontSize: '14px', fontWeight: 700, lineHeight: '20px', backgroundColor: badge.bg, color: badge.color }}
          >
            {badge.label}
          </span>
        </div>

        <div className="flex items-stretch">
          <div className="flex flex-col gap-[2px] flex-1">
            <span className="text-[#727272]" style={{ fontSize: '14px', lineHeight: '20px' }}>Presensi Masuk</span>
            <span className="text-[#323232]" style={{ fontSize: '19px', fontWeight: 600, lineHeight: '24px' }}>{absenMasuk}</span>
          </div>
          <div className="w-px mx-[16px]" style={{ backgroundColor: 'var(--border)' }} />
          <div className="flex flex-col gap-[2px] flex-1">
            <span className="text-[#727272]" style={{ fontSize: '14px', lineHeight: '20px' }}>Presensi Keluar</span>
            <span className="text-[#323232]" style={{ fontSize: '19px', fontWeight: 600, lineHeight: '24px' }}>{absenKeluar}</span>
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
