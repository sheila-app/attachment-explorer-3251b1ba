import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { OptionCard, PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { IOSWheel, wheelRange } from "@/components/sheila/IOSWheel";
import { Droplet } from "lucide-react";

export const Route = createFileRoute("/cycle/log-draft")({ component: LogDraftPage });

const months = [
  "يناير","فبراير","مارس","أبريل","مايو","يونيو",
  "يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",
];
const today = new Date();
const yearNow = today.getFullYear();

function FlowDroplets({ count, active }: { count: 1 | 2 | 3; active: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Droplet
          key={i}
          size={16}
          strokeWidth={2}
          style={{
            color: active ? "var(--phase-menstrual-deep)" : "color-mix(in oklab, var(--phase-menstrual) 70%, transparent)",
            fill: active ? "var(--phase-menstrual-deep)" : "transparent",
          }}
        />
      ))}
    </div>
  );
}

function LogDraftPage() {
  const [day, setDay] = useState<number>(today.getDate());
  const [monthIdx, setMonthIdx] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(yearNow);
  const [flow, setFlow] = useState<"light" | "med" | "heavy">("med");
  const [symptoms, setSymptoms] = useState<string[]>(["cramp"]);

  const flows: { id: "light" | "med" | "heavy"; t: string; dots: 1 | 2 | 3 }[] = [
    { id: "light", t: "خفيف", dots: 1 },
    { id: "med", t: "متوسّط", dots: 2 },
    { id: "heavy", t: "غزير", dots: 3 },
  ];

  const sym = [
    { id: "cramp", t: "تشنّج" }, { id: "head", t: "صداع" }, { id: "tired", t: "إرهاق" },
    { id: "mood", t: "تقلّب مزاجي" }, { id: "bloat", t: "انتفاخ" }, { id: "back", t: "ألم ظهر" },
  ];
  const toggle = (id: string) => setSymptoms(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <FeatureShell title="تسجيل الدورة" back="/cycle" showNav={false} variant="warm">
      <div className="px-5 pb-6">
        <h2 className="text-sm font-medium mb-2.5">التاريخ</h2>
        <div className="glass rounded-2xl p-4 mb-6">
          <div className="relative z-10 text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-3 text-center">
            يوم التسجيل
          </div>
          <div className="relative z-10 flex justify-center gap-3" style={{ direction: "ltr" }}>
            <IOSWheel label="يوم" values={wheelRange(1, 31)} value={day} onChange={(v) => setDay(Number(v))} width={64} />
            <IOSWheel label="شهر" values={months} value={months[monthIdx]} onChange={(v) => setMonthIdx(months.indexOf(String(v)))} width={108} />
            <IOSWheel label="سنة" values={wheelRange(yearNow - 5, yearNow)} value={year} onChange={(v) => setYear(Number(v))} width={78} />
          </div>
        </div>

        <h2 className="text-sm font-medium mb-2.5">شدّة التدفّق</h2>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {flows.map(f => {
            const active = flow === f.id;
            return (
              <button key={f.id} onClick={() => setFlow(f.id)}
                className="glass rounded-2xl py-3 flex flex-col items-center justify-center gap-1.5"
                style={active ? { boxShadow: "0 0 0 2px var(--phase-menstrual), inset 0 1px 0 0 oklch(1 0 0 / 0.6)", color: "var(--phase-menstrual-deep)" } : undefined}
              >
                <span className="relative z-10"><FlowDroplets count={f.dots} active={active} /></span>
                <span className="relative z-10 text-[12.5px] font-medium">{f.t}</span>
              </button>
            );
          })}
        </div>

        <h2 className="text-sm font-medium mb-2.5">الأعراض</h2>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {sym.map(s => (
            <OptionCard key={s.id} title={s.t} selected={symptoms.includes(s.id)} onClick={() => toggle(s.id)} />
          ))}
        </div>

        <h2 className="text-sm font-medium mb-2.5">ملاحظات</h2>
        <div className="glass rounded-2xl p-4">
          <textarea rows={3} placeholder="كيف تشعرين اليوم؟"
            className="relative z-10 w-full bg-transparent text-sm outline-none placeholder:text-foreground/40 resize-none" />
        </div>

        <div className="mt-6">
          <PrimaryCTA to="/cycle">حفظ التسجيل</PrimaryCTA>
        </div>
      </div>
    </FeatureShell>
  );
}
