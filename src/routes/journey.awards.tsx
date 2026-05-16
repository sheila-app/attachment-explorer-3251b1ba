import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockAchievements, mockUser } from "@/data/mock";
import { achievementsTiered } from "@/data/gamification";
import {
  Share2, Lock, Sprout, Flame, Star, Wind, Trophy, Heart,
  Shield, Sparkles, Award, Crown, type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = { Sprout, Flame, Star, Wind, Trophy, Heart };

export const Route = createFileRoute("/journey/awards")({ component: AwardsPage });

const AWARD_META: Record<string, {
  desc: string;
  condition: string;
  progress?: { current: number; total: number };
  color: string;
}> = {
  a1: { desc: "أكملتِ أوّل تمرين في رحلتكِ مع شيلا.", condition: "إكمال أوّل تمرين", color: "var(--phase-follicular)" },
  a2: { desc: "حافظتِ على تمرين لمدّة ٧ أيّام متتالية!", condition: "٧ أيّام متتالية", color: "var(--phase-menstrual)" },
  a3: { desc: "شهر كامل من الالتزام اليوميّ — إنجاز استثنائي.", condition: "٣٠ يوماً متتالية", progress: { current: 7, total: 30 }, color: "var(--phase-ovulation)" },
  a4: { desc: "أتقنتِ تمارين اليوغا وأصبحت جزءاً من روتينكِ.", condition: "إكمال ١٠ جلسات يوغا", color: "var(--phase-luteal)" },
  a5: { desc: "مئة تمرين — أنتِ بطلة حقيقيّة!", condition: "١٠٠ تمرين مكتمل", progress: { current: 42, total: 100 }, color: "var(--phase-ovulation)" },
  a6: { desc: "شاركتِ تجربتكِ ودعمتِ أخواتكِ في المجتمع.", condition: "الإعجاب بـ١٠ منشورات", color: "var(--primary)" },
};

const TIERS = [
  { key: "micro" as const, title: "إنجازات صغيرة", subtitle: "لحظات يوميّة", Icon: Star, color: "var(--phase-follicular)" },
  { key: "macro" as const, title: "إنجازات كبرى", subtitle: "علامات الدورة", Icon: Award, color: "var(--phase-ovulation)" },
  { key: "legacy" as const, title: "إنجازات خالدة", subtitle: "الإرث", Icon: Crown, color: "var(--primary-glow)" },
];

function AwardsPage() {
  const unlocked = mockAchievements.filter((a) => a.unlocked);
  const locked = mockAchievements.filter((a) => !a.unlocked);
  const days = Array.from({ length: 14 }).map((_, i) => i < mockUser.streak);
  const showWager = mockUser.streak >= 6 && mockUser.streak < 7;

  return (
    <FeatureShell title="الإنجازات" back="/journey" variant="calm">
      <div className="px-5 pb-8 space-y-5">
        {/* === Streak hero === */}
        <div className="glass-strong rounded-3xl p-5 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--phase-menstrual), var(--primary-glow))" }}
          >
            <Flame size={24} className="text-white" strokeWidth={2} />
          </div>
          <div className="font-display text-[48px] leading-none mt-2 nums">{mockUser.streak}</div>
          <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mt-1">أيام متتالية</div>

          {mockUser.streakGraceActive && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-phase-luteal-soft text-phase-luteal text-[10.5px] font-medium">
              <Shield size={11} strokeWidth={2} /> يوم سماح مفعّل
            </div>
          )}

          <div className="mt-4 flex justify-center gap-1 flex-wrap">
            {days.map((on, i) => (
              <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold nums"
                style={on
                  ? { background: "var(--phase-menstrual)", color: "white" }
                  : { background: "color-mix(in oklab, var(--phase-menstrual) 10%, transparent)", color: "var(--phase-menstrual)" }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="text-[10px] text-foreground/55 mt-2">أفضل سلسلة: <span className="nums">{mockUser.bestStreak}</span> يوم</div>
        </div>

        {showWager && (
          <div className="glass rounded-2xl p-4 flex items-start gap-3" style={{ boxShadow: "inset 0 0 0 1.5px var(--primary)" }}>
            <Sparkles size={18} className="text-primary shrink-0 mt-0.5" strokeWidth={2} />
            <div className="relative z-10">
              <div className="text-[13px] font-semibold">الرهان (The Wager)</div>
              <p className="text-[11.5px] text-foreground/65 mt-1 leading-relaxed">
                وصلتِ إلى اليوم السادس — يومٌ واحدٌ بعد ويُفتح لكِ مكافأة سلسلة ٧ أيّام (+25 نقطة).
              </p>
            </div>
          </div>
        )}

        {/* === Overall progress === */}
        <div className="glass-strong rounded-2xl p-4 flex items-center gap-4">
          <div className="relative w-14 h-14 shrink-0">
            <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
              <circle cx="28" cy="28" r="24" fill="none" stroke="var(--border)" strokeWidth="5" />
              <circle cx="28" cy="28" r="24" fill="none" stroke="var(--primary)" strokeWidth="5"
                strokeDasharray={`${(unlocked.length / mockAchievements.length) * 150.8} 150.8`}
                strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-sm text-primary">{unlocked.length}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-[14.5px]">{unlocked.length} إنجازات مفتوحة</p>
            <p className="text-[11.5px] text-foreground/60 mt-0.5">من أصل {mockAchievements.length} إنجازاً — استمرّي!</p>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden bg-border">
              <div className="h-full rounded-full"
                style={{ width: `${(unlocked.length / mockAchievements.length) * 100}%`, background: "var(--gradient-primary)" }}
              />
            </div>
          </div>
        </div>

        {/* === Unlocked cards === */}
        {unlocked.length > 0 && (
          <div>
            <h2 className="text-[11px] text-foreground/50 tracking-[0.15em] uppercase px-1 mb-3">مفتوحة</h2>
            <div className="grid grid-cols-2 gap-2.5 stagger">
              {unlocked.map((a) => {
                const meta = AWARD_META[a.id];
                return (
                  <div key={a.id} className="glass-strong rounded-2xl p-4 text-center relative overflow-hidden"
                    style={{ boxShadow: meta ? `inset 0 0 0 1.5px ${meta.color}44` : undefined }}
                  >
                    {meta && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full opacity-15 pointer-events-none"
                        style={{ background: meta.color, filter: "blur(20px)" }} />
                    )}
                    {(() => { const Ic = ICON_MAP[a.iconName]; return Ic ? <Ic size={40} strokeWidth={1.5} className="relative z-10 mx-auto mb-2" style={meta ? { color: meta.color } : undefined} /> : null; })()}
                    <div className="relative z-10 text-[13px] font-semibold" style={meta ? { color: meta.color } : undefined}>{a.name}</div>
                    {meta && <p className="relative z-10 text-[10.5px] text-foreground/60 mt-1 leading-tight">{meta.desc}</p>}
                    {a.date && <p className="relative z-10 text-[9.5px] text-foreground/45 mt-1.5">{a.date}</p>}
                    <button className="relative z-10 mt-3 flex items-center gap-1 mx-auto text-[10.5px] text-primary">
                      <Share2 size={11} strokeWidth={2} /> مشاركة
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* === Locked cards === */}
        {locked.length > 0 && (
          <div>
            <h2 className="text-[11px] text-foreground/50 tracking-[0.15em] uppercase px-1 mb-3">قيد الفتح</h2>
            <div className="grid grid-cols-2 gap-2.5 stagger">
              {locked.map((a) => {
                const meta = AWARD_META[a.id];
                const prog = meta?.progress;
                return (
                  <div key={a.id} className="glass rounded-2xl p-4 text-center" style={{ opacity: 0.65 }}>
                    {(() => { const Ic = ICON_MAP[a.iconName]; return Ic ? <Ic size={36} strokeWidth={1.5} className="relative z-10 mx-auto mb-2 grayscale opacity-70" /> : null; })()}
                    <div className="relative z-10 flex items-center justify-center gap-1 text-[12px] font-medium">
                      <Lock size={11} className="text-foreground/50" strokeWidth={2} /> {a.name}
                    </div>
                    {meta && <p className="relative z-10 text-[10px] text-foreground/50 mt-1 leading-tight">{meta.condition}</p>}
                    {prog && (
                      <div className="relative z-10 mt-2.5">
                        <div className="h-1 rounded-full bg-border overflow-hidden">
                          <div className="h-full rounded-full"
                            style={{ width: `${(prog.current / prog.total) * 100}%`, background: "var(--primary)" }} />
                        </div>
                        <p className="text-[9.5px] text-foreground/45 mt-1">{prog.current} من {prog.total}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* === Tiered achievements (micro / macro / legacy) === */}
        {TIERS.map((tier) => {
          const items = achievementsTiered[tier.key];
          if (!items || items.length === 0) return null;
          return (
            <section key={tier.key}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `color-mix(in oklab, ${tier.color} 18%, transparent)` }}>
                  <tier.Icon size={18} style={{ color: tier.color }} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[14px] font-semibold">{tier.title}</div>
                  <div className="text-[11px] text-foreground/55">{tier.subtitle}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {items.map((a) => (
                  <div key={a.id} className="glass rounded-2xl p-3.5"
                    style={a.unlocked ? { boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${tier.color} 45%, transparent)` } : undefined}>
                    <div className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center"
                      style={a.unlocked
                        ? { background: `color-mix(in oklab, ${tier.color} 20%, transparent)` }
                        : { background: "color-mix(in oklab, var(--foreground) 6%, transparent)" }}>
                      {a.unlocked
                        ? <tier.Icon size={15} style={{ color: tier.color }} strokeWidth={2} />
                        : <Lock size={13} className="text-foreground/45" strokeWidth={2} />}
                    </div>
                    <div className="relative z-10 mt-2 text-[12.5px] font-semibold leading-tight">
                      {("arName" in a && a.arName) ? a.arName : a.name}
                    </div>
                    {"desc" in a && a.desc && <div className="relative z-10 text-[10.5px] text-foreground/55 mt-1">{a.desc}</div>}
                    {a.unlocked && "date" in a && a.date && (
                      <div className="relative z-10 text-[10px] mt-1.5" style={{ color: tier.color }}>{a.date}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* === Streak rewards === */}
        <div>
          <h3 className="text-[11px] text-foreground/50 tracking-[0.15em] uppercase px-1 mb-3">مكافآت السلسلة</h3>
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
                    style={{ background: reached ? "var(--phase-follicular-soft)" : "color-mix(in oklab, var(--foreground) 6%, transparent)" }}>
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
      </div>
    </FeatureShell>
  );
}
