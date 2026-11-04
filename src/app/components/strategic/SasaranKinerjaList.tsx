import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { Organization } from '@/app/data/organizationData';
import { SasaranKinerja, IKP, sasaranKinerjas, sasaranPrograms } from '@/app/data/strategicObjectivesData';
import { epics, biros, Epic } from '@/app/data/projectManagementData';

interface SasaranKinerjaListProps {
  organization: Organization;
  periodFilter: string;
  level?: 'sekretariat' | 'unit-utama' | 'unit-kerja' | 'tim-kerja';
  initialFilters?: {
    sasaranKinerjaId?: string;
    sasaranProgramId?: string;
    biroId?: string;
  };
  onNavigateToSKP?: (epicId: string, biroId?: string) => void;
}

export function SasaranKinerjaList({ organization, periodFilter, level = 'unit-utama', initialFilters, onNavigateToSKP }: SasaranKinerjaListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSasaranProgram, setFilterSasaranProgram] = useState<string>(initialFilters?.sasaranProgramId || 'all');
  const [localFilterBiro, setLocalFilterBiro] = useState<string>(initialFilters?.biroId || 'biro-osdm');
  const [selectedSKId, setSelectedSKId] = useState<string | undefined>(initialFilters?.sasaranKinerjaId);

  const kinerjas = sasaranKinerjas.filter(sk => sk.owner_org_id === organization.id);

  const filteredKinerjas = kinerjas.filter(kinerja => {
    const matchesSearch = kinerja.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kinerja.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kinerja.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSP = filterSasaranProgram === 'all' || kinerja.sasaran_program_id === filterSasaranProgram;
    const matchesBiro = localFilterBiro === 'all' || kinerja.biro_id === localFilterBiro;
    const matchesSK = !selectedSKId || kinerja.id === selectedSKId;
    return matchesSearch && matchesSP && matchesBiro && matchesSK;
  });

  return (
    <div className="space-y-[24px]">
      {/* Controls */}
      <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[20px]">
        <div className="flex flex-col gap-[16px]">
          <div className="relative">
            <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-[#727272]" />
            <input
              type="text"
              placeholder="Cari sasaran kinerja..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[40px] pl-[44px] pr-[16px] border border-[#828282] rounded-[4px] text-[var(--text-base)] text-[#323232] placeholder:text-[#727272] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-[12px]">
            <div className="flex flex-col gap-[8px]">
              <label className="text-[var(--text-sm)] text-[#656a6c]">Unit Kerja:</label>
              <select
                value="biro-osdm"
                onChange={() => {}}
                disabled
                className="w-full px-[12px] py-[8px] border border-[#ADADAD] rounded-[4px] text-[var(--text-sm)] text-[#727272] bg-[#f9f9f9] cursor-not-allowed opacity-70"
              >
                <option value="biro-osdm">Biro OSDM</option>
              </select>
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className="text-[var(--text-sm)] text-[#656a6c]">Sasaran Program:</label>
              <select
                value={filterSasaranProgram}
                onChange={(e) => setFilterSasaranProgram(e.target.value)}
                className="w-full px-[12px] py-[8px] border border-[#828282] rounded-[4px] text-[var(--text-sm)] text-[#323232] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                <option value="all">Semua Sasaran Program</option>
                {sasaranPrograms.map(sp => (
                  <option key={sp.id} value={sp.id}>{sp.code}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SK Cards */}
      <div className="flex flex-col gap-[20px]">
        {[...filteredKinerjas].sort((a, b) => {
          const numA = parseInt(a.code.replace(/\D+/g, ''), 10) || 0;
          const numB = parseInt(b.code.replace(/\D+/g, ''), 10) || 0;
          return numA - numB;
        }).map(kinerja => (
          <SasaranKinerjaCard
            key={kinerja.id}
            kinerja={kinerja}
            onNavigateToSKP={onNavigateToSKP}
          />
        ))}

        {filteredKinerjas.length === 0 && (
          <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[40px] text-center">
            <TrendingUp className="w-[48px] h-[48px] mx-auto mb-[16px] text-[#727272]" />
            <p className="text-[var(--text-base)] text-[#727272]">Tidak ada sasaran kinerja ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getProgressColor(percentage: number): string {
  if (percentage >= 100) return '#4CA375';
  if (percentage <= 0) return '#EDA62B';
  return '#0954D9';
}

function getEpicColor(status: string): string {
  if (status === 'selesai') return '#4CA375';
  if (status === 'belum_dimulai' || status === 'belum_dikerjakan') return '#EDA62B';
  return '#0954D9';
}

function CircularProgress({ percentage, color }: { percentage: number; color?: string }) {
  const size = 56;
  const center = 28;
  const strokeWidth = 6;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(percentage, 0), 100);
  const dashOffset = circumference - (clamped / 100) * circumference;
  const c = color ?? getProgressColor(clamped);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#EFEFEF" strokeWidth={strokeWidth} />
      <circle
        cx={center} cy={center} r={radius} fill="none"
        stroke={c} strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text
        x={center} y={center}
        textAnchor="middle" dy="0.35em"
        fill={c} fontSize="11" fontWeight="700"
      >
        {clamped}%
      </text>
    </svg>
  );
}

function SasaranKinerjaCard({ kinerja, onNavigateToSKP }: { kinerja: SasaranKinerja; onNavigateToSKP?: (epicId: string, biroId?: string) => void }) {
  // Derive IKK code from SK code and IKP index
  const getIkkCode = (skCode: string, index: number) => {
    const skNum = skCode.replace('SK', '');
    return `IKK${skNum}.${index + 1}`;
  };

  return (
    <div className="bg-white border border-[#ADADAD] border-solid flex flex-col gap-[24px] items-start p-[20px] rounded-[8px]">
      {/* SK Header */}
      <div className="flex flex-col gap-[12px] w-full">
        <div className="flex flex-col gap-[6px]">
          <span className="inline-flex bg-[rgba(144,108,239,0.1)] px-[8px] py-[2px] rounded-[4px] text-[16px] text-[#323232] self-start">
            {kinerja.code}
          </span>
          <h3 className="text-[19px] leading-[26.6px] text-[#323232]" style={{ fontWeight: 600 }}>
            {kinerja.name}
          </h3>
        </div>
        {/* Legend */}
        <div className="flex gap-[16px] items-center">
          <div className="flex gap-[4px] items-center">
            <div className="w-[8px] h-[8px] rounded-full bg-[#4CA375] shrink-0" />
            <span className="text-[16px] text-[#656a6c]">Selesai</span>
          </div>
          <div className="flex gap-[4px] items-center">
            <div className="w-[8px] h-[8px] rounded-full bg-[#0954D9] shrink-0" />
            <span className="text-[16px] text-[#656a6c]">Sedang dikerjakan</span>
          </div>
          <div className="flex gap-[4px] items-center">
            <div className="w-[8px] h-[8px] rounded-full bg-[#EDA62B] shrink-0" />
            <span className="text-[16px] text-[#656a6c]">Belum Dikerjakan</span>
          </div>
        </div>
      </div>

      {/* IKK Blocks */}
      {kinerja.ikp.map((ikp, ikpIndex) => {
        const ikkCode = getIkkCode(kinerja.code, ikpIndex);
        const ikkProgress = Math.round((ikp.current_value / ikp.target) * 100);
        const relatedEpics: Epic[] = (ikp.related_epic_ids ?? [])
          .map(id => epics.find(e => e.id === id))
          .filter((e): e is Epic => !!e);

        return (
          <div key={ikp.id} className="border border-[#efefef] border-solid flex flex-col items-start rounded-[6px] w-full">
            {/* IKK Header Row */}
            <div className="bg-[#f9f9f9] flex gap-[12px] items-center px-[12px] py-[16px] w-full">
              {/* Circular progress + target */}
              <div className="flex flex-col gap-[8px] items-center shrink-0 w-[80px]">
                <CircularProgress
                  percentage={relatedEpics.length > 0 ? Math.round(relatedEpics.reduce((sum, e) => sum + e.progress, 0) / relatedEpics.length) : 0}
                  color={getProgressColor(relatedEpics.length > 0 ? Math.round(relatedEpics.reduce((sum, e) => sum + e.progress, 0) / relatedEpics.length) : 0)}
                />
                <span className="text-[13px] text-[#323232] text-center">
                  Target: {ikp.target}{ikp.unit}
                </span>
              </div>
              {/* IKK badge + title */}
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="inline-flex bg-[rgba(144,108,239,0.1)] px-[8px] py-[2px] rounded-[4px] text-[16px] text-[#323232] mb-[2px]">
                  {ikkCode}
                </span>
                <p className="text-[16px] text-[#323232] leading-[24px]" style={{ fontWeight: 700 }}>
                  {ikp.description}
                </p>
              </div>
            </div>

            {/* SKP Rows */}
            {relatedEpics.map((epic, epicIndex) => (
              <div key={epic.id} className="border-t border-[#efefef] border-solid flex gap-[12px] items-start px-[12px] py-[16px] w-full">
                {/* Circular progress (no target label) */}
                <div className="flex flex-col items-center shrink-0 w-[80px]">
                  <CircularProgress percentage={epic.progress} color={getProgressColor(epic.progress)} />
                </div>
                {/* SKP badge + description */}
                <div className="flex flex-col items-start flex-1 min-w-0 pt-[2px]">
                  <span className="inline-flex bg-[rgba(144,108,239,0.1)] px-[8px] py-[2px] rounded-[4px] text-[16px] text-[#323232] mb-[6px]">
                    SKP {kinerja.code.replace('SK', '')}.{ikpIndex + 1}.{epicIndex + 1}
                  </span>
                  {epic.description && (
                    <p className="text-[14px] text-[#656a6c] leading-[22px] mt-[4px]">{epic.description}</p>
                  )}
                </div>
              </div>
            ))}

            {relatedEpics.length === 0 && (
              <div className="border-t border-[#efefef] px-[12px] py-[12px] w-full">
                <p className="text-[14px] text-[#727272]">Belum ada SKP terkait</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
