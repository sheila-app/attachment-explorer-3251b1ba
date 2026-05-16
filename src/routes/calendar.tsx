import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { ChevronRight, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/calendar")({ component: Page });

const days = ["س", "ج", "خ", "ر", "ث", "ن", "ح"];
const events: Record<number, { dot: string; t: string }[]> = {
  3: [{ dot: "var(--phase-menstrual)", t: "بداية الدورة" }],
  8: [{ dot: "var(--primary)", t: "تمرين HIIT" }],
  14: [{ dot: "var(--phase-ovulation)", t: "إباضة" }],
  18: [{ dot: "var(--primary)", t: "جلسة مع المدرّبة" }],
  22: [{ dot: "var(--phase-luteal)", t: "PMS متوقّع" }],
};

function Page() {
  const [sel, setSel] = useState(14);
  const cells = Array.from({ length: 35 }, (_, i) => i - 2);
  return (
    <FeatureShell title="تقويمي" back="/journey" variant="default">
      <div className="px-5 space-y-4">
        <div className="glass-strong rounded-3xl p-4">
          <div className="flex items-center justify-between mb-3">
            <button className="glass w-8 h-8 rounded-full flex items-center justify-center"><ChevronRight size={14} className="relative z-10" /></button>
            <div className="font-display text-[16px]">أبريل 2026</div>
            <button className="glass w-8 h-8 rounded-full flex items-center justify-center"><ChevronLeft size={14} className="relative z-10" /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map(d => <div key={d} className="text-center text-[10px] text-foreground/55">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              const valid = d >= 1 && d <= 30;
              const has = valid && events[d];
              const isSel = d === sel;
              return (
                <button key={i} disabled={!valid} onClick={() => setSel(d)}
                  className="aspect-square rounded-xl flex flex-col items-center justify-center text-[12px] nums relative"
                  style={isSel ? { background: "var(--gradient-primary)", color: "white" } : undefined}>
                  {valid ? d : ""}
                  {has && !isSel && <span className="w-1 h-1 rounded-full mt-0.5" style={{ background: events[d][0].dot }} />}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-[11px] font-medium text-foreground/55 uppercase tracking-wider mb-2 px-1">يوم {sel}</h2>
          <div className="space-y-2">
            {(events[sel] || [{ dot: "var(--foreground)", t: "لا أحداث — أضيفي مذكّرة" }]).map((e, i) => (
              <div key={i} className="glass rounded-2xl p-4 flex items-center gap-3">
                <span className="relative z-10 w-2.5 h-2.5 rounded-full" style={{ background: e.dot }} />
                <span className="relative z-10 text-[13px]">{e.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FeatureShell>
  );
}
