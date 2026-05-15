import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { TierBadge } from "@/components/sheila-v2/TierBadge";
import { ACHIEVEMENTS, PILLARS, TIERS, userV2 } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/journey_/achievements")({ component: Achievements });

function Achievements() {
  return (
    <ShellV2 title="إنجازاتي" back="/sheila-v2/journey" showFAB={false}>
      <div className="px-5">
        {/* Tiers ladder */}
        <div className="rounded-3xl p-4 glass-strong text-center">
          <TierBadge score={userV2.bodyIQ} size="lg" />
          <div className="relative z-10 text-[11.5px] mt-3 text-foreground/65">المستويات الخمسة</div>
          <div className="relative z-10 grid grid-cols-5 gap-1.5 mt-3">
            {TIERS.map(t => (
              <div key={t.id} className="text-center">
                <div className="aspect-square rounded-xl" style={{ background: t.gradient, boxShadow: userV2.bodyIQ >= t.min ? `0 0 14px ${t.color}` : undefined, opacity: userV2.bodyIQ >= t.min ? 1 : 0.4 }} />
                <div className="text-[9px] mt-1 text-foreground/65">{t.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars */}
        <h2 className="text-[12px] font-semibold mt-6 mb-2.5">الأعمدة الستّة</h2>
        <div className="grid grid-cols-3 gap-2">
          {PILLARS.map(p => (
            <div key={p.id} className="rounded-2xl bg-white/85 border border-border p-3 text-center">
              <div className="w-9 h-9 rounded-full mx-auto" style={{ background: p.color, boxShadow: `0 0 12px ${p.color}66` }} />
              <div className="text-[11.5px] font-semibold mt-2">{p.name}</div>
            </div>
          ))}
        </div>

        {/* Achievements list */}
        <h2 className="text-[12px] font-semibold mt-6 mb-2.5">إنجازاتك</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {ACHIEVEMENTS.map(a => {
            const t = TIERS.find(x => x.id === a.tier)!;
            const p = PILLARS.find(x => x.id === a.pillar)!;
            return (
              <div key={a.id} className={`rounded-2xl p-3 ${a.unlocked ? "bg-white/90" : "bg-foreground/5"} border border-border`}>
                <div className="aspect-square rounded-xl flex items-center justify-center relative" style={{ background: a.unlocked ? t.gradient : "oklch(0.93 0.008 320)", filter: a.unlocked ? undefined : "grayscale(0.7)" }}>
                  {!a.unlocked && <Lock size={18} className="text-foreground/40" />}
                  <div className="absolute bottom-1.5 end-1.5 w-3 h-3 rounded-full" style={{ background: p.color }} />
                </div>
                <div className="text-[12px] font-semibold mt-2">{a.name}</div>
                <div className="text-[10px] text-foreground/55 mt-0.5 leading-tight line-clamp-2">{a.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </ShellV2>
  );
}
