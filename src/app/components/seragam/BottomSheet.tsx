import { useEffect, type ReactNode } from 'react';

/** Bottom Sheet Seragam: panel putih menempel di bawah, sudut atas radius 16, overlay hitam 70%; menu item tinggi 46 padding 12x16 (16/22 semibold), tombol aksi tetap di bawah dengan garis atas #D9DBDD. */
export function BottomSheet({ open, onClose, title, children, action }: { open: boolean; onClose: () => void; title?: ReactNode; children: ReactNode; action?: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" className="flex max-h-[90%] w-full max-w-[640px] flex-col rounded-t-[16px] bg-white">
        <div className="mx-auto mt-[8px] h-[4px] w-[40px] rounded-full bg-sd-gray-20" />
        {title && <h2 className="px-[16px] pb-[8px] pt-[12px] text-sd-gray-90" style={{ fontSize: 17, lineHeight: '22px', fontWeight: 600 }}>{title}</h2>}
        <div className="overflow-y-auto px-[8px] py-[8px]">{children}</div>
        {action && <div className="border-t border-sd-modal-footer-border p-[16px]">{action}</div>}
      </div>
    </div>
  );
}

export function BottomSheetItem({ children, selected, disabled, onClick }: { children: ReactNode; selected?: boolean; disabled?: boolean; onClick?: () => void }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} aria-current={selected || undefined}
      className={`flex min-h-[46px] w-full items-center gap-[12px] rounded-[4px] py-[12px] pl-[8px] pr-[16px] text-left outline-none hover:bg-sd-modal-header active:bg-sd-modal-footer-border focus-visible:shadow-[inset_0_0_0_2px_var(--sd-interactive-focused)] disabled:text-sd-gray-50 ${selected ? 'bg-sd-blue-5 text-sd-blue-70' : 'text-sd-gray-90'}`}
      style={{ fontSize: 16, lineHeight: '22px', fontWeight: 600 }}>{children}</button>
  );
}
