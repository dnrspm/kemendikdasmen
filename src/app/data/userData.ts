// User Data and Authentication System

export type UserRole = 'eselon-2' | 'tim-kerja' | 'working-level';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization_id: string;
  position: string;
  avatar_url?: string;
}

// Mock current user - in production this would come from authentication
export const currentUser: User = {
  id: 'user-001',
  name: 'Budi Santoso',
  email: 'budi.santoso@kemdikdasmen.go.id',
  role: 'working-level', // Change this to test different roles: 'eselon-2' | 'tim-kerja' | 'working-level'
  organization_id: 'sekretariat-jenderal',
  position: 'Staff Biro OSDM'
};

// Helper function to check if user has access to a specific feature
export function hasAccess(feature: string): boolean {
  const role = currentUser.role;

  const accessMatrix: Record<UserRole, string[]> = {
    'eselon-2': ['sasaran-program', 'sasaran-kinerja', 'skp', 'daftar-tugas'],
    'tim-kerja': ['sasaran-program', 'sasaran-kinerja', 'skp', 'daftar-tugas'],
    'working-level': ['sasaran-program', 'sasaran-kinerja', 'skp', 'daftar-tugas']
  };

  return accessMatrix[role]?.includes(feature) || false;
}

// Helper function to check if user can approve tasks
export function canApproveTask(): boolean {
  return currentUser.role === 'tim-kerja';
}

// Helper function to check if user can review tasks
export function canReviewTask(): boolean {
  return currentUser.role === 'tim-kerja';
}

// Helper function to get user role display name
export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    'eselon-2': 'Eselon 2',
    'tim-kerja': 'Ketua Tim Kerja',
    'working-level': 'Pegawai'
  };
  return roleNames[role];
}
