export interface OrgUnit {
  id: string;
  name: string;
  shortName: string;
  children?: OrgUnit[];
}

export const orgHierarchy: OrgUnit = {
  id: 'kementerian',
  name: 'Kementerian Pendidikan Dasar dan Menengah',
  shortName: 'Kemendikdasmen',
  children: [
    {
      id: 'sekretariat-jenderal',
      name: 'Sekretariat Jenderal',
      shortName: 'Setjen',
      children: [
        { id: 'setjen-puslatsdm', name: 'Pusat Pelatihan Sumber Daya Manusia', shortName: 'Puslatsdm' },
        { id: 'setjen-pusdatin', name: 'Pusat Data dan Teknologi Informasi', shortName: 'Pusdatin' },
        { id: 'setjen-birokomunikasi', name: 'Biro Komunikasi dan Hubungan Masyarakat', shortName: 'Biro Komunikasi' },
        { id: 'setjen-birohukum', name: 'Biro Hukum', shortName: 'Biro Hukum' },
        { id: 'setjen-pusprestasinasional', name: 'Pusat Prestasi Nasional', shortName: 'Pusat Prestasi' },
        { id: 'setjen-puspenguatankarakter', name: 'Pusat Penguatan Karakter', shortName: 'Puspeka' },
        { id: 'setjen-birokeuangan', name: 'Biro Keuangan dan Barang Milik Negara', shortName: 'Biro Keuangan' },
        { id: 'setjen-biroperencanaan', name: 'Biro Perencanaan dan Kerja Sama', shortName: 'Biro Perencanaan' },
        { id: 'setjen-biroorganisasi', name: 'Biro Organisasi dan Sumber Daya Manusia', shortName: 'Biro OSDM' },
        { id: 'setjen-biroumubar', name: 'Biro Umum dan Pengadaan Barang dan Jasa', shortName: 'Biro Umum' },
        { id: 'setjen-puslayananpembiayaan', name: 'Pusat Layanan Pembiayaan Pendidikan', shortName: 'PLPP' },
      ],
    },
    {
      id: 'inspektorat-jenderal',
      name: 'Inspektorat Jenderal',
      shortName: 'Itjen',
      children: [
        { id: 'itjen-inspektorat1', name: 'Inspektorat I', shortName: 'Inspektorat I' },
        { id: 'itjen-inspektorat2', name: 'Inspektorat II', shortName: 'Inspektorat II' },
        { id: 'itjen-inspektorat3', name: 'Inspektorat III', shortName: 'Inspektorat III' },
        { id: 'itjen-inspektorat4', name: 'Inspektorat IV', shortName: 'Inspektorat IV' },
        { id: 'itjen-inspinvestigasi', name: 'Inspektorat Investigasi', shortName: 'Insp. Investigasi' },
        { id: 'itjen-sekretariat', name: 'Sekretariat Inspektorat Jenderal', shortName: 'Sekretariat' },
      ],
    },
    {
      id: 'ditjen-paud',
      name: 'Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah',
      shortName: 'Ditjen PAUD Dikdasmen',
      children: [
        { id: 'ditjen-paud-dirpaud', name: 'Direktorat Pendidikan Anak Usia Dini', shortName: 'Dit. PAUD' },
        { id: 'ditjen-paud-dirsd', name: 'Direktorat Sekolah Dasar', shortName: 'Dit. SD' },
        { id: 'ditjen-paud-dirsmp', name: 'Direktorat Sekolah Menengah Pertama', shortName: 'Dit. SMP' },
        { id: 'ditjen-paud-dirsma', name: 'Direktorat Sekolah Menengah Atas', shortName: 'Dit. SMA' },
        { id: 'ditjen-paud-dirpenmas', name: 'Direktorat Pendidikan Masyarakat dan Pendidikan Khusus', shortName: 'Dit. Penmas' },
        { id: 'ditjen-paud-sekretariat', name: 'Sekretariat Direktorat Jenderal', shortName: 'Sekretariat' },
      ],
    },
    {
      id: 'ditjen-vokasi',
      name: 'Direktorat Jenderal Pendidikan Vokasi, Pendidikan Khusus, dan Pendidikan Layanan Khusus',
      shortName: 'Ditjen Vokasi PK PLK',
      children: [
        { id: 'ditjen-vokasi-dirsmk', name: 'Direktorat Sekolah Menengah Kejuruan', shortName: 'Dit. SMK' },
        { id: 'ditjen-vokasi-dirkursus', name: 'Direktorat Kursus dan Pelatihan', shortName: 'Dit. Kursus' },
        { id: 'ditjen-vokasi-dirpk', name: 'Direktorat Pendidikan Khusus', shortName: 'Dit. PK' },
        { id: 'ditjen-vokasi-dirplk', name: 'Direktorat Pendidikan Layanan Khusus', shortName: 'Dit. PLK' },
        { id: 'ditjen-vokasi-sekretariat', name: 'Sekretariat Direktorat Jenderal', shortName: 'Sekretariat' },
      ],
    },
    {
      id: 'bskap',
      name: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan',
      shortName: 'BSKAP',
      children: [
        { id: 'bskap-pusstankur', name: 'Pusat Standar dan Kebijakan Pendidikan', shortName: 'Pus. Standar' },
        { id: 'bskap-pusasesmen', name: 'Pusat Asesmen Pendidikan', shortName: 'Pus. Asesmen' },
        { id: 'bskap-pusperbukuan', name: 'Pusat Perbukuan', shortName: 'Pus. Perbukuan' },
        { id: 'bskap-sekretariat', name: 'Sekretariat Badan', shortName: 'Sekretariat' },
      ],
    },
    {
      id: 'badan-bahasa',
      name: 'Badan Pengembangan dan Pembinaan Bahasa',
      shortName: 'Badan Bahasa',
      children: [
        { id: 'badanbahasa-puspengembangan', name: 'Pusat Pengembangan dan Pelindungan Bahasa dan Sastra', shortName: 'Pus. Pengembangan' },
        { id: 'badanbahasa-puspembinaan', name: 'Pusat Pembinaan Bahasa dan Sastra', shortName: 'Pus. Pembinaan' },
        { id: 'badanbahasa-balai', name: 'Balai dan Kantor Bahasa Daerah', shortName: 'Balai Bahasa' },
        { id: 'badanbahasa-sekretariat', name: 'Sekretariat Badan', shortName: 'Sekretariat' },
      ],
    },
  ],
};

