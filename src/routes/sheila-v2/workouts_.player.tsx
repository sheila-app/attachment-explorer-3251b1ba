import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Pause, Play, X, Check } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { WORKOUTS } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/workouts_/player")({ component: Player });

function Player() {
  const w = WORKOUTS[0];
  const all = w.blocks?.flatMap(b => b.items.map(it => ({ ...it, block: b.name }))) ?? [];
  const [idx, setIdx] = useState(0);
  const [secs, setSecs] = useState(0);
  const [running, setRunning] = useState(true);
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const current = all[idx];
  const completedSets = done.length;
  const totalSets = all.reduce((a, b) => a + (b.sets ?? 1), 0);
  const cal = Math.round((secs / 60) * 8);
  const mins = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  if (!current) return <ShellV2 showNav={false} showFAB={false}><div className="p-5">انتهى</div></ShellV2>;

  return (
    <ShellV2 showNav={false} showFAB={false} bare>
      <div className="h-full flex flex-col">
        <header className="flex items-center justify-between px-5 pt-6">
          <Link to="/sheila-v2/workouts" className="w-10 h-10 rounded-full glass flex items-center justify-center"><X size={16} className="relative z-10" /></Link>
          <div className="text-[11px] text-foreground/60">{current.block}</div>
          <div className="w-10" />
        </header>

        <div className="flex-1 px-5 mt-4 flex flex-col">
          <div className="flex-1 rounded-3xl glass-strong flex flex-col items-center justify-center p-6 text-center">
            <div className="relative z-10 text-[10.5px] tracking-widest text-foreground/55">التمرين {idx + 1} من {all.length}</div>
            <div className="relative z-10 font-display text-[26px] mt-3 leading-tight">{current.name}</div>
            {current.sets && <div className="relative z-10 text-[14px] text-primary mt-2 font-semibold nums">{current.sets} × {current.reps}</div>}
            {current.duration && <div className="relative z-10 text-[14px] text-primary mt-2 font-semibold">{current.duration}</div>}
            {current.rest && <div className="relative z-10 text-[11px] text-foreground/55 mt-1">راحة {current.rest}</div>}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <Stat label="الوقت" value={`${mins}:${ss}`} />
            <Stat label="السعرات" value={`${cal}`} />
            <Stat label="مكتملة" value={`${completedSets}/${totalSets}`} />
          </div>

          <div className="flex items-center justify-center gap-3 mt-4 mb-6">
            <button onClick={() => { setDone(d => [...d, idx]); setIdx(i => Math.min(i + 1, all.length - 1)); }}
                    className="w-14 h-14 rounded-full bg-white/80 border border-border flex items-center justify-center">
              <Check size={20} className="text-primary" />
            </button>
            <button onClick={() => setRunning(r => !r)} className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--gradient-primary)", boxShadow: "0 14px 30px -10px oklch(0.46 0.135 328 / 0.5)" }}>
              {running ? <Pause size={22} className="text-primary-foreground" /> : <Play size={22} className="text-primary-foreground" />}
            </button>
            <button onClick={() => setIdx(i => Math.min(i + 1, all.length - 1))} className="w-14 h-14 rounded-full bg-white/80 border border-border flex items-center justify-center text-[12px] font-medium">
              تخطّي
            </button>
          </div>
        </div>
      </div>
    </ShellV2>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/85 border border-border p-2.5 text-center">
      <div className="text-[9.5px] text-foreground/55">{label}</div>
      <div className="font-display text-[18px] mt-0.5 nums">{value}</div>
    </div>
  );
}
