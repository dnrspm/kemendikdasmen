import { useState, type ReactNode } from 'react';
import { Badge } from 'seragam-design-system';
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
          <h3 className="text-sd-gray-90" style={{ fontSize: '19px', fontWeight: 600, lineHeight: '24px' }}>{title}</h3>
          {subtitle && <p className="text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>{subtitle}</p>}
        </div>
      )}

      {!hideFilter && <div className="flex justify-end">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-[6px] text-sd-blue-70"
          style={{ fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}
        >
          <Search className="size-[16px]" /> {filterOpen ? 'Sembunyikan Filter' : 'Tampilkan Filter'}
          <ChevronDown className={`size-[16px] transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>}

      {filterOpen && !hideFilter && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] p-[12px] bg-sd-gray-0 border border-[#eee] rounded-[8px]">
          <input className="border border-sd-gray-50 rounded-[4px] px-[10px] py-[8px] bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]" placeholder="Cari nama atau NIP" style={{ fontSize: 'var(--text-sm)' }} />
          <input className="border border-sd-gray-50 rounded-[4px] px-[10px] py-[8px] bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]" placeholder="Unit kerja" style={{ fontSize: 'var(--text-sm)' }} />
          <input className="border border-sd-gray-50 rounded-[4px] px-[10px] py-[8px] bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]" placeholder="Status" style={{ fontSize: 'var(--text-sm)' }} />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" style={{ fontSize: '15px', lineHeight: '22px' }}>
          <thead>
            <tr className="border-t border-[#e4e4e4] shadow-[0_2px_1px_0_rgba(0,0,0,0.05)]">
              {columns.map((c) => (
                <th key={c.key} className={`${dense ? 'p-[12px_8px]' : 'p-[16px]'} uppercase text-sd-gray-90 align-top ${c.key === 'aksi' ? 'sticky right-0 bg-white shadow-[-6px_0_6px_-6px_rgba(0,0,0,0.12)]' : ''}`} style={{ fontSize: '13px', fontWeight: 600, lineHeight: '16px', width: c.width }}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-[24px]">
                  <div className="bg-sd-gray-5 rounded-[4px] py-[20px] flex flex-col items-center gap-[4px] text-sd-gray-60">
                    <SearchX className="size-[18px]" />
                    <span style={{ fontSize: 'var(--text-xs)' }}>Data tidak ditemukan</span>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className={`align-top ${i % 2 === 0 ? 'bg-sd-gray-0' : ''}`}>
                  {columns.map((c) => (
                    <td key={c.key} className={`${dense ? 'p-[12px_8px]' : 'p-[16px]'} ${c.key === 'aksi' ? 'sticky right-0 shadow-[-6px_0_6px_-6px_rgba(0,0,0,0.12)]' : ''}`} style={c.key === 'aksi' ? { background: i % 2 === 0 ? 'var(--sd-gray-0)' : '#fff' } : undefined}>{r[c.key]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination && rows.length > 0 && (
        <div className="flex items-center justify-between text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>
          <span className="flex items-center gap-[6px]">
            Menampilkan 1 - {rows.length} dari {rows.length} data <span aria-hidden>·</span>
            <span className="relative inline-flex items-center">
              <select aria-label="Jumlah per halaman" value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} className="appearance-none bg-transparent pr-[16px] text-sd-gray-90 cursor-pointer rounded-[4px] outline-none focus-visible:shadow-[0_0_0_2px_var(--sd-interactive-focused)]">
                {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <ChevronDown className="size-[14px] absolute right-0 pointer-events-none" />
            </span>
            per halaman
          </span>
          <div className="flex items-center gap-[12px]">
            <ChevronLeft className="size-[16px] text-sd-gray-20" aria-hidden />
            <span className="size-[28px] grid place-items-center rounded-[4px] bg-[#e4e4e4] text-sd-gray-90" style={{ fontWeight: 600 }}>1</span>
            <ChevronRight className="size-[16px] text-sd-gray-20" aria-hidden />
          </div>
        </div>
      )}
    </div>
  );
}

export const PersonCell = ({ name, nip }: { name: string; nip: string }) => (
  <div className="flex flex-col">
    <span className="text-sd-gray-90" style={{ fontSize: '16px', lineHeight: '24px' }}>{name}</span>
    <span className="text-sd-gray-60" style={{ fontSize: '14px', lineHeight: '20px' }}>NIP: {nip}</span>
  </div>
);

/** Badge status di tabel: memakai komponen Badge Seragam (pill 2x8, 13/20 semibold). */
export const Chip = ({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'amber' | 'red' | 'blue' | 'gray' }) => (
  <Badge tone={tone}>{children}</Badge>
);

export const EyeAction = ({ onClick }: { onClick?: () => void }) => <button aria-label="Lihat" onClick={onClick}><Eye className="size-[18px] text-sd-gray-80" /></button>;
export const MoreAction = ({ onClick }: { onClick?: () => void }) => <button aria-label="Aksi" onClick={onClick}><MoreVertical className="size-[18px] text-sd-gray-80" /></button>;
