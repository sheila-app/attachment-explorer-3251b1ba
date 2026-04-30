import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, GhostCTA } from "@/components/sheila/OnboardingShell";
import { Calendar, Trophy, Users, Play, Check } from "lucide-react";

export const Route = createFileRoute("/workouts/programs/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const program = {
    id, name: "ابدئي قويّة — 4 أسابيع", weeks: 4, sessions: 16, level: "متوسّط", joined: 1240,
    desc: "برنامج متدرّج لبناء عادة التمرين، يجمع بين الكارديو وقوّة الجزء العلوي مع جلسات تعافٍ في الأصفريّة.",
  };
  const weeks = [
    { n: 1, t: "التأسيس", done: true, sessions: 4 },
    { n: 2, t: "الكثافة", done: true, sessions: 4 },
    { n: 3, t: "التحدّي", done: false, sessions: 4 },
    { n: 4, t: "الذروة", done: false, sessions: 4 },
  ];

  return (
    <FeatureShell title={program.name} back="/workouts/programs" showNav={false} variant="energetic">
      <div className="px-5 pb-8 space-y-4">
        <div className="glass-strong rounded-3xl overflow-hidden">
          <div className="relative aspect-[16/9] flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <Trophy size={56} className="text-white relative z-10" strokeWidth={1.25} />
          </div>
          <div className="relative z-10 p-5">
            <h2 className="font-display text-xl">{program.name}</h2>
            <p className="text-[12px] text-foreground/65 leading-relaxed mt-2">{program.desc}</p>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div><Calendar size={13} className="mx-auto text-primary" /><div className="font-display text-[15px] mt-1 nums">{program.weeks}</div><div className="text-[10px] text-foreground/55">أسابيع</div></div>
              <div><Play size={13} className="mx-auto text-primary" /><div className="font-display text-[15px] mt-1 nums">{program.sessions}</div><div className="text-[10px] text-foreground/55">جلسة</div></div>
              <div><Users size={13} className="mx-auto text-primary" /><div className="font-display text-[15px] mt-1 nums">{program.joined}</div><div className="text-[10px] text-foreground/55">مشتركة</div></div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">الأسابيع</h3>
          <div className="space-y-2 stagger">
            {weeks.map(w => (
              <div key={w.n} className="glass rounded-2xl p-3.5 flex items-center gap-3">
                <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: w.done ? "var(--gradient-primary)" : "color-mix(in oklab, var(--primary) 12%, transparent)" }}>
                  {w.done ? <Check size={16} className="text-white" strokeWidth={2.5} /> : <span className="font-display text-base text-primary">{w.n}</span>}
                </div>
                <div className="relative z-10 flex-1">
                  <div className="text-[13px] font-medium">الأسبوع {w.n} — {w.t}</div>
                  <div className="text-[11px] text-foreground/60 nums">{w.sessions} جلسات</div>
                </div>
                <span className="relative z-10 text-[10px] tracking-[0.18em] uppercase" style={{ color: w.done ? "var(--primary)" : "var(--foreground)", opacity: w.done ? 1 : 0.5 }}>
                  {w.done ? "مكتمل" : "قادم"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <PrimaryCTA to="/workouts/w3">ابدئي جلسة الأسبوع 3</PrimaryCTA>
        <GhostCTA to="/workouts/programs">عودة للبرامج</GhostCTA>
      </div>
    </FeatureShell>
  );
}