export function findUnit(node: OrgUnit, id: string): OrgUnit | null {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findUnit(child, id);
      if (found) return found;
    }
  }
  return null;
}

export function getAncestorPath(unitId: string, node: OrgUnit = orgHierarchy): string[] {
  if (node.id === unitId) return [node.id];
  if (node.children) {
    for (const child of node.children) {
      const path = getAncestorPath(unitId, child);
      if (path.length > 0) return [node.id, ...path];
    }
  }
  return [];
}

function findParentId(unitId: string, node: OrgUnit = orgHierarchy): string | null {
  if (node.children) {
    for (const child of node.children) {
      if (child.id === unitId) return node.id;
      const found = findParentId(unitId, child);
      if (found !== null) return found;
    }
  }
  return null;
}

// Seeded LCG random number generator
function makeRng(seed: number) {
  let s = (seed >>> 0) || 1;
  return () => {
    s = Math.imul(1664525, s) + 1013904223;
    return (s >>> 0) / 0xffffffff;
  };
}

function strHash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(33, h) ^ str.charCodeAt(i);
  }
  return Math.abs(h >>> 0);
}

interface UnitBaseParams {
  totalASN: number;
  sakip: number;
  wbk: number;
  wbbm: number;
  keterisian: number;
}

const LEVEL1_PARAMS: Record<string, UnitBaseParams> = {
  // Root
  kementerian:                    { totalASN: 12500, sakip: 83.1, wbk: 35, wbbm: 10, keterisian: 88 },

  // Level 1 — direct children of kementerian
  'sekretariat-jenderal':         { totalASN: 2800,  sakip: 84.5, wbk: 8,  wbbm: 3,  keterisian: 92 },
  'inspektorat-jenderal':         { totalASN: 550,   sakip: 85.2, wbk: 2,  wbbm: 1,  keterisian: 89 },
  'ditjen-paud':                  { totalASN: 2800,  sakip: 82.3, wbk: 7,  wbbm: 1,  keterisian: 88 },
  'ditjen-vokasi':                { totalASN: 1450,  sakip: 82.8, wbk: 5,  wbbm: 2,  keterisian: 87 },
  bskap:                          { totalASN: 1500,  sakip: 83.5, wbk: 6,  wbbm: 2,  keterisian: 90 },
  'badan-bahasa':                 { totalASN: 1500,  sakip: 81.9, wbk: 4,  wbbm: 1,  keterisian: 86 },

  // Level 2 — Sekretariat Jenderal
  'setjen-puslatsdm':             { totalASN: 320,  sakip: 84.0, wbk: 1, wbbm: 0, keterisian: 91 },
  'setjen-pusdatin':              { totalASN: 280,  sakip: 85.5, wbk: 1, wbbm: 1, keterisian: 93 },
  'setjen-birokomunikasi':        { totalASN: 180,  sakip: 83.0, wbk: 0, wbbm: 0, keterisian: 88 },
  'setjen-birohukum':             { totalASN: 150,  sakip: 84.5, wbk: 1, wbbm: 0, keterisian: 90 },
  'setjen-pusprestasinasional':   { totalASN: 260,  sakip: 82.5, wbk: 0, wbbm: 0, keterisian: 87 },
  'setjen-puspenguatankarakter':  { totalASN: 240,  sakip: 83.8, wbk: 0, wbbm: 0, keterisian: 89 },
  'setjen-birokeuangan':          { totalASN: 310,  sakip: 86.0, wbk: 2, wbbm: 1, keterisian: 94 },
  'setjen-biroperencanaan':       { totalASN: 220,  sakip: 84.2, wbk: 1, wbbm: 0, keterisian: 91 },
  'setjen-biroorganisasi':        { totalASN: 200,  sakip: 83.5, wbk: 1, wbbm: 0, keterisian: 90 },
  'setjen-biroumubar':            { totalASN: 380,  sakip: 82.0, wbk: 0, wbbm: 0, keterisian: 86 },
  'setjen-puslayananpembiayaan':  { totalASN: 260,  sakip: 83.3, wbk: 1, wbbm: 0, keterisian: 88 },

  // Level 2 — Inspektorat Jenderal
  'itjen-inspektorat1':           { totalASN: 75,   sakip: 85.0, wbk: 1, wbbm: 0, keterisian: 90 },
  'itjen-inspektorat2':           { totalASN: 70,   sakip: 84.5, wbk: 0, wbbm: 0, keterisian: 88 },
  'itjen-inspektorat3':           { totalASN: 72,   sakip: 85.8, wbk: 1, wbbm: 1, keterisian: 92 },
  'itjen-inspektorat4':           { totalASN: 68,   sakip: 84.2, wbk: 0, wbbm: 0, keterisian: 87 },
  'itjen-inspinvestigasi':        { totalASN: 65,   sakip: 86.5, wbk: 0, wbbm: 0, keterisian: 91 },
  'itjen-sekretariat':            { totalASN: 200,  sakip: 83.0, wbk: 0, wbbm: 0, keterisian: 86 },

  // Level 2 — Ditjen PAUD Dikdasmen
  'ditjen-paud-dirpaud':          { totalASN: 380,  sakip: 82.0, wbk: 1, wbbm: 0, keterisian: 86 },
  'ditjen-paud-dirsd':            { totalASN: 520,  sakip: 82.5, wbk: 2, wbbm: 0, keterisian: 88 },
  'ditjen-paud-dirsmp':           { totalASN: 410,  sakip: 81.8, wbk: 1, wbbm: 0, keterisian: 87 },
  'ditjen-paud-dirsma':           { totalASN: 390,  sakip: 83.0, wbk: 1, wbbm: 1, keterisian: 89 },
  'ditjen-paud-dirpenmas':        { totalASN: 350,  sakip: 80.5, wbk: 0, wbbm: 0, keterisian: 84 },
  'ditjen-paud-sekretariat':      { totalASN: 750,  sakip: 83.5, wbk: 2, wbbm: 0, keterisian: 90 },

  // Level 2 — Ditjen Vokasi
  'ditjen-vokasi-dirsmk':         { totalASN: 380,  sakip: 83.0, wbk: 2, wbbm: 1, keterisian: 88 },
  'ditjen-vokasi-dirkursus':      { totalASN: 280,  sakip: 81.5, wbk: 1, wbbm: 0, keterisian: 85 },
  'ditjen-vokasi-dirpk':          { totalASN: 260,  sakip: 82.8, wbk: 1, wbbm: 0, keterisian: 87 },
  'ditjen-vokasi-dirplk':         { totalASN: 230,  sakip: 81.0, wbk: 0, wbbm: 0, keterisian: 84 },
  'ditjen-vokasi-sekretariat':    { totalASN: 300,  sakip: 83.5, wbk: 1, wbbm: 1, keterisian: 90 },

  // Level 2 — BSKAP
  'bskap-pusstankur':             { totalASN: 380,  sakip: 84.0, wbk: 2, wbbm: 1, keterisian: 91 },
  'bskap-pusasesmen':             { totalASN: 420,  sakip: 83.5, wbk: 2, wbbm: 1, keterisian: 90 },
  'bskap-pusperbukuan':           { totalASN: 350,  sakip: 82.8, wbk: 1, wbbm: 0, keterisian: 88 },
  'bskap-sekretariat':            { totalASN: 350,  sakip: 84.5, wbk: 1, wbbm: 0, keterisian: 92 },

  // Level 2 — Badan Bahasa
  'badanbahasa-puspengembangan':  { totalASN: 350,  sakip: 82.5, wbk: 1, wbbm: 0, keterisian: 87 },
  'badanbahasa-puspembinaan':     { totalASN: 320,  sakip: 81.5, wbk: 1, wbbm: 0, keterisian: 85 },
  'badanbahasa-balai':            { totalASN: 580,  sakip: 80.5, wbk: 2, wbbm: 1, keterisian: 84 },
  'badanbahasa-sekretariat':      { totalASN: 250,  sakip: 83.0, wbk: 0, wbbm: 0, keterisian: 88 },
};

