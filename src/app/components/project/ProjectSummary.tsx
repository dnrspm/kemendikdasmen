import { Users, CheckCircle2, Clock, AlertCircle, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Organization } from '@/app/data/organizationData';
import {
  epics,
  tasks,
  getTasksByTeamId,
  calculateWorkloadMetrics,
  Epic,
  Task,
  ProgramPriority
} from '@/app/data/projectManagementData';
import { getPriorityConfig, getStatusLabel, getStatusColor, getPriorityLabel } from '@/app/utils/priorityUtils';

interface ProjectSummaryProps {
  organization: Organization;
  level: 'sekretariat' | 'unit-utama' | 'unit-kerja' | 'tim-kerja';
  periodFilter: string;
}

export function ProjectSummary({ organization, level }: ProjectSummaryProps) {
  // Get relevant data based on level
  const getRelevantData = () => {
    if (level === 'tim-kerja') {
      const teamTasks = getTasksByTeamId(organization.id);
      const teamEpics = epics.filter(e => e.owner_org_id === organization.id);
      return { tasks: teamTasks, epics: teamEpics };
    } else {
      return { tasks, epics };
    }
  };

  const { tasks: allTasks, epics: relevantEpics } = getRelevantData();

  // Use all tasks for metrics (no filtering by Biro/Tim Kerja in Rangkuman)
  const relevantTasks = allTasks;
  const metrics = calculateWorkloadMetrics(relevantTasks);

  // Calculate % selesai minggu ini
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
  endOfWeek.setHours(23, 59, 59, 999);

  const tasksCompletedThisWeek = relevantTasks.filter(t => {
    if (!t.completed_date) return false;
    const completedDate = new Date(t.completed_date);
    return completedDate >= startOfWeek && completedDate <= endOfWeek;
  }).length;

  const tasksDueThisWeek = relevantTasks.filter(t => {
    const dueDate = new Date(t.due_date);
    return dueDate >= startOfWeek && dueDate <= endOfWeek;
  }).length;

  const percentCompletedThisWeek = tasksDueThisWeek > 0
    ? Math.round((tasksCompletedThisWeek / tasksDueThisWeek) * 100)
    : 0;

  // Group epics by priority
  const groupedEpics: Record<ProgramPriority, Epic[]> = {
    prioritas_presiden: [],
    prioritas_nasional: [],
    prioritas_kementerian: [],
    non_prioritas: []
  };

  relevantEpics.forEach(epic => {
    const priority = epic.program_priority || 'non_prioritas';
    groupedEpics[priority].push(epic);
  });

  const priorityOrder: ProgramPriority[] = [
    'prioritas_presiden',
    'prioritas_nasional',
    'prioritas_kementerian',
    'non_prioritas'
  ];

  return (
    <div className="space-y-[32px]">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[16px]">
        <SummaryCard
          icon={<Users className="w-[24px] h-[24px]" />}
          title="Total Tugas"
          value={metrics.total.toString()}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <SummaryCard
          icon={<Clock className="w-[24px] h-[24px]" />}
          title="Sedang Dikerjakan"
          value={metrics.inProgress.toString()}
          iconBg="bg-sd-blue-70/10"
          iconColor="text-sd-blue-70"
        />
        <SummaryCard
          icon={<CheckCircle2 className="w-[24px] h-[24px]" />}
          title="Selesai"
          value={metrics.completed.toString()}
          iconBg="bg-sd-success-border/10"
          iconColor="text-sd-success-border"
        />
        <SummaryCard
          icon={<AlertCircle className="w-[24px] h-[24px]" />}
          title="Terlambat"
          value={metrics.overdue.toString()}
          iconBg="bg-sd-red-60/10"
          iconColor="text-sd-red-60"
        />
        <SummaryCard
          icon={<TrendingUp className="w-[24px] h-[24px]" />}
          title="% Tugas Selesai Minggu Ini"
          value={`${percentCompletedThisWeek}%`}
          subtitle={`${tasksCompletedThisWeek} dari ${tasksDueThisWeek} tugas`}
          iconBg="bg-[#906CEF]/10"
          iconColor="text-[#906CEF]"
        />
      </div>

      {/* Project Progress Section - Grouped by Priority */}
      <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
        <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[24px]">
          Progres SKP
        </h2>

        <div className="space-y-[24px]">
          {priorityOrder.map(priority => {
            const epicsInPriority = groupedEpics[priority];
            if (epicsInPriority.length === 0) return null;

            return (
              <PriorityGroup
                key={priority}
                priority={priority}
                epics={epicsInPriority}
              />
            );
          })}
        </div>

        {relevantEpics.length === 0 && (
          <div className="py-[48px] text-center">
            <TrendingUp className="w-[48px] h-[48px] text-sd-gray-60 mx-auto mb-[16px]" />
            <p className="text-[var(--text-base)] text-sd-gray-60">
              Belum ada SKP yang tersedia
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Priority Group Component
function PriorityGroup({ priority, epics }: { priority: ProgramPriority; epics: Epic[] }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const config = getPriorityConfig(priority);

  return (
    <div className="border border-sd-gray-30 rounded-[8px] overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-[16px] hover:bg-sd-gray-0 transition-colors"
        style={{ borderLeftWidth: '4px', borderLeftColor: config.color }}
      >
        <div className="flex items-center gap-[12px]">
          <span
            className="px-[12px] py-[6px] rounded-[4px] text-[var(--text-sm)] font-[var(--font-weight-medium)]"
            style={{ backgroundColor: config.bgColor, color: config.color }}
          >
            {config.label}
          </span>
          <span className="text-[var(--text-sm)] text-sd-gray-60">
            {epics.length} SKP
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-[20px] h-[20px] text-sd-gray-60" />
        ) : (
          <ChevronDown className="w-[20px] h-[20px] text-sd-gray-60" />
        )}
      </button>

      {isExpanded && (
        <div className="p-[16px] pt-0 grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          {epics.map(epic => (
            <EpicCard key={epic.id} epic={epic} />
          ))}
        </div>
      )}
    </div>
  );
}

