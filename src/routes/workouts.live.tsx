import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Video, Users, Calendar as CalIcon } from "lucide-react";

export const Route = createFileRoute("/workouts/live")({ component: Page });

const sessions = [
  { id: 1, title: "يوغا الصباح المباشر", coach: "المدرّبة دانة", time: "اليوم 07:30", participants: 24, live: true },
  { id: 2, title: "HIIT حارق", coach: "المدرّبة ريم", time: "اليوم 18:00", participants: 56, live: false },
  { id: 3, title: "بيلاتس للجذع", coach: "المدرّبة سارة", time: "غداً 09:00", participants: 18, live: false },
];

function Page() {
  return (
    <FeatureShell title="جلسات مباشرة" back="/workouts" variant="energetic">
      <div className="px-5 pb-8 space-y-3">
        {sessions.map(s => (
          <div key={s.id} className="glass-strong rounded-2xl p-4">
            <div className="relative z-10 flex items-center gap-2 mb-2">
              {s.live && <span className="px-2 py-0.5 rounded-full text-[9px] font-medium text-white nums" style={{ background: "var(--phase-menstrual)" }}>● مباشر الآن</span>}
              <span className="text-[10.5px] text-foreground/55 flex items-center gap-1"><CalIcon size={11} />{s.time}</span>
            </div>
            <h3 className="relative z-10 font-display text-[16px]">{s.title}</h3>
            <p className="relative z-10 text-[12px] text-foreground/65 mt-0.5">{s.coach}</p>
            <div className="relative z-10 flex items-center justify-between mt-3">
              <span className="text-[11px] text-foreground/55 flex items-center gap-1 nums"><Users size={11} />{s.participants} مشاركة</span>
              <button className="rounded-full px-4 py-1.5 text-[12px] font-medium text-primary-foreground flex items-center gap-1.5"
                style={{ background: "var(--gradient-primary)" }}>
                <Video size={13} className="relative z-10" />
                <span className="relative z-10">{s.live ? "انضمي الآن" : "احجزي"}</span>
              </button>
            </div>
          </div>
        ))}

        <PrimaryCTA to="/workouts">عودة للمكتبة</PrimaryCTA>
      </div>
    </FeatureShell>
  );
}
