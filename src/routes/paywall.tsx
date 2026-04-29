import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, GhostCTA } from "@/components/sheila/OnboardingShell";
import { Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/paywall")({ component: Page });

const plans = [
  { id: "year", title: "سنوي", price: "29.99", per: "شهر", note: "وفّري 40%", highlight: true },
  { id: "month", title: "شهري", price: "49.99", per: "شهر", note: "" },
];

const features = [
  "وصول كامل لمكتبة التمارين",
  "خطط تغذية مخصّصة بالـ AI",
  "تتبّع متقدّم للدورة والمزاج",
  "جلسات مباشرة أسبوعيّة",
  "محادثة مع خبيرات الصحّة",
];

function Page() {
  const [sel, setSel] = useState("year");
  return (
    <FeatureShell title="شيلا برو" back="/profile/subscription" showNav={false} variant="energetic">
      <div className="px-5 pb-8 space-y-5">
        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-[10px] tracking-[0.18em] uppercase text-primary">
            <Sparkles size={11} /> العضويّة المميّزة
          </div>
          <h2 className="font-display text-[24px] mt-3 leading-tight">افتحي إمكانياتكِ كاملة</h2>
          <p className="text-[12.5px] text-foreground/65 mt-2">جرّبي 7 أيام مجّاناً، ألغي في أيّ وقت.</p>
        </div>

        <div className="glass-strong rounded-2xl p-4 space-y-2">
          {features.map(f => (
            <div key={f} className="relative z-10 flex items-center gap-2 text-[12.5px]">
              <Check size={14} className="text-primary shrink-0" strokeWidth={2.5} />
              <span>{f}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {plans.map(p => (
            <button key={p.id} onClick={() => setSel(p.id)}
              className="glass w-full rounded-2xl p-4 flex items-center justify-between text-right"
              style={sel === p.id ? { boxShadow: "0 0 0 2px var(--primary), inset 0 1px 0 0 oklch(1 0 0 / 0.6)" } : undefined}>
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-medium">{p.title}</span>
                  {p.highlight && <span className="rounded-full px-2 py-0.5 text-[9px] font-medium text-white" style={{ background: "var(--gradient-primary)" }}>الأكثر اختياراً</span>}
                </div>
                {p.note && <div className="text-[11px] text-primary mt-0.5">{p.note}</div>}
              </div>
              <div className="relative z-10 text-left">
                <div className="font-display text-xl text-primary nums">${p.price}</div>
                <div className="text-[10px] text-foreground/55">/ {p.per}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <PrimaryCTA to="/profile/payment">ابدئي التجربة المجّانيّة</PrimaryCTA>
          <GhostCTA to="/home">ربّما لاحقاً</GhostCTA>
        </div>
      </div>
    </FeatureShell>
  );
}
