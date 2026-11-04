import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Notification } from '../components/NotificationDropdown';

interface PemberitahuanPageProps {
  onBack: () => void;
}

// Extended mock data untuk halaman full
const allNotifications: Notification[] = [
  {
    id: '1',
    title: 'Pembaruan Sistem',
    message: 'Sistem akan menjalani pemeliharaan rutin pada tanggal 15 Maret 2026 pukul 22:00 WIB. Seluruh layanan akan tidak dapat diakses selama kurang lebih 2 jam.',
    time: '2 jam yang lalu',
    isRead: false,
  },
  {
    id: '2',
    title: 'Pengingat Presensi',
    message: 'Jangan lupa untuk melakukan clock out sebelum jam kerja berakhir. Presensi yang tidak lengkap akan mempengaruhi laporan kehadiran bulanan Anda.',
    time: '5 jam yang lalu',
    isRead: false,
  },
  {
    id: '3',
    title: 'Dokumen Menunggu Persetujuan',
    message: 'Anda memiliki 3 dokumen yang menunggu persetujuan di sistem SNDE. Silakan segera tinjau dan berikan persetujuan.',
    time: '1 hari yang lalu',
    isRead: true,
  },
  {
    id: '4',
    title: 'Laporan Kinerja Tersedia',
    message: 'Laporan kinerja bulan Februari 2026 sudah tersedia untuk ditinjau. Silakan periksa progres target Anda.',
    time: '2 hari yang lalu',
    isRead: true,
  },
  {
    id: '5',
    title: 'Undangan Rapat Tim',
    message: 'Anda diundang untuk menghadiri rapat koordinasi tim pada tanggal 14 Maret 2026 pukul 10:00 WIB melalui platform virtual meeting.',
    time: '3 hari yang lalu',
    isRead: true,
  },
  {
    id: '6',
    title: 'Update Kebijakan Organisasi',
    message: 'Terdapat pembaruan kebijakan terkait pengajuan cuti dan izin. Silakan baca informasi lengkapnya di menu Kepegawaian.',
    time: '5 hari yang lalu',
    isRead: true,
  },
  {
    id: '7',
    title: 'Pencapaian Target Bulanan',
    message: 'Selamat! Anda telah mencapai 95% target kinerja bulan ini. Pertahankan semangat kerja Anda.',
    time: '1 minggu yang lalu',
    isRead: true,
  },
];

export function PemberitahuanPage({ onBack }: PemberitahuanPageProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>(allNotifications);

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  return (
    <div className="min-h-screen bg-sd-gray-0">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-[1280px] mx-auto px-[24px] py-[20px]">
          <div className="flex items-center gap-[16px] mb-[16px]">
            <button
              onClick={onBack}
              className="p-[8px] rounded-full hover:bg-[var(--secondary)] transition-colors"
              aria-label="Kembali"
            >
              <ArrowLeft className="w-[24px] h-[24px]" style={{ color: 'var(--foreground)' }} />
            </button>
            <h1
              className="text-[24px] font-[var(--font-weight-semibold)]"
              style={{ color: 'var(--foreground)' }}
            >
              Pemberitahuan
            </h1>
          </div>

          {/* Filter dan Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-[8px]">
              <button
                onClick={() => setFilter('all')}
                className="px-[16px] py-[8px] rounded-[6px] transition-colors"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  backgroundColor: filter === 'all' ? 'var(--primary)' : 'white',
                  color: filter === 'all' ? 'white' : 'var(--foreground)',
                  border: filter === 'all' ? 'none' : '1px solid var(--border)',
                }}
              >
                Semua ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className="px-[16px] py-[8px] rounded-[6px] transition-colors"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  backgroundColor: filter === 'unread' ? 'var(--primary)' : 'white',
                  color: filter === 'unread' ? 'white' : 'var(--foreground)',
                  border: filter === 'unread' ? 'none' : '1px solid var(--border)',
                }}
              >
                Belum Dibaca ({unreadCount})
              </button>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-[16px] py-[8px] rounded-[6px] transition-colors hover:bg-[var(--secondary)]"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--primary)',
                  border: '1px solid var(--border)',
                }}
              >
                Tandai Semua Sudah Dibaca
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notification List */}
      <div className="max-w-[1280px] mx-auto px-[24px] py-[24px]">
        <div className="bg-white rounded-[8px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          {filteredNotifications.length === 0 ? (
            <div className="px-[24px] py-[48px] text-center">
              <p
                className="text-[16px]"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {filter === 'unread' ? 'Tidak ada pemberitahuan yang belum dibaca' : 'Tidak ada pemberitahuan'}
              </p>
            </div>
          ) : (
            <div>
              {filteredNotifications.map((notification, index) => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className="w-full px-[24px] py-[20px] text-left hover:bg-[var(--secondary)] transition-colors border-b last:border-b-0"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: notification.isRead ? 'transparent' : 'rgba(var(--primary-rgb), 0.02)',
                  }}
                >
                  <div className="flex gap-[16px]">
                    {/* Unread indicator */}
                    <div className="flex-shrink-0 mt-[6px]">
                      {!notification.isRead ? (
                        <div
                          className="w-[10px] h-[10px] rounded-full"
                          style={{
                            backgroundColor: 'var(--primary)',
                          }}
                        />
                      ) : (
                        <div className="w-[10px] h-[10px]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-[16px] mb-[8px]">
                        <h3
                          className="text-[16px] font-[var(--font-weight-semibold)]"
                          style={{
                            color: 'var(--foreground)',
                          }}
                        >
                          {notification.title}
                        </h3>
                        <span
                          className="text-[13px] whitespace-nowrap flex-shrink-0"
                          style={{
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          {notification.time}
                        </span>
                      </div>
                      <p
                        className="text-[14px] leading-[1.6]"
                        style={{
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
