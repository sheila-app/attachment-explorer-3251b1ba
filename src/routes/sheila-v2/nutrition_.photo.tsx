import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Check } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { AIGenerating, AITyping } from "@/components/sheila-v2/AITyping";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";
import { MEALS } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/nutrition_/photo")({ component: PhotoMeal });

function PhotoMeal() {
  const { dispatch } = useSheilaV2();
  const navigate = useNavigate();
  const [stage, setStage] = useState<"camera" | "gen" | "done">("camera");
  // الوجبة الناتجة عن "التعرّف" — نختار وجبة من المكتبة
  const recognized = MEALS.find((m) => m.id === "m6") ?? MEALS[0];

  function logIt() {
    dispatch({ type: "logMeal", mealId: recognized.id });
    setTimeout(() => navigate({ to: "/sheila-v2/nutrition" }), 300);
  }

  return (
    <ShellV2 title="صوّري وجبتك" back="/sheila-v2/nutrition" showFAB={false}>
      <div className="px-5">
        {stage === "camera" && (
          <div className="rounded-3xl p-10 bg-foreground/5 border-2 border-dashed border-foreground/15 flex flex-col items-center text-center">
            <Camera size={36} className="text-foreground/35" strokeWidth={1.5} />
            <p className="text-[12px] text-foreground/55 mt-3 leading-relaxed">شيلا ستتعرّف على الطبق وتحسب القيم الغذائيّة تلقائيّاً.</p>
            <button onClick={() => { setStage("gen"); setTimeout(() => setStage("done"), 1500); }}
                    className="mt-5 px-6 py-3 rounded-2xl text-primary-foreground text-[13px] font-semibold" style={{ background: "var(--gradient-primary)" }}>
              التقطي صورة
            </button>
          </div>
        )}
        {stage === "gen" && <AIGenerating label="شيلا تتعرّف على الطبق…" />}
        {stage === "done" && (
          <div className="rounded-2xl bg-white/85 border border-border p-4">
            <div className="text-[10px] text-foreground/50">ثقة عالية</div>
            <div className="font-display text-[18px] mt-1">{recognized.name}</div>
            <p className="text-[11.5px] text-foreground/65 mt-1.5"><AITyping text="تقدير حصّة متوسّطة. يمكنكِ تعديل الكميّة قبل التسجيل." speed={20} /></p>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[{l:"سعرات",v:recognized.cal},{l:"بروتين",v:`${recognized.protein}غ`},{l:"كارب",v:`${recognized.carbs}غ`},{l:"دهون",v:`${recognized.fats}غ`}].map((s) => (
                <div key={s.l} className="rounded-xl bg-secondary/40 p-2 text-center"><div className="text-[9.5px] text-foreground/55">{s.l}</div><div className="font-display text-[14px] mt-0.5 nums">{s.v}</div></div>
              ))}
            </div>
            <button onClick={logIt} className="mt-4 w-full py-3 rounded-2xl text-primary-foreground text-[13px] font-semibold flex items-center justify-center gap-2" style={{ background: "var(--gradient-primary)" }}>
              <Check size={14} strokeWidth={2.5} /> سجّلي الوجبة
            </button>
          </div>
        )}
      </div>
    </ShellV2>
  );
}
