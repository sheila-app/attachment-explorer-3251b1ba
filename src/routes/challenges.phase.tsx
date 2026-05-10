import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockUser, PHASE_META } from "@/data/mock";
import {
  PHASE_WINDOWS,
  PHASE_CHALLENGES_FOLLICULAR,
  PHASE_CHALLENGES_OVULATION,
  PHASE_CHALLENGES_LUTEAL,
} from "@/data/gamification";
import { Check, Sparkles, Clock } from "lucide-react";

export const Route = createFileRoute("/challenges/phase")({ component: PhaseChallengesPage });

function PhaseChallengesPage() {
  const phase = mockUser.currentPhase;
  const meta = PHASE_META[phase];
  const win = PHASE_WINDOWS[phase];

  const list = phase === "follicular" ? PHASE_CHALLENGES_FOLLICULAR
    : phase === "ovulation" ? PHASE_CHALLENGES_OVULATION
    : phase === "luteal" ? PHASE_CHALLENGES_LUTEAL
    : [];

  const done = list.filter((c) => c.done).length;
  const totalPts = list.reduce((s, c) => s + c.pts, 0);
  const earned = list.filter((c) => c.done).reduce((s, c) => s + c.pts, 0);
  const fullPhaseBonus = 40;

  return (
    <FeatureShell title={win.name} back="/bodyiq" variant="default">
      <div className="px-5 pb-6">
        {/* Hero */}
        <div className="glass-strong rounded-3xl p-5 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${meta.color}14, transparent 60%)` }} />
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${meta.color}, color-mix(in oklab, ${meta.color} 55%, white))` }}
            >
              <Sparkles size={20} className="text-white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">المرحلة الحاليّة</div>
              <div className="font-display text-[18px]" style={{ color: meta.color }}>{meta.name}</div>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px]"
              style={{ background: `color-mix(in oklab, ${meta.color} 14%, transparent)`, color: meta.color }}
            >
              <Clock size={11} strokeWidth={2.5} />
              <span className="nums">{win.days} أيّام</span>
            </div>
          </div>

          {/* Progress */}
          <div className="relative z-10 mt-4">
            <div className="flex items-center justify-between text-[11px] text-foreground/65 mb-1.5">
              <span>{done} / {list.length} تحدّيات</span>
              <span className="nums">+{earned} / +{totalPts} نقطة</span>
            </div>
            <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(done / Math.max(list.length, 1)) * 100}%`, background: meta.color }} />
            </div>
          </div>

          {done === list.length && list.length > 0 && (
            <div className="relative z-10 mt-3 rounded-xl px-3 py-2 text-[11.5px] font-semibold inline-block"
              style={{ background: `color-mix(in oklab, ${meta.color} 18%, transparent)`, color: meta.color }}
            >
              + مكافأة المرحلة الكاملة: +{fullPhaseBonus} نقطة
            </div>
          )}
        </div>

        {/* Challenges list */}
        <h3 className="text-sm font-medium mt-6 mb-2.5">تحدّيات هذه المرحلة</h3>
        {list.length === 0 ? (
          <div className="glass rounded-2xl p-5 text-center">
            <p className="relative z-10 text-[12.5px] text-foreground/65">لا تحدّيات في وضع الراحة — جسمكِ يستحقّ الاستراحة.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {list.map((c) => (
              <div key={c.id} className="glass rounded-2xl p-3.5 flex items-center gap-3"
                style={c.done ? { boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${meta.color} 45%, transparent)` } : undefined}
              >
                <div className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={c.done
                    ? { background: meta.color }
                    : { background: "color-mix(in oklab, var(--foreground) 6%, transparent)" }}
                >
                  {c.done ? <Check size={16} className="text-white" strokeWidth={2.5} /> : null}
                </div>
                <div className="relative z-10 flex-1">
                  <div className="text-[13px] font-medium">{c.title}</div>
                  <div className="text-[10.5px] text-foreground/55 nums mt-0.5">+{c.pts} نقطة</div>
                </div>
                {c.done && <span className="relative z-10 text-[10.5px] font-semibold" style={{ color: meta.color }}>تمّ</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </FeatureShell>
  );
}
