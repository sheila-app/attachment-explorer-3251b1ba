import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, ChevronLeft, Droplets, ListChecks } from "lucide-react";
import { ShellV2, PhasePill } from "@/components/sheila-v2/ShellV2";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";
import { MealCard } from "@/components/sheila-v2/MealCard";
import { userV2, PHASE_META, MEALS, MEAL_TYPES } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/nutrition")({ component: NutritionIdx });

function NutritionIdx() {
  const { state, dispatch, caloriesToday, proteinToday, isMealLogged } = useSheilaV2();
  const navigate = useNavigate();
  const phase = state.currentPhase;
  const meta = PHASE_META[phase];

  return (
    <ShellV2 title="التغذية" rightSlot={<PhasePill phase={phase} name={meta.name} color={meta.color} />}>
      <div className="px-5">
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white/80 border border-border p-3">
          <Sum label="السعرات" v={`${caloriesToday}`} of={`${userV2.caloriesTarget}`} c="var(--phase-menstrual)" />
          <Sum label="بروتين" v={`${proteinToday}غ`} of={`${userV2.proteinTarget}غ`} c="var(--primary)" />
          <Sum label="ماء" v={`${state.waterCups}/${userV2.waterTarget}`} of="كأس" c="var(--phase-ovulation)" />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            onClick={() => dispatch({ type: "addWater" })}
            className="rounded-2xl py-2.5 bg-white/85 border border-border flex items-center justify-center gap-1.5 text-[12px] font-medium active:scale-[0.98]"
          >
            <Droplets size={13} className="text-primary" /> +1 كأس
          </button>
          <Link to="/sheila-v2/nutrition/shopping" className="rounded-2xl py-2.5 bg-white/85 border border-border flex items-center justify-center gap-1.5 text-[12px] font-medium">
            <ListChecks size={13} className="text-foreground/65" /> قائمة التسوّق
          </Link>
        </div>

        <Link to="/sheila-v2/nutrition/recipes" className="mt-3 rounded-2xl p-3.5 flex items-center gap-3 active:scale-[0.99]"
              style={{ background: "linear-gradient(135deg, oklch(0.96 0.04 322), oklch(0.96 0.04 145))", border: "1px solid oklch(0.92 0.04 322)" }}>
          <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center"><BookOpen size={18} className="text-primary" /></div>
          <div className="flex-1"><div className="text-[13px] font-semibold">اطلبي وصفة من شيلا</div><div className="text-[11px] text-foreground/65">صفي ما عندك، شيلا تبني الوصفة</div></div>
          <ChevronLeft size={16} className="text-foreground/40" />
        </Link>

        <h2 className="text-[12px] font-semibold mt-5 mb-2.5">وجبات اليوم</h2>
        <div className="space-y-3">
          {MEAL_TYPES.map((mt) => {
            const m = MEALS.find((x) => x.type === mt.id && x.phase?.includes(phase)) ?? MEALS.find((x) => x.type === mt.id)!;
            const logged = isMealLogged(m.id);
            return (
              <MealCard
                key={mt.id}
                type={mt.label}
                time={mt.time}
                mealId={m.id}
                mealName={m.name}
                cal={m.cal}
                protein={m.protein}
                tint={meta.color}
                logged={logged}
                onLog={() => dispatch({ type: "logMeal", mealId: m.id })}
                onSheila={() => navigate({ to: "/sheila-v2/sheila" })}
                onLibrary={() => navigate({ to: "/sheila-v2/nutrition/recipes" })}
                onPhoto={() => navigate({ to: "/sheila-v2/nutrition/photo" })}
                onSearch={() => navigate({ to: "/sheila-v2/nutrition/recipes" })}
                onBarcode={() => navigate({ to: "/sheila-v2/nutrition/photo" })}
                onIngredients={() => navigate({ to: "/sheila-v2/nutrition/meal/$id", params: { id: m.id } })}
              />
            );
          })}
        </div>
      </div>
    </ShellV2>
  );
}
function Sum({ label, v, of, c }: { label: string; v: string; of: string; c: string }) {
  return (
    <div className="text-center">
      <div className="text-[9.5px] text-foreground/55">{label}</div>
      <div className="font-display text-[16px] mt-0.5 nums" suppressHydrationWarning style={{ color: c }}>{v}</div>
      <div className="text-[9px] text-foreground/50 mt-0.5">{of}</div>
    </div>
  );
}
