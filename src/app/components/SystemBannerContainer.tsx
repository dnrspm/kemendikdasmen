import { SystemBanner } from './SystemBanner';
import { getActiveBanners } from '@/app/data/systemBanners';
import { useState, useEffect } from 'react';

/**
 * Container untuk menampilkan multiple system banners
 * Banner akan ditampilkan dari data yang dikonfigurasi di systemBanners.ts
 */
export function SystemBannerContainer() {
  const [dismissedBanners, setDismissedBanners] = useState<Set<string>>(new Set());
  
  // Load dismissed banners dari localStorage saat komponen mount
  useEffect(() => {
    const stored = localStorage.getItem('dismissedSystemBanners');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDismissedBanners(new Set(parsed));
      } catch (e) {
        console.error('Failed to parse dismissed banners', e);
      }
    }
  }, []);

  // Simpan dismissed banners ke localStorage
  const handleDismiss = (bannerId: string) => {
    const newDismissed = new Set(dismissedBanners);
    newDismissed.add(bannerId);
    setDismissedBanners(newDismissed);
    localStorage.setItem('dismissedSystemBanners', JSON.stringify(Array.from(newDismissed)));
  };

  // Dapatkan banner yang aktif dan belum di-dismiss
  const activeBanners = getActiveBanners().filter(
    banner => !dismissedBanners.has(banner.id)
  );

  if (activeBanners.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {activeBanners.map(banner => (
        <div key={banner.id}>
          <SystemBanner
            type={banner.type}
            message={banner.message}
            dismissible={banner.dismissible}
            showIcon={banner.showIcon}
            onDismiss={() => handleDismiss(banner.id)}
          />
        </div>
      ))}
    </div>
  );
}