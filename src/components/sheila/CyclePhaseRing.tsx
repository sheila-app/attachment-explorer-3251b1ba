import { PHASE_META, type CyclePhase } from "@/data/mock";

interface Props {
  phase: CyclePhase;
  day: number;
  cycleLength: number;
  size?: number;
}

/**
 * حلقة المراحل الدائرية — تعرض موضع اليوم الحالي ضمن الدورة،
 * مع تدرّج حسب المرحلة وتقسيم بصري للمراحل الأربع.
 */
export function CyclePhaseRing({ phase, day, cycleLength, size = 240 }: Props) {
  const stroke = 14;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const progress = (day / cycleLength) * circumference;

  const meta = PHASE_META[phase];
  const gradId = `ring-grad-${phase}`;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={meta.color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={meta.color} stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={stroke}
          opacity={0.4}
        />
        {/* Progress */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: "stroke-dashoffset 1.2s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-sm text-muted-foreground">اليوم</div>
        <div className="font-display text-5xl leading-none mt-1" style={{ color: meta.color }}>
          {day}
        </div>
        <div className="text-xs text-muted-foreground mt-1">من {cycleLength}</div>
        <div
          className="mt-3 px-3 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: meta.soft, color: meta.color }}
        >
          {meta.name}
        </div>
      </div>
    </div>
  );
}
