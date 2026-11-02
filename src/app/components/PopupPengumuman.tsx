import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import popupImage from 'figma:asset/a5657db5d0fb3de62589d82b8d8c0ca3d361a623.png';

const STORAGE_KEY = 'portal-popup-last-shown';

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function PopupPengumuman() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // PREVIEW MODE: Popup muncul setiap refresh untuk keperluan demo
    setIsOpen(true);

    /* PRODUCTION MODE: Uncomment kode di bawah untuk sistem sekali per hari
    const lastShown = localStorage.getItem(STORAGE_KEY);
    const today = new Date();

    if (!lastShown) {
      // Belum pernah ditampilkan
      setIsOpen(true);
      localStorage.setItem(STORAGE_KEY, today.toISOString());
    } else {
      const lastShownDate = new Date(lastShown);
      
      // Jika bukan hari yang sama, tampilkan popup
      if (!isSameDay(lastShownDate, today)) {
        setIsOpen(true);
        localStorage.setItem(STORAGE_KEY, today.toISOString());
      }
    }
    */
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleImageClick = () => {
    window.open('https://kemendikdasmen-sehatmental.id/', '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998] animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-white rounded-[var(--radius-card)] max-w-[480px] w-full pointer-events-auto animate-in zoom-in-95 duration-200"
          style={{
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-[12px] right-[12px] z-10 flex items-center justify-center w-[32px] h-[32px] rounded-full bg-white/90 hover:bg-white transition-all shadow-md"
            style={{
              color: 'var(--muted-foreground)',
            }}
            aria-label="Tutup"
          >
            <X className="w-[18px] h-[18px]" />
          </button>

          {/* Image Content - Clickable */}
          <button
            onClick={handleImageClick}
            className="w-full block rounded-[var(--radius-card)] overflow-hidden transition-opacity hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              focusRingColor: 'var(--primary)',
            }}
          >
            <img
              src={popupImage}
              alt="Layanan Konseling Daring Pegawai Kemendikdasmen - Periode 25 Februari - 12 Desember 2026"
              className="w-full h-auto block"
            />
          </button>

          {/* Footer dengan informasi tambahan */}
          <div
            className="px-[20px] py-[12px] border-t flex items-center justify-between"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--secondary)',
            }}
          >
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
              }}
            >
              Klik gambar untuk informasi lebih lanjut
            </p>
            <button
              onClick={handleClose}
              className="px-[12px] py-[6px] rounded-[4px] transition-colors"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--primary)',
                backgroundColor: 'white',
                border: '1px solid var(--border)',
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}