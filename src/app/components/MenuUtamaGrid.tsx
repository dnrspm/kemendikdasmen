import imgStaff from "@/assets/staging/img-staff.png";
import imgSinde from "@/assets/staging/img-sinde.png";
import imgAttendance from "@/assets/staging/img-attendance.png";
import imgPerformance from "@/assets/staging/img-performance.png";
import imgStatistic from "@/assets/staging/img-statistic.png";
import imgTutWuri from "@/assets/staging/img-tut-wuri-handayani.png";
import imgAnalytic from "@/assets/staging/img-analytic.png";
import imgOther from "@/assets/staging/img-other.png";

interface MenuUtamaGridProps {
  onNavigateToKepegawaian?: () => void;
  onNavigateToProfilASN?: () => void;
  onNavigateToDashboardAnalitik?: () => void;
  onNavigateToMenuLainnya?: () => void;
}

export function MenuUtamaGrid({
  onNavigateToKepegawaian,
  onNavigateToProfilASN,
  onNavigateToDashboardAnalitik,
  onNavigateToMenuLainnya,
}: MenuUtamaGridProps) {
  const open = (url: string) => () => window.open(url, '_blank');

  const menuItems = [
    { id: 'kepegawaian', name: 'Kepegawaian', icon: imgStaff, onClick: onNavigateToKepegawaian },
    { id: 'sinde', name: 'Sistem Naskah Dinas Elektronik', icon: imgSinde, onClick: undefined as undefined | (() => void) },
    { id: 'kehadiran', name: 'Kehadiran', icon: imgAttendance, onClick: undefined },
    { id: 'kinerja', name: 'Kinerja', icon: imgPerformance, onClick: undefined },
    { id: 'ruang-talenta', name: 'Ruang Talenta', icon: imgStatistic, onClick: undefined },
    { id: 'email', name: 'Email Kemendikdasmen', icon: imgTutWuri, onClick: open('https://mail.kemendikdasmen.go.id') },
    { id: 'profil-asn', name: 'Profil ASN Kemendikdasmen', icon: imgTutWuri, onClick: onNavigateToProfilASN },
    { id: 'dasbor-eksekutif', name: 'Dasbor Eksekutif', icon: imgAnalytic, onClick: onNavigateToDashboardAnalitik },
    { id: 'menu-lainnya', name: 'Menu Lainnya', icon: imgOther, onClick: onNavigateToMenuLainnya },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] w-full">
      {menuItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={item.onClick}
          disabled={!item.onClick}
          className={`flex items-center gap-[12px] px-[16px] py-[12px] rounded-[4px] bg-[#ecf5fe] text-left ${
            item.onClick ? 'cursor-pointer hover:bg-[#dbeafc] transition-colors' : 'cursor-default'
          }`}
        >
          <img alt="" src={item.icon} className="size-[48px] object-contain shrink-0" />
          <span
            className="font-['Inter',sans-serif] font-semibold text-sd-gray-90 line-clamp-2"
            style={{ fontSize: '14px', fontWeight: 700, lineHeight: '20px' }}
          >
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
}
