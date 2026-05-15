import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ChevronLeft } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { AITyping, useFakeGenerate } from "@/components/sheila-v2/AITyping";
import { SMART_INSIGHTS } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/journey/insights")({ component: Insights });

const COLORS: Record<string, string> = {
  "أفضل أداء": "var(--phase-ovulation)",
  "أنماط الطاقة": "var(--phase-follicular)",
  "تأثير الدورة": "var(--phase-luteal)",
  "توازن التغذية": "oklch(0.6 0.13 145)",
};

function Insights() {
  const ready = useFakeGenerate("insights", 1100);
  return (
    <ShellV2 title="Smart Insights" back="/sheila-v2/journey" showFAB={false}>
      <div className="px-5">
        <div className="rounded-3xl p-4 glass-strong">
          <div className="relative z-10 flex items-center gap-2"><Sparkles size={14} className="text-primary" /><span className="text-[11px] font-semibold text-primary">رؤى الأسبوع من شيلا</span></div>
          <div className="relative z-10 text-[11px] text-foreground/65 mt-1.5">يتم تحديثها أسبوعيّاً بناءً على بياناتك</div>
        </div>
        <div className="grid gap-2.5 mt-4">
          {SMART_INSIGHTS.map((it, i) => {
            const c = COLORS[it.category];
            return (
              <Link key={it.id} to={(it.link ?? "/sheila-v2/journey") as "/"} className="rounded-2xl bg-white/85 border border-border p-4 active:scale-[0.99]">
                <div className="text-[10.5px] font-semibold inline-block px-2 py-0.5 rounded-full" style={{ background: c + "22", color: c }}>{it.category}</div>
                <p className="text-[13px] leading-relaxed mt-2 text-foreground/85 min-h-[40px]">
                  {ready ? <AITyping text={it.text} speed={18} startDelay={i * 250} /> : "…"}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-primary font-medium mt-2">اعرفي المزيد <ChevronLeft size={11} strokeWidth={2.5} /></div>
              </Link>
            );
          })}
        </div>
      </div>
    </ShellV2>
  );
}
