import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { UserPlus, MessageCircle, Trophy } from "lucide-react";

export const Route = createFileRoute("/buddy")({ component: Page });

const buddies = [
  { id: "b1", name: "ريم", streak: 12, status: "أكملت تمرين اليوم" },
  { id: "b2", name: "هند", streak: 7, status: "في فترة الراحة" },
];

function Page() {
  return (
    <FeatureShell title="أخت المتابعة" back="/community" variant="warm">
      <div className="px-5 space-y-4">
        <div className="glass-strong rounded-3xl p-5">
          <div className="font-display text-[18px] leading-tight">دعمكِ المتبادل ✨</div>
          <p className="text-[12px] text-foreground/65 mt-1.5 leading-relaxed">شاركي رحلتكِ مع صديقة موثوقة — تشجيع، تذكير، وتحدّيات أسبوعيّة.</p>
        </div>

        <h2 className="text-[11px] font-medium text-foreground/55 uppercase tracking-wider px-1">أخواتكِ النشطات</h2>
        <div className="space-y-2 stagger">
          {buddies.map(b => (
            <div key={b.id} className="glass rounded-2xl p-4 flex items-center gap-3">
              <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-display text-base text-white"
                style={{ background: "var(--gradient-primary)" }}>{b.name.charAt(0)}</div>
              <div className="relative z-10 flex-1 min-w-0">
                <div className="text-[13.5px] font-medium">{b.name}</div>
                <div className="text-[11px] text-foreground/60 truncate">{b.status}</div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-primary">
                  <Trophy size={10} /> سلسلة <span className="nums">{b.streak}</span> يوم
                </div>
              </div>
              <Link to="/coaches/$id/chat" params={{ id: b.id }} className="glass w-9 h-9 rounded-full flex items-center justify-center">
                <MessageCircle size={14} className="relative z-10 text-primary" />
              </Link>
            </div>
          ))}
        </div>

        <Link to="/community/invite" className="glass-strong w-full rounded-2xl py-3.5 flex items-center justify-center gap-2 text-primary text-sm">
          <UserPlus size={16} /> أضيفي أختاً للمتابعة
        </Link>
      </div>
    </FeatureShell>
  );
}
