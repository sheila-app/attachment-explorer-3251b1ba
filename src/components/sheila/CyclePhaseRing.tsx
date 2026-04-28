import { PHASE_META, type CyclePhase } from "@/data/mock";

interface Props {
  phase: CyclePhase;
  day: number;
  cycleLength: number;
  size?: number;
}

const PHASES: { key: CyclePhase; days: number }[] = [
  { key: "menstrual", days: 5 },
  { key: "follicular", days: 8 },
  { key: "ovulation", days: 3 },
  { key: "luteal", days: 12 },
];

/**
 * حلقة المراحل — متعدّدة الطبقات: مسار خلفي، أقواس المراحل الأربع بألوانها،
 * مؤشّر اليوم الحالي، وحلقة داخلية ناعمة. تصميم سريريّ-أنثوي.
 */
export function CyclePhaseRing({ phase, day, cycleLength, size = 240 }: Props) {
  const stroke = 10;
  const innerStroke = 2;
  const r = (size - stroke) / 2 - 18;
  const innerR = r - 16;
  const cx = size / 2;
  const cy = size / 2;
  const C = 2 * Math.PI * r;
  const innerC = 2 * Math.PI * innerR;
  const meta = PHASE_META[phase];

  // Build phase arcs around the ring
  let cumulativeDays = 0;
  const arcs = PHASES.map((p) => {
    const start = (cumulativeDays / cycleLength) * C;
    const length = (p.days / cycleLength) * C - 4; // tiny gap
    cumulativeDays += p.days;
    return { ...p, start, length };
  });

  // Position of the day marker
  const angleDeg = (day / cycleLength) * 360 - 90;
  const angleRad = (angleDeg * Math.PI) / 180;
  const markerX = cx + r * Math.cos(angleRad);
  const markerY = cy + r * Math.sin(angleRad);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Soft halo behind */}
      <div
        className="absolute inset-4 rounded-full blur-2xl opacity-50"
        style={{ background: `radial-gradient(circle, ${meta.color}, transparent 70%)` }}
      />

      <svg width={size} height={size} className="relative">
        <defs>
          {PHASES.map((p) => (
            <linearGradient key={p.key} id={`arc-${p.key}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={`var(--phase-${p.key})`} stopOpacity="0.55" />
              <stop offset="100%" stopColor={`var(--phase-${p.key})`} stopOpacity="1" />
            </linearGradient>
          ))}
        </defs>

        {/* Ultra-faint outer guide */}
        <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="var(--color-border)" strokeWidth="1" opacity="0.4" strokeDasharray="2 4" />

        {/* Background track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-border)" strokeWidth={stroke} opacity="0.35" />

        {/* Phase arcs */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {arcs.map((a) => (
            <circle
              key={a.key}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={`url(#arc-${a.key})`}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${a.length} ${C}`}
              strokeDashoffset={-a.start}
              opacity={a.key === phase ? 1 : 0.35}
              style={{ transition: "opacity 0.6s ease" }}
            />
          ))}
        </g>

        {/* Inner thin progress line */}
        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill="none"
          stroke={meta.color}
          strokeWidth={innerStroke}
          strokeLinecap="round"
          strokeDasharray={innerC}
          strokeDashoffset={innerC - (day / cycleLength) * innerC}
          transform={`rotate(-90 ${cx} ${cy})`}
          opacity="0.5"
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />

        {/* Day marker — pulsing dot */}
        <circle cx={markerX} cy={markerY} r="9" fill="var(--color-background)" />
        <circle cx={markerX} cy={markerY} r="6" fill={meta.color} className="animate-breathe" style={{ transformOrigin: `${markerX}px ${markerY}px` }} />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">يوم</div>
        <div className="font-display text-6xl leading-none mt-1 nums" style={{ color: meta.color }}>
          {day}
        </div>
        <div className="text-[11px] text-muted-foreground mt-1 nums">من {cycleLength}</div>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full animate-breathe" style={{ backgroundColor: meta.color }} />
          <span className="text-xs font-medium" style={{ color: meta.color }}>{meta.name}</span>
        </div>
      </div>
    </div>
  );
}
