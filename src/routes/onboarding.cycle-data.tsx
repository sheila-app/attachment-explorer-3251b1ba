import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA, GhostCTA } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/onboarding/cycle-data")({ component: Page });

function Page() {
  const [days, setDays] = useState(12);
  const [length, setLength] = useState(28);
  return (
    <OnboardingShell
      step={12} total={12} back="/onboarding/types"
      title="آخر دورة شهرية"
      subtitle="نحتاج لبدء التتبّع وتخصيص توصياتنا."
      footer={
        <div className="space-y-2">
          <PrimaryCTA to="/onboarding/trial">متابعة</PrimaryCTA>
          <GhostCTA to="/onboarding/trial">لا أتذكّر — استخدمي تقدير افتراضي</GhostCTA>
        </div>
      }
    >
      <div className="glass rounded-2xl p-5 mb-3">
        <div className="relative z-10 text-[11px] tracking-[0.2em] text-foreground/55 uppercase">منذ كم يوم بدأت آخر دورة؟</div>
        <div className="relative z-10 mt-3 flex items-center justify-center gap-4">
          <button onClick={() => setDays(Math.max(0, days - 1))} className="w-9 h-9 rounded-full glass-strong text-primary text-lg leading-none flex items-center justify-center">−</button>
          <div className="text-center">
            <div className="font-display text-5xl text-primary nums">{days}</div>
            <div className="text-[11px] text-foreground/60 mt-1">يوم</div>
          </div>
          <button onClick={() => setDays(days + 1)} className="w-9 h-9 rounded-full glass-strong text-primary text-lg leading-none flex items-center justify-center">+</button>
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <div className="relative z-10 text-[11px] tracking-[0.2em] text-foreground/55 uppercase">معدّل طول الدورة</div>
        <div className="relative z-10 mt-3 flex items-center justify-center gap-4">
          <button onClick={() => setLength(Math.max(21, length - 1))} className="w-9 h-9 rounded-full glass-strong text-primary text-lg leading-none flex items-center justify-center">−</button>
          <div className="text-center">
            <div className="font-display text-5xl text-primary nums">{length}</div>
            <div className="text-[11px] text-foreground/60 mt-1">يوم</div>
          </div>
          <button onClick={() => setLength(Math.min(45, length + 1))} className="w-9 h-9 rounded-full glass-strong text-primary text-lg leading-none flex items-center justify-center">+</button>
        </div>
        <p className="relative z-10 text-[11px] text-foreground/55 mt-3 text-center">الافتراضي: 28 يوم • النطاق 21–45</p>
      </div>
    </OnboardingShell>
  );
}
