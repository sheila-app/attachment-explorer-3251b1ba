import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockNotifications } from "@/data/mock";
import { Bell, Calendar, Trophy, MessageCircle, Settings, X, CheckCheck, BellOff } from "lucide-react";

const ICONS = { workout: Bell, cycle: Calendar, award: Trophy, community: MessageCircle } as const;
const COLORS: Record<string, string> = {
  workout: "var(--primary)",
  cycle: "var(--phase-menstrual)",
  award: "var(--phase-ovulation)",
  community: "var(--phase-follicular)",
};

const FILTERS = [
  { id: "all",       label: "الكل" },
  { id: "unread",    label: "غير مقروءة" },
  { id: "workout",   label: "تمارين" },
  { id: "cycle",     label: "الدورة" },
  { id: "award",     label: "إنجازات" },
  { id: "community", label: "المجتمع" },
] as const;

type Notif = (typeof mockNotifications)[number];

export const Route = createFileRoute("/notifications/")({ component: NotifPage });

function NotifPage() {
  const [items, setItems] = useState<Notif[]>(mockNotifications);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const unreadCount = items.filter(n => n.unread).length;

  const visible = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "unread") return items.filter(n => n.unread);
    return items.filter(n => n.type === filter);
  }, [items, filter]);

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));
  const clearAll    = () => setItems([]);
  const toggleOne   = (id: string) => setItems(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  const removeOne   = (id: string) => setItems(prev => prev.filter(n => n.id !== id));

  return (
    <FeatureShell
      title="الإشعارات"
      back="/home"
      showNav={false}
      trailing={
        <Link
          to="/notifications/settings"
          className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center"
          aria-label="إعدادات الإشعارات"
        >
          <Settings size={16} strokeWidth={1.75} className="text-foreground/75" />
        </Link>
      }
    >
      {/* ملخّص + فلاتر */}
      <div className="px-5">
        <div className="glass rounded-2xl p-3.5 flex items-center justify-between">
          <div className="relative z-10">
            <div className="text-[11px] text-foreground/55">لديكِ</div>
            <div className="font-display text-[16px] mt-0.5">
              <span className="nums">{unreadCount}</span> إشعار غير مقروء
            </div>
          </div>
          <button
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="relative z-10 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-primary disabled:text-foreground/35"
          >
            <CheckCheck size={14} strokeWidth={2} />
            تحديد الكل كمقروء
          </button>
        </div>

        <div className="mt-3 flex gap-1.5 overflow-x-auto no-scrollbar -mx-5 px-5">
          {FILTERS.map(f => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-medium border transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white/70 border-border text-foreground/70"
                }`}
              >
                {f.label}
                {f.id === "unread" && unreadCount > 0 && (
                  <span className={`ms-1.5 nums text-[10px] ${active ? "text-primary-foreground/80" : "text-primary"}`}>
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* القائمة */}
      <div className="px-5 mt-4 space-y-2 stagger pb-32">
        {visible.length === 0 ? (
          <div className="glass rounded-2xl p-8 flex flex-col items-center text-center">
            <div className="relative z-10 w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
              <BellOff size={20} className="text-foreground/55" strokeWidth={1.75} />
            </div>
            <div className="relative z-10 text-[13.5px] font-medium">لا توجد إشعارات</div>
            <p className="relative z-10 text-[12px] text-foreground/60 mt-1 leading-relaxed">
              عندما يحدث شيء جديد، ستجدينه هنا.
            </p>
          </div>
        ) : (
          visible.map(n => {
            const Icon = ICONS[n.type as keyof typeof ICONS] ?? Bell;
            const color = COLORS[n.type] ?? "var(--primary)";
            return (
              <div
                key={n.id}
                onClick={() => toggleOne(n.id)}
                className="glass rounded-2xl p-3.5 flex items-start gap-3 cursor-pointer active:scale-[0.99] transition-transform"
                style={n.unread ? { boxShadow: "inset 3px 0 0 0 var(--primary), inset 0 1px 0 0 oklch(1 0 0 / 0.5)" } : undefined}
              >
                <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `color-mix(in oklab, ${color} 18%, transparent)` }}>
                  <Icon size={16} style={{ color }} strokeWidth={1.75} />
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-medium truncate flex items-center gap-1.5">
                      {n.title}
                      {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                    </span>
                    <span className="text-[10px] text-foreground/55 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-[12px] text-foreground/65 mt-0.5 leading-relaxed">{n.body}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeOne(n.id); }}
                  className="relative z-10 w-7 h-7 rounded-full hover:bg-foreground/5 flex items-center justify-center shrink-0"
                  aria-label="حذف الإشعار"
                >
                  <X size={13} className="text-foreground/45" strokeWidth={2} />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* شريط سفلي ثابت — تحديد كل شيء + حذف الكل */}
      {items.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-30 pointer-events-none">
          <div className="max-w-md mx-auto px-5 pb-5 pt-3 pointer-events-auto"
               style={{ background: "linear-gradient(to top, var(--background) 60%, transparent)" }}>
            <div className="glass rounded-2xl p-2 flex items-center gap-2">
              <button
                onClick={markAllRead}
                disabled={unreadCount === 0}
                className="relative z-10 flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-[13px] inline-flex items-center justify-center gap-1.5 disabled:opacity-40"
              >
                <CheckCheck size={15} strokeWidth={2.2} />
                تحديد الكل كمقروء
              </button>
              <button
                onClick={clearAll}
                className="relative z-10 px-4 py-3 rounded-xl border border-border bg-white/70 text-foreground/70 text-[12px] font-medium"
                aria-label="مسح الكل"
              >
                مسح الكل
              </button>
            </div>
          </div>
        </div>
      )}
    </FeatureShell>
  );
}
