# Portal Kemendikdasmen — Dashboard Analitik Eksekutif SDM ASN
## Spec Prototype Figma

**Update terakhir:** 24 April 2026, 09:00 WIB  
**Scope:** Single-page dashboard dengan 4 tab utama, global filter Unit Kerja

---

## Global Layout

### Header
- **Logo:** Icon grid 2x2 biru + teks "Portal Kemendikdasmen" (bold) + subtitle "Dashboard Analitik Eksekutif SDM ASN"
- **Filter Unit Kerja:** Dropdown kanan atas, default value: "Kementerian Pendidikan Dasar dan Menengah"

#### Dropdown Unit Kerja — Pilihan
Flat dropdown, 7 opsi:

1. Kementerian Pendidikan Dasar dan Menengah *(default = gabungan seluruh unit)*
2. Sekretariat Jenderal
3. Inspektorat Jenderal
4. Direktorat Jenderal Pendidikan Vokasi, Pendidikan Khusus, dan Pendidikan Layanan Khusus
5. Badan Standar, Kurikulum, dan Asesmen Pendidikan
6. Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah
7. Badan Pengembangan dan Pembinaan Bahasa

**Behavior:** Pilih "Kementerian Pendidikan Dasar dan Menengah" = data agregat gabungan 6 unit. Pilih unit spesifik = data difilter per unit.

### Tab Navigation
Horizontal tab bar, underline style, 4 tab:
1. Ringkasan Eksekutif *(default active)*
2. Profil ASN Kemendikdasmen
3. Organisasi dan Keterisian Jabatan
4. Kinerja & Pengembangan Talenta

---

## TAB 1 — Ringkasan Eksekutif

**Page title:** "Ringkasan Eksekutif"  
**Subtitle:** Update terakhir: 24 April 2026, 09:00 WIB

---

### Section 1: Diagnosis Organisasi
Card full-width dengan left border biru.

| Elemen | Konten |
|--------|--------|
| Icon + Label | 🫀 "Diagnosis Organisasi" + Badge "Sehat" (hijau) |
| Body text | "Kondisi organisasi saat ini sehat dengan kinerja mayoritas ASN baik, namun perlu perhatian pada kesinambungan jabatan kritikal di unit-unit pusa." |
| Metric 1 | Keterisian Jabatan — **89%** |
| Metric 2 | Rasio Kinerja Pegawai Baik & Sangat Baik — **80%** (biru) |
| Metric 3 | Talenta Potensial untuk Manajerial — **10%** (biru) |
| Metric 4 | Skor Evaluasi Kelembagaan — **90** |

---

### Section 2: 3-Column Cards Row

#### Card 1 — Kinerja Pegawai
- Label: "Kinerja Pegawai" + chip "Periode: Triwulan 1 2026"
- Chart: **Line chart** area, sumbu X: Sngt Kurang / Kurang / Perbaikan / Baik / Sngt Baik, Y: 0–80%
- Kurva bell, puncak di "Baik" ~65%
- Caption: "**80%** kinerja nya diatas baik, bisa dipertahankan di periode selanjutnya."

#### Card 2 — Komposisi Talenta
- Label: "Komposisi Talenta" + chip "Periode: Triwulan 1 2026"
- Chart: **Nine-Box Grid** 3x3
  - Sumbu Y (kiri): Tinggi / Potensial / Rendah
  - Sumbu X (bawah): Kurang / Kinerja / Baik
  - Data cells:

| | Kurang | Kinerja | Baik |
|---|---|---|---|
| Tinggi | IV 5% | VII 3% | IX 15% (highlighted biru muda) |
| Potensial | II 5% | **V 45%** (highlighted biru tua) | VIII 10% |
| Rendah | I 2% | III 5% | VI 10% |

- Caption: "Berdasarkan Nine-Box, **45%** masih di kelompok V dan kelompok rencana suksesi yaitu VII, VIII, IX sudah di **28%**."

#### Card 3 — Risiko Jabatan Manajerial Kosong & Pensiun
- Label: "⚠️ Risiko Jabatan Manajerial Kosong & Pensiun" (warna oranye/amber)
- Background: Krem/amber sangat muda

