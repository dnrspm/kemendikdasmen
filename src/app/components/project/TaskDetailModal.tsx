import { buttonClass } from 'seragam-design-system';
import { useState } from 'react';
import { X, User, Calendar, Clock, MessageSquare, Activity, FolderKanban, Building2, Upload, FileText } from 'lucide-react';
import { Task, getCommentsByTaskId, getActivityLogsByEntityId, epics, biros, timKerjas } from '@/app/data/projectManagementData';
import { getPriorityLabel, getPriorityColor, getPriorityBgColor, getStatusLabel, getStatusColor } from '@/app/utils/priorityUtils';
import { toast } from 'sonner';

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetailModal({ task, onClose }: TaskDetailModalProps) {
  const [newNote, setNewNote] = useState('');
  const [currentStatus, setCurrentStatus] = useState(task.status);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadNotes, setUploadNotes] = useState('');

  const notes = getCommentsByTaskId(task.id);
  const activityLogs = getActivityLogsByEntityId(task.id);
  const epic = epics.find(e => e.id === task.epic_id);
  const biro = biros.find(b => b.id === task.biro_id);
  const timKerja = timKerjas.find(tk => tk.id === task.tim_kerja_id);

  const handleStatusChange = (newStatus: string) => {
    // Check if status requires upload
    if (newStatus === 'selesai' || newStatus === 'perlu_reviu') {
      setPendingStatus(newStatus);
      setShowUploadModal(true);
    } else {
      setCurrentStatus(newStatus as typeof task.status);
      toast.success('Status berhasil diubah');
    }
  };

  const handleApproveProposal = () => {
    setCurrentStatus('belum_dikerjakan');
    toast.success('Pengusulan tugas berhasil disetujui');
  };

  const handleApproveReview = () => {
    setCurrentStatus('selesai');
    toast.success('Tugas berhasil disetujui dan ditandai selesai');
  };

  // Mock evidence data - in real app this would come from API
  const mockEvidence = currentStatus === 'perlu_reviu' ? {
    fileName: 'Laporan_Monitoring_Q1_2026.pdf',
    fileSize: 2450,
    uploadedAt: '2026-05-10T16:30:00Z',
    notes: 'Laporan hasil monitoring kinerja pegawai periode Q1 2026 sudah lengkap dengan data analisis dan rekomendasi.'
  } : null;

  const handleUploadSubmit = () => {
    if (!uploadedFile) {
      toast.error('Silakan unggah bukti dukung terlebih dahulu');
      return;
    }

    // In real app, this would upload file and call API
    setCurrentStatus(pendingStatus as typeof task.status);
    setShowUploadModal(false);
    setUploadedFile(null);
    setUploadNotes('');
    setPendingStatus('');

    const statusLabel = pendingStatus === 'selesai' ? 'Selesai' : 'Perlu Tinjauan Atasan';
    toast.success(`Status berhasil diubah ke ${statusLabel} dengan bukti dukung`);
  };

  const handleUploadCancel = () => {
    setShowUploadModal(false);
    setUploadedFile(null);
    setUploadNotes('');
    setPendingStatus('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In real app, this would call an API
      setNewNote('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-[24px]" onClick={onClose}>
      <div
        className="bg-white rounded-[8px] shadow-lg w-full max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-[24px] border-b border-sd-badge-neutral">
          <div className="flex-1">
            <div className="flex items-center gap-[12px] mb-[8px]">
              <span className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-60">
                {task.id}
              </span>
              <span
                className="px-[8px] py-[4px] rounded-[4px] text-[var(--text-xs)] font-[var(--font-weight-medium)]"
                style={{
                  color: getStatusColor(currentStatus),
                  backgroundColor: `${getStatusColor(currentStatus)}15`
                }}
              >
                {getStatusLabel(currentStatus)}
              </span>
            </div>
            <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90">
              {task.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-[8px] hover:bg-sd-gray-0 rounded-[4px] transition-colors"
          >
            <X className="w-[20px] h-[20px] text-sd-gray-60" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-[24px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-[24px]">
              {/* Description */}
              <div>
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[12px]">
                  Deskripsi
                </h3>
                <p className="text-[var(--text-base)] text-sd-gray-60 leading-[1.6] whitespace-pre-line">
                  {task.description}
                </p>
              </div>

              {/* Informasi SKP & Organisasi */}
              <div className="border border-sd-badge-neutral rounded-[8px] p-[16px] space-y-[16px]">
                {/* SKP */}
                {epic && (
                  <div>
                    <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-sd-gray-60 mb-[8px]">
                      <FolderKanban className="w-[16px] h-[16px]" />
                      <span>SKP</span>
                    </div>
                    <div className="text-[var(--text-sm)] text-sd-gray-90 font-[var(--font-weight-medium)]">
                      {epic.name}
                    </div>
                  </div>
                )}

                {/* Tim Kerja */}
                {timKerja && (
                  <div>
                    <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-sd-gray-60 mb-[8px]">
                      <Building2 className="w-[16px] h-[16px]" />
                      <span>Tim Kerja</span>
                    </div>
                    <div className="text-[var(--text-sm)] text-sd-gray-90 font-[var(--font-weight-medium)]">
                      {timKerja.name}
                    </div>
                  </div>
                )}

                {/* Unit Kerja (Biro) */}
                {biro && (
                  <div>
                    <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-sd-gray-60 mb-[8px]">
                      <Building2 className="w-[16px] h-[16px]" />
                      <span>Unit Kerja</span>
                    </div>
                    <div className="text-[var(--text-sm)] text-sd-gray-90 font-[var(--font-weight-medium)]">
                      {biro.name}
                    </div>
                  </div>
                )}

                {/* Unit Utama */}
                <div>
                  <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-sd-gray-60 mb-[8px]">
                    <Building2 className="w-[16px] h-[16px]" />
                    <span>Unit Utama</span>
                  </div>
                  <div className="text-[var(--text-sm)] text-sd-gray-90 font-[var(--font-weight-medium)]">
                    Sekretariat Jenderal
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <div className="flex items-center gap-[8px] mb-[16px]">
                  <MessageSquare className="w-[20px] h-[20px] text-sd-gray-60" />
                  <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90">
                    Catatan Penting ({notes.length})
                  </h3>
                </div>

                <div className="space-y-[16px]">
                  {notes.map(note => (
                    <div key={note.id} className="border border-sd-badge-neutral rounded-[8px] p-[16px]">
                      <div className="flex items-center gap-[8px] mb-[8px]">
                        <div className="w-[32px] h-[32px] rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-[16px] h-[16px] text-primary" />
                        </div>
                        <div>
                          <div className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
                            {note.user_name}
                          </div>
                          <div className="text-[var(--text-xs)] text-sd-gray-60">
                            {new Date(note.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                      <p className="text-[var(--text-sm)] text-sd-gray-60 leading-[1.6]">
                        {note.content}
                      </p>
                    </div>
                  ))}

                  {notes.length === 0 && (
                    <div className="text-center py-[24px] text-[var(--text-sm)] text-sd-gray-60">
                      Belum ada catatan penting
                    </div>
                  )}

                  {/* Add Note */}
                  <div className="border border-sd-badge-neutral rounded-[8px] p-[16px]">
                    <textarea
                      placeholder="Tambahkan catatan penting..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="w-full min-h-[80px] p-[12px] border border-sd-gray-50 rounded-[4px] text-[var(--text-sm)] text-sd-gray-90 placeholder:text-sd-gray-60 resize-none outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                    />
                    <div className="flex items-center justify-end gap-[8px] mt-[12px]">
                      <button
                        onClick={() => setNewNote('')}
                        className="px-[16px] py-[8px] text-[var(--text-sm)] text-sd-gray-60 hover:text-primary transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleAddNote}
                        className={buttonClass('ultimate', 'md')}
                      >
                        Kirim Catatan
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div>
                <div className="flex items-center gap-[8px] mb-[16px]">
                  <Activity className="w-[20px] h-[20px] text-sd-gray-60" />
                  <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90">
                    Linimasa Aktivitas
                  </h3>
                </div>

                <div className="space-y-[12px]">
                  {activityLogs.map(log => (
                    <div key={log.id} className="flex gap-[12px]">
                      <div className="w-[8px] h-[8px] rounded-full bg-primary mt-[6px] shrink-0" />
                      <div className="flex-1">
                        <div className="text-[var(--text-sm)] text-sd-gray-90">
                          <span className="font-[var(--font-weight-medium)]">{log.user_name}</span>
                          {' '}{log.details}
                        </div>
                        <div className="text-[var(--text-xs)] text-sd-gray-60 mt-[2px]">
                          {new Date(log.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {activityLogs.length === 0 && (
                    <div className="text-center py-[24px] text-[var(--text-sm)] text-sd-gray-60">
                      Belum ada aktivitas
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-[24px]">
              {/* Approve Button for Pengusulan */}
              {currentStatus === 'pengusulan' && (
                <div className="border border-sd-badge-neutral rounded-[8px] p-[16px] bg-[#906CEF]/5">
                  <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[12px]">
                    Persetujuan Tugas
                  </h3>
                  <p className="text-[var(--text-sm)] text-sd-gray-60 mb-[16px]">
                    Tugas ini menunggu persetujuan Anda. Setujui untuk memindahkan ke status "Belum Dikerjakan".
                  </p>
                  <button
                    onClick={handleApproveProposal}
                    className={buttonClass('ultimate', 'md', true)}
                  >
                    Setujui Pengusulan
                  </button>
                </div>
              )}

              {/* Review Approval for Perlu Tinjauan Atasan */}
              {currentStatus === 'perlu_reviu' && mockEvidence && (
                <div className="border border-sd-badge-neutral rounded-[8px] p-[16px] bg-sd-yellow-30/5">
                  <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[12px]">
                    Tinjauan Bukti Tugas
                  </h3>
                  <p className="text-[var(--text-sm)] text-sd-gray-60 mb-[16px]">
                    Pegawai telah mengunggah bukti dukung penyelesaian tugas. Silakan tinjau sebelum menyetujui.
                  </p>

                  {/* Evidence File */}
                  <div className="mb-[16px] p-[12px] bg-white border border-sd-badge-neutral rounded-[6px]">
                    <div className="flex items-start gap-[12px]">
                      <div className="w-[40px] h-[40px] rounded-[6px] bg-sd-red-60/10 flex items-center justify-center shrink-0">
                        <FileText className="w-[20px] h-[20px] text-sd-red-60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[4px] truncate">
                          {mockEvidence.fileName}
                        </div>
                        <div className="text-[var(--text-xs)] text-sd-gray-60">
                          {(mockEvidence.fileSize / 1024).toFixed(2)} MB • Diunggah {new Date(mockEvidence.uploadedAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        {mockEvidence.notes && (
                          <div className="mt-[8px] text-[var(--text-xs)] text-sd-gray-60 italic">
                            "{mockEvidence.notes}"
                          </div>
                        )}
                      </div>
                    </div>
                    <button className={`${buttonClass('secondary', 'md', true)} mt-[12px]`}>
                      Unduh File
                    </button>
                  </div>

                  <button
                    onClick={handleApproveReview}
                    className={buttonClass('ultimate', 'md', true)}
                  >
                    Setujui & Tandai Selesai
                  </button>
                </div>
              )}

              {/* Status - Hidden for Pengusulan and Perlu Reviu */}
              {currentStatus !== 'pengusulan' && currentStatus !== 'perlu_reviu' && (
                <div>
                  <label className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[8px] block">
                    Ubah Status
                  </label>
                  <select
                    value={currentStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full px-[12px] py-[10px] border border-sd-gray-50 rounded-[4px] text-[var(--text-sm)] text-sd-gray-90 bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                  >
                    <option value="belum_dikerjakan">Belum Dikerjakan</option>
                    <option value="sedang_dikerjakan">Sedang Dikerjakan</option>
                    <option value="perlu_reviu">Perlu Tinjauan Atasan</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>
              )}

              {/* Detail Tugas */}
              <div className="border border-sd-badge-neutral rounded-[8px] p-[16px] space-y-[16px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90">
                  Detail Tugas
                </h3>

                {/* Pelaku Tugas / Pengusul Tugas */}
                <div>
                  <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-sd-gray-60 mb-[8px]">
                    <User className="w-[16px] h-[16px]" />
                    <span>{currentStatus === 'pengusulan' ? 'Pengusul Tugas' : 'Pelaku Tugas'}</span>
                  </div>
                  {task.assignees && task.assignees.length > 0 ? (
                    <div className="space-y-[8px]">
                      {task.assignees.map((assignee) => (
                        <div key={assignee.id} className="flex items-center gap-[8px]">
                          <div className="w-[32px] h-[32px] rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-[16px] h-[16px] text-primary" />
                          </div>
                          <span className="text-[var(--text-sm)] text-sd-gray-90 font-[var(--font-weight-medium)]">
                            {assignee.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-[8px]">
                      <div className="w-[32px] h-[32px] rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-[16px] h-[16px] text-primary" />
                      </div>
                      <span className="text-[var(--text-sm)] text-sd-gray-90 font-[var(--font-weight-medium)]">
                        {task.assignee_name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Pemberi Tugas */}
{currentStatus !== 'pengusulan' && (
                  <div>
                    <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-sd-gray-60 mb-[8px]">
                      <User className="w-[16px] h-[16px]" />
                      <span>Pemberi Tugas</span>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <div className="w-[32px] h-[32px] rounded-full bg-sd-gray-60/10 flex items-center justify-center">
                        <User className="w-[16px] h-[16px] text-sd-gray-60" />
                      </div>
                      <span className="text-[var(--text-sm)] text-sd-gray-90 font-[var(--font-weight-medium)]">
                        {task.reporter_name}
                      </span>
                    </div>
                  </div>
                )}

                {/* Batas Waktu */}
                <div>
                  <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-sd-gray-60 mb-[8px]">
                    <Calendar className="w-[16px] h-[16px]" />
                    <span>Batas Waktu</span>
                  </div>
                  <div className="text-[var(--text-sm)] text-sd-gray-90 font-[var(--font-weight-medium)]">
                    {new Date(task.due_date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                {/* Waktu Dibuat */}
                <div>
                  <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-sd-gray-60 mb-[8px]">
                    <Clock className="w-[16px] h-[16px]" />
                    <span>Dibuat</span>
                  </div>
                  <div className="text-[var(--text-xs)] text-sd-gray-60">
                    {new Date(task.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                {/* Terakhir Diupdate */}
                <div>
                  <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-sd-gray-60 mb-[8px]">
                    <Clock className="w-[16px] h-[16px]" />
                    <span>Terakhir Diupdate</span>
                  </div>
                  <div className="text-[var(--text-xs)] text-sd-gray-60">
                    {new Date(task.updated_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-[24px]" onClick={handleUploadCancel}>
          <div
            className="bg-white rounded-[8px] shadow-xl w-full max-w-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-[24px] border-b border-sd-badge-neutral">
              <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-sd-gray-90">
                Unggah Bukti Dukung
              </h3>
              <button
                onClick={handleUploadCancel}
                className="p-[4px] hover:bg-sd-gray-0 rounded-[4px] transition-colors"
              >
                <X className="w-[20px] h-[20px] text-sd-gray-60" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-[24px] space-y-[20px]">
              <p className="text-[var(--text-sm)] text-sd-gray-60">
                Silakan unggah bukti dukung untuk mengubah status tugas menjadi{' '}
                <strong>{pendingStatus === 'selesai' ? 'Selesai' : 'Perlu Tinjauan Atasan'}</strong>
              </p>

              {/* File Upload */}
              <div>
                <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[8px]">
                  File Bukti Dukung <span className="text-sd-red-60">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center gap-[8px] w-full px-[16px] py-[32px] border-2 border-dashed border-sd-gray-50 rounded-[8px] cursor-pointer hover:border-primary transition-colors bg-sd-gray-0"
                  >
                    <Upload className="w-[20px] h-[20px] text-sd-gray-60" />
                    <span className="text-[var(--text-sm)] text-sd-gray-60">
                      {uploadedFile ? uploadedFile.name : 'Klik untuk pilih file'}
                    </span>
                  </label>
                </div>
                {uploadedFile && (
                  <div className="mt-[8px] flex items-center gap-[8px] text-[var(--text-sm)] text-primary">
                    <FileText className="w-[16px] h-[16px]" />
                    <span>{uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(2)} KB)</span>
                  </div>
                )}
                <p className="mt-[8px] text-[var(--text-xs)] text-sd-gray-60">
                  Format: PDF, DOC, DOCX, JPG, PNG. Maks 10MB
                </p>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[8px]">
                  Catatan (Opsional)
                </label>
                <textarea
                  value={uploadNotes}
                  onChange={(e) => setUploadNotes(e.target.value)}
                  placeholder="Tambahkan catatan tentang bukti dukung..."
                  className="w-full min-h-[100px] px-[12px] py-[10px] border border-sd-gray-50 rounded-[4px] text-[var(--text-sm)] text-sd-gray-90 placeholder:text-sd-gray-60 resize-none outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-[12px] p-[24px] border-t border-sd-badge-neutral">
              <button
                onClick={handleUploadCancel}
                className="px-[16px] py-[8px] text-[var(--text-sm)] text-sd-gray-60 hover:text-primary transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleUploadSubmit}
                disabled={!uploadedFile}
                className={buttonClass('ultimate', 'md')}
              >
                Unggah & Ubah Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
