import { useEffect, useRef, useState } from "react";

interface Props {
  values: (string | number)[];
  value: string | number;
  onChange: (v: string | number) => void;
  width?: number;
  itemHeight?: number;
  visible?: number; // عدد العناصر المرئيّة (يفضّل فردي)
  label?: string;
}

/**
 * عجلة اختيار بنمط iOS — قابلة للسحب/التمرير العمودي مع snap للعنصر الأقرب.
 * تستخدم scroll عمودي حقيقي مع padding بحيث ينطبق العنصر الفعّال على المنتصف.
 */
export function IOSWheel({
  values, value, onChange, width = 86, itemHeight = 40, visible = 7, label,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(() => Math.max(0, values.findIndex(v => v === value)));
  const padding = ((visible - 1) / 2) * itemHeight;
  const height = visible * itemHeight;

  // مزامنة scroll عند تغيّر القيمة الخارجيّة
  useEffect(() => {
    const i = values.findIndex(v => v === value);
    if (i < 0 || !ref.current) return;
    if (i !== active) setActive(i);
    ref.current.scrollTo({ top: i * itemHeight, behavior: "auto" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // معالج التمرير مع snap عند التوقّف
  const tRef = useRef<number | null>(null);
  const handleScroll = () => {
    if (!ref.current) return;
    const top = ref.current.scrollTop;
    const idx = Math.round(top / itemHeight);
    if (idx !== active && values[idx] !== undefined) {
      setActive(idx);
    }
    if (tRef.current) window.clearTimeout(tRef.current);
    tRef.current = window.setTimeout(() => {
      if (!ref.current) return;
      const t = ref.current.scrollTop;
      const i = Math.max(0, Math.min(values.length - 1, Math.round(t / itemHeight)));
      ref.current.scrollTo({ top: i * itemHeight, behavior: "smooth" });
      if (values[i] !== value) onChange(values[i]);
    }, 90);
  };

  return (
    <div className="flex flex-col items-center select-none">
      {label && <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-2">{label}</div>}
      <div
        className="relative"
        style={{ width, height }}
      >
        {/* خطوط المحور */}
        <div
          className="absolute left-0 right-0 pointer-events-none z-10"
          style={{
            top: padding, height: itemHeight,
            borderTop: "1px solid color-mix(in oklab, var(--primary) 35%, transparent)",
            borderBottom: "1px solid color-mix(in oklab, var(--primary) 35%, transparent)",
            background: "color-mix(in oklab, var(--primary) 6%, transparent)",
            borderRadius: 8,
          }}
        />
        {/* تدرّج تلاشي أعلى/أسفل */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none z-20"
          style={{ height: padding, background: "linear-gradient(180deg, var(--background) 0%, transparent 100%)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none z-20"
          style={{ height: padding, background: "linear-gradient(0deg, var(--background) 0%, transparent 100%)" }}
        />
        <div
          ref={ref}
          onScroll={handleScroll}
          className="h-full w-full overflow-y-scroll no-scrollbar snap-y snap-mandatory"
          style={{ scrollSnapType: "y mandatory", direction: "ltr" }}
        >
          <div style={{ height: padding }} />
          {values.map((v, i) => {
            const dist = Math.abs(i - active);
            const opacity = Math.max(0.25, 1 - dist * 0.28);
            const scale = Math.max(0.78, 1 - dist * 0.08);
            return (
              <div
                key={`${v}-${i}`}
                className="snap-center flex items-center justify-center font-display nums tabular-nums"
                style={{
                  height: itemHeight,
                  fontSize: dist === 0 ? 22 : 18,
                  color: dist === 0 ? "var(--primary-deep)" : "var(--foreground)",
                  opacity,
                  transform: `scale(${scale})`,
                  transition: "opacity 120ms, transform 120ms, font-size 120ms",
                }}
              >
                {v}
              </div>
            );
          })}
          <div style={{ height: padding }} />
        </div>
      </div>
    </div>
  );
}

function range(min: number, max: number) {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}
export { range as wheelRange };
