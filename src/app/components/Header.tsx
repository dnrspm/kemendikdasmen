import { ChevronDown } from 'lucide-react';
import image_9422af45ba9c756818c3d67dd655d109dfd2e3af from 'figma:asset/9422af45ba9c756818c3d67dd655d109dfd2e3af.png';
import svgPaths from "@/imports/svg-9fgkcyy25e";
import { NotificationDropdown } from './NotificationDropdown';
import { useNavigate } from 'react-router';

interface HeaderProps {
  onLogoClick?: () => void;
  onNotificationViewAll?: () => void;
  fullWidth?: boolean;
}

function FilledActionSSupervisorAccount() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Filled / Action / S / supervisor_account">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Filled / Action / S / supervisor_account">
          <path d={svgPaths.p2a436470} fill="var(--fill-0, #45474A)" id="vector" />
        </g>
      </svg>
    </div>
  );
}

export function Header({ onLogoClick, onNotificationViewAll, fullWidth }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      navigate('/');
    }
  };

  const handleNotificationViewAll = () => {
    if (onNotificationViewAll) {
      onNotificationViewAll();
    } else {
      navigate('/pemberitahuan');
    }
  };

  return (
    <div className="bg-white border-b border-[#EFEFEF] h-[64px] sticky top-0 z-50 shadow-sm">
      <div className={`flex items-center justify-between h-full px-[24px] mx-auto ${fullWidth ? 'w-full' : 'max-w-[1440px]'}`}>
        {/* Logo Header */}
        <div className="flex items-center">
          <button onClick={handleLogoClick} className="hover:opacity-80 transition-opacity">
            <img 
              alt="Portal Kemendikdasmen" 
              className="h-[42px] w-auto object-contain" 
              src={image_9422af45ba9c756818c3d67dd655d109dfd2e3af} 
            />
          </button>
        </div>

        {/* Right side: Notification + User Menu */}
        <div className="flex items-center gap-[16px]">
          {/* Notification Dropdown */}
          <NotificationDropdown onViewAll={handleNotificationViewAll} />

          {/* User Menu */}
          <div className="flex items-center gap-[9px] cursor-pointer hover:opacity-80 transition-opacity">
            <FilledActionSSupervisorAccount />
            <p className="hidden md:block text-[16px] font-[var(--font-weight-medium)] text-[#2f3031] leading-[24px]">
              Sarah Citra
            </p>
            <ChevronDown className="w-[24px] h-[24px] text-[#45474A]" />
          </div>
        </div>
      </div>
    </div>
  );
}