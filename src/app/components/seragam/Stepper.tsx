import { useId, type InputHTMLAttributes } from 'react';

const SEG = 'grid size-[46px] place-items-center border border-sd-gray-50 bg-white text-sd-gray-90 outline-none hover:bg-sd-gray-5 focus-visible:z-10 focus-visible:shadow-[0_0_0_2px_var(--sd-interactive-focused)] disabled:border-sd-modal-footer-border disabled:bg-sd-badge-neutral disabled:text-sd-gray-50';

/** Stepper (input angka) Seragam: tombol kurang 46x46 radius kiri 4, kolom angka 54x46, tombol tambah 46x46 radius kanan 4, border gray-50, angka 15/22. */
export function Stepper({ value, onChange, min = 0, max = 999, step = 1, disabled, error, ...rest }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; disabled?: boolean; error?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'min' | 'max' | 'step' | 'type'>) {
  const id = useId();
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div className="inline-flex" role="group">
      <button type="button" aria-label="Kurangi" disabled={disabled || value <= min} onClick={() => onChange(clamp(value - step))} className={`${SEG} rounded-l-[4px]`}>
        <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14" /></svg>
      </button>
      <input id={id} {...rest} type="text" inputMode="numeric" disabled={disabled} value={value} onChange={(e) => { const n = Number(e.target.value.replace(/\D/g, '')); onChange(clamp(Number.isNaN(n) ? min : n)); }}
        aria-invalid={error || undefined} style={{ fontSize: 15, lineHeight: '22px' }}
        className={`h-[46px] w-[54px] border-y px-[8px] text-center outline-none focus:z-10 focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)] disabled:border-sd-modal-footer-border disabled:bg-sd-badge-neutral disabled:text-sd-gray-50 ${error ? 'border-sd-critical-border bg-sd-surface-critical-subdued' : 'border-sd-gray-50 bg-white text-sd-gray-90'}`} />
      <button type="button" aria-label="Tambah" disabled={disabled || value >= max} onClick={() => onChange(clamp(value + step))} className={`${SEG} rounded-r-[4px]`}>
        <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );
}
