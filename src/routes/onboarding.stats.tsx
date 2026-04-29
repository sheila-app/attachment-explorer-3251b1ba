import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/onboarding/stats")({ component: StatsPage });

function StatsPage() {
  const [h, setH] = useState(165);
  const [w, setW] = useState(62);
  const bmi = (w / Math.pow(h / 100, 2)).toFixed(1);
  return (
    <OnboardingShell
      step={6} total={12} back="/onboarding/level"
      title="إحصاءاتكِ الجسديّة"
      subtitle="تساعدنا في حساب احتياجاتكِ بدقّة."
      footer={<PrimaryCTA to="/onboarding/nutrition-goal">متابعة</PrimaryCTA>}
    >
      <div className="space-y-4">
        <SliderInput label="الطول" unit="سم" min={130} max={210} step={1} value={h} onChange={setH} />
        <SliderInput label="الوزن" unit="كجم" min={35} max={150} step={0.5} value={w} onChange={setW} />
      </div>
      <p className="text-[11px] text-center text-foreground/55 mt-6">
        مؤشّر كتلة الجسم: <span className="text-primary font-medium nums">{bmi}</span>
      </p>
    </OnboardingShell>
  );
}

function SliderInput({
  label, unit, min, max, step, value, onChange,
}: { label: string; unit: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void }) {
  const clamp = (n: number) => Math.min(max, Math.max(min, +n.toFixed(1)));
  return (
    <div className="glass rounded-2xl p-4">
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-[12px] text-foreground/65">{label}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => onChange(clamp(value - step))} className="w-7 h-7 rounded-full glass-strong text-primary text-base leading-none flex items-center justify-center">−</button>
          <input
            type="number"
            value={value}
            min={min} max={max} step={step}
            onChange={(e) => onChange(clamp(parseFloat(e.target.value) || min))}
            className="relative z-10 bg-transparent w-16 text-center font-display text-2xl text-primary outline-none nums"
          />
          <span className="text-[10px] text-foreground/55">{unit}</span>
          <button onClick={() => onChange(clamp(value + step))} className="w-7 h-7 rounded-full glass-strong text-primary text-base leading-none flex items-center justify-center">+</button>
        </div>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="relative z-10 w-full accent-primary"
        style={{ direction: "ltr" }}
      />
      <div className="relative z-10 flex justify-between text-[9px] text-foreground/45 mt-1 nums" style={{ direction: "ltr" }}>
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}
