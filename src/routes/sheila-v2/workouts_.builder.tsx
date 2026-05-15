import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Wand2, Play } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { AITyping, AIGenerating } from "@/components/sheila-v2/AITyping";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";
import { WORKOUTS } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/workouts_/builder")({ component: Builder });

const PRESETS = ["20 دقيقة، بدون معدات، البطن", "قوّة الجزء العلوي بالدمبل", "متعبة، أريد تمدّد فقط"];

function Builder() {
  const { dispatch } = useSheilaV2();
  const [q, setQ] = useState("");
  const [stage, setStage] = useState<"idle" | "gen" | "done">("idle");
  const result = WORKOUTS[0];

  function go(text: string) {
    setQ(text); setStage("gen");
    setTimeout(() => setStage("done"), 1500);
  }

  return (
    <ShellV2 title="ابني تمريناً" back="/sheila-v2/workouts" showFAB={false}>
      <div className="px-5">
        <div className="rounded-3xl p-4 glass-strong">
          <div className="relative z-10 flex items-center gap-2 mb-2"><Wand2 size={14} className="text-primary" /><span className="text-[11px] font-semibold text-primary">صفي ما تريدين</span></div>
          <textarea value={q} onChange={(e) => setQ(e.target.value)} rows={3}
            placeholder="مثال: 30 دقيقة قوّة، عندي دمبل، البطن والكتف"
            className="relative z-10 w-full bg-white/70 rounded-2xl p-3 text-[13px] outline-none placeholder:text-foreground/45 border border-white/60" />
          <button onClick={() => go(q || PRESETS[0])} className="relative z-10 mt-2 w-full py-3 rounded-2xl text-primary-foreground text-[13px] font-semibold" style={{ background: "var(--gradient-primary)" }}>
            ابني الآن
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p} onClick={() => go(p)} className="text-[11.5px] px-3 py-1.5 rounded-full bg-white/70 border border-border">{p}</button>
          ))}
        </div>

        {stage === "gen" && <div className="mt-5"><AIGenerating label="شيلا تبني تمرينك…" /></div>}
        {stage === "done" && (
          <div className="mt-5 rounded-3xl bg-white/85 border border-border p-4">
            <div className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">✶ شيلا</div>
            <div className="font-display text-[18px] mt-2">{result.title}</div>
            <p className="text-[12px] text-foreground/65 mt-1.5"><AITyping text={result.rationale} speed={20} /></p>
            <div className="mt-3 space-y-2.5">
              {result.blocks?.map((b, i) => (
                <div key={i}>
                  <div className="text-[11px] font-semibold text-primary mb-1.5">{b.name}</div>
                  <div className="rounded-xl bg-secondary/50 divide-y divide-border">
                    {b.items.map((it, j) => (
                      <div key={j} className="px-3 py-2 text-[12px] flex justify-between"><span>{it.name}</span><span className="text-foreground/55 nums">{it.sets ? `${it.sets}×${it.reps}` : it.duration}</span></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/sheila-v2/workouts/player"
              onClick={() => dispatch({ type: "selectWorkout", workoutId: result.id })}
              className="mt-4 flex items-center justify-center gap-2 py-3 rounded-2xl text-primary-foreground text-[13px] font-semibold"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Play size={14} strokeWidth={2.5} /> ابدئي
            </Link>
          </div>
        )}
      </div>
    </ShellV2>
  );
}
