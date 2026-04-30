import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Play, Pause } from "lucide-react";

export const Route = createFileRoute("/mindfulness/$id")({ component: Page });

function Page() {
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    if (!playing) return;
    const cycle: Array<["in" | "hold" | "out", number]> = [["in", 4000], ["hold", 7000], ["out", 8000]];
    let i = 0;
    setPhase(cycle[0][0]);
    const tick = () => {
      i = (i + 1) % cycle.length;
      setPhase(cycle[i][0]);
    };
    let timeout = setTimeout(function loop() {
      tick();
      timeout = setTimeout(loop, cycle[i][1]);
    }, cycle[0][1]);
    return () => clearTimeout(timeout);
  }, [playing]);

  const label = phase === "in" ? "شهيق" : phase === "hold" ? "احبسي" : "زفير";
  const scale = phase === "in" ? 1.4 : phase === "hold" ? 1.4 : 0.85;

  return (
    <FeatureShell title="جلسة تنفّس" back="/mindfulness" showNav={false} variant="calm">
      <div className="px-5 flex flex-col items-center justify-center gap-8 pt-6">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full transition-transform ease-in-out"
            style={{
              background: "radial-gradient(circle, oklch(0.66 0.16 322 / 0.4), oklch(0.46 0.135 328 / 0.15))",
              transform: `scale(${playing ? scale : 1})`,
              transitionDuration: phase === "in" ? "4s" : phase === "hold" ? "7s" : "8s",
              boxShadow: "0 30px 60px -20px oklch(0.46 0.135 328 / 0.4)",
            }} />
          <div className="relative font-display text-[28px] text-primary">{playing ? label : "جاهزة؟"}</div>
        </div>

        <button onClick={() => setPlaying(p => !p)}
          className="w-16 h-16 rounded-full flex items-center justify-center text-white"
          style={{ background: "var(--gradient-primary)", boxShadow: "0 14px 30px -10px oklch(0.46 0.135 328 / 0.5)" }}>
          {playing ? <Pause size={22} /> : <Play size={22} />}
        </button>

        <p className="text-[12px] text-foreground/65 text-center max-w-[260px] leading-relaxed">
          تقنية 4-7-8: شهيق 4 ثوانٍ، احبسي النفس 7، ثمّ زفير بطيء 8.
        </p>
      </div>
    </FeatureShell>
  );
}