| Metric | Value |
|--------|-------|
| Jabatan Manajerial Kosong | **12** |
| Jabatan Manajerial JPT Kosong | **5** |
| Proyeksi Manajerial Pensiun | **25** + label "Alert" (merah) + "s.d. Q4" |
| Proyeksi Manajerial JPT Pensiun | **6** |

- Alert banner merah muda di bawah: "Perhatian lebih pada unit utama **Direktorat GTK** karena **4** pimpinan akan pensiun dan **15** posisi masih belum terisi."

---

### Section 3: Sintesis Eksekutif
Card full-width, background biru tua (#1E3A8A atau sejenisnya), teks putih.

- Icon 💡 + Title: "Sintesis Eksekutif"
- Intro text: "Sebagai upaya tindak lanjut untuk menjaga stabilitas dan mendorong kinerja organisasi, berikut adalah langkah strategis yang perlu dieksekusi:"
- 3 bullet poin dengan icon ✅:
  1. "Segera buka seleksi terbuka atau talent mobility untuk mengisi kekosongan 12 Jabatan Struktural dan 30 Jabatan Fungsional Utama-Madya."
  2. "Fokuskan program akselerasi pada unit dengan risiko pensiun tinggi di Q4, yaitu Ditjen GTK, dorong talent dari kelompok VII, VIII, IX untuk suksesi."
  3. "Rancang program pengembangan kompetensi targeted untuk mendorong 45% talent di kelompok V (Standar) agar bisa berkinerja lebih tinggi ke kelompok atas."

---

### Section 4: Trend Metrics Row (3 cards)

| Card | Label | Value | Trend |
|------|-------|-------|-------|
| 1 | Trend Nilai SAKIP (2021-2025) | **83.1** | ↑ 1.6 + sparkline naik |
| 2 | Trend Unit Kerja WBK (2021-2025) | **35%** | ↑ 7% + sparkline naik |
| 3 | Trend Unit Kerja WBBM (2021-2025) | **10%** | ↑ 3% + sparkline naik |

Semua sparkline: line chart mini, 5 titik data (2021–2025).

---

### Section 5: KPI Summary Footer (4 cards)

| Label | Value | Warna Value |
|-------|-------|-------------|
| TOTAL ASN | **4,821** | Hitam |
| % KINERJA POSITIF | **80.0%** | Biru |
| % TALENTA POTENSIAL | **15.0%** | Biru |
| JABATAN KRITIS KOSONG | **42** | Amber/Oranye |

---

## TAB 2 — Profil ASN Kemendikdasmen

**Page title:** "Profil ASN Kemendikdasmen"  
**Subtitle:** Update terakhir: 24 April 2026, 09:00 WIB

### Sub-tab Navigation (secondary tabs, pill/toggle style)
4 sub-tab horizontal + filter kanan:
1. **Ringkasan & Siklus ASN** *(default active)*
2. Pendidikan & Kapasitas Pegawai
3. Organisasi, Jabatan & Wilayah
4. Eksplorasi Matriks Pegawai

**Filter:** "FILTER JENIS JABATAN" dropdown → default "Seluruh Jabatan"

**Description text:** "Menampilkan gambaran umum profil pegawai Kemendikdasmen berdasarkan jenis pegawai, demografi, masa kerja, dan siklus kepegawaian."

---

### Section 1: KPI Summary Row (5 cards)

| Label | Value | Style |
|-------|-------|-------|
| TOTAL PEGAWAI | **12.500** | Card biru tua (primary), teks putih |
| TOTAL PNS | **9.375** | Card putih |
| TOTAL PPPK | **2.500** | Card putih |
| PPPK PARUH WAKTU | **615** | Card putih |
| NON ASN | **10** | Card putih |

---

### Section 2: 2-Column Charts Row

#### Chart 1 — Komposisi Jenis Pegawai
- Type: **Donut chart**
- Segmen (warna):
  - Non ASN → kuning/oranye
  - PNS → biru tua
  - PPPK → biru muda
  - PPPK Paruh Waktu → ungu
- Legend di bawah chart

#### Chart 2 — Distribusi Usia
- Type: **Bar chart vertikal**
- Sumbu X: <25 / 26-30 / 31-35 / 36-40 / 41-45 / 46-50 / >50
- Tooltip on hover: "26-30 — Jumlah Pegawai: 1.875"
- Warna bar: biru tua
- Distribusi terbanyak: 31-35 (~2.8k), 36-40 (~2.1k)

---

### Section 3: 2-Column Charts Row

#### Chart 3 — Komposisi Jenis Kelamin
- Type: **Donut chart**
- Segmen: Laki-laki (biru tua) / Perempuan (biru muda)

#### Chart 4 — Distribusi Masa Kerja
- Type: **Bar chart vertikal**
- Sumbu X: <5 Tahun / 5-10 Tahun / 11-15 Tahun / 16-20 Tahun / >20 Tahun
- Warna bar: biru muda
- Terbanyak: 5-10 Tahun (~3.8k)

---

### Section 4: 2-Column Charts Row

#### Chart 5 — Angkatan ASN Berdasarkan TMT CPNS
- Type: **Area chart** (line + fill)
- Sumbu X: 2019–2025
- Trend: naik dari ~650 ke ~2.8k
- Warna: biru

#### Chart 6 — Proyeksi Pensiun 5 Thn
- Type: **Bar chart vertikal**
- Sumbu X: 2026 / 2027 / 2028 / 2029 / 2030
- Warna bar: abu-abu
- Nilai naik dari ~2.7k ke ~4.2k

---

## TAB 3 — Organisasi dan Keterisian Jabatan

**Page title:** "Organisasi dan Keterisian Jabatan"  
**Subtitle:** Update terakhir: 24 April 2026, 09:00 WIB

---

### Section A: Keterisian Jabatan Saat Ini
Header: "A. Keterisian Jabatan Saat Ini" (dengan divider)

#### KPI Row (3 cards)

**Card 1 — Jabatan Terisi**
- Value: **89%**
- Trend: ↑ 2% lebih tinggi dari periode Tw 4 2025 (hijau)

**Card 2 — Jabatan Kosong**
- Value: **11%**
- Trend: ↓ 2% lebih rendah dari periode Tw 4 2025 (merah)

**Card 3 — Jabatan Kritis Kosong** (background krem, badge "Needs Action" amber)
- ⚠️ Label merah/amber
- Jabatan Struktural Kosong: **12** ↓ Turun 1 dari Tw 4 2025
- Jabatan Fungsional Utama-Madya Kosong: **30** ↓ Turun 2 dari Tw 4 2025

---

#### 2-Column Charts Row

**Chart 1 — Komposisi Fulfillment vs Vacancy per Jenis**
- Label: + chip "Periode: Triwulan 1 2026"
- Type: **Horizontal bar chart** (stacked 2 segmen)
- Baris: Struktural / Fungsional / Pelaksana
- Segmen: Kosong (%) abu-abu | Terisi (%) biru tua
- Legend di bawah

**Chart 2 — Unit dengan Jabatan Kosong Tertinggi**
- Label: "Distribusi Jabatan Kosong per Unit Utama | Periode: Triwulan 1 2026"
- Type: **Horizontal stacked bar chart** (3 segmen)
- Baris unit: Ditjen GTK / Ditjen PAUD Dikdasmen / Setjen / Ditjen Vokasi / Itjen / BSKAP / Badan Bahasa
- Segmen: Fungsional (biru tua) | Pelaksana (abu) | Struktural (oranye)
- Ditjen GTK bar terpanjang

---

### Section B: Proyeksi Kekosongan karena Pensiun
Header: "B. Proyeksi Kekosongan karena Pensiun" (dengan divider)

#### KPI Row (4 cards)

| Label | Value | Style |
|-------|-------|-------|
| Proyeksi Pegawai Pensiun (s.d. Akhir Tahun 2026) | **109 pegawai** | Amber |
| Jabatan Kritis | **18** | Amber |
| Eselon I / II | **5** | Amber |
| Jabatan Kritis Kosong karena Pensiun | 8 Ditjen GTK / 5 Setjen | Card dengan 2 pill label |

---

#### 2-Column Charts Row

**Chart 1 — Pensiun per Kuartal (2026)**
- Label: "Tahun berjalan s.d Akhir 2026"
- Type: **Bar chart vertikal** (single color)
- Sumbu X: Tw 1 2026 / Tw 2 2026 / Tw 3 2026 / Tw 4 2026 / Total 2026
- Warna: biru untuk Tw, **amber/kuning** untuk bar "Total 2026" (lebih tinggi ~109)

**Chart 2 — Pensiun Berdasarkan Jabatan**
- Label: "Tahun Berjalan s.d Tw 1 2026"
- Type: **Horizontal bar chart**
- Baris: Eselon II / Eselon III / Eselon IV / Ahli Utama / Ahli Madya / Non-Kritis
- Warna: biru untuk kritis, **amber** untuk Non-Kritis (bar terpanjang)

---

### Section C: Zona Integritas (ZI)
Header: "C. Zona Integritas (ZI)" (dengan divider)

#### 3-Column Layout

**Card 1 — Predikat ZI Terbaru**
- Badge besar biru tua: **"WBBM"**
- Caption: "Predikat terakhir tahun 2025"

**Card 2 — Tren ZI 5 Tahun**
- Type: **Step line chart** (3 level)
- Sumbu X: 2021–2025
- Sumbu Y: Belum / WBK / WBBM
- Trend: Belum (2021-2022) → WBK (2023-2024) → WBBM (2025)

**Card 3 — Aspek Penilaian ZI Terakhir**
- Type: **Tabel** dengan 3 kolom: Aspek Penilaian | Nilai Terakhir | Perubahan Nilai

| Aspek Penilaian | Nilai | Perubahan |
|-----------------|-------|-----------|
| Manajemen Perubahan | 92 | ↑ 5 |
| Tata Laksana | 88 | ↑ 4 |
| Manajemen SDM | 85 | ↓ 2 (merah) |
| Akuntabilitas | 83 | ↑ 6 |
| Pengawasan | 79 | ↓ 1 (merah) |
| Pelayanan Publik | 90 | ↑ 5 |

- Nilai ditampilkan sebagai pill/badge biru, intensitas warna mengikuti nilai (semakin tinggi semakin gelap)

---

## TAB 4 — Kinerja & Pengembangan Talenta

**Page title:** "Kinerja & Pengembangan Talenta"  
**Subtitle:** Update terakhir: 24 April 2026, 09:00 WIB

---

### Section Intro: Distribusi Kelompok Talenta + Highlight

#### Layout: 2 kolom (chart kiri, highlight kanan)

**Kiri — Distribusi Kelompok Talenta**
- Label: + chip "Periode: Triwulan 1 2026"
- Subtitle: "Berdasarkan pemetaan Aspek Kinerja dan Aspek Potensial"
- Chart: **Nine-Box Grid** 3x3 (sama dengan Tab 1)
- Data identik dengan Tab 1 (lihat Section 2 Card 2)

**Kanan — Highlight**
3 metric stacked:

| Value | Label |
|-------|-------|
| **45%** (biru tua) | Talenta terpusat di Kelompok V |
| **28%** (biru sedang) | Talenta berada dalam Kelompok Rencana Suksesi (Box 7,8,9) |
| **10%** (biru muda) | Talenta Potensial (Memenuhi 4 kriteria: pengalaman bertugas, kepangkatan, pendidikan, dan kotak talenta >7) |

---

### Section A: Kinerja ASN
Header: "A. Kinerja ASN" (dengan divider)

#### Row 1: 3-Column

**Card 1 — Distribusi Hasil Kinerja**
- Label: "Periode: Triwulan 1 2026"
- Type: **Area chart / bell curve**
- Sumbu X: Sngt Kurang / Kurang / Perbaikan / Baik / Sngt Baik
- Puncak di "Baik" ~65%

**Card 2 — Tren Triwulanan**
- Label: "% Kinerja Positif vs Perlu Perhatian"
- Type: **Line chart dual series**
- Sumbu X: Tw 1 2025 / Tw 2 2025 / Tw 3 2025 / Tw 4 2025 / Tw 1 2026
- Series: Kinerja Positif (biru, ~75-80%) | Perlu Perhatian (amber, ~20-25%)
- Legend di bawah

**Card 3 — 2 KPI stacked**
- Rasio Berkinerja Positif: **80%** (biru) — "Gabungan Sangat Baik & Baik"
- Rasio Perlu Perhatian: **20%** (amber) — "Butuh perbaikan / Kurang"

---

#### Row 2: 2-Column

**Chart 1 — Distribusi Hasil Kerja per Unit**
- Label: + chip "Periode: Triwulan 1 2026"
- Subtitle: "Persentase per indikator kinerja di tiap unit utama"
- Type: **Horizontal stacked bar** (5 segmen)
- Baris: Setjen / Itjen / Ditjen PAUD Dikdasmen / Ditjen GTK / BSKAP / Badan Bahasa / Pusdatin
- Segmen: Baik (biru muda) | Kurang (kuning) | Perbaikan (oranye) | Sangat Baik (biru tua) | Sangat Kurang (merah)

**Chart 2 — Top Jabatan "Perlu Perhatian"**
- Label: + chip "Periode: Triwulan 1 2026"
- Subtitle: "Berdasarkan jumlah pegawai per indikator"
- Type: **3-column list/table** dengan kategori:

| SANGAT KURANG (merah) | KURANG (amber) | BUTUH PERBAIKAN (kuning) |
|----------------------|----------------|--------------------------|
| Analis Kebijakan Ahli Muda — 12 | Arsiparis Ahli Muda — 15 | Penata Keuangan — 24 |
| Pengembang Teknologi Pembelajaran — 8 | Analis SDM Aparatur — 11 | Pengelola Pengadaan Barang/Jasa — 18 |
| Pranata Komputer Ahli Pertama — 5 | Pranata Humas Ahli Pertama — 9 | Auditor Ahli Muda — 14 |

---

### Section B: Pemetaan Talenta ASN
Header: "B. Pemetaan Talenta ASN" (dengan divider)

#### Row 1: 2-Column

**Chart 1 — Tren Rata-rata Aspek Penilaian**
- Subtitle: "Perkembangan Aspek Kinerja & Aspek Potensial ASN"
- Type: **Line chart dual series**
- Sumbu X: Tw 1 2025 → Tw 1 2026 (5 titik)
- Series: Aspek Kinerja (biru, naik dari ~65 ke ~78) | Aspek Potensial (amber, naik dari ~64 ke ~67)
- Y axis: 50–100

**Card 2 — Aspek Penilaian Ninebox**
- Title: "Aspek Penilaian Ninebox"
- Subtitle: "Sistem meritokrasi dan penempatan Ninebox secara umum dievaluasi melalui dua sumbu utama pada ASN:"
- Metric 1: Rata-rata Organisasi **75,50** Aspek Kinerja (biru)
- Metric 2: Rata-rata Organisasi **69,20** Aspek Potensial (amber)

---

#### Row 2: 2-Column

**Chart 1 — Driver Aspek Kinerja**
- Subtitle: "Tren jumlah pegawai berdasarkan komponen penilaian (Jan-Apr 2026)"
- Type: **Multi-series line chart**
- Sumbu X: Jan 2026 / Feb 2026 / Mar 2026 / Apr 2026
- Y: 0–160
- Series:
  - Kenaikan Pangkat Luar Biasa / KPLB (hijau, ~5-10, flat)
  - Penghargaan (amber, naik dari ~40 ke ~75)
  - Penugasan (biru, naik dari ~120 ke ~160)

**Chart 2 — Driver Aspek Potensial**
- Subtitle: "Tren jumlah pegawai berdasarkan komponen penilaian (Jan-Apr 2026)"
- Type: **Multi-series line chart**
- Sumbu X: Jan 2026 / Feb 2026 / Mar 2026 / Apr 2026
- Y: 0–1800
- Series (6):
  - Asesmen Kompetensi (biru tua, ~1350 naik ke ~1700)
  - Asesmen Potensi (biru muda, ~1200 naik ke ~1650)
  - Hukuman Disiplin (merah dashed, ~0, flat)
  - Pelatihan (amber, ~950 naik ke ~1300)
  - Pendidikan S2/S3 (ungu, ~950 ke ~1150)
  - Sertifikasi (hijau, ~450, flat)

---

### Section C: Pengembangan Kompetensi
Header: "C. Pengembangan Kompetensi" (dengan divider)

#### KPI Row (6 cards, 2 rows × 3)

**Row 1 — Perencanaan**

| Card | Label | Value | Notes |
|------|-------|-------|-------|
| 1 | PERENCANAAN — PERSENTASE PEMBUATAN RENCANA BANGKOM | **85%** | Progress bar + "15% Gap (Belum menyusun)" |
| 2 | PERENCANAAN — RATA-RATA JAM PELATIHAN | **12 JP/pegawai** | — |
| 3 | PERENCANAAN — TARGET 20 JP | **25% tercapai** | Background biru tua, teks putih. "75% di bawah target (Target minimal 20 JP/Pegawai)" |

**Row 2 — Realisasi**

| Card | Label | Value | Notes |
|------|-------|-------|-------|
| 4 | REALISASI — PELAKSANAAN PELATIHAN | **42.5%** | Background biru, teks putih. Progress bar. "50% dari 85% yang telah memiliki rencana" |
| 5 | REALISASI — RATA-RATA JAM PELATIHAN | **5 JP/pegawai** | Background biru, teks putih |
| 6 | REALISASI — TARGET 20 JP | **5.0% tercapai** | Background biru, teks putih. "20% dari 25% target perencanaan" |

---

#### Row 3: 2-Column Charts

**Chart 1 — Distribusi Rencana JP**
- Label: "Periode: Triwulan 1 2026"
- Type: **Bar chart vertikal**
- Sumbu X: Kurang dari 10 JP / 10-15 JP / 15-20 JP / Lebih dari 20 JP
- Warna bar: biru tua
- Distribusi relatif merata, terbanyak di "Kurang dari 10 JP"

**Chart 2 — Realisasi Pelatihan**
- Subtitle: "Tren bulanan jumlah pegawai dan JP (Jan – Apr 2026)"
- Type: **Dual-axis line chart**
- Sumbu X: Jan 2026 / Feb 2026 / Mar 2026 / Apr 2026
- Sumbu Y kiri: 0–320 (Pegawai)
- Sumbu Y kanan: 0–6000 (Total JP)
- Series:
  - Pegawai (biru tua, naik dari ~100 ke ~300)
  - Total JP (biru muda, naik dari ~1500 ke ~4500)
- Legend di bawah

---

## Design Tokens (Reference)

### Colors
| Token | Hex (estimasi) | Usage |
|-------|----------------|-------|
| Primary Blue | #1E40AF | CTA, active tab, primary card |
| Blue 500 | #3B82F6 | Charts, secondary metrics |
| Blue 200 | #BFDBFE | Highlighted nine-box cell, area fill |
| Amber/Warning | #D97706 | Alert, risk indicators |
| Amber BG | #FEF3C7 | Warning card background |
| Red | #DC2626 | Negatif trend, "Alert" label |
| Green | #16A34A | Positif trend arrow |
| Gray 100 | #F3F4F6 | Card background default |
| Gray 400 | #9CA3AF | Vacancy bar, secondary chart |
| White | #FFFFFF | Card surface |

### Typography
| Role | Style |
|------|-------|
| Page Title | 24px Bold |
| Section Header | 18px SemiBold + divider |
| Card Label | 12px uppercase, letter-spacing |
| KPI Value (large) | 36–48px Bold |
| KPI Value (medium) | 24–28px Bold |
| Body/Caption | 14px Regular |
| Chip/Badge | 12px Medium, rounded |

### Spacing
- Page padding: 24px horizontal
- Card padding: 20px
- Gap antar card: 16px
- Gap antar section: 32px

---

## Catatan Figma Build

1. **Nine-Box Grid** — buat sebagai component dengan 9 cell, variant untuk highlighted state (active cell biru tua, secondary biru muda)
2. **KPI Card** — component dengan variant: default / primary (biru tua) / warning (amber) / alert (merah)
3. **Trend chip** — "Periode: Triwulan 1 2026" sebagai reusable chip component
4. **Tab navigation** — top-level 4 tab + secondary pill tabs di Tab 2
5. **Charts** — gunakan placeholder frame dengan label chart type; actual chart di prototype bisa pakai Figma chart plugin atau static mockup
6. **Alert banner** — component dengan icon ⚠️, background amber muda, border amber
7. **Sparkline** — line chart mini tanpa axis label, hanya untuk trend direction
