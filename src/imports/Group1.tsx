import svgPaths from "./svg-if4jb7zrlq";

function Check() {
  return (
    <div className="absolute bottom-1/4 left-[58%] overflow-clip right-[14%] top-1/4" data-name="check">
      <div className="absolute inset-[-14.29%]" data-name="Filled / Navigation / check">
        <div className="absolute inset-[23.29%_12.5%_20.83%_14.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1925 10.0575">
            <path d={svgPaths.p2c348300} fill="var(--fill-0, #45474A)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Cross() {
  return (
    <div className="absolute bottom-1/4 left-[14%] overflow-clip right-[58%] top-1/4" data-name="cross">
      <div className="absolute left-[-2px] size-[18px] top-[-2px]" data-name="Filled / Navigation / close">
        <div className="absolute inset-[20.83%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
            <path d={svgPaths.p30e60a80} fill="var(--fill-0, #45474A)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[28px] left-0 top-0 w-[50px]" data-name="Switch">
        <div className="absolute bg-[#0b5fef] h-[28px] left-0 rounded-[100px] top-0 w-[50px]" data-name="Base" />
        <div className="absolute inset-[7.14%_4%_7.14%_48%]" data-name="Handle">
          <div className="absolute inset-[-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g filter="url(#filter0_d_2308_154)" id="Handle">
                <circle cx="16" cy="16" fill="var(--fill-0, white)" r="12" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="32" id="filter0_d_2308_154" width="32" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2308_154" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_2308_154" mode="normal" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <Check />
      </div>
      <div className="absolute h-[28px] left-0 top-[44px] w-[50px]" data-name="Switch">
        <div className="absolute bg-[#f5f5f5] border border-[#c9cbcf] border-solid h-[28px] left-0 rounded-[100px] top-0 w-[50px]" data-name="Base" />
        <div className="absolute inset-[7.14%_48%_7.14%_4%]" data-name="Handle">
          <div className="absolute inset-[-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g filter="url(#filter0_d_2308_154)" id="Handle">
                <circle cx="16" cy="16" fill="var(--fill-0, white)" r="12" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="32" id="filter0_d_2308_154" width="32" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2308_154" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_2308_154" mode="normal" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <Cross />
      </div>
    </div>
  );
}