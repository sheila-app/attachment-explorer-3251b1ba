import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { circleMembers } from "@/data/gamification";
import { PHASE_META, type CyclePhase } from "@/data/mock";
import { Users, TrendingUp, Lock } from "lucide-react";

export const Route = createFileRoute("/circle")({ component: CirclePage });

function CirclePage() {
  const sorted = [...circleMembers].sort((a, b) => b.bodyIQ - a.bodyIQ);

  return (
    <FeatureShell title="الدائرة الخاصّة" back="/bodyiq" variant="default">
      <div className="px-5 pb-6">
        <div className="glass-strong rounded-2xl p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <Users size={17} className="text-primary" strokeWidth={2} />
          </div>
          <div className="relative z-10">
            <div className="text-[13px] font-semibold">مجموعتكِ المغلقة</div>
            <p className="text-[11.5px] text-foreground/65 mt-1 leading-relaxed">
              أسماء مستعارة فقط. لا أرقام شخصيّة، لا صور. مقارنة محترمة بين نساء يثقن ببعضهنّ.
            </p>
          </div>
          <Lock size={14} className="text-foreground/45 shrink-0" strokeWidth={2} />
        </div>

        <h3 className="text-sm font-medium mt-5 mb-2.5">ترتيب الأسبوع</h3>
        <div className="space-y-2">
          {sorted.map((m, i) => {
            const phase = PHASE_META[m.phase as CyclePhase];
            const top = i === 0;
            return (
              <div key={m.id} className="glass rounded-2xl p-3.5 flex items-center gap-3"
                style={m.you ? { boxShadow: "inset 0 0 0 1.5px var(--primary)" } : undefined}
              >
                <div className="relative z-10 w-8 h-8 rounded-xl flex items-center justify-center font-display text-[14px] nums"
                  style={{ background: top ? "var(--primary-glow)" : "color-mix(in oklab, var(--foreground) 6%, transparent)", color: top ? "white" : "var(--foreground)" }}
                >
                  {i + 1}
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold">{m.alias}</span>
                    {m.you && <span className="text-[9.5px] bg-primary/15 text-primary rounded-full px-1.5 py-0.5 font-semibold">أنتِ</span>}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: phase.color }} />
                    <span className="text-[10.5px] text-foreground/55">{phase.name}</span>
                  </div>
                </div>
                <div className="relative z-10 text-right">
                  <div className="font-display text-[16px] nums">{m.bodyIQ}</div>
                  <div className="text-[10px] text-phase-follicular nums inline-flex items-center gap-0.5">
                    <TrendingUp size={9} strokeWidth={2.5} /> +{m.weeklyDelta}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureShell>
  );
}
