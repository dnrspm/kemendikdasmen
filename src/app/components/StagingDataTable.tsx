import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Badge, Button, EmptyState, Pagination, TextField,
  Table as SdTable, TableHead, TableBody, TableRow as SdTableRow, TableHeaderCell, TableCell,
} from 'seragam-design-system';
import { Search, ChevronDown, Eye, MoreVertical } from 'lucide-react';

export type Column = { key: string; label: string; width?: string };
export type TableRow = Record<string, ReactNode>;

interface Props {
  title?: string;
  subtitle?: string;
  columns: Column[];
  rows: TableRow[];
  showPagination?: boolean;
  hideFilter?: boolean;
  /** Padding sel lebih rapat (ukuran md) untuk tabel dengan banyak kolom. */
  dense?: boolean;
  /** Tanpa garis atas pada header tabel (mis. saat tepat di bawah blok filter). */
  noTopRule?: boolean;
}

/** Kolom Aksi menempel di kanan saat tabel digulir; bayangan kiri memisahkannya dari isi yang lewat di bawahnya. */
const STICKY_SHADOW = '-6px 0 6px -6px rgba(0,0,0,0.12)';

/** True hanya bila ada isi tabel yang tersembunyi di sisi kanan (bisa digulir ke kanan), yaitu saat bayangan kolom Aksi berguna. */
function useScrollableRight(ref: React.RefObject<HTMLElement | null>, deps: unknown[]) {
  const [more, setMore] = useState(false);
  useEffect(() => {
    const sc = ref.current?.querySelector<HTMLElement>('.overflow-x-auto');
    if (!sc) return;
    const update = () => setMore(sc.scrollLeft + sc.clientWidth < sc.scrollWidth - 1);
    update();
    sc.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(sc);
    const table = sc.querySelector('table');
    if (table) ro.observe(table);
    return () => { sc.removeEventListener('scroll', update); ro.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return more;
}

export function StagingDataTable({ title, subtitle, columns, rows, showPagination = true, hideFilter = false, dense = false, noTopRule = false }: Props) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const tableRef = useRef<HTMLDivElement>(null);
  const shadow = useScrollableRight(tableRef, [columns.length, rows.length]);

  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      {title && (
        <div>
          <h3 className="sd-t-mobile-headingmedium text-sd-gray-90">{title}</h3>
          {subtitle && <p className="sd-t-mobile-bodysmall text-sd-gray-60">{subtitle}</p>}
        </div>
      )}

      {!hideFilter && (
        <div className="flex justify-end">
          <Button
            variant="quiet"
            size="sm"
            onClick={() => setFilterOpen(!filterOpen)}
            aria-expanded={filterOpen}
            leadingIcon={<Search className="size-[16px]" />}
            trailingIcon={<ChevronDown className={`size-[16px] transition-transform ${filterOpen ? 'rotate-180' : ''}`} />}
          >
            {filterOpen ? 'Sembunyikan filter' : 'Tampilkan filter'}
          </Button>
        </div>
      )}

      {filterOpen && !hideFilter && (
        <div className="grid grid-cols-1 gap-[12px] rounded-[8px] border border-sd-modal-footer-border bg-sd-gray-0 p-[12px] md:grid-cols-3">
          <TextField aria-label="Cari nama atau NIP" placeholder="cth. Budi Santoso atau NIP" />
          <TextField aria-label="Unit kerja" placeholder="cth. Balai Penjaminan Mutu" />
          <TextField aria-label="Status" placeholder="cth. PNS" />
        </div>
      )}

      <div ref={tableRef}>
      <SdTable
        size={dense ? 'md' : 'lg'}
        striped
        bordered={false}
        caption={title ?? 'Daftar data'}
        className={noTopRule ? '' : '[&_thead_th]:border-t [&_thead_th]:border-sd-modal-footer-border'}
      >
        <TableHead>
          <SdTableRow>
            {columns.map((c) => (
              <TableHeaderCell
                key={c.key}
                className={`align-top ${c.key === 'aksi' ? 'sticky right-0' : ''}`}
                style={{ width: c.width, ...(c.key === 'aksi' ? { boxShadow: `${shadow ? `${STICKY_SHADOW}, ` : ''}0 2px 1px rgba(0,0,0,0.05)` } : {}) }}
              >
                {c.label}
              </TableHeaderCell>
            ))}
          </SdTableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <SdTableRow>
              <TableCell colSpan={columns.length}>
                <EmptyState title="Data Tidak Ditemukan" description="Tidak ada data yang cocok. Coba ubah kata kunci atau filter." />
              </TableCell>
            </SdTableRow>
          ) : (
            rows.map((r, i) => (
              <SdTableRow key={i} className="align-top">
                {columns.map((c) => (
                  <TableCell
                    key={c.key}
                    className={c.key === 'aksi' ? 'sticky right-0' : ''}
                    style={c.key === 'aksi' ? { boxShadow: shadow ? STICKY_SHADOW : undefined, background: i % 2 === 1 ? 'var(--sd-table-stripe)' : 'var(--sd-white)' } : undefined}
                  >
                    {r[c.key]}
                  </TableCell>
                ))}
              </SdTableRow>
            ))
          )}
        </TableBody>
      </SdTable>
      </div>

      {showPagination && rows.length > 0 && (
        <div className="sd-t-mobile-bodysmall flex flex-wrap items-center justify-between gap-[12px] text-sd-gray-60">
          <span className="flex items-center gap-[6px]">
            Menampilkan 1 - {rows.length} dari {rows.length} data <span aria-hidden>·</span>
            <span className="relative inline-flex items-center">
              <select
                aria-label="Jumlah per halaman"
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="cursor-pointer appearance-none rounded-[4px] bg-transparent pr-[16px] text-sd-gray-90 outline-none focus-visible:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
              >
                {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 size-[14px]" />
            </span>
            per halaman
          </span>
          <Pagination page={page} pageCount={1} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}

export const PersonCell = ({ name, nip }: { name: string; nip: string }) => (
  <div className="flex flex-col">
    <span className="sd-t-mobile-body text-sd-gray-90">{name}</span>
    <span className="sd-t-mobile-bodysmall text-sd-gray-60">NIP: {nip}</span>
  </div>
);

/** Badge status di tabel: memakai komponen Badge Seragam (pill 2x8, 13/20 semibold). */
export const Chip = ({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'amber' | 'red' | 'blue' | 'gray' }) => (
  <Badge tone={tone}>{children}</Badge>
);

export const EyeAction = ({ onClick }: { onClick?: () => void }) => <button aria-label="Lihat" onClick={onClick}><Eye className="size-[18px] text-sd-gray-80" /></button>;
export const MoreAction = ({ onClick }: { onClick?: () => void }) => <button aria-label="Aksi" onClick={onClick}><MoreVertical className="size-[18px] text-sd-gray-80" /></button>;
