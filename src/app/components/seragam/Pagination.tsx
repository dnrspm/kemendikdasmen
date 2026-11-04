const BTN = 'grid size-[32px] place-items-center rounded-[4px] outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--sd-interactive-focused)]';
const Chev = ({ d }: { d: string }) => <svg aria-hidden viewBox="0 0 24 24" className="size-[16px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;

function range(page: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const s = new Set([1, total, page - 1, page, page + 1].filter((n) => n >= 1 && n <= total));
  const a = [...s].sort((x, y) => x - y), out: (number | '…')[] = [];
  a.forEach((n, i) => { if (i && n - a[i - 1] > 1) out.push('…'); out.push(n); });
  return out;
}

/** Pagination Seragam: sel 32x32 radius 4, angka 15/22 semibold (aktif gray-90 + latar #EFEFEF, lainnya gray-50), gap 16. Halaman mulai dari 1. */
export function Pagination({ page, pageCount, onPageChange }: { page: number; pageCount: number; onPageChange: (p: number) => void }) {
  return (
    <nav aria-label="Pagination" className="flex items-center gap-[16px]">
      <button aria-label="Sebelumnya" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className={`${BTN} text-sd-gray-90 hover:bg-sd-badge-neutral disabled:text-sd-gray-20 disabled:hover:bg-transparent`}><Chev d="M15 6l-6 6 6 6" /></button>
      {range(page, pageCount).map((n, i) => n === '…'
        ? <span key={`e${i}`} className="text-sd-gray-50" style={{ fontSize: 15, lineHeight: '22px' }}>…</span>
        : <button key={n} aria-current={n === page ? 'page' : undefined} onClick={() => onPageChange(n)} className={`${BTN} ${n === page ? 'bg-sd-badge-neutral text-sd-gray-90' : 'text-sd-gray-50 hover:bg-sd-badge-neutral'}`} style={{ fontSize: 15, lineHeight: '22px', fontWeight: 600 }}>{n}</button>)}
      <button aria-label="Berikutnya" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} className={`${BTN} text-sd-gray-90 hover:bg-sd-badge-neutral disabled:text-sd-gray-20 disabled:hover:bg-transparent`}><Chev d="M9 6l6 6-6 6" /></button>
    </nav>
  );
}
