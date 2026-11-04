import type { ReactNode } from 'react';

/** List Seragam: item padding atas 12, label 15/22 gray-90, deskripsi 13/20 gray-60, pemisah 1px #D9DBDD; artwork 36px di kiri; end enhancer di kanan. */
export function List({ children }: { children: ReactNode }) { return <ul className="flex flex-col">{children}</ul>; }

export function ListItem({ label, description, artwork, end, onClick }: { label: ReactNode; description?: ReactNode; artwork?: ReactNode; end?: ReactNode; onClick?: () => void }) {
  const body = (
    <>
      {artwork && <span className="shrink-0">{artwork}</span>}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-sd-gray-90" style={{ fontSize: 15, lineHeight: '22px' }}>{label}</span>
        {description && <span className="text-sd-gray-60" style={{ fontSize: 13, lineHeight: '20px' }}>{description}</span>}
      </span>
      {end && <span className="shrink-0">{end}</span>}
    </>
  );
  const cls = 'flex w-full items-center gap-[12px] border-b border-sd-modal-footer-border pb-[12px] pt-[12px] text-left';
  return <li>{onClick ? <button onClick={onClick} className={`${cls} hover:bg-sd-gray-5`}>{body}</button> : <div className={cls}>{body}</div>}</li>;
}
