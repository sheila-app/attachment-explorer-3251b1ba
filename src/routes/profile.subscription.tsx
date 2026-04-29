import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, GhostCTA } from "@/components/sheila/OnboardingShell";
import { Sparkles, Check, CreditCard, Calendar } from "lucide-react";

export const Route = createFileRoute("/profile/subscription")({ component: Sub });

function Sub() {
  return (
    <FeatureShell title="الاشتراك" back="/profile" showNav={false} variant="energetic">
      <div className="px-5 pb-8 space-y-4">
        <div className="glass-strong rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-30" style={{ background: "var(--gradient-primary)", filter: "blur(40px)" }} />
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-primary" strokeWidth={1.75} />
              <span className="text-[11px] tracking-[0.2em] uppercase text-primary">الخطّة الحاليّة</span>
            </div>
            <div className="font-display text-2xl mt-2">شيلا برو — سنوي</div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-display text-3xl text-primary nums">29.99</span>
              <span className="text-[12px] text-foreground/60">SAR / شهر</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-foreground/65">
              <Calendar size={13} strokeWidth={1.75} />
              <span>التجديد التالي: <span className="nums">15 مايو 2026</span></span>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h3 className="relative z-10 text-sm font-medium mb-3">المزايا المضمّنة</h3>
          <ul className="relative z-10 space-y-2">
            {["وصول كامل لمكتبة التمارين", "خطط تغذية مخصّصة", "تتبّع متقدّم للدورة", "جلسات مباشرة أسبوعيّة", "استشارات خبيرات"].map(b => (
              <li key={b} className="flex items-center gap-2 text-[12.5px]">
                <Check size={14} className="text-primary shrink-0" strokeWidth={2.25} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <div className="relative z-10 w-10 h-10 rounded-xl glass-strong flex items-center justify-center">
            <CreditCard size={16} className="text-primary" strokeWidth={1.75} />
          </div>
          <div className="relative z-10 flex-1">
            <div className="text-[12.5px] font-medium">بطاقة فيزا</div>
            <div className="text-[11px] text-foreground/60 nums">•••• 4827</div>
          </div>
          <button className="relative z-10 text-[11.5px] text-primary font-medium">تغيير</button>
        </div>

        <div className="space-y-2 pt-2">
          <PrimaryCTA to="/profile">ترقية الخطّة</PrimaryCTA>
          <GhostCTA to="/profile">إلغاء الاشتراك</GhostCTA>
        </div>
      </div>
    </FeatureShell>
  );
}
