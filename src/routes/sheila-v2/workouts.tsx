import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Wand2, ChevronLeft, Play, Check } from "lucide-react";
import { ShellV2, PhasePill } from "@/components/sheila-v2/ShellV2";
import { AITyping, useFakeGenerate } from "@/components/sheila-v2/AITyping";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";
import { PHASE_META, WORKOUTS } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/workouts")({ component: WorkoutsIdx });

function WorkoutsIdx() {
  const { state, dispatch, isWorkoutDone } = useSheilaV2();
  const phase = state.currentPhase;
  const meta = PHASE_META[phase];
  const ready = useFakeGenerate(phase, 900);
  const rec = WORKOUTS.find((w) => w.phase.includes(phase)) ?? WORKOUTS[0];

  return (
    <ShellV2 title="التمارين" rightSlot={<PhasePill phase={phase} name={meta.name} color={meta.color} />} variant="energetic">
      <div className="px-5">
        {/* Zone 1 — اقتراح شيلا */}
        <div className="rounded-3xl p-5 glass-strong">
          <div className="relative z-10 flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-primary" />
            <span className="text-[11px] font-semibold text-primary">اقتراح شيلا</span>
          </div>
          <Link
            to="/sheila-v2/workouts/player"
            onClick={() => dispatch({ type: "selectWorkout", workoutId: rec.id })}
            className="relative z-10 block rounded-2xl bg-white/70 p-4 active:scale-[0.99] transition-transform"
          >
            <div className="text-[15px] font-display">{rec.title}</div>
            <div className="text-[11px] text-foreground/65 mt-1">{rec.duration} د • {rec.level} • {rec.cal} سعرة</div>
            <p className="text-[11.5px] text-foreground/65 mt-2 leading-relaxed min-h-[34px]">
              {ready ? <AITyping text={rec.rationale} speed={20} /> : "جاري التحضير…"}
            </p>
            <div className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl text-primary-foreground text-[12.5px] font-semibold" style={{ background: "var(--gradient-primary)" }}>
              <Play size={13} strokeWidth={2.5} />ابدئي التمرين
            </div>
          </Link>
        </div>

        {/* Zone 2 — Builder shortcut */}
        <Link to="/sheila-v2/workouts/builder" className="mt-3 rounded-2xl p-4 flex items-center gap-3 active:scale-[0.99]"
              style={{ background: "linear-gradient(135deg, oklch(0.96 0.04 322), oklch(0.96 0.04 165))", border: "1px solid oklch(0.92 0.04 322)" }}>
          <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center"><Wand2 size={18} className="text-primary" strokeWidth={1.9} /></div>
          <div className="flex-1"><div className="text-[13px] font-semibold">ابني تمريناً مع شيلا</div><div className="text-[11px] text-foreground/65 mt-0.5">صفي ما تريدين، وشيلا تبني الجلسة</div></div>
          <ChevronLeft size={16} className="text-foreground/40" />
        </Link>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="rounded-2xl bg-white/85 border border-border p-3 text-center">
            <div className="text-[10px] text-foreground/55">جلسات اليوم</div>
            <div className="font-display text-[20px] nums mt-1">{state.completedWorkouts.length}</div>
          </div>
          <div className="rounded-2xl bg-white/85 border border-border p-3 text-center">
            <div className="text-[10px] text-foreground/55">سعرات محروقة</div>
            <div className="font-display text-[20px] nums mt-1" style={{ color: meta.color }}>
              {state.completedWorkouts.reduce((s, cw) => s + (WORKOUTS.find((w) => w.id === cw.workoutId)?.cal ?? 0), 0)}
            </div>
          </div>
        </div>

        {/* Zone 3 — Library */}
        <h2 className="text-[12px] font-semibold mt-5 mb-2.5">المكتبة</h2>
        <div className="grid gap-2.5">
          {WORKOUTS.map((w) => {
            const m = PHASE_META[w.phase[0]];
            const done = isWorkoutDone(w.id);
            return (
              <Link
                key={w.id}
                to="/sheila-v2/workouts/player"
                onClick={() => dispatch({ type: "selectWorkout", workoutId: w.id })}
                className="rounded-2xl bg-white/85 border border-border p-3.5 flex items-center gap-3 active:scale-[0.99]"
              >
                <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${m.color}55, ${m.color}22)` }}>
                  {done ? <Check size={18} className="text-primary" strokeWidth={2.2} /> : <span className="text-[14px] font-display" style={{ color: m.deep }}>{w.duration}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium truncate">{w.title}</div>
                  <div className="text-[10.5px] text-foreground/60 mt-0.5">{w.type} • {w.level} • {w.cal} سعرة</div>
                </div>
                <ChevronLeft size={15} className="text-foreground/40" />
              </Link>
            );
          })}
        </div>
      </div>
    </ShellV2>
  );
}
