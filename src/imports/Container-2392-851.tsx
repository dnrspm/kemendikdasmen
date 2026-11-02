function Text() {
  return (
    <div className="h-[28.5px] relative shrink-0 w-[199.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[#2f3031] text-[16px] top-[-0.5px] tracking-[0.5px] uppercase whitespace-nowrap">
          <span className="leading-[28.5px]">{`Kehadiran Hari Ini | `}</span>
          <span className="leading-[28.5px] text-[#656a6c]">Sabtu, 23-2-2016</span>
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[28.5px] relative shrink-0 w-[411px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[21px] relative shrink-0 w-[181px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#656a6c] text-[14px] top-0 whitespace-nowrap">Absen Masuk</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[181px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[#2f3031] text-[0px] top-[-0.5px] whitespace-nowrap">
          <span className="leading-[30px] text-[20px]">{`08:00 `}</span>
          <span className="leading-[24px] text-[16px]">WIB</span>
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[181_0_0] h-[55px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Text1 />
        <Text2 />
      </div>
    </div>
  );
}

function Container4() {
  return <div className="bg-[#808489] h-[55px] shrink-0 w-px" data-name="Container" />;
}

function Text3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[181px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#656a6c] text-[14px] top-0 whitespace-nowrap">Absen Keluar</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[181px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[#2f3031] text-[0px] top-[-0.5px] whitespace-nowrap">
          <span className="leading-[30px] text-[20px]">{`17:00 `}</span>
          <span className="leading-[24px] text-[16px]">WIB</span>
        </p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[181_0_0] h-[55px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Text3 />
        <Text4 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[411px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Container3 />
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Container7() {
  return <div className="bg-[#4ca375] rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Text6() {
  return (
    <div className="bg-[#eef6ee] flex-[1_0_0] h-[26px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[12px] not-italic text-[#4ca375] text-[12px] top-[4.5px] whitespace-nowrap">Hadir</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[26px] items-center relative shrink-0 w-[71.281px]" data-name="Container">
      <Container7 />
      <Text6 />
    </div>
  );
}

function Text5() {
  return (
    <div className="relative shrink-0 w-[411px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#656a6c] text-[14px] whitespace-nowrap">Pembaruan terakhir: 15.54 WIB</p>
        <Container6 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pl-[20px] py-[20px] relative size-full" data-name="Container">
      <Container1 />
      <Container2 />
      <Text5 />
    </div>
  );
}