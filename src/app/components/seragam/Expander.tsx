/** Expander Seragam ("Selengkapnya" / "Sembunyikan"): 16/24 semibold gray-90 bergaris bawah (15/22 di mobile), ikon chevron, gap 4. Inverted = putih. */
export function Expander({ expanded, onToggle, inverted = false, expandLabel = 'Selengkapnya', collapseLabel = 'Sembunyikan' }: {
  expanded: boolean; onToggle: () => void; inverted?: boolean; expandLabel?: string; collapseLabel?: string;
}) {
  return (
    <button type="button" aria-expanded={expanded} onClick={onToggle}
      className={`inline-flex items-center gap-[4px] rounded-[4px] outline-none hover:no-underline focus-visible:shadow-[0_0_0_2px_var(--sd-interactive-focused)] ${inverted ? 'text-white' : 'text-sd-gray-90'}`} style={{ fontSize: 16, lineHeight: '24px', fontWeight: 600 }}>
      <span className="underline">{expanded ? collapseLabel : expandLabel}</span>
      <svg aria-hidden viewBox="0 0 24 24" className={`size-[16px] transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
    </button>
  );
}
