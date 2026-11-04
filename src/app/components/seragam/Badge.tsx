import type { ReactNode } from 'react';

export type BadgeTone = 'green' | 'amber' | 'red' | 'blue' | 'gray';

/** Latar badge dari Figma (Surface Success/Warning/Critical/Informational Default dan Neutral Subdued); teks Text/Default. */
export const BADGE_BG: Record<BadgeTone, string> = {
  green: '#9AE5B9', amber: '#FFDFA3', red: '#FFE9EA', blue: '#98DAFB', gray: '#EFEFEF',
};

/** Badge pill (Figma): padding 2px 8px, radius 20px, label 14/20 semibold. Dipakai untuk status, ASN, dan jenis kelamin. */
export function Badge({ tone = 'gray', children, className = '' }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-[20px] px-[8px] py-[2px] whitespace-nowrap text-[#323232] ${className}`} style={{ background: BADGE_BG[tone], fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>
      {children}
    </span>
  );
}
