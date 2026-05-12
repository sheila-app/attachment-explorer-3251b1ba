import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Bell, Search } from "lucide-react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { BottomNav } from "@/components/sheila/BottomNav";
import { mockUser, PHASE_META, type CyclePhase } from "@/data/mock";
import { toAr } from "@/lib/format";

export const Route = createFileRoute("/home-draft")({ component: HomeDraft });

// تتابع المراحل حسب أيام الدورة (مطابق لـ CyclePhaseRing)
const PHASE_SEQ: { key: CyclePhase; days: number }[] = [
  { key: "menstrual", days: 5 },
  { key: "follicular", days: 8 },
  { key: "ovulation", days: 3 },
  { key: "luteal", days: 12 },
];

const DAY_LETTERS = ["ح", "ن", "ث", "ر", "خ", "ج", "س"]; // أحد..سبت

function HomeDraft() {
  const [day, setDay] = useState(mockUser.cycleDay);
  const cycleLength = mockUser.cycleLength;

  // استنتاج المرحلة الحاليّة من اليوم
  const currentPhase: CyclePhase = useMemo(() => {
    let acc = 0;
    for (const p of PHASE_SEQ) {
      acc += p.days;
      if (day <= acc) return p.key;
    }
    return "luteal";
  }, [day]);

  const meta = PHASE_META[currentPhase];

  // أيّام للأعلى (ستّة أيّام تتمحور حول اليوم الحالي)
  const today = new Date();
  const weekDays = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + (i - 1));
    return d;
  });

  // الأيّام المتبقّية حتى نهاية الدورة (تقدير "الإباضة بعد كذا" بناءً على المرحلة)
  // نحسب نهاية مرحلة الإباضة كمرجعيّة للعدّ التنازلي
  const ovulationStart = PHASE_SEQ[0].days + PHASE_SEQ[1].days + 1; // اليوم الأوّل للإباضة
  const daysToOvulation = day < ovulationStart
    ? ovulationStart - day
    : cycleLength - day + ovulationStart;
  const daysLeftCycle = cycleLength - day;

  return (
    <DeviceFrame>
      <div
        className="relative h-full overflow-hidden transition-colors duration-700"
        style={{
          background: `linear-gradient(180deg, color-mix(in oklab, ${meta.color} 28%, white) 0%, color-mix(in oklab, ${meta.color} 14%, white) 55%, var(--background) 100%)`,
        }}
      >
        {/* هالات لونيّة ناعمة في الخلفيّة */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-24 -end-24 w-[420px] h-[420px] rounded-full blur-[90px] opacity-60 transition-colors duration-700"
            style={{ background: meta.color }}
          />
          <div
            className="absolute top-1/3 -start-24 w-[360px] h-[360px] rounded-full blur-[100px] opacity-40 transition-colors duration-700"
            style={{ background: `color-mix(in oklab, ${meta.color} 60%, white)` }}
          />
        </div>

        <div className="relative z-10 h-full overflow-y-auto no-scrollbar pb-28">
          {/* الرأس: الاسم + بحث + إشعارات */}
          <div className="flex items-center justify-between px-5 pt-5">
            <div>
              <div className="text-[11px] text-foreground/55 tracking-widest uppercase">مرحباً</div>
              <div className="font-display text-2xl text-foreground/90 mt-0.5">{mockUser.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-white/70 backdrop-blur border border-white/60 flex items-center justify-center shadow-sm">
                <Search size={17} strokeWidth={1.75} className="text-foreground/75" />
              </button>
              <button className="relative w-10 h-10 rounded-full bg-white/70 backdrop-blur border border-white/60 flex items-center justify-center shadow-sm">
                <Bell size={17} strokeWidth={1.75} className="text-foreground/75" />
                <span className="absolute top-2 end-2 w-1.5 h-1.5 rounded-full bg-destructive" />
              </button>
            </div>
          </div>

          {/* شريط الأيّام */}
          <div className="mt-6 px-4">
            <div className="flex items-center justify-between gap-1.5">
              {weekDays.map((d, i) => {
                const dayNum = d.getDate();
                const isToday = i === 1; // الثاني هو اليوم الحالي
                return (
                  <button
                    key={i}
                    className={`flex-1 aspect-[3/4] rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                      isToday
                        ? "text-white shadow-lg"
                        : "bg-white/85 backdrop-blur border border-white/70 text-foreground/70"
                    }`}
                    style={
                      isToday
                        ? { background: meta.color, boxShadow: `0 12px 28px -12px ${meta.color}` }
                        : undefined
                    }
                  >
                    <span className={`text-[11px] ${isToday ? "opacity-90" : "opacity-60"}`}>
                      {DAY_LETTERS[d.getDay()]}
                    </span>
                    <span className="font-display text-base nums">{toAr(dayNum)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* الدائرة متعدّدة الألوان */}
          <div className="mt-10 flex items-center justify-center">
            <MultiPhaseRing
              size={300}
              day={day}
              cycleLength={cycleLength}
              currentPhase={currentPhase}
              centerTop="الإباضة بعد"
              centerBig={`${toAr(daysToOvulation)}`}
              centerSmall="أيام"
              chip={`متبقٍّ ${toAr(daysLeftCycle)} يوم`}
            />
          </div>

          {/* مُنزلق سريع لتجربة تغيّر اللون */}
          <div className="mt-8 mx-5 glass rounded-2xl p-4 bg-white/60 backdrop-blur border border-white/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-foreground/65">معاينة اليوم</span>
              <span className="text-xs nums" style={{ color: meta.color }}>
                يوم {toAr(day)} · {meta.name}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={cycleLength}
              value={day}
              onChange={(e) => setDay(parseInt(e.target.value))}
              className="w-full accent-current"
              style={{ color: meta.color }}
            />
          </div>

          {/* بطاقة وصف بسيطة */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-5 mt-4 rounded-2xl p-4 bg-white/70 backdrop-blur border border-white/60"
          >
            <div className="text-[13px] font-medium" style={{ color: meta.color }}>
              {meta.name}
            </div>
            <div className="text-[12.5px] text-foreground/70 leading-relaxed mt-1">
              {meta.description}
            </div>
          </motion.div>
        </div>

        <BottomNav />
      </div>
    </DeviceFrame>
  );
}

/* =========================================================
 * دائرة متعدّدة المراحل — أقواس بألوان المراحل + مؤشّر اليوم
 * ========================================================= */
function MultiPhaseRing({
  size,
  day,
  cycleLength,
  currentPhase,
  centerTop,
  centerBig,
  centerSmall,
  chip,
}: {
  size: number;
  day: number;
  cycleLength: number;
  currentPhase: CyclePhase;
  centerTop: string;
  centerBig: string;
  centerSmall: string;
  chip: string;
}) {
  const stroke = 28;
  const r = (size - stroke) / 2 - 6;
  const cx = size / 2;
  const cy = size / 2;
  const C = 2 * Math.PI * r;
  const meta = PHASE_META[currentPhase];

  // بناء الأقواس
  let cumulative = 0;
  const arcs = PHASE_SEQ.map((p) => {
    const start = (cumulative / cycleLength) * C;
    const length = (p.days / cycleLength) * C - 3; // فجوة صغيرة
    cumulative += p.days;
    return { ...p, start, length };
  });

  // موضع المؤشّر
  const angleDeg = (day / cycleLength) * 360 - 90;
  const angleRad = (angleDeg * Math.PI) / 180;
  const knobX = cx + r * Math.cos(angleRad);
  const knobY = cy + r * Math.sin(angleRad);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* هالة داخليّة بلون المرحلة */}
      <div
        className="absolute inset-10 rounded-full blur-2xl opacity-40 transition-colors duration-700"
        style={{ background: `radial-gradient(circle, ${meta.color}, transparent 70%)` }}
      />

      <svg width={size} height={size} className="relative">
        {/* مسار خلفي شفّاف */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="white"
          strokeOpacity="0.55"
          strokeWidth={stroke}
        />

        {/* أقواس المراحل */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {arcs.map((a) => (
            <circle
              key={a.key}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={`var(--phase-${a.key})`}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${a.length} ${C}`}
              strokeDashoffset={-a.start}
              opacity={a.key === currentPhase ? 1 : 0.55}
              style={{ transition: "opacity 0.5s ease" }}
            />
          ))}
        </g>

        {/* مؤشّر اليوم */}
        <circle cx={knobX} cy={knobY} r={18} fill="white" />
        <circle
          cx={knobX}
          cy={knobY}
          r={18}
          fill="none"
          stroke={meta.color}
          strokeWidth={3}
        />
      </svg>

      {/* المحتوى الأوسط */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-[12px] text-foreground/65">{centerTop}</div>
        <div className="font-display text-5xl mt-1 nums" style={{ color: meta.color }}>
          {centerBig}
          <span className="text-base text-foreground/55 font-normal me-2">{centerSmall}</span>
        </div>
        <div
          className="mt-3 px-3 py-1 rounded-full text-[11px] border bg-white/60 backdrop-blur"
          style={{ borderColor: `color-mix(in oklab, ${meta.color} 50%, transparent)`, color: meta.color }}
        >
          {chip}
        </div>
      </div>
    </div>
  );
}
