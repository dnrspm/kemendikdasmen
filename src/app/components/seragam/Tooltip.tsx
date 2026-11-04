import type { ReactNode } from 'react';

const POS = {
  top: 'bottom-full left-1/2 mb-[6px] -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-[6px] -translate-x-1/2',
  left: 'right-full top-1/2 mr-[6px] -translate-y-1/2',
  right: 'left-full top-1/2 ml-[6px] -translate-y-1/2',
} as const;

/** Tooltip Seragam: latar gray-90, teks putih 14/20, padding 8, radius 4. Muncul saat hover atau fokus. */
export function Tooltip({ text, side = 'top', children }: { text: ReactNode; side?: keyof typeof POS; children: ReactNode }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span role="tooltip" className={`pointer-events-none absolute z-50 hidden w-max max-w-[240px] rounded-[4px] bg-sd-gray-90 p-[8px] text-white group-hover:block group-focus-within:block ${POS[side]}`} style={{ fontSize: 14, lineHeight: '20px' }}>
        {text}
      </span>
    </span>
  );
}
