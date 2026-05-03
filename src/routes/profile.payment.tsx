import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";
import { CreditCard, Lock, Apple } from "lucide-react";

export const Route = createFileRoute("/profile/payment")({ component: Page });

function Page() {
  const [method, setMethod] = useState("card");
  return (
    <FeatureShell title="الدفع" back="/profile/subscription" showNav={false} variant="default">
      <div className="px-5 pb-8 space-y-5">
        <div className="glass-strong rounded-3xl p-5">
          <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-1">المجموع المستحقّ</div>
          <div className="font-display text-3xl text-primary nums">٩.٩٩ د.إ <span className="text-sm text-foreground/55">/ شهرياً</span></div>
          <p className="text-[11px] text-foreground/55 mt-2">يجدّد تلقائيّاً. يمكنكِ الإلغاء في أيّ وقت.</p>
        </div>

        <div>
          <h2 className="text-sm font-medium mb-2">طريقة الدفع</h2>
          <div className="space-y-2">
            <OptionCard title="بطاقة ائتمان / مدى" hint="فيزا، ماستر، مدى" selected={method === "card"} onClick={() => setMethod("card")} leading={<CreditCard size={18} className="text-primary" />} />
            <OptionCard title="Apple Pay" selected={method === "apple"} onClick={() => setMethod("apple")} leading={<Apple size={18} className="text-primary" />} />
            <OptionCard title="STC Pay" selected={method === "stc"} onClick={() => setMethod("stc")} />
          </div>
        </div>

        {method === "card" && (
          <div className="glass rounded-2xl p-4 space-y-3">
            <Field label="رقم البطاقة" placeholder="0000 0000 0000 0000" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="تاريخ الانتهاء" placeholder="MM/YY" />
              <Field label="CVC" placeholder="123" />
            </div>
            <Field label="الاسم على البطاقة" placeholder="Noura A." />
          </div>
        )}

        <div className="flex items-center gap-2 text-[11px] text-foreground/55">
          <Lock size={11} /> دفعكِ آمن ومشفّر بطبقة SSL.
        </div>

        <PrimaryCTA to="/profile/subscription">تأكيد الدفع</PrimaryCTA>
      </div>
    </FeatureShell>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase mb-1">{label}</div>
      <input placeholder={placeholder}
        className="relative z-10 w-full bg-transparent text-[13px] outline-none border-b border-foreground/10 pb-1.5 placeholder:text-foreground/35 nums" />
    </div>
  );
}
