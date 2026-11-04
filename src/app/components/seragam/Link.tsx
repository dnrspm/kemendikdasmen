import type { AnchorHTMLAttributes } from 'react';

const TYPE = { primary: 'text-sd-blue-70', secondary: 'text-sd-gray-90', inverse: 'text-white' } as const;

/** Link Seragam: 15/22 regular, garis bawah default. Primary blue-70, Secondary gray-90, Inverse putih; fokus ring blue-50 2px radius 4; nonaktif gray-50 tanpa garis bawah. */
export function Link({ type = 'primary', underline = true, disabled, className = '', ...rest }: { type?: keyof typeof TYPE; underline?: boolean; disabled?: boolean } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : rest.tabIndex} style={{ fontSize: 15, lineHeight: '22px' }}
      className={`rounded-[4px] outline-none focus-visible:shadow-[0_0_0_2px_var(--sd-interactive-focused)] ${disabled ? 'pointer-events-none text-sd-gray-50' : `${TYPE[type]} hover:opacity-80 ${underline ? 'underline' : ''}`} ${className}`} />
  );
}
