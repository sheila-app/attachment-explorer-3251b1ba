import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Heart, Plus, Check } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";
import { MEALS } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/nutrition_/meal/$id")({ component: MealDetail });

function MealDetail() {
  const { id } = Route.useParams();
  const { dispatch, isMealLogged } = useSheilaV2();
  const navigate = useNavigate();
  const m = MEALS.find((x) => x.id === id) ?? MEALS[0];
  const logged = isMealLogged(m.id);

  function logIt() {
    dispatch({ type: "logMeal", mealId: m.id });
    setTimeout(() => navigate({ to: "/sheila-v2/nutrition" }), 300);
  }

  return (
    <ShellV2 title="تفاصيل الوجبة" back="/sheila-v2/nutrition" rightSlot={<button className="w-10 h-10 rounded-full glass flex items-center justify-center"><Heart size={16} className="relative z-10" /></button>} showFAB={false}>
      <div className="px-5">
        <div className="rounded-3xl p-5 glass-strong text-center">
          <div className="relative z-10 font-display text-[20px]">{m.name}</div>
          <div className="relative z-10 text-[11px] text-foreground/60 mt-1">{m.rationale}</div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {[{l:"سعرات",v:m.cal},{l:"بروتين",v:`${m.protein}غ`},{l:"كارب",v:`${m.carbs}غ`},{l:"دهون",v:`${m.fats}غ`}].map((s) => (
            <div key={s.l} className="rounded-xl bg-white/85 border border-border p-2.5 text-center">
              <div className="text-[9.5px] text-foreground/55">{s.l}</div>
              <div className="font-display text-[15px] mt-0.5 nums">{s.v}</div>
            </div>
          ))}
        </div>
        {logged ? (
          <div className="mt-5 flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary/10 border border-primary/30 text-primary text-[13px] font-semibold">
            <Check size={14} strokeWidth={2.5} /> مسجّلة في خطّة اليوم
          </div>
        ) : (
          <button
            onClick={logIt}
            className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-primary-foreground text-[13px] font-semibold"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Plus size={14} strokeWidth={2.5} /> سجّلي هذه الوجبة
          </button>
        )}
      </div>
    </ShellV2>
  );
}
