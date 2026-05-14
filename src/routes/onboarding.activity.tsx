import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Info, Footprints, Wind, Dumbbell, Link2, Zap, Bell, Building2, Ribbon, type LucideIcon } from "lucide-react";

export const Route = createFileRoute("/onboarding/activity")({ component: Page });

const EQUIPMENT: { id: string; Icon: LucideIcon; title: string; exclusive?: boolean }[] = [
  { id: "none", Icon: Footprints, title: "بدون أدوات", exclusive: true },
  { id: "mat", Icon: Wind, title: "سجّادة يوغا" },
  { id: "dumbbells", Icon: Dumbbell, title: "دمبل" },
  { id: "jump", Icon: Link2, title: "حبل القفز" },
  { id: "bar", Icon: Zap, title: "بار الشدّ" },
  { id: "kettlebell", Icon: Bell, title: "كيتل بيل" },
  { id: "gym", Icon: Building2, title: "أجهزة الجيم" },
  { id: "band", Icon: Ribbon, title: "شريط المقاومة" },
];

function Page() {
  const [sel, setSel] = useState<string[]>(["none"]);

  function toggle(id: string) {
    if (id === "none") {
      setSel(["none"]);
      return;
    }
    setSel((prev) => {
      const without = prev.filter((x) => x !== "none");
      if (without.includes(id)) return without.filter((x) => x !== id) || ["none"];
      const next = [...without, id];
      return next.length === 0 ? ["none"] : next;
    });
  }

  const hasEquipment = !sel.includes("none") || sel.length > 1;

  return (
    <OnboardingShell
      step={8}
      total={12}
      back="/onboarding/nutrition-goal"
      title="ما المعدّات المتاحة لديكِ؟"
      subtitle="اختاري كل ما ينطبق — سنبني خطّتكِ على هذا الأساس."
      footer={<PrimaryCTA to="/onboarding/diet">متابعة</PrimaryCTA>}
    >
      <div>
        {/* chip grid */}
        <div className="grid grid-cols-2 gap-2.5 stagger">
          {EQUIPMENT.map((eq) => {
            const active = sel.includes(eq.id);
            return (
              <button
                key={eq.id}
                onClick={() => toggle(eq.id)}
                className="text-right transition-all active:scale-[0.97]"
              >
                <div
                  className="rounded-2xl p-4 flex items-center gap-3 relative overflow-hidden"
                  style={
                    active
                      ? {
                          background:
                            "linear-gradient(135deg, oklch(0.46 0.135 328 / 0.18), oklch(0.66 0.16 322 / 0.12))",
                          boxShadow:
                            "inset 0 0 0 1.5px var(--primary), 0 4px 14px -6px oklch(0.46 0.135 328 / 0.35)",
                        }
                      : {
                          background: "oklch(1 0 0 / 0.55)",
                          backdropFilter: "blur(12px)",
                          boxShadow:
                            "inset 0 1px 0 0 oklch(1 0 0 / 0.6), inset 0 0 0 1px oklch(0 0 0 / 0.06)",
                        }
                  }
                >
                  <eq.Icon size={22} strokeWidth={1.75} className="relative z-10 shrink-0 text-primary" />
                  <span
                    className="relative z-10 text-[13px] font-medium leading-tight"
                    style={active ? { color: "var(--primary)" } : undefined}
                  >
                    {eq.title}
                  </span>
                  {active && (
                    <div
                      className="absolute top-2 end-2 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: "var(--primary)", boxShadow: "0 0 0 2px oklch(1 0 0 / 0.95), 0 0 0 3px var(--primary)" }}
                    >
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* selection summary */}
        <div className="mt-4 flex items-center gap-2 px-1">
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: hasEquipment ? "var(--phase-follicular)" : "var(--muted-foreground)" }}
          />
          <p className="text-[12px] text-foreground/65">
            {sel.includes("none")
              ? "تمارين بدون أيّ معدّات — مثاليّة للبيت والسفر"
              : `${sel.length} معدّة مختارة — سنصمّم تمارين متنوّعة لكِ`}
          </p>
        </div>

        {/* info note */}
        <div className="mt-4 glass rounded-2xl p-3.5 flex items-start gap-2.5">
          <Info size={13} className="text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
          <p className="text-[11.5px] text-foreground/65 leading-relaxed">
            سنعتمد على هذه المعدّات في بناء خطّتكِ. يمكنكِ تعديل هذه القائمة لاحقاً من الإعدادات.
          </p>
        </div>
      </div>
    </OnboardingShell>
  );
}
