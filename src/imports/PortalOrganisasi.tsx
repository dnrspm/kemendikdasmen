import svgPaths from "./svg-mxevuodr7h";
import imgImage from "figma:asset/c311fe31e2c597256d8729fed5f2a131f4aaa151.png";
import imgImagePortalKemendikdasmen from "figma:asset/9422af45ba9c756818c3d67dd655d109dfd2e3af.png";
import imgImage1 from "figma:asset/22635ad56c87071eb4b8e229c412f19beac0b3dc.png";
import imgImage2 from "figma:asset/6d6df7825e18a760c3ee04150f34c5988843421f.png";
import imgImageKolaborasiTim from "figma:asset/8ff4531280883bda517cca6a2e6e10564e509d8b.png";
import imgImagePembelajaranPengembangan from "figma:asset/9a4df3542c54fcac048d8c7328383782b4c1759b.png";
import imgImageRapatProfesional from "figma:asset/67d17d94be19ee77a92bece127a0cdc3e054f14f.png";
import imgImageTeknologiInovasi from "figma:asset/7e031013ac74d69cfd707d8b60a06ad57d31d368.png";
import imgImagePencapaianKesuksesan from "figma:asset/d3fc6d2749cd153c5686cbfab30ef68f24ac8798.png";

function Image() {
  return (
    <div className="relative shrink-0 size-[33px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-end left-[64px] top-[142px]">
      <Image />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] not-italic relative shrink-0 text-[#323232] text-[28px] whitespace-nowrap">Halo, Sarah!</p>
    </div>
  );
}

function ImagePortalKemendikdasmen() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-h-px min-w-px relative" data-name="Image (Portal Kemendikdasmen)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImagePortalKemendikdasmen} />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[42px] relative shrink-0 w-[256.266px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <ImagePortalKemendikdasmen />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[24px] left-[33px] top-0 w-[84.391px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#2f3031] text-[16px] top-[-1px] whitespace-nowrap">Sarah Citra</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[126.39px] size-[24px] top-0" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M6 9L12 15L18 9" id="Vector" stroke="var(--stroke-0, #45474A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function FilledActionSSupervisorAccount1() {
  return (
    <div className="absolute contents inset-[20.83%_8.33%]" data-name="Filled / Action / S / supervisor_account">
      <div className="absolute inset-[20.83%_8.33%]" data-name="vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
          <path d={svgPaths.p3d3a7c00} fill="var(--fill-0, #45474A)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <FilledActionSSupervisorAccount1 />
    </div>
  );
}

function FilledActionSSupervisorAccount() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[24px] top-0" data-name="FilledActionSSupervisorAccount">
      <Icon1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[24px] left-[56px] top-[8px] w-[150.391px]" data-name="Container">
      <Paragraph />
      <Icon />
      <FilledActionSSupervisorAccount />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[8px] size-[24px] top-[8px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p369f8680} id="Vector" stroke="var(--stroke-0, #45474A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p21b0a2c0} id="Vector_2" stroke="var(--stroke-0, #45474A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#e02d38] content-stretch flex items-center justify-center left-[18px] px-[4px] rounded-[33554400px] size-[18px] top-[4px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">2</p>
    </div>
  );
}

