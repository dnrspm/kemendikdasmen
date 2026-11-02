import imgStaff from "@/assets/staging/img-staff.png";
import imgCorrection from "@/assets/staging/img-document-correction.png";
import imgSign from "@/assets/staging/img-document-sign.png";

const tasks = [
  { id: 'perubahan-data', group: 'Kepegawaian', label: 'Pengajuan perubahan data', icon: imgStaff, badge: 4 },
  { id: 'gagal-sinkron', group: 'Kepegawaian', label: 'Perubahan data gagal sinkronisasi', icon: imgStaff, badge: 1 },
  { id: 'sk-koreksi', group: 'Surat Keputusan', label: 'Koreksi', icon: imgCorrection },
  { id: 'sk-ttd', group: 'Surat Keputusan', label: 'Tanda Tangan', icon: imgSign },
];

export function DaftarTugas() {
  return (
    <div
      className="bg-card border flex flex-col gap-[16px] px-[20px] py-[24px] rounded-[var(--radius-card)] w-full"
      style={{ borderColor: '#c7c7c7' }}
    >
      <h3
        className="font-['Inter',sans-serif] text-foreground uppercase"
        style={{ fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}
      >
        Daftar Tugas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]">
        {tasks.map((t) => (
          <button
            key={t.id}
            type="button"
            className="flex items-start gap-[8px] px-[16px] py-[8px] rounded-[4px] bg-[#f4f4f4] text-left hover:bg-[#ececec] transition-colors"
          >
            <span className="relative shrink-0">
              <img alt="" src={t.icon} className="size-[48px] object-contain" />
              {t.badge ? (
                <span className="absolute -top-[2px] -right-[2px] min-w-[18px] h-[18px] px-[4px] rounded-full bg-[#c8102e] text-white text-[11px] font-semibold flex items-center justify-center">
                  {t.badge}
                </span>
              ) : null}
            </span>
            <span className="flex flex-col">
              <span className="text-[#2f3031]" style={{ fontSize: '16px', lineHeight: '24px' }}>{t.group}</span>
              <span className="text-[#0b5fef]" style={{ fontSize: '16px', fontWeight: 700, lineHeight: '24px' }}>{t.label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
