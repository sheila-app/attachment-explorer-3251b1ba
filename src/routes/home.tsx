import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { BottomNav } from "@/components/sheila/BottomNav";
import { CyclePhaseRing } from "@/components/sheila/CyclePhaseRing";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { FloatingDoodles } from "@/components/sheila/FloatingDoodles";
import { mockUser, mockWorkouts, PHASE_META } from "@/data/mock";
import { toAr } from "@/lib/format";
import { Bell, Sparkles, Flame, Droplet, Moon, ChevronLeft, Activity } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

function HomePage() {
  const phase = PHASE_META[mockUser.currentPhase];

  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen overflow-hidden">
        <LiquidBackdrop variant="energetic" />
        <FloatingDoodles />

        <div className="relative z-10 h-full min-h-screen overflow-y-auto no-scrollbar pb-28">
          {/* Hero */}
          <div className="relative px-5 pt-7 pb-6">
            <header className="relative flex items-center justify-between animate-rise">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-foreground/60 uppercase">
                  صباح الخير
                </p>
                <h1 className="font-display text-[28px] mt-1 leading-none">{mockUser.name}</h1>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-foreground/65">
                  <Activity size={11} strokeWidth={2} />
                  <span className="nums">{toAr(mockUser.streak)} أيام متتالية</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link to="/search" className="glass w-11 h-11 rounded-xl flex items-center justify-center">
                  <Sparkles size={16} strokeWidth={1.75} className="relative z-10" />
                </Link>
                <Link to="/assistant" className="glass w-11 h-11 rounded-xl flex items-center justify-center">
                  <span className="relative z-10 text-[10px] font-display text-primary">AI</span>
                </Link>
                <Link to="/notifications" className="glass relative w-11 h-11 rounded-xl flex items-center justify-center">
                  <Bell size={17} strokeWidth={1.75} className="relative z-10" />
                  <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-phase-menstrual z-10" />
                </Link>
              </div>
            </header>

            <div
              className="relative flex justify-center mt-7 animate-rise"
              style={{ animationDelay: "0.15s" }}
            >
              <CyclePhaseRing
                phase={mockUser.currentPhase}
                day={mockUser.cycleDay}
                cycleLength={mockUser.cycleLength}
                size={240}
              />
            </div>

            <div
              className="relative flex justify-center mt-7 animate-rise"
              style={{ animationDelay: "0.15s" }}
            >
              <CyclePhaseRing
                phase={mockUser.currentPhase}
                day={mockUser.cycleDay}
                cycleLength={mockUser.cycleLength}
                size={240}
              />
            </div>

            {/* Phase legend — أسماء المراحل بألوانها */}
            <div
              className="mt-4 grid grid-cols-4 gap-1.5 px-1 animate-rise"
              style={{ animationDelay: "0.22s" }}
            >
              {(
                [
                  { key: "menstrual", name: "الحيض" },
                  { key: "follicular", name: "الجريبية" },
                  { key: "ovulation", name: "الإباضة" },
                  { key: "luteal", name: "الأصفرية" },
                ] as const
              ).map(({ key, name }) => {
                const active = mockUser.currentPhase === key;
                return (
                  <div
                    key={key}
                    className="glass rounded-lg px-2 py-2 flex flex-col items-center gap-1 text-center transition-all"
                    style={{
                      borderColor: active ? `var(--phase-${key})` : undefined,
                      boxShadow: active
                        ? `0 6px 16px -8px var(--phase-${key}), inset 0 0 0 1px var(--phase-${key})`
                        : undefined,
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: `var(--phase-${key})`,
                        boxShadow: active
                          ? `0 0 0 3px color-mix(in oklab, var(--phase-${key}) 25%, transparent)`
                          : undefined,
                      }}
                    />
                    <span
                      className="text-[10.5px] leading-tight"
                      style={{
                        color: active ? `var(--phase-${key})` : "var(--color-foreground)",
                        fontWeight: active ? 600 : 400,
                        opacity: active ? 1 : 0.7,
                      }}
                    >
                      {name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick stats */}
          <div className="px-5 mt-2">
            <div className="grid grid-cols-3 gap-2.5 stagger">
              <Link to="/checkin" className="block">
                <StatCard icon={Flame} label="سعرات" value={toAr(320)} hint={`من ${toAr(1800)}`} color="var(--phase-menstrual)" />
              </Link>
              <Link to="/checkin/water" className="block">
                <StatCard icon={Droplet} label="ماء" value={`${toAr(6)}/${toAr(8)}`} hint="كأس" color="var(--primary)" />
              </Link>
              <Link to="/checkin/sleep" className="block">
                <StatCard icon={Moon} label="نوم" value={toAr("7.2")} hint="ساعة" color="var(--phase-luteal)" />
              </Link>
            </div>
          </div>

          {/* AI Insight */}
          <div className="px-5 mt-6 animate-rise">
            <div className="glass-strong relative rounded-2xl p-5 overflow-hidden">
              {/* رسم زخرفي خفيف داخل الكرت */}
              <svg
                className="absolute -top-6 -left-6 opacity-30 pointer-events-none"
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
              >
                <circle cx="60" cy="60" r="50" stroke="var(--primary-glow)" strokeWidth="0.8" strokeDasharray="2 4" />
                <circle cx="60" cy="60" r="30" stroke="var(--primary)" strokeWidth="0.6" strokeDasharray="1 3" />
              </svg>
              <div className="relative z-10 flex items-start gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden"
                  style={{
                    background: "var(--gradient-primary)",
                    boxShadow:
                      "0 8px 20px -6px oklch(0.46 0.135 328 / 0.5), inset 0 1px 0 0 oklch(1 0 0 / 0.4)",
                  }}
                >
                  <Sparkles
                    size={18}
                    className="text-primary-foreground relative z-10"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">رؤية اليوم</h3>
                    <span
                      className="text-[9px] tracking-wider px-1.5 py-0.5 rounded-md uppercase"
                      style={{
                        background: "oklch(0.46 0.135 328 / 0.15)",
                        color: "var(--primary-deep)",
                      }}
                    >
                      AI
                    </span>
                  </div>
                  <p className="text-[12.5px] text-foreground/75 mt-1.5 leading-relaxed">
                    أنتِ في ذروة الطاقة. مناسب جدّاً لتمرين عالي الكثافة اليوم، مع وجبة غنيّة
                    بالبروتين بعدها.
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
                <p className="text-[11px] text-foreground/60 mt-0.5">مختارة لمرحلتكِ الحالية</p>
              </div>
              <Link
                to="/screens"
                className="text-[11px] text-primary font-medium inline-flex items-center gap-0.5"
              >
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
                    className="glass w-full rounded-xl p-3.5 flex items-center gap-3 text-right transition-transform active:scale-[0.99]"
                  >
                    <div
                      className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${wp.color}55, ${wp.color}22)`,
                        boxShadow:
                          "inset 0 1px 0 0 oklch(1 0 0 / 0.5), inset 0 -1px 0 0 oklch(0 0 0 / 0.05)",
                      }}
                    >
                      {/* رسم زخرفي صغير خلف الأيقونة */}
                      <svg className="absolute inset-0 opacity-50" viewBox="0 0 56 56" fill="none">
                        <circle cx="28" cy="28" r="20" stroke={wp.color} strokeWidth="0.6" strokeDasharray="2 3" />
                      </svg>
                      <Flame size={20} style={{ color: wp.color }} strokeWidth={1.75} className="relative" />
                    </div>
                    <div className="relative z-10 flex-1 min-w-0">
                      <h3 className="text-[13.5px] font-medium truncate">{w.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-foreground/60">
                        <span className="nums">{toAr(w.duration)} د</span>
                        <span className="w-1 h-1 rounded-full bg-foreground/30" />
                        <span>{w.level}</span>
                        <span className="w-1 h-1 rounded-full bg-foreground/30" />
                        <span className="nums">{toAr(w.calories)} سعرة</span>
                      </div>
                    </div>
                    <ChevronLeft
                      size={16}
                      className="relative z-10 text-foreground/50"
                      strokeWidth={2}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily check-in */}
          <div className="px-5 mt-7 animate-rise">
            <div className="glass rounded-2xl p-5 relative overflow-hidden">
              {/* خط متموّج زخرفي */}
              <svg
                className="absolute bottom-2 left-2 opacity-30 pointer-events-none"
                width="120"
                height="20"
                viewBox="0 0 120 20"
                fill="none"
              >
                <path d="M2 10 Q 15 2, 30 10 T 60 10 T 90 10 T 118 10" stroke="var(--primary-glow)" strokeWidth="1" fill="none" />
              </svg>
              <div className="relative z-10 flex items-center justify-between">
                <h3 className="font-medium text-sm">كيف تشعرين اليوم؟</h3>
                <span className="text-[10px] text-foreground/60 nums">{toAr(10)} ثوان</span>
              </div>
              <div className="relative z-10 flex justify-between mt-4 gap-1.5">
                {[
                  { mood: "رائع", color: "var(--phase-follicular)" },
                  { mood: "جيّد", color: "var(--phase-ovulation)" },
                  { mood: "عادي", color: "var(--muted-foreground)" },
                  { mood: "متعب", color: "var(--phase-luteal)" },
                  { mood: "صعب", color: "var(--phase-menstrual)" },
                ].map(({ mood, color }) => (
                  <button
                    key={mood}
                    className="flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-lg transition-transform active:scale-95"
                    style={{
                      background: "oklch(1 0 0 / 0.4)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid oklch(1 0 0 / 0.5)",
                      boxShadow: "inset 0 1px 0 0 oklch(1 0 0 / 0.6)",
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[11px]">{mood}</span>
                  </button>
                ))}
              </div>
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
    <div className="glass rounded-xl p-3">
      <div className="relative z-10 flex items-center justify-between mb-1.5">
        <Icon size={14} style={{ color }} strokeWidth={2} />
        <span className="text-[9px] tracking-wider text-foreground/55 uppercase">{label}</span>
      </div>
      <div className="relative z-10 flex items-baseline gap-1">
        <span className="text-lg font-semibold nums">{value}</span>
        <span className="text-[10px] text-foreground/55">{hint}</span>
      </div>
    </div>
  );
}
