import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationDropdownProps {
  onViewAll: () => void;
}

// Mock data pemberitahuan
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Pembaruan Sistem',
    message: 'Sistem akan menjalani pemeliharaan rutin pada tanggal 15 Maret 2026 pukul 22:00 WIB.',
    time: '2 jam yang lalu',
    isRead: false,
  },
  {
    id: '2',
    title: 'Pengingat Presensi',
    message: 'Jangan lupa untuk melakukan clock out sebelum jam kerja berakhir.',
    time: '5 jam yang lalu',
    isRead: false,
  },
  {
    id: '3',
    title: 'Dokumen Menunggu Persetujuan',
    message: 'Anda memiliki 3 dokumen yang menunggu persetujuan di sistem SNDE.',
    time: '1 hari yang lalu',
    isRead: true,
  },
];

export function NotificationDropdown({ onViewAll }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-[8px] rounded-full hover:bg-[var(--secondary)] transition-colors"
        aria-label="Pemberitahuan"
      >
        <Bell className="w-[24px] h-[24px] text-[#45474A]" />
        
        {/* Badge for unread notifications */}
        {unreadCount > 0 && (
          <span
            className="absolute top-[4px] right-[4px] flex items-center justify-center min-w-[18px] h-[18px] px-[4px] rounded-full text-white text-[11px] font-[var(--font-weight-semibold)]"
            style={{
              backgroundColor: 'var(--destructive)',
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-[8px] w-[380px] bg-white rounded-[8px] border overflow-hidden shadow-lg animate-in fade-in zoom-in-95 duration-200"
          style={{
            borderColor: 'var(--border)',
          }}
        >
          {/* Header */}
          <div
            className="px-[16px] py-[12px] border-b"
            style={{
              borderColor: 'var(--border)',
            }}
          >
            <h3
              className="text-[16px] font-[var(--font-weight-semibold)]"
              style={{
                color: 'var(--foreground)',
              }}
            >
              Pemberitahuan
            </h3>
          </div>

          {/* Notification List */}
          <div className="max-h-[320px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-[16px] py-[32px] text-center">
                <p
                  className="text-[14px]"
                  style={{
                    color: 'var(--muted-foreground)',
                  }}
                >
                  Tidak ada pemberitahuan
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  className="w-full px-[16px] py-[12px] text-left hover:bg-[var(--secondary)] transition-colors border-b last:border-b-0"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: notification.isRead ? 'transparent' : 'var(--secondary)',
                  }}
                  onClick={() => {
                    // Handle notification click
                    console.log('Notification clicked:', notification.id);
                  }}
                >
                  <div className="flex gap-[12px]">
                    {/* Unread indicator */}
                    <div className="flex-shrink-0 mt-[6px]">
                      {!notification.isRead && (
                        <div
                          className="w-[8px] h-[8px] rounded-full"
                          style={{
                            backgroundColor: 'var(--primary)',
                          }}
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-[14px] font-[var(--font-weight-semibold)] mb-[4px]"
                        style={{
                          color: 'var(--foreground)',
                        }}
                      >
                        {notification.title}
                      </h4>
                      <p
                        className="text-[13px] mb-[4px] line-clamp-2"
                        style={{
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        {notification.message}
                      </p>
                      <span
                        className="text-[12px]"
                        style={{
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div
            className="px-[16px] py-[10px] border-t"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--secondary)',
            }}
          >
            <button
              onClick={() => {
                setIsOpen(false);
                onViewAll();
              }}
              className="w-full text-center py-[6px] rounded-[4px] hover:bg-white transition-colors"
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--primary)',
              }}
            >
              Lihat Semua Pemberitahuan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
