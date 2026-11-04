import { useState } from 'react';
import { FolderKanban, User, Users } from 'lucide-react';
import { Organization } from '@/app/data/organizationData';
import { Epic, epics, biros, timKerjas } from '@/app/data/projectManagementData';
import { ProjectDetailModal } from '@/app/components/project/ProjectDetailModal';

interface ProjectListProps {
  organization: Organization;
  periodFilter: string;
  initialFilters?: {
    epicId?: string;
    biroId?: string;
  };
}

// Map created_by IDs to human-readable PIC names
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

function getTimKerja(project: Epic): string {
  // If owner_org_id is a tim-* entry, use owner_org_name as tim kerja label
  if (project.owner_org_id.startsWith('tim-')) {
    return project.owner_org_name;
  }
  return project.tim_kerja_name || project.biro_name || '—';
}

export function ProjectList({ organization, initialFilters }: ProjectListProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Epic | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [localFilterBiro, setLocalFilterBiro] = useState<string>(initialFilters?.biroId || 'biro-osdm');
  const [filterTimKerja, setFilterTimKerja] = useState<string>('all');
  const [filterEpic, setFilterEpic] = useState<string>(initialFilters?.epicId || 'all');

  // Include epics where owner_org_id matches, OR where the epic's biro belongs to this org
  const orgProjects = epics.filter(epic =>
    epic.owner_org_id === organization.id ||
    (epic.biro_id && biros.find(b => b.id === epic.biro_id)?.parent_org_id === organization.id)
  ).filter((epic, idx, arr) => arr.findIndex(e => e.id === epic.id) === idx);

  const matchTimKerja = (epic: Epic, filterVal: string) =>
    filterVal === 'all' || epic.tim_kerja_id === filterVal || epic.owner_org_id === filterVal;

  const filteredProjects = orgProjects.filter(project => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesBiro = localFilterBiro === 'all' || project.biro_id === localFilterBiro;
    const matchesTimKerja = matchTimKerja(project, filterTimKerja);
    const matchesEpic = filterEpic === 'all' || project.id === filterEpic;
    return matchesStatus && matchesBiro && matchesTimKerja && matchesEpic;
  });

  const countForStatus = (status: string) => orgProjects.filter(p => {
    const matchesBiro = localFilterBiro === 'all' || p.biro_id === localFilterBiro;
    const matchesTimKerja = matchTimKerja(p, filterTimKerja);
    const matchesEpic = filterEpic === 'all' || p.id === filterEpic;
    return p.status === status && matchesBiro && matchesTimKerja && matchesEpic;
  }).length;

  const countAll = orgProjects.filter(p => {
    const matchesBiro = localFilterBiro === 'all' || p.biro_id === localFilterBiro;
    const matchesTimKerja = matchTimKerja(p, filterTimKerja);
    const matchesEpic = filterEpic === 'all' || p.id === filterEpic;
    return matchesBiro && matchesTimKerja && matchesEpic;
  }).length;

  return (
    <div className="space-y-[24px]">
      {/* Controls */}
      <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
        <div className="flex flex-col gap-[16px]">
          {/* Filter Unit Kerja & Tim Kerja */}
          <div className="grid grid-cols-2 gap-[12px]">
            <div className="flex flex-col gap-[8px]">
              <label className="text-[var(--text-sm)] text-sd-gray-60">Unit Kerja:</label>
              <select
                value="biro-osdm"
                onChange={() => {}}
                disabled
                className="w-full px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-sm)] text-sd-gray-60 bg-sd-gray-0 cursor-not-allowed opacity-70 outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
              >
                <option value="biro-osdm">Biro OSDM</option>
              </select>
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className="text-[var(--text-sm)] text-sd-gray-60">Tim Kerja:</label>
              <select
                value={filterTimKerja}
                onChange={(e) => setFilterTimKerja(e.target.value)}
                className="w-full px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-sm)] text-sd-gray-90 bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
              >
                <option value="all">Semua Tim Kerja</option>
                {localFilterBiro === 'all' ? (
                  <option disabled>Pilih Unit Kerja terlebih dahulu</option>
                ) : (
                  timKerjas
                    .filter(tk => tk.biro_id === localFilterBiro)
                    .map(tk => (
                      <option key={tk.id} value={tk.id}>{tk.name}</option>
                    ))
                )}
              </select>
            </div>
          </div>

          {/* Filter SKP */}
          <div className="flex flex-col gap-[8px]">
            <label className="text-[var(--text-sm)] text-sd-gray-60">SKP:</label>
            <select
              value={filterEpic}
              onChange={(e) => setFilterEpic(e.target.value)}
              className="w-full px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] text-[var(--text-sm)] text-sd-gray-90 bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
            >
              <option value="all">Semua SKP</option>
              {orgProjects.map(epic => (
                <option key={epic.id} value={epic.id}>{epic.name}</option>
              ))}
            </select>
          </div>

          {/* Filter Status */}
          <div className="flex gap-[12px] flex-wrap">
            {([
              { value: 'all', label: `Semua (${countAll})` },
              { value: 'belum_dimulai', label: `Belum Dikerjakan (${countForStatus('belum_dimulai')})` },
              { value: 'sedang_dikerjakan', label: `Sedang Dikerjakan (${countForStatus('sedang_dikerjakan')})` },
              { value: 'selesai', label: `Selesai (${countForStatus('selesai')})` },
            ] as const).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilterStatus(value)}
                className={`px-[20px] py-[10px] rounded-[8px] border-2 text-[var(--text-base)] font-[var(--font-weight-medium)] transition-colors ${
                  filterStatus === value
                    ? 'border-sd-blue-70 text-sd-blue-70 bg-white'
                    : 'border-sd-gray-30 text-sd-gray-90 bg-white hover:border-sd-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {[...filteredProjects].sort((a, b) => {
          const picA = (a.pic_name || PIC_NAMES[a.created_by] || '').toLowerCase();
          const picB = (b.pic_name || PIC_NAMES[b.created_by] || '').toLowerCase();
          return picA.localeCompare(picB, 'id');
        }).map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => {
              setSelectedProject(project);
              setIsDetailModalOpen(true);
            }}
          />
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full bg-white rounded-[8px] border border-sd-gray-30 p-[40px] text-center">
            <FolderKanban className="w-[48px] h-[48px] mx-auto mb-[16px] text-sd-gray-60" />
            <p className="text-[var(--text-base)] text-sd-gray-60">Tidak ada SKP ditemukan</p>
          </div>
        )}
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
}

function statusFromProgress(progress: number): 'belum_dimulai' | 'sedang_dikerjakan' | 'selesai' {
  if (progress >= 100) return 'selesai';
  if (progress <= 0) return 'belum_dimulai';
  return 'sedang_dikerjakan';
}

function progressBarColor(progress: number): string {
  if (progress >= 100) return 'var(--sd-success-border)';
  if (progress <= 0) return 'var(--sd-warning-border)';
  return 'var(--sd-blue-70)';
}

function ProjectCard({ project, onClick }: { project: Epic; onClick: () => void }) {
  const derivedStatus = statusFromProgress(project.progress);

  const getStatusLabel = (status: ReturnType<typeof statusFromProgress>) => {
    const labels = {
      belum_dimulai: 'Belum Dikerjakan',
      sedang_dikerjakan: 'Sedang Dikerjakan',
      selesai: 'Selesai',
    };
    return labels[status];
  };

  const getStatusColor = (status: ReturnType<typeof statusFromProgress>) => {
    const colors = {
      belum_dimulai: 'text-sd-warning-border bg-sd-warning-border/10',
      sedang_dikerjakan: 'text-sd-blue-70 bg-sd-blue-70/10',
      selesai: 'text-sd-success-border bg-sd-success-border/10',
    };
    return colors[status];
  };

  const picName = project.pic_name || PIC_NAMES[project.created_by] || '—';
  const timKerjaName = getTimKerja(project);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start gap-[12px] mb-[16px]">
        <div className="w-[40px] h-[40px] rounded-[8px] bg-[#906CEF]/10 flex items-center justify-center shrink-0">
          <FolderKanban className="w-[20px] h-[20px] text-[#906CEF]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90 line-clamp-2">
            {project.name}
          </h3>
        </div>
      </div>

      {/* PIC & Tim Kerja */}
      <div className="flex flex-col gap-[6px] mb-[16px]">
        <div className="flex items-center gap-[6px]">
          <User className="w-[14px] h-[14px] text-sd-gray-60 shrink-0" />
          <span className="text-[var(--text-xs)] text-sd-gray-60">PIC:</span>
          <span className="text-[var(--text-xs)] text-sd-gray-90 font-[var(--font-weight-medium)]">{picName}</span>
        </div>
        <div className="flex items-center gap-[6px]">
          <Users className="w-[14px] h-[14px] text-sd-gray-60 shrink-0" />
          <span className="text-[var(--text-xs)] text-sd-gray-60">Tim Kerja:</span>
          <span className="text-[var(--text-xs)] text-sd-gray-90 font-[var(--font-weight-medium)] line-clamp-1">{timKerjaName}</span>
        </div>
      </div>

      {/* Status */}
      <div className="mb-[16px]">
        <span className={`px-[8px] py-[4px] rounded-[4px] text-[var(--text-xs)] font-[var(--font-weight-medium)] ${getStatusColor(derivedStatus)}`}>
          {getStatusLabel(derivedStatus)}
        </span>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between mb-[8px]">
          <span className="text-[var(--text-xs)] text-sd-gray-60">Progress</span>
          <span className="text-[var(--text-xs)] font-[var(--font-weight-medium)] text-sd-gray-90">{project.progress}%</span>
        </div>
        <div className="w-full h-[6px] bg-sd-badge-neutral rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${project.progress}%`, backgroundColor: progressBarColor(project.progress) }}
          />
        </div>
      </div>
    </div>
  );
}
