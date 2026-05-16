import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockUser, PHASE_META } from "@/data/mock";
import { aiRankForMeal } from "@/data/mealsLibrary";
import type { Recipe } from "@/data/mealsLibrary";
import {
  Apple,
  Droplet,
  Plus,
  BookOpen,
  Sparkles,
  Barcode,
  Search as SearchIcon,
  Camera,
} from "lucide-react";

export const Route = createFileRoute("/nutrition/")({ component: NutritionPage });

function NutritionPage() {
  const target = mockUser.dailyKcal;
  const eaten = 980;
  const pct = (eaten / target) * 100;

  const protein = { v: 48, t: mockUser.dailyProtein };
  const carbs = { v: 120, t: mockUser.dailyCarbs };
  const fat = { v: 32, t: mockUser.dailyFat };

  const phaseMeta = PHASE_META[mockUser.currentPhase];

  // AI suggestion for next meal (lunch as example)
  const aiSuggestions = aiRankForMeal({
    type: "غداء",
    phase: mockUser.currentPhase,
    remainingProtein: protein.t - protein.v,
    alreadyLoggedIds: [],
    diet: ["halal"],
  });
  const topAi = aiSuggestions[0];

  return (
    <FeatureShell title="التغذية" variant="warm">
      <div className="px-5 pb-4">
        {/* Phase chip + day nav */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium"
            style={{ background: `color-mix(in oklab, ${phaseMeta.color} 14%, transparent)`, color: phaseMeta.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: phaseMeta.color }} />
            مرحلة {phaseMeta.name}
          </div>
          <div className="text-[11px] text-foreground/55">اليوم</div>
        </div>

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
              <Macro label="بروتين" v={String(protein.v)} t={String(protein.t)} color="var(--phase-follicular)" />
              <Macro label="كارب" v={String(carbs.v)} t={String(carbs.t)} color="var(--phase-ovulation)" />
              <Macro label="دهون" v={String(fat.v)} t={String(fat.t)} color="var(--phase-luteal)" />
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

        {/* AI suggestion */}
        {topAi && (
          <Link
            to="/nutrition/$id"
            params={{ id: topAi.id }}
            className="glass-strong mt-3 rounded-2xl p-4 flex items-center gap-3 active:scale-[0.99] transition-transform block"
          >
            <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `linear-gradient(135deg, ${phaseMeta.color}55, ${phaseMeta.color}22)` }}
            >
              {topAi.emoji}
            </div>
            <div className="relative z-10 flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Sparkles size={11} className="text-primary" strokeWidth={2.5} />
                <span className="text-[10px] tracking-[0.2em] text-primary uppercase font-semibold">اقتراح ذكيّ — {topAi.type}</span>
              </div>
              <div className="text-[13px] font-medium truncate mt-0.5">{topAi.arName}</div>
              <div className="text-[11px] text-foreground/65 nums mt-0.5">{topAi.kcal} سعرة · {topAi.protein}غ بروتين · {topAi.prep + topAi.cookTime} د</div>
            </div>
            <ChevronLeft size={14} className="relative z-10 text-primary shrink-0" strokeWidth={2.5} />
          </Link>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          <QuickAction to="/nutrition/recipes" Icon={BookOpen} label="وصفات" />
          <QuickAction to="/nutrition/shopping" Icon={ShoppingCart} label="مشتريات" />
          <QuickAction to="/nutrition/log" Icon={SearchIcon} label="بحث" />
          <QuickAction to="/nutrition/log" Icon={Barcode} label="باركود" />
        </div>

        {/* Meals */}
        <div className="flex items-center justify-between mt-6 mb-2.5 gap-3">
          <h2 className="text-sm font-medium shrink-0">وجبات اليوم</h2>
          <Link to="/nutrition/log" className="shrink-0 inline-flex items-center gap-1 text-[11px] text-primary font-medium glass rounded-full px-3 py-1.5">
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

function QuickAction({ to, Icon, label }: { to: string; Icon: typeof Apple; label: string }) {
  return (
    <Link to={to as "/"} className="glass rounded-2xl p-3 flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
      <Icon size={16} className="relative z-10 text-primary" strokeWidth={1.75} />
      <span className="relative z-10 text-[10.5px] font-medium">{label}</span>
    </Link>
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
