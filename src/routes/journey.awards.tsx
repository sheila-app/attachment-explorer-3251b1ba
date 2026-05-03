import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockAchievements } from "@/data/mock";
import { Share2, Lock, Sprout, Flame, Star, Wind, Trophy, Heart, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = { Sprout, Flame, Star, Wind, Trophy, Heart };

export const Route = createFileRoute("/journey/awards")({ component: AwardsPage });

// Extended achievement metadata (desc, condition, progress for locked)
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

function AwardsPage() {
  const unlocked = mockAchievements.filter((a) => a.unlocked);
  const locked = mockAchievements.filter((a) => !a.unlocked);

  return (
    <FeatureShell title="الإنجازات" back="/journey" variant="calm">
      <div className="px-5 pb-8">
        {/* stats header */}
        <div className="glass-strong rounded-2xl p-4 mb-5 flex items-center gap-4">
          <div className="relative w-14 h-14 shrink-0">
            <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
              <circle cx="28" cy="28" r="24" fill="none" stroke="var(--border)" strokeWidth="5" />
              <circle
                cx="28" cy="28" r="24" fill="none"
                stroke="var(--primary)" strokeWidth="5"
                strokeDasharray={`${(unlocked.length / mockAchievements.length) * 150.8} 150.8`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-sm text-primary">{unlocked.length}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-[14.5px]">
              {unlocked.length} إنجازات مفتوحة
            </p>
            <p className="text-[11.5px] text-foreground/60 mt-0.5">
              من أصل {mockAchievements.length} إنجازاً — استمرّي!
            </p>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden bg-border">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(unlocked.length / mockAchievements.length) * 100}%`,
                  background: "var(--gradient-primary)",
                }}
              />
            </div>
          </div>
        </div>

        {/* unlocked */}
        {unlocked.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[11px] text-foreground/50 tracking-[0.15em] uppercase px-1 mb-3">
              مفتوحة
            </h2>
            <div className="grid grid-cols-2 gap-2.5 stagger">
              {unlocked.map((a) => {
                const meta = AWARD_META[a.id];
                return (
                  <div
                    key={a.id}
                    className="glass-strong rounded-2xl p-4 text-center relative overflow-hidden"
                    style={{
                      boxShadow: meta ? `inset 0 0 0 1.5px ${meta.color}44` : undefined,
                    }}
                  >
                    {meta && (
                      <div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full opacity-15 pointer-events-none"
                        style={{ background: meta.color, filter: "blur(20px)" }}
                      />
                    )}
                    {(() => { const Ic = ICON_MAP[a.iconName]; return Ic ? <Ic size={40} strokeWidth={1.5} className="relative z-10 mx-auto mb-2" style={meta ? { color: meta.color } : undefined} /> : null; })()}
                    <div
                      className="relative z-10 text-[13px] font-semibold"
                      style={meta ? { color: meta.color } : undefined}
                    >
                      {a.name}
                    </div>
                    {meta && (
                      <p className="relative z-10 text-[10.5px] text-foreground/60 mt-1 leading-tight">
                        {meta.desc}
                      </p>
                    )}
                    {a.date && (
                      <p className="relative z-10 text-[9.5px] text-foreground/45 mt-1.5">{a.date}</p>
                    )}
                    {/* share button */}
                    <button
                      className="relative z-10 mt-3 flex items-center gap-1 mx-auto text-[10.5px] text-primary"
                    >
                      <Share2 size={11} strokeWidth={2} />
                      مشاركة
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* locked */}
        {locked.length > 0 && (
          <div>
            <h2 className="text-[11px] text-foreground/50 tracking-[0.15em] uppercase px-1 mb-3">
              قيد الفتح
            </h2>
            <div className="grid grid-cols-2 gap-2.5 stagger">
              {locked.map((a) => {
                const meta = AWARD_META[a.id];
                const prog = meta?.progress;
                return (
                  <div
                    key={a.id}
                    className="glass rounded-2xl p-4 text-center"
                    style={{ opacity: 0.65 }}
                  >
                    {(() => { const Ic = ICON_MAP[a.iconName]; return Ic ? <Ic size={36} strokeWidth={1.5} className="relative z-10 mx-auto mb-2 grayscale opacity-70" /> : null; })()}
                    <div className="relative z-10 flex items-center justify-center gap-1 text-[12px] font-medium">
                      <Lock size={11} className="text-foreground/50" strokeWidth={2} />
                      {a.name}
                    </div>
                    {meta && (
                      <p className="relative z-10 text-[10px] text-foreground/50 mt-1 leading-tight">
                        {meta.condition}
                      </p>
                    )}
                    {prog && (
                      <div className="relative z-10 mt-2.5">
                        <div className="h-1 rounded-full bg-border overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(prog.current / prog.total) * 100}%`,
                              background: "var(--primary)",
                            }}
                          />
                        </div>
                        <p className="text-[9.5px] text-foreground/45 mt-1">
                          {prog.current} من {prog.total}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </FeatureShell>
  );
}
