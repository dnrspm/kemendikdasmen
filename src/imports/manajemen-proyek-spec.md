# Manajemen Proyek — Hardened Spec untuk Iterasi Prototipe

> **Tujuan dokumen:** input untuk iterasi prototipe di v0 / Figma Make.
> **Basis:** Feedback session dengan Kepala Biro & Ketua Tim Kerja OSDM (17 April 2026).
> **Konvensi label:**
> - `[MUST]` — requirement eksplisit dari audiens.
> - `[ASUMSI]` — gap yang saya isi supaya prototipe tidak stuck; harus divalidasi ke Ismail/Alif/Pokja.
> - `[NEED DECISION]` — ambigu, tidak aman di-generate sebelum ada keputusan.
> - `[DEFER]` — disebut di feedback tapi sebaiknya tidak masuk iterasi ini.

---

## 1. Audiens & Konteks Produk

- **Nama produk working:** Manajemen Proyek (sebelumnya "Dasbor Eksekutif" — akan di-reposition sebagai modul tersendiri).
- **Primary users:** Kepala Biro (Eselon II), Ketua Tim Kerja (katimja), Anggota Tim Kerja (pegawai).
- **Konteks organisasi:** Setjen Kemendikdasmen → Biro OSDM → Bagian/Tim di bawahnya.
- **Non-goal iterasi ini:** integrasi real ke SIASN BKN / e-Kin. Cukup mock data yang merepresentasikan struktur PK → IKK → RHK → Project → Task.

---

## 2. Information Architecture

### 2.1 Entry point
- `[MUST]` Modul "Manajemen Proyek" diakses langsung dari homepage Portal Kemendikdasmen (bukan nested di bawah Dasbor Eksekutif lama).
- `[MUST]` Landing langsung ke halaman utama modul (tidak ada intermediate selector).
- `[ASUMSI]` Landing default = **Tab Rangkuman** (paling informatif untuk pimpinan yang jadi preferensi utama).

### 2.2 Struktur tab (urutan left-to-right)
1. **Rangkuman** (sebelumnya "Summary") — default view
2. **Linimasa** (sebelumnya "Timeline")
3. **Papan Kanban** (sebelumnya "Kanban Board")
4. `[ASUMSI]` **Pengajuan Tugas** — tab baru untuk bottom-up flow (lihat §5). Alternatif: dijadikan panel/drawer, bukan tab tersendiri. `[NEED DECISION]`

### 2.3 Bahasa
- `[MUST]` Semua label UI dalam Bahasa Indonesia operasional K/L. Tidak ada istilah teknis produk (contoh: "Kanban Board" → "Papan Kanban", "Timeline" → "Linimasa", "Summary" → "Rangkuman").
- `[ASUMSI]` Glossary istilah lainnya:
  - Task → **Tugas**
  - Project / Epic → **Proyek** (atau **Output** jika terikat PK/RHK)
  - Assignee → **Pelaku Tugas**
  - Reporter → **Pemberi Tugas**
  - Due date → **Batas Waktu**
  - Activity log → **Linimasa Aktivitas**
  - Backlog → **Daftar Tunggu**
  - Status: To Do / In Progress / Done → **Belum Dikerjakan / Sedang Dikerjakan / Selesai**

---

## 3. Model Data Hirarki (penting untuk semua tampilan)

```
Perjanjian Kerja (PK) Eselon I  — Setjen
  └── IKP (Indikator Kinerja Program)
       └── IKK (Indikator Kinerja Kegiatan) — level Eselon II / Biro OSDM
            └── RHK (Rencana Hasil Kerja) — level Katimja
                 └── Proyek / Output
                      └── Tugas
```

**Aturan hubungan:**
- `[MUST]` Setiap **Tugas** wajib terikat ke satu **Proyek/Output**.
- `[MUST]` Setiap **Proyek/Output** terikat ke satu atau lebih **RHK**.
- `[ASUMSI]` Satu Proyek bisa mengintervensi >1 RHK (many-to-many) — tapi untuk iterasi ini tampilkan sebagai many-to-one dulu agar UX tidak kompleks. `[NEED DECISION]`
- `[MUST]` Roll-up progres: Tugas → Proyek → RHK → IKK → IKP.

