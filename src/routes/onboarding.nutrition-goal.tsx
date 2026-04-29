import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/onboarding/nutrition-goal")({ component: Page });

function Page() {
  const [sel, setSel] = useState("maintain");
  const opts = [
    { id: "lose", title: "خسارة الوزن" },
    { id: "maintain", title: "الحفاظ على الوزن" },
    { id: "gain", title: "زيادة الوزن" },
  ];
  return (
    <OnboardingShell
      step={7} total={12} back="/onboarding/stats"
      title="ما هدفكِ التغذوي؟"
      footer={<PrimaryCTA to="/onboarding/activity">متابعة</PrimaryCTA>}
    >
      <div className="space-y-2.5 stagger">
        {opts.map((o) => <OptionCard key={o.id} selected={sel === o.id} onClick={() => setSel(o.id)} title={o.title} />)}
      </div>
    </OnboardingShell>
  );
}
