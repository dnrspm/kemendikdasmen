import svgPaths from "./svg-gktn8wkdsc";

function TextInput() {
  return (
    <div className="absolute bg-white h-[44px] left-0 rounded-[4px] top-0 w-[1170px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[48px] pr-[16px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#808489] text-[16px]">Cari nama atau nomor dokumen...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c7c7c7] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[16px] size-[20px] top-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pcddfd00} id="Vector" stroke="var(--stroke-0, #808489)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 17.5L13.9167 13.9167" id="Vector_2" stroke="var(--stroke-0, #808489)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[44px] left-[0.5px] top-[-0.4px] w-[1170px]" data-name="Container">
      <TextInput />
      <Icon />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[102.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[51.5px] not-italic text-[#2f3031] text-[16px] text-center top-[-1px]">Semua Tahun</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #656A6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white content-stretch flex h-[44px] items-center justify-between left-[1181.52px] px-[17px] py-px rounded-[4px] top-0 w-[160.484px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c7] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Text />
      <Icon1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Button />
    </div>
  );
}

function Line() {
  return (
    <div className="h-[0.001px] relative shrink-0 w-full" data-name="Line">
      <div className="absolute inset-[0_-10%_-4px_-10%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 171.6 4">
          <g id="Line">
            <path d="M0 0H171.6V4H0V0Z" fill="var(--fill-0, #0954D9)" id="Line_2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start justify-between relative shrink-0" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22px] not-italic relative shrink-0 text-[#0954D9] text-[15px]">Surat Kebutuhan JF</p>
      <Line />
    </div>
  );
}

function Line1() {
  return (
    <div className="h-[0.001px] relative shrink-0 w-full" data-name="Line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 159 0.001">
        <g id="Line" />
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start justify-between relative shrink-0" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22px] not-italic relative shrink-0 text-[#65686c] text-[15px]">Kepmen Peta Jabatan</p>
      <Line1 />
    </div>
  );
}

function Line2() {
  return (
    <div className="h-[0.001px] relative shrink-0 w-full" data-name="Line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 0.001">
        <g id="Line" />
      </svg>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start justify-between relative shrink-0" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22px] not-italic relative shrink-0 text-[#65686c] text-[15px]">Third tab</p>
      <Line2 />
    </div>
  );
}

function Line3() {
  return (
    <div className="h-[0.001px] relative shrink-0 w-full" data-name="Line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 0.001">
        <g id="Line" />
      </svg>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start justify-between relative shrink-0" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22px] not-italic relative shrink-0 text-[#65686c] text-[15px]">Fourth tab</p>
      <Line3 />
    </div>
  );
}

function Line4() {
  return (
    <div className="h-[0.001px] relative shrink-0 w-full" data-name="Line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 61 0.001">
        <g id="Line" />
      </svg>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start justify-between relative shrink-0" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22px] not-italic relative shrink-0 text-[#65686c] text-[15px]">Fifth tab</p>
      <Line4 />
    </div>
  );
}

function Line5() {
  return (
    <div className="h-[0.001px] relative shrink-0 w-full" data-name="Line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 0.001">
        <g id="Line" />
      </svg>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start justify-between relative shrink-0" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22px] not-italic relative shrink-0 text-[#65686c] text-[15px]">Six tab</p>
      <Line5 />
    </div>
  );
}

function Line6() {
  return (
    <div className="h-[0.001px] relative shrink-0 w-full" data-name="Line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73 0.001">
        <g id="Line" />
      </svg>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start justify-between relative shrink-0" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22px] not-italic relative shrink-0 text-[#65686c] text-[15px]">Seven tab</p>
      <Line6 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-start left-[16px] top-0 w-[731px]" data-name="Container">
      <div className="content-stretch flex flex-col h-[42px] items-center justify-between relative shrink-0" data-name="Assets / Tabs">
        <div className="h-[0.001px] shrink-0 w-full" data-name="Top" />
        <Content />
      </div>
      <div className="content-stretch flex flex-col h-[42px] items-center justify-between relative shrink-0" data-name="Assets / Tabs">
        <div className="h-[0.001px] shrink-0 w-full" data-name="Top" />
        <Content1 />
      </div>
      <div className="content-stretch flex flex-col h-[42px] items-center justify-between relative shrink-0" data-name="Assets / Tabs">
        <div className="h-[0.001px] shrink-0 w-full" data-name="Top" />
        <Content2 />
      </div>
      <div className="content-stretch flex flex-col h-[42px] items-center justify-between relative shrink-0" data-name="Assets / Tabs">
        <div className="h-[0.001px] shrink-0 w-full" data-name="Top" />
        <Content3 />
      </div>
      <div className="content-stretch flex flex-col h-[42px] items-center justify-between relative shrink-0" data-name="Assets / Tabs">
        <div className="h-[0.001px] shrink-0 w-full" data-name="Top" />
        <Content4 />
      </div>
      <div className="content-stretch flex flex-col h-[42px] items-center justify-between relative shrink-0" data-name="Assets / Tabs">
        <div className="h-[0.001px] shrink-0 w-full" data-name="Top" />
        <Content5 />
      </div>
      <div className="content-stretch flex flex-col h-[42px] items-center justify-between relative shrink-0" data-name="Assets / Tabs">
        <div className="h-[0.001px] shrink-0 w-full" data-name="Top" />
        <Content6 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[24px] px-[24px] relative size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
      <div className="bg-white h-[46px] overflow-clip relative shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05)] shrink-0 w-[360px]" data-name="Scrollable">
        <Container3 />
      </div>
    </div>
  );
}