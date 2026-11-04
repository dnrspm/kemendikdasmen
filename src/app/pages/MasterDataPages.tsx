import { StagingDataTable, MoreAction } from '@/app/components/StagingDataTable';
import { Button } from '@/app/components/seragam/Button';
import { useState, type ReactNode } from 'react';
import { Plus, MoreVertical, ChevronLeft, ChevronRight, ChevronDown, ChevronRight as Caret } from 'lucide-react';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';

type Cfg = { title: string; subtitle: string; columns: string[]; rows: string[][]; total: number };

const configs: Record<string, Cfg> = {
  agama: {
    title: 'Data Agama', subtitle: 'Kelola data agama yang digunakan dalam sistem', columns: ['Nama Agama'], total: 5,
    rows: [['Hindu'], ['Katholik'], ['Budha'], ['Konghucu'], ['Islam']],
  },
  jabatan: {
    title: 'Data Jabatan', subtitle: 'Kelola data jabatan yang digunakan dalam sistem',
    columns: ['Kode Jabatan', 'Nama Jabatan', 'Jenis Jabatan', 'Kategori'], total: 6748,
    rows: [
      ['378873', 'Penghulu ahli utama', 'Jabatan Administrasi', 'Fungsional'],
      ['3788731', 'Ahli Utama Sekunder', 'Jabatan Administrasi', 'Administrator'],
      ['34534534', 'Dirjen PAUD', '', 'Pelaksana'],
    ],
  },
  pendidikan: {
    title: 'Data Pendidikan', subtitle: 'Kelola data pendidikan yang digunakan dalam sistem',
    columns: ['Tingkat Pendidikan', 'Jurusan Pendidikan'], total: 22926,
    rows: [
      ['S-1/Sarjana', 'S-1/A-IV MANAJEMEN PEMBELAJARAN GURU TAMAN KANAK KANAK'],
      ['S-1/Sarjana', 'S-1/A-IV MANAJEMEN PENDIDIKAN'],
      ['S-2', 'S-2 ADMINISTRASI KEUANGAN SYARIAH'],
    ],
  },
  golongan: {
    title: 'Data Golongan', subtitle: 'Kelola data golongan dan pangkat yang digunakan dalam sistem',
    columns: ['Golongan', 'Pangkat', 'Nama', 'Gol', 'Gol PPPK'], total: 21,
    rows: [
      ['II/d', 'Pengatur Tingkat I', '2d', '2', 'VIII'],
      ['III/b', 'Penata Muda Tingkat I', '3b', '3', 'X'],
      ['III/d', 'Penata Tingkat I', '3d', '3', 'XII'],
      ['IV/a', 'Pembina', '4a', '4', 'XIII'],
      ['IV/c', 'Pembina Utama Muda', '4c', '4', 'XV'],
      ['IV/d', 'Pembina Utama Madya', '4d', '4', 'XVI'],
      ['Non-ASN', 'Non-ASN', '-', '0', '-'],
      ['II/a', 'Pengatur Muda', 'II A', '3', 'PPP-C'],
      ['II/b', 'Pengatur', 'II B', '4', 'PPP-D'],
      ['V/a', 'Spesial', 'V A', '9', 'PPP-I'],
    ],
  },
  'jenis-kenaikan-pangkat': {
    title: 'Data Jenis Kenaikan Pangkat', subtitle: 'Kelola data jenis kenaikan pangkat yang digunakan dalam sistem',
    columns: ['Nama Jenis KP'], total: 27,
    rows: [['Pilihan (Jabatan Struktural)'], ['Pilihan (Jabatan Fungsional Tertentu)']],
  },
  'jenis-jabatan': {
    title: 'Data Jenis Jabatan', subtitle: 'Kelola data jenis jabatan yang digunakan dalam sistem',
    columns: ['Nama Jenis Jabatan'], total: 7,
    rows: [['Jabatan Administrasi'], ['Jabatan Penyelenggara'], ['Jabatan Fungsional'], ['Jabatan Struktural'], ['Jabatan Pelaksana'], ['Jabatan Fungsional'], ['Karir']],
  },
  'jenis-penghargaan': {
    title: 'Data Jenis Penghargaan', subtitle: 'Kelola data jenis penghargaan yang digunakan dalam sistem',
    columns: ['Nama Jenis Penghargaan'], total: 13,
    rows: [['Satya Lencana'], ['Penghargaan Kinerja']],
  },
  'jenis-hukuman': {
    title: 'Data Jenis Hukuman', subtitle: 'Kelola data jenis hukuman yang digunakan dalam sistem',
    columns: ['Nama Jenis Hukuman', 'Tingkat Hukuman'], total: 21,
    rows: [['Sangat Berat', 'Berat'], ['Berat', 'Berat'], ['ringan', 'Ringan'], ['Pelanggaran Berat', 'Berat']],
  },
  'template-dokumen': {
    title: 'Data Template Dokumen', subtitle: 'Kelola data template dokumen yang digunakan dalam sistem',
    columns: ['Nama Template', 'Dokumen'], total: 23,
    rows: [['Template SK Contoh', 'template-sk-contoh.docx'], ['Template SPMT', 'template-spmt.docx']],
  },
};

