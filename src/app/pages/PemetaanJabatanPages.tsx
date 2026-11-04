import { FileText } from 'lucide-react';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';

function PageShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <KepegawaianLayout>
      <div className="px-[24px] pt-[24px] pb-[64px] flex flex-col gap-[16px]">
        <div>
          <h1 className="text-sd-gray-90" style={{ fontSize: '24px', fontWeight: 600, lineHeight: '28px' }}>{title}</h1>
          <p className="text-sd-gray-90" style={{ fontSize: '14px', lineHeight: '20px' }}>{subtitle}</p>
        </div>
        {children}
      </div>
    </KepegawaianLayout>
  );
}

function SelectField({ label, placeholder, disabled }: { label: string; placeholder: string; disabled?: boolean }) {
  return (
    <label className="flex flex-col gap-[4px]">
      <span className="text-sd-gray-90" style={{ fontSize: 'var(--text-xs)' }}>{label}</span>
      <select
        disabled={disabled}
        className={`border border-sd-gray-30 rounded-[4px] px-[10px] py-[9px] ${disabled ? 'bg-[#ececec] text-sd-gray-50' : 'bg-white'}`}
        style={{ fontSize: 'var(--text-sm)' }}
      >
        <option>{placeholder}</option>
      </select>
    </label>
  );
}

function Filters({ withKepmen = true }: { withKepmen?: boolean }) {
  return (
    <div className="bg-white border border-sd-badge-neutral rounded-[6px] p-[16px] grid grid-cols-1 md:grid-cols-2 gap-[16px]">
      <SelectField label="Pilih Unit Organisasi (Eselon I)" placeholder="Pilih Unit Organisasi" />
      {withKepmen && <SelectField label="Referensi Kepmen" placeholder="Pilih Kepmen" disabled />}
    </div>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white border border-sd-badge-neutral rounded-[6px] py-[48px] flex flex-col items-center gap-[6px] text-center">
      <FileText className="size-[32px] text-sd-gray-50" />
      <p className="font-semibold text-sd-gray-90" style={{ fontSize: 'var(--text-sm)' }}>{title}</p>
      <p className="text-sd-gray-60" style={{ fontSize: 'var(--text-sm)' }}>{text}</p>
    </div>
  );
}

export function PemetaanKonfigurasiPage() {
  return (
    <PageShell title="Pemetaan & Konfigurasi Jabatan" subtitle="Kelola pemetaan hierarki jabatan ke struktur organisasi beserta konfigurasi kebutuhan pegawai">
      <Filters />
    </PageShell>
  );
}

export function PergeseranJabatanPage() {
  return (
    <PageShell title="Pergeseran Jabatan" subtitle="Kelola pergeseran jabatan dan pantau status verifikasinya">
      <Filters />
      <EmptyState title="Pilih Referensi Kepmen" text="Pilih referensi Kepmen di atas untuk melihat usulan pergeseran jabatan." />
    </PageShell>
  );
}

export function VerifikasiUsulanPergeseranPage() {
  return (
    <PageShell title="Verifikasi Usulan Pergeseran" subtitle="Kelola dan verifikasi usulan pergeseran jabatan dari seluruh unit organisasi">
      <Filters />
      <EmptyState title="Pilih Referensi Kepmen" text="Pilih referensi Kepmen di atas untuk melihat usulan pergeseran jabatan." />
    </PageShell>
  );
}

export function InventarisKepmenPage() {
  return (
    <PageShell title="Inventaris Kepmen Peta Jabatan" subtitle="Kelola inventaris keputusan menteri peta jabatan berdasarkan unit organisasi">
      <Filters withKepmen={false} />
      <EmptyState title="Silakan pilih unit organisasi" text="Pilih unit organisasi (eselon I) di atas untuk melihat inventaris kepmen peta jabatannya." />
    </PageShell>
  );
}
