import { Fragment, type ReactNode } from 'react';

export type Crumb = { label: ReactNode; href?: string; onClick?: () => void };

/** Breadcrumb Seragam: tautan 15/22 gray-60 (hover gray-90 bergaris bawah), halaman aktif gray-90, pemisah chevron, gap 4. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-[4px]" style={{ fontSize: 15, lineHeight: '22px' }}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li>
                {last ? <span aria-current="page" className="text-sd-gray-90">{c.label}</span>
                  : <a href={c.href} onClick={c.onClick} className="text-sd-gray-60 hover:text-sd-gray-90 hover:underline">{c.label}</a>}
              </li>
              {!last && <li aria-hidden className="text-sd-gray-60"><svg viewBox="0 0 24 24" className="size-[16px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></li>}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