function Shell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <KepegawaianLayout>
      <div className="px-[24px] pt-[24px] pb-[64px] flex flex-col gap-[16px]">
        <div>
          <h1 className="text-sd-gray-90" style={{ fontSize: '24px', fontWeight: 600, lineHeight: '28px' }}>{title}</h1>
          <p className="text-sd-gray-90" style={{ fontSize: '14px', lineHeight: '20px' }}>{subtitle}</p>
        </div>
        <div className="bg-white border border-sd-badge-neutral rounded-[6px] p-[16px]">{children}</div>
      </div>
    </KepegawaianLayout>
  );
}

const AddButton = () => (
  <div className="flex justify-end mb-[12px]">
    <Button variant="primary" size="md"><Plus className="size-[18px]" /> Tambah</Button>
  </div>
);

export function MasterDataPage({ slug }: { slug: string }) {
  const cfg = configs[slug];
  if (!cfg) return null;
  return (
    <Shell title={cfg.title} subtitle={cfg.subtitle}>
      <AddButton />
      <div className="-mx-[16px] -mb-[16px]">
        <StagingDataTable
          hideFilter
          columns={[
            { key: 'no', label: 'No', width: '56px' },
            ...cfg.columns.map((c, j) => ({ key: `c${j}`, label: c })),
            { key: 'aksi', label: 'Aksi', width: '80px' },
          ]}
          rows={cfg.rows.map((r, i) => {
            const row: Record<string, ReactNode> = { no: i + 1, aksi: <MoreAction /> };
            r.forEach((v, j) => { row[`c${j}`] = v; });
            return row;
          })}
        />
      </div>
    </Shell>
  );
}

type Node = { name: string; children?: Node[] };
const unitTree: Node[] = [{
  name: 'KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH',
  children: [
    { name: 'Staf Ahli' },
    { name: 'PENGALIHAN DIKTI' },
    { name: 'Direktorat Jenderal Guru Dan Tenaga Kependidikan (Non Aktif)' },
    { name: 'Direktorat Jenderal Kebudayaan (Non AKtif)' },
    { name: 'Badan Penelitian dan Pengembangan dan Perbukuan' },
  ],
}];

function TreeNode({ node, depth = 0 }: { node: Node; depth?: number }) {
  const [open, setOpen] = useState(depth === 0);
  return (
    <div>
      <button
        onClick={() => node.children && setOpen(!open)}
        className="flex items-center gap-[6px] py-[6px] hover:bg-sd-gray-0 w-full text-left rounded-[4px]"
        style={{ paddingLeft: depth * 20 + 4, fontSize: 'var(--text-sm)' }}
      >
        {node.children ? (open ? <ChevronDown className="size-[16px]" /> : <Caret className="size-[16px]" />) : <span className="size-[16px]" />}
        {node.name}
      </button>
      {open && node.children?.map((c) => <TreeNode key={c.name} node={c} depth={depth + 1} />)}
    </div>
  );
}

export function UnitKerjaPage() {
  return (
    <Shell title="Data Unit Kerja" subtitle="Kelola data unit kerja yang digunakan dalam sistem">
      <div className="flex items-center justify-between mb-[12px]">
        <p className="text-sd-gray-60" style={{ fontSize: 'var(--text-xs)' }}>Klik kanan pada unit kerja untuk menampilkan menu</p>
        <button className="bg-sd-gray-90 text-white rounded-[4px] px-[14px] py-[8px] flex items-center gap-[6px] font-semibold" style={{ fontSize: 'var(--text-sm)' }}>
          <Plus className="size-[16px]" /> Tambah
        </button>
      </div>
      {unitTree.map((n) => <TreeNode key={n.name} node={n} />)}
    </Shell>
  );
}

export const masterDataSlugs = Object.keys(configs);
