import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Plus, Check, Flame } from "lucide-react";

export const Route = createFileRoute("/habits/")({ component: Page });

const initial = [
  { id: "h1", name: "شرب 8 أكواب ماء", streak: 12, done: true, icon: "💧" },
  { id: "h2", name: "10 آلاف خطوة", streak: 8, done: true, icon: "👟" },
  { id: "h3", name: "تأمّل 10 دقائق", streak: 5, done: false, icon: "🧘" },
  { id: "h4", name: "قراءة قبل النوم", streak: 21, done: false, icon: "📖" },
  { id: "h5", name: "تمدّد صباحي", streak: 3, done: false, icon: "🤸" },
];

function Page() {
  const [habits, setHabits] = useState(initial);
  const toggle = (id: string) => setHabits(h => h.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const done = habits.filter(h => h.done).length;

  return (
    <FeatureShell title="عاداتي" back="/journey" variant="calm">
      <div className="px-5 space-y-4">
        <div className="glass-strong rounded-3xl p-5">
          <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-1">اليوم</div>
          <div className="flex items-baseline gap-2">
            <div className="font-display text-3xl text-primary nums">{done}/{habits.length}</div>
            <div className="text-[12px] text-foreground/65">عادات منجزة</div>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${(done / habits.length) * 100}%`, background: "var(--gradient-primary)" }} />
          </div>
        </div>

        <div className="space-y-2 stagger">
          {habits.map(h => (
            <button key={h.id} onClick={() => toggle(h.id)}
              className="glass w-full rounded-2xl p-3.5 flex items-center gap-3 text-right">
              <div className="relative z-10 text-2xl">{h.icon}</div>
              <div className="relative z-10 flex-1">
                <div className={`text-[13.5px] font-medium ${h.done ? "line-through text-foreground/45" : ""}`}>{h.name}</div>
                <div className="text-[10.5px] text-foreground/55 flex items-center gap-1 mt-0.5">
                  <Flame size={10} className="text-primary" /> <span className="nums">{h.streak}</span> يوم متتالي
                </div>
              </div>
              <div className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center"
                style={h.done ? { background: "var(--gradient-primary)" } : { background: "oklch(0.94 0.01 320)" }}>
                {h.done && <Check size={14} className="text-white" strokeWidth={2.5} />}
              </div>
            </button>
          ))}
        </div>

        <Link to="/habits/new" className="glass-strong w-full rounded-2xl py-3.5 flex items-center justify-center gap-2 text-primary text-sm">
          <Plus size={16} /> أضيفي عادة جديدة
        </Link>
      </div>
    </FeatureShell>
  );
}
