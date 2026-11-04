import { ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import logoPortal from '@/assets/staging/portal-kemendikdasmen.png';
import imgTutWuri from '@/assets/staging/tut-wuri-handayani.png';
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
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

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
    <div className="bg-white border-b border-[#EFEFEF] h-[61px] sticky top-0 z-50">
      <div className={`flex items-center justify-between h-full px-[20px] mx-auto ${fullWidth ? 'w-full' : 'max-w-[1440px]'}`}>
        {/* Logo Header */}
        <div className="flex items-center">
          <button onClick={handleLogoClick} className="hover:opacity-80 transition-opacity">
            <img 
              alt="Portal Kemendikdasmen" 
              className="h-[36px] w-auto object-contain" 
              src={logoPortal} 
            />
          </button>
        </div>

        {/* Right side: Notification + User Menu */}
        <div className="flex items-center gap-[8px]">
          {/* Notification Dropdown */}
          <NotificationDropdown onViewAll={handleNotificationViewAll} />

          {/* User Menu */}
          <div className="relative" ref={userRef}>
            <button onClick={() => setUserOpen(!userOpen)} className="flex items-center gap-[12px] cursor-pointer hover:opacity-80 transition-opacity">
              <img alt="" src={imgTutWuri} className="size-[34px] rounded-full object-cover" />
              <p className="hidden md:block uppercase text-[#323232]" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
                AHMAD WIJAYA
              </p>
              {userOpen ? <ChevronUp className="w-[24px] h-[24px] text-[#45474A]" /> : <ChevronDown className="w-[24px] h-[24px] text-[#45474A]" />}
            </button>
            {userOpen && (
              <div className="absolute right-0 mt-[8px] w-[220px] bg-white border border-[#e4e4e4] rounded-[8px] shadow-lg p-[12px] z-50">
                <p className="font-semibold text-[#323232]" style={{ fontSize: 'var(--text-sm)' }}>Ahmad Wijaya</p>
                <p className="text-[#0954D9]" style={{ fontSize: '12px' }}>ahmad.wijaya@kemendikdasmen.go.id</p>
                <p className="text-[#727272] mb-[10px]" style={{ fontSize: '11px' }}>NIP: 198704182018031001</p>
                <button className="w-full flex items-center gap-[8px] border border-[#0954D9] rounded-[4px] px-[10px] py-[6px] hover:bg-[#f3f8ff]" style={{ fontSize: 'var(--text-sm)' }}>
                  <LogOut className="size-[16px]" /> Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}