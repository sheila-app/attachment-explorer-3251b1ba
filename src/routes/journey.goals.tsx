import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Target, TrendingUp, Plus } from "lucide-react";

export const Route = createFileRoute("/journey/goals")({ component: Page });

const goals = [
  { id: 1, title: "خسارة 3 كجم", progress: 66, current: "−2 كجم", target: "−3 كجم", phase: "نشط" },
  { id: 2, title: "10,000 خطوة يوميّاً", progress: 84, current: "8,420", target: "10,000", phase: "اليوم" },
  { id: 3, title: "تمرين 4 مرّات أسبوعيّاً", progress: 75, current: "3", target: "4", phase: "هذا الأسبوع" },
  { id: 4, title: "8 أكواب ماء يوميّاً", progress: 62, current: "5", target: "8", phase: "اليوم" },
];

function Page() {
  return (
    <FeatureShell title="أهدافي" back="/journey" variant="default"
      trailing={<button className="glass w-10 h-10 rounded-full flex items-center justify-center"><Plus size={17} className="relative z-10 text-primary" /></button>}
    >
      <div className="px-5 pb-8 space-y-3">
        {goals.map(g => (
          <div key={g.id} className="glass-strong rounded-2xl p-4">
            <div className="relative z-10 flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                <Target size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium truncate">{g.title}</div>
                <div className="text-[10.5px] text-foreground/55">{g.phase}</div>
              </div>
              <div className="text-[12px] text-primary font-medium nums">{g.progress}%</div>
            </div>
            <div className="relative z-10 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${g.progress}%`, background: "var(--gradient-primary)" }} />
            </div>
            <div className="relative z-10 flex justify-between text-[11px] text-foreground/65 mt-2 nums" style={{ direction: "ltr" }}>
              <span>{g.current}</span><span>الهدف: {g.target}</span>
            </div>
          </div>
        ))}

        <div className="glass rounded-2xl p-4 mt-3 flex items-center gap-3">
          <TrendingUp size={18} className="relative z-10 text-primary" />
          <p className="relative z-10 text-[12px] text-foreground/75 leading-relaxed">
            معدّل تحقيقكِ للأهداف هذا الشهر <span className="text-primary font-medium nums">72%</span> — أعلى من الشهر السابق بـ 8%.
          </p>
        </div>
      </div>
    </FeatureShell>
  );
}
