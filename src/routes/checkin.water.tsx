import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Plus, Minus, Droplet } from "lucide-react";

export const Route = createFileRoute("/checkin/water")({ component: Page });

function Page() {
  const goal = 8;
  const [cups, setCups] = useState(5);
  const pct = Math.min(100, (cups / goal) * 100);

  return (
    <FeatureShell title="تتبّع الماء" back="/checkin" showNav={false} variant="calm">
      <div className="px-5 pb-8">
        <div className="glass-strong rounded-3xl p-6 text-center">
          <div className="relative mx-auto w-40 h-40">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="44" stroke="color-mix(in oklab, var(--primary) 15%, transparent)" strokeWidth="6" fill="none" />
              <circle cx="50" cy="50" r="44" stroke="var(--primary)" strokeWidth="6" fill="none"
                strokeDasharray={`${(pct / 100) * 276.5} 276.5`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Droplet size={22} className="text-primary mb-1" strokeWidth={1.5} />
              <div className="font-display text-3xl text-primary nums">{cups}<span className="text-base text-foreground/55">/{goal}</span></div>
              <div className="text-[10px] text-foreground/55 mt-0.5">كوب</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => setCups(Math.max(0, cups - 1))} className="w-12 h-12 rounded-full glass-strong flex items-center justify-center">
              <Minus size={18} className="relative z-10 text-primary" />
            </button>
            <button onClick={() => setCups(Math.min(20, cups + 1))} className="w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground"
              style={{ background: "var(--gradient-primary)", boxShadow: "0 12px 32px -8px oklch(0.46 0.135 328 / 0.5)" }}>
              <Plus size={22} className="relative z-10" />
            </button>
          </div>
        </div>

        <h2 className="text-sm font-medium mt-6 mb-2">سجلّ اليوم</h2>
        <div className="space-y-2">
          {[
            { t: "08:30", c: "1 كوب" }, { t: "10:15", c: "1 كوب" }, { t: "12:40", c: "2 كوب" },
            { t: "15:20", c: "1 كوب" },
          ].map((e, i) => (
            <div key={i} className="glass rounded-2xl px-4 py-3 flex items-center justify-between">
              <span className="relative z-10 text-[12.5px] text-foreground/70 nums">{e.t}</span>
              <span className="relative z-10 text-[12.5px] font-medium">{e.c}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <PrimaryCTA to="/home">حفظ</PrimaryCTA>
        </div>
      </div>
    </FeatureShell>
  );
}
