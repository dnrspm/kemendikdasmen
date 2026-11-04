import { X } from 'lucide-react';
import imgStaff from '@/assets/staging/img-staff.png';
import imgSinde from '@/assets/staging/img-sinde.png';
import imgAttendance from '@/assets/staging/img-attendance.png';
import imgPerformance from '@/assets/staging/img-performance.png';
import imgStatistic from '@/assets/staging/img-statistic.png';
import imgTutWuri from '@/assets/staging/img-tut-wuri-handayani.png';
import imgAnalytic from '@/assets/staging/img-analytic.png';
import imgAgenda from '@/assets/staging/img-agenda.png';
import imgDrive from '@/assets/staging/img-drive.png';
import imgVideo from '@/assets/staging/img-video-conference.png';
import imgDocument from '@/assets/staging/img-document.png';
import imgSheet from '@/assets/staging/img-sheet.png';
import imgPresentation from '@/assets/staging/img-presentation.png';
import imgSetting from '@/assets/staging/img-setting.png';

interface Props {
  open: boolean;
  onClose: () => void;
  onNavigate: { kepegawaian?: () => void; profilASN?: () => void; dasbor?: () => void; pengaturan?: () => void };
}

export function MenuLainnyaModal({ open, onClose, onNavigate }: Props) {
  if (!open) return null;
  const items: { name: string; icon: string; onClick?: () => void }[] = [
    { name: 'Kepegawaian', icon: imgStaff, onClick: onNavigate.kepegawaian },
    { name: 'Sistem Naskah Dinas Elektronik', icon: imgSinde },
    { name: 'Kehadiran', icon: imgAttendance },
    { name: 'Kinerja', icon: imgPerformance },
    { name: 'Ruang Talenta', icon: imgStatistic },
    { name: 'Email Kemendikdasmen', icon: imgTutWuri },
    { name: 'Profil ASN Kemendikdasmen', icon: imgTutWuri, onClick: onNavigate.profilASN },
    { name: 'Dasbor Eksekutif', icon: imgAnalytic, onClick: onNavigate.dasbor },
    { name: 'Dasbor Kunjungan Kerja', icon: imgStatistic },
    { name: 'Wiyata Kinarya', icon: imgTutWuri },
    { name: 'Agenda', icon: imgAgenda, onClick: () => window.open('https://calendar.google.com/', '_blank') },
    { name: 'Penyimpanan Elektronik', icon: imgDrive, onClick: () => window.open('https://drive.google.com/', '_blank') },
    { name: 'Konferensi Video', icon: imgVideo, onClick: () => window.open('https://meet.google.com/', '_blank') },
    { name: 'Dokumen Kolaborasi', icon: imgDocument, onClick: () => window.open('https://docs.google.com/', '_blank') },
    { name: 'Spreadsheet Kolaborasi', icon: imgSheet, onClick: () => window.open('https://docs.google.com/spreadsheets/', '_blank') },
    { name: 'Presentasi Kolaborasi', icon: imgPresentation, onClick: () => window.open('https://docs.google.com/presentation/', '_blank') },
    { name: 'Pengaturan Umum', icon: imgSetting, onClick: onNavigate.pengaturan },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 grid place-items-center p-[16px]" onClick={onClose} role="presentation">
      <div role="dialog" aria-label="Menu Utama Portal Kemendikdasmen" onClick={(e) => e.stopPropagation()} className="bg-white rounded-[12px] w-full max-w-[640px] max-h-[92vh] overflow-y-auto p-[20px]">
        <div className="flex items-center justify-between pb-[12px] border-b border-[#e4e4e4] mb-[16px]">
          <h2 className="font-semibold text-sd-gray-90" style={{ fontSize: 'var(--text-lg)' }}>Menu Utama Portal Kemendikdasmen</h2>
          <button onClick={onClose} aria-label="Close" className="border border-sd-blue-70 rounded-[4px] p-[2px]"><X className="size-[16px] text-sd-blue-70" /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
          {items.map((it) => (
            <button key={it.name} onClick={() => { it.onClick?.(); if (it.onClick) onClose(); }} className="flex items-center gap-[12px] px-[12px] py-[6px] rounded-[4px] bg-sd-blue-5 hover:bg-[#dbeafc] text-left">
              <img alt="" src={it.icon} className="size-[40px] object-contain shrink-0" />
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{it.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
