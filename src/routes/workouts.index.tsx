import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockWorkouts, PHASE_META } from "@/data/mock";
import { Search, Flame, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/workouts")({ component: WorkoutsPage });

const FILTERS = ["الكل", "يوغا", "كارديو", "HIIT", "قوّة", "بيلاتس", "تمدّد"];

function WorkoutsPage() {
  const [filter, setFilter] = useState("الكل");
  const items = filter === "الكل" ? mockWorkouts : mockWorkouts.filter(w => w.type === filter);
  return (
    <FeatureShell title="مكتبة التمارين" variant="energetic"
      trailing={
        <Link to="/search" className="glass w-10 h-10 rounded-full flex items-center justify-center">
          <Search size={16} className="relative z-10" />
        </Link>
      }
    >
      <div className="px-5">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Link to="/workouts/live" className="glass-strong rounded-2xl p-3 flex items-center gap-2">
            <span className="relative z-10 px-1.5 py-0.5 rounded-full text-[9px] font-medium text-white" style={{ background: "var(--phase-menstrual)" }}>● مباشر</span>
            <span className="relative z-10 text-[12px] font-medium flex-1">جلسات اليوم</span>
            <ChevronLeft size={14} className="relative z-10 text-foreground/55" />
          </Link>
          <Link to="/workouts/programs" className="glass-strong rounded-2xl p-3 flex items-center gap-2">
            <span className="relative z-10 text-[12px] font-medium flex-1">البرامج</span>
            <ChevronLeft size={14} className="relative z-10 text-foreground/55" />
          </Link>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="glass shrink-0 px-4 py-2 rounded-full text-[12px] font-medium whitespace-nowrap"
              style={filter === f ? { background: "var(--gradient-primary)", color: "white", boxShadow: "0 8px 20px -8px oklch(0.46 0.135 328 / 0.5)" } : undefined}
            >
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 stagger">
          {items.map(w => {
            const p = PHASE_META[w.phase];
            return (
              <Link key={w.id} to="/workouts/$id" params={{ id: w.id }}
                className="glass rounded-2xl p-3 flex flex-col gap-2"
              >
                <div className="relative z-10 aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${p.color}55, ${p.color}15)` }}
                >
                  <svg className="absolute inset-0 opacity-40" viewBox="0 0 100 75" fill="none">
                    <circle cx="50" cy="38" r="28" stroke={p.color} strokeWidth="0.6" strokeDasharray="2 3" />
                    <circle cx="50" cy="38" r="18" stroke={p.color} strokeWidth="0.6" />
                  </svg>
                  <Flame size={28} style={{ color: p.color }} strokeWidth={1.5} className="relative" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-[13px] font-medium leading-tight">{w.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5 text-[10.5px] text-foreground/60 nums">
                    <span>{w.duration} د</span>
                    <span className="w-1 h-1 rounded-full bg-foreground/30" />
                    <span>{w.level}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </FeatureShell>
  );
}
