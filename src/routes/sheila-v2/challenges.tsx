import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Clock, Users, Sparkles, Trophy, ChevronLeft, Check } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { CHALLENGES, ACTIVE_CHALLENGE } from "@/data/sheila-v2";
import { fmt } from "@/lib/format";

export const Route = createFileRoute("/sheila-v2/challenges")({ component: ChallengesIdx });

const TYPE_COLOR: Record<string, string> = {
  حركة: "var(--phase-ovulation)",
  تغذية: "var(--phase-follicular)",
  تأمّل: "var(--phase-luteal)",
  هرمونات: "var(--primary)",
  ثبات: "var(--phase-menstrual)",
};

function ChallengesIdx() {
  const active = CHALLENGES.find((c) => c.id === ACTIVE_CHALLENGE.id);
  const discover = CHALLENGES.filter((c) => c.id !== ACTIVE_CHALLENGE.id);

  return (
    <ShellV2 title="التحدّيات" back="/sheila-v2/circle" showFAB={false}>
      <div className="px-5 space-y-5">
        {/* تحدّياتي النشطة */}
        {active && (
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="font-display text-[14px]">تحدّياتي النشطة</h2>
              <span className="text-[10.5px] text-foreground/55 nums">١ / ٣</span>
            </div>

            <Link
              to="/sheila-v2/challenges/$id"
              params={{ id: active.id }}
              className="block rounded-3xl p-4 relative overflow-hidden"
              style={{ background: "var(--gradient-primary, var(--primary))" }}
            >
              <div className="absolute -top-6 -end-6 w-24 h-24 rounded-full bg-white/15 blur-xl" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
                  <Flame size={20} strokeWidth={1.9} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10.5px] text-white/75 tracking-wider">نشط الآن</div>
                  <div className="font-display text-[16px] text-white leading-tight truncate">{active.title}</div>
                </div>
                <ChevronLeft size={18} className="text-white/80" />
              </div>

              <div className="relative z-10 mt-4">
                <div className="flex items-center justify-between text-[11px] text-white/85 mb-1.5">
                  <span className="nums">اليوم {fmt(ACTIVE_CHALLENGE.currentDay)} / {fmt(active.days)}</span>
                  <span className="nums">{Math.round((ACTIVE_CHALLENGE.currentDay / active.days) * 100)}٪</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${(ACTIVE_CHALLENGE.currentDay / active.days) * 100}%` }}
                  />
                </div>
              </div>

              <div className="relative z-10 mt-3.5">
                {ACTIVE_CHALLENGE.loggedToday ? (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/25 backdrop-blur px-3 py-1.5 text-[11.5px] text-white font-medium">
                    <Check size={13} strokeWidth={2.5} /> اكتمل اليوم
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white text-primary px-3.5 py-1.5 text-[11.5px] font-semibold">
                    سجّلي اليوم
                  </div>
                )}
              </div>
            </Link>
          </section>
        )}

        {/* اكتشفي التحدّيات */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="font-display text-[14px]">اكتشفي التحدّيات</h2>
            <span className="text-[10.5px] text-foreground/55 nums">{fmt(discover.length)} تحدّي</span>
          </div>

          <div className="space-y-2.5">
            {discover.map((c) => {
              const tint = TYPE_COLOR[c.type] ?? "var(--primary)";
              return (
                <Link
                  to="/sheila-v2/challenges/$id"
                  params={{ id: c.id }}
                  key={c.id}
                  className="block rounded-2xl bg-white/85 border border-border p-3.5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `color-mix(in oklab, ${tint} 14%, transparent)`, color: tint }}
                    >
                      <Trophy size={18} strokeWidth={1.9} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display text-[14px] truncate">{c.title}</span>
                        {c.adaptive && (
                          <span
                            className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-medium"
                            style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)", color: "var(--primary)" }}
                          >
                            <Sparkles size={9} strokeWidth={2.4} /> تتأقلم معكِ
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-foreground/60 mt-0.5 truncate">{c.short}</div>
                      <div className="flex items-center gap-3 mt-1.5 text-[10.5px] text-foreground/55 nums">
                        <span className="inline-flex items-center gap-1"><Clock size={10} /> {fmt(c.days)} يوم</span>
                        <span className="inline-flex items-center gap-1"><Users size={10} /> {fmt(c.joined)}</span>
                        <span className="inline-flex items-center gap-1" style={{ color: "var(--primary)" }}>
                          <Sparkles size={10} /> +{fmt(c.reward.bodyIQ)}
                        </span>
                      </div>
                    </div>
                    <ChevronLeft size={16} className="text-foreground/35 shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </ShellV2>
  );
}
