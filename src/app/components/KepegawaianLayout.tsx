import { useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  Home, User, Users, FileText, Network, Table2, ChevronDown, ChevronUp, ArrowLeftCircle, Menu,
} from 'lucide-react';
import { Header } from '@/app/components/Header';
import imgStaff from '@/assets/staging/img-staff.png';

type MenuLeaf = { label: string; path: string };
type MenuGroup = { id: string; label: string; icon: ReactNode; children: MenuLeaf[] };

export const kepegawaianGroups: MenuGroup[] = [
  {
    id: 'profil-pegawai', label: 'Profil Pegawai', icon: <Users className="size-[20px]" />,
    children: [
      { label: 'Data Pegawai Aktif', path: '/kepegawaian/data-pegawai-aktif' },
      { label: 'Data PPPK', path: '/kepegawaian/data-pppk' },
      { label: 'Data Pegawai Non Aktif', path: '/kepegawaian/data-nonaktif' },
      { label: 'Verifikasi Perubahan Data', path: '/kepegawaian/verifikasi-perubahan' },
      { label: 'Verifikasi Data Komite', path: '/kepegawaian/verifikasi-komite' },
    ],
  },
  {
    id: 'pengelolaan-sk', label: 'Pengelolaan SK', icon: <FileText className="size-[20px]" />,
    children: [
      { label: 'Daftar Semua SK', path: '/surat-keputusan/daftar-surat' },
      { label: 'Koreksi SK', path: '/surat-keputusan/daftar-koreksi' },
      { label: 'Tanda Tangan SK', path: '/surat-keputusan/daftar-tanda-tangan' },
      { label: 'Riwayat SK Individu', path: '/surat-keputusan/riwayat-individu' },
      { label: 'Log Tandatangan SK', path: '/surat-keputusan/log-tanda-tangan' },
    ],
  },
  {
    id: 'pemetaan-jabatan', label: 'Pemetaan Jabatan', icon: <Network className="size-[20px]" />,
    children: [
      { label: 'Pemetaan & Konfigurasi', path: '/pemetaan-jabatan/pemetaan-konfigurasi' },
      { label: 'Pergeseran Jabatan', path: '/pemetaan-jabatan/pergeseran-jabatan' },
      { label: 'Verifikasi Usulan Pergeseran', path: '/pemetaan-jabatan/verifikasi-usulan-pergeseran' },
      { label: 'Inventaris Kepmen Peta Jabatan', path: '/pemetaan-jabatan/inventaris-kepmen-peta-jabatan' },
    ],
  },
  {
    id: 'master-data', label: 'Master Data', icon: <Table2 className="size-[20px]" />,
    children: [
      'Agama', 'Jabatan', 'Pendidikan', 'Golongan', 'Unit Kerja', 'Jenis Kenaikan Pangkat',
      'Jenis Jabatan', 'Jenis Penghargaan', 'Jenis Hukuman', 'Template Dokumen',
    ].map((label) => ({ label, path: `/master-data/${label.toLowerCase().replace(/ /g, '-')}` })),
  },
];

export function KepegawaianLayout({ children, topBar }: { children: ReactNode; topBar?: ReactNode }) {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const raw = pathname.replace(/\/$/, '') || '/';
  // Halaman edit pegawai aktif menyorot menu Data Pegawai Aktif (seperti di staging).
  const clean = raw.startsWith('/kepegawaian/ubah-pegawai/')
    ? (new URLSearchParams(search).get('tipe') === 'nonaktif' ? '/kepegawaian/data-nonaktif' : '/kepegawaian/data-pegawai-aktif')
    : raw;
  const activeGroup = kepegawaianGroups.find((g) => g.children.some((c) => c.path === clean))?.id ?? null;
  const [open, setOpen] = useState<string | null>(activeGroup);
  const [collapsed, setCollapsed] = useState(false);

  const isDataPribadi = clean === '/kepegawaian';

  return (
    <div className="flex flex-col h-screen bg-sd-gray-5">
      {topBar}
      <Header fullWidth />
      <div className="flex flex-1 min-h-0">
        {!collapsed && (
          <aside className="w-[288px] shrink-0 bg-white border-r border-sd-modal-footer-border flex flex-col">
            <div className="flex items-center gap-[10px] px-[16px] py-[10px] bg-sd-blue-5">
              <img alt="" src={imgStaff} className="size-[20px] object-contain" />
              <span className="text-sd-gray-90 uppercase" style={{ fontSize: '13px', fontWeight: 700, lineHeight: '20px' }}>Kepegawaian</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-[10px] px-[16px] py-[8px] bg-sd-blue-5 text-sd-gray-60 text-left hover:bg-sd-blue-5"
              style={{ fontSize: '15px', fontWeight: 400, lineHeight: '22px' }}
            >
              <Home className="size-[16px]" /> Kembali ke Beranda Portal
            </button>

            <nav className="flex-1 overflow-y-auto p-[8px] flex flex-col gap-[4px]">
              <button
                onClick={() => navigate('/kepegawaian')}
                className={`flex items-center gap-[12px] px-[8px] py-[8px] rounded-[4px] text-left ${isDataPribadi ? 'bg-sd-gray-5' : 'hover:bg-sd-gray-0'}`}
                style={{ fontSize: '15px', lineHeight: '22px', fontWeight: isDataPribadi ? 600 : 400 }}
              >
                <User className="size-[20px]" /> Data Pribadi
              </button>

              {kepegawaianGroups.map((g) => {
                const isOpen = open === g.id;
                return (
                  <div key={g.id}>
                    <button
                      onClick={() => setOpen(isOpen ? null : g.id)}
                      className="w-full flex items-center gap-[12px] px-[8px] py-[8px] rounded-[4px] text-left hover:bg-sd-gray-0"
                      style={{ fontSize: '15px', lineHeight: '22px' }}
                    >
                      {g.icon}
                      <span className="flex-1">{g.label}</span>
                      {isOpen ? <ChevronUp className="size-[18px]" /> : <ChevronDown className="size-[18px]" />}
                    </button>
                    {isOpen && (
                      <div className="flex flex-col">
                        {g.children.map((c) => (
                          <button
                            key={c.path}
                            onClick={() => navigate(c.path)}
                            className={`pl-[40px] pr-[8px] py-[9px] text-left rounded-[4px] ${clean === c.path ? 'bg-sd-gray-5' : 'hover:bg-sd-gray-0'}`}
                            style={{ fontSize: '15px', lineHeight: '22px', fontWeight: clean === c.path ? 600 : 400 }}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <button
              onClick={() => setCollapsed(true)}
              className="flex items-center justify-center gap-[8px] py-[12px] border-t border-sd-modal-footer-border text-sd-gray-90 hover:bg-sd-gray-0"
              style={{ fontSize: '15px', fontWeight: 400, lineHeight: '22px' }}
            >
              <ArrowLeftCircle className="size-[18px]" /> Sembunyikan Menu
            </button>
          </aside>
        )}

        <main className="flex-1 min-w-0 overflow-y-auto relative">
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="absolute left-[12px] top-[12px] p-[6px] rounded-[4px] bg-white border border-sd-modal-footer-border"
              aria-label="Tampilkan menu"
            >
              <Menu className="size-[18px]" />
            </button>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
