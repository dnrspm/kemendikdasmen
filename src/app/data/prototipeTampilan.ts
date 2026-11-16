import { useSyncExternalStore } from 'react';

/** Pilihan prototipe tampilan modal Detail Usulan Perubahan (diatur dari menu profil di header). */
export type TampilanModal = 'staging' | 'iterasi';

const KEY = 'prototipe-tampilan-modal-usulan';
const listeners = new Set<() => void>();
let current: TampilanModal = 'staging';
try { if (localStorage.getItem(KEY) === 'iterasi') current = 'iterasi'; } catch { /* abaikan */ }

export function setTampilanModal(v: TampilanModal) {
  current = v;
  try { localStorage.setItem(KEY, v); } catch { /* abaikan */ }
  listeners.forEach((l) => l());
}

export const getTampilanModal = (): TampilanModal => current;

export function useTampilanModal(): TampilanModal {
  return useSyncExternalStore((cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; }, () => current, () => 'staging');
}