**Formula agregasi progres** — `[NEED DECISION]`. Untuk prototipe gunakan asumsi:
- `[ASUMSI]` Progres Proyek = `(jumlah Tugas selesai / total Tugas) × 100%`.
- `[ASUMSI]` Progres RHK = rata-rata sederhana dari progres Proyek di bawahnya.
- `[ASUMSI]` Progres IKK = rata-rata sederhana dari progres RHK di bawahnya.
- **Catatan:** formula ini naif. Untuk produksi perlu bobot (contoh: Proyek Prioritas Presiden ≠ Non-prioritas). Flag ke Ismail/Alif.

---

## 4. Label Program Prioritas (fitur cross-cutting)

`[MUST]` Tambah field **Label Prioritas** pada entitas Proyek/Output dan ditampilkan di Tugas jika ada.

**Nilai enum:**
1. Prioritas Presiden
2. Prioritas Nasional
3. Prioritas Kementerian
4. Non-prioritas

`[ASUMSI]` Visual treatment:
- Prioritas Presiden → badge merah
- Prioritas Nasional → badge oranye
- Prioritas Kementerian → badge biru
- Non-prioritas → badge abu-abu / tanpa badge

`[MUST]` Label ditampilkan di: kartu Kanban, modal detail Tugas, baris Linimasa, dan grouping di Rangkuman.

---

## 5. Business Process: Hybrid Top-down + Bottom-up

### 5.1 Top-down (utama)
- `[MUST]` Pimpinan (Kepala Biro / Katimja) membuat Proyek beserta daftar Tugas.
- `[MUST]` Anggota tim "pickup" Tugas yang sudah tersedia → ubah status → update progres.

### 5.2 Bottom-up (diperbolehkan)
- `[MUST]` Anggota bisa mengusulkan Tugas baru, dengan syarat **wajib dikaitkan ke Proyek/Output yang sudah ada** (tidak boleh buat Proyek baru).
- `[MUST]` Pengajuan masuk ke queue approval Katimja.
- `[MUST]` Hasil approval:
  - **Approve** → Tugas masuk sebagai Daftar Tunggu (backlog).
  - **Reject** → Tidak menambah Tugas baru.
- `[ASUMSI]` **State pengajuan:** `diajukan` → `disetujui` | `ditolak`. Tidak ada state "revisi" di iterasi ini. `[NEED DECISION]`
- `[ASUMSI]` **Field pengajuan:** Judul Tugas, Deskripsi, Proyek/Output tujuan (dropdown dari Proyek existing), Estimasi waktu, Alasan pengajuan.
- `[NEED DECISION]` Notifikasi — di mana Katimja melihat queue? Badge di tab? Inbox terpisah? Email? Untuk iterasi prototipe cukup tampilkan sebagai **list view di tab Pengajuan Tugas** tanpa notifikasi real.

---

## 6. Tab Rangkuman (default landing)

### 6.1 Section atas — Ringkasan Global
`[MUST]` Tampilkan counter/metrik:
- Total Tugas
- Sedang Dikerjakan
- Selesai
- `[MUST]` **Tambahan baru:** Persentase selesai per "hari ini" (progres terhadap timeline — bukan hanya terhadap total).
- `[ASUMSI]` Formula "% selesai hari ini" = `(jumlah Tugas selesai sampai hari ini / jumlah Tugas yang seharusnya sudah selesai sampai hari ini berdasarkan due date)`. Ini **schedule performance index**, bukan completion rate. `[NEED DECISION]` — konfirmasi apakah ini yang dimaksud Kepala Biro.

### 6.2 Section bawah — Daftar Proyek
- `[MUST]` Grouping Proyek berdasarkan **Label Prioritas** (Prioritas Presiden → Nasional → Kementerian → Non-prioritas).
- `[MUST]` Tiap kartu Proyek menampilkan: nama, label prioritas, progres bar, due date, status ringkas.
- `[ASUMSI]` Collapse/expand per grup prioritas.

### 6.3 Drill-down flow (untuk pimpinan Eselon I & II)
`[MUST]` Ini requirement kritis untuk differentiation dari tool PM generic:

