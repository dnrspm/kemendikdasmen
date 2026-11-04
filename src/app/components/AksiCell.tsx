import type { ReactNode } from 'react';
import { MoreVertical } from 'lucide-react';
import { buttonClass, buttonStyle } from '@/app/components/seragam/Button';
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
            className={buttonClass(a.danger ? 'danger-outline' : 'outline', 'sm')}
            style={buttonStyle}
          >
            {a.label}
          </button>
        ))}
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><button aria-label="Aksi"><MoreVertical className="size-[18px] text-sd-gray-80" /></button></DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((a) => (
          <DropdownMenuItem key={a.label} onSelect={a.onClick} className={a.danger ? 'text-sd-red-60' : ''}>{a.icon} {a.label}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
