import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { achievementsTiered } from "@/data/gamification";
import { Star, Award, Crown, Lock } from "lucide-react";

export const Route = createFileRoute("/achievements")({ component: AchievementsPage });

const TIERS = [
  { key: "micro", title: "إنجازات صغيرة", subtitle: "لحظات يوميّة", Icon: Star, color: "var(--phase-follicular)" },
  { key: "macro", title: "إنجازات كبرى", subtitle: "علامات الدورة", Icon: Award, color: "var(--phase-ovulation)" },
  { key: "legacy", title: "إنجازات خالدة", subtitle: "الإرث", Icon: Crown, color: "var(--primary-glow)" },
] as const;

function AchievementsPage() {
  return (
    <FeatureShell title="الإنجازات" back="/bodyiq" variant="energetic">
      <div className="px-5 pb-6 space-y-6">
        {TIERS.map((tier) => {
          const items = achievementsTiered[tier.key];
          return (
            <section key={tier.key}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `color-mix(in oklab, ${tier.color} 18%, transparent)` }}
                >
                  <tier.Icon size={18} style={{ color: tier.color }} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[14px] font-semibold">{tier.title}</div>
                  <div className="text-[11px] text-foreground/55">{tier.subtitle}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {items.map((a) => (
                  <div key={a.id} className="glass rounded-2xl p-3.5"
                    style={a.unlocked ? { boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${tier.color} 45%, transparent)` } : undefined}
                  >
                    <div className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center"
                      style={a.unlocked
                        ? { background: `color-mix(in oklab, ${tier.color} 20%, transparent)` }
                        : { background: "color-mix(in oklab, var(--foreground) 6%, transparent)" }}
                    >
                      {a.unlocked
                        ? <tier.Icon size={15} style={{ color: tier.color }} strokeWidth={2} />
                        : <Lock size={13} className="text-foreground/45" strokeWidth={2} />}
                    </div>
                    <div className="relative z-10 mt-2 text-[12.5px] font-semibold leading-tight">
                      {("arName" in a && a.arName) ? a.arName : a.name}
                    </div>
                    {"desc" in a && a.desc && <div className="relative z-10 text-[10.5px] text-foreground/55 mt-1">{a.desc}</div>}
                    {a.unlocked && "date" in a && a.date && (
                      <div className="relative z-10 text-[10px] mt-1.5" style={{ color: tier.color }}>{a.date}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </FeatureShell>
  );
}
