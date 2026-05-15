import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";

export const Route = createFileRoute("/sheila-v2/profile/appearance")({ component: Appearance });
const ACCENTS = [
  { id: "samai", name: "سماوي", color: "oklch(0.66 0.16 322)" },
  { id: "green", name: "أخضر", color: "oklch(0.65 0.14 165)" },
  { id: "peach", name: "خوخي", color: "oklch(0.78 0.14 55)" },
  { id: "lav", name: "بنفسجي", color: "oklch(0.68 0.14 295)" },
  { id: "pink", name: "وردي", color: "oklch(0.72 0.16 18)" },
];
const PHASES = [
  { name: "الطمث", c: "var(--phase-menstrual)" },
  { name: "الجريبيّة", c: "var(--phase-follicular)" },
  { name: "الإباضة", c: "var(--phase-ovulation)" },
  { name: "الأصفريّة", c: "var(--phase-luteal)" },
];

function Appearance() {
  const [sel, setSel] = useState("samai");
  return (
    <ShellV2 title="المظهر" back="/sheila-v2/profile" showFAB={false}>
      <div className="px-5">
        <h2 className="text-[12px] font-semibold mb-2.5">لون اللهجة</h2>
        <div className="grid grid-cols-5 gap-2">
          {ACCENTS.map(a => (
            <button key={a.id} onClick={() => setSel(a.id)} className="flex flex-col items-center gap-1.5">
              <span className="w-12 h-12 rounded-full relative" style={{ background: a.color, boxShadow: sel === a.id ? `0 0 0 3px white, 0 0 0 5px ${a.color}` : undefined }} />
              <span className="text-[10px] text-foreground/65">{a.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-foreground/5 border border-border p-4 flex items-start gap-3">
          <Lock size={16} className="text-foreground/55 mt-0.5" />
          <div>
            <div className="text-[12.5px] font-semibold">ألوان المراحل الصحيّة ثابتة</div>
            <p className="text-[11px] text-foreground/65 mt-1 leading-relaxed">ألوان المراحل الصحيّة لا تتأثّر بهذا الاختيار — لأنّها تحمل معنى صحّيّاً ويجب أن تبقى ثابتة.</p>
            <div className="flex gap-2 mt-3">
              {PHASES.map(p => <div key={p.name} className="flex-1 text-center"><div className="h-7 rounded-lg" style={{ background: p.c }} /><div className="text-[9.5px] mt-1 text-foreground/65">{p.name}</div></div>)}
            </div>
          </div>
        </div>
      </div>
    </ShellV2>
  );
}
