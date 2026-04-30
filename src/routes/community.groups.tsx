import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Users } from "lucide-react";

export const Route = createFileRoute("/community/groups")({ component: Page });

const GROUPS = [
  { id: "g1", name: "تحدّيات اللّياقة", members: 1284, desc: "تحدّيات أسبوعيّة للتحفيز", color: "var(--phase-ovulation)" },
  { id: "g2", name: "صحّة المرأة", members: 2103, desc: "نقاشات حول الدورة والهرمونات", color: "var(--phase-menstrual)" },
  { id: "g3", name: "أمّهات نشيطات", members: 932, desc: "للأمّهات في رحلة العودة للّياقة", color: "var(--phase-luteal)" },
  { id: "g4", name: "تغذية واعية", members: 1567, desc: "وصفات ونصائح صحّيّة", color: "var(--phase-follicular)" },
  { id: "g5", name: "يوغا وتأمّل", members: 845, desc: "مساحة هادئة للتمدّد والتنفّس", color: "var(--phase-luteal)" },
];

function Page() {
  return (
    <FeatureShell title="المجموعات" back="/community" variant="default">
      <div className="px-5 space-y-2.5 stagger">
        {GROUPS.map((g) => (
          <Link to="/community" key={g.id} className="glass rounded-2xl p-4 flex items-center gap-3">
            <div className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `color-mix(in oklab, ${g.color} 25%, transparent)` }}>
              <Users size={18} className="text-primary" strokeWidth={1.75} />
            </div>
            <div className="relative z-10 flex-1">
              <div className="text-[13px] font-medium">{g.name}</div>
              <div className="text-[11px] text-foreground/60 mt-0.5">{g.desc}</div>
              <div className="text-[10.5px] text-foreground/55 nums mt-1">{g.members.toLocaleString("ar")} عضوة</div>
            </div>
            <button className="relative z-10 text-[11px] text-primary font-medium px-3 py-1.5 rounded-full border border-primary/30">انضمّي</button>
          </Link>
        ))}
      </div>
    </FeatureShell>
  );
}
