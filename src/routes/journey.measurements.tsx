import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { TrendingDown, TrendingUp, Plus } from "lucide-react";

export const Route = createFileRoute("/journey/measurements")({ component: Page });

const HISTORY = [
  { d: "29 أبريل", weight: 62.4, waist: 71, hip: 96 },
  { d: "22 أبريل", weight: 62.8, waist: 71.5, hip: 96 },
  { d: "15 أبريل", weight: 63.2, waist: 72, hip: 96.5 },
  { d: "8 أبريل", weight: 63.5, waist: 72.5, hip: 97 },
  { d: "1 أبريل", weight: 64.0, waist: 73, hip: 97.5 },
];

function Page() {
  const [w, setW] = useState("62.4");
  const last = HISTORY[0], prev = HISTORY[1];
  const delta = (last.weight - prev.weight).toFixed(1);

  return (
    <FeatureShell title="القياسات" back="/journey" showNav={false}>
      <div className="px-5 pb-8 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <Stat label="الوزن" value={`${last.weight}`} unit="كغ" trend={Number(delta)} />
          <Stat label="الخصر" value={`${last.waist}`} unit="سم" trend={last.waist - prev.waist} />
          <Stat label="الورك" value={`${last.hip}`} unit="سم" trend={last.hip - prev.hip} />
        </div>

        <div className="glass-strong rounded-2xl p-5">
          <h3 className="relative z-10 text-sm font-medium mb-3 flex items-center gap-2">
            <Plus size={14} className="text-primary" strokeWidth={2} />
            <span>إضافة قياس جديد</span>
          </h3>
          <div className="relative z-10 grid grid-cols-3 gap-2">
            <Input label="الوزن" value={w} onChange={setW} unit="كغ" />
            <Input label="الخصر" value="71" unit="سم" />
            <Input label="الورك" value="96" unit="سم" />
          </div>
          <div className="relative z-10 mt-3">
            <PrimaryCTA to="/journey">حفظ القياس</PrimaryCTA>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-2 px-1">السجلّ</h3>
          <div className="glass rounded-2xl overflow-hidden">
            {HISTORY.map((h, i) => (
              <div key={i} className="relative z-10 px-4 py-3 flex items-center justify-between border-b border-foreground/5 last:border-b-0">
                <span className="text-[12px] text-foreground/65">{h.d}</span>
                <div className="flex items-center gap-3 text-[12px] nums">
                  <span><b>{h.weight}</b> كغ</span>
                  <span className="text-foreground/55">{h.waist}/{h.hip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FeatureShell>
  );
}

function Stat({ label, value, unit, trend }: { label: string; value: string; unit: string; trend: number }) {
  const down = trend < 0;
  return (
    <div className="glass rounded-2xl p-3">
      <div className="relative z-10 text-[10.5px] text-foreground/60">{label}</div>
      <div className="relative z-10 flex items-baseline gap-1 mt-1">
        <span className="font-display text-xl nums">{value}</span>
        <span className="text-[10px] text-foreground/55">{unit}</span>
      </div>
      <div className="relative z-10 flex items-center gap-1 mt-1.5 text-[10px]" style={{ color: down ? "var(--phase-follicular)" : "var(--phase-menstrual)" }}>
        {down ? <TrendingDown size={11} /> : <TrendingUp size={11} />}
        <span className="nums">{Math.abs(trend).toFixed(1)}</span>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, unit }: any) {
  return (
    <div>
      <label className="block text-[10px] text-foreground/60 mb-1">{label}</label>
      <div className="glass-strong rounded-xl px-3 py-2.5 flex items-baseline gap-1">
        <input defaultValue={value} onChange={(e) => onChange?.(e.target.value)}
          className="relative z-10 w-full bg-transparent outline-none text-[14px] font-medium nums" />
        <span className="relative z-10 text-[10px] text-foreground/55">{unit}</span>
      </div>
    </div>
  );
}
