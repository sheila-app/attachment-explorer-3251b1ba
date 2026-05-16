import { useEffect, useMemo, useRef, useState } from "react";
import { PHASE_META, type CyclePhase } from "@/data/mock";
import { toAr } from "@/lib/format";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PHASE_SEQ: { key: CyclePhase; days: number }[] = [
  { key: "menstrual", days: 5 },
  { key: "follicular", days: 8 },
  { key: "ovulation", days: 3 },
  { key: "luteal", days: 12 },
];

const DAY_LETTERS = ["ح", "ن", "ث", "ر", "خ", "ج", "س"];

export function phaseForDay(day: number, cycleLength: number): CyclePhase {
  const d = ((day - 1) % cycleLength + cycleLength) % cycleLength + 1;
  let acc = 0;
  for (const p of PHASE_SEQ) {
    acc += p.days;
    if (d <= acc) return p.key;
  }
  return "luteal";
}

/* ===== Multi-phase ring ===== */
export function MultiPhaseRing({
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

  const GAP = 6;
  let cumulative = 0;
  const arcs = PHASE_SEQ.map((p) => {
    const segLen = (p.days / cycleLength) * C;
    const start = (cumulative / cycleLength) * C + GAP / 2;
    const length = Math.max(segLen - GAP, 0);
    cumulative += p.days;
    return { ...p, start, length };
  });

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
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="white" strokeOpacity="0.55" strokeWidth={stroke} />
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
        <circle cx={knobX} cy={knobY} r={14} fill="white" />
        <circle cx={knobX} cy={knobY} r={14} fill="none" stroke={meta.color} strokeWidth={3} />
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

/* ===== Date strip ===== */
export function DateStrip({
  offset,
  setOffset,
  cycleLength,
  cycleDay,
}: {
  offset: number;
  setOffset: (n: number) => void;
  cycleLength: number;
  cycleDay: number;
}) {
  const RANGE = 30;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const lockRef = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mounted, setMounted] = useState(false);
  const [baseDate, setBaseDate] = useState<Date | null>(null);
  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setBaseDate(t);
    setMounted(true);
  }, []);

  const items = useMemo(() => {
    const arr: { offset: number; date: Date | null; phase: CyclePhase }[] = [];
    for (let i = -RANGE; i <= RANGE; i++) {
      const d = baseDate ? new Date(baseDate.getTime()) : null;
      if (d) d.setDate(baseDate!.getDate() + i);
      arr.push({ offset: i, date: d, phase: phaseForDay(cycleDay + i, cycleLength) });
    }
    return arr;
  }, [baseDate, cycleDay, cycleLength]);

  useEffect(() => {
    if (!mounted) return;
    const el = scrollerRef.current;
    const item = itemRefs.current.get(offset);
    if (!el || !item) return;
    lockRef.current = true;
    const target = item.offsetLeft - el.clientWidth / 2 + item.clientWidth / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
    const t = setTimeout(() => (lockRef.current = false), 400);
    return () => clearTimeout(t);
  }, [offset, mounted]);

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

  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const onPointerDown = (e: React.PointerEvent) => {
    if (!scrollerRef.current) return;
    dragRef.current = { active: true, startX: e.clientX, startScroll: scrollerRef.current.scrollLeft, moved: false };
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
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  return (
    <div className="relative">
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
            ? Array.from({ length: 7 }).map((_, i) => <div key={i} className="w-12 h-16 rounded-2xl bg-white/40" />)
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
                      background: isSelected ? color : `color-mix(in oklab, ${color} 14%, white)`,
                      color: isSelected ? "white" : "var(--foreground)",
                      border: isSelected ? "none" : `1px solid color-mix(in oklab, ${color} 25%, transparent)`,
                      boxShadow: isSelected ? `0 10px 22px -10px ${color}` : undefined,
                      transform: isSelected ? "scale(1.06)" : "scale(1)",
                    }}
                  >
                    <span className="text-[10px]" style={{ opacity: isSelected ? 0.9 : 0.65 }}>
                      {it.date ? DAY_LETTERS[it.date.getDay()] : "—"}
                    </span>
                    <span className="font-display text-[15px] nums leading-none">
                      {it.date ? toAr(it.date.getDate()) : "—"}
                    </span>
                    <span
                      className="w-1 h-1 rounded-full mt-0.5"
                      style={{ background: isSelected ? "white" : color, opacity: isSelected ? 0.9 : 0.55 }}
                    />
                  </button>
                );
              })}
        </div>
      </div>
    </div>
  );
}

/* ===== Cycle Calendar — تقويم متعدّد الأشهر بتلوين المراحل ===== */
const AR_MONTHS = [
  "يناير","فبراير","مارس","أبريل","مايو","يونيو",
  "يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",
];
const AR_WEEK = ["أحد","اثن","ثل","أرب","خم","جم","سب"];

