/**
 * Token dari Design System Seragam (Figma: Dokumentasi Seragam Mobile 3.0).
 * Nilai bertanda (F) dibaca langsung dari Figma; (P) adalah nilai prototipe yang masih dipakai
 * sampai spesifikasinya dibaca dari Figma.
 */
export const color = {
  actionDefault: '#0B5FEF', // (F) Action/Default
  textDefault: '#2F3031',   // (P) Text/Default
  textSubdued: '#65686C',   // (F) Text/Subdued
  textInverse: '#FFFFFF',   // (F) Text/Inverse
  surfaceDefault: '#FFFFFF',// (F) Surface/Default
  surfaceSubdued: '#F7F7F7',// (P) Surface/Subdued
  border: '#E4E4E4',        // (P) Border
  borderStrong: '#A8A8A8',  // (P)
  danger: '#C62828',        // (P)
} as const;

/** (F) Mobile/Action: Inter 15/22, semibold. */
export const typeAction = { fontSize: '15px', lineHeight: '22px', fontWeight: 600 } as const;
/** (P) Skala isi: judul 19, nilai 16, label 14. */
export const typeBody = { fontSize: '16px', lineHeight: '24px' } as const;
export const typeLabel = { fontSize: '14px', lineHeight: '20px' } as const;

/** (F) Radius tombol 4px; tinggi tombol Large 46px. */
export const radius = { control: '4px', card: '8px' } as const;
