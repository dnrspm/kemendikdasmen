import { color, typeAction } from './tokens';

/**
 * Chip Seragam (Regular): pill, padding 8px 16px, jarak 4px, teks Desktop/Action.
 * Aktif = latar Surface/Selected + border dan teks Action/Default. Nonaktif = putih + border/default.
 */
export function ChipGroup({ items, active, onChange, className = '' }: { items: string[]; active: number; onChange: (i: number) => void; className?: string }) {
  return (
    <div role="tablist" className={`flex gap-[8px] flex-wrap ${className}`}>
      {items.map((t, i) => {
        const on = i === active;
        return (
          <button
            key={t}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(i)}
            className="inline-flex items-center gap-[4px] rounded-full border px-[16px] py-[8px] whitespace-nowrap hover:bg-[#EEF5FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              ...typeAction,
              borderColor: on ? color.actionDefault : color.border,
              background: on ? color.surfaceSelected : color.surfaceDefault,
              color: on ? color.actionDefault : color.textDefault,
              outlineColor: color.focus,
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
