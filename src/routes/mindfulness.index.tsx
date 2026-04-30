import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Wind, Moon, Sun, Heart } from "lucide-react";

export const Route = createFileRoute("/mindfulness/")({ component: Page });

const sessions = [
  { id: "breath", title: "تنفّس 4-7-8", dur: 5, icon: Wind, hint: "يهدّئ التوتّر فوراً" },
  { id: "calm", title: "تأمّل الهدوء", dur: 10, icon: Heart, hint: "للأيّام المتعبة" },
  { id: "sleep", title: "نوم عميق", dur: 15, icon: Moon, hint: "قبل النوم مباشرة" },
  { id: "morning", title: "صباح متوازن", dur: 7, icon: Sun, hint: "ابدئي يومكِ بصفاء" },
];

function Page() {
  return (
    <FeatureShell title="التأمّل والتنفّس" back="/journey" variant="calm">
      <div className="px-5 space-y-3 stagger">
        <p className="text-[12.5px] text-foreground/65 leading-relaxed">جلسات قصيرة لتهدئة جسمكِ وعقلكِ، خاصّة في الأيّام الحساسة من الدورة.</p>
        {sessions.map(s => (
          <Link to="/mindfulness/$id" params={{ id: s.id }} key={s.id} className="glass rounded-2xl p-4 flex items-center gap-3">
            <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.25), oklch(0.46 0.135 328 / 0.12))" }}>
              <s.icon size={20} className="text-primary" strokeWidth={1.75} />
            </div>
            <div className="relative z-10 flex-1">
              <div className="text-[13.5px] font-medium">{s.title}</div>
              <div className="text-[11px] text-foreground/60 mt-0.5">{s.hint}</div>
            </div>
            <div className="relative z-10 text-[11px] text-primary nums">{s.dur} د</div>
          </Link>
        ))}
      </div>
    </FeatureShell>
  );
}
