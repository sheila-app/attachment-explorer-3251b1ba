import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Calendar, Flame } from "lucide-react";

export const Route = createFileRoute("/workouts/programs")({ component: Page });

const PROGRAMS = [
  { id: "p1", name: "30 يوم قوّة", weeks: 4, level: "متوسّط", sessions: 20, color: "var(--phase-ovulation)" },
  { id: "p2", name: "بداية اليوغا", weeks: 3, level: "مبتدئ", sessions: 15, color: "var(--phase-luteal)" },
  { id: "p3", name: "حرق دهون مكثّف", weeks: 6, level: "متقدّم", sessions: 30, color: "var(--phase-menstrual)" },
  { id: "p4", name: "بيلاتس للجذع", weeks: 4, level: "متوسّط", sessions: 16, color: "var(--phase-follicular)" },
];

function Page() {
  return (
    <FeatureShell title="البرامج التدريبيّة" back="/workouts" variant="energetic">
      <div className="px-5 space-y-3 stagger">
        {PROGRAMS.map((p) => (
          <Link to="/workouts" key={p.id} className="glass-strong rounded-3xl p-5 block relative overflow-hidden">
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full opacity-30" style={{ background: p.color, filter: "blur(40px)" }} />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="font-display text-lg">{p.name}</div>
                <div className="text-[11px] text-foreground/60 mt-1">{p.level}</div>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-primary nums">
                <Calendar size={12} /> {p.weeks} أسابيع
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-3 mt-4 text-[11.5px] text-foreground/65">
              <span className="flex items-center gap-1 nums"><Flame size={12} /> {p.sessions} جلسة</span>
            </div>
          </Link>
        ))}
      </div>
    </FeatureShell>
  );
}
