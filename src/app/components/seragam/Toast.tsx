import type { ReactNode } from 'react';

/** Toast Seragam (tampilan): latar gray-90, teks putih 15/22, radius 4, padding 12x16; aksi blue-30 15/22 semibold. Atur posisi/animasi di pemanggil. */
export function Toast({ children, action, onAction }: { children: ReactNode; action?: string; onAction?: () => void }) {
  return (
    <div role="status" className="flex min-w-[328px] max-w-[480px] items-center justify-between gap-[12px] rounded-[4px] bg-sd-gray-90 px-[16px] py-[12px] text-white shadow-[0_2px_10px_rgba(0,0,0,0.1),0_0_2px_rgba(0,0,0,0.2)]" style={{ fontSize: 15, lineHeight: '22px' }}>
      <span>{children}</span>
      {action && <button onClick={onAction} className="text-sd-blue-30 hover:text-sd-blue-50" style={{ fontWeight: 600 }}>{action}</button>}
    </div>
  );
}
