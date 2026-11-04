import type { InputHTMLAttributes } from 'react';

/** Slider Seragam (satu handle): track 6px #D9DBDD, isi blue-70, handle putih 28px dengan titik blue-70 12px dan bayangan 0 2 4 rgba(0,0,0,.2); fokus ring blue-50 2px. Label min/maks 13/20. */
export function Slider({ value, onChange, min = 0, max = 100, step = 1, disabled, showRange = false, ...rest }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; disabled?: boolean; showRange?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'min' | 'max' | 'step' | 'type'>) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="w-full">
      <div className="relative flex h-[28px] items-center">
        <div className="h-[6px] w-full rounded-full bg-sd-modal-footer-border"><div className={`h-full rounded-full ${disabled ? 'bg-sd-gray-20' : 'bg-sd-blue-70'}`} style={{ width: `${pct}%` }} /></div>
        <input {...rest} type="range" min={min} max={max} step={step} value={value} disabled={disabled} onChange={(e) => onChange(Number(e.target.value))} className="peer absolute inset-0 m-0 w-full cursor-pointer opacity-0 disabled:cursor-not-allowed" />
        <span aria-hidden className={`pointer-events-none absolute grid size-[28px] -translate-x-1/2 place-items-center rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)] peer-hover:border peer-hover:border-sd-blue-50 peer-focus-visible:border-2 peer-focus-visible:border-sd-blue-50 ${disabled ? 'bg-sd-badge-neutral' : 'bg-white'}`} style={{ left: `calc(${pct}% + ${14 - pct * 0.28}px)` }}>
          <span className={`size-[12px] rounded-full ${disabled ? 'bg-[#C8D6EE]' : 'bg-sd-blue-70'}`} />
        </span>
      </div>
      {showRange && <div className="flex justify-between text-sd-gray-90" style={{ fontSize: 13, lineHeight: '20px' }}><span>{min}</span><span>{max}</span></div>}
    </div>
  );
}
