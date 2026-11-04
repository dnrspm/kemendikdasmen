import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

/** Switch Seragam: 50x28, radius penuh, handle putih 24px. Aktif blue-70; mati gray-0 dengan border; nonaktif gray-20. */
export const Switch = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'> & { label?: ReactNode }>(
  ({ label, className = '', disabled, ...rest }, ref) => (
    <label className={`inline-flex items-center gap-[8px] ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <span className="relative inline-block h-[28px] w-[50px]">
        <input {...rest} ref={ref} disabled={disabled} type="checkbox" role="switch" className="peer absolute inset-0 z-10 m-0 size-full opacity-0" />
        <span className="absolute inset-0 rounded-full border border-sd-modal-border bg-sd-gray-0 transition-colors
          peer-checked:border-sd-blue-70 peer-checked:bg-sd-blue-70 peer-disabled:border-sd-modal-border peer-disabled:peer-checked:bg-sd-modal-border
          peer-focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--sd-interactive-focused)]" />
        <span className="pointer-events-none absolute left-[2px] top-[2px] size-[24px] rounded-full bg-white shadow-[0_0_4px_rgba(0,0,0,0.15)] transition-transform peer-checked:translate-x-[22px]" />
      </span>
      {label != null && <span className={disabled ? 'text-sd-gray-50' : 'text-sd-gray-90'} style={{ fontSize: 15, lineHeight: '22px' }}>{label}</span>}
    </label>
  ),
);
Switch.displayName = 'Switch';
