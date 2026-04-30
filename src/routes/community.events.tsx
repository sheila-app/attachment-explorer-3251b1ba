import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Calendar, MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/community/events")({ component: Page });

const events = [
  { id: "e1", title: "ورشة يوغا أونلاين", date: "السبت · 11 مايو · 19:00", loc: "Zoom", joined: 124, free: true },
  { id: "e2", title: "ماراثون نسائي 5كم", date: "الجمعة · 17 مايو · 06:30", loc: "حديقة الملك عبدالله", joined: 482, free: false },
  { id: "e3", title: "ندوة: غذاء الدورة", date: "الأحد · 26 مايو · 20:00", loc: "Zoom", joined: 203, free: true },
];

function Page() {
  return (
    <FeatureShell title="فعاليّات" back="/community" variant="warm">
      <div className="px-5 pb-8 space-y-3 stagger">
        {events.map(e => (
          <div key={e.id} className="glass-strong rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="relative z-10 flex-1">
                <div className="text-[14px] font-medium">{e.title}</div>
                <div className="flex items-center gap-1 text-[11px] text-foreground/65 mt-1.5">
                  <Calendar size={11} /> {e.date}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-foreground/65 mt-1">
                  <MapPin size={11} /> {e.loc}
                </div>
              </div>
              <span className="relative z-10 text-[10px] px-2 py-0.5 rounded-full text-white"
                style={{ background: e.free ? "var(--gradient-primary)" : "oklch(0.6 0.05 50)" }}>
                {e.free ? "مجّاني" : "مدفوع"}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1 text-[11px] text-foreground/55">
                <Users size={11} /> <span className="nums">{e.joined}</span> منضمّة
              </div>
              <button className="relative z-10 text-[11.5px] text-primary">انضمّي ←</button>
            </div>
          </div>
        ))}
      </div>
    </FeatureShell>
  );
}
