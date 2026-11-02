import imgTutWuri from '@/assets/staging/tut-wuri-handayani.png';

/* Data contoh fiktif. */
const rows: [string, React.ReactNode][] = [
  ['NIP', '100000001'],
  ['NIP Baru', '198704182018031001'],
  ['Pangkat', <span className="inline-block rounded-full bg-[#9ad7f5] px-[10px] py-[1px] font-semibold">Penata Tingkat I</span>],
  ['Golongan', <span className="inline-block rounded-full bg-[#a8e6c4] px-[10px] py-[1px] font-semibold">III/d</span>],
  ['Jabatan', 'Kepala Seksi Pemetaan Mutu dan Supervisi Lembaga Penjaminan Mutu Pendidikan Banten'],
  ['Unit Kerja', 'Balai Penjaminan Mutu Pendidikan Provinsi D.K.I. Jakarta - Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah - Kementerian Pendidikan Dasar dan Menengah - KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH'],
];

export function KartuPegawaiPage() {
  return (
    <div className="min-h-screen bg-[#dcdee0] grid place-items-center p-[16px]">
      <div className="w-full max-w-[675px] rounded-[6px] overflow-hidden bg-[#fafafa] shadow-md">
        <div className="bg-[#337ab7] text-white text-center py-[14px] px-[12px] font-semibold" style={{ fontSize: 'var(--text-base)' }}>
          Kartu Pegawai Kementerian Pendidikan Dasar dan Menengah
        </div>
        <div className="flex flex-col sm:flex-row gap-[20px] p-[20px]">
          <div className="sm:w-[170px] shrink-0 flex flex-col items-center text-center">
            <img alt="" src={imgTutWuri} className="size-[130px] rounded-full object-cover" />
            <p className="mt-[12px] font-semibold uppercase text-[#2f3031]" style={{ fontSize: 'var(--text-base)' }}>Prof. Dr. Ahmad Wijaya M.M.</p>
          </div>
          <table className="flex-1 text-left" style={{ fontSize: 'var(--text-sm)' }}>
            <tbody>
              {rows.map(([k, v], i) => (
                <tr key={k} className={i % 2 === 0 ? 'bg-[#efefef]' : ''}>
                  <td className="px-[8px] py-[6px] w-[90px] align-top">{k}</td>
                  <td className="py-[6px] w-[16px] align-top">:</td>
                  <td className="py-[6px] pr-[8px]">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
