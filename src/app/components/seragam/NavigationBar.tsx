import type { ReactNode } from 'react';

export type NavItem = { key: string; label: ReactNode; href?: string; onClick?: () => void };

/** Navigation Bar Seragam (menu atas desktop): item 16/24 semibold, padding 8x12, radius 4; hover/tekan #F1F1F1; aktif teks blue-70 dengan garis bawah 4px blue-70 (radius atas 4); fokus ring blue-50 2px. */
export function NavigationBar({ items, active, className = '' }: { items: NavItem[]; active: string; className?: string }) {
  return (
    <nav aria-label="Navigasi utama" className={`flex items-end gap-[4px] ${className}`}>
      {items.map((it) => {
        const on = it.key === active;
        const Tag = it.href ? 'a' : 'button';
        return (
          <Tag key={it.key} href={it.href} onClick={it.onClick} aria-current={on ? 'page' : undefined}
            className="relative flex h-[64px] items-center">
            <span className={`rounded-[4px] px-[12px] py-[8px] outline-none hover:bg-sd-gray-5 active:bg-sd-gray-5 ${on ? 'text-sd-blue-70' : 'text-sd-gray-90'}`} style={{ fontSize: 16, lineHeight: '24px', fontWeight: 600 }}>{it.label}</span>
            {on && <span className="absolute bottom-0 left-1/2 h-[4px] w-[44px] -translate-x-1/2 rounded-t-[4px] bg-sd-blue-70" />}
          </Tag>
        );
      })}
    </nav>
  );
}
