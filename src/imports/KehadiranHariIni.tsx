function BadgeBelumPresensi() {
  return (
    <div className="absolute bg-[#feefef] h-[28px] left-[459px] overflow-clip rounded-[14px] top-[14px] w-[128px]" data-name="Badge-BelumPresensi">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[11px] not-italic text-[#d4222d] text-[12px] top-[7px] whitespace-nowrap">Belum Presensi</p>
    </div>
  );
}

export default function KehadiranHariIni() {
  return (
    <div className="bg-white border border-[#dee1e5] border-solid overflow-clip relative rounded-[8px] size-full" data-name="Kehadiran Hari Ini">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[23px] not-italic text-[#161a22] text-[11px] top-[19px] whitespace-nowrap">KEHADIRAN HARI INI</p>
      <BadgeBelumPresensi />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[23px] not-italic text-[#6b7380] text-[13px] top-[57px] whitespace-nowrap">📅</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[45px] not-italic text-[#6b7380] text-[13px] top-[57px] whitespace-nowrap">Senin, 30 Maret 2026</p>
      <div className="absolute bg-[#dee1e5] h-[48px] left-[207px] top-[95px] w-px" data-name="Rectangle" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[23px] not-italic text-[#6b7380] text-[12px] top-[95px] whitespace-nowrap">Absen Masuk</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[23px] not-italic text-[#161a22] text-[16px] top-[117px] whitespace-nowrap">--:-- WIB</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[225px] not-italic text-[#6b7380] text-[12px] top-[95px] whitespace-nowrap">Absen Keluar</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[225px] not-italic text-[#161a22] text-[16px] top-[117px] whitespace-nowrap">--:-- WIB</p>
    </div>
  );
}