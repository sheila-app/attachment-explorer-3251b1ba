import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Angry, Zap, Moon, Wind, Sparkles, Activity, Heart, Frown, Apple } from "lucide-react";

export const Route = createFileRoute("/journey/symptoms")({ component: Page });

const SYMPTOMS = [
  { id: "cramp", name: "تشنّج", Icon: Angry },
  { id: "headache", name: "صداع", Icon: Zap },
  { id: "fatigue", name: "إرهاق", Icon: Moon },
  { id: "bloat", name: "انتفاخ", Icon: Wind },
  { id: "acne", name: "حبوب", Icon: Sparkles },
  { id: "back", name: "ألم الظهر", Icon: Activity },
  { id: "breast", name: "حساسية الصدر", Icon: Heart },
  { id: "nausea", name: "غثيان", Icon: Frown },
  { id: "crave", name: "رغبة طعام", Icon: Apple },
];

function Page() {
  const [sel, setSel] = useState<string[]>(["cramp", "fatigue"]);
  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  return (
    <FeatureShell title="تسجيل الأعراض" back="/journey" variant="warm">
      <div className="px-5 pb-8">
        <p className="text-[12.5px] text-foreground/65 mb-4 leading-relaxed">اختاري الأعراض التي تشعرين بها اليوم — سنستخدمها لتخصيص توصياتكِ.</p>
        <div className="grid grid-cols-3 gap-2.5 stagger">
          {SYMPTOMS.map((s) => {
            const on = sel.includes(s.id);
            return (
              <button key={s.id} onClick={() => toggle(s.id)}
                className={`glass rounded-2xl p-3.5 flex flex-col items-center gap-1.5 transition-all ${on ? "ring-2 ring-primary/40" : ""}`}
                style={on ? { background: "color-mix(in oklab, var(--primary) 10%, transparent)" } : undefined}>
                <s.Icon size={22} strokeWidth={1.75} className="relative z-10 text-primary" />
                <span className="relative z-10 text-[11.5px] font-medium">{s.name}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-6"><PrimaryCTA to="/journey">حفظ السجل</PrimaryCTA></div>
      </div>
    </FeatureShell>
  );
}
