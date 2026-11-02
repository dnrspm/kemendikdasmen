import { X, TrendingUp, User, Users, Link } from 'lucide-react';
import { Epic, tasks } from '@/app/data/projectManagementData';

const PIC_NAMES: Record<string, string> = {
  'user-1': 'Budi Santoso',
  'user-2': 'Dewi Rahayu',
  'user-3': 'Ahmad Fauzi',
  'user-4': 'Sari Wulandari',
  'user-5': 'Rizki Pratama',
  'bpks-ketua-1': 'I Nyoman Sutiksena',
  'bpks-ketua-3': 'Siti Marfuah',
  'bpks-ketua-4': 'Veronica Marissa Vania',
  'bpks-ketua-5': 'Lukmanul Hakim',
  'user-perencanaan-1': 'Andika Putra',
  'user-perencanaan-2': 'Rina Sari',
  'user-perencanaan-3': 'Hendra Wijaya',
  'user-perencanaan-4': 'Nurhalimah',
  'user-pusdatin-7': 'Dian Pratiwi',
  'user-pusdatin-8': 'Fajar Setiawan',
  'user-pusdatin-9': 'Maya Kusuma',
  'user-pusdatin-10': 'Agus Supriyanto',
  'user-osdm-7': 'Wahyu Hidayat',
  'user-osdm-8': 'Fitri Handayani',
  'user-osdm-9': 'Bambang Sudarmawan',
  'user-osdm-10': 'Lestari Dewi',
  'pusdatin-ketua': 'Dr. Yudha Pramana',
};

function getTriwulan(dateStr: string): string {
  const month = new Date(dateStr).getMonth() + 1;
  return `Triwulan ${Math.ceil(month / 3)}`;
}

function formatTaskId(id: string): string {
  const digits = id.replace(/\D/g, '');
  if (!digits) return '0000001';
  return digits.padStart(7, '0').slice(-7);
}

function getTimKerja(project: Epic): string {
  if (project.owner_org_id.startsWith('tim-')) return project.owner_org_name;
  return project.tim_kerja_name || project.biro_name || '—';
}

