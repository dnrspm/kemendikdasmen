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

export type LogKey = 'ajukan' | 'admin' | 'komite' | 'siasn' | 'portal';
export type LogItem = { oleh: string; waktu: string; catatan?: string };

export type Usulan = {
  id: number;
  nama: string;
  nip: string;
  unit: string;
  golongan: string;
  jabatan: string;
  data: string; // Pasangan, Orang Tua, Jabatan, Sertifikat, ...
  jenis: Jenis;
  asal: Asal;
  status: StatusUsulan;
  catatan?: string;
  detail: [string, string][];
  /** Dokumen pendukung yang dilampirkan pada pengajuan (label). */
  dokumen: string[];
  /** Riwayat langkah: siapa dan kapan (jejak audit). */
  log: Partial<Record<LogKey, LogItem>>;
  /** Waktu pengajuan, mis. "29 Oktober 2026 09:32 WIB". */
  diajukan: string;
  /** Nilai lama (khusus Ubah) saat diajukan dari halaman edit. */
  lama?: string;
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

/**
 * Kategori data yang dapat diusulkan, mengikuti halaman "Edit Data Pegawai Aktif" di staging:
 * Data Pribadi (tab Data Pribadi), Orang Tua/Pasangan/Anak (tab Keluarga),
 * Pendidikan (tab Pendidikan dan Pelatihan), Jabatan/Sertifikasi (tab Riwayat).
 */
export const KATEGORI_DATA = [
  'Data Pribadi', 'Orang Tua', 'Pasangan', 'Anak', 'Pendidikan', 'Pelatihan SIASN', 'Pelatihan Struktural', 'Pelatihan Teknis',
  'Kepangkatan', 'Jabatan', 'Kenaikan Gaji Berkala', 'Hukuman Disiplin', 'Penghargaan', 'Penugasan', 'Sertifikasi',
];

/** Field Data Pribadi yang dapat diubah (satu field per pengajuan), dikelompokkan seperti di halaman edit. */
export const FIELD_DATA_PRIBADI: Record<string, string[]> = {
  'Data Pegawai': ['Gelar Depan', 'Nama Lengkap', 'Gelar Belakang', 'Jenis Kelamin', 'Unit Organisasi', 'Jabatan'],
  'Data Diri': ['NIK', 'Nomor KK', 'Tempat Lahir', 'Tanggal Lahir', 'Tingkat Pendidikan', 'Pendidikan', 'Status Perkawinan', 'Agama'],
  'Kontak': ['Email Dikdasmen', 'Email Lain', 'Alamat', 'Nomor HP', 'Nomor Kontak Darurat'],
  'Data Kepegawaian': ['Jenis Pegawai', 'Masa Kerja Golongan', 'Masa Kerja Swasta', 'Lokasi Kerja', 'Golongan Ruang Awal', 'Golongan Ruang Terakhir', 'TMT Golongan', 'TMT ASN', 'Nomor SK ASN', 'Status ASN'],
  'Data Lainnya': ['Nomor Surat Keterangan Dokter', 'Tanggal Surat Keterangan Dokter', 'Nomor Surat Bebas Narkoba', 'Tanggal Surat Bebas Narkoba', 'Nomor Catatan Kepolisian', 'Tanggal Catatan Kepolisian', 'Nomor Akte Kelahiran', 'Nomor BPJS', 'NPWP', 'Tanggal NPWP', 'Nomor TASPEN'],
};

/** Jenis data yang memerlukan validasi Komite Talenta (data pokok pegawai tidak). */
export const PERLU_KOMITE = ['Jabatan', 'Sertifikasi'];
export const butuhKomite = (data: string, field?: string) =>
  PERLU_KOMITE.includes(data) || (data === 'Data Pribadi' && field === 'Jabatan');
export const perluKomite = (u: Pick<Usulan, 'data' | 'jenis' | 'detail'>) =>
  u.jenis === 'Ubah' ? u.detail.some(([f]) => butuhKomite(u.data, f)) || (u.detail.length === 0 && butuhKomite(u.data)) : butuhKomite(u.data);

/**
 * Kategori data yang perlu sinkronisasi SIASN (sumber: tabel "Perlu Sync SIASN?").
 * Ya: keluarga (anak, orang tua, pasangan) dan riwayat (hukuman disiplin, jabatan, kenaikan gaji berkala, kepangkatan,
 * pelatihan SIASN, pelatihan struktural, pendidikan, penghargaan, penugasan, sertifikasi).
 * Tidak: Data Pribadi (data diri, data kepegawaian, kontak, data lainnya) dan Pelatihan Teknis/Seminar/Workshop/Kursus.
 */
export const DATA_SYNC_SIASN = [
  'Anak', 'Orang Tua', 'Pasangan', 'Hukuman Disiplin', 'Jabatan', 'Kenaikan Gaji Berkala', 'Kepangkatan',
  'Pelatihan SIASN', 'Pelatihan Struktural', 'Pendidikan', 'Penghargaan', 'Penugasan', 'Sertifikasi',
];
export const perluSyncSiasn = (u: Pick<Usulan, 'data'>) => DATA_SYNC_SIASN.includes(u.data);

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
const detailSertifikasi: [string, string][] = [
  ['Nama Sertifikat', 'Pelatihan Manajemen Mutu'], ['Penyelenggara', 'Lembaga Contoh'], ['Nomor Sertifikat', 'SRT/2026/0123'],
  ['Tanggal Terbit', '12 September 2026'], ['Berlaku Sampai', '12 September 2029'],
];
const detailAnak: [string, string][] = [
  ['Nama', 'Fulanah'], ['Jenis Kelamin', 'Perempuan'], ['Tanggal Lahir', '12 Mei 2015'], ['Status Sekolah/Kerja', 'Masih Sekolah'],
  ['Status Pernikahan Anak', 'Belum Menikah'], ['Nomor Identitas', '0000000000000000'],
];
const detailPendidikan: [string, string][] = [
  ['Jenjang', 'S-2'], ['Nama Sekolah', 'Universitas Contoh'], ['Jurusan', 'S-2 Manajemen'], ['Tahun Lulus', '2015'], ['Nomor Ijazah', 'IJZ/2015/0099'],
];
const detailKepangkatan: [string, string][] = [
  ['Jenis Kenaikan Pangkat', 'Reguler'], ['Golongan Ruang', 'III/d'], ['Nomor SK', 'SK/2026/0150'], ['Tanggal SK', '1 April 2026'], ['TMT Pangkat', '1 April 2026'],
];
const detailKgb: [string, string][] = [
  ['Gaji Pokok', 'Rp4.500.000'], ['Nomor SK', 'KGB/2026/0072'], ['Tanggal SK', '1 Maret 2026'], ['TMT KGB', '1 Maret 2026'], ['Masa Kerja Golongan', '10 tahun 2 bulan'],
];
const detailHukdis: [string, string][] = [
  ['Jenis Hukuman Disiplin', 'Teguran Tertulis'], ['Nomor SK', 'HD/2026/0011'], ['Tanggal SK', '5 Februari 2026'], ['TMT Hukuman', '5 Februari 2026'], ['Akhir Hukuman', '5 Mei 2026'],
];
const detailPenghargaan: [string, string][] = [
  ['Jenis Penghargaan', 'Satyalancana Karya Satya'], ['Nomor SK', 'PH/2026/0034'], ['Tanggal SK', '17 Agustus 2026'], ['Tahun Perolehan', '2026'],
];
const detailPenugasan: [string, string][] = [
  ['Jenis Penugasan', 'Tugas Belajar'], ['Instansi Penugasan', 'Instansi Contoh'], ['Nomor SK', 'PN/2026/0021'], ['Tanggal Mulai', '1 Juli 2026'], ['Tanggal Selesai', '30 Juni 2027'],
];
const detailPelatihanSiasn: [string, string][] = [
  ['Jenis Diklat', 'Diklat Teknis'], ['Nama Diklat', 'Diklat Kebijakan Pendidikan'], ['Institusi Penyelenggara', 'Lembaga Contoh'],
  ['Nomor Sertifikat', 'DK/2026/0456'], ['Tanggal Mulai', '3 Agustus 2026'], ['Tanggal Selesai', '14 Agustus 2026'], ['Jumlah Jam', '80'],
];
const detailPelatihanStruktural: [string, string][] = [
  ['Jenis Diklat Struktural', 'PKA'], ['Nama Diklat', 'Pelatihan Kepemimpinan Administrator'], ['Nomor Sertifikat', 'PKA/2026/0099'],
  ['Tanggal Mulai', '1 Juni 2026'], ['Tanggal Selesai', '30 Juli 2026'], ['Jumlah Jam', '320'],
];
const detailPelatihanTeknis: [string, string][] = [
  ['Jenis Kegiatan', 'Workshop'], ['Nama Kegiatan', 'Workshop Analisis Data Pendidikan'], ['Penyelenggara', 'Lembaga Contoh'],
  ['Tanggal Mulai', '10 September 2026'], ['Tanggal Selesai', '12 September 2026'], ['Jumlah Jam', '24'],
];
const DETAIL_DATA: Record<string, [string, string][]> = {
  Pasangan: detailPasangan, 'Orang Tua': detailOrtu, Anak: detailAnak, Jabatan: detailJabatan, Sertifikasi: detailSertifikasi, Pendidikan: detailPendidikan,
  Kepangkatan: detailKepangkatan, 'Kenaikan Gaji Berkala': detailKgb, 'Hukuman Disiplin': detailHukdis, Penghargaan: detailPenghargaan,
  Penugasan: detailPenugasan, 'Pelatihan SIASN': detailPelatihanSiasn, 'Pelatihan Struktural': detailPelatihanStruktural, 'Pelatihan Teknis': detailPelatihanTeknis,
};
export const detailFor = (data: string) => DETAIL_DATA[data] ?? detailOrtu;

/** Usulan Ubah memuat satu atau lebih field dalam satu segmen; Tambah/Hapus memuat satu data utuh. */
const fieldUbah = (data: string, field?: string | string[]): [string, string][] => {
  const full = detailFor(data);
  const daftar = Array.isArray(field) ? field : [field ?? (data === 'Data Pribadi' ? 'Alamat' : full[full.length - 1][0])];
  return daftar.map((f): [string, string] =>
    data === 'Data Pribadi' ? [f, DATA_BARU[f] ?? '-'] : [f, full.find(([k]) => k === f)?.[1] ?? '-']);
};
const DATA_BARU: Record<string, string> = {
  'Alamat': 'Jl. Contoh No. 1, Jakarta Selatan', 'Nomor HP': '081234567890', 'Email Lain': 'ahmad.contoh@email.com',
  'Nomor KK': '3171000000000001', 'Jabatan': 'Kepala Seksi Pemetaan Mutu dan Supervisi', 'Status Perkawinan': 'Menikah', 'Nomor BPJS': '0001234567890', 'NPWP': '12.345.678.9-012.000',
};

const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const pad = (n: number) => String(n).padStart(2, '0');
const formatWaktu = (d: Date) => `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())} WIB`;
const tambahMenit = (d: Date, m: number) => new Date(d.getTime() + m * 60000);

/** Dokumen pendukung yang lazim dilampirkan per kategori (usulan Hapus tidak memerlukan dokumen). */
export function dokumenFor(data: string, jenis: Jenis, field?: string): string[] {
  if (jenis === 'Hapus') return [];
  if (data === 'Data Pribadi') {
    const m: Record<string, string[]> = {
      'NIK': ['KTP'], 'Nomor KK': ['Kartu Keluarga'], 'Status Perkawinan': ['Akta Menikah'],
      'Nama Lengkap': ['Dokumen Pendukung Perubahan Nama'], 'Tanggal Lahir': ['Akta Kelahiran'],
    };
    return m[field ?? ''] ?? [];
  }
  const m: Record<string, string[]> = {
    Jabatan: ['SK Jabatan'], Sertifikasi: ['Berkas Sertifikat'], Pasangan: ['Kartu Keluarga', 'Akta Menikah'],
    'Orang Tua': ['Kartu Keluarga', 'Akta Kelahiran'], Anak: ['Akta Kelahiran'], Pendidikan: ['Ijazah'], Kepangkatan: ['SK Pangkat'],
    'Kenaikan Gaji Berkala': ['SK KGB'], 'Hukuman Disiplin': ['SK Hukuman Disiplin'], Penghargaan: ['SK Penghargaan'], Penugasan: ['SK Penugasan'],
    'Pelatihan SIASN': ['Sertifikat Pelatihan'], 'Pelatihan Struktural': ['Sertifikat Pelatihan'], 'Pelatihan Teknis': ['Sertifikat Pelatihan'],
  };
  return m[data] ?? [];
}

/** Menyusun jejak langkah sesuai status saat ini, dihitung mundur dari waktu pengajuan. */
function buatLog(u: Pick<Usulan, 'nama' | 'asal' | 'status' | 'data' | 'jenis' | 'detail'>, t0: Date): Usulan['log'] {
  const log: Usulan['log'] = {};
  const st = u.status;
  const pegawai = u.asal === 'Pegawai';
  log.ajukan = { oleh: pegawai ? u.nama : 'Admin Satker', waktu: formatWaktu(t0) };
  if (pegawai) {
    if (st !== 'menunggu-diverifikasi') log.admin = { oleh: 'Admin Satker', waktu: formatWaktu(tambahMenit(t0, 70)), catatan: st === 'ditolak-admin' ? 'Dokumen tidak sesuai' : undefined };
  } else {
    log.admin = { oleh: 'Otomatis (diajukan Admin Satker)', waktu: formatWaktu(t0) };
  }
  if (st === 'ditolak-admin') return log;
  const lewatKomite = ['disetujui-komite', 'ditolak-komite', 'berhasil-siasn', 'gagal-siasn', 'berhasil-diperbarui'].includes(st);
  if (perluKomite(u) && lewatKomite) log.komite = { oleh: 'Komite Talenta', waktu: formatWaktu(tambahMenit(t0, 1500)), catatan: st === 'ditolak-komite' ? 'Data belum memenuhi syarat' : undefined };
  if (perluSyncSiasn(u) && ['berhasil-siasn', 'gagal-siasn', 'berhasil-diperbarui'].includes(st)) log.siasn = { oleh: 'Sistem', waktu: formatWaktu(tambahMenit(t0, 1505)) };
  if (st === 'berhasil-diperbarui') log.portal = { oleh: 'Sistem', waktu: formatWaktu(tambahMenit(t0, 1506)) };
  return log;
}

const waktuContoh = (id: number) => new Date(2026, 9, 20 + (id % 14), 8 + (id % 9), (id * 7) % 60);

const mk = (id: number, nama: string, nip: string, data: string, jenis: Jenis, asal: Asal, status: StatusUsulan, field?: string | string[]): Usulan => {
  const detail = jenis === 'Ubah' ? fieldUbah(data, field) : detailFor(data);
  const t0 = waktuContoh(id);
  return {
    id, nama, nip, unit: UNIT_FULL,
    golongan: nip === AHMAD_NIP ? 'III/d' : 'III/c',
    jabatan: nip === AHMAD_NIP ? 'Kepala Seksi Pemetaan Mutu dan Supervisi' : 'Analis Kebijakan Ahli Muda',
    data, jenis, asal, status, detail, diajukan: formatWaktu(t0),
    dokumen: dokumenFor(data, jenis, jenis === 'Ubah' ? detail[0][0] : undefined),
    log: buatLog({ nama, asal, status, data, jenis, detail }, t0),
    catatan: status === 'ditolak-admin' ? 'Dokumen tidak sesuai' : status === 'ditolak-komite' ? 'Data belum memenuhi syarat' : undefined,
  };
};

const seed: Usulan[] = [
  mk(1, AHMAD, AHMAD_NIP, 'Pasangan', 'Tambah', 'Pegawai', 'menunggu-diverifikasi'),
  mk(2, AHMAD, AHMAD_NIP, 'Orang Tua', 'Tambah', 'Pegawai', 'menunggu-diverifikasi'),
  mk(3, AHMAD, AHMAD_NIP, 'Orang Tua', 'Hapus', 'Pegawai', 'menunggu-diverifikasi'),
  mk(4, 'Prof. Dr. Dummy Pegawai 1 S.Kom, MM, PhD', 'GEN000000000000001', 'Anak', 'Tambah', 'Pegawai', 'menunggu-diverifikasi'),
  mk(5, AHMAD, AHMAD_NIP, 'Jabatan', 'Ubah', 'Pegawai', 'menunggu-komite', ['Jabatan', 'TMT Jabatan']),
  mk(6, 'Prof. Dr. Dummy Pegawai 1 S.Kom, MM, PhD', 'GEN000000000000001', 'Sertifikasi', 'Tambah', 'Admin Satker', 'menunggu-komite'),
  mk(7, AHMAD, AHMAD_NIP, 'Sertifikasi', 'Tambah', 'Pegawai', 'berhasil-diperbarui'),
  mk(8, AHMAD, AHMAD_NIP, 'Jabatan', 'Tambah', 'Admin Satker', 'gagal-siasn'),
  mk(9, 'Prof. Dr. Dummy Pegawai 1 S.Kom, MM, PhD', 'GEN000000000000001', 'Jabatan', 'Ubah', 'Pegawai', 'ditolak-komite', 'TMT Jabatan'),
  mk(10, AHMAD, AHMAD_NIP, 'Pasangan', 'Hapus', 'Pegawai', 'ditolak-admin'),
  mk(11, AHMAD, AHMAD_NIP, 'Sertifikasi', 'Ubah', 'Pegawai', 'berhasil-siasn', 'Berlaku Sampai'),
  mk(12, AHMAD, AHMAD_NIP, 'Jabatan', 'Ubah', 'Admin Satker', 'disetujui-komite', 'Nomor SK'),
  mk(13, AHMAD, AHMAD_NIP, 'Data Pribadi', 'Ubah', 'Pegawai', 'menunggu-diverifikasi', ['Alamat', 'Nomor HP']),
  mk(14, 'Prof. Dr. Dummy Pegawai 1 S.Kom, MM, PhD', 'GEN000000000000001', 'Data Pribadi', 'Ubah', 'Pegawai', 'menunggu-diverifikasi', 'Nomor HP'),
  mk(15, AHMAD, AHMAD_NIP, 'Jabatan', 'Tambah', 'Admin Satker', 'menunggu-komite'),
  mk(16, AHMAD, AHMAD_NIP, 'Data Pribadi', 'Ubah', 'Pegawai', 'berhasil-diperbarui', 'Email Lain'),
  mk(17, AHMAD, AHMAD_NIP, 'Pendidikan', 'Tambah', 'Pegawai', 'menunggu-diverifikasi'),
  // Kategori lain mengikuti tabel "Perlu Sync SIASN?" (Ya: 18-24, Tidak: 25-26)
  mk(18, AHMAD, AHMAD_NIP, 'Kenaikan Gaji Berkala', 'Tambah', 'Pegawai', 'menunggu-diverifikasi'),
  mk(19, 'Prof. Dr. Dummy Pegawai 1 S.Kom, MM, PhD', 'GEN000000000000001', 'Hukuman Disiplin', 'Tambah', 'Pegawai', 'menunggu-diverifikasi'),
  mk(20, AHMAD, AHMAD_NIP, 'Penghargaan', 'Tambah', 'Pegawai', 'menunggu-diverifikasi'),
  mk(21, AHMAD, AHMAD_NIP, 'Penugasan', 'Tambah', 'Admin Satker', 'berhasil-diperbarui'),
  mk(22, AHMAD, AHMAD_NIP, 'Pelatihan SIASN', 'Tambah', 'Pegawai', 'menunggu-diverifikasi'),
  mk(23, AHMAD, AHMAD_NIP, 'Pelatihan Struktural', 'Tambah', 'Pegawai', 'berhasil-diperbarui'),
  mk(24, AHMAD, AHMAD_NIP, 'Kepangkatan', 'Ubah', 'Pegawai', 'menunggu-diverifikasi', ['Golongan Ruang', 'TMT Pangkat']),
  mk(25, AHMAD, AHMAD_NIP, 'Pelatihan Teknis', 'Tambah', 'Pegawai', 'menunggu-diverifikasi'),
  mk(26, AHMAD, AHMAD_NIP, 'Data Pribadi', 'Ubah', 'Pegawai', 'menunggu-komite', 'Jabatan'),
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

const logTambah = (u: Usulan, kunci: LogKey, oleh: string, catatan?: string): Usulan['log'] => ({ ...u.log, [kunci]: { oleh, waktu: formatWaktu(new Date()), catatan } });

/** Admin Satker memverifikasi usulan pegawai. Data pokok tidak perlu Komite, langsung sinkronisasi. */
export function verifikasiAdmin(id: number, setuju: boolean, catatan?: string) {
  const u = state.find((x) => x.id === id);
  if (!u) return;
  const log = logTambah(u, 'admin', 'Admin Satker', catatan);
  if (!setuju) return patch(id, { status: 'ditolak-admin', catatan, log });
  if (perluKomite(u)) return patch(id, { status: 'menunggu-komite', catatan, log });
  // Tanpa Komite: data yang perlu sync SIASN dicatat tersinkron, lalu Portal diperbarui
  const akhir = perluSyncSiasn(u) ? { ...log, siasn: { oleh: 'Sistem', waktu: formatWaktu(new Date()) }, portal: { oleh: 'Sistem', waktu: formatWaktu(new Date()) } } : { ...log, portal: { oleh: 'Sistem', waktu: formatWaktu(new Date()) } };
  patch(id, { status: 'berhasil-diperbarui', catatan, log: akhir });
}

export function putusKomite(id: number, setuju: boolean, catatan?: string) {
  const u = state.find((x) => x.id === id);
  if (!u) return;
  const log = logTambah(u, 'komite', 'Komite Talenta', catatan);
  if (!setuju) return patch(id, { status: 'ditolak-komite', catatan, log });
  // Data yang tidak perlu sync SIASN langsung memperbarui Portal
  if (!perluSyncSiasn(u)) return patch(id, { status: 'berhasil-diperbarui', catatan, log: { ...log, portal: { oleh: 'Sistem', waktu: formatWaktu(new Date()) } } });
  patch(id, { status: 'disetujui-komite', catatan, log });
}

/** Simulasi sinkronisasi SIASN setelah disetujui Komite (Admin Satker dapat coba lagi bila gagal). */
export function sinkronSiasn(id: number, berhasil: boolean) {
  const u = state.find((x) => x.id === id);
  if (!u) return;
  patch(id, { status: berhasil ? 'berhasil-siasn' : 'gagal-siasn', log: logTambah(u, 'siasn', 'Sistem') });
}
export function simpanPortal(id: number) {
  const u = state.find((x) => x.id === id);
  if (!u) return;
  patch(id, { status: 'berhasil-diperbarui', log: logTambah(u, 'portal', 'Sistem') });
}

export const AHMAD_PROFIL = { nama: AHMAD, nip: AHMAD_NIP };

/**
 * Pengajuan dari halaman edit pegawai oleh Admin Satker: dianggap sudah diverifikasi,
 * sehingga langsung ke Komite (jabatan/sertifikasi) atau langsung diperbarui (data pokok).
 */
export function ajukanUsulan(i: { nama: string; nip: string; data: string; jenis: Jenis; detail: [string, string][]; lama?: string }): Usulan {
  const base: Usulan = {
    id: Math.max(0, ...state.map((u) => u.id)) + 1, nama: i.nama, nip: i.nip, unit: UNIT_FULL,
    golongan: i.nip === AHMAD_NIP ? 'III/d' : 'III/c',
    jabatan: i.nip === AHMAD_NIP ? 'Kepala Seksi Pemetaan Mutu dan Supervisi' : 'Analis Kebijakan Ahli Muda',
    data: i.data, jenis: i.jenis, asal: 'Admin Satker', status: 'menunggu-komite', detail: i.detail, lama: i.lama, diajukan: formatWaktu(new Date()),
    dokumen: dokumenFor(i.data, i.jenis, i.jenis === 'Ubah' ? i.detail[0]?.[0] : undefined), log: {},
  };
  const status = (perluKomite(base) ? 'menunggu-komite' : 'berhasil-diperbarui') as StatusUsulan;
  const now = new Date();
  const u = { ...base, status, log: buatLog({ ...base, status }, now) };
  state = [u, ...state];
  emit();
  return u;
}
