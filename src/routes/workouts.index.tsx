import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockWorkouts, PHASE_META } from "@/data/mock";
import { Search, Flame, ChevronLeft, Zap } from "lucide-react";

export const Route = createFileRoute("/workouts/")({ component: WorkoutsPage });

const FILTERS = ["الكل", "يوغا", "كارديو", "HIIT", "قوّة", "بيلاتس", "تمدّد"];

function getWorkoutGradient(type: string): string {
  if (type.includes("يوغا") || type.includes("yoga")) return "linear-gradient(135deg, oklch(0.88 0.06 290), oklch(0.92 0.04 320))";
  if (type === "HIIT") return "linear-gradient(135deg, oklch(0.88 0.08 30), oklch(0.94 0.04 20))";
  if (type.includes("كارديو")) return "linear-gradient(135deg, oklch(0.88 0.06 260), oklch(0.92 0.04 280))";
  if (type.includes("قوة") || type.includes("قوّة")) return "linear-gradient(135deg, oklch(0.85 0.07 328), oklch(0.92 0.04 320))";
  if (type.includes("بيلاتس")) return "linear-gradient(135deg, oklch(0.90 0.06 150), oklch(0.94 0.04 160))";
  return "linear-gradient(135deg, oklch(0.90 0.04 320), oklch(0.95 0.02 310))";
}

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
            <span className="relative z-10 text-sm font-semibold text-foreground flex-1">جلسات اليوم</span>
            <ChevronLeft size={14} className="relative z-10 text-foreground/55" />
          </Link>
          <Link to="/workouts/programs" className="glass-strong rounded-2xl p-3 flex items-center gap-2">
            <span className="relative z-10 text-sm font-semibold text-foreground flex-1">البرامج</span>
            <ChevronLeft size={14} className="relative z-10 text-foreground/55" />
          </Link>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
          {FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              className="glass shrink-0 px-4 py-2 rounded-full text-[12px] whitespace-nowrap"
              style={filter === f
                ? { background: "var(--gradient-primary)", color: "white", boxShadow: "0 8px 20px -8px oklch(0.46 0.135 328 / 0.5)" }
                : undefined}
              whileTap={{ scale: 0.94 }}
            >
              <span className={`relative z-10 ${filter === f ? "font-semibold text-white" : "font-medium text-foreground/70"}`}>{f}</span>
            </motion.button>
          ))}
        </div>

        {/* Phase banner */}
        <div
          className="mx-0 mt-3 mb-3 p-3 rounded-xl border flex items-center gap-2"
          style={{ background: "oklch(0.46 0.135 328 / 0.08)", borderColor: "oklch(0.46 0.135 328 / 0.15)" }}
        >
          <Zap size={14} className="text-primary flex-shrink-0" strokeWidth={2} />
          <span className="text-xs font-medium text-foreground">في مرحلة الإباضة — الوقت المثالي لتمارين الكثافة العالية</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {items.map((w, index) => {
            const p = PHASE_META[w.phase];
            return (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Link to="/workouts/$id" params={{ id: w.id }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl border border-border overflow-hidden shadow-sm block"
                >
                  {/* Thumbnail */}
                  <div
                    className="h-32 relative flex items-center justify-center"
                    style={{ background: getWorkoutGradient(w.type) }}
                  >
                    {/* Phase badge */}
                    <span
                      className="text-[10px] font-medium text-white px-2 py-0.5 rounded-full absolute top-2 start-2"
                      style={{ background: p.color }}
                    >
                      {p.name}
                    </span>
                    <Flame size={36} style={{ color: p.color }} strokeWidth={1.5} />
                  </div>
                  {/* Text area */}
                  <div className="p-3 bg-white">
                    <h3 className="text-sm font-semibold text-foreground leading-tight">{w.title}</h3>
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground nums">
                      <span>{w.duration} د</span>
                      <span className="w-1 h-1 rounded-full bg-foreground/30" />
                      <span>{w.level}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </FeatureShell>
  );
}
