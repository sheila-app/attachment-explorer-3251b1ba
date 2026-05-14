import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA, GhostCTA } from "@/components/sheila/OnboardingShell";
import { IOSWheel, wheelRange } from "@/components/sheila/IOSWheel";

export const Route = createFileRoute("/onboarding/stats")({ component: StatsPage });

function StatsPage() {
  const [h, setH] = useState<number>(165);
  const [w, setW] = useState<number>(62);
  const bmi = (w / Math.pow(h / 100, 2)).toFixed(1);

  return (
    <OnboardingShell
      step={6} total={12} back="/onboarding/level"
      title="إحصاءاتكِ الجسديّة"
      subtitle="اسحبي العجلة لاختيار القيمة بدقّة."
      footer={<PrimaryCTA to="/onboarding/nutrition-goal">متابعة</PrimaryCTA>}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-2xl p-4">
          <div className="relative z-10 text-[11px] tracking-[0.18em] text-foreground/55 uppercase mb-2 text-center">الطول (سم)</div>
          <div className="relative z-10 flex justify-center" style={{ direction: "ltr" }}>
            <IOSWheel values={wheelRange(130, 210)} value={h} onChange={(v) => setH(Number(v))} width={86} />
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="relative z-10 text-[11px] tracking-[0.18em] text-foreground/55 uppercase mb-2 text-center">الوزن (كجم)</div>
          <div className="relative z-10 flex justify-center" style={{ direction: "ltr" }}>
            <IOSWheel values={wheelRange(35, 150)} value={w} onChange={(v) => setW(Number(v))} width={86} />
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-4 mt-4 text-center">
        <div className="relative z-10 text-[10px] tracking-[0.2em] text-foreground/55 uppercase">مؤشّر كتلة الجسم</div>
        <div className="relative z-10 font-display text-3xl text-primary nums mt-1">{bmi}</div>
      </div>
    </OnboardingShell>
  );
}
