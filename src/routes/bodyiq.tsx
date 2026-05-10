import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockUser } from "@/data/mock";
import { TIERS, tierMeta, bodyIQHistory, DECAY } from "@/data/gamification";
import { TrendingUp, Sparkles, Award, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/bodyiq")({ component: BodyIQPage });

function BodyIQPage() {
  const score = mockUser.bodyIQ;
  const { tier, next, toNext, pctInTier } = tierMeta(score);
  const delta = score - mockUser.bodyIQYesterday;

  const maxDelta = Math.max(...bodyIQHistory.map((h) => Math.abs(h.delta)), 30);

  return (
    <FeatureShell title="Body IQ" back="/home" variant="calm">
      <div className="px-5 pb-6">
        {/* Score hero */}
        <div className="glass-strong rounded-3xl p-6 text-center relative overflow-hidden">
          <div className="text-[10px] tracking-[0.3em] text-foreground/55 uppercase relative z-10">نقاطكِ الحاليّة</div>
          <div className="relative z-10 font-display text-[64px] leading-none mt-2 nums" style={{ color: tier.color }}>{score}</div>
          <div className="relative z-10 mt-2 inline-flex items-center gap-1.5 text-[12px]"
            style={{ color: delta >= 0 ? "var(--phase-follicular)" : "var(--phase-menstrual)" }}
          >
            <TrendingUp size={13} strokeWidth={2} />
            <span className="nums">{delta >= 0 ? "+" : ""}{delta} من أمس</span>
          </div>

          <div className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: `color-mix(in oklab, ${tier.color} 14%, transparent)`, color: tier.color }}
          >
            <Award size={14} strokeWidth={2} />
            <span className="text-[12.5px] font-semibold">{tier.name}</span>
          </div>

          {/* Progress to next tier */}
          {next && (
            <div className="relative z-10 mt-5">
              <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pctInTier * 100}%`, background: tier.color }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-[10.5px] text-foreground/55">
                <span>{tier.name}</span>
                <span className="nums">{toNext} نقطة للوصول إلى {next.name}</span>
              </div>
            </div>
          )}
        </div>

        {/* 14-day chart */}
        <div className="glass mt-4 rounded-2xl p-4">
          <div className="relative z-10 flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">آخر ١٤ يوم</h3>
            <span className="text-[10.5px] text-foreground/55">دفعات النقاط اليوميّة</span>
          </div>
          <div className="relative z-10 flex items-end gap-1 h-24">
            {[...bodyIQHistory].reverse().map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${(Math.abs(h.delta) / maxDelta) * 100}%`,
                    background: h.delta >= 0 ? tier.color : "var(--phase-menstrual)",
                    opacity: h.delta === 0 ? 0.2 : 0.85,
                    minHeight: 4,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tiers ladder */}
        <h3 className="text-sm font-medium mt-6 mb-2.5">سلّم المراتب</h3>
        <div className="space-y-2">
          {TIERS.map((t) => {
            const active = t.key === tier.key;
            return (
              <div
                key={t.key}
                className="glass rounded-2xl p-3.5 flex items-center gap-3"
                style={active ? { boxShadow: `inset 0 0 0 1.5px ${t.color}` } : undefined}
              >
                <div className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `color-mix(in oklab, ${t.color} 18%, transparent)` }}
                >
                  <Sparkles size={15} style={{ color: t.color }} strokeWidth={2} />
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold" style={{ color: active ? t.color : undefined }}>{t.name}</span>
                    <span className="text-[10.5px] text-foreground/50 nums">{t.min}–{t.max === t.min ? "+" : t.max}</span>
                  </div>
                  <p className="text-[11px] text-foreground/60 mt-0.5">{t.desc}</p>
                </div>
                {active && <span className="relative z-10 text-[10.5px] font-semibold" style={{ color: t.color }}>أنتِ هنا</span>}
              </div>
            );
          })}
        </div>

        {/* Decay info */}
        <div className="glass mt-5 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle size={16} className="text-foreground/60 shrink-0 mt-0.5" strokeWidth={2} />
          <div className="relative z-10">
            <div className="text-[12.5px] font-medium">الاضمحلال يبدأ بعد {DECAY.startsAfterDays} أيام</div>
            <p className="text-[11px] text-foreground/60 mt-1 leading-relaxed">
              غياب التسجيل لأيام طويلة يُنقص النقاط تدريجيّاً ({DECAY.perDayBefore14} نقطة/يوم في أوّل أسبوعين، ثمّ {DECAY.perDayAfter14}). الاتّساق أهمّ من الكمال.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mt-4">
          <Link to="/streak" className="glass rounded-2xl p-3.5 text-center text-[12.5px] font-medium">سلسلتي</Link>
          <Link to="/circle" className="glass rounded-2xl p-3.5 text-center text-[12.5px] font-medium">دائرتي</Link>
        </div>
      </div>
    </FeatureShell>
  );
}
