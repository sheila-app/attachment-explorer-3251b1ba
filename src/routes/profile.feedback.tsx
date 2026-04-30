import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";
import { Star } from "lucide-react";

export const Route = createFileRoute("/profile/feedback")({ component: Page });

function Page() {
  const [rate, setRate] = useState(4);
  const [cat, setCat] = useState("idea");
  const [txt, setTxt] = useState("");
  return (
    <FeatureShell title="ملاحظاتكِ" back="/profile/help" showNav={false} variant="calm">
      <div className="px-5 pb-8 space-y-4">
        <div className="glass-strong rounded-3xl p-5 text-center">
          <div className="text-[12px] text-foreground/65 mb-3">كيف تقيّمين تجربتكِ مع شيلا؟</div>
          <div className="flex justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setRate(n)}>
                <Star size={28} className={n <= rate ? "text-primary fill-primary" : "text-foreground/20"} strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium mb-2 px-1">نوع الملاحظة</h2>
          <div className="space-y-2">
            <OptionCard title="فكرة جديدة" selected={cat === "idea"} onClick={() => setCat("idea")} />
            <OptionCard title="مشكلة تقنيّة" selected={cat === "bug"} onClick={() => setCat("bug")} />
            <OptionCard title="استفسار عام" selected={cat === "ask"} onClick={() => setCat("ask")} />
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase mb-2">تفاصيل</div>
          <textarea value={txt} onChange={e => setTxt(e.target.value)} rows={4}
            placeholder="شاركينا أفكاركِ بحرّيّة..."
            className="relative z-10 w-full bg-transparent text-[13px] outline-none resize-none placeholder:text-foreground/35 leading-relaxed" />
        </div>

        <PrimaryCTA to="/profile/help">إرسال</PrimaryCTA>
      </div>
    </FeatureShell>
  );
}
