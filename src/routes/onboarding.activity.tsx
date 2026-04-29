import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/onboarding/activity")({ component: Page });

function Page() {
  const [sel, setSel] = useState("light");
  const opts = [
    { id: "sed", title: "خاملة", hint: "عمل مكتبي، حركة قليلة" },
    { id: "light", title: "نشاط خفيف", hint: "تمرين 1–3 أيّام أسبوعياً" },
    { id: "mod", title: "نشاط متوسّط", hint: "تمرين 3–5 أيّام أسبوعياً" },
    { id: "high", title: "نشاط عالٍ", hint: "تمرين مكثّف 6–7 أيّام" },
  ];
  return (
    <OnboardingShell
      step={8} total={12} back="/onboarding/nutrition-goal"
      title="ما مستوى نشاطكِ اليومي؟"
      footer={<PrimaryCTA to="/onboarding/diet">متابعة</PrimaryCTA>}
    >
      <div className="space-y-2.5 stagger">
        {opts.map((o) => <OptionCard key={o.id} selected={sel === o.id} onClick={() => setSel(o.id)} title={o.title} hint={o.hint} />)}
      </div>
    </OnboardingShell>
  );
}
