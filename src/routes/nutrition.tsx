import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockMeals, PHASE_META } from "@/data/mock";
import { Apple, Droplet, Plus } from "lucide-react";

export const Route = createFileRoute("/nutrition")({ component: NutritionPage });

function NutritionPage() {
  const target = 1800;
  const eaten = 980;
  const pct = (eaten / target) * 100;

  return (
    <FeatureShell title="التغذية" variant="warm">
      <div className="px-5 pb-4">
        {/* Calories ring summary */}
        <div className="glass-strong rounded-2xl p-5 flex items-center gap-5">
          <div className="relative shrink-0">
            <svg width="88" height="88" className="-rotate-90">
              <circle cx="44" cy="44" r="36" fill="none" stroke="var(--color-border)" strokeWidth="6" opacity="0.4" />
              <circle cx="44" cy="44" r="36" fill="none" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 36} strokeDashoffset={2 * Math.PI * 36 * (1 - pct / 100)} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-lg text-primary nums">{eaten}</span>
              <span className="text-[9px] text-foreground/55 nums">/ {target}</span>
            </div>
          </div>
          <div className="relative z-10 flex-1">
            <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">السعرات اليوم</div>
            <div className="font-display text-2xl mt-1 nums">{target - eaten} متبقّية</div>
            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <Macro label="بروتين" v="48" t="120" color="var(--phase-follicular)" />
              <Macro label="كارب" v="120" t="220" color="var(--phase-ovulation)" />
              <Macro label="دهون" v="32" t="60" color="var(--phase-luteal)" />
            </div>
          </div>
        </div>

        {/* Water tracker */}
        <div className="glass mt-3 rounded-2xl p-4 flex items-center gap-3">
          <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "color-mix(in oklab, var(--primary) 15%, transparent)" }}
          >
            <Droplet size={17} className="text-primary" strokeWidth={1.75} />
          </div>
          <div className="relative z-10 flex-1">
            <div className="text-[12px] font-medium">الماء</div>
            <div className="flex gap-1 mt-1.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className={`flex-1 h-1.5 rounded-full ${i < 6 ? "bg-primary" : "bg-foreground/15"}`} />
              ))}
            </div>
          </div>
          <button className="relative z-10 w-8 h-8 rounded-full glass-strong flex items-center justify-center">
            <Plus size={15} className="text-primary" strokeWidth={2} />
          </button>
        </div>

        <Link to="/nutrition/recipes" className="glass-strong rounded-2xl p-3.5 flex items-center justify-between mt-3">
          <span className="relative z-10 text-[13px] font-medium">📖 مكتبة الوصفات</span>
          <span className="relative z-10 text-[11px] text-primary">تصفّحي ←</span>
        </Link>

        {/* Meals */}
        <div className="flex items-center justify-between mt-6 mb-2.5">
          <h2 className="text-sm font-medium">وجبات اليوم</h2>
          <Link to="/nutrition/log" className="text-[11px] text-primary font-medium flex items-center gap-1">
            <Plus size={12} strokeWidth={2.5} /> تسجيل وجبة
          </Link>
        </div>
        <div className="space-y-2.5 stagger">
          {mockMeals.map(m => {
            const p = PHASE_META[m.phase];
            return (
              <Link key={m.id} to="/nutrition/$id" params={{ id: m.id }}
                className="glass rounded-2xl p-3 flex items-center gap-3"
              >
                <div className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${p.color}55, ${p.color}22)` }}
                >
                  <Apple size={20} style={{ color: p.color }} strokeWidth={1.5} />
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">{m.type}</div>
                  <div className="text-[13px] font-medium truncate">{m.title}</div>
                  <div className="text-[11px] text-foreground/60 nums mt-0.5">{m.kcal} سعرة · {m.prep} د</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </FeatureShell>
  );
}

function Macro({ label, v, t, color }: { label: string; v: string; t: string; color: string }) {
  return (
    <div>
      <div className="text-[10px] text-foreground/55">{label}</div>
      <div className="text-[12px] font-medium mt-0.5 nums" style={{ color }}>{v}<span className="text-foreground/45 font-normal">/{t}</span></div>
    </div>
  );
}
