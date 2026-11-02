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
        <div className="flex items-start justify-between p-[24px] border-b border-[#EFEFEF]">
          <div className="flex-1">
            <div className="flex items-center gap-[12px] mb-[8px]">
              <span className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#808489]">
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
            <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-[#2f3031]">
              {task.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-[8px] hover:bg-[#f9f9f9] rounded-[4px] transition-colors"
          >
            <X className="w-[20px] h-[20px] text-[#656a6c]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-[24px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-[24px]">
              {/* Description */}
              <div>
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[12px]">
                  Deskripsi
                </h3>
                <p className="text-[var(--text-base)] text-[#656a6c] leading-[1.6] whitespace-pre-line">
                  {task.description}
                </p>
              </div>

              {/* Informasi SKP & Organisasi */}
              <div className="border border-[#EFEFEF] rounded-[8px] p-[16px] space-y-[16px]">
                {/* SKP */}
                {epic && (
                  <div>
                    <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-[#656a6c] mb-[8px]">
                      <FolderKanban className="w-[16px] h-[16px]" />
                      <span>SKP</span>
                    </div>
                    <div className="text-[var(--text-sm)] text-[#2f3031] font-[var(--font-weight-medium)]">
                      {epic.name}
                    </div>
                  </div>
                )}

                {/* Tim Kerja */}
                {timKerja && (
                  <div>
                    <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-[#656a6c] mb-[8px]">
                      <Building2 className="w-[16px] h-[16px]" />
                      <span>Tim Kerja</span>
                    </div>
                    <div className="text-[var(--text-sm)] text-[#2f3031] font-[var(--font-weight-medium)]">
                      {timKerja.name}
                    </div>
                  </div>
                )}

                {/* Unit Kerja (Biro) */}
                {biro && (
                  <div>
                    <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-[#656a6c] mb-[8px]">
                      <Building2 className="w-[16px] h-[16px]" />
                      <span>Unit Kerja</span>
                    </div>
                    <div className="text-[var(--text-sm)] text-[#2f3031] font-[var(--font-weight-medium)]">
                      {biro.name}
                    </div>
                  </div>
                )}

                {/* Unit Utama */}
                <div>
                  <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-[#656a6c] mb-[8px]">
                    <Building2 className="w-[16px] h-[16px]" />
                    <span>Unit Utama</span>
                  </div>
                  <div className="text-[var(--text-sm)] text-[#2f3031] font-[var(--font-weight-medium)]">
                    Sekretariat Jenderal
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <div className="flex items-center gap-[8px] mb-[16px]">
                  <MessageSquare className="w-[20px] h-[20px] text-[#656a6c]" />
                  <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#2f3031]">
                    Catatan Penting ({notes.length})
                  </h3>
                </div>

                <div className="space-y-[16px]">
                  {notes.map(note => (
                    <div key={note.id} className="border border-[#EFEFEF] rounded-[8px] p-[16px]">
                      <div className="flex items-center gap-[8px] mb-[8px]">
                        <div className="w-[32px] h-[32px] rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-[16px] h-[16px] text-primary" />
                        </div>
                        <div>
                          <div className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#2f3031]">
                            {note.user_name}
                          </div>
                          <div className="text-[var(--text-xs)] text-[#808489]">
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
                      <p className="text-[var(--text-sm)] text-[#656a6c] leading-[1.6]">
                        {note.content}
                      </p>
                    </div>
                  ))}

                  {notes.length === 0 && (
                    <div className="text-center py-[24px] text-[var(--text-sm)] text-[#808489]">
                      Belum ada catatan penting
                    </div>
                  )}

                  {/* Add Note */}
                  <div className="border border-[#EFEFEF] rounded-[8px] p-[16px]">
                    <textarea
                      placeholder="Tambahkan catatan penting..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="w-full min-h-[80px] p-[12px] border border-[#808489] rounded-[4px] text-[var(--text-sm)] text-[#2f3031] placeholder:text-[#808489] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] resize-none"
                    />
                    <div className="flex items-center justify-end gap-[8px] mt-[12px]">
                      <button
                        onClick={() => setNewNote('')}
                        className="px-[16px] py-[8px] text-[var(--text-sm)] text-[#656a6c] hover:text-primary transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleAddNote}
                        className="px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[4px] text-[var(--text-sm)] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity"
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
                  <Activity className="w-[20px] h-[20px] text-[#656a6c]" />
                  <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#2f3031]">
                    Linimasa Aktivitas
                  </h3>
                </div>

                <div className="space-y-[12px]">
                  {activityLogs.map(log => (
                    <div key={log.id} className="flex gap-[12px]">
                      <div className="w-[8px] h-[8px] rounded-full bg-primary mt-[6px] shrink-0" />
                      <div className="flex-1">
                        <div className="text-[var(--text-sm)] text-[#2f3031]">
                          <span className="font-[var(--font-weight-medium)]">{log.user_name}</span>
                          {' '}{log.details}
                        </div>
                        <div className="text-[var(--text-xs)] text-[#808489] mt-[2px]">
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
                    <div className="text-center py-[24px] text-[var(--text-sm)] text-[#808489]">
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
                <div className="border border-[#EFEFEF] rounded-[8px] p-[16px] bg-[#906CEF]/5">
                  <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[12px]">
                    Persetujuan Tugas
                  </h3>
                  <p className="text-[var(--text-sm)] text-[#656a6c] mb-[16px]">
                    Tugas ini menunggu persetujuan Anda. Setujui untuk memindahkan ke status "Belum Dikerjakan".
                  </p>
                  <button
                    onClick={handleApproveProposal}
                    className="w-full px-[16px] py-[10px] bg-primary text-primary-foreground rounded-[4px] text-[var(--text-sm)] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity"
                  >
                    Setujui Pengusulan
                  </button>
                </div>
              )}

              {/* Review Approval for Perlu Tinjauan Atasan */}
              {currentStatus === 'perlu_reviu' && mockEvidence && (
                <div className="border border-[#EFEFEF] rounded-[8px] p-[16px] bg-[#F59E0B]/5">
                  <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[12px]">
                    Tinjauan Bukti Tugas
                  </h3>
                  <p className="text-[var(--text-sm)] text-[#656a6c] mb-[16px]">
                    Pegawai telah mengunggah bukti dukung penyelesaian tugas. Silakan tinjau sebelum menyetujui.
                  </p>

                  {/* Evidence File */}
                  <div className="mb-[16px] p-[12px] bg-white border border-[#EFEFEF] rounded-[6px]">
                    <div className="flex items-start gap-[12px]">
                      <div className="w-[40px] h-[40px] rounded-[6px] bg-[#E02D38]/10 flex items-center justify-center shrink-0">
                        <FileText className="w-[20px] h-[20px] text-[#E02D38]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[4px] truncate">
                          {mockEvidence.fileName}
                        </div>
                        <div className="text-[var(--text-xs)] text-[#808489]">
                          {(mockEvidence.fileSize / 1024).toFixed(2)} MB • Diunggah {new Date(mockEvidence.uploadedAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        {mockEvidence.notes && (
                          <div className="mt-[8px] text-[var(--text-xs)] text-[#656a6c] italic">
                            "{mockEvidence.notes}"
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="mt-[12px] w-full px-[12px] py-[8px] border border-[#808489] rounded-[4px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#2f3031] hover:bg-[#f9f9f9] transition-colors">
                      Unduh File
                    </button>
                  </div>

                  <button
                    onClick={handleApproveReview}
                    className="w-full px-[16px] py-[10px] bg-[#4CA375] text-white rounded-[4px] text-[var(--text-sm)] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity"
                  >
                    Setujui & Tandai Selesai
                  </button>
                </div>
              )}

              {/* Status - Hidden for Pengusulan and Perlu Reviu */}
              {currentStatus !== 'pengusulan' && currentStatus !== 'perlu_reviu' && (
                <div>
                  <label className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[8px] block">
                    Ubah Status
                  </label>
                  <select
                    value={currentStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full px-[12px] py-[10px] border border-[#808489] rounded-[4px] text-[var(--text-sm)] text-[#2f3031] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                  >
                    <option value="belum_dikerjakan">Belum Dikerjakan</option>
                    <option value="sedang_dikerjakan">Sedang Dikerjakan</option>
                    <option value="perlu_reviu">Perlu Tinjauan Atasan</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>
              )}

              {/* Detail Tugas */}
              <div className="border border-[#EFEFEF] rounded-[8px] p-[16px] space-y-[16px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#2f3031]">
                  Detail Tugas
                </h3>

                {/* Pelaku Tugas / Pengusul Tugas */}
                <div>
                  <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-[#656a6c] mb-[8px]">
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
                          <span className="text-[var(--text-sm)] text-[#2f3031] font-[var(--font-weight-medium)]">
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
                      <span className="text-[var(--text-sm)] text-[#2f3031] font-[var(--font-weight-medium)]">
                        {task.assignee_name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Pemberi Tugas */}
{currentStatus !== 'pengusulan' && (
                  <div>
                    <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-[#656a6c] mb-[8px]">
                      <User className="w-[16px] h-[16px]" />
                      <span>Pemberi Tugas</span>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <div className="w-[32px] h-[32px] rounded-full bg-[#808489]/10 flex items-center justify-center">
                        <User className="w-[16px] h-[16px] text-[#808489]" />
                      </div>
                      <span className="text-[var(--text-sm)] text-[#2f3031] font-[var(--font-weight-medium)]">
                        {task.reporter_name}
                      </span>
                    </div>
                  </div>
                )}

                {/* Batas Waktu */}
                <div>
                  <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-[#656a6c] mb-[8px]">
                    <Calendar className="w-[16px] h-[16px]" />
                    <span>Batas Waktu</span>
                  </div>
                  <div className="text-[var(--text-sm)] text-[#2f3031] font-[var(--font-weight-medium)]">
                    {new Date(task.due_date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                {/* Waktu Dibuat */}
                <div>
                  <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-[#656a6c] mb-[8px]">
                    <Clock className="w-[16px] h-[16px]" />
                    <span>Dibuat</span>
                  </div>
                  <div className="text-[var(--text-xs)] text-[#808489]">
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
                  <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-[#656a6c] mb-[8px]">
                    <Clock className="w-[16px] h-[16px]" />
                    <span>Terakhir Diupdate</span>
                  </div>
                  <div className="text-[var(--text-xs)] text-[#808489]">
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
            <div className="flex items-center justify-between p-[24px] border-b border-[#EFEFEF]">
              <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#2f3031]">
                Unggah Bukti Dukung
              </h3>
              <button
                onClick={handleUploadCancel}
                className="p-[4px] hover:bg-[#f9f9f9] rounded-[4px] transition-colors"
              >
                <X className="w-[20px] h-[20px] text-[#656a6c]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-[24px] space-y-[20px]">
              <p className="text-[var(--text-sm)] text-[#656a6c]">
                Silakan unggah bukti dukung untuk mengubah status tugas menjadi{' '}
                <strong>{pendingStatus === 'selesai' ? 'Selesai' : 'Perlu Tinjauan Atasan'}</strong>
              </p>

              {/* File Upload */}
              <div>
                <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[8px]">
                  File Bukti Dukung <span className="text-[#E02D38]">*</span>
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
                    className="flex items-center justify-center gap-[8px] w-full px-[16px] py-[32px] border-2 border-dashed border-[#808489] rounded-[8px] cursor-pointer hover:border-primary transition-colors bg-[#f9f9f9]"
                  >
                    <Upload className="w-[20px] h-[20px] text-[#656a6c]" />
                    <span className="text-[var(--text-sm)] text-[#656a6c]">
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
                <p className="mt-[8px] text-[var(--text-xs)] text-[#808489]">
                  Format: PDF, DOC, DOCX, JPG, PNG. Maks 10MB
                </p>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[8px]">
                  Catatan (Opsional)
                </label>
                <textarea
                  value={uploadNotes}
                  onChange={(e) => setUploadNotes(e.target.value)}
                  placeholder="Tambahkan catatan tentang bukti dukung..."
                  className="w-full min-h-[100px] px-[12px] py-[10px] border border-[#808489] rounded-[4px] text-[var(--text-sm)] text-[#2f3031] placeholder:text-[#808489] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-[12px] p-[24px] border-t border-[#EFEFEF]">
              <button
                onClick={handleUploadCancel}
                className="px-[16px] py-[8px] text-[var(--text-sm)] text-[#656a6c] hover:text-primary transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleUploadSubmit}
                disabled={!uploadedFile}
                className="px-[16px] py-[8px] bg-primary text-primary-foreground rounded-[4px] text-[var(--text-sm)] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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
