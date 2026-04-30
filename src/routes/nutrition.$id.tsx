import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { mockMeals, PHASE_META } from "@/data/mock";
import { Apple, Clock, Heart, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/nutrition/$id")({ component: MealDetail });

function MealDetail() {
  const { id } = useParams({ from: "/nutrition/$id" });
  const m = mockMeals.find(x => x.id === id) ?? mockMeals[0];
  const p = PHASE_META[m.phase];

  const ingredients = ["1 كوب كينوا مطبوخ", "150 جم صدر دجاج مشوي", "1/2 خيار مقطّع", "1/4 كوب طماطم كرزيّة", "ملعقة زيت زيتون", "ليمون وملح وفلفل"];

  return (
    <FeatureShell title="تفاصيل الوجبة" back="/nutrition" showNav={false} variant="warm">
      <div className="px-5 pb-6">
        <div className="glass-strong rounded-2xl overflow-hidden">
          <div className="relative aspect-video flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${p.color}55, ${p.color}22)` }}
          >
            <Apple size={56} style={{ color: p.color }} strokeWidth={1.25} className="relative" />
          </div>
          <div className="relative z-10 p-5">
            <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: p.color }}>{m.type}</span>
            <h1 className="font-display text-2xl mt-1.5">{m.title}</h1>
            <div className="flex items-center gap-3 mt-3 text-[12px] text-foreground/65 nums">
              <span className="inline-flex items-center gap-1"><Clock size={12} />{m.prep} د</span>
              <span className="inline-flex items-center gap-1"><Heart size={12} />سهلة</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          <Macro label="سعرات" v={m.kcal} unit="" />
          <Macro label="بروتين" v={m.protein} unit="جم" />
          <Macro label="كارب" v={m.carbs} unit="جم" />
          <Macro label="دهون" v={m.fat} unit="جم" />
        </div>

        <h2 className="text-sm font-medium mt-6 mb-2.5">المكوّنات</h2>
        <div className="glass rounded-2xl p-4 space-y-2">
          {ingredients.map((it, i) => (
            <div key={i} className="relative z-10 flex items-start gap-2 text-[13px]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>{it}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <PrimaryCTA to="/nutrition">سجّلي الوجبة</PrimaryCTA>
          <Link to="/nutrition/shopping" className="glass-strong w-full rounded-2xl py-3.5 flex items-center justify-center gap-2 text-[13px] font-medium">
            <ShoppingCart size={14} className="relative z-10" />
            <span className="relative z-10">إضافة المكوّنات إلى المشتريات</span>
          </Link>
        </div>
      </div>
    </FeatureShell>
  );
}

function Macro({ label, v, unit }: { label: string; v: number; unit: string }) {
  return (
    <div className="glass rounded-xl p-2.5 text-center">
      <div className="relative z-10 text-[10px] text-foreground/55">{label}</div>
      <div className="relative z-10 font-display text-lg text-primary nums mt-0.5">{v}<span className="text-[10px] text-foreground/55 font-normal mr-0.5">{unit}</span></div>
    </div>
  );
}
