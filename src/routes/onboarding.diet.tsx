import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/onboarding/diet")({ component: Page });

function Page() {
  const [sel, setSel] = useState<string[]>(["none"]);
  const toggle = (id: string) => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const opts = [
    { id: "none", title: "لا قيود" },
    { id: "veg", title: "نباتي" },
    { id: "vegan", title: "نباتي صرف" },
    { id: "gf", title: "خالٍ من الجلوتين" },
    { id: "df", title: "خالٍ من الألبان" },
  ];
  return (
    <OnboardingShell
      step={9} total={12} back="/onboarding/activity"
      title="هل لديكِ تفضيلات غذائيّة؟"
      subtitle="اختاري كل ما ينطبق."
      footer={<PrimaryCTA to="/onboarding/frequency">متابعة</PrimaryCTA>}
    >
      <div className="space-y-2.5 stagger">
        {opts.map((o) => <OptionCard key={o.id} selected={sel.includes(o.id)} onClick={() => toggle(o.id)} title={o.title} />)}
      </div>
    </OnboardingShell>
  );
}
