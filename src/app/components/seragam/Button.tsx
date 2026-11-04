import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { typeAction } from './tokens';

type Variant = 'primary' | 'outline' | 'danger' | 'danger-outline';
type Size = 'lg' | 'md' | 'sm';

const SIZE: Record<Size, string> = { lg: 'h-[46px] px-[16px]', md: 'h-[40px] px-[16px]', sm: 'h-[32px] px-[12px]' };
// Kelas ditulis literal agar terdeteksi Tailwind (nilai warna mengikuti tokens.ts).
const VARIANT: Record<Variant, string> = {
  primary: 'bg-[#0B5FEF] text-white hover:brightness-90',
  outline: 'bg-white border border-[#A8A8A8] text-[#2F3031] hover:bg-[#f4f4f4]',
  danger: 'bg-[#C62828] text-white hover:brightness-90',
  'danger-outline': 'bg-white border border-[#C62828] text-[#C62828] hover:bg-[#fdeaea]',
};

/** Kelas tombol Seragam (radius 4px, teks Mobile/Action 15/22 semibold). Untuk elemen non-button gunakan langsung. */
export const buttonClass = (variant: Variant = 'primary', size: Size = 'md') =>
  `inline-flex items-center justify-center gap-[8px] rounded-[4px] whitespace-nowrap disabled:opacity-50 ${SIZE[size]} ${VARIANT[variant]}`;
export const buttonStyle = typeAction;

export function Button({ variant = 'primary', size = 'md', children, className = '', ...rest }: { variant?: Variant; size?: Size; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...rest} className={`${buttonClass(variant, size)} ${className}`} style={buttonStyle}>{children}</button>;
}
