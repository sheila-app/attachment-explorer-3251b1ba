import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockUser } from "@/data/mock";
import { Flame, Shield, Sparkles } from "lucide-react";

export const Route = createFileRoute("/streak")({ component: StreakPage });

function StreakPage() {
  const days = Array.from({ length: 14 }).map((_, i) => i < mockUser.streak);
  const showWager = mockUser.streak >= 6 && mockUser.streak < 7;

  return (
    <FeatureShell title="السلسلة" back="/bodyiq" variant="warm">
      <div className="px-5 pb-6">
        <div className="glass-strong rounded-3xl p-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--phase-menstrual), var(--primary-glow))" }}
          >
            <Flame size={28} className="text-white" strokeWidth={2} />
          </div>
          <div className="font-display text-[56px] leading-none mt-3 nums">{mockUser.streak}</div>
          <div className="text-[11px] tracking-[0.2em] text-foreground/55 uppercase mt-1">أيام متتالية</div>

          {mockUser.streakGraceActive && (
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-phase-luteal-soft text-phase-luteal text-[11px] font-medium">
              <Shield size={12} strokeWidth={2} /> يوم سماح مفعّل
            </div>
          )}

          <div className="mt-5">
            <div className="flex justify-center gap-1.5 flex-wrap">
              {days.map((on, i) => (
                <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold nums"
                  style={on
                    ? { background: "var(--phase-menstrual)", color: "white" }
                    : { background: "color-mix(in oklab, var(--phase-menstrual) 10%, transparent)", color: "var(--phase-menstrual)" }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="text-[10.5px] text-foreground/55 mt-2">أفضل سلسلة: <span className="nums">{mockUser.bestStreak}</span> يوم</div>
          </div>
        </div>

        {showWager && (
          <div className="glass mt-4 rounded-2xl p-4 flex items-start gap-3" style={{ boxShadow: "inset 0 0 0 1.5px var(--primary)" }}>
            <Sparkles size={18} className="text-primary shrink-0 mt-0.5" strokeWidth={2} />
            <div className="relative z-10">
              <div className="text-[13px] font-semibold">الرهان (The Wager)</div>
              <p className="text-[11.5px] text-foreground/65 mt-1 leading-relaxed">
                وصلتِ إلى اليوم السادس — يومٌ واحدٌ بعد ويُفتح لكِ مكافأة سلسلة ٧ أيّام (+25 نقطة).
              </p>
            </div>
          </div>
        )}

        <h3 className="text-sm font-medium mt-6 mb-2.5">مكافآت السلسلة</h3>
        <div className="space-y-2">
          {[
            { d: 7, pts: 25, label: "أسبوع كامل" },
            { d: 14, pts: 50, label: "أسبوعان" },
            { d: 30, pts: 100, label: "شهر كامل" },
            { d: 60, pts: 150, label: "شهران" },
          ].map((r) => {
            const reached = mockUser.streak >= r.d;
            return (
              <div key={r.d} className="glass rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center relative z-10"
                  style={{ background: reached ? "var(--phase-follicular-soft)" : "color-mix(in oklab, var(--foreground) 6%, transparent)" }}
                >
                  <span className="text-[12px] font-bold nums" style={{ color: reached ? "var(--phase-follicular)" : "var(--foreground)" }}>{r.d}</span>
                </div>
                <div className="relative z-10 flex-1">
                  <div className="text-[13px] font-medium">{r.label}</div>
                  <div className="text-[10.5px] text-foreground/55 nums">+{r.pts} نقطة</div>
                </div>
                {reached && <span className="relative z-10 text-[10.5px] text-phase-follicular font-semibold">مكتمل</span>}
              </div>
            );
          })}
        </div>
      </div>
    </FeatureShell>
  );
}
