import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { TrendingDown, TrendingUp, Scale, Check, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/onboarding/nutrition-goal")({ component: Page });

const GOALS = [
  {
    id: "lose",
    icon: TrendingDown,
    title: "خسارة الوزن",
    desc: "عجز سعري تدريجي لحرق الدهون مع الحفاظ على الكتلة العضليّة.",
    calLabel: "−٥٠٠ سعرة / يوم",
    calColor: "var(--phase-menstrual)",
    macros: { protein: 35, carbs: 35, fat: 30 },
    hint: "مناسب لمن تريد فقدان ٠.٥–١ كغ أسبوعياً بشكل آمن.",
  },
  {
    id: "maintain",
    icon: Scale,
    title: "الحفاظ على الوزن",
    desc: "توازن دقيق بين السعرات الداخلة والمحروقة — للحفاظ على وزنكِ الصحّي الحالي.",
    calLabel: "±٠ سعرة / يوم",
    calColor: "var(--phase-follicular)",
    macros: { protein: 25, carbs: 50, fat: 25 },
    hint: "الخيار الأمثل لمن وصلت لوزنها المثالي وتريد الاستمرار.",
  },
  {
    id: "gain",
    icon: TrendingUp,
    title: "زيادة الكتلة العضليّة",
    desc: "فائض سعري مدروس لدعم بناء العضلات وتحسين القوّة البدنيّة.",
    calLabel: "+٣٠٠ سعرة / يوم",
    calColor: "var(--phase-ovulation)",
    macros: { protein: 30, carbs: 50, fat: 20 },
    hint: "مناسب لمن تمارس تمارين القوّة وتريد بناء جسم أقوى.",
  },
];

function MacroBar({ protein, carbs, fat }: { protein: number; carbs: number; fat: number }) {
  return (
    <div className="mt-3">
      <div className="flex rounded-full overflow-hidden h-2">
        <div style={{ width: `${protein}%`, background: "var(--phase-menstrual)" }} />
        <div style={{ width: `${carbs}%`, background: "var(--phase-follicular)" }} />
        <div style={{ width: `${fat}%`, background: "var(--phase-ovulation)" }} />
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] text-foreground/55">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--phase-menstrual)" }} />
          بروتين {protein}٪
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--phase-follicular)" }} />
          كربوهيدرات {carbs}٪
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--phase-ovulation)" }} />
          دهون {fat}٪
        </span>
      </div>
    </div>
  );
}

function Page() {
  const [sel, setSel] = useState("maintain");

  return (
    <OnboardingShell
      step={7}
      total={12}
      back="/onboarding/stats"
      title="ما هدفكِ التغذوي؟"
      subtitle="سنبني خطّتكِ الغذائيّة بناءً على هذا الاختيار."
      footer={<PrimaryCTA to="/onboarding/activity">متابعة</PrimaryCTA>}
    >
      <div className="space-y-3 stagger">
        {GOALS.map((g) => {
          const active = sel === g.id;
          const Icon = g.icon;
          return (
            <button
              key={g.id}
              onClick={() => setSel(g.id)}
              className="w-full text-right transition-all active:scale-[0.99]"
            >
              <div
                className="glass rounded-2xl p-4 relative overflow-hidden"
                style={
                  active
                    ? {
                        boxShadow: `inset 0 0 0 2px ${g.calColor}, 0 8px 20px -8px ${g.calColor}44`,
                        background: `color-mix(in oklab, ${g.calColor} 7%, oklch(1 0 0 / 0.7))`,
                      }
                    : undefined
                }
              >
                {active && (
                  <div
                    className="absolute -top-6 -start-6 w-28 h-28 rounded-full opacity-20 pointer-events-none"
                    style={{ background: g.calColor, filter: "blur(35px)" }}
                  />
                )}

                {/* header row */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `color-mix(in oklab, ${g.calColor} 20%, transparent)`,
                      }}
                    >
                      <Icon size={18} style={{ color: g.calColor }} strokeWidth={2} />
                    </div>
                    <h3 className="font-display text-[17px]">{g.title}</h3>
                  </div>
                  {active && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: g.calColor }}
                    >
                      <Check size={13} className="text-white" strokeWidth={2.5} />
                    </div>
                  )}
                </div>

                {/* calorie badge */}
                <div className="relative z-10 mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-medium"
                  style={{
                    background: `color-mix(in oklab, ${g.calColor} 18%, transparent)`,
                    color: g.calColor,
                  }}>
                  {g.calLabel}
                </div>

                {/* description */}
                <p className="relative z-10 text-[12.5px] text-foreground/70 mt-2 leading-relaxed">
                  {g.desc}
                </p>

                {/* expanded: macro bar (always visible) */}
                <div className="relative z-10">
                  <MacroBar {...g.macros} />
                </div>

                {/* hint note when selected */}
                {active && (
                  <div className="relative z-10 mt-3 pt-3 border-t border-border/60">
                    <p className="text-[11.5px] text-foreground/60 leading-relaxed">
                      <Lightbulb size={13} strokeWidth={1.75} className="inline me-1 text-primary" />{g.hint}
                    </p>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </OnboardingShell>
  );
}
