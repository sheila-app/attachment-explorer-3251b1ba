import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA, GhostCTA } from "@/components/sheila/OnboardingShell";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/onboarding/trial")({ component: Page });

function Page() {
  const [plan, setPlan] = useState<"yearly" | "monthly">("yearly");
  const benefits = [
    "30 يوماً وصول كامل بدون قيود",
    "نتائج خلال 8 أسابيع",
    "برامج صمّمها خبراء معتمدون",
    "تتبّع كامل لتقدّمكِ",
  ];

  return (
    <OnboardingShell
      step={12} total={12} back="/onboarding/cycle-data"
      variant="energetic"
      title="برنامجكِ جاهز ✨"
      subtitle="جرّبي شيلا 30 يوماً مجّاناً — لا يلزم بطاقة ائتمان."
      footer={
        <div className="space-y-2">
          <PrimaryCTA to="/onboarding/complete">ابدئي التجربة المجانيّة</PrimaryCTA>
          <GhostCTA to="/onboarding/complete">لاحقاً</GhostCTA>
        </div>
      }
    >
      <ul className="space-y-2.5 mb-5">
        {benefits.map((b) => (
          <li key={b} className="glass flex items-center gap-3 px-4 py-3 rounded-xl">
            <div className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Check size={14} className="text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="relative z-10 text-[13px]">{b}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-2.5">
        <PlanCard active={plan === "yearly"} onClick={() => setPlan("yearly")}
          title="سنوي" price="29.99" unit="/شهر" total="فاتورة سنويّة 359.88" badge="الأفضل قيمة" />
        <PlanCard active={plan === "monthly"} onClick={() => setPlan("monthly")}
          title="شهري" price="49.99" unit="/شهر" total="فاتورة شهريّة" />
      </div>

      <p className="text-[11px] text-center text-foreground/60 mt-4">يمكنكِ الإلغاء في أيّ وقت • بدون بطاقة ائتمان</p>
    </OnboardingShell>
  );
}

function PlanCard({ active, onClick, title, price, unit, total, badge }: {
  active: boolean; onClick: () => void; title: string; price: string; unit: string; total: string; badge?: string;
}) {
  return (
    <button onClick={onClick}
      className="glass-strong w-full rounded-2xl p-4 flex items-center justify-between text-right"
      style={active ? { boxShadow: "0 0 0 2px var(--primary), 0 18px 40px -16px oklch(0.46 0.135 328 / 0.45), inset 0 1px 0 0 oklch(1 0 0 / 0.7)" } : undefined}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
          {badge && <span className="text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded-md text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>{badge}</span>}
        </div>
        <div className="text-[11px] text-foreground/60 mt-1">{total}</div>
      </div>
      <div className="relative z-10 flex items-baseline gap-1">
        <span className="font-display text-3xl text-primary nums">{price}</span>
        <span className="text-[11px] text-foreground/60">SAR{unit}</span>
      </div>
    </button>
  );
}
