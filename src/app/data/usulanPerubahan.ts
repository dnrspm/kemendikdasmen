import { useSyncExternalStore } from 'react';

export type StatusUsulan =
  | 'menunggu-diverifikasi'
  | 'menunggu-komite'
  | 'ditolak-admin'
  | 'disetujui-komite'
  | 'ditolak-komite'
  | 'berhasil-siasn'
  | 'gagal-siasn'
  | 'berhasil-diperbarui';

export type Asal = 'Pegawai' | 'Admin Satker';
export type Jenis = 'Tambah' | 'Ubah' | 'Hapus';

export type Usulan = {
  id: number;
  nama: string;
  nip: string;
  unit: string;
  data: string; // Pasangan, Orang Tua, Jabatan, Sertifikat, ...
  jenis: Jenis;
  asal: Asal;
  status: StatusUsulan;
  catatan?: string;
  detail: [string, string][];
};

export const STATUS_LABEL: Record<StatusUsulan, string> = {
  'menunggu-diverifikasi': 'Menunggu Verifikasi Data',
  'menunggu-komite': 'Pengusulan Ditinjau Komite Talenta',
  'ditolak-admin': 'Pengusulan Ditolak Admin Satker',
  'disetujui-komite': 'Pengusulan Disetujui Komite Talenta',
  'ditolak-komite': 'Pengusulan Ditolak Komite Talenta',
  'berhasil-siasn': 'Berhasil Sinkronisasi ke SIASN',
  'gagal-siasn': 'Gagal Sinkronisasi ke SIASN',
  'berhasil-diperbarui': 'Berhasil Memperbarui Data',
};

export const STATUS_SHORT = STATUS_LABEL;

export const STATUS_TONE: Record<StatusUsulan, 'green' | 'red' | 'amber' | 'blue'> = {
  'menunggu-diverifikasi': 'amber',
  'menunggu-komite': 'amber',
  'ditolak-admin': 'red',
  'disetujui-komite': 'blue',
  'ditolak-komite': 'red',
  'berhasil-siasn': 'blue',
  'gagal-siasn': 'red',
  'berhasil-diperbarui': 'green',
};

/** Jenis data yang memerlukan validasi Komite Talenta (data pokok pegawai tidak). */
export const PERLU_KOMITE = ['Jabatan', 'Sertifikat'];
export const butuhKomite = (data: string) => PERLU_KOMITE.includes(data);

export const UNIT_SHORT = 'Balai Penjaminan Mutu Pendidikan Provinsi D.K.I. Jakarta';
export const UNIT_FULL = `${UNIT_SHORT} - Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah - Kementerian Pendidikan Dasar dan Menengah`;
const AHMAD = 'Prof. Dr. AHMAD WIJAYA M.M.';
const AHMAD_NIP = '198704182018031001';

export const detailPasangan: [string, string][] = [
  ['Pasangan Ke', '3'], ['Status ASN', 'Bukan ASN'], ['Status Hidup', 'Hidup'], ['Status Pernikahan', 'Menikah'], ['NIP', '-'],
  ['Nama', 'Pasangan Contoh'], ['Tanggal Lahir', '29 Oktober 2026'], ['Jenis Kelamin', 'Perempuan'], ['Agama', 'Islam'],
  ['Nomor KK', '0000000000000000'], ['Jenis Dokumen Identitas', 'KTP'], ['Nomor Identitas', '0000000000000000'],
  ['Nomor Akta Menikah', '0000000'], ['Tanggal Akta Menikah', '29 Oktober 2026'], ['Nomor Akta Cerai', '-'],
  ['Tanggal Akta Cerai', '-'], ['No. Akta Meninggal', '-'], ['Tanggal Meninggal', '-'], ['Nomor HP', '-'], ['Email', '-'], ['Alamat', '-'],
];
export const detailOrtu: [string, string][] = [
  ['Hubungan', 'Ayah'], ['Status Hidup', 'Masih Hidup'], ['Status ASN', 'Bukan ASN'], ['NIP', '-'], ['Nama', 'Orang Tua Contoh'],
  ['Tanggal Lahir', '-'], ['Jenis Identitas', '-'], ['Nomor Identitas', '-'], ['Nomor HP', '-'], ['Email', '-'], ['Alamat', '-'],
];
const detailJabatan: [string, string][] = [
  ['Jenis Jabatan', 'Struktural'], ['Jabatan', 'Kepala Seksi Pemetaan Mutu dan Supervisi'], ['Unit Organisasi', UNIT_SHORT],
  ['Nomor SK', 'SK/2026/0099'], ['Tanggal SK', '1 Oktober 2026'], ['TMT Jabatan', '1 Oktober 2026'],
];
const detailSertifikat: [string, string][] = [
  ['Nama Sertifikat', 'Pelatihan Manajemen Mutu'], ['Penyelenggara', 'Lembaga Contoh'], ['Nomor Sertifikat', 'SRT/2026/0123'],
  ['Tanggal Terbit', '12 September 2026'], ['Berlaku Sampai', '12 September 2029'],
];
export const detailFor = (data: string) =>
  data === 'Pasangan' ? detailPasangan : data === 'Jabatan' ? detailJabatan : data === 'Sertifikat' ? detailSertifikat : detailOrtu;

