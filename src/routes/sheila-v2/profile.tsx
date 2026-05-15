import { createFileRoute, Link } from "@tanstack/react-router";
import { Palette, CreditCard, Bell, AlertCircle, ChevronLeft, Globe, LifeBuoy, Edit3 } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { useLifeStage } from "@/components/sheila-v2/LifeStageContext";
import { LIFE_STAGES, userV2 } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/profile")({ component: Profile });

function Profile() {
  const { stage, setStage } = useLifeStage();
  const items = [
    { to: "/sheila-v2/profile/appearance", icon: Palette, label: "المظهر" },
    { to: "/sheila-v2/profile/subscription", icon: CreditCard, label: "الاشتراك" },
    { to: "/sheila-v2/notifications", icon: Bell, label: "الإشعارات" },
    { to: "/sheila-v2/emergency", icon: AlertCircle, label: "موارد طارئة" },
  ];
  return (
    <ShellV2 title="حسابي">
      <div className="px-5">
        <div className="rounded-3xl p-5 glass-strong text-center">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white font-display text-[28px]" style={{ background: "var(--gradient-primary)" }}>{userV2.name[0]}</div>
          <div className="relative z-10 font-display text-[20px] mt-3">{userV2.name}</div>
          <button className="relative z-10 inline-flex items-center gap-1 text-[11px] text-primary mt-1"><Edit3 size={11} /> عدّلي بياناتك</button>
        </div>

        <h2 className="text-[12px] font-semibold mt-5 mb-2.5">مرحلة الحياة (تجريب التاب الثاني)</h2>
        <div className="rounded-2xl bg-white/85 border border-border divide-y divide-border">
          {LIFE_STAGES.map(s => (
            <button key={s.id} onClick={() => setStage(s.id)} className="w-full flex items-center gap-3 px-4 py-3 text-right">
              <span className={`w-4 h-4 rounded-full border-2 ${stage === s.id ? "border-primary bg-primary" : "border-foreground/25"}`} />
              <span className="flex-1 text-[12.5px]">{s.label}</span>
              <span className="text-[10.5px] text-foreground/55">{s.tabLabel}</span>
            </button>
          ))}
        </div>

        <h2 className="text-[12px] font-semibold mt-5 mb-2.5">الإعدادات</h2>
        <div className="rounded-2xl bg-white/85 border border-border divide-y divide-border">
          {items.map(it => (
            <Link key={it.to} to={it.to as "/"} className="flex items-center gap-3 px-4 py-3.5">
              <it.icon size={16} className="text-foreground/65" />
              <span className="flex-1 text-[13px]">{it.label}</span>
              <ChevronLeft size={14} className="text-foreground/35" />
            </Link>
          ))}
        </div>
      </div>
    </ShellV2>
  );
}
