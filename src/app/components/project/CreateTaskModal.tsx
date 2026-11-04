import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { Task, TaskStatus, TaskPriority, epics, biros, timKerjas } from '@/app/data/projectManagementData';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Partial<Task>) => void;
  teamId: string;
}

interface TaskFormData {
  title: string;
  description: string;
  epic_id: string;
  biro_id: string;
  tim_kerja_id: string;
  status: TaskStatus;
  assignee_name: string;
  due_date: string;
  labels: string;
}

export function CreateTaskModal({ isOpen, onClose, onSubmit, teamId }: CreateTaskModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch
  } = useForm<TaskFormData>({
    defaultValues: {
      title: '',
      description: '',
      epic_id: '',
      biro_id: '',
      tim_kerja_id: '',
      status: 'pengusulan',
      assignee_name: '',
      due_date: '',
      labels: ''
    }
  });

  const selectedBiro = watch('biro_id');

  // Filter epics by team
  const teamEpics = epics.filter(epic => epic.owner_org_id === teamId);

  // Filter tim kerja by selected biro
  const filteredTimKerjas = selectedBiro && selectedBiro !== ''
    ? timKerjas.filter(tk => tk.biro_id === selectedBiro)
    : timKerjas;

  const handleFormSubmit = (data: TaskFormData) => {
    // Get epic details
    const selectedEpic = epics.find(e => e.id === data.epic_id);
    
    // Generate task ID (simple counter for demo)
    const taskId = `TK-${Math.floor(Math.random() * 10000)}`;
    
    // Create new task
    const newTask: Partial<Task> = {
      id: taskId,
      title: data.title,
      description: data.description,
      epic_id: data.epic_id || null,
      team_id: teamId,
      biro_id: data.biro_id || undefined,
      tim_kerja_id: data.tim_kerja_id || undefined,
      status: data.status,
      assignee_id: `user-${Math.floor(Math.random() * 100)}`,
      assignee_name: data.assignee_name,
      reporter_id: 'current-user',
      reporter_name: 'Current User',
      labels: data.labels ? data.labels.split(',').map(l => l.trim()) : [],
      due_date: data.due_date,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    onSubmit(newTask);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-[16px]">
      <div className="bg-white rounded-[8px] shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-sd-badge-neutral px-[24px] py-[20px] flex items-center justify-between">
          <h2 className="text-[var(--text-xl)] font-[var(--font-weight-semibold)] text-sd-gray-90">
            Buat Tugas Baru
          </h2>
          <button
            onClick={handleClose}
            className="p-[4px] hover:bg-sd-gray-0 rounded-[4px] transition-colors"
          >
            <X className="w-[20px] h-[20px] text-sd-gray-60" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-[24px] space-y-[20px]">
          {/* Judul Tugas */}
          <div className="space-y-[8px]">
            <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
              Judul Tugas <span className="text-sd-red-60">*</span>
            </label>
            <input
              {...register('title', { required: 'Judul tugas harus diisi' })}
              type="text"
              placeholder="Masukkan judul tugas..."
              className="w-full px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-base)] text-sd-gray-90 placeholder:text-sd-gray-60 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white"
            />
            {errors.title && (
              <div className="flex items-center gap-[4px] text-[var(--text-xs)] text-sd-red-60">
                <AlertCircle className="w-[14px] h-[14px]" />
                <span>{errors.title.message}</span>
              </div>
            )}
          </div>

          {/* Deskripsi */}
          <div className="space-y-[8px]">
            <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
              Deskripsi <span className="text-sd-red-60">*</span>
            </label>
            <textarea
              {...register('description', { required: 'Deskripsi harus diisi' })}
              placeholder="Deskripsikan tugas ini..."
              rows={4}
              className="w-full px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-base)] text-sd-gray-90 placeholder:text-sd-gray-60 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white resize-none"
            />
            {errors.description && (
              <div className="flex items-center gap-[4px] text-[var(--text-xs)] text-sd-red-60">
                <AlertCircle className="w-[14px] h-[14px]" />
                <span>{errors.description.message}</span>
              </div>
            )}
          </div>

          {/* Row: Biro & Tim Kerja */}
          <div className="grid grid-cols-2 gap-[16px]">
            {/* Biro */}
            <div className="space-y-[8px]">
              <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
                Biro <span className="text-sd-red-60">*</span>
              </label>
              <select
                {...register('biro_id', { required: 'Biro harus dipilih' })}
                className="w-full px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-base)] text-sd-gray-90 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                <option value="">Pilih Biro</option>
                {biros.map(biro => (
                  <option key={biro.id} value={biro.id}>
                    {biro.short_name}
                  </option>
                ))}
              </select>
              {errors.biro_id && (
                <div className="flex items-center gap-[4px] text-[var(--text-xs)] text-sd-red-60">
                  <AlertCircle className="w-[14px] h-[14px]" />
                  <span>{errors.biro_id.message}</span>
                </div>
              )}
            </div>

            {/* Tim Kerja */}
            <div className="space-y-[8px]">
              <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
                Tim Kerja <span className="text-sd-red-60">*</span>
              </label>
              <select
                {...register('tim_kerja_id', { required: 'Tim Kerja harus dipilih' })}
                className="w-full px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-base)] text-sd-gray-90 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                disabled={!selectedBiro}
              >
                <option value="">Pilih Tim Kerja</option>
                {filteredTimKerjas.map(timKerja => (
                  <option key={timKerja.id} value={timKerja.id}>
                    {timKerja.name}
                  </option>
                ))}
              </select>
              {errors.tim_kerja_id && (
                <div className="flex items-center gap-[4px] text-[var(--text-xs)] text-sd-red-60">
                  <AlertCircle className="w-[14px] h-[14px]" />
                  <span>{errors.tim_kerja_id.message}</span>
                </div>
              )}
              {!selectedBiro && (
                <p className="text-[var(--text-xs)] text-sd-gray-60">
                  Pilih biro terlebih dahulu
                </p>
              )}
            </div>
          </div>

          {/* Epic/SKP */}
          <div className="space-y-[8px]">
            <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
              SKP / Output Tujuan
            </label>
            <select
              {...register('epic_id')}
              className="w-full px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-base)] text-sd-gray-90 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            >
              <option value="">Tidak terkait SKP</option>
              {teamEpics.map(epic => (
                <option key={epic.id} value={epic.id}>
                  {epic.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="space-y-[8px]">
            <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
              Status <span className="text-sd-red-60">*</span>
            </label>
            <select
              {...register('status', { required: true })}
              className="w-full px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-base)] text-sd-gray-90 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            >
              <option value="pengusulan">Pengusulan Tugas</option>
              <option value="belum_dikerjakan">Belum Dikerjakan</option>
              <option value="sedang_dikerjakan">Sedang Dikerjakan</option>
              <option value="perlu_reviu">Perlu Tinjauan Atasan</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>

          {/* Pelaku Tugas */}
          <div className="space-y-[8px]">
            <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
              Pelaku Tugas <span className="text-sd-red-60">*</span>
            </label>
            <input
              {...register('assignee_name', { required: 'Pelaku tugas harus diisi' })}
              type="text"
              placeholder="Nama pelaku tugas..."
              className="w-full px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-base)] text-sd-gray-90 placeholder:text-sd-gray-60 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white"
            />
            {errors.assignee_name && (
              <div className="flex items-center gap-[4px] text-[var(--text-xs)] text-sd-red-60">
                <AlertCircle className="w-[14px] h-[14px]" />
                <span>{errors.assignee_name.message}</span>
              </div>
            )}
          </div>

          {/* Batas Waktu */}
          <div className="space-y-[8px]">
            <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
              Batas Waktu <span className="text-sd-red-60">*</span>
            </label>
            <div className="relative">
              <input
                {...register('due_date', { required: 'Batas waktu harus diisi' })}
                type="date"
                id="due_date_input"
                className="w-full px-[12px] py-[8px] pr-[40px] border border-sd-gray-50 rounded-[4px] text-[var(--text-base)] text-sd-gray-90 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <CalendarIcon
                className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-sd-gray-60 pointer-events-none"
              />
            </div>
            {errors.due_date && (
              <div className="flex items-center gap-[4px] text-[var(--text-xs)] text-sd-red-60">
                <AlertCircle className="w-[14px] h-[14px]" />
                <span>{errors.due_date.message}</span>
              </div>
            )}
          </div>

          {/* Labels */}
          <div className="space-y-[8px]">
            <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
              Label
            </label>
            <input
              {...register('labels')}
              type="text"
              placeholder="Pisahkan dengan koma (misal: design, urgent, review)"
              className="w-full px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-base)] text-sd-gray-90 placeholder:text-sd-gray-60 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white"
            />
            <p className="text-[var(--text-xs)] text-sd-gray-60">
              Masukkan label yang dipisahkan dengan koma
            </p>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-[12px] pt-[16px] border-t border-sd-badge-neutral">
            <button
              type="button"
              onClick={handleClose}
              className="px-[20px] py-[10px] border border-sd-gray-50 text-sd-gray-90 rounded-[4px] font-[var(--font-weight-medium)] hover:bg-sd-gray-0 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-[20px] py-[10px] bg-primary text-primary-foreground rounded-[4px] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity"
            >
              Buat Tugas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}