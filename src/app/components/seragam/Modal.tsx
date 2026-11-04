import { useEffect, type ReactNode } from 'react';

const WIDTH = { sm: 432, md: 660, lg: 888 } as const;

/** Modal Seragam: radius 8, header gray #F5F5F5 (16x20, judul 17/22 semibold) dengan border bawah, isi 24/20/32, footer border atas (20x24). Overlay hitam 70%. Elevation 06. */
export function Modal({ open, onClose, title, size = 'md', footer, children }: {
  open: boolean; onClose: () => void; title: ReactNode; size?: keyof typeof WIDTH; footer?: ReactNode; children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-[16px]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" className="flex max-h-full w-full flex-col overflow-hidden rounded-[8px] bg-white shadow-sd-06" style={{ maxWidth: WIDTH[size] }}>
        <div className="flex items-center justify-between gap-[16px] border-b border-sd-modal-border bg-sd-modal-header px-[20px] py-[16px]">
          <h2 className="text-sd-gray-90" style={{ fontSize: 17, lineHeight: '22px', fontWeight: 600 }}>{title}</h2>
          <button aria-label="Tutup" onClick={onClose} className="text-sd-gray-60 hover:text-sd-gray-90">
            <svg viewBox="0 0 24 24" className="size-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div className="overflow-y-auto px-[20px] pb-[32px] pt-[24px] text-sd-gray-90" style={{ fontSize: 16, lineHeight: '24px' }}>{children}</div>
        {footer && <div className="flex justify-end gap-[8px] border-t border-sd-modal-footer-border px-[24px] py-[20px]">{footer}</div>}
      </div>
    </div>
  );
}