// Summary Card Component
function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  iconBg,
  iconColor
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
      <div className="flex items-center gap-[16px]">
        <div className={`w-[48px] h-[48px] rounded-[8px] ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div>
          <div className="text-[var(--text-3xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[4px]">
            {value}
          </div>
          <div className="text-[var(--text-sm)] text-sd-gray-60">{title}</div>
          {subtitle && (
            <div className="text-[var(--text-xs)] text-sd-gray-60 mt-[2px]">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Epic Card Component
function EpicCard({ epic }: { epic: Epic }) {
  const statusColor = getStatusColor(epic.status);
  const statusLabel = getStatusLabel(epic.status);

  return (
    <div className="border border-sd-badge-neutral rounded-[8px] p-[20px] hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-[12px]">
        <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-sd-gray-90 flex-1">
          {epic.name}
        </h3>
        <span
          className="px-[8px] py-[4px] rounded-[4px] text-[var(--text-xs)] font-[var(--font-weight-medium)]"
          style={{ backgroundColor: `${statusColor}15`, color: statusColor }}
        >
          {statusLabel}
        </span>
      </div>

      <p className="text-[var(--text-sm)] text-sd-gray-60 mb-[16px] line-clamp-2">
        {epic.description}
      </p>

      {epic.rhk_name && (
        <div className="mb-[12px] text-[var(--text-xs)] text-sd-gray-60">
          <span className="font-[var(--font-weight-medium)]">RHK:</span> {epic.rhk_name}
        </div>
      )}

      <div className="mb-[12px]">
        <div className="flex items-center justify-between mb-[8px]">
          <span className="text-[var(--text-sm)] text-sd-gray-60">Progres</span>
          <span className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
            {epic.progress}%
          </span>
        </div>
        <div className="w-full h-[8px] bg-sd-badge-neutral rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${epic.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-[var(--text-xs)] text-sd-gray-60">
        <span>{epic.owner_org_name}</span>
        <span>Batas: {new Date(epic.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
      </div>
    </div>
  );
}
