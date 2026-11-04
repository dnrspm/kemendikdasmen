import { useEffect, useRef, useState, type ReactNode } from 'react';

export type PopoverItem = { label: ReactNode; onSelect: () => void; disabled?: boolean };

/** Popover (menu) Seragam: panel putih radius 8, padding 4x8, bayangan 0 2 10 rgba(0,0,0,.1) + 0 0 2 rgba(0,0,0,.2); item padding 8 radius 4, 15/22; hover #F5F5F5, tekan #D9DBDD, fokus ring blue-50. */
export function Popover({ trigger, items, align = 'left' }: { trigger: (p: { open: boolean; toggle: () => void }) => ReactNode; items: PopoverItem[]; align?: 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', down); document.addEventListener('keydown', key);
    return () => { document.removeEventListener('mousedown', down); document.removeEventListener('keydown', key); };
  }, [open]);
  return (
    <div ref={ref} className="relative inline-block">
      {trigger({ open, toggle: () => setOpen((o) => !o) })}
      {open && (
        <ul role="menu" className={`absolute top-full z-50 mt-[4px] min-w-[120px] rounded-[8px] bg-white px-[8px] py-[4px] shadow-[0_2px_10px_rgba(0,0,0,0.1),0_0_2px_rgba(0,0,0,0.2)] ${align === 'right' ? 'right-0' : 'left-0'}`}>
          {items.map((it, i) => (
            <li key={i} role="none">
              <button role="menuitem" disabled={it.disabled} onClick={() => { it.onSelect(); setOpen(false); }}
                className="w-full whitespace-nowrap rounded-[4px] p-[8px] text-left text-sd-gray-90 outline-none hover:bg-sd-modal-header active:bg-sd-modal-footer-border focus-visible:shadow-[inset_0_0_0_2px_var(--sd-interactive-focused)] disabled:text-sd-gray-50"
                style={{ fontSize: 15, lineHeight: '22px' }}>{it.label}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
