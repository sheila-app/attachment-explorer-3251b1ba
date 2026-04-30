import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Watch, Smartphone, Activity, Check, Plus } from "lucide-react";

export const Route = createFileRoute("/profile/devices")({ component: Page });

function Page() {
  const [linked, setLinked] = useState<string[]>(["apple-watch"]);
  const devices = [
    { id: "apple-watch", name: "Apple Watch", desc: "النبض، الخطوات، النوم", icon: Watch },
    { id: "apple-health", name: "Apple Health", desc: "كل بيانات الصحّة", icon: Activity },
    { id: "google-fit", name: "Google Fit", desc: "النشاط والتمارين", icon: Smartphone },
    { id: "fitbit", name: "Fitbit", desc: "السوار الذكي", icon: Watch },
    { id: "garmin", name: "Garmin", desc: "أجهزة Garmin", icon: Watch },
  ];
  const toggle = (id: string) => setLinked(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <FeatureShell title="الأجهزة المتصلة" back="/profile/settings" showNav={false} variant="default">
      <div className="px-5 pb-8 space-y-3">
        <p className="text-[12px] text-foreground/65 leading-relaxed">اربطي أجهزتكِ لمزامنة بياناتكِ الصحيّة تلقائيّاً.</p>
        {devices.map(d => {
          const on = linked.includes(d.id);
          return (
            <button key={d.id} onClick={() => toggle(d.id)}
              className="w-full glass rounded-2xl p-4 flex items-center gap-3 text-right"
              style={on ? { boxShadow: "0 0 0 2px var(--primary)" } : undefined}>
              <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: on ? "var(--gradient-primary)" : "color-mix(in oklab, var(--primary) 12%, transparent)" }}>
                <d.icon size={18} className={on ? "text-white" : "text-primary"} strokeWidth={1.75} />
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <div className="text-[13px] font-medium">{d.name}</div>
                <div className="text-[11px] text-foreground/60 truncate">{d.desc}</div>
              </div>
              <div className="relative z-10 text-[11px] font-medium" style={{ color: on ? "var(--primary)" : "var(--foreground)" }}>
                {on ? <span className="flex items-center gap-1"><Check size={12} />متصل</span> : <span className="flex items-center gap-1"><Plus size={12} />ربط</span>}
              </div>
            </button>
          );
        })}
        <PrimaryCTA to="/profile/settings">حفظ</PrimaryCTA>
      </div>
    </FeatureShell>
  );
}
