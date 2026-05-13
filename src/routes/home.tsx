import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Bell, Search, Sparkles, Moon, Droplets, Apple, Smile, Meh, Frown, Zap,
  Dumbbell, TrendingUp, ChevronLeft, Scale, Trophy, Users, Clock, Flame,
} from "lucide-react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { BottomNav } from "@/components/sheila/BottomNav";
import { mockUser, mockWorkouts, PHASE_META, type CyclePhase } from "@/data/mock";
import { tierMeta, PHASE_WINDOWS } from "@/data/gamification";
import { toAr } from "@/lib/format";

export const Route = createFileRoute("/home")({ component: HomePage });

// تتابع المراحل حسب أيام الدورة
const PHASE_SEQ: { key: CyclePhase; days: number }[] = [
  { key: "menstrual", days: 5 },
  { key: "follicular", days: 8 },
  { key: "ovulation", days: 3 },
  { key: "luteal", days: 12 },
];

const DAY_LETTERS = ["ح", "ن", "ث", "ر", "خ", "ج", "س"]; // أحد..سبت
const MONTHS_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

function phaseForDay(day: number, cycleLength: number): CyclePhase {
  // normalize to 1..cycleLength
  let d = ((day - 1) % cycleLength + cycleLength) % cycleLength + 1;
  let acc = 0;
  for (const p of PHASE_SEQ) {
    acc += p.days;
    if (d <= acc) return p.key;
  }
  return "luteal";
}

