import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Bell, Search, Sparkles, Droplets, Moon, Apple, Dumbbell, Users, Trophy, Plus, Check, ChevronLeft } from "lucide-react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { BottomNav } from "@/components/sheila/BottomNav";
import { TierBadge } from "@/components/sheila-v2/TierBadge";
import { mockUser, mockWorkouts, mockMeals, PHASE_META, type CyclePhase } from "@/data/mock";
import { DAILY_MESSAGES, tierFor } from "@/data/sheila-v2";
import { toAr } from "@/lib/format";

export const Route = createFileRoute("/home-draft")({ component: HomeDraft });

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

function HomeDraft() {
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
          <div className="flex items-center justify-between px-5 pt-5 gap-3">
            <Link to="/profile" className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 border border-white/70 shadow-sm relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${meta.color}, color-mix(in oklab, ${meta.color} 50%, white))`,
                }}
              >
                <span className="font-display text-white text-[15px]">{mockUser.name.slice(0, 1)}</span>
                <span className="absolute -bottom-0.5 -end-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
              </div>
              <div className="min-w-0">
                <div className="text-[10.5px] text-foreground/55 tracking-widest">مرحباً</div>
                <div className="font-display text-[15px] text-foreground/90 leading-tight truncate">
                  {mockUser.name}
                </div>
              </div>
            </Link>

            <div className="text-center flex-1">
              <div className="font-display text-[15px] text-foreground/85 nums">
                {selectedDate
                  ? `${toAr(selectedDate.getDate())} ${MONTHS_AR[selectedDate.getMonth()]}`
                  : "—"}
              </div>
              <div className="text-[10.5px] mt-0.5 font-medium" style={{ color: meta.color }}>
                يوم {toAr(day)} · {meta.name}
              </div>
            </div>

            <div className="flex items-center gap-2">
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

          {/* رسالة شيلا الصباحيّة */}
          <DailyMessageCard phase={currentPhase} tint={meta.color} />

          {/* Body IQ + إحصاءات حيّة */}
          <BodyIQStats tint={meta.color} />

          {/* خطّة اليوم — تمرين + وجبة مناسبيْن للمرحلة */}
          <TodayPlan phase={currentPhase} tint={meta.color} />

          {/* دائرة شيلا */}
          <div className="px-5 mt-5">
            <Link
              to="/community"
              className="block rounded-2xl p-4 relative overflow-hidden border"
              style={{
                background: `linear-gradient(135deg, color-mix(in oklab, ${meta.color} 18%, white), color-mix(in oklab, ${meta.color} 6%, white))`,
                borderColor: `color-mix(in oklab, ${meta.color} 22%, transparent)`,
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/75 flex items-center justify-center shrink-0">
                  <Users size={18} style={{ color: meta.color }} strokeWidth={1.9} />
                </div>
                <div className="flex-1">
                  <div className="text-[13.5px] font-semibold">دائرة شيلا</div>
                  <div className="text-[11px] text-foreground/65 mt-0.5">٣ منشورات جديدة من مجموعاتك اليوم</div>
                </div>
                <ChevronLeft size={16} className="text-foreground/40 mt-1.5" />
              </div>
            </Link>
          </div>

          {/* اختصارات */}
          <div className="px-5 mt-4 grid grid-cols-4 gap-2.5">
            <Shortcut to="/achievements" icon={Trophy} label="الإنجازات" color="oklch(0.78 0.14 75)" />
            <Shortcut to="/cycle" icon={Sparkles} label="الدورة" color="var(--phase-luteal)" />
            <Shortcut to="/journey/insights" icon={Sparkles} label="الرؤى" color="var(--primary)" />
            <Shortcut to="/buddy" icon={Users} label="شريك" color="var(--phase-follicular)" />
          </div>

          <SectionTitle>جدول الأسبوع</SectionTitle>
          <div className="px-5 space-y-2">
            {[
              { t: "موعد طبيب", d: "الثلاثاء · ١٠ صباحاً" },
              { t: "تمرين يوغا", d: "الأربعاء · ٦ مساءً" },
              { t: "تذكير مكمّلات", d: "كلّ يوم · ٩ صباحاً" },
              { t: "جلسة تأمّل", d: "الجمعة · ٧ مساءً" },
            ].map((it, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white/70 backdrop-blur border border-white/60 rounded-2xl px-4 py-3"
              >
                <div>
                  <div className="text-[13px] font-medium text-foreground/85">{it.t}</div>
                  <div className="text-[11.5px] text-foreground/55 mt-0.5">{it.d}</div>
                </div>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium"
                  style={{ background: `color-mix(in oklab, ${meta.color} 18%, white)`, color: meta.color }}
                >
                  ↗
                </span>
              </div>
            ))}
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 mt-6 mb-2 flex items-center justify-between">
      <div className="text-[13px] font-semibold text-foreground/80">{children}</div>
      <button className="text-[11px] text-foreground/55">عرض الكلّ</button>
    </div>
  );
}

/* =========================================================
 * رسالة شيلا الصباحيّة
 * ========================================================= */
function DailyMessageCard({ phase, tint }: { phase: CyclePhase; tint: string }) {
  const message = DAILY_MESSAGES[phase][0];
  return (
    <div className="px-5 mt-4">
      <div className="rounded-2xl p-4 relative overflow-hidden bg-white/80 backdrop-blur border border-white/60">
        <div className="relative z-10 flex items-center gap-2 mb-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${tint}, color-mix(in oklab, ${tint} 60%, white))` }}
          >
            <Sparkles size={13} className="text-white" strokeWidth={2.2} />
          </div>
          <div className="text-[11px] font-semibold" style={{ color: tint }}>رسالة شيلا الصباحيّة</div>
        </div>
        <p className="relative z-10 text-[13px] leading-[1.85] text-foreground/85">{message}</p>
      </div>
    </div>
  );
}

