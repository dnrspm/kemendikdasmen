import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';

const RING = 'peer-focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--sd-interactive-focused)]';

/** Checkbox Seragam: kotak 18px, radius 4, border gray-50; terpilih/indeterminate blue-70; nonaktif badge-neutral. Label 15/22. */
export const Checkbox = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label?: ReactNode; indeterminate?: boolean }>(
  ({ label, indeterminate = false, className = '', disabled, ...rest }, ref) => {
    const inner = useRef<HTMLInputElement>(null);
    useEffect(() => { if (inner.current) inner.current.indeterminate = indeterminate; }, [indeterminate]);
    return (
      <label className={`inline-flex items-center gap-[8px] ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
        <span className="relative inline-flex size-[20px] items-center justify-center">
          <input
            {...rest} disabled={disabled} type="checkbox"
            ref={(n) => { inner.current = n; if (typeof ref === 'function') ref(n); else if (ref) ref.current = n; }}
            className="peer absolute inset-0 m-0 opacity-0"
          />
          <span className={`size-[18px] rounded-[4px] border border-sd-gray-50 bg-white transition-shadow
            peer-hover:border-sd-blue-70 peer-checked:border-sd-blue-70 peer-checked:bg-sd-blue-70
            peer-disabled:border-sd-border-disabled peer-disabled:bg-sd-badge-neutral ${RING} ${indeterminate ? 'border-sd-blue-70 bg-sd-blue-70' : ''}`} />
          <svg aria-hidden viewBox="0 0 18 18" className="pointer-events-none absolute size-[18px] text-white opacity-0 peer-checked:opacity-100" style={indeterminate ? { opacity: 1 } : undefined}>
            {indeterminate ? <path d="M4.5 9h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> : <path d="M4.5 9.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
          </svg>
        </span>
        {label != null && <span className={disabled ? 'text-sd-gray-50' : 'text-sd-gray-90'} style={{ fontSize: 15, lineHeight: '22px' }}>{label}</span>}
      </label>
    );
  },
);
Checkbox.displayName = 'Checkbox';
