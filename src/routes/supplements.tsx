import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Pill, Check, Plus } from "lucide-react";

export const Route = createFileRoute("/supplements")({ component: Page });

const initial = [
  { id: "s1", name: "حديد", dose: "18 مغ", time: "بعد الفطور", taken: true },
  { id: "s2", name: "فيتامين D", dose: "1000 وحدة", time: "مع الغداء", taken: true },
  { id: "s3", name: "أوميغا 3", dose: "1000 مغ", time: "بعد العشاء", taken: false },
  { id: "s4", name: "ماغنيسيوم", dose: "200 مغ", time: "قبل النوم", taken: false },
];

function Page() {
  const [list, setList] = useState(initial);
  const toggle = (id: string) => setList(l => l.map(x => x.id === id ? { ...x, taken: !x.taken } : x));
  const done = list.filter(x => x.taken).length;
  return (
    <FeatureShell title="المكمّلات والأدوية" back="/journey" variant="calm"
      trailing={<button className="glass w-9 h-9 rounded-full flex items-center justify-center"><Plus size={15} className="relative z-10" strokeWidth={2} /></button>}>
      <div className="px-5 space-y-3">
        <div className="glass-strong rounded-2xl p-4 text-center">
          <div className="relative z-10 text-[10px] tracking-[0.18em] uppercase text-foreground/55">تذكير اليوم</div>
          <div className="relative z-10 font-display text-[28px] text-primary mt-1 nums">{done} <span className="text-foreground/40 text-lg">/ {list.length}</span></div>
          <div className="relative z-10 text-[11.5px] text-foreground/65 mt-1">أحسنتِ، أكملي روتينكِ</div>
        </div>

        <div className="space-y-2 stagger">
          {list.map(s => (
            <button key={s.id} onClick={() => toggle(s.id)} className="glass w-full rounded-2xl p-3.5 flex items-center gap-3 text-right">
              <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: s.taken ? "var(--gradient-primary)" : "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.25), oklch(0.46 0.135 328 / 0.12))" }}>
                {s.taken ? <Check size={17} className="text-white" strokeWidth={2.5} /> : <Pill size={17} className="text-primary" strokeWidth={1.75} />}
              </div>
              <div className="relative z-10 flex-1">
                <div className="text-[13.5px] font-medium">{s.name}</div>
                <div className="text-[10.5px] text-foreground/60 mt-0.5 nums">{s.dose} · {s.time}</div>
              </div>
              <div className="relative z-10 text-[10px] text-primary">{s.taken ? "مأخوذ" : "تذكير"}</div>
            </button>
          ))}
        </div>
      </div>
    </FeatureShell>
  );
}