function getBaseParams(unitId: string): UnitBaseParams & { rng: () => number } {
  const rng = makeRng(strHash(unitId));
  if (LEVEL1_PARAMS[unitId]) return { ...LEVEL1_PARAMS[unitId], rng };

  const parentId = findParentId(unitId) || 'kementerian';
  const parentParams = LEVEL1_PARAMS[parentId] || LEVEL1_PARAMS.kementerian;
  const parentUnit = findUnit(orgHierarchy, parentId);
  const numSiblings = parentUnit?.children?.length || 1;
  const scale = 1 / numSiblings;

  return {
    totalASN:   Math.max(50, Math.round(parentParams.totalASN * scale * (0.55 + rng() * 0.90))),
    sakip:      Math.min(95, Math.max(75, parentParams.sakip + (rng() * 8 - 4))),
    wbk:        Math.max(0, Math.round(parentParams.wbk * scale * (0.4 + rng() * 1.2))),
    wbbm:       Math.max(0, Math.round(parentParams.wbbm * scale * (0.2 + rng() * 1.6))),
    keterisian: Math.min(98, Math.max(74, parentParams.keterisian + (rng() * 14 - 7))),
    rng,
  };
}

function makeSubUnitRng(unitId: string, salt: number) {
  return makeRng(strHash(unitId) ^ (salt * 2654435769));
}

