import { type ReactNode } from 'react';
import { Button, Card, Radio, Select, TextArea as SdTextArea, TextField } from 'seragam-design-system';
import { ArrowLeft, Calendar, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router';

export function BackLink({ to }: { to?: string }) {
  const navigate = useNavigate();
  return (
    <div className="mb-[8px]">
      <Button variant="quiet" size="sm" leadingIcon={<ArrowLeft className="size-[14px]" />} onClick={() => (to ? navigate(to) : navigate(-1))}>
        Kembali
      </Button>
    </div>
  );
}

export function FormCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card title={title}>
      <div className="grid grid-cols-1 gap-x-[16px] gap-y-[16px] md:grid-cols-2">{children}</div>
    </Card>
  );
}

/** Pembungkus label + isian + petunjuk. Label 15/22 regular, petunjuk 12/16 gray-60 (spesifikasi Text Field with label). */
export function Field({ label, required, full, children, hint }: { label: string; required?: boolean; full?: boolean; children: ReactNode; hint?: string }) {
  return (
    <label className={`flex flex-col gap-[4px] ${full ? 'md:col-span-2' : ''}`}>
      <span className="sd-t-mobile-body text-sd-gray-90">
        {label} {required && <span className="text-sd-red-60" aria-hidden>*</span>}
      </span>
      {children}
      {hint && <span className="sd-t-mobile-helper text-sd-gray-60">{hint}</span>}
    </label>
  );
}

type InputProps = { readOnly?: boolean; defaultValue?: string; placeholder?: string; onChange?: () => void };

export const TextInput = (p: InputProps) => <TextField {...p} />;

export const TextArea = ({ defaultValue, onChange }: { defaultValue?: string; onChange?: () => void }) => (
  <SdTextArea defaultValue={defaultValue} onChange={onChange} rows={4} />
);

export const DateInput = ({ placeholder = 'Pilih tanggal', ...p }: InputProps) => (
  <TextField {...p} placeholder={placeholder} rightIcon={<Calendar className="size-[18px]" />} />
);

export const SelectInput = ({ options, placeholder, defaultValue, onChange }: { options: string[]; placeholder?: string; defaultValue?: string; onChange?: () => void }) => (
  <Select defaultValue={defaultValue ?? ''} onChange={onChange} placeholder={placeholder ?? 'Pilih'}>
    {options.map((o) => <option key={o}>{o}</option>)}
  </Select>
);

export const Radios = ({ name, options, disabledAll, defaultValue }: { name: string; options: string[]; disabledAll?: boolean; defaultValue?: string }) => (
  <div className="sd-t-mobile-body flex items-center gap-[20px] py-[8px]">
    {options.map((o) => (
      <span key={o} className="flex items-center">
        <Radio name={name} defaultChecked={o === defaultValue} disabled={disabledAll} label={o} />
      </span>
    ))}
  </div>
);

export function FileField({ label, hint, required }: { label: string; hint: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-[4px] md:col-span-2">
      <span className="sd-t-mobile-body text-sd-gray-90">{label} {required && <span className="text-sd-red-60" aria-hidden>*</span>}</span>
      <span className="sd-t-mobile-helper text-sd-gray-60">{hint}</span>
      <div className="flex items-center gap-[8px]">
        <label className="sd-t-mobile-body flex flex-1 cursor-pointer items-center gap-[8px] rounded-[4px] border border-sd-gray-50 px-[12px] py-[10px] text-sd-gray-50 focus-within:border-sd-blue-50 focus-within:shadow-[0_0_0_2px_var(--sd-interactive-focused)]">
          <Paperclip className="size-[16px]" /> Pilih file
          <input type="file" className="sr-only" />
        </label>
        <Button type="button" variant="secondary" size="md">Unggah</Button>
      </div>
    </div>
  );
}

export function FormActions({ primary, onCancel, primaryDisabled, onPrimary }: { primary: string; onCancel: () => void; primaryDisabled?: boolean; onPrimary?: () => void }) {
  return (
    <div className="flex items-center gap-[12px] pb-[24px] pt-[4px]">
      <Button type="button" variant="ultimate" size="md" disabled={primaryDisabled} onClick={onPrimary}>{primary}</Button>
      <Button type="button" variant="secondary" size="md" onClick={onCancel}>Batal</Button>
    </div>
  );
}
