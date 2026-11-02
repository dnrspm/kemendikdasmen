import { Header } from "@/app/components/Header";
import { WidgetKehadiran } from "@/app/components/WidgetKehadiran";
import { PopupPengumuman } from "@/app/components/PopupPengumuman";
import { SystemBanner } from "@/app/components/SystemBanner";
import { MenuUtamaGrid } from "@/app/components/MenuUtamaGrid";
import image_9422af45ba9c756818c3d67dd655d109dfd2e3af from 'figma:asset/9422af45ba9c756818c3d67dd655d109dfd2e3af.png';
import svgPaths from "./svg-9fgkcyy25e";
import svgPathsOrg from "./svg-mxevuodr7h";
import imgHeaderBanner from "figma:asset/22635ad56c87071eb4b8e229c412f19beac0b3dc.png";
import imgUnsplashTi1YplNigH1 from "figma:asset/df1d005ce79ad1c173a01a78147942b6abeeed47.png";
import imgImage4 from "figma:asset/6d6df7825e18a760c3ee04150f34c5988843421f.png";
import imgIllustrationTest1 from "figma:asset/60789cbb0279f7888ece3ae753f0201c97034e68.png";
import imgWavingHand from "figma:asset/c311fe31e2c597256d8729fed5f2a131f4aaa151.png";
import imgOrganisasi from "figma:asset/22635ad56c87071eb4b8e229c412f19beac0b3dc.png";
import { imgUnsplashTi1YplNigH0 } from "./svg-qiem3";
import React from "react";
import { ChevronDown } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

function FilledActionSSupervisorAccount() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Filled / Action / S / supervisor_account">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Filled / Action / S / supervisor_account">
          <path d={svgPaths.p2a436470} fill="var(--fill-0, #45474A)" id="vector" />
        </g>
      </svg>
    </div>
  );
}

