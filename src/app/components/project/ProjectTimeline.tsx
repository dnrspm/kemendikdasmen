import { Calendar, ChevronRight, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Organization } from '@/app/data/organizationData';
import { tasks, epics, getTasksByTeamId, Epic, Task } from '@/app/data/projectManagementData';
import { getPriorityLabel, getPriorityColor, getPriorityBgColor, getStatusLabel, getStatusColor } from '@/app/utils/priorityUtils';

interface ProjectTimelineProps {
  organization: Organization;
  level: 'sekretariat' | 'unit-utama' | 'unit-kerja' | 'tim-kerja';
  periodFilter: string;
  filterBiro: string;
  filterTimKerja: string;
}

interface TimelineEpic extends Epic {
  isExpanded: boolean;
  relatedTasks: Task[];
}

export function ProjectTimeline({ organization, level, filterBiro, filterTimKerja }: ProjectTimelineProps) {
  // Get relevant data based on level
  const allTasks = level === 'tim-kerja'
    ? getTasksByTeamId(organization.id)
    : tasks;

  // Apply Biro and Tim Kerja filters
  const relevantTasks = allTasks.filter(task => {
    const matchesBiro = filterBiro === 'all' || task.biro_id === filterBiro;
    const matchesTimKerja = filterTimKerja === 'all' || task.tim_kerja_id === filterTimKerja;
    return matchesBiro && matchesTimKerja;
  });

  const relevantEpics = level === 'tim-kerja'
    ? epics.filter(e => e.owner_org_id === organization.id)
    : epics;

  // Group tasks by epic
  const [expandedEpics, setExpandedEpics] = useState<Set<string>>(new Set());

  const epicsWithTasks: TimelineEpic[] = relevantEpics.map(epic => ({
    ...epic,
    isExpanded: expandedEpics.has(epic.id),
    relatedTasks: relevantTasks.filter(task => task.epic_id === epic.id)
  }));

  const toggleEpic = (epicId: string) => {
    const newExpanded = new Set(expandedEpics);
    if (newExpanded.has(epicId)) {
      newExpanded.delete(epicId);
    } else {
      newExpanded.add(epicId);
    }
    setExpandedEpics(newExpanded);
  };

  // Calculate date range for timeline
  const allDates = [
    ...relevantEpics.flatMap(e => [new Date(e.start_date), new Date(e.due_date)]),
    ...relevantTasks.flatMap(t => [
      new Date(t.start_date || t.created_at),
      new Date(t.due_date)
    ])
  ];

  const minDate = allDates.length > 0
    ? new Date(Math.min(...allDates.map(d => d.getTime())))
    : new Date();
  const maxDate = allDates.length > 0
    ? new Date(Math.max(...allDates.map(d => d.getTime())))
    : new Date();

  // Generate month labels (12 months from now by default)
  const timelineStart = new Date();
  timelineStart.setMonth(timelineStart.getMonth() - 1);
  const timelineEnd = new Date();
  timelineEnd.setMonth(timelineEnd.getMonth() + 11);

  const monthLabels = generateMonthLabels(timelineStart, timelineEnd);
  const totalDays = Math.ceil((timelineEnd.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-[24px]">
      {/* Timeline Header */}
      <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px]">
        <div className="flex items-center justify-between mb-[16px]">
          <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90">
            Tampilan Linimasa
          </h2>
          <div className="flex items-center gap-[12px]">
            <button className="px-[12px] py-[6px] text-[var(--text-sm)] text-sd-gray-60 hover:text-primary transition-colors">
              Bulan
            </button>
            <button className="px-[12px] py-[6px] text-[var(--text-sm)] text-sd-gray-60 hover:text-primary transition-colors">
              Minggu
            </button>
            <button className="px-[12px] py-[6px] text-[var(--text-sm)] text-primary font-[var(--font-weight-medium)]">
              Hari Ini
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-[24px] text-[var(--text-sm)]">
          <div className="flex items-center gap-[8px]">
            <div className="w-[16px] h-[8px] bg-[#906CEF] rounded-[2px]" />
            <span className="text-sd-gray-60">SKP</span>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="w-[16px] h-[8px] bg-primary rounded-[2px]" />
            <span className="text-sd-gray-60">Tugas</span>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="w-[16px] h-[8px] bg-sd-success-border rounded-[2px]" />
            <span className="text-sd-gray-60">Selesai</span>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="w-[16px] h-[8px] bg-sd-red-60 rounded-[2px]" />
            <span className="text-sd-gray-60">Terlambat</span>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="bg-white rounded-[8px] border border-sd-gray-30 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* Timeline Header - Months */}
            <div className="flex border-b border-sd-badge-neutral bg-sd-gray-0">
              <div className="w-[400px] p-[16px] border-r border-sd-badge-neutral">
                <span className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-60">
                  SKP / Tugas
                </span>
              </div>
              <div className="flex-1 flex">
                {monthLabels.map((month, index) => (
                  <div
                    key={index}
                    className="flex-1 p-[16px] text-center border-r border-sd-badge-neutral last:border-r-0"
                  >
                    <span className="text-[var(--text-xs)] font-[var(--font-weight-medium)] text-sd-gray-60">
                      {month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Rows */}
            <div>
              {epicsWithTasks.map((epic) => (
                <div key={epic.id}>
                  {/* Epic Row */}
                  <div className="flex border-b border-sd-badge-neutral hover:bg-sd-gray-0 transition-colors">
                    <div className="w-[400px] p-[16px] border-r border-sd-badge-neutral">
                      <button
                        onClick={() => toggleEpic(epic.id)}
                        className="flex items-start gap-[8px] w-full text-left"
                      >
                        {epic.relatedTasks.length > 0 && (
                          <span className="mt-[2px]">
                            {expandedEpics.has(epic.id) ? (
                              <ChevronDown className="w-[16px] h-[16px] text-sd-gray-60" />
                            ) : (
                              <ChevronRight className="w-[16px] h-[16px] text-sd-gray-60" />
                            )}
                          </span>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-[8px] mb-[4px]">
                            <span className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90">
                              {epic.name}
                            </span>
                            {epic.program_priority && (
                              <span
                                className="px-[8px] py-[2px] rounded-[4px] text-[var(--text-xs)] font-[var(--font-weight-medium)]"
                                style={{
                                  backgroundColor: getPriorityBgColor(epic.program_priority),
                                  color: getPriorityColor(epic.program_priority)
                                }}
                              >
                                {getPriorityLabel(epic.program_priority)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-[8px] text-[var(--text-xs)] text-sd-gray-60">
                            <span
                              className="px-[6px] py-[2px] rounded-[4px]"
                              style={{
                                backgroundColor: `${getStatusColor(epic.status)}15`,
                                color: getStatusColor(epic.status)
                              }}
                            >
                              {getStatusLabel(epic.status)}
                            </span>
                            <span>{epic.progress}%</span>
                            {epic.relatedTasks.length > 0 && (
                              <span>• {epic.relatedTasks.length} tugas</span>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="flex-1 relative">
                      <TimelineBar
                        startDate={epic.start_date}
                        endDate={epic.due_date}
                        status={epic.status}
                        type="epic"
                        timelineStart={timelineStart}
                        totalDays={totalDays}
                        progress={epic.progress}
                      />
                    </div>
                  </div>

                  {/* Task Rows (when expanded) */}
                  {expandedEpics.has(epic.id) && epic.relatedTasks.map((task) => (
                    <div key={task.id} className="flex border-b border-sd-badge-neutral hover:bg-sd-gray-0 transition-colors bg-sd-gray-0">
                      <div className="w-[400px] p-[16px] pl-[56px] border-r border-sd-badge-neutral">
                        <div className="flex items-center gap-[8px] mb-[4px]">
                          <span className="text-[var(--text-sm)] text-sd-gray-90">
                            {task.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-[8px] text-[var(--text-xs)] text-sd-gray-60">
                          <span
                            className="px-[6px] py-[2px] rounded-[4px]"
                            style={{
                              backgroundColor: `${getStatusColor(task.status)}15`,
                              color: getStatusColor(task.status)
                            }}
                          >
                            {getStatusLabel(task.status)}
                          </span>
                          <span>• {task.assignee_name}</span>
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <TimelineBar
                          startDate={task.start_date || task.created_at.split('T')[0]}
                          endDate={task.due_date}
                          status={task.status}
                          type="task"
                          timelineStart={timelineStart}
                          totalDays={totalDays}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {epicsWithTasks.length === 0 && (
              <div className="py-[48px] text-center">
                <Calendar className="w-[48px] h-[48px] text-sd-gray-60 mx-auto mb-[16px]" />
                <p className="text-[var(--text-base)] text-sd-gray-60">
                  Belum ada SKP yang tersedia
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Timeline Bar Component
function TimelineBar({
  startDate,
  endDate,
  status,
  type,
  timelineStart,
  totalDays,
  progress
}: {
  startDate: string;
  endDate: string;
  status: string;
  type: 'epic' | 'task';
  timelineStart: Date;
  totalDays: number;
  progress?: number;
}) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  const startOffset = Math.max(0, Math.ceil((start.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24)));
  const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const todayOffset = Math.ceil((today.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));

  const isOverdue = status !== 'selesai' && end < today;
  const isCompleted = status === 'selesai';

  const leftPercent = (startOffset / totalDays) * 100;
  const widthPercent = (duration / totalDays) * 100;
  const todayPercent = (todayOffset / totalDays) * 100;

  let barColor = type === 'epic' ? '#906CEF' : 'var(--sd-blue-70)';
  if (isCompleted) barColor = 'var(--sd-success-border)';
  if (isOverdue) barColor = 'var(--sd-red-60)';

  return (
    <div className="relative h-full py-[20px]">
      {/* Today line */}
      {todayPercent >= 0 && todayPercent <= 100 && (
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-sd-red-60 z-10"
          style={{ left: `${todayPercent}%` }}
        />
      )}

      {/* Timeline bar */}
      <div
        className="absolute h-[24px] top-[16px] rounded-[4px] flex items-center justify-center"
        style={{
          left: `${leftPercent}%`,
          width: `${widthPercent}%`,
          backgroundColor: barColor,
          minWidth: '40px'
        }}
      >
        {progress !== undefined && type === 'epic' && (
          <span className="text-[var(--text-xs)] text-white font-[var(--font-weight-medium)] px-[8px]">
            {progress}%
          </span>
        )}
      </div>
    </div>
  );
}

// Helper function to generate month labels
function generateMonthLabels(startDate: Date, endDate: Date): string[] {
  const labels: string[] = [];
  const current = new Date(startDate);
  current.setDate(1);

  while (current <= endDate) {
    const monthName = current.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
    labels.push(monthName);
    current.setMonth(current.getMonth() + 1);
  }

  return labels;
}
