import svgPaths from "./svg-x107htcolz";

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pc444e40} id="Vector" stroke="var(--stroke-0, #656A6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28e93fc0} id="Vector_2" stroke="var(--stroke-0, #656A6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 8H2" id="Vector_3" stroke="var(--stroke-0, #656A6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[18px] relative shrink-0 w-[91.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[46px] not-italic text-[#656a6c] text-[12px] text-center top-[0.5px]">Presensi Masuk</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[37.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[19px] not-italic text-[#2f3031] text-[14px] text-center top-0">13.36</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f7f7f7] flex-[1_0_0] min-h-px min-w-px relative rounded-tl-[4px] rounded-tr-[4px] w-[115px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center pb-[12px] pt-[13px] px-px relative size-full">
        <Icon />
        <Text />
        <Text1 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="bg-[#fbe9e7] flex-[1_0_0] h-[22px] min-h-px min-w-px relative rounded-bl-[4px] rounded-br-[4px]" data-name="Text">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[8px] relative size-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#bf360c] text-[12px]">Terlambat</p>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative rounded-bl-[4px] rounded-br-[4px] shrink-0 w-[115px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-b border-l border-r border-solid inset-0 pointer-events-none rounded-bl-[4px] rounded-br-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pb-px px-px relative w-full">
        <Text2 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Container">
      <Button />
      <Container1 />
    </div>
  );
}