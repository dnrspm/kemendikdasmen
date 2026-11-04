import { forwardRef, type InputHTMLAttributes } from 'react';

/** Search Bar Seragam 3.0: tinggi 46, radius 4, border gray-30, placeholder gray-60; tombol cari 46x46 di kanan (border gray-30, hover gray-5); fokus border blue-50 2px. */
export const SearchBar = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { onSearch?: () => void }>(
  ({ onSearch, className = '', disabled, ...rest }, ref) => (
    <div className={`flex h-[46px] items-stretch rounded-[4px] bg-white ${disabled ? 'bg-sd-badge-neutral' : ''} ${className}`}>
      <input ref={ref} {...rest} disabled={disabled} type="search" style={{ fontSize: 15, lineHeight: '22px' }}
        onKeyDown={(e) => { rest.onKeyDown?.(e); if (e.key === 'Enter') onSearch?.(); }}
        className="peer min-w-0 flex-1 rounded-l-[4px] border border-r-0 border-sd-gray-30 bg-transparent pl-[12px] pr-[8px] text-sd-gray-90 outline-none placeholder:text-sd-gray-60 focus:border-2 focus:border-r-0 focus:border-sd-blue-50 disabled:text-sd-gray-50" />
      <button type="button" aria-label="Cari" disabled={disabled} onClick={onSearch}
        className="grid w-[46px] place-items-center rounded-r-[4px] border border-sd-gray-30 text-sd-gray-90 outline-none hover:bg-sd-gray-5 peer-focus:border-2 peer-focus:border-sd-blue-50 disabled:text-sd-gray-50">
        <svg aria-hidden viewBox="0 0 24 24" className="size-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
      </button>
    </div>
  ),
);
SearchBar.displayName = 'SearchBar';
