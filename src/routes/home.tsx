import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { BottomNav } from "@/components/sheila/BottomNav";
import { CyclePhaseRing } from "@/components/sheila/CyclePhaseRing";
import { mockUser, mockWorkouts, PHASE_META } from "@/data/mock";
import { Bell, Sparkles, Flame, Droplet, Moon } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

function HomePage() {
  const phase = PHASE_META[mockUser.currentPhase];

  return (
    <DeviceFrame>
      <div className="h-screen overflow-y-auto no-scrollbar pb-24 bg-background">
        {/* Hero */}
        <div
          className="px-5 pt-8 pb-6"
          style={{
            background: `linear-gradient(180deg, ${phase.soft} 0%, var(--background) 100%)`,
          }}
        >
          <header className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">صباح الخير</p>
              <h1 className="font-display text-2xl mt-0.5">{mockUser.name}</h1>
            </div>
            <button className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center">
              <Bell size={18} strokeWidth={1.75} />
            </button>
          </header>

          <div className="flex justify-center mt-6">
            <CyclePhaseRing
              phase={mockUser.currentPhase}
              day={mockUser.cycleDay}
              cycleLength={mockUser.cycleLength}
              size={220}
            />
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4 px-4 leading-relaxed">
            {phase.description}
          </p>
        </div>

        {/* Quick stats */}
        <div className="px-5 -mt-2">
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={Flame} label="سعرات" value="320" color="var(--phase-menstrual)" />
            <StatCard icon={Droplet} label="ماء" value="٦/٨" color="var(--primary)" />
            <StatCard icon={Moon} label="نوم" value="٧.٢س" color="var(--phase-luteal)" />
          </div>
        </div>

        {/* AI Insight */}
        <div className="px-5 mt-6">
          <div className="rounded-3xl p-5 bg-gradient-to-br from-primary/10 via-primary-soft/40 to-background border border-primary/15">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-primary-foreground" strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">رؤية اليوم من شيلا</h3>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  أنتِ في ذروة الطاقة. مناسب جدّاً لتمرين عالي الكثافة اليوم، مع وجبة غنيّة بالبروتين بعدها.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended workouts */}
        <div className="px-5 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium text-sm">تمارين موصى بها</h2>
            <Link to="/screens" className="text-xs text-primary">عرض الكل</Link>
          </div>
          <div className="space-y-3">
            {mockWorkouts.slice(0, 3).map((w) => {
              const wp = PHASE_META[w.phase];
              return (
                <div key={w.id} className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: wp.soft }}
                  >
                    <Flame size={18} style={{ color: wp.color }} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{w.title}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {w.duration} دقيقة • {w.level} • {w.calories} سعرة
                    </p>
                  </div>
                  <span
                    className="text-[10px] px-2 py-1 rounded-full"
                    style={{ backgroundColor: wp.soft, color: wp.color }}
                  >
                    {wp.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily check-in */}
        <div className="px-5 mt-6">
          <div className="rounded-3xl p-5 bg-card border border-border">
            <h3 className="font-medium text-sm">كيف تشعرين اليوم؟</h3>
            <div className="flex justify-between mt-4 gap-2">
              {["رائع", "جيّد", "عادي", "متعب", "صعب"].map((m) => (
                <button
                  key={m}
                  className="flex-1 py-2.5 rounded-xl bg-surface-warm border border-border text-xs"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </DeviceFrame>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-card rounded-2xl p-3 border border-border text-center">
      <div className="flex justify-center mb-1.5">
        <Icon size={16} style={{ color }} strokeWidth={1.75} />
      </div>
      <div className="text-base font-semibold">{value}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
