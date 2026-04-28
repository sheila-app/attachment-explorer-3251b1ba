import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { BottomNav } from "@/components/sheila/BottomNav";
import { CyclePhaseRing } from "@/components/sheila/CyclePhaseRing";
import { mockUser, mockWorkouts, PHASE_META } from "@/data/mock";
import { Bell, Sparkles, Flame, Droplet, Moon, ChevronLeft, Activity } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

function HomePage() {
  const phase = PHASE_META[mockUser.currentPhase];

  return (
    <DeviceFrame>
      <div className="h-full min-h-screen overflow-y-auto no-scrollbar pb-24 bg-background">
        {/* Hero */}
        <div
          className="relative px-5 pt-7 pb-8 grain"
          style={{
            background: `linear-gradient(180deg, ${phase.soft} 0%, var(--background) 85%)`,
          }}
        >
          {/* Decorative arcs */}
          <svg className="absolute top-0 right-0 w-48 h-48 opacity-[0.08]" viewBox="0 0 200 200">
            <circle cx="200" cy="0" r="180" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
            <circle cx="200" cy="0" r="140" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
            <circle cx="200" cy="0" r="100" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
          </svg>

          <header className="relative flex items-center justify-between animate-rise">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">صباح الخير</p>
              <h1 className="font-display text-[28px] mt-1 leading-none">{mockUser.name}</h1>
              <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Activity size={11} strokeWidth={2} />
                <span className="nums">{mockUser.streak} أيام متتالية</span>
              </div>
            </div>
            <button className="relative w-11 h-11 rounded-2xl bg-surface border border-border/60 flex items-center justify-center shadow-[var(--shadow-xs)]">
              <Bell size={17} strokeWidth={1.75} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-phase-menstrual" />
            </button>
          </header>

          <div className="relative flex justify-center mt-7 animate-rise" style={{ animationDelay: "0.15s" }}>
            <CyclePhaseRing
              phase={mockUser.currentPhase}
              day={mockUser.cycleDay}
              cycleLength={mockUser.cycleLength}
              size={240}
            />
          </div>

          <p className="relative text-center text-[13px] text-foreground/70 mt-5 px-6 leading-relaxed animate-rise" style={{ animationDelay: "0.3s" }}>
            {phase.description}
          </p>
        </div>

        {/* Quick stats */}
        <div className="px-5 -mt-3 relative z-10">
          <div className="grid grid-cols-3 gap-2.5 stagger">
            <StatCard icon={Flame} label="سعرات" value="320" hint="من ١٨٠٠" color="var(--phase-menstrual)" />
            <StatCard icon={Droplet} label="ماء" value="٦/٨" hint="كأس" color="var(--primary)" />
            <StatCard icon={Moon} label="نوم" value="٧.٢" hint="ساعة" color="var(--phase-luteal)" />
          </div>
        </div>

        {/* AI Insight */}
        <div className="px-5 mt-6 animate-rise">
          <div
            className="relative rounded-3xl p-5 overflow-hidden border border-primary/10"
            style={{
              background: "linear-gradient(135deg, var(--primary-soft) 0%, var(--surface) 100%)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative flex items-start gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
              >
                <Sparkles size={18} className="text-primary-foreground" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm">رؤية اليوم</h3>
                  <span className="text-[9px] tracking-wider px-1.5 py-0.5 rounded-md bg-primary/10 text-primary uppercase">AI</span>
                </div>
                <p className="text-[12.5px] text-foreground/75 mt-1.5 leading-relaxed">
                  أنتِ في ذروة الطاقة. مناسب جدّاً لتمرين عالي الكثافة اليوم، مع وجبة غنيّة بالبروتين بعدها.
                </p>
                <button className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                  اعرفي المزيد
                  <ChevronLeft size={13} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended workouts */}
        <div className="px-5 mt-7">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-medium text-sm">تمارين موصى بها</h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">مختارة لمرحلتكِ الحالية</p>
            </div>
            <Link to="/screens" className="text-[11px] text-primary font-medium inline-flex items-center gap-0.5">
              عرض الكل
              <ChevronLeft size={12} strokeWidth={2.5} />
            </Link>
          </div>
          <div className="space-y-2.5 stagger">
            {mockWorkouts.slice(0, 3).map((w) => {
              const wp = PHASE_META[w.phase];
              return (
                <button
                  key={w.id}
                  className="w-full bg-card rounded-2xl p-3.5 border border-border/60 flex items-center gap-3 text-right transition-transform active:scale-[0.99]"
                  style={{ boxShadow: "var(--shadow-xs)" }}
                >
                  <div
                    className="relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${wp.soft}, ${wp.color}22)` }}
                  >
                    <Flame size={20} style={{ color: wp.color }} strokeWidth={1.75} />
                    <div className="absolute inset-0 border border-white/40 rounded-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13.5px] font-medium truncate">{w.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                      <span className="nums">{w.duration} د</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span>{w.level}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span className="nums">{w.calories} سعرة</span>
                    </div>
                  </div>
                  <ChevronLeft size={16} className="text-muted-foreground" strokeWidth={2} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily check-in */}
        <div className="px-5 mt-7 animate-rise">
          <div className="rounded-3xl p-5 bg-card border border-border/60" style={{ boxShadow: "var(--shadow-xs)" }}>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">كيف تشعرين اليوم؟</h3>
              <span className="text-[10px] text-muted-foreground">١٠ ثوان</span>
            </div>
            <div className="flex justify-between mt-4 gap-1.5">
              {[
                { mood: "رائع", color: "var(--phase-follicular)" },
                { mood: "جيّد", color: "var(--phase-ovulation)" },
                { mood: "عادي", color: "var(--muted-foreground)" },
                { mood: "متعب", color: "var(--phase-luteal)" },
                { mood: "صعب", color: "var(--phase-menstrual)" },
              ].map(({ mood, color }) => (
                <button
                  key={mood}
                  className="flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl bg-surface-warm border border-border/40 transition-transform active:scale-95"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[11px]">{mood}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </DeviceFrame>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  color,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
  hint: string;
  color: string;
}) {
  return (
    <div
      className="bg-card rounded-2xl p-3 border border-border/60"
      style={{ boxShadow: "var(--shadow-xs)" }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <Icon size={14} style={{ color }} strokeWidth={2} />
        <span className="text-[9px] tracking-wider text-muted-foreground uppercase">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold nums">{value}</span>
        <span className="text-[10px] text-muted-foreground">{hint}</span>
      </div>
    </div>
  );
}
