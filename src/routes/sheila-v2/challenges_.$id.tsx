import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Clock, Users, Sparkles, Trophy, Check, Flame, Award } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { CHALLENGES, ACTIVE_CHALLENGE } from "@/data/sheila-v2";
import { fmt } from "@/lib/format";

export const Route = createFileRoute("/sheila-v2/challenges_/$id")({ component: Detail });

function Detail() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const c = CHALLENGES.find((x) => x.id === id);
  if (!c) {
    return (
      <ShellV2 title="التحدّي" back="/sheila-v2/challenges" showFAB={false}>
        <div className="px-5 text-center text-foreground/60 text-[12.5px] mt-10">لا يوجد تحدٍّ بهذا المعرّف.</div>
      </ShellV2>
    );
  }

  const isActive = c.id === ACTIVE_CHALLENGE.id;
  const currentDay = isActive ? ACTIVE_CHALLENGE.currentDay : 0;

  return (
    <ShellV2 title={c.title} back="/sheila-v2/challenges" showFAB={false}>
      <div className="px-5 pb-6 space-y-4">
        {/* Hero */}
        <div className="rounded-3xl p-5 relative overflow-hidden" style={{ background: "var(--gradient-primary, var(--primary))" }}>
          <div className="absolute -top-8 -end-8 w-32 h-32 rounded-full bg-white/15 blur-2xl" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
              <Flame size={26} strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] text-white/75 tracking-wider">{c.type}{c.adaptive ? " • تتأقلم مع دورتك" : ""}</div>
              <h2 className="font-display text-[19px] text-white leading-tight">{c.title}</h2>
            </div>
          </div>

          <p className="relative z-10 text-[12.5px] text-white/90 leading-relaxed mt-3">{c.desc}</p>

          <div className="relative z-10 grid grid-cols-3 gap-2 mt-4">
            {[
              { v: fmt(c.days), l: "يوم" },
              { v: fmt(c.minutesPerDay), l: "دقيقة/يوم" },
              { v: fmt(c.joined), l: "منضمّة" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/15 backdrop-blur px-3 py-2.5 text-center">
                <div className="font-display text-[16px] text-white nums leading-none">{s.v}</div>
                <div className="text-[9.5px] text-white/75 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* المكافأة */}
        <div className="rounded-2xl bg-primary-soft border border-primary/15 p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
            <Award size={18} strokeWidth={1.9} />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-primary">{c.reward.badge}</div>
            <div className="text-[11px] text-foreground/65 mt-0.5">عند الإكمال</div>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-primary nums">
            <Sparkles size={11} /> +{fmt(c.reward.bodyIQ)} Body IQ
          </div>
        </div>

        {/* جدول الأيّام */}
        <div className="rounded-2xl bg-white/85 border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-display text-[14px]">جدول الأيّام</div>
            <div className="text-[10.5px] text-foreground/55 nums">{fmt(c.schedule.length)} محطّة</div>
          </div>
          <div className="space-y-2">
            {c.schedule.map((d) => {
              const done = currentDay > d.day;
              const today = currentDay === d.day;
              return (
                <div
                  key={d.day}
                  className="flex items-center gap-3 rounded-xl px-2.5 py-2"
                  style={today ? { background: "color-mix(in oklab, var(--primary) 8%, transparent)" } : undefined}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[11.5px] font-semibold nums shrink-0"
                    style={
                      done
                        ? { background: "var(--gradient-primary, var(--primary))", color: "white" }
                        : today
                        ? { background: "var(--primary)", color: "white" }
                        : { background: "color-mix(in oklab, var(--foreground) 6%, transparent)", color: "var(--foreground)" }
                    }
                  >
                    {done ? <Check size={14} strokeWidth={2.6} /> : fmt(d.day)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-medium truncate">{d.title}</div>
                    <div className="text-[10.5px] text-foreground/55 truncate">{d.note}</div>
                  </div>
                  <div className="text-[10.5px] text-foreground/55 nums shrink-0 inline-flex items-center gap-1">
                    <Clock size={10} /> {fmt(d.min)}د
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* احصائيات سريعة */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl bg-white/85 border border-border p-3 flex items-center gap-2.5">
            <Users size={16} className="text-foreground/60" />
            <div>
              <div className="font-display text-[14px] nums leading-none">{fmt(c.joined)}</div>
              <div className="text-[10px] text-foreground/55 mt-0.5">منضمّة الآن</div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/85 border border-border p-3 flex items-center gap-2.5">
            <Trophy size={16} className="text-foreground/60" />
            <div>
              <div className="font-display text-[14px] leading-none">{c.adaptive ? "تتأقلم" : "ثابت"}</div>
              <div className="text-[10px] text-foreground/55 mt-0.5">حسب مرحلتك</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => nav({ to: "/sheila-v2/circle" })}
          className="w-full rounded-full py-3.5 font-semibold text-white text-[13.5px]"
          style={{ background: "var(--gradient-primary, var(--primary))" }}
        >
          {isActive ? "سجّلي اليوم" : "انضمّي للتحدّي"}
        </button>

        <Link to="/sheila-v2/circle" className="block text-center text-[11px] text-foreground/55">
          شاركي التحدّي في دائرة شيلا
        </Link>
      </div>
    </ShellV2>
  );
}
