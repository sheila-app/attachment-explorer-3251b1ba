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

        {/* === وجبات اليوم — بطاقة لكلّ وقت === */}
        <div className="mt-6 mb-2.5">
          <h2 className="text-sm font-medium">وجبات اليوم</h2>
        </div>
        <div className="space-y-3 stagger">
          {MEAL_SLOTS.map((slot) => {
            const suggestion = aiRankForMeal({
              type: slot.type,
              phase: mockUser.currentPhase,
              remainingProtein: protein.t - protein.v,
              alreadyLoggedIds: [],
              diet: ["halal"],
            })[0];
            return (
              <MealSlotCard
                key={slot.type}
                label={slot.label}
                time={slot.time}
                suggestion={suggestion}
                phaseColor={phaseMeta.color}
              />
            );
          })}
        </div>
      </div>
    </FeatureShell>
  );
}

/* ---------- Meal slot card (matches reference structure) ---------- */

type MealType = "فطور" | "غداء" | "عشاء" | "وجبة خفيفة";

const MEAL_SLOTS: { type: MealType; label: string; time: string }[] = [
  { type: "فطور", label: "فطور", time: "07:00 – 10:00" },
  { type: "غداء", label: "غداء", time: "12:00 – 15:00" },
  { type: "عشاء", label: "عشاء", time: "18:00 – 21:00" },
  { type: "وجبة خفيفة", label: "وجبة خفيفة", time: "بين الوجبات" },
];

function MealSlotCard({
  label, time, suggestion, phaseColor,
}: { label: string; time: string; suggestion: Recipe | undefined; phaseColor: string }) {
  if (!suggestion) return null;
  return (
    <div className="glass-strong rounded-2xl p-4">
      {/* header: time + meal label */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-[10.5px] text-foreground/55 nums">{time}</span>
        <span className="text-[13px] font-semibold">{label}</span>
      </div>

      {/* AI suggestion banner */}
      <Link
        to="/nutrition/$id"
        params={{ id: suggestion.id }}
        className="relative z-10 block rounded-xl p-3.5 mb-3"
        style={{ background: `color-mix(in oklab, ${phaseColor} 12%, transparent)` }}
      >
        <div className="flex items-center gap-1.5 mb-1.5 justify-end">
          <span className="text-[11px] font-semibold" style={{ color: phaseColor }}>اقتراح شيلا</span>
          <Sparkles size={12} strokeWidth={2.5} style={{ color: phaseColor }} />
        </div>
        <div className="text-[13.5px] font-medium leading-snug text-right">{suggestion.arName}</div>
        <div className="text-[11px] text-foreground/60 nums mt-1 text-right">
          {suggestion.kcal} سعرة · {suggestion.protein}غ بروتين
        </div>
      </Link>

      {/* Primary CTA */}
      <button
        className="relative z-10 w-full rounded-2xl py-3.5 text-[13.5px] font-semibold text-primary-foreground mb-3"
        style={{ background: "var(--gradient-primary)" }}
      >
        سجّلي هذا
      </button>

      {/* 6 quick actions row */}
      <div className="relative z-10 grid grid-cols-6 gap-1.5">
        <SlotAction to="/assistant" Icon={Sparkles} label="شيلا" />
        <SlotAction to="/nutrition/$id" params={{ id: suggestion.id }} Icon={Plus} label="مكوّنات" />
        <SlotAction to="/nutrition/log" Icon={Barcode} label="باركود" />
        <SlotAction to="/nutrition/recipes" Icon={BookOpen} label="المكتبة" />
        <SlotAction to="/nutrition/log" Icon={SearchIcon} label="ابحثي" />
        <SlotAction to="/nutrition/log" Icon={Camera} label="صوّري" />
      </div>
    </div>
  );
}

function SlotAction({
  to, params, Icon, label,
}: { to: string; params?: Record<string, string>; Icon: typeof Apple; label: string }) {
  return (
    <Link
      to={to as "/"}
      params={params as never}
      className="glass rounded-xl py-2 flex flex-col items-center gap-1 active:scale-95 transition-transform"
    >
      <Icon size={14} className="relative z-10 text-foreground/70" strokeWidth={1.75} />
      <span className="relative z-10 text-[9.5px] font-medium text-foreground/70">{label}</span>
    </Link>
  );
}
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
