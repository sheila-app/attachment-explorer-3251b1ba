import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockUser, mockWorkouts, PHASE_META, type CyclePhase } from "@/data/mock";
import { toAr } from "@/lib/format";
import { ChevronLeft, ChevronRight, Dumbbell } from "lucide-react";

export const Route = createFileRoute("/journey/calendar")({ component: CalendarPage });

const ARABIC_MONTHS = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];
const DAY_LABELS = ["أح", "إث", "ثل", "أر", "خم", "جم", "سب"];

function getDayPhase(dayNum: number, cycleDay: number, cycleLength: number): CyclePhase {
  const offset = ((dayNum - cycleDay) % cycleLength + cycleLength) % cycleLength;
  if (offset < 5) return "menstrual";
  if (offset < 13) return "follicular";
  if (offset < 17) return "ovulation";
  return "luteal";
}

// Some days have workouts (simulate)
const WORKOUT_DAYS = new Set([3, 5, 8, 10, 13, 15, 17, 20, 22, 24]);

function CalendarPage() {
  const today = new Date(2026, 4, 3); // 2026-05-03 per project date
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  // Build calendar grid
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const selectedPhase = selectedDay
    ? getDayPhase(selectedDay, mockUser.cycleDay, mockUser.cycleLength)
    : null;
  const selectedMeta = selectedPhase ? PHASE_META[selectedPhase] : null;
  const sampleWorkout = selectedDay && WORKOUT_DAYS.has(selectedDay) ? mockWorkouts[0] : null;

  return (
    <FeatureShell title="التقويم الصحّي" back="/journey" showNav={false} variant="calm">
      <div className="px-5 pb-8">
        {/* today summary */}
        <div className="glass-strong rounded-2xl p-3.5 mb-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-foreground/55">اليوم</p>
            <p className="text-[14px] font-medium mt-0.5">
              يوم {toAr(mockUser.cycleDay)} من الدورة
            </p>
          </div>
          <span
            className="text-[11.5px] px-3 py-1.5 rounded-full font-medium"
            style={{
              background: PHASE_META[mockUser.currentPhase].soft,
              color: PHASE_META[mockUser.currentPhase].color,
            }}
          >
            {PHASE_META[mockUser.currentPhase].name}
          </span>
        </div>

        {/* month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={nextMonth}
            className="glass w-9 h-9 rounded-xl flex items-center justify-center"
          >
            <ChevronLeft size={16} className="relative z-10" strokeWidth={2} />
          </button>
          <h2 className="font-display text-[17px]">
            {ARABIC_MONTHS[month]} {toAr(year)}
          </h2>
          <button
            onClick={prevMonth}
            className="glass w-9 h-9 rounded-xl flex items-center justify-center"
          >
            <ChevronRight size={16} className="relative z-10" strokeWidth={2} />
          </button>
        </div>

        {/* day labels */}
        <div className="grid grid-cols-7 mb-2">
          {DAY_LABELS.map((d) => (
            <div key={d} className="text-center text-[10px] text-foreground/45 font-medium py-1">
              {d}
            </div>
          ))}
        </div>

        {/* calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (!day) return <div key={`e-${idx}`} />;
            const phase = isCurrentMonth ? getDayPhase(day, mockUser.cycleDay, mockUser.cycleLength) : null;
            const phaseColor = phase ? PHASE_META[phase].color : null;
            const isToday = isCurrentMonth && day === today.getDate();
            const isSelected = isCurrentMonth && day === selectedDay;
            const hasWorkout = WORKOUT_DAYS.has(day);

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                className="aspect-square rounded-xl flex flex-col items-center justify-center transition-all"
                style={
                  isSelected
                    ? {
                        background: phaseColor
                          ? `color-mix(in oklab, ${phaseColor} 25%, transparent)`
                          : "var(--primary-soft)",
                        boxShadow: phaseColor
                          ? `inset 0 0 0 1.5px ${phaseColor}`
                          : "inset 0 0 0 1.5px var(--primary)",
                      }
                    : isToday
                    ? {
                        background: "var(--primary-soft)",
                        boxShadow: "inset 0 0 0 1.5px var(--primary)",
                      }
                    : undefined
                }
              >
                <span
                  className="text-[12.5px] font-medium nums leading-none"
                  style={
                    isSelected || isToday
                      ? { color: phaseColor ?? "var(--primary)" }
                      : { opacity: 0.75 }
                  }
                >
                  {toAr(day)}
                </span>
                {phase && (
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <div
                      className="w-1 h-1 rounded-full"
                      style={{ background: phaseColor ?? "transparent", opacity: 0.7 }}
                    />
                    {hasWorkout && (
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ background: "var(--primary)", opacity: 0.7 }}
                      />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 mb-5">
          {(["menstrual", "follicular", "ovulation", "luteal"] as const).map((ph) => (
            <div key={ph} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: PHASE_META[ph].color }} />
              <span className="text-[10px] text-foreground/60">{PHASE_META[ph].name}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} />
            <span className="text-[10px] text-foreground/60">تمرين</span>
          </div>
        </div>

        {/* selected day detail card */}
        {selectedDay && selectedMeta && (
          <div
            className="glass-strong rounded-2xl p-4 animate-rise"
            style={{ borderColor: selectedMeta.color }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-[14px]">
                {toAr(selectedDay)} {ARABIC_MONTHS[month]}
              </h3>
              <span
                className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                style={{
                  background: selectedMeta.soft,
                  color: selectedMeta.color,
                }}
              >
                {selectedMeta.name}
              </span>
            </div>

            <p className="text-[12.5px] text-foreground/70 leading-relaxed mb-3">
              {selectedMeta.description}
            </p>

            {sampleWorkout ? (
              <div className="glass rounded-xl p-3 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: selectedMeta.soft }}
                >
                  <Dumbbell size={18} strokeWidth={1.75} style={{ color: selectedMeta.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-medium">{sampleWorkout.title}</p>
                  <p className="text-[10.5px] text-foreground/55 mt-0.5 nums">
                    {toAr(sampleWorkout.duration)} دقيقة · {toAr(sampleWorkout.calories)} سعرة
                  </p>
                </div>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--phase-follicular)" }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="glass rounded-xl p-3 text-center">
                <p className="text-[11.5px] text-foreground/50">لا يوجد تمرين مسجّل لهذا اليوم</p>
              </div>
            )}
          </div>
        )}
      </div>
    </FeatureShell>
  );
}
