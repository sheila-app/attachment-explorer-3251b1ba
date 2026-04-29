import { createFileRoute } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { PrimaryCTA, GhostCTA } from "@/components/sheila/OnboardingShell";
import { Flame, Clock, Heart, Trophy } from "lucide-react";

export const Route = createFileRoute("/workouts/summary")({ component: SummaryPage });

function SummaryPage() {
  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen flex flex-col overflow-hidden">
        <LiquidBackdrop variant="energetic" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-7 text-center animate-rise">
          <div className="glass-strong w-24 h-24 rounded-full flex items-center justify-center">
            <div className="absolute inset-2 rounded-full" style={{ background: "var(--gradient-primary)" }} />
            <Trophy size={36} className="relative text-primary-foreground" strokeWidth={1.75} />
          </div>
          <h1 className="font-display text-[32px] mt-6">أحسنتِ!</h1>
          <p className="text-sm text-foreground/65 mt-2 max-w-[280px]">أكملتِ تمرينكِ بنجاح. كل خطوة تقرّبكِ من هدفكِ.</p>

          <div className="grid grid-cols-3 gap-2.5 mt-8 w-full">
            <Stat icon={Clock} value="25" label="دقيقة" color="var(--primary)" />
            <Stat icon={Flame} value="320" label="سعرة" color="var(--phase-menstrual)" />
            <Stat icon={Heart} value="142" label="نبضة" color="var(--phase-ovulation)" />
          </div>

          <div className="glass-strong rounded-2xl p-5 mt-6 w-full text-right">
            <div className="relative z-10 text-[11px] tracking-[0.2em] text-foreground/55 uppercase">السلسلة</div>
            <div className="relative z-10 flex items-center justify-between mt-2">
              <span className="font-display text-3xl text-primary nums">8 أيام</span>
              <span className="text-2xl">🔥</span>
            </div>
            <div className="relative z-10 mt-3 h-1 rounded-full bg-foreground/10 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: "65%", background: "var(--gradient-primary)" }} />
            </div>
            <p className="relative z-10 text-[11px] text-foreground/60 mt-2">22 يوم لتحقيق سلسلة 30 يوم 💎</p>
          </div>
        </div>

        <div className="relative z-10 px-7 pb-9 space-y-2">
          <PrimaryCTA to="/home">العودة للرئيسية</PrimaryCTA>
          <GhostCTA to="/journey">عرض رحلتكِ</GhostCTA>
        </div>
      </div>
    </DeviceFrame>
  );
}

function Stat({ icon: Icon, value, label, color }: { icon: typeof Flame; value: string; label: string; color: string }) {
  return (
    <div className="glass rounded-2xl p-3">
      <Icon size={15} className="relative z-10" style={{ color }} strokeWidth={1.75} />
      <div className="relative z-10 font-display text-2xl mt-1.5 nums" style={{ color }}>{value}</div>
      <div className="relative z-10 text-[10px] text-foreground/60 mt-0.5">{label}</div>
    </div>
  );
}
