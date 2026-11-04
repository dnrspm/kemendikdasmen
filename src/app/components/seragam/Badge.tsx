import type { ReactNode } from 'react';

export type BadgeTone = 'green' | 'amber' | 'red' | 'blue' | 'gray';

/** Latar badge dari Figma (Surface Success/Warning/Critical/Informational Default dan Neutral Subdued); teks Text/Default. */
export const BADGE_BG: Record<BadgeTone, string> = {
  green: 'var(--sd-badge-success)', amber: 'var(--sd-badge-warning)', red: 'var(--sd-badge-critical)', blue: 'var(--sd-badge-info)', gray: 'var(--sd-badge-neutral)',
};

/** Badge pill (Figma): padding 2px 8px, radius 20px, label 14/20 semibold. Dipakai untuk status, ASN, dan jenis kelamin. */
export function Badge({ tone = 'gray', children, className = '' }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-[20px] px-[8px] py-[2px] whitespace-nowrap text-sd-gray-90 ${className}`} style={{ background: BADGE_BG[tone], fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>
      {children}
    </span>
  );
}
