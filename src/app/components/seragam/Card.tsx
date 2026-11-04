import type { HTMLAttributes, ReactNode } from 'react';

/** Card Seragam: putih, radius 8, bayangan 0 0 1px rgba(0,0,0,.25) + 0 2px 1px rgba(0,0,0,.05). Padding 16 dan gap 16 (tanpa padding bila ada `image`). */
export function Card({ title, image, action, children, className = '', ...rest }: { title?: ReactNode; image?: ReactNode; action?: ReactNode } & Omit<HTMLAttributes<HTMLDivElement>, 'title'>) {
  return (
    <div {...rest} className={`flex flex-col overflow-hidden rounded-[8px] bg-white shadow-[0_0_1px_rgba(0,0,0,0.25),0_2px_1px_rgba(0,0,0,0.05)] ${className}`}>
      {image && <div className="h-[180px] w-full overflow-hidden [&>img]:size-full [&>img]:object-cover">{image}</div>}
      <div className="flex flex-col gap-[16px] p-[16px]">
        {title && <h3 className="text-sd-gray-90" style={{ fontSize: 22, lineHeight: '28px', fontWeight: 600 }}>{title}</h3>}
        {children && <div className="text-sd-gray-90" style={{ fontSize: 15, lineHeight: '22px' }}>{children}</div>}
        {action}
      </div>
    </div>
  );
}
