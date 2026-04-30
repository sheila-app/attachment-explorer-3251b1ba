import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Play, Pause, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/timer")({ component: Page });

function Page() {
  const [sec, setSec] = useState(25 * 60);
  const [run, setRun] = useState(false);
  useEffect(() => {
    if (!run) return;
    const id = setInterval(() => setSec(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [run]);
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  const pct = (sec / (25 * 60)) * 100;

  return (
    <FeatureShell title="مؤقّت التركيز" back="/journey" showNav={false} variant="calm">
      <div className="px-5 pb-8 flex flex-col items-center gap-8 pt-6">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="oklch(0.94 0.01 320)" strokeWidth="4" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="url(#g)" strokeWidth="4"
              strokeDasharray={`${(pct / 100) * 289} 289`} strokeLinecap="round" />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="oklch(0.66 0.16 322)" />
                <stop offset="1" stopColor="oklch(0.46 0.135 328)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-center">
            <div className="font-display text-5xl text-primary nums">{m}:{s}</div>
            <div className="text-[11px] text-foreground/55 mt-1 tracking-[0.2em] uppercase">جلسة بومودورو</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => { setSec(25 * 60); setRun(false); }} className="glass w-12 h-12 rounded-full flex items-center justify-center">
            <RotateCcw size={16} className="relative z-10" />
          </button>
          <button onClick={() => setRun(r => !r)} className="w-16 h-16 rounded-full flex items-center justify-center text-white"
            style={{ background: "var(--gradient-primary)", boxShadow: "0 14px 30px -10px oklch(0.46 0.135 328 / 0.5)" }}>
            {run ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button className="glass w-12 h-12 rounded-full flex items-center justify-center text-[11px]">
            +5
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full">
          {[15, 25, 45].map(min => (
            <button key={min} onClick={() => { setSec(min * 60); setRun(false); }}
              className="glass rounded-xl py-2.5 text-[12px] nums">{min} د</button>
          ))}
        </div>
      </div>
    </FeatureShell>
  );
}
