import type { ReactNode } from 'react';

/** Empty State Seragam (bagian): judul 18/24 semibold gray-90, deskripsi 15/22 gray-60, gap 24, aksi di bawah. Tengah. */
export function EmptyState({ title, description, artwork, action }: { title: ReactNode; description?: ReactNode; artwork?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[304px] flex-col items-center gap-[24px] text-center">
      {artwork}
      <div className="flex flex-col gap-[4px]">
        <h3 className="text-sd-gray-90" style={{ fontSize: 18, lineHeight: '24px', fontWeight: 600 }}>{title}</h3>
        {description && <p className="text-sd-gray-60" style={{ fontSize: 15, lineHeight: '22px' }}>{description}</p>}
      </div>
      {action}
    </div>
  );
}
