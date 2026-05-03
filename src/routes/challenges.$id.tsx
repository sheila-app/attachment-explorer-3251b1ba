import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Trophy, Users, Calendar, Check, Wind } from "lucide-react";

export const Route = createFileRoute("/challenges/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  return (
    <FeatureShell title="تفاصيل التحدّي" back="/challenges" showNav={false} variant="energetic">
      <div className="px-5 space-y-4">
        <div className="glass-strong rounded-2xl p-5 text-center">
          <div className="relative z-10 flex items-center justify-center w-16 h-16 mx-auto rounded-2xl" style={{ background: "var(--gradient-primary)" }}><Wind size={32} strokeWidth={1.75} className="text-white" /></div>
          <h2 className="relative z-10 font-display text-[20px] mt-3">تحدّي 7 أيام يوغا</h2>
          <p className="relative z-10 text-[12px] text-foreground/65 mt-2">جلسة يوميّة 15 دقيقة، تتناسب مع مرحلتكِ من الدورة.</p>
          <div className="relative z-10 grid grid-cols-3 gap-2 mt-4 text-center">
            <div><div className="font-display text-lg text-primary nums">7</div><div className="text-[10px] text-foreground/55">أيّام</div></div>
            <div><div className="font-display text-lg text-primary nums">15</div><div className="text-[10px] text-foreground/55">دقيقة/يوم</div></div>
            <div><div className="font-display text-lg text-primary nums">1.2K</div><div className="text-[10px] text-foreground/55">منضمّة</div></div>
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="relative z-10 text-[12px] font-medium mb-3">جدول الأيّام</div>
          <div className="relative z-10 space-y-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium nums"
                  style={i < 2 ? { background: "var(--gradient-primary)", color: "white" } : { background: "oklch(0.94 0.01 320)" }}>
                  {i < 2 ? <Check size={13} /> : i + 1}
                </div>
                <div className="flex-1 text-[12px]">اليوم {i + 1} — تحيّة الشمس</div>
                <div className="text-[10px] text-foreground/55">15د</div>
              </div>
            ))}
          </div>
        </div>

        <PrimaryCTA to="/community">انضمّي للتحدّي</PrimaryCTA>
        <p className="text-[10px] text-center text-foreground/50">معرّف: {id}</p>
      </div>
    </FeatureShell>
  );
}