function NotificationDropdown() {
  return (
    <div className="absolute left-0 rounded-[4px] size-[40px] top-0" data-name="NotificationDropdown">
      <Icon2 />
      <Text />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[40px] relative shrink-0 w-[206.391px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container3 />
        <NotificationDropdown />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[63px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative size-full">
          <Container1 />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[64px] items-start left-0 pb-px top-0 w-[1316px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#efefef] border-b border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[179.781px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#656a6c] text-[12px] top-0 whitespace-nowrap">Kamis, 12 Maret 2026</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.6px] min-w-full not-italic relative shrink-0 text-[#2f3031] text-[19px] tracking-[0.5px] uppercase w-[min-content]">Kehadiran Hari Ini</p>
      <Text1 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_2289_1239)" id="Icon">
          <path d={svgPaths.p3f144f80} id="Vector" stroke="var(--stroke-0, #656A6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
          <path d="M1.25 1.25V3.33333H3.33333" id="Vector_2" stroke="var(--stroke-0, #656A6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
          <path d={svgPaths.pae6600} id="Vector_3" stroke="var(--stroke-0, #656A6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
          <path d="M6.66667 6.66667H8.75V8.75" id="Vector_4" stroke="var(--stroke-0, #656A6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
        </g>
        <defs>
          <clipPath id="clip0_2289_1239">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16.5px] not-italic text-[#656a6c] text-[12px] text-center top-0 whitespace-nowrap">Reset</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex gap-[4px] h-[26px] items-center px-[6px] relative rounded-[4px] shrink-0 w-[58.219px]" data-name="Button">
      <Icon3 />
      <Text2 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[95px] items-start relative shrink-0 w-full">
      <Frame14 />
      <Button />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[22px] items-center left-[14px] px-[8px] py-[2px] rounded-[33554400px] top-0 w-[105.234px]" data-name="Text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#616161] text-[12px] whitespace-nowrap">Belum Presensi</p>
    </div>
  );
}

function Text5() {
  return <div className="absolute bg-[#9e9e9e] left-0 rounded-[33554400px] size-[8px] top-0" data-name="Text" />;
}

function Text4() {
  return (
    <div className="absolute left-0 size-[8px] top-[7px]" data-name="Text">
      <Text5 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[22px] relative shrink-0 w-[238px]" data-name="Container">
      <Text3 />
      <Text4 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative w-full">
      <Frame15 />
      <Container4 />
    </div>
  );
}

function Container5() {
  return <div className="bg-[#efefef] h-px shrink-0 w-full" data-name="Container" />;
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] h-[97px] items-start relative shrink-0 w-full">
      <Frame16 />
      <Container5 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pc444e40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28e93fc0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 8H2" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[18px] relative shrink-0 w-[91.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[46px] not-italic text-[12px] text-center text-white top-0 whitespace-nowrap">Presensi Masuk</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[30.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[15.5px] not-italic text-[14px] text-[rgba(255,255,255,0.85)] text-center top-0 whitespace-nowrap">--:--</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#0b5fef] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[4px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#0b5fef] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center pb-[12px] pt-[13px] px-px relative size-full">
          <Icon4 />
          <Text6 />
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p12257fa0} id="Vector" stroke="var(--stroke-0, #656A6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2c1f680} id="Vector_2" stroke="var(--stroke-0, #656A6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14 8H6" id="Vector_3" stroke="var(--stroke-0, #656A6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[18px] relative shrink-0 w-[92.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[46.5px] not-italic text-[#656a6c] text-[12px] text-center top-0 whitespace-nowrap">Presensi Pulang</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[30.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[15.5px] not-italic text-[#656a6c] text-[14px] text-center top-0 whitespace-nowrap">--:--</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f7f7f7] flex-[1_0_0] h-full min-h-px min-w-px opacity-45 relative rounded-[4px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center pb-[12px] pt-[13px] px-px relative size-full">
          <Icon5 />
          <Text8 />
          <Text9 />
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[12px] h-[88px] items-center relative shrink-0 w-full">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-end min-h-px min-w-px relative w-full">
      <Frame18 />
      <p className="decoration-solid font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#656a6c] text-[12px] text-center underline w-full">Simulasi: Lupa Presensi Masuk (Lewat 16:30)</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[280px] items-start left-[58px] px-[16px] py-[24px] rounded-[8px] top-[235px] w-[386px]">
      <div aria-hidden="true" className="absolute border border-[#c7c7c7] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame17 />
      <Frame19 />
    </div>
  );
}

function Group() {
  return (
    <div className="relative shrink-0 size-[39.189px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.1893 39.1893">
        <g id="Group 39990">
          <g id="Group">
            <path d={svgPaths.p12a0f170} fill="var(--fill-0, #2560E0)" id="Vector" />
            <path d={svgPaths.p23467600} fill="var(--fill-0, #2560E0)" id="Vector_2" />
            <path d={svgPaths.p6e3e700} fill="var(--fill-0, #2560E0)" id="Vector_3" />
            <path d={svgPaths.p30ed4672} fill="var(--fill-0, #D0DEFB)" id="Vector_4" stroke="var(--stroke-0, #D0DEFB)" />
          </g>
          <g id="Group_2">
            <path d={svgPaths.p20d918f2} fill="var(--fill-0, #458CFF)" id="Vector_5" />
          </g>
          <g id="Vector_6" />
          <path d={svgPaths.p1b930480} fill="var(--fill-0, #071A8C)" id="Vector_7" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center px-[3.733px] py-[2.667px] relative shrink-0 w-[50.133px]">
      <Group />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#323232] text-[14px] w-[min-content]">
        <p className="leading-[20px]">Menu lainnya</p>
      </div>
    </div>
  );
}

function MainMenuCard() {
  return (
    <div className="bg-[#f5faff] col-3 justify-self-stretch relative rounded-[4px] row-3 self-stretch shrink-0" data-name="Main menu Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[10px] py-[12px] relative size-full">
          <Frame12 />
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute left-0 size-[45px] top-0" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[45px]" data-name="Frame1">
      <Image1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#323232] text-[14px] w-[min-content]">
        <p className="leading-[20px]">Organisasi</p>
      </div>
    </div>
  );
}

function MainMenuCard1() {
  return (
    <div className="bg-[#f5faff] col-1 justify-self-stretch relative rounded-[4px] row-2 self-stretch shrink-0" data-name="Main menu Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[10px] py-[12px] relative size-full">
          <Frame />
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function Kepegawaian() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Kepegawaian">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
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
        <p className="leading-[20px]">Kepegawaian</p>
      </div>
    </div>
  );
}

function MainMenuCard2() {
  return (
    <div className="bg-[#f5faff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Main menu Card">
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
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
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
        <p className="leading-[20px]">Kinerja</p>
      </div>
    </div>
  );
}

function MainMenuCard3() {
  return (
    <div className="bg-[#f5faff] col-2 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Main menu Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[10px] relative size-full">
          <Kinerja />
          <Frame4 />
        </div>
      </div>
    </div>
  );
}

function Setting() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Setting">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Setting">
          <path d={svgPaths.p90f8780} fill="var(--fill-0, #E6A703)" id="Vector" />
          <path d={svgPaths.p20bb1680} fill="var(--fill-0, #E6A703)" id="Vector_2" />
          <path d={svgPaths.p747f300} fill="var(--fill-0, #0E43C1)" id="Vector_3" />
          <path d={svgPaths.p26d40380} fill="var(--fill-0, #7C3B00)" id="Vector_4" />
          <path d={svgPaths.p2763fe00} fill="var(--fill-0, #020A11)" id="Vector_5" />
          <path d={svgPaths.p331d7300} fill="var(--fill-0, #020A11)" id="Vector_6" />
          <path d={svgPaths.p33982d30} fill="var(--fill-0, #CF7E00)" id="Vector_7" />
          <path d={svgPaths.p3b9a3700} fill="var(--fill-0, #2560E0)" id="Vector_8" />
          <path d={svgPaths.p24db3400} fill="var(--fill-0, #458CFF)" id="Vector_9" />
          <path d={svgPaths.p2cf41500} fill="var(--fill-0, #071A8C)" id="Vector_10" />
          <path d={svgPaths.p36f5b700} fill="var(--fill-0, #E6A703)" id="Vector_11" />
          <path d={svgPaths.p22650700} fill="var(--fill-0, #E6A703)" id="Vector_12" />
          <path d={svgPaths.p15081570} fill="var(--fill-0, #E6A703)" id="Vector_13" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#323232] text-[14px] w-[min-content]">
        <p className="leading-[20px]">Pengaturan Umum</p>
      </div>
    </div>
  );
}

