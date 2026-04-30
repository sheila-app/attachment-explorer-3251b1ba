import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Footprints, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/checkin/steps")({ component: Page });

const WEEK = [
  { d: "أحد", v: 6200 },
  { d: "اثن", v: 8900 },
  { d: "ثلا", v: 7400 },
  { d: "أرب", v: 10200 },
  { d: "خمي", v: 5400 },
  { d: "جمع", v: 9100 },
  { d: "سبت", v: 7800 },
];

function Page() {
  const today = 7800;
  const goal = 10000;
  const pct = Math.min(100, (today / goal) * 100);
  const max = Math.max(...WEEK.map((w) => w.v));
  return (
    <FeatureShell title="تتبّع الخطوات" back="/checkin" variant="energetic">
      <div className="px-5 pb-8 space-y-4">
        <div className="glass-strong rounded-3xl p-6 text-center">
          <Footprints size={26} className="text-primary mx-auto mb-2" strokeWidth={1.75} />
          <div className="font-display text-5xl text-primary nums">{today.toLocaleString("ar")}</div>
          <div className="text-[11.5px] text-foreground/60 mt-1 nums">من أصل {goal.toLocaleString("ar")} خطوة</div>
          <div className="mt-4 h-2 rounded-full overflow-hidden bg-foreground/10">
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "var(--gradient-primary)" }} />
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="relative z-10 flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-primary" />
            <span className="text-[12px] font-medium">آخر 7 أيام</span>
          </div>
          <div className="relative z-10 flex items-end justify-between gap-1.5 h-28">
            {WEEK.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg transition-all" style={{ height: `${(w.v / max) * 100}%`, background: "var(--gradient-primary)", opacity: 0.4 + 0.6 * (w.v / max) }} />
                <span className="text-[9.5px] text-foreground/55">{w.d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Stat label="مسافة" v="5.4" u="كم" />
          <Stat label="سعرات" v="312" u="kcal" />
          <Stat label="دقائق" v="68" u="نشطة" />
        </div>
      </div>
    </FeatureShell>
  );
}

function Stat({ label, v, u }: { label: string; v: string; u: string }) {
  return (
    <div className="glass rounded-xl p-3 text-center">
      <div className="relative z-10 text-[10px] text-foreground/55 uppercase tracking-widest">{label}</div>
      <div className="relative z-10 font-display text-lg text-primary nums mt-1">{v}</div>
      <div className="relative z-10 text-[9.5px] text-foreground/55">{u}</div>
    </div>
  );
}
