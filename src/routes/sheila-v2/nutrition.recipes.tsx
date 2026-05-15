import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ChefHat } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { AITyping, AIGenerating } from "@/components/sheila-v2/AITyping";

export const Route = createFileRoute("/sheila-v2/nutrition/recipes")({ component: Recipes });
const PRESETS = ["عندي دجاج وطماطم وأرز", "عشاء غنيّ بالبروتين خفيف", "وصفة سريعة بدون جلوتين"];
const SAVED = [
  { name: "شوربة عدس بالكمّون", cal: 320, t: "30 د" },
  { name: "كفتة دجاج بالفرن",   cal: 410, t: "40 د" },
  { name: "سلطة كينوا متوسّطية", cal: 380, t: "20 د" },
];

function Recipes() {
  const [q, setQ] = useState("");
  const [stage, setStage] = useState<"idle" | "gen" | "done">("idle");
  function go(t: string) { setQ(t); setStage("gen"); setTimeout(() => setStage("done"), 1500); }

  return (
    <ShellV2 title="الوصفات" back="/sheila-v2/nutrition" showFAB={false}>
      <div className="px-5">
        <div className="rounded-3xl p-4 glass-strong">
          <div className="relative z-10 flex items-center gap-2 mb-2"><Sparkles size={14} className="text-primary" /><span className="text-[11px] font-semibold text-primary">اطلبي وصفة من شيلا</span></div>
          <textarea value={q} onChange={(e) => setQ(e.target.value)} rows={2} placeholder="ما الذي تريدين طهيه؟"
            className="relative z-10 w-full bg-white/70 rounded-2xl p-3 text-[13px] outline-none border border-white/60" />
          <button onClick={() => go(q || PRESETS[0])} className="relative z-10 mt-2 w-full py-3 rounded-2xl text-primary-foreground text-[13px] font-semibold" style={{ background: "var(--gradient-primary)" }}>
            ابني الوصفة
          </button>
          <div className="relative z-10 flex flex-wrap gap-1.5 mt-3">
            {PRESETS.map(p => <button key={p} onClick={() => go(p)} className="text-[10.5px] px-2.5 py-1 rounded-full bg-white/60 border border-border">{p}</button>)}
          </div>
        </div>

        {stage === "gen" && <div className="mt-4"><AIGenerating label="شيلا تبني وصفتك…" /></div>}
        {stage === "done" && (
          <div className="mt-4 rounded-2xl bg-white/85 border border-border p-4">
            <div className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">✶ شيلا</div>
            <div className="font-display text-[18px] mt-2">دجاج بالطماطم والأرز البسمتي</div>
            <p className="text-[11.5px] text-foreground/65 mt-1.5"><AITyping text="وجبة متوازنة 480 سعرة، 35غ بروتين. وقت التحضير 25 دقيقة." speed={20} /></p>
            <div className="text-[11px] font-semibold text-primary mt-3">المقادير</div>
            <ul className="text-[12px] text-foreground/75 mt-1 space-y-0.5">
              <li>• 200غ صدر دجاج</li><li>• 3 حبّات طماطم</li><li>• 1 كوب أرز بسمتي</li><li>• ملح، فلفل، كمّون</li>
            </ul>
            <div className="text-[11px] font-semibold text-primary mt-3">الخطوات</div>
            <ol className="text-[12px] text-foreground/75 mt-1 space-y-1 nums">
              <li>1. سخّني الزيت في مقلاة عميقة.</li>
              <li>2. أضيفي الدجاج المقطّع وحمّريه.</li>
              <li>3. أضيفي الطماطم والتوابل.</li>
              <li>4. أضيفي الأرز والماء واتركيه على نار هادئة 18 دقيقة.</li>
            </ol>
          </div>
        )}

        <h2 className="text-[12px] font-semibold mt-6 mb-2.5">المحفوظة</h2>
        <div className="grid gap-2">
          {SAVED.map((r, i) => (
            <div key={i} className="rounded-2xl bg-white/85 border border-border p-3 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-secondary/50 flex items-center justify-center"><ChefHat size={16} className="text-primary" /></div>
              <div className="flex-1"><div className="text-[12.5px] font-medium">{r.name}</div><div className="text-[10.5px] text-foreground/55 mt-0.5">{r.cal} سعرة • {r.t}</div></div>
            </div>
          ))}
        </div>
      </div>
    </ShellV2>
  );
}