**Dari halaman Rangkuman pimpinan Eselon I (Sekjen):**
- Tampilkan ringkasan per **IKP** (contoh: IKP 3.3 Indeks Sistem Merit).
- Klik detail IKP → expand daftar **IKK** terkait + % progress masing-masing.
- Klik **IKK** → navigasi ke **Papan Kanban** yang sudah ter-filter pada Proyek/RHK terkait IKK tersebut.
- Klik "lihat keseluruhan progres IKP" → navigasi ke **Papan Kanban** ter-filter pada semua Proyek di bawah IKP (lintas biro/tim).

**Dari halaman Rangkuman pimpinan Eselon II (Kepala Biro OSDM):**
- Tampilkan ringkasan per **IKK** (contoh: IKK 2.1).
- Klik detail IKK → expand daftar **RHK** terkait + % progress.
- Klik **RHK** → navigasi ke **Papan Kanban** ter-filter pada Proyek terkait RHK tersebut.
- Klik "lihat keseluruhan progres IKK" → navigasi ke **Papan Kanban** ter-filter pada semua RHK di bawah IKK tersebut (lintas tim, contoh RHK Tim Manajemen Talenta + Tim Digitalisasi ASN).

**Dari halaman Rangkuman Katimja:**
- Tampilkan ringkasan per **RHK** milik tim.
- Drill-down ke Proyek → Tugas anggota tim.

### 6.4 Tree view PK → IKP → IKK → RHK
- `[MUST]` Tambahkan **tree view** yang menampilkan hirarki PK-IKP-IKK-RHK sebagai panel/side drawer yang bisa dibuka kapan saja.
- `[ASUMSI]` Tree view ini read-only di iterasi prototipe (tidak bisa edit struktur OKR dari sini).
- `[ASUMSI]` Sumber data PK/IKP/IKK = "sedang dirapihin Setjen" — gunakan mock data dari konteks di §9.

---

## 7. Tab Linimasa

- `[MUST]` **Struktur baris (fix yang penting):** baris induk = Proyek/Output, baris anak = Tugas-nya. **Tidak lagi random order**.
- `[MUST]` Default: hanya daftar Proyek/Output yang terlihat. Expandable — klik untuk munculkan daftar Tugas-nya.
- `[MUST]` Tampilkan **Label Prioritas** di baris Proyek.
- `[MUST]` Tampilkan **status** (Belum/Sedang/Selesai) di baris Tugas.
- `[ASUMSI]` Timeframe default: 12 bulan ke depan dari hari ini, dengan scroll horizontal.
- `[ASUMSI]` Zoom level: bulan (default), minggu, kuartal. `[NEED DECISION]`
- `[NEED DECISION]` Apakah Linimasa menampilkan dependensi antar Proyek/Tugas (garis penghubung)? Feedback session tidak menyebut ini, tapi relevan untuk use case cross-team dependency.

---

## 8. Tab Papan Kanban

### 8.1 Kolom status
`[ASUMSI]` Default 3 kolom: Belum Dikerjakan / Sedang Dikerjakan / Selesai. `[NEED DECISION]` apakah perlu kolom "Dalam Review" atau "Diblokir".

### 8.2 Kartu Tugas — field yang tampil
`[MUST]`:
1. Judul Tugas
2. Proyek / Output tujuan (sebagai tag/link)
3. Label Prioritas (jika ada)
4. Nama Pelaku Tugas (assignee)
5. Batas Waktu

### 8.3 Modal detail Tugas
`[MUST]`:
1. Judul dan Deskripsi Tugas
2. Proyek / Output tujuan
3. Label Prioritas (jika ada)
4. Nama Pemberi Tugas (reporter)
5. Nama Pelaku Tugas (assignee)
6. Batas Waktu
7. Linimasa Aktivitas (activity log: status change, komentar, assignment change)
8. **Aksi**:
   - Komentar
   - Ubah Status Tugas

`[ASUMSI]` Aksi lain yang ada di feedback image (Edit Task, Duplicate, Delete Task) — tetap di-include tapi sebagai overflow menu `⋯` supaya modal tidak sesak.

### 8.4 Filter Papan Kanban
`[MUST]` Papan Kanban harus bisa di-filter by:
- IKP / IKK / RHK (untuk drill-down dari Rangkuman)
- Label Prioritas
- `[ASUMSI]` Pelaku Tugas, Proyek/Output, Rentang tanggal

---

## 9. Mock Data: Hirarki Organisasi & PK/SKP