export function CycleCalendar({
  cycleDay,
  cycleLength,
}: {
  cycleDay: number;
  cycleLength: number;
}) {
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState<Date | null>(null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setToday(t);
    setView({ y: t.getFullYear(), m: t.getMonth() });
    setMounted(true);
  }, []);

  if (!mounted || !today || !view) {
    return <div className="h-[320px] rounded-2xl bg-white/40" />;
  }

  const firstDow = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7) cells.push(null);

  const prevMonth = () => setView(v => v!.m === 0 ? { y: v!.y - 1, m: 11 } : { y: v!.y, m: v!.m - 1 });
  const nextMonth = () => setView(v => v!.m === 11 ? { y: v!.y + 1, m: 0 } : { y: v!.y, m: v!.m + 1 });

  const phaseForDate = (d: Date): CyclePhase => {
    const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
    return phaseForDay(cycleDay + diff, cycleLength);
  };
  const cycleDayForDate = (d: Date): number => {
    const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
    const v = ((cycleDay - 1 + diff) % cycleLength + cycleLength) % cycleLength;
    return v + 1;
  };

  const selDate = selected ? new Date(selected) : null;
  const selPhase = selDate ? phaseForDate(selDate) : null;
  const selMeta = selPhase ? PHASE_META[selPhase] : null;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="glass w-9 h-9 rounded-xl flex items-center justify-center" aria-label="السابق">
          <ChevronRight size={16} className="relative z-10" strokeWidth={2} />
        </button>
        <div className="font-display text-[15px] nums">
          {AR_MONTHS[view.m]} {toAr(view.y)}
        </div>
        <button onClick={nextMonth} className="glass w-9 h-9 rounded-xl flex items-center justify-center" aria-label="التالي">
          <ChevronLeft size={16} className="relative z-10" strokeWidth={2} />
        </button>
      </div>

      {/* Grid */}
      <div className="glass-strong rounded-2xl p-3">
        <div className="relative z-10 grid grid-cols-7 gap-1.5 text-center">
          {AR_WEEK.map(d => (
            <span key={d} className="text-[10px] text-foreground/55 py-1">{d}</span>
          ))}
          {cells.map((d, i) => {
            if (!d) return <div key={`e-${i}`} />;
            const date = new Date(view.y, view.m, d);
            const phase = phaseForDate(date);
            const phaseColor = `var(--phase-${phase})`;
            const key = `${view.y}-${view.m}-${d}`;
            const isToday =
              date.getFullYear() === today.getFullYear() &&
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate();
            const isSel = selected === key;
            return (
              <button
                key={key}
                onClick={() => setSelected(isSel ? null : key)}
                className="aspect-square rounded-full flex items-center justify-center relative leading-none transition"
                style={
                  isToday
                    ? { background: "var(--gradient-primary)", color: "white" }
                    : {
                        border: `1.5px solid ${phaseColor}`,
                        color: phaseColor,
                        background: isSel ? `color-mix(in oklab, ${phaseColor} 22%, transparent)` : "transparent",
                        boxShadow: isSel ? `0 0 0 2px color-mix(in oklab, ${phaseColor} 35%, transparent)` : undefined,
                      }
                }
              >
                <span className="text-[12px] font-medium nums leading-none translate-y-[1px]">{d}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(PHASE_META) as CyclePhase[]).map(p => (
          <div key={p} className="glass rounded-xl px-3 py-1.5 flex items-center gap-2">
            <span className="relative z-10 w-2.5 h-2.5 rounded-full" style={{ background: PHASE_META[p].color }} />
            <span className="relative z-10 text-[11px]">{PHASE_META[p].name}</span>
          </div>
        ))}
      </div>

      {/* Selected detail */}
      {selDate && selMeta && (
        <div className="glass rounded-2xl p-3.5">
          <div className="relative z-10 flex items-center justify-between mb-1.5">
            <div className="text-[12.5px] font-medium nums">
              {toAr(selDate.getDate())} {AR_MONTHS[selDate.getMonth()]} {toAr(selDate.getFullYear())}
            </div>
            <span
              className="text-[10.5px] px-2.5 py-1 rounded-full font-medium"
              style={{ background: `color-mix(in oklab, ${selMeta.color} 18%, transparent)`, color: selMeta.color }}
            >
              {selMeta.name}
            </span>
          </div>
          <div className="relative z-10 text-[11px] text-foreground/65 nums">
            اليوم {toAr(cycleDayForDate(selDate))} من الدورة
          </div>
        </div>
      )}
    </div>
  );
}
