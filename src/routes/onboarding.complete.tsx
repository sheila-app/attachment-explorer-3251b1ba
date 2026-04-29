import { createFileRoute } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/onboarding/complete")({ component: Page });

function Page() {
  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen flex flex-col overflow-hidden">
        <LiquidBackdrop variant="energetic" />
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-7 text-center animate-rise">
          <div className="relative w-28 h-28 rounded-full flex items-center justify-center mb-6"
            style={{ background: "var(--gradient-primary)", boxShadow: "0 18px 40px -10px oklch(0.46 0.135 328 / 0.5)" }}>
            <Sparkles size={42} className="text-white relative z-10" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-[28px] leading-tight">جاهزة، نورة 💜</h1>
          <p className="text-[13.5px] text-foreground/70 leading-relaxed mt-3 max-w-[280px]">
            خصّصنا لكِ خطّة كاملة بناءً على بياناتكِ. ابدئي رحلتكِ مع شيلا الآن.
          </p>

          <div className="glass-strong rounded-2xl p-4 mt-7 w-full text-right space-y-2">
            {[
              "خطّة تمارين مخصّصة لمرحلتكِ",
              "خطة تغذية متوازنة",
              "تتبّع ذكي لدورتكِ",
              "مساعدة شيلا الذكيّة (AI)",
            ].map(b => (
              <div key={b} className="relative z-10 flex items-center gap-2 text-[12.5px]">
                <Check size={14} className="text-primary shrink-0" strokeWidth={2.5} />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 px-7 pb-8 pt-2 w-full">
          <PrimaryCTA to="/home">ابدئي رحلتكِ</PrimaryCTA>
        </div>
      </div>
    </DeviceFrame>
  );
}
