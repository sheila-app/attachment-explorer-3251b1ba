import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { mockWorkouts, mockExercises, PHASE_META } from "@/data/mock";
import { Pause, Play, SkipForward, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/workouts/$id/play")({ component: PlayPage });

function PlayPage() {
  const { id } = useParams({ from: "/workouts/$id/play" });
  const w = mockWorkouts.find(x => x.id === id) ?? mockWorkouts[0];
  const p = PHASE_META[w.phase];
  const [step, setStep] = useState(0);
  const [seconds, setSeconds] = useState(45);
  const [paused, setPaused] = useState(false);
  const ex = mockExercises[step];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [paused]);

  const total = mockExercises.length;
  const progress = ((step + 1) / total) * 100;

  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen flex flex-col overflow-hidden">
        <LiquidBackdrop variant="energetic" />

        <header className="relative z-10 px-5 pt-6 pb-3 flex items-center justify-between">
          <Link to="/workouts/$id" params={{ id }} className="glass w-10 h-10 rounded-full flex items-center justify-center">
            <X size={17} strokeWidth={1.75} className="relative z-10" />
          </Link>
          <span className="glass px-3 py-1.5 rounded-full text-[11px] font-medium nums">
            <span className="relative z-10">{step + 1} / {total}</span>
          </span>
          <div className="w-10" />
        </header>

        <div className="relative z-10 px-7 mt-2">
          <div className="h-1 rounded-full bg-foreground/10 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "var(--gradient-primary)" }} />
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-7 text-center">
          <div className="text-[10px] tracking-[0.3em] text-foreground/55 uppercase">{w.title}</div>
          <h2 className="font-display text-[28px] mt-2">{ex.name}</h2>
          <div className="text-[13px] text-foreground/65 mt-1 nums">{ex.sets} × {ex.reps}</div>

          <div className="relative mt-10">
            <svg width="240" height="240" className="-rotate-90">
              <circle cx="120" cy="120" r="100" fill="none" stroke="var(--color-border)" strokeWidth="8" opacity="0.4" />
              <circle cx="120" cy="120" r="100" fill="none" stroke={p.color} strokeWidth="8" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 100}
                strokeDashoffset={2 * Math.PI * 100 * (1 - seconds / 60)}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[11px] text-foreground/55 tracking-widest uppercase">الوقت</div>
              <div className="font-display text-6xl mt-1 nums" style={{ color: p.color }}>{seconds}</div>
              <div className="text-[11px] text-foreground/55 mt-1">ثانية</div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-10">
            <button onClick={() => setStep(s => Math.max(0, s - 1))}
              className="glass w-12 h-12 rounded-full flex items-center justify-center">
              <SkipForward size={18} className="relative z-10 -scale-x-100" strokeWidth={2} />
            </button>
            <button onClick={() => setPaused(p => !p)}
              className="w-16 h-16 rounded-full flex items-center justify-center text-primary-foreground"
              style={{ background: "var(--gradient-primary)", boxShadow: "0 14px 30px -10px oklch(0.46 0.135 328 / 0.5)" }}
            >
              {paused ? <Play size={24} strokeWidth={2} /> : <Pause size={22} strokeWidth={2} />}
            </button>
            <button onClick={() => { if (step + 1 < total) { setStep(step + 1); setSeconds(45); } }}
              className="glass w-12 h-12 rounded-full flex items-center justify-center">
              <SkipForward size={18} className="relative z-10" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="relative z-10 px-7 pb-9">
          <PrimaryCTA to="/workouts/summary">إنهاء التمرين</PrimaryCTA>
        </div>
      </div>
    </DeviceFrame>
  );
}
