import type { ReactNode } from 'react';
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';
import { color } from './tokens';

export type BannerTone = 'info' | 'warning' | 'success' | 'critical' | 'neutral';

/** Warna banner dari Figma (Banner Default Desktop): token surface dan border per tipe (default). */
const TONE: Record<BannerTone, { bg: string; border: string; icon: ReactNode; iconColor: string }> = {
  success: { bg: '#E2F5E0', border: '#4CA375', iconColor: '#2D8A4E', icon: <CircleCheck className="size-[20px] shrink-0" /> },
  warning: { bg: '#FFEFD6', border: '#EDA62B', iconColor: '#B57F21', icon: <TriangleAlert className="size-[20px] shrink-0" /> },
  critical: { bg: '#FEEDF2', border: '#DF2121', iconColor: '#DF2121', icon: <CircleAlert className="size-[20px] shrink-0" /> },
  info: { bg: '#E3F4FC', border: '#AFDEF9', iconColor: '#0B5FEF', icon: <Info className="size-[20px] shrink-0" /> },
  neutral: { bg: '#F1F1F1', border: '#828282', iconColor: '#45474A', icon: <Info className="size-[20px] shrink-0" /> },
};

/**
 * Banner Seragam (Figma, Desktop): radius 4px, border 1px, padding 16px, jarak 12px, ikon 20px,
 * teks Desktop/Body 16/24 (judul semibold). `info` = Informational, `warning` = Warning, dan seterusnya.
 */
export function Banner({ tone = 'info', title, children, onClose, className = '' }: { tone?: BannerTone; title?: string; children: ReactNode; onClose?: () => void; className?: string }) {
  const t = TONE[tone];
  return (
    <div role="status" className={`flex items-start gap-[12px] rounded-[4px] border p-[16px] ${className}`} style={{ background: t.bg, borderColor: t.border, color: color.textDefault }}>
      <span style={{ color: t.iconColor }} className="mt-[2px]">{t.icon}</span>
      <div className="flex-1 min-w-0" style={{ fontSize: '16px', lineHeight: '24px' }}>
        {title && <p style={{ fontWeight: 600 }}>{title}</p>}
        {children}
      </div>
      {onClose && <button onClick={onClose} aria-label="Tutup" className="shrink-0 p-[2px]"><X className="size-[22px]" /></button>}
    </div>
  );
}
