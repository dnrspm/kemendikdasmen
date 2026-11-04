import { useState } from 'react';
import { Search, Target, Calendar, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { Organization } from '@/app/data/organizationData';
import { SasaranProgram, sasaranPrograms, sasaranKinerjas, calculateOverallProgress, getIKPProgress } from '@/app/data/strategicObjectivesData';

interface SasaranProgramListProps {
  organization: Organization;
  onNavigateToSK?: (skId: string, spId: string, biroId: string) => void;
}

export function SasaranProgramList({ organization, onNavigateToSK }: SasaranProgramListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Sasaran Program by organization
  const programs = sasaranPrograms.filter(sp => sp.owner_org_id === organization.id);

  // Apply filters
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-[24px]">
      {/* Controls */}
      <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px]">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-sd-gray-60" />
          <input
            type="text"
            placeholder="Cari sasaran program..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[40px] pl-[44px] pr-[16px] border border-sd-gray-50 rounded-[4px] text-[var(--text-base)] text-sd-gray-90 placeholder:text-sd-gray-60 bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
          />
        </div>
      </div>

      {/* Program List */}
      <div className="space-y-[20px]">
        {filteredPrograms.map(program => (
          <SasaranProgramCard
            key={program.id}
            program={program}
            onNavigateToSK={onNavigateToSK}
          />
        ))}

        {filteredPrograms.length === 0 && (
          <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[40px] text-center">
            <Target className="w-[48px] h-[48px] mx-auto mb-[16px] text-sd-gray-60" />
            <p className="text-[var(--text-base)] text-sd-gray-60">
              Tidak ada sasaran program ditemukan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Sasaran Program Card Component
function SasaranProgramCard({ program, onNavigateToSK }: { program: SasaranProgram; onNavigateToSK?: (skId: string, spId: string, biroId: string) => void }) {
  const isOverdue = new Date(program.due_date) < new Date();
  const overallProgress = calculateOverallProgress(program.ikp);

  // Get related Sasaran Kinerja
  const relatedSK = sasaranKinerjas.filter(sk => sk.sasaran_program_id === program.id);

  return (
    <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[24px] hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-[16px] mb-[20px]">
        <div className="flex items-start gap-[16px] flex-1">
          <div className="w-[48px] h-[48px] rounded-[8px] bg-sd-blue-70/10 flex items-center justify-center shrink-0">
            <Target className="w-[24px] h-[24px] text-sd-blue-70" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-[12px] mb-[8px]">
              <span className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-blue-70 bg-sd-blue-70/10 px-[12px] py-[4px] rounded-[4px]">
                {program.code}
              </span>
            </div>
            <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-sd-gray-90">
              {program.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Progres Realisasi - Combined with SK list */}
      <div className="mb-[20px]">
        <h4 className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[12px]">
          Progres Realisasi
        </h4>

        <div className="p-[16px] bg-sd-gray-0 rounded-[8px]">
          <div className="flex items-start gap-[20px]">
            {/* Circular Progress Chart */}
            <div className="shrink-0 flex flex-col items-center gap-[8px]">
              <svg width="100" height="100" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--sd-badge-neutral)"
                  strokeWidth="10"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--sd-blue-70)"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 - (overallProgress / 100) * (2 * Math.PI * 42)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                />
                {/* Percentage text */}
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dy="0.3em"
                  fill="var(--sd-blue-70)"
                  fontSize="20"
                  fontWeight="600"
                >
                  {overallProgress}%
                </text>
              </svg>
            </div>

            {/* Sasaran Kinerja List */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-[8px] mb-[12px]">
                <TrendingUp className="w-[16px] h-[16px] text-[#906CEF]" />
                <span className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
                  {relatedSK.length} Sasaran Kinerja
                </span>
              </div>
              {relatedSK.length > 0 ? (
                <div className="space-y-[6px]">
                  {relatedSK.map(sk => (
                    <div key={sk.id} className="flex items-start gap-[8px] text-[var(--text-sm)] text-sd-gray-60">
                      <span className="text-[#906CEF] shrink-0">•</span>
                      <button
                        onClick={() => onNavigateToSK?.(sk.id, program.id, sk.biro_id || '')}
                        className="flex-1 text-left hover:text-primary hover:underline transition-colors"
                      >
                        {sk.name}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--text-sm)] text-sd-gray-60">Belum ada sasaran kinerja terkait</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* IKP Metrics */}
      <div className="mb-[20px]">
        <div className="flex items-center justify-between mb-[12px]">
          <h4 className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-sd-gray-90">
            Progres Ketercapaian
          </h4>

          {/* Legend */}
          <div className="flex items-center gap-[16px] text-[var(--text-xs)]">
            <div className="flex items-center gap-[6px]">
              <div className="w-[12px] h-[12px] rounded-full bg-sd-success-border"></div>
              <span className="text-sd-gray-60">≥ Target</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <div className="w-[12px] h-[12px] rounded-full bg-sd-blue-70"></div>
              <span className="text-sd-gray-60">≥ 75% Target</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <div className="w-[12px] h-[12px] rounded-full bg-sd-warning-border"></div>
              <span className="text-sd-gray-60">&lt; 75% Target</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[12px]">
          {program.ikp.map((ikp) => {
            const progress = getIKPProgress(ikp);
            const isAchieved = ikp.current_value >= ikp.target;
            const circumference = 2 * Math.PI * 36; // radius = 36
            // Display current value in chart (max 100%)
            const displayValue = Math.min(ikp.current_value, 100);
            const dashOffset = circumference - (displayValue / 100) * circumference;
            // Color based on achievement vs target
            const strokeColor = ikp.current_value >= ikp.target ? 'var(--sd-success-border)' : ikp.current_value >= (ikp.target * 0.75) ? 'var(--sd-blue-70)' : 'var(--sd-warning-border)';

            return (
              <div
                key={ikp.id}
                className="p-[16px] bg-sd-gray-0 border border-sd-badge-neutral rounded-[8px]"
              >
                <div className="flex items-start gap-[16px]">
                  {/* Circular Progress with values below */}
                  <div className="shrink-0 flex flex-col items-center gap-[8px]">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      {/* Background circle */}
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        fill="none"
                        stroke="var(--sd-badge-neutral)"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        transform="rotate(-90 40 40)"
                        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                      />
                      {/* Current value text */}
                      <text
                        x="40"
                        y="40"
                        textAnchor="middle"
                        dy="0.3em"
                        fill={strokeColor}
                        fontSize="16"
                        fontWeight="600"
                      >
                        {ikp.current_value}{ikp.unit}
                      </text>
                    </svg>

                    <div className="flex flex-col gap-[2px] text-center">
                      <div className="text-[var(--text-xs)] text-sd-gray-60">
                        Target: {ikp.target}{ikp.unit}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-[8px] mb-[8px]">
                      <span className="text-[var(--text-xs)] font-[var(--font-weight-medium)] text-sd-blue-70 bg-sd-blue-70/10 px-[8px] py-[2px] rounded-[4px]">
                        {ikp.id.toUpperCase().replace('IKP-SK-', 'IKPSK').replace('IKP-', 'IKP').replace(/-/g, '.')}
                      </span>
                      {isAchieved && (
                        <CheckCircle2 className="w-[16px] h-[16px] text-sd-success-border" />
                      )}
                    </div>
                    <p className="text-[var(--text-sm)] text-sd-gray-90 leading-[1.5]">
                      {ikp.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
