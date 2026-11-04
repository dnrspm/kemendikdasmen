import type { ReactNode } from 'react';

export type BadgeTone = 'green' | 'amber' | 'red' | 'blue' | 'gray';

/** Latar badge dari Figma (Seragam): hijau, kuning, merah muda, biru, abu; teks selalu Text/Default. */
export const BADGE_BG: Record<BadgeTone, string> = {
  green: '#a9e5c1', amber: '#fae1ae', red: '#fce9e9', blue: '#a6d8f8', gray: '#efefef',
};

/** Badge pill: 14px semibold, padding 10px x 2px. Dipakai untuk status, ASN, dan jenis kelamin. */
export function Badge({ tone = 'gray', children, className = '' }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-full px-[10px] py-[2px] whitespace-nowrap text-[#2f3031] ${className}`} style={{ background: BADGE_BG[tone], fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>
      {children}
    </span>
  );
}
