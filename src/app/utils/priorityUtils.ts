import { ProgramPriority } from '@/app/data/projectManagementData';

export interface PriorityConfig {
  label: string;
  color: string;
  bgColor: string;
  sortOrder: number;
}

export const priorityConfig: Record<ProgramPriority, PriorityConfig> = {
  prioritas_presiden: {
    label: 'Prioritas Presiden',
    color: '#DF2121',
    bgColor: '#FEEDF2',
    sortOrder: 1
  },
  prioritas_nasional: {
    label: 'Prioritas Nasional',
    color: '#EDA62B',
    bgColor: '#FFEFD6',
    sortOrder: 2
  },
  prioritas_kementerian: {
    label: 'Prioritas Kementerian',
    color: '#0B5FEF',
    bgColor: '#E6F1FF',
    sortOrder: 3
  },
  non_prioritas: {
    label: 'Non-prioritas',
    color: '#808489',
    bgColor: '#F3F4F6',
    sortOrder: 4
  }
};

export function getPriorityConfig(priority: ProgramPriority): PriorityConfig {
  return priorityConfig[priority];
}

export function getPriorityLabel(priority?: ProgramPriority): string {
  if (!priority) return '';
  return priorityConfig[priority].label;
}

export function getPriorityColor(priority?: ProgramPriority): string {
  if (!priority) return '#808489';
  return priorityConfig[priority].color;
}

export function getPriorityBgColor(priority?: ProgramPriority): string {
  if (!priority) return '#F3F4F6';
  return priorityConfig[priority].bgColor;
}

// Status translations
export const statusLabels = {
  pengusulan: 'Pengusulan Tugas',
  belum_dikerjakan: 'Belum Dikerjakan',
  sedang_dikerjakan: 'Sedang Dikerjakan',
  perlu_reviu: 'Perlu Tinjauan Atasan',
  selesai: 'Selesai',
  diblokir: 'Diblokir',
  belum_dimulai: 'Belum Dimulai',
  dibatalkan: 'Dibatalkan'
};

export function getStatusLabel(status: string): string {
  return statusLabels[status as keyof typeof statusLabels] || status;
}

export const statusColors = {
  pengusulan: '#906CEF',
  belum_dikerjakan: '#808489',
  belum_dimulai: '#808489',
  sedang_dikerjakan: '#0B5FEF',
  perlu_reviu: '#FD9400',
  selesai: '#4CA375',
  diblokir: '#DF2121',
  dibatalkan: '#727272'
};

export function getStatusColor(status: string): string {
  return statusColors[status as keyof typeof statusColors] || '#808489';
}
