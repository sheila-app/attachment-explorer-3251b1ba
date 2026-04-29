import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { OptionCard, PrimaryCTA } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/cycle/log")({ component: LogPage });

function LogPage() {
  const [flow, setFlow] = useState("med");
  const [symptoms, setSymptoms] = useState<string[]>(["cramp"]);
  const flows = [{ id: "light", t: "خفيف" }, { id: "med", t: "متوسّط" }, { id: "heavy", t: "غزير" }];
  const sym = [
    { id: "cramp", t: "تشنّج" }, { id: "head", t: "صداع" }, { id: "tired", t: "إرهاق" },
    { id: "mood", t: "تقلّب مزاجي" }, { id: "bloat", t: "انتفاخ" }, { id: "back", t: "ألم ظهر" },
  ];
  const toggle = (id: string) => setSymptoms(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <FeatureShell title="تسجيل الدورة" back="/cycle" showNav={false} variant="warm">
      <div className="px-5 pb-6">
        <h2 className="text-sm font-medium mb-2.5">شدّة التدفّق</h2>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {flows.map(f => (
            <button key={f.id} onClick={() => setFlow(f.id)}
              className="glass rounded-xl py-3 text-sm font-medium"
              style={flow === f.id ? { boxShadow: "0 0 0 2px var(--phase-menstrual), inset 0 1px 0 0 oklch(1 0 0 / 0.6)", color: "var(--phase-menstrual-deep)" } : undefined}
            >
              <span className="relative z-10">{f.t}</span>
            </button>
          ))}
        </div>

        <h2 className="text-sm font-medium mb-2.5">الأعراض</h2>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {sym.map(s => (
            <OptionCard key={s.id} title={s.t} selected={symptoms.includes(s.id)} onClick={() => toggle(s.id)} />
          ))}
        </div>

        <h2 className="text-sm font-medium mb-2.5">ملاحظات</h2>
        <div className="glass rounded-2xl p-4">
          <textarea rows={3} placeholder="كيف تشعرين اليوم؟"
            className="relative z-10 w-full bg-transparent text-sm outline-none placeholder:text-foreground/40 resize-none" />
        </div>

        <div className="mt-6">
          <PrimaryCTA to="/cycle">حفظ التسجيل</PrimaryCTA>
        </div>
      </div>
    </FeatureShell>
  );
}
