import svgPathsMain from "@/imports/svg-9fgkcyy25e";
import svgPathsOrg from "@/imports/svg-mxevuodr7h";
import imgImage4 from "figma:asset/6d6df7825e18a760c3ee04150f34c5988843421f.png";
import imgHeaderBanner from "figma:asset/22635ad56c87071eb4b8e229c412f19beac0b3dc.png";
import imgSinde from "@/imports/Tangkapan_Layar_2026-05-20_pukul_16.29.46.png";
import { Info } from 'lucide-react';

interface MenuUtamaGridProps {
  onNavigateToOrganizations?: () => void;
  onNavigateToLayanan?: () => void;
  onNavigateToPengaturanUmum?: () => void;
  onNavigateToManajemenSKP?: () => void;
  onNavigateToDashboardAnalitik?: () => void;
  onNavigateToDataPribadi?: () => void;
  onNavigateToProfilASN?: () => void;
}

export function MenuUtamaGrid({ onNavigateToOrganizations, onNavigateToLayanan, onNavigateToPengaturanUmum, onNavigateToManajemenSKP, onNavigateToDashboardAnalitik, onNavigateToDataPribadi, onNavigateToProfilASN }: MenuUtamaGridProps) {
  const menuItems = [
    {
      id: 'kepegawaian',
      name: 'Kepegawaian',
      icon: 'kepegawaian',
      col: 1,
      row: 1,
      clickable: true,
      onClick: onNavigateToDataPribadi
    },
    {
      id: 'manajemen-SKP',
      name: 'Manajemen Tugas',
      icon: 'manajemen-SKP',
      col: 2,
      row: 1,
      clickable: true,
      onClick: onNavigateToManajemenSKP
    },
    {
      id: 'layanan',
      name: 'Layanan',
      icon: 'layanan',
      col: 3,
      row: 1,
      clickable: true,
      onClick: onNavigateToLayanan
    },
    {
      id: 'profil-asn',
      name: 'Profil ASN',
      icon: 'organisasi',
      col: 1,
      row: 2,
      clickable: true,
      onClick: onNavigateToProfilASN
    },
    {
      id: 'kehadiran',
      name: 'Kehadiran',
      icon: 'kehadiran',
      col: 2,
      row: 2,
      clickable: false
    },
    {
      id: 'pusat-informasi',
      name: 'Pusat Informasi dan Bantuan',
      icon: 'pusat-informasi',
      col: 3,
      row: 2,
      clickable: true,
      onClick: () => window.open('https://pusatinformasi.ult.kemendikdasmen.go.id/hc/id/categories/57429015252505', '_blank')
    },
    {
      id: 'pengaturan',
      name: 'Pengaturan Umum',
      icon: 'pengaturan',
      col: 1,
      row: 3,
      clickable: true,
      onClick: onNavigateToPengaturanUmum
    },
    {
      id: 'Dasboard-analitik',
      name: 'Dasbor Eksekutif',
      icon: 'Dashboard-analitik',
      col: 2,
      row: 3,
      clickable: true,
      onClick: onNavigateToDashboardAnalitik
    },
    {
      id: 'menu-lainnya',
      name: 'Sistem Naskah Dinas Elektronik',
      icon: 'menu-lainnya',
      col: 3,
      row: 3,
      clickable: false
    }
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'kepegawaian':
        return (
          <div className="relative shrink-0 size-[48px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
              <g>
                <path d={svgPathsMain.p24f693f2} fill="var(--fill-0, #071A8C)" />
                <path d={svgPathsMain.p3849b880} fill="var(--fill-0, #2560E0)" />
                <path d={svgPathsMain.pf2c7600} fill="var(--fill-0, #0E43C1)" />
                <path d={svgPathsMain.p13cba500} fill="var(--fill-0, #071A8C)" />
                <path d={svgPathsMain.p2b8ce0f0} fill="var(--fill-0, #CAF3F9)" />
                <path d={svgPathsMain.ped7f600} fill="var(--fill-0, #70B6DB)" />
                <path d={svgPathsMain.p11dbfd00} fill="var(--fill-0, #6BBDF7)" />
                <path d={svgPathsMain.p1534dc00} fill="var(--fill-0, #6BBDF7)" />
                <path d={svgPathsMain.p3ece4e80} fill="var(--fill-0, #EFB003)" />
                <path d={svgPathsMain.p344b3a00} fill="var(--fill-0, #D87E00)" />
                <path d={svgPathsMain.p165d6e00} fill="var(--fill-0, #EFB003)" />
                <path d={svgPathsMain.p21dc8f00} fill="var(--fill-0, #071A8C)" />
                <path d={svgPathsMain.p215ff400} fill="var(--fill-0, #020A11)" />
                <path d={svgPathsMain.p50ad600} fill="var(--fill-0, #458CFF)" />
                <path d={svgPathsMain.p3494ca00} fill="var(--fill-0, #458CFF)" />
                <path d={svgPathsMain.p22e06d00} fill="var(--fill-0, #3C79B0)" />
                <path d={svgPathsMain.p3c5dcb70} fill="var(--fill-0, #EFB003)" />
                <path d={svgPathsMain.p31f0ba80} fill="var(--fill-0, #D87E00)" />
                <path d={svgPathsMain.p28253f10} fill="var(--fill-0, #458CFF)" />
                <path d={svgPathsMain.p34600200} fill="var(--fill-0, #0E43C1)" />
              </g>
            </svg>
          </div>
        );
      case 'manajemen-SKP':
        return (
          <div className="relative shrink-0 size-[48px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
              <g>
                <path d={svgPathsMain.p7f17f00} fill="var(--fill-0, #2560E0)" />
                <path d={svgPathsMain.p809c600} fill="var(--fill-0, #458CFF)" />
                <path d={svgPathsMain.p3eea2f40} fill="var(--fill-0, #0E43C1)" />
                <path d={svgPathsMain.p322551c0} fill="var(--fill-0, #071A8C)" />
                <path d={svgPathsMain.p31c5f580} fill="var(--fill-0, #CAF3F9)" />
                <path d={svgPathsMain.p1ffe5100} fill="var(--fill-0, #F7F7F7)" />
                <path d={svgPathsMain.p27195f80} fill="var(--fill-0, #70B6DB)" />
                <path d={svgPathsMain.p213fd300} fill="var(--fill-0, #70B6DB)" />
                <path d={svgPathsMain.p50b6400} fill="var(--fill-0, #2560E0)" />
                <path d={svgPathsMain.p2886d80} fill="var(--fill-0, #0E43C1)" />
                <path d={svgPathsMain.p225e9580} fill="var(--fill-0, #071A8C)" />
                <path d={svgPathsMain.p325ad0f0} fill="var(--fill-0, #0E43C1)" />
                <path d={svgPathsMain.p1373c280} fill="var(--fill-0, #3C79B0)" />
                <path d={svgPathsMain.p10d80400} fill="var(--fill-0, #70B6DB)" />
                <path d={svgPathsMain.pe904f00} fill="var(--fill-0, #6BBDF7)" />
                <path d={svgPathsMain.p1996180} fill="var(--fill-0, #9EE1EA)" />
                <path d={svgPathsMain.p2d044000} fill="var(--fill-0, #9EE1EA)" />
                <path d={svgPathsMain.p3478d980} fill="var(--fill-0, #70B6DB)" />
                <path d={svgPathsMain.p2658cd00} fill="var(--fill-0, #3C79B0)" />
                <path d={svgPathsMain.p28a10480} fill="var(--fill-0, #D87E00)" />
                <path d={svgPathsMain.p2283f980} fill="var(--fill-0, #70B6DB)" />
                <path d={svgPathsMain.p1766f500} fill="var(--fill-0, #0B5FEF)" />
                <path d={svgPathsMain.p38427a00} fill="var(--fill-0, #0B5FEF)" />
                <path d={svgPathsMain.p14c0ff00} fill="var(--fill-0, #0B5FEF)" />
                <path d={svgPathsMain.p2d9dfa80} fill="var(--fill-0, #D87E00)" />
                <path d={svgPathsMain.p10aeeb00} fill="var(--fill-0, #EFB003)" />
                <path d={svgPathsMain.p3ee33700} fill="var(--fill-0, #3C79B0)" />
                <path d={svgPathsMain.p2f8f6600} fill="var(--fill-0, #164C9B)" />
              </g>
            </svg>
          </div>
        );
      case 'layanan':
        return (
          <div className="relative shrink-0 size-[48px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
              <g>
                <path d={svgPathsMain.p334efb00} fill="var(--fill-0, #071A8C)" />
                <path d={svgPathsMain.p21373200} fill="var(--fill-0, #2560E0)" />
                <path d={svgPathsMain.p981700} fill="var(--fill-0, #0E43C1)" />
                <path d={svgPathsMain.p1e51d480} fill="var(--fill-0, #071A8C)" />
                <path d={svgPathsMain.p5510f80} fill="var(--fill-0, #70B6DB)" />
                <path d={svgPathsMain.p32292000} fill="var(--fill-0, #9EE1EA)" />
                <path d={svgPathsMain.p2405e880} fill="var(--fill-0, #CAF3F9)" />
                <path d={svgPathsMain.p15cee080} fill="var(--fill-0, #3C79B0)" />
                <path d={svgPathsMain.pc6aad30} fill="var(--fill-0, #3C79B0)" />
                <path d={svgPathsMain.p221071c0} fill="var(--fill-0, #3C79B0)" />
                <path d={svgPathsMain.pa8a2a80} fill="var(--fill-0, #70B6DB)" />
                <path d={svgPathsMain.p2c57ff80} fill="var(--fill-0, #CF7E00)" />
                <path d={svgPathsMain.p1685d380} fill="var(--fill-0, #CF7E00)" />
                <path d={svgPathsMain.p3e921480} fill="var(--fill-0, #164C9B)" />
                <path d={svgPathsMain.p3628f100} fill="var(--fill-0, #E6A703)" />
                <path d={svgPathsMain.p151e4f00} fill="var(--fill-0, #E6A703)" />
                <path d={svgPathsMain.p2a0d280} fill="var(--fill-0, #CF7E00)" />
                <path d={svgPathsMain.p36c0cc00} fill="var(--fill-0, #E6A703)" />
                <path d={svgPathsMain.p35537700} fill="var(--fill-0, #E6A703)" />
                <path d={svgPathsMain.p14d5af00} fill="var(--fill-0, #E6A703)" />
                <path d={svgPathsMain.p2f2f3500} fill="var(--fill-0, #E6A703)" />
                <path d={svgPathsMain.p1560b200} fill="var(--fill-0, #CF7E00)" />
                <path d={svgPathsMain.p1b106e00} fill="var(--fill-0, #CF7E00)" />
                <path d={svgPathsMain.p1fa84100} fill="var(--fill-0, #7C3B00)" />
                <path d={svgPathsMain.p3f5e6e00} fill="var(--fill-0, #7C3B00)" />
                <path d={svgPathsMain.p3ab9cd00} fill="var(--fill-0, #458CFF)" />
                <path d={svgPathsMain.p13d64d00} fill="var(--fill-0, #0E43C1)" />
              </g>
            </svg>
          </div>
        );
      case 'organisasi':
        return (
          <div className="relative shrink-0 size-[45px]">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHeaderBanner} />
          </div>
        );
      case 'kehadiran':
        return (
          <div className="relative shrink-0 size-[48px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
              <g>
                <path d={svgPathsMain.p345ccaf0} fill="var(--fill-0, #70B6DB)" />
                <path d={svgPathsMain.p3201ed00} fill="var(--fill-0, #9EE1EA)" />
                <path d={svgPathsMain.p2f37aa80} fill="var(--fill-0, #70B6DB)" />
                <path d={svgPathsMain.p2026d380} fill="var(--fill-0, #9EE1EA)" />
                <path d={svgPathsMain.p26a4500} fill="var(--fill-0, #CAF3F9)" />
                <path d={svgPathsMain.p26232880} fill="var(--fill-0, #F7F7F7)" />
                <path d={svgPathsMain.p390a9c00} fill="var(--fill-0, #9EE1EA)" />
                <path d={svgPathsMain.pe74a080} fill="var(--fill-0, #70B6DB)" />
                <path d={svgPathsMain.p2d630e00} fill="var(--fill-0, #2560E0)" />
                <path d={svgPathsMain.p13efcd00} fill="var(--fill-0, #0E43C1)" />
                <path d={svgPathsMain.p6f26700} fill="var(--fill-0, #EFB003)" />
                <path d={svgPathsMain.p2d695a00} fill="var(--fill-0, #071A8C)" />
                <path d={svgPathsMain.p2b7c4700} fill="var(--fill-0, #071A8C)" />
                <path d={svgPathsMain.p2ec0be00} fill="var(--fill-0, #2560E0)" />
                <path d={svgPathsMain.p8911000} fill="var(--fill-0, #2560E0)" />
                <path d={svgPathsMain.p2d7a9600} fill="var(--fill-0, #458CFF)" />
                <path d={svgPathsMain.p1a9cd200} fill="var(--fill-0, #0E43C1)" />
                <path d={svgPathsMain.p1876b100} fill="var(--fill-0, #D87E00)" />
                <path d={svgPathsMain.p2f14e00} fill="var(--fill-0, #0E43C1)" />
                <path d={svgPathsMain.p1a5c3600} fill="var(--fill-0, #071A8C)" />
                <path d={svgPathsMain.pb6d2480} fill="var(--fill-0, #7C3B00)" />
                <path d={svgPathsMain.p35b51200} fill="var(--fill-0, #CAF3F9)" />
                <path d={svgPathsMain.p2e0a8680} fill="var(--fill-0, #7C3B00)" />
                <path d={svgPathsMain.p251132f0} fill="var(--fill-0, #0E43C1)" />
                <path d={svgPathsMain.p30887d00} fill="var(--fill-0, #020A11)" />
              </g>
            </svg>
          </div>
        );
      case 'pusat-informasi':
        return (
          <div className="relative shrink-0 size-[48px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
              <g>
                {/* Background circle */}
                <circle cx="24" cy="24" r="20" fill="#2560E0" />
                <circle cx="24" cy="24" r="18" fill="#458CFF" />

                {/* Book/Document base */}
                <path d="M14 16 H34 V36 H14 Z" fill="#F7F7F7" />
                <path d="M14 16 H16 V36 H14 Z" fill="#0E43C1" />

                {/* Question mark symbol */}
                <path d="M24 14 C27 14 29 16 29 19 C29 21 27.5 22 26 23 L25 24 V25 H23 V23.5 C23 22.5 23.5 21.5 25 20.5 C26 19.8 26.5 19.2 26.5 18.5 C26.5 17.3 25.5 16.5 24 16.5 C22.5 16.5 21.5 17.3 21.5 18.5 H19 C19 16 21 14 24 14 Z" fill="#071A8C" />
                <circle cx="24" cy="28" r="1.5" fill="#071A8C" />

                {/* Accent lines */}
                <path d="M18 32 H30" stroke="#CAF3F9" strokeWidth="1.5" />
                <path d="M18 34 H28" stroke="#9EE1EA" strokeWidth="1.5" />

                {/* Info icon accent */}
                <circle cx="32" cy="18" r="4" fill="#EFB003" />
                <path d="M31.5 16.5 H32.5 V19.5 H31.5 Z" fill="#FFF" />
                <circle cx="32" cy="15.5" r="0.6" fill="#FFF" />
              </g>
            </svg>
          </div>
        );
      case 'pengaturan':
        return (
          <div className="relative shrink-0 size-[48px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
              <g>
                <path d={svgPathsOrg.p90f8780} fill="var(--fill-0, #E6A703)" />
                <path d={svgPathsOrg.p20bb1680} fill="var(--fill-0, #E6A703)" />
                <path d={svgPathsOrg.p747f300} fill="var(--fill-0, #0E43C1)" />
                <path d={svgPathsOrg.p26d40380} fill="var(--fill-0, #7C3B00)" />
                <path d={svgPathsOrg.p2763fe00} fill="var(--fill-0, #020A11)" />
                <path d={svgPathsOrg.p331d7300} fill="var(--fill-0, #020A11)" />
                <path d={svgPathsOrg.p33982d30} fill="var(--fill-0, #CF7E00)" />
                <path d={svgPathsOrg.p3b9a3700} fill="var(--fill-0, #2560E0)" />
                <path d={svgPathsOrg.p24db3400} fill="var(--fill-0, #458CFF)" />
                <path d={svgPathsOrg.p2cf41500} fill="var(--fill-0, #071A8C)" />
                <path d={svgPathsOrg.p36f5b700} fill="var(--fill-0, #E6A703)" />
                <path d={svgPathsOrg.p22650700} fill="var(--fill-0, #E6A703)" />
                <path d={svgPathsOrg.p15081570} fill="var(--fill-0, #E6A703)" />
              </g>
            </svg>
          </div>
        );
      case 'Dashboard-analitik':
        return (
          <div className="relative shrink-0 size-[48px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
              <g>
                {/* Background bars - blue gradient */}
                <rect x="8" y="26" width="7" height="16" rx="1.5" fill="#1E40AF"/>
                <rect x="18" y="20" width="7" height="22" rx="1.5" fill="#2563EB"/>
                <rect x="28" y="12" width="7" height="30" rx="1.5" fill="#3B82F6"/>
                <rect x="38" y="8" width="7" height="34" rx="1.5" fill="#60A5FA"/>

                {/* Trend line - orange */}
                <path d="M10 30 L21.5 22 L31.5 14 L41.5 10" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

                {/* Dots on trend line */}
                <circle cx="10" cy="30" r="2.5" fill="#EA580C"/>
                <circle cx="21.5" cy="22" r="2.5" fill="#EA580C"/>
                <circle cx="31.5" cy="14" r="2.5" fill="#EA580C"/>
                <circle cx="41.5" cy="10" r="2.5" fill="#EA580C"/>
              </g>
            </svg>
          </div>
        );
      case 'menu-lainnya':
        return (
          <div className="relative shrink-0 size-[48px]">
            <img alt="Sinde" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgSinde} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="gap-[12px] grid grid-cols-1 md:grid-cols-[repeat(3,_minmax(0,_1fr))] md:grid-rows-[repeat(3,_auto)] relative shrink-0 w-full">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`bg-[#f5faff] relative rounded-[4px] self-stretch shrink-0 ${
            item.clickable ? 'cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]' : ''
          }`}
          onClick={item.clickable && item.onClick ? item.onClick : undefined}
          data-name="Main menu Card"
        >
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[10px] py-[12px] relative size-full">
              {renderIcon(item.icon)}
              <div className="content-stretch flex flex-col gap-[4px] items-start relative flex-1">
                <p 
                  className="font-['Inter',sans-serif] font-semibold text-[#323232] line-clamp-2"
                  style={{ fontSize: 'var(--text-base)', lineHeight: '20px' }}
                >
                  {item.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}