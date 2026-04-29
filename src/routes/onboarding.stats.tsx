import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/onboarding/stats")({ component: StatsPage });

function StatsPage() {
  const [h, setH] = useState(165);
  const [w, setW] = useState(62);
  return (
    <OnboardingShell
      step={6} total={12} back="/onboarding/level"
      title="إحصاءاتكِ الجسديّة"
      subtitle="تساعدنا في حساب احتياجاتكِ بدقّة."
      footer={<PrimaryCTA to="/onboarding/nutrition-goal">متابعة</PrimaryCTA>}
    >
      <div className="space-y-3">
        <Stepper label="الطول (سم)" value={h} onChange={setH} step={1} />
        <Stepper label="الوزن (كجم)" value={w} onChange={setW} step={0.5} />
      </div>
      <p className="text-[11px] text-center text-foreground/55 mt-5">
        مؤشّر كتلة الجسم: <span className="text-primary font-medium nums">22.8</span>
      </p>
    </OnboardingShell>
  );
}

function Stepper({ label, value, onChange, step }: { label: string; value: number; onChange: (v: number) => void; step: number }) {
  return (
    <div className="glass rounded-2xl px-4 py-4 flex items-center justify-between">
      <span className="relative z-10 text-sm text-foreground/75">{label}</span>
      <div className="relative z-10 flex items-center gap-3">
        <button onClick={() => onChange(+(value - step).toFixed(1))} className="w-8 h-8 rounded-full glass-strong flex items-center justify-center text-primary text-lg leading-none">−</button>
        <span className="font-display text-2xl text-primary nums w-16 text-center">{value}</span>
        <button onClick={() => onChange(+(value + step).toFixed(1))} className="w-8 h-8 rounded-full glass-strong flex items-center justify-center text-primary text-lg leading-none">+</button>
      </div>
    </div>
  );
}