/* =========================================================
 * Body IQ + إحصاءات اليوم (ماء قابل للزيادة)
 * ========================================================= */
function BodyIQStats({ tint }: { tint: string }) {
  const [waterCups, setWaterCups] = useState(6);
  const waterTarget = 8;
  const tier = tierFor(mockUser.bodyIQ);
  const caloriesToday = 1240;
  const proteinToday = 68;

  return (
    <div className="px-5 mt-4 grid grid-cols-[auto_1fr] gap-3 items-center">
      <Link to="/bodyiq" className="block">
        <TierBadge score={mockUser.bodyIQ} size="md" />
        <div className="text-center mt-1.5 text-[10.5px] font-semibold" style={{ color: tier.color }}>{tier.name}</div>
      </Link>
      <div className="grid grid-cols-2 gap-2">
        <StatTile icon={Apple} label="سعرات" value={`${toAr(caloriesToday)}`} hint={`من ${toAr(mockUser.dailyKcal)}`} color="var(--phase-menstrual)" to="/nutrition" />
        <button
          type="button"
          onClick={() => setWaterCups((c) => Math.min(c + 1, waterTarget))}
          className="rounded-2xl bg-white/85 border border-white/60 p-3 active:scale-[0.97] transition-transform text-right"
        >
          <div className="flex items-center gap-1.5">
            <Droplets size={12} style={{ color: tint }} strokeWidth={2} />
            <span className="text-[10px] text-foreground/55">ماء +</span>
          </div>
          <div className="font-display text-[18px] mt-1 leading-none nums" style={{ color: tint }}>
            {toAr(waterCups)}/{toAr(waterTarget)}
          </div>
          <div className="text-[9.5px] text-foreground/50 mt-0.5">اضغطي +</div>
        </button>
        <StatTile icon={Moon} label="نوم" value={`${toAr(7)}`} hint="ساعة" color="var(--phase-luteal)" to="/journey/insights" />
        <StatTile
          icon={Dumbbell}
          label="بروتين"
          value={`${toAr(proteinToday)}/${toAr(mockUser.dailyProtein)}`}
          hint="غرام"
          color="var(--phase-follicular)"
          to="/nutrition"
        />
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon, label, value, hint, color, to,
}: {
  icon: typeof Moon; label: string; value: string; hint: string; color: string; to: string;
}) {
  return (
    <Link to={to} className="rounded-2xl bg-white/85 border border-white/60 p-3 active:scale-[0.97] transition-transform">
      <div className="flex items-center gap-1.5">
        <Icon size={12} style={{ color }} strokeWidth={2} />
        <span className="text-[10px] text-foreground/55">{label}</span>
      </div>
      <div className="font-display text-[18px] mt-1 leading-none nums" style={{ color }}>{value}</div>
      <div className="text-[9.5px] text-foreground/50 mt-0.5">{hint}</div>
    </Link>
  );
}

