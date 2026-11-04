import type { ReactNode } from 'react';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';

export type AksiItem = { label: string; onClick: () => void; icon?: ReactNode; danger?: boolean };

/**
 * Aturan kolom Aksi: maksimal 2 aksi ditampilkan sebagai tombol,
 * lebih dari 2 aksi dikumpulkan di dalam menu titik tiga.
 */
export function AksiCell({ items }: { items: AksiItem[] }) {
  if (items.length <= 2) {
    return (
      <div className="flex gap-[6px]">
        {items.map((a) => (
          <button
            key={a.label}
            onClick={a.onClick}
            className={`border rounded-[4px] px-[12px] py-[4px] font-semibold bg-white whitespace-nowrap ${a.danger ? 'border-[#c62828] text-[#c62828] hover:bg-[#fdeaea]' : 'border-[#a8a8a8] hover:bg-[#f4f4f4]'}`}
            style={{ fontSize: 'var(--text-sm)' }}
          >
            {a.label}
          </button>
        ))}
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><button aria-label="Aksi"><MoreVertical className="size-[18px] text-[#45474a]" /></button></DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((a) => (
          <DropdownMenuItem key={a.label} onSelect={a.onClick} className={a.danger ? 'text-[#c62828]' : ''}>{a.icon} {a.label}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
