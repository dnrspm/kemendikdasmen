import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { KepegawaianLayout } from '@/app/components/KepegawaianLayout';
import { BackLink, DateInput, Field, FileField, FormActions, FormCard, Radios, SelectInput, TextArea, TextInput } from '@/app/components/FormParts';

function Shell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <KepegawaianLayout>
      <div className="p-[20px] flex flex-col gap-[12px]">
        <div>
          <BackLink to="/kepegawaian" />
          <h1 className="font-semibold text-[#2f3031]" style={{ fontSize: '24px' }}>{title}</h1>
          <p className="text-[#2f3031]" style={{ fontSize: 'var(--text-sm)' }}>{subtitle}</p>
        </div>
        {children}
      </div>
    </KepegawaianLayout>
  );
}

/* Nilai-nilai di bawah adalah data contoh fiktif. */
export function UbahDataPribadiPage() {
  const navigate = useNavigate();
  const [dirty, setDirty] = useState(false);
  const d = () => setDirty(true);
  return (
    <Shell title="Perubahan Data Pribadi" subtitle="Ubah data pribadi Anda di Portal Kemendikdasmen">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-[16px] items-start">
        <div className="flex flex-col gap-[16px]">
          <FormCard title="Data Diri">
            <Field label="NIP" full><TextInput readOnly defaultValue="198704182018031001" /></Field>
            <Field label="NIK"><TextInput readOnly defaultValue="3171000000000001" /></Field>
            <Field label="Nomor KK"><TextInput readOnly defaultValue="3171000000000002" /></Field>
            <Field label="Tempat Lahir"><TextInput readOnly defaultValue="Jakarta" /></Field>
            <Field label="Tanggal Lahir"><DateInput readOnly defaultValue="18 April 1987" /></Field>
            <Field label="Tingkat Pendidikan"><TextInput readOnly defaultValue="S-2" /></Field>
            <Field label="Pendidikan"><TextInput readOnly defaultValue="S-2 Ekonomi Makro" /></Field>
            <Field label="Status Perkawinan"><TextInput readOnly defaultValue="Menikah" /></Field>
            <Field label="Agama"><SelectInput onChange={d} options={['Islam', 'Katholik', 'Hindu', 'Budha', 'Konghucu']} defaultValue="Islam" /></Field>
          </FormCard>
          <FormCard title="Data Kepegawaian">
            <Field label="Jenis Pegawai" full><TextInput readOnly defaultValue="PNS Pusat yang bekerja pada Departemen/Lembaga" /></Field>
            <Field label="Masa Kerja Golongan"><TextInput readOnly defaultValue="-" /></Field>
            <Field label="Masa Kerja Keseluruhan"><TextInput readOnly defaultValue="10 Tahun 9 Bulan" /></Field>
            <Field label="Jenis Jabatan"><TextInput readOnly defaultValue="Karir" /></Field>
            <Field label="Jabatan"><TextInput readOnly defaultValue="Kepala Seksi Pemetaan Mutu dan Supervisi" /></Field>
            <Field label="Lokasi Kerja"><TextInput onChange={d} placeholder="Ketik kata kunci lokasi kerja" defaultValue="JAKARTA" /></Field>
            <Field label="Pangkat dan Golongan Aktif"><TextInput readOnly defaultValue="Penata Tingkat I" /></Field>
            <Field label="Golongan Ruang Awal"><TextInput readOnly defaultValue="III/b  Penata Muda Tingkat I" /></Field>
            <Field label="Golongan Ruang Terakhir"><TextInput readOnly defaultValue="III/d  Penata Tingkat I" /></Field>
            <Field label="TMT Golongan"><DateInput readOnly defaultValue="1 Oktober 2023" /></Field>
            <Field label="TMT ASN"><DateInput readOnly defaultValue="1 Maret 2018" /></Field>
            <Field label="Nomor SK ASN"><TextInput readOnly defaultValue="00000/A2.9/KP/2018" /></Field>
            <Field label="Status ASN"><TextInput readOnly defaultValue="PNS" /></Field>
          </FormCard>
        </div>
        <div className="flex flex-col gap-[16px]">
          <FormCard title="Kontak">
            <Field label="Email Dikdasmen" required full><TextInput onChange={d} defaultValue="ahmad.wijaya@kemendikdasmen.go.id" /></Field>
            <Field label="Email Lain" full><TextInput onChange={d} defaultValue="" placeholder="-" /></Field>
            <Field label="Alamat" full><TextArea onChange={d} defaultValue="" /></Field>
            <Field label="Nomor HP"><TextInput onChange={d} defaultValue="" /></Field>
            <Field label="Nomor Kontak Darurat"><TextInput readOnly defaultValue="-" /></Field>
          </FormCard>
          <FormCard title="Data Lainnya">
            <Field label="Nomor Surat Keterangan Dokter"><TextInput readOnly defaultValue="-" /></Field>
            <Field label="Tanggal Surat Keterangan Dokter"><DateInput readOnly /></Field>
            <Field label="Nomor Surat Bebas Narkoba"><TextInput readOnly defaultValue="-" /></Field>
            <Field label="Tanggal Surat Bebas Narkoba"><DateInput readOnly /></Field>
            <Field label="Nomor Catatan Kepolisian"><TextInput readOnly defaultValue="-" /></Field>
            <Field label="Tanggal Catatan Kepolisian"><DateInput readOnly /></Field>
            <Field label="Nomor Akte Kelahiran"><TextInput onChange={d} /></Field>
            <Field label="Nomor BPJS"><TextInput onChange={d} /></Field>
            <Field label="NPWP"><TextInput onChange={d} /></Field>
            <Field label="Tanggal NPWP"><DateInput onChange={d} /></Field>
            <Field label="Nomor TASPEN"><TextInput onChange={d} /></Field>
          </FormCard>
        </div>
      </div>
      <FormActions
        primary="Kirim Perubahan Data"
        primaryDisabled={!dirty}
        onPrimary={() => { toast.info('Prototipe: data tidak dikirim ke server.'); navigate('/kepegawaian'); }}
        onCancel={() => navigate('/kepegawaian')}
      />
    </Shell>
  );
}