function NavbarPengkin() {
  return (
    <div className="bg-white border-b border-[#EFEFEF] h-[64px] relative" data-name="Navbar Pengkin">
      <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto px-[24px]">
        {/* Logo Header */}
        <div className="flex items-center">
          <img 
            alt="Portal Kemendikdasmen" 
            className="h-[42px] w-auto object-contain" 
            src={image_9422af45ba9c756818c3d67dd655d109dfd2e3af} 
          />
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-[9px] cursor-pointer hover:opacity-80 transition-opacity">
          <FilledActionSSupervisorAccount />
          <p className="text-[16px] font-[var(--font-weight-medium)] text-[#2f3031] leading-[24px]">
            Sarah Citra
          </p>
          <ChevronDown className="w-[24px] h-[24px] text-[#45474A]" />
        </div>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents left-[1182px] top-[15px]" data-name="Mask group">
      <div className="absolute h-[72.237px] left-[1174.89px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[7.105px_4.342px] mask-size-[30px_30px] top-[10.66px] w-[48.354px]" data-name="unsplash:TI1YplNigH0" style={{ maskImage: `url('${imgUnsplashTi1YplNigH0}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUnsplashTi1YplNigH1} />
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex h-[26px] items-center relative shrink-0">
      <div className="css-g0mm18 flex flex-col justify-center leading-[0] not-italic relative shrink-0 uppercase pl-[10px]">
        <h3 className="css-ew64yg">Menu Utama</h3>
      </div>
    </div>
  );
}

function AssetsButton() {
  return (
    <div className="relative shrink-0 w-full" data-name="Assets / Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#0b5fef] text-[16px]">
            <p className="css-ew64yg leading-[24px]">Lihat Semua</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[4px] shrink-0" data-name="Button">
      <AssetsButton />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex h-[26px] items-center justify-between relative shrink-0 w-full">
      <Frame28 />
      <Button />
    </div>
  );
}

function Kepegawaian() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Kepegawaian">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Kepegawaian">
          <path d={svgPaths.p24f693f2} fill="var(--fill-0, #071A8C)" id="Vector" />
          <path d={svgPaths.p3849b880} fill="var(--fill-0, #2560E0)" id="Vector_2" />
          <path d={svgPaths.pf2c7600} fill="var(--fill-0, #0E43C1)" id="Vector_3" />
          <path d={svgPaths.p13cba500} fill="var(--fill-0, #071A8C)" id="Vector_4" />
          <path d={svgPaths.p2b8ce0f0} fill="var(--fill-0, #CAF3F9)" id="Vector_5" />
          <path d={svgPaths.ped7f600} fill="var(--fill-0, #70B6DB)" id="Vector_6" />
          <path d={svgPaths.p11dbfd00} fill="var(--fill-0, #6BBDF7)" id="Vector_7" />
          <path d={svgPaths.p1534dc00} fill="var(--fill-0, #6BBDF7)" id="Vector_8" />
          <path d={svgPaths.p3ece4e80} fill="var(--fill-0, #EFB003)" id="Vector_9" />
          <path d={svgPaths.p344b3a00} fill="var(--fill-0, #D87E00)" id="Vector_10" />
          <path d={svgPaths.p165d6e00} fill="var(--fill-0, #EFB003)" id="Vector_11" />
          <path d={svgPaths.p21dc8f00} fill="var(--fill-0, #071A8C)" id="Vector_12" />
          <path d={svgPaths.p215ff400} fill="var(--fill-0, #020A11)" id="Vector_13" />
          <path d={svgPaths.p50ad600} fill="var(--fill-0, #458CFF)" id="Vector_14" />
          <path d={svgPaths.p3494ca00} fill="var(--fill-0, #458CFF)" id="Vector_15" />
          <path d={svgPaths.p22e06d00} fill="var(--fill-0, #3C79B0)" id="Vector_16" />
          <path d={svgPaths.p3c5dcb70} fill="var(--fill-0, #EFB003)" id="Vector_17" />
          <path d={svgPaths.p31f0ba80} fill="var(--fill-0, #D87E00)" id="Vector_18" />
          <path d={svgPaths.p28253f10} fill="var(--fill-0, #458CFF)" id="Vector_19" />
          <path d={svgPaths.p34600200} fill="var(--fill-0, #0E43C1)" id="Vector_20" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#323232] text-[14px] w-[min-content]">
        <p className="css-4hzbpn leading-[20px]">Kepegawaian</p>
      </div>
    </div>
  );
}

function MainMenuCard() {
  return (
    <div className="bg-[#f5faff] col-[1] css-por8k5 relative rounded-[4px] row-[1] self-stretch shrink-0 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]" data-name="Main menu Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[10px] relative size-full">
          <Kepegawaian />
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Kinerja() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Kinerja">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Kinerja">
          <path d={svgPaths.p7f17f00} fill="var(--fill-0, #2560E0)" id="Vector" />
          <path d={svgPaths.p809c600} fill="var(--fill-0, #458CFF)" id="Vector_2" />
          <path d={svgPaths.p3eea2f40} fill="var(--fill-0, #0E43C1)" id="Vector_3" />
          <path d={svgPaths.p322551c0} fill="var(--fill-0, #071A8C)" id="Vector_4" />
          <path d={svgPaths.p31c5f580} fill="var(--fill-0, #CAF3F9)" id="Vector_5" />
          <path d={svgPaths.p1ffe5100} fill="var(--fill-0, #F7F7F7)" id="Vector_6" />
          <path d={svgPaths.p27195f80} fill="var(--fill-0, #70B6DB)" id="Vector_7" />
          <path d={svgPaths.p213fd300} fill="var(--fill-0, #70B6DB)" id="Vector_8" />
          <path d={svgPaths.p50b6400} fill="var(--fill-0, #2560E0)" id="Vector_9" />
          <path d={svgPaths.p2886d80} fill="var(--fill-0, #0E43C1)" id="Vector_10" />
          <path d={svgPaths.p225e9580} fill="var(--fill-0, #071A8C)" id="Vector_11" />
          <path d={svgPaths.p325ad0f0} fill="var(--fill-0, #0E43C1)" id="Vector_12" />
          <path d={svgPaths.p1373c280} fill="var(--fill-0, #3C79B0)" id="Vector_13" />
          <path d={svgPaths.p10d80400} fill="var(--fill-0, #70B6DB)" id="Vector_14" />
          <path d={svgPaths.pe904f00} fill="var(--fill-0, #6BBDF7)" id="Vector_15" />
          <path d={svgPaths.p1996180} fill="var(--fill-0, #9EE1EA)" id="Vector_16" />
          <path d={svgPaths.p2d044000} fill="var(--fill-0, #9EE1EA)" id="Vector_17" />
          <path d={svgPaths.p3478d980} fill="var(--fill-0, #70B6DB)" id="Vector_18" />
          <path d={svgPaths.p2658cd00} fill="var(--fill-0, #3C79B0)" id="Vector_19" />
          <path d={svgPaths.p28a10480} fill="var(--fill-0, #D87E00)" id="Vector_20" />
          <path d={svgPaths.p2283f980} fill="var(--fill-0, #70B6DB)" id="Vector_21" />
          <path d={svgPaths.p1766f500} fill="var(--fill-0, #0B5FEF)" id="Vector_22" />
          <path d={svgPaths.p38427a00} fill="var(--fill-0, #0B5FEF)" id="Vector_23" />
          <path d={svgPaths.p14c0ff00} fill="var(--fill-0, #0B5FEF)" id="Vector_24" />
          <path d={svgPaths.p2d9dfa80} fill="var(--fill-0, #D87E00)" id="Vector_25" />
          <path d={svgPaths.p10aeeb00} fill="var(--fill-0, #EFB003)" id="Vector_26" />
          <path d={svgPaths.p3ee33700} fill="var(--fill-0, #3C79B0)" id="Vector_27" />
          <path d={svgPaths.p2f8f6600} fill="var(--fill-0, #164C9B)" id="Vector_28" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#323232] text-[14px] w-[min-content]">
        <p className="css-4hzbpn leading-[20px]">Kinerja</p>
      </div>
    </div>
  );
}

function MainMenuCard1() {
  return (
    <div className="bg-[#f5faff] col-[2] css-por8k5 relative rounded-[4px] row-[2] self-stretch shrink-0" data-name="Main menu Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[10px] relative size-full">
          <Kinerja />
          <Frame4 />
        </div>
      </div>
    </div>
  );
}

function Kehadiran() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Kehadiran">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Kehadiran">
          <path d={svgPaths.p345ccaf0} fill="var(--fill-0, #70B6DB)" id="Vector" />
          <path d={svgPaths.p3201ed00} fill="var(--fill-0, #9EE1EA)" id="Vector_2" />
          <path d={svgPaths.p2f37aa80} fill="var(--fill-0, #70B6DB)" id="Vector_3" />
          <path d={svgPaths.p2026d380} fill="var(--fill-0, #9EE1EA)" id="Vector_4" />
          <path d={svgPaths.p26a4500} fill="var(--fill-0, #CAF3F9)" id="Vector_5" />
          <path d={svgPaths.p26232880} fill="var(--fill-0, #F7F7F7)" id="Vector_6" />
          <path d={svgPaths.p390a9c00} fill="var(--fill-0, #9EE1EA)" id="Vector_7" />
          <path d={svgPaths.pe74a080} fill="var(--fill-0, #70B6DB)" id="Vector_8" />
          <path d={svgPaths.p2d630e00} fill="var(--fill-0, #2560E0)" id="Vector_9" />
          <path d={svgPaths.p13efcd00} fill="var(--fill-0, #0E43C1)" id="Vector_10" />
          <path d={svgPaths.p6f26700} fill="var(--fill-0, #EFB003)" id="Vector_11" />
          <path d={svgPaths.p2d695a00} fill="var(--fill-0, #071A8C)" id="Vector_12" />
          <path d={svgPaths.p2b7c4700} fill="var(--fill-0, #071A8C)" id="Vector_13" />
          <path d={svgPaths.p2ec0be00} fill="var(--fill-0, #2560E0)" id="Vector_14" />
          <path d={svgPaths.p8911000} fill="var(--fill-0, #2560E0)" id="Vector_15" />
          <path d={svgPaths.p2d7a9600} fill="var(--fill-0, #458CFF)" id="Vector_16" />
          <path d={svgPaths.p1a9cd200} fill="var(--fill-0, #0E43C1)" id="Vector_17" />
          <path d={svgPaths.p1876b100} fill="var(--fill-0, #D87E00)" id="Vector_18" />
          <path d={svgPaths.p2f14e00} fill="var(--fill-0, #0E43C1)" id="Vector_19" />
          <path d={svgPaths.p1a5c3600} fill="var(--fill-0, #071A8C)" id="Vector_20" />
          <path d={svgPaths.pb6d2480} fill="var(--fill-0, #7C3B00)" id="Vector_21" />
          <path d={svgPaths.p35b51200} fill="var(--fill-0, #CAF3F9)" id="Vector_22" />
          <path d={svgPaths.p2e0a8680} fill="var(--fill-0, #7C3B00)" id="Vector_23" />
          <path d={svgPaths.p251132f0} fill="var(--fill-0, #0E43C1)" id="Vector_24" />
          <path d={svgPaths.p30887d00} fill="var(--fill-0, #020A11)" id="Vector_25" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#323232] text-[14px] w-[min-content]">
        <p className="css-4hzbpn leading-[20px]">Kehadiran</p>
      </div>
    </div>
  );
}

function MainMenuCard2() {
  return (
    <div className="bg-[#f5faff] col-[1] css-por8k5 relative rounded-[4px] row-[2] self-stretch shrink-0 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]" data-name="Main menu Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[10px] relative size-full">
          <Kehadiran />
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#323232] text-[14px] w-[min-content]">
        <p className="css-4hzbpn leading-[20px]">Sistem Naskah Dinas Elektronik</p>
      </div>
    </div>
  );
}

function MainMenuCard3() {
  return (
    <div className="bg-[#f5faff] col-[2] css-por8k5 relative rounded-[4px] row-[1] self-stretch shrink-0" data-name="Main menu Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[10px] relative size-full">
          <div className="h-[43px] relative shrink-0 w-[42.896px]" data-name="image 4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[230.66%]" src={imgImage4} />
            </div>
          </div>
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12.857px] items-center justify-center relative shrink-0">
      <div className="relative shrink-0 size-[45px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHeaderBanner} />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#323232] text-[14px] w-[min-content]">
        <p className="css-4hzbpn leading-[20px]">Organisasi</p>
      </div>
    </div>
  );
}

function MainMenuCard4() {
  return (
    <div 
      className="bg-[#f5faff] col-[2] css-por8k5 relative rounded-[4px] row-[3] self-stretch shrink-0 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]" 
      data-name="Main menu Card"
      onClick={() => {
        const mainPage = document.querySelector('[data-name="Main Page 15"]')?.closest('div');
        if (mainPage && (mainPage as any).__onNavigateToOrganizations) {
          (mainPage as any).__onNavigateToOrganizations();
        }
      }}
    >
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[10px] py-[12px] relative size-full">
          <Frame1 />
          <Frame7 />
        </div>
      </div>
    </div>
  );
}

function Kemendikdasmen() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Kemendikdasmen">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Kemendikdasmen">
          <path d={svgPaths.p334efb00} fill="var(--fill-0, #071A8C)" id="Vector" />
          <path d={svgPaths.p21373200} fill="var(--fill-0, #2560E0)" id="Vector_2" />
          <path d={svgPaths.p981700} fill="var(--fill-0, #0E43C1)" id="Vector_3" />
          <path d={svgPaths.p1e51d480} fill="var(--fill-0, #071A8C)" id="Vector_4" />
          <path d={svgPaths.p5510f80} fill="var(--fill-0, #70B6DB)" id="Vector_5" />
          <path d={svgPaths.p32292000} fill="var(--fill-0, #9EE1EA)" id="Vector_6" />
          <path d={svgPaths.p2405e880} fill="var(--fill-0, #CAF3F9)" id="Vector_7" />
          <path d={svgPaths.p15cee080} fill="var(--fill-0, #3C79B0)" id="Vector_8" />
          <path d={svgPaths.pc6aad30} fill="var(--fill-0, #3C79B0)" id="Vector_9" />
          <path d={svgPaths.p221071c0} fill="var(--fill-0, #3C79B0)" id="Vector_10" />
          <path d={svgPaths.pa8a2a80} fill="var(--fill-0, #70B6DB)" id="Vector_11" />
          <path d={svgPaths.p2c57ff80} fill="var(--fill-0, #CF7E00)" id="Vector_12" />
          <path d={svgPaths.p1685d380} fill="var(--fill-0, #CF7E00)" id="Vector_13" />
          <path d={svgPaths.p3e921480} fill="var(--fill-0, #164C9B)" id="Vector_14" />
          <path d={svgPaths.p3628f100} fill="var(--fill-0, #E6A703)" id="Vector_15" />
          <path d={svgPaths.p151e4f00} fill="var(--fill-0, #E6A703)" id="Vector_16" />
          <path d={svgPaths.p2a0d280} fill="var(--fill-0, #CF7E00)" id="Vector_17" />
          <path d={svgPaths.p36c0cc00} fill="var(--fill-0, #E6A703)" id="Vector_18" />
          <path d={svgPaths.p35537700} fill="var(--fill-0, #E6A703)" id="Vector_19" />
          <path d={svgPaths.p14d5af00} fill="var(--fill-0, #E6A703)" id="Vector_20" />
          <path d={svgPaths.p2f2f3500} fill="var(--fill-0, #E6A703)" id="Vector_21" />
          <path d={svgPaths.p1560b200} fill="var(--fill-0, #CF7E00)" id="Vector_22" />
          <path d={svgPaths.p1b106e00} fill="var(--fill-0, #CF7E00)" id="Vector_23" />
          <path d={svgPaths.p1fa84100} fill="var(--fill-0, #7C3B00)" id="Vector_24" />
          <path d={svgPaths.p3f5e6e00} fill="var(--fill-0, #7C3B00)" id="Vector_25" />
          <path d={svgPaths.p3ab9cd00} fill="var(--fill-0, #458CFF)" id="Vector_26" />
          <path d={svgPaths.p13d64d00} fill="var(--fill-0, #0E43C1)" id="Vector_27" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#323232] text-[14px] w-[min-content]">
        <p className="css-4hzbpn leading-[20px]">Layanan</p>
      </div>
    </div>
  );
}

function MainMenuCard5() {
  return (
    <div 
      className="bg-[#f5faff] col-[1] css-por8k5 relative rounded-[4px] row-[3] self-stretch shrink-0 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]" 
      data-name="Main menu Card"
      onClick={() => {
        const mainPage = document.querySelector('[data-name="Main Page 15"]')?.closest('div');
        if (mainPage && (mainPage as any).__onNavigateToLayanan) {
          (mainPage as any).__onNavigateToLayanan();
        }
      }}
    >
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[10px] py-[12px] relative size-full">
          <Kemendikdasmen />
          <Frame8 />
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="gap-[12px] grid grid-cols-[repeat(2,_minmax(0,_1fr))] grid-rows-[repeat(3,_auto)] relative shrink-0 w-full">
      <MainMenuCard4 />
      <MainMenuCard5 />
      <MainMenuCard />
      <MainMenuCard1 />
      <MainMenuCard2 />
      <MainMenuCard3 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[479px]">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#323232] text-[28px] w-full">
        <h2 className="css-4hzbpn leading-[52px] font-bold" style={{ fontSize: 'var(--text-2xl)' }}>Halo, Sarah!</h2>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-[417px]">
      <div className="relative shrink-0 size-[33px]" data-name="Waving Hand">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgWavingHand} />
      </div>
      <Frame11 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 w-full">
      <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[22px] text-[#323232] text-[14px] w-full">
        Selamat datang di Portal Sivitas Kemendikdasmen. Kelola Administrasi Pegawai dalam Satu Platform
      </p>
    </div>
  );
}

function AssetsButton1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Assets / Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white">
            <p className="css-ew64yg leading-[24px]">Baca Buku Manual</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#2f3031] content-stretch flex flex-col h-[47px] items-center justify-center overflow-clip relative rounded-[4px] shrink-0 cursor-pointer transition-all hover:bg-[#1f2021]" data-name="Button">
      <AssetsButton1 />
    </div>
  );
}

function AssetsButton2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Assets / Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2f3031] text-[16px]">
            <p className="css-ew64yg leading-[24px]">Baca Regulasi SPBE</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[47px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col h-full items-center justify-center overflow-clip relative rounded-[inherit]">
        <AssetsButton2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#808489] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[19px] items-start relative shrink-0 w-[429px]">
      <Frame12 />
      <Frame13 />
      <Frame15 />
    </div>
  );
}

function EventList200DpFfffffFill0Wght700Grad0Opsz() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-name="event_list_200dp_FFFFFF_FILL0_wght700_GRAD0_opsz">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="event_list_200dp_FFFFFF_FILL0_wght700_GRAD0_opsz">
          <path d={svgPaths.p98b4410} fill="var(--fill-0, #505050)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="h-[22px] relative shrink-0 w-[20px]" data-name="Left icon">
      <EventList200DpFfffffFill0Wght700Grad0Opsz />
    </div>
  );
}

function AssetsButton3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Assets / Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[16px] py-[12px] relative w-full">
          <LeftIcon />
          <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2f3031] text-[16px]">
            <p className="css-ew64yg leading-[24px]">Agenda Hari Ini</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[48px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <AssetsButton3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#808489] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function EventNote200DpFfffffFill0Wght700Grad0Opsz() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="event_note_200dp_FFFFFF_FILL0_wght700_GRAD0_opsz48">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="event_note_200dp_FFFFFF_FILL0_wght700_GRAD0_opsz48">
          <path d={svgPaths.p36b80d00} fill="var(--fill-0, #505050)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function AssetsButton4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Assets / Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[16px] py-[12px] relative w-full">
          <EventNote200DpFfffffFill0Wght700Grad0Opsz />
          <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2f3031] text-[16px]">
            <p className="css-ew64yg leading-[24px]">Laporan Presensi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[48px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-all hover:bg-muted" data-name="Button">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <AssetsButton4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#808489] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function ReceiptLong200DpFfffffFill0Wght700Grad0Opsz() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="receipt_long_200dp_FFFFFF_FILL0_wght700_GRAD0_opsz48 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="receipt_long_200dp_FFFFFF_FILL0_wght700_GRAD0_opsz48 1">
          <path d={svgPaths.p2991b700} fill="var(--fill-0, #505050)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function AssetsButton5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Assets / Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[16px] py-[12px] relative w-full">
          <ReceiptLong200DpFfffffFill0Wght700Grad0Opsz />
          <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2f3031] text-[16px]">
            <p className="css-ew64yg leading-[24px]">Laporan Tunjangan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[48px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <AssetsButton5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#808489] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function InfoIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <circle cx="10" cy="10" r="8" stroke="var(--fill-0, #505050)" strokeWidth="1.5" fill="none" />
          <path d="M10 9V14M10 6V7" stroke="var(--fill-0, #505050)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function AssetsButton8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Assets / Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[16px] py-[12px] relative w-full">
          <InfoIcon />
          <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2f3031] text-[16px]">
            <p className="css-ew64yg leading-[24px]">Pusat Informasi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[48px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-all hover:bg-muted" data-name="Button" onClick={() => {
      const mainPage = document.querySelector('[data-name="Main Page 15"]')?.closest('div');
      if (mainPage && (mainPage as any).__onNavigateToPusatInformasi) {
        (mainPage as any).__onNavigateToPusatInformasi();
      }
    }}>
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <AssetsButton8 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#808489] border-solid inset-0 pointer-events-none rounded-[4px]"/>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Button3 />
      <Button4 />
      <Button5 />
      <Button8 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame9 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[3px] items-start justify-center leading-[0] not-italic px-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#323232] text-[12px] w-full">
            <p className="css-4hzbpn leading-[16px]">Log Harian</p>
          </div>
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-[#2f3031] text-[19px] w-full">
            <p className="css-4hzbpn leading-[24px]">3 Log</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1b7f8f00} fill="var(--fill-0, #0746BD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function RightIcon() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Right icon">
      <Icon />
    </div>
  );
}

function AssetsButton6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Assets / Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#0b5fef] text-[14px]">
            <p className="css-ew64yg leading-[20px]">Isi log harian</p>
          </div>
          <RightIcon />
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <AssetsButton6 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[4px] shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center px-[4px] py-[16px] relative w-full">
          <Frame18 />
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[3px] items-start justify-center leading-[0] not-italic px-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-bold justify-center relative shrink-0 text-[#323232] text-[12px] w-full">
            <p className="css-4hzbpn leading-[16px]">Sisa Cuti Tahunan</p>
          </div>
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-[#2f3031] text-[19px] w-full">
            <p className="css-4hzbpn leading-[24px]">12 Hari</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1b7f8f00} fill="var(--fill-0, #0746BD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function RightIcon1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Right icon">
      <Icon1 />
    </div>
  );
}

function AssetsButton7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Assets / Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#0b5fef] text-[14px]">
            <p className="css-ew64yg leading-[20px]">Ajukan cuti</p>
          </div>
          <RightIcon1 />
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full cursor-pointer transition-all hover:bg-primary/10" data-name="Button">
      <AssetsButton7 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[4px] shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center px-[4px] py-[16px] relative w-full">
          <Frame19 />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame21 />
      <Frame20 />
    </div>
  );
}

function AssetsToggle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Assets / Toggle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Assets / Toggle">
          <circle cx="10" cy="10" fill="var(--fill-0, #0B5FEF)" id="Base" r="6" />
        </g>
      </svg>
    </div>
  );
}

function AssetsToggle1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Assets / Toggle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Assets / Toggle">
          <circle cx="10" cy="10" id="Base" r="5.5" stroke="var(--stroke-0, #808489)" />
        </g>
      </svg>
    </div>
  );
}

function Indicator() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Indicator">
      <AssetsToggle />
      <AssetsToggle1 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[36px] items-start min-h-px min-w-px relative">
      <Frame22 />
      <Indicator />
    </div>
  );
}

export default function MainPage({ onNavigateToPusatInformasi, onNavigateToOrganizations, onNavigateToLayanan, onNavigateToPemberitahuan }: { onNavigateToPusatInformasi?: () => void; onNavigateToOrganizations?: () => void; onNavigateToLayanan?: () => void; onNavigateToPemberitahuan?: () => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ]);
  
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const bannerImages = [
    {
      url: "https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjb2xsYWJvcmF0aW9uJTIwdGVhbXdvcmt8ZW58MXx8fHwxNzczMjk4NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Kolaborasi Tim"
    },
    {
      url: "https://images.unsplash.com/photo-1759922378123-a1f4f1e39bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBsZWFybmluZyUyMHN0dWRlbnRzfGVufDF8fHx8MTc3MzIwNDIyMXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Pembelajaran & Pengembangan"
    },
    {
      url: "https://images.unsplash.com/photo-1758520144420-3e5b22e9b9a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrcGxhY2UlMjBtZWV0aW5nfGVufDF8fHx8MTc3MzI5ODczMnww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Rapat Profesional"
    },
    {
      url: "https://images.unsplash.com/photo-1573757056004-065ad36e2cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMGlubm92YXRpb258ZW58MXx8fHwxNzczMjIxMDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Teknologi & Inovasi"
    },
    {
      url: "https://images.unsplash.com/photo-1758518731027-78a22c8852ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN1Y2Nlc3MlMjBhY2hpZXZlbWVudHxlbnwxfHx8fDE3NzMyMjA0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Pencapaian & Kesuksesan"
    }
  ];
  
  React.useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);
  
  // Store callback in DOM for button access
  React.useEffect(() => {
    const mainPageEl = document.querySelector('[data-name=\"Main Page 15\"]')?.closest('div');
    if (mainPageEl) {
      if (onNavigateToPusatInformasi) {
        (mainPageEl as any).__onNavigateToPusatInformasi = onNavigateToPusatInformasi;
      }
      if (onNavigateToOrganizations) {
        (mainPageEl as any).__onNavigateToOrganizations = onNavigateToOrganizations;
      }
      if (onNavigateToLayanan) {
        (mainPageEl as any).__onNavigateToLayanan = onNavigateToLayanan;
      }
    }
  }, [onNavigateToPusatInformasi, onNavigateToOrganizations, onNavigateToLayanan]);

  return (
    <div className="bg-[#f9f9f9] min-h-screen w-full" data-name="Main Page 15">
      <Header onNotificationViewAll={onNavigateToPemberitahuan} />
      
      {/* System Banner - untuk pemberitahuan maintenance, dll */}
      <SystemBanner 
        type="maintenance"
        message="Sistem sedang dalam pemeliharaan terjadwal pada Sabtu, 15 Maret 2026 pukul 22:00 - 02:00 WIB. Beberapa layanan mungkin tidak tersedia."
        dismissible={true}
        showIcon={true}
      />
      
      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-[24px] py-[32px]">
        <div className="flex flex-col gap-[32px] w-full">
          {/* Banner Section - 2 Column Grid */}
          <div className="grid grid-cols-[1fr_1fr] gap-[24px] h-[231px] w-full">
            {/* Left Column - Welcome Content */}
            <div className="bg-white border border-[#c7c7c7] rounded-[8px] px-[40px] py-[32px] flex items-center">
              <Frame16 />
            </div>
            
            {/* Right Column - Banner Carousel */}
            <div className="bg-white border border-[#c7c7c7] rounded-[8px] overflow-hidden relative">
              <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                  {bannerImages.map((banner, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                      <img 
                        src={banner.url} 
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-[20px]">
                        <p className="text-white font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] leading-[24px]">
                          {banner.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex gap-[8px] z-10">
                {bannerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-[8px] h-[8px] rounded-full transition-all ${
                      currentSlide === index 
                        ? 'bg-white w-[24px]' 
                        : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* 2 Column Grid: Kehadiran | Menu Utama */}
          <div className="grid grid-cols-[280px_1fr] gap-[24px] w-full">
            {/* Widget Kehadiran — menggantikan Akses Cepat */}
            <WidgetKehadiran />

            {/* Menu Utama */}
            <div className="bg-white border border-[#c7c7c7] content-stretch flex flex-col gap-[24px] items-start px-[20px] py-[24px] rounded-[8px] w-full relative">
              <Frame27 />
              <MenuUtamaGrid 
                onNavigateToOrganizations={onNavigateToOrganizations}
                onNavigateToLayanan={onNavigateToLayanan}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}