/* =========================================================
 * خطّة اليوم — تمرين + وجبة مناسبة للمرحلة
 * ========================================================= */
function TodayPlan({ phase, tint }: { phase: CyclePhase; tint: string }) {
  const workout = useMemo(
    () => mockWorkouts.find((w) => w.phase === phase) ?? mockWorkouts[0],
    [phase],
  );
  const meal = useMemo(
    () => mockMeals.find((m) => m.phase === phase) ?? mockMeals[1],
    [phase],
  );
  const [workoutDone, setWorkoutDone] = useState(false);
  const [mealDone, setMealDone] = useState(false);

  return (
    <div className="px-5 mt-5">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-[13px] font-semibold">خطّة اليوم</h2>
        <span className="text-[10px] text-foreground/50">من شيلا</span>
      </div>
      <div className="grid gap-2.5">
        <Link
          to="/workouts/$id"
          params={{ id: workout.id }}
          className="rounded-2xl p-3.5 bg-white/85 border border-white/60 flex items-center gap-3 active:scale-[0.99] transition-transform"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `linear-gradient(135deg, color-mix(in oklab, ${tint} 35%, white), color-mix(in oklab, ${tint} 14%, white))` }}
          >
            {workoutDone
              ? <Check size={18} className="text-primary" strokeWidth={2.2} />
              : <Dumbbell size={18} style={{ color: tint }} strokeWidth={1.9} />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium truncate">{workout.title}</div>
            <div className="text-[10.5px] text-foreground/60 mt-0.5 nums">
              {toAr(workout.duration)} د · {workout.level} · {toAr(workout.calories)} سعرة
            </div>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); setWorkoutDone((v) => !v); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${workoutDone ? "bg-primary/15" : "bg-foreground/5"}`}
            aria-label="تمّ التمرين"
          >
            <Check size={14} className={workoutDone ? "text-primary" : "text-foreground/40"} strokeWidth={2.5} />
          </button>
        </Link>

        <Link
          to="/nutrition/$id"
          params={{ id: meal.id }}
          className="rounded-2xl p-3.5 bg-white/85 border border-white/60 flex items-center gap-3 active:scale-[0.99] transition-transform"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, oklch(0.96 0.04 145), oklch(0.94 0.04 145))" }}
          >
            {mealDone
              ? <Check size={18} className="text-primary" strokeWidth={2.2} />
              : <Apple size={18} style={{ color: "oklch(0.55 0.13 145)" }} strokeWidth={1.9} />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium truncate">{meal.title}</div>
            <div className="text-[10.5px] text-foreground/60 mt-0.5 nums">
              {toAr(meal.kcal)} سعرة · {toAr(meal.protein)}غ بروتين
            </div>
          </div>
          {mealDone ? (
            <span className="text-[10.5px] text-primary font-semibold">مسجّلة</span>
          ) : (
            <button
              onClick={(e) => { e.preventDefault(); setMealDone(true); }}
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
              aria-label="سجّلي"
            >
              <Plus size={14} className="text-primary" strokeWidth={2.5} />
            </button>
          )}
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
 * اختصار صغير
 * ========================================================= */
function Shortcut({ to, icon: Icon, label, color }: { to: string; icon: typeof Trophy; label: string; color: string }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-1.5 bg-white/80 rounded-2xl border border-white/60 p-2.5 active:scale-95 transition-transform"
    >
      <Icon size={20} style={{ color }} strokeWidth={1.75} />
      <span className="text-[10.5px] text-foreground/70 truncate max-w-full">{label}</span>
    </Link>
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
