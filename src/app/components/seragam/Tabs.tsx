import type { ReactNode } from 'react';
import { color, typeAction } from './tokens';

export type TabItem = string | { label: string; count?: number };

/**
 * Tabs Seragam: tinggi 46px, label Mobile/Action 15/22 semibold.
 * Aktif = Action/Default dengan garis bawah 4px (lebar label + 12px); tidak aktif = Text/Subdued.
 * `fill` membagi lebar sama rata (2 sampai 3 tab); tanpa `fill` tab berurutan dari kiri dan bisa di-scroll.
 */
export function Tabs({ items, active, onChange, fill = false, className = '' }: { items: TabItem[]; active: number; onChange: (i: number) => void; fill?: boolean; className?: string }) {
  return (
    <div role="tablist" className={`flex border-b overflow-x-auto ${fill ? '' : 'gap-[24px] px-[16px]'} ${className}`} style={{ borderColor: color.border }}>
      {items.map((it, i) => {
        const label = typeof it === 'string' ? it : it.label;
        const count = typeof it === 'string' ? undefined : it.count;
        const on = i === active;
        return (
          <button
            key={label}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(i)}
            className={`${fill ? 'flex-1' : ''} whitespace-nowrap grid place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]`}
            style={{ height: '46px', outlineColor: color.actionDefault }}
          >
            <span className="relative inline-flex items-center gap-[6px] pt-[6px] pb-[16px]" style={{ ...typeAction, color: on ? color.actionDefault : color.textSubdued }}>
              {label}
              {count !== undefined && <span className="rounded-full px-[8px]" style={{ background: '#f0f0f0', color: color.textDefault, fontSize: '12px', lineHeight: '18px' }}>{count}</span>}
              {on && <span className="absolute bottom-0 -left-[6px] -right-[6px]" style={{ height: '4px', background: color.actionDefault }} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
export type { ReactNode };
