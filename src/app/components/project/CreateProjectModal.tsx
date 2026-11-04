import { useState, FormEvent } from 'react';
import { X, Calendar } from 'lucide-react';
import { Epic, ProgramPriority, EpicStatus } from '@/app/data/projectManagementData';
import { sasaranKinerjas } from '@/app/data/strategicObjectivesData';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: Partial<Epic>) => void;
  organizationId: string;
}

export function CreateProjectModal({
  isOpen,
  onClose,
  onSubmit,
  organizationId
}: CreateProjectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'belum_dimulai' as EpicStatus,
    sasaran_kinerja_id: '',
    start_date: '',
    due_date: ''
  });

  // Check if all mandatory fields are filled
  const isFormValid = formData.name.trim() !== '' &&
                      formData.description.trim() !== '' &&
                      formData.start_date !== '' &&
                      formData.due_date !== '';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.start_date || !formData.due_date) {
      alert('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    onSubmit({
      ...formData
    });

    // Reset form
    setFormData({
      name: '',
      description: '',
      status: 'belum_dimulai',
      sasaran_kinerja_id: '',
      start_date: '',
      due_date: ''
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-[16px] bg-black/50">
      <div className="bg-white rounded-[8px] w-full max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#EFEFEF]">
          <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-[#323232]">
            Tambah Proyek Pendukung
          </h2>
          <button
            onClick={onClose}
            className="p-[4px] hover:bg-[#f9f9f9] rounded-[4px] transition-colors"
          >
            <X className="w-[20px] h-[20px] text-[#656a6c]" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-[24px] py-[20px] space-y-[20px]">
            {/* Nama SKP */}
            <div>
              <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#323232] mb-[8px]">
                Nama SKP <span className="text-[#E02D38]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama SKP"
                className="w-full px-[12px] py-[8px] border border-[#828282] rounded-[4px] text-[var(--text-base)] text-[#323232] placeholder:text-[#727272] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#323232] mb-[8px]">
                Deskripsi <span className="text-[#E02D38]">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Masukkan deskripsi SKP"
                rows={4}
                className="w-full px-[12px] py-[8px] border border-[#828282] rounded-[4px] text-[var(--text-base)] text-[#323232] placeholder:text-[#727272] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white resize-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#323232] mb-[8px]">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as EpicStatus })}
                className="w-full px-[12px] py-[8px] border border-[#828282] rounded-[4px] text-[var(--text-base)] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white"
              >
                <option value="belum_dimulai">Belum Dimulai</option>
                <option value="sedang_dikerjakan">Sedang Dikerjakan</option>
                <option value="selesai">Selesai</option>
                <option value="diblokir">Diblokir</option>
                <option value="dibatalkan">Dibatalkan</option>
              </select>
            </div>

            {/* Keterikatan SKP (Optional) */}
            <div>
              <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#323232] mb-[8px]">
                Keterikatan SKP (Opsional)
              </label>
              <select
                value={formData.sasaran_kinerja_id}
                onChange={(e) => setFormData({ ...formData, sasaran_kinerja_id: e.target.value })}
                className="w-full px-[12px] py-[8px] border border-[#828282] rounded-[4px] text-[var(--text-base)] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white"
              >
                <option value="">Tidak terkait</option>
                {sasaranKinerjas.map((sk) => (
                  <option key={sk.id} value={sk.id}>
                    {sk.code} - {sk.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-2 gap-[16px]">
              {/* Start Date */}
              <div>
                <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#323232] mb-[8px]">
                  Tanggal Mulai <span className="text-[#E02D38]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-[12px] py-[8px] pr-[40px] border border-[#828282] rounded-[4px] text-[var(--text-base)] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                  <Calendar className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#727272] pointer-events-none" />
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#323232] mb-[8px]">
                  Tanggal Target Selesai <span className="text-[#E02D38]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    className="w-full px-[12px] py-[8px] pr-[40px] border border-[#828282] rounded-[4px] text-[var(--text-base)] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                  <Calendar className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#727272] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-[12px] px-[24px] py-[20px] border-t border-[#EFEFEF] bg-[#f9f9f9]">
            <button
              type="button"
              onClick={onClose}
              className="px-[16px] py-[8px] border border-[#828282] text-[#323232] rounded-[4px] font-[var(--font-weight-medium)] hover:bg-[#EFEFEF] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[4px] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
            >
              Tambah Proyek Pendukung
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
