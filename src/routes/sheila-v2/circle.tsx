import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, MessageCircle, Plus, Users, CalendarDays, UserPlus, Trophy } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";
import { FEED, tierFor } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/circle")({ component: Circle });

function Circle() {
  const { state } = useSheilaV2();
  const allPosts = [...state.feedPosts, ...FEED];

  return (
    <ShellV2 title="دائرة شيلا" fabSide="end">
      <Link to="/sheila-v2/circle/compose" className="absolute z-40 bottom-[92px] start-5">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-lg border border-border">
          <Plus size={22} className="text-primary" strokeWidth={2.2} />
        </div>
      </Link>

      <div className="px-5">
        <div className="grid grid-cols-4 gap-2">
          <Link to="/sheila-v2/circle/groups" className="rounded-2xl bg-white/85 border border-border p-3 flex flex-col items-center gap-1.5"><Users size={18} className="text-primary" /><span className="text-[10px]">المجموعات</span></Link>
          <Link to="/sheila-v2/challenges" className="rounded-2xl bg-white/85 border border-border p-3 flex flex-col items-center gap-1.5"><Trophy size={18} className="text-phase-luteal" /><span className="text-[10px]">التحدّيات</span></Link>
          <Link to="/sheila-v2/circle/events" className="rounded-2xl bg-white/85 border border-border p-3 flex flex-col items-center gap-1.5"><CalendarDays size={18} className="text-phase-follicular" /><span className="text-[10px]">فعاليّات</span></Link>
          <Link to="/sheila-v2/circle/accountability" className="rounded-2xl bg-white/85 border border-border p-3 flex flex-col items-center gap-1.5">
            <UserPlus size={18} className="text-phase-ovulation" />
            <span className="text-[10px]">{state.partner ? state.partner.name : "شريك"}</span>
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {allPosts.map((p) => {
            const t = tierFor(p.tier === "sharp" ? 500 : p.tier === "fluent" ? 850 : 250);
            return (
              <div key={p.id} className="rounded-2xl bg-white/85 border border-border p-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-display text-[13px]" style={{ background: t.gradient }}>{p.author[0]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5"><span className="text-[12.5px] font-semibold">{p.author}</span><span className="text-[9.5px] px-1.5 py-0.5 rounded-full" style={{ background: t.color + "22", color: t.color }}>{t.name}</span></div>
                    <div className="text-[10px] text-foreground/55 mt-0.5">{p.cat} • {p.time}</div>
                  </div>
                </div>
                <p className="text-[12.5px] leading-relaxed mt-3 text-foreground/85">{p.text}</p>
                <div className="flex items-center gap-4 mt-3 text-[11px] text-foreground/60">
                  <span className="flex items-center gap-1"><Heart size={13} />{p.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={13} />{p.replies}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ShellV2>
  );
}
