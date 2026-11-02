import { type ReactNode } from 'react';
import { ArrowLeft, Calendar, Paperclip, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';

export function BackLink({ to }: { to?: string }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => (to ? navigate(to) : navigate(-1))} className="flex items-center gap-[6px] text-[#2f3031] mb-[8px]" style={{ fontSize: 'var(--text-sm)' }}>
      <ArrowLeft className="size-[14px]" /> Kembali
    </button>
  );
}

export function FormCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-white border border-[#e4e4e4] rounded-[8px] overflow-hidden">
      <header className="px-[16px] py-[14px] border-b border-[#eee] text-[#65696c] font-medium" style={{ fontSize: 'var(--text-sm)' }}>{title}</header>
      <div className="p-[16px] grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[14px]">{children}</div>
    </section>
  );
}

export function Field({ label, required, full, children, hint }: { label: string; required?: boolean; full?: boolean; children: ReactNode; hint?: string }) {
  return (
    <label className={`flex flex-col gap-[6px] ${full ? 'md:col-span-2' : ''}`}>
      <span className="text-[#2f3031]" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
        {label} {required && <span className="text-[#d8142c]">*</span>}
      </span>
      {children}
      {hint && <span className="text-[#65696c]" style={{ fontSize: '11px' }}>{hint}</span>}
    </label>
  );
}

const base = 'w-full rounded-[4px] border px-[12px] py-[10px]';
export const TextInput = ({ readOnly, defaultValue, placeholder, onChange }: { readOnly?: boolean; defaultValue?: string; placeholder?: string; onChange?: () => void }) => (
  <input
    readOnly={readOnly}
    defaultValue={defaultValue}
    placeholder={placeholder}
    onChange={onChange}
    className={`${base} ${readOnly ? 'bg-[#ececec] text-[#8a8d90] border-[#e0e0e0]' : 'bg-white border-[#a8a8a8]'}`}
    style={{ fontSize: 'var(--text-sm)' }}
  />
);

export const TextArea = ({ defaultValue, onChange }: { defaultValue?: string; onChange?: () => void }) => (
  <textarea defaultValue={defaultValue} onChange={onChange} rows={4} className={`${base} bg-white border-[#a8a8a8]`} style={{ fontSize: 'var(--text-sm)' }} />
);

export const DateInput = ({ readOnly, defaultValue, placeholder = 'Pilih tanggal', onChange }: { readOnly?: boolean; defaultValue?: string; placeholder?: string; onChange?: () => void }) => (
  <div className="relative">
    <input type="text" readOnly={readOnly} defaultValue={defaultValue} placeholder={placeholder} onChange={onChange} className={`${base} pr-[36px] ${readOnly ? 'bg-[#ececec] text-[#8a8d90] border-[#e0e0e0]' : 'bg-white border-[#a8a8a8]'}`} style={{ fontSize: 'var(--text-sm)' }} />
    <Calendar className="absolute right-[10px] top-1/2 -translate-y-1/2 size-[18px] text-[#45474a]" />
  </div>
);

export const SelectInput = ({ options, placeholder, defaultValue, onChange }: { options: string[]; placeholder?: string; defaultValue?: string; onChange?: () => void }) => (
  <div className="relative">
    <select defaultValue={defaultValue ?? ''} onChange={onChange} className={`${base} bg-white border-[#a8a8a8] appearance-none pr-[32px]`} style={{ fontSize: 'var(--text-sm)' }}>
      <option value="" disabled>{placeholder ?? 'Pilih'}</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <ChevronDown className="absolute right-[10px] top-1/2 -translate-y-1/2 size-[16px] pointer-events-none" />
  </div>
);

export const Radios = ({ name, options, disabledAll, defaultValue }: { name: string; options: string[]; disabledAll?: boolean; defaultValue?: string }) => (
  <div className="flex items-center gap-[20px] py-[8px]" style={{ fontSize: 'var(--text-sm)' }}>
    {options.map((o) => (
      <span key={o} className={`flex items-center gap-[6px] ${disabledAll ? 'text-[#8a8d90]' : ''}`}>
        <input type="radio" name={name} defaultChecked={o === defaultValue} disabled={disabledAll} /> {o}
      </span>
    ))}
  </div>
);

export function FileField({ label, hint, required }: { label: string; hint: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-[6px] md:col-span-2">
      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{label} {required && <span className="text-[#d8142c]">*</span>}</span>
      <span className="text-[#65696c]" style={{ fontSize: '11px' }}>{hint}</span>
      <div className="flex items-center gap-[8px]">
        <label className="flex-1 border border-[#a8a8a8] rounded-[4px] px-[12px] py-[10px] flex items-center gap-[8px] text-[#8a8d90] cursor-pointer" style={{ fontSize: 'var(--text-sm)' }}>
          <Paperclip className="size-[16px]" /> Pilih File
          <input type="file" className="hidden" />
        </label>
        <button type="button" className="border border-[#1a5fe0] text-[#1a5fe0] rounded-[4px] px-[16px] py-[10px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>Unggah</button>
      </div>
    </div>
  );
}

export function FormActions({ primary, onCancel, primaryDisabled, onPrimary }: { primary: string; onCancel: () => void; primaryDisabled?: boolean; onPrimary?: () => void }) {
  return (
    <div className="flex items-center gap-[10px] pt-[4px] pb-[24px]">
      <button type="button" disabled={primaryDisabled} onClick={onPrimary} className={`rounded-[4px] px-[16px] py-[10px] font-semibold text-white ${primaryDisabled ? 'bg-[#b8b8b8] cursor-not-allowed' : 'bg-[#2f3031]'}`} style={{ fontSize: 'var(--text-sm)' }}>
        {primary}
      </button>
      <button type="button" onClick={onCancel} className="rounded-[4px] border border-[#a8a8a8] px-[16px] py-[10px] font-semibold bg-white" style={{ fontSize: 'var(--text-sm)' }}>Batal</button>
    </div>
  );
}