export function generateUnitChartData(unitId: string) {
  const params = getBaseParams(unitId);
  const { rng, sakip, wbk, wbbm, keterisian } = params;
  const totalASN = params.totalASN;

  let totalPNS       = Math.floor(totalASN * (0.68 + rng() * 0.10));
  const totalPPPK      = Math.floor(totalASN * (0.16 + rng() * 0.08));
  const pppkParuhWaktu = Math.floor(totalASN * (0.025 + rng() * 0.035));
  const nonASN         = Math.max(1, Math.floor(totalASN * (0.008 + rng() * 0.015)));

  // Ensure breakdown tallies exactly to totalASN
  const calculatedSum = totalPNS + totalPPPK + pppkParuhWaktu + nonASN;
  if (calculatedSum !== totalASN) {
    totalPNS = totalPNS + (totalASN - calculatedSum);
  }

  // --- Kinerja distribution ---
  const kSngtKurang = Math.round(1 + rng() * 3);
  const kKurang     = Math.round(3 + rng() * 5);
  const kPerbaikan  = Math.round(8 + rng() * 9);
  const kBaik       = Math.round(45 + rng() * 20);
  const kSngtBaik   = Math.max(1, 100 - kSngtKurang - kKurang - kPerbaikan - kBaik);
  const kinerjaPositifPct = kBaik + kSngtBaik;

  const kinerjaData = [
    { name: 'Sngt Kurang', value: kSngtKurang },
    { name: 'Kurang',      value: kKurang },
    { name: 'Perbaikan',   value: kPerbaikan },
    { name: 'Baik',        value: kBaik },
    { name: 'Sngt Baik',   value: kSngtBaik },
  ];

  // --- Nine-box ---
  const c1 = Math.round(1 + rng() * 3);
  const c2 = Math.round(3 + rng() * 4);
  const c3 = Math.round(3 + rng() * 5);
  const c4 = Math.round(3 + rng() * 5);
  const c5 = Math.round(35 + rng() * 20);
  const c6 = Math.round(5 + rng() * 8);
  const c7 = Math.round(2 + rng() * 4);
  const c8 = Math.round(5 + rng() * 8);
  const c9 = Math.round(8 + rng() * 8);

  const nineBoxData = [
    { row: 'Tinggi',    cols: [{ label: 'IV', value: `${c4}%` }, { label: 'VII', value: `${c7}%` }, { label: 'IX', value: `${c9}%`, highlight: 'secondary' as const }] },
    { row: 'Potensial', cols: [{ label: 'II', value: `${c2}%` }, { label: 'V',   value: `${c5}%`, highlight: 'primary'   as const }, { label: 'VIII', value: `${c8}%` }] },
    { row: 'Rendah',    cols: [{ label: 'I',  value: `${c1}%` }, { label: 'III', value: `${c3}%` }, { label: 'VI',  value: `${c6}%` }] },
  ];
  const talentaSuksesiPct = c7 + c8 + c9;
  const talentaPotensialPct = Math.round(5 + rng() * 8);
  const talentaBelumPeta = Math.round(totalASN * (0.06 + rng() * 0.06));

  // --- SAKIP / WBK / WBBM trends ---
  const sakipBase = sakip - 4.5;
  const trendSakipData = [2021, 2022, 2023, 2024, 2025].map((year, i) => ({
    year: String(year),
    value: Math.round((sakipBase + (i * (sakip - sakipBase) / 4) + (rng() * 0.3)) * 10) / 10,
  }));
  const trendWBKData = [2021, 2022, 2023, 2024, 2025].map((year, i) => ({
    year: String(year),
    value: Math.max(0, Math.round(wbk * (0.45 + i * 0.14) + (rng() * 2 - 1))),
  }));
  const trendWBBMData = [2021, 2022, 2023, 2024, 2025].map((year, i) => ({
    year: String(year),
    value: Math.max(0, Math.round(wbbm * (0.20 + i * 0.21) + (rng() * 1 - 0.5))),
  }));

  // --- Sub-unit information ---
  const unit = findUnit(orgHierarchy, unitId);
  const subUnits = unit?.children || [];
  const hasSubUnits = subUnits.length > 0;

  // Combined WBK/WBBM data for stacked bar chart
  const trendZIStackedData = [2021, 2022, 2023, 2024, 2025].map((year, i) => {
    const totalUnits = Math.max(20, subUnits.length || 50);
    const wbkCount = Math.max(0, Math.round(wbk * (0.45 + i * 0.14) + (rng() * 2 - 1)));
    const wbbmCount = Math.max(0, Math.round(wbbm * (0.20 + i * 0.21) + (rng() * 1 - 0.5)));
    const belumZICount = Math.max(0, totalUnits - wbkCount - wbbmCount);

    return {
      year: String(year),
      'Belum ZI': belumZICount,
      'WBK': wbkCount,
      'WBBM': wbbmCount,
    };
  });

  // RB (Reformasi Birokrasi) trend data - grouped bar chart
  const rbBase = 78; // Starting point for 2021
  const trendRBData = [2021, 2022, 2023, 2024, 2025].map((year, i) => {
    const kemendikdasmen = Math.round((rbBase + (i * 3.4) + (rng() * 0.5)) * 10) / 10;
    const rerataNasional = Math.round((rbBase - 5 + (i * 2.2) + (rng() * 0.3)) * 10) / 10;
    return {
      year: String(year),
      Kemendikdasmen: kemendikdasmen,
      'Rerata Nasional': rerataNasional,
    };
  });

  function suAsn(su: OrgUnit) {
    return Math.max(30, Math.round(totalASN / subUnits.length * (0.55 + makeSubUnitRng(su.id, 1)() * 0.90)));
  }

  // --- Kinerja per unit ---
  const kinerjaPerUnitData = hasSubUnits
    ? subUnits.map((su) => {
        const r = makeSubUnitRng(su.id, 2);
        const sb = Math.round(8 + r() * 12);
        const b  = Math.round(44 + r() * 20);
        const c  = Math.round(14 + r() * 14);
        const k  = Math.round(5 + r() * 10);
        const sk = Math.max(1, 100 - sb - b - c - k);
        return { unit: su.shortName, 'Sangat Baik': sb, 'Baik': b, 'Cukup': c, 'Kurang': k, 'Sangat Kurang': sk };
      })
    : [{ unit: 'Unit Ini', 'Sangat Baik': kSngtBaik, 'Baik': kBaik, 'Cukup': kPerbaikan, 'Kurang': kKurang, 'Sangat Kurang': kSngtKurang }];

  // --- Top Jabatan Perlu Perhatian ---
  const jabatanNames = [
    'Kepala Seksi Muda', 'Pengembang Teknologi Pembelajaran Muda', 'Pranata Komputer Ahli Pertama',
    'Analis Kebijakan Ahli Muda', 'Arsiparis Mahir', 'Pengadministrasi Umum',
    'Perancang Peraturan Perundang-undangan Muda', 'Analis Kepegawaian Muda', 'Auditor Ahli Muda',
  ];
  const topJabatanPerluPerhatianData = [
    { kategori: 'SANGAT KURANG', jabatan: jabatanNames[0], jumlah: Math.round(8 + rng() * 10),  color: '#DC2626' },
    { kategori: 'SANGAT KURANG', jabatan: jabatanNames[1], jumlah: Math.round(5 + rng() * 8),   color: '#DC2626' },
    { kategori: 'SANGAT KURANG', jabatan: jabatanNames[2], jumlah: Math.round(4 + rng() * 7),   color: '#DC2626' },
    { kategori: 'KURANG',        jabatan: jabatanNames[3], jumlah: Math.round(10 + rng() * 10), color: '#F97316' },
    { kategori: 'KURANG',        jabatan: jabatanNames[4], jumlah: Math.round(8 + rng() * 8),   color: '#F97316' },
    { kategori: 'KURANG',        jabatan: jabatanNames[5], jumlah: Math.round(5 + rng() * 7),   color: '#F97316' },
    { kategori: 'BUTUH PERBAIKAN', jabatan: jabatanNames[6], jumlah: Math.round(20 + rng() * 20), color: '#EAB308' },
    { kategori: 'BUTUH PERBAIKAN', jabatan: jabatanNames[7], jumlah: Math.round(15 + rng() * 15), color: '#EAB308' },
    { kategori: 'BUTUH PERBAIKAN', jabatan: jabatanNames[8], jumlah: Math.round(10 + rng() * 12), color: '#EAB308' },
  ];

  // --- Profil ASN: Demografi ---
  const usiaW = [0.05, 0.14, 0.22, 0.18, 0.15, 0.13, 0.13].map(w => w + (rng() * 0.05 - 0.025));
  const usiaT = usiaW.reduce((a, b) => a + b, 0);
  const distribusiUsiaData = ['<25', '26-30', '31-35', '36-40', '41-45', '46-50', '>50'].map((range, i) => ({
    range, value: Math.round((usiaW[i] / usiaT) * totalASN),
  }));

  const lkPct = 0.44 + rng() * 0.17;
  const jenisKelaminData = [
    { name: 'Laki-laki', value: Math.round(totalASN * lkPct),       fill: '#1E3A8A' },
    { name: 'Perempuan', value: Math.round(totalASN * (1 - lkPct)), fill: '#60A5FA' },
  ];

  const masaKerjaData = [
    { range: '<5 Tahun',    value: Math.round(totalASN * (0.15 + rng() * 0.10)) },
    { range: '5-10 Tahun',  value: Math.round(totalASN * (0.25 + rng() * 0.10)) },
    { range: '11-15 Tahun', value: Math.round(totalASN * (0.22 + rng() * 0.08)) },
    { range: '16-20 Tahun', value: Math.round(totalASN * (0.18 + rng() * 0.08)) },
    { range: '>20 Tahun',   value: Math.round(totalASN * (0.14 + rng() * 0.10)) },
  ];

  const angkatanASNData = [2019, 2020, 2021, 2022, 2023, 2024, 2025].map((year, i) => ({
    year: String(year),
    value: Math.round(totalASN * (0.04 + i * 0.023 + rng() * 0.015)),
  }));

  const pensiunBase = Math.max(5, Math.round(totalASN * 0.018));
  const proyeksiPensiunData = [2026, 2027, 2028, 2029, 2030].map((year, i) => ({
    year: String(year),
    value: Math.round(pensiunBase * (1 + i * 0.16) + rng() * pensiunBase * 0.18),
  }));

  // --- Pendidikan ---
  const s3Val  = Math.round(totalASN * (0.004 + rng() * 0.014));
  const s2Val  = Math.round(totalASN * (0.075 + rng() * 0.055));
  const s1Val  = Math.round(totalASN * (0.52  + rng() * 0.16));
  const d3Val  = Math.round(totalASN * (0.09  + rng() * 0.08));
  const smaVal = Math.max(0, totalASN - s3Val - s2Val - s1Val - d3Val);
  const pendidikanData = [
    { jenjang: 'S3',      value: s3Val },
    { jenjang: 'S2',      value: s2Val },
    { jenjang: 'S1/D4',   value: s1Val },
    { jenjang: 'D3/D2/D1',value: d3Val },
    { jenjang: 'SMA/Sed', value: smaVal },
  ];

  const pendidikanByJenisPegawaiData = [
    { kategori: 'S2/S3',  'Non ASN': Math.round(nonASN * 0.3),  PNS: Math.round(totalPNS * (0.10 + rng() * 0.05)),  PPPK: Math.round(totalPPPK * (0.06 + rng() * 0.04)) },
    { kategori: 'S1/D4',  'Non ASN': Math.round(nonASN * 0.5),  PNS: Math.round(totalPNS * (0.62 + rng() * 0.08)),  PPPK: Math.round(totalPPPK * (0.68 + rng() * 0.08)) },
    { kategori: '<S1',    'Non ASN': Math.round(nonASN * 0.2),  PNS: Math.round(totalPNS * (0.22 + rng() * 0.06)),  PPPK: Math.round(totalPPPK * (0.20 + rng() * 0.06)) },
  ];

  const pendidikanByUsiaData = [
    { rentang: '<30',   'Di bawah S1': Math.round(totalASN * (0.022 + rng() * 0.02)), 'S1 ke Atas': Math.round(totalASN * (0.075 + rng() * 0.03)) },
    { rentang: '31-40', 'Di bawah S1': Math.round(totalASN * (0.088 + rng() * 0.03)), 'S1 ke Atas': Math.round(totalASN * (0.28  + rng() * 0.06)) },
    { rentang: '41-50', 'Di bawah S1': Math.round(totalASN * (0.065 + rng() * 0.03)), 'S1 ke Atas': Math.round(totalASN * (0.20  + rng() * 0.05)) },
    { rentang: '>50',   'Di bawah S1': Math.round(totalASN * (0.025 + rng() * 0.02)), 'S1 ke Atas': Math.round(totalASN * (0.045 + rng() * 0.02)) },
  ];

  // --- Per-unit profil charts ---
  const pegawaiPerUnitData = hasSubUnits
    ? subUnits.map(su => ({ unit: su.shortName, value: suAsn(su) }))
    : [{ unit: 'Unit Ini', value: totalASN }];

  const komposisiPerUnitData = hasSubUnits
    ? subUnits.map(su => {
        const a = suAsn(su);
        return { unit: su.shortName, PNS: Math.round(a * 0.70), PPPK: Math.round(a * 0.22) };
      })
    : [{ unit: 'Unit Ini', PNS: totalPNS, PPPK: totalPPPK }];

  const jabatanPerUnitData = hasSubUnits
    ? subUnits.map(su => {
        const a = suAsn(su);
        const r2 = makeSubUnitRng(su.id, 3);
        const fP = 0.44 + r2() * 0.16;
        const mP = 0.24 + r2() * 0.10;
        return { unit: su.shortName, Fungsional: Math.round(a * fP), Manajerial: Math.round(a * mP), Pelaksana: Math.round(a * (1 - fP - mP)) };
      })
    : [{ unit: 'Unit Ini', Fungsional: Math.round(totalASN * 0.50), Manajerial: Math.round(totalASN * 0.25), Pelaksana: Math.round(totalASN * 0.25) }];

  const pusatPct = 0.42 + rng() * 0.32;
  const sebaranPusatData = [
    { name: 'Pusat / Kantor Pusat', value: Math.round(totalASN * pusatPct),       fill: '#1E3A8A' },
    { name: 'UPT / Daerah',         value: Math.round(totalASN * (1 - pusatPct)), fill: '#60A5FA' },
  ];

  const bV  = Math.round(totalASN * (0.09 + rng() * 0.05));
  const bbV = Math.round(totalASN * (0.14 + rng() * 0.05));
  const kV  = Math.round(totalASN * (0.19 + rng() * 0.05));
  const pV  = Math.max(0, totalASN - bV - bbV - kV);
  const sebaranTipeData = [
    { name: 'Balai',      value: bV,  fill: '#60A5FA' },
    { name: 'Balai Besar',value: bbV, fill: '#3B82F6' },
    { name: 'Kantor',     value: kV,  fill: '#8B5CF6' },
    { name: 'Pusat',      value: pV,  fill: '#1E3A8A' },
  ];

  const wilayahData = [
    { provinsi: 'DKI Jakarta', value: Math.round(totalASN * (0.04 + rng() * 0.06)) },
    { provinsi: 'Jawa Barat',  value: Math.round(totalASN * (0.025 + rng() * 0.04)) },
    { provinsi: 'Jawa Tengah', value: Math.round(totalASN * (0.018 + rng() * 0.03)) },
    { provinsi: 'Jawa Timur',  value: Math.round(totalASN * (0.018 + rng() * 0.03)) },
    { provinsi: 'Lainnya',     value: Math.round(totalASN * (0.09  + rng() * 0.06)) },
  ];

  const totalMan = Math.round(totalASN * (0.11 + rng() * 0.06));
  const pengV    = Math.round(totalMan * (0.54 + rng() * 0.10));
  const admV     = Math.round(totalMan * (0.24 + rng() * 0.09));
  const jptPrV   = Math.round(totalMan * (0.12 + rng() * 0.05));
  const jptMV    = Math.max(1, totalMan - pengV - admV - jptPrV);
  const breakdownManajerialData = [
    { name: 'Pengawas',        value: pengV,  fill: '#F59E0B' },
    { name: 'Administrator',   value: admV,   fill: '#8B5CF6' },
    { name: 'JPT Pratama',     value: jptPrV, fill: '#60A5FA' },
    { name: 'JPT Utama/Madya', value: jptMV,  fill: '#0891B2' },
  ];

  // --- Heatmap matrices ---
  const pendidikanUsiaMatrix = [
    { kategori: 'S3/S2',    '<25': Math.round((s3Val + s2Val) * 0.04), '26-30': Math.round((s3Val + s2Val) * 0.30), '31-40': Math.round((s3Val + s2Val) * 0.40), '41-50': Math.round((s3Val + s2Val) * 0.16), '>50': Math.round((s3Val + s2Val) * 0.10), total: s3Val + s2Val },
    { kategori: 'S1/D4',    '<25': Math.round(s1Val * 0.12), '26-30': Math.round(s1Val * 0.23), '31-40': Math.round(s1Val * 0.30), '41-50': Math.round(s1Val * 0.22), '>50': Math.round(s1Val * 0.13), total: s1Val },
    { kategori: 'D3/D2/D1', '<25': Math.round(d3Val * 0.11), '26-30': Math.round(d3Val * 0.12), '31-40': Math.round(d3Val * 0.24), '41-50': Math.round(d3Val * 0.13), '>50': Math.round(d3Val * 0.40), total: d3Val },
    { kategori: 'SMA/Sed',  '<25': Math.round(smaVal * 0.07), '26-30': Math.round(smaVal * 0.05), '31-40': Math.round(smaVal * 0.42), '41-50': Math.round(smaVal * 0.14), '>50': Math.round(smaVal * 0.32), total: Math.max(0, smaVal) },
  ];

  const jenisPegawaiUsiaMatrix = [
    { kategori: 'PNS',             '<25': Math.round(totalPNS * 0.05),       '26-30': Math.round(totalPNS * 0.22),       '31-40': Math.round(totalPNS * 0.28),       '41-50': Math.round(totalPNS * 0.25),       '>50': Math.round(totalPNS * 0.20),       total: totalPNS },
    { kategori: 'PPPK',            '<25': Math.round(totalPPPK * 0.28),      '26-30': Math.round(totalPPPK * 0.24),      '31-40': Math.round(totalPPPK * 0.28),      '41-50': Math.round(totalPPPK * 0.14),      '>50': Math.round(totalPPPK * 0.06),      total: totalPPPK },
    { kategori: 'PPPK Paruh Waktu','<25': Math.round(pppkParuhWaktu * 0.19),'26-30': Math.round(pppkParuhWaktu * 0.10),'31-40': Math.round(pppkParuhWaktu * 0.35),'41-50': Math.round(pppkParuhWaktu * 0.20),'> 50': Math.round(pppkParuhWaktu * 0.16),total: pppkParuhWaktu, '>50': Math.round(pppkParuhWaktu * 0.16) },
    { kategori: 'Non ASN',         '<25': Math.round(nonASN * 0.30),         '26-30': Math.round(nonASN * 0.24),         '31-40': Math.round(nonASN * 0.25),         '41-50': Math.round(nonASN * 0.12),         '>50': Math.round(nonASN * 0.09),         total: nonASN },
  ];

  const subUnitNames = hasSubUnits ? subUnits.slice(0, 7).map(su => su.shortName) : ['Unit Ini'];
  const subUnitAsns  = hasSubUnits ? subUnits.slice(0, 7).map(su => suAsn(su)) : [totalASN];

  const unitKerjaPendidikanMatrix = subUnitNames.map((name, i) => {
    const a  = subUnitAsns[i];
    const r2 = makeSubUnitRng(name, 5);
    const sS = Math.round(a * (0.06 + r2() * 0.10));
    const sS1 = Math.round(a * (0.52 + r2() * 0.16));
    const sD  = Math.round(a * (0.09 + r2() * 0.09));
    const sSma = Math.max(0, a - sS - sS1 - sD);
    return { kategori: name, 'S3/S2': sS, 'S1/D4': sS1, 'D3/D2/D1': sD, 'SMA/Sed': sSma, total: a };
  });

  const unitKerjaJenisPegawaiMatrix = subUnitNames.map((name, i) => {
    const a  = subUnitAsns[i];
    const r2 = makeSubUnitRng(name, 6);
    const sPns  = Math.round(a * (0.62 + r2() * 0.14));
    const sPppk = Math.round(a * (0.18 + r2() * 0.10));
    const sPpw  = Math.round(a * (0.02 + r2() * 0.03));
    const sNon  = Math.max(0, a - sPns - sPppk - sPpw);
    return { kategori: name, PNS: sPns, PPPK: sPppk, 'PPPK Paruh Waktu': sPpw, 'Non ASN': sNon, total: a };
  });

  // --- Tab 3: Organisasi & Keterisian ---
  const fulfillmentData = [
    { jenis: 'Manajerial', kosong: Math.round(3 + rng() * 10), terisi: 0 },
    { jenis: 'Fungsional', kosong: Math.round(5 + rng() * 15), terisi: 0 },
    { jenis: 'Pelaksana',  kosong: Math.round(4 + rng() * 12), terisi: 0 },
  ].map(d => ({ ...d, terisi: 100 - d.kosong }));

  const jabatanKosongPerUnitData = hasSubUnits
    ? subUnits.slice(0, 7).map(su => {
        const r2 = makeSubUnitRng(su.id, 7);
        return { unit: su.shortName, struktural: Math.round(1 + r2() * 14), fungsional: Math.round(2 + r2() * 18), pelaksana: Math.round(2 + r2() * 16) };
      })
    : [{ unit: 'Unit Ini', struktural: 5, fungsional: 10, pelaksana: 8 }];

  const qBase = Math.max(3, Math.round(totalASN * 0.007));
  const pensiunPerKuartalData = [
    { periode: 'Tw 1 2026', value: qBase },
    { periode: 'Tw 2 2026', value: Math.round(qBase * (1.1 + rng() * 0.25)) },
    { periode: 'Tw 3 2026', value: Math.round(qBase * (1.3 + rng() * 0.25)) },
    { periode: 'Tw 4 2026', value: Math.round(qBase * (1.5 + rng() * 0.25)) },
  ];
  const totalPensiun2026 = pensiunPerKuartalData.reduce((a, b) => a + b.value, 0);

  const pensiunPerJabatanItems = [
    { jabatan: 'Eselon II',  value: Math.max(1, Math.round(totalPensiun2026 * (0.025 + rng() * 0.03))) },
    { jabatan: 'Eselon III', value: Math.max(1, Math.round(totalPensiun2026 * (0.055 + rng() * 0.04))) },
    { jabatan: 'Eselon IV',  value: Math.max(1, Math.round(totalPensiun2026 * (0.085 + rng() * 0.05))) },
    { jabatan: 'Ahli Utama', value: Math.max(1, Math.round(totalPensiun2026 * (0.035 + rng() * 0.03))) },
    { jabatan: 'Ahli Madya', value: Math.max(1, Math.round(totalPensiun2026 * (0.075 + rng() * 0.04))) },
  ];
  const pensiunNonKritis = Math.max(3, totalPensiun2026 - pensiunPerJabatanItems.reduce((a, b) => a + b.value, 0));
  const pensiunPerJabatanData = [...pensiunPerJabatanItems, { jabatan: 'JF/Pelaksana Lainnya', value: pensiunNonKritis }];

  const ziLevel = rng() < 0.55 ? 2 : rng() < 0.5 ? 1 : 0;
  const trendZIData = [
    { year: '2021', level: Math.max(0, ziLevel - 2) },
    { year: '2022', level: Math.max(0, ziLevel - 2) },
    { year: '2023', level: Math.max(0, ziLevel - 1) },
    { year: '2024', level: Math.max(0, ziLevel - 1) },
    { year: '2025', level: ziLevel },
  ];
  const ziPredikat = ['Belum ZI', 'WBK', 'WBBM'][ziLevel];

  const aspekZIBase = [88, 84, 81, 86, 83, 80];
  const aspekZI = [
    { aspek: 'Manajemen Perubahan',              nilai: Math.round(aspekZIBase[0] + rng() * 4 - 1), perubahan: Math.round(rng() * 8 - 2) },
    { aspek: 'Deregulasi Kebijakan',             nilai: Math.round(aspekZIBase[1] + rng() * 4 - 1), perubahan: Math.round(rng() * 6 - 2) },
    { aspek: 'Penataan Tata Laksana',            nilai: Math.round(aspekZIBase[2] + rng() * 4 - 1), perubahan: Math.round(rng() * 5 - 3) },
    { aspek: 'Penataan Sistem Manajemen SDM',    nilai: Math.round(aspekZIBase[3] + rng() * 4 - 1), perubahan: Math.round(rng() * 8 - 1) },
    { aspek: 'Penguatan Akuntabilitas',          nilai: Math.round(aspekZIBase[4] + rng() * 4 - 1), perubahan: Math.round(rng() * 6 - 2) },
    { aspek: 'Penguatan Pengawasan',             nilai: Math.round(aspekZIBase[5] + rng() * 4 - 1), perubahan: Math.round(rng() * 7 - 3) },
  ].map(d => ({ ...d, trend: d.perubahan >= 0 ? 'up' as const : 'down' as const }));

  const jabStrKosong = Math.round(8 + rng() * 10);
  const jabFunKosong = Math.round(15 + rng() * 20);
  const jabKritis    = Math.round(10 + rng() * 14);
  const eselon12     = Math.round(3 + rng() * 5);

  // --- Tab 4: Kinerja & Talenta ---
  const kPos0 = Math.round(68 + rng() * 12);
  const trendKinerjaData = ['Tw 1 2025', 'Tw 2 2025', 'Tw 3 2025', 'Tw 4 2025', 'Tw 1 2026'].map((periode, i) => {
    const pos = Math.min(96, kPos0 + i * (1.5 + rng() * 1.5));
    return { periode, positif: Math.round(pos), perhatian: Math.round(100 - pos) };
  });

  const kScr0 = Math.round(58 + rng() * 12);
  const pScr0 = Math.round(56 + rng() * 12);
  const aspekPenilaianData = ['Tw 1 2025', 'Tw 2 2025', 'Tw 3 2025', 'Tw 4 2025', 'Tw 1 2026'].map((periode, i) => ({
    periode,
    kinerja:   Math.min(96, Math.round(kScr0 + i * (2.5 + rng() * 2))),
    potensial: Math.min(92, Math.round(pScr0 + i * (0.8 + rng() * 1.2))),
  }));

  const driverKinerjaData = ['Jan 2026', 'Feb 2026', 'Mar 2026'].map((bulan, i) => ({
    bulan,
    kplb:        Math.round(3 + i * (1.5 + rng() * 1)),
    penghargaan: Math.round(28 + i * (10 + rng() * 8)),
    penugasan:   Math.round(90 + i * (16 + rng() * 10)),
  }));

  const dPBase = Math.max(50, Math.round(totalASN * 0.09));
  const driverPotensialData = ['Jan 2026', 'Feb 2026', 'Mar 2026'].map((bulan, i) => ({
    bulan,
    asesmen_kompetensi: Math.round(dPBase * (0.88 + i * 0.05 + rng() * 0.05)),
    asesmen_potensi:    Math.round(dPBase * (0.78 + i * 0.06 + rng() * 0.05)),
    hukuman: 0,
    pelatihan:          Math.round(dPBase * (0.68 + i * 0.04 + rng() * 0.04)),
    pendidikan:         Math.round(dPBase * (0.68 + i * 0.03 + rng() * 0.03)),
    sertifikasi:        Math.round(dPBase * (0.32 + rng() * 0.03)),
  }));

  const jpB = Math.max(20, Math.round(totalASN * 0.20));
  const distribusiJPData = [
    { range: 'Kurang dari 10 JP', value: Math.round(jpB * (0.27 + rng() * 0.10)) },
    { range: '10-15 JP',          value: Math.round(jpB * (0.23 + rng() * 0.09)) },
    { range: '15-20 JP',          value: Math.round(jpB * (0.20 + rng() * 0.08)) },
    { range: 'Lebih dari 20 JP',  value: Math.round(jpB * (0.14 + rng() * 0.08)) },
  ];

  const realisasiPelatihanData = ['Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026'].map((bulan, i) => ({
    bulan,
    pegawai:  Math.round(totalASN * 0.007 * (i + 1) * (0.88 + rng() * 0.24)),
    total_jp: Math.round(totalASN * 0.110 * (i + 1) * (0.88 + rng() * 0.24)),
  }));

  return {
    // Core KPIs
    totalASN, totalPNS, totalPPPK, pppkParuhWaktu, nonASN,
    totalJabatan:        Math.round(totalASN * (0.88 + rng() * 0.16)),
    ketersisiaanJabatan: keterisian,
    targetPengisian:     Math.min(99, Math.round(keterisian + 3 + rng() * 4)),
    nilaiSAKIP:          Math.round(sakip * 10) / 10,
    targetSAKIP:         Math.round((sakip + 1.5 + rng() * 1.5) * 10) / 10,
    unitWBK: wbk, unitWBBM: wbbm,

    // Tab 1
    kinerjaData, nineBoxData, trendSakipData, trendWBKData, trendWBBMData, trendZIStackedData, trendRBData,
    kinerjaPerUnitData, topJabatanPerluPerhatianData,
    kinerjaPositifPct, talentaSuksesiPct, talentaPotensialPct, talentaBelumPeta,

    // Tab 2
    distribusiUsiaData, jenisKelaminData, masaKerjaData, angkatanASNData, proyeksiPensiunData,
    pendidikanData, pendidikanByJenisPegawaiData, pendidikanByUsiaData,
    pegawaiPerUnitData, komposisiPerUnitData, jabatanPerUnitData,
    sebaranPusatData, sebaranTipeData, wilayahData, breakdownManajerialData,
    pendidikanUsiaMatrix, jenisPegawaiUsiaMatrix, unitKerjaPendidikanMatrix, unitKerjaJenisPegawaiMatrix,

    // Tab 3
    fulfillmentData, jabatanKosongPerUnitData,
    pensiunPerKuartalData, totalPensiun2026, pensiunPerJabatanData,
    trendZIData, aspekZI, ziLevel, ziPredikat,
    jabatanStrukturalKosong: jabStrKosong,
    jabatanFungsionalKosong: jabFunKosong,
    jabatanKritis: jabKritis,
    eselon12,

    // Tab 4
    trendKinerjaData, aspekPenilaianData, driverKinerjaData, driverPotensialData,
    distribusiJPData, realisasiPelatihanData,
    c5AsStr: `${c5}%`, talentaSuksesiStr: `${talentaSuksesiPct}%`, talentaPotensialStr: `${talentaPotensialPct}%`,
  };
}

export type UnitChartData = ReturnType<typeof generateUnitChartData>;
