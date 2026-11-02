import { useState, useEffect } from 'react';
import { LogIn, LogOut, AlertCircle, RefreshCcw } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type GeneralStatus = 'belum-presensi' | 'sedang-bekerja' | 'selesai-bekerja';
type ClockInLabel = 'tepat-waktu' | 'terlambat' | 'lupa-clock-in' | null;
type ClockOutLabel = 'tepat-waktu' | 'pulang-awal' | null;

// ─── Business Rules ───────────────────────────────────────────────────────────

/** ≤ 07:30 = Tepat Waktu */
const BATAS_CLOCK_IN_MENIT = 7 * 60 + 30;
/** ≥ 16:30 = Tepat Waktu */
const BATAS_CLOCK_OUT_MENIT = 16 * 60 + 30;
/** ≥ 16:30 tanpa clock in = Lupa Clock In */
const BATAS_LUPA_CLOCK_IN_MENIT = 16 * 60 + 30;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toMenit(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

function formatJam(date: Date | null): string {
  if (!date) return '--:--';
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function formatTanggal(date: Date): string {
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ─── Label Configs ────────────────────────────────────────────────────────────

interface LabelConfig {
  text: string;
  color: string;
  bgColor: string;
}

function getClockInLabelConfig(label: ClockInLabel): LabelConfig | null {
  if (!label) return null;
  
  switch (label) {
    case 'tepat-waktu':
      return {
        text: 'Tepat Waktu',
        color: '#1B5E20',
        bgColor: '#E8F5E9',
      };
    case 'terlambat':
      return {
        text: 'Terlambat',
        color: '#BF360C',
        bgColor: '#FBE9E7',
      };
    case 'lupa-clock-in':
      return {
        text: 'Lupa Clock In',
        color: '#B71C1C',
        bgColor: '#FFEBEE',
      };
  }
}

function getClockOutLabelConfig(label: ClockOutLabel): LabelConfig | null {
  if (!label) return null;
  
  switch (label) {
    case 'tepat-waktu':
      return {
        text: 'Tepat Waktu',
        color: '#1B5E20',
        bgColor: '#E8F5E9',
      };
    case 'pulang-awal':
      return {
        text: 'Pulang Awal',
        color: '#BF360C',
        bgColor: '#FBE9E7',
      };
  }
}

// ─── Status Config ────────────────────────────────────────────────────────────

interface StatusConfig {
  badge: string;
  badgeColor: string;
  badgeBg: string;
  dotColor: string;
  pesan: string;
}

function getGeneralStatusConfig(
  status: GeneralStatus,
  clockInTime: Date | null,
  clockInLabel: ClockInLabel
): StatusConfig {
  switch (status) {
    case 'belum-presensi':
      if (clockInLabel === 'lupa-clock-in') {
        return {
          badge: 'Belum Presensi',
          badgeColor: '#B71C1C',
          badgeBg: '#FFEBEE',
          dotColor: '#F44336',
          pesan: 'Belum presensi masuk, silakan lakukan presensi pulang',
        };
      }
      return {
        badge: 'Belum Presensi',
        badgeColor: '#616161',
        badgeBg: '#F5F5F5',
        dotColor: '#9E9E9E',
        pesan: 'Belum presensi masuk hari ini',
      };
    case 'sedang-bekerja':
      return {
        badge: 'Sedang Bekerja',
        badgeColor: '#1565C0',
        badgeBg: '#E3F2FD',
        dotColor: '#2196F3',
        pesan: `Sudah presensi masuk pada pukul ${formatJam(clockInTime)}`,
      };
    case 'selesai-bekerja':
      if (!clockInTime) {
        return {
          badge: 'Selesai Bekerja',
          badgeColor: '#E65100',
          badgeBg: '#FFF3E0',
          dotColor: '#FF9800',
          pesan: 'Presensi pulang tercatat (tanpa presensi masuk)',
        };
      }
      return {
        badge: 'Selesai Bekerja',
        badgeColor: '#1B5E20',
        badgeBg: '#E8F5E9',
        dotColor: '#4CAF50',
        pesan: 'Sudah presensi lengkap hari ini',
      };
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function WidgetKehadiran() {
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);
  const [now, setNow] = useState(new Date());

  // Tick every minute so the clock stays fresh
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // ── Derive General Status ────────────────────────────────────────────────

  const generalStatus: GeneralStatus = (() => {
    if (!clockInTime && !clockOutTime) return 'belum-presensi';
    if (clockOutTime) return 'selesai-bekerja';
    return 'sedang-bekerja';
  })();

  // ── Derive Clock In Label ────────────────────────────────────────────────

  const clockInLabel: ClockInLabel = (() => {
    // Jika belum clock in
    if (!clockInTime) {
      const nowMenit = toMenit(now);
      // Lupa clock in jika sudah lewat jam 16:30
      if (nowMenit >= BATAS_LUPA_CLOCK_IN_MENIT) {
        return 'lupa-clock-in';
      }
      return null;
    }
    
    // Jika sudah clock in, cek apakah tepat waktu atau terlambat
    const clockInMenit = toMenit(clockInTime);
    return clockInMenit <= BATAS_CLOCK_IN_MENIT ? 'tepat-waktu' : 'terlambat';
  })();

  // ── Derive Clock Out Label ────────────────────────────────────────────────

  const clockOutLabel: ClockOutLabel = (() => {
    if (!clockOutTime) return null;
    
    const clockOutMenit = toMenit(clockOutTime);
    return clockOutMenit >= BATAS_CLOCK_OUT_MENIT ? 'tepat-waktu' : 'pulang-awal';
  })();

  // ── Configs ──────────────────────────────────────────────────────────────

  const statusConfig = getGeneralStatusConfig(generalStatus, clockInTime, clockInLabel);
  const clockInLabelConfig = getClockInLabelConfig(clockInLabel);
  const clockOutLabelConfig = getClockOutLabelConfig(clockOutLabel);

  const canClockIn = generalStatus === 'belum-presensi' && clockInLabel !== 'lupa-clock-in';
  const isLupaClockIn = clockInLabel === 'lupa-clock-in';
  const canClockOut = generalStatus === 'sedang-bekerja' || (isLupaClockIn && !clockOutTime);

  // ── Reset (demo) ──────────────────────────────────────────────────────────

  function reset() {
    setClockInTime(null);
    setClockOutTime(null);
    setNow(new Date()); // Reset waktu ke waktu sekarang yang sebenarnya
  }

  // ── Simulasi Lupa Clock In (demo) ─────────────────────────────────────────

  function simulasiLupaClockIn() {
    // Set waktu sekarang ke 16:31 untuk trigger lupa clock in
    const waktuLewat = new Date();
    waktuLewat.setHours(16, 31, 0, 0);
    setNow(waktuLewat);
  }

  // ────────────────────────────────────────────────────────────────────────

  return (
    <div
      className="bg-white flex flex-col gap-0 rounded-[var(--radius-card)] border relative w-full overflow-hidden h-[280px]"
      style={{ borderColor: '#c7c7c7' }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="px-[20px] pt-[20px] pb-[16px] flex items-start justify-between">
        <div className="flex flex-col gap-[2px]">
          <h3 className="uppercase tracking-[0.5px]">
            Kehadiran Hari Ini
          </h3>
          <span
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--muted-foreground)',
            }}
          >
            {formatTanggal(now)}
          </span>
        </div>

        {/* Status badge pill — top right */}
        <div className="flex items-center gap-[6px] shrink-0">
          {/* Animated dot */}
          <span className="relative flex h-[8px] w-[8px] shrink-0">
            {generalStatus === 'sedang-bekerja' && (
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                style={{ backgroundColor: statusConfig.dotColor }}
              />
            )}
            <span
              className="relative inline-flex rounded-full h-[8px] w-[8px]"
              style={{ backgroundColor: statusConfig.dotColor }}
            />
          </span>
          <span
            className="inline-flex items-center px-[8px] py-[2px] rounded-full"
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: statusConfig.badgeColor,
              backgroundColor: statusConfig.badgeBg,
            }}
          >
            {statusConfig.badge}
          </span>
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────────────────────── */}
      <div className="w-full h-[1px]" style={{ backgroundColor: '#EFEFEF' }} />

      {/* ── Clock In / Clock Out Buttons ─────────────────────────────────────── */}
      <div className="px-[20px] py-[16px] grid grid-cols-2 gap-[8px] flex-1">

        {/* Presensi Masuk */}
        <div className="flex flex-col items-start relative h-full">
          {/* Button Area - Top */}
          <button
            onClick={() => canClockIn && setClockInTime(new Date())}
            disabled={!canClockIn}
            className="flex flex-col items-center justify-center gap-[4px] py-[12px] px-[8px] rounded-tl-[var(--radius-card)] rounded-tr-[var(--radius-card)] border-t border-l border-r transition-all w-full flex-1"
            style={{
              borderColor: canClockIn ? 'var(--primary)' : '#E0E0E0',
              backgroundColor: canClockIn ? 'var(--primary)' : '#F7F7F7',
              cursor: canClockIn ? 'pointer' : 'not-allowed',
              opacity: isLupaClockIn ? 0.5 : 1,
            }}
          >
            <LogIn
              className="w-[16px] h-[16px]"
              style={{ color: canClockIn ? 'var(--primary-foreground)' : 'var(--muted-foreground)' }}
            />
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: canClockIn ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
              }}
            >
              Presensi Masuk
            </span>
            <span
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: canClockIn
                  ? 'rgba(255,255,255,0.85)'
                  : clockInTime
                  ? 'var(--foreground)'
                  : 'var(--muted-foreground)',
              }}
            >
              {formatJam(clockInTime)}
            </span>
          </button>

          {/* Label Status - Bottom */}
          {clockInLabelConfig && (
            <div
              className="flex items-center justify-center px-[8px] py-[2px] rounded-bl-[var(--radius-card)] rounded-br-[var(--radius-card)] border-b border-l border-r w-full"
              style={{
                backgroundColor: clockInLabelConfig.bgColor,
                borderColor: '#E0E0E0',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: clockInLabelConfig.color,
                }}
              >
                {clockInLabelConfig.text}
              </span>
            </div>
          )}
        </div>

        {/* Presensi Pulang */}
        <div className="flex flex-col items-start relative h-full">
          {/* Button Area - Top */}
          <button
            onClick={() => canClockOut && setClockOutTime(new Date())}
            disabled={!canClockOut}
            className="flex flex-col items-center justify-center gap-[4px] py-[12px] px-[8px] rounded-tl-[var(--radius-card)] rounded-tr-[var(--radius-card)] border-t border-l border-r transition-all w-full flex-1"
            style={{
              borderColor: canClockOut ? 'var(--primary)' : '#E0E0E0',
              backgroundColor: canClockOut ? 'var(--primary)' : '#F7F7F7',
              cursor: canClockOut ? 'pointer' : 'not-allowed',
              opacity: (generalStatus === 'belum-presensi' && !isLupaClockIn) ? 0.45 : 1,
            }}
          >
            <LogOut
              className="w-[16px] h-[16px]"
              style={{ color: canClockOut ? 'var(--primary-foreground)' : 'var(--muted-foreground)' }}
            />
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: canClockOut ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
              }}
            >
              Presensi Pulang
            </span>
            <span
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: canClockOut
                  ? 'rgba(255,255,255,0.85)'
                  : clockOutTime
                  ? 'var(--foreground)'
                  : 'var(--muted-foreground)',
              }}
            >
              {formatJam(clockOutTime)}
            </span>
          </button>

          {/* Label Status - Bottom */}
          {clockOutLabelConfig && (
            <div
              className="flex items-center justify-center px-[8px] py-[2px] rounded-bl-[var(--radius-card)] rounded-br-[var(--radius-card)] border-b border-l border-r w-full"
              style={{
                backgroundColor: clockOutLabelConfig.bgColor,
                borderColor: '#E0E0E0',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: clockOutLabelConfig.color,
                }}
              >
                {clockOutLabelConfig.text}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Demo buttons: Reset (left) & Simulasi (right) ───────────────────── */}
      <div className="px-[20px] pb-[16px] flex items-center justify-between">
        <button
          onClick={reset}
          title="Reset demo"
          className="flex items-center gap-[4px] px-[6px] py-[4px] rounded-[4px] transition-colors hover:opacity-70"
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--muted-foreground)',
            backgroundColor: 'var(--secondary)',
          }}
        >
          <RefreshCcw className="w-[10px] h-[10px]" />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
            Reset
          </span>
        </button>

        {generalStatus === 'belum-presensi' && !isLupaClockIn && (
          <button
            onClick={simulasiLupaClockIn}
            className="transition-opacity hover:opacity-70"
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--muted-foreground)',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            }}
          >
            Simulasi: Lupa Presensi (Lewat 16:30)
          </button>
        )}
      </div>
    </div>
  );
}