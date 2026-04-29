import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";
import { IOSWheel, wheelRange } from "@/components/sheila/IOSWheel";
import { Apple } from "lucide-react";

export const Route = createFileRoute("/nutrition/log")({ component: Page });

function Page() {
  const [meal, setMeal] = useState("breakfast");
  const [serving, setServing] = useState<number>(1);

  const items = [
    { id: 1, n: "تمر مدجول", k: 66 },
    { id: 2, n: "زبادي يوناني", k: 100 },
    { id: 3, n: "موز", k: 89 },
    { id: 4, n: "بيض مسلوق", k: 78 },
  ];
  const [sel, setSel] = useState<number[]>([1, 2]);
  const total = items.filter(i => sel.includes(i.id)).reduce((a, b) => a + b.k * serving, 0);
  const toggle = (id: number) => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <FeatureShell title="تسجيل وجبة" back="/nutrition" showNav={false} variant="warm">
      <div className="px-5 pb-8 space-y-5">
        <div>
          <h3 className="text-sm font-medium mb-2">نوع الوجبة</h3>
          <div className="grid grid-cols-4 gap-2">
            {[["breakfast","فطور"],["lunch","غداء"],["dinner","عشاء"],["snack","خفيفة"]].map(([k,t]) => (
              <button key={k} onClick={() => setMeal(k)}
                className="glass rounded-xl py-2.5 text-[11.5px] font-medium"
                style={meal === k ? { background: "var(--gradient-primary)", color: "white" } : undefined}>
                <span className="relative z-10">{t}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="relative z-10 text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-2 text-center">عدد الحصص</div>
          <div className="relative z-10 flex justify-center" style={{ direction: "ltr" }}>
            <IOSWheel values={wheelRange(1, 10)} value={serving} onChange={(v) => setServing(Number(v))} width={70} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">المكوّنات</h3>
          <div className="space-y-2">
            {items.map(i => (
              <OptionCard key={i.id} title={i.n} hint={`${i.k} سعرة / حصّة`}
                selected={sel.includes(i.id)} onClick={() => toggle(i.id)}
                leading={<Apple size={16} className="text-primary" />} />
            ))}
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-4 flex items-center justify-between">
          <span className="relative z-10 text-[12px] text-foreground/65">المجموع</span>
          <span className="relative z-10 font-display text-2xl text-primary nums">{total} <span className="text-xs text-foreground/55">سعرة</span></span>
        </div>

        <PrimaryCTA to="/nutrition">حفظ الوجبة</PrimaryCTA>
      </div>
    </FeatureShell>
  );
}
