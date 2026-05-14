import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockUser, PHASE_META, type CyclePhase, mockCycleHistory } from "@/data/mock";
import { ChevronRight, ChevronLeft, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toAr } from "@/lib/format";

export const Route = createFileRoute("/cycle/")({ component: CyclePage });

const PHASE_BY_DAY = (day: number): CyclePhase => {
  if (day <= 5) return "menstrual";
  if (day <= 13) return "follicular";
  if (day <= 16) return "ovulation";
  return "luteal";
};

function CyclePage() {
  const [selected, setSelected] = useState(mockUser.cycleDay);
  const phase = PHASE_BY_DAY(selected);
  const meta = PHASE_META[phase];

  // build calendar grid (28 days)
  const days = Array.from({ length: mockUser.cycleLength }, (_, i) => i + 1);

  return (
    <FeatureShell title="تقويم الدورة" back="/home" variant="warm"
      trailing={
        <Link to="/cycle/log" className="glass w-10 h-10 rounded-full flex items-center justify-center">
          <Plus size={17} strokeWidth={2} className="relative z-10 text-primary" />
        </Link>
      }
    >
      <div className="px-5">
        {/* Month header */}
        <div className="flex items-center justify-between mb-4">
          <button className="glass w-9 h-9 rounded-full flex items-center justify-center"><ChevronRight size={16} className="relative z-10" /></button>
          <span className="font-medium nums">يونيو {toAr(2026)}</span>
          <button className="glass w-9 h-9 rounded-full flex items-center justify-center"><ChevronLeft size={16} className="relative z-10" /></button>
        </div>

        {/* Calendar grid */}
        <div className="glass-strong rounded-2xl p-3">
          <div className="relative z-10 grid grid-cols-7 gap-1.5 text-center">
            {["أحد","اثن","ثل","أرب","خم","جم","سب"].map(d => (
              <span key={d} className="text-[10px] text-foreground/55 py-1">{d}</span>
            ))}
            {days.map((d) => {
              const p = PHASE_BY_DAY(d);
              const isToday = d === mockUser.cycleDay;
              const isSel = d === selected;
              const phaseColor = PHASE_META[p].color;
              return (
                <button key={d} onClick={() => setSelected(d)}
                  className="aspect-square rounded-full flex items-center justify-center relative p-0 leading-none"
                  style={
                    isToday
                      ? { background: "var(--gradient-primary)", color: "white" }
                      : {
                          border: `1.5px solid ${phaseColor}`,
                          color: phaseColor,
                          background: "transparent",
                          boxShadow: isSel ? `0 0 0 2px color-mix(in oklab, ${phaseColor} 35%, transparent)` : undefined,
                        }
                  }
                >
                  <span className="text-[12px] font-medium nums leading-none translate-y-[1px]">{d}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend — قبل بطاقة الشرح */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {(["menstrual","follicular","ovulation","luteal"] as CyclePhase[]).map(p => (
            <div key={p} className="glass rounded-xl px-3 py-2 flex items-center gap-2">
              <span className="relative z-10 w-2.5 h-2.5 rounded-full" style={{ background: PHASE_META[p].color }} />
              <span className="relative z-10 text-[12px]">{PHASE_META[p].name}</span>
            </div>
          ))}
        </div>

        {/* Selected day card */}
        <div className="glass mt-4 rounded-2xl p-4">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">اليوم {selected}</div>
              <div className="font-display text-xl mt-1" style={{ color: meta.color }}>{meta.name}</div>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-medium" style={{ background: `color-mix(in oklab, ${meta.color} 18%, transparent)`, color: meta.color }}>
              {phase === "ovulation" ? "خصوبة عالية" : phase === "menstrual" ? "فترة الدورة" : "متابعة"}
            </span>
          </div>
          <p className="relative z-10 text-[12.5px] text-foreground/75 mt-3 leading-relaxed">{meta.description}</p>
        </div>
        {/* Cycle history */}
        <h2 className="text-sm font-medium mt-6 mb-2 px-1">السجلّ</h2>
        <div className="space-y-2">
          {mockCycleHistory.map(c => (
            <div key={c.id} className="glass rounded-xl p-3 flex items-center justify-between">
              <div className="relative z-10">
                <div className="text-[12.5px] font-medium nums">{c.start} – {c.end}</div>
                <div className="text-[11px] text-foreground/60 mt-0.5">{c.symptoms.join(" · ")}</div>
              </div>
              <span className="relative z-10 text-[11px] text-primary font-medium nums">{c.length} يوم</span>
            </div>
          ))}
        </div>
      </div>
    </FeatureShell>
  );
}
