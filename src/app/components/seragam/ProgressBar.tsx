import type { ReactNode } from 'react';

/** Progress bar Seragam: tinggi 6, radius penuh, track #D9DBDD, isi blue-70. Label opsional di kiri/kanan (15/22). */
export function ProgressBar({ value, label, labelPosition = 'right' }: { value: number; label?: ReactNode; labelPosition?: 'left' | 'right' }) {
  const v = Math.min(100, Math.max(0, value));
  const bar = (
    <div role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} className="h-[6px] w-full overflow-hidden rounded-full bg-sd-modal-footer-border">
      <div className="h-full rounded-full bg-sd-blue-70 transition-[width]" style={{ width: `${v}%` }} />
    </div>
  );
  if (!label) return bar;
  const text = <span className="shrink-0 text-sd-gray-90" style={{ fontSize: 15, lineHeight: '22px' }}>{label}</span>;
  return <div className="flex items-center gap-[12px]">{labelPosition === 'left' && text}{bar}{labelPosition === 'right' && text}</div>;
}
