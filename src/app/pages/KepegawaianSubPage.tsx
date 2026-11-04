import { useLocation } from 'react-router';
import { KepegawaianLayout, kepegawaianGroups } from '@/app/components/KepegawaianLayout';

export function KepegawaianSubPage() {
  const { pathname } = useLocation();
  const clean = pathname.replace(/\/$/, '');
  const leaf = kepegawaianGroups.flatMap((g) => g.children).find((c) => c.path === clean);
  return (
    <KepegawaianLayout>
      <div className="p-[24px]">
        <h1 className="font-semibold text-sd-gray-90" style={{ fontSize: '24px' }}>{leaf?.label ?? 'Kepegawaian'}</h1>
        <div className="mt-[16px] bg-white border border-sd-gray-30 rounded-[var(--radius-card)] p-[24px] text-sd-gray-60" style={{ fontSize: 'var(--text-sm)' }}>
          Halaman ini belum disalin dari portal staging.
        </div>
      </div>
    </KepegawaianLayout>
  );
}
