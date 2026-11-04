import { forwardRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';

const BASE = 'w-full rounded-[4px] border bg-white text-sd-gray-90 placeholder:text-sd-gray-50 outline-none transition-shadow';
const STATE = 'border-sd-gray-50 focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)] disabled:bg-sd-badge-neutral disabled:border-sd-modal-footer-border disabled:text-sd-gray-50';
const ERROR = 'border-sd-critical-border bg-sd-surface-critical-subdued focus:border-sd-critical-border focus:shadow-[0_0_0_2px_var(--sd-critical-border)]';
/** Kelas dasar kolom isian Seragam (border, fokus, nonaktif) untuk elemen input/select/textarea mentah. */
export const fieldClass = `${BASE} ${STATE}`;
const TEXT = { fontSize: 15, lineHeight: '22px' } as const;

type Common = { label?: string; helper?: ReactNode; error?: ReactNode };

function Wrap({ label, helper, error, children }: Common & { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-[4px]">
      {label && <span className="text-sd-gray-90" style={{ fontSize: 14, lineHeight: '20px', fontWeight: 600 }}>{label}</span>}
      {children}
      {(error || helper) && <span className={error ? 'text-sd-red-60' : 'text-sd-gray-60'} style={{ fontSize: 12, lineHeight: '16px' }}>{error || helper}</span>}
    </div>
  );
}

/** Text Field Seragam: tinggi 46, padding 12x16, radius 4, border gray-50; fokus blue-50 + ring 2px; error red + latar red-5. */
export const TextField = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & Common & { leftIcon?: ReactNode; rightIcon?: ReactNode }>(
  ({ label, helper, error, leftIcon, rightIcon, className = '', ...rest }, ref) => (
    <Wrap label={label} helper={helper} error={error}>
      <div className="relative">
        {leftIcon && <span className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-sd-gray-60">{leftIcon}</span>}
        <input ref={ref} aria-invalid={!!error || undefined} {...rest} style={TEXT}
          className={`${BASE} ${error ? ERROR : STATE} h-[46px] py-[12px] ${leftIcon ? 'pl-[40px]' : 'pl-[16px]'} ${rightIcon ? 'pr-[40px]' : 'pr-[16px]'} ${className}`} />
        {rightIcon && <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-sd-gray-60">{rightIcon}</span>}
      </div>
    </Wrap>
  ),
);
TextField.displayName = 'TextField';

/** Text Area Seragam: tinggi awal 102, padding 12x16. */
export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & Common>(
  ({ label, helper, error, className = '', ...rest }, ref) => (
    <Wrap label={label} helper={helper} error={error}>
      <textarea ref={ref} aria-invalid={!!error || undefined} {...rest} style={TEXT}
        className={`${BASE} ${error ? ERROR : STATE} min-h-[102px] resize-y px-[16px] py-[12px] ${className}`} />
    </Wrap>
  ),
);
TextArea.displayName = 'TextArea';
