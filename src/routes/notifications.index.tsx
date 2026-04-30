import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockNotifications } from "@/data/mock";
import { Bell, Calendar, Trophy, MessageCircle } from "lucide-react";

const ICONS = { workout: Bell, cycle: Calendar, award: Trophy, community: MessageCircle } as const;
const COLORS: Record<string, string> = {
  workout: "var(--primary)",
  cycle: "var(--phase-menstrual)",
  award: "var(--phase-ovulation)",
  community: "var(--phase-follicular)",
};

export const Route = createFileRoute("/notifications")({ component: NotifPage });

function NotifPage() {
  return (
    <FeatureShell title="الإشعارات" back="/home" showNav={false}>
      <div className="px-5 space-y-2 stagger">
        {mockNotifications.map(n => {
          const Icon = ICONS[n.type as keyof typeof ICONS] ?? Bell;
          const color = COLORS[n.type] ?? "var(--primary)";
          return (
            <div key={n.id} className="glass rounded-2xl p-3.5 flex items-start gap-3" style={n.unread ? { boxShadow: "inset 3px 0 0 0 var(--primary), inset 0 1px 0 0 oklch(1 0 0 / 0.5)" } : undefined}>
              <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `color-mix(in oklab, ${color} 18%, transparent)` }}>
                <Icon size={16} style={{ color }} strokeWidth={1.75} />
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-medium truncate">{n.title}</span>
                  <span className="text-[10px] text-foreground/55 shrink-0">{n.time}</span>
                </div>
                <p className="text-[12px] text-foreground/65 mt-0.5 leading-relaxed">{n.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureShell>
  );
}