function MainMenuCard4() {
  return (
    <div className="bg-[#f5faff] col-1 justify-self-stretch relative rounded-[4px] row-3 self-stretch shrink-0" data-name="Main menu Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[10px] relative size-full">
          <Setting />
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Kemendikdasmen() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Kemendikdasmen">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Kemendikdasmen">
          <path d={svgPaths.p1fae5f2} fill="var(--fill-0, #071A8C)" id="Vector" />
          <path d={svgPaths.p53db100} fill="var(--fill-0, #2560E0)" id="Vector_2" />
          <path d={svgPaths.p4227b00} fill="var(--fill-0, #0E43C1)" id="Vector_3" />
          <path d={svgPaths.p116044d0} fill="var(--fill-0, #071A8C)" id="Vector_4" />
          <path d={svgPaths.p1d9b8c30} fill="var(--fill-0, #70B6DB)" id="Vector_5" />
          <path d={svgPaths.p69d5700} fill="var(--fill-0, #9EE1EA)" id="Vector_6" />
          <path d={svgPaths.p178df570} fill="var(--fill-0, #CAF3F9)" id="Vector_7" />
          <path d={svgPaths.p2c656d00} fill="var(--fill-0, #3C79B0)" id="Vector_8" />
          <path d={svgPaths.p35957000} fill="var(--fill-0, #3C79B0)" id="Vector_9" />
          <path d={svgPaths.p3ee4fc00} fill="var(--fill-0, #3C79B0)" id="Vector_10" />
          <path d={svgPaths.p56d4500} fill="var(--fill-0, #70B6DB)" id="Vector_11" />
          <path d={svgPaths.p19a76800} fill="var(--fill-0, #CF7E00)" id="Vector_12" />
          <path d={svgPaths.p39bfb480} fill="var(--fill-0, #CF7E00)" id="Vector_13" />
          <path d={svgPaths.p2462f00} fill="var(--fill-0, #164C9B)" id="Vector_14" />
          <path d={svgPaths.p2eb25e70} fill="var(--fill-0, #E6A703)" id="Vector_15" />
          <path d={svgPaths.p368b8ff0} fill="var(--fill-0, #E6A703)" id="Vector_16" />
          <path d={svgPaths.p103041f0} fill="var(--fill-0, #CF7E00)" id="Vector_17" />
          <path d={svgPaths.p3b5d1900} fill="var(--fill-0, #E6A703)" id="Vector_18" />
          <path d={svgPaths.p3e93ec00} fill="var(--fill-0, #E6A703)" id="Vector_19" />
          <path d={svgPaths.p13bd9100} fill="var(--fill-0, #E6A703)" id="Vector_20" />
          <path d={svgPaths.p27ea14c0} fill="var(--fill-0, #E6A703)" id="Vector_21" />
          <path d={svgPaths.p50416f0} fill="var(--fill-0, #CF7E00)" id="Vector_22" />
          <path d={svgPaths.p35336500} fill="var(--fill-0, #CF7E00)" id="Vector_23" />
          <path d={svgPaths.p29111900} fill="var(--fill-0, #7C3B00)" id="Vector_24" />
          <path d={svgPaths.p1de15300} fill="var(--fill-0, #7C3B00)" id="Vector_25" />
          <path d={svgPaths.p1dcc0000} fill="var(--fill-0, #458CFF)" id="Vector_26" />
          <path d={svgPaths.p12cc1c00} fill="var(--fill-0, #0E43C1)" id="Vector_27" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#323232] text-[14px] w-[min-content]">
        <p className="leading-[20px]">Spreadsheet Kolaborasi</p>
      </div>
    </div>
  );
}