function HomePage() {
  const cycleLength = mockUser.cycleLength;
  // offset 0 = today; negative = past, positive = future
  const [offset, setOffset] = useState(0);

  const day = useMemo(() => {
    const raw = ((mockUser.cycleDay - 1 + offset) % cycleLength + cycleLength) % cycleLength + 1;
    return raw;
  }, [offset, cycleLength]);

  const currentPhase: CyclePhase = useMemo(
    () => phaseForDay(day, cycleLength),
    [day, cycleLength]
  );
  const meta = PHASE_META[currentPhase];

  const todayWorkout = mockWorkouts[0];
  const todayWorkoutPhaseMeta = PHASE_META[todayWorkout.phase];
  const { tier, next, toNext, pctInTier } = tierMeta(mockUser.bodyIQ);
  const bodyIQDelta = mockUser.bodyIQ - mockUser.bodyIQYesterday;
  const win = PHASE_WINDOWS[mockUser.currentPhase];

  const ovulationStart = PHASE_SEQ[0].days + PHASE_SEQ[1].days + 1;
  const daysToOvulation = day < ovulationStart
    ? ovulationStart - day
    : cycleLength - day + ovulationStart;
  const daysLeftCycle = cycleLength - day;

  // التاريخ المعروض — يُحسَب على العميل فقط لتفادي عدم تطابق SSR
  const [mounted, setMounted] = useState(false);
  const [baseDate, setBaseDate] = useState<Date | null>(null);
  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setBaseDate(t);
    setMounted(true);
  }, []);

  const selectedDate = useMemo(() => {
    if (!baseDate) return null;
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + offset);
    return d;
  }, [baseDate, offset]);

  return (
    <DeviceFrame>
      <div
        className="relative h-full overflow-hidden transition-colors duration-700"
        style={{
          background: `linear-gradient(180deg, color-mix(in oklab, ${meta.color} 30%, white) 0%, color-mix(in oklab, ${meta.color} 12%, white) 50%, var(--background) 100%)`,
        }}
      >
        {/* هالات لونيّة ناعمة */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-24 -end-24 w-[420px] h-[420px] rounded-full blur-[90px] opacity-60 transition-colors duration-700"
            style={{ background: meta.color }}
          />
          <div
            className="absolute top-1/3 -start-24 w-[360px] h-[360px] rounded-full blur-[100px] opacity-40 transition-colors duration-700"
            style={{ background: `color-mix(in oklab, ${meta.color} 60%, white)` }}
          />
        </div>

        <div className="relative z-10 h-full overflow-y-auto no-scrollbar pb-28">
          {/* الرأس: الاسم (يمين) | التاريخ (وسط) | بحث+إشعارات (يسار) */}
          <div className="grid grid-cols-3 items-center px-5 pt-5 gap-3">
            <div className="min-w-0 justify-self-start">
              <div className="text-[11px] text-foreground/55 tracking-widest">مرحباً</div>
              <div className="font-display text-lg text-foreground/90 mt-0.5 truncate">
                {mockUser.name}
              </div>
            </div>

            <div className="text-center justify-self-center">
              <div className="font-display text-[15px] text-foreground/85 nums whitespace-nowrap">
                {selectedDate
                  ? `${toAr(selectedDate.getDate())} ${MONTHS_AR[selectedDate.getMonth()]}`
                  : "—"}
              </div>
              <div className="text-[10.5px] mt-0.5 font-medium whitespace-nowrap" style={{ color: meta.color }}>
                يوم {toAr(day)} · {meta.name}
              </div>
            </div>

            <div className="flex items-center gap-2 justify-self-end">
              <button className="w-10 h-10 rounded-full bg-white/70 backdrop-blur border border-white/60 flex items-center justify-center shadow-sm">
                <Search size={17} strokeWidth={1.75} className="text-foreground/75" />
              </button>
              <button className="relative w-10 h-10 rounded-full bg-white/70 backdrop-blur border border-white/60 flex items-center justify-center shadow-sm">
                <Bell size={17} strokeWidth={1.75} className="text-foreground/75" />
                <span className="absolute top-2 end-2 w-1.5 h-1.5 rounded-full bg-destructive" />
              </button>
            </div>
          </div>

          {/* شريط التاريخ القابل للسحب */}
          <DateStrip
            mounted={mounted}
            baseDate={baseDate}
            offset={offset}
            setOffset={setOffset}
            cycleLength={cycleLength}
            cycleDay={mockUser.cycleDay}
          />

          <div className="mt-6 flex items-center justify-center">
            <MultiPhaseRing
              size={300}
              day={day}
              cycleLength={cycleLength}
              currentPhase={currentPhase}
              centerTop="الإباضة بعد"
              centerBig={`${toAr(daysToOvulation)}`}
              centerSmall="أيام"
              chip={`متبقٍّ ${toAr(daysLeftCycle)} يوم`}
            />
          </div>

          {/* بطاقة وصف المرحلة */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-5 mt-8 rounded-2xl p-4 bg-white/75 backdrop-blur border border-white/60"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: meta.color }}
              />
              <div className="text-[13px] font-semibold" style={{ color: meta.color }}>
                {meta.name}
              </div>
            </div>
            <div className="text-[12.5px] text-foreground/70 leading-relaxed mt-2">
              {meta.description}
            </div>
          </motion.div>

          {/* ─── Body IQ + Phase Window row ─── */}
          <div className="px-5 mt-4 grid grid-cols-2 gap-2.5">
            <Link to="/bodyiq" className="bg-white/85 backdrop-blur-sm rounded-2xl border border-border p-4 active:scale-[0.98] transition-transform">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">Body IQ</span>
                <span className="inline-flex items-center gap-0.5 text-[10px] nums" style={{ color: bodyIQDelta >= 0 ? "var(--phase-follicular)" : "var(--phase-menstrual)" }}>
                  <TrendingUp size={10} strokeWidth={2.5} />
                  {bodyIQDelta >= 0 ? "+" : ""}{bodyIQDelta}
                </span>
              </div>
              <div className="font-display text-[26px] leading-none mt-1.5 nums" style={{ color: tier.color }}>{mockUser.bodyIQ}</div>
              <div className="text-[10.5px] font-semibold mt-1" style={{ color: tier.color }}>{tier.name}</div>
              <div className="mt-2 h-1 rounded-full bg-foreground/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pctInTier * 100}%`, background: tier.color }} />
              </div>
              {next && <div className="text-[9.5px] text-foreground/55 mt-1 nums">{toNext} للوصول إلى {next.name}</div>}
            </Link>

            <Link to="/challenges/phase" className="bg-white/85 backdrop-blur-sm rounded-2xl border border-border p-4 active:scale-[0.98] transition-transform">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">نافذة المرحلة</span>
                <span className="inline-flex items-center gap-0.5 text-[10px] nums" style={{ color: win.color }}>
                  <Clock size={10} strokeWidth={2.5} />
                  {win.days} ي
                </span>
              </div>
              <div className="font-display text-[16px] leading-tight mt-1.5" style={{ color: win.color }}>{win.name}</div>
              <div className="text-[10.5px] text-foreground/55 mt-1 nums">{win.challenges} تحدّيات متاحة</div>
              <div className="flex gap-1 mt-2.5">
                {Array.from({ length: Math.min(win.challenges || 1, 5) }).map((_, i) => (
                  <span key={i} className="flex-1 h-1 rounded-full" style={{ background: i < 2 ? win.color : "color-mix(in oklab, var(--foreground) 10%, transparent)" }} />
                ))}
              </div>
              <div className="inline-flex items-center gap-0.5 text-[10px] mt-2 font-semibold" style={{ color: win.color }}>
                ابدئي
                <ChevronLeft size={11} strokeWidth={2.5} />
              </div>
            </Link>
          </div>

          {/* ─── Quick stats row ─── */}
          <div className="px-5 mt-3 grid grid-cols-3 gap-2.5">
            <Link to="/checkin/sleep" className="block">
              <StatCard icon={Moon} label="نوم" value={toAr("7.2")} hint="ساعة" color="var(--phase-luteal)" />
            </Link>
            <Link to="/checkin/water" className="block">
              <StatCard icon={Droplets} label="ماء" value={`${toAr(6)}/${toAr(8)}`} hint="كأس" color="var(--primary)" />
            </Link>
            <Link to="/checkin" className="block">
              <StatCard icon={Apple} label="سعرات" value={toAr(320)} hint={`من ${toAr(1800)}`} color="var(--phase-menstrual)" />
            </Link>
          </div>

          {/* ─── Mood card ─── */}
          <div className="px-5 mt-3">
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
          </div>

          {/* ─── AI Insight card ─── */}
          <div className="px-5 mt-3">
            <div className="bg-white/85 backdrop-blur-sm relative rounded-2xl border border-border p-5 overflow-hidden">
              <div className="relative z-10 flex items-start gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden"
                  style={{
                    background: "var(--gradient-primary)",
                    boxShadow: "0 8px 20px -6px oklch(0.46 0.135 328 / 0.5), inset 0 1px 0 0 oklch(1 0 0 / 0.4)",
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
          </div>

          {/* ─── Today's workout ─── */}
          <div className="px-5 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-sm">تمرين اليوم</h2>
              <Link to="/workouts" className="text-[11px] text-primary font-medium inline-flex items-center gap-0.5">
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
                    boxShadow: "inset 0 1px 0 0 oklch(1 0 0 / 0.5), inset 0 -1px 0 0 oklch(0 0 0 / 0.05)",
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
          </div>

          {/* ─── Shortcuts ─── */}
          <div className="mt-5 mb-4">
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
          </div>

          <div className="h-6" />
        </div>

        <BottomNav />
      </div>
    </DeviceFrame>
  );
}

/* =========================================================
 * شريط التاريخ — قابل للسحب يمين/يسار، ملوّن حسب المرحلة
 * ========================================================= */
function DateStrip({
  mounted,
  baseDate,
  offset,
  setOffset,
  cycleLength,
  cycleDay,
}: {
  mounted: boolean;
  baseDate: Date | null;
  offset: number;
  setOffset: (n: number) => void;
  cycleLength: number;
  cycleDay: number;
}) {
  const RANGE = 30; // ٣٠ يوم لكل اتّجاه
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const lockRef = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = useMemo(() => {
    const arr: { offset: number; date: Date | null; phase: CyclePhase }[] = [];
    for (let i = -RANGE; i <= RANGE; i++) {
      const d = baseDate ? new Date(baseDate.getTime()) : null;
      if (d) d.setDate(baseDate!.getDate() + i);
      const phase = phaseForDay(cycleDay + i, cycleLength);
      arr.push({ offset: i, date: d, phase });
    }
    return arr;
  }, [baseDate, cycleDay, cycleLength]);

  // مزامنة السكرول مع offset عند التغيير الخارجي + توسيط اليوم عند التركيب
  useEffect(() => {
    if (!mounted) return;
    const el = scrollerRef.current;
    const item = itemRefs.current.get(offset);
    if (!el || !item) return;
    lockRef.current = true;
    const target =
      item.offsetLeft - el.clientWidth / 2 + item.clientWidth / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
    const t = setTimeout(() => (lockRef.current = false), 400);
    return () => clearTimeout(t);
  }, [offset, mounted]);

  // عند سحب المستخدم، اقرأ العنصر الأقرب للمركز
  const onScroll = () => {
    if (lockRef.current || !scrollerRef.current) return;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let bestOff = offset;
      let bestDist = Infinity;
      itemRefs.current.forEach((node, off) => {
        const c = node.offsetLeft + node.clientWidth / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) {
          bestDist = d;
          bestOff = off;
        }
      });
      if (bestOff !== offset) setOffset(bestOff);
    }, 80);
  };

  // سحب بالماوس / اللمس
  const dragRef = useRef<{ active: boolean; startX: number; startScroll: number; moved: boolean }>({
    active: false,
    startX: 0,
    startScroll: 0,
    moved: false,
  });

  const onPointerDown = (e: React.PointerEvent) => {
    if (!scrollerRef.current) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: scrollerRef.current.scrollLeft,
      moved: false,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active || !scrollerRef.current) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 3) d.moved = true;
    scrollerRef.current.scrollLeft = d.startScroll - dx;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current.active = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div className="mt-5 relative">

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none touch-pan-x"
        style={{ WebkitOverflowScrolling: "touch", paddingInline: "calc(50% - 24px)" }}
      >
        <div className="flex gap-2 py-1">
          {!mounted
            ? Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-12 h-16 rounded-2xl bg-white/40" />
              ))
            : items.map((it) => {
                const isSelected = it.offset === offset;
                const color = `var(--phase-${it.phase})`;
                return (
                  <button
                    key={it.offset}
                    ref={(el) => {
                      if (el) itemRefs.current.set(it.offset, el);
                      else itemRefs.current.delete(it.offset);
                    }}
                    onClick={() => {
                      if (dragRef.current.moved) return;
                      setOffset(it.offset);
                    }}
                    className="flex-shrink-0 w-12 rounded-2xl flex flex-col items-center justify-center gap-1 py-2 transition-all"
                    style={{
                      scrollSnapAlign: "center",
                      background: isSelected
                        ? color
                        : `color-mix(in oklab, ${color} 14%, white)`,
                      color: isSelected ? "white" : "var(--foreground)",
                      border: isSelected
                        ? "none"
                        : `1px solid color-mix(in oklab, ${color} 25%, transparent)`,
                      boxShadow: isSelected
                        ? `0 10px 22px -10px ${color}`
                        : undefined,
                      transform: isSelected ? "scale(1.06)" : "scale(1)",
                    }}
                  >
                    <span
                      className="text-[10px]"
                      style={{ opacity: isSelected ? 0.9 : 0.65 }}
                    >
                      {it.date ? DAY_LETTERS[it.date.getDay()] : "—"}
                    </span>
                    <span className="font-display text-[15px] nums leading-none">
                      {it.date ? toAr(it.date.getDate()) : "—"}
                    </span>
                    <span
                      className="w-1 h-1 rounded-full mt-0.5"
                      style={{
                        background: isSelected ? "white" : color,
                        opacity: isSelected ? 0.9 : 0.55,
                      }}
                    />
                  </button>
                );
              })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
 * بطاقة إحصائيّة سريعة
 * ========================================================= */
