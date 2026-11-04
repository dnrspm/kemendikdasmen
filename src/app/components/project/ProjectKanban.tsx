import { useState } from 'react';
import { Plus, Search, User, Calendar, AlertCircle, MoreVertical, FolderKanban, LayoutGrid, Table } from 'lucide-react';
import { Organization } from '@/app/data/organizationData';
import { Task, getTasksByTeamId, TaskStatus, epics, biros, timKerjas } from '@/app/data/projectManagementData';
import { TaskDetailModal } from '@/app/components/project/TaskDetailModal';
import { CreateTaskModal } from '@/app/components/project/CreateTaskModal';
import { getPriorityLabel, getPriorityColor, getPriorityBgColor } from '@/app/utils/priorityUtils';
import { toast } from 'sonner';

type ViewMode = 'kanban' | 'table';

interface ProjectKanbanProps {
  organization: Organization;
  periodFilter: string;
}

export function ProjectKanban({ organization }: ProjectKanbanProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [localFilterBiro, setLocalFilterBiro] = useState<string>('all');
  const [localFilterTimKerja, setLocalFilterTimKerja] = useState<string>('all');
  const [filterEpic, setFilterEpic] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [tasks, setTasks] = useState<Task[]>(() => getTasksByTeamId(organization.id));

  // Handle create new task
  const handleCreateTask = (newTaskData: Partial<Task>) => {
    const newTask: Task = {
      id: newTaskData.id || `TK-${Date.now()}`,
      title: newTaskData.title || '',
      description: newTaskData.description || '',
      epic_id: newTaskData.epic_id || null,
      team_id: organization.id,
      biro_id: newTaskData.biro_id,
      tim_kerja_id: newTaskData.tim_kerja_id,
      status: newTaskData.status || 'belum_dikerjakan',
      assignee_id: newTaskData.assignee_id || `user-${Date.now()}`,
      assignee_name: newTaskData.assignee_name || '',
      reporter_id: newTaskData.reporter_id || 'current-user',
      reporter_name: newTaskData.reporter_name || 'Current User',
      priority: newTaskData.priority || 'medium',
      program_priority: newTaskData.program_priority,
      labels: newTaskData.labels || [],
      due_date: newTaskData.due_date || '',
      created_at: newTaskData.created_at || new Date().toISOString(),
      updated_at: newTaskData.updated_at || new Date().toISOString()
    };

    // Add to tasks list
    setTasks(prev => [...prev, newTask]);
    
    // Show success notification
    const statusLabels: Record<TaskStatus, string> = {
      pengusulan: 'Pengusulan Tugas',
      belum_dikerjakan: 'Belum Dikerjakan',
      sedang_dikerjakan: 'Sedang Dikerjakan',
      perlu_reviu: 'Perlu Tinjauan Atasan',
      selesai: 'Selesai',
      diblokir: 'Diblokir'
    };

    toast.success('Tugas berhasil dibuat!', {
      description: `Tugas "${newTask.title}" telah ditambahkan ke ${statusLabels[newTask.status]}`
    });
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAssignee = filterAssignee === 'all' || task.assignee_id === filterAssignee;
    const matchesBiro = localFilterBiro === 'all' || task.biro_id === localFilterBiro;
    const matchesTimKerja = localFilterTimKerja === 'all' || task.tim_kerja_id === localFilterTimKerja;
    const matchesEpic = filterEpic === 'all' || task.epic_id === filterEpic;

    return matchesSearch && matchesAssignee && matchesBiro && matchesTimKerja && matchesEpic;
  });

  // Group tasks by status (5 columns)
  const tasksByStatus = {
    pengusulan: filteredTasks.filter(t => t.status === 'pengusulan'),
    belum_dikerjakan: filteredTasks.filter(t => t.status === 'belum_dikerjakan'),
    sedang_dikerjakan: filteredTasks.filter(t => t.status === 'sedang_dikerjakan'),
    perlu_reviu: filteredTasks.filter(t => t.status === 'perlu_reviu'),
    selesai: filteredTasks.filter(t => t.status === 'selesai')
  };

  // Get unique assignees for filter
  const uniqueAssignees = Array.from(new Set(tasks.map(t => t.assignee_id)))
    .map(id => {
      const task = tasks.find(t => t.assignee_id === id);
      return { id, name: task?.assignee_name || '' };
    });

  const columns: { id: TaskStatus; label: string; color: string; bgColor: string }[] = [
    { id: 'pengusulan', label: 'Pengusulan Tugas', color: 'border-[#906CEF]', bgColor: 'bg-[#E9D5FF]' },
    { id: 'belum_dikerjakan', label: 'Belum Dikerjakan', color: 'border-[#828282]', bgColor: 'bg-[#E5E7EB]' },
    { id: 'sedang_dikerjakan', label: 'Sedang Dikerjakan', color: 'border-[#0954D9]', bgColor: 'bg-[#DBEAFE]' },
    { id: 'perlu_reviu', label: 'Perlu Tinjauan Atasan', color: 'border-[#F59E0B]', bgColor: 'bg-[#FED7AA]' },
    { id: 'selesai', label: 'Selesai', color: 'border-[#4CA375]', bgColor: 'bg-[#D1FAE5]' }
  ];

  return (
    <div className="space-y-[24px]">
      {/* Kanban Controls */}
      <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[20px]">
        <div className="flex flex-col gap-[16px]">
          {/* Top Row: Search, View Toggle, and Create Button */}
          <div className="flex gap-[16px]">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-[#727272]" />
              <input
                type="text"
                placeholder="Cari tugas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[40px] pl-[44px] pr-[16px] border border-[#828282] rounded-[4px] text-[var(--text-base)] text-[#323232] placeholder:text-[#727272] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-[4px] border border-[#828282] rounded-[4px] p-[4px]">
              <button
                onClick={() => setViewMode('kanban')}
                className={`flex items-center gap-[6px] px-[12px] py-[6px] rounded-[4px] text-[var(--text-sm)] font-[var(--font-weight-medium)] transition-colors ${
                  viewMode === 'kanban'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-[#656a6c] hover:bg-[#f9f9f9]'
                }`}
              >
                <LayoutGrid className="w-[16px] h-[16px]" />
                <span>Kanban</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-[6px] px-[12px] py-[6px] rounded-[4px] text-[var(--text-sm)] font-[var(--font-weight-medium)] transition-colors ${
                  viewMode === 'table'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-[#656a6c] hover:bg-[#f9f9f9]'
                }`}
              >
                <Table className="w-[16px] h-[16px]" />
                <span>Tabel</span>
              </button>
            </div>

            {/* Create Task Button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-[8px] px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[4px] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <Plus className="w-[20px] h-[20px]" />
              <span>Buat Tugas</span>
            </button>
          </div>

          {/* Bottom Row: All Filters */}
          <div className="space-y-[12px]">
            {/* Filter Unit Kerja, Tim Kerja, Pelaku - 1 baris */}
            <div className="grid grid-cols-3 gap-[12px]">
              {/* Filter Unit Kerja */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[var(--text-sm)] text-[#656a6c]">Unit Kerja:</label>
                <select
                  value={localFilterBiro}
                  onChange={(e) => {
                    setLocalFilterBiro(e.target.value);
                    setLocalFilterTimKerja('all'); // Reset Tim Kerja when Biro changes
                  }}
                  className="w-full px-[12px] py-[8px] border border-[#828282] rounded-[4px] text-[var(--text-sm)] text-[#323232] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                >
                  <option value="all">Semua Unit Kerja</option>
                  {biros.map(biro => (
                    <option key={biro.id} value={biro.id}>
                      {biro.short_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Tim Kerja */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[var(--text-sm)] text-[#656a6c]">Tim Kerja:</label>
                <select
                  value={localFilterTimKerja}
                  onChange={(e) => setLocalFilterTimKerja(e.target.value)}
                  className="w-full px-[12px] py-[8px] border border-[#828282] rounded-[4px] text-[var(--text-sm)] text-[#323232] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                >
                  <option value="all">Semua Tim Kerja</option>
                  {timKerjas
                    .filter(tk => localFilterBiro === 'all' || tk.biro_id === localFilterBiro)
                    .map(timKerja => (
                      <option key={timKerja.id} value={timKerja.id}>
                        {timKerja.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Filter Pelaku */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[var(--text-sm)] text-[#656a6c]">Pelaku:</label>
                <select
                  value={filterAssignee}
                  onChange={(e) => setFilterAssignee(e.target.value)}
                  className="w-full px-[12px] py-[8px] border border-[#828282] rounded-[4px] text-[var(--text-sm)] text-[#323232] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                >
                  <option value="all">Semua Pelaku</option>
                  {uniqueAssignees.map(assignee => (
                    <option key={assignee.id} value={assignee.id}>
                      {assignee.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter SKP - Full Width */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[var(--text-sm)] text-[#656a6c]">SKP:</label>
              <select
                value={filterEpic}
                onChange={(e) => setFilterEpic(e.target.value)}
                className="w-full px-[12px] py-[8px] border border-[#828282] rounded-[4px] text-[var(--text-sm)] text-[#323232] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                <option value="all">Semua SKP</option>
                {epics.map(epic => (
                  <option key={epic.id} value={epic.id}>
                    {epic.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* View Content */}
      {viewMode === 'kanban' ? (
        /* Kanban Board */
        <div className="flex gap-[16px] overflow-x-auto pb-[16px]">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasksByStatus[column.id as keyof typeof tasksByStatus]}
              onTaskClick={setSelectedTask}
              onCreateTask={() => setIsCreateModalOpen(true)}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <TaskTable
          tasks={filteredTasks}
          onTaskClick={setSelectedTask}
        />
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        teamId={organization.id}
      />
    </div>
  );
}

// Kanban Column Component
function KanbanColumn({
  column,
  tasks,
  onTaskClick,
  onCreateTask
}: {
  column: { id: TaskStatus; label: string; color: string; bgColor: string };
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onCreateTask: () => void;
}) {
  return (
    <div className="w-[340px] shrink-0">
      {/* Column Header */}
      <div className={`${column.bgColor} rounded-t-[8px] border-t-4 ${column.color} border-x border-[#ADADAD] p-[16px] sticky top-0 z-10`}>
        <div className="flex items-center justify-between mb-[12px]">
          <div className="flex items-center gap-[8px]">
            <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#323232]">
              {column.label}
            </h3>
            <span className="px-[8px] py-[2px] bg-[#EFEFEF] text-[var(--text-xs)] text-[#656a6c] font-[var(--font-weight-medium)] rounded-full">
              {tasks.length}
            </span>
          </div>
          <button 
            onClick={onCreateTask}
            className="p-[4px] hover:bg-[#f9f9f9] rounded-[4px] transition-colors"
            title="Buat tugas baru"
          >
            <Plus className="w-[16px] h-[16px] text-[#656a6c]" />
          </button>
        </div>
      </div>

      {/* Column Body */}
      <div className="bg-[#f9f9f9] border-x border-b border-[#ADADAD] rounded-b-[8px] p-[12px] min-h-[400px] max-h-[calc(100vh-400px)] overflow-y-auto space-y-[12px]">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
        ))}

        {tasks.length === 0 && (
          <div className="py-[32px] text-center">
            <p className="text-[var(--text-sm)] text-[#727272]">
              Tidak ada tugas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Task Card Component
function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const isOverdue = new Date(task.due_date) < new Date() && task.status !== 'selesai';

  // Get epic name
  const epic = epics.find(e => e.id === task.epic_id);
  const epicName = epic?.name || 'Tidak terkait SKP';

  return (
    <div
      className="bg-white rounded-[8px] border border-[#ADADAD] p-[16px] cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* Task Title */}
      <h4 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#323232] mb-[12px] line-clamp-2">
        {task.title}
      </h4>

      {/* SKP Tag */}
      <div className="flex items-center gap-[6px] mb-[12px]">
        <FolderKanban className="w-[14px] h-[14px] text-[#906CEF]" />
        <span className="text-[var(--text-xs)] text-[#656a6c] line-clamp-1">
          {epicName}
        </span>
      </div>

      {/* Task Footer */}
      <div className="flex items-center justify-between pt-[12px] border-t border-[#EFEFEF]">
        {/* Assignee(s) */}
        <div className="flex items-center gap-[8px]">
          <div className="w-[24px] h-[24px] rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-[14px] h-[14px] text-primary" />
          </div>
          {task.assignees && task.assignees.length > 0 ? (
            <div className="flex items-center gap-[4px]">
              <span className="text-[var(--text-xs)] text-[#656a6c]">
                {task.assignees[0].name.split(' ').slice(0, 2).join(' ')}
              </span>
              {task.assignees.length > 1 && (
                <span className="text-[var(--text-xs)] text-white bg-primary rounded-full px-[6px] py-[1px]">
                  +{task.assignees.length - 1}
                </span>
              )}
            </div>
          ) : (
            <span className="text-[var(--text-xs)] text-[#656a6c]">
              {task.assignee_name.split(' ').slice(0, 2).join(' ')}
            </span>
          )}
        </div>

        {/* Deadline */}
        <div className={`flex items-center gap-[4px] ${isOverdue ? 'text-[#E02D38]' : 'text-[#656a6c]'}`}>
          {isOverdue && <AlertCircle className="w-[14px] h-[14px]" />}
          <Calendar className="w-[14px] h-[14px]" />
          <span className="text-[var(--text-xs)]">
            {new Date(task.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
          </span>
        </div>
      </div>
    </div>
  );
}

// Task Table Component
function TaskTable({ tasks, onTaskClick }: { tasks: Task[]; onTaskClick: (task: Task) => void }) {
  const getStatusLabel = (status: TaskStatus) => {
    const labels: Record<TaskStatus, string> = {
      pengusulan: 'Pengusulan Tugas',
      belum_dikerjakan: 'Belum Dikerjakan',
      sedang_dikerjakan: 'Sedang Dikerjakan',
      perlu_reviu: 'Perlu Tinjauan Atasan',
      selesai: 'Selesai',
      diblokir: 'Diblokir'
    };
    return labels[status];
  };

  const getStatusColor = (status: TaskStatus) => {
    const colors: Record<TaskStatus, string> = {
      pengusulan: 'text-[#906CEF] bg-[#906CEF]/10',
      belum_dikerjakan: 'text-[#727272] bg-[#727272]/10',
      sedang_dikerjakan: 'text-[#0954D9] bg-[#0954D9]/10',
      perlu_reviu: 'text-[#F59E0B] bg-[#F59E0B]/10',
      selesai: 'text-[#4CA375] bg-[#4CA375]/10',
      diblokir: 'text-[#E02D38] bg-[#E02D38]/10'
    };
    return colors[status];
  };

  return (
    <div className="bg-white rounded-[8px] border border-[#ADADAD] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f9f9f9] border-b border-[#ADADAD]">
              <th className="px-[16px] py-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#323232]">
                ID Tugas
              </th>
              <th className="px-[16px] py-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#323232]">
                Judul
              </th>
              <th className="px-[16px] py-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#323232]">
                SKP
              </th>
              <th className="px-[16px] py-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#323232]">
                Status
              </th>
              <th className="px-[16px] py-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#323232]">
                Pelaku
              </th>
              <th className="px-[16px] py-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#323232]">
                Tenggat
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-[16px] py-[48px] text-center text-[var(--text-sm)] text-[#727272]">
                  Tidak ada tugas ditemukan
                </td>
              </tr>
            ) : (
              tasks.map(task => {
                const isOverdue = new Date(task.due_date) < new Date() && task.status !== 'selesai';
                const epic = epics.find(e => e.id === task.epic_id);
                const epicName = epic?.name || 'Tidak terkait SKP';

                return (
                  <tr
                    key={task.id}
                    onClick={() => onTaskClick(task)}
                    className="border-b border-[#EFEFEF] hover:bg-[#f9f9f9] cursor-pointer transition-colors"
                  >
                    <td className="px-[16px] py-[12px]">
                      <span className="text-[var(--text-sm)] text-[#656a6c]">{task.id}</span>
                    </td>
                    <td className="px-[16px] py-[12px]">
                      <span className="text-[var(--text-sm)] text-[#323232] font-[var(--font-weight-medium)]">
                        {task.title}
                      </span>
                    </td>
                    <td className="px-[16px] py-[12px]">
                      <div className="flex items-center gap-[6px]">
                        <FolderKanban className="w-[14px] h-[14px] text-[#906CEF]" />
                        <span className="text-[var(--text-sm)] text-[#656a6c] line-clamp-1 max-w-[200px]">
                          {epicName}
                        </span>
                      </div>
                    </td>
                    <td className="px-[16px] py-[12px]">
                      <span
                        className={`inline-flex px-[8px] py-[4px] rounded-[4px] text-[var(--text-xs)] font-[var(--font-weight-medium)] ${getStatusColor(task.status)}`}
                      >
                        {getStatusLabel(task.status)}
                      </span>
                    </td>
                    <td className="px-[16px] py-[12px]">
                      <div className="flex items-center gap-[8px]">
                        <div className="w-[24px] h-[24px] rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-[14px] h-[14px] text-primary" />
                        </div>
                        {task.assignees && task.assignees.length > 0 ? (
                          <div className="flex flex-wrap items-center gap-[4px]">
                            {task.assignees.map((assignee, idx) => (
                              <span key={assignee.id} className="text-[var(--text-sm)] text-[#656a6c]">
                                {assignee.name.split(' ').slice(0, 2).join(' ')}
                                {idx < task.assignees!.length - 1 && ','}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[var(--text-sm)] text-[#656a6c]">
                            {task.assignee_name.split(' ').slice(0, 2).join(' ')}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-[16px] py-[12px]">
                      <div className={`flex items-center gap-[4px] ${isOverdue ? 'text-[#E02D38]' : 'text-[#656a6c]'}`}>
                        {isOverdue && <AlertCircle className="w-[14px] h-[14px]" />}
                        <Calendar className="w-[14px] h-[14px]" />
                        <span className="text-[var(--text-sm)]">
                          {new Date(task.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}