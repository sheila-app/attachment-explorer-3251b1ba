import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA, GhostCTA } from "@/components/sheila/OnboardingShell";
import { Bell, HeartPulse, MapPin, Check } from "lucide-react";

export const Route = createFileRoute("/onboarding/permissions")({ component: Page });

const perms = [
  { id: "notif", icon: Bell, title: "الإشعارات", hint: "تذكيرات بالتمرين والدورة" },
  { id: "health", icon: HeartPulse, title: "بيانات الصحّة", hint: "مزامنة مع تطبيق الصحّة" },
  { id: "loc", icon: MapPin, title: "الموقع", hint: "اقتراح أندية قريبة" },
];

function Page() {
  const [granted, setGranted] = useState<string[]>(["notif", "health"]);
  const toggle = (id: string) => setGranted(g => g.includes(id) ? g.filter(x => x !== id) : [...g, id]);
  return (
    <OnboardingShell
      step={11} total={12} back="/onboarding/types"
      title="أذونات سريعة"
      subtitle="نحتاج هذه الأذونات لتجربة كاملة — يمكنكِ تغييرها لاحقاً."
      footer={
        <div className="space-y-2">
          <PrimaryCTA to="/onboarding/cycle-data">متابعة</PrimaryCTA>
          <GhostCTA to="/onboarding/cycle-data">تخطّي</GhostCTA>
        </div>
      }
    >
      <div className="space-y-2.5 stagger">
        {perms.map(p => {
          const on = granted.includes(p.id);
          return (
            <button key={p.id} onClick={() => toggle(p.id)} className="glass w-full rounded-2xl p-4 flex items-center gap-3 text-right">
              <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.25), oklch(0.46 0.135 328 / 0.12))" }}>
                <p.icon size={17} className="text-primary" strokeWidth={1.75} />
              </div>
              <div className="relative z-10 flex-1">
                <div className="text-[13.5px] font-medium">{p.title}</div>
                <div className="text-[11px] text-foreground/60 mt-0.5">{p.hint}</div>
              </div>
              <div className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center"
                style={on ? { background: "var(--gradient-primary)" } : { background: "oklch(0.94 0.01 320)" }}>
                {on && <Check size={14} className="text-white" strokeWidth={2.5} />}
              </div>
            </button>
          );
        })}
      </div>
    </OnboardingShell>
  );
}
