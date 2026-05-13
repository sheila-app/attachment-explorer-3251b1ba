import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { SYMPTOM_LIST } from "@/data/symptoms";

export const Route = createFileRoute("/journey/symptoms")({ component: Page });

function Page() {
  const [sel, setSel] = useState<string[]>(["cramps", "fatigue"]);
  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  return (
    <FeatureShell title="تسجيل الأعراض" back="/journey" variant="warm">
      <div className="px-5 pb-8">
        <p className="text-[12.5px] text-foreground/65 mb-4 leading-relaxed">اختاري الأعراض التي تشعرين بها اليوم — سنستخدمها لتخصيص توصياتكِ.</p>
        <div className="grid grid-cols-4 gap-2 stagger">
          {SYMPTOM_LIST.map((s) => {
            const on = sel.includes(s.id);
            const tone = "var(--phase-menstrual)";
            return (
              <button key={s.id} onClick={() => toggle(s.id)}
                className="rounded-2xl py-2.5 px-1 flex flex-col items-center gap-1 transition"
                style={on
                  ? { background: `color-mix(in oklab, ${tone} 18%, transparent)`, boxShadow: `inset 0 0 0 1.5px ${tone}` }
                  : { background: "color-mix(in oklab, var(--foreground) 4%, transparent)" }}>
                <img src={s.img} alt={s.name} className="w-9 h-9 object-contain" style={{ opacity: on ? 1 : 0.75 }} />
                <span className="text-[10.5px] font-medium leading-tight text-center" style={{ color: on ? tone : "var(--foreground)" }}>{s.name}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-6"><PrimaryCTA to="/journey">حفظ السجل</PrimaryCTA></div>
      </div>
    </FeatureShell>
  );
}
