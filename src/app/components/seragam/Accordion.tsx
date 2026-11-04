import { useState, type ReactNode } from 'react';

/** Accordion Seragam (gaya Card): header padding 16x12, judul 17/22 semibold, border #D9DBDD, radius 4; terbuka border #C9CBCF dan isi padding 16. Tekan: latar #D9DBDD. */
export function Accordion({ title, children, defaultOpen = false, open: controlled, onOpenChange }: {
  title: ReactNode; children: ReactNode; defaultOpen?: boolean; open?: boolean; onOpenChange?: (o: boolean) => void;
}) {
  const [inner, setInner] = useState(defaultOpen);
  const open = controlled ?? inner;
  const toggle = () => { const n = !open; setInner(n); onOpenChange?.(n); };
  return (
    <div className={`overflow-hidden rounded-[4px] border bg-white ${open ? 'border-sd-modal-border' : 'border-sd-modal-footer-border'}`}>
      <button type="button" aria-expanded={open} onClick={toggle}
        className="flex w-full items-center justify-between gap-[12px] bg-white px-[12px] py-[16px] text-left outline-none active:bg-sd-modal-footer-border focus-visible:shadow-[inset_0_0_0_2px_var(--sd-interactive-focused)]">
        <span className="text-sd-gray-90" style={{ fontSize: 17, lineHeight: '22px', fontWeight: 600 }}>{title}</span>
        <svg aria-hidden viewBox="0 0 24 24" className={`size-[20px] shrink-0 text-sd-gray-90 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && <div className="border-t border-sd-modal-border p-[16px] text-sd-gray-90" style={{ fontSize: 15, lineHeight: '22px' }}>{children}</div>}
    </div>
  );
}
