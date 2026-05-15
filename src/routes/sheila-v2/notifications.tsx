import { createFileRoute } from "@tanstack/react-router";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";
import { NOTIFICATIONS } from "@/data/sheila-v2";
import { useEffect } from "react";

export const Route = createFileRoute("/sheila-v2/notifications")({ component: Notif });

function Notif() {
  const { state, dispatch } = useSheilaV2();
  useEffect(() => {
    const t = setTimeout(() => dispatch({ type: "markAllRead" }), 1500);
    return () => clearTimeout(t);
  }, [dispatch]);

  const all = state.notifications.length > 0
    ? state.notifications
    : NOTIFICATIONS.map((n) => ({ id: n.id, title: n.title, body: n.body, icon: n.icon, at: Date.now(), unread: !!n.unread }));

  function timeAgo(at: number) {
    const diff = Math.floor((Date.now() - at) / 1000);
    if (diff < 60) return "الآن";
    if (diff < 3600) return `قبل ${Math.floor(diff / 60)} د`;
    if (diff < 86400) return `قبل ${Math.floor(diff / 3600)} س`;
    return `قبل ${Math.floor(diff / 86400)} يوم`;
  }

  return (
    <ShellV2 title="الإشعارات" back="/sheila-v2/home" showFAB={false}>
      <div className="px-5 space-y-2">
        {all.map((n) => (
          <div key={n.id} className={`rounded-2xl p-3.5 flex items-start gap-3 ${n.unread ? "bg-primary/5 border border-primary/20" : "bg-white/85 border border-border"}`}>
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[18px] shrink-0">{n.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-[12.5px] font-semibold truncate">{n.title}</div>
                {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
              </div>
              <div className="text-[11.5px] text-foreground/65 mt-0.5">{n.body}</div>
              <div className="text-[10px] text-foreground/45 mt-1">{timeAgo(n.at)}</div>
            </div>
          </div>
        ))}
      </div>
    </ShellV2>
  );
}
