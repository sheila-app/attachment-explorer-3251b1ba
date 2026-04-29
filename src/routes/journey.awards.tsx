import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockAchievements } from "@/data/mock";

export const Route = createFileRoute("/journey/awards")({ component: AwardsPage });

function AwardsPage() {
  return (
    <FeatureShell title="الإنجازات" back="/journey" variant="calm">
      <div className="px-5">
        <p className="text-[12.5px] text-foreground/65 mb-4 leading-relaxed">كل خطوة تُحتفل بها — جمعتِ 3 إنجازات حتى الآن، استمرّي!</p>
        <div className="grid grid-cols-2 gap-2.5 stagger">
          {mockAchievements.map(a => (
            <div key={a.id} className="glass rounded-2xl p-4 text-center" style={!a.unlocked ? { opacity: 0.5 } : undefined}>
              <div className="relative z-10 text-4xl">{a.unlocked ? a.icon : "🔒"}</div>
              <div className="relative z-10 text-[12.5px] font-medium mt-2">{a.name}</div>
              {a.unlocked && a.date && <div className="relative z-10 text-[10px] text-foreground/55 mt-0.5">{a.date}</div>}
            </div>
          ))}
        </div>
      </div>
    </FeatureShell>
  );
}
