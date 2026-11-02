import svgPaths from "../../imports/svg-if4jb7zrlq";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  title?: string;
}

export function ToggleSwitch({ checked, onChange, title }: ToggleSwitchProps) {
  return (
    <button
      onClick={onChange}
      title={title}
      className="relative w-[50px] h-[28px] shrink-0 cursor-pointer transition-colors rounded-[16px]"
      style={{
        backgroundColor: checked ? '#0b5fef' : '#f5f5f5',
        border: checked ? 'none' : '1px solid #c9cbcf',
      }}
    >
      {/* Handle — white circle with shadow, sits on left (off) or right (on) */}
      <div
        className="absolute transition-all"
        style={{
          top: '7.14%',
          bottom: '7.14%',
          left: checked ? '48%' : '4%',
          right: checked ? '4%' : '48%',
        }}
      >
        {/* Circle extends beyond container for shadow room */}
        <div className="absolute" style={{ inset: '-16.67%' }}>
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 32 32"
          >
            <g filter="url(#toggle_handle_shadow)">
              <circle cx="16" cy="16" fill="white" r="12" />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="32"
                id="toggle_handle_shadow"
                width="32"
                x="0"
                y="0"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                />
                <feBlend
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="effect1_dropShadow"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  mode="normal"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* Check icon — centered on the handle when ON */}
      {checked && (
        <div
          className="absolute overflow-clip"
          style={{ top: '25%', bottom: '25%', left: '58%', right: '14%' }}
        >
          <div className="absolute" style={{ inset: '-14.29%' }}>
            <div className="absolute" style={{ inset: '23.29% 12.5% 20.83% 14.21%' }}>
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 13.1925 10.0575"
              >
                <path d={svgPaths.p2c348300} fill="#45474A" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Cross icon — centered on the handle when OFF */}
      {!checked && (
        <div
          className="absolute overflow-clip"
          style={{ top: '25%', bottom: '25%', left: '14%', right: '58%' }}
        >
          <div
            className="absolute"
            style={{ left: '-2px', top: '-2px', width: '18px', height: '18px' }}
          >
            <div className="absolute" style={{ inset: '20.83%' }}>
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 10.5 10.5"
              >
                <path d={svgPaths.p30e60a80} fill="#45474A" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </button>
  );
}
