import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";
import { Building2, Home, Shuffle } from "lucide-react";

export const Route = createFileRoute("/onboarding/location-pref")({ component: LocPrefPage });

function LocPrefPage() {
  const [sel, setSel] = useState("home");
  const opts = [
    { id: "gym", title: "في النادي", icon: Building2 },
    { id: "home", title: "في البيت", icon: Home },
    { id: "both", title: "كلاهما (هجين)", icon: Shuffle },
  ];
  return (
    <OnboardingShell
      step={4} total={12} back="/onboarding/goal"
      title="أين تفضّلين التمرين؟"
      footer={<PrimaryCTA to="/onboarding/level">متابعة</PrimaryCTA>}
    >
      <div className="space-y-2.5 stagger">
        {opts.map((o) => (
          <OptionCard key={o.id} selected={sel === o.id} onClick={() => setSel(o.id)} title={o.title}
            leading={
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.25), oklch(0.46 0.135 328 / 0.12))" }}>
                <o.icon size={17} className="text-primary" strokeWidth={1.75} />
              </div>
            }
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
