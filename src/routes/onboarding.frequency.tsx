import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { toAr } from "@/lib/format";

export const Route = createFileRoute("/onboarding/frequency")({ component: Page });

const DAY_LABELS = ["أح", "إث", "ثل", "أر", "خم", "جم", "سب"];

const TIPS: Record<number, string> = {
  1: "بداية رائعة — حتى يوم واحد يصنع فارقاً. سنجعله يوماً مميّزاً.",
  2: "مناسب للبداية — تمارين تجديد ونشاط خفيف مع راحة كافية.",
  3: "التوازن المثالي — ثلاثة أيّام تمنحكِ نتائج واضحة وتعافياً ممتازاً.",
  4: "مثالي — يتيح التعافي الكافي بين الجلسات للنتائج المستدامة.",
  5: "جيّد جداً — سنحرص على تنويع التمارين ودمج يوم استرداد نشط.",
  6: "مكثّف — تأكّدي من يوم راحة أسبوعياً لمنع الإرهاق.",
  7: "يوميّاً — سنضمّن يوم استرداد نشط في خطّتكِ لتجنّب الإفراط.",
};

function Page() {
  const [count, setCount] = useState(4);

  function adjust(delta: number) {
    setCount((c) => Math.min(7, Math.max(1, c + delta)));
  }

  return (
    <OnboardingShell
      step={10}
      total={12}
      back="/onboarding/diet"
      title="كم مرّة تودّين التمرين أسبوعياً؟"
      subtitle="سنوزّع جلساتكِ على الأيّام الأنسب لكِ."
      footer={<PrimaryCTA to="/onboarding/types">متابعة</PrimaryCTA>}
    >
      <div>
        {/* large number display */}
        <div className="glass-strong rounded-3xl p-6 text-center mb-5">
          <div className="flex items-center justify-center gap-6">
            {/* minus — on the right since RTL */}
            <button
              onClick={() => adjust(-1)}
              disabled={count <= 1}
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-light transition-all"
              style={{
                background:
                  count <= 1
                    ? "oklch(0 0 0 / 0.04)"
                    : "oklch(1 0 0 / 0.6)",
                boxShadow:
                  count <= 1
                    ? undefined
                    : "inset 0 1px 0 0 oklch(1 0 0 / 0.7), 0 2px 8px -2px oklch(0 0 0 / 0.1)",
                opacity: count <= 1 ? 0.4 : 1,
              }}
            >
              −
            </button>

            {/* number */}
            <div className="flex flex-col items-center">
              <span
                className="font-display leading-none nums"
                style={{
                  fontSize: "72px",
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {toAr(count)}
              </span>
              <span className="text-[12px] text-foreground/60 mt-1">أيّام في الأسبوع</span>
            </div>

            {/* plus */}
            <button
              onClick={() => adjust(1)}
              disabled={count >= 7}
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-light transition-all"
              style={{
                background:
                  count >= 7
                    ? "oklch(0 0 0 / 0.04)"
                    : "oklch(1 0 0 / 0.6)",
                boxShadow:
                  count >= 7
                    ? undefined
                    : "inset 0 1px 0 0 oklch(1 0 0 / 0.7), 0 2px 8px -2px oklch(0 0 0 / 0.1)",
                opacity: count >= 7 ? 0.4 : 1,
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* 7 day bubbles */}
        <div className="flex justify-between gap-1.5 mb-5">
          {DAY_LABELS.map((label, idx) => {
            const filled = idx < count;
            return (
              <button
                key={label}
                onClick={() => setCount(idx + 1)}
                className="w-10 h-10 rounded-full border-2 transition-all"
                style={
                  filled
                    ? {
                        background: "var(--primary)",
                        borderColor: "var(--primary)",
                      }
                    : {
                        background: "transparent",
                        borderColor: "var(--border)",
                      }
                }
              />
            );
          })}
        </div>

        {/* recommendation card */}
        <div className="glass-strong rounded-2xl p-4">
          <p className="text-[12.5px] text-foreground/70 leading-relaxed text-center">
            {TIPS[count]}
          </p>
        </div>
      </div>
    </OnboardingShell>
  );
}
