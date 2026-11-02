# Spec Tab 2 — Profil ASN Kemendikdasmen
## Portal Kemendikdasmen — Dashboard Analitik Eksekutif SDM ASN

**Page title:** "Profil ASN Kemendikdasmen"  
**Subtitle:** Update terakhir: 24 April 2026, 09:00 WIB

---

## Sub-tab Navigation

Container card putih, pill/toggle style, full-width. 4 sub-tab + filter di kanan:

| # | Label | State |
|---|-------|-------|
| 1 | Ringkasan & Siklus ASN | Default active |
| 2 | Pendidikan & Kapasitas Pegawai | — |
| 3 | Organisasi, Jabatan & Wilayah | — |
| 4 | Eksplorasi Matriks Pegawai | — |

**Filter Jenis Jabatan** (kanan, dengan icon funnel):
- Dropdown, label: "FILTER JENIS JABATAN"
- Pilihan (7 opsi):
  1. Seluruh Jabatan *(default)*
  2. Seluruh Manajerial
  3. JPT
  4. Administrator
  5. Pengawas
  6. Fungsional
  7. Pelaksana
- Selected item: checkmark + background biru
- Filter mempengaruhi seluruh data Tab 2 kecuali chart yang eksplisit menyatakan pengecualian
- Opsi 1–5 (Seluruh Jabatan, Seluruh Manajerial, JPT, Administrator, Pengawas) → Breakdown Manajerial card **aktif**
- Opsi 6–7 (Fungsional, Pelaksana) → Breakdown Manajerial card **empty state**

---

## Sub-tab 1 — Ringkasan & Siklus ASN

**Description:** "Menampilkan gambaran umum profil pegawai Kemendikdasmen berdasarkan jenis pegawai, demografi, masa kerja, dan siklus kepegawaian."

### KPI Summary Row (5 cards)

| Label | Value (Seluruh Jabatan) | Value (Pelaksana) | Style |
|-------|------------------------|-------------------|-------|
| TOTAL PEGAWAI | **12.500** | **3.750** | Card biru tua, teks putih |
| TOTAL PNS | **9.375** | **2.813** | Card putih |
| TOTAL PPPK | **2.500** | **750** | Card putih |
| PPPK PARUH WAKTU | **615** | **184** | Card putih |
| NON ASN | **10** | **3** | Card putih |

*Value berubah mengikuti Filter Jenis Jabatan.*

---

### Row 1: 2-Column Charts

**Chart 1 — Komposisi Jenis Pegawai**
- Type: **Donut chart**
- Segmen: Non ASN (kuning) / PNS (biru tua) / PPPK (biru muda) / PPPK Paruh Waktu (ungu)
- Legend horizontal di bawah

**Chart 2 — Distribusi Usia**
- Type: **Bar chart vertikal**
- Sumbu X: <25 / 26-30 / 31-35 / 36-40 / 41-45 / 46-50 / >50
- Warna bar: biru tua
- Tooltip on hover: contoh "26-30 — Jumlah Pegawai: 1.875"
- Terbanyak: 31-35, lalu 36-40

---

### Row 2: 2-Column Charts

**Chart 3 — Komposisi Jenis Kelamin**
- Type: **Donut chart**
- Segmen: Laki-laki (biru tua) / Perempuan (biru muda)
- Legend horizontal di bawah

**Chart 4 — Distribusi Masa Kerja**
- Type: **Bar chart vertikal**
- Sumbu X: <5 Tahun / 5-10 Tahun / 11-15 Tahun / 16-20 Tahun / >20 Tahun
- Warna bar: biru muda
- Terbanyak: 5-10 Tahun (~1k saat filter Pelaksana)

---

### Row 3: 2-Column Charts

**Chart 5 — Angkatan ASN Berdasarkan TMT CPNS**
- Type: **Area chart** (line + fill biru)
- Sumbu X: 2019–2025
- Trend naik, titik terendah 2020, puncak 2025
- *Terpengaruh filter jabatan* — saat Pelaksana Y-axis max ~800, saat Seluruh max ~2.8k

