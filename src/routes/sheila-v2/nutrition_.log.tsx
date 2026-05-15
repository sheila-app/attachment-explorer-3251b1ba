import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { AIGenerating, AITyping } from "@/components/sheila-v2/AITyping";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";
import { MEALS } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/nutrition_/log")({ component: LogMeal });

function LogMeal() {
  const { dispatch } = useSheilaV2();
  const navigate = useNavigate();
  const [txt, setTxt] = useState("");
  const [stage, setStage] = useState<"idle" | "gen" | "done">("idle");
  const matched = MEALS.find((m) => m.id === "m4") ?? MEALS[0];

  function ask() { setStage("gen"); setTimeout(() => setStage("done"), 1300); }
  function confirm() {
    dispatch({ type: "logMeal", mealId: matched.id });
    setTimeout(() => navigate({ to: "/sheila-v2/nutrition" }), 300);
  }

  return (
    <ShellV2 title="سجّلي وجبة" back="/sheila-v2/nutrition" showFAB={false}>
      <div className="px-5">
        <div className="rounded-3xl p-4 glass-strong">
          <div className="relative z-10 flex items-center gap-2 mb-2"><Sparkles size={14} className="text-primary" /><span className="text-[11px] font-semibold text-primary">اكتبي ما أكلتِ بكلامك</span></div>
          <textarea value={txt} onChange={(e) => setTxt(e.target.value)} rows={3} placeholder="مثال: أكلت أرز مع دجاج وسلطة"
            className="relative z-10 w-full bg-white/70 rounded-2xl p-3 text-[13px] outline-none border border-white/60" />
          <button onClick={ask} className="relative z-10 mt-2 w-full py-3 rounded-2xl text-primary-foreground text-[13px] font-semibold" style={{ background: "var(--gradient-primary)" }}>
            تحليل بشيلا
          </button>
        </div>
        {stage === "gen" && <div className="mt-4"><AIGenerating label="شيلا تحلّل وجبتك…" /></div>}
        {stage === "done" && (
          <div className="mt-4 rounded-2xl bg-white/85 border border-border p-4">
            <div className="font-display text-[16px]">{matched.name}</div>
            <p className="text-[11.5px] text-foreground/65 mt-1.5"><AITyping text="حسبتُها بناءً على حصّة قياسيّة. عدّلي الكميّة إن احتجتِ." speed={22} /></p>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[{l:"سعرات",v:matched.cal},{l:"بروتين",v:`${matched.protein}غ`},{l:"كارب",v:`${matched.carbs}غ`},{l:"دهون",v:`${matched.fats}غ`}].map((s) => (
                <div key={s.l} className="rounded-xl bg-secondary/40 p-2 text-center"><div className="text-[9.5px] text-foreground/55">{s.l}</div><div className="font-display text-[14px] mt-0.5 nums">{s.v}</div></div>
              ))}
            </div>
            <button onClick={confirm} className="mt-4 w-full py-3 rounded-2xl text-primary-foreground text-[13px] font-semibold flex items-center justify-center gap-2" style={{ background: "var(--gradient-primary)" }}>
              <Check size={14} strokeWidth={2.5} /> تأكيد التسجيل
            </button>
          </div>
        )}
      </div>
    </ShellV2>
  );
}
