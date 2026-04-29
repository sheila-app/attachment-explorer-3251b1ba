import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { mockWorkouts, mockExercises, PHASE_META } from "@/data/mock";
import { Clock, Flame, Dumbbell, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/workouts/$id")({ component: DetailPage });

function DetailPage() {
  const { id } = useParams({ from: "/workouts/$id" });
  const w = mockWorkouts.find(x => x.id === id) ?? mockWorkouts[0];
  const p = PHASE_META[w.phase];

  return (
    <FeatureShell title="تفاصيل التمرين" back="/workouts" showNav={false} variant="energetic">
      <div className="px-5 pb-6">
        <div className="glass-strong rounded-2xl overflow-hidden">
          <div className="relative aspect-video flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${p.color}66, ${p.color}22)` }}
          >
            <svg className="absolute inset-0 opacity-50" viewBox="0 0 200 110" fill="none">
              <circle cx="100" cy="55" r="40" stroke={p.color} strokeWidth="0.8" strokeDasharray="2 4" />
              <circle cx="100" cy="55" r="60" stroke={p.color} strokeWidth="0.5" strokeDasharray="1 5" />
            </svg>
            <Flame size={50} style={{ color: p.color }} strokeWidth={1.25} className="relative" />
          </div>
          <div className="relative z-10 p-5">
            <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: p.color }}>مناسب لمرحلة {p.name}</span>
            <h1 className="font-display text-2xl mt-1.5">{w.title}</h1>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <Stat icon={Clock} label="المدّة" value={`${w.duration} د`} />
              <Stat icon={Flame} label="السعرات" value={`${w.calories}`} />
              <Stat icon={Dumbbell} label="المعدّات" value={w.equipment} />
            </div>
          </div>
        </div>

        <h2 className="text-sm font-medium mt-6 mb-2.5">التمارين</h2>
        <div className="space-y-2">
          {mockExercises.map((ex, i) => (
            <div key={ex.id} className="glass rounded-xl p-3 flex items-center gap-3">
              <span className="relative z-10 w-8 h-8 rounded-full glass-strong flex items-center justify-center text-primary text-sm font-medium nums">{i + 1}</span>
              <div className="relative z-10 flex-1 min-w-0">
                <div className="text-[13px] font-medium">{ex.name}</div>
                <div className="text-[11px] text-foreground/60 mt-0.5 nums">{ex.sets} مجموعات · {ex.reps} · راحة {ex.rest} ث</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <PrimaryCTA to="/workouts/$id/play">ابدئي التمرين</PrimaryCTA>
        </div>
      </div>
    </FeatureShell>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-2.5">
      <Icon size={13} className="relative z-10 text-primary" strokeWidth={1.75} />
      <div className="relative z-10 text-[10px] text-foreground/55 mt-1">{label}</div>
      <div className="relative z-10 text-[12.5px] font-medium mt-0.5 nums">{value}</div>
    </div>
  );
}