function MainMenuCard5() {
  return (
    <div className="bg-[#f5faff] col-2 justify-self-stretch relative rounded-[4px] row-3 self-stretch shrink-0" data-name="Main menu Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[10px] py-[12px] relative size-full">
          <Kemendikdasmen />
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[43px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col h-[49px] items-start overflow-clip pr-[-56.031px] relative shrink-0 w-[48px]" data-name="Container">
      <Image2 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[157px]">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#323232] text-[14px] w-[min-content]">
        <p className="leading-[20px]">Sistem Naskah Dinas Elektronik</p>
      </div>
    </div>
  );
}

function MainMenuCard6() {
  return (
    <div className="bg-[#f5faff] col-3 justify-self-stretch relative rounded-[4px] row-2 self-stretch shrink-0" data-name="Main menu Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[10px] py-[12px] relative size-full">
          <Container6 />
          <Frame7 />
        </div>
      </div>
    </div>
  );
}

function Kemendikdasmen1() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Kemendikdasmen">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
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
        <p className="leading-[20px]">Layanan</p>
      </div>
    </div>
  );
}

function MainMenuCard7() {
  return (
    <div className="bg-[#f5faff] col-3 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Main menu Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[10px] py-[12px] relative size-full">
          <Kemendikdasmen1 />
          <Frame8 />
        </div>
      </div>
    </div>
  );
}