**Chart 6 — Proyeksi Pensiun 5 Thn**
- Type: **Bar chart vertikal**
- Sumbu X: 2026 / 2027 / 2028 / 2029 / 2030
- Warna bar: abu-abu
- Nilai naik dari ~2.7k ke ~4.2k
- **⚠️ Mengabaikan filter jabatan** — selalu tampil data semua jabatan regardless filter aktif
- Badge/chip kecil amber dengan icon ⓘ di bawah judul chart

---

## Sub-tab 2 — Pendidikan & Kapasitas Pegawai

**Description:** "Menampilkan gambaran jenjang pendidikan terakhir pegawai Kemendikdasmen secara agregat."

### Row 1: 2-Column (KPI kiri, Chart kanan)

**Kolom Kiri — 2 KPI Cards stacked**

| Label | Value | Notes |
|-------|-------|-------|
| JENJANG TERBANYAK | **S1 / D4** | Sub-value: "65% dari total" (biru) |
| PROPORSI S2/S3 | **12%** | Sub-label: "Kapasitas kepemimpinan strategis" |

**Kolom Kanan — Distribusi Pendidikan Terakhir**
- Type: **Bar chart vertikal**
- Sumbu X: S3 / S2 / S1/D4 / D3/D2/D1 / SMA/Sed
- Warna bar: biru tua
- Terbanyak: S1/D4 (~2.8k), disusul D3/D2/D1 dan SMA/Sed

---

### Row 2: 2-Column Charts

**Chart — Pendidikan berdasarkan Jenis Pegawai**
- Type: **Stacked bar chart vertikal**
- Sumbu X: S2/S3 / S1/D4 / < S1
- Segmen: Non ASN (kuning) / PNS (biru tua) / PPPK (biru muda)
- Legend di bawah
- Terbanyak: S1/D4, mayoritas PNS

**Chart — Pendidikan berdasarkan Rentang Usia**
- Type: **Stacked bar chart vertikal** (2 segmen)
- Sumbu X: <30 / 31-40 / 41-50 / >50
- Segmen: Di bawah S1 (biru muda) / S1 ke Atas (biru tua)
- Legend di bawah
- Terbanyak: 31-40

---

## Sub-tab 3 — Organisasi, Jabatan & Wilayah

**Description:** "Menampilkan persebaran pegawai berdasarkan unit organisasi, kelompok jabatan, dan wilayah kerja Kemendikdasmen."

### Row 1: 2-Column Charts

**Chart 1 — Jumlah Pegawai per Unit Kerja**
- Type: **Horizontal bar chart**
- Baris (urut terbesar): Ditjen GTK / Ditjen PAUD / Setjen / Badan Bahasa / Ditjen Diksi / Ditjen Dikdasmen / Itjen
- Warna bar: biru tua, single color tidak stacked

**Chart 2 — Komposisi Pegawai per Unit Kerja**
- Type: **Stacked bar chart vertikal** (2 segmen)
- Sumbu X: GTK / PAUD / Setjen / B. Bahasa / Diksi / Dikdasmen / Itjen
- Segmen: PNS (biru tua) / PPPK (biru muda)
- Legend di bawah

---

### Row 2: Full-width Chart

**Chart — Komposisi Jenis Jabatan per Unit Kerja**
- Type: **Stacked bar chart vertikal** (3 segmen)
- Sumbu X: GTK / PAUD / Setjen / B. Bahasa / Diksi / Dikdasmen / Itjen
- Segmen: Fungsional (biru sedang) / Manajerial (biru tua) / Pelaksana (biru muda)
- Legend di bawah

---

### Row 3: 2-Column Charts

**Chart — Sebaran Pusat vs UPT/Daerah**
- Type: **Donut chart**
- Segmen: Pusat / Kantor Pusat (biru tua) / UPT / Daerah (biru muda)
- Legend di bawah

**Chart — Sebaran Tipe Unit**
- Type: **Donut chart**
- Segmen: Balai (biru muda) / Balai Besar (biru sedang) / Kantor (ungu) / Pusat (biru tua)
- Legend di bawah

---

### Row 4: Breakdown Manajerial (Conditional)

