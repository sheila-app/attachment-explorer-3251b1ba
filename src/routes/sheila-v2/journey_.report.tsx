import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { AITyping, useFakeGenerate } from "@/components/sheila-v2/AITyping";
import { MONTHLY_INSIGHTS } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/journey/report")({ component: Report });

function Report() {
  const ready = useFakeGenerate("report", 1100);
  return (
    <ShellV2 title="مارس 2026" back="/sheila-v2/journey" showFAB={false}>
      <div className="px-5 space-y-3">
        <div className="rounded-2xl bg-white/85 border border-border p-4 grid grid-cols-2 gap-3">
          {[{l:"تمارين",v:"21",h:"جلسة"},{l:"وجبات مسجّلة",v:"68",h:"وجبة"},{l:"سلسلة",v:"24",h:"يوم"},{l:"Body IQ",v:"+82",h:"نقطة"}].map(s=>(
            <div key={s.l}><div className="text-[10px] text-foreground/55">{s.l}</div><div className="font-display text-[20px] mt-0.5 nums">{s.v}</div><div className="text-[10px] text-foreground/55">{s.h}</div></div>
          ))}
        </div>

        <div className="rounded-3xl p-4 glass-strong">
          <div className="relative z-10 flex items-center gap-2 mb-2"><Sparkles size={14} className="text-primary" /><span className="text-[11px] font-semibold text-primary">رؤى شيلا</span></div>
          <div className="relative z-10 space-y-2.5 mt-2">
            {MONTHLY_INSIGHTS.map((it, i) => (
              <div key={i} className="rounded-2xl bg-white/70 p-3 text-[12.5px] leading-relaxed">
                {ready ? <AITyping text={it} speed={18} startDelay={i * 600} /> : "…"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ShellV2>
  );
}