function Kehadiran() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Kehadiran">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
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

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#323232] text-[14px] w-[min-content]">
        <p className="leading-[20px]">Kehadiran</p>
      </div>
    </div>
  );
}

function MainMenuCard8() {
  return (
    <div className="bg-[#f5faff] col-2 justify-self-stretch relative rounded-[4px] row-2 self-stretch shrink-0" data-name="Main menu Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[10px] relative size-full">
          <Kehadiran />
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(3,minmax(0,1fr))] h-[235px] relative shrink-0 w-full">
      <MainMenuCard />
      <MainMenuCard1 />
      <MainMenuCard2 />
      <MainMenuCard3 />
      <MainMenuCard4 />
      <MainMenuCard5 />
      <MainMenuCard6 />
      <MainMenuCard7 />
      <MainMenuCard8 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[24px] h-[331px] items-start left-[58px] px-[20px] py-[24px] rounded-[8px] top-[532px] w-[1216px]">
      <div aria-hidden="true" className="absolute border border-[#c7c7c7] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2f3031] text-[14px] tracking-[0.5px] uppercase w-full">
        <p className="leading-[16px]">Menu Utama</p>
      </div>
      <Frame10 />
    </div>
  );
}

function ImageKolaborasiTim() {
  return (
    <div className="absolute h-[326px] left-0 top-0 w-[822.536px]" data-name="Image (Kolaborasi Tim)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageKolaborasiTim} />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[32.792px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.792px] left-0 not-italic text-[21.861px] text-white top-[-1.37px] whitespace-nowrap">Kolaborasi Tim</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-gradient-to-t content-stretch flex flex-col from-[rgba(0,0,0,0.6)] h-[87.446px] items-start left-0 pt-[27.327px] px-[27.327px] to-[rgba(0,0,0,0)] top-[238.56px] w-[822.536px]" data-name="Container">
      <Paragraph1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[326.555px] left-0 top-0 w-[822.536px]" data-name="Container">
      <ImageKolaborasiTim />
      <Container11 />
    </div>
  );
}

function ImagePembelajaranPengembangan() {
  return (
    <div className="absolute h-[326px] left-0 top-0 w-[822.536px]" data-name="Image (Pembelajaran & Pengembangan)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImagePembelajaranPengembangan} />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[32.792px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.792px] left-0 not-italic text-[21.861px] text-white top-[-1.37px] whitespace-nowrap">{`Pembelajaran & Pengembangan`}</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-gradient-to-t content-stretch flex flex-col from-[rgba(0,0,0,0.6)] h-[87.446px] items-start left-0 pt-[27.327px] px-[27.327px] to-[rgba(0,0,0,0)] top-[238.56px] w-[822.536px]" data-name="Container">
      <Paragraph2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[326px] left-[822.54px] top-0 w-[822.536px]" data-name="Container">
      <ImagePembelajaranPengembangan />
      <Container13 />
    </div>
  );
}

function ImageRapatProfesional() {
  return (
    <div className="absolute h-[326px] left-0 top-0 w-[822.536px]" data-name="Image (Rapat Profesional)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageRapatProfesional} />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[32.792px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.792px] left-0 not-italic text-[21.861px] text-white top-[-1.37px] whitespace-nowrap">Rapat Profesional</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-gradient-to-t content-stretch flex flex-col from-[rgba(0,0,0,0.6)] h-[87.446px] items-start left-0 pt-[27.327px] px-[27.327px] to-[rgba(0,0,0,0)] top-[238.56px] w-[822.536px]" data-name="Container">
      <Paragraph3 />
    </div>
  );
}

function Button3() {
  return <div className="bg-[rgba(255,255,255,0.5)] rounded-[4px] shrink-0 size-[8px]" data-name="Button" />;
}

function Button4() {
  return <div className="bg-[rgba(255,255,255,0.5)] rounded-[4px] shrink-0 size-[8px]" data-name="Button" />;
}

function Button5() {
  return <div className="bg-white flex-[1_0_0] h-[8px] min-h-px min-w-px rounded-[4px]" data-name="Button" />;
}

