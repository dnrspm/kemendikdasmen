import svgPaths from "./svg-j6fusp41l3";

function Text() {
  return (
    <div className="bg-[rgba(144,108,239,0.1)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] whitespace-nowrap">SK 1</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Text />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[26.594px] items-start overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.6px] not-italic relative shrink-0 text-[#2f3031] text-[19px] whitespace-nowrap">Terwujudnya pengelolaan SDM yang profesional dan berintegritas</p>
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[6px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[764px]" data-name="Container">
      <Container2 />
      <Heading3Margin />
    </div>
  );
}

function Container5() {
  return <div className="bg-[#4ca375] relative rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#656a6c] text-[16px] whitespace-nowrap">Selesai</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container5 />
      <Text1 />
    </div>
  );
}

function Container7() {
  return <div className="bg-[#0b5fef] relative rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#656a6c] text-[16px] whitespace-nowrap">Sedang dikerjakan</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container7 />
      <Text2 />
    </div>
  );
}

function Container9() {
  return <div className="bg-[#eda62b] relative rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#656a6c] text-[16px] whitespace-nowrap">Belum Dikerjakan</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container9 />
      <Text3 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container4 />
      <Container6 />
      <Container8 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0" data-name="Container">
      <Container1 />
      <Container3 />
    </div>
  );
}

