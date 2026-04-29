import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/onboarding/frequency")({ component: Page });

function Page() {
  const [sel, setSel] = useState(4);
  const days = [2, 3, 4, 5, 6];
  return (
    <OnboardingShell
      step={10} total={12} back="/onboarding/diet"
      title="كم يوماً تريدين التمرين أسبوعياً؟"
      footer={<PrimaryCTA to="/onboarding/types">متابعة</PrimaryCTA>}
    >
      <div className="grid grid-cols-5 gap-2.5">
        {days.map(d => (
          <button key={d} onClick={() => setSel(d)}
            className="glass aspect-square rounded-2xl flex flex-col items-center justify-center"
            style={sel === d ? { boxShadow: "0 0 0 2px var(--primary), inset 0 1px 0 0 oklch(1 0 0 / 0.6), 0 12px 28px -10px oklch(0.46 0.135 328 / 0.4)" } : undefined}
          >
            <span className="relative z-10 font-display text-3xl text-primary nums">{d}</span>
            <span className="relative z-10 text-[10px] text-foreground/60 mt-0.5">يوم</span>
          </button>
        ))}
      </div>
      <p className="text-[12px] text-center text-foreground/60 mt-6">نوصي بـ <span className="text-primary font-medium">3–5 أيّام</span> حسب مستواكِ.</p>
    </OnboardingShell>
  );
}
