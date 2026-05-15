import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";
import { userV2, PHASE_META, type CyclePhase } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/cycle")({ component: CycleIndex });

const PHASES: { key: CyclePhase; days: number }[] = [
  { key: "menstrual", days: 5 }, { key: "follicular", days: 8 },
  { key: "ovulation", days: 3 }, { key: "luteal", days: 12 },
];

function CycleIndex() {
  const { state } = useSheilaV2();
  const { cycleDay, cycleLength } = userV2;
  const meta = PHASE_META[state.currentPhase];
  const days = Array.from({ length: cycleLength }, (_, i) => i + 1);
  function phaseOf(d: number): CyclePhase {
    let acc = 0;
    for (const p of PHASES) { acc += p.days; if (d <= acc) return p.key; }
    return "luteal";
  }

  return (
    <ShellV2 title="الدورة" variant="calm">
      <div className="px-5">
        <div className="rounded-3xl p-5 glass-strong text-center">
          <div className="text-[10.5px] tracking-widest text-foreground/55">اليوم</div>
          <div className="font-display text-[44px] leading-none mt-1.5 nums" style={{ color: meta.color }}>{cycleDay}</div>
          <div className="text-[12px] mt-1.5 font-semibold" style={{ color: meta.color }}>{meta.name}</div>
          <p className="text-[12px] text-foreground/65 leading-relaxed mt-2">{meta.description}</p>
        </div>

        <h2 className="text-[12px] font-semibold mt-6 mb-2.5 px-1">دورتك الحاليّة</h2>
        <div className="rounded-2xl p-4 bg-white/85 border border-border">
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((d) => {
              const p = phaseOf(d);
              const m = PHASE_META[p];
              const today = d === cycleDay;
              return (
                <div key={d} className="aspect-square rounded-xl flex items-center justify-center text-[11px] nums relative"
                     style={{ background: today ? m.color : `color-mix(in oklab, ${m.color} 18%, white)`, color: today ? "white" : m.deep, fontWeight: today ? 700 : 500 }}>
                  {d}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 mt-3 text-[10.5px]">
            {Object.entries(PHASE_META).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: v.color }} />
                <span className="text-foreground/65">{v.name}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-[12px] font-semibold mt-6 mb-2.5 px-1">تعليم المراحل</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {(Object.keys(PHASE_META) as CyclePhase[]).map((p) => {
            const m = PHASE_META[p];
            return (
              <Link key={p} to="/sheila-v2/cycle/phase/$phase" params={{ phase: p }}
                    className="rounded-2xl p-3.5 active:scale-[0.98] transition-transform"
                    style={{ background: `linear-gradient(135deg, ${m.color}33, ${m.color}11)`, border: `1px solid ${m.color}33` }}>
                <div className="font-display text-[14px]" style={{ color: m.deep }}>{m.name}</div>
                <div className="text-[10.5px] text-foreground/65 mt-1 leading-relaxed line-clamp-2">{m.description}</div>
                <div className="inline-flex items-center gap-0.5 text-[10.5px] mt-2 font-semibold" style={{ color: m.deep }}>
                  اقرئي <ChevronLeft size={11} strokeWidth={2.5} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </ShellV2>
  );
}
