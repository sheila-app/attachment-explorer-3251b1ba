import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Sparkles, UtensilsCrossed, Salad, Sprout, Wheat, Milk, CheckCircle, Zap, Leaf, type LucideIcon } from "lucide-react";

export const Route = createFileRoute("/onboarding/diet")({ component: Page });

const DIETS: { id: string; Icon: LucideIcon; title: string; desc: string; exclusive?: boolean }[] = [
  { id: "none", Icon: UtensilsCrossed, title: "لا قيود", desc: "أتناول كلّ شيء بتوازن", exclusive: true },
  { id: "veg", Icon: Salad, title: "نباتي", desc: "لا لحوم — الأسماك مقبولة" },
  { id: "vegan", Icon: Sprout, title: "نباتي صرف", desc: "لا منتجات حيوانيّة" },
  { id: "gf", Icon: Wheat, title: "خالٍ من الجلوتين", desc: "بدون قمح وشعير" },
  { id: "df", Icon: Milk, title: "خالٍ من اللاكتوز", desc: "بدون منتجات الألبان" },
  { id: "keto", Icon: Zap, title: "كيتو", desc: "دهون عالية، كربوهيدرات منخفضة" },
  { id: "med", Icon: Leaf, title: "بحر متوسّط", desc: "زيت زيتون، خضار، أسماك" },
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
      if (without.includes(id)) {
        const next = without.filter((x) => x !== id);
        return next.length === 0 ? ["none"] : next;
      }
      return [...without, id];
    });
  }

  const isUnrestricted = sel.includes("none");

  return (
    <OnboardingShell
      step={9}
      total={12}
      back="/onboarding/activity"
      title="هل لديكِ تفضيلات غذائيّة؟"
      subtitle="اختاري كل ما ينطبق — يمكن الجمع بين الخيارات."
      footer={<PrimaryCTA to="/onboarding/frequency">متابعة</PrimaryCTA>}
    >
      <div>
        <div className="grid grid-cols-2 gap-2.5 stagger">
          {DIETS.map((d) => {
            const active = sel.includes(d.id);
            return (
              <button
                key={d.id}
                onClick={() => toggle(d.id)}
                className="text-right transition-all active:scale-[0.97]"
              >
                <div
                  className="rounded-2xl p-3.5 h-full flex flex-col gap-2 relative overflow-hidden"
                  style={
                    active
                      ? {
                          background:
                            "linear-gradient(135deg, oklch(0.46 0.135 328 / 0.15), oklch(0.66 0.16 322 / 0.10))",
                          boxShadow:
                            "inset 0 0 0 1.5px var(--primary), 0 4px 12px -6px oklch(0.46 0.135 328 / 0.3)",
                        }
                      : {
                          background: "oklch(1 0 0 / 0.55)",
                          backdropFilter: "blur(12px)",
                          boxShadow:
                            "inset 0 1px 0 0 oklch(1 0 0 / 0.6), inset 0 0 0 1px oklch(0 0 0 / 0.06)",
                        }
                  }
                >
                  {active && (
                    <div
                      className="absolute top-2 end-2 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: "var(--primary)" }}
                    >
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  <d.Icon size={22} strokeWidth={1.75} className="relative z-10 text-primary" />
                  <div className="relative z-10">
                    <p
                      className="text-[13px] font-medium leading-tight"
                      style={active ? { color: "var(--primary)" } : undefined}
                    >
                      {d.title}
                    </p>
                    <p className="text-[10.5px] text-foreground/55 mt-0.5 leading-tight">{d.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* selection state note */}
        <div className="mt-4 glass-strong rounded-2xl p-3.5 flex items-start gap-2.5">
          <Sparkles size={13} className="text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
          <p className="text-[11.5px] text-foreground/70 leading-relaxed">
            {isUnrestricted
              ? "ستعتمد شيلا على توازن شامل بين جميع المجموعات الغذائيّة."
              : `تفضيلاتكِ المختارة (${sel.length}) ستُشكّل كلّ اقتراح وجبة واصفة من شيلا.`}
          </p>
        </div>
      </div>
    </OnboardingShell>
  );
}
