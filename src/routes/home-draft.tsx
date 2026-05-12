import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Bell, Search, Sparkles, Droplet, Moon, Heart, Activity, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { BottomNav } from "@/components/sheila/BottomNav";
import { mockUser, PHASE_META, type CyclePhase } from "@/data/mock";
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
          {/* الرأس: بحث | التاريخ في المنتصف | إشعارات */}
          <div className="flex items-center justify-between px-5 pt-5">
            <button className="w-10 h-10 rounded-full bg-white/70 backdrop-blur border border-white/60 flex items-center justify-center shadow-sm">
              <Search size={17} strokeWidth={1.75} className="text-foreground/75" />
            </button>

            <div className="text-center">
              <div className="font-display text-[15px] text-foreground/85 nums">
                {selectedDate
                  ? `${toAr(selectedDate.getDate())} ${MONTHS_AR[selectedDate.getMonth()]}`
                  : "—"}
              </div>
              <div className="text-[10.5px] mt-0.5 font-medium" style={{ color: meta.color }}>
                يوم {toAr(day)} · {meta.name}
              </div>
            </div>

            <button className="relative w-10 h-10 rounded-full bg-white/70 backdrop-blur border border-white/60 flex items-center justify-center shadow-sm">
              <Bell size={17} strokeWidth={1.75} className="text-foreground/75" />
              <span className="absolute top-2 end-2 w-1.5 h-1.5 rounded-full bg-destructive" />
            </button>
          </div>

          {/* تحيّة المستخدم */}
          <div className="px-5 mt-3">
            <div className="text-[11px] text-foreground/55 tracking-widest">مرحباً</div>
            <div className="font-display text-xl text-foreground/90 mt-0.5">{mockUser.name}</div>
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

          {/* عناصر إضافيّة لاختبار السكرول */}
          <div className="mt-4 px-5 grid grid-cols-2 gap-3">
            <QuickStat icon={<Droplet size={16} />} label="الترطيب" value={`${toAr(6)} كؤوس`} tint={meta.color} />
            <QuickStat icon={<Moon size={16} />} label="النوم" value={`${toAr(7)}س ${toAr(20)}د`} tint={meta.color} />
            <QuickStat icon={<Heart size={16} />} label="المزاج" value="هادئ" tint={meta.color} />
            <QuickStat icon={<Activity size={16} />} label="الطاقة" value={`${toAr(72)}٪`} tint={meta.color} />
          </div>

          <SectionTitle>توصيّات اليوم</SectionTitle>
          <div className="px-5 space-y-3">
            <Suggestion
              icon={<Sparkles size={16} />}
              title="جرّبي تمرين تنفّس ٤-٧-٨"
              subtitle="٥ دقائق · يقلّل التوتّر"
              tint={meta.color}
            />
            <Suggestion
              icon={<BookOpen size={16} />}
              title="قراءة قصيرة عن مرحلتك"
              subtitle={`${meta.name} · ٣ دقائق قراءة`}
              tint={meta.color}
            />
            <Suggestion
              icon={<Heart size={16} />}
              title="وجبة مقترحة: سلطة العدس الدافئة"
              subtitle="غنيّة بالحديد · مناسبة للمرحلة"
              tint={meta.color}
            />
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
  const ITEM_W = 56; // العرض + الفجوة
  const RANGE = 30; // ٣٠ يوم لكل اتّجاه
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);

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

  // مزامنة السكرول مع offset عند التغيير الخارجي
  useEffect(() => {
    if (!scrollerRef.current) return;
    const el = scrollerRef.current;
    const target = (offset + RANGE) * ITEM_W - el.clientWidth / 2 + ITEM_W / 2;
    lockRef.current = true;
    el.scrollTo({ left: target, behavior: "smooth" });
    const t = setTimeout(() => (lockRef.current = false), 350);
    return () => clearTimeout(t);
  }, [offset]);

  // عند سحب المستخدم، اقرأ العنصر المركزي
  const onScroll = () => {
    if (lockRef.current || !scrollerRef.current) return;
    const el = scrollerRef.current;
    const center = el.scrollLeft + el.clientWidth / 2;
    const idx = Math.round((center - ITEM_W / 2) / ITEM_W);
    const newOffset = idx - RANGE;
    if (newOffset !== offset && newOffset >= -RANGE && newOffset <= RANGE) {
      setOffset(newOffset);
    }
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
      <div className="flex items-center justify-between px-5 mb-2">
        <button
          onClick={() => setOffset(Math.max(offset - 1, -RANGE))}
          className="w-7 h-7 rounded-full bg-white/70 backdrop-blur border border-white/60 flex items-center justify-center"
          aria-label="السابق"
        >
          <ChevronRight size={14} className="text-foreground/70" />
        </button>
        <span className="text-[11px] text-foreground/55">اسحب لتصفّح الأيام</span>
        <button
          onClick={() => setOffset(Math.min(offset + 1, RANGE))}
          className="w-7 h-7 rounded-full bg-white/70 backdrop-blur border border-white/60 flex items-center justify-center"
          aria-label="التالي"
        >
          <ChevronLeft size={14} className="text-foreground/70" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="overflow-x-auto no-scrollbar px-[calc(50%-24px)] cursor-grab active:cursor-grabbing select-none touch-pan-x"
        style={{ WebkitOverflowScrolling: "touch" }}
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
