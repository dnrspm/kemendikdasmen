import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';

/** Select Seragam (native): tinggi 46, padding 12x16, radius 4, border gray-50; fokus blue-50 + ring 2px; error red-60 + latar red-5. Label 15/22, helper 12/16. */
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { label?: string; helper?: ReactNode; error?: ReactNode; placeholder?: string }>(
  ({ label, helper, error, placeholder, children, className = '', ...rest }, ref) => (
    <div className="flex flex-col gap-[4px]">
      {label && <span className="text-sd-gray-90" style={{ fontSize: 15, lineHeight: '22px' }}>{label}</span>}
      <div className="relative">
        <select ref={ref} aria-invalid={!!error || undefined} {...rest} style={{ fontSize: 15, lineHeight: '22px' }}
          className={`h-[46px] w-full appearance-none rounded-[4px] border py-[12px] pl-[16px] pr-[40px] text-sd-gray-90 outline-none transition-shadow
            ${error ? 'border-sd-critical-border bg-sd-surface-critical-subdued focus:shadow-[0_0_0_2px_var(--sd-critical-border)]' : 'border-sd-gray-50 bg-white focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]'}
            disabled:border-sd-modal-footer-border disabled:bg-sd-badge-neutral disabled:text-sd-gray-50 ${className}`}>
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </select>
        <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute right-[12px] top-1/2 size-[20px] -translate-y-1/2 text-sd-gray-60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </div>
      {(error || helper) && <span className={error ? 'text-sd-red-60' : 'text-sd-gray-60'} style={{ fontSize: 12, lineHeight: '16px' }}>{error || helper}</span>}
    </div>
  ),
);
Select.displayName = 'Select';
