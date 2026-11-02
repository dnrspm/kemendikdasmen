import { useState } from 'react';
import { X } from 'lucide-react';
import type { Notification } from '@/app/components/NotificationDropdown';

export function NotificationDrawer({ open, onClose, items }: { open: boolean; onClose: () => void; items: Notification[] }) {
  const [filter, setFilter] = useState<'semua' | 'belum'>('semua');
  if (!open) return null;
  const unread = items.filter((n) => !n.isRead);
  const list = filter === 'semua' ? items : unread;
  const Pill = ({ id, label, count }: { id: 'semua' | 'belum'; label: string; count: number }) => (
    <button onClick={() => setFilter(id)} className={`rounded-full border px-[12px] py-[2px] flex items-center gap-[6px] ${filter === id ? 'border-[#1a5fe0] bg-[#eaf3fe]' : 'border-[#a8a8a8]'}`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
      {label}
      <span className="min-w-[16px] h-[16px] px-[4px] rounded-full bg-[#d8142c] text-white grid place-items-center" style={{ fontSize: '10px' }}>{count}</span>
    </button>
  );
  return (
    <div className="fixed inset-0 z-[120] bg-black/40" onClick={onClose} role="presentation">
      <aside role="dialog" aria-label="Pemberitahuan" onClick={(e) => e.stopPropagation()} className="absolute right-0 top-0 h-full w-full max-w-[640px] bg-white p-[20px] overflow-y-auto">
        <div className="flex items-center justify-between mb-[12px]">
          <h2 className="font-semibold" style={{ fontSize: 'var(--text-xl)' }}>Pemberitahuan</h2>
          <button onClick={onClose} aria-label="Tutup"><X className="size-[22px]" /></button>
        </div>
        <div className="flex gap-[8px] mb-[12px]">
          <Pill id="semua" label="Semua" count={items.length} />
          <Pill id="belum" label="Belum Dibaca" count={unread.length} />
        </div>
        {list.length === 0 ? (
          <p className="text-center text-[#65696c] py-[32px]" style={{ fontSize: 'var(--text-sm)' }}>Tidak ada pemberitahuan.</p>
        ) : list.map((n) => (
          <div key={n.id} className="rounded-[6px] bg-[#f0f0f0] px-[12px] py-[10px] mb-[8px]">
            <div className="flex justify-between gap-[8px]">
              <span className="font-semibold" style={{ fontSize: 'var(--text-xs)' }}>{n.title}</span>
              <span className="text-[#65696c]" style={{ fontSize: '11px' }}>{n.time}</span>
            </div>
            <p className="text-[#65696c]" style={{ fontSize: 'var(--text-xs)' }}>{n.message}</p>
          </div>
        ))}
      </aside>
    </div>
  );
}
