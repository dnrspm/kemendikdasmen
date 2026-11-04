import type { ReactNode } from 'react';
import { Info, TriangleAlert, X } from 'lucide-react';
import { color } from './tokens';

type Tone = 'info' | 'warning';
const TONE: Record<Tone, { bg: string; border: string; fg: string; icon: ReactNode }> = {
  info: { bg: '#EAF3FE', border: '#C9DEFA', fg: '#0B3F9E', icon: <Info className="size-[20px] shrink-0" /> },
  warning: { bg: '#FFF6DC', border: '#F3E3B0', fg: '#7A5A00', icon: <TriangleAlert className="size-[20px] shrink-0" /> },
};

/** Banner Seragam: radius 8px, padding 16px, ikon 20px, judul 14 semibold dan isi 14. Satu gaya untuk semua halaman. */
export function Banner({ tone = 'info', title, children, onClose, className = '' }: { tone?: Tone; title?: string; children: ReactNode; onClose?: () => void; className?: string }) {
  const t = TONE[tone];
  return (
    <div role="status" className={`flex items-start gap-[12px] rounded-[8px] border p-[16px] ${className}`} style={{ background: t.bg, borderColor: t.border, color: color.textDefault }}>
      <span style={{ color: t.fg }}>{t.icon}</span>
      <div className="flex-1 min-w-0" style={{ fontSize: '14px', lineHeight: '20px' }}>
        {title && <p style={{ fontWeight: 600 }} className="mb-[4px]">{title}</p>}
        {children}
      </div>
      {onClose && <button onClick={onClose} aria-label="Tutup" className="shrink-0 p-[2px]"><X className="size-[18px]" /></button>}
    </div>
  );
}
