import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronLeft, Sparkles, Droplets, Moon, Apple, Dumbbell, Users, Trophy, Plus, Check } from "lucide-react";
import { ShellV2, HomeHeader, PhasePill } from "@/components/sheila-v2/ShellV2";
import { AITyping, AIGenerating, useFakeGenerate } from "@/components/sheila-v2/AITyping";
import { TierBadge } from "@/components/sheila-v2/TierBadge";
import { CyclePhaseRing } from "@/components/sheila/CyclePhaseRing";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";
import { userV2, PHASE_META, DAILY_MESSAGES, WORKOUTS, MEALS, tierFor } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/home")({ component: HomeV2 });

function HomeV2() {
  const { state, dispatch, caloriesToday, proteinToday, isWorkoutDone, isMealLogged } = useSheilaV2();
  const phase = state.currentPhase;
  const meta = PHASE_META[phase];
  const ready = useFakeGenerate(phase, 1100);
  const message = DAILY_MESSAGES[phase][0];
  const tier = tierFor(state.bodyIQ);
  const workout = WORKOUTS.find((w) => w.phase.includes(phase)) ?? WORKOUTS[0];
  const meal = MEALS.find((m) => m.type === "lunch" && m.phase?.includes(phase)) ?? MEALS[3];
  const workoutDone = isWorkoutDone(workout.id);
  const mealDone = isMealLogged(meal.id);

  return (
    <ShellV2 bare>
      <HomeHeader name={userV2.name} />

      {/* Block 1 — تحيّة + مرحلة */}
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] tracking-widest text-foreground/50">اليوم</div>
            <div className="font-display text-[24px] leading-tight mt-1">يوم {meta.name} مشرق</div>
          </div>
          <PhasePill phase={phase} name={meta.name} color={meta.color} />
        </div>
      </div>

      {/* حلقة الدورة */}
      <Link to="/sheila-v2/cycle" className="block mt-3">
        <div className="flex items-center justify-center">
          <CyclePhaseRing phase={phase as any} day={userV2.cycleDay} cycleLength={userV2.cycleLength} size={260} />
        </div>
      </Link>

      {/* Block 2 — Daily Message */}
      <div className="px-5 mt-4">
        <div className="rounded-3xl p-4 relative overflow-hidden glass-strong">
          <div className="relative z-10 flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles size={13} className="text-primary-foreground" strokeWidth={2.2} />
            </div>
            <div className="text-[11px] font-semibold text-primary">رسالة شيلا الصباحيّة</div>
          </div>
          {!ready ? (
            <AIGenerating label="شيلا تكتب رسالتك…" />
          ) : (
            <p className="relative z-10 text-[13.5px] leading-[1.85] text-foreground/85">
              <AITyping text={message} speed={20} />
            </p>
          )}
          {ready && (
            <Link to="/sheila-v2/sheila" className="relative z-10 inline-flex items-center gap-1 text-[11.5px] text-primary font-medium mt-3">
              اسألي شيلا أكثر
              <ChevronLeft size={12} strokeWidth={2.5} />
            </Link>
          )}
        </div>
      </div>

      {/* Block 3 — Body IQ + إحصاءات حيّة */}
      <div className="px-5 mt-4 grid grid-cols-[auto_1fr] gap-3 items-center">
        <Link to="/sheila-v2/journey/achievements" className="block">
          <TierBadge score={state.bodyIQ} size="md" />
          <div className="text-center mt-1.5 text-[10.5px] font-semibold" style={{ color: tier.color }}>{tier.name}</div>
        </Link>
        <div className="grid grid-cols-3 gap-2">
          <StatTile icon={Moon} label="نوم" value={`${userV2.sleepHours}`} hint="ساعة" color="var(--phase-luteal)" to="/sheila-v2/journey" />
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); dispatch({ type: "addWater" }); }}
            className="rounded-2xl bg-white/85 border border-border p-3 active:scale-[0.97] transition-transform text-right"
          >
            <div className="flex items-center gap-1.5">
              <Droplets size={12} style={{ color: "var(--primary)" }} strokeWidth={2} />
              <span className="text-[10px] text-foreground/55">ماء +</span>
            </div>
            <div className="font-display text-[18px] mt-1 leading-none nums" style={{ color: "var(--primary)" }}>{state.waterCups}/{userV2.waterTarget}</div>
            <div className="text-[9.5px] text-foreground/50 mt-0.5">اضغطي +</div>
          </button>
          <StatTile icon={Apple} label="سعرات" value={`${caloriesToday}`} hint={`من ${userV2.caloriesTarget}`} color="var(--phase-menstrual)" to="/sheila-v2/nutrition" />
        </div>
      </div>

      {/* بروتين mini bar */}
      <div className="px-5 mt-2">
        <div className="text-[10px] text-foreground/55 flex justify-between"><span>البروتين</span><span className="nums">{proteinToday}/{userV2.proteinTarget}غ</span></div>
        <div className="h-1.5 rounded-full bg-foreground/10 mt-1 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${Math.min(100, (proteinToday / userV2.proteinTarget) * 100)}%`, background: "var(--gradient-primary)" }} />
        </div>
      </div>

      {/* Block 4 — خطّة اليوم */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[13px] font-semibold">خطّة اليوم</h2>
          <span className="text-[10px] text-foreground/50">من شيلا</span>
        </div>
        <div className="grid gap-2.5">
          <Link
            to="/sheila-v2/workouts/player"
            onClick={() => dispatch({ type: "selectWorkout", workoutId: workout.id })}
            className="rounded-2xl p-3.5 bg-white/85 border border-border flex items-center gap-3 active:scale-[0.99] transition-transform"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${meta.color}55, ${meta.color}22)` }}>
              {workoutDone ? <Check size={18} className="text-primary" strokeWidth={2.2} /> : <Dumbbell size={18} style={{ color: meta.color }} strokeWidth={1.9} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium truncate">{workout.title}</div>
              <div className="text-[10.5px] text-foreground/60 mt-0.5">{workout.duration} د • {workout.level} • {workout.cal} سعرة</div>
            </div>
            {workoutDone ? <span className="text-[10.5px] text-primary font-semibold">مكتمل</span> : <ChevronLeft size={16} className="text-foreground/40" />}
          </Link>
          <Link
            to="/sheila-v2/nutrition/meal/$id"
            params={{ id: meal.id }}
            className="rounded-2xl p-3.5 bg-white/85 border border-border flex items-center gap-3 active:scale-[0.99] transition-transform"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, oklch(0.96 0.04 145), oklch(0.94 0.04 145))" }}>
              {mealDone ? <Check size={18} className="text-primary" strokeWidth={2.2} /> : <Apple size={18} style={{ color: "oklch(0.55 0.13 145)" }} strokeWidth={1.9} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium truncate">{meal.name}</div>
              <div className="text-[10.5px] text-foreground/60 mt-0.5">{meal.cal} سعرة • {meal.protein}غ بروتين</div>
            </div>
            {mealDone ? (
              <span className="text-[10.5px] text-primary font-semibold">مسجّلة</span>
            ) : (
              <button
                onClick={(e) => { e.preventDefault(); dispatch({ type: "logMeal", mealId: meal.id }); }}
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                aria-label="سجّلي"
              >
                <Plus size={14} className="text-primary" strokeWidth={2.5} />
              </button>
            )}
          </Link>
        </div>
      </div>

      {/* Block 5 — دائرة شيلا */}
      <div className="px-5 mt-5">
        <Link to="/sheila-v2/circle" className="block rounded-2xl p-4 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, oklch(0.96 0.04 322), oklch(0.97 0.035 75))", border: "1px solid oklch(0.92 0.04 322)" }}>
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center shrink-0">
              <Users size={18} className="text-primary" strokeWidth={1.9} />
            </div>
            <div className="flex-1">
              <div className="text-[13.5px] font-semibold">دائرة شيلا</div>
              <div className="text-[11px] text-foreground/65 mt-0.5">
                {state.feedPosts.length > 0 ? `+${state.feedPosts.length} منشور جديد منكِ` : "3 منشورات جديدة من مجموعاتك اليوم"}
              </div>
            </div>
            <ChevronLeft size={16} className="text-foreground/40 mt-1.5" />
          </div>
        </Link>
      </div>

      {/* اختصارات */}
      <div className="px-5 mt-4 grid grid-cols-4 gap-2.5">
        <Shortcut to="/sheila-v2/journey/achievements" icon={Trophy} label="الإنجازات" color="oklch(0.78 0.14 75)" />
        <Shortcut to="/sheila-v2/cycle" icon={motion.div as any} label="الدورة" color="var(--phase-luteal)" />
        <Shortcut to="/sheila-v2/journey/insights" icon={Sparkles} label="الرؤى" color="var(--primary)" />
        <Shortcut
          to="/sheila-v2/circle/accountability"
          icon={Users}
          label={state.partner ? state.partner.name : "شريك"}
          color="var(--phase-follicular)"
        />
      </div>

      <div className="h-6" />
    </ShellV2>
  );
}

function StatTile({ icon: Icon, label, value, hint, color, to }: any) {
  return (
    <Link to={to} className="rounded-2xl bg-white/85 border border-border p-3 active:scale-[0.97] transition-transform">
      <div className="flex items-center gap-1.5">
        <Icon size={12} style={{ color }} strokeWidth={2} />
        <span className="text-[10px] text-foreground/55">{label}</span>
      </div>
      <div className="font-display text-[18px] mt-1 leading-none nums" style={{ color }}>{value}</div>
      <div className="text-[9.5px] text-foreground/50 mt-0.5">{hint}</div>
    </Link>
  );
}
function Shortcut({ to, icon: Icon, label, color }: any) {
  return (
    <Link to={to} className="flex flex-col items-center gap-1.5 bg-white/80 rounded-2xl border border-border p-2.5 active:scale-95 transition-transform">
      <Icon size={20} style={{ color }} strokeWidth={1.75} />
      <span className="text-[10.5px] text-foreground/70 truncate max-w-full">{label}</span>
    </Link>
  );
}
