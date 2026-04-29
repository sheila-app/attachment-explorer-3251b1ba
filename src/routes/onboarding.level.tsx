import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/onboarding/level")({ component: LevelPage });

function LevelPage() {
  const [sel, setSel] = useState("inter");
  const opts = [
    { id: "begin", title: "مبتدئة", hint: "بدأتُ رحلتي للتوّ" },
    { id: "inter", title: "متوسّطة", hint: "أكثر من 6 أشهر تمرين" },
    { id: "adv", title: "متقدّمة", hint: "أكثر من سنتين تمرين" },
  ];
  return (
    <OnboardingShell
      step={5} total={12} back="/onboarding/location-pref"
      title="كيف تصفين مستواكِ الحالي؟"
      footer={<PrimaryCTA to="/onboarding/stats">متابعة</PrimaryCTA>}
    >
      <div className="space-y-2.5 stagger">
        {opts.map((o) => (
          <OptionCard key={o.id} selected={sel === o.id} onClick={() => setSel(o.id)} title={o.title} hint={o.hint} />
        ))}
      </div>
    </OnboardingShell>
  );
}
