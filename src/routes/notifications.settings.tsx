import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { IOSWheel } from "@/components/sheila/IOSWheel";

export const Route = createFileRoute("/notifications/settings")({ component: Page });

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));

function Page() {
  const [from, setFrom] = useState("22");
  const [to, setTo] = useState("07");
  return (
    <FeatureShell title="وضع عدم الإزعاج" back="/notifications" showNav={false} variant="calm">
      <div className="px-5 pb-8 space-y-5">
        <p className="text-[12px] text-foreground/65 leading-relaxed">حدّدي ساعات الهدوء — لن تصلكِ إشعارات عدا التذكيرات الحرجة.</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4">
            <div className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase mb-2 text-center">من</div>
            <div className="flex justify-center" style={{ direction: "ltr" }}>
              <IOSWheel values={hours} value={from} onChange={(v) => setFrom(String(v))} width={86} />
            </div>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase mb-2 text-center">إلى</div>
            <div className="flex justify-center" style={{ direction: "ltr" }}>
              <IOSWheel values={hours} value={to} onChange={(v) => setTo(String(v))} width={86} />
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-4 text-center">
          <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">الفترة الهادئة</div>
          <div className="font-display text-2xl text-primary mt-1 nums">{from}:00 → {to}:00</div>
        </div>

        <div className="space-y-2">
          {["استثناء التذكيرات الطبّيّة", "السماح بمكالمات الخبيرات", "صامت في عطلة نهاية الأسبوع"].map(t => (
            <div key={t} className="glass rounded-2xl p-4 flex items-center justify-between">
              <span className="relative z-10 text-[13px]">{t}</span>
              <div className="relative z-10 w-10 h-6 rounded-full p-0.5" style={{ background: "var(--gradient-primary)" }}>
                <div className="w-5 h-5 rounded-full bg-white" style={{ transform: "translateX(-16px)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </FeatureShell>
  );
}