function Icon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[56px]" data-name="Icon">
      <div className="absolute inset-[6.42%_7.14%_7.87%_7.14%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" height="54" preserveAspectRatio="none" viewBox="0 0 54 54" width="54">
            <path d={svgPaths.p33b4d320} id="Vector" stroke="#EFEFEF" strokeWidth="6" />
          </svg>
        </div>
      </div>
      <div className="absolute flex inset-[6.42%_7.14%_7.87%_7.14%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-6.25%]">
              <svg className="block size-full" fill="none" height="54" preserveAspectRatio="none" viewBox="0 0 54 54" width="54">
                <path d={svgPaths.p33b4d320} id="Vector" stroke="#0B5FEF" strokeLinecap="round" strokeWidth="6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold inset-[35.52%_29.46%_41.26%_29.46%] leading-[normal] not-italic text-[#0b5fef] text-[11px] text-center whitespace-nowrap">72%</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[80px]" data-name="Container">
      <Icon />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[13px] text-center whitespace-nowrap">Target: 85%</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="bg-[rgba(144,108,239,0.1)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] whitespace-nowrap">IKK1.1</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Text4 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] whitespace-nowrap">Persentase pegawai yang mengikuti pelatihan kompetensi teknis dan manajerial</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Container14 />
      <Heading1 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex gap-[12px] items-center px-[12px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[56px]" data-name="Icon">
      <div className="absolute inset-[6.42%_7.14%_7.87%_7.14%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" height="54" preserveAspectRatio="none" viewBox="0 0 54 54" width="54">
            <path d={svgPaths.p33b4d320} id="Vector" stroke="#EFEFEF" strokeWidth="6" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[7.87%] flex items-center justify-center left-1/2 right-[7.14%] top-[6.42%]" style={{ containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-12.5%_-6.25%]">
              <svg className="block size-full" fill="none" height="30" preserveAspectRatio="none" viewBox="0 0 54 30" width="54">
                <path d={svgPaths.peb23800} id="Vector" stroke="#0B5FEF" strokeLinecap="round" strokeWidth="6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold inset-[35.52%_27.68%_41.26%_27.68%] leading-[normal] not-italic text-[#0b5fef] text-[11px] text-center whitespace-nowrap">50%</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[80px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Text5() {
  return (
    <div className="bg-[rgba(144,108,239,0.1)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] whitespace-nowrap">SKP 1</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Text5 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px overflow-clip pt-[6px] relative w-[635px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] w-full">Sistem informasi organisasi dan sumber daya manusia dapat menyediakan informasi tepat dan akurat dalam pengambilan keputusan</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col h-[88px] items-start relative shrink-0 w-[646px]" data-name="Container">
      <Container19 />
      <Paragraph />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container15() {
  return (
    <div className="border-[#efefef] border-solid border-t content-stretch flex flex-col items-start px-[12px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[56px]" data-name="Icon">
      <div className="absolute inset-[6.42%_7.14%_7.87%_7.14%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" height="54" preserveAspectRatio="none" viewBox="0 0 54 54" width="54">
            <path d={svgPaths.p33b4d320} id="Vector" stroke="#EFEFEF" strokeWidth="6" />
          </svg>
        </div>
      </div>
      <div className="absolute flex inset-[6.42%_7.14%_7.87%_7.14%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-6.25%]">
              <svg className="block size-full" fill="none" height="54" preserveAspectRatio="none" viewBox="0 0 54 54" width="54">
                <path d={svgPaths.p2f367880} id="Vector" stroke="#0B5FEF" strokeLinecap="round" strokeWidth="6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold inset-[35.52%_29.46%_41.26%_29.46%] leading-[normal] not-italic text-[#0b5fef] text-[11px] text-center whitespace-nowrap">75%</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[80px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Text6() {
  return (
    <div className="bg-[rgba(144,108,239,0.1)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] whitespace-nowrap">SKP 2</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Text6 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px overflow-clip pt-[6px] relative w-[635px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] w-full">Sistem informasi organisasi dan sumber daya manusia dapat diakses oleh seluruh unit kerja di lingkungan Kemendikdasmen</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-[633.516_0_0] flex-col h-[88px] items-start min-w-px relative" data-name="Container">
      <Container24 />
      <Paragraph1 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-[738px]" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container20() {
  return (
    <div className="border-[#efefef] border-solid border-t content-stretch flex flex-col items-start px-[12px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Container21 />
    </div>
  );
}

function Container10() {
  return (
    <div className="border border-[#efefef] border-solid content-stretch flex flex-col items-start relative rounded-[6px] shrink-0 w-[764px]" data-name="Container">
      <Container11 />
      <Container15 />
      <Container20 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="overflow-clip relative shrink-0 size-[56px]" data-name="Icon">
      <div className="absolute inset-[6.42%_7.14%_7.87%_7.14%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" height="54" preserveAspectRatio="none" viewBox="0 0 54 54" width="54">
            <path d={svgPaths.p33b4d320} id="Vector" stroke="#EFEFEF" strokeWidth="6" />
          </svg>
        </div>
      </div>
      <div className="absolute flex inset-[6.42%_7.14%_7.87%_7.14%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-6.25%]">
              <svg className="block size-full" fill="none" height="54" preserveAspectRatio="none" viewBox="0 0 54 54" width="54">
                <path d={svgPaths.p33b4d320} id="Vector" stroke="#0B5FEF" strokeLinecap="round" strokeWidth="6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold inset-[35.52%_29.46%_41.26%_29.46%] leading-[normal] not-italic text-[#0b5fef] text-[11px] text-center whitespace-nowrap">72%</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[80px]" data-name="Container">
      <Icon3 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[13px] text-center whitespace-nowrap">Target: 85%</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="bg-[rgba(144,108,239,0.1)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] whitespace-nowrap">IKK1.2</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Text7 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] whitespace-nowrap">Tingkat kepatuhan terhadap kode etik dan integritas</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Container29 />
      <Heading2 />
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex gap-[12px] items-center px-[12px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="overflow-clip relative shrink-0 size-[56px]" data-name="Icon">
      <div className="absolute inset-[6.42%_7.14%_7.87%_7.14%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" height="54" preserveAspectRatio="none" viewBox="0 0 54 54" width="54">
            <path d={svgPaths.p33b4d320} id="Vector" stroke="#EFEFEF" strokeWidth="6" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[7.87%] flex items-center justify-center left-1/2 right-[7.14%] top-[6.42%]" style={{ containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-12.5%_-6.25%]">
              <svg className="block size-full" fill="none" height="30" preserveAspectRatio="none" viewBox="0 0 54 30" width="54">
                <path d={svgPaths.peb23800} id="Vector" stroke="#0B5FEF" strokeLinecap="round" strokeWidth="6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold inset-[35.52%_27.68%_41.26%_27.68%] leading-[normal] not-italic text-[#0b5fef] text-[11px] text-center whitespace-nowrap">50%</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[80px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Text8() {
  return (
    <div className="bg-[rgba(144,108,239,0.1)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] whitespace-nowrap">SKP 1</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Text8 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px overflow-clip pt-[6px] relative w-[635px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] w-full">Sistem informasi organisasi dan sumber daya manusia dapat menyediakan informasi tepat dan akurat dalam pengambilan keputusan</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col h-[88px] items-start relative shrink-0 w-[646px]" data-name="Container">
      <Container34 />
      <Paragraph2 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Container">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Container30() {
  return (
    <div className="border-[#efefef] border-solid border-t content-stretch flex flex-col items-start px-[12px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Container31 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="overflow-clip relative shrink-0 size-[56px]" data-name="Icon">
      <div className="absolute inset-[6.42%_7.14%_7.87%_7.14%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" height="54" preserveAspectRatio="none" viewBox="0 0 54 54" width="54">
            <path d={svgPaths.p33b4d320} id="Vector" stroke="#EFEFEF" strokeWidth="6" />
          </svg>
        </div>
      </div>
      <div className="absolute flex inset-[6.42%_7.14%_7.87%_7.14%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-6.25%]">
              <svg className="block size-full" fill="none" height="54" preserveAspectRatio="none" viewBox="0 0 54 54" width="54">
                <path d={svgPaths.p2f367880} id="Vector" stroke="#0B5FEF" strokeLinecap="round" strokeWidth="6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold inset-[35.52%_29.46%_41.26%_29.46%] leading-[normal] not-italic text-[#0b5fef] text-[11px] text-center whitespace-nowrap">75%</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[80px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Text9() {
  return (
    <div className="bg-[rgba(144,108,239,0.1)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] whitespace-nowrap">SKP 2</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Text9 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px overflow-clip pt-[6px] relative w-[635px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#2f3031] text-[16px] w-full">Sistem informasi organisasi dan sumber daya manusia dapat diakses oleh seluruh unit kerja di lingkungan Kemendikdasmen</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-[633.516_0_0] flex-col h-[88px] items-start min-w-px relative" data-name="Container">
      <Container39 />
      <Paragraph3 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-[738px]" data-name="Container">
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container35() {
  return (
    <div className="border-[#efefef] border-solid border-t content-stretch flex flex-col items-start px-[12px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Container36 />
    </div>
  );
}

function Container25() {
  return (
    <div className="border border-[#efefef] border-solid content-stretch flex flex-col items-start relative rounded-[6px] shrink-0 w-[764px]" data-name="Container">
      <Container26 />
      <Container30 />
      <Container35 />
    </div>
  );
}

export default function SasaranKinerjaCard() {
  return (
    <div className="bg-white border border-[#c7c7c7] border-solid content-stretch flex flex-col gap-[24px] items-start p-[20px] relative rounded-[8px] size-full" data-name="SasaranKinerjaCard">
      <Container />
      <Container10 />
      <Container25 />
    </div>
  );
}