**Card — Breakdown Manajerial**
- Title: "Breakdown Manajerial"
- Subtitle: "Hanya berlaku saat filter termasuk Manajerial/Semua"

**State A — Filter aktif = Seluruh Jabatan / Seluruh Manajerial / JPT / Administrator / Pengawas:**
- Menampilkan chart breakdown eselon/jenjang manajerial

**State B — Filter aktif = Fungsional / Pelaksana:**
- Empty state: teks italic abu-abu tengah "Filter saat ini tidak mencakup jabatan manajerial"
- Card tetap render (tidak dihide), hanya konten kosong

---

### Row 5: Full-width Chart

**Chart — Sebaran Pegawai Berdasarkan Wilayah Provinsi Utama**
- Type: **Bar chart vertikal**
- Sumbu X: DKI Jakarta / Jawa Barat / Jawa Tengah / Jawa Timur / Lainnya
- Warna bar: biru tua
- Terbanyak: Lainnya (~1.7k), DKI Jakarta (~900), Jawa Barat (~500)

---

## Sub-tab 4 — Eksplorasi Matriks Pegawai

**Description:** "Menyediakan eksplorasi komparasi data pegawai dalam bentuk matriks agregat yang telah dikurasi agar tetap mudah dibaca dan aman untuk publik."

### Controls Row

| Elemen | Type | Default |
|--------|------|---------|
| **Pilih Matriks** | Dropdown | "Pendidikan × Rentang Usia" |
| **Tampilkan Persentase Baris** | Toggle switch | OFF |

---

### Heatmap Table

Tabel dengan color-coding heatmap per cell berdasarkan nilai relatif (intensitas biru).

**Mock data — Pendidikan × Rentang Usia:**

| Kategori | <25 | 26-30 | 31-40 | 41-50 | >50 | **Total** |
|----------|-----|-------|-------|-------|-----|-----------|
| S3/S2 | 78 | 771 | 953 | 115 | 271 | **2.188** |
| S1/D4 | 721 | 1.123 | 1.406 | 1.033 | 633 | **4.916** |
| D3/D2/D1 | 448 | 451 | 860 | 462 | 1.538 | **3.759** |
| SMA/Sed | 255 | 187 | 1.474 | 483 | 1.087 | **3.486** |

**Heatmap rules:**
- Gradasi warna cell: Rendah (putih/biru sangat muda) → Tinggi (biru tua)
- Cell dengan nilai tertinggi per tabel = warna paling gelap
- Kolom "Total" = bold, tidak diberi heatmap color
- Legend di bawah tabel: `Heatmap Legend: Rendah ○ ○ ● ● Tinggi`
- Tooltip on hover: nilai angka + persentase baris (jika toggle ON)

**Behavior Toggle "Tampilkan Persentase Baris":**
- **OFF:** cell tampil angka absolut saja
- **ON:** cell tampil angka absolut + persentase terhadap total baris

---

## Catatan Figma Build — Tab 2

| Komponen | Notes |
|----------|-------|
| Sub-tab pills | Component dengan 4 variant (active/inactive), letakkan dalam satu container card |
| Filter dropdown | Component dengan selected state (checkmark + biru highlight) |
| KPI Card primary | Biru tua, teks putih, value besar |
| KPI Card secondary | Putih, label uppercase kecil, value bold |
| KPI Card with sub-value | Tambah slot untuk sub-label berwarna (biru/abu) |
| Donut chart | Placeholder frame + label chart type; 2–4 segmen variant |
| Bar chart vertikal | Placeholder frame; single color dan stacked variant |
| Bar chart horizontal | Placeholder frame; single color variant |
| Area chart | Placeholder frame; single series |
| Stacked bar vertikal | 2-segmen dan 3-segmen variant |
| Heatmap table | Grid komponen; cell dengan fill opacity variant (10%/30%/60%/90% biru) |
| Toggle switch | ON/OFF state |
| Badge info amber | Icon ⓘ + teks kecil, untuk "Mengabaikan filter jabatan" |
| Empty state card | Teks italic abu-abu, centered |