function QuickStat({
  icon,
  label,
  value,
  tint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tint: string;
}) {
  return (
    <div className="bg-white/75 backdrop-blur border border-white/60 rounded-2xl p-3.5">
      <div className="flex items-center gap-2">
        <span
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ background: `color-mix(in oklab, ${tint} 18%, white)`, color: tint }}
        >
          {icon}
        </span>
        <span className="text-[11.5px] text-foreground/60">{label}</span>
      </div>
      <div className="font-display text-lg mt-2 nums text-foreground/85">{value}</div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 mt-6 mb-2 flex items-center justify-between">
      <div className="text-[13px] font-semibold text-foreground/80">{children}</div>
      <button className="text-[11px] text-foreground/55">عرض الكلّ</button>
    </div>
  );
}

function Suggestion({
  icon,
  title,
  subtitle,
  tint,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tint: string;
}) {
  return (
    <div className="bg-white/75 backdrop-blur border border-white/60 rounded-2xl p-3.5 flex items-center gap-3">
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `color-mix(in oklab, ${tint} 18%, white)`, color: tint }}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-foreground/85 truncate">{title}</div>
        <div className="text-[11.5px] text-foreground/55 mt-0.5 truncate">{subtitle}</div>
      </div>
    </div>
  );
}

/* =========================================================
 * دائرة متعدّدة المراحل — أقواس بدون تقاطع
 * ========================================================= */
