import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Trophy, Users, Clock, Wind, Footprints, Droplets, Dumbbell } from "lucide-react";

export const Route = createFileRoute("/challenges/")({ component: Page });

const challenges = [
  { id: "ch1", title: "تحدّي 7 أيام يوغا", days: 7, joined: 1240, Icon: Wind, reward: "شارة الهدوء" },
  { id: "ch2", title: "30 يوماً من المشي", days: 30, joined: 3580, Icon: Footprints, reward: "شارة المثابرة" },
  { id: "ch3", title: "أسبوع الترطيب", days: 7, joined: 890, Icon: Droplets, reward: "شارة النقاء" },
  { id: "ch4", title: "تحدّي القوّة", days: 14, joined: 620, Icon: Dumbbell, reward: "شارة البطلة" },
];

function Page() {
  return (
    <FeatureShell title="التحدّيات" back="/community" variant="energetic">
      <div className="px-5 space-y-3 stagger">
        <div className="glass-strong rounded-2xl p-4">
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Trophy size={20} className="text-white" strokeWidth={1.75} />
            </div>
            <div>
              <div className="font-display text-[18px] leading-none">انضمّي وتحدّي نفسكِ</div>
              <p className="text-[11.5px] text-foreground/60 mt-1">اربحي شارات وشاركي إنجازكِ.</p>
            </div>
          </div>
        </div>

        {challenges.map(c => (
          <Link to="/challenges/$id" params={{ id: c.id }} key={c.id} className="glass rounded-2xl p-4 flex items-center gap-3">
            <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}><c.Icon size={20} strokeWidth={1.75} className="text-white" /></div>
            <div className="relative z-10 flex-1 min-w-0">
              <div className="text-[13.5px] font-medium">{c.title}</div>
              <div className="flex items-center gap-3 mt-1 text-[10.5px] text-foreground/60 nums">
                <span className="flex items-center gap-1"><Clock size={10} /> {c.days} يوم</span>
                <span className="flex items-center gap-1"><Users size={10} /> {c.joined.toLocaleString("ar-EG")}</span>
              </div>
            </div>
            <div className="relative z-10 text-[10px] text-primary">{c.reward}</div>
          </Link>
        ))}
      </div>
    </FeatureShell>
  );
}
