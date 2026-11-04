import { useState, type ReactNode } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, SearchX, Eye, MoreVertical } from 'lucide-react';

export type Column = { key: string; label: string; width?: string };
export type TableRow = Record<string, ReactNode>;

interface Props {
  title?: string;
  subtitle?: string;
  columns: Column[];
  rows: TableRow[];
  showPagination?: boolean;
  hideFilter?: boolean;
  /** Padding sel lebih rapat untuk tabel dengan banyak kolom. */
  dense?: boolean;
}

export function StagingDataTable({ title, subtitle, columns, rows, showPagination = true, hideFilter = false, dense = false }: Props) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [perPage, setPerPage] = useState(10);

  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      {title && (
        <div>
          <h3 className="text-[#2f3031]" style={{ fontSize: '19px', fontWeight: 600, lineHeight: '24px' }}>{title}</h3>
          {subtitle && <p className="text-[#808489]" style={{ fontSize: '14px', lineHeight: '20px' }}>{subtitle}</p>}
        </div>
      )}

      {!hideFilter && <div className="flex justify-end">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-[6px] text-[#0b5fef]"
          style={{ fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}
        >
          <Search className="size-[16px]" /> {filterOpen ? 'Sembunyikan Filter' : 'Tampilkan Filter'}
          <ChevronDown className={`size-[16px] transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>}

      {filterOpen && !hideFilter && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] p-[12px] bg-[#fafafa] border border-[#eee] rounded-[8px]">
          <input className="border border-[#c7c7c7] rounded-[4px] px-[10px] py-[8px] bg-white" placeholder="Cari nama atau NIP" style={{ fontSize: 'var(--text-sm)' }} />
          <input className="border border-[#c7c7c7] rounded-[4px] px-[10px] py-[8px] bg-white" placeholder="Unit kerja" style={{ fontSize: 'var(--text-sm)' }} />
          <input className="border border-[#c7c7c7] rounded-[4px] px-[10px] py-[8px] bg-white" placeholder="Status" style={{ fontSize: 'var(--text-sm)' }} />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" style={{ fontSize: '16px', lineHeight: '24px' }}>
          <thead>
            <tr className="border-y border-[#e4e4e4]">
              {columns.map((c) => (
                <th key={c.key} className={`${dense ? 'p-[12px_8px]' : 'p-[16px]'} uppercase text-[#65696c] align-top`} style={{ fontSize: '14px', fontWeight: 700, lineHeight: '16px', width: c.width }}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-[24px]">
                  <div className="bg-[#f4f4f4] rounded-[4px] py-[20px] flex flex-col items-center gap-[4px] text-[#65696c]">
                    <SearchX className="size-[18px]" />
                    <span style={{ fontSize: 'var(--text-xs)' }}>Data tidak ditemukan</span>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className={`align-top ${i % 2 === 0 ? 'bg-[#fafafa]' : ''}`}>
                  {columns.map((c) => (
                    <td key={c.key} className={dense ? 'p-[12px_8px]' : 'p-[16px]'}>{r[c.key]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination && rows.length > 0 && (
        <div className="flex items-center justify-between text-[#65696c]" style={{ fontSize: '14px', lineHeight: '20px' }}>
          <span className="flex items-center gap-[6px]">
            Menampilkan 1 - {rows.length} dari {rows.length} data <span aria-hidden>·</span>
            <span className="relative inline-flex items-center">
              <select aria-label="Jumlah per halaman" value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} className="appearance-none bg-transparent pr-[16px] text-[#2f3031] cursor-pointer">
                {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <ChevronDown className="size-[14px] absolute right-0 pointer-events-none" />
            </span>
            per halaman
          </span>
          <div className="flex items-center gap-[12px]">
            <ChevronLeft className="size-[16px] text-[#c7c7c7]" aria-hidden />
            <span className="size-[28px] grid place-items-center rounded-[4px] bg-[#e4e4e4] text-[#2f3031]" style={{ fontWeight: 600 }}>1</span>
            <ChevronRight className="size-[16px] text-[#c7c7c7]" aria-hidden />
          </div>
        </div>
      )}
    </div>
  );
}

export const PersonCell = ({ name, nip }: { name: string; nip: string }) => (
  <div className="flex flex-col">
    <span className="text-[#2f3031]" style={{ fontSize: '16px', lineHeight: '24px' }}>{name}</span>
    <span className="text-[#65696c]" style={{ fontSize: '14px', lineHeight: '20px' }}>NIP: {nip}</span>
  </div>
);

export const Chip = ({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'red' | 'blue' }) => {
  const t = { green: ['#9ae5b9', '#2f3031'], red: ['#fbd5d5', '#a11d1d'], blue: ['#9ae5b9', '#2f3031'] }[tone];
  return <span className="inline-block rounded-[6px] px-[8px] py-[2px]" style={{ background: t[0], color: t[1], fontSize: '12px', fontWeight: 600, lineHeight: '16px' }}>{children}</span>;
};

export const EyeAction = ({ onClick }: { onClick?: () => void }) => <button aria-label="Lihat" onClick={onClick}><Eye className="size-[18px] text-[#45474a]" /></button>;
export const MoreAction = ({ onClick }: { onClick?: () => void }) => <button aria-label="Aksi" onClick={onClick}><MoreVertical className="size-[18px] text-[#45474a]" /></button>;
