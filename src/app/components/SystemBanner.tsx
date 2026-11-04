import { AlertTriangle, Info, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

export type BannerType = 'info' | 'warning' | 'maintenance';

interface SystemBannerProps {
  type: BannerType;
  message: string;
  dismissible?: boolean;
  showIcon?: boolean;
  onDismiss?: () => void;
}

export function SystemBanner({ 
  type, 
  message, 
  dismissible = false,
  showIcon = true,
  onDismiss
}: SystemBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const getStyles = () => {
    switch (type) {
      case 'maintenance':
        return {
          bg: 'bg-sd-blue-5',
          border: 'border-primary',
          text: 'text-sd-blue-90',
          icon: AlertTriangle,
          iconColor: 'text-primary'
        };
      case 'warning':
        return {
          bg: 'bg-sd-red-5',
          border: 'border-destructive',
          text: 'text-[#7F1D1D]',
          icon: AlertCircle,
          iconColor: 'text-destructive'
        };
      case 'info':
      default:
        return {
          bg: 'bg-sd-blue-5',
          border: 'border-primary',
          text: 'text-sd-blue-90',
          icon: Info,
          iconColor: 'text-primary'
        };
    }
  };

  const styles = getStyles();
  const Icon = styles.icon;

  return (
    <div 
      className={`${styles.bg} border-b ${styles.border} ${styles.text}`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-[1440px] mx-auto px-[24px] py-[12px]">
        <div className="flex items-center justify-between gap-[16px]">
          <div className="flex items-center gap-[12px] flex-1">
            {showIcon && (
              <Icon 
                className={`w-[20px] h-[20px] shrink-0 ${styles.iconColor}`}
                strokeWidth={2}
              />
            )}
            <p 
              className={`${styles.text}`}
              style={{ 
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: '1.5'
              }}
            >
              {message}
            </p>
          </div>
          
          {dismissible && (
            <button
              onClick={handleDismiss}
              className={`${styles.iconColor} hover:opacity-70 transition-opacity shrink-0`}
              aria-label="Tutup banner"
            >
              <X className="w-[20px] h-[20px]" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}