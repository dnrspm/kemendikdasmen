import React, { useState } from 'react';
import { ChevronRight, Home, AlertTriangle } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { HierarchicalFilter } from './HierarchicalFilter';
import { generateUnitChartData } from './dashboardAnalitikData';

interface ProfilASNPageProps {
  onBack: () => void;
  onBackToHome: () => void;
}

export function ProfilASNPage({ onBack, onBackToHome }: ProfilASNPageProps) {
  const [selectedUnit, setSelectedUnit] = useState<string>('kementerian');
  const [activeSubTab, setActiveSubTab] = useState('ringkasan');
  const [filterJabatan, setFilterJabatan] = useState('semua');
  const [showPersentase, setShowPersentase] = useState(false);
  const [selectedMatrix, setSelectedMatrix] = useState('pendidikan-usia');

  const unitData = generateUnitChartData(selectedUnit);

  const {
    totalASN, totalPNS, totalPPPK, pppkParuhWaktu, nonASN,
    distribusiUsiaData, jenisKelaminData, masaKerjaData, angkatanASNData, proyeksiPensiunData,
    pendidikanData, pendidikanByJenisPegawaiData, pendidikanByUsiaData,
    pegawaiPerUnitData, komposisiPerUnitData, jabatanPerUnitData,
    sebaranPusatData, sebaranTipeData, wilayahData, breakdownManajerialData,
    pendidikanUsiaMatrix: pendidikanUsiaData,
    jenisPegawaiUsiaMatrix: jenisPegawaiUsiaData,
    unitKerjaPendidikanMatrix: unitKerjaPendidikanData,
    unitKerjaJenisPegawaiMatrix: unitKerjaJenisPegawaiData,
  } = unitData;

  const komposisiPegawaiData = [
    { name: 'Non ASN', value: nonASN, fill: '#F59E0B' },
    { name: 'PNS', value: totalPNS, fill: '#1E3A8A' },
    { name: 'PPPK', value: totalPPPK, fill: '#3B82F6' },
    { name: 'PPPK Paruh Waktu', value: pppkParuhWaktu, fill: '#8B5CF6' },
  ];

  const getHeatmapIntensity = (value: number, maxValue: number) => {
    const percent = (value / maxValue) * 100;
    if (percent < 25) return 'bg-blue-50';
    if (percent < 50) return 'bg-blue-200';
    if (percent < 75) return 'bg-blue-400 text-white';
    return 'bg-blue-600 text-white';
  };

  const getCurrentMatrixConfig = () => {
    switch (selectedMatrix) {
      case 'pendidikan-usia':
        return {
          data: pendidikanUsiaData,
          columns: ['<25', '26-30', '31-40', '41-50', '>50'],
          maxValue: Math.max(...pendidikanUsiaData.flatMap((row: any) => [row['<25'], row['26-30'], row['31-40'], row['41-50'], row['>50']]))
        };
      case 'jenis-pegawai-usia':
        return {
          data: jenisPegawaiUsiaData,
          columns: ['<25', '26-30', '31-40', '41-50', '>50'],
          maxValue: Math.max(...jenisPegawaiUsiaData.flatMap((row: any) => [row['<25'], row['26-30'], row['31-40'], row['41-50'], row['>50']]))
        };
      case 'unit-kerja-pendidikan':
        return {
          data: unitKerjaPendidikanData,
          columns: ['S3/S2', 'S1/D4', 'D3/D2/D1', 'SMA/Sed'],
          maxValue: Math.max(...unitKerjaPendidikanData.flatMap((row: any) => [row['S3/S2'], row['S1/D4'], row['D3/D2/D1'], row['SMA/Sed']]))
        };
      case 'unit-kerja-jenis-pegawai':
        return {
          data: unitKerjaJenisPegawaiData,
          columns: ['PNS', 'PPPK', 'PPPK Paruh Waktu', 'Non ASN'],
          maxValue: Math.max(...unitKerjaJenisPegawaiData.flatMap((row: any) => [row.PNS, row.PPPK, row['PPPK Paruh Waktu'], row['Non ASN']]))
        };
      default:
        return {
          data: pendidikanUsiaData,
          columns: ['<25', '26-30', '31-40', '41-50', '>50'],
          maxValue: Math.max(...pendidikanUsiaData.flatMap((row: any) => [row['<25'], row['26-30'], row['31-40'], row['41-50'], row['>50']]))
        };
    }
  };

  const matrixConfig = getCurrentMatrixConfig();
  const isManajerialFilter = ['semua', 'manajerial', 'jpt', 'administrator', 'pengawas'].includes(filterJabatan);

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'ringkasan':
        return (
          <div className="space-y-[24px]">
            <p className="text-[var(--text-sm)] text-[#656a6c]">
              Menampilkan gambaran umum profil pegawai Kemendikdasmen berdasarkan jenis pegawai, demografi, masa kerja, dan siklus kepegawaian.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-[20px]">
              <div className="bg-primary rounded-[8px] p-[20px] text-center text-white">
                <div className="text-[var(--text-sm)] mb-[8px] uppercase tracking-wide opacity-90">Total Pegawai</div>
                <div className="text-[36px] font-[var(--font-weight-bold)]">{totalASN.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px] text-center">
                <div className="text-[var(--text-sm)] text-[#656a6c] mb-[8px] uppercase tracking-wide">Total PNS</div>
                <div className="text-[36px] font-[var(--font-weight-bold)] text-[#2f3031]">{totalPNS.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px] text-center">
                <div className="text-[var(--text-sm)] text-[#656a6c] mb-[8px] uppercase tracking-wide">Total PPPK</div>
                <div className="text-[36px] font-[var(--font-weight-bold)] text-[#2f3031]">{totalPPPK.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px] text-center">
                <div className="text-[var(--text-sm)] text-[#656a6c] mb-[8px] uppercase tracking-wide">PPPK Paruh Waktu</div>
                <div className="text-[36px] font-[var(--font-weight-bold)] text-[#2f3031]">{pppkParuhWaktu.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px] text-center">
                <div className="text-[var(--text-sm)] text-[#656a6c] mb-[8px] uppercase tracking-wide">Non ASN</div>
                <div className="text-[36px] font-[var(--font-weight-bold)] text-[#2f3031]">{nonASN.toLocaleString()}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Komposisi Jenis Pegawai</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={komposisiPegawaiData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label>
                      {komposisiPegawaiData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-[16px] mt-[16px]">
                  {komposisiPegawaiData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-[8px]">
                      <div className="w-[12px] h-[12px] rounded-full" style={{ backgroundColor: entry.fill }}></div>
                      <span className="text-[var(--text-sm)] text-[#656a6c]">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Distribusi Usia</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={distribusiUsiaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1E3A8A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Komposisi Jenis Kelamin</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={jenisKelaminData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label>
                      {jenisKelaminData.map((entry: any) => <Cell key={entry.name} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-[24px] mt-[16px]">
                  {jenisKelaminData.map((entry: any) => (
                    <div key={entry.name} className="flex items-center gap-[8px]">
                      <div className="w-[12px] h-[12px] rounded-full" style={{ backgroundColor: entry.fill }}></div>
                      <span className="text-[var(--text-sm)] text-[#656a6c]">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Distribusi Masa Kerja</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={masaKerjaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#60A5FA" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Angkatan ASN Berdasarkan TMT CPNS</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={angkatanASNData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <div className="flex items-center justify-between mb-[16px]">
                  <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031]">Proyeksi Pensiun 5 Thn</h3>
                  <div className="flex items-center gap-[6px] bg-amber-100 px-[8px] py-[4px] rounded-[4px]">
                    <AlertTriangle className="w-[14px] h-[14px] text-amber-600" />
                    <span className="text-[11px] text-amber-800">Mengabaikan filter jabatan</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={proyeksiPensiunData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#9CA3AF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'pendidikan':
        return (
          <div className="space-y-[24px]">
            <p className="text-[var(--text-sm)] text-[#656a6c]">Menampilkan gambaran jenjang pendidikan terakhir pegawai Kemendikdasmen secara agregat.</p>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-[20px]">
              <div className="space-y-[20px]">
                <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                  <div className="text-[var(--text-sm)] text-[#656a6c] mb-[8px] uppercase tracking-wide">Jenjang Terbanyak</div>
                  <div className="text-[36px] font-[var(--font-weight-bold)] text-[#2f3031] mb-[8px]">S1 / D4</div>
                  <div className="text-[var(--text-sm)] text-[#0B5FEF] font-[var(--font-weight-medium)]">65% dari total</div>
                </div>
                <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                  <div className="text-[var(--text-sm)] text-[#656a6c] mb-[8px] uppercase tracking-wide">Proporsi S2/S3</div>
                  <div className="text-[36px] font-[var(--font-weight-bold)] text-[#2f3031] mb-[8px]">12%</div>
                  <div className="text-[var(--text-sm)] text-[#656a6c]">Kapasitas kepemimpinan strategis</div>
                </div>
              </div>
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Distribusi Pendidikan Terakhir</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={pendidikanData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="jenjang" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1E3A8A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Pendidikan berdasarkan Jenis Pegawai</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={pendidikanByJenisPegawaiData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="kategori" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Non ASN" stackId="a" fill="#F59E0B" name="Non ASN" />
                    <Bar dataKey="PNS" stackId="a" fill="#1E3A8A" name="PNS" />
                    <Bar dataKey="PPPK" stackId="a" fill="#3B82F6" name="PPPK" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Pendidikan berdasarkan Rentang Usia</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={pendidikanByUsiaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="rentang" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Di bawah S1" stackId="a" fill="#60A5FA" name="Di bawah S1" />
                    <Bar dataKey="S1 ke Atas" stackId="a" fill="#1E3A8A" name="S1 ke Atas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'organisasi':
        return (
          <div className="space-y-[24px]">
            <p className="text-[var(--text-sm)] text-[#656a6c]">Menampilkan persebaran pegawai berdasarkan unit organisasi, kelompok jabatan, dan wilayah kerja.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Jumlah Pegawai per Unit Kerja</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pegawaiPerUnitData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis type="number" />
                    <YAxis dataKey="unit" type="category" width={100} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1E3A8A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Komposisi Pegawai per Unit Kerja</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={komposisiPerUnitData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="unit" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="PNS" stackId="a" fill="#1E3A8A" name="PNS" />
                    <Bar dataKey="PPPK" stackId="a" fill="#60A5FA" name="PPPK" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
              <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Komposisi Jenis Jabatan per Unit Kerja</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jabatanPerUnitData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                  <XAxis dataKey="unit" tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Fungsional" stackId="a" fill="#3B82F6" name="Fungsional" />
                  <Bar dataKey="Manajerial" stackId="a" fill="#1E3A8A" name="Manajerial" />
                  <Bar dataKey="Pelaksana" stackId="a" fill="#60A5FA" name="Pelaksana" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Sebaran Pusat vs UPT/Daerah</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={sebaranPusatData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label>
                      {sebaranPusatData.map((entry: any) => <Cell key={entry.name} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
                <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[16px]">Sebaran Wilayah Provinsi Utama</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={wilayahData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                    <XAxis dataKey="provinsi" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1E3A8A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px]">
              <h3 className="text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[#2f3031] mb-[8px]">Breakdown Manajerial</h3>
              <p className="text-[var(--text-sm)] text-[#656a6c] mb-[16px]">Hanya berlaku saat filter termasuk Manajerial/Semua</p>
              {isManajerialFilter ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={breakdownManajerialData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                      {breakdownManajerialData.map((entry: any) => <Cell key={entry.name} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="text-[var(--text-sm)]">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[200px] flex items-center justify-center">
                  <p className="text-[var(--text-sm)] text-[#9ca3af] italic">Filter saat ini tidak mencakup jabatan manajerial</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'eksplorasi':
        return (
          <div className="space-y-[24px]">
            <p className="text-[var(--text-sm)] text-[#656a6c]">Eksplorasi komparasi data pegawai dalam bentuk matriks agregat.</p>
            <div className="flex items-center justify-between">
              <select value={selectedMatrix} onChange={(e) => setSelectedMatrix(e.target.value)} className="px-[12px] py-[8px] border border-[#808489] rounded-[4px] text-[var(--text-sm)] text-[#2f3031] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]">
                <option value="pendidikan-usia">Pendidikan × Rentang Usia</option>
                <option value="jenis-pegawai-usia">Jenis Pegawai × Rentang Usia</option>
                <option value="unit-kerja-pendidikan">Unit Kerja × Pendidikan</option>
                <option value="unit-kerja-jenis-pegawai">Unit Kerja × Jenis Pegawai</option>
              </select>
              <div className="flex items-center gap-[12px]">
                <label className="text-[var(--text-sm)] text-[#2f3031]">Tampilkan Persentase Baris</label>
                <button onClick={() => setShowPersentase(!showPersentase)} className={`w-[44px] h-[24px] rounded-full transition-colors relative ${showPersentase ? 'bg-primary' : 'bg-gray-300'}`}>
                  <div className={`absolute top-[2px] w-[20px] h-[20px] rounded-full bg-white transition-transform ${showPersentase ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-[8px] border border-[#c7c7c7] p-[20px] overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-[#EFEFEF] p-[12px] text-left text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-[#2f3031] bg-[#f9f9f9]">Kategori</th>
                    {matrixConfig.columns.map((col) => (
                      <th key={col} className="border border-[#EFEFEF] p-[12px] text-center text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-[#2f3031] bg-[#f9f9f9]">{col}</th>
                    ))}
                    <th className="border border-[#EFEFEF] p-[12px] text-center text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] bg-[#EFEFEF]">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixConfig.data.map((row: any) => (
                    <tr key={row.kategori}>
                      <td className="border border-[#EFEFEF] p-[12px] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[#2f3031]">{row.kategori}</td>
                      {matrixConfig.columns.map((col) => {
                        const value = row[col];
                        return (
                          <td key={col} className={`border border-[#EFEFEF] p-[12px] text-center text-[var(--text-sm)] ${getHeatmapIntensity(value, matrixConfig.maxValue)}`}>
                            {value.toLocaleString()}{showPersentase && ` (${((value / row.total) * 100).toFixed(1)}%)`}
                          </td>
                        );
                      })}
                      <td className="border border-[#EFEFEF] p-[12px] text-center text-[var(--text-sm)] font-[var(--font-weight-bold)] text-[#2f3031] bg-[#f9f9f9]">{row.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const subTabs = [
    { id: 'ringkasan', label: 'Ringkasan & Siklus ASN' },
    { id: 'pendidikan', label: 'Pendidikan & Kapasitas Pegawai' },
    { id: 'organisasi', label: 'Organisasi, Jabatan & Wilayah' },
    { id: 'eksplorasi', label: 'Eksplorasi Matriks Pegawai' },
  ];

  return (
    <div className="bg-[#f9f9f9] min-h-screen w-full flex flex-col">
      <Header onLogoClick={onBackToHome} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#EFEFEF]">
        <div className="px-[24px] py-[16px]">
          <nav className="flex items-center gap-[8px]">
            <button onClick={onBackToHome} className="flex items-center gap-[6px] text-[var(--text-sm)] text-muted-foreground hover:text-primary transition-colors">
              <Home className="w-[16px] h-[16px]" />
              <span>Beranda</span>
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <span className="text-[var(--text-sm)] text-foreground font-[var(--font-weight-medium)]">Profil ASN Kemendikdasmen</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-[#EFEFEF]">
        <div className="px-[24px] py-[20px]">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-[#2f3031] mb-[4px]">Profil ASN Kemendikdasmen</h1>
              <p className="text-[var(--text-sm)] text-[#656a6c]">Demografi, pendidikan, dan persebaran pegawai ASN</p>
            </div>
            <div className="flex flex-col items-end gap-[6px] ml-auto">
              <span className="text-[var(--text-sm)] text-[#656a6c]">Filter</span>
              <HierarchicalFilter selectedUnit={selectedUnit} onSelect={setSelectedUnit} />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-tab Nav + Filter */}
      <div className="bg-white border-b border-[#EFEFEF] px-[24px] py-[12px]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[12px]">
          <div className="flex flex-wrap gap-[8px]">
            {subTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-[16px] py-[8px] rounded-full text-[var(--text-sm)] font-[var(--font-weight-medium)] transition-colors ${
                  activeSubTab === tab.id ? 'bg-primary text-white' : 'bg-[#f9f9f9] text-[#656a6c] hover:bg-[#EFEFEF]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-[8px]">
            <span className="text-[10px] text-[#656a6c] uppercase tracking-wide">Filter Jenis Jabatan</span>
            <select value={filterJabatan} onChange={(e) => setFilterJabatan(e.target.value)} className="px-[12px] py-[8px] border border-[#808489] rounded-[4px] text-[var(--text-sm)] text-[#2f3031] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]">
              <option value="semua">Seluruh Jabatan</option>
              <option value="manajerial">Seluruh Manajerial</option>
              <option value="jpt">JPT</option>
              <option value="administrator">Administrator</option>
              <option value="pengawas">Pengawas</option>
              <option value="fungsional">Fungsional</option>
              <option value="pelaksana">Pelaksana</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-[24px]">
        {renderSubTabContent()}
      </div>
    </div>
  );
}