function MultiPhaseRing({
  size,
  day,
  cycleLength,
  currentPhase,
  centerTop,
  centerBig,
  centerSmall,
  chip,
}: {
  size: number;
  day: number;
  cycleLength: number;
  currentPhase: CyclePhase;
  centerTop: string;
  centerBig: string;
  centerSmall: string;
  chip: string;
}) {
  const stroke = 22;
  const r = (size - stroke) / 2 - 8;
  const cx = size / 2;
  const cy = size / 2;
  const C = 2 * Math.PI * r;
  const meta = PHASE_META[currentPhase];

  // فجوة ثابتة بين الأقواس بالبكسل
  const GAP = 6;
  let cumulative = 0;
  const arcs = PHASE_SEQ.map((p) => {
    const segLen = (p.days / cycleLength) * C;
    const start = (cumulative / cycleLength) * C + GAP / 2;
    const length = Math.max(segLen - GAP, 0);
    cumulative += p.days;
    return { ...p, start, length };
  });

  // موضع المؤشّر
  const angleDeg = ((day - 1) / cycleLength) * 360 - 90;
  const angleRad = (angleDeg * Math.PI) / 180;
  const knobX = cx + r * Math.cos(angleRad);
  const knobY = cy + r * Math.sin(angleRad);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute inset-10 rounded-full blur-2xl opacity-40 transition-colors duration-700"
        style={{ background: `radial-gradient(circle, ${meta.color}, transparent 70%)` }}
      />

      <svg width={size} height={size} className="relative">
        {/* مسار خلفي */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="white"
          strokeOpacity="0.55"
          strokeWidth={stroke}
        />

        {/* الأقواس — strokeLinecap=butt لمنع التداخل */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {arcs.map((a) => (
            <circle
              key={a.key}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={`var(--phase-${a.key})`}
              strokeWidth={stroke}
              strokeLinecap="butt"
              strokeDasharray={`${a.length} ${C}`}
              strokeDashoffset={-a.start}
              opacity={a.key === currentPhase ? 1 : 0.5}
              style={{ transition: "opacity 0.5s ease" }}
            />
          ))}
        </g>

        {/* مؤشّر اليوم */}
        <circle cx={knobX} cy={knobY} r={14} fill="white" />
        <circle
          cx={knobX}
          cy={knobY}
          r={14}
          fill="none"
          stroke={meta.color}
          strokeWidth={3}
        />
        <circle cx={knobX} cy={knobY} r={4} fill={meta.color} />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="text-[12px] text-foreground/65">{centerTop}</div>
        <div className="font-display text-5xl mt-1 nums" style={{ color: meta.color }}>
          {centerBig}
          <span className="text-base text-foreground/55 font-normal me-2">{centerSmall}</span>
        </div>
        <div
          className="mt-3 px-3 py-1 rounded-full text-[11px] border bg-white/70 backdrop-blur"
          style={{ borderColor: `color-mix(in oklab, ${meta.color} 50%, transparent)`, color: meta.color }}
        >
          {chip}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon, label, value, hint, color,
}: {
  icon: typeof Flame; label: string; value: string; hint: string; color: string;
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