Gunakan data ini untuk populate prototipe.

### 9.1 Struktur Organisasi
- Sekretariat Jenderal
  - Biro OSDM
    - Bagian Manajemen Talenta
    - Bagian Transformasi Organisasi
    - Subbagian Tata Usaha
    - Tim Analisis Jabatan & Pengembangan JF
    - Tim Digitalisasi Manajemen ASN
    - Tim Disiplin, Pemberhentian dan Pensiun
    - Tim Ketatalaksanaan
    - Tim Layanan Mutasi
    - Tim Pelembagaan Unit Kerja
    - Tim Perencanaan dan Pengadaan ASN

### 9.2 PK Sekretariat Jenderal (Eselon I) — subset fokus
Fokus di **SP3 — Meningkatnya kualitas tata kelola Kementerian**, khususnya:
- **IKP 3.3** Indeks Sistem Merit (Target: Sangat Baik)
- **IKP 3.11** Indeks SPBE Kementerian (Target: 4)

Untuk completeness mock, sertakan juga IKP lain di SP3 (IKP 3.1 s/d 3.13) dengan progres random.

### 9.3 PK Kepala Biro OSDM (Eselon II) — subset fokus
Fokus di:
- **IKK 1.2** Persentase penataan unit organisasi efektif (Target: 20)
- **IKK 1.3** Indeks Manajemen ASN Kementerian (Target: Baik)
- **IKK 2.1** 80% pegawai melaksanakan Pengembangan Kompetensi

### 9.4 Matriks Keterhubungan PK → RHK (krusial — ini yang demo-able)

| Fokus Strategis | PK Eselon I | PK Eselon II | RHK Tim Manajemen Talenta | RHK Tim Digitalisasi ASN | Penjelasan Kolaborasi |
|---|---|---|---|---|---|
| A. Pemenuhan Kompetensi | IKP 3.3 Indeks Sistem Merit | IKK 2.1 80% Pegawai Ikut Pengembangan Kompetensi | RHK 1, 2, 3: Pemetaan, Uji Kompetensi, Alat Ukur | RHK 1 (parsial): Dasbor jam pelatihan pegawai | Tim Talenta eksekutor utama asesmen. Tim Digitalisasi sebagai Enabler (sistem pemantauan). |
| B. Kualitas Manajemen SDM | IKP 3.3 Indeks Sistem Merit | IKK 1.3 Indeks Manajemen ASN | RHK 4 & 5: Konseling Online + Webinar Kesehatan Mental | RHK 4 & 5: Integrasi Portal dengan SIASN BKN, Validitas Data | Kesejahteraan psikologis + integrasi data pusat = dua syarat indeks naik. |
| C. Efisiensi Tata Kelola Digital | IKP 3.11 Indeks SPBE | IKK 1.2 Penataan Unit Organisasi Efektif | (tidak ada intervensi langsung) | RHK 1, 2, 3: Buku Statistik ASN, Portal SSO, Migrasi Sistem | Efektivitas dicapai via digitalisasi layanan internal → naikkan SPBE. |

### 9.5 RHK Katimja Manajemen Talenta (5 RHK)
1. Pemetaan Kompetensi SDM Kemendikdasmen (Asesmen Prediksi PPPK & PNS, Sosialisasi Hasil, Umpan Balik)
2. Penilaian Kompetensi SDM (Uji Kompetensi JF 4 periode, Fasilitasi Asesmen, SPPNS)
3. Pengembangan Sistem Penilaian Kompetensi (Alat ukur PNS Fungsional/Struktural, Alat ukur PPPK)
4. Layanan Konseling Online (50% pegawai ikut program pendampingan kesehatan mental)
5. Webinar Kesehatan Mental per 6 bulan (50–60% pegawai ikut)

### 9.6 RHK Katimja Digitalisasi ASN (5 RHK)
1. Sistem informasi SDM menyediakan info tepat & akurat (Buku Statistik ASN 2026 semesteran, Dasbor Eksekutif Analitik, Dasbor Jam Pelatihan)
2. Sistem dapat diakses seluruh unit kerja (semua pegawai pakai email kemendikdasmen)
3. Sistem terintegrasi dengan sistem lain (aplikasi tata kelola kepegawaian direncanakan di Portal, SIPDASMEN dimigrasi)
4. Sistem terkoneksi ke luar Kemendikdasmen (integrasi SIASN BKN + sistem eksternal lain)
5. Data kepegawaian memenuhi completeness, timeliness, accuracy, consistency

