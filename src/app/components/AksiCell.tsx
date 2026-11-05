import type { ReactNode } from 'react';
import { MoreVertical } from 'lucide-react';
import { Popover, buttonClass } from 'seragam-design-system';

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
            className={buttonClass(a.danger ? 'destructive-secondary' : 'secondary', 'sm')}
          >
            {a.label}
          </button>
        ))}
      </div>
    );
  }
  return (
    <Popover
      align="right"
      trigger={({ toggle }) => <button aria-label="Aksi" onClick={toggle}><MoreVertical className="size-[18px] text-sd-gray-80" /></button>}
      items={items.map((a) => ({
        label: <span className={`flex items-center gap-[8px] ${a.danger ? 'text-sd-red-60' : ''}`}>{a.icon}{a.label}</span>,
        onSelect: a.onClick,
      }))}
    />
  );
}