function Docs({ items }: { items: { label: string; hint: string; required?: boolean }[] }) {
  return (
    <FormCard title="Dokumen Pendukung">
      {items.map((i) => <FileField key={i.label} {...i} />)}
    </FormCard>
  );
}

export function TambahPasanganPage() {
  const navigate = useNavigate();
  return (
    <Shell title="Tambah Data Istri" subtitle="Tambah data pasangan di Portal Kemendikdasmen">
      <FormCard title="Data Diri">
        <Field label="Pasangan Ke" required><TextInput /></Field>
        <Field label="Status ASN" required><Radios name="asn" options={['ASN', 'Bukan ASN']} /></Field>
        <Field label="Nama" required full><TextInput /></Field>
        <Field label="Tanggal Lahir" required><DateInput /></Field>
        <Field label="Jenis Kelamin" hint="Terisi otomatis, lawan jenis dari pegawai."><Radios name="jk" options={['Laki-laki', 'Perempuan']} disabledAll defaultValue="Perempuan" /></Field>
        <Field label="Agama" required><SelectInput placeholder="Pilih Agama" options={['Islam', 'Katholik', 'Hindu', 'Budha', 'Konghucu']} /></Field>
      </FormCard>
      <FormCard title="Status Pernikahan">
        <Field label="Nomor Akta Menikah" required><TextInput placeholder="Masukkan nomor akta menikah" /></Field>
        <Field label="Tanggal Akta Menikah" required><DateInput /></Field>
      </FormCard>
      <Docs items={[
        { label: 'Dok Akta Nikah/Surat Nikah/Buku Nikah', hint: 'Pilih file dalam format .pdf dengan ukuran maksimal 1MB.', required: true },
        { label: 'Pas Foto Pasangan', hint: 'Pilih file dalam format .jpg, .jpeg, .png dengan ukuran maksimal 1MB.' },
      ]} />
      <FormActions primary="Simpan Data" onPrimary={() => { toast.info('Prototipe: data tidak disimpan ke server.'); navigate('/kepegawaian'); }} onCancel={() => navigate('/kepegawaian')} />
    </Shell>
  );
}

export function TambahOrangTuaPage() {
  const navigate = useNavigate();
  return (
    <Shell title="Tambah Data Orang Tua" subtitle="Tambah data orang tua di Portal Kemendikdasmen">
      <FormCard title="Data Diri">
        <Field label="Hubungan" required><Radios name="hub" options={['Ayah', 'Ibu']} /></Field>
        <Field label="Status Hidup" required><SelectInput placeholder="Pilih Status Hidup" options={['Masih Hidup', 'Meninggal']} /></Field>
        <Field label="Nama" required full><TextInput /></Field>
        <Field label="Tanggal Lahir" required><DateInput /></Field>
      </FormCard>
      <Docs items={[
        { label: 'Dokumen Kartu Keluarga', hint: 'Pilih file dalam format .pdf dengan ukuran maksimal 1MB.' },
        { label: 'Dokumen Akta Kelahiran', hint: 'Akta kelahiran Anda yang mencantumkan nama ayah/ibu, sebagai bukti hubungan anak dan orang tua. Pilih file dalam format .pdf dengan ukuran maksimal 1MB.' },
        { label: 'Pas Foto Orang Tua', hint: 'Pilih file dalam format .jpg, .jpeg, .png dengan ukuran maksimal 1MB.' },
      ]} />
      <FormActions primary="Simpan Data" onPrimary={() => { toast.info('Prototipe: data tidak disimpan ke server.'); navigate('/kepegawaian'); }} onCancel={() => navigate('/kepegawaian')} />
    </Shell>
  );
}
