import { type ReactNode } from 'react';
import { ArrowLeft, Calendar, Paperclip, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';

export function BackLink({ to }: { to?: string }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => (to ? navigate(to) : navigate(-1))} className="flex items-center gap-[6px] text-sd-gray-90 mb-[8px]" style={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px' }}>
      <ArrowLeft className="size-[14px]" /> Kembali
    </button>
  );
}

export function FormCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden">
      <header className="px-[24px] pt-[20px] pb-[8px] text-sd-gray-60" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>{title}</header>
      <div className="px-[24px] pt-[8px] pb-[24px] grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[16px]">{children}</div>
    </section>
  );
}

export function Field({ label, required, full, children, hint }: { label: string; required?: boolean; full?: boolean; children: ReactNode; hint?: string }) {
  return (
    <label className={`flex flex-col gap-[6px] ${full ? 'md:col-span-2' : ''}`}>
      <span className="text-sd-gray-90" style={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>
        {label} {required && <span className="text-[#d8142c]">*</span>}
      </span>
      {children}
      {hint && <span className="text-sd-gray-60" style={{ fontSize: '12px' }}>{hint}</span>}
    </label>
  );
}

const base = 'w-full rounded-[4px] border px-[16px] h-[48px]';
export const TextInput = ({ readOnly, defaultValue, placeholder, onChange }: { readOnly?: boolean; defaultValue?: string; placeholder?: string; onChange?: () => void }) => (
  <input
    readOnly={readOnly}
    defaultValue={defaultValue}
    placeholder={placeholder}
    onChange={onChange}
    className={`${base} ${readOnly ? 'bg-sd-badge-neutral text-sd-gray-60 border-sd-modal-footer-border' : 'bg-white border-sd-gray-50'}`}
    style={{ fontSize: '16px', lineHeight: '24px' }}
  />
);

export const TextArea = ({ defaultValue, onChange }: { defaultValue?: string; onChange?: () => void }) => (
  <textarea defaultValue={defaultValue} onChange={onChange} rows={4} className={`${base} h-auto py-[12px] bg-white border-sd-gray-50`} style={{ fontSize: '16px', lineHeight: '24px' }} />
);

export const DateInput = ({ readOnly, defaultValue, placeholder = 'Pilih tanggal', onChange }: { readOnly?: boolean; defaultValue?: string; placeholder?: string; onChange?: () => void }) => (
  <div className="relative">
    <input type="text" readOnly={readOnly} defaultValue={defaultValue} placeholder={placeholder} onChange={onChange} className={`${base} pr-[36px] ${readOnly ? 'bg-sd-badge-neutral text-sd-gray-60 border-sd-modal-footer-border' : 'bg-white border-sd-gray-50'}`} style={{ fontSize: '16px', lineHeight: '24px' }} />
    <Calendar className="absolute right-[10px] top-1/2 -translate-y-1/2 size-[18px] text-sd-gray-80" />
  </div>
);

export const SelectInput = ({ options, placeholder, defaultValue, onChange }: { options: string[]; placeholder?: string; defaultValue?: string; onChange?: () => void }) => (
  <div className="relative">
    <select defaultValue={defaultValue ?? ''} onChange={onChange} className={`${base} bg-white border-sd-gray-50 appearance-none pr-[32px]`} style={{ fontSize: '16px', lineHeight: '24px' }}>
      <option value="" disabled>{placeholder ?? 'Pilih'}</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <ChevronDown className="absolute right-[10px] top-1/2 -translate-y-1/2 size-[16px] pointer-events-none" />
  </div>
);

export const Radios = ({ name, options, disabledAll, defaultValue }: { name: string; options: string[]; disabledAll?: boolean; defaultValue?: string }) => (
  <div className="flex items-center gap-[20px] py-[8px]" style={{ fontSize: '16px', lineHeight: '24px' }}>
    {options.map((o) => (
      <span key={o} className={`flex items-center gap-[6px] ${disabledAll ? 'text-sd-gray-50' : ''}`}>
        <input type="radio" name={name} defaultChecked={o === defaultValue} disabled={disabledAll} /> {o}
      </span>
    ))}
  </div>
);

export function FileField({ label, hint, required }: { label: string; hint: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-[6px] md:col-span-2">
      <span style={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>{label} {required && <span className="text-[#d8142c]">*</span>}</span>
      <span className="text-sd-gray-60" style={{ fontSize: '12px' }}>{hint}</span>
      <div className="flex items-center gap-[8px]">
        <label className="flex-1 border border-sd-gray-50 rounded-[4px] px-[12px] py-[10px] flex items-center gap-[8px] text-sd-gray-50 cursor-pointer" style={{ fontSize: '16px', lineHeight: '24px' }}>
          <Paperclip className="size-[16px]" /> Pilih File
          <input type="file" className="hidden" />
        </label>
        <button type="button" className="border border-sd-blue-70 text-sd-blue-70 rounded-[4px] px-[16px] py-[8px] font-semibold" style={{ fontSize: '16px', lineHeight: '24px' }}>Unggah</button>
      </div>
    </div>
  );
}

export function FormActions({ primary, onCancel, primaryDisabled, onPrimary }: { primary: string; onCancel: () => void; primaryDisabled?: boolean; onPrimary?: () => void }) {
  return (
    <div className="flex items-center gap-[10px] pt-[4px] pb-[24px]">
      <button type="button" disabled={primaryDisabled} onClick={onPrimary} className={`rounded-[4px] px-[16px] py-[8px] font-semibold ${primaryDisabled ? '' : 'text-white'} ${primaryDisabled ? 'bg-sd-modal-border text-sd-gray-60 cursor-not-allowed' : 'bg-sd-gray-90'}`} style={{ fontSize: '16px', lineHeight: '24px' }}>
        {primary}
      </button>
      <button type="button" onClick={onCancel} className="rounded-[4px] border border-sd-gray-50 px-[16px] py-[8px] font-semibold bg-white" style={{ fontSize: '16px', lineHeight: '24px' }}>Batal</button>
    </div>
  );
}
