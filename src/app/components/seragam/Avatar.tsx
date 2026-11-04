const SIZES = { 20: 10, 24: 11, 32: 13, 36: 14, 48: 18, 64: 22 } as const;

/** Avatar Seragam: ukuran 20/24/32/36/48/64, bulat atau persegi (radius 4), border #D9DBDD. Inisial: latar #D9DBDD, teks gray-60 bold, huruf renggang 1px. */
export function Avatar({ size = 36, shape = 'circle', src, name = '', alt }: { size?: keyof typeof SIZES; shape?: 'circle' | 'square'; src?: string; name?: string; alt?: string }) {
  const r = shape === 'circle' ? 'rounded-full' : 'rounded-[4px]';
  const initial = name.trim().charAt(0).toUpperCase();
  return src ? (
    <img src={src} alt={alt ?? name} width={size} height={size} className={`shrink-0 border border-sd-modal-footer-border object-cover ${r}`} style={{ width: size, height: size }} />
  ) : (
    <span role="img" aria-label={alt ?? name} className={`inline-grid shrink-0 place-items-center border border-sd-modal-footer-border bg-sd-modal-footer-border text-sd-gray-60 ${r}`}
      style={{ width: size, height: size, fontSize: SIZES[size], lineHeight: 1.2, fontWeight: 700, letterSpacing: 1 }}>{initial}</span>
  );
}
