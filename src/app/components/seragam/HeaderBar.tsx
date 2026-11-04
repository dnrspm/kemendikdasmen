import type { ReactNode } from 'react';

/** Header Bar Seragam (Large): putih, bagian atas tinggi 54 untuk tombol kembali dan aksi, judul halaman 22/28 semibold gray-90 (padding 0 16 12 16), bayangan 0 0 1px rgba(0,0,0,.25) + 0 2px 1px rgba(0,0,0,.05); `borderless` menghapus bayangan. Compact: judul 16/22 di baris atas. */
export function HeaderBar({ title, back, actions, borderless = false, compact = false }: { title: ReactNode; back?: ReactNode; actions?: ReactNode; borderless?: boolean; compact?: boolean }) {
  const shadow = borderless ? '' : 'shadow-[0_0_1px_rgba(0,0,0,0.25),0_2px_1px_rgba(0,0,0,0.05)]';
  return (
    <header className={`bg-white ${shadow}`}>
      <div className="flex h-[54px] items-center justify-between gap-[12px] px-[16px]">
        <div className="flex min-w-0 items-center gap-[12px]">
          {back}
          {compact && <h1 className="truncate text-sd-gray-90" style={{ fontSize: 16, lineHeight: '22px', fontWeight: 600 }}>{title}</h1>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-[8px]">{actions}</div>}
      </div>
      {!compact && <h1 className="px-[16px] pb-[12px] text-sd-gray-90" style={{ fontSize: 22, lineHeight: '28px', fontWeight: 600 }}>{title}</h1>}
    </header>
  );
}
