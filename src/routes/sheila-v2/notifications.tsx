import { createFileRoute } from "@tanstack/react-router";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { NOTIFICATIONS } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/notifications")({ component: Notif });

function Notif() {
  return (
    <ShellV2 title="الإشعارات" back="/sheila-v2/home" showFAB={false}>
      <div className="px-5 space-y-2">
        {NOTIFICATIONS.map(n => (
          <div key={n.id} className={`rounded-2xl p-3.5 flex items-start gap-3 ${n.unread ? "bg-primary/5 border border-primary/20" : "bg-white/85 border border-border"}`}>
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[18px] shrink-0">{n.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-[12.5px] font-semibold truncate">{n.title}</div>
                {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
              </div>
              <div className="text-[11.5px] text-foreground/65 mt-0.5">{n.body}</div>
              <div className="text-[10px] text-foreground/45 mt-1">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </ShellV2>
  );
}