function Button6() {
  return <div className="bg-[rgba(255,255,255,0.5)] rounded-[4px] shrink-0 size-[8px]" data-name="Button" />;
}

function Button7() {
  return <div className="bg-[rgba(255,255,255,0.5)] rounded-[4px] shrink-0 size-[8px]" data-name="Button" />;
}

function Container16() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[8px] items-start left-[702.31px] top-[261px] w-[88px]" data-name="Container">
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[326px] left-[1645.07px] top-0 w-[822.536px]" data-name="Container">
      <ImageRapatProfesional />
      <Container15 />
      <Container16 />
    </div>
  );
}

function ImageTeknologiInovasi() {
  return (
    <div className="absolute h-[326px] left-0 top-0 w-[822.536px]" data-name="Image (Teknologi & Inovasi)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageTeknologiInovasi} />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[32.792px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.792px] left-0 not-italic text-[21.861px] text-white top-[-1.37px] whitespace-nowrap">{`Teknologi & Inovasi`}</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-gradient-to-t content-stretch flex flex-col from-[rgba(0,0,0,0.6)] h-[87.446px] items-start left-0 pt-[27.327px] px-[27.327px] to-[rgba(0,0,0,0)] top-[238.56px] w-[822.536px]" data-name="Container">
      <Paragraph4 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[326px] left-[2467.61px] top-0 w-[822.536px]" data-name="Container">
      <ImageTeknologiInovasi />
      <Container18 />
    </div>
  );
}

function ImagePencapaianKesuksesan() {
  return (
    <div className="absolute h-[326px] left-0 top-0 w-[822.536px]" data-name="Image (Pencapaian & Kesuksesan)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImagePencapaianKesuksesan} />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[32.792px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.792px] left-0 not-italic text-[21.861px] text-white top-[-1.37px] whitespace-nowrap">{`Pencapaian & Kesuksesan`}</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-gradient-to-t content-stretch flex flex-col from-[rgba(0,0,0,0.6)] h-[87.446px] items-start left-0 pt-[27.327px] px-[27.327px] to-[rgba(0,0,0,0)] top-[238.56px] w-[822.536px]" data-name="Container">
      <Paragraph5 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[326px] left-[3290.14px] top-0 w-[822.536px]" data-name="Container">
      <ImagePencapaianKesuksesan />
      <Container20 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[326.555px] relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container12 />
      <Container14 />
      <Container17 />
      <Container19 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[326px] items-start left-[-4.31px] overflow-clip pl-[-1645.072px] pr-[1645.072px] top-[-1px] w-[822.536px]" data-name="Container">
      <Container9 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-white border border-[#c7c7c7] border-solid h-[281px] left-[461px] overflow-clip rounded-[8px] top-[234px] w-[813px]" data-name="Container">
      <Container8 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p377dab00} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 7.5V10.8333" id="Vector_2" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[952.031px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#92400e] text-[14px] top-0 whitespace-nowrap">Sistem sedang dalam pemeliharaan terjadwal pada Sabtu, 15 Maret 2026 pukul 22:00 - 02:00 WIB. Beberapa layanan mungkin tidak tersedia.</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Icon6 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p354ab980} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p2a4db200} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Button8 />
    </div>
  );
}

function SystemBanner() {
  return (
    <div className="absolute bg-[#fef3c7] content-stretch flex flex-col h-[46px] items-start left-0 pb-px pt-[12px] px-[24px] top-[64px] w-[1316px]" data-name="SystemBanner">
      <div aria-hidden="true" className="absolute border-[#f59e0b] border-b border-solid inset-0 pointer-events-none" />
      <Container21 />
    </div>
  );
}

export default function PortalOrganisasi() {
  return (
    <div className="bg-white relative size-full" data-name="Portal Organisasi">
      <Frame13 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[64px] not-italic text-[#323232] text-[16px] top-[187px] w-[762px]">Selamat datang di Portal Sivitas Kemendikdasmen. Kelola Administrasi Pegawai dalam Satu Platform</p>
      <Header />
      <Frame20 />
      <Frame11 />
      <Container7 />
      <SystemBanner />
    </div>
  );
}