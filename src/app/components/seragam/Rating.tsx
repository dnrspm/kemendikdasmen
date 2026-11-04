/** Rating Seragam: 5 bintang 24px (kosong, setengah, penuh), total lebar 120. Isi warna kuning (yellow-30), kosong gray-20. Dukung nilai desimal; onChange bila interaktif. */
export function Rating({ value, onChange, max = 5 }: { value: number; onChange?: (v: number) => void; max?: number }) {
  return (
    <div className="inline-flex" role={onChange ? 'radiogroup' : 'img'} aria-label={`Rating ${value} dari ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        const star = (
          <span className="relative block size-[24px]">
            <Star className="absolute inset-0 text-sd-gray-20" />
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}><Star className="text-sd-yellow-30" /></span>
          </span>
        );
        return onChange
          ? <button key={i} type="button" role="radio" aria-checked={value === i + 1} aria-label={`${i + 1} bintang`} onClick={() => onChange(i + 1)} className="rounded-[4px] outline-none focus-visible:shadow-[0_0_0_2px_var(--sd-interactive-focused)]">{star}</button>
          : <span key={i}>{star}</span>;
      })}
    </div>
  );
}
const Star = ({ className = '' }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 24 24" className={`size-[24px] shrink-0 ${className}`} fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" /></svg>
);