const mk = (id: number, nama: string, nip: string, data: string, jenis: Jenis, asal: Asal, status: StatusUsulan): Usulan => ({
  id, nama, nip, unit: UNIT_FULL, data, jenis, asal, status, detail: detailFor(data),
});

const seed: Usulan[] = [
  mk(1, AHMAD, AHMAD_NIP, 'Pasangan', 'Tambah', 'Pegawai', 'menunggu-diverifikasi'),
  mk(2, AHMAD, AHMAD_NIP, 'Orang Tua', 'Tambah', 'Pegawai', 'menunggu-diverifikasi'),
  mk(3, AHMAD, AHMAD_NIP, 'Orang Tua', 'Hapus', 'Pegawai', 'menunggu-diverifikasi'),
  mk(4, 'Prof. Dr. Dummy Pegawai 1 S.Kom, MM, PhD', 'GEN000000000000001', 'Orang Tua', 'Tambah', 'Pegawai', 'menunggu-diverifikasi'),
  mk(5, AHMAD, AHMAD_NIP, 'Jabatan', 'Ubah', 'Pegawai', 'menunggu-komite'),
  mk(6, 'Prof. Dr. Dummy Pegawai 1 S.Kom, MM, PhD', 'GEN000000000000001', 'Sertifikat', 'Tambah', 'Admin Satker', 'menunggu-komite'),
  mk(7, AHMAD, AHMAD_NIP, 'Sertifikat', 'Tambah', 'Pegawai', 'berhasil-diperbarui'),
  mk(8, AHMAD, AHMAD_NIP, 'Jabatan', 'Tambah', 'Admin Satker', 'gagal-siasn'),
  mk(9, 'Prof. Dr. Dummy Pegawai 1 S.Kom, MM, PhD', 'GEN000000000000001', 'Jabatan', 'Ubah', 'Pegawai', 'ditolak-komite'),
  mk(10, AHMAD, AHMAD_NIP, 'Pasangan', 'Hapus', 'Pegawai', 'ditolak-admin'),
  mk(11, AHMAD, AHMAD_NIP, 'Sertifikat', 'Ubah', 'Pegawai', 'berhasil-siasn'),
  mk(12, AHMAD, AHMAD_NIP, 'Jabatan', 'Ubah', 'Admin Satker', 'disetujui-komite'),
];

// --- store sederhana (state bersama antar halaman Admin Satker dan Komite) ---
let state = seed;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function useUsulan() {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => state,
  );
}

const patch = (id: number, p: Partial<Usulan>) => { state = state.map((u) => (u.id === id ? { ...u, ...p } : u)); emit(); };

/** Admin Satker memverifikasi usulan pegawai. Data pokok tidak perlu Komite, langsung sinkronisasi. */
export function verifikasiAdmin(id: number, setuju: boolean, catatan?: string) {
  const u = state.find((x) => x.id === id);
  if (!u) return;
  if (!setuju) return patch(id, { status: 'ditolak-admin', catatan });
  patch(id, { status: butuhKomite(u.data) ? 'menunggu-komite' : 'berhasil-diperbarui', catatan });
}

export function putusKomite(id: number, setuju: boolean, catatan?: string) {
  patch(id, { status: setuju ? 'disetujui-komite' : 'ditolak-komite', catatan });
}

/** Simulasi sinkronisasi SIASN setelah disetujui Komite (Admin Satker dapat coba lagi bila gagal). */
export function sinkronSiasn(id: number, berhasil: boolean) {
  patch(id, { status: berhasil ? 'berhasil-siasn' : 'gagal-siasn' });
}
export function simpanPortal(id: number) { patch(id, { status: 'berhasil-diperbarui' }); }