interface ProjectDetailModalProps {
  project: Epic | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!isOpen || !project) return null;

  const getStatusLabel = (status: Epic['status']) => {
    const labels = {
      belum_dimulai: 'Belum Dimulai',
      sedang_dikerjakan: 'Sedang Dikerjakan',
      selesai: 'Selesai',
      diblokir: 'Diblokir',
      dibatalkan: 'Dibatalkan'
    };
    return labels[status];
  };

  const getStatusColor = (status: Epic['status']) => {
    const colors = {
      belum_dimulai: 'text-[#808489] bg-[#f9f9f9]',
      sedang_dikerjakan: 'text-[#0B5FEF] bg-[#0B5FEF]/10',
      selesai: 'text-[#4CA375] bg-[#4CA375]/10',
      diblokir: 'text-[#E02D38] bg-[#E02D38]/10',
      dibatalkan: 'text-[#656a6c] bg-[#EFEFEF]'
    };
    return colors[status];
  };

  const isOverdue = new Date(project.due_date) < new Date() && project.status !== 'selesai';

  // Get tasks related to this project
  const relatedTasks = tasks.filter(task => task.epic_id === project.id);

  const getTaskStatusColor = (status: string) => {
    const colors = {
      belum_dikerjakan: 'text-[#808489] bg-[#f9f9f9]',
      sedang_dikerjakan: 'text-[#0B5FEF] bg-[#0B5FEF]/10',
      selesai: 'text-[#4CA375] bg-[#4CA375]/10'
    };
    return colors[status as keyof typeof colors] || 'text-[#808489] bg-[#f9f9f9]';
  };

  const getTaskStatusLabel = (status: string) => {
    const labels = {
      belum_dikerjakan: 'Belum Dikerjakan',
      sedang_dikerjakan: 'Sedang Dikerjakan',
      selesai: 'Selesai'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-[16px]">
      <div className="bg-white rounded-[8px] shadow-xl w-full max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#EFEFEF]">
          <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-[#2f3031]">
            Detail SKP
          </h2>
          <button
            onClick={onClose}
            className="p-[4px] hover:bg-[#f9f9f9] rounded-[4px] transition-colors"
          >
            <X className="w-[20px] h-[20px] text-[#656a6c]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-[24px] py-[20px]">
          <div className="space-y-[20px]">
            {/* Title */}
            <h3 className="text-[var(--text-2xl)] font-[var(--font-weight-semibold)] text-[#2f3031]">
              {project.name}
            </h3>

            {/* Status + Periode */}
            <div className="grid grid-cols-2 gap-[16px]">
              <div>
                <p className="text-[var(--text-sm)] font-bold text-[#2f3031] mb-[8px]">Status</p>
                <span className={`inline-block px-[12px] py-[6px] rounded-[4px] text-[var(--text-sm)] font-[var(--font-weight-medium)] ${getStatusColor(project.status)}`}>
                  {getStatusLabel(project.status)}
                </span>
              </div>
              <div>
                <p className="text-[var(--text-sm)] font-bold text-[#2f3031] mb-[8px]">Periode</p>
                <p className="text-[var(--text-base)] text-[#656a6c]">{getTriwulan(project.start_date)}</p>
              </div>
            </div>

            {/* Tim Kerja + PIC */}
            <div className="grid grid-cols-2 gap-[16px]">
              <div>
                <p className="text-[var(--text-sm)] font-bold text-[#2f3031] mb-[6px]">Tim Kerja</p>
                <p className="text-[var(--text-base)] text-[#656a6c]">{getTimKerja(project)}</p>
              </div>
              <div>
                <p className="text-[var(--text-sm)] font-bold text-[#2f3031] mb-[6px]">PIC</p>
                <p className="text-[var(--text-base)] text-[#656a6c]">{project.pic_name || PIC_NAMES[project.created_by] || '—'}</p>
              </div>
            </div>

            {/* Deskripsi SKP */}
            <div>
              <p className="text-[var(--text-sm)] font-bold text-[#2f3031] mb-[6px]">Deskripsi SKP</p>
              <p className="text-[var(--text-base)] text-[#656a6c] leading-relaxed whitespace-pre-wrap">{project.description}</p>
            </div>

            {/* Terkait Sasaran Kinerja */}
            {project.sasaran_kinerja_name && (
              <div>
                <p className="text-[var(--text-sm)] font-bold text-[#2f3031] mb-[6px]">Terkait Sasaran Kinerja</p>
                <p className="text-[var(--text-base)] text-[#656a6c]">{project.sasaran_kinerja_name}</p>
              </div>
            )}

            {/* Progress */}
            <div>
              <p className="text-[var(--text-sm)] font-bold text-[#2f3031] mb-[8px]">Progress</p>
              <div className="flex items-center gap-[8px] mb-[8px]">
                <TrendingUp className="w-[16px] h-[16px] text-primary" />
                <span className="text-[var(--text-base)] text-[#2f3031]">{project.progress}% selesai</span>
              </div>
              <div className="w-full h-[8px] bg-[#EFEFEF] rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
              </div>
            </div>

            {/* Tugas Terkait */}
            <div>
              <div className="flex items-center justify-between mb-[12px]">
                <p className="text-[var(--text-sm)] font-bold text-[#2f3031]">Tugas Terkait</p>
                <span className="px-[8px] py-[2px] bg-[#EFEFEF] text-[var(--text-xs)] text-[#656a6c] font-[var(--font-weight-medium)] rounded-full">
                  {relatedTasks.length}
                </span>
              </div>

              {relatedTasks.length > 0 ? (
                <div className="space-y-[12px]">
                  {relatedTasks.map(task => (
                    <div key={task.id} className="p-[16px] bg-[#f9f9f9] border border-[#EFEFEF] rounded-[8px]">
                      <div className="flex items-start justify-between gap-[12px]">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[4px]">
                            {task.title}
                          </h4>
                          <p className="text-[var(--text-sm)] text-[#808489]">#{formatTaskId(task.id)}</p>
                        </div>
                        <span className={`inline-block px-[10px] py-[4px] rounded-[4px] text-[var(--text-sm)] font-[var(--font-weight-medium)] whitespace-nowrap shrink-0 ${getTaskStatusColor(task.status)}`}>
                          {getTaskStatusLabel(task.status)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-[12px] pt-[12px] border-t border-[#EFEFEF]">
                        <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-[#656a6c]">
                          <User className="w-[14px] h-[14px] shrink-0" />
                          <span>{task.assignee_name}</span>
                        </div>
                        <span className="text-[var(--text-sm)] text-[#656a6c]">{getTriwulan(task.due_date)}</span>
                        <a
                          href={task.bukti_dukung_url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-[4px] text-[var(--text-sm)] text-primary hover:underline"
                          onClick={e => { if (!task.bukti_dukung_url) e.preventDefault(); }}
                        >
                          <Link className="w-[14px] h-[14px] shrink-0" />
                          <span>Cek Bukti Dukung</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-[24px] bg-[#f9f9f9] border border-[#EFEFEF] rounded-[8px] text-center">
                  <p className="text-[var(--text-sm)] text-[#808489]">Tidak ada tugas terkait dengan SKP ini</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
