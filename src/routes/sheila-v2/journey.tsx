import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Trophy, FileText, ChevronLeft, Flame } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { TierBadge } from "@/components/sheila-v2/TierBadge";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";
import { ACHIEVEMENTS, tierFor } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/journey")({ component: Journey });

function Journey() {
  const { state, caloriesToday } = useSheilaV2();
  const t = tierFor(state.bodyIQ);
  const unlocked = state.unlockedAchievements.length;
  return (
    <ShellV2 title="رحلتك">
      <div className="px-5">
        <div className="rounded-3xl p-5 glass-strong text-center">
          <TierBadge score={state.bodyIQ} size="lg" />
          <div className="relative z-10 font-display text-[18px] mt-3" style={{ color: t.color }}>{t.name}</div>
          <div className="relative z-10 text-[11.5px] text-foreground/65 mt-1">{t.description}</div>
          <div className="relative z-10 inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full bg-white/60 text-[11px]">
            <Flame size={12} className="text-phase-menstrual" /> سلسلة {state.streak} يوماً
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <Mini label="تمارين اليوم" v={state.completedWorkouts.length} />
          <Mini label="وجبات" v={state.loggedMeals.length} />
          <Mini label="سعرات" v={caloriesToday} />
        </div>

        <div className="grid gap-2.5 mt-4">
          {[
            { to: "/sheila-v2/journey/insights", icon: Sparkles, title: "Smart Insights", body: "4 رؤى أسبوعيّة من شيلا" },
            { to: "/sheila-v2/journey/achievements", icon: Trophy, title: "إنجازاتي", body: `${unlocked} من ${ACHIEVEMENTS.length} إنجاز مفتوح` },
            { to: "/sheila-v2/journey/report", icon: FileText, title: "التقرير الشهري", body: "مارس 2026 جاهز" },
          ].map((r, i) => (
            <Link key={i} to={r.to as "/"} className="rounded-2xl bg-white/85 border border-border p-4 flex items-center gap-3 active:scale-[0.99]">
              <div className="w-11 h-11 rounded-xl bg-secondary/60 flex items-center justify-center"><r.icon size={18} className="text-primary" strokeWidth={1.9} /></div>
              <div className="flex-1"><div className="text-[13px] font-semibold">{r.title}</div><div className="text-[11px] text-foreground/55 mt-0.5">{r.body}</div></div>
              <ChevronLeft size={16} className="text-foreground/40" />
            </Link>
          ))}
        </div>
      </div>
    </ShellV2>
  );
}

function Mini({ label, v }: { label: string; v: number }) {
  return (
    <div className="rounded-2xl bg-white/85 border border-border p-3 text-center">
      <div className="text-[10px] text-foreground/55">{label}</div>
      <div className="font-display text-[18px] mt-0.5 nums">{v}</div>
    </div>
  );
}
