import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";

export const Route = createFileRoute("/sheila-v2/postpartum")({ component: Postpartum });

function Postpartum() {
  return (
    <ShellV2 title="ما بعد الولادة" variant="warm">
      <div className="px-5">
        <div className="rounded-3xl p-5" style={{ background: "linear-gradient(135deg, oklch(0.96 0.035 18), oklch(0.97 0.03 322))" }}>
          <div className="flex items-center gap-2"><Heart size={16} className="text-phase-menstrual" /><span className="text-[11px] font-semibold text-phase-menstrual-deep">الأسبوع 4 من 6</span></div>
          <div className="font-display text-[20px] mt-1.5">رحلة التعافي</div>
          <p className="text-[12px] text-foreground/65 mt-2 leading-relaxed">قبل بوّابة الستّة أسابيع — تمارين قاع الحوض فقط. لا قوّة، لا كارديو.</p>
          <div className="mt-3 h-2 rounded-full bg-white/60 overflow-hidden">
            <div className="h-full rounded-full bg-phase-menstrual" style={{ width: "66%" }} />
          </div>
        </div>
        {[
          { t: "النفاس (lochia)", v: "خفيف، لون بنّي" },
          { t: "الرضاعة", v: "8-10 مرّات يومياً" },
          { t: "EPDS — مزاج", v: "أكملي اختبار اليوم" },
          { t: "نوم", v: "5.4 ساعة (مجزّأ)" },
        ].map((it, i) => (
          <div key={i} className="rounded-2xl bg-white/85 border border-border p-3.5 mt-2.5 flex justify-between">
            <span className="text-[12.5px] font-medium">{it.t}</span>
            <span className="text-[12px] text-foreground/65">{it.v}</span>
          </div>
        ))}
      </div>
    </ShellV2>
  );
}
