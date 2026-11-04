import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

/** Radio Seragam: lingkaran 20px, border gray-50; terpilih blue-70 dengan titik 8px. Label 15/22. */
export const Radio = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label?: ReactNode }>(
  ({ label, className = '', disabled, ...rest }, ref) => (
    <label className={`inline-flex items-center gap-[8px] ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <span className="relative inline-flex size-[20px] items-center justify-center">
        <input {...rest} ref={ref} disabled={disabled} type="radio" className="peer absolute inset-0 m-0 opacity-0" />
        <span className="size-[20px] rounded-full border border-sd-gray-50 bg-white transition-shadow
          peer-hover:border-sd-blue-70 peer-checked:border-sd-blue-70 peer-checked:bg-sd-blue-70
          peer-disabled:border-sd-border-disabled peer-disabled:bg-sd-badge-neutral
          peer-focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--sd-interactive-focused)]" />
        <span className="pointer-events-none absolute size-[8px] rounded-full bg-sd-gray-0 opacity-0 peer-checked:opacity-100" />
      </span>
      {label != null && <span className={disabled ? 'text-sd-gray-50' : 'text-sd-gray-90'} style={{ fontSize: 15, lineHeight: '22px' }}>{label}</span>}
    </label>
  ),
);
Radio.displayName = 'Radio';
