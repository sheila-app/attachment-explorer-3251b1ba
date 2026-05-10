import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { BottomNav } from "@/components/sheila/BottomNav";
import { CyclePhaseRing } from "@/components/sheila/CyclePhaseRing";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { FloatingDoodles } from "@/components/sheila/FloatingDoodles";
import { mockUser, mockWorkouts, PHASE_META } from "@/data/mock";
import { toAr } from "@/lib/format";
import { tierMeta, PHASE_WINDOWS } from "@/data/gamification";
import {
  Bell,
  Search,
  Flame,
  Moon,
  Droplets,
  Apple,
  Smile,
  Meh,
  Frown,
  Zap,
  Sparkles,
  Dumbbell,
  TrendingUp,
  ChevronLeft,
  Scale,
  Trophy,
  Users,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function card(delay: number) {
  return {
    initial: { opacity: 0, y: 16 } as const,
    animate: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.5, ease, delay },
  };
}

function HomePage() {
  const phase = PHASE_META[mockUser.currentPhase];
  const todayWorkout = mockWorkouts[0];
  const todayWorkoutPhaseMeta = PHASE_META[todayWorkout.phase];

  return (
    <DeviceFrame>
      <div className="relative h-full bg-background">
        <div className="absolute inset-0 pointer-events-none z-0">
          <LiquidBackdrop variant="energetic" />
          <FloatingDoodles />
        </div>

        <div className="relative z-10 h-full overflow-y-auto no-scrollbar pb-44">
          {/* ─── Header row ─── */}
          <div className="relative px-5 pt-7 pb-4">
            <motion.header
              className="relative flex items-center justify-between"
              {...card(0)}
            >
              {/* Greeting + name + streak */}
              <div>
                <p className="text-[10px] tracking-[0.3em] text-foreground/60 uppercase">
                  صباح الخير
                </p>
                <h1 className="font-display text-[28px] mt-1 leading-none">{mockUser.name}</h1>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-foreground/65">
                  <Flame size={11} strokeWidth={2} className="text-phase-menstrual" />
                  <span className="nums">{toAr(mockUser.streak)} أيام متتالية</span>
                </div>
              </div>

              {/* Header action buttons — Bell + Search only */}
              <div className="flex items-center gap-2">
                <Link
                  to="/search"
                  className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center"
                >
                  <Search size={18} strokeWidth={1.75} />
                </Link>
                <Link
                  to="/notifications"
                  className="relative w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center"
                >
                  <Bell size={18} strokeWidth={1.75} />
                  <span className="absolute w-2 h-2 bg-red-500 rounded-full -top-0.5 -end-0.5" />
                </Link>
              </div>
            </motion.header>
          </div>

          {/* ─── 1. Cycle ring card (FIRST) ─── */}
          <motion.div className="px-5 mb-3" {...card(0.05)}>
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-border p-5">
              <div className="flex justify-center">
                <CyclePhaseRing
                  phase={mockUser.currentPhase}
                  day={mockUser.cycleDay}
                  cycleLength={mockUser.cycleLength}
                  size={240}
                  showInnerFill={false}
                />
              </div>

              {/* Phase tabs */}
              <div className="mt-4 grid grid-cols-4 gap-1.5">
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

              {/* Phase description */}
              <div className="glass mt-4 px-4 py-3 rounded-xl">
                <p className="relative z-10 text-center text-[12.5px] text-foreground/80 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─── 2. Quick stats row ─── */}
          <motion.div className="px-5 mb-3" {...card(0.1)}>
            <div className="grid grid-cols-3 gap-2.5">
              <Link to="/checkin/sleep" className="block">
                <StatCard
                  icon={Moon}
                  label="نوم"
                  value={toAr("7.2")}
                  hint="ساعة"
                  color="var(--phase-luteal)"
                />
              </Link>
              <Link to="/checkin/water" className="block">
                <StatCard
                  icon={Droplets}
                  label="ماء"
                  value={`${toAr(6)}/${toAr(8)}`}
                  hint="كأس"
                  color="var(--primary)"
                />
              </Link>
              <Link to="/checkin" className="block">
                <StatCard
                  icon={Apple}
                  label="سعرات"
                  value={toAr(320)}
                  hint={`من ${toAr(1800)}`}
                  color="var(--phase-menstrual)"
                />
              </Link>
            </div>
          </motion.div>

          {/* ─── 3. Mood card ─── */}
          <motion.div className="px-5 mb-3" {...card(0.15)}>
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-border p-5 relative overflow-hidden">
              <div className="relative z-10 flex items-center justify-between">
                <h3 className="font-medium text-sm">كيف تشعرين اليوم؟</h3>
                <span className="text-[10px] text-foreground/60 nums">{toAr(10)} ثوانٍ</span>
              </div>
              <div className="relative z-10 flex justify-between mt-4 gap-1.5">
                {[
                  { label: "رائع", Icon: Smile, color: "var(--phase-follicular)" },
                  { label: "جيّد", Icon: Meh, color: "var(--phase-ovulation)" },
                  { label: "عادي", Icon: Frown, color: "var(--muted-foreground)" },
                  { label: "نشيط", Icon: Zap, color: "var(--phase-luteal)" },
                  { label: "تعب", Icon: Moon, color: "var(--phase-menstrual)" },
                ].map(({ label, Icon, color }) => (
                  <motion.button
                    key={label}
                    className="flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-lg bg-card/60 border border-border/60"
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon size={16} strokeWidth={1.75} style={{ color }} />
                    <span className="text-[10px]">{label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── 4. AI Insight card ─── */}
          <motion.div className="px-5 mb-3" {...card(0.2)}>
            <div className="bg-white/85 backdrop-blur-sm relative rounded-2xl border border-border p-5 overflow-hidden">
              <div className="relative z-10 flex items-start gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden"
                  style={{
                    background: "var(--gradient-primary)",
                    boxShadow:
                      "0 8px 20px -6px oklch(0.46 0.135 328 / 0.5), inset 0 1px 0 0 oklch(1 0 0 / 0.4)",
                  }}
                >
                  <Sparkles size={18} className="text-primary-foreground relative z-10" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">رؤية اليوم</h3>
                  <p className="text-[12.5px] text-foreground/75 mt-1.5 leading-relaxed">
                    أنتِ في ذروة الطاقة — مناسب جدّاً لتمرين عالي الكثافة مع وجبة غنيّة بالبروتين.
                  </p>
                  <button className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                    اعرفي المزيد
                    <ChevronLeft size={13} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── 5. Today's workout card ─── */}
          <motion.div className="px-5 mb-3" {...card(0.25)}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-sm">تمرين اليوم</h2>
              <Link
                to="/workouts"
                className="text-[11px] text-primary font-medium inline-flex items-center gap-0.5"
              >
                عرض الكل
                <ChevronLeft size={12} strokeWidth={2.5} />
              </Link>
            </div>
            <Link to="/workouts" className="block">
              <div className="bg-white/85 backdrop-blur-sm w-full rounded-xl border border-border p-3.5 flex items-center gap-3 transition-transform active:scale-[0.99]">
                <div
                  className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${todayWorkoutPhaseMeta.color}55, ${todayWorkoutPhaseMeta.color}22)`,
                    boxShadow:
                      "inset 0 1px 0 0 oklch(1 0 0 / 0.5), inset 0 -1px 0 0 oklch(0 0 0 / 0.05)",
                  }}
                >
                  <Dumbbell size={20} style={{ color: todayWorkoutPhaseMeta.color }} strokeWidth={1.75} className="relative" />
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <h3 className="text-[13.5px] font-medium truncate">{todayWorkout.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-foreground/60">
                    <span className="nums">{toAr(todayWorkout.duration)} د</span>
                    <span className="w-1 h-1 rounded-full bg-foreground/30" />
                    <span>{todayWorkout.level}</span>
                    <span className="w-1 h-1 rounded-full bg-foreground/30" />
                    <span className="nums">{toAr(todayWorkout.calories)} سعرة</span>
                  </div>
                </div>
                <ChevronLeft size={16} className="relative z-10 text-foreground/50" strokeWidth={2} />
              </div>
            </Link>
          </motion.div>

          {/* ─── 6. Shortcuts section ─── */}
          <motion.div className="mb-20" {...card(0.3)}>
            <p className="text-sm font-semibold text-muted-foreground px-5 mb-2">اختصارات سريعة</p>
            <div className="grid grid-cols-4 gap-3 px-5">
              <Link to="/journey/measurements" className="flex flex-col items-center gap-2 bg-white/85 backdrop-blur-sm rounded-2xl border border-border p-3 active:scale-95 transition-all">
                <Scale className="w-6 h-6 text-phase-ovulation" strokeWidth={1.75} />
                <span className="text-xs text-muted-foreground">الوزن</span>
              </Link>
              <Link to="/checkin/water" className="flex flex-col items-center gap-2 bg-white/85 backdrop-blur-sm rounded-2xl border border-border p-3 active:scale-95 transition-all">
                <Droplets className="w-6 h-6 text-blue-400" strokeWidth={1.75} />
                <span className="text-xs text-muted-foreground">ماء</span>
              </Link>
              <Link to="/challenges" className="flex flex-col items-center gap-2 bg-white/85 backdrop-blur-sm rounded-2xl border border-border p-3 active:scale-95 transition-all">
                <Trophy className="w-6 h-6 text-phase-luteal" strokeWidth={1.75} />
                <span className="text-xs text-muted-foreground">التحدي</span>
              </Link>
              <Link to="/community" className="flex flex-col items-center gap-2 bg-white/85 backdrop-blur-sm rounded-2xl border border-border p-3 active:scale-95 transition-all">
                <Users className="w-6 h-6 text-phase-follicular" strokeWidth={1.75} />
                <span className="text-xs text-muted-foreground">المجتمع</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ─── AI Floating Action Button ─── */}
        <motion.div
          className="absolute bottom-36 left-5 z-50"
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link
            to="/assistant"
            className="w-14 h-14 rounded-full flex items-center justify-center active:scale-95 transition-all"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "0 8px 24px -6px oklch(0.46 0.135 328 / 0.5), inset 0 1px 0 0 oklch(1 0 0 / 0.3)",
            }}
          >
            <Sparkles className="w-6 h-6 text-white" strokeWidth={2} />
          </Link>
        </motion.div>
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
    <div className="bg-white/70 backdrop-blur-md rounded-xl border border-white/50 p-3">
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
