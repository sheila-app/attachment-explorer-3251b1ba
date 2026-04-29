import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/onboarding/types")({ component: Page });

function Page() {
  const [sel, setSel] = useState<string[]>(["yoga", "hiit"]);
  const toggle = (id: string) => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const opts = [
    { id: "strength", t: "قوّة", emoji: "🏋️‍♀️" },
    { id: "hiit", t: "HIIT", emoji: "🔥" },
    { id: "pilates", t: "بيلاتس", emoji: "🤸‍♀️" },
    { id: "yoga", t: "يوغا", emoji: "🧘‍♀️" },
    { id: "cardio", t: "كارديو", emoji: "🏃‍♀️" },
    { id: "func", t: "وظيفي", emoji: "⚡" },
  ];
  return (
    <OnboardingShell
      step={11} total={12} back="/onboarding/frequency"
      title="أيّ أنواع تمارين تستمتعين بها؟"
      subtitle="اختاري واحداً على الأقل."
      footer={<PrimaryCTA to="/onboarding/cycle-data">متابعة</PrimaryCTA>}
    >
      <div className="grid grid-cols-2 gap-2.5">
        {opts.map(o => (
          <button key={o.id} onClick={() => toggle(o.id)}
            className="glass rounded-2xl py-5 flex flex-col items-center gap-2"
            style={sel.includes(o.id) ? { boxShadow: "0 0 0 2px var(--primary), inset 0 1px 0 0 oklch(1 0 0 / 0.6)" } : undefined}
          >
            <span className="relative z-10 text-3xl">{o.emoji}</span>
            <span className="relative z-10 text-sm font-medium">{o.t}</span>
          </button>
        ))}
      </div>
    </OnboardingShell>
  );
}