---

## 10. Role-based View (permission model)

`[MUST]` 3 role level:
1. **Pimpinan Eselon I (Sekjen / Kepala Biro lain)** — lihat level IKP, drill ke IKK lintas biro.
2. **Pimpinan Eselon II (Kepala Biro OSDM)** — lihat level IKK, drill ke RHK lintas tim di bawahnya.
3. **Katimja** — lihat level RHK milik tim + Proyek/Tugas anggota.
4. **Anggota Tim Kerja** — lihat Tugas personal + Proyek timnya + RHK timnya.

`[ASUMSI]` **Progress Observation Limitation** untuk anggota:
- Bisa lihat progres tim lain di level RHK Eselon II (misal anggota Tim Talenta bisa lihat RHK Tim Digitalisasi, vice versa).
- **Tidak bisa** lihat progres Kepala Biro lain atau Sekretaris Jenderal.
- `[NEED DECISION]` Kalau Kepala Biro OSDM summary menampilkan roll-up ke IKP Setjen, apakah anggota yang buka view Kepala Biro tetap bisa lihat angka IKP Setjen? Default: hide angka IKP, hanya tampilkan IKK ke bawah untuk anggota.

---

## 11. Ringkasan Perubahan dari Prototipe Sebelumnya

Quick reference untuk iterasi — mana yang berubah:

| Area | Sebelum | Sesudah |
|---|---|---|
| Entry point | Dasbor Eksekutif nested | Modul "Manajemen Proyek" di homepage |
| Nama tab | Summary / Timeline / Kanban Board | Rangkuman / Linimasa / Papan Kanban |
| Rangkuman atas | Counter saja | Counter + % selesai per hari ini |
| Rangkuman proyek | Flat list | Grouped by Label Prioritas |
| Linimasa urutan | Random | Proyek (parent) → Tugas (child, expandable) |
| Linimasa label | Tidak ada | Label Prioritas + Status |
| Kartu Kanban | — | + Proyek/Output, + Label Prioritas, + Batas Waktu |
| Modal detail Tugas | — | + Pemberi Tugas, + Linimasa Aktivitas, + Aksi komen & ubah status |
| Bottom-up flow | (belum ada) | Tab/panel Pengajuan Tugas dengan approve/reject |
| Tree view PK-IKP-IKK-RHK | (belum ada) | Panel/drawer read-only |
| Drill-down dari Rangkuman | (belum ada) | Klik IKP/IKK/RHK → Kanban ter-filter |

---

## 12. Daftar `[NEED DECISION]` (harus di-resolve sebelum/sesudah iterasi)

Prioritas alignment dengan Ismail / Alif / Pokja:

1. Formula roll-up progres Proyek → RHK → IKK → IKP (rata-rata sederhana vs weighted by prioritas).
2. Formula "% selesai hari ini" — completion rate vs schedule performance index.
3. One-to-many vs many-to-many Proyek ↔ RHK.
4. Pengajuan Tugas — tab tersendiri vs panel/drawer.
5. State pengajuan — perlu state "revisi" atau cukup approve/reject.
6. Notifikasi queue pengajuan untuk Katimja.
7. Kolom Kanban — perlu tambahan "Dalam Review" / "Diblokir"?
8. Linimasa zoom level default + dukungan dependency line.
9. Permission: apakah anggota bisa lihat angka IKP Eselon I saat buka view pimpinan.

---

## 13. `[DEFER]` — Sengaja tidak masuk iterasi ini

Disebut di feedback section "Possible Key Features" tapi eksplisit masih "dipertimbangkan". Jangan include di prototipe kecuali Moga explicitly minta:

- Strategic alignment tagging otomatis (Task → Project → RHK → PK)
- Cross-team dependency flagging sebagai blocker
- Automated Progress Roll-Up (butuh formula final dulu — lihat §12.1)
- One-Click Evidence Generator (export ke e-SKP / e-Kin BKN)

Alasan defer: semua butuh decision di §12 dulu, dan scope iterasi ini fokus ke **restrukturisasi IA + drill-down flow + bottom-up**.
