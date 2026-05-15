import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";

export const Route = createFileRoute("/sheila-v2/nutrition/shopping")({ component: Shopping });

const ITEMS = [
  { cat: "خضار", items: ["طماطم", "خيار", "خس", "بصل"] },
  { cat: "بروتين", items: ["صدر دجاج", "بيض", "لبن يوناني", "سلمون"] },
  { cat: "حبوب", items: ["أرز بسمتي", "شوفان", "كينوا"] },
  { cat: "أخرى", items: ["زيت زيتون", "تمر", "لوز"] },
];

function Shopping() {
  const [done, setDone] = useState<string[]>([]);
  function toggle(it: string) { setDone(d => d.includes(it) ? d.filter(x => x !== it) : [...d, it]); }
  return (
    <ShellV2 title="قائمة التسوّق" back="/sheila-v2/nutrition" showFAB={false}>
      <div className="px-5 space-y-4">
        {ITEMS.map(g => (
          <div key={g.cat}>
            <h2 className="text-[12px] font-semibold mb-2 px-1">{g.cat}</h2>
            <div className="rounded-2xl bg-white/85 border border-border divide-y divide-border">
              {g.items.map(it => {
                const d = done.includes(it);
                return (
                  <button key={it} onClick={() => toggle(it)} className="w-full flex items-center gap-3 px-4 py-3 text-right">
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${d ? "border-primary bg-primary" : "border-foreground/25"}`}>
                      {d && <span className="text-white text-[11px]">✓</span>}
                    </span>
                    <span className={`text-[13px] ${d ? "line-through text-foreground/40" : ""}`}>{it}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </ShellV2>
  );
